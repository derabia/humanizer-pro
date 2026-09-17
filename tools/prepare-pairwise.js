#!/usr/bin/env node
'use strict';

/**
 * prepare-pairwise.js — blinded pairwise evaluation kit (IMP-07).
 *
 * Given a pairs spec (an array of {id, language, inputFile, candidateAFile,
 * candidateBFile}), produces:
 *
 *   - ballot.md — Arabic + English instructions, then for each pair, the
 *     two candidates labelled "1" and "2" in an order randomized from a
 *     seeded PRNG (no candidate identity, mode, or file path is revealed),
 *     followed by a rating grid.
 *   - key.json — the seed plus, per pair, which candidate (A or B) is
 *     label 1 and which is label 2, so ballot.md and key.json together are
 *     the only way to score a completed ballot.
 *
 * Deterministic: the same --seed and --pairs always produce byte-identical
 * output (no Date.now(), no absolute paths, no machine-specific state).
 *
 * Usage:
 *   node tools/prepare-pairwise.js --seed <n> --pairs <spec.json> --out evals/human/
 *
 * Node >= 18, no dependencies.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Deterministic PRNG (mulberry32) — no Math.random, no Date.
// ---------------------------------------------------------------------------

function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readText(relPath) {
  const p = path.resolve(ROOT, relPath);
  return fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n').trimEnd();
}

function normalizeForCompare(s) {
  return s.replace(/\r\n/g, '\n').trim();
}

/** Escape a string for safe embedding inside a Markdown table cell. */
function escapeCell(s) {
  return String(s).replace(/\r\n/g, '\n').replace(/\n/g, '<br>').replace(/\|/g, '\\|');
}

function fence(text) {
  // Use a fence unlikely to collide with content; widen if the text itself contains backticks.
  let fenceLen = 3;
  const m = text.match(/`{3,}/g);
  if (m) {
    for (const run of m) fenceLen = Math.max(fenceLen, run.length + 1);
  }
  const f = '`'.repeat(fenceLen);
  return `${f}\n${text}\n${f}`;
}

// ---------------------------------------------------------------------------
// Ballot building
// ---------------------------------------------------------------------------

const INTRO_AR = `# استمارة تقييم أعمى (Blinded pairwise) — humanizer-pro

هاي استمارة تقييم أعمى: كل فقرة بتعرض النص الأصلي ونسختين مرقّمتين 1 و 2،
من غير ما تعرف أي نسخة هي الأصل أو المعدَّلة (الترتيب بيتغيّر عشوائيًا لكل
فقرة). اقرأ الفقرتين وجاوب على الأسئلة اللي تحت كل فقرة بصدق، بناءً على
انطباعك الفعلي، مش على تخمين مين كتبها.

**الوقت المتوقع:** حوالي 3-5 دقايق لكل فقرة (حوالي 45-60 دقيقة للاستمارة
كاملة، 12 فقرة).

**كيف ترجع النتائج:** عدّل هذا الملف مباشرة (املأ الأعمدة الفاضية بعد كل
فقرة)، واحفظه. أنا (فريق البناء) رح آخذ نسختك المعدَّلة وأطابقها مع
\`key.json\` لمعرفة أي رقم كان النص الأصلي وأي رقم كان النص المُعدَّل.`;

const INTRO_EN = `## English instructions

This is a blinded pairwise ballot: each item shows the original text and two
labelled candidates, "1" and "2", with no indication of which one is the
unedited original and which is the rewrite (the order is randomized per
item from a fixed seed). Read both candidates and answer the questions
below each item honestly, based on your actual reading, not a guess at
which side is which.

**Time estimate:** roughly 3-5 minutes per item (about 45-60 minutes for
the full 12-item ballot).

**How to return results:** edit this file directly (fill in the blank
columns after each item) and save it. The build team will take your
completed copy and match it against \`key.json\` to learn which label was
the original and which was the rewrite.`;

function buildRatingTable() {
  return [
    '| السؤال / Question | إجابتك / Your answer |',
    '|---|---|',
    '| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |',
    '| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |',
    '| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |',
    '| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |',
    '| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |',
    '| ملاحظات حرة / Free comment | |',
  ].join('\n');
}

function buildBallot(pairs, assignments, seed) {
  const lines = [];
  lines.push(INTRO_AR);
  lines.push('');
  lines.push(INTRO_EN);
  lines.push('');
  lines.push('---');
  lines.push('');

  pairs.forEach((pair, idx) => {
    const assignment = assignments[idx];
    const n = idx + 1;
    lines.push(`## فقرة ${n} / Item ${n} — \`${pair.id}\``);
    lines.push('');

    if (assignment.referenceOmitted) {
      lines.push(
        '_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — ' +
          'عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / ' +
          'Note: no separate reference block is shown for this item because one candidate IS the ' +
          'unedited original — showing it separately would reveal which label is which. Judge both ' +
          'candidates on their own text._'
      );
      lines.push('');
    } else {
      lines.push('**النص الأصلي / Original:**');
      lines.push('');
      lines.push(fence(pair.inputText));
      lines.push('');
    }

    lines.push('**1:**');
    lines.push('');
    lines.push(fence(assignment.label1Text));
    lines.push('');
    lines.push('**2:**');
    lines.push('');
    lines.push(fence(assignment.label2Text));
    lines.push('');
    lines.push(buildRatingTable());
    lines.push('');
    lines.push('---');
    lines.push('');
  });

  lines.push(`_Seed used to order this ballot is recorded only in \`key.json\`, not here._`);
  lines.push('');
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { seed: null, pairs: null, out: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--seed') {
      args.seed = Number(argv[i + 1]);
      i += 1;
    } else if (argv[i] === '--pairs') {
      args.pairs = argv[i + 1];
      i += 1;
    } else if (argv[i] === '--out') {
      args.out = argv[i + 1];
      i += 1;
    } else {
      throw new Error(`unknown flag: ${argv[i]}`);
    }
  }
  if (args.seed === null || Number.isNaN(args.seed)) throw new Error('--seed <n> is required');
  if (!args.pairs) throw new Error('--pairs <spec.json> is required');
  if (!args.out) throw new Error('--out <dir> is required');
  return args;
}

/**
 * Build the ballot + key from a pairs spec, in-memory (no I/O), so it is
 * testable and byte-deterministic for a given seed + spec.
 */
function build(pairsSpec, seed) {
  const rng = mulberry32(seed);
  const pairs = pairsSpec.map((p) => ({
    id: p.id,
    language: p.language,
    inputText: readText(p.inputFile),
    aText: readText(p.candidateAFile),
    bText: readText(p.candidateBFile),
  }));

  const assignments = pairs.map((pair) => {
    const aIsLabel1 = rng() < 0.5;
    const label1 = aIsLabel1 ? 'A' : 'B';
    const label2 = aIsLabel1 ? 'B' : 'A';
    const label1Text = aIsLabel1 ? pair.aText : pair.bText;
    const label2Text = aIsLabel1 ? pair.bText : pair.aText;
    const referenceOmitted =
      normalizeForCompare(pair.inputText) === normalizeForCompare(pair.aText) ||
      normalizeForCompare(pair.inputText) === normalizeForCompare(pair.bText);
    return { label1, label2, label1Text, label2Text, referenceOmitted };
  });

  const ballotMd = buildBallot(pairs, assignments, seed);
  const key = {
    seed,
    pairs: pairs.map((pair, idx) => ({
      id: pair.id,
      label1: assignments[idx].label1,
      label2: assignments[idx].label2,
    })),
  };
  return { ballotMd, key, referenceOmittedCount: assignments.filter((a) => a.referenceOmitted).length };
}

function main(argv) {
  let args;
  try {
    args = parseArgs(argv.slice(2));
  } catch (e) {
    console.error(e.message);
    console.error('usage: node tools/prepare-pairwise.js --seed <n> --pairs <spec.json> --out evals/human/');
    process.exit(1);
    return;
  }

  const specPath = path.resolve(ROOT, args.pairs);
  const outDir = path.resolve(ROOT, args.out);
  let pairsSpec;
  try {
    pairsSpec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  } catch (e) {
    console.error(`cannot read/parse ${args.pairs}: ${e.message}`);
    process.exit(1);
    return;
  }

  const { ballotMd, key, referenceOmittedCount } = build(pairsSpec, args.seed);

  fs.mkdirSync(outDir, { recursive: true });
  const ballotPath = path.join(outDir, 'ballot.md');
  const keyPath = path.join(outDir, 'key.json');
  fs.writeFileSync(ballotPath, ballotMd, 'utf8');
  fs.writeFileSync(keyPath, JSON.stringify(key, null, 2) + '\n', 'utf8');

  console.log(`seed: ${args.seed}`);
  console.log(`spec: ${args.pairs} (${pairsSpec.length} pairs)`);
  console.log(`wrote: ${path.relative(ROOT, ballotPath).split(path.sep).join('/')}`);
  console.log(`wrote: ${path.relative(ROOT, keyPath).split(path.sep).join('/')}`);
  console.log(`reference block omitted (candidate == input) for ${referenceOmittedCount}/${pairsSpec.length} pairs`);
}

if (require.main === module) {
  main(process.argv);
}

module.exports = { mulberry32, build };
