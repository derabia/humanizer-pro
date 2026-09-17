/**
 * humanizer-pro — language / Arabic-dialect identifier
 *
 * origin: humanizer-pro
 *
 * identify(text, options?) -> {
 *   lang: 'en' | 'ar' | 'mixed' | 'unknown',
 *   variety: 'msa' | 'egt' | 'shami' | null,
 *   confidence: 0..1,
 *   evidence: [{ marker, count, variety }],
 *   arabicRatio: 0..1,
 *   dialectEvidence: {
 *     egt:   { distinct, hits, ambiguousDistinct, ambiguousHits, guardPassed },
 *     shami: { distinct, hits, ambiguousDistinct, ambiguousHits, guardPassed },
 *     msaHits, msaHitsPer100,
 *   } | null,
 * }
 *
 * dialectEvidence reports marker evidence per dialect REGARDLESS of whether
 * it cleared the strong-evidence threshold below — so a caller can see weak
 * dialect evidence even when `variety` came back 'msa'. null for lang
 * 'en'/'unknown' or when `override` was used (no scoring ran).
 *
 * `distinct` / `hits` count STRONG markers only; markers in
 * AMBIGUOUS_MARKERS (below) are reported separately as
 * `ambiguousDistinct` / `ambiguousHits` and never as `distinct` / `hits`.
 * Every marker, strong or ambiguous, still appears in `evidence[]`.
 * `msaHits` counts MSA_ANCHOR_WORDS occurrences and `guardPassed` records
 * the IMP-27 MSA-dominance guard outcome for that variety.
 *
 * Routing rule: Arabic-script ratio is computed over LETTERS only (Arabic
 * script letters + Latin letters; digits, punctuation, and whitespace are
 * excluded from both the numerator and denominator).
 *   - ratio >= 0.6  -> lang: 'ar'
 *   - ratio <= 0.15 -> lang: 'en'
 *   - otherwise     -> lang: 'mixed' (routed to the Arabic engine, so
 *                       'mixed' still carries a best-guess `variety`)
 *   - fewer than 3 letters total (or empty text) -> lang: 'unknown'
 *
 * Dialect scoring uses whole-word marker matching against the normalized
 * text (via lib/arabic-normalize.js) so tashkeel/alef-form variation
 * doesn't cause misses. Default variety is 'msa' unless dialect evidence
 * clears BOTH thresholds: at least 2 distinct STRONG markers found, AND
 * strong-marker density >= 1 per 100 Arabic words, AND the IMP-27
 * MSA-dominance guard below. Confidence rises with distinct-marker count
 * and density; it never reaches 1 except via override.
 *
 * override: { lang, variety } short-circuits everything and returns that
 * exact lang/variety with confidence 1 and evidence [{ marker: 'override' }].
 */

'use strict';

const { normalize } = require('./arabic-normalize.js');

// ─── Marker lexicons ─────────────────────────────────────────────────────
//
// Sourced from docs/inventory/semitic.md §5 ("Dialect marker words used to
// characterize each variety") and, for exact spellings/citations, the three
// upstream SKILL.md files directly:
//   _sources/semitic/skills/humanizer-ar-egt/SKILL.md
//   _sources/semitic/skills/humanizer-ar-shami/SKILL.md
//
// Each list cites the SKILL.md line(s) it was read from at the time of
// writing (2026-09-17, upstream commit pinned per docs/inventory/semitic.md).

// Egyptian Arabic (humanizer-ar-egt/SKILL.md).
const EGYPTIAN_MARKERS = [
  // Philosophy section core deictic/lexical set (line 50). ("يا سلام" is a
  // two-word phrase and is not covered by this single-word matcher; بس
  // "سلام" alone is a common plain-MSA greeting/noun and is deliberately
  // excluded here to avoid false Egyptian hits.)
  'يعني', 'بقى', 'خلاص', 'ماشي',
  // MSA -> Egyptian substitution table (lines 80-100).
  'دلوقتي', 'عايز', 'عايزة', 'روح', 'اشوف', 'ده', 'دي', 'دول', 'ايه', 'ازاي',
  'كده', 'ايوه', 'اوي', 'كمان', 'بس', 'وبعدين', 'بعدين',
  // Discourse particles, Pattern 9 (lines 241-248). ("زي مثلاً" is excluded:
  // "مثلا" alone is common plain-register MSA ("for example") and not a
  // distinctive Egyptian tell on its own.)
  'طب', 'والله',
  // Negation system, Pattern 7 (lines 203-211): مش, and the future-negation
  // compound مش حـ (matched here as the bare مش marker; مش already covers
  // both forms since حـ attaches to the following verb).
  'مش',
  // Pattern 14 (lines 345-354): عشان replacing MSA لأن/لكي.
  'عشان', 'علشان',
  // Additional Egyptian-specific terms named directly in the task brief and
  // attested in-file per docs/inventory/semitic.md §5: بتاع (possessive,
  // MSA substitution family), ليه (why), فين (where).
  'بتاع', 'ليه', 'فين',
];

// Levantine Arabic (humanizer-ar-shami/SKILL.md).
const LEVANTINE_MARKERS = [
  // Philosophy section cross-regional core vocabulary (line 42).
  'شو', 'هلق', 'رايح',
  // Pattern 6 marker-word table, per-region column (lines 272-288).
  'ايش', 'وين', 'شلون', 'ايمتا', 'هلا', 'كتير', 'ليش', 'هاد', 'هيدا',
  'هدول', 'هيدول', 'قديش', 'اديش',
  // Vocabulary bullets (line 40, 61-66, 74, 84-87): بدّ (want) and its
  // inflected forms بدي/بدك/بدو (lines 138-139, 301-303, 747, 958), هلأ
  // (Lebanese spelling of "now", line 66/195), هاي (this-f, line 61),
  // مو (nominal negation, line 62), رح (future particle, line 40/205-206),
  // لهيك (therefore, line 74).
  'بدي', 'بدك', 'بدو', 'بدها', 'بدهم', 'بدّي', 'بدّك', 'بدّو',
  'هاي', 'مو', 'رح', 'لهيك',
  // هيك (like this, shami line 236/583) and منيح (good, lines 437/514).
  'هيك', 'منيح', 'منيحة',
];

// ─── IMP-27: ambiguous markers (MSA homographs) ──────────────────────────
//
// Every marker listed here fired on ordinary pre-2022 human Arabic prose in
// the 300-document control corpus, because each one is ALSO an ordinary MSA
// word or a fragment of an Arabic transliteration of a foreign name. The
// measured firings are saved in
// `docs/evidence/round1-wave2F-marker-homographs.txt`; that file is the
// entire basis for this list, and nothing was added to it on intuition.
//
//   dialect marker | docs / hits | what it actually was in the corpus
//   دي     18 docs / 29 hits: the Latin particle "de" and the letter D in
//                              transliterated names (بيريس دي ترافا،
//                              بي اس دي), not Egyptian "this-f".
//   يعني   21 / 22:          plain MSA "means / that is" (X يعني Y).
//   دول    15 / 18:          plain MSA plural of دولة, "states/countries"
//                              (دول العالم المتقدمة), not Egyptian "those".
//   ايه     3 / 17:          the letter A in transliterated acronyms
//                              (سي آي إيه = CIA، انتونوف ايه ان = Antonov An).
//   بقى     7 /  8:          MSA بقي "remained" (normalization maps
//                              ى -> ي, so بقي and بقى collapse).
//   والله   3 /  3:          the MSA oath, common in quoted classical text.
//   طب      2 /  3:          MSA "medicine" (طب الأسنان، طب حيوي).
//   روح     1 /  1:          MSA "spirit/soul".
//   هاي     1 /  1:          a syllable of a transliterated name.
//
// Effect: an ambiguous marker never counts toward `distinct` or `hits`, so
// it can neither carry a dialect verdict here nor satisfy detect.js's
// register-mix "dialect intent" gate on its own. It is still reported in
// `evidence[]` and counted under `ambiguousDistinct` / `ambiguousHits`, so
// nothing is hidden from a caller.
//
// Stated trade-off: genuine Egyptian or Levantine text whose ONLY dialect
// markers are on this list now routes to 'msa'. No fixture in
// tests/fixtures/ regresses (every one of them carries at least two strong
// markers), but this is a real narrowing and belongs on the native-review
// queue, see docs/NATIVE-REVIEW.md.
const AMBIGUOUS_MARKERS = [
  'دي', 'يعني', 'دول', 'ايه', 'إيه', 'بقى', 'بقي', 'والله', 'طب', 'روح', 'هاي',
];

// ─── IMP-27: MSA anchor words ────────────────────────────────────────────
//
// A small set of function words and constructions that are unambiguously
// Modern Standard Arabic and have a distinct dialect counterpart, taken from
// the MSA -> Egyptian leakage checklist in `references/ar-egyptian.md`
// (AR-EGT-026) and its Levantine twin (AR-SHM-001): relatives الذي/التي/الذين
// (dialect: اللي), negation لم/لن/ليس (dialect: مش / ما...ش / مو), the future
// particle سوف (dialect: حـ / رح), and the connectives كذلك/حيث/إذ, which have
// no spoken-register equivalent at all.
//
// Deliberately NARROWER than lexicons.js's MSA_FUNCTION_WORDS: that list is
// built for the msa-leakage SCORING signal and includes items (جدا، فقط، كيف،
// أيضا) that appear freely in written dialect too. Using it here would make
// the guard below fire on real dialect text.
const MSA_ANCHOR_WORDS = [
  'الذي', 'التي', 'الذين', 'اللذان', 'اللتان', 'اللواتي', 'اللاتي',
  'لم', 'لن', 'ليس', 'ليست',
  'سوف',
  'كذلك', 'حيث', 'إذ',
];

// ─── IMP-27: guard constants ─────────────────────────────────────────────
//
// MSA_DOMINANCE_RATIO: a dialect verdict requires
//   strongHits * 3 >= msaHits
// i.e. MSA-only function-word evidence may outnumber dialect-marker evidence
// by at most 3 to 1. Above that the text is MSA prose containing a few
// dialect-looking words, which is exactly the false positive corpus finding
// 1 describes.
//
// HIGH_DENSITY_PER_100: the escape hatch. Dialect text that is genuinely
// dense in markers (>= 3 strong hits per 100 Arabic words) is a dialect
// verdict regardless of how many MSA anchors it also carries, because
// dialect writing does legitimately reach for الذي and لم on occasion.
//
// DISTINCT_MIN / DENSITY_PER_100 are the pre-existing strong-evidence
// thresholds, named here so all four numbers are exported together.
const GUARD = {
  DISTINCT_MIN: 2,
  DENSITY_PER_100: 1,
  MSA_DOMINANCE_RATIO: 3,
  HIGH_DENSITY_PER_100: 3,
};

// ─── Quoted-speech masking ───────────────────────────────────────────────
//
// A narrator writing in one register (typically MSA) who quotes a speaker
// verbatim in another (a dialect) is not "mixing" registers at the document
// level — only the quoted speaker is. Dialect markers that appear ONLY
// inside quoted/reported speech must not count as evidence of the
// document's own variety, or a faithfully-quoted human interview gets
// routed to the quoted speaker's dialect engine and the narrator's own
// (genuinely correct) MSA prose is then flagged as "leakage" against a
// register it was never written in. See
// tests/fixtures/false-positives/ar-quoted-speech.md, and the inverse
// failure this guards against — an AI defaulting undialogued MSA into
// quotes where a human would naturally quote dialect — documented in
// references/ar-egyptian.md Category 1 ("Register Collapse — AI Defaults
// to MSA").
//
// Scope: Arabic guillemets «...» (the MSA-default quoting convention per
// ar-shared.md) and straight/curly double quotes "...". Bare colon-led
// dialogue without quote marks is deliberately NOT masked — colons also
// introduce lists and definitions in plain MSA prose, and masking on colon
// alone would blind the detector to real narration text.
const QUOTED_SPAN_RES = [
  /«[^»]*»/gu,
  /"[^"\n]*"/gu,
  /“[^”\n]*”/gu,
];

function maskQuotedSpans(text) {
  const chars = text.split('');
  for (const re of QUOTED_SPAN_RES) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (m[0].length === 0) { re.lastIndex += 1; continue; }
      for (let i = m.index; i < m.index + m[0].length; i += 1) {
        if (chars[i] !== '\n' && chars[i] !== '\r') chars[i] = ' ';
      }
    }
  }
  return chars.join('');
}

function buildMarkerIndex(markers, variety) {
  const set = new Map();
  for (const marker of markers) {
    set.set(marker, variety);
  }
  return set;
}

const DIALECT_INDEX = new Map([
  ...buildMarkerIndex(EGYPTIAN_MARKERS, 'egt'),
  ...buildMarkerIndex(LEVANTINE_MARKERS, 'shami'),
]);

// Ambiguous markers and MSA anchors are compared against NORMALIZED tokens,
// so both sets are normalized at module load exactly as the document text
// will be (taMarbuta: false, the same setting used for scoring).
const AMBIGUOUS_SET = new Set(
  AMBIGUOUS_MARKERS.map((w) => normalize(w, { taMarbuta: false }).normalized),
);
const MSA_ANCHOR_SET = new Set(
  MSA_ANCHOR_WORDS.map((w) => normalize(w, { taMarbuta: false }).normalized),
);

// ─── Script ratio ────────────────────────────────────────────────────────

// Arabic-script letters (not digits/punct). Covers the main Arabic block
// letters, ignoring presentation forms (out of scope for source text).
const ARABIC_LETTER_RE = /[ء-يٮ-ۓەۮۯۺ-ۼۿ]/;
const LATIN_LETTER_RE = /[A-Za-z]/;

function classifyLetters(text) {
  let arabicCount = 0;
  let otherLetterCount = 0;
  for (const ch of text) {
    if (ARABIC_LETTER_RE.test(ch)) {
      arabicCount += 1;
    } else if (LATIN_LETTER_RE.test(ch)) {
      otherLetterCount += 1;
    }
  }
  return { arabicCount, otherLetterCount };
}

// ─── Whole-word Arabic tokenizer ─────────────────────────────────────────
//
// A "word" here is a maximal run of Arabic-letter code points (post
// normalization). Punctuation, digits, tatweel remnants (already stripped
// by normalize()), and whitespace all act as separators.
const ARABIC_WORD_RE = /[ء-يٮ-ۓەۮۯۺ-ۼۿ]+/g;

function tokenizeArabicWords(normalizedText) {
  const matches = normalizedText.match(ARABIC_WORD_RE);
  return matches || [];
}

/**
 * identify(text, options?) -> result (see module header)
 */
function identify(text, options) {
  const opts = options || {};

  if (opts.override) {
    const { lang, variety } = opts.override;
    return {
      lang,
      variety: variety == null ? null : variety,
      confidence: 1,
      evidence: [{ marker: 'override' }],
      arabicRatio: null,
      dialectEvidence: null,
    };
  }

  if (typeof text !== 'string') {
    throw new TypeError('identify(text, options) expects a string');
  }

  const { arabicCount, otherLetterCount } = classifyLetters(text);
  const totalLetters = arabicCount + otherLetterCount;

  if (totalLetters < 3) {
    return {
      lang: 'unknown',
      variety: null,
      confidence: 0,
      evidence: [],
      arabicRatio: totalLetters === 0 ? 0 : arabicCount / totalLetters,
      dialectEvidence: null,
    };
  }

  const arabicRatio = arabicCount / totalLetters;

  let lang;
  if (arabicRatio >= 0.6) {
    lang = 'ar';
  } else if (arabicRatio <= 0.15) {
    lang = 'en';
  } else {
    lang = 'mixed';
  }

  if (lang === 'en') {
    return {
      lang: 'en',
      variety: null,
      confidence: 1 - arabicRatio, // more purely English -> higher confidence
      evidence: [],
      arabicRatio,
      dialectEvidence: null,
    };
  }

  // lang is 'ar' or 'mixed': score dialect markers over the Arabic-script
  // portion of the text, excluding quoted speech (see maskQuotedSpans
  // above) so a quoted speaker's dialect never routes the whole document.
  const { normalized } = normalize(maskQuotedSpans(text), { taMarbuta: false });
  const words = tokenizeArabicWords(normalized);
  const wordCount = words.length;

  const counts = new Map(); // marker -> count
  const varietyOf = new Map(); // marker -> variety
  let msaHits = 0; // IMP-27: unambiguous MSA-only function words
  for (const word of words) {
    if (MSA_ANCHOR_SET.has(word)) msaHits += 1;
    const variety = DIALECT_INDEX.get(word);
    if (!variety) continue;
    counts.set(word, (counts.get(word) || 0) + 1);
    varietyOf.set(word, variety);
  }

  // IMP-27: only STRONG markers count as dialect evidence. Ambiguous ones
  // (MSA homographs, see AMBIGUOUS_MARKERS) are tallied separately.
  let distinctMarkers = 0;
  let totalMarkerHits = 0;
  for (const [marker, count] of counts) {
    if (AMBIGUOUS_SET.has(marker)) continue;
    distinctMarkers += 1;
    totalMarkerHits += count;
  }
  const density = wordCount > 0 ? (totalMarkerHits / wordCount) * 100 : 0; // per 100 words
  const msaHitsPer100 = wordCount > 0 ? (msaHits / wordCount) * 100 : 0;

  // Tally STRONG hits by variety to pick the dominant dialect when evidence
  // clears the threshold.
  const varietyTotals = new Map(); // variety -> strong hit count
  for (const [marker, count] of counts) {
    if (AMBIGUOUS_SET.has(marker)) continue;
    const variety = varietyOf.get(marker);
    varietyTotals.set(variety, (varietyTotals.get(variety) || 0) + count);
  }

  // Per-variety evidence, independent of the strong-evidence threshold, so
  // a caller can see WEAK dialect evidence even when MSA wins outright
  // (e.g. detect.js's register-mix check, ar-egyptian.md Category 1).
  const dialectEvidence = {
    egt: { distinct: 0, hits: 0, ambiguousDistinct: 0, ambiguousHits: 0, guardPassed: false },
    shami: { distinct: 0, hits: 0, ambiguousDistinct: 0, ambiguousHits: 0, guardPassed: false },
    msaHits,
    msaHitsPer100: Math.round(msaHitsPer100 * 100) / 100,
  };
  for (const [marker, count] of counts) {
    const variety = varietyOf.get(marker);
    const bucket = dialectEvidence[variety];
    if (!bucket) continue;
    if (AMBIGUOUS_SET.has(marker)) {
      bucket.ambiguousDistinct += 1;
      bucket.ambiguousHits += count;
    } else {
      bucket.distinct += 1;
      bucket.hits += count;
    }
  }

  // IMP-27 MSA-dominance guard, recorded per variety. A variety passes when
  // its own strong-marker evidence is not swamped by MSA-only function-word
  // evidence, or when its marker density is high enough to stand on its own.
  for (const variety of ['egt', 'shami']) {
    const bucket = dialectEvidence[variety];
    const varietyDensity = wordCount > 0 ? (bucket.hits / wordCount) * 100 : 0;
    bucket.guardPassed = bucket.hits > 0
      && (bucket.hits * GUARD.MSA_DOMINANCE_RATIO >= msaHits
        || varietyDensity >= GUARD.HIGH_DENSITY_PER_100);
  }

  const hasStrongEvidence = distinctMarkers >= GUARD.DISTINCT_MIN
    && density >= GUARD.DENSITY_PER_100;

  let resultVariety = 'msa';
  let confidence;
  const evidence = [];

  // Dominant variety by total STRONG hit count; ties broken by first-seen
  // key order (stable, deterministic given Map iteration order == insertion
  // order, which here follows token order in the text).
  let bestVariety = null;
  let bestCount = -1;
  for (const [variety, count] of varietyTotals) {
    if (count > bestCount) {
      bestCount = count;
      bestVariety = variety;
    }
  }

  // IMP-27: a dialect verdict needs the strong-evidence thresholds AND the
  // MSA-dominance guard for the winning variety. Failing the guard returns
  // 'msa'; `dialectEvidence` still carries the full per-variety tallies and
  // `guardPassed: false`, so the caller can see exactly why.
  const guardPassed = bestVariety !== null && dialectEvidence[bestVariety].guardPassed;

  if (hasStrongEvidence && guardPassed) {
    resultVariety = bestVariety;

    for (const [marker, count] of counts) {
      const variety = varietyOf.get(marker);
      if (variety === resultVariety) {
        evidence.push({ marker, count, variety });
      }
    }

    // Confidence rises with distinct-marker count and density, capped
    // below 1 (reserved for explicit override).
    const markerTerm = Math.min(distinctMarkers / 8, 1); // saturates at 8 distinct markers
    const densityTerm = Math.min(density / 10, 1); // saturates at 10 hits / 100 words
    confidence = Math.min(0.5 + 0.3 * markerTerm + 0.19 * densityTerm, 0.99);
  } else {
    // Default to MSA. Confidence reflects how "clean" of dialect markers
    // the text is combined with how much Arabic-script signal we saw.
    for (const [marker, count] of counts) {
      evidence.push({ marker, count, variety: varietyOf.get(marker) });
    }
    const arabicStrength = lang === 'ar' ? 1 : (arabicRatio - 0.15) / (0.6 - 0.15);
    confidence = Math.max(0.3, Math.min(0.7, 0.4 + 0.3 * arabicStrength));
  }

  return {
    lang,
    variety: resultVariety,
    confidence,
    evidence,
    arabicRatio,
    dialectEvidence,
  };
}

module.exports = {
  identify,
  LEXICONS: {
    egt: EGYPTIAN_MARKERS.slice(),
    shami: LEVANTINE_MARKERS.slice(),
  },
  // IMP-27
  AMBIGUOUS_MARKERS: AMBIGUOUS_MARKERS.slice(),
  MSA_ANCHOR_WORDS: MSA_ANCHOR_WORDS.slice(),
  GUARD,
};
