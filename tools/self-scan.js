#!/usr/bin/env node
/**
 * humanizer-pro — self-scan of our own prose (IMP-20)
 *
 * origin: humanizer-pro. Node >= 18, CommonJS, zero npm dependencies.
 *
 * Runs `detect.js`'s `analyze()` (rendered-markdown source mode) over the
 * project's own doctrine and documentation files, twice per file:
 *
 *   raw score      — the file exactly as it sits on disk.
 *   adjusted score — the same file with every fenced code block, every
 *                    table row that quotes a before/after example, and every
 *                    line naming one wrapped in
 *                    `<!-- humanizer:ignore -->` markers (IMP-20's ignore
 *                    regions, applied here rather than reimplemented) before
 *                    scoring. Doctrine files (ar-egyptian.md, en-patterns.md,
 *                    etc.) deliberately quote bad, AI-sounding examples as
 *                    "here is what NOT to write" — the raw score is noisy by
 *                    design; the adjusted score is the signal this tool
 *                    tracks for regressions.
 *
 * Files scanned (fixed list, engine-agnostic, doc prose only):
 *   README.md, CREDITS.md, CHANGELOG.md, skills/humanizer-pro/SKILL.md,
 *   skills/humanizer-pro/references/*.md, docs/*.md (top-level only, no
 *   subdirectories — docs/competitors/, docs/evidence/, etc. are not prose
 *   doctrine and are excluded).
 *
 * Usage
 * -----
 *   node tools/self-scan.js                 # table to stdout
 *   node tools/self-scan.js --json           # machine-readable
 *   node tools/self-scan.js --update-budgets # rewrite self-scan-budgets.json
 *
 * Exit codes: 0 when every file's adjusted score is at or under its budget,
 * 1 when any file exceeds its budget, 2 on a setup error (unreadable file,
 * corrupt budgets file).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const { analyze } = require(path.join(ROOT, 'skills', 'humanizer-pro', 'scripts', 'detect.js'));
// Both overridable via environment variable, for tests only: the default,
// used in every normal invocation (including `npm run self-scan`), is the
// fixed project file list against tools/self-scan-budgets.json.
const BUDGETS_PATH = process.env.SELF_SCAN_BUDGETS_PATH
  ? path.resolve(process.env.SELF_SCAN_BUDGETS_PATH)
  : path.join(__dirname, 'self-scan-budgets.json');

// ─────────────────────────────────────────────────────────────────────────
// File selection
// ─────────────────────────────────────────────────────────────────────────

function referencesFiles() {
  const dir = path.join(ROOT, 'skills', 'humanizer-pro', 'references');
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => path.join('skills', 'humanizer-pro', 'references', f));
}

function docsTopLevelFiles() {
  const dir = path.join(ROOT, 'docs');
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.md'))
    .map((e) => e.name)
    .sort()
    .map((f) => path.join('docs', f));
}

function scanTargets() {
  // Test-only override: a comma-separated list of absolute file paths, so
  // tests can exercise the CLI's real exit-code/budget logic against a
  // throwaway file instead of the project's own doctrine files.
  if (process.env.SELF_SCAN_TARGETS) {
    return process.env.SELF_SCAN_TARGETS.split(',').filter(Boolean);
  }
  return [
    'README.md',
    'CREDITS.md',
    'CHANGELOG.md',
    path.join('skills', 'humanizer-pro', 'SKILL.md'),
    ...referencesFiles(),
    ...docsTopLevelFiles(),
  ];
}

// ─────────────────────────────────────────────────────────────────────────
// Exemption wrapping — wrap deliberately-bad quoted examples in ignore
// regions so IMP-20's own masking (detect.js's `analyze()`) suppresses them.
// ─────────────────────────────────────────────────────────────────────────

const TRIGGER_RE = /Before:|After:|❌|✓|قبل:|بعد:/;
const TABLE_ROW_RE = /^\s*\|\s?/;

/** Fenced code block ranges: ``` or ~~~ opener through the matching closer. */
function fencedCodeRanges(text) {
  const ranges = [];
  const re = /^([ \t]*)(`{3,}|~{3,})[^\n]*\r?\n[\s\S]*?^\1\2[ \t]*$/gm;
  let m;
  while ((m = re.exec(text)) !== null) {
    ranges.push([m.index, m.index + m[0].length]);
    if (re.lastIndex === m.index) re.lastIndex += 1; // guard against zero-width loops
  }
  return ranges;
}

/**
 * Lines that quote a deliberate bad/good example: a `| ` table row that
 * mentions ❌/✓/Before/After, or any line containing one of the trigger
 * strings (English or Arabic before/after markers).
 */
function exemptLineRanges(text, skipRanges) {
  const ranges = [];
  let offset = 0;
  const lines = text.split('\n');
  for (const line of lines) {
    const start = offset;
    const end = offset + line.length;
    const isTableRow = TABLE_ROW_RE.test(line) && TRIGGER_RE.test(line);
    const isTriggerLine = TRIGGER_RE.test(line);
    if (isTableRow || isTriggerLine) {
      const insideSkip = skipRanges.some(([s, e]) => start >= s && end <= e);
      if (!insideSkip) ranges.push([start, end]);
    }
    offset = end + 1; // +1 for the '\n' the split ate
  }
  return ranges;
}

function mergeRanges(ranges) {
  const sorted = ranges.slice().sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const r of sorted) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push(r.slice());
  }
  return merged;
}

function wrapRanges(text, ranges) {
  let out = text;
  for (let i = ranges.length - 1; i >= 0; i -= 1) {
    const [s, e] = ranges[i];
    out = `${out.slice(0, s)}<!-- humanizer:ignore -->${out.slice(s, e)}<!-- /humanizer:ignore -->${out.slice(e)}`;
  }
  return out;
}

function buildAdjustedText(text) {
  const fenced = fencedCodeRanges(text);
  const exempt = exemptLineRanges(text, fenced);
  const ranges = mergeRanges([...fenced, ...exempt]);
  return wrapRanges(text, ranges);
}

// ─────────────────────────────────────────────────────────────────────────
// Scoring
// ─────────────────────────────────────────────────────────────────────────

function scoreFile(relPath) {
  const abs = path.isAbsolute(relPath) ? relPath : path.join(ROOT, relPath);
  const label = path.isAbsolute(relPath) ? relPath.split(path.sep).join('/') : relPath.split(path.sep).join('/');
  const text = fs.readFileSync(abs, 'utf8');
  const raw = analyze(text, { markdown: true });
  const adjustedText = buildAdjustedText(text);
  const adjusted = analyze(adjustedText, { markdown: true });
  return { file: label, rawScore: raw.score, adjustedScore: adjusted.score };
}

function roundUpToMultipleOf5(n) {
  return Math.ceil(n / 5) * 5;
}

function loadBudgets() {
  try {
    const raw = fs.readFileSync(BUDGETS_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    process.stderr.write(`self-scan: could not read ${path.relative(ROOT, BUDGETS_PATH)}: ${err.message}\n`);
    process.exit(2);
  }
  return {};
}

function saveBudgets(budgets) {
  const ordered = {};
  for (const key of Object.keys(budgets).sort()) ordered[key] = budgets[key];
  fs.writeFileSync(BUDGETS_PATH, `${JSON.stringify(ordered, null, 2)}\n`, 'utf8');
}

// ─────────────────────────────────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const opts = { json: false, updateBudgets: false };
  for (const a of argv) {
    if (a === '--json') opts.json = true;
    else if (a === '--update-budgets') opts.updateBudgets = true;
    else {
      process.stderr.write(`self-scan: unknown flag ${a}\n`);
      process.exit(2);
    }
  }
  return opts;
}

function formatTable(rows) {
  const header = ['file', 'raw score', 'adjusted score', 'budget', 'status'];
  const lines = rows.map((r) => [
    r.file,
    String(r.rawScore),
    String(r.adjustedScore),
    String(r.budget),
    r.status,
  ]);
  const widths = header.map((h, i) => Math.max(h.length, ...lines.map((l) => l[i].length)));
  const fmt = (cols) => cols.map((c, i) => c.padEnd(widths[i])).join('  ');
  const out = [fmt(header), fmt(widths.map((w) => '-'.repeat(w)))];
  for (const l of lines) out.push(fmt(l));
  return out.join('\n');
}

function main(argv) {
  const opts = parseArgs(argv);
  const budgets = loadBudgets();
  const targets = scanTargets();

  const results = targets.map((relPath) => {
    const { file, rawScore, adjustedScore } = scoreFile(relPath);
    const budget = Object.prototype.hasOwnProperty.call(budgets, file) ? budgets[file] : null;
    const over = budget !== null && adjustedScore > budget;
    return {
      file,
      rawScore,
      adjustedScore,
      budget: budget === null ? 'unset' : budget,
      status: budget === null ? 'NO BUDGET' : (over ? 'OVER' : 'ok'),
      over,
      missingBudget: budget === null,
    };
  });

  if (opts.updateBudgets) {
    const next = {};
    for (const r of results) next[r.file] = roundUpToMultipleOf5(r.adjustedScore);
    saveBudgets(next);
    for (const r of results) r.budget = next[r.file];
    for (const r of results) { r.status = 'ok'; r.over = false; r.missingBudget = false; }
  }

  const anyOver = results.some((r) => r.over || r.missingBudget);

  if (opts.json) {
    process.stdout.write(`${JSON.stringify({
      results: results.map(({ file, rawScore, adjustedScore, budget, status }) => (
        { file, rawScore, adjustedScore, budget, status }
      )),
      updatedBudgets: opts.updateBudgets,
      exitCode: anyOver ? 1 : 0,
    }, null, 2)}\n`);
  } else {
    process.stdout.write(`${formatTable(results)}\n`);
    if (opts.updateBudgets) {
      process.stdout.write(`\nwrote ${path.relative(ROOT, BUDGETS_PATH)}\n`);
    }
    if (anyOver) {
      process.stdout.write('\nself-scan: one or more files exceed their adjusted-score budget\n');
    }
  }

  return anyOver ? 1 : 0;
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = {
  scanTargets,
  scoreFile,
  buildAdjustedText,
  fencedCodeRanges,
  exemptLineRanges,
  mergeRanges,
  roundUpToMultipleOf5,
  main,
};
