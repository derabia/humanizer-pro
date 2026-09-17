#!/usr/bin/env node
/**
 * humanizer-pro — detect.js
 *
 * origin: humanizer-pro
 *
 * Usage:
 *   node detect.js <file|-> [--lang en|ar] [--variety msa|egt|shami]
 *                           [--json] [--markdown]
 *
 *   <file>      path to a UTF-8 text/Markdown file
 *   -           read the document from stdin
 *   --lang      force the engine instead of auto-detecting
 *   --variety   force the Arabic variety (implies the Arabic engine)
 *   --json      print the raw analysis object plus { lang }
 *   --markdown  analyse as rendered Markdown (sourceMode:'rendered-markdown')
 *
 * Exit codes: 0 always, except 2 for an input error (missing file, unreadable
 * stdin, unknown flag). A detection result is never an error.
 *
 * Also exported for programmatic use:
 *   analyze(text, opts) -> { lang, variety, confidence, engine, ...analysis }
 */

'use strict';

const fs = require('fs');
const path = require('path');

const enDetector = require(path.join(__dirname, 'lib', 'en-detector', 'index.js'));
const arDetector = require(path.join(__dirname, 'lib', 'ar-detector', 'index.js'));
const lang = require(path.join(__dirname, 'lib', 'lang.js'));

// ═══ Programmatic API ═════════════════════════════════════════════════════

/**
 * analyze(text, opts) -> result
 *
 * opts: { lang: 'en'|'ar', variety: 'msa'|'egt'|'shami', markdown: boolean }
 *
 * Routing: lib/lang.js identifies the document. 'ar' and 'mixed' both go to
 * the Arabic engine — a mixed Arabic/English document is Arabic prose with
 * English terms in it (code-switching is a documented dialect feature, see
 * AR-EGT-016 / AR-SHM-017), and the Arabic engine leaves Latin-script terms
 * untouched. 'en' and 'unknown' go to the English engine.
 */
function analyze(text, opts) {
  const options = opts || {};
  const sourceMode = options.markdown ? 'rendered-markdown' : 'plain';

  const override = {};
  if (options.lang) override.lang = options.lang;
  if (options.variety) {
    override.variety = options.variety;
    if (!override.lang) override.lang = 'ar';
  }

  const id = Object.keys(override).length
    ? lang.identify(text, { override: { lang: override.lang, variety: override.variety || null } })
    : lang.identify(text);

  const useArabic = id.lang === 'ar' || id.lang === 'mixed';

  if (useArabic) {
    const variety = options.variety || id.variety || 'msa';
    const analysis = arDetector.analyzeText(text, { variety, sourceMode });
    return {
      lang: id.lang,
      variety,
      confidence: id.confidence,
      engine: 'ar',
      arabicRatio: id.arabicRatio,
      ...analysis,
    };
  }

  const analysis = enDetector.analyzeText(text, { sourceMode });
  return {
    lang: id.lang === 'unknown' ? 'unknown' : 'en',
    variety: null,
    confidence: id.confidence,
    engine: 'en',
    arabicRatio: id.arabicRatio,
    ...analysis,
  };
}

// ═══ Reporting ════════════════════════════════════════════════════════════

/** Build a line-start index so offsets can be reported as line:col. */
function lineIndex(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '\n') starts.push(i + 1);
  }
  return starts;
}

function lineCol(starts, offset) {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= offset) lo = mid; else hi = mid - 1;
  }
  return { line: lo + 1, col: offset - starts[lo] + 1 };
}

const SEVERITY_ORDER = ['P0', 'P1', 'P2', 'P3'];

/**
 * Normalize an issue from either engine to the reporting shape. The English
 * engine reports `{ type, text, index, severity: 'critical'|'high'|… }`; the
 * Arabic engine already reports `{ patternId, start, end, excerpt, severity }`.
 */
function normalizeIssue(issue, engine) {
  if (engine === 'ar') {
    return {
      severity: issue.severity,
      patternId: issue.patternId,
      type: issue.type,
      excerpt: issue.excerpt,
      start: issue.start,
      suggestion: issue.suggestion,
    };
  }
  const severity = enDetector.SEVERITY_LABELS[issue.severity] || 'P2';
  return {
    severity,
    patternId: issue.type,
    type: enDetector.TYPE_LABELS[issue.type] || issue.type,
    excerpt: issue.text,
    start: Number.isInteger(issue.index) ? issue.index : null,
    suggestion: issue.suggestion || issue.fix || '',
  };
}

function collapse(str, max) {
  const flat = String(str == null ? '' : str).replace(/\s+/g, ' ').trim();
  if (max && flat.length > max) return `${flat.slice(0, max - 1)}…`;
  return flat;
}

function renderReport(text, result, sourceLabel) {
  const starts = lineIndex(text);
  const out = [];

  out.push(`file:       ${sourceLabel}`);
  const varietyPart = result.variety ? ` / ${result.variety}` : '';
  const conf = typeof result.confidence === 'number' ? result.confidence.toFixed(2) : 'n/a';
  out.push(`language:   ${result.lang}${varietyPart}  (confidence ${conf}, engine ${result.engine})`);
  out.push(`score:      ${result.score}   label: ${result.label}`);
  if (result.stats) {
    const s = result.stats;
    const bits = [`words ${s.wordCount ?? 0}`];
    if (s.sentenceCount !== undefined) bits.push(`sentences ${s.sentenceCount}`);
    if (s.paragraphCount !== undefined) bits.push(`paragraphs ${s.paragraphCount}`);
    if (s.sourceMode) bits.push(`sourceMode ${s.sourceMode}`);
    if (s.tooShort) bits.push('tooShort');
    out.push(`stats:      ${bits.join(', ')}`);
    if (s.msaLeakage && s.msaLeakage.applicable) {
      out.push(`msa-leakage: ${(s.msaLeakage.ratio * 100).toFixed(0)}% `
        + `(${s.msaLeakage.msaHits} MSA vs ${s.msaLeakage.dialectHits} dialect function words)`);
    }
  }
  out.push('');

  const issues = (result.issues || []).map((i) => normalizeIssue(i, result.engine));
  if (issues.length === 0) {
    out.push('no issues found.');
    return `${out.join('\n')}\n`;
  }

  for (const severity of SEVERITY_ORDER) {
    const group = issues.filter((i) => i.severity === severity);
    if (group.length === 0) continue;
    out.push(`${severity}  (${group.length})`);
    for (const issue of group) {
      const pos = issue.start === null
        ? '     -'
        : (() => { const { line, col } = lineCol(starts, issue.start); return `${line}:${col}`; })();
      out.push(`  ${pos.padStart(8)}  ${issue.patternId}  ${issue.type}`);
      out.push(`            «${collapse(issue.excerpt, 90)}»`);
      if (issue.suggestion) out.push(`            → ${collapse(issue.suggestion, 200)}`);
    }
    out.push('');
  }

  return `${out.join('\n')}\n`;
}

// ═══ CLI ══════════════════════════════════════════════════════════════════

const USAGE = 'usage: node detect.js <file|-> [--lang en|ar] [--variety msa|egt|shami] [--json] [--markdown]';

function parseArgs(argv) {
  const parsed = { file: null, lang: null, variety: null, json: false, markdown: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--json') { parsed.json = true; continue; }
    if (arg === '--markdown') { parsed.markdown = true; continue; }
    if (arg === '--help' || arg === '-h') { parsed.help = true; continue; }
    if (arg === '--lang' || arg === '--variety') {
      const value = argv[i + 1];
      if (value === undefined) throw new Error(`${arg} requires a value`);
      i += 1;
      if (arg === '--lang') {
        if (value !== 'en' && value !== 'ar') throw new Error(`--lang must be en or ar, got "${value}"`);
        parsed.lang = value;
      } else {
        if (!['msa', 'egt', 'shami'].includes(value)) {
          throw new Error(`--variety must be msa, egt or shami, got "${value}"`);
        }
        parsed.variety = value;
      }
      continue;
    }
    const eq = /^--(lang|variety)=(.*)$/.exec(arg);
    if (eq) {
      argv.splice(i + 1, 0, eq[2]);
      argv[i] = `--${eq[1]}`;
      i -= 1;
      continue;
    }
    if (arg.startsWith('--')) throw new Error(`unknown option "${arg}"`);
    if (parsed.file !== null) throw new Error('only one input file may be given');
    parsed.file = arg;
  }
  if (parsed.file === null && !parsed.help) throw new Error('no input file given (use - for stdin)');
  return parsed;
}

function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

function readInput(file) {
  if (file === '-') return stripBom(fs.readFileSync(0, 'utf8'));
  return stripBom(fs.readFileSync(file, 'utf8'));
}

function main(argv) {
  let args;
  try {
    args = parseArgs(argv.slice());
  } catch (err) {
    process.stderr.write(`detect.js: ${err.message}\n${USAGE}\n`);
    return 2;
  }
  if (args.help) {
    process.stdout.write(`${USAGE}\n`);
    return 0;
  }

  let text;
  try {
    text = readInput(args.file);
  } catch (err) {
    process.stderr.write(`detect.js: cannot read ${args.file === '-' ? 'stdin' : args.file}: ${err.message}\n`);
    return 2;
  }

  const result = analyze(text, {
    lang: args.lang,
    variety: args.variety,
    markdown: args.markdown,
  });

  if (args.json) {
    process.stdout.write(`${JSON.stringify({ lang: result.lang, ...result }, null, 2)}\n`);
  } else {
    process.stdout.write(renderReport(text, result, args.file === '-' ? '<stdin>' : args.file));
  }
  return 0;
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = { analyze, renderReport, lineCol, lineIndex, main };
