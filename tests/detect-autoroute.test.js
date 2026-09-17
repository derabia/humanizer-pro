/**
 * humanizer-pro — auto-routing tests for detect.js's analyze()
 * origin: humanizer-pro
 *
 * Every Arabic fixture test elsewhere in this suite (tests/ar-detector.test.js)
 * calls analyzeText() directly with the variety read out of the fixture's own
 * HTML-comment header — i.e. with the "right answer" handed to the engine.
 * This file instead calls detect.js's analyze() with NO --lang/--variety, so
 * lib/lang.js has to pick the variety itself, exactly as a real caller who
 * doesn't know the answer in advance would use the CLI.
 *
 * This matters because of two related failure modes that only show up under
 * auto-routing (never under an explicit --variety):
 *
 *   1. Register collapse (ar-egyptian.md Category 1): an AI asked for
 *      Egyptian/Levantine text often writes something that is, lexically,
 *      close to 100% MSA — lib/lang.js's identify() then (correctly, given
 *      what it can see) reports variety 'msa' with little or no dialect
 *      marker evidence, and the MSA engine alone does not always reach the
 *      AI threshold even though the text is a textbook AI dialect-tell.
 *      detect.js's analyze() compensates for this with a register-mix check
 *      (see registerMixCheck() in scripts/detect.js) that also tries the
 *      dialect engine(s) when the msa engine's own verdict is inconclusive,
 *      and promotes whichever scores higher and clears THRESHOLDS.AI.
 *
 *   2. Quoted-speech mis-routing (tests/fixtures/false-positives/ar-quoted-speech.md):
 *      dialect markers that appear ONLY inside quoted/reported speech must
 *      not count as evidence of the DOCUMENT's own register — a narrator
 *      writing MSA who quotes an Egyptian speaker verbatim is not "mixing"
 *      registers at the document level. lib/lang.js's identify() masks
 *      quoted spans (« », "...") before counting dialect markers so this
 *      routes to 'msa' and the narration is never flagged as leakage.
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const { analyze } = require('../skills/humanizer-pro/scripts/detect.js');
const { THRESHOLDS } = require('../skills/humanizer-pro/scripts/lib/ar-detector/index.js');

const FIXTURE_ROOT = path.join(__dirname, 'fixtures');

function readFixture(file) {
  return fs.readFileSync(file, 'utf8');
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

test('auto-routing fixture corpus is non-empty', () => {
  assert.ok(AI_FIXTURES.length >= 15, `expected >=15 ai-*.md, got ${AI_FIXTURES.length}`);
  assert.ok(HUMAN_FIXTURES.length >= 15, `expected >=15 human-*.md, got ${HUMAN_FIXTURES.length}`);
  assert.ok(FP_FIXTURES.length >= 4, `expected >=4 false-positives/ar-*.md, got ${FP_FIXTURES.length}`);
});

test('every AI fixture scores at or above THRESHOLDS.AI under auto-routing (no --variety)', () => {
  const failures = [];
  for (const file of AI_FIXTURES) {
    const text = readFixture(file);
    const r = analyze(text, { markdown: true });
    if (r.score < THRESHOLDS.AI || r.label !== 'AI') {
      const mix = r.stats && r.stats.registerMix ? ` registerMix=${JSON.stringify(r.stats.registerMix)}` : '';
      failures.push(`${path.basename(path.dirname(file))}/${path.basename(file)} -> `
        + `${r.score} (${r.label}, variety=${r.variety})${mix}`);
    }
  }
  assert.deepEqual(failures, [], `AI fixtures below THRESHOLDS.AI under auto-routing:\n  ${failures.join('\n  ')}`);
});

test('every human fixture scores below THRESHOLDS.MIXED under auto-routing (no --variety)', () => {
  const failures = [];
  for (const file of HUMAN_FIXTURES) {
    const text = readFixture(file);
    const r = analyze(text, { markdown: true });
    if (r.score >= THRESHOLDS.MIXED) {
      failures.push(`${path.basename(path.dirname(file))}/${path.basename(file)} -> `
        + `${r.score} (${r.label}, variety=${r.variety})`);
    }
  }
  assert.deepEqual(failures, [], `human fixtures at/above THRESHOLDS.MIXED under auto-routing:\n  ${failures.join('\n  ')}`);
});

test('every false-positive fixture scores below THRESHOLDS.MIXED under auto-routing (no --variety)', () => {
  const failures = [];
  for (const file of FP_FIXTURES) {
    const text = readFixture(file);
    const r = analyze(text, { markdown: true });
    if (r.score >= THRESHOLDS.MIXED) {
      failures.push(`${path.basename(file)} -> ${r.score} (${r.label}, variety=${r.variety})`);
    }
  }
  assert.deepEqual(failures, [], `false-positive fixtures at/above THRESHOLDS.MIXED under auto-routing:\n  ${failures.join('\n  ')}`);
});

test('quoted dialect speech inside MSA narration does not mis-route the document', () => {
  const file = path.join(FIXTURE_ROOT, 'false-positives', 'ar-quoted-speech.md');
  const text = readFixture(file);
  const r = analyze(text, { markdown: true });
  assert.equal(r.variety, 'msa', 'narration is MSA; quoted speaker\'s dialect must not win routing');
  assert.equal(r.label, 'HUMAN', `expected HUMAN, got ${r.label} (score ${r.score})`);
  assert.equal(r.score, 0, `expected a clean score, got ${r.score}`);
});

// Synthetic register-collapse text: near-pure MSA surface form (msa engine
// lands in MIXED territory, well under THRESHOLDS.AI) padded with enough
// neutral filler sentences that the two Egyptian markers it carries
// (بتاع, ليه) stay BELOW lib/lang.js's identify() strong-evidence density
// threshold (distinct>=2 AND density>=1/100 words) — so auto-routing still
// hands this to the msa engine first, exactly like the fixtures used to
// before they were edited to carry dense, realistic dialect markers (which
// now make identify() route them to the dialect engine directly, see the
// "every AI fixture scores..." test above). This is what still exercises
// detect.js's registerMixCheck() promotion path end-to-end: gate 1 (lexical
// dialect intent, distinct>=2) and gate 2 (dialectScore >= THRESHOLDS.AI and
// scoreWithoutLeakage >= THRESHOLDS.MIXED) both pass, so egt is promoted.
function buildRegisterCollapseText() {
  const base = [
    'بالتأكيد! من المهم أن نلاحظ أن هذا الموضوع يستحق الاهتمام الكامل من الجميع اليوم.',
    'الآن أريد أن أذهب لأرى هذا الشيء بنفسي قبل أن أتخذ أي قرار في هذه المسألة.',
    'سوف نتحدث عن هذا الموضوع لاحقاً وسأذهب لمقابلته غداً في المكتب الرئيسي للشركة.',
    'هو يكتب الرسالة الآن ويفهم المشكلة التي تواجه الفريق منذ بداية هذا الشهر الحالي.',
    'هذه المشكلة وهؤلاء الناس تسببوا في هذا الموقف الصعب الذي نعيشه في الوقت الراهن.',
    'لم أستطع أن أفهم ذلك لأنه لم يكن واضحاً بما فيه الكفاية في الرسالة السابقة.',
    'يُعتبر هذا الأمر من الأمور الهامة التي يجب أن يُلاحظها الجميع دون أي استثناء يذكر.',
    'شكراً جزيلاً على مساعدتك، وأيضاً تماماً فهمت ما قلته في اجتماع الأسبوع الماضي بتاع العمل.',
    'هو شاطر جداً في عمله وذكي جداً ويستحق الترقية التي تحدثنا عنها سابقاً مع المدير ليه هذا الأمر.',
    'وفي الختام، آمل أن يكون هذا الحديث قد أفاد الجميع في فهم تفاصيل هذه القضية.',
  ].join('\n');
  const filler = Array.from({ length: 12 }, (_, i) =>
    `هذه فقرة إضافية رقم ${i + 1} تشرح تفاصيل عامة عن الموضوع من زاوية مختلفة قليلاً عن سابقتها.`).join('\n');
  return `${base}\n${filler}`;
}

test('register-mix promotion only fires when the dialect candidate outscores msa, clears THRESHOLDS.AI, and shows lexical dialect intent', () => {
  const text = buildRegisterCollapseText();
  const r = analyze(text, { markdown: true });
  assert.equal(r.label, 'AI');
  assert.equal(r.variety, 'egt');
  assert.ok(r.stats.registerMix, 'expected stats.registerMix to be attached');
  assert.equal(r.stats.registerMix.promoted, true);
  assert.equal(r.stats.registerMix.variety, r.variety);
  assert.ok(r.stats.registerMix.dialectScore > r.stats.registerMix.msaScore);
  assert.ok(r.stats.registerMix.dialectScore >= THRESHOLDS.AI);
  assert.ok(r.stats.registerMix.scoreWithoutLeakage >= THRESHOLDS.MIXED);
  assert.match(r.stats.registerMix.note, /الفصحى/);
});

test('register-mix check never runs when --variety/--lang is passed explicitly', () => {
  const file = path.join(FIXTURE_ROOT, 'ar-egt', 'ai-01.md');
  const text = readFixture(file);
  const forced = analyze(text, { markdown: true, variety: 'msa' });
  assert.equal(forced.variety, 'msa');
  assert.ok(!forced.stats.registerMix, 'explicit --variety must bypass the register-mix check entirely');
});

test('genuine human MSA text is never promoted to a dialect by the register-mix check', () => {
  // Forcing 'egt'/'shami' on clean human MSA can still score non-trivially
  // via msaLeakage (documented in scripts/detect.js's registerMixCheck
  // comment: ar-msa/human-04.md scores 53/100 under 'egt'), so this is the
  // regression this test guards: that score must stay under THRESHOLDS.AI
  // so promotion never fires for genuinely human MSA prose.
  for (const file of listFixtures('ar-msa', 'human-')) {
    const text = readFixture(file);
    const r = analyze(text, { markdown: true });
    assert.equal(r.variety, 'msa', `${path.basename(file)}: must stay msa, got ${r.variety}`);
    assert.equal(r.label, 'HUMAN', `${path.basename(file)}: must stay HUMAN, got ${r.label} (${r.score})`);
  }
});

/**
 * REGRESSION — the false positive this whole gate exists to fix: inserting
 * a single hedge phrase ("من المهم الإشارة إلى أن ") at the start of the
 * first prose paragraph of a clean human MSA fixture used to get promoted
 * to 'egt' at score 59 (msaScore 6, dialectScore 59) purely on the strength
 * of the msa-leakage signal — a signal that is meaningless when the text
 * carries no lexical evidence of dialect intent at all. Verified against
 * all five tests/fixtures/ar-msa/human-*.md fixtures.
 */
function injectHedge(text) {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (trimmed && !trimmed.startsWith('<!--')) {
      lines[i] = `من المهم الإشارة إلى أن ${lines[i]}`;
      return lines.join('\n');
    }
  }
  throw new Error('no prose line found to inject a hedge into');
}

test('a single injected hedge phrase never promotes clean human MSA prose to a dialect verdict', () => {
  for (const file of listFixtures('ar-msa', 'human-')) {
    const original = readFixture(file);
    const text = injectHedge(original);
    const r = analyze(text, { markdown: true });
    assert.equal(r.label, 'HUMAN', `${path.basename(file)}: expected HUMAN after hedge injection, got ${r.label} (score ${r.score}, variety ${r.variety})`);
    assert.notEqual(
      r.stats.registerMix && r.stats.registerMix.promoted,
      true,
      `${path.basename(file)}: registerMix must not promote from a single hedge phrase (${JSON.stringify(r.stats.registerMix)})`,
    );
  }
});

test('a single stray dialect word in an otherwise human MSA text does not trigger promotion', () => {
  for (const file of listFixtures('ar-msa', 'human-')) {
    const original = readFixture(file);
    const text = `${original.replace(/\s*$/, '')}\n\nوكان الجو كده.\n`;
    const r = analyze(text, { markdown: true });
    assert.equal(r.label, 'HUMAN', `${path.basename(file)}: expected HUMAN with one stray dialect word, got ${r.label} (score ${r.score}, variety ${r.variety})`);
  }
});
