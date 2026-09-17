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
