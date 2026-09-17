#!/usr/bin/env node
/**
 * humanizer-pro — detect.js
 *
 * origin: humanizer-pro
 *
 * Usage:
 *   node detect.js <file|-> [--lang en|ar] [--variety msa|egt|shami]
 *                           [--register default|formal]
 *                           [--json] [--markdown]
 *
 *   <file>      path to a UTF-8 text/Markdown file
 *   -           read the document from stdin
 *   --lang      force the engine instead of auto-detecting
 *   --variety   force the Arabic variety (implies the Arabic engine)
 *   --register  threshold profile for the Arabic engine (IMP-13); 'formal'
 *               relaxes the sentence-rhythm gate only. Accepted but inert for
 *               the English engine, and always echoed in stats.register.
 *   --json      print the raw analysis object plus { lang }
 *   --markdown  analyse as rendered Markdown (sourceMode:'rendered-markdown')
 *
 * Exit codes: 0 always, except 2 for an input error (missing file, unreadable
 * stdin, unknown flag). A detection result is never an error.
 *
 * Also exported for programmatic use:
 *   analyze(text, opts) -> { lang, variety, confidence, engine,
 *                            authorshipClaim, calibration, engineVersion,
 *                            groups, ...analysis }
 *
 * LABELLING CONTRACT (IMP-14)
 * ---------------------------
 * Every result -- programmatic or `--json` -- carries three fields that make
 * the epistemic status of `score` explicit and machine-readable:
 *
 *   authorshipClaim: false      always false. This tool never claims to know
 *                               who or what wrote a document.
 *   calibration:     string     'uncalibrated-review-signal' for the Arabic
 *                               engine. The English engine's own calibration
 *                               note is used when it exposes one; it does
 *                               not today (its class_probabilities are, by
 *                               its own comment, not calibrated against a
 *                               labeled corpus) so it gets the same label.
 *   engineVersion:   string     git short SHA of the working tree, read at
 *                               runtime; falls back to 'v<package.json
 *                               version>' when git is unavailable (installed
 *                               skill, exported zip), then to 'unknown'.
 *
 * These are ADDITIVE. No existing field was renamed or removed. The readable
 * report prints one matching line:
 *   note: score is a review signal, not an authorship claim
 *
 * GROUPING AND COVERAGE (IMP-10)
 * ------------------------------
 * Post-processing, engine-agnostic: see `groupIssues` / `postProcess` below.
 *
 * IGNORE REGIONS (IMP-20)
 * ------------------------
 * Pre-processing, engine-agnostic: see `maskIgnoreRegions` below. Text between
 * `<!-- humanizer:ignore -->`/`<!-- /humanizer:ignore -->` (or
 * `<!-- humanizer-ignore-start -->`/`<!-- humanizer-ignore-end -->`) markers
 * is replaced with spaces of identical length before either engine runs, so
 * no issue can start inside the region and every other issue keeps its exact
 * original offset. `stats.ignoredRegions` / `stats.ignoredCharCount` report
 * what was masked; an unclosed opener adds `warnings: ['unclosed ignore region']`.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

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
function registerMixCheck(text, sourceMode, msaAnalysis, dialectEvidence, register) {
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
    const dialectAnalysis = arDetector.analyzeText(text, { variety, sourceMode, register });
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

// == Labelling (IMP-14) ====================================================

const AUTHORSHIP_CLAIM = false;
const AR_CALIBRATION = 'uncalibrated-review-signal';
const REVIEW_SIGNAL_NOTE = 'score is a review signal, not an authorship claim';

/**
 * Calibration label for an engine. The English engine is asked for its own
 * note first (`enDetector.CALIBRATION`); it does not publish one today -- its
 * `class_probabilities` are, by its own comment, "not calibrated against a
 * labeled corpus" -- so it receives the same uncalibrated label.
 */
function calibrationFor(engine) {
  if (engine === 'en' && typeof enDetector.CALIBRATION === 'string' && enDetector.CALIBRATION) {
    return enDetector.CALIBRATION;
  }
  return AR_CALIBRATION;
}

let ENGINE_VERSION_CACHE;

/**
 * engineVersion() -> 'abc1234' | 'v0.1.0' | 'unknown'
 *
 * Read once per process. `git rev-parse --short HEAD` runs with this file's
 * directory as cwd so it resolves the repository this file lives in, with
 * stdio piped (a git error must never reach the caller's stderr). When git is
 * unavailable -- no binary, not a repository, an installed skill, an exported
 * zip -- the package.json version is used, prefixed 'v' so the two shapes are
 * never confused. If neither is readable the value is 'unknown'; the field is
 * always present and always a string.
 *
 * A git answer is only trusted when `git rev-parse --show-toplevel` names a
 * humanizer-pro checkout. An installed skill can live inside an unrelated
 * repository (a dotfiles repo under ~/.claude, say), and a SHA from that repo
 * would be actively misleading rather than merely absent.
 *
 * Note: `tools/build-zip.js` archives only `skills/humanizer-pro/`, so the
 * exported zip carries no package.json. A skill installed from that zip,
 * outside a humanizer-pro checkout, therefore reports 'unknown'.
 */
function engineVersion() {
  if (ENGINE_VERSION_CACHE !== undefined) return ENGINE_VERSION_CACHE;
  try {
    const git = (args) => childProcess.execFileSync('git', args, {
      cwd: __dirname,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 5000,
    }).trim();
    // An installed skill can sit inside SOMEONE ELSE'S repository (a dotfiles
    // repo under ~/.claude, for instance). git would answer happily with a
    // SHA that has nothing to do with this engine, which is worse than no
    // answer at all — so the repository is only trusted when it is a
    // humanizer-pro checkout, i.e. it contains this very script at its
    // canonical path.
    const toplevel = git(['rev-parse', '--show-toplevel']);
    const marker = path.join(toplevel, 'skills', 'humanizer-pro', 'scripts', 'detect.js');
    if (toplevel && fs.existsSync(marker)) {
      const sha = git(['rev-parse', '--short', 'HEAD']);
      if (/^[0-9a-f]{4,40}$/.test(sha)) {
        ENGINE_VERSION_CACHE = sha;
        return ENGINE_VERSION_CACHE;
      }
    }
  } catch (_) { /* fall through to package.json */ }
  for (const up of ['..', '../..', '../../..', '../../../..']) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, up, 'package.json'), 'utf8'));
      if (pkg && typeof pkg.version === 'string' && pkg.version) {
        ENGINE_VERSION_CACHE = `v${pkg.version}`;
        return ENGINE_VERSION_CACHE;
      }
    } catch (_) { /* try the next level up */ }
  }
  ENGINE_VERSION_CACHE = 'unknown';
  return ENGINE_VERSION_CACHE;
}

// == Grouping and coverage (IMP-10) ========================================

const GROUP_SEVERITY_RANK = { P0: 4, P1: 3, P2: 2, P3: 1 };

/**
 * issueSpan(issue, engine) -> [start, end] | null
 *
 * Engine-agnostic span extraction. The Arabic engine reports `start`/`end`
 * directly. The English engine reports `index` plus the matched `text`, so the
 * end is derived from the excerpt length. An issue with no usable offset (the
 * English engine emits document-level findings with a null index) returns
 * null: it cannot be placed, so it is neither grouped nor counted towards
 * coverage, and `stats.ungroupedIssueCount` records how many.
 */
function issueSpan(issue, engine) {
  if (engine === 'ar') {
    if (!Number.isInteger(issue.start) || !Number.isInteger(issue.end)) return null;
    return [issue.start, Math.max(issue.start, issue.end)];
  }
  if (!Number.isInteger(issue.index)) return null;
  const len = typeof issue.text === 'string' ? issue.text.length : 0;
  return [issue.index, issue.index + len];
}

function groupSeverityOf(issue, engine) {
  if (engine === 'ar') return issue.severity;
  return enDetector.SEVERITY_LABELS[issue.severity] || 'P2';
}

/**
 * groupIssues(issues, engine) -> { groups, unionLength, ungroupedIssueCount }
 *
 * Issues whose spans OVERLAP or merely TOUCH (previous `end` === next `start`)
 * are merged into one group:
 *
 *   groups: [{ start, end, issueIds: [...], topSeverity }]
 *
 * `issueIds` are zero-based indices into `result.issues`, in document order --
 * the only identifier guaranteed unique per finding (`patternId` repeats
 * whenever a pattern fires more than once).
 *
 * `unionLength` is the sum of the MERGED spans, so two overlapping hits
 * contribute their union exactly once and can never double-count in
 * `stats.affectedCoveragePercent` or in `stats.groupCount`.
 */
function groupIssues(issues, engine) {
  const spans = [];
  let ungroupedIssueCount = 0;
  (issues || []).forEach((issue, id) => {
    const span = issueSpan(issue, engine);
    if (span === null) { ungroupedIssueCount += 1; return; }
    spans.push({ start: span[0], end: span[1], id, severity: groupSeverityOf(issue, engine) });
  });
  spans.sort((a, b) => a.start - b.start || a.end - b.end || a.id - b.id);

  const groups = [];
  for (const span of spans) {
    const last = groups[groups.length - 1];
    // `span.start <= last.end` merges overlapping AND touching ranges.
    if (last && span.start <= last.end) {
      last.end = Math.max(last.end, span.end);
      last.issueIds.push(span.id);
      if ((GROUP_SEVERITY_RANK[span.severity] || 0) > (GROUP_SEVERITY_RANK[last.topSeverity] || 0)) {
        last.topSeverity = span.severity;
      }
      continue;
    }
    groups.push({
      start: span.start,
      end: span.end,
      issueIds: [span.id],
      topSeverity: span.severity,
    });
  }

  for (const g of groups) g.issueIds.sort((a, b) => a - b);
  const unionLength = groups.reduce((acc, g) => acc + (g.end - g.start), 0);
  return { groups, unionLength, ungroupedIssueCount };
}

/**
 * postProcess(text, result) -- adds the IMP-14 labelling fields and the
 * IMP-10 grouping/coverage fields to a raw engine result. Additive only.
 *
 * Coverage denominator: the engine's own scored-character count when it
 * publishes one (the Arabic engine exposes `stats.scoredCharCount`, i.e. total
 * length minus masked URLs, inline code, fences and frontmatter); otherwise
 * the full text length, because the English engine does not publish masked
 * region lengths. `stats.coverageBasis` records which was used.
 */
function postProcess(text, result) {
  const { groups, unionLength, ungroupedIssueCount } = groupIssues(result.issues, result.engine);
  const stats = result.stats && typeof result.stats === 'object' ? result.stats : {};

  const hasScored = Number.isInteger(stats.scoredCharCount) && stats.scoredCharCount > 0;
  const scored = hasScored ? stats.scoredCharCount : text.length;

  stats.groupCount = groups.length;
  stats.affectedCharCount = unionLength;
  stats.coverageBasis = hasScored ? 'scored-chars-excluding-masked' : 'total-chars';
  stats.affectedCoveragePercent = scored > 0
    ? Math.min(100, Math.round((unionLength / scored) * 1000) / 10)
    : 0;
  if (ungroupedIssueCount > 0) stats.ungroupedIssueCount = ungroupedIssueCount;

  return {
    ...result,
    stats,
    groups,
    authorshipClaim: AUTHORSHIP_CLAIM,
    calibration: calibrationFor(result.engine),
    engineVersion: engineVersion(),
  };
}

// == Ignore regions ========================================================
//
// Engine-agnostic pre-processing (IMP-20): text between an opener/closer pair
// is replaced by spaces of identical length (UTF-16 code units) BEFORE either
// engine runs. Because the replacement is length-preserving, every offset the
// engine reports for text outside a region is byte-for-byte identical to what
// it would have reported had the markers never been there, and no issue can
// ever start inside a masked region (there is nothing but spaces to match).
//
// Two marker families are accepted, matched independently -- a
// `<!-- /humanizer:ignore -->` closer only closes a `<!-- humanizer:ignore -->`
// opener, never a `-start`/`-end` one, and vice versa:
//   <!-- humanizer:ignore -->  ...  <!-- /humanizer:ignore -->
//   <!-- humanizer-ignore-start -->  ...  <!-- humanizer-ignore-end -->
//
// An opener with no matching closer masks from the opener to the end of the
// text (better to under-report than to let an unmatched marker leak an AI
// excerpt through), and is recorded in the returned `warnings` array.
const IGNORE_MARKERS = [
  { open: /<!--\s*humanizer:ignore\s*-->/, close: /<!--\s*\/humanizer:ignore\s*-->/ },
  { open: /<!--\s*humanizer-ignore-start\s*-->/, close: /<!--\s*humanizer-ignore-end\s*-->/ },
];

function maskIgnoreRegions(text) {
  let out = text;
  let ignoredRegions = 0;
  let ignoredCharCount = 0;
  const warnings = [];
  let searchFrom = 0;

  while (searchFrom < out.length) {
    let best = null;
    for (const marker of IGNORE_MARKERS) {
      const m = marker.open.exec(out.slice(searchFrom));
      if (m && (!best || searchFrom + m.index < best.idx)) {
        best = { idx: searchFrom + m.index, len: m[0].length, close: marker.close };
      }
    }
    if (!best) break;

    const openEnd = best.idx + best.len;
    const closeMatch = best.close.exec(out.slice(openEnd));
    const regionEnd = closeMatch ? openEnd + closeMatch.index + closeMatch[0].length : out.length;

    out = `${out.slice(0, best.idx)}${' '.repeat(regionEnd - best.idx)}${out.slice(regionEnd)}`;
    ignoredRegions += 1;
    ignoredCharCount += regionEnd - best.idx;

    if (!closeMatch) {
      warnings.push('unclosed ignore region');
      break;
    }
    searchFrom = regionEnd;
  }

  return { text: out, ignoredRegions, ignoredCharCount, warnings };
}

function analyze(text, opts) {
  const raw = typeof text === 'string' ? text : '';
  const masked = maskIgnoreRegions(raw);
  const result = postProcess(raw, analyzeRaw(masked.text, opts));
  result.stats.ignoredRegions = masked.ignoredRegions;
  result.stats.ignoredCharCount = masked.ignoredCharCount;
  if (masked.warnings.length > 0) {
    result.warnings = (result.warnings || []).concat(masked.warnings);
  }
  return result;
}

function analyzeRaw(text, opts) {
  const options = opts || {};
  const sourceMode = options.markdown ? 'rendered-markdown' : 'plain';
  const register = options.register || 'default';

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
    const analysis = arDetector.analyzeText(text, { variety, sourceMode, register });

    if (isAutoRouted && variety === 'msa') {
      const mix = registerMixCheck(text, sourceMode, analysis, id.dialectEvidence, register);
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
  // The English engine has no register profile; echo the requested value so a
  // caller reading stats.register never sees the field silently vanish.
  if (analysis.stats && typeof analysis.stats === 'object' && analysis.stats.register === undefined) {
    analysis.stats.register = register;
  }
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
  out.push(`note:       ${REVIEW_SIGNAL_NOTE}`);
  out.push(`calibration:${result.calibration ? ` ${result.calibration}` : ' n/a'}`
    + `  engine-version ${result.engineVersion || 'unknown'}  authorship-claim ${result.authorshipClaim === true}`);
  if (result.stats) {
    const s = result.stats;
    const bits = [`words ${s.wordCount ?? 0}`];
    if (s.sentenceCount !== undefined) bits.push(`sentences ${s.sentenceCount}`);
    if (s.paragraphCount !== undefined) bits.push(`paragraphs ${s.paragraphCount}`);
    if (s.sourceMode) bits.push(`sourceMode ${s.sourceMode}`);
    if (s.register) bits.push(`register ${s.register}`);
    if (s.tooShort) bits.push('tooShort');
    out.push(`stats:      ${bits.join(', ')}`);
    if (s.groupCount !== undefined) {
      out.push(`coverage:   ${s.groupCount} group(s), `
        + `${s.affectedCoveragePercent}% of scored text affected (${s.coverageBasis})`);
    }
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

const USAGE = 'usage: node detect.js <file|-> [--lang en|ar] [--variety msa|egt|shami] [--register default|formal] [--json] [--markdown]';

function parseArgs(argv) {
  const parsed = { file: null, lang: null, variety: null, register: null, json: false, markdown: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--json') { parsed.json = true; continue; }
    if (arg === '--markdown') { parsed.markdown = true; continue; }
    if (arg === '--help' || arg === '-h') { parsed.help = true; continue; }
    if (arg === '--lang' || arg === '--variety' || arg === '--register') {
      const value = argv[i + 1];
      if (value === undefined) throw new Error(`${arg} requires a value`);
      i += 1;
      if (arg === '--lang') {
        if (value !== 'en' && value !== 'ar') throw new Error(`--lang must be en or ar, got "${value}"`);
        parsed.lang = value;
      } else if (arg === '--register') {
        if (!['default', 'formal'].includes(value)) {
          throw new Error(`--register must be default or formal, got "${value}"`);
        }
        parsed.register = value;
      } else {
        if (!['msa', 'egt', 'shami'].includes(value)) {
          throw new Error(`--variety must be msa, egt or shami, got "${value}"`);
        }
        parsed.variety = value;
      }
      continue;
    }
    const eq = /^--(lang|variety|register)=(.*)$/.exec(arg);
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
    register: args.register || 'default',
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

module.exports = {
  analyze,
  renderReport,
  lineCol,
  lineIndex,
  main,
  // exported for unit testing / reuse by callers that post-process themselves
  groupIssues,
  issueSpan,
  engineVersion,
  AR_CALIBRATION,
  REVIEW_SIGNAL_NOTE,
  maskIgnoreRegions,
};
