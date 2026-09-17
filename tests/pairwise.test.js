/**
 * humanizer-pro — tests for tools/prepare-pairwise.js
 * origin: humanizer-pro
 *
 * Proves the pairwise ballot generator (IMP-07) is deterministic from its
 * seed, that different seeds produce different orderings, and that the
 * key (which label is which candidate) never leaks into ballot.md.
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const { build } = require('../tools/prepare-pairwise.js');

const ROOT = path.resolve(__dirname, '..');
const pairsSpec = JSON.parse(fs.readFileSync(path.join(ROOT, 'evals', 'human', 'pairs.json'), 'utf8'));

test('same seed + same spec produces a byte-identical ballot and key', () => {
  const run1 = build(pairsSpec, 42);
  const run2 = build(pairsSpec, 42);
  assert.equal(run1.ballotMd, run2.ballotMd, 'ballot.md must be byte-identical across runs with the same seed');
  assert.deepEqual(run1.key, run2.key, 'key.json must be identical across runs with the same seed');
});

test('different seeds produce a different candidate order', () => {
  const runA = build(pairsSpec, 1);
  const runB = build(pairsSpec, 2);
  assert.notEqual(runA.ballotMd, runB.ballotMd, 'different seeds should produce a different ballot ordering');
  assert.notDeepEqual(runA.key, runB.key, 'different seeds should produce a different key');
});

test('key.json content (which label is which candidate) never appears in ballot.md', () => {
  const { ballotMd, key } = build(pairsSpec, 7);
  // The only thing that could leak is which candidate (A/B, i.e. original vs
  // rewrite) each numeric label corresponds to. Assert none of the
  // candidate-identifying source paths, iteration markers, or the raw A/B
  // key fields appear anywhere in the rendered ballot.
  const forbiddenSubstrings = ['rewritten.md', 'edited.md', 'iteration-1', 'evals/inputs', 'candidateAFile', 'candidateBFile', '"label1"', '"label2"'];
  for (const s of forbiddenSubstrings) {
    assert.ok(!ballotMd.includes(s), `ballot.md must not contain "${s}"`);
  }
  // Sanity: the key really does carry the A/B assignment info that must not leak.
  assert.ok(key.pairs.every((p) => p.label1 === 'A' || p.label1 === 'B'));
  assert.ok(key.pairs.every((p) => p.label2 === 'A' || p.label2 === 'B'));
});

test('every pair id from the spec appears exactly once in the ballot and the key', () => {
  const { ballotMd, key } = build(pairsSpec, 99);
  assert.equal(key.pairs.length, pairsSpec.length);
  for (const p of pairsSpec) {
    const matches = ballotMd.split('`' + p.id + '`').length - 1;
    assert.equal(matches, 1, `pair id ${p.id} should appear exactly once in the ballot`);
    assert.ok(key.pairs.some((kp) => kp.id === p.id), `pair id ${p.id} should appear in key.json`);
  }
});
