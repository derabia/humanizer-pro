/**
 * humanizer-pro — tests for tools/install.js
 * origin: humanizer-pro
 *
 * Exercises the vendor-neutral installer as a real CLI (spawnSync), the
 * same way a user would invoke it, rather than importing its internals.
 * Covers: --dry-run lists the real file count; a real install into a temp
 * directory is a byte-identical copy of skills/humanizer-pro/ (recursive
 * listing plus sha256 of every file); installing twice without --force
 * exits 1; with --force it succeeds; a missing --dir exits 2.
 */

'use strict';

const assert = require('node:assert/strict');
const { test, after } = require('node:test');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = path.resolve(__dirname, '..');
const INSTALL_JS = path.join(ROOT, 'tools', 'install.js');
const SKILL_SRC = path.join(ROOT, 'skills', 'humanizer-pro');

const tmpDirs = [];

function makeTmpDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hp-install-test-'));
  tmpDirs.push(dir);
  return dir;
}

after(() => {
  for (const dir of tmpDirs) {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 3 });
  }
});

function run(args) {
  const result = spawnSync(process.execPath, [INSTALL_JS, ...args], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  return result;
}

/** Recursively list files under `dir`, as forward-slash relative paths. */
function listFiles(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFiles(full).map((rel) => entry.name + '/' + rel));
    } else if (entry.isFile()) {
      out.push(entry.name);
    }
  }
  return out.sort();
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

const realSourceFiles = listFiles(SKILL_SRC);

test('--dir missing (neither --dir nor --host) exits 2', () => {
  const result = run([]);
  assert.equal(result.status, 2);
});

test('--dir with no value exits 2', () => {
  const result = run(['--dir']);
  assert.equal(result.status, 2);
});

test('--dry-run lists the real file count without writing anything', () => {
  const dest = makeTmpDir();
  const target = path.join(dest, 'target');
  const result = run(['--dir', target, '--dry-run']);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /files: (\d+)/);
  const m = /files: (\d+)/.exec(result.stdout);
  assert.equal(Number(m[1]), realSourceFiles.length, 'dry-run file count must match the real skill folder');
  assert.equal(fs.existsSync(target), false, '--dry-run must not create the target directory');
});

test('installing into a temp directory produces a byte-identical copy of skills/humanizer-pro', () => {
  const parent = makeTmpDir();
  const result = run(['--dir', parent]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /verify: ok/);

  const installedDir = path.join(parent, 'humanizer-pro');
  assert.equal(fs.existsSync(installedDir), true);

  const sourceList = listFiles(SKILL_SRC);
  const destList = listFiles(installedDir);
  assert.deepEqual(destList, sourceList, 'recursive file listing must match exactly');

  for (const rel of sourceList) {
    const srcFile = path.join(SKILL_SRC, ...rel.split('/'));
    const destFile = path.join(installedDir, ...rel.split('/'));
    assert.equal(
      sha256(destFile),
      sha256(srcFile),
      'sha256 must match for ' + rel
    );
  }
});

test('installing twice without --force exits 1; with --force it succeeds', () => {
  const parent = makeTmpDir();

  const first = run(['--dir', parent]);
  assert.equal(first.status, 0, first.stderr);

  const second = run(['--dir', parent]);
  assert.equal(second.status, 1, 'a second install without --force must fail');
  assert.match(second.stderr, /already exists/);

  const third = run(['--dir', parent, '--force']);
  assert.equal(third.status, 0, third.stderr);
  assert.match(third.stdout, /verify: ok/);
});
