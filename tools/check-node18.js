#!/usr/bin/env node
/**
 * humanizer-pro — Node 18 API compatibility check (static grep)
 *
 * origin: humanizer-pro
 *
 * This is a STATIC, textual check only. It greps source for calls/tokens
 * that correspond to JS/Node APIs added after Node 18, so it can catch an
 * obvious incompatibility before CI spends a Node 18 job on it. It cannot
 * prove Node 18 compatibility: it has no type information, does not
 * evaluate the code, and a real Node 18 run (see .github/workflows/ci.yml)
 * is still required as the actual gate.
 *
 * Scans every *.js file under skills/, tools/, and tests/ (this file's own
 * path is excluded, since its header and pattern table necessarily contain
 * every banned string as text).
 *
 * Flags, each as a distinct finding with file:line:
 *   - Array.prototype.findLast / findLastIndex / toSorted / toReversed /
 *     toSpliced / with(
 *   - Array.fromAsync
 *   - Object.groupBy / Map.groupBy
 *   - Set.prototype union/intersection/difference/symmetricDifference/
 *     isSubsetOf/isSupersetOf/isDisjointFrom
 *   - String.prototype.isWellFormed (and toWellFormed)
 *   - Promise.withResolvers
 *   - the regex "v" (unicodeSets) flag — heuristic, see below
 *   - import.meta
 *   - fs.readdirSync(..., { recursive: true }) (or readdir/promises variant)
 *
 * structuredClone is intentionally NOT flagged: it has been available since
 * Node 17/18 and is allowed.
 *
 * A line may be suppressed by ending it with "// node18-ok" when a hit is a
 * confirmed false positive (e.g. a String#with()-style user method, not the
 * built-in). Prefer fixing the pattern over suppressing; use this sparingly.
 *
 * Usage:
 *   node tools/check-node18.js [--json]
 *
 * Exit codes:
 *   0 - no hits
 *   1 - at least one hit
 *
 * Node >= 18, no dependencies, CommonJS.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SELF_PATH = path.resolve(__filename);
const SCAN_DIRS = ['skills', 'tools', 'tests'];
const asJson = process.argv.includes('--json');

// Each pattern: { name, re } where re is applied per-line (no /g state reuse
// across lines; matched fresh per test() call).
const PATTERNS = [
  { name: 'Array#findLast', re: /\.findLast\(/ },
  { name: 'Array#findLastIndex', re: /\.findLastIndex\(/ },
  { name: 'Array#toSorted', re: /\.toSorted\(/ },
  { name: 'Array#toReversed', re: /\.toReversed\(/ },
  { name: 'Array#toSpliced', re: /\.toSpliced\(/ },
  { name: 'Array#with()', re: /\.with\(/ },
  { name: 'Array.fromAsync', re: /Array\.fromAsync\b/ },
  { name: 'Object.groupBy', re: /Object\.groupBy\(/ },
  { name: 'Map.groupBy', re: /Map\.groupBy\(/ },
  { name: 'String#isWellFormed', re: /\.isWellFormed\(/ },
  { name: 'String#toWellFormed', re: /\.toWellFormed\(/ },
  { name: 'Promise.withResolvers', re: /Promise\.withResolvers\(/ },
  { name: 'Set#union', re: /\.union\(/ },
  { name: 'Set#intersection', re: /\.intersection\(/ },
  { name: 'Set#difference', re: /\.difference\(/ },
  { name: 'Set#symmetricDifference', re: /\.symmetricDifference\(/ },
  { name: 'Set#isSubsetOf', re: /\.isSubsetOf\(/ },
  { name: 'Set#isSupersetOf', re: /\.isSupersetOf\(/ },
  { name: 'Set#isDisjointFrom', re: /\.isDisjointFrom\(/ },
  { name: 'import.meta', re: /\bimport\.meta\b/ },
  // fs.readdirSync/readdir with { recursive: true } — look for "recursive"
  // near a readdir call on the same or next couple of lines is unreliable
  // line-by-line, so this pattern matches the common single-line and
  // options-object-opens-here forms.
  { name: 'fs.readdirSync/readdir recursive option', re: /readdir(Sync)?\([^)]*recursive\s*:\s*true/ },
  // Regex "v" (unicodeSets) flag: heuristic only. Matches a /.../v style
  // literal flag list ending in v, or new RegExp(pattern, '...v...').
  // Narrow on purpose to avoid matching "v" inside unrelated flag-looking
  // strings; still expect false negatives/positives, hence "heuristic".
  { name: 'regex "v" (unicodeSets) flag (heuristic)', re: /\/[a-z]*v[a-z]*(?=[\s,;)\]}]|$)(?<![\w])/ },
];

// The regex-flag heuristic above is too noisy as a single global pattern
// (division operators, etc.), so it is intentionally NOT included in
// PATTERNS; instead it is checked separately with a narrower shape.
// Valid regex flag letters only (d g i m s u v y), 1-6 of them, so this
// does not match arbitrary words like "env" or "div" that merely contain
// the letter v after an unrelated pair of slashes.
const FLAG_CHARS = '[dgimsuvy]';
const REGEX_V_FLAG_PATTERNS = [
  // /pattern/flags where flags contains v, e.g. /foo/gv or /foo/v
  new RegExp('\\/(?:[^\\/\\\\\\n]|\\\\.)+\\/' + FLAG_CHARS + '{0,5}v' + FLAG_CHARS + '{0,5}(?=[\\s,;)\\]}]|$)'),
  // new RegExp('pattern', 'gv') or "...v..."
  new RegExp("new\\s+RegExp\\([^)]*['\"]" + FLAG_CHARS + '{0,5}v' + FLAG_CHARS + "{0,5}['\"]"),
];
const idx = PATTERNS.findIndex((p) => p.name.startsWith('regex "v"'));
if (idx !== -1) PATTERNS.splice(idx, 1);

function walk(dir, out) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      if (path.resolve(full) === SELF_PATH) continue;
      out.push(full);
    }
  }
}

const files = [];
for (const d of SCAN_DIRS) {
  walk(path.join(root, d), files);
}
files.sort();

const hits = [];

for (const file of files) {
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch (err) {
    continue;
  }
  const lines = text.split('\n');
  const rel = path.relative(root, file).split(path.sep).join('/');

  lines.forEach((line, i) => {
    if (/\/\/\s*node18-ok\s*$/.test(line)) return; // suppressed

    for (const p of PATTERNS) {
      if (p.re.test(line)) {
        hits.push({ file: rel, line: i + 1, api: p.name, text: line.trim() });
      }
    }
    for (const re of REGEX_V_FLAG_PATTERNS) {
      if (re.test(line)) {
        hits.push({
          file: rel, line: i + 1,
          api: 'regex "v" (unicodeSets) flag (heuristic)', text: line.trim(),
        });
      }
    }
  });
}

if (asJson) {
  console.log(JSON.stringify({ scanned: files.length, hits }, null, 2));
} else {
  console.log('check-node18: scanned ' + files.length + ' file(s) under ' + SCAN_DIRS.join(', '));
  console.log('');
  if (hits.length === 0) {
    console.log('  ok      no post-Node-18 API usage found');
  } else {
    for (const h of hits) {
      console.log('  FAIL    ' + h.file + ':' + h.line + '  [' + h.api + ']  ' + h.text);
    }
  }
  console.log('');
  console.log('result: ' + hits.length + ' hit(s)');
  console.log('note: this is a static grep; a real Node 18 run in CI is still required');
}

process.exit(hits.length > 0 ? 1 : 0);
