/**
 * humanizer-pro — tests for detect.js issue grouping, affected coverage and
 * the IMP-14 labelling contract.
 * origin: humanizer-pro
 *
 * IMP-10: overlapping or touching issue spans must collapse into one group
 * and must not double-count in stats.affectedCoveragePercent or
 * stats.groupCount.
 * IMP-14: every result carries authorshipClaim / calibration / engineVersion,
 * and the readable report carries the review-signal note.
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const CLI = path.join(__dirname, '..', 'skills', 'humanizer-pro', 'scripts', 'detect.js');
const detect = require(CLI);
const FIXTURES = path.join(__dirname, 'fixtures');

function run(args, input) {
  return spawnSync(process.execPath, [CLI, ...args], {
    input: input === undefined ? '' : input,
    encoding: 'utf8',
  });
}

// ══ groupIssues(): pure span arithmetic ═══════════════════════════════════

test('groupIssues: two overlapping spans collapse into one group', () => {
  const issues = [
    { start: 10, end: 20, severity: 'P1' },
    { start: 15, end: 25, severity: 'P0' },
  ];
  const { groups, unionLength } = detect.groupIssues(issues, 'ar');
  assert.equal(groups.length, 1);
  assert.deepEqual(groups[0].issueIds, [0, 1]);
  assert.equal(groups[0].start, 10);
  assert.equal(groups[0].end, 25);
  // topSeverity is the worst in the group, not the first one seen.
  assert.equal(groups[0].topSeverity, 'P0');
  // Union is 15 chars, NOT 10 + 10 = 20: no double counting.
  assert.equal(unionLength, 15);
});

test('groupIssues: touching spans (end === next start) also merge', () => {
  const { groups, unionLength } = detect.groupIssues(
    [{ start: 0, end: 5, severity: 'P2' }, { start: 5, end: 9, severity: 'P2' }],
    'ar',
  );
  assert.equal(groups.length, 1);
  assert.equal(unionLength, 9);
});

test('groupIssues: disjoint spans stay separate and sum', () => {
  const { groups, unionLength } = detect.groupIssues(
    [{ start: 0, end: 5, severity: 'P2' }, { start: 6, end: 9, severity: 'P0' }],
    'ar',
  );
  assert.equal(groups.length, 2);
  assert.equal(unionLength, 8);
  assert.deepEqual(groups.map((g) => g.topSeverity), ['P2', 'P0']);
});

test('groupIssues: a fully nested span does not extend the group', () => {
  const { groups, unionLength } = detect.groupIssues(
    [{ start: 0, end: 40, severity: 'P0' }, { start: 10, end: 12, severity: 'P1' }],
    'ar',
  );
  assert.equal(groups.length, 1);
  assert.equal(groups[0].end, 40);
  assert.equal(unionLength, 40);
  assert.deepEqual(groups[0].issueIds, [0, 1]);
});

test('groupIssues: English-engine issues are spanned from index + text length', () => {
  assert.deepEqual(detect.issueSpan({ index: 7, text: 'delve' }, 'en'), [7, 12]);
  // A document-level finding with no offset cannot be placed.
  assert.equal(detect.issueSpan({ index: null, text: 'x' }, 'en'), null);
  const { groups, ungroupedIssueCount } = detect.groupIssues(
    [{ index: null, text: 'x', severity: 'high' }], 'en',
  );
  assert.equal(groups.length, 0);
  assert.equal(ungroupedIssueCount, 1);
});

// ══ End-to-end on a synthetic Arabic text with overlapping hits ═══════════

// Six same-length sentences, each opening with a stock MSA transition. The
// uniform-rhythm finding (AR-SH-004) anchors on the FIRST sentence, so its
// span overlaps the lexicon hit inside that sentence — two findings, one
// region of text.
const SYNTHETIC_AR = [
  'علاوة على ذلك فإن المؤسسات الحكومية تواجه تحديات متعددة في مجال التعليم الرقمي الحديث اليوم.',
  'وبالإضافة إلى ذلك فإن المؤسسات الحكومية تواجه تحديات متعددة في مجال الصحة العامة الحديثة كذلك.',
  'ومن الجدير بالذكر أن المؤسسات الخاصة تواجه تحديات متعددة في مجال النقل البري الحديث أيضا هنا.',
  'وفي الختام فإن المؤسسات الحكومية تواجه تحديات متنوعة في مجال الإسكان الاجتماعي الحديث كذلك الآن.',
  'ومن ناحية أخرى فإن المؤسسات الحكومية تواجه تحديات متعددة في مجال البيئة المستدامة الحديثة هنا.',
  'وتجدر الإشارة إلى أن المؤسسات الحكومية تواجه تحديات متعددة في مجال الطاقة النظيفة الحديثة.',
].join('\n');

test('analyze(): overlapping findings collapse — groupCount < issue count', () => {
  const result = detect.analyze(SYNTHETIC_AR, { lang: 'ar', variety: 'msa' });
  assert.ok(result.issues.length >= 2, `expected >= 2 issues, got ${result.issues.length}`);
  assert.ok(Array.isArray(result.groups));
  assert.ok(
    result.groups.length < result.issues.length,
    `expected overlapping findings to merge: ${result.issues.length} issues -> ${result.groups.length} groups`,
  );
  assert.equal(result.stats.groupCount, result.groups.length);

  // Every issue is accounted for exactly once across the groups.
  const ids = result.groups.flatMap((g) => g.issueIds).sort((a, b) => a - b);
  assert.deepEqual(ids, [...new Set(ids)], 'an issue id appeared in two groups');
  assert.equal(ids.length + (result.stats.ungroupedIssueCount || 0), result.issues.length);

  // Union must be strictly smaller than the naive sum of the spans, which is
  // exactly what "a doubled overlapping hit does not double the count" means.
  const naive = result.issues.reduce((acc, i) => acc + (i.end - i.start), 0);
  const union = result.groups.reduce((acc, g) => acc + (g.end - g.start), 0);
  assert.ok(union < naive, `union ${union} should be < naive sum ${naive}`);
  assert.equal(result.stats.affectedCharCount, union);
});

test('analyze(): affectedCoveragePercent is the union over the scored length', () => {
  const result = detect.analyze(SYNTHETIC_AR, { lang: 'ar', variety: 'msa' });
  const scored = result.stats.scoredCharCount;
  assert.equal(result.stats.coverageBasis, 'scored-chars-excluding-masked');
  assert.ok(Number.isInteger(scored) && scored > 0);
  const expected = Math.min(
    100,
    Math.round((result.stats.affectedCharCount / scored) * 1000) / 10,
  );
  assert.equal(result.stats.affectedCoveragePercent, expected);
  assert.ok(result.stats.affectedCoveragePercent > 0);
  assert.ok(result.stats.affectedCoveragePercent <= 100);
});

test('analyze(): masked regions are excluded from the coverage denominator', () => {
  // The same text plus a long URL. The URL is masked by the engine, so it
  // must not dilute the coverage percentage.
  const withUrl = `${SYNTHETIC_AR}\n\nhttps://example.com/${'a'.repeat(300)}`;
  const plain = detect.analyze(SYNTHETIC_AR, { lang: 'ar', variety: 'msa' });
  const urled = detect.analyze(withUrl, { lang: 'ar', variety: 'msa' });
  assert.ok(urled.stats.maskedCharCount >= 300, `masked ${urled.stats.maskedCharCount}`);
  assert.ok(
    Math.abs(urled.stats.affectedCoveragePercent - plain.stats.affectedCoveragePercent) < 2,
    `coverage moved from ${plain.stats.affectedCoveragePercent} to ${urled.stats.affectedCoveragePercent}`,
  );
});

test('analyze(): a clean text reports zero groups and zero coverage', () => {
  const result = detect.analyze('هذا سطر عربي قصير جدا بلا أي علامات.', { lang: 'ar', variety: 'msa' });
  assert.deepEqual(result.issues, []);
  assert.deepEqual(result.groups, []);
  assert.equal(result.stats.groupCount, 0);
  assert.equal(result.stats.affectedCharCount, 0);
  assert.equal(result.stats.affectedCoveragePercent, 0);
});

// ══ IMP-14 labelling ═════════════════════════════════════════════════════

test('labelling: every --json result carries the three fields (Arabic)', () => {
  const r = run([path.join(FIXTURES, 'ar-msa', 'ai-01.md'), '--markdown', '--json']);
  assert.equal(r.status, 0, r.stderr);
  const json = JSON.parse(r.stdout);
  assert.equal(json.authorshipClaim, false);
  assert.equal(json.calibration, 'uncalibrated-review-signal');
  assert.equal(typeof json.engineVersion, 'string');
  assert.ok(json.engineVersion.length > 0);
  assert.notEqual(json.engineVersion, 'unknown');
  // Nothing was renamed: the pre-IMP-14 fields are all still there.
  for (const key of ['lang', 'variety', 'confidence', 'engine', 'score', 'label', 'issues', 'stats']) {
    assert.ok(key in json, `field ${key} disappeared from the JSON contract`);
  }
});

test('labelling: the English engine gets the same fields', () => {
  const r = run([path.join(FIXTURES, 'en-upstream', 'README-excerpt.md'), '--json']);
  assert.equal(r.status, 0, r.stderr);
  const json = JSON.parse(r.stdout);
  assert.equal(json.engine, 'en');
  assert.equal(json.authorshipClaim, false);
  assert.equal(typeof json.calibration, 'string');
  assert.ok(json.calibration.length > 0);
  assert.equal(typeof json.engineVersion, 'string');
  assert.equal(typeof json.stats.groupCount, 'number');
  assert.equal(typeof json.stats.affectedCoveragePercent, 'number');
});

test('labelling: programmatic analyze() carries the fields too', () => {
  const result = detect.analyze('هذا نص عربي قصير للاختبار فقط.', {});
  assert.equal(result.authorshipClaim, false);
  assert.equal(result.calibration, 'uncalibrated-review-signal');
  assert.equal(typeof result.engineVersion, 'string');
});

test('labelling: the readable report prints the review-signal note', () => {
  const r = run([path.join(FIXTURES, 'ar-msa', 'ai-01.md'), '--markdown']);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /^note:\s+score is a review signal, not an authorship claim$/m);
  assert.match(r.stdout, /authorship-claim false/);
  assert.match(r.stdout, /uncalibrated-review-signal/);
  assert.match(r.stdout, /^coverage:\s+\d+ group\(s\), [\d.]+% of scored text affected/m);
});

test('labelling: engineVersion() is a git sha or a v-prefixed package version', () => {
  const v = detect.engineVersion();
  assert.match(v, /^(?:[0-9a-f]{4,40}|v\d+\.\d+\.\d+.*|unknown)$/);
});
