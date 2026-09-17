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

// ─────────────────────────────────────────────────────────────────────────
// Round 1: IMP-12 (AR-MSA-031 light-verb calques, AR-MSA-032 collocation
// calques) and IMP-17 (definite-article clitic in phrase matching).
// ─────────────────────────────────────────────────────────────────────────

const lexicons = require('../skills/humanizer-pro/scripts/lib/ar-detector/lexicons.js');
const { normalize } = require('../skills/humanizer-pro/scripts/lib/arabic-normalize.js');

/** The compiled regexes for one pattern id, across every variety bucket. */
function regexesFor(id) {
  for (const bucket of Object.values(lexicons.RAW_PATTERNS)) {
    for (const pat of bucket) {
      if (pat.id !== id) continue;
      const out = [];
      for (const spec of pat.regexes || []) out.push(new RegExp(spec.source, 'gu'));
      if (pat.phrases && pat.phrases.length) out.push(lexicons.buildPhraseRegex(pat.phrases));
      if (pat.stemPhrases && pat.stemPhrases.length) {
        out.push(lexicons.buildPhraseRegex(pat.stemPhrases, { stem: true }));
      }
      return out.filter(Boolean);
    }
  }
  throw new Error(`no pattern ${id} in RAW_PATTERNS`);
}

function matches(id, text) {
  const normalized = normalize(text, { taMarbuta: false }).normalized;
  return regexesFor(id).some((re) => {
    re.lastIndex = 0;
    return re.test(normalized);
  });
}

test('AR-MSA-031: the light-verb regex fires on قام بإجراء الدراسة', () => {
  assert.ok(matches('AR-MSA-031', 'قام بإجراء الدراسة'), 'expected a light-verb match');
  // Every host form and the تم القيام بـ periphrasis.
  for (const t of [
    'قامت بتقديم الطلب',
    'يقوم بتحليل البيانات',
    'تقوم بإعداد التقرير',
    'سيقوم بتنفيذ الخطة',
    'تم القيام باتخاذ القرار',
    'قام بالإعداد للمؤتمر',
  ]) {
    assert.ok(matches('AR-MSA-031', t), `expected a light-verb match in: ${t}`);
  }
});

test('AR-MSA-031: the light-verb regex does not fire on قام بسرعة', () => {
  // The documented false positive of a naive قام + بـ regex, plus the
  // idiomatic periphrases excluded from the verbal-noun list on purpose.
  for (const t of [
    'قام بسرعة',
    'قام بسرعة إلى البيت',
    'قام بدور مهم في الحكاية',
    'قام بزيارة إلى المدينة',
    'قام بنفسه',
    'قام بواجبه',
    'قام بجولة في الحي',
    'قام الرجل من مكانه',
  ]) {
    assert.ok(!matches('AR-MSA-031', t), `unexpected light-verb match in: ${t}`);
  }
});

test('AR-MSA-031: a light-verb run is reported as an issue on a real document', () => {
  const text =
    'قامت اللجنة بإجراء مراجعة شاملة للملفات في مطلع الشهر الماضي، ثم قامت بتقديم ' +
    'توصياتها إلى الجهة المختصة، وبعد أسبوعين تم القيام باتخاذ القرار النهائي ' +
    'ونشره في الجريدة الرسمية دون أي تعديل على صيغته الأولى.';
  const r = analyzeText(text, { variety: 'msa' });
  const hits = r.issues.filter((i) => i.patternId === 'AR-MSA-031');
  assert.ok(hits.length >= 2, `expected at least 2 AR-MSA-031 hits, got ${hits.length}`);
  for (const h of hits) assert.equal(text.slice(h.start, h.end), h.excerpt);
  // A stylistic periphrasis on its own is not enough to be worth reporting.
  const single = analyzeText(
    'قام الباحث بإجراء الدراسة في مدينة صغيرة على ساحل البحر، ثم عاد إلى الجامعة ' +
      'وكتب ما رآه في دفتر صغير لم يقرأه أحد بعد ذلك، وبقي الدفتر في الدرج سنوات.',
    { variety: 'msa' },
  );
  assert.equal(
    single.issues.filter((i) => i.patternId === 'AR-MSA-031').length,
    0,
    'one light-verb construction must stay below the minCount gate',
  );
});

test('AR-MSA-032: the attested collocation calques fire, ordinary أخذ does not', () => {
  // The list matches the adjacent pairing only; an intervening subject
  // (أخذت الإدارة قرارا) is left to review, as the reference entry says.
  for (const t of ['أخذت قرارا متأخرا', 'أخذ قرارا', 'أخذ بعين الاعتبار كل الملاحظات', 'الأخذ بعين الاعتبار']) {
    assert.ok(matches('AR-MSA-032', t), `expected a collocation-calque match in: ${t}`);
  }
  for (const t of ['أخذ الكتاب من الرف', 'أخذ يقرأ في الصباح', 'أخذ مكانه في الصف', 'أخذت الإدارة قرارا']) {
    assert.ok(!matches('AR-MSA-032', t), `unexpected collocation-calque match in: ${t}`);
  }
});

test('IMP-17: a stem entry matches its ال-prefixed and proclitic-plus-ال forms', () => {
  const re = lexicons.buildPhraseRegex(['اقتصاد'], { stem: true });
  for (const w of ['اقتصاد', 'الاقتصاد', 'والاقتصاد', 'بالاقتصاد', 'فالاقتصاد', 'كالاقتصاد', 'للاقتصاد']) {
    re.lastIndex = 0;
    assert.ok(re.test(w), `stem regex should match ${w}`);
  }
  // The right boundary still forbids a following Arabic letter, so a
  // derived word sharing the stem never matches.
  for (const w of ['اقتصادي', 'الاقتصادية', 'واقتصاديات']) {
    re.lastIndex = 0;
    assert.ok(!re.test(w), `stem regex should not match ${w}`);
  }
  // The reported span excludes whatever prefix was consumed.
  const m = new RegExp(re.source, 'u').exec('والاقتصاد');
  assert.equal(m[1], 'اقتصاد');
});

test('IMP-17: the default (non-stem) matching behaviour is unchanged', () => {
  const re = lexicons.buildPhraseRegex(['اقتصاد']);
  for (const w of ['اقتصاد', 'واقتصاد', 'باقتصاد']) {
    re.lastIndex = 0;
    assert.ok(re.test(w), `plain regex should match ${w}`);
  }
  for (const w of ['الاقتصاد', 'والاقتصاد', 'للاقتصاد']) {
    re.lastIndex = 0;
    assert.ok(!re.test(w), `plain regex must not match ${w} without opting in`);
  }
});

test('IMP-17: AR-SH-001 now fires on والجدير بالذكر and still on the bare form', () => {
  for (const form of ['جدير بالذكر', 'الجدير بالذكر', 'والجدير بالذكر', 'من الجدير بالذكر']) {
    const text = `${form} أن الدراسة الأولى لم تتناول هذا الجانب إطلاقا، وأن الفريق الذي تولى المراجعة الثانية عمل على مادة مختلفة تماما عن الأولى.`;
    const r = analyzeText(text, { variety: 'msa' });
    const hits = r.issues.filter((i) => i.patternId === 'AR-SH-001');
    assert.ok(hits.length >= 1, `expected AR-SH-001 to fire on: ${form}`);
    for (const h of hits) assert.equal(text.slice(h.start, h.end), h.excerpt);
  }
});

// ─────────────────────────────────────────────────────────────────────────
// IMP-02: sourced (non-synthetic) human fixtures.
//
// tests/fixtures/human-sourced/*.md is real published Arabic from before
// the 2022-11-30 pre-model cutoff, reused under CC BY-SA 4.0, with the
// exact revision recorded in each file's header and in _provenance.md.
// Unlike every other Arabic human fixture in this repository, nobody on
// this project wrote them, so they are the one false-positive anchor that
// cannot have been unconsciously shaped to the detector.
//
// These are scored through detect.js's analyze() with **auto-routing**: no
// lang, no variety. Forcing a variety would test the lexicon in isolation
// and skip the routing decision, and routing is itself a false-positive
// source (see corpus/RESULTS.md).
// ─────────────────────────────────────────────────────────────────────────

const { analyze: autoAnalyze } = require('../skills/humanizer-pro/scripts/detect.js');

const SOURCED_DIR = path.join(FIXTURE_ROOT, 'human-sourced');

function listSourced() {
  if (!fs.existsSync(SOURCED_DIR)) return [];
  return fs.readdirSync(SOURCED_DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort()
    .map((f) => path.join(SOURCED_DIR, f));
}

test('IMP-02: every sourced human fixture carries a complete provenance header', () => {
  const files = listSourced();
  assert.ok(files.length >= 2, `expected at least 2 sourced fixtures, found ${files.length}`);
  for (const file of files) {
    const head = readFixture(file).slice(0, 600);
    const m = /<!--\s*fixture:\s*sourced-human\s*;\s*variety:\s*([a-z]+)\s*;\s*source:\s*(\S+)\s*rev\s*(\d+)\s*;\s*licence:\s*([^;]+);\s*cleanup:\s*([^>]+)-->/.exec(head);
    assert.ok(m, `${path.basename(file)}: missing or malformed sourced-human header`);
    assert.ok(['msa', 'egt', 'shami'].includes(m[1]), `${path.basename(file)}: bad variety ${m[1]}`);
    assert.ok(/^https?:\/\//.test(m[2]), `${path.basename(file)}: source must be a url`);
    assert.ok(m[4].trim().length > 3, `${path.basename(file)}: licence must be named`);
    assert.ok(m[5].trim().length > 10, `${path.basename(file)}: cleanup steps must be described`);
  }
  // The provenance log has to exist and has to mention every file.
  const log = path.join(SOURCED_DIR, '_provenance.md');
  assert.ok(fs.existsSync(log), 'tests/fixtures/human-sourced/_provenance.md is missing');
  const logText = readFixture(log);
  for (const file of files) {
    assert.ok(
      logText.includes(path.basename(file)),
      `_provenance.md does not mention ${path.basename(file)}`,
    );
  }
});

test('IMP-02: every sourced human fixture scores below MIXED under auto-routing', () => {
  const failures = [];
  for (const file of listSourced()) {
    const text = readFixture(file);
    // Auto-routing: no lang and no variety forced, exactly as `detect.js`
    // would treat the file if a user handed it over with no flags.
    const r = autoAnalyze(text);
    if (r.score >= THRESHOLDS.MIXED) {
      failures.push(`${path.basename(file)} scored ${r.score} (${r.label}) as ${r.lang}/${r.variety}`);
    }
    assert.equal(r.label, 'HUMAN', `${path.basename(file)}: label ${r.label}`);
  }
  assert.deepEqual(failures, [], `sourced human fixtures at or above MIXED: ${failures.join('; ')}`);
});

test('IMP-02: the sourced fixtures cover more than one variety, and the header matches the routing', () => {
  const routed = new Map();
  for (const file of listSourced()) {
    const text = readFixture(file);
    routed.set(path.basename(file), { declared: varietyOf(text, 'msa'), actual: autoAnalyze(text).variety });
  }
  assert.ok(routed.size >= 2, 'expected sourced fixtures for at least two varieties');
  const declared = new Set([...routed.values()].map((v) => v.declared));
  assert.ok(declared.size >= 2, `expected at least two declared varieties, got ${[...declared].join(',')}`);
  // A fixture that declares a dialect but routes to msa tests nothing about
  // that dialect's lexicon. _provenance.md records this reasoning; the test
  // holds the two apart so a future re-pick cannot quietly lose it.
  for (const [name, v] of routed) {
    assert.equal(
      v.actual,
      v.declared,
      `${name}: declared variety ${v.declared} but auto-routing chose ${v.actual}`,
    );
  }
});

// ─── Per-pattern contribution cap (corpus finding 2) ─────────────────────

/**
 * 20 تم/يتم periphrastic passives in sentences of deliberately VARIED length,
 * so AR-MSA-006 is the only id that fires: a mechanically uniform version of
 * the same text also trips AR-SH-004 (uniform rhythm) and AR-MSA-028
 * (trigram repetition), which would measure those signals instead of the cap.
 */
const TWENTY_PASSIVES = [
  'تم افتتاح المبنى.',
  'يتم استقبال الزوار في الطابق الأرضي من الصباح الباكر وحتى غروب الشمس، ويجلس الحارس عند المدخل الشمالي يقرأ صحيفته القديمة.',
  'تمت ترميم الواجهة الحجرية العام الماضي.',
  'يتم الآن نقل المعروضات الصغيرة إلى قاعة جديدة أوسع وأفضل تهوية.',
  'تم بناء الجناح الشرقي عام ألف وتسعمئة وأربعين على يد معماري محلي لم يوقع مخططاته قط.',
  'يتم الترميم ببطء.',
  'تمت إضافة مصعد.',
  'يتم فتح القاعة الكبرى أيام الجمعة فقط، لأن السقف الخشبي يحتاج راحة طويلة بين موسم وآخر.',
  'تم تركيب الإضاءة الجديدة الشهر الماضي بعد نقاش طويل بين القيّمين والمهندسين حول لون الضوء.',
  'يتم تنظيف الأرضية ليلا.',
  'تم اقتناء لوحتين من مزاد صغير في مدينة ساحلية لا يعرفها كثيرون، وكانت إحداهما تالفة.',
  'يتم عرض المجموعة النحاسية في خزانة زجاجية ضيقة.',
  'تمت طباعة الدليل المصور.',
  'يتم بيع التذاكر عند الباب، ولا تقبل الحجوزات المسبقة إلا للمدارس والرحلات المنظمة.',
  'تم تعيين مرشدة جديدة تتحدث ثلاث لغات وتعرف تاريخ الحي بيتا بيتا وشجرة شجرة.',
  'يتم إغلاق المتحف في الأعياد.',
  'تم إصلاح السلم الحجري.',
  'يتم تدوين ملاحظات الزوار في سجل كبير موضوع على منضدة خشبية قديمة عند المخرج.',
  'تمت استعادة ثلاث قطع كانت مفقودة منذ سنوات طويلة، وعادت إلى مكانها الأصلي في القاعة.',
  'يتم ذلك كله بميزانية متواضعة.',
].join(' ');

test('cap: the cap is exported and sits one point below MIXED', () => {
  assert.equal(THRESHOLDS.PATTERN_CONTRIBUTION_CAP, 24);
  assert.equal(
    THRESHOLDS.PATTERN_CONTRIBUTION_CAP, THRESHOLDS.MIXED - 1,
    'the cap must sit exactly one point below MIXED, so no single pattern can reach it',
  );
});

test('cap: 20 تم-passives and nothing else score 24 / HUMAN, not 84 / AI', () => {
  const r = analyzeText(TWENTY_PASSIVES, { variety: 'msa' });

  // Precondition: AR-MSA-006 is the ONLY id that fires, 20 times.
  const ids = [...new Set(r.issues.map((i) => i.patternId))];
  assert.deepEqual(ids, ['AR-MSA-006'], `expected only AR-MSA-006, got ${ids.join(', ')}`);
  assert.equal(r.issues.length, 20, `expected 20 AR-MSA-006 hits, got ${r.issues.length}`);
  assert.equal(r.issues[0].severity, 'P0', 'AR-MSA-006 is P0, the cap applies to P0 too');

  // The cap, and the exact resulting score.
  const capped = (r.stats.cappedPatterns || []).find((c) => c.patternId === 'AR-MSA-006');
  assert.ok(capped, `expected AR-MSA-006 to be capped, got ${JSON.stringify(r.stats.cappedPatterns)}`);
  assert.equal(capped.uncapped, 84, 'uncapped subtotal: 14 + 7 + 18 x 3.5 = 84');
  assert.equal(capped.capped, 24);
  assert.equal(r.score, 24, 'the documented resulting score');
  assert.equal(r.label, 'HUMAN');
  assert.ok(r.score < THRESHOLDS.AI, 'well below the AI threshold');
  assert.ok(r.score < THRESHOLDS.MIXED, 'and below MIXED: no single pattern can reach it');
  assert.equal(r.stats.patternContributionCap, THRESHOLDS.PATTERN_CONTRIBUTION_CAP);
});

test('cap: every hit is still reported even though the score is capped', () => {
  // The cap is a SCORING rule, not a reporting one, an editor must still see
  // all 20 passives to fix them.
  const r = analyzeText(TWENTY_PASSIVES, { variety: 'msa' });
  assert.equal(r.stats.issueCount, 20);
  assert.equal(r.stats.p0Count, 20);
});

test('cap: different patterns still corroborate, two capped patterns sum past MIXED', () => {
  // علاوة على ذلك (AR-SH-002-A, P0) plus تم/يتم: two independent patterns,
  // each individually capped, together clear MIXED. The cap suppresses
  // single-pattern accumulation only.
  const text = `${TWENTY_PASSIVES} علاوة على ذلك فإن الأمر واضح. علاوة على ذلك يبقى السؤال. `
    + 'علاوة على ذلك تظل الحاجة قائمة. علاوة على ذلك لا خلاف في هذا.';
  const r = analyzeText(text, { variety: 'msa' });
  const ids = new Set(r.issues.map((i) => i.patternId));
  assert.ok(ids.size >= 2, `expected at least 2 distinct patterns, got ${[...ids].join(', ')}`);
  assert.ok(
    r.score >= THRESHOLDS.MIXED,
    `expected corroborating patterns to clear MIXED, got ${r.score} (${[...ids].join(', ')})`,
  );
});

test('cap: AI fixtures still reach THRESHOLDS.AI, they stack distinct patterns', () => {
  const failures = [];
  for (const file of AI_FIXTURES) {
    const text = readFixture(file);
    const r = analyzeText(text, {
      variety: varietyOf(text, 'msa'),
      sourceMode: 'rendered-markdown',
    });
    const distinctPatterns = new Set(r.issues.map((i) => i.patternId)).size;
    if (r.score < THRESHOLDS.AI) {
      failures.push(`${path.basename(file)} -> ${r.score} (${distinctPatterns} distinct patterns)`);
    }
  }
  assert.deepEqual(failures, [], `AI fixtures below THRESHOLDS.AI after the cap:\n  ${failures.join('\n  ')}`);
});

// ─── AR-SH-008 vocabulary concentration (IMP-23) ─────────────────────────

const signals = require('../skills/humanizer-pro/scripts/lib/ar-detector/signals.js');

test('AR-SH-008: the gates are the corpus-measured percentiles', () => {
  // Copied from docs/evidence/round1-wave2F-vocab-distribution.txt. Changing
  // either number requires a fresh measurement, which is the point of
  // pinning them here.
  assert.equal(signals.GATES.VOCAB_TOP_SHARE_GATE, 0.0629);
  assert.equal(signals.GATES.VOCAB_TTR_GATE, 0.6455);
  assert.equal(signals.GATES.TTR_WINDOW, 200);
  assert.equal(signals.GATES.VOCAB_MIN_CONTENT_TOKENS, 80);
});

test('AR-SH-008: vocabularyConcentration is not applicable below the content-token floor', () => {
  const v = signals.vocabularyConcentration(['كتاب', 'قلم', 'طاولة']);
  assert.equal(v.applicable, false);
  assert.equal(v.topShare, null);
  assert.equal(v.ttr, null);
  assert.equal(v.contentTokenCount, 3);
});

test('AR-SH-008: ttr is null between the share floor and the TTR window', () => {
  // 100 distinct content tokens: above VOCAB_MIN_CONTENT_TOKENS (80) so the
  // share is reported, below TTR_WINDOW (200) so the ratio is not, a TTR
  // over 100 tokens is not comparable to one over 200.
  const tokens = [];
  for (let i = 0; i < 100; i += 1) tokens.push(`مادة${'ا'.repeat(i % 9 + 1)}${i}`);
  const v = signals.vocabularyConcentration(tokens);
  assert.equal(v.applicable, true);
  assert.equal(v.ttr, null, 'ttr must be null below the fixed window');
  assert.equal(typeof v.topShare, 'number');
  assert.equal(v.ttrWindow, 200);
});

test('AR-SH-008: the stoplist removes function words, name-chain connectors and dialect particles', () => {
  const stop = new Set(signals.AR_STOPWORDS_RAW);
  for (const w of ['في', 'من', 'الذي', 'كان', 'هذا']) {
    assert.ok(stop.has(w), `${w} must be stoplisted (Arabic function word)`);
  }
  for (const w of ['بن', 'ابن', 'ألف', 'مليون']) {
    assert.ok(stop.has(w), `${w} must be stoplisted (name-chain connector / bare numeral)`);
  }
  for (const w of ['اللي', 'عم', 'مش', 'مو', 'شو', 'عشان']) {
    assert.ok(stop.has(w), `${w} must be stoplisted (dialect function word)`);
  }
  // تم/يتم is AR-MSA-006's business; stoplisting it here would hide a real
  // concentration.
  for (const w of ['تم', 'يتم']) {
    assert.ok(!stop.has(w), `${w} must NOT be stoplisted, it is AR-MSA-006's signal`);
  }
});

test('AR-SH-008: a concentrated text fires the signal at a graded weight of 1 or 2', () => {
  // One content word repeated hard, in varied sentences so the rhythm and
  // trigram signals stay quiet.
  const sentences = [];
  for (let i = 0; i < 24; i += 1) {
    sentences.push(i % 3 === 0
      ? 'الطاقة الشمسية واعدة.'
      : `وتنتشر الطاقة الشمسية في منطقة رقم ${i} حيث يتوافر الإشعاع بوفرة ملحوظة عبر فصول السنة كلها`
        + ' وتتسع رقعة الاستثمار فيها عاما بعد عام على نحو مطرد.');
  }
  const r = analyzeText(sentences.join(' '), { variety: 'msa' });
  const hit = r.issues.find((i) => i.patternId === 'AR-SH-008');
  assert.ok(hit, `expected AR-SH-008 to fire, got ${[...new Set(r.issues.map((i) => i.patternId))].join(', ')}`);
  assert.equal(hit.severity, 'P2');
  assert.ok(hit.weight === 1 || hit.weight === 2, `expected a graded weight of 1 or 2, got ${hit.weight}`);
  assert.ok(hit.weight <= WEIGHTS.P2, 'a graded weight may never exceed its tier weight');
  assert.equal(r.stats.vocabularyConcentration.applicable, true);
  assert.ok(r.stats.vocabularyConcentration.shareTrips || r.stats.vocabularyConcentration.ttrTrips);
});

test('AR-SH-008: human fixtures stay well inside the gates', () => {
  // The gates were set at the 97.5th/2.5th percentiles of a 300-document
  // human corpus so that at most 5% of human documents receive ANY
  // contribution. None of this repository's human fixtures does.
  const offenders = [];
  for (const file of HUMAN_FIXTURES) {
    const text = readFixture(file);
    const r = analyzeText(text, {
      variety: varietyOf(text, 'msa'),
      sourceMode: 'rendered-markdown',
    });
    if (r.issues.some((i) => i.patternId === 'AR-SH-008')) {
      offenders.push(`${path.basename(file)} -> ${JSON.stringify(r.stats.vocabularyConcentration)}`);
    }
  }
  assert.deepEqual(offenders, [], `AR-SH-008 fired on a human fixture:\n  ${offenders.join('\n  ')}`);
});

test('AR-SH-008: is listed in PATTERNS as a graded signal', () => {
  const entry = PATTERNS.find((p) => p.id === 'AR-SH-008');
  assert.ok(entry, 'AR-SH-008 must appear in PATTERNS');
  assert.equal(entry.scope, 'signal');
  assert.equal(entry.severity, 'P2');
  assert.equal(entry.graded, '1..2');
});

// ─── IMP-17 follow-up, stem phrases count as phrases ────────────────────

test('PATTERNS.phraseCount includes stemPhrases entries', () => {
  const lexicons = require('../skills/humanizer-pro/scripts/lib/ar-detector/lexicons.js');
  const withStems = [];
  for (const [, list] of Object.entries(lexicons.RAW_PATTERNS)) {
    for (const p of list) {
      if (p.stemPhrases && p.stemPhrases.length) withStems.push(p);
    }
  }
  assert.ok(withStems.length > 0, 'expected at least one pattern with stemPhrases (AR-SH-001, IMP-17)');
  for (const raw of withStems) {
    const entry = PATTERNS.find((p) => p.id === raw.id && p.scope !== 'signal');
    assert.ok(entry, `${raw.id} must appear in PATTERNS`);
    assert.equal(
      entry.phraseCount,
      (raw.phrases || []).length + raw.stemPhrases.length,
      `${raw.id}: phraseCount must include its ${raw.stemPhrases.length} stem phrase(s)`,
    );
    assert.equal(entry.stemPhraseCount, raw.stemPhrases.length);
  }
});
