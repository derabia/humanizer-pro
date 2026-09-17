/**
 * humanizer-pro — tests for evals/run-benchmark.js
 * origin: humanizer-pro
 *
 * Proves the benchmark's invariants actually bite (IMP-04): a candidate
 * that echoes the source verbatim must fail minEditRatio, and a candidate
 * with an invented number not present in the input must fail
 * forbidUnexpectedNumbers. Also proves the real iteration-1 candidates in
 * evals/benchmark.json all pass today.
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { runCase, runAll } = require('../evals/run-benchmark.js');

const ROOT = path.resolve(__dirname, '..');
const BENCHMARK_PATH = path.join(ROOT, 'evals', 'benchmark.json');

function loadBenchmark() {
  return JSON.parse(fs.readFileSync(BENCHMARK_PATH, 'utf8'));
}

function findCase(cases, id) {
  const c = cases.find((x) => x.id === id);
  assert.ok(c, `benchmark.json has no case "${id}"`);
  return c;
}

function withTempCandidate(baseCase, text) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'humanizer-pro-bench-'));
  const tmpFile = path.join(tmpDir, 'candidate.md');
  fs.writeFileSync(tmpFile, text, 'utf8');
  // runCase resolves candidateFile relative to `root`; pass an absolute
  // path and root='' so path.join(root, candidateFile) === candidateFile.
  const c = Object.assign({}, baseCase, { candidateFile: tmpFile });
  return { case: c, dir: tmpDir };
}

test('a candidate that echoes the input verbatim fails minEditRatio', () => {
  const cases = loadBenchmark();
  const base = findCase(cases, 'en-rewrite-01');
  const inputText = fs.readFileSync(path.join(ROOT, base.inputFile), 'utf8');
  const { case: c, dir } = withTempCandidate(base, inputText);
  try {
    const result = runCase(c, '');
    assert.equal(result.pass, false, 'echoed source must fail the benchmark');
    const minCheck = result.checks.find((ch) => ch.name === 'minEditRatio');
    assert.ok(minCheck, 'minEditRatio check must run');
    assert.equal(minCheck.pass, false, 'minEditRatio must fail for an unedited echo');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('a candidate with an invented number not in the input fails forbidUnexpectedNumbers', () => {
  const cases = loadBenchmark();
  const base = findCase(cases, 'en-edit-01');
  let candidateText = fs.readFileSync(path.join(ROOT, base.candidateFile), 'utf8');
  // Inject a number that does not appear anywhere in the input.
  const invented = '824193';
  const inputText = fs.readFileSync(path.join(ROOT, base.inputFile), 'utf8');
  assert.ok(!inputText.includes(invented), 'sanity: the invented number must not already be in the input');
  candidateText += `\n\n<!-- injected for test: ${invented} -->\n`;

  const { case: c, dir } = withTempCandidate(base, candidateText);
  try {
    const result = runCase(c, '');
    assert.equal(result.pass, false, 'a candidate with an invented number must fail the benchmark');
    const numCheck = result.checks.find((ch) => ch.name === 'forbidUnexpectedNumbers');
    assert.ok(numCheck, 'forbidUnexpectedNumbers check must run');
    assert.equal(numCheck.pass, false, 'forbidUnexpectedNumbers must fail when a number is invented');
    assert.ok(numCheck.detail.includes(invented), 'failure detail should name the invented number');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('an Arabic candidate with an invented Arabic-Indic-digit number fails forbidUnexpectedNumbers', () => {
  const cases = loadBenchmark();
  const base = findCase(cases, 'egt-edit-01');
  let candidateText = fs.readFileSync(path.join(ROOT, base.candidateFile), 'utf8');
  // ٩٩٩ (Arabic-Indic digits) = 999, not present in the input.
  candidateText += '\n\n<!-- injected for test: ٩٩٩ -->\n';

  const { case: c, dir } = withTempCandidate(base, candidateText);
  try {
    const result = runCase(c, '');
    assert.equal(result.pass, false, 'a candidate with an invented Arabic-Indic number must fail');
    const numCheck = result.checks.find((ch) => ch.name === 'forbidUnexpectedNumbers');
    assert.equal(numCheck.pass, false);
    assert.ok(numCheck.detail.includes('999'), 'Arabic-Indic digits must be normalized to Western digits in the report');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('all 16 real iteration-1 cases in evals/benchmark.json pass today', () => {
  const cases = loadBenchmark();
  assert.equal(cases.length, 16, 'evals/benchmark.json should have one case per eval');
  const results = runAll(cases, ROOT);
  const failures = results.filter((r) => !r.pass);
  if (failures.length > 0) {
    const detail = failures
      .map((r) => `${r.id}: ${r.checks.filter((c) => !c.pass).map((c) => c.name).join(', ')}`)
      .join('; ');
    assert.fail(
      `${failures.length} case(s) failed a genuine invariant: ${detail}. ` +
        'If this is a real regression, do not loosen the invariant -- record it in ' +
        'docs/evidence/round1-benchmark.txt and in the task report instead.'
    );
  }
});
