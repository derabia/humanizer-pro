/**
 * humanizer-pro — tests for scripts/detect.js (CLI + programmatic API)
 * origin: humanizer-pro
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const CLI = path.join(__dirname, '..', 'skills', 'humanizer-pro', 'scripts', 'detect.js');
const FIXTURES = path.join(__dirname, 'fixtures');
const AR_FIXTURE = path.join(FIXTURES, 'ar-msa', 'ai-01.md');
const AR_EGT_FIXTURE = path.join(FIXTURES, 'ar-egt', 'ai-01.md');
const EN_FIXTURE = path.join(FIXTURES, 'en-upstream', 'README-excerpt.md');

function run(args, input) {
  return spawnSync(process.execPath, [CLI, ...args], {
    input: input === undefined ? '' : input,
    encoding: 'utf8',
  });
}

function runJson(args, input) {
  const r = run(args, input);
  assert.equal(r.status, 0, `exit ${r.status}: ${r.stderr}`);
  return { result: JSON.parse(r.stdout), raw: r };
}

test('CLI: Arabic file, human-readable report', () => {
  const r = run([AR_FIXTURE, '--markdown']);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /language:\s+ar \/ msa/);
  assert.match(r.stdout, /label: AI/);
  assert.match(r.stdout, /AR-SH-002-A/);
  assert.match(r.stdout, /P0/);
  // Arabic must survive the write to stdout intact.
  assert.ok(r.stdout.includes('علاوة على ذلك'), 'Arabic excerpt missing from stdout');
});

test('CLI: Arabic file, --json shape', () => {
  const { result } = runJson([AR_FIXTURE, '--markdown', '--json']);
  assert.equal(result.lang, 'ar');
  assert.equal(result.variety, 'msa');
  assert.equal(result.engine, 'ar');
  assert.equal(result.label, 'AI');
  assert.equal(typeof result.score, 'number');
  assert.ok(Array.isArray(result.issues) && result.issues.length > 0);
  for (const issue of result.issues) {
    for (const key of ['type', 'patternId', 'start', 'end', 'excerpt', 'severity', 'suggestion']) {
      assert.ok(key in issue, `issue missing ${key}`);
    }
  }
  assert.equal(result.stats.sourceMode, 'rendered-markdown');
});

test('CLI: English file routes to the English engine', () => {
  const { result } = runJson([EN_FIXTURE, '--markdown', '--json']);
  assert.equal(result.lang, 'en');
  assert.equal(result.engine, 'en');
  assert.equal(result.variety, null);
  assert.equal(typeof result.score, 'number');
  assert.ok(Array.isArray(result.issues));
  // Fields common to both engines.
  for (const key of ['lang', 'score', 'label', 'issues', 'stats']) {
    assert.ok(key in result, `missing common field ${key}`);
  }
});

test('CLI: English file, human-readable report', () => {
  const r = run([EN_FIXTURE]);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /language:\s+en/);
  assert.match(r.stdout, /engine en/);
});

test('CLI: stdin with -', () => {
  const text = fs.readFileSync(AR_FIXTURE, 'utf8');
  const { result } = runJson(['-', '--markdown', '--json'], text);
  assert.equal(result.engine, 'ar');
  assert.equal(result.label, 'AI');

  const report = run(['-', '--markdown'], text);
  assert.equal(report.status, 0);
  assert.match(report.stdout, /file:\s+<stdin>/);
});

test('CLI: --variety overrides auto-detection', () => {
  const auto = runJson([AR_EGT_FIXTURE, '--markdown', '--json']).result;
  const forced = runJson([AR_EGT_FIXTURE, '--markdown', '--json', '--variety', 'shami']).result;
  assert.equal(forced.variety, 'shami');
  assert.equal(forced.stats.variety, 'shami');
  assert.ok('msaLeakage' in forced.stats);
  assert.notEqual(auto.variety, 'shami');

  const msa = runJson([AR_EGT_FIXTURE, '--markdown', '--json', '--variety', 'msa']).result;
  assert.equal(msa.variety, 'msa');
  assert.equal('msaLeakage' in msa.stats, false);
});

test('CLI: --lang overrides auto-detection', () => {
  const forced = runJson([AR_FIXTURE, '--markdown', '--json', '--lang', 'en']).result;
  assert.equal(forced.engine, 'en');
  assert.equal(forced.lang, 'en');

  const ar = runJson([EN_FIXTURE, '--markdown', '--json', '--lang', 'ar']).result;
  assert.equal(ar.engine, 'ar');
  assert.equal(ar.variety, 'msa');
});

test('CLI: --markdown changes the source mode', () => {
  const plain = runJson([AR_FIXTURE, '--json']).result;
  const md = runJson([AR_FIXTURE, '--json', '--markdown']).result;
  assert.equal(plain.stats.sourceMode, 'plain');
  assert.equal(md.stats.sourceMode, 'rendered-markdown');
  assert.equal(md.stats.maskedHtmlComments >= 1, true);
});

test('CLI: exit code 2 on input errors, 0 otherwise', () => {
  const missing = run([path.join(FIXTURES, 'definitely-not-here.md')]);
  assert.equal(missing.status, 2);
  assert.match(missing.stderr, /cannot read/);

  const noArgs = run([]);
  assert.equal(noArgs.status, 2);
  assert.match(noArgs.stderr, /usage:/);

  const badFlag = run([AR_FIXTURE, '--nope']);
  assert.equal(badFlag.status, 2);

  const badVariety = run([AR_FIXTURE, '--variety', 'gulf']);
  assert.equal(badVariety.status, 2);

  // A clean human document is still exit 0 — a detection result is not an error.
  const human = run([path.join(FIXTURES, 'ar-msa', 'human-01.md'), '--markdown']);
  assert.equal(human.status, 0);
  assert.match(human.stdout, /label: HUMAN/);

  const help = run(['--help']);
  assert.equal(help.status, 0);
});

test('programmatic analyze() is exported and routes like the CLI', () => {
  const { analyze } = require('../skills/humanizer-pro/scripts/detect.js');
  const ar = analyze(fs.readFileSync(AR_FIXTURE, 'utf8'), { markdown: true });
  assert.equal(ar.engine, 'ar');
  assert.equal(ar.label, 'AI');

  const en = analyze(fs.readFileSync(EN_FIXTURE, 'utf8'), { markdown: true });
  assert.equal(en.engine, 'en');

  const forced = analyze(fs.readFileSync(AR_FIXTURE, 'utf8'), { variety: 'egt', markdown: true });
  assert.equal(forced.variety, 'egt');
  assert.ok('msaLeakage' in forced.stats);
});

test('mixed Arabic/English documents auto-route to the Arabic engine', () => {
  const { analyze } = require('../skills/humanizer-pro/scripts/detect.js');
  const { identify } = require('../skills/humanizer-pro/scripts/lib/lang.js');

  // Roughly half Latin letters by count: lands in lang.js's 'mixed' band
  // (0.15 < arabicRatio < 0.6), which must still go to the Arabic engine.
  const mixed = 'The feature flag orders_v2 is live now. الخدمة شغالة خلف feature flag واحد. '
    + 'We compare both paths before deleting either one. القياس real-time عبر لوحة واحدة. '
    + 'Alerts land in the team channel directly. التنبيه بيوصل القناة على طول.';
  const id = identify(mixed);
  assert.equal(id.lang, 'mixed', `expected the mixed band, got ${id.lang} at ratio ${id.arabicRatio}`);

  const r = analyze(mixed, {});
  assert.equal(r.engine, 'ar', 'mixed documents must route to the Arabic engine');
  assert.equal(r.lang, 'mixed');
  assert.ok(['msa', 'egt', 'shami'].includes(r.variety));
  // English terms inside Arabic prose are a documented dialect feature, never a tell.
  assert.equal(r.label, 'HUMAN', `mixed prose scored ${r.score}`);

  // And an Arabic document with English technical terms in it still routes to
  // the Arabic engine end-to-end through the CLI.
  const { result } = runJson([
    path.join(FIXTURES, 'false-positives', 'ar-technical-en-terms.md'), '--markdown', '--json',
  ]);
  assert.equal(result.engine, 'ar');
  assert.ok(result.lang === 'ar' || result.lang === 'mixed');
  assert.equal(result.label, 'HUMAN');
});

test('report renders line:col positions', () => {
  const { lineIndex, lineCol } = require('../skills/humanizer-pro/scripts/detect.js');
  const text = 'سطر أول\nسطر ثان\nسطر ثالث';
  const starts = lineIndex(text);
  assert.deepEqual(lineCol(starts, 0), { line: 1, col: 1 });
  assert.deepEqual(lineCol(starts, text.indexOf('ثان')), { line: 2, col: 5 });
  assert.equal(lineCol(starts, text.length - 1).line, 3);
});
