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

// ══ IMP-09: names / dates / citations fidelity ════════════════════════════
//
// These cases write their own before/after pairs to a temp directory: the
// altered item has to be the ONLY difference, so that the assertion is about
// the `names-dates-citations` check and nothing else.

const os = require('node:os');
const fs = require('node:fs');

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'hp-fidelity-'));

function pair(name, before, after) {
  const b = path.join(TMP, `${name}-before.md`);
  const a = path.join(TMP, `${name}-after.md`);
  fs.writeFileSync(b, before, 'utf8');
  fs.writeFileSync(a, after, 'utf8');
  return [b, a];
}

function fidelityRun(before, after, name, extraArgs = []) {
  const [b, a] = pair(name, before, after);
  const r = spawnSync(process.execPath, [CLI, b, a, '--json', ...extraArgs], { encoding: 'utf8' });
  let json;
  try {
    json = JSON.parse(r.stdout);
  } catch (e) {
    throw new Error(`--json did not parse: ${e.message}\nstdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  }
  const check = json.checks.find((c) => c.name === 'names-dates-citations');
  assert.ok(check, 'names-dates-citations check is missing from the report');
  return { status: r.status, json, check };
}

const EN_DOC = [
  'The audit was signed off by Jane Morrison on 12 May 2023 in Dublin.',
  '',
  'Earlier work by Ahmed Farouk and Jones et al. reached the same conclusion,',
  'and the reference list cites it as [1] and as (Smith, 2020).',
  '',
  'See also 10.1016/j.example.2019.04.002 and ISBN 978-0-306-40615-7.',
].join('\n');

test('fidelity: an unchanged document passes the check', () => {
  const r = fidelityRun(EN_DOC, EN_DOC, 'unchanged');
  assert.equal(r.check.status, 'PASS');
  assert.equal(r.status, 0);
});

test('fidelity: an altered date WARNs by default (exit stays 0)', () => {
  const altered = EN_DOC.replace('12 May 2023', '12 June 2023');
  const r = fidelityRun(EN_DOC, altered, 'date-warn');
  assert.equal(r.check.status, 'WARN');
  assert.match(r.check.details, /date\(s\)/);
  assert.match(r.check.details, /12 may 2023/i);
  assert.equal(r.status, 0, 'a WARN must not fail the run');
  assert.equal(r.json.ok, true);
});

test('fidelity: --strict-fidelity turns the same altered date into a FAIL', () => {
  const before = EN_DOC;
  const after = EN_DOC.replace('12 May 2023', '12 June 2023');
  const r = fidelityRun(before, after, 'date-fail', ['--strict-fidelity']);
  assert.equal(r.check.status, 'FAIL');
  assert.equal(r.status, 1);
  assert.equal(r.json.ok, false);
  assert.equal(r.json.strictFidelity, true);
});

test('fidelity: an Arabic date rewritten across digit systems still passes', () => {
  const before = [
    'وقّع التقرير الدكتور أحمد سالم في مدينة الإسكندرية.',
    '',
    'وجاء في الحاشية أن التاريخ المعتمد هو ١٢ مايو ٢٠٢٣ حسب ما ورد.',
    '',
    'المصدر: وزارة الصحة.',
  ].join('\n');
  // Same date, western digits. The `numbers` check reports the digit-system
  // change; the fidelity check must NOT also report a lost date.
  const after = before.replace('١٢ مايو ٢٠٢٣', '12 مايو 2023');
  const r = fidelityRun(before, after, 'ar-digits');
  assert.equal(r.check.status, 'PASS', r.check.details);
  // And the reverse direction too.
  const back = fidelityRun(after, before, 'ar-digits-rev');
  assert.equal(back.check.status, 'PASS', back.check.details);
});

test('fidelity: a Hijri year survives a digit-system change', () => {
  const before = 'صدر القرار في سنة ١٤٤٥ هـ عن جامعة الملك سعود بعد مراجعة طويلة.';
  const after = 'صدر القرار في سنة 1445 هـ عن جامعة الملك سعود بعد مراجعة طويلة.';
  const r = fidelityRun(before, after, 'hijri');
  assert.equal(r.check.status, 'PASS', r.check.details);
});

test('fidelity: removing a citation marker WARNs', () => {
  // "et al." carries no digits, so the `numbers` check stays clean and the
  // warning is unambiguously the fidelity check's.
  const after = EN_DOC.replace('Jones et al.', 'Jones');
  const r = fidelityRun(EN_DOC, after, 'cite-warn');
  assert.equal(r.check.status, 'WARN');
  assert.match(r.check.details, /citation\(s\)/);
  assert.match(r.check.details, /et al/i);
  assert.equal(r.status, 0);
});

test('fidelity: removing an Arabic source marker WARNs', () => {
  const before = 'قال الأستاذ محمود خليل إن المشروع بدأ فعليا في العام الماضي.\n\nالمصدر: تقرير داخلي.';
  const after = 'قال الأستاذ محمود خليل إن المشروع بدأ فعليا في العام الماضي.';
  const r = fidelityRun(before, after, 'ar-source');
  assert.equal(r.check.status, 'WARN');
  assert.match(r.check.details, /citation\(s\)/);
});

test('fidelity: dropping a proper name WARNs, and FAILs under --strict-fidelity', () => {
  const after = EN_DOC.replace('Jane Morrison', 'the auditor');
  const warn = fidelityRun(EN_DOC, after, 'name-warn');
  assert.equal(warn.check.status, 'WARN');
  assert.match(warn.check.details, /name\(s\)/);
  const fail = fidelityRun(EN_DOC, after, 'name-fail', ['--strict-fidelity']);
  assert.equal(fail.check.status, 'FAIL');
  assert.equal(fail.status, 1);
});

test('fidelity: dropping an Arabic honorific name WARNs', () => {
  const before = 'أوضح المهندس طارق عبد الله أن العمل في شركة النور يسير وفق الخطة.';
  const after = 'أوضح أحد المهندسين أن العمل في شركة النور يسير وفق الخطة.';
  const r = fidelityRun(before, after, 'ar-name');
  assert.equal(r.check.status, 'WARN');
  assert.match(r.check.details, /name\(s\)/);
});

test('fidelity: the check is present on every run, including with --seo', () => {
  const r = runJson('article-before.md', 'article-after-ok.md');
  assert.ok(r.json.checks.some((c) => c.name === 'names-dates-citations'));
});

// ══ IMP-09: --mode ═══════════════════════════════════════════════════════

test('mode: defaults to edit, and to seo when --seo is given', () => {
  const plain = fidelityRun(EN_DOC, EN_DOC, 'mode-default');
  assert.equal(plain.json.mode, 'edit');
  assert.equal(plain.json.note, null);
  const seo = runJson('article-before.md', 'article-after-ok.md');
  assert.equal(seo.json.mode, 'seo');
});

test('mode: --mode rewrite prints "recommended for every rewrite" in the summary', () => {
  const [b, a] = pair('mode-rewrite', EN_DOC, EN_DOC);
  const r = spawnSync(process.execPath, [CLI, b, a, '--mode', 'rewrite'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  const summary = r.stdout.split('\n')[0];
  assert.match(summary, /\[mode rewrite — recommended for every rewrite\]/);
});

test('mode: --mode rewrite is reported in --json', () => {
  const r = fidelityRun(EN_DOC, EN_DOC, 'mode-json', ['--mode', 'rewrite']);
  assert.equal(r.json.mode, 'rewrite');
  assert.equal(r.json.note, 'recommended for every rewrite');
});

test('mode: --mode edit and --mode seo omit the rewrite reminder', () => {
  for (const mode of ['edit', 'seo']) {
    const [b, a] = pair(`mode-${mode}`, EN_DOC, EN_DOC);
    const r = spawnSync(process.execPath, [CLI, b, a, '--mode', mode], { encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr);
    assert.ok(!r.stdout.includes('recommended for every rewrite'), `mode ${mode} leaked the reminder`);
    assert.match(r.stdout.split('\n')[0], new RegExp(`\\[mode ${mode}\\]`));
  }
});

test('mode: an unknown --mode value exits 2', () => {
  const [b, a] = pair('mode-bad', EN_DOC, EN_DOC);
  const r = spawnSync(process.execPath, [CLI, b, a, '--mode', 'translate'], { encoding: 'utf8' });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /--mode must be one of rewrite\|edit\|seo/);
});
