/**
 * humanizer-pro — Arabic detector: masking + stylometric signals
 *
 * origin: humanizer-pro
 *
 * Everything in this module works in ORIGINAL string coordinates. Masking
 * replaces excluded characters with U+0020 and keeps the string length and
 * every newline intact, exactly the way lib/en-detector/index.js's
 * `maskRenderedMarkdown` does, so offsets never shift and paragraph/sentence
 * splitting still sees the real line structure.
 */

'use strict';

const { AR_LETTER } = require('./lexicons.js');
const { normalize } = require('../arabic-normalize.js');

const ARABIC_LETTER_RE = new RegExp(`[${AR_LETTER}]`, 'u');

// ═══ Masking ══════════════════════════════════════════════════════════════

function blankRange(chars, start, end) {
  for (let i = start; i < end && i < chars.length; i += 1) {
    if (chars[i] !== '\n' && chars[i] !== '\r') chars[i] = ' ';
  }
}

const URL_RE = /(?:https?:\/\/|www\.)[^\s<>"')\]]+/gu;
const INLINE_CODE_RE = /(`+)(?:(?!\1)[^\n])+\1/gu;
const HTML_COMMENT_RE = /<!--[\s\S]*?(?:-->|$)/gu;

/**
 * Initial YAML frontmatter range, or null. Mirrors the en-detector rule:
 * `---` fence, a closing `---`, and a first substantive line that looks like
 * a YAML mapping key.
 */
function initialFrontmatterRange(text) {
  const lines = [];
  const lineRe = /[^\r\n]*(?:\r\n|\n|\r|$)/g;
  let match;
  while ((match = lineRe.exec(text)) !== null && match[0]) {
    const body = match[0].replace(/(?:\r\n|\n|\r)$/, '');
    lines.push({ body, start: match.index, end: match.index + body.length });
    if (lineRe.lastIndex >= text.length) break;
  }
  if (lines.length < 3) return null;
  if (!/^---[ \t]*$/.test(lines[0].body.replace(/^﻿/, ''))) return null;
  let closing = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (/^---[ \t]*$/.test(lines[i].body)) { closing = i; break; }
  }
  if (closing === -1) return null;
  const yamlKey = /^[ \t]*(?:[A-Za-z0-9_.-]+|"[^"\r\n]+"|'[^'\r\n]+')[ \t]*:/;
  const firstContent = lines
    .slice(1, closing)
    .find((l) => l.body.trim() && !/^[ \t]*#/.test(l.body));
  if (!firstContent || !yamlKey.test(firstContent.body)) return null;
  return { start: 0, end: lines[closing].end };
}

/** Mask fenced code blocks (``` or ~~~), fences included. */
function maskFencedCode(chars) {
  const source = chars.join('');
  const lines = [];
  let offset = 0;
  for (const body of source.split('\n')) {
    lines.push({ body, start: offset, end: offset + body.length });
    offset += body.length + 1;
  }
  let open = null;
  let masked = 0;
  for (const line of lines) {
    const fence = /^[ \t]{0,3}(`{3,}|~{3,})(.*)$/.exec(line.body);
    if (open) {
      blankRange(chars, line.start, line.end);
      if (fence && fence[1][0] === open.char && fence[1].length >= open.length && /^[ \t]*\r?$/.test(fence[2])) {
        open = null;
      }
    } else if (fence) {
      open = { char: fence[1][0], length: fence[1].length };
      masked += 1;
      blankRange(chars, line.start, line.end);
    }
  }
  return masked;
}

function maskByRegex(chars, re) {
  const source = chars.join('');
  let count = 0;
  let m;
  re.lastIndex = 0;
  while ((m = re.exec(source)) !== null) {
    if (m[0].length === 0) { re.lastIndex += 1; continue; }
    blankRange(chars, m.index, m.index + m[0].length);
    count += 1;
  }
  return count;
}

/**
 * mask(text, sourceMode) -> { masked, stats }
 *
 * Always masked (both modes): URLs and inline code spans — the engine must
 * never flag inside either.
 * Masked only in 'rendered-markdown': initial YAML frontmatter, HTML
 * comments, fenced code blocks.
 */
function mask(text, sourceMode) {
  const chars = text.split('');
  const stats = {
    maskedFrontmatter: 0,
    maskedHtmlComments: 0,
    maskedCodeFences: 0,
    maskedUrls: 0,
    maskedInlineCode: 0,
  };

  if (sourceMode === 'rendered-markdown') {
    const fm = initialFrontmatterRange(text);
    if (fm) {
      blankRange(chars, fm.start, fm.end);
      stats.maskedFrontmatter = 1;
    }
    stats.maskedHtmlComments = maskByRegex(chars, HTML_COMMENT_RE);
    stats.maskedCodeFences = maskFencedCode(chars);
  }

  stats.maskedUrls = maskByRegex(chars, URL_RE);
  stats.maskedInlineCode = maskByRegex(chars, INLINE_CODE_RE);

  return { masked: chars.join(''), stats };
}

// ═══ Segmentation ═════════════════════════════════════════════════════════

/** Words = whitespace-separated tokens containing at least one letter. */
function countWords(text) {
  const tokens = text.split(/\s+/);
  let n = 0;
  for (const t of tokens) {
    if (/[\p{L}\p{N}]/u.test(t)) n += 1;
  }
  return n;
}

function wordTokens(text) {
  const out = [];
  const re = new RegExp(`[${AR_LETTER}]+|[A-Za-z]+`, 'gu');
  let m;
  while ((m = re.exec(text)) !== null) out.push(m[0]);
  return out;
}

/**
 * Sentences as [start, end) ranges over the masked text. Split on the Arabic
 * and Western full stop family: . ؟ ! ؛ and newlines (per the task spec).
 */
function splitSentences(masked) {
  const out = [];
  let start = 0;
  for (let i = 0; i < masked.length; i += 1) {
    const ch = masked[i];
    if (ch === '.' || ch === '؟' || ch === '!' || ch === '؛' || ch === '?' || ch === '\n') {
      const end = i + 1;
      if (masked.slice(start, end).trim()) out.push({ start, end });
      start = end;
    }
  }
  if (masked.slice(start).trim()) out.push({ start, end: masked.length });
  return out.map((s) => ({ ...s, words: countWords(masked.slice(s.start, s.end)) }))
    .filter((s) => s.words > 0);
}

/** Paragraphs = runs separated by a blank line. */
function splitParagraphs(masked) {
  const out = [];
  const re = /[^\n]*(?:\n|$)/g;
  let m;
  let cur = null;
  while ((m = re.exec(masked)) !== null && m[0] !== '') {
    const body = m[0];
    const isBlank = body.trim() === '';
    if (isBlank) {
      if (cur) { out.push(cur); cur = null; }
    } else if (cur) {
      cur.end = m.index + body.length;
    } else {
      cur = { start: m.index, end: m.index + body.length };
    }
    if (re.lastIndex >= masked.length) break;
  }
  if (cur) out.push(cur);
  return out
    .map((p) => ({ ...p, words: countWords(masked.slice(p.start, p.end)) }))
    .filter((p) => p.words > 0);
}

function coefficientOfVariation(values) {
  if (values.length < 2) return null;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  if (mean === 0) return null;
  const variance = values.reduce((a, v) => a + (v - mean) * (v - mean), 0) / values.length;
  return Math.sqrt(variance) / mean;
}

// ═══ Stylometric signals ══════════════════════════════════════════════════

/**
 * (c) Sentence-length burstiness. Low coefficient of variation = metronomic
 * rhythm = AR-SH-004 (P0 in every variety).
 *
 * Gated at >= 5 sentences: below that the statistic is noise.
 */
const BURSTINESS_MIN_SENTENCES = 5;
const BURSTINESS_CV_THRESHOLD = 0.35;

function sentenceBurstiness(sentences) {
  if (sentences.length < BURSTINESS_MIN_SENTENCES) {
    return { applicable: false, cv: null, sentenceCount: sentences.length };
  }
  const cv = coefficientOfVariation(sentences.map((s) => s.words));
  return {
    applicable: true,
    cv,
    sentenceCount: sentences.length,
    uniform: cv !== null && cv < BURSTINESS_CV_THRESHOLD,
  };
}

/**
 * (d) Paragraph-length uniformity — AR-MSA-014 (P2). Gated at >= 4
 * paragraphs.
 */
const PARAGRAPH_MIN = 4;
const PARAGRAPH_CV_THRESHOLD = 0.22;

function paragraphUniformity(paragraphs) {
  if (paragraphs.length < PARAGRAPH_MIN) {
    return { applicable: false, cv: null, paragraphCount: paragraphs.length };
  }
  const cv = coefficientOfVariation(paragraphs.map((p) => p.words));
  return {
    applicable: true,
    cv,
    paragraphCount: paragraphs.length,
    uniform: cv !== null && cv < PARAGRAPH_CV_THRESHOLD,
  };
}

/**
 * (e) Trigram repetition — AR-MSA-028 (low syntactic/semantic diversity).
 * Counts word trigrams occurring more than once. Gated at >= 40 words.
 */
const TRIGRAM_MIN_WORDS = 40;
const TRIGRAM_RATIO_THRESHOLD = 0.04;

function trigramRepetition(masked) {
  const tokens = wordTokens(masked);
  if (tokens.length < TRIGRAM_MIN_WORDS) {
    return { applicable: false, ratio: null, repeated: 0, wordCount: tokens.length };
  }
  const counts = new Map();
  for (let i = 0; i + 2 < tokens.length; i += 1) {
    const key = `${tokens[i]} ${tokens[i + 1]} ${tokens[i + 2]}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  let repeatedInstances = 0;
  let distinctRepeated = 0;
  for (const c of counts.values()) {
    if (c > 1) { repeatedInstances += c - 1; distinctRepeated += 1; }
  }
  const total = Math.max(1, counts.size);
  const ratio = repeatedInstances / total;
  return {
    applicable: true,
    ratio,
    repeated: distinctRepeated,
    wordCount: tokens.length,
    excessive: ratio > TRIGRAM_RATIO_THRESHOLD,
  };
}

/**
 * (f) Transition-phrase density per 100 words. Computed by the caller, which
 * already knows how many AR-SH-002 hits it found; gated at >= 60 words so a
 * two-sentence note with one transition cannot trip it.
 *
 * The "more than two formal transitions per 100 words" figure is kept from
 * ar-levantine.md AR-SHM-012 (shm:509-510), where the reference explicitly
 * retains it as an editing rule rather than a claim about AI behaviour.
 */
const TRANSITION_MIN_WORDS = 60;
const TRANSITION_PER_100 = 2;

function transitionDensity(hitCount, wordCount) {
  if (wordCount < TRANSITION_MIN_WORDS) {
    return { applicable: false, per100: null };
  }
  const per100 = (hitCount / wordCount) * 100;
  return { applicable: true, per100, excessive: per100 > TRANSITION_PER_100 };
}

/**
 * (g) MSA-leakage ratio — dialect varieties only (egt / shami).
 * ratio = msaHits / (msaHits + dialectHits). Requires at least 4 total
 * function-word hits before it means anything.
 */
const LEAKAGE_MIN_HITS = 4;
const LEAKAGE_HIGH = 0.75;
const LEAKAGE_MODERATE = 0.5;

function countMatches(re, normalized) {
  if (!re) return { count: 0, first: null };
  re.lastIndex = 0;
  let n = 0;
  let first = null;
  let m;
  while ((m = re.exec(normalized)) !== null) {
    if (m[0].length === 0) { re.lastIndex += 1; continue; }
    const groupStart = m.index + m[0].indexOf(m[1]);
    if (first === null) first = { start: groupStart, end: groupStart + m[1].length };
    n += 1;
  }
  return { count: n, first };
}

function msaLeakage(normalized, msaRe, dialectRe) {
  const msa = countMatches(msaRe, normalized);
  const dialect = countMatches(dialectRe, normalized);
  const total = msa.count + dialect.count;
  if (total < LEAKAGE_MIN_HITS) {
    return {
      applicable: false,
      ratio: null,
      msaHits: msa.count,
      dialectHits: dialect.count,
      anchor: msa.first,
    };
  }
  const ratio = msa.count / total;
  return {
    applicable: true,
    ratio,
    msaHits: msa.count,
    dialectHits: dialect.count,
    anchor: msa.first,
    level: ratio >= LEAKAGE_HIGH ? 'high' : ratio >= LEAKAGE_MODERATE ? 'moderate' : 'low',
  };
}

/**
 * (h) Punctuation profile. Two independent P2 observations, never weighted
 * heavily (ar-shared.md "Typography and numbers"):
 *   - a Latin comma / semicolon / question mark used directly after an
 *     Arabic letter, where the Arabic form (، ؛ ؟) belongs;
 *   - Arabic-Indic and Western digits mixed inside one document.
 */
function punctuationProfile(masked) {
  const westernRe = new RegExp(`([${AR_LETTER}])([,;?])`, 'gu');
  const western = [];
  let m;
  while ((m = westernRe.exec(masked)) !== null) {
    western.push({ start: m.index + 1, end: m.index + 2, char: m[2] });
  }

  let arabicIndic = 0;
  let westernDigits = 0;
  let firstArabicIndic = null;
  let firstWesternDigit = null;
  for (let i = 0; i < masked.length; i += 1) {
    const code = masked.charCodeAt(i);
    if (code >= 0x0660 && code <= 0x0669) {
      arabicIndic += 1;
      if (firstArabicIndic === null) firstArabicIndic = i;
    } else if (code >= 0x0030 && code <= 0x0039) {
      westernDigits += 1;
      if (firstWesternDigit === null) firstWesternDigit = i;
    }
  }

  return {
    westernPunctuation: western,
    arabicIndicDigits: arabicIndic,
    westernDigits,
    mixedDigits: arabicIndic > 0 && westernDigits > 0,
    mixedDigitAnchor:
      arabicIndic > 0 && westernDigits > 0
        ? Math.min(firstArabicIndic, firstWesternDigit)
        : null,
  };
}

/**
 * Diacritic / tanwin presence. Must be measured on the ORIGINAL (masked but
 * un-normalized) text, because normalize() strips exactly these marks.
 *   - AR-EGT-002: Egyptian colloquial has no case system, so tanwin
 *     (U+064B-U+064D) in Egyptian-target text is a tell.
 *   - AR-SHM-018: Levantine strips all tashkeel except shadda (U+0651).
 */
const TANWIN_RE = /[ً-ٍ]/gu;
const TASHKEEL_NO_SHADDA_RE = /[ً-ِْٰ]/gu;

function diacriticProfile(masked) {
  const tanwin = [];
  let m;
  TANWIN_RE.lastIndex = 0;
  while ((m = TANWIN_RE.exec(masked)) !== null) tanwin.push(m.index);
  const tashkeel = [];
  TASHKEEL_NO_SHADDA_RE.lastIndex = 0;
  while ((m = TASHKEEL_NO_SHADDA_RE.exec(masked)) !== null) tashkeel.push(m.index);
  return {
    tanwinCount: tanwin.length,
    tanwinFirst: tanwin.length ? tanwin[0] : null,
    tashkeelCount: tashkeel.length,
    tashkeelFirst: tashkeel.length ? tashkeel[0] : null,
  };
}

function hasArabic(text) {
  return ARABIC_LETTER_RE.test(text);
}

// ═══ (i) Vocabulary concentration, IMP-23, AR-SH-008 ═════════════════════
//
// Two length-robust lexical-variety statistics over CONTENT tokens:
//
//   topShare: the share of the single most frequent content token among all
//     content tokens. Generated prose tends to re-reach for one keyword
//     rather than pronominalizing it, using a synonym, or letting context
//     carry it, so the top content word's share runs higher than in human
//     prose of the same length and topic.
//
//   ttr: type-token ratio over the FIRST 200 content tokens. TTR is
//     strongly length-sensitive (it falls monotonically as a text grows), so
//     it is only comparable across documents inside a FIXED window. 200 is
//     the window: it is small enough that almost every document this engine
//     sees reaches it, and large enough that the ratio has settled.
//
// Both are computed on NORMALIZED tokens (the caller passes tokens already
// run through lib/arabic-normalize.js), and the stoplist below is matched
// against those normalized forms, so alef-form and tashkeel variation never
// splits one type into two or leaks a function word into the content set.
//
// `applicable` is false below TTR_WINDOW content tokens: neither statistic
// is comparable to the corpus-derived gates on a shorter text, and both are
// pure noise on a handful of tokens.
// TTR_WINDOW is the fixed comparison window for the type-token ratio, and
// `ttr` is null below it, a TTR measured over 90 tokens is not comparable
// to one measured over 200, so there is no honest way to report it.
//
// VOCAB_MIN_CONTENT_TOKENS is the applicability floor for the SHARE
// statistic, which is a ratio rather than a window-bound count and is
// therefore usable on shorter text. It is set at 80 content tokens: below
// that a single repeated word swings the share by more than a percentage
// point per occurrence and the statistic is noise. The two floors are
// separate on purpose, so a 400-word document gets the share signal while
// only a longer one also gets TTR.
const TTR_WINDOW = 200;
const VOCAB_MIN_CONTENT_TOKENS = 80;

/**
 * Gates for AR-SH-008, taken from the measured distribution of these two
 * statistics over the 300-document pre-2022 human control corpus. The full
 * distribution, the percentile table and the union arithmetic below are
 * saved in `docs/evidence/round1-wave2F-vocab-distribution.txt`; these two
 * numbers are copied from that run and from nowhere else.
 *
 *   VOCAB_TOP_SHARE_GATE = 0.0629, the 97.5th percentile of top-word share
 *     (n = 300 applicable documents; median 0.0331, p95 0.0560, max 0.0829).
 *   VOCAB_TTR_GATE       = 0.6455, the 2.5th percentile of type-token ratio
 *     over the first 200 content tokens (n = 243 documents long enough for
 *     the window; median 0.8000, p5 0.6955, min 0.5200).
 *
 * WHY 97.5/2.5 AND NOT 95/5. The brief asked for the 95th and 5th
 * percentiles. Measured, that pair puts 9.33% of the human corpus in
 * contention, not 5%: the two tails are disjoint (15 documents trip the share
 * gate, 13 trip the TTR gate, and no document trips both), so a union of two
 * 5% tails is a 9-10% total. The binding requirement is
 * that at most 5% of human documents receive ANY contribution, so the gates
 * are set at the tightest measured percentile pair that satisfies it:
 * 97.5/2.5 gives a union of exactly 15 of 300 documents = 5.00%. The
 * per-axis percentiles are recorded above so the deviation is auditable.
 */
const VOCAB_TOP_SHARE_GATE = 0.0629;
const VOCAB_TTR_GATE = 0.6455;

/**
 * Arabic function-word stoplist, removed before either statistic is
 * computed, so the "most frequent content token" is never في or من, and TTR
 * measures topical vocabulary rather than grammatical scaffolding.
 *
 * Scope: prepositions, conjunctions and their proclitic-joined forms,
 * pronouns (free and the common suffixed-pronoun carriers), demonstratives,
 * relatives, interrogatives, negators, the كان/ليس copula families, quantity
 * and degree particles, and the high-frequency light verbs and connectives
 * that behave as function words in Arabic prose. Deliberately NOT included:
 * anything topical, and anything that is a scored AI tell in its own right
 * (تم/يتم stays in the content set, it is AR-MSA-006's business, and
 * removing it here would hide a real concentration).
 *
 * Entries are written in ordinary spelling and normalized at module load.
 */
const AR_STOPWORDS_RAW = [
  // Prepositions and their frequent proclitic-joined forms.
  'في', 'من', 'إلى', 'على', 'عن', 'مع', 'عند', 'لدى', 'حتى', 'بين', 'خلال',
  'بعد', 'قبل', 'منذ', 'ضد', 'نحو', 'دون', 'بلا', 'حول', 'أمام', 'وراء',
  'فوق', 'تحت', 'داخل', 'خارج', 'عبر', 'وفق', 'حسب', 'مثل', 'ب', 'ل', 'ك',
  'فيه', 'فيها', 'منه', 'منها', 'إليه', 'إليها', 'عليه', 'عليها', 'عنه', 'عنها',
  'له', 'لها', 'لهم', 'به', 'بها', 'بهم', 'معه', 'معها',
  // Conjunctions and connectives.
  'و', 'أو', 'ف', 'ثم', 'لكن', 'لكنه', 'بل', 'أم', 'أما', 'إما', 'كما', 'حيث',
  'إذ', 'إذا', 'لو', 'لولا', 'كي', 'لكي', 'لأن', 'أن', 'إن', 'أنه', 'أنها',
  'إنه', 'إنها', 'بأن', 'وأن', 'كذلك', 'أيضا', 'أيضًا', 'بينما', 'ريثما',
  // Pronouns.
  'هو', 'هي', 'هم', 'هن', 'هما', 'أنا', 'نحن', 'أنت', 'أنتم', 'أنتِ', 'إياه',
  // Demonstratives and relatives.
  'هذا', 'هذه', 'هؤلاء', 'ذلك', 'تلك', 'هذان', 'هاتان', 'ذاك',
  'الذي', 'التي', 'الذين', 'اللذان', 'اللتان', 'اللواتي', 'اللاتي', 'ما', 'من',
  // Interrogatives.
  'ماذا', 'لماذا', 'متى', 'أين', 'كيف', 'كم', 'أي', 'أية',
  // Negation and the copula families.
  'لا', 'لم', 'لن', 'ليس', 'ليست', 'لست', 'لسنا', 'ليسوا', 'غير',
  'كان', 'كانت', 'كانوا', 'يكون', 'تكون', 'أصبح', 'أصبحت', 'صار', 'ظل',
  // Quantity, degree and other particles.
  'كل', 'بعض', 'جميع', 'كافة', 'معظم', 'أكثر', 'أقل', 'قد', 'لقد', 'سوف',
  'جدا', 'جدًا', 'فقط', 'نفس', 'نفسه', 'ذات', 'عدة', 'عدد', 'أحد', 'إحدى',
  'هناك', 'هنا', 'حين', 'عندما', 'قبلها', 'بعدها', 'ذلكم',
  // Name-chain connectors and bare numerals. These are structural, not
  // topical: an Arabic biography strings patronymics together (فلان بن فلان
  // بن فلان) and a statistics-heavy article repeats ألف/مليون, and in the
  // 300-document control corpus بن was the single most frequent "content"
  // token in six of the twelve highest-concentration documents at up to 55
  // occurrences. Counting them would make the signal a detector of
  // biographies and number tables. Measured in
  // docs/evidence/round1-wave2F-vocab-distribution.txt.
  'بن', 'ابن', 'بنت', 'أبو', 'أبي', 'آل',
  'ألف', 'مليون', 'مليار', 'مئة', 'مائة', 'عشرة',
  // Dialect function words. The stoplist has to cover all three varieties
  // this engine analyses, or the signal becomes a detector of Egyptian and
  // Levantine GRAMMAR: اللي is the relative pronoun, عم the Levantine
  // progressive particle, مش/مو the negators, انو the complementizer. Left
  // uncovered, عم was the most frequent "content" token in
  // tests/fixtures/ar-shami/human-02.md at 7 occurrences, and اللي in two
  // Egyptian human fixtures. Sourced from the dialect marker lists in
  // lib/lang.js and the checklists in references/ar-egyptian.md
  // (AR-EGT-026) and references/ar-levantine.md (AR-SHM-001).
  'اللي', 'عم', 'مش', 'مفيش', 'مو', 'رح', 'حـ', 'بدي', 'بدك', 'بدو',
  'انو', 'إنو', 'هيك', 'هيدا', 'هيدي', 'هاد', 'هاي', 'هدول', 'هيدول',
  'ده', 'دي', 'دول', 'كده', 'كدة', 'عشان', 'علشان', 'بس', 'كمان', 'لسا',
  'شو', 'وين', 'ليش', 'ليه', 'فين', 'ازاي', 'قديش', 'هلق', 'هلأ', 'دلوقتي',
  'يعني', 'بقى', 'خلاص', 'طب', 'كتير', 'اوي', 'حدا', 'زي', 'لهيك', 'بتاع',
];

const AR_STOPWORDS = new Set(
  AR_STOPWORDS_RAW.map((w) => normalize(w, { taMarbuta: false }).normalized),
);

/**
 * vocabularyConcentration(tokens) -> {
 *   applicable, topShare, ttr, contentTokenCount, topToken, topTokenCount,
 *   ttrWindow,
 * }
 *
 * `tokens` is an array of NORMALIZED word tokens (e.g. from
 * `wordTokens(normalized)`). Stopwords are removed, then:
 *   topShare = count(most frequent content token) / contentTokenCount
 *   ttr      = distinct types / tokens, over the first TTR_WINDOW content
 *              tokens
 * Both are null when the statistic is not applicable.
 */
function vocabularyConcentration(tokens) {
  const content = [];
  for (const t of tokens || []) {
    if (t.length <= 1) continue; // single letters are proclitics or initials
    if (AR_STOPWORDS.has(t)) continue;
    content.push(t);
  }
  const contentTokenCount = content.length;
  if (contentTokenCount < VOCAB_MIN_CONTENT_TOKENS) {
    return {
      applicable: false,
      topShare: null,
      ttr: null,
      contentTokenCount,
      topToken: null,
      topTokenCount: 0,
      ttrWindow: TTR_WINDOW,
    };
  }

  const freq = new Map();
  for (const t of content) freq.set(t, (freq.get(t) || 0) + 1);
  let topToken = null;
  let topTokenCount = 0;
  for (const [t, n] of freq) {
    if (n > topTokenCount) { topTokenCount = n; topToken = t; }
  }

  // TTR only where the full fixed window exists (see TTR_WINDOW above).
  let ttr = null;
  if (contentTokenCount >= TTR_WINDOW) {
    const window = content.slice(0, TTR_WINDOW);
    ttr = new Set(window).size / window.length;
  }

  return {
    applicable: true,
    topShare: topTokenCount / contentTokenCount,
    ttr,
    contentTokenCount,
    topToken,
    topTokenCount,
    ttrWindow: TTR_WINDOW,
  };
}

module.exports = {
  mask,
  initialFrontmatterRange,
  countWords,
  wordTokens,
  splitSentences,
  splitParagraphs,
  coefficientOfVariation,
  sentenceBurstiness,
  paragraphUniformity,
  trigramRepetition,
  transitionDensity,
  msaLeakage,
  punctuationProfile,
  diacriticProfile,
  hasArabic,
  vocabularyConcentration,
  AR_STOPWORDS_RAW,
  GATES: {
    BURSTINESS_MIN_SENTENCES,
    BURSTINESS_CV_THRESHOLD,
    PARAGRAPH_MIN,
    PARAGRAPH_CV_THRESHOLD,
    TRIGRAM_MIN_WORDS,
    TRIGRAM_RATIO_THRESHOLD,
    TRANSITION_MIN_WORDS,
    TRANSITION_PER_100,
    LEAKAGE_MIN_HITS,
    LEAKAGE_HIGH,
    LEAKAGE_MODERATE,
    TTR_WINDOW,
    VOCAB_MIN_CONTENT_TOKENS,
    VOCAB_TOP_SHARE_GATE,
    VOCAB_TTR_GATE,
  },
};
