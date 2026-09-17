/**
 * humanizer-pro — tests for lib/lang.js
 * origin: humanizer-pro
 *
 * Arabic test strings are either adapted from, or attributed to, the
 * upstream semitic-skills source files pinned in docs/inventory/semitic.md
 * (commit noted there); each Arabic fixture below cites the SKILL.md and
 * line it is drawn from.
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { identify, LEXICONS } = require('../skills/humanizer-pro/scripts/lib/lang.js');

test('pure English prose identifies as en with no variety', () => {
  const text = 'The build broke again this morning. We rolled back the auth refactor and the tests pass now.';
  const r = identify(text);
  assert.equal(r.lang, 'en');
  assert.equal(r.variety, null);
  assert.ok(r.confidence > 0.5, `expected high confidence, got ${r.confidence}`);
  assert.ok(r.arabicRatio <= 0.15);
});

test('pure MSA prose identifies as ar/msa with no strong dialect evidence', () => {
  // Adapted from humanizer-ar-msa/SKILL.md's own register: formal,
  // hedge-free declarative sentences about a general topic, containing no
  // Egyptian or Levantine marker words.
  const text = 'إن التطور التكنولوجي في العصر الحديث يشكل تحديا كبيرا أمام المجتمعات الإنسانية جمعاء اليوم، ويتطلب من المؤسسات التعليمية إعادة النظر في مناهجها بشكل جذري.';
  const r = identify(text);
  assert.equal(r.lang, 'ar');
  assert.equal(r.variety, 'msa');
  assert.ok(r.arabicRatio >= 0.6);
});

test('Egyptian Arabic prose identifies as ar/egt with distinct markers', () => {
  // Egyptian human-register example, drawn from marker words attested in
  // humanizer-ar-egt/SKILL.md: يعني/بقى/خلاص/ماشي (line 50), مش (Pattern 7,
  // line 210), ده/دي/دول (Pattern 5/1), ازاي (Pattern 1 table, line 90),
  // عشان (Pattern 14, line 345), كده (Pattern 1 table, line 91).
  const text = 'يعني أنا مش عارف هعمل إيه بصراحة، الموضوع ده صعب أوي وعايز وقت كتير عشان أفكر فيه كده كويس.';
  const r = identify(text);
  assert.equal(r.lang, 'ar');
  assert.equal(r.variety, 'egt');
  assert.ok(r.evidence.length >= 2, 'expected at least 2 distinct Egyptian markers');
  assert.ok(r.evidence.every((e) => e.variety === 'egt'));
});

test('Levantine Arabic prose identifies as ar/shami with distinct markers', () => {
  // Levantine human-register example, drawn from marker words attested in
  // humanizer-ar-shami/SKILL.md: شو/بدّ/هلق (Philosophy section, line 42),
  // هاد (Pattern 6 table, line 272-288), كتير (line 279), وين (line 275).
  const text = 'شو بدك تعمل هلق؟ هاد الشي كتير مهم يا زلمة، ما فيك تحكي هيك بدون ما تسأل وين رايح قبل ما تحكي.';
  const r = identify(text);
  assert.equal(r.lang, 'ar');
  assert.equal(r.variety, 'shami');
  assert.ok(r.evidence.length >= 2, 'expected at least 2 distinct Levantine markers');
  assert.ok(r.evidence.every((e) => e.variety === 'shami'));
});

test('mixed Arabic + English tech terms routes to the Arabic engine', () => {
  const text = 'We used React and TypeScript and Docker in this new project لتطوير الموقع بتاعنا وعشان نطلقه بسرعة.';
  const r = identify(text);
  assert.equal(r.lang, 'mixed');
  assert.ok(r.arabicRatio > 0.15 && r.arabicRatio < 0.6);
  // 'mixed' still carries a best-guess variety (routed to the Arabic engine).
  assert.ok(['msa', 'egt', 'shami'].includes(r.variety));
});

test('short texts (<=3 words) are unknown or low confidence', () => {
  const empty = identify('');
  assert.equal(empty.lang, 'unknown');
  assert.equal(empty.confidence, 0);

  const twoLetters = identify('لا'); // 2 Arabic letters total, below the 3-letter floor
  assert.equal(twoLetters.lang, 'unknown');

  const threeWords = identify('مرحبا يا صديقي'); // clears the letter floor but is very short
  assert.ok(threeWords.lang === 'unknown' || threeWords.confidence < 0.9);
});

test('override short-circuits detection entirely', () => {
  const r = identify('This text is irrelevant to the override.', { override: { lang: 'ar', variety: 'egt' } });
  assert.equal(r.lang, 'ar');
  assert.equal(r.variety, 'egt');
  assert.equal(r.confidence, 1);
  assert.deepEqual(r.evidence, [{ marker: 'override' }]);
});

test('LEXICONS exports both dialect marker lists non-empty and disjoint', () => {
  assert.ok(Array.isArray(LEXICONS.egt) && LEXICONS.egt.length > 0);
  assert.ok(Array.isArray(LEXICONS.shami) && LEXICONS.shami.length > 0);
  const egtSet = new Set(LEXICONS.egt);
  const overlap = LEXICONS.shami.filter((w) => egtSet.has(w));
  assert.deepEqual(overlap, [], `expected no overlap between egt and shami marker lists, found: ${overlap.join(', ')}`);
});

test('non-string input throws (when not overridden)', () => {
  assert.throws(() => identify(42), TypeError);
});

// ─── IMP-27, dialect-evidence guard ─────────────────────────────────────
//
// Corpus finding 1 (corpus/RESULTS.md): four of the five false positives in
// the 300-document pre-2022 human corpus were plain MSA Wikipedia articles
// that reached the Egyptian engine. The mechanism, measured in
// docs/evidence/round1-wave2F-marker-homographs.txt, is that every dialect
// marker that fires on that corpus is an MSA homograph or a fragment of a
// transliterated foreign name. These tests pin both filters.

const {
  AMBIGUOUS_MARKERS,
  MSA_ANCHOR_WORDS,
  GUARD,
} = require('../skills/humanizer-pro/scripts/lib/lang.js');

test('IMP-27 exports the guard constants it documents', () => {
  assert.ok(Array.isArray(AMBIGUOUS_MARKERS) && AMBIGUOUS_MARKERS.length > 0);
  assert.ok(Array.isArray(MSA_ANCHOR_WORDS) && MSA_ANCHOR_WORDS.length > 0);
  assert.equal(GUARD.DISTINCT_MIN, 2);
  assert.equal(GUARD.DENSITY_PER_100, 1);
  assert.equal(GUARD.MSA_DOMINANCE_RATIO, 3);
  assert.equal(GUARD.HIGH_DENSITY_PER_100, 3);
  // Every ambiguous marker must actually be in one of the marker lexicons,
  // otherwise the list has drifted and is silently doing nothing.
  const known = new Set([...LEXICONS.egt, ...LEXICONS.shami]);
  const orphans = AMBIGUOUS_MARKERS.filter((w) => !known.has(w));
  // بقي and إيه are normalization-variant spellings of lexicon entries
  // (بقى / ايه), so they are allowed to be absent from the raw lists.
  assert.deepEqual(
    orphans.filter((w) => !['بقي', 'إيه'].includes(w)),
    [],
    `ambiguous markers not present in any lexicon: ${orphans.join(', ')}`,
  );
  // The anchor list must stay narrower than lexicons.js's leakage inventory:
  // the wide list contains items that appear freely in written dialect.
  for (const wide of ['جدا', 'فقط', 'كيف', 'أيضا']) {
    assert.ok(
      !MSA_ANCHOR_WORDS.includes(wide),
      `${wide} must not be an MSA anchor, it appears freely in written dialect`
    );
  }
});

test('IMP-27: MSA prose whose only dialect markers are homographs routes msa', () => {
  // Every "dialect" word here is the ordinary MSA reading measured in the
  // corpus: يعني "means", دول "countries", دي the Latin particle in a
  // transliterated name, إيه the letter A in a transliterated acronym.
  const text = 'تشير الدراسة إلى أن مصطلح التنمية يعني في هذا السياق قدرة الدولة على '
    + 'تمويل مشروعاتها، وهو ما تفاوتت فيه دول المنطقة تفاوتا واسعا. وقد أشرف على '
    + 'المشروع الخبير بيريس دي ترافا، بتمويل من وكالة سي آي إيه للتنمية، ولم تنشر '
    + 'الوكالة تقريرها الختامي حتى الآن.';
  const r = identify(text);
  assert.equal(r.lang, 'ar');
  assert.equal(r.variety, 'msa', `expected msa, got ${r.variety}`);
  // The mechanism: no STRONG evidence at all, so detect.js's register-mix
  // dialect-intent gate (which reads `distinct`) cannot fire either.
  assert.equal(r.dialectEvidence.egt.distinct, 0);
  assert.equal(r.dialectEvidence.egt.hits, 0);
  // ...but the markers are still reported, under the ambiguous tally and in
  // evidence[], so nothing is hidden from a caller.
  assert.ok(
    r.dialectEvidence.egt.ambiguousDistinct >= 3,
    `expected >=3 ambiguous marker types, got ${r.dialectEvidence.egt.ambiguousDistinct}`,
  );
  assert.ok(r.evidence.length >= 3, 'ambiguous markers must still appear in evidence[]');
  assert.equal(r.dialectEvidence.egt.guardPassed, false);
});

test('IMP-27: strong dialect markers swamped by MSA anchors fail the guard', () => {
  // Three strong Egyptian markers (مش، ده، كده) in a long MSA-anchored text:
  // 3 * 3 = 9 is below the anchor count, and density is under 3 per 100
  // words, so the guard rejects and the verdict stays msa.
  const anchored = Array.from({ length: 12 }, (_, i) =>
    `القرار الذي صدر في الجلسة رقم ${i + 1} لم يكن نهائيا، ولن تنشر التفاصيل، `
    + 'وليس في الملف ما يوجب ذلك، حيث إن اللجنة التي درسته لم تكتمل، وكذلك '
    + 'اللجنة الفرعية التي سوف تراجعه.').join(' ');
  const text = `${anchored} وهو مش واضح، والملف ده كده.`;
  const r = identify(text);
  const ev = r.dialectEvidence;
  assert.ok(ev.egt.distinct >= 2, `expected >=2 strong egt markers, got ${ev.egt.distinct}`);
  assert.ok(ev.msaHits > ev.egt.hits * GUARD.MSA_DOMINANCE_RATIO,
    `expected MSA anchors (${ev.msaHits}) to swamp ${ev.egt.hits} dialect hits`);
  assert.equal(ev.egt.guardPassed, false);
  assert.equal(r.variety, 'msa', `expected msa under MSA dominance, got ${r.variety}`);
});

test('IMP-27: the high-density escape lets dense dialect text through the guard', () => {
  // Same MSA anchors, but now the dialect markers are dense (>= 3 strong
  // hits per 100 Arabic words), which is the documented escape hatch:
  // dialect writing does legitimately reach for الذي and لم.
  const text = 'القرار الذي صدر لم يكن نهائيا، ولن تنشر التفاصيل، وليس في الملف ما يوجب '
    + 'ذلك، حيث إن اللجنة التي درسته سوف تعيد النظر. بس الموضوع ده مش واضح خالص، '
    + 'وعشان كده احنا عايزين نعرف ازاي حصل، ودلوقتي مفيش حد بيرد، وكمان مش عارفين '
    + 'نعمل ايه بعدين.';
  const r = identify(text);
  const ev = r.dialectEvidence;
  const density = ev.egt.hits / (ev.egt.hits + ev.shami.hits + ev.msaHits) * 100;
  assert.ok(ev.egt.distinct >= 2, `expected >=2 strong egt markers, got ${ev.egt.distinct}`);
  assert.equal(ev.egt.guardPassed, true, `guard should pass on dense dialect text (density ~${density.toFixed(1)})`);
  assert.equal(r.variety, 'egt', `expected egt, got ${r.variety}`);
});

test('IMP-27: dialectEvidence reports msaHits and msaHitsPer100', () => {
  const r = identify('النص الذي لم ينشر، ولن ينشر، وليس هناك ما يوجب نشره، حيث إن '
    + 'اللجنة التي درسته لم تكتمل بعد، وكذلك اللجنة التي سوف تراجعه.');
  assert.equal(typeof r.dialectEvidence.msaHits, 'number');
  assert.ok(r.dialectEvidence.msaHits >= 5, `expected >=5 MSA anchors, got ${r.dialectEvidence.msaHits}`);
  assert.equal(typeof r.dialectEvidence.msaHitsPer100, 'number');
  assert.equal(r.variety, 'msa');
});
