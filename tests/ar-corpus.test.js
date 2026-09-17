/**
 * humanizer-pro, regression tests against named documents of the Arabic
 * human control corpus (IMP-27)
 * origin: humanizer-pro
 *
 * `corpus/raw/` is gitignored, the corpus text is licensed but is not
 * redistributed in this repository (see corpus/README.md). Every test here
 * therefore SKIPS with a message when the raw files are absent, and is only
 * meaningful after:
 *
 *     node tools/fetch-corpus.js
 *
 * Each document is addressed by its `file` in corpus/manifest.json and its
 * sha256 is verified before it is used, which is the corpus's own integrity
 * rule: a document that no longer hashes to the manifest value is not the
 * document these expectations were measured against.
 *
 * What is pinned: the four false positives that `corpus/RESULTS.md` round-1
 * recorded, all of them ordinary pre-2022 MSA Wikipedia articles that the
 * Egyptian engine scored as AI. Round-1 attributed this to `lib/lang.js`'s
 * variety selection; measured, `identify()` returned 'msa' for all 300
 * documents and the promotion came from `detect.js`'s register-mix
 * dialect-intent gate, which reads `dialectEvidence[variety].distinct`. Every
 * marker supplying that `distinct` count was an MSA homograph or a fragment
 * of a transliterated foreign name (docs/evidence/
 * round1-wave2F-marker-homographs.txt). IMP-27 stops those markers counting
 * as dialect evidence, so the gate no longer has anything to fire on.
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const RAW_DIR = path.join(ROOT, 'corpus', 'raw');
const MANIFEST_PATH = path.join(ROOT, 'corpus', 'manifest.json');

const { identify } = require('../skills/humanizer-pro/scripts/lib/lang.js');
const { analyze } = require('../skills/humanizer-pro/scripts/detect.js');
const { THRESHOLDS } = require('../skills/humanizer-pro/scripts/lib/ar-detector/index.js');

/**
 * The four round-1 false positives, by manifest `file`. Scores and marker
 * sets are the round-1 measured values, quoted here so the test documents
 * what it is a regression against.
 */
const MISROUTED = [
  { file: 'encyclopedic-6617310.txt', round1Score: 83, markers: 'إيه x12 (the letter A in سي آي إيه = CIA)' },
  { file: 'encyclopedic-195796.txt', round1Score: 72, markers: 'يعني x1 ("means"), دي x1' },
  { file: 'encyclopedic-6568.txt', round1Score: 71, markers: 'دول x2 ("countries"), دي x1' },
  { file: 'encyclopedic-8622703.txt', round1Score: 68, markers: 'دي x1, دول x1' },
];

/**
 * The other documents that cleared the same gate in round 1 without reaching
 * the AI threshold. They are pinned on the mechanism only (`distinct === 0`),
 * because their scores were never false positives to begin with.
 */
const NEAR_MISSES = [
  'encyclopedic-1917542.txt',
  'encyclopedic-2516065.txt',
  'encyclopedic-8359977.txt',
];

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch (err) {
    return null;
  }
}

const manifest = loadManifest();
const docsByFile = new Map();
if (manifest && Array.isArray(manifest.docs)) {
  for (const d of manifest.docs) docsByFile.set(d.file, d);
}

/**
 * Reads one corpus document, or returns a reason string explaining why the
 * test cannot run. Never throws, so a missing corpus is a skip and not a
 * failure.
 */
function readCorpusDoc(file) {
  if (!manifest) return { skip: 'corpus/manifest.json is missing or unreadable' };
  const record = docsByFile.get(file);
  if (!record) return { skip: `${file} is not in corpus/manifest.json (the sample has been re-fetched)` };
  const full = path.join(RAW_DIR, file);
  if (!fs.existsSync(full)) {
    return { skip: `corpus/raw/${file} is missing, run \`node tools/fetch-corpus.js\` (corpus/README.md)` };
  }
  const buf = fs.readFileSync(full);
  const sha = crypto.createHash('sha256').update(buf).digest('hex');
  if (record.sha256 && sha !== record.sha256) {
    return { skip: `corpus/raw/${file} does not match its manifest sha256, re-fetch before trusting this test` };
  }
  return { text: buf.toString('utf8'), record };
}

const anyCorpus = [...MISROUTED.map((m) => m.file), ...NEAR_MISSES]
  .some((f) => fs.existsSync(path.join(RAW_DIR, f)));

test('corpus/raw is present (otherwise every test in this file skips)', (t) => {
  if (!anyCorpus) {
    t.skip('corpus/raw is absent, run `node tools/fetch-corpus.js` per corpus/README.md');
    return;
  }
  assert.ok(manifest, 'corpus/manifest.json must be readable when corpus/raw exists');
});

for (const entry of MISROUTED) {
  test(`IMP-27: ${entry.file} (round-1 score ${entry.round1Score}) routes msa and is not AI`, (t) => {
    const loaded = readCorpusDoc(entry.file);
    if (loaded.skip) { t.skip(loaded.skip); return; }
    const { text, record } = loaded;

    // Sanity: this is a pre-cutoff human document, so ANY AI verdict on it is
    // a false positive by construction (corpus/README.md).
    assert.ok(
      Date.parse(record.timestamp) < Date.parse('2022-11-30T00:00:00Z'),
      `${entry.file} must predate the corpus cutoff, got ${record.timestamp}`,
    );

    // 1. lib/lang.js's own verdict.
    const id = identify(text);
    assert.equal(id.variety, 'msa', `${entry.file}: expected variety msa, got ${id.variety}`);

    // 2. The mechanism. `distinct` is what detect.js's register-mix
    //    dialect-intent gate reads; every marker in this document is an MSA
    //    homograph or a transliteration fragment (${entry.markers}), so it
    //    must contribute nothing to it.
    assert.equal(
      id.dialectEvidence.egt.distinct, 0,
      `${entry.file}: expected 0 strong egt markers (round-1 markers were ${entry.markers})`,
    );
    assert.equal(id.dialectEvidence.shami.distinct, 0, `${entry.file}: expected 0 strong shami markers`);

    // 3. The outcome through detect.js, which is what fp-measure.js measures.
    const r = analyze(text);
    assert.equal(r.variety, 'msa', `${entry.file}: detect.js must keep variety msa, got ${r.variety}`);
    assert.notEqual(r.label, 'AI', `${entry.file}: must not be labelled AI, got ${r.label} at score ${r.score}`);
    assert.ok(
      r.score < THRESHOLDS.AI,
      `${entry.file}: expected score below ${THRESHOLDS.AI}, got ${r.score} (round 1: ${entry.round1Score})`,
    );
    assert.notEqual(
      r.stats.registerMix && r.stats.registerMix.promoted, true,
      `${entry.file}: register-mix must not promote (${JSON.stringify(r.stats.registerMix)})`,
    );
  });
}

for (const file of NEAR_MISSES) {
  test(`IMP-27: ${file} no longer supplies strong dialect evidence`, (t) => {
    const loaded = readCorpusDoc(file);
    if (loaded.skip) { t.skip(loaded.skip); return; }
    const id = identify(loaded.text);
    assert.equal(id.variety, 'msa');
    assert.equal(id.dialectEvidence.egt.distinct, 0, `${file}: expected 0 strong egt markers`);
    assert.equal(id.dialectEvidence.shami.distinct, 0, `${file}: expected 0 strong shami markers`);
  });
}

/**
 * Corpus finding 2, the fifth round-1 false positive. It was not a routing
 * failure: the document is MSA, was analysed as MSA, and reached score 67 on
 * ONE issue id, AR-MSA-006 (تم/يتم), fifteen times. The per-pattern
 * contribution cap in lib/ar-detector/index.js is what brings it down.
 */
test('IMP-27: encyclopedic-893832.txt (round-1 score 67, AR-MSA-006 x15) is no longer AI', (t) => {
  const loaded = readCorpusDoc('encyclopedic-893832.txt');
  if (loaded.skip) { t.skip(loaded.skip); return; }
  const r = analyze(loaded.text);
  assert.equal(r.variety, 'msa');
  assert.notEqual(r.label, 'AI', `expected not AI, got ${r.label} at score ${r.score} (round 1: 67)`);
  assert.ok(r.score < THRESHOLDS.AI, `expected score below ${THRESHOLDS.AI}, got ${r.score}`);
  // The cap must be the reason: AR-MSA-006's uncapped subtotal exceeded it.
  const capped = (r.stats.cappedPatterns || []).find((c) => c.patternId === 'AR-MSA-006');
  assert.ok(capped, `expected AR-MSA-006 to be capped, got ${JSON.stringify(r.stats.cappedPatterns)}`);
  assert.ok(
    capped.uncapped > THRESHOLDS.PATTERN_CONTRIBUTION_CAP,
    `expected an uncapped subtotal above the cap, got ${capped.uncapped}`,
  );
});
