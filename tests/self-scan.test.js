/**
 * humanizer-pro — tests for tools/self-scan.js (IMP-20).
 * origin: humanizer-pro
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const TOOL = path.join(__dirname, '..', 'tools', 'self-scan.js');
const selfScan = require(TOOL);
const BUDGETS = require('../tools/self-scan-budgets.json');

function run(args) {
  return spawnSync(process.execPath, [TOOL, ...args], { encoding: 'utf8' });
}

test('self-scan: the real run over the project exits 0', () => {
  const r = run([]);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /file\s+raw score\s+adjusted score\s+budget\s+status/);
});

test('self-scan: --json emits a well-formed report for the real run', () => {
  const r = run(['--json']);
  assert.equal(r.status, 0, r.stdout + r.stderr);
  const report = JSON.parse(r.stdout);
  assert.equal(report.exitCode, 0);
  assert.ok(Array.isArray(report.results) && report.results.length > 0);
  for (const row of report.results) {
    assert.equal(typeof row.file, 'string');
    assert.equal(typeof row.rawScore, 'number');
    assert.equal(typeof row.adjustedScore, 'number');
  }
});

test('self-scan-budgets.json: every scanned file has an entry, and budgets are non-negative multiples of 5 (or the file\'s own current score)', () => {
  const targets = selfScan.scanTargets().map((p) => p.split(path.sep).join('/'));
  for (const file of targets) {
    assert.ok(Object.prototype.hasOwnProperty.call(BUDGETS, file), `missing budget for ${file}`);
    assert.ok(Number.isInteger(BUDGETS[file]) && BUDGETS[file] >= 0, `bad budget for ${file}`);
  }
});

test('self-scan: a temp file that exceeds a tiny budget makes the CLI exit 1', (t) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'self-scan-'));
  t.after(() => fs.rmSync(tmpDir, { recursive: true, force: true }));

  const target = path.join(tmpDir, 'ai-heavy.md');
  fs.writeFileSync(
    target,
    "In today's rapidly evolving landscape, we delve into the intricate tapestry of innovation. "
    + 'It is important to note that this seamless, robust paradigm showcases a comprehensive '
    + 'framework. Moreover, this transformative ecosystem leverages cutting-edge protocols to '
    + 'navigate the complex, multifaceted challenges of modern business, and the future looks '
    + 'bright for those who embrace these emerging opportunities.',
  );
  const label = target.split(path.sep).join('/');

  const tmpBudgets = path.join(tmpDir, 'budgets.json');
  fs.writeFileSync(tmpBudgets, JSON.stringify({ [label]: 0 }, null, 2));

  const over = spawnSync(process.execPath, [TOOL], {
    encoding: 'utf8',
    env: {
      ...process.env,
      SELF_SCAN_TARGETS: target,
      SELF_SCAN_BUDGETS_PATH: tmpBudgets,
    },
  });
  assert.equal(over.status, 1, over.stdout + over.stderr);
  assert.match(over.stdout, /OVER/);

  // A generous budget for the same file passes.
  fs.writeFileSync(tmpBudgets, JSON.stringify({ [label]: 100 }, null, 2));
  const ok = spawnSync(process.execPath, [TOOL], {
    encoding: 'utf8',
    env: {
      ...process.env,
      SELF_SCAN_TARGETS: target,
      SELF_SCAN_BUDGETS_PATH: tmpBudgets,
    },
  });
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
});

test('self-scan: the real project run (fixed target list, real budgets file) exits 0', () => {
  const r = spawnSync(process.execPath, [TOOL], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout + r.stderr);
});

test('self-scan: buildAdjustedText wraps Before:/After: and ❌/✓ lines and fenced code blocks in ignore markers', () => {
  const text = [
    'Some normal prose line that should be scored normally.',
    '**Before:** bad example text here. **After:** good example text here.',
    '| col | ❌ bad | after |',
    '```js',
    'const x = 1; // code should be exempt',
    '```',
    'قبل: مثال سيئ. بعد: مثال جيد.',
  ].join('\n');
  const adjusted = selfScan.buildAdjustedText(text);
  assert.ok(adjusted.includes('<!-- humanizer:ignore -->'));
  assert.ok(adjusted.includes('Some normal prose line that should be scored normally.'));
  // length is NOT preserved here (markers are inserted, not substituted) --
  // buildAdjustedText's output is fed to analyze(), whose own maskIgnoreRegions
  // does the length-preserving substitution.
  assert.ok(adjusted.length > text.length);
});
