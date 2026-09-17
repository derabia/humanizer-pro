/**
 * humanizer-pro — tests for the IMP-13 register-conditional thresholds.
 * origin: humanizer-pro
 *
 * `register: 'formal'` relaxes the sentence-rhythm gate (AR-SH-004) and
 * nothing else. The fixture tests/fixtures/register/formal-human-msa.md is a
 * human-authored formal MSA passage (administrative-law commentary) whose
 * sentence-length coefficient of variation sits in the 0.22–0.35 band: the
 * default profile calls that metronomic and fires a P0, the formal profile
 * does not. An AI fixture must still be convicted under `formal`.
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const SCRIPTS = path.join(__dirname, '..', 'skills', 'humanizer-pro', 'scripts');
const CLI = path.join(SCRIPTS, 'detect.js');
const arDetector = require(path.join(SCRIPTS, 'lib', 'ar-detector', 'index.js'));

const FORMAL_HUMAN = path.join(__dirname, 'fixtures', 'register', 'formal-human-msa.md');
const AI_FIXTURE = path.join(__dirname, 'fixtures', 'ar-msa', 'ai-01.md');

function analyzeFile(file, register) {
  const text = fs.readFileSync(file, 'utf8');
  return arDetector.analyzeText(text, {
    variety: 'msa', sourceMode: 'rendered-markdown', register,
  });
}

function run(args) {
  return spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });
}

// ══ The profile table itself ══════════════════════════════════════════════

test('REGISTER_PROFILES: exactly two profiles, with the documented numbers', () => {
  assert.deepEqual(Object.keys(arDetector.REGISTER_PROFILES).sort(), ['default', 'formal']);
  assert.equal(
    arDetector.REGISTER_PROFILES.default.burstinessCvThreshold,
    arDetector.GATES.BURSTINESS_CV_THRESHOLD,
  );
  assert.equal(arDetector.REGISTER_PROFILES.default.burstinessCvThreshold, 0.35);
  assert.equal(arDetector.REGISTER_PROFILES.formal.burstinessCvThreshold, 0.22);
  // No max-sentence-length trigger exists in this engine, in either profile.
  assert.equal(arDetector.REGISTER_PROFILES.default.maxSentenceWordsThreshold, null);
  assert.equal(arDetector.REGISTER_PROFILES.formal.maxSentenceWordsThreshold, null);
});

test('stats echo the active register and its gates', () => {
  const d = analyzeFile(FORMAL_HUMAN, 'default');
  const f = analyzeFile(FORMAL_HUMAN, 'formal');
  assert.equal(d.stats.register, 'default');
  assert.equal(f.stats.register, 'formal');
  assert.equal(d.stats.registerGates.burstinessCvThreshold, 0.35);
  assert.equal(f.stats.registerGates.burstinessCvThreshold, 0.22);
});

test('an unknown register falls back to default and records the fallback', () => {
  const a = analyzeFile(FORMAL_HUMAN, 'academic-legalese');
  assert.equal(a.stats.register, 'default');
  assert.equal(a.stats.registerFallback, 'academic-legalese');
  assert.equal(a.score, analyzeFile(FORMAL_HUMAN, 'default').score);
});

test('omitting register is identical to register:"default"', () => {
  const text = fs.readFileSync(FORMAL_HUMAN, 'utf8');
  const implicit = arDetector.analyzeText(text, { variety: 'msa', sourceMode: 'rendered-markdown' });
  const explicit = analyzeFile(FORMAL_HUMAN, 'default');
  assert.equal(implicit.score, explicit.score);
  assert.equal(implicit.stats.register, 'default');
});

// ══ The over-fire the profile exists to suppress ══════════════════════════

test('formal human MSA fixture: over-fires under default (>= 25), clean under formal (< 25)', () => {
  const d = analyzeFile(FORMAL_HUMAN, 'default');
  const f = analyzeFile(FORMAL_HUMAN, 'formal');

  // The over-fire is real and is caused by the rhythm gate.
  assert.ok(d.score >= arDetector.THRESHOLDS.MIXED, `default score ${d.score} should be >= 25`);
  assert.ok(
    d.issues.some((i) => i.patternId === 'AR-SH-004'),
    'expected AR-SH-004 (uniform-rhythm) to fire under the default profile',
  );
  // And it is gone under formal, which drops the score below the MIXED band.
  assert.ok(f.score < arDetector.THRESHOLDS.MIXED, `formal score ${f.score} should be < 25`);
  assert.equal(f.label, 'HUMAN');
  assert.ok(
    !f.issues.some((i) => i.patternId === 'AR-SH-004'),
    'AR-SH-004 must not fire under the formal profile',
  );

  // The measured CV is inside the relaxed band — this is the documented
  // reason the two profiles disagree, not an accident of the text.
  assert.ok(
    d.stats.sentenceLengthCv >= 0.22 && d.stats.sentenceLengthCv < 0.35,
    `fixture CV ${d.stats.sentenceLengthCv} must sit in [0.22, 0.35)`,
  );
});

test('the formal profile relaxes ONLY the rhythm signal', () => {
  const d = analyzeFile(FORMAL_HUMAN, 'default');
  const f = analyzeFile(FORMAL_HUMAN, 'formal');
  const ids = (a) => a.issues.map((i) => `${i.patternId}@${i.start}`).sort();
  const removed = ids(d).filter((k) => !ids(f).includes(k));
  const added = ids(f).filter((k) => !ids(d).includes(k));
  assert.deepEqual(added, [], 'the formal profile must never add a finding');
  assert.ok(removed.length > 0);
  for (const k of removed) {
    assert.ok(k.startsWith('AR-SH-004@'), `formal removed a non-rhythm finding: ${k}`);
  }
  // Lexicon weights are untouched: the score difference is exactly the P0.
  assert.equal(d.score - f.score, arDetector.WEIGHTS.P0);
});

test('an AI fixture is still convicted (>= 55) under the formal profile', () => {
  const f = analyzeFile(AI_FIXTURE, 'formal');
  assert.ok(f.score >= arDetector.THRESHOLDS.AI, `formal score ${f.score} should be >= 55`);
  assert.equal(f.label, 'AI');
});

// ══ CLI wiring ═══════════════════════════════════════════════════════════

test('CLI: --register formal changes the verdict on the formal fixture', () => {
  const def = run([FORMAL_HUMAN, '--markdown', '--json']);
  assert.equal(def.status, 0, def.stderr);
  const defJson = JSON.parse(def.stdout);
  assert.equal(defJson.stats.register, 'default');
  assert.ok(defJson.score >= 25);

  const formal = run([FORMAL_HUMAN, '--markdown', '--register', 'formal', '--json']);
  assert.equal(formal.status, 0, formal.stderr);
  const formalJson = JSON.parse(formal.stdout);
  assert.equal(formalJson.stats.register, 'formal');
  assert.ok(formalJson.score < 25);
  assert.equal(formalJson.label, 'HUMAN');
});

test('CLI: --register=formal (equals form) is accepted', () => {
  const r = run([FORMAL_HUMAN, '--markdown', '--register=formal', '--json']);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(JSON.parse(r.stdout).stats.register, 'formal');
});

test('CLI: the readable report shows the active register', () => {
  const r = run([FORMAL_HUMAN, '--markdown', '--register', 'formal']);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /register formal/);
});

test('CLI: a bad --register value exits 2', () => {
  const r = run([FORMAL_HUMAN, '--register', 'casual']);
  assert.equal(r.status, 2);
  assert.match(r.stderr, /--register must be default or formal/);
  assert.match(r.stderr, /usage: node detect\.js/);
});

test('CLI: --register is accepted for an English document and echoed', () => {
  const en = path.join(__dirname, 'fixtures', 'en-upstream', 'README-excerpt.md');
  const r = run([en, '--register', 'formal', '--json']);
  assert.equal(r.status, 0, r.stderr);
  const json = JSON.parse(r.stdout);
  assert.equal(json.engine, 'en');
  assert.equal(json.stats.register, 'formal');
});

test('fixture carries the native-review marker on line 2', () => {
  const lines = fs.readFileSync(FORMAL_HUMAN, 'utf8').split('\n');
  assert.match(lines[1], /<!--\s*NATIVE-REVIEW:\s*msa\s*-->/);
});
