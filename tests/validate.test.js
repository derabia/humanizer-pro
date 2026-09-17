/**
 * humanizer-pro — tests for scripts/validate.js
 * origin: humanizer-pro
 *
 * Runs the CLI as a child process against the fixtures in
 * tests/fixtures/seo/ so the assertions exercise exactly what a user gets:
 * exit code, stdout report, and --json shape.
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const CLI = path.join(__dirname, '..', 'skills', 'humanizer-pro', 'scripts', 'validate.js');
const FIX = path.join(__dirname, 'fixtures', 'seo');

function run(args) {
  const r = spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });
  return { status: r.status, stdout: r.stdout, stderr: r.stderr };
}

function runJson(before, after, extraArgs = []) {
  const r = run([path.join(FIX, before), path.join(FIX, after), '--seo', path.join(FIX, 'keywords.txt'), '--json', ...extraArgs]);
  let parsed = null;
  try {
    parsed = JSON.parse(r.stdout);
  } catch (e) {
    throw new Error(`--json output did not parse: ${e.message}\nstdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  }
  return { ...r, json: parsed };
}

// ── The ok pair passes clean. ──
test('article-before.md / article-after-ok.md: exit 0, ok:true', () => {
  const r = runJson('article-before.md', 'article-after-ok.md');
  assert.equal(r.status, 0);
  assert.equal(r.json.ok, true);
  assert.ok(r.json.checks.every((c) => c.status !== 'FAIL'));
});

// ── Every bad SEO fixture: exit 1, with the specific check FAILED. ──
const BAD_CASES = [
  ['article-after-bad-keyword-removed.md', 'seo-keyword-placement'],
  ['article-after-bad-h2.md', 'seo-keyword-placement'],
  ['article-after-bad-link.md', 'link-anchor-internal'],
  ['article-after-bad-alt.md', 'image-alt-captions'],
  ['article-after-bad-jsonld.md', 'json-ld'],
  ['article-after-bad-shortcode.md', 'shortcodes'],
  ['article-after-bad-wpcomment.md', 'wp-comments'],
  ['article-after-bad-number.md', 'numbers'],
  ['article-after-bad-frontmatter.md', 'frontmatter-meta'],
  ['article-after-bad-codeblock.md', 'code-blocks'],
  ['article-after-bad-tablecell.md', 'table-cells'],
  ['article-after-bad-blockquote.md', 'blockquotes'],
  ['article-after-bad-stuffing.md', 'seo-stuffing'],
];

for (const [file, expectedCheck] of BAD_CASES) {
  test(`${file}: exit 1, "${expectedCheck}" FAILED`, () => {
    const r = runJson('article-before.md', file);
    assert.equal(r.status, 1, `expected exit 1 for ${file}, got ${r.status}`);
    assert.equal(r.json.ok, false);
    const check = r.json.checks.find((c) => c.name === expectedCheck);
    assert.ok(check, `expected a "${expectedCheck}" check in output, got: ${r.json.checks.map((c) => c.name).join(', ')}`);
    assert.equal(check.status, 'FAIL', `expected "${expectedCheck}" to FAIL, got ${check.status}: ${check.details}`);
  });
}

// ── Arabic digit-system case: WARN by default, FAIL under --strict-digits, value preserved either way. ──
test('ar-article: pure digit-system change warns (not fails) by default', () => {
  const r = spawnSync(process.execPath, [
    CLI,
    path.join(FIX, 'ar-article-before.md'),
    path.join(FIX, 'ar-article-after-bad-digits.md'),
    '--seo', path.join(FIX, 'ar-keywords.txt'),
    '--lang', 'ar',
    '--json',
  ], { encoding: 'utf8' });
  const json = JSON.parse(r.stdout);
  assert.equal(r.status, 0, 'digit-system-only change should not fail by default');
  assert.equal(json.ok, true);
  const numbers = json.checks.find((c) => c.name === 'numbers');
  assert.equal(numbers.status, 'WARN');
  assert.match(numbers.details, /digit system/i);
});

test('ar-article: --strict-digits turns the digit-system warning into a failure', () => {
  const r = spawnSync(process.execPath, [
    CLI,
    path.join(FIX, 'ar-article-before.md'),
    path.join(FIX, 'ar-article-after-bad-digits.md'),
    '--seo', path.join(FIX, 'ar-keywords.txt'),
    '--lang', 'ar',
    '--strict-digits',
    '--json',
  ], { encoding: 'utf8' });
  const json = JSON.parse(r.stdout);
  assert.equal(r.status, 1);
  assert.equal(json.ok, false);
  const numbers = json.checks.find((c) => c.name === 'numbers');
  assert.equal(numbers.status, 'FAIL');
});

test('ar-article-after-ok.md: clean Arabic pair passes', () => {
  const r = runJsonAr('ar-article-before.md', 'ar-article-after-ok.md');
  assert.equal(r.status, 0);
  assert.equal(r.json.ok, true);
  const score = r.json.checks.find((c) => c.name === 'detector-score');
  // The ar-detector engine may or may not be present depending on build
  // order; either way this check must not FAIL a clean rewrite.
  assert.notEqual(score.status, 'FAIL');
});

test('detector-score check reports "not computed" when no engine is available for the language', () => {
  // Exercise the fallback path directly, independent of whether ar-detector
  // happens to be installed in this checkout: loadDetector only knows
  // 'en' and 'ar', so any other language code has no engine wired up.
  const { scoreCheck } = require(path.join('..', 'skills', 'humanizer-pro', 'scripts', 'validate.js'));
  const result = scoreCheck('some text', 'some other text', 'zz', null);
  assert.equal(result.status, 'PASS');
  assert.match(result.details, /not computed/i);
  assert.equal(result.scores.before, null);
  assert.equal(result.scores.after, null);
});

function runJsonAr(before, after) {
  const r = spawnSync(process.execPath, [
    CLI,
    path.join(FIX, before),
    path.join(FIX, after),
    '--seo', path.join(FIX, 'ar-keywords.txt'),
    '--lang', 'ar',
    '--json',
  ], { encoding: 'utf8' });
  return { status: r.status, json: JSON.parse(r.stdout) };
}

// ── Thin-section: WARN, never a failure. ──
test('thin-before.md / thin-after.md: shrunk section warns, does not fail', () => {
  const r = runJson('thin-before.md', 'thin-after.md');
  assert.equal(r.status, 0);
  assert.equal(r.json.ok, true);
  const thin = r.json.checks.find((c) => c.name === 'seo-thin-sections');
  assert.equal(thin.status, 'WARN');
  assert.match(thin.details, /below 40 words/);
});

// ── Usage errors: exit 2. ──
test('missing arguments: exit 2', () => {
  const r = run([path.join(FIX, 'article-before.md')]);
  assert.equal(r.status, 2);
});

test('nonexistent file: exit 2', () => {
  const r = run([path.join(FIX, 'article-before.md'), path.join(FIX, 'does-not-exist.md')]);
  assert.equal(r.status, 2);
});

test('unknown flag: exit 2', () => {
  const r = run([path.join(FIX, 'article-before.md'), path.join(FIX, 'article-after-ok.md'), '--bogus-flag']);
  assert.equal(r.status, 2);
});

test('bad --lang value: exit 2', () => {
  const r = run([path.join(FIX, 'article-before.md'), path.join(FIX, 'article-after-ok.md'), '--lang', 'fr']);
  assert.equal(r.status, 2);
});

// ── --json shape. ──
test('--json output has the documented shape', () => {
  const r = runJson('article-before.md', 'article-after-ok.md');
  assert.equal(typeof r.json.ok, 'boolean');
  assert.ok(Array.isArray(r.json.checks));
  for (const c of r.json.checks) {
    assert.equal(typeof c.name, 'string');
    assert.ok(['PASS', 'FAIL', 'WARN'].includes(c.status));
    assert.equal(typeof c.details, 'string');
  }
  assert.ok('scores' in r.json);
  assert.ok('lang' in r.json);
});

// ── No --seo: SEO checks are absent, everything else still runs. ──
test('without --seo, no seo-* checks are emitted, base checks still run', () => {
  const r = spawnSync(process.execPath, [
    CLI,
    path.join(FIX, 'article-before.md'),
    path.join(FIX, 'article-after-ok.md'),
    '--json',
  ], { encoding: 'utf8' });
  const json = JSON.parse(r.stdout);
  assert.equal(r.status, 0);
  assert.ok(!json.checks.some((c) => c.name.startsWith('seo-')));
  assert.ok(json.checks.some((c) => c.name === 'code-blocks'));
});
