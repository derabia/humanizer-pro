/**
 * humanizer-pro — Arabic AI-tell phrase lexicons
 *
 * origin: humanizer-pro
 *
 * Every list below cites the pattern ID it implements. Pattern IDs are the
 * ones defined in this skill's reference files:
 *   references/ar-shared.md    AR-SH-001 … AR-SH-007 + typography
 *   references/ar-msa.md       AR-MSA-001 … AR-MSA-028
 *   references/ar-egyptian.md  AR-EGT-001 … AR-EGT-026
 *   references/ar-levantine.md AR-SHM-001 … AR-SHM-025
 *
 * Only the *phrase-detectable* subset of those patterns lives here. Patterns
 * whose definition is "device X is ABSENT" (AR-MSA-018 saj', AR-MSA-019
 * metaphor, AR-MSA-021 / AR-EGT-021 / AR-SHM-015 rhetorical questions,
 * AR-EGT-009 / AR-SHM-011 discourse particles, AR-EGT-016 / AR-SHM-016/017
 * code-switching, AR-EGT-019 letter lengthening, …) are deliberately NOT
 * scored: an absence fires on every short or technical text and would make
 * the detector a false-positive machine. See scripts/README.md, "What the
 * Arabic engine does not score".
 *
 * Rhetorical questions are never a signal in Arabic — see ar-shared.md,
 * "Rhetorical devices that are NOT tells in Arabic".
 *
 * MATCHING MODEL
 * --------------
 * Phrases are stored here in ordinary spelling and normalized at module load
 * with lib/arabic-normalize.js (`taMarbuta: false`, same setting lib/lang.js
 * uses) so they match the normalized document string: alef forms unified,
 * alef maqsura -> ya, tashkeel and tatweel stripped. Writing `إلى` here and
 * matching `الي` in the normalized text therefore works without the caller
 * having to think about it.
 *
 * Word boundaries are Arabic-aware: JavaScript `\b` is ASCII-only and would
 * happily match لا inside لازم. Each phrase is wrapped in Arabic-letter
 * lookaround, with an optional single-letter proclitic (و / ف / ب / ل / ك)
 * allowed in front so وعلاوة على ذلك and فهذا still hit.
 */

'use strict';

const { normalize } = require('../arabic-normalize.js');

// Arabic letters, used for the left/right boundary assertions.
const AR_LETTER = '\\u0621-\\u064A\\u0671-\\u06D3';

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Normalize a lexicon phrase the same way document text gets normalized. */
function normalizePhrase(phrase) {
  return normalize(phrase, { taMarbuta: false }).normalized;
}

/**
 * Build one global regex that matches any phrase in `phrases`, on the
 * NORMALIZED string, with Arabic-aware boundaries.
 *
 * - inner whitespace becomes `\s+` so a phrase split across a line break
 *   still matches;
 * - an optional proclitic (و ف ب ل ك) is allowed before the phrase but is
 *   NOT captured into the reported span, so the excerpt stays the phrase;
 * - the left boundary forbids a preceding Arabic letter (beyond the
 *   proclitic) and the right boundary forbids a following Arabic letter.
 */
function buildPhraseRegex(phrases) {
  const alts = phrases
    .map(normalizePhrase)
    .filter((p) => p.length > 0)
    // Longest first so a longer phrase wins over a shorter prefix of it.
    .sort((a, b) => b.length - a.length)
    .map((p) => escapeRegExp(p).replace(/\s+/g, '\\s+'));
  if (alts.length === 0) return null;
  return new RegExp(
    `(?<![${AR_LETTER}])[وفبلك]?(${alts.join('|')})(?![${AR_LETTER}])`,
    'gu',
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Shared patterns — applied to every variety (references/ar-shared.md)
// ─────────────────────────────────────────────────────────────────────────

const SHARED_PATTERNS = [
  {
    id: 'AR-SH-001',
    type: 'hedge-opener',
    severity: 'P1',
    minCount: 1,
    // ar-shared.md AR-SH-001 "What it looks like" phrase list, plus the
    // Egyptian realization of the same family (AR-EGT-011, egt:283-290).
    phrases: [
      'من المهم الإشارة إلى',
      'من المهم أن نلاحظ',
      'من المهم أن نشير إلى',
      'يجب الإشارة إلى',
      'من الضروري أن نذكر',
      'تجدر الإشارة إلى',
      'لا بد من التنويه',
      'ومما لا شك فيه',
      'مما لا شك فيه',
      'جدير بالذكر',
      'من الجدير بالذكر',
      'من الجدير بالإشارة', // eval msa-edit-01 finding: common variant missing
      'يجدر بالإشارة',
      'لا شك أن',
      'من الواضح أن',
    ],
    suggestion:
      'احذف التحوّط وابدأ بالدعوى نفسها (AR-SH-001). إن كان الشك حقيقيًا فسمِّ مصدره ودرجته بدل المُلطِّف الجاهز.',
  },
  {
    id: 'AR-SH-002-A',
    type: 'transition',
    severity: 'P0',
    minCount: 1,
    // ar-shared.md AR-SH-002 / ar-msa.md AR-MSA-003: singled out upstream as
    // the single strongest per-pattern MSA AI signature.
    phrases: ['علاوة على ذلك'],
    suggestion:
      'استبدلها بـ «إضافة إلى ذلك» أو «فضلًا عن ذلك» أو احذفها إن كان الربط واضحًا من المحتوى (AR-SH-002 / AR-MSA-003).',
  },
  {
    id: 'AR-SH-002-B',
    type: 'transition',
    severity: 'P2',
    minCount: 2,
    // ar-shared.md AR-SH-002 transition family (AR-MSA-004 list).
    phrases: [
      'وبالتالي',
      'بالتالي',
      'بالإضافة إلى ذلك',
      'بالإضافة إلى',
      'ومن ثم',
      'من ثم',
      'على الرغم من ذلك',
      'في هذا السياق',
      'من ناحية أخرى',
      'وعليه يمكن القول',
    ],
    suggestion:
      'نوِّع الروابط أو احذف ما لا يحمل وزنًا منطقيًا حقيقيًا؛ لا تكرر الرابط نفسه (AR-SH-002 / AR-MSA-004).',
  },
  {
    id: 'AR-SH-002-C',
    type: 'formulaic-conclusion',
    severity: 'P1',
    minCount: 1,
    // ar-shared.md AR-SH-002 closing list + AR-EGT-012 (egt:310-315).
    phrases: [
      'في الخلاصة',
      'خلاصة القول',
      'وخلاصة القول',
      'باختصار',
      'وختاما',
      'وفي الختام',
      'في الختام',
      'وبهذا نكون قد',
      'في نهاية المطاف',
      'مما سبق يتبين',
      'مما سبق يتضح',
      'يتضح لنا من ذلك',
      'آمل أن يكون ذلك مفيدا',
      'آمل أن يكون هذا مفيدا',
    ],
    suggestion:
      'استبدل الخاتمة النمطية بدعوى مكثّفة أو صورة أخيرة — أو توقّف ببساطة (AR-SH-002 / AR-MSA-005).',
  },
  {
    id: 'AR-SH-003',
    type: 'significance-inflation',
    severity: 'P1',
    minCount: 1,
    // ar-shared.md AR-SH-003 + AR-MSA-019 dead-metaphor examples.
    phrases: [
      'ركيزة أساسية',
      'من أهم الركائز',
      'من أهم العوامل',
      'من أهم العوامل المؤثرة',
      'مفتاح النجاح',
      'أسس التنمية',
      'ركائز المجتمع',
      'يعد ركيزة',
      'يعتبر من أهم',
      'يعد من أهم',
      'له دور محوري',
      'يلعب دورا محوريا',
      'يلعب دورا هاما',
    ],
    suggestion:
      'استبدل صيغة التضخيم بالسبب الفعلي لأهمية الدعوى: نتيجة، آلية، مقارنة (AR-SH-003).',
  },
  {
    id: 'AR-SH-006',
    type: 'chatbot-ritual',
    severity: 'P0',
    minCount: 1,
    // ar-shared.md AR-SH-006 / AR-EGT-015 (egt:362-378): calqued English
    // chatbot ritual + sycophancy.
    phrases: [
      'شكرا على سؤالك الرائع',
      'شكرا على هذا السؤال الرائع',
      'سؤال ممتاز',
      'سؤال رائع',
      'يسعدني مساعدتك',
      'يسعدني الإجابة',
      'سعيد بمساعدتك',
      'بكل سرور سأساعدك',
      'بالتأكيد!',
      'كمساعد ذكاء اصطناعي',
      'بصفتي نموذجا لغويا',
    ],
    suggestion:
      'احذف الافتتاحية التملّقية بالكامل؛ إن لزم الإقرار فاستعمل صيغة طبيعية في السجل نفسه (AR-SH-006).',
  },
  {
    id: 'AR-SH-007',
    type: 'passive-disguise',
    severity: 'P1',
    minCount: 2,
    // ar-shared.md AR-SH-007: the morphological passive family, cross-variety
    // (AR-MSA-026, AR-EGT-008, AR-SHM-014). minCount 2 mirrors the upstream
    // "more than roughly 2 per 200 words" framing — one passive is not a tell.
    phrases: [
      'يعتبر',
      'يُعتبر',
      'يُعدّ',
      'يعد',
      'يستخدم',
      'يُستخدم',
      'يلاحظ',
      'يُلاحظ',
      'يشار إلى',
      'يُشار إلى',
      'يقال',
      'يُقال',
      'يرى',
      'يُرى',
      'يذكر',
      'يُذكر',
      'يفترض',
      'يُفترض',
    ],
    suggestion:
      'سمِّ الفاعل واكتب الجملة بالمبني للمعلوم؛ وإن كان الفاعل مجهولًا فاستعمل فاعلًا عامًّا بدل صيغة المجهول (AR-SH-007).',
  },
];

// ─────────────────────────────────────────────────────────────────────────
// MSA-only patterns (references/ar-msa.md)
// ─────────────────────────────────────────────────────────────────────────

const MSA_PATTERNS = [
  {
    id: 'AR-MSA-002',
    type: 'cliche-opener',
    severity: 'P1',
    minCount: 1,
    // ar-msa.md AR-MSA-002 "What it looks like" list.
    phrases: [
      'في الآونة الأخيرة',
      'في العصر الحديث',
      'إن العالم اليوم',
      'يشهد العالم حاليا',
      'يشهد العالم',
      'في ظل التطورات المتسارعة',
      'في خضم التحولات',
      'مع تسارع وتيرة',
      'في عالم يتغير بسرعة',
      'في ظل التحديات المتزايدة',
    ],
    suggestion:
      'احذف الافتتاحية المشهدية وابدأ الفقرة بالدعوى أو الملاحظة أو الصورة المحددة (AR-MSA-002).',
  },
  {
    id: 'AR-MSA-006',
    type: 'periphrastic-passive',
    severity: 'P0',
    minCount: 2,
    // ar-msa.md AR-MSA-006: the تم/يتم + verbal-noun periphrastic passive.
    // minCount 2 — the pattern is a density tell ("repeated within a single
    // paragraph"), not a single-occurrence one.
    phrases: ['تم', 'تمت', 'يتم', 'يتمّ', 'وتم', 'سيتم'],
    suggestion:
      'حوِّل إلى المبني للمعلوم مع تسمية الفاعل؛ وإن كان مجهولًا فاستعمل فاعلًا عامًّا بدل تم/يتم (AR-MSA-006).',
  },
  {
    id: 'AR-MSA-007',
    type: 'vocabulary-homogeneity',
    severity: 'P2',
    minCount: 2,
    // ar-msa.md AR-MSA-007: mechanical synonym rotation for the same claim.
    phrases: [
      'أثبتت الدراسات',
      'أظهرت الأبحاث',
      'كشفت الدراسات العلمية',
      'تشير الدراسات إلى أن',
      'تشير الأبحاث إلى أن',
      'تؤكد الدراسات',
    ],
    suggestion:
      'وحِّد المصطلح حيث لا يضيف التنويع شيئًا، أو استعمل المرادف حين يحمل فرقًا دلاليًا حقيقيًا (AR-MSA-007).',
  },
  {
    id: 'AR-MSA-008',
    type: 'over-formalization',
    severity: 'P1',
    minCount: 1,
    // ar-msa.md AR-MSA-008 register-mismatch phrase set.
    phrases: [
      'يتجلى ذلك في',
      'يتجلى ذلك جليا',
      'في إطار تحليلنا',
      'وعليه يمكن القول إن',
      'ومما لا ريب فيه',
    ],
    suggestion:
      'طابق السجل مع الجمهور والنوع الكتابي بدل رفع الرسمية آليًا (AR-MSA-008).',
  },
  {
    id: 'AR-MSA-012',
    type: 'syntactic-template',
    severity: 'P2',
    minCount: 3,
    // ar-msa.md AR-MSA-012: the same sentence-opening template repeated.
    phrases: ['يعد', 'يُعد', 'يعتبر', 'يشكل', 'يُشكل'],
    suggestion:
      'نوِّع مطالع الجمل بالتقديم والتأخير أو التبئير بدل تكرار القالب نفسه (AR-MSA-012).',
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Egyptian-only patterns (references/ar-egyptian.md)
// ─────────────────────────────────────────────────────────────────────────

const EGT_PATTERNS = [
  {
    id: 'AR-EGT-001',
    type: 'msa-vocabulary',
    severity: 'P1',
    minCount: 2,
    // ar-egyptian.md AR-EGT-001 substitution table (egt:80-100). Scored from
    // the 2nd hit: one MSA word can be a quotation; a run of them is the tell.
    phrases: [
      'الآن',
      'أريد',
      'اذهب',
      'أرى',
      'أشاهد',
      'ماذا',
      'كيف',
      'هكذا',
      'نعم',
      'أيضا',
      'ثم',
      'دائما',
      'كثيرا',
      'الذي',
      'التي',
      'الذين',
    ],
    suggestion:
      'استبدل المفردة الفصحى بمقابلها المصري: الآن→دلوقتي، أريد→عايز، ماذا→إيه، كيف→ازاي، أيضًا→كمان، الذي/التي→اللي (AR-EGT-001، AR-EGT-026).',
  },
  {
    id: 'AR-EGT-005',
    type: 'msa-demonstrative',
    severity: 'P0',
    minCount: 1,
    // ar-egyptian.md AR-EGT-005 (egt:160-176): MSA demonstrative placed
    // BEFORE a definite noun. The bigram — not the bare word — is the tell.
    regexes: [
      {
        // هذا/هذه/هؤلاء/ذلك/تلك + ال-noun
        source: `(?<![${AR_LETTER}])[وفبلك]?((?:هذا|هذه|هؤلاء|ذلك|تلك)\\s+ال[${AR_LETTER}]+)(?![${AR_LETTER}])`,
      },
    ],
    suggestion:
      'اقلب الترتيب واستعمل الصيغة المصرية بعد الاسم: هذا الكتاب→الكتاب ده، هذه المشكلة→المشكلة دي، هؤلاء الناس→الناس دول (AR-EGT-005).',
  },
  {
    id: 'AR-EGT-003',
    type: 'msa-future',
    severity: 'P0',
    minCount: 1,
    // ar-egyptian.md AR-EGT-003 (egt:122-138). سـ-prefixed forms are listed
    // explicitly rather than matched by a `س[يتنأ]…` regex, which would also
    // hit ordinary words such as سيارة.
    phrases: [
      'سوف',
      'سيكون',
      'ستكون',
      'سنكون',
      'سأكون',
      'سيتم',
      'سيصبح',
      'ستصبح',
      'سنقوم',
      'سأقوم',
      'سيؤدي',
      'ستؤدي',
      'سنرى',
      'سيساعد',
      'ستساعد',
      'سيذهب',
      'سنتحدث',
      'سأفعل',
      'سيفعل',
      'سنأكل',
      'ستفهم',
    ],
    suggestion:
      'الفصحى تبني المستقبل بـ سـ/سوف؛ المصرية تبنيه بـ حـ/هـ: سوف نتحدث→هنتكلم، سأذهب→هروح (AR-EGT-003).',
  },
  {
    id: 'AR-EGT-007',
    type: 'msa-negation',
    severity: 'P1',
    minCount: 2,
    // ar-egyptian.md AR-EGT-007 (egt:199-219). لا is deliberately excluded:
    // it is a legitimate prohibition/answer particle and a prefix of ordinary
    // words, and matching it produces false positives.
    phrases: ['لم', 'لن', 'ليس', 'ليست', 'لست', 'لسنا', 'لسنَ'],
    suggestion:
      'استعمل نظام النفي المصري: ما+فعل+ش (ماعرفش)، مش للاسم/الصفة، مش حـ للمستقبل، مفيش للوجود (AR-EGT-007).',
  },
  {
    id: 'AR-EGT-013',
    type: 'msa-intensifier',
    severity: 'P0',
    minCount: 1,
    // ar-egyptian.md AR-EGT-013 (egt:331-342): "One جداً = AI."
    phrases: ['جدا', 'جداً'],
    suggestion: 'استبدل كل «جدًا» بـ «أوي» بعد الصفة أو الفعل (AR-EGT-013).',
  },
  {
    id: 'AR-EGT-014',
    type: 'msa-causal',
    severity: 'P2',
    minCount: 1,
    // ar-egyptian.md AR-EGT-014 (egt:345-359): لأن / لكي / من أجل أن → عشان.
    phrases: ['لكي', 'من أجل أن', 'كي يتم', 'من أجل تحقيق'],
    suggestion: 'المصرية تستعمل «عشان» للسببية والغاية معًا (AR-EGT-014).',
  },
  {
    id: 'AR-EGT-024',
    type: 'address-term',
    severity: 'P2',
    minCount: 1,
    // ar-egyptian.md AR-EGT-024 (egt:547-567): يا صديقي reads as dubbed film.
    phrases: ['يا صديقي', 'يا صديقتي', 'يا سيدي'],
    suggestion:
      'استبدلها بـ «يا حبيبي» أو «يا صاحبي» أو «يا عم» حسب النبرة (AR-EGT-024).',
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Levantine-only patterns (references/ar-levantine.md) — experimental
// ─────────────────────────────────────────────────────────────────────────

const SHM_PATTERNS = [
  {
    id: 'AR-SHM-004',
    type: 'msa-future',
    severity: 'P0',
    minCount: 1,
    // ar-levantine.md AR-SHM-004 (shm:199-218): "its presence in Levantine
    // text has zero ambiguity". Levantine future is رح — never حـ/هـ, which
    // is Egyptian's marker.
    phrases: [
      'سوف',
      'سيكون',
      'ستكون',
      'سنكون',
      'سأكون',
      'سيتم',
      'سيصبح',
      'ستصبح',
      'سنقوم',
      'سأقوم',
      'سيؤدي',
      'ستؤدي',
      'سنرى',
      'سأذهب',
      'سيذهب',
      'سنتحدث',
    ],
    suggestion:
      'استبدل سوف/سـ بـ «رح» واحذف الباء من الفعل التالي: سأذهب→رح روح (AR-SHM-004).',
  },
  {
    id: 'AR-SHM-005',
    type: 'msa-negation',
    severity: 'P1',
    minCount: 2,
    // ar-levantine.md AR-SHM-005 (shm:220-255). لا is excluded: the source
    // keeps it for direct prohibition in every variant (لا تروح!).
    phrases: ['لم', 'لن', 'ليس', 'ليست', 'لست', 'لسنا'],
    suggestion:
      'استعمل «ما» لنفي الفعل (وـش للفلسطيني) و«مش/مو» لنفي الاسم والصفة (AR-SHM-005).',
  },
  {
    id: 'AR-SHM-006',
    type: 'msa-question-word',
    severity: 'P1',
    minCount: 2,
    // ar-levantine.md AR-SHM-006 regional substitution table (shm:272-288).
    phrases: [
      'ماذا',
      'متى',
      'أين',
      'لماذا',
      'هؤلاء',
      'كثيرا',
      'الذي',
      'التي',
      'الذين',
      'أيضا',
      'فقط',
    ],
    suggestion:
      'استبدل أدوات الاستفهام والإشارة الفصحى: ماذا→شو/إيش، أين→وين، متى→إيمتا، لماذا→ليش، هذا→هاد/هيدا، الذي/التي→اللي (AR-SHM-006).',
  },
  {
    id: 'AR-SHM-007',
    type: 'msa-volition',
    severity: 'P1',
    minCount: 1,
    // ar-levantine.md AR-SHM-007 (shm:307-343): the بدّ system is what AI
    // almost never produces spontaneously.
    phrases: ['أريد أن', 'يريد أن', 'تريد أن', 'نريد أن', 'أود أن', 'أرغب في', 'أتمنى أن'],
    suggestion:
      'استعمل نظام بدّ: أريد→بدّي، يريد→بدّو، نريد→بدّنا، والفعل بعده مضارع مجرد بلا باء (AR-SHM-007).',
  },
  {
    id: 'AR-SHM-001',
    type: 'msa-conjugation',
    severity: 'P1',
    minCount: 1,
    // ar-levantine.md AR-SHM-001 (shm:116-140): formal conjugation
    // يُريدُ أن / يستطيعُ أن and Classical syntax order.
    phrases: ['يستطيع أن', 'تستطيع أن', 'نستطيع أن', 'ينبغي أن', 'يجب أن نأخذ', 'لا بد أن'],
    suggestion:
      'أعد بناء الجملة بالكامل بالقواعد الشامية، لا باستبدال المفردات فقط (AR-SHM-001).',
  },
  {
    id: 'AR-SHM-022',
    type: 'address-term',
    severity: 'P2',
    minCount: 1,
    // ar-levantine.md AR-SHM-022 (shm:830-864).
    phrases: ['يا صديقي', 'يا صديقتي', 'يا سيدي', 'يا أخي الكريم'],
    suggestion:
      'استبدلها بـ «حبيبي/حبيبتي» أو «يا زلمي» أو «يا عمي» حسب السياق (AR-SHM-022).',
  },
];

// ─────────────────────────────────────────────────────────────────────────
// MSA-leakage function words (signal `g`) — dialect varieties only
// ─────────────────────────────────────────────────────────────────────────
//
// Sources: ar-egyptian.md AR-EGT-026 "MSA → Egyptian checklist" and
// ar-levantine.md AR-SHM-001 "MSA → Levantine checklist". The ratio is
// MSA hits / (MSA hits + dialect hits); `ما` is NOT counted on the dialect
// side because it is also an ordinary MSA particle.

const MSA_FUNCTION_WORDS = [
  // Negators (AR-EGT-007 / AR-SHM-005). لا is excluded, see above.
  'لم', 'لن', 'ليس', 'ليست', 'لست', 'لسنا',
  // Future (AR-EGT-003 / AR-SHM-004).
  'سوف', 'سيكون', 'ستكون', 'سيتم', 'سأكون', 'سنكون',
  // Demonstratives (AR-EGT-005 / AR-SHM-006).
  'هذا', 'هذه', 'هؤلاء', 'ذلك', 'تلك', 'هذان', 'هاتان',
  // Relatives (AR-EGT-026 / AR-SHM-006).
  'الذي', 'التي', 'الذين', 'اللذان', 'اللواتي',
  // Interrogatives (AR-EGT-001 / AR-SHM-006).
  'ماذا', 'متى', 'أين', 'لماذا', 'كيف',
  // Core lexicon (AR-EGT-001 table / AR-SHM-006 table).
  'الآن', 'أريد', 'يريد', 'جدا', 'أيضا', 'كثيرا', 'هكذا', 'دائما', 'فقط',
];

const DIALECT_FUNCTION_WORDS = {
  // Egyptian equivalents of the list above (AR-EGT-001/003/005/007/013).
  egt: [
    'مش', 'مفيش', 'ماشي', 'ده', 'دي', 'دول', 'اللي', 'دلوقتي', 'عايز', 'عايزة',
    'إيه', 'ازاي', 'إزاي', 'كده', 'أيوه', 'أوي', 'كمان', 'عشان', 'علشان',
    'بقى', 'يعني', 'فين', 'ليه', 'بتاع', 'هيكون', 'هنعمل', 'هروح',
  ],
  // Levantine equivalents (AR-SHM-002/004/005/006/007).
  shami: [
    'مش', 'مو', 'رح', 'عم', 'هلق', 'هلأ', 'شو', 'إيش', 'وين', 'ليش', 'كتير',
    'هاد', 'هاي', 'هيدا', 'هيدي', 'هدول', 'هيدول', 'اللي', 'بدي', 'بدّي',
    'بدك', 'بدّك', 'بدو', 'بدّو', 'قديش', 'أديش', 'إيمتا', 'هيك', 'لهيك',
    'منيح', 'عنجد', 'انتو', 'هني',
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// Compilation
// ─────────────────────────────────────────────────────────────────────────

function compilePattern(pattern) {
  const compiled = {
    id: pattern.id,
    type: pattern.type,
    severity: pattern.severity,
    minCount: pattern.minCount || 1,
    suggestion: pattern.suggestion,
    regexes: [],
  };
  if (pattern.phrases && pattern.phrases.length) {
    const re = buildPhraseRegex(pattern.phrases);
    if (re) compiled.regexes.push(re);
  }
  if (pattern.regexes) {
    for (const spec of pattern.regexes) {
      compiled.regexes.push(new RegExp(spec.source, 'gu'));
    }
  }
  return compiled;
}

const COMPILED = {
  shared: SHARED_PATTERNS.map(compilePattern),
  msa: MSA_PATTERNS.map(compilePattern),
  egt: EGT_PATTERNS.map(compilePattern),
  shami: SHM_PATTERNS.map(compilePattern),
};

/** All patterns that apply to a given variety, shared first. */
function patternsFor(variety) {
  const own = COMPILED[variety] || [];
  return COMPILED.shared.concat(own);
}

function buildWordSetRegex(words) {
  return buildPhraseRegex(words);
}

module.exports = {
  AR_LETTER,
  patternsFor,
  buildPhraseRegex,
  normalizePhrase,
  MSA_FUNCTION_WORDS,
  DIALECT_FUNCTION_WORDS,
  MSA_LEAKAGE_REGEX: buildWordSetRegex(MSA_FUNCTION_WORDS),
  DIALECT_LEAKAGE_REGEX: {
    egt: buildWordSetRegex(DIALECT_FUNCTION_WORDS.egt),
    shami: buildWordSetRegex(DIALECT_FUNCTION_WORDS.shami),
  },
  // Raw (uncompiled) definitions, exported for docs/tests.
  RAW_PATTERNS: {
    shared: SHARED_PATTERNS,
    msa: MSA_PATTERNS,
    egt: EGT_PATTERNS,
    shami: SHM_PATTERNS,
  },
};
