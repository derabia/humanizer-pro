/**
 * humanizer-pro — tests for tests/fixtures/en/ and tests/fixtures/false-positives/
 * origin: humanizer-pro
 *
 * Runs the English detector engine (lib/en-detector/index.js) directly
 * against the hand-written fixtures. AI-style fixtures must score above
 * the "likely AI" threshold; human-style and false-positive fixtures must
 * score at or below it.
 *
 * Threshold: the engine's own label boundary between "Minimal AI signals"
 * (score <= 15) and "Some AI patterns" (score > 15) — see getLabel() in
 * lib/en-detector/index.js. A score above 15 is treated as "likely AI"
 * for this test suite.
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const AIDetector = require('../skills/humanizer-pro/scripts/lib/en-detector/index.js');

const AI_THRESHOLD = 15; // score > 15 => "likely AI" per getLabel()'s own boundary

const EN_DIR = path.join(__dirname, 'fixtures', 'en');
const FP_DIR = path.join(__dirname, 'fixtures', 'false-positives');

function stripFixtureHeader(text) {
  return text.replace(/^<!--[\s\S]*?-->\n*/, '');
}

function scoreFile(dir, file) {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const text = stripFixtureHeader(raw);
  return AIDetector.analyzeText(text, { sourceMode: 'rendered-markdown' });
}

const aiFiles = fs.readdirSync(EN_DIR).filter((f) => f.startsWith('ai-')).sort();
const humanFiles = fs.readdirSync(EN_DIR).filter((f) => f.startsWith('human-')).sort();
const fpFiles = fs.readdirSync(FP_DIR).filter((f) => f.endsWith('.md')).sort();

assert.ok(aiFiles.length >= 5, `expected >=5 AI-style fixtures, found ${aiFiles.length}`);
assert.ok(humanFiles.length >= 5, `expected >=5 human-style fixtures, found ${humanFiles.length}`);

for (const file of aiFiles) {
  test(`AI-style fixture ${file} scores above the AI threshold (${AI_THRESHOLD})`, () => {
    const r = scoreFile(EN_DIR, file);
    assert.ok(r.score > AI_THRESHOLD, `${file}: expected score > ${AI_THRESHOLD}, got ${r.score} (${r.label})`);
  });
}

for (const file of humanFiles) {
  test(`human-style fixture ${file} scores at or below the AI threshold (${AI_THRESHOLD})`, () => {
    const r = scoreFile(EN_DIR, file);
    assert.ok(r.score <= AI_THRESHOLD, `${file}: expected score <= ${AI_THRESHOLD}, got ${r.score} (${r.label})`);
  });
}

for (const file of fpFiles) {
  test(`false-positive fixture ${file} scores at or below the AI threshold (${AI_THRESHOLD})`, () => {
    const r = scoreFile(FP_DIR, file);
    assert.ok(r.score <= AI_THRESHOLD, `${file}: expected score <= ${AI_THRESHOLD}, got ${r.score} (${r.label})`);
  });
}

test('AI fixture minimum score exceeds human fixture maximum score (clean separation)', () => {
  const aiScores = aiFiles.map((f) => scoreFile(EN_DIR, f).score);
  const humanScores = [
    ...humanFiles.map((f) => scoreFile(EN_DIR, f).score),
    ...fpFiles.map((f) => scoreFile(FP_DIR, f).score),
  ];
  const aiMin = Math.min(...aiScores);
  const humanMax = Math.max(...humanScores);
  assert.ok(aiMin > humanMax, `AI min (${aiMin}) should exceed human/false-positive max (${humanMax})`);
});
