#!/usr/bin/env node
'use strict';

/**
 * run-benchmark.js — deterministic invariant checks over evals/benchmark.json.
 *
 * Node >= 18, no dependencies. Each case in evals/benchmark.json names an
 * input file and (for rewrite/edit cases) a candidate file, plus a set of
 * mechanical invariants: required/forbidden substrings, protected spans
 * that must survive verbatim, an edit-ratio window (so a candidate that
 * just echoes the source, or one that rewrites far more than expected,
 * both fail), a check that no number appears in the candidate that wasn't
 * already in the input, and a check that the detector score does not get
 * worse.
 *
 * This is NOT a grader for "does this read as human" — see evals/README.md.
 * It only catches the mechanical failure modes: invented numbers, echoed
 * source text, missing protected spans, and score regressions.
 *
 * Usage:
 *   node evals/run-benchmark.js [--case <id>] [--json] [--benchmark <path>]
 *
 * Exit code: 0 if every case (or the selected case) passes every
 * applicable check, 1 otherwise.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DETECT_JS = path.join(ROOT, 'skills', 'humanizer-pro', 'scripts', 'detect.js');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeEol(s) {
  return s.replace(/\r\n/g, '\n');
}

/** Two-row Levenshtein distance (character-level). */
function editDistance(a, b) {
  a = normalizeEol(a);
  b = normalizeEol(b);
  const al = a.length;
  const bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  let prev = new Array(bl + 1);
  let curr = new Array(bl + 1);
  for (let j = 0; j <= bl; j += 1) prev[j] = j;
  for (let i = 1; i <= al; i += 1) {
    curr[0] = i;
    const ca = a.charCodeAt(i - 1);
    for (let j = 1; j <= bl; j += 1) {
      const cost = ca === b.charCodeAt(j - 1) ? 0 : 1;
      const del = prev[j] + 1;
      const ins = curr[j - 1] + 1;
      const sub = prev[j - 1] + cost;
      curr[j] = Math.min(del, ins, sub);
    }
    const tmp = prev;
    prev = curr;
    curr = tmp;
  }
  return prev[bl];
}

/** Normalized character-level edit ratio in [0,1]: distance / max(len(a),len(b)). */
function editRatio(a, b) {
  a = normalizeEol(a);
  b = normalizeEol(b);
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 0;
  return editDistance(a, b) / maxLen;
}

/** Extract the set of numbers (Western 0-9 and Arabic-Indic ٠-٩ digit runs), normalized to Western digits. */
function numberSet(text) {
  const matches = normalizeEol(text).match(/[0-9٠-٩]+/g) || [];
  const toWestern = (s) => s.replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 0x0660));
  return new Set(matches.map(toWestern));
}

function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}

function runDetect(filePath, lang, variety) {
  const args = [DETECT_JS, filePath, '--json'];
  if (lang) args.push('--lang', lang);
  if (variety) args.push('--variety', variety);
  const r = spawnSync(process.execPath, args, { encoding: 'utf8', cwd: ROOT });
  if (!r.stdout) {
    return { error: `detect.js produced no stdout (status ${r.status}): ${r.stderr || ''}`.trim() };
  }
  try {
    return { json: JSON.parse(r.stdout) };
  } catch (e) {
    return { error: `detect.js output was not valid JSON: ${e.message}` };
  }
}

// ---------------------------------------------------------------------------
// Case runner
// ---------------------------------------------------------------------------

/**
 * Run a single benchmark case.
 * @param {object} c - a case object as found in evals/benchmark.json
 * @param {string} root - repo root, files in `c` are resolved relative to it
 * @returns {{id: string, pass: boolean, checks: Array<{name:string, pass:boolean, detail:string}>}}
 */
function runCase(c, root) {
  root = root || ROOT;
  const checks = [];
  const inputPath = path.resolve(root, c.inputFile);

  if (!fs.existsSync(inputPath)) {
    return { id: c.id, pass: false, checks: [{ name: 'input-exists', pass: false, detail: `missing: ${c.inputFile}` }] };
  }
  const inputText = readFile(inputPath);

  let candidateText = null;
  let candidatePath = null;
  if (c.candidateFile) {
    candidatePath = path.resolve(root, c.candidateFile);
    if (!fs.existsSync(candidatePath)) {
      return { id: c.id, pass: false, checks: [{ name: 'candidate-exists', pass: false, detail: `missing: ${c.candidateFile}` }] };
    }
    candidateText = readFile(candidatePath);
  }

  // required: strings that must appear in the candidate (detect-only cases have no candidate, skip)
  if (candidateText !== null) {
    for (const s of c.required || []) {
      const ok = candidateText.includes(s);
      checks.push({ name: `required:${s}`, pass: ok, detail: ok ? 'present' : 'MISSING from candidate' });
    }

    // forbidden: strings that must NOT appear in the candidate
    for (const s of c.forbidden || []) {
      const ok = !candidateText.includes(s);
      checks.push({ name: `forbidden:${s}`, pass: ok, detail: ok ? 'absent' : 'PRESENT in candidate' });
    }

    // protected: spans copied from the input that must survive verbatim in the candidate
    for (const s of c.protected || []) {
      const inInput = inputText.includes(s);
      const inCandidate = candidateText.includes(s);
      const ok = !inInput || inCandidate; // only enforce for spans actually present in the input
      checks.push({
        name: `protected:${s}`,
        pass: ok,
        detail: ok ? 'survived verbatim' : 'DROPPED or altered from input',
      });
    }

    // edit ratio window
    const ratio = editRatio(inputText, candidateText);
    if (typeof c.minEditRatio === 'number') {
      const ok = ratio >= c.minEditRatio;
      checks.push({
        name: 'minEditRatio',
        pass: ok,
        detail: `editRatio=${ratio.toFixed(4)} minEditRatio=${c.minEditRatio} — ${ok ? 'OK' : 'candidate is too close to an unedited echo of the source'}`,
      });
    }
    if (typeof c.maxEditRatio === 'number') {
      const ok = ratio <= c.maxEditRatio;
      checks.push({
        name: 'maxEditRatio',
        pass: ok,
        detail: `editRatio=${ratio.toFixed(4)} maxEditRatio=${c.maxEditRatio} — ${ok ? 'OK' : 'candidate diverges from the source far more than expected'}`,
      });
    }

    // forbidUnexpectedNumbers: every number in the candidate must already be in the input
    if (c.forbidUnexpectedNumbers) {
      const inputNums = numberSet(inputText);
      const candNums = numberSet(candidateText);
      const unexpected = [...candNums].filter((n) => !inputNums.has(n));
      const ok = unexpected.length === 0;
      checks.push({
        name: 'forbidUnexpectedNumbers',
        pass: ok,
        detail: ok ? 'no invented numbers' : `invented number(s) not present in input: ${unexpected.join(', ')}`,
      });
    }
  }

  // scoreMustNotWorsen: detector score on the candidate must not exceed the score on the input
  if (c.scoreMustNotWorsen && candidateText !== null) {
    const before = runDetect(inputPath, c.lang, c.variety);
    const after = runDetect(candidatePath, c.lang, c.variety);
    if (before.error || after.error) {
      checks.push({ name: 'scoreMustNotWorsen', pass: false, detail: `detect.js failed: ${before.error || after.error}` });
    } else {
      const b = before.json.score;
      const a = after.json.score;
      const ok = typeof a === 'number' && typeof b === 'number' && a <= b;
      checks.push({
        name: 'scoreMustNotWorsen',
        pass: ok,
        detail: `before=${b} after=${a} — ${ok ? 'OK (did not worsen)' : 'REGRESSION (candidate score is worse than input score)'}`,
      });
    }
  }

  const pass = checks.every((ch) => ch.pass);
  return { id: c.id, pass, checks };
}

function runAll(cases, root) {
  return cases.map((c) => runCase(c, root));
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function main(argv) {
  const args = argv.slice(2);
  let caseId = null;
  let asJson = false;
  let benchmarkPath = path.join(ROOT, 'evals', 'benchmark.json');

  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--case') {
      caseId = args[i + 1];
      i += 1;
    } else if (args[i] === '--json') {
      asJson = true;
    } else if (args[i] === '--benchmark') {
      benchmarkPath = path.resolve(args[i + 1]);
      i += 1;
    } else {
      console.error(`unknown flag: ${args[i]}`);
      console.error('usage: node evals/run-benchmark.js [--case <id>] [--json] [--benchmark <path>]');
      process.exit(1);
    }
  }

  let cases;
  try {
    cases = JSON.parse(fs.readFileSync(benchmarkPath, 'utf8'));
  } catch (e) {
    console.error(`cannot read/parse ${benchmarkPath}: ${e.message}`);
    process.exit(1);
    return;
  }

  if (caseId) {
    cases = cases.filter((c) => c.id === caseId);
    if (cases.length === 0) {
      console.error(`no such case: ${caseId}`);
      process.exit(1);
      return;
    }
  }

  const results = runAll(cases, ROOT);

  if (asJson) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    for (const r of results) {
      console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.id}`);
      for (const ch of r.checks) {
        if (!ch.pass) {
          console.log(`  FAIL ${ch.name}: ${ch.detail}`);
        }
      }
    }
    const passCount = results.filter((r) => r.pass).length;
    console.log('');
    console.log(`${passCount}/${results.length} cases passed`);
  }

  const allPass = results.every((r) => r.pass);
  process.exit(allPass ? 0 : 1);
}

if (require.main === module) {
  main(process.argv);
}

module.exports = { runCase, runAll, editDistance, editRatio, numberSet };
