/**
 * humanizer-pro — tests for detect.js ignore regions (IMP-20).
 * origin: humanizer-pro
 *
 * Text between `<!-- humanizer:ignore -->`/`<!-- /humanizer:ignore -->` (or
 * `<!-- humanizer-ignore-start -->`/`<!-- humanizer-ignore-end -->`) is
 * masked to spaces of identical length before either engine runs, so:
 *   - an AI-style sentence inside a region is never reported
 *   - every other issue keeps its exact original offset
 *   - an unmatched opener masks to end of text and warns
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const path = require('node:path');

const CLI = path.join(__dirname, '..', 'skills', 'humanizer-pro', 'scripts', 'detect.js');
const detect = require(CLI);

const AI_SENTENCE = "In today's rapidly evolving landscape, we delve into the intricate tapestry of innovation.";
const PLAIN_BEFORE = 'The team shipped a fix on Monday afternoon after the rollback completed successfully. ';
const PLAIN_AFTER = ' The report went out on Friday and nobody complained about it.';

// ══ maskIgnoreRegions(): pure masking ═════════════════════════════════════

test('maskIgnoreRegions: masks a humanizer:ignore region to spaces of identical length', () => {
  const opener = '<!-- humanizer:ignore -->';
  const closer = '<!-- /humanizer:ignore -->';
  const text = `before ${opener}hidden text${closer} after`;
  const { text: masked, ignoredRegions, ignoredCharCount, warnings } = detect.maskIgnoreRegions(text);
  assert.equal(masked.length, text.length);
  assert.equal(ignoredRegions, 1);
  const regionLen = (opener + 'hidden text' + closer).length;
  assert.equal(ignoredCharCount, regionLen);
  assert.deepEqual(warnings, []);
  assert.equal(masked, `before ${' '.repeat(regionLen)} after`);
});

test('maskIgnoreRegions: masks a humanizer-ignore-start/-end region', () => {
  const opener = '<!-- humanizer-ignore-start -->';
  const closer = '<!-- humanizer-ignore-end -->';
  const text = `x ${opener}hidden${closer} y`;
  const { text: masked, ignoredRegions, warnings } = detect.maskIgnoreRegions(text);
  assert.equal(masked.length, text.length);
  assert.equal(ignoredRegions, 1);
  assert.deepEqual(warnings, []);
  assert.ok(!masked.includes('hidden'));
});

test('maskIgnoreRegions: an unmatched opener masks to end of text and warns', () => {
  const opener = '<!-- humanizer:ignore -->';
  const text = `before ${opener}everything after this is masked, no closer`;
  const { text: masked, ignoredRegions, ignoredCharCount, warnings } = detect.maskIgnoreRegions(text);
  assert.equal(masked.length, text.length);
  assert.equal(ignoredRegions, 1);
  assert.equal(ignoredCharCount, text.length - 'before '.length);
  assert.deepEqual(warnings, ['unclosed ignore region']);
  assert.equal(masked, `before ${' '.repeat(text.length - 'before '.length)}`);
});

test('maskIgnoreRegions: a closer of one family does not close the other family\'s opener', () => {
  // '/humanizer:ignore' closer never closes a '-start' opener: it stays
  // unclosed and masks to end of text.
  const text = '<!-- humanizer-ignore-start -->x<!-- /humanizer:ignore -->y';
  const { ignoredRegions, warnings } = detect.maskIgnoreRegions(text);
  assert.equal(ignoredRegions, 1);
  assert.deepEqual(warnings, ['unclosed ignore region']);
});

// ══ analyze(): end-to-end behaviour ════════════════════════════════════════

test('analyze: an AI-style sentence inside an ignore region is not reported', () => {
  const wrapped = `${PLAIN_BEFORE}<!-- humanizer:ignore -->${AI_SENTENCE}<!-- /humanizer:ignore -->${PLAIN_AFTER}`;
  const result = detect.analyze(wrapped, { lang: 'en' });
  const bare = detect.analyze(AI_SENTENCE, { lang: 'en' });

  assert.ok(bare.issues.length > 0, 'sanity: the bare AI sentence must itself be flagged');

  for (const issue of result.issues) {
    const excerpt = typeof issue.text === 'string' ? issue.text : issue.excerpt;
    assert.ok(
      !excerpt || !excerpt.includes('delve') && !excerpt.includes('tapestry'),
      `issue must not come from the masked region: ${JSON.stringify(issue)}`
    );
  }
  assert.equal(result.stats.ignoredRegions, 1);
  const regionLen = '<!-- humanizer:ignore -->'.length + AI_SENTENCE.length + '<!-- /humanizer:ignore -->'.length;
  assert.equal(result.stats.ignoredCharCount, regionLen);
});

test('analyze: an issue after the region keeps the exact original offset', () => {
  const suffix = ` ${AI_SENTENCE}`;
  const wrapped = `${PLAIN_BEFORE}<!-- humanizer:ignore -->hidden<!-- /humanizer:ignore -->${suffix}`;
  const result = detect.analyze(wrapped, { lang: 'en' });

  assert.ok(result.issues.length > 0, 'the AI sentence after the region must still be flagged');
  for (const issue of result.issues) {
    if (!Number.isInteger(issue.index)) continue;
    const excerpt = issue.text;
    assert.equal(wrapped.slice(issue.index, issue.index + excerpt.length), excerpt);
  }
});

test('analyze: stats.ignoredRegions and stats.ignoredCharCount are 0 with no markers', () => {
  const result = detect.analyze(PLAIN_BEFORE, { lang: 'en' });
  assert.equal(result.stats.ignoredRegions, 0);
  assert.equal(result.stats.ignoredCharCount, 0);
  assert.equal(result.warnings, undefined);
});

test('analyze: an unclosed opener produces the unclosed-ignore-region warning', () => {
  const wrapped = `${PLAIN_BEFORE}<!-- humanizer:ignore -->${AI_SENTENCE}`;
  const result = detect.analyze(wrapped, { lang: 'en' });
  assert.deepEqual(result.warnings, ['unclosed ignore region']);
  assert.equal(result.stats.ignoredRegions, 1);
  // Everything from the opener onward, including the AI sentence, is masked.
  for (const issue of result.issues) {
    const excerpt = issue.text;
    assert.ok(!excerpt || (!excerpt.includes('delve') && !excerpt.includes('tapestry')));
  }
});
