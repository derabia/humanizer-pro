/**
 * humanizer-pro — tests for lib/ar-detector
 * origin: humanizer-pro
 *
 * Fixtures live in tests/fixtures/ar-{msa,egt,shami}/ and
 * tests/fixtures/false-positives/ar-*.md. Every fixture carries an HTML
 * comment header naming its class and variety; these tests read the variety
 * from that header rather than hard-coding a table.
 *
 * All fixture scoring runs with sourceMode 'rendered-markdown' so the
 * English-language fixture header itself never counts as Arabic prose.
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const detector = require('../skills/humanizer-pro/scripts/lib/ar-detector/index.js');
const { analyzeText, THRESHOLDS, WEIGHTS, PATTERNS } = detector;

const FIXTURE_ROOT = path.join(__dirname, 'fixtures');

function readFixture(file) {
  return fs.readFileSync(file, 'utf8');
}

function varietyOf(text, fallback) {
  const m = /variety:\s*([a-z]+)/i.exec(text.slice(0, 400));
  return m ? m[1].toLowerCase() : fallback;
}

function listFixtures(dir, prefix) {
  const full = path.join(FIXTURE_ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full)
    .filter((f) => f.startsWith(prefix) && f.endsWith('.md'))
    .sort()
    .map((f) => path.join(full, f));
}

const AI_FIXTURES = ['ar-msa', 'ar-egt', 'ar-shami'].flatMap((d) => listFixtures(d, 'ai-'));
const HUMAN_FIXTURES = ['ar-msa', 'ar-egt', 'ar-shami'].flatMap((d) => listFixtures(d, 'human-'));
const FP_FIXTURES = listFixtures('false-positives', 'ar-');

test('fixture corpus is complete (>=5 AI and >=5 human per variety)', () => {
  for (const dir of ['ar-msa', 'ar-egt', 'ar-shami']) {
    assert.ok(listFixtures(dir, 'ai-').length >= 5, `${dir}: expected >=5 ai-*.md`);
    assert.ok(listFixtures(dir, 'human-').length >= 5, `${dir}: expected >=5 human-*.md`);
  }
  assert.ok(FP_FIXTURES.length >= 4, 'expected >=4 false-positives/ar-*.md');
});

test('every AI fixture scores at or above the AI threshold', () => {
  const failures = [];
  for (const file of AI_FIXTURES) {
    const text = readFixture(file);
    const variety = varietyOf(text, 'msa');
    const r = analyzeText(text, { variety, sourceMode: 'rendered-markdown' });
    if (r.score < THRESHOLDS.AI || r.label !== 'AI') {
      failures.push(`${path.basename(path.dirname(file))}/${path.basename(file)} -> ${r.score} (${r.label})`);
    }
  }
  assert.deepEqual(failures, [], `AI fixtures below threshold ${THRESHOLDS.AI}:\n  ${failures.join('\n  ')}`);
});

test('every human fixture scores below the AI threshold', () => {
  const failures = [];
  for (const file of HUMAN_FIXTURES) {
    const text = readFixture(file);
    const variety = varietyOf(text, 'msa');
    const r = analyzeText(text, { variety, sourceMode: 'rendered-markdown' });
    if (r.score >= THRESHOLDS.AI) {
      failures.push(`${path.basename(path.dirname(file))}/${path.basename(file)} -> ${r.score} (${r.label})`);
    }
  }
  assert.deepEqual(failures, [], `human fixtures at/above threshold ${THRESHOLDS.AI}:\n  ${failures.join('\n  ')}`);
});

test('every human fixture is labelled HUMAN', () => {
  const failures = [];
  for (const file of HUMAN_FIXTURES) {
    const text = readFixture(file);
    const variety = varietyOf(text, 'msa');
    const r = analyzeText(text, { variety, sourceMode: 'rendered-markdown' });
    if (r.label !== 'HUMAN') failures.push(`${path.basename(file)} -> ${r.score} (${r.label})`);
  }
  assert.deepEqual(failures, [], `human fixtures not labelled HUMAN:\n  ${failures.join('\n  ')}`);
});

test('false-positive fixtures score HUMAN', () => {
  const failures = [];
  for (const file of FP_FIXTURES) {
    const text = readFixture(file);
    const variety = varietyOf(text, 'msa');
    const r = analyzeText(text, { variety, sourceMode: 'rendered-markdown' });
    if (r.label !== 'HUMAN') {
      failures.push(`${path.basename(file)} -> ${r.score} (${r.label}) `
        + `[${r.issues.map((i) => `${i.patternId}:${i.severity}`).join(', ')}]`);
    }
  }
  assert.deepEqual(failures, [], `false-positive fixtures not HUMAN:\n  ${failures.join('\n  ')}`);
});

test('every issue offset indexes the ORIGINAL text exactly', () => {
  const failures = [];
  for (const file of AI_FIXTURES.concat(HUMAN_FIXTURES, FP_FIXTURES)) {
    const text = readFixture(file);
    const variety = varietyOf(text, 'msa');
    const r = analyzeText(text, { variety, sourceMode: 'rendered-markdown' });
    for (const issue of r.issues) {
      assert.ok(Number.isInteger(issue.start) && Number.isInteger(issue.end),
        `${path.basename(file)}: non-integer offsets on ${issue.patternId}`);
      assert.ok(issue.start >= 0 && issue.end <= text.length && issue.start <= issue.end,
        `${path.basename(file)}: out-of-range offsets on ${issue.patternId}`);
      if (text.slice(issue.start, issue.end) !== issue.excerpt) {
        failures.push(`${path.basename(file)} ${issue.patternId}: `
          + `slice="${text.slice(issue.start, issue.end)}" excerpt="${issue.excerpt}"`);
      }
    }
  }
  assert.deepEqual(failures, [], `offset mismatches:\n  ${failures.join('\n  ')}`);
});

test('offsets stay exact on tashkeel- and tatweel-heavy input', () => {
  const base = readFixture(path.join(FIXTURE_ROOT, 'ar-msa', 'ai-01.md'));
  const clean = analyzeText(base, { variety: 'msa', sourceMode: 'rendered-markdown' });

  // Inject a deterministic sprinkle of tashkeel and tatweel between Arabic
  // letters. normalize() strips all of it, so the same phrases must still
  // match and the reported offsets must still index the noisy original.
  const marks = ['َ', 'ِ', 'ُ', 'ْ', 'ـ'];
  let noisy = '';
  let k = 0;
  for (let i = 0; i < base.length; i += 1) {
    noisy += base[i];
    const code = base.charCodeAt(i);
    const next = base.charCodeAt(i + 1);
    const isArabic = (c) => c >= 0x0621 && c <= 0x064a;
    if (isArabic(code) && isArabic(next) && i % 7 === 0) {
      noisy += marks[k % marks.length];
      k += 1;
    }
  }
  assert.ok(noisy.length > base.length, 'noise injection did nothing');

  const dirty = analyzeText(noisy, { variety: 'msa', sourceMode: 'rendered-markdown' });
  for (const issue of dirty.issues) {
    assert.equal(noisy.slice(issue.start, issue.end), issue.excerpt,
      `tashkeel-heavy offset mismatch on ${issue.patternId}`);
  }
  assert.equal(dirty.label, 'AI');
  // The same phrase patterns must survive the noise.
  const cleanIds = new Set(clean.issues.filter((i) => i.type !== 'uniform-rhythm').map((i) => i.patternId));
  const dirtyIds = new Set(dirty.issues.map((i) => i.patternId));
  for (const id of cleanIds) {
    assert.ok(dirtyIds.has(id), `pattern ${id} lost after tashkeel/tatweel injection`);
  }
});

test('rendered-markdown excludes frontmatter, HTML comments and code fences', () => {
  const aiParagraph = [
    'علاوة على ذلك، فإن التعليم يُعد ركيزة أساسية للتنمية الشاملة في المنطقة.',
    'من المهم الإشارة إلى أن هذا الأمر يُعتبر من أهم العوامل المؤثرة اليوم.',
    'تم إجراء الدراسة، وتم جمع البيانات، وتمت معالجتها إحصائيًا بدقة كاملة.',
    'وفي الختام، آمل أن يكون ذلك مفيدا للقارئ الكريم في فهم هذه القضية.',
  ].join('\n');

  const wrapped = [
    '---',
    'title: علاوة على ذلك',
    'summary: من المهم الإشارة إلى أن هذا مهم',
    '---',
    '',
    '<!-- علاوة على ذلك، ومما لا شك فيه أن هذا تعليق مخفي -->',
    '',
    '```',
    'علاوة على ذلك، وفي الختام، تم إجراء الدراسة',
    '```',
    '',
    'هذه فقرة قصيرة واحدة. لا أكثر.',
    '',
  ].join('\n');

  const masked = analyzeText(wrapped, { variety: 'msa', sourceMode: 'rendered-markdown' });
  assert.equal(masked.issues.length, 0,
    `expected no issues from masked regions, got ${masked.issues.map((i) => i.patternId).join(',')}`);
  assert.equal(masked.stats.maskedFrontmatter, 1);
  assert.ok(masked.stats.maskedHtmlComments >= 1);
  assert.ok(masked.stats.maskedCodeFences >= 1);

  // Plain mode sees the same text and does flag it — proving the exclusion
  // is the source mode, not the phrases.
  const plain = analyzeText(wrapped, { variety: 'msa', sourceMode: 'plain' });
  assert.ok(plain.issues.length > 0, 'plain mode should still flag the same phrases');

  // And real prose is still scored in rendered-markdown mode.
  const prose = analyzeText(`${wrapped}\n${aiParagraph}\n`, {
    variety: 'msa', sourceMode: 'rendered-markdown',
  });
  assert.ok(prose.issues.some((i) => i.patternId === 'AR-SH-002-A'),
    'unmasked prose should still be flagged');
});

test('URLs and inline code are never flagged, in either source mode', () => {
  const text = 'زرنا الصفحة https://example.com/علاوة-على-ذلك ثم شغّلنا `تم إجراء الدراسة وتم جمعها` محليًا.';
  for (const sourceMode of ['plain', 'rendered-markdown']) {
    const r = analyzeText(text, { variety: 'msa', sourceMode });
    assert.equal(r.issues.length, 0, `${sourceMode}: ${r.issues.map((i) => i.patternId).join(',')}`);
  }
});

test('MSA-leakage ratio is reported only for dialect varieties', () => {
  const egt = readFixture(path.join(FIXTURE_ROOT, 'ar-egt', 'ai-01.md'));

  const asMsa = analyzeText(egt, { variety: 'msa', sourceMode: 'rendered-markdown' });
  assert.equal('msaLeakage' in asMsa.stats, false, 'msa must not carry an msaLeakage stat');

  for (const variety of ['egt', 'shami']) {
    const r = analyzeText(egt, { variety, sourceMode: 'rendered-markdown' });
    assert.ok('msaLeakage' in r.stats, `${variety} must carry an msaLeakage stat`);
    assert.equal(typeof r.stats.msaLeakage.msaHits, 'number');
    assert.equal(typeof r.stats.msaLeakage.dialectHits, 'number');
    assert.ok(r.stats.msaLeakage.ratio > 0.5, `${variety}: expected heavy leakage, got ${r.stats.msaLeakage.ratio}`);
    assert.ok(r.issues.some((i) => i.type === 'msa-leakage'), `${variety}: expected an msa-leakage issue`);
  }

  // A genuine Egyptian human fixture must not be flagged for leakage.
  const human = readFixture(path.join(FIXTURE_ROOT, 'ar-egt', 'human-01.md'));
  const clean = analyzeText(human, { variety: 'egt', sourceMode: 'rendered-markdown' });
  assert.equal(clean.stats.msaLeakage.msaHits, 0);
  assert.equal(clean.issues.filter((i) => i.type === 'msa-leakage').length, 0);
});

test('a single P2 signal never leaves HUMAN, and neither does a single P1 or P0', () => {
  // One Western comma after an Arabic letter — a lone P2 typography signal.
  const p2 = 'خرجنا من البيت في السابعة, ثم مشينا إلى المحطة على مهل. الطريق كان فارغًا تمامًا في ذلك الوقت من الصباح. اشترينا الخبز من الفرن القديم عند الزاوية وعدنا.';
  const r2 = analyzeText(p2, { variety: 'msa' });
  assert.ok(r2.issues.some((i) => i.severity === 'P2'), 'expected the P2 punctuation signal');
  assert.equal(r2.issues.filter((i) => i.severity !== 'P2').length, 0);
  assert.equal(r2.label, 'HUMAN', `single P2 scored ${r2.score}`);
  assert.ok(r2.score <= WEIGHTS.P2, `single P2 should score at most ${WEIGHTS.P2}, got ${r2.score}`);

  // One hedge (P1) inside otherwise ordinary human prose.
  const p1 = 'من المهم الإشارة إلى أن الطريق إلى القرية أُغلق أمس. عاد السائق من منتصف الطريق. ركاب كثيرون نزلوا عند الجسر ومشوا الباقي على أقدامهم، وبعضهم حمل أطفاله على الكتف. الرحلة استغرقت ساعتين بدل أربعين دقيقة.';
  const r1 = analyzeText(p1, { variety: 'msa' });
  assert.equal(r1.issues.filter((i) => i.severity === 'P0').length, 0);
  assert.equal(r1.label, 'HUMAN', `single P1 scored ${r1.score}`);

  // One P0 alone is still below the AI threshold by construction.
  assert.ok(WEIGHTS.P0 < THRESHOLDS.AI, 'a single P0 must not reach the AI threshold');
  assert.ok(WEIGHTS.P0 < THRESHOLDS.MIXED, 'a single P0 must not even reach MIXED');
  assert.ok(WEIGHTS.P1 < THRESHOLDS.MIXED, 'a single P1 must not reach MIXED');
});

test('empty and whitespace-only input', () => {
  for (const text of ['', '   ', '\n\n\t']) {
    const r = analyzeText(text, { variety: 'msa' });
    assert.equal(r.score, 0);
    assert.equal(r.label, 'HUMAN');
    assert.deepEqual(r.issues, []);
    assert.equal(r.stats.tooShort, true);
    assert.equal(r.stats.empty, true);
  }
  const nonString = analyzeText(undefined, { variety: 'msa' });
  assert.equal(nonString.label, 'HUMAN');
});

test('text with no Arabic at all scores 0 and is flagged noArabic', () => {
  const r = analyzeText('The deployment finished at nine. Nothing else happened.', { variety: 'msa' });
  assert.equal(r.score, 0);
  assert.equal(r.label, 'HUMAN');
  assert.equal(r.stats.hasArabic, false);
  assert.equal(r.stats.noArabic, true);
  assert.deepEqual(r.issues, []);
});

test('very short Arabic text is capped and marked tooShort', () => {
  // Deliberately stacked with P0 phrases, but under 20 words.
  const text = 'علاوة على ذلك، بالتأكيد! من المهم الإشارة إلى ذلك. وفي الختام، شكرا على سؤالك الرائع.';
  const r = analyzeText(text, { variety: 'msa' });
  assert.ok(r.stats.wordCount < THRESHOLDS.TOO_SHORT_WORDS, `wordCount ${r.stats.wordCount}`);
  assert.equal(r.stats.tooShort, true);
  assert.ok(r.score <= THRESHOLDS.TOO_SHORT_CAP, `score ${r.score} above cap ${THRESHOLDS.TOO_SHORT_CAP}`);
  assert.notEqual(r.label, 'AI');
  assert.ok(r.issues.length > 0, 'short text still reports its issues, it just is not scored high');
});

test('invalid variety and sourceMode fall back and are recorded', () => {
  const r = analyzeText('نص عربي قصير جدا هنا.', { variety: 'gulf', sourceMode: 'html' });
  assert.equal(r.stats.variety, 'msa');
  assert.equal(r.stats.varietyFallback, 'gulf');
  assert.equal(r.stats.sourceMode, 'plain');
  assert.equal(r.stats.sourceModeFallback, 'html');
});

test('exports are shaped for docs and tests', () => {
  assert.deepEqual(Object.keys(WEIGHTS).sort(), ['P0', 'P1', 'P2']);
  assert.ok(WEIGHTS.P0 > WEIGHTS.P1 && WEIGHTS.P1 > WEIGHTS.P2, 'weights must be strictly tiered');
  assert.ok(THRESHOLDS.AI > THRESHOLDS.MIXED);
  assert.ok(Array.isArray(PATTERNS) && PATTERNS.length > 20);
  for (const p of PATTERNS) {
    assert.ok(/^AR-(SH|MSA|EGT|SHM)-/.test(p.id), `pattern id ${p.id} must cite a reference id`);
    assert.ok(['P0', 'P1', 'P2'].includes(p.severity));
  }
});

test('rhetorical questions are not a signal in Arabic', () => {
  const text = 'متى تعلمنا أخيرا أن الأمم لا تبنى بالثروات، بل بما تفعله بها؟ ومن الذي قرر أن المكتبة ترف؟ ومن سأله أصلا؟ الجواب موجود في محضر جلسة مفتوحة للعموم لا يقرؤها أحد، ويمكن لأي مواطن أن يطلب نسخة منها.';
  const r = analyzeText(text, { variety: 'msa' });
  assert.equal(r.issues.filter((i) => /question/i.test(i.type)).length, 0);
  assert.equal(r.label, 'HUMAN');
});
