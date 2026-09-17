/**
 * humanizer-pro — coverage-map parity test (IMP-11)
 * origin: humanizer-pro
 *
 * Verifies docs/COVERAGE-MAP.md stays in sync with the two things it maps
 * between: the pattern-ID headings inside skills/humanizer-pro/references/
 * and the compiled patterns in scripts/lib/ar-detector/lexicons.js. Every
 * heading is read dynamically from the reference files at test time (not
 * hardcoded), so a concurrently-edited file (e.g. another pass appending
 * AR-MSA-029+ to ar-msa.md) is picked up automatically rather than going
 * stale here.
 *
 * Failures:
 *   - a `## AR-`/`### AR-`/`## EN-` heading in references/ has no row in
 *     docs/COVERAGE-MAP.md
 *   - a pattern ID compiled in lexicons.js (RAW_PATTERNS) is missing from
 *     docs/COVERAGE-MAP.md
 *   - a pattern ID compiled in lexicons.js has no matching reference heading
 *   - any regex source in lexicons.js fails to compile
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REF_DIR = path.join(ROOT, 'skills', 'humanizer-pro', 'references');
const MAP_PATH = path.join(ROOT, 'docs', 'COVERAGE-MAP.md');
const lexicons = require('../skills/humanizer-pro/scripts/lib/ar-detector/lexicons.js');

function readHeadings(file, re) {
  const p = path.join(REF_DIR, file);
  const text = fs.readFileSync(p, 'utf8');
  const out = [];
  for (const line of text.split('\n')) {
    const m = line.match(re);
    if (m) out.push(m[1]);
  }
  return out;
}

// Dynamic: re-read every time the test runs, so headings added by another
// concurrent pass (e.g. AR-MSA-029+) are picked up without editing this file.
function collectAllHeadings() {
  const sources = [
    ['en-patterns.md', /^##\s+(EN-\d+)\s/],
    ['ar-shared.md', /^##\s+(AR-SH-\d+)\s/],
    ['ar-msa.md', /^##\s+(AR-MSA-\d+)\s/],
    ['ar-egyptian.md', /^###\s+(AR-EGT-\d+)\s/],
    ['ar-levantine.md', /^###\s+(AR-SHM-\d+)\s/],
  ];
  let all = [];
  for (const [file, re] of sources) {
    all = all.concat(readHeadings(file, re));
  }
  return all;
}

function readMapIds() {
  const text = fs.readFileSync(MAP_PATH, 'utf8');
  const ids = new Set();
  for (const line of text.split('\n')) {
    const m = line.match(/^\|\s*([A-Z0-9-]+)\s*\|/);
    if (m) ids.add(m[1]);
  }
  return ids;
}

test('docs/COVERAGE-MAP.md exists', () => {
  assert.ok(fs.existsSync(MAP_PATH), 'docs/COVERAGE-MAP.md is missing');
});

test('every reference heading (EN-*, AR-SH-*, AR-MSA-*, AR-EGT-*, AR-SHM-*) has a coverage-map row', () => {
  const headings = collectAllHeadings();
  assert.ok(headings.length > 0, 'expected to find at least one pattern heading in references/');
  const mapIds = readMapIds();
  const missing = headings.filter((id) => !mapIds.has(id));
  assert.deepEqual(missing, [], `headings missing from docs/COVERAGE-MAP.md: ${missing.join(', ')}`);
});

test('every lexicon pattern ID compiled in lexicons.js appears in the coverage map', () => {
  const mapIds = readMapIds();
  const missing = [];
  for (const bucket of Object.values(lexicons.RAW_PATTERNS)) {
    for (const pat of bucket) {
      const baseId = pat.id.replace(/-[A-Z]$/, '');
      if (!mapIds.has(baseId)) missing.push(pat.id);
    }
  }
  assert.deepEqual(missing, [], `lexicon pattern IDs missing from docs/COVERAGE-MAP.md: ${missing.join(', ')}`);
});

test('every lexicon pattern ID compiled in lexicons.js has a matching reference heading', () => {
  const headingSet = new Set(collectAllHeadings());
  const missing = [];
  for (const bucket of Object.values(lexicons.RAW_PATTERNS)) {
    for (const pat of bucket) {
      const baseId = pat.id.replace(/-[A-Z]$/, '');
      if (!headingSet.has(baseId)) missing.push(pat.id);
    }
  }
  assert.deepEqual(missing, [], `lexicon pattern IDs missing a reference heading: ${missing.join(', ')}`);
});

test('every regex source in lexicons.js compiles', () => {
  const failures = [];
  for (const [group, bucket] of Object.entries(lexicons.RAW_PATTERNS)) {
    for (const pat of bucket) {
      if (!pat.regexes) continue;
      for (const spec of pat.regexes) {
        try {
          // eslint-disable-next-line no-new
          new RegExp(spec.source, spec.flags || 'gu');
        } catch (err) {
          failures.push(`${group}/${pat.id}: ${err.message}`);
        }
      }
    }
  }
  assert.deepEqual(failures, [], `regexes failed to compile: ${failures.join('; ')}`);
});

test('MSA_FUNCTION_WORDS and DIALECT_FUNCTION_WORDS phrase regexes compile', () => {
  // These are exported compiled already (MSA_LEAKAGE_REGEX, DIALECT_LEAKAGE_REGEX);
  // just confirm they are RegExp instances that do not throw on .test().
  assert.ok(lexicons.MSA_LEAKAGE_REGEX instanceof RegExp);
  assert.doesNotThrow(() => lexicons.MSA_LEAKAGE_REGEX.test('نص عربي تجريبي'));
  for (const key of Object.keys(lexicons.DIALECT_LEAKAGE_REGEX)) {
    const re = lexicons.DIALECT_LEAKAGE_REGEX[key];
    assert.ok(re instanceof RegExp, `DIALECT_LEAKAGE_REGEX.${key} should be a RegExp`);
    assert.doesNotThrow(() => re.test('نص عربي تجريبي'));
  }
});
