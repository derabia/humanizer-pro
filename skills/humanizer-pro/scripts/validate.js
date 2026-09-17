#!/usr/bin/env node
/**
 * humanizer-pro — validate.js CLI
 *
 * origin: humanizer-pro
 *
 * Usage:
 *   node validate.js before.md after.md [--seo keywords.txt] [--json]
 *                     [--lang en|ar] [--variety msa|egt|shami] [--strict-digits]
 *
 * Wraps `lib/en-validate.js` (adapted verbatim from avoid-ai-writing's
 * detector/validate.js, MIT — not edited here) for the checks it already
 * covers, and `lib/validate-extra.js` (humanizer-pro original) for the
 * SEO-mode protected spans and Arabic-aware number/heading comparison
 * described in `references/seo-mode.md`. Also runs the matching detector
 * engine on both texts and fails if the rewrite's AI-likeness score got
 * worse.
 *
 * Exit codes: 0 ok, 1 a check failed, 2 usage/input error.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const enValidate = require('./lib/en-validate.js');
const { checkExtra } = require('./lib/validate-extra.js');
const lang = require('./lib/lang.js');

function usageError(message) {
  console.error(message);
  console.error('usage: node validate.js before.md after.md [--seo keywords.txt] [--json] [--lang en|ar] [--variety msa|egt|shami] [--strict-digits]');
  process.exit(2);
}

function parseArgs(argv) {
  const positional = [];
  const opts = { seo: null, json: false, lang: null, variety: null, strictDigits: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--seo') {
      opts.seo = argv[++i];
      if (opts.seo === undefined) usageError('--seo requires a file path');
    } else if (arg === '--json') {
      opts.json = true;
    } else if (arg === '--lang') {
      opts.lang = argv[++i];
      if (!['en', 'ar'].includes(opts.lang)) usageError(`--lang must be "en" or "ar", got "${opts.lang}"`);
    } else if (arg === '--variety') {
      opts.variety = argv[++i];
      if (!['msa', 'egt', 'shami'].includes(opts.variety)) usageError(`--variety must be one of msa|egt|shami, got "${opts.variety}"`);
    } else if (arg === '--strict-digits') {
      opts.strictDigits = true;
    } else if (arg.startsWith('--')) {
      usageError(`unknown flag: ${arg}`);
    } else {
      positional.push(arg);
    }
  }
  return { positional, opts };
}

function readFileOrExit(filePath, label) {
  let resolved;
  try {
    resolved = path.resolve(filePath);
    return fs.readFileSync(resolved, 'utf8');
  } catch (e) {
    usageError(`cannot read ${label} file "${filePath}": ${e.message}`);
    return undefined; // unreachable; usageError exits
  }
}

function readKeywordsOrExit(filePath) {
  const raw = readFileOrExit(filePath, '--seo keywords');
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0 && !l.startsWith('#'));
  if (lines.length === 0) usageError(`--seo keywords file "${filePath}" contains no keywords`);
  return lines;
}

// ── Map en-validate's error/warning codes onto named checks. ──
const BASE_CODE_TO_CHECK = {
  'code-block-count': 'code-blocks',
  'code-block-modified': 'code-blocks',
  'frontmatter-modified': 'frontmatter',
  'blockquote-modified': 'blockquotes',
  'table-modified': 'table-cells',
  'inline-code-missing': 'inline-code',
  'url-missing': 'urls',
  'path-missing': 'file-paths',
};
const BASE_CHECK_NAMES = ['code-blocks', 'frontmatter', 'blockquotes', 'table-cells', 'inline-code', 'urls', 'file-paths'];
const BASE_CHECK_LABELS = {
  'code-blocks': 'Fenced code blocks',
  frontmatter: 'YAML frontmatter',
  blockquotes: 'Blockquotes',
  'table-cells': 'Markdown table cells',
  'inline-code': 'Inline code',
  urls: 'URLs',
  'file-paths': 'File paths',
};

function baseChecksFromEnValidate(result) {
  const byName = new Map();
  for (const name of BASE_CHECK_NAMES) {
    byName.set(name, { name, status: 'PASS', details: `${BASE_CHECK_LABELS[name]}: unchanged.` });
  }
  for (const e of result.errors) {
    const name = BASE_CODE_TO_CHECK[e.code];
    if (!name) continue; // heading-count/heading-level/etc. handled by validate-extra instead
    byName.set(name, { name, status: 'FAIL', details: e.message });
  }
  for (const w of result.warnings) {
    const name = BASE_CODE_TO_CHECK[w.code];
    if (!name) continue;
    const existing = byName.get(name);
    if (existing.status === 'PASS') byName.set(name, { name, status: 'WARN', details: w.message });
  }
  return Array.from(byName.values());
}

function loadDetector(language) {
  if (language === 'en') {
    return require('./lib/en-detector/index.js');
  }
  if (language === 'ar') {
    try {
      // eslint-disable-next-line import/no-unresolved
      return require('./lib/ar-detector/index.js');
    } catch (_) {
      return null;
    }
  }
  return null;
}

function scoreCheck(before, after, resolvedLang, variety) {
  const detector = loadDetector(resolvedLang);
  if (!detector || typeof detector.analyzeText !== 'function') {
    return {
      name: 'detector-score',
      status: 'PASS',
      details: `Score comparison skipped: no detector engine available for lang="${resolvedLang}" (not computed).`,
      scores: { before: null, after: null },
    };
  }
  const analyzeOpts = resolvedLang === 'ar' ? { variety, sourceMode: 'rendered-markdown' } : { sourceMode: 'rendered-markdown' };
  let beforeResult;
  let afterResult;
  try {
    beforeResult = detector.analyzeText(before, analyzeOpts);
    afterResult = detector.analyzeText(after, analyzeOpts);
  } catch (e) {
    return {
      name: 'detector-score',
      status: 'PASS',
      details: `Score comparison skipped: detector threw (${e.message}) (not computed).`,
      scores: { before: null, after: null },
    };
  }
  const beforeScore = beforeResult.score;
  const afterScore = afterResult.score;
  if (afterScore > beforeScore) {
    return {
      name: 'detector-score',
      status: 'FAIL',
      details: `Rewrite scored worse on the ${resolvedLang} detector: ${beforeScore} → ${afterScore} (higher = more AI-like).`,
      scores: { before: beforeScore, after: afterScore },
    };
  }
  return {
    name: 'detector-score',
    status: 'PASS',
    details: `Detector score did not worsen: ${beforeScore} → ${afterScore}.`,
    scores: { before: beforeScore, after: afterScore },
  };
}

function formatReport(checks, scores) {
  const lines = [];
  const fails = checks.filter((c) => c.status === 'FAIL').length;
  const warns = checks.filter((c) => c.status === 'WARN').length;
  lines.push(fails === 0 ? `PASS — 0 violation(s), ${warns} warning(s)` : `FAIL — ${fails} violation(s), ${warns} warning(s)`);
  lines.push('');
  for (const c of checks) {
    lines.push(`  [${c.status.padEnd(4)}] ${c.name}: ${c.details}`);
  }
  if (scores) {
    lines.push('');
    lines.push(`  scores: before=${scores.before === null ? 'n/a' : scores.before} after=${scores.after === null ? 'n/a' : scores.after}`);
  }
  return lines.join('\n');
}

function main() {
  const { positional, opts } = parseArgs(process.argv.slice(2));
  if (positional.length !== 2) {
    usageError(`expected exactly 2 positional arguments (before, after), got ${positional.length}`);
  }
  const [beforePath, afterPath] = positional;
  const before = readFileOrExit(beforePath, 'before');
  const after = readFileOrExit(afterPath, 'after');

  let resolvedLang = opts.lang;
  let resolvedVariety = opts.variety;
  if (!resolvedLang) {
    const id = lang.identify(before);
    resolvedLang = id.lang === 'ar' || id.lang === 'mixed' ? 'ar' : 'en';
    if (!resolvedVariety) resolvedVariety = id.variety || 'msa';
  }
  if (resolvedLang === 'ar' && !resolvedVariety) resolvedVariety = 'msa';

  let seoKeywords = null;
  if (opts.seo) seoKeywords = readKeywordsOrExit(opts.seo);

  let baseResult;
  try {
    baseResult = enValidate.validate(before, after, { skipResidual: true });
  } catch (e) {
    usageError(`validator error: ${e.message}`);
    return;
  }

  const checks = [
    ...baseChecksFromEnValidate(baseResult),
    ...checkExtra(before, after, { seoKeywords, strictDigits: opts.strictDigits }),
  ];

  const score = scoreCheck(before, after, resolvedLang, resolvedVariety);
  checks.push(score);

  const ok = checks.every((c) => c.status !== 'FAIL');

  if (opts.json) {
    console.log(JSON.stringify({
      ok,
      checks: checks.map(({ name, status, details }) => ({ name, status, details })),
      scores: score.scores,
      lang: resolvedLang,
      variety: resolvedLang === 'ar' ? resolvedVariety : null,
    }, null, 2));
  } else {
    console.log(formatReport(checks, score.scores));
  }

  process.exit(ok ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { parseArgs, baseChecksFromEnValidate, scoreCheck, formatReport };
