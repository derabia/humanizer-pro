#!/usr/bin/env node
/**
 * humanizer-pro — SKILL.md validator
 *
 * origin: humanizer-pro
 *
 * Usage:  node tools/check-skill.js [path/to/SKILL.md]
 *
 * Hard failures (exit 1):
 *   - file missing / unreadable
 *   - UTF-8 BOM present
 *   - CRLF line endings present
 *   - em dash (U+2014) or en dash (U+2013) anywhere in the file
 *   - frontmatter missing or unparseable
 *   - name != "humanizer-pro"
 *   - description missing or > 1024 characters
 *   - total line count > 500
 *   - a references/*.md path mentioned in SKILL.md does not exist
 *
 * Warnings (exit 0):
 *   - a scripts/*.js path mentioned in SKILL.md does not exist
 *     (scripts may still be in progress)
 *
 * Node >= 18, no dependencies, CommonJS.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const DESCRIPTION_LIMIT = 1024;
const LINE_LIMIT = 500;
const EM_DASH = '—';
const EN_DASH = '–';

const errors = [];
const warnings = [];
const notes = [];

function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }
function note(msg) { notes.push(msg); }

// ─── Locate the target ───────────────────────────────────────────────────

const defaultTarget = path.resolve(
  __dirname, '..', 'skills', 'humanizer-pro', 'SKILL.md'
);
const target = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : defaultTarget;
const skillDir = path.dirname(target);

console.log('check-skill: ' + target);

let buf;
try {
  buf = fs.readFileSync(target);
} catch (err) {
  fail('cannot read file: ' + err.message);
  report();
}

// ─── Encoding checks (on raw bytes) ──────────────────────────────────────

if (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
  fail('UTF-8 BOM present at start of file');
} else {
  note('no BOM');
}

const text = buf.toString('utf8');

const crlfCount = (text.match(/\r\n/g) || []).length;
const loneCr = (text.match(/\r(?!\n)/g) || []).length;
if (crlfCount > 0) {
  fail('CRLF line endings present (' + crlfCount + ' occurrences); file must be LF only');
} else if (loneCr > 0) {
  fail('carriage returns present (' + loneCr + ' occurrences); file must be LF only');
} else {
  note('line endings: LF only');
}

// ─── Dash characters ─────────────────────────────────────────────────────

for (const [label, ch] of [['em dash (U+2014)', EM_DASH], ['en dash (U+2013)', EN_DASH]]) {
  const lines = [];
  text.split('\n').forEach((line, i) => {
    if (line.indexOf(ch) !== -1) lines.push(i + 1);
  });
  if (lines.length) {
    fail(label + ' found on line(s): ' + lines.join(', '));
  }
}
if (text.indexOf(EM_DASH) === -1 && text.indexOf(EN_DASH) === -1) {
  note('no em dash or en dash characters');
}

// ─── Line count ──────────────────────────────────────────────────────────

let lineCount = text.split('\n').length;
if (text.endsWith('\n')) lineCount -= 1; // match `wc -l`
if (lineCount > LINE_LIMIT) {
  fail('line count ' + lineCount + ' exceeds limit ' + LINE_LIMIT);
} else {
  note('line count: ' + lineCount + ' (limit ' + LINE_LIMIT + ')');
}

// ─── Frontmatter (simple YAML subset) ────────────────────────────────────

/**
 * Parses top-level scalar keys plus block scalars (`>`, `>-`, `|`, `|-`).
 * Nested mappings (e.g. `metadata:`) are recorded as present but their
 * children are skipped.
 */
function parseFrontmatter(raw) {
  const lines = raw.split('\n');
  if (lines[0].trim() !== '---') return { error: 'file does not start with "---"' };

  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') { end = i; break; }
  }
  if (end === -1) return { error: 'no closing "---" for frontmatter' };

  const body = lines.slice(1, end);
  const out = {};
  let i = 0;
  while (i < body.length) {
    const line = body[i];
    if (line.trim() === '' || /^\s*#/.test(line)) { i += 1; continue; }
    const m = /^([A-Za-z0-9_.-]+):[ \t]*(.*)$/.exec(line);
    if (!m) { i += 1; continue; } // indented child or unsupported syntax
    const key = m[1];
    const rest = m[2].trim();
    const blockMatch = /^([>|])([+-]?)$/.exec(rest);
    if (blockMatch) {
      const style = blockMatch[1];
      const chomp = blockMatch[2];
      const chunk = [];
      i += 1;
      while (i < body.length) {
        const l = body[i];
        if (l.trim() === '') { chunk.push(''); i += 1; continue; }
        if (!/^[ \t]/.test(l)) break; // back at column 0: new key
        chunk.push(l.replace(/^[ \t]+/, ''));
        i += 1;
      }
      while (chunk.length && chunk[chunk.length - 1] === '') chunk.pop();
      let value;
      if (style === '>') {
        // folded: join non-empty runs with single spaces, blank line -> newline
        const parts = [];
        let run = [];
        for (const l of chunk) {
          if (l === '') { parts.push(run.join(' ')); run = []; } else { run.push(l); }
        }
        parts.push(run.join(' '));
        value = parts.join('\n');
      } else {
        value = chunk.join('\n');
      }
      if (chomp !== '-') value += '\n';
      out[key] = value;
      continue;
    }
    if (rest === '') {
      // nested mapping or empty value; skip indented children
      out[key] = '';
      i += 1;
      while (i < body.length && (/^[ \t]/.test(body[i]) || body[i].trim() === '')) i += 1;
      continue;
    }
    // plain scalar, optionally quoted
    let value = rest;
    const q = /^(['"])([\s\S]*)\1$/.exec(value);
    if (q) value = q[2];
    out[key] = value;
    i += 1;
  }
  return { data: out, endLine: end };
}

const fm = parseFrontmatter(text);
if (fm.error) {
  fail('frontmatter: ' + fm.error);
} else {
  note('frontmatter parsed; keys: ' + Object.keys(fm.data).join(', '));

  const name = fm.data.name;
  if (name === undefined) {
    fail('frontmatter: "name" is missing');
  } else if (name.trim() !== 'humanizer-pro') {
    fail('frontmatter: name is "' + name.trim() + '", expected "humanizer-pro"');
  } else {
    note('name: humanizer-pro');
  }

  const desc = fm.data.description;
  if (desc === undefined) {
    fail('frontmatter: "description" is missing');
  } else {
    const folded = desc.replace(/\n+$/, '').trim();
    const len = Array.from(folded).length;
    if (len > DESCRIPTION_LIMIT) {
      fail('description is ' + len + ' characters, limit ' + DESCRIPTION_LIMIT);
    } else {
      note('description length: ' + len + ' characters (limit ' + DESCRIPTION_LIMIT + ')');
    }
  }
}

// ─── Referenced paths exist ──────────────────────────────────────────────

function collect(re) {
  const found = new Set();
  let m;
  while ((m = re.exec(text)) !== null) found.add(m[0]);
  return Array.from(found).sort();
}

const refPaths = collect(/references\/[A-Za-z0-9._-]+\.md/g);
const scriptPaths = collect(/scripts\/[A-Za-z0-9._\/-]+\.js/g);

note('reference paths mentioned: ' + (refPaths.length || 0));
for (const rel of refPaths) {
  if (!fs.existsSync(path.resolve(skillDir, rel))) {
    fail('referenced file does not exist: ' + rel);
  }
}

note('script paths mentioned: ' + (scriptPaths.length || 0));
for (const rel of scriptPaths) {
  if (!fs.existsSync(path.resolve(skillDir, rel))) {
    warn('script not found (may still be in progress): ' + rel);
  }
}

report();

// ─── Reporting ───────────────────────────────────────────────────────────

function report() {
  console.log('');
  for (const n of notes) console.log('  ok      ' + n);
  for (const w of warnings) console.log('  WARN    ' + w);
  for (const e of errors) console.log('  FAIL    ' + e);
  console.log('');
  console.log(
    'result: ' + errors.length + ' failure(s), ' + warnings.length + ' warning(s)'
  );
  process.exit(errors.length > 0 ? 1 : 0);
}
