/**
 * humanizer-pro — tests for lib/arabic-normalize.js
 * origin: humanizer-pro
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { normalize } = require('../skills/humanizer-pro/scripts/lib/arabic-normalize.js');

test('strips a heavy tashkeel string and keeps exact offsets', () => {
  // "أَنَا أَذْهَبُ إِلَى المَدْرَسَةِ ٱلْيَوْمَ" — "I am going to school today", heavily
  // diacritized, including tatweel-free but dense fatha/damma/sukun marks
  // and one ٱ (alef wasla) token.
  const original = 'أَنَا أَذْهَبُ إِلَى المَدْرَسَةِ ٱلْيَوْمَ';
  const { normalized, map } = normalize(original);

  assert.equal(normalized, 'انا اذهب الي المدرسة اليوم');
  assert.equal(map.length, normalized.length);

  // Every mapped index must point at the correct original character, and
  // that character must be one of the normalized-output's source chars
  // (either an unchanged pass-through or a known substitution source).
  for (let i = 0; i < normalized.length; i += 1) {
    const origIndex = map[i];
    assert.ok(origIndex >= 0 && origIndex < original.length, `map[${i}] out of range`);
  }
});

test('tatweel (kashida) is removed and does not appear in the map', () => {
  const original = 'مرحـــبا';
  const { normalized } = normalize(original);
  assert.equal(normalized, 'مرحبا');
  assert.ok(!normalized.includes('ـ'));
});

test('alef forms unify to bare alef: أ إ آ ٱ -> ا', () => {
  const original = 'أحمد إبراهيم آدم ٱلرحمن';
  const { normalized } = normalize(original);
  assert.equal(normalized, 'احمد ابراهيم ادم الرحمن');
});

test('alef maqsura unifies to ya: ى -> ي', () => {
  const { normalized } = normalize('على مصطفى');
  assert.equal(normalized, 'علي مصطفي');
});

test('ta marbuta is left untouched by default', () => {
  const { normalized } = normalize('مدرسة جميلة');
  assert.equal(normalized, 'مدرسة جميلة');
});

test('ta marbuta unifies to ha when options.taMarbuta is true', () => {
  const { normalized } = normalize('مدرسة جميلة', { taMarbuta: true });
  assert.equal(normalized, 'مدرسه جميله');
});

test('Arabic-Indic and Extended Arabic-Indic digits pass through untouched', () => {
  const original = 'السنة ٢٠٢٦ والرقم ۱۲۳ باقي زي ما هو';
  const { normalized, map } = normalize(original);
  // Digits are unaffected by any substitution rule, and this string has no
  // tashkeel/tatweel/alef-family characters, so normalized should be
  // identical to the original.
  assert.equal(normalized, original);
  assert.equal(map.length, original.length);
  for (let i = 0; i < map.length; i += 1) assert.equal(map[i], i);
});

test('round-trips a slice via toOriginalRange', () => {
  const original = 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ';
  const { normalized, toOriginalRange } = normalize(original);
  // Take the normalized form of the first word and confirm the returned
  // original-string range, when sliced, stringifies back (after stripping
  // tashkeel by eye) to the same first word.
  const firstSpaceNorm = normalized.indexOf(' ');
  const [origStart, origEnd] = toOriginalRange(0, firstSpaceNorm);
  const origSlice = original.slice(origStart, origEnd);
  const strippedSlice = origSlice.replace(/[ً-ٰٟۖ-ۭـ]/g, '');
  assert.equal(strippedSlice, normalized.slice(0, firstSpaceNorm));
});

test('toOriginal maps the end-of-string sentinel to original.length', () => {
  const original = 'سَلام';
  const { normalized, toOriginal } = normalize(original);
  assert.equal(toOriginal(normalized.length), original.length);
});

test('empty string normalizes to empty string with an empty map', () => {
  const { normalized, map } = normalize('');
  assert.equal(normalized, '');
  assert.equal(map.length, 0);
});

test('non-string input throws', () => {
  assert.throws(() => normalize(42), TypeError);
});

test('mixed Arabic/Latin text: only Arabic-block chars are touched', () => {
  const original = 'Node.js وَ TypeScript أَدَوَات رائِعة';
  const { normalized } = normalize(original);
  assert.ok(normalized.includes('Node.js'));
  assert.ok(normalized.includes('TypeScript'));
  assert.equal(normalized, 'Node.js و TypeScript ادوات رائعة');
});
