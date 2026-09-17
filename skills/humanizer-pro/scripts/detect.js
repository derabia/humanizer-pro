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
// Arabic display names for the register-mix note (detect.js only knows
// egt/shami as candidate ids; ar-detector's own dialect names live in
// lexicons.js issue text, this is just for the summary line).
const DIALECT_LABEL_AR = { egt: 'العامية المصرية', shami: 'العامية الشامية' };
const DIALECT_LABEL_EN = { egt: 'Egyptian', shami: 'Levantine' };

/**
 * Register-mix check — auto-routing only (never when the caller forced
 * --lang/--variety).
 *
 * ar-egyptian.md Category 1, "Register Collapse — AI Defaults to MSA": an
 * AI asked to write Egyptian/Levantine text frequently produces text that
 * is, on the surface, close to 100% MSA vocabulary — no dialect function
 * words to route on at all. lib/lang.js's `identify()` therefore picks
 * 'msa' with EMPTY (or weak) dialectEvidence for these documents.
 *
 * GATE 1 — dialect intent (lexical). Promotion may only be CONSIDERED for a
 * variety the text itself gives some lexical evidence of:
 *   dialectEvidence[variety].distinct >= 2
 *   OR (dialectEvidence[variety].distinct >= 1 AND dialectEvidence[variety].hits >= 3)
 * A bare MSA text with, say, one stray hedge phrase or one incidental
 * dialect-looking word gives NEITHER msa's own P0/P1 issues NOR lexical
 * evidence any standing to promote a dialect — this is exactly the false
 * positive documented in tests/detect-autoroute.test.js (a single hedge
 * phrase inserted into a clean human MSA fixture must never flip the
 * verdict to AI). When no variety clears this gate, the check still runs
 * (so a caller can see the comparison) but never promotes: stats.registerMix
 * is attached with promoted:false and score/label are left as msa's own.
 *
 * GATE 2 — even for a variety that clears gate 1, promotion additionally
 * requires:
 *   (a) the dialect analysis's FULL score >= THRESHOLDS.AI, and
 *   (b) the dialect analysis's score EXCLUDING msa-leakage-type issues
 *       (ar-detector's stats.scoreWithoutLeakage) >= THRESHOLDS.MIXED.
 * Rationale for (b): msaLeakage fires almost identically regardless of
 * which dialect lexicon is forced against near-pure-MSA text (verified:
 * forcing 'egt' or 'shami' on register-collapsed AI fixtures both score
 * high on msaLeakage alone) — leakage by itself is not evidence the DOCUMENT
 * was meant as that dialect, only that it isn't cleanly that dialect. A
 * dialect verdict must be backed by real non-leakage signal (transitions,
 * uniform rhythm, hedges, etc. scored under that variety), not leakage
 * alone.
 *
 * When lexical evidence (gate 1) names exactly one variety, only that
 * variety is analyzed. When both egt and shami clear gate 1 (rare), both are
 * tried and the higher full-score dialect wins the comparison, subject to
 * gate 2.
 *
 * stats.registerMix is attached whenever this check finds ANY dialect with
 * lexical evidence to compare against msa, whether or not it ends up
 * promoting — `promoted` records the outcome explicitly.
 */
function registerMixCheck(text, sourceMode, msaAnalysis, dialectEvidence) {
  if (msaAnalysis.score >= arDetector.THRESHOLDS.AI) return null; // already conclusive as msa

  // Whether to even RUN the comparison: msa's own verdict was non-trivial
  // (P0/P1 issue, e.g. register-collapsed AI text tripping generic AR-MSA-*
  // tells), OR there is at least SOME lexical dialect evidence (possibly too
  // weak to promote on its own — that is gate 1 below). Neither present ->
  // nothing points at register collapse or a dialect at all.
  const hasP01 = msaAnalysis.issues.some((i) => i.severity === 'P0' || i.severity === 'P1');
  const lexicalCandidates = dialectEvidence
    ? Object.entries(dialectEvidence).filter(([, ev]) => ev.distinct >= 1).map(([variety]) => variety)
    : [];
  if (!hasP01 && lexicalCandidates.length === 0) return null;

  // When lexical evidence names specific varieties, only those are tried.
  // Otherwise (hasP01 only, no lexical evidence at all) both are tried as a
  // guess for the COMPARISON note — but per gate 1 below such a guess can
  // never be promoted, since it carries no lexical evidence either.
  const candidates = lexicalCandidates.length ? lexicalCandidates : ['egt', 'shami'];
  let best = null;
  for (const variety of candidates) {
    const dialectAnalysis = arDetector.analyzeText(text, { variety, sourceMode });
    if (!best || dialectAnalysis.score > best.analysis.score) {
      best = { variety, analysis: dialectAnalysis };
    }
  }

  const noteAr = `النص يخلط بين الفصحى و${DIALECT_LABEL_AR[best.variety]}؛ إن كان المقصود ${DIALECT_LABEL_AR[best.variety]} فهذا تسرّب فصحى`;
  const noteEn = `Text mixes MSA and ${DIALECT_LABEL_EN[best.variety]} markers; if the intended variety is ${DIALECT_LABEL_EN[best.variety]}, MSA leakage is P0`;

  // GATE 1 — dialect intent: the winning variety itself must show real
  // lexical evidence, not just "it scored highest of two guesses" or msa's
  // own P0/P1 issues (which say nothing about which dialect, if any, was
  // intended).
  const bestEvidence = (dialectEvidence && dialectEvidence[best.variety]) || { distinct: 0, hits: 0 };
  const passesDialectIntent = bestEvidence.distinct >= 2 || (bestEvidence.distinct >= 1 && bestEvidence.hits >= 3);

  // GATE 2 — even with dialect intent, leakage alone must never carry an AI
  // verdict: the dialect analysis's score with msa-leakage issues excluded
  // must independently clear THRESHOLDS.MIXED, and the full score must
  // clear THRESHOLDS.AI and outscore msa.
  const scoreWithoutLeakage = best.analysis.stats.scoreWithoutLeakage;
  const promote =
    passesDialectIntent
    && best.analysis.score > msaAnalysis.score
    && best.analysis.score >= arDetector.THRESHOLDS.AI
    && scoreWithoutLeakage >= arDetector.THRESHOLDS.MIXED;

  const registerMix = {
    msaScore: msaAnalysis.score,
    dialectScore: best.analysis.score,
    scoreWithoutLeakage,
    variety: best.variety,
    promoted: promote,
    note: noteAr,
    noteEn,
  };

  return { promote, variety: best.variety, analysis: best.analysis, registerMix };
}

function analyze(text, opts) {
  const options = opts || {};
  const sourceMode = options.markdown ? 'rendered-markdown' : 'plain';

  const override = {};
  if (options.lang) override.lang = options.lang;
  if (options.variety) {
    override.variety = options.variety;
    if (!override.lang) override.lang = 'ar';
  }
  const isAutoRouted = Object.keys(override).length === 0;

  const id = isAutoRouted
    ? lang.identify(text)
    : lang.identify(text, { override: { lang: override.lang, variety: override.variety || null } });

  const useArabic = id.lang === 'ar' || id.lang === 'mixed';

  if (useArabic) {
    const variety = options.variety || id.variety || 'msa';
    const analysis = arDetector.analyzeText(text, { variety, sourceMode });

    if (isAutoRouted && variety === 'msa') {
      const mix = registerMixCheck(text, sourceMode, analysis, id.dialectEvidence);
      if (mix) {
        const primary = mix.promote ? mix.analysis : analysis;
        primary.stats.registerMix = mix.registerMix;
        return {
          lang: id.lang,
          variety: mix.promote ? mix.variety : variety,
          confidence: id.confidence,
          engine: 'ar',
          arabicRatio: id.arabicRatio,
          ...primary,
        };
      }
    }

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
    if (s.registerMix) {
      out.push(`register-mix: msa ${s.registerMix.msaScore} vs ${s.registerMix.variety} ${s.registerMix.dialectScore}`);
      out.push(`              ${s.registerMix.note}`);
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
