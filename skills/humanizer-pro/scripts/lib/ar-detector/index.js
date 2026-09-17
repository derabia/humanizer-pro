/**
 * humanizer-pro — Arabic AI-text detection engine
 *
 * origin: humanizer-pro
 *
 * analyzeText(text, options) -> {
 *   score:  0-100 integer,
 *   label:  'HUMAN' | 'MIXED' | 'AI',
 *   issues: [{ type, patternId, start, end, excerpt, severity, suggestion }],
 *   stats:  { ... },
 * }
 *
 * options:
 *   variety:    'msa' (default) | 'egt' | 'shami'
 *   sourceMode: 'plain' (default) | 'rendered-markdown'
 *   register:   'default' (default) | 'formal'
 *
 * REGISTER PROFILES (IMP-13)
 * -------------------------
 * `register` selects a threshold profile. Exactly TWO profiles exist and no
 * more are planned; see REGISTER_PROFILES below for the numbers and
 * scripts/README.md for the rationale. A formal register (legal, academic,
 * contractual MSA) legitimately writes long, evenly-weighted sentences, so
 * the *sentence-rhythm* gate — and only that gate — is relaxed. Lexicon
 * patterns, their severities and their weights are IDENTICAL in both
 * profiles: a register profile can never make an AI tell cheaper.
 *
 * LABELS AND THRESHOLDS
 * ---------------------
 * The English engine (lib/en-detector/index.js) does not expose HUMAN /
 * MIXED / AI as its `label`: its `label` is a descriptive band ('Clean',
 * 'Minimal AI signals', …) and its trinary field is
 * `document_classification` with the values HUMAN_ONLY / MIXED / AI_ONLY.
 * This engine therefore defines its own three-way label, documented here and
 * exported as THRESHOLDS:
 *
 *   score <  25            -> 'HUMAN'   (no usable evidence of generation)
 *   25 <= score <  55      -> 'MIXED'   (signals present, not conclusive)
 *   score >= 55            -> 'AI'      (accumulated, corroborating signals)
 *
 * The mapping to the English engine's trinary, for callers that need one:
 *   HUMAN -> HUMAN_ONLY, MIXED -> MIXED, AI -> AI_ONLY.
 *
 * CONSERVATIVE BY DESIGN
 * ----------------------
 * Weights are chosen so that NO single signal can reach the AI threshold:
 *   P0 = 14, P1 = 6, P2 = 2.
 * One P1 hit (a hedge, a passive) scores 6 — HUMAN. One P0 hit scores 14 —
 * still HUMAN. Reaching 'AI' requires roughly four independent P0-class
 * signals, or a realistic mix such as two P0 + three P1 + two P2. Repeated
 * hits of the SAME pattern get diminishing returns (1.0, 0.5, then 0.25 for
 * every later hit) so one repeated stock phrase cannot dominate the score,
 * and the summed contribution of any one patternId is then capped at
 * THRESHOLDS.PATTERN_CONTRIBUTION_CAP = 24, one point below MIXED, so no
 * single pattern can reach MIXED alone however often it fires. See the cap's
 * own comment block below for the measurement that motivated it.
 *
 * Known consequence, stated rather than hidden: ar-shared.md AR-SH-002 says
 * three instances of علاوة على ذلك alone is enough to suspect AI authorship.
 * Under diminishing returns three hits of that one P0 pattern score
 * 14 + 7 + 3.5 = 24.5, and under the per-pattern cap any number of hits
 * scores at most 24 -> 'HUMAN' on its own. This engine deliberately does
 * not honour that single-pattern shortcut; it requires corroboration. See
 * scripts/README.md, "Known limitations".
 *
 * OFFSETS
 * -------
 * Lexicon matching runs on the NORMALIZED string (lib/arabic-normalize.js,
 * taMarbuta: false) and every span is mapped back with `toOriginalRange`, so
 * `issue.start` / `issue.end` always index the ORIGINAL text and
 * `text.slice(start, end) === issue.excerpt` holds, including for
 * tashkeel- and tatweel-heavy input.
 */

'use strict';

const { normalize } = require('../arabic-normalize.js');
const lexicons = require('./lexicons.js');
const signals = require('./signals.js');

const VALID_VARIETIES = new Set(['msa', 'egt', 'shami']);
const VALID_SOURCE_MODES = new Set(['plain', 'rendered-markdown']);

/**
 * REGISTER_PROFILES — IMP-13. Capped at two profiles by design.
 *
 * `burstinessCvThreshold` is the LOWER BOUND on sentence-length coefficient
 * of variation below which AR-SH-004 ('uniform-rhythm', P0) fires.
 *   default: 0.35 — signals.GATES.BURSTINESS_CV_THRESHOLD, unchanged.
 *   formal:  0.22 — relaxed by 0.13 absolute (37% lower). Formal MSA (legal,
 *            academic, contractual) is written in long clauses of similar
 *            weight; a CV in the 0.22–0.35 band is normal there and is not
 *            evidence of generation. Below 0.22 the sentences are close to
 *            mechanically identical and AR-SH-004 still fires.
 *
 * `maxSentenceWordsThreshold` is `null` in BOTH profiles: this engine has no
 * maximum-sentence-length / run-on trigger to relax. The key is present so
 * the profile shape documents that absence explicitly rather than leaving a
 * reader to grep for it. If such a trigger is ever added, the `formal`
 * profile is where it gets its relaxed bound.
 *
 * Nothing else differs. Paragraph-length uniformity (AR-MSA-014),
 * trigram repetition (AR-MSA-028), transition density (AR-SH-002), MSA
 * leakage, punctuation and diacritic signals and every lexicon weight are
 * profile-independent.
 */
const REGISTER_PROFILES = {
  default: {
    burstinessCvThreshold: signals.GATES.BURSTINESS_CV_THRESHOLD,
    maxSentenceWordsThreshold: null,
  },
  formal: {
    burstinessCvThreshold: 0.22,
    maxSentenceWordsThreshold: null,
  },
};
const VALID_REGISTERS = new Set(Object.keys(REGISTER_PROFILES));

const WEIGHTS = {
  P0: 14,
  P1: 6,
  P2: 2,
};

const THRESHOLDS = {
  MIXED: 25,
  AI: 55,
  // Texts under this many words are never scored above TOO_SHORT_CAP.
  TOO_SHORT_WORDS: 20,
  TOO_SHORT_CAP: 24,
  // IMP-27 / corpus finding 2: per-pattern contribution cap. The summed
  // repeat-discounted contribution of any ONE patternId is capped at this
  // value, so no single pattern can reach MIXED (25) on its own however
  // many times it fires. See PATTERN_CONTRIBUTION_CAP below.
  PATTERN_CONTRIBUTION_CAP: 24,
};

// Repeat discount applied to the Nth hit of the same patternId.
function repeatFactor(occurrenceIndex) {
  if (occurrenceIndex === 0) return 1;
  if (occurrenceIndex === 1) return 0.5;
  return 0.25;
}

/**
 * PER-PATTERN CONTRIBUTION CAP, corpus finding 2 (IMP-27 wave).
 *
 * The repeat discount (1.0, 0.5, then 0.25) slows a repeated pattern down
 * but never stops it: the 0.25 tail is linear, so a P0 pattern firing 15
 * times still reaches 14 + 7 + 13*3.5 = 66.5 -> 'AI' with no other signal
 * present. `corpus/RESULTS.md` measured exactly that: one document scoring
 * 67 whose only issue id is AR-MSA-006 (تم/يتم periphrastic passive),
 * fifteen times, and AR-MSA-006 alone accounted for 210 hits across 45 of
 * the 49 documents that reached MIXED. The periphrastic passive is simply
 * how Arabic encyclopedic prose reports agentless events (تم بناؤه عام كذا),
 * so density alone is not evidence of generation.
 *
 * The fix: the SUMMED, repeat-discounted contribution of any one patternId
 * is capped at THRESHOLDS.PATTERN_CONTRIBUTION_CAP = 24, one point below
 * THRESHOLDS.MIXED. No single pattern can therefore reach MIXED by itself,
 * however often it fires. This makes the engine's stated doctrine
 * enforceable rather than incidental: the module header already records
 * that three hits of one P0 pattern score 24.5 and stay 'HUMAN' because
 * this engine requires corroboration, and the cap extends that from three
 * hits to any number of them.
 *
 * DELIBERATE DEVIATION from the wave brief, recorded here rather than
 * hidden: the brief exempted P0 patterns from the cap. AR-MSA-006, the one
 * pattern the corpus shows reaching 'AI' on its own, and the entire reason
 * for this change, IS P0 (lexicons.js, severity 'P0', minCount 2), so a P0
 * exemption would have left the measured false positive untouched. The cap
 * is applied to every tier, P0 included. What a P0 keeps is its *weight*:
 * one P0 hit is still 14 points against a P1's 6 and a P2's 2, so a P0
 * pattern still reaches the cap in three hits where a P1 needs six and a P2
 * needs seventeen. Corroboration between DIFFERENT patterns is untouched:
 * two capped patterns still sum to 48, and the `ai-NN.md` AI fixtures under
 * `tests/fixtures/ar-msa`, `ar-egt` and `ar-shami` stack four or more
 * distinct patterns each.
 *
 * The cap is applied identically to `scoreWithoutLeakage`.
 */
const PATTERN_CONTRIBUTION_CAP = THRESHOLDS.PATTERN_CONTRIBUTION_CAP;

const SEVERITY_RANK = { P0: 3, P1: 2, P2: 1 };

/**
 * The points one issue contributes before the repeat discount and the
 * per-pattern cap. Normally its severity tier's weight; a GRADED signal may
 * carry an explicit `issue.weight` instead (today only AR-SH-008, the
 * vocabulary-concentration signal, which scales 1..2 inside the P2 tier).
 * A graded weight may never exceed its tier weight, so the invariant that
 * no signal is dearer than its severity says still holds.
 */
function issueWeight(issue) {
  const tier = WEIGHTS[issue.severity];
  if (typeof issue.weight !== 'number') return tier;
  return Math.min(issue.weight, tier);
}

function makeIssue(type, patternId, start, end, text, severity, suggestion) {
  return {
    type,
    patternId,
    start,
    end,
    excerpt: text.slice(start, end),
    severity,
    suggestion,
  };
}

/**
 * Collect lexicon hits for one variety, in ORIGINAL coordinates.
 * Overlapping hits are resolved in favour of the higher severity (then the
 * longer span), so a phrase listed under several patterns is reported once.
 */
function collectLexiconHits(text, normalized, toOriginalRange, variety) {
  const patterns = lexicons.patternsFor(variety);
  const raw = [];

  for (const pattern of patterns) {
    const hits = [];
    for (const re of pattern.regexes) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(normalized)) !== null) {
        if (m[0].length === 0) { re.lastIndex += 1; continue; }
        // Group 1 is the phrase itself, without any proclitic.
        const phrase = m[1] === undefined ? m[0] : m[1];
        const offsetInMatch = m[0].indexOf(phrase);
        const nStart = m.index + (offsetInMatch < 0 ? 0 : offsetInMatch);
        const nEnd = nStart + phrase.length;
        const [oStart, oEnd] = toOriginalRange(nStart, nEnd);
        hits.push({ nStart, start: oStart, end: oEnd, pattern });
      }
    }
    hits.sort((a, b) => a.start - b.start);
    // minCount: a pattern that is only a tell at density (passive voice,
    // تم/يتم, MSA-vocabulary runs) reports nothing below its threshold, and
    // when it fires it reports every hit from the first one.
    if (hits.length < pattern.minCount) continue;
    raw.push(...hits);
  }

  raw.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    const rank = SEVERITY_RANK[b.pattern.severity] - SEVERITY_RANK[a.pattern.severity];
    if (rank !== 0) return rank;
    return (b.end - b.start) - (a.end - a.start);
  });

  const kept = [];
  for (const hit of raw) {
    const clash = kept.find((k) => hit.start < k.end && k.start < hit.end);
    if (!clash) { kept.push(hit); continue; }
    const better =
      SEVERITY_RANK[hit.pattern.severity] > SEVERITY_RANK[clash.pattern.severity]
      || (SEVERITY_RANK[hit.pattern.severity] === SEVERITY_RANK[clash.pattern.severity]
        && (hit.end - hit.start) > (clash.end - clash.start));
    if (better) kept[kept.indexOf(clash)] = hit;
  }

  kept.sort((a, b) => a.start - b.start);
  return kept.map((h) =>
    makeIssue(
      h.pattern.type,
      h.pattern.id,
      h.start,
      h.end,
      text,
      h.pattern.severity,
      h.pattern.suggestion,
    ));
}

/** First sentence (or paragraph) span in original coords, for doc-level issues. */
function anchorSpan(ranges, fallbackLength) {
  if (ranges && ranges.length) {
    const r = ranges[0];
    return [r.start, r.end];
  }
  return [0, Math.min(1, fallbackLength)];
}

function trimmedSpan(text, start, end, maxLen) {
  let s = start;
  let e = Math.min(end, text.length);
  while (s < e && /\s/.test(text[s])) s += 1;
  while (e > s && /\s/.test(text[e - 1])) e -= 1;
  if (maxLen && e - s > maxLen) e = s + maxLen;
  return [s, e];
}

function analyzeText(text, options) {
  const opts = options || {};

  const requestedVariety = opts.variety === undefined ? 'msa' : opts.variety;
  const variety = VALID_VARIETIES.has(requestedVariety) ? requestedVariety : 'msa';
  const varietyFallback = requestedVariety !== variety ? requestedVariety : undefined;

  const requestedSourceMode = opts.sourceMode === undefined ? 'plain' : opts.sourceMode;
  const sourceMode = VALID_SOURCE_MODES.has(requestedSourceMode) ? requestedSourceMode : 'plain';
  const sourceModeFallback = requestedSourceMode !== sourceMode ? requestedSourceMode : undefined;

  const requestedRegister = opts.register === undefined ? 'default' : opts.register;
  const register = VALID_REGISTERS.has(requestedRegister) ? requestedRegister : 'default';
  const registerFallback = requestedRegister !== register ? requestedRegister : undefined;
  const profile = REGISTER_PROFILES[register];

  const baseStats = {
    wordCount: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    variety,
    sourceMode,
    register,
    registerGates: {
      burstinessCvThreshold: profile.burstinessCvThreshold,
      maxSentenceWordsThreshold: profile.maxSentenceWordsThreshold,
    },
  };
  if (varietyFallback !== undefined) baseStats.varietyFallback = varietyFallback;
  if (sourceModeFallback !== undefined) baseStats.sourceModeFallback = sourceModeFallback;
  if (registerFallback !== undefined) baseStats.registerFallback = registerFallback;

  if (typeof text !== 'string' || text.trim().length === 0) {
    return {
      score: 0,
      label: 'HUMAN',
      issues: [],
      stats: { ...baseStats, empty: true, tooShort: true, hasArabic: false },
    };
  }

  // ── Masking (original coordinates preserved) ──────────────────────────
  const { masked, stats: maskStats } = signals.mask(text, sourceMode);
  // Number of characters the masker blanked out. detect.js uses this as the
  // exclusion term when it computes stats.affectedCoveragePercent (IMP-10):
  // a URL or a code fence is not scored text, so it must not sit in the
  // denominator.
  let maskedCharCount = 0;
  for (let i = 0; i < text.length; i += 1) {
    if (masked[i] !== text[i]) maskedCharCount += 1;
  }

  // ── Normalization, with an exact map back to the original ─────────────
  const { normalized, toOriginalRange } = normalize(masked, { taMarbuta: false });

  const sentences = signals.splitSentences(masked);
  const paragraphs = signals.splitParagraphs(masked);
  const wordCount = signals.countWords(masked);
  const arabicPresent = signals.hasArabic(masked);

  const stats = {
    ...baseStats,
    ...maskStats,
    wordCount,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    hasArabic: arabicPresent,
    maskedCharCount,
    scoredCharCount: Math.max(0, text.length - maskedCharCount),
  };

  if (!arabicPresent) {
    return {
      score: 0,
      label: 'HUMAN',
      issues: [],
      stats: { ...stats, noArabic: true, tooShort: wordCount < THRESHOLDS.TOO_SHORT_WORDS },
    };
  }

  const issues = [];

  // ── (a)/(b) Lexicon hits, weighted by tier ────────────────────────────
  issues.push(...collectLexiconHits(text, normalized, toOriginalRange, variety));

  // ── (c) Sentence-length burstiness — AR-SH-004 ────────────────────────
  const burstiness = signals.sentenceBurstiness(sentences);
  stats.sentenceLengthCv = burstiness.cv;
  // Register-conditional (IMP-13): the uniformity verdict is re-derived here
  // against the active profile's threshold instead of using
  // `burstiness.uniform`, which signals.js computes against the default gate.
  const rhythmUniform = burstiness.applicable
    && burstiness.cv !== null
    && burstiness.cv < profile.burstinessCvThreshold;
  if (burstiness.applicable && rhythmUniform) {
    const [s, e] = trimmedSpan(text, ...anchorSpan(sentences, text.length), 120);
    issues.push(makeIssue(
      'uniform-rhythm', 'AR-SH-004', s, e, text, 'P0',
      'كل الجمل بالطول نفسه تقريبًا. أدخل جملة قصيرة (٥-٩ كلمات) أو شبه جملة تحمل أحدّ دعوى بعد كل ٢-٣ جمل طويلة (AR-SH-004).',
    ));
  }

  // ── (d) Paragraph-length uniformity — AR-MSA-014 ──────────────────────
  const paraUniformity = signals.paragraphUniformity(paragraphs);
  stats.paragraphLengthCv = paraUniformity.cv;
  if (paraUniformity.applicable && paraUniformity.uniform) {
    const [s, e] = trimmedSpan(text, ...anchorSpan(paragraphs, text.length), 120);
    issues.push(makeIssue(
      'uniform-paragraphs', 'AR-MSA-014', s, e, text, 'P2',
      'كل الفقرات بالطول نفسه. أفرد ٢-٣ دعاوى مهمة في فقرات من جملة واحدة، ودع فقرة واحدة تطول عن البقية (AR-MSA-014).',
    ));
  }

  // ── (e) Trigram repetition — AR-MSA-028 ───────────────────────────────
  const trigrams = signals.trigramRepetition(masked);
  stats.trigramRepeatRatio = trigrams.ratio;
  if (trigrams.applicable && trigrams.excessive) {
    const [s, e] = trimmedSpan(text, ...anchorSpan(sentences, text.length), 120);
    issues.push(makeIssue(
      'trigram-repetition', 'AR-MSA-028', s, e, text, 'P2',
      'تتكرر التراكيب نفسها حرفيًا عبر النص. أبقِ أقوى جملة وحوِّل البقية إلى دليل أو تقييد أو مثال مختلف (AR-MSA-028).',
    ));
  }

  // ── (f) Transition-phrase density — AR-SH-002 ─────────────────────────
  const transitionHits = issues.filter(
    (i) => i.type === 'transition' || i.type === 'formulaic-conclusion',
  ).length;
  const transitions = signals.transitionDensity(transitionHits, wordCount);
  stats.transitionsPer100Words = transitions.per100;
  if (transitions.applicable && transitions.excessive) {
    const [s, e] = trimmedSpan(text, ...anchorSpan(sentences, text.length), 120);
    issues.push(makeIssue(
      'transition-density', 'AR-SH-002', s, e, text, 'P1',
      'كثافة الروابط الشكلية عالية. احذف ما لا يحمل وزنًا منطقيًا، ونوِّع ما تبقّى (AR-SH-002 / AR-SHM-012).',
    ));
  }

  // ── (g) MSA-leakage ratio — dialect varieties ONLY ────────────────────
  // The key is absent from `stats` for variety 'msa', not null: MSA text
  // leaking MSA is not a concept.
  if (variety === 'egt' || variety === 'shami') {
    const leakage = signals.msaLeakage(
      normalized,
      lexicons.MSA_LEAKAGE_REGEX,
      lexicons.DIALECT_LEAKAGE_REGEX[variety],
    );
    stats.msaLeakage = {
      ratio: leakage.ratio,
      msaHits: leakage.msaHits,
      dialectHits: leakage.dialectHits,
      applicable: leakage.applicable,
    };
    if (leakage.applicable && leakage.level !== 'low') {
      const anchor = leakage.anchor
        ? toOriginalRange(leakage.anchor.start, leakage.anchor.end)
        : anchorSpan(sentences, text.length);
      const [s, e] = trimmedSpan(text, anchor[0], anchor[1], 120);
      const patternId = variety === 'egt' ? 'AR-EGT-026' : 'AR-SHM-001';
      issues.push(makeIssue(
        'msa-leakage', patternId, s, e, text,
        leakage.level === 'high' ? 'P0' : 'P1',
        variety === 'egt'
          ? 'أدوات الفصحى الوظيفية تطغى على نظيراتها المصرية. طبّق قائمة التحقق: مش/ما..ش لا ليس/لم، حـ/هـ لا سـ/سوف، ده/دي/دول بعد الاسم، اللي لا الذي/التي، دلوقتي لا الآن (AR-EGT-026).'
          : 'أدوات الفصحى الوظيفية تطغى على نظيراتها الشامية. طبّق قائمة التحقق: بـ على المضارع، رح للمستقبل، ما/مش/مو للنفي، شو/وين/ليش/هلق، اللي لا الذي/التي، بدّي لا أريد (AR-SHM-001).',
      ));
    }
  }

  // ── (h) Punctuation profile — always P2, never heavily weighted ────────
  const punctuation = signals.punctuationProfile(masked);
  stats.westernPunctuationCount = punctuation.westernPunctuation.length;
  stats.mixedDigitSystems = punctuation.mixedDigits;
  if (punctuation.westernPunctuation.length > 0) {
    const first = punctuation.westernPunctuation[0];
    issues.push(makeIssue(
      'punctuation-mixing', 'AR-SH-TYPO', first.start, first.end + 1, text, 'P2',
      'استعمل علامات الترقيم العربية في النص العربي: الفاصلة «،» والفاصلة المنقوطة «؛» وعلامة الاستفهام «؟» (ar-shared.md، الترقيم والأرقام).',
    ));
  }
  if (punctuation.mixedDigits && punctuation.mixedDigitAnchor !== null) {
    const at = punctuation.mixedDigitAnchor;
    issues.push(makeIssue(
      'digit-mixing', 'AR-SH-TYPO', at, at + 1, text, 'P2',
      'لا تخلط الأرقام العربية-الهندية (٠-٩) بالأرقام الغربية (0-9) داخل مستند واحد؛ احفظ عرف المصدر (ar-shared.md، الترقيم والأرقام).',
    ));
  }

  // ── (i) Vocabulary concentration, AR-SH-008 (IMP-23) ─────────────────
  //
  // A GRADED P2 signal, the engine's only one. The weight is the number of
  // corpus-calibrated gates the document trips, so it is 1 or 2 rather than
  // the flat P2 weight of 2:
  //   1: top-word share above signals.GATES.VOCAB_TOP_SHARE_GATE, or
  //      type-token ratio below signals.GATES.VOCAB_TTR_GATE;
  //   2: both of them.
  // Both gates come from the measured human-corpus distribution and were
  // chosen so that at most 5% of human documents receive any contribution
  // at all (see the gate comment in signals.js and
  // docs/evidence/round1-wave2F-vocab-distribution.txt). Measured, NO
  // document in that 300-document human corpus tripped both gates: all 15
  // that received a contribution received weight 1, so weight 2 is reserved
  // for concentration on both axes at once.
  //
  // The graded weight rides on `issue.weight`, which the scoring pass below
  // prefers over WEIGHTS[severity] when present. `severity` stays 'P2' so
  // that severity-based grouping, sorting and reporting keep working; the
  // override only ever makes a P2 CHEAPER (1) or leaves it at its tier
  // weight (2), never dearer.
  const vocab = signals.vocabularyConcentration(signals.wordTokens(normalized));
  stats.vocabularyConcentration = {
    applicable: vocab.applicable,
    topShare: vocab.topShare === null ? null : Math.round(vocab.topShare * 10000) / 10000,
    ttr: vocab.ttr === null ? null : Math.round(vocab.ttr * 10000) / 10000,
    contentTokenCount: vocab.contentTokenCount,
    ttrWindow: vocab.ttrWindow,
  };
  if (vocab.applicable) {
    const shareTrips = vocab.topShare > signals.GATES.VOCAB_TOP_SHARE_GATE;
    const ttrTrips = vocab.ttr !== null && vocab.ttr < signals.GATES.VOCAB_TTR_GATE;
    const vocabWeight = (shareTrips ? 1 : 0) + (ttrTrips ? 1 : 0);
    stats.vocabularyConcentration.shareTrips = shareTrips;
    stats.vocabularyConcentration.ttrTrips = ttrTrips;
    stats.vocabularyConcentration.weight = vocabWeight;
    if (vocabWeight > 0) {
      const [s, e] = trimmedSpan(text, ...anchorSpan(sentences, text.length), 120);
      const issue = makeIssue(
        'vocabulary-concentration', 'AR-SH-008', s, e, text, 'P2',
        'المعجم مركّز: كلمة واحدة تتكرر بنسبة عالية، أو تنوّع المفردات منخفض. استعمل الضمير أو الإحالة أو مرادفًا دقيقًا بدل إعادة الكلمة المفتاحية، ودع السياق يحمل ما لا يحتاج تسمية (AR-SH-008).',
      );
      issue.weight = vocabWeight;
      issues.push(issue);
    }
  }

  // ── Variety-specific diacritic signals (pre-normalization) ────────────
  const diacritics = signals.diacriticProfile(masked);
  stats.tanwinCount = diacritics.tanwinCount;
  stats.tashkeelCount = diacritics.tashkeelCount;
  if (variety === 'egt' && diacritics.tanwinCount > 0) {
    const at = diacritics.tanwinFirst;
    issues.push(makeIssue(
      'tanwin-present', 'AR-EGT-002', Math.max(0, at - 3), at + 1, text, 'P1',
      'العامية المصرية بلا إعراب ولا تنوين. احذف التنوين والحركات الإعرابية: أيضًا→كمان، شكرًا→متشكر، تمامًا→تمام (AR-EGT-002).',
    ));
  }
  if (variety === 'shami' && diacritics.tashkeelCount > 0) {
    const at = diacritics.tashkeelFirst;
    issues.push(makeIssue(
      'tashkeel-present', 'AR-SHM-018', Math.max(0, at - 3), at + 1, text, 'P0',
      'انزع كل التشكيل عدا الشدّة في النص الشامي غير التعليمي وغير القرآني (AR-SHM-018).',
    ));
  }

  issues.sort((a, b) => a.start - b.start || a.end - b.end);

  // ── Scoring ───────────────────────────────────────────────────────────
  const seen = new Map(); // patternId -> occurrences so far
  // Per-pattern subtotals, capped at PATTERN_CONTRIBUTION_CAP once every
  // issue has been weighted (see the cap's rationale above).
  const perPattern = new Map(); // patternId -> uncapped subtotal
  // scoreWithoutLeakage: same weighting/repeat-discount pass, but skipping
  // every issue of type 'msa-leakage' (AR-EGT-026 / AR-SHM-001) — used by
  // detect.js's registerMixCheck so that leakage alone (which fires almost
  // identically against near-pure-MSA text regardless of which dialect is
  // forced) can never by itself justify promoting a dialect verdict to AI.
  const seenNoLeakage = new Map();
  const perPatternNoLeakage = new Map();
  for (const issue of issues) {
    const n = seen.get(issue.patternId) || 0;
    seen.set(issue.patternId, n + 1);
    const add = issueWeight(issue) * repeatFactor(n);
    perPattern.set(issue.patternId, (perPattern.get(issue.patternId) || 0) + add);

    if (issue.type !== 'msa-leakage') {
      const nl = seenNoLeakage.get(issue.patternId) || 0;
      seenNoLeakage.set(issue.patternId, nl + 1);
      const addNl = issueWeight(issue) * repeatFactor(nl);
      perPatternNoLeakage.set(
        issue.patternId,
        (perPatternNoLeakage.get(issue.patternId) || 0) + addNl,
      );
    }
  }

  let rawScore = 0;
  let rawScoreNoLeakage = 0;
  // Patterns whose uncapped subtotal exceeded the cap, for stats/debugging.
  const cappedPatterns = [];
  for (const [patternId, subtotal] of perPattern) {
    if (subtotal > PATTERN_CONTRIBUTION_CAP) {
      cappedPatterns.push({
        patternId,
        uncapped: Math.round(subtotal * 100) / 100,
        capped: PATTERN_CONTRIBUTION_CAP,
      });
    }
    rawScore += Math.min(subtotal, PATTERN_CONTRIBUTION_CAP);
  }
  for (const subtotal of perPatternNoLeakage.values()) {
    rawScoreNoLeakage += Math.min(subtotal, PATTERN_CONTRIBUTION_CAP);
  }

  let score = Math.min(100, Math.round(rawScore));
  let scoreWithoutLeakage = Math.min(100, Math.round(rawScoreNoLeakage));
  const tooShort = wordCount < THRESHOLDS.TOO_SHORT_WORDS;
  if (tooShort) {
    score = Math.min(score, THRESHOLDS.TOO_SHORT_CAP);
    scoreWithoutLeakage = Math.min(scoreWithoutLeakage, THRESHOLDS.TOO_SHORT_CAP);
    stats.tooShort = true;
  } else {
    stats.tooShort = false;
  }

  const label = score >= THRESHOLDS.AI ? 'AI' : score >= THRESHOLDS.MIXED ? 'MIXED' : 'HUMAN';

  stats.rawScore = Math.round(rawScore * 100) / 100;
  stats.scoreWithoutLeakage = scoreWithoutLeakage;
  stats.patternContributionCap = PATTERN_CONTRIBUTION_CAP;
  stats.cappedPatterns = cappedPatterns;
  stats.issueCount = issues.length;
  stats.p0Count = issues.filter((i) => i.severity === 'P0').length;
  stats.p1Count = issues.filter((i) => i.severity === 'P1').length;
  stats.p2Count = issues.filter((i) => i.severity === 'P2').length;

  return { score, label, issues, stats };
}

/**
 * PATTERNS — a flat, documentation-friendly view of every phrase pattern the
 * engine can fire, with the reference id it implements.
 */
const PATTERNS = (() => {
  const out = [];
  for (const [scope, list] of Object.entries(lexicons.RAW_PATTERNS)) {
    for (const p of list) {
      out.push({
        scope,
        id: p.id,
        type: p.type,
        severity: p.severity,
        minCount: p.minCount || 1,
        // IMP-17 follow-up: `stemPhrases` entries are phrases too, they
        // are matched by the same builder with the definite article allowed
        // after the proclitic, so they must be counted here, or a
        // stem-only pattern reports phraseCount 0 in the docs table.
        phraseCount: (p.phrases || []).length + (p.stemPhrases || []).length,
        stemPhraseCount: (p.stemPhrases || []).length,
        regexCount: (p.regexes || []).length,
      });
    }
  }
  // Signal-only patterns (no phrase list) that the engine can also report.
  out.push(
    { scope: 'signal', id: 'AR-SH-004', type: 'uniform-rhythm', severity: 'P0', minCount: 1, phraseCount: 0, regexCount: 0 },
    { scope: 'signal', id: 'AR-MSA-014', type: 'uniform-paragraphs', severity: 'P2', minCount: 1, phraseCount: 0, regexCount: 0 },
    { scope: 'signal', id: 'AR-MSA-028', type: 'trigram-repetition', severity: 'P2', minCount: 1, phraseCount: 0, regexCount: 0 },
    { scope: 'signal', id: 'AR-SH-002', type: 'transition-density', severity: 'P1', minCount: 1, phraseCount: 0, regexCount: 0 },
    { scope: 'signal', id: 'AR-SH-008', type: 'vocabulary-concentration', severity: 'P2', minCount: 1, phraseCount: 0, regexCount: 0, graded: '1..2' },
    { scope: 'signal', id: 'AR-EGT-026', type: 'msa-leakage', severity: 'P0', minCount: 1, phraseCount: 0, regexCount: 0 },
    { scope: 'signal', id: 'AR-SHM-001', type: 'msa-leakage', severity: 'P0', minCount: 1, phraseCount: 0, regexCount: 0 },
    { scope: 'signal', id: 'AR-SH-TYPO', type: 'punctuation-mixing', severity: 'P2', minCount: 1, phraseCount: 0, regexCount: 0 },
    { scope: 'signal', id: 'AR-SH-TYPO', type: 'digit-mixing', severity: 'P2', minCount: 1, phraseCount: 0, regexCount: 0 },
    { scope: 'signal', id: 'AR-EGT-002', type: 'tanwin-present', severity: 'P1', minCount: 1, phraseCount: 0, regexCount: 0 },
    { scope: 'signal', id: 'AR-SHM-018', type: 'tashkeel-present', severity: 'P0', minCount: 1, phraseCount: 0, regexCount: 0 },
  );
  return out;
})();

module.exports = {
  analyzeText,
  PATTERNS,
  WEIGHTS,
  THRESHOLDS,
  REGISTER_PROFILES,
  GATES: signals.GATES,
};
