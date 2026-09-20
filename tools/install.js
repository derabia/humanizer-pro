#!/usr/bin/env node
/**
 * humanizer-pro — vendor-neutral skill installer
 *
 * origin: humanizer-pro. Node >= 18, CommonJS, zero npm dependencies.
 *
 * Copies the folder `skills/humanizer-pro` (plain Markdown plus Node
 * scripts) into whatever directory your agent host scans for skills. The
 * host's own documentation names that directory; this tool does not
 * hard-code or guess it. There is nothing host-specific about the skill
 * itself; this is the single, neutral way to install it anywhere.
 *
 * Usage
 * -----
 *   node tools/install.js --dir <path> [--dry-run] [--force]
 *       Copies skills/humanizer-pro into <path>/humanizer-pro. <path> is
 *       whatever directory your host scans for skills; see your host's own
 *       documentation for where that is.
 *
 * Flags
 * -----
 *   --dry-run   Print what would be copied without writing anything.
 *   --force     Overwrite an existing target directory. Without it, an
 *               existing target is an error.
 *
 * Exit codes: 0 success, 1 failure, 2 usage error.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKILL_NAME = 'humanizer-pro';
const SKILL_SRC = path.join(ROOT, 'skills', SKILL_NAME);

function usage() {
  return [
    'humanizer-pro installer',
    '',
    'The skill is plain Markdown plus Node scripts and works from any',
    'directory a host reads as its skills directory. This tool is the one',
    'neutral way to install it; there are no per-vendor packages.',
    '',
    'Usage:',
    '  node tools/install.js --dir <path> [--dry-run] [--force]',
    '      Copies skills/humanizer-pro into <path>/humanizer-pro. <path> is',
    '      whatever directory your agent host scans for skills; your host\'s',
    '      own documentation names that directory.',
    '',
    'Flags:',
    '  --dry-run   Print what would be copied without writing.',
    '  --force     Overwrite an existing target directory.',
    '',
    'Exit codes: 0 success, 1 failure, 2 usage error.',
  ].join('\n');
}

/** Recursively list files under `dir`, skipping symlinks. Returns entries
 * sorted by forward-slash relative path, each { rel, full, size }. */
function walk(dir, base) {
  base = base || dir;
  let out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    throw new Error('cannot read directory ' + dir + ': ' + err.message);
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) {
      out = out.concat(walk(full, base));
    } else if (entry.isFile()) {
      const rel = path.relative(base, full).split(path.sep).join('/');
      const size = fs.statSync(full).size;
      out.push({ rel, full, size });
    }
  }
  out.sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));
  return out;
}

function totalBytes(files) {
  return files.reduce((sum, f) => sum + f.size, 0);
}

function copyTree(files, destRoot) {
  fs.mkdirSync(destRoot, { recursive: true });
  for (const f of files) {
    const destFull = path.join(destRoot, f.rel.split('/').join(path.sep));
    fs.mkdirSync(path.dirname(destFull), { recursive: true });
    fs.copyFileSync(f.full, destFull);
  }
}

function main() {
  const argv = process.argv.slice(2);

  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(usage());
    return 0;
  }

  const dryRun = argv.includes('--dry-run');
  const force = argv.includes('--force');

  const dirIdx = argv.indexOf('--dir');

  if (dirIdx === -1) {
    console.error('error: --dir <path> is required');
    console.error('');
    console.error(usage());
    return 2;
  }

  const val = argv[dirIdx + 1];
  if (!val || val.startsWith('--')) {
    console.error('error: --dir requires a path argument');
    return 2;
  }
  const targetParent = path.resolve(val);

  let srcFiles;
  try {
    srcFiles = walk(SKILL_SRC);
  } catch (err) {
    console.error('error: ' + err.message);
    return 1;
  }
  const srcBytes = totalBytes(srcFiles);
  const dest = path.join(targetParent, SKILL_NAME);

  if (dryRun) {
    console.log('dry run: would copy ' + SKILL_SRC + ' -> ' + dest);
    for (const f of srcFiles) console.log('  ' + f.rel);
    console.log('files: ' + srcFiles.length);
    console.log('bytes: ' + srcBytes);
    return 0;
  }

  const exists = fs.existsSync(dest);
  if (exists && !force) {
    console.error('error: target already exists: ' + dest);
    console.error('use --force to overwrite it');
    return 1;
  }
  if (exists && force) {
    fs.rmSync(dest, { recursive: true, force: true });
  }

  try {
    copyTree(srcFiles, dest);
  } catch (err) {
    console.error('error: copy failed: ' + err.message);
    return 1;
  }

  let destFiles;
  try {
    destFiles = walk(dest);
  } catch (err) {
    console.error('error: verification read failed: ' + err.message);
    return 1;
  }
  const destBytes = totalBytes(destFiles);

  console.log('installed: ' + SKILL_SRC + ' -> ' + dest);
  console.log('files: ' + destFiles.length);
  console.log('bytes: ' + destBytes);

  if (destFiles.length !== srcFiles.length || destBytes !== srcBytes) {
    console.error(
      'error: verification failed — source had ' + srcFiles.length + ' files / ' +
      srcBytes + ' bytes, destination has ' + destFiles.length + ' files / ' +
      destBytes + ' bytes'
    );
    return 1;
  }

  console.log('verify: ok');
  return 0;
}

if (require.main === module) {
  process.exit(main());
}

module.exports = { walk, totalBytes, copyTree, main };
