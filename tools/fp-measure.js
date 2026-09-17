#!/usr/bin/env node
/**
 * humanizer-pro — Arabic false-positive measurement over the human control
 * corpus (IMP-01)
 *
 * origin: humanizer-pro. Node >= 18, CommonJS, zero npm dependencies.
 *
 * Runs the Arabic engine, through `detect.js`'s `analyze()` with auto-routing
 * and `--markdown` off, over every document listed in `corpus/manifest.json`
 * that is present under `corpus/raw/`, verifies each file's sha256 against
 * the manifest, and reports the false-positive rate per register with a
 * Wilson 95 percent interval.
 *
 * Every document in the corpus was written before 2022-11-30, so every
 * `AI` verdict is by construction a false positive and every `MIXED` verdict
 * is a partial one.
 *
 * Usage
 * -----
 *   node tools/fp-measure.js                 # table to stdout, writes RESULTS.md
 *   node tools/fp-measure.js --json          # machine-readable, no RESULTS.md
 *   node tools/fp-measure.js --no-write      # table only
 *   node tools/fp-measure.js --label baseline
 *   node tools/fp-measure.js --top 10        # how many top-scoring docs to list
 *
 * Exit codes: 0 on a completed run, 2 on a missing or unusable corpus.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const { analyze } = require(path.join(ROOT, 'skills/humanizer-pro/scripts/detect.js'));
const { THRESHOLDS } = require(path.join(ROOT, 'skills/humanizer-pro/scripts/lib/ar-detector/index.js'));

// ─────────────────────────────────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const opts = { json: false, write: true, corpus: path.join(ROOT, 'corpus'), label: '', top: 10 };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--json') { opts.json = true; opts.write = false; }
    else if (a === '--no-write') opts.write = false;
    else if (a === '--corpus') opts.corpus = path.resolve(argv[++i]);
    else if (a === '--label') opts.label = String(argv[++i]);
    else if (a === '--top') opts.top = Number(argv[++i]);
    else {
      process.stderr.write(`fp-measure: unknown flag ${a}\n`);
      process.exit(2);
    }
  }
  return opts;
}

// ─────────────────────────────────────────────────────────────────────────
// Statistics
// ─────────────────────────────────────────────────────────────────────────

/**
 * Wilson score interval for a binomial proportion at 95 percent.
 *
 * Chosen over the normal approximation because the expected flag counts are
 * small (single digits out of a few hundred), where the normal interval
 * either goes negative or collapses to zero width at k = 0.
 */
function wilson(k, n, z = 1.959963984540054) {
  if (n === 0) return { p: 0, low: 0, high: 0 };
  const p = k / n;
  const d = 1 + (z * z) / n;
  const centre = p + (z * z) / (2 * n);
  const spread = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n));
  return { p, low: Math.max(0, (centre - spread) / d), high: Math.min(1, (centre + spread) / d) };
}

function pct(x) {
  return `${(x * 100).toFixed(2)}%`;
}

function mean(xs) {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
}

function median(xs) {
  if (!xs.length) return 0;
  const s = xs.slice().sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

// ─────────────────────────────────────────────────────────────────────────
// Engine version
// ─────────────────────────────────────────────────────────────────────────

function git(args) {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch (err) {
    return '';
  }
}

/**
 * Engine version string for the results header.
 *
 * The `+dirty:<paths>` suffix matters: the engine's scoring code and its
 * lexicons can be edited between runs, and a short SHA alone would make two
 * different measurements look like the same build.
 */
function engineVersion() {
  const sha = git(['rev-parse', '--short', 'HEAD']) || 'unknown';
  const status = git(['status', '--porcelain', '--', 'skills/humanizer-pro/scripts']);
  // Porcelain lines are two status characters then whitespace then the
  // path, and a renamed entry is "old -> new"; keep the path only.
  const dirty = status
    ? status.split('\n').map((l) => l.replace(/^..\s+/, '').trim()).filter(Boolean)
    : [];
  return {
    sha,
    dirty,
    label: dirty.length ? `${sha}+dirty(${dirty.length} file(s) under skills/humanizer-pro/scripts)` : sha,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Measurement
// ─────────────────────────────────────────────────────────────────────────

function loadManifest(corpusDir) {
  const file = path.join(corpusDir, 'manifest.json');
  if (!fs.existsSync(file)) {
    process.stderr.write(`fp-measure: no manifest at ${file}. Run tools/fetch-corpus.js first.\n`);
    process.exit(2);
  }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function measure(manifest, corpusDir) {
  const rawDir = path.join(corpusDir, 'raw');
  const rows = [];
  const missing = [];
  const shaMismatch = [];

  for (const doc of manifest.docs) {
    const file = path.join(rawDir, doc.file);
    if (!fs.existsSync(file)) {
      missing.push(doc.file);
      continue;
    }
    const text = fs.readFileSync(file, 'utf8');
    const sha = crypto.createHash('sha256').update(text, 'utf8').digest('hex');
    if (sha !== doc.sha256) {
      // Excluded, never fatal: a locally edited or re-fetched file would
      // silently change the measured population.
      shaMismatch.push({ file: doc.file, expected: doc.sha256, actual: sha });
      continue;
    }
    // Auto-routing: no lang, no variety, markdown off.
    const r = analyze(text);
    const counts = {};
    for (const issue of r.issues || []) {
      const id = issue.patternId || issue.type || '?';
      counts[id] = (counts[id] || 0) + 1;
    }
    const topIssues = Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
      .slice(0, 5)
      .map(([id, n]) => `${id}x${n}`);
    rows.push({
      file: doc.file,
      title: doc.title,
      url: doc.url,
      register: doc.register,
      source: doc.source,
      words: doc.words,
      score: r.score,
      label: r.label,
      variety: r.variety,
      lang: r.lang,
      registerMixPromoted: (r.stats && r.stats.registerMix && r.stats.registerMix.promoted) || false,
      issueCount: (r.issues || []).length,
      topIssues,
    });
  }
  return { rows, missing, shaMismatch };
}

function summarize(rows) {
  const flagged = rows.filter((r) => r.score >= THRESHOLDS.AI);
  const mixed = rows.filter((r) => r.score >= THRESHOLDS.MIXED && r.score < THRESHOLDS.AI);
  const w = wilson(flagged.length, rows.length);
  const wm = wilson(flagged.length + mixed.length, rows.length);
  return {
    n: rows.length,
    flagged: flagged.length,
    mixed: mixed.length,
    human: rows.length - flagged.length - mixed.length,
    meanScore: Number(mean(rows.map((r) => r.score)).toFixed(2)),
    medianScore: median(rows.map((r) => r.score)),
    maxScore: rows.reduce((a, r) => Math.max(a, r.score), 0),
    flaggedRate: w.p,
    wilsonLow: w.low,
    wilsonHigh: w.high,
    notHumanRate: wm.p,
    notHumanWilsonLow: wm.low,
    notHumanWilsonHigh: wm.high,
  };
}

/** Aggregate issue-id frequency over the documents that scored >= MIXED. */
function issueFrequency(rows, minScore) {
  const docsWith = {};
  const hits = {};
  let n = 0;
  for (const r of rows) {
    if (r.score < minScore) continue;
    n += 1;
    const seen = new Set();
    for (const t of r.topIssues) {
      const [id, count] = t.split('x');
      hits[id] = (hits[id] || 0) + Number(count);
      if (!seen.has(id)) {
        docsWith[id] = (docsWith[id] || 0) + 1;
        seen.add(id);
      }
    }
  }
  return {
    n,
    rows: Object.keys(hits)
      .map((id) => ({ id, docs: docsWith[id], hits: hits[id] }))
      .sort((a, b) => b.docs - a.docs || b.hits - a.hits),
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Reporting
// ─────────────────────────────────────────────────────────────────────────

function buildReport(manifest, result, opts, version) {
  const { rows } = result;
  const registers = [...new Set(rows.map((r) => r.register))].sort();

  const perRegister = registers.map((reg) => ({
    register: reg,
    ...summarize(rows.filter((r) => r.register === reg)),
  }));
  const perSource = [...new Set(rows.map((r) => `${r.register}/${r.source}`))].sort().map((key) => {
    const [register, source] = key.split('/');
    return { register, source, ...summarize(rows.filter((r) => `${r.register}/${r.source}` === key)) };
  });
  const overall = summarize(rows);

  const top = rows
    .slice()
    .sort((a, b) => b.score - a.score || (a.file < b.file ? -1 : 1))
    .slice(0, Math.max(0, opts.top));

  return {
    label: opts.label || null,
    date: new Date().toISOString().slice(0, 10),
    engine: version.label,
    engineSha: version.sha,
    engineDirty: version.dirty,
    cutoff: manifest.cutoff,
    corpusGenerated: manifest.generated,
    minWords: manifest.minWords,
    maxWords: manifest.maxWords,
    thresholds: { mixed: THRESHOLDS.MIXED, ai: THRESHOLDS.AI },
    measured: rows.length,
    manifestDocs: manifest.docs.length,
    missing: result.missing,
    shaMismatch: result.shaMismatch,
    overall,
    perRegister,
    perSource,
    issueFrequencyMixedUp: issueFrequency(rows, THRESHOLDS.MIXED),
    top,
  };
}

function textTable(report) {
  const L = [];
  L.push('Arabic false-positive measurement (IMP-01)');
  L.push('');
  L.push(`date            : ${report.date}`);
  if (report.label) L.push(`label           : ${report.label}`);
  L.push(`engine version  : ${report.engine}`);
  if (report.engineDirty.length) {
    for (const f of report.engineDirty) L.push(`  dirty         : ${f}`);
  }
  L.push(`corpus cutoff   : ${report.cutoff}`);
  L.push(`corpus fetched  : ${report.corpusGenerated}`);
  L.push(`doc length      : >= ${report.minWords} and <= ${report.maxWords} Arabic words`);
  L.push(`thresholds      : MIXED >= ${report.thresholds.mixed}, AI >= ${report.thresholds.ai}`);
  L.push(`documents       : ${report.measured} measured of ${report.manifestDocs} in manifest`);
  if (report.missing.length) L.push(`missing files   : ${report.missing.length}`);
  if (report.shaMismatch.length) L.push(`sha mismatches  : ${report.shaMismatch.length} (excluded)`);
  L.push('');
  L.push('Per register');
  L.push('');
  const head = ['register', 'n', 'flagged', 'mixed', 'human', 'mean', 'median', 'max', 'FP rate', 'Wilson 95%'];
  const body = [];
  for (const r of report.perRegister.concat([{ register: 'ALL', ...report.overall }])) {
    body.push([
      r.register,
      String(r.n),
      String(r.flagged),
      String(r.mixed),
      String(r.human),
      r.meanScore.toFixed(2),
      String(r.medianScore),
      String(r.maxScore),
      pct(r.flaggedRate),
      `${pct(r.wilsonLow)} .. ${pct(r.wilsonHigh)}`,
    ]);
  }
  const widths = head.map((h, i) => Math.max(h.length, ...body.map((row) => row[i].length)));
  const fmt = (row) => row.map((c, i) => c.padEnd(widths[i])).join('  ');
  L.push(fmt(head));
  L.push(widths.map((w) => '-'.repeat(w)).join('  '));
  for (const row of body) L.push(fmt(row));
  L.push('');
  L.push('Per register and provenance class');
  L.push('');
  for (const r of report.perSource) {
    L.push(
      `  ${r.register}/${r.source}: n=${r.n} flagged=${r.flagged} mixed=${r.mixed} ` +
        `mean=${r.meanScore.toFixed(2)} FP=${pct(r.flaggedRate)} [${pct(r.wilsonLow)} .. ${pct(r.wilsonHigh)}]`,
    );
  }
  L.push('');
  L.push(`Not-HUMAN rate (flagged + mixed): ${pct(report.overall.notHumanRate)} ` +
    `[${pct(report.overall.notHumanWilsonLow)} .. ${pct(report.overall.notHumanWilsonHigh)}]`);
  L.push('');
  L.push(`Top ${report.top.length} scoring documents`);
  L.push('');
  for (const r of report.top) {
    L.push(`  ${String(r.score).padStart(3)} ${r.label.padEnd(6)} ${r.register}/${r.source} ${r.variety} ` +
      `${r.words}w  ${r.topIssues.join(' ')}`);
    L.push(`      ${r.title}`);
    L.push(`      ${r.url}`);
  }
  L.push('');
  L.push(`Issue ids over the ${report.issueFrequencyMixedUp.n} documents scoring >= ${report.thresholds.mixed}`);
  L.push('');
  for (const r of report.issueFrequencyMixedUp.rows) {
    L.push(`  ${r.id.padEnd(16)} docs=${String(r.docs).padStart(4)} hits=${r.hits}`);
  }
  return L.join('\n') + '\n';
}

function markdownResults(report, manifest) {
  const L = [];
  L.push('# Arabic false-positive measurement (IMP-01)');
  L.push('');
  L.push('Generated by `node tools/fp-measure.js`. Every number in this file comes');
  L.push('from a saved run of that command; nothing here is estimated by hand. The');
  L.push('raw console output of each run is kept under `docs/evidence/`.');
  L.push('');
  L.push('## Run');
  L.push('');
  L.push('| field | value |');
  L.push('|---|---|');
  L.push(`| date | ${report.date} |`);
  if (report.label) L.push(`| label | ${report.label} |`);
  L.push(`| engine version | \`${report.engine}\` |`);
  L.push(`| pre-model cutoff | ${report.cutoff} |`);
  L.push(`| corpus fetched | ${report.corpusGenerated} |`);
  L.push(`| documents measured | ${report.measured} of ${report.manifestDocs} in the manifest |`);
  L.push(`| document length | >= ${report.minWords} and <= ${report.maxWords} Arabic words |`);
  L.push(`| thresholds | MIXED >= ${report.thresholds.mixed}, AI >= ${report.thresholds.ai} |`);
  L.push(`| routing | auto (no \`--lang\`, no \`--variety\`), \`--markdown\` off |`);
  L.push(`| sha256 mismatches excluded | ${report.shaMismatch.length} |`);
  L.push(`| manifest files missing on disk | ${report.missing.length} |`);
  L.push('');
  L.push('Because every document predates the cutoff, an `AI` verdict is a false');
  L.push('positive by construction and a `MIXED` verdict is a partial one.');
  L.push('');
  L.push('## Per register');
  L.push('');
  L.push('| register | n | flagged (>= AI) | mixed | human | mean score | median | max | FP rate | Wilson 95% |');
  L.push('|---|---|---|---|---|---|---|---|---|---|');
  for (const r of report.perRegister.concat([{ register: '**all**', ...report.overall }])) {
    L.push(
      `| ${r.register} | ${r.n} | ${r.flagged} | ${r.mixed} | ${r.human} | ${r.meanScore.toFixed(2)} | ` +
        `${r.medianScore} | ${r.maxScore} | ${pct(r.flaggedRate)} | ${pct(r.wilsonLow)} to ${pct(r.wilsonHigh)} |`,
    );
  }
  L.push('');
  L.push('## Per register and provenance class');
  L.push('');
  L.push('Featured and good articles are human-curated; `random` is an unfiltered');
  L.push('sample of the same wiki and carries whatever machine-translated or');
  L.push('bot-generated register that wiki contains. A higher rate in `random` than');
  L.push('in `featured` is evidence about the sample, not about the lexicon.');
  L.push('');
  L.push('| register | class | n | flagged | mixed | mean score | FP rate | Wilson 95% |');
  L.push('|---|---|---|---|---|---|---|---|');
  for (const r of report.perSource) {
    L.push(
      `| ${r.register} | ${r.source} | ${r.n} | ${r.flagged} | ${r.mixed} | ${r.meanScore.toFixed(2)} | ` +
        `${pct(r.flaggedRate)} | ${pct(r.wilsonLow)} to ${pct(r.wilsonHigh)} |`,
    );
  }
  L.push('');
  L.push(`Not-HUMAN rate over all registers (flagged plus mixed): ${pct(report.overall.notHumanRate)} ` +
    `(Wilson 95% ${pct(report.overall.notHumanWilsonLow)} to ${pct(report.overall.notHumanWilsonHigh)}).`);
  L.push('');
  L.push(`## Top ${report.top.length} scoring documents`);
  L.push('');
  L.push('| score | label | register/class | variety | words | top issue ids | document |');
  L.push('|---|---|---|---|---|---|---|');
  for (const r of report.top) {
    L.push(
      `| ${r.score} | ${r.label} | ${r.register}/${r.source} | ${r.variety} | ${r.words} | ` +
        `${r.topIssues.join(', ') || 'none'} | [${r.title.replace(/\|/g, '\\|')}](${r.url}) |`,
    );
  }
  L.push('');
  L.push(`## Issue ids across the ${report.issueFrequencyMixedUp.n} documents scoring >= ${report.thresholds.mixed}`);
  L.push('');
  L.push('`docs` counts documents in which the id fired at least once; `hits` sums');
  L.push('occurrences. Only each document\'s five most frequent ids are counted, so');
  L.push('`hits` is a floor, not a total.');
  L.push('');
  L.push('| pattern id / issue type | docs | hits |');
  L.push('|---|---|---|');
  for (const r of report.issueFrequencyMixedUp.rows) {
    L.push(`| ${r.id} | ${r.docs} | ${r.hits} |`);
  }
  L.push('');
  L.push('## Corpus');
  L.push('');
  L.push('See `corpus/README.md` for how to re-fetch and for licence attribution.');
  L.push('Counts recorded in `corpus/manifest.json` at fetch time:');
  L.push('');
  L.push('| register | n | provenance classes |');
  L.push('|---|---|---|');
  for (const [reg, info] of Object.entries(manifest.counts || {})) {
    L.push(`| ${reg} | ${info.n} | ${Object.entries(info.sources).map(([k, v]) => `${k}: ${v}`).join(', ')} |`);
  }
  L.push('');
  L.push('## Change log');
  L.push('');
  L.push('Each row is one measured delta. Re-running `tools/fp-measure.js` rewrites');
  L.push('everything above this section, so entries here are maintained by hand and');
  L.push('every number in them is copied from the evidence file named in the row.');
  L.push('');
  L.push('<!-- CHANGE-LOG-START -->');
  L.push('');
  L.push('| # | change | FP rate (all) | Wilson 95% | mean score | evidence |');
  L.push('|---|---|---|---|---|---|');
  L.push('');
  L.push('<!-- CHANGE-LOG-END -->');
  return L.join('\n') + '\n';
}

/**
 * Rewrite RESULTS.md, preserving anything between the change-log markers so
 * a re-run never destroys the hand-maintained delta history.
 */
function writeResults(file, report, manifest) {
  const fresh = markdownResults(report, manifest);
  if (fs.existsSync(file)) {
    const old = fs.readFileSync(file, 'utf8');
    const m = /<!-- CHANGE-LOG-START -->([\s\S]*?)<!-- CHANGE-LOG-END -->/.exec(old);
    if (m) {
      return fs.writeFileSync(
        file,
        fresh.replace(
          /<!-- CHANGE-LOG-START -->[\s\S]*?<!-- CHANGE-LOG-END -->/,
          `<!-- CHANGE-LOG-START -->${m[1]}<!-- CHANGE-LOG-END -->`,
        ),
        'utf8',
      );
    }
  }
  return fs.writeFileSync(file, fresh, 'utf8');
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const manifest = loadManifest(opts.corpus);
  const result = measure(manifest, opts.corpus);
  if (result.rows.length === 0) {
    process.stderr.write(
      'fp-measure: no corpus documents readable. corpus/raw/ is gitignored; ' +
        'run `node tools/fetch-corpus.js` to repopulate it.\n',
    );
    process.exit(2);
  }
  const report = buildReport(manifest, result, opts, engineVersion());
  if (opts.json) {
    process.stdout.write(JSON.stringify({ ...report, docs: result.rows }, null, 2) + '\n');
    return;
  }
  process.stdout.write(textTable(report));
  if (opts.write) {
    const file = path.join(opts.corpus, 'RESULTS.md');
    writeResults(file, report, manifest);
    process.stdout.write(`\nwrote ${path.relative(ROOT, file)}\n`);
  }
}

if (require.main === module) main();

module.exports = { wilson, summarize, measure };
