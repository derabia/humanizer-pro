#!/usr/bin/env node
/**
 * humanizer-pro — vendor-neutral skill installer
 *
 * origin: humanizer-pro. Node >= 18, CommonJS, zero npm dependencies.
 *
 * Copies the folder `skills/humanizer-pro` (plain Markdown plus Node
 * scripts) to a directory a host reads as its skills directory. There is
 * nothing host-specific about the skill itself; this tool is the single,
 * neutral way to install it anywhere, replacing the per-vendor manifest
 * files this repository used to ship.
 *
 * Usage
 * -----
 *   node tools/install.js --dir <path> [--dry-run] [--force]
 *       Primary mode. Copies skills/humanizer-pro into <path>/humanizer-pro.
 *       <path> is whatever directory your host scans for skills.
 *
 *   node tools/install.js --list
 *       Prints, as information only, the conventional skills directories a
 *       few common hosts scan. The skill itself is plain Markdown plus Node
 *       scripts and works from any directory a host reads; use --dir to
 *       install anywhere, including a host not listed here.
 *
 *   node tools/install.js --host <name> [--global] [--dry-run] [--force]
 *       Convenience wrapper over --dir, using the directories documented in
 *       README.md's Install section. <name> is one of: codex, claude-code.
 *       Without --global the path is project-scoped (relative to the
 *       current directory); with --global it is under the user's home
 *       directory, resolved with os.homedir(), never a hard-coded path.
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
const os = require('os');

const ROOT = path.resolve(__dirname, '..');
const SKILL_NAME = 'humanizer-pro';
const SKILL_SRC = path.join(ROOT, 'skills', SKILL_NAME);

// Directories documented in README.md's Install section. Cursor's location
// "has changed across versions" per that section, so it is informational
// only in --list and refuses in --host, pointing at --dir instead.
const HOSTS = {
  codex: {
    project: () => path.join(process.cwd(), '.agents', 'skills'),
    global: () => path.join(os.homedir(), '.agents', 'skills'),
  },
  'claude-code': {
    project: () => path.join(process.cwd(), '.claude', 'skills'),
    global: () => path.join(os.homedir(), '.claude', 'skills'),
  },
};

const LIST_INFO = [
  { host: 'codex', project: path.join('.agents', 'skills'), global: path.join('~', '.agents', 'skills') },
  { host: 'claude-code', project: path.join('.claude', 'skills'), global: path.join('~', '.claude', 'skills') },
  { host: 'cursor', project: 'varies by version, use --dir', global: 'varies by version, use --dir' },
];

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
    '      Primary mode. Copies skills/humanizer-pro into <path>/humanizer-pro.',
    '',
    '  node tools/install.js --list',
    '      Prints conventional skills directories, as information only.',
    '',
    '  node tools/install.js --host <name> [--global] [--dry-run] [--force]',
    '      Convenience wrapper over --dir. <name>: codex, claude-code.',
    '      --global resolves under the user home directory (os.homedir()).',
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

function printList() {
  console.log('Conventional skills directories (information only; the skill');
  console.log('works from any directory a host reads — use --dir for others):');
  console.log('');
  for (const row of LIST_INFO) {
    console.log('  ' + row.host + ':');
    console.log('    project: ' + row.project);
    console.log('    global:  ' + row.global);
  }
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

  if (argv.includes('--list')) {
    printList();
    return 0;
  }

  const dryRun = argv.includes('--dry-run');
  const force = argv.includes('--force');

  const dirIdx = argv.indexOf('--dir');
  const hostIdx = argv.indexOf('--host');

  if (dirIdx === -1 && hostIdx === -1) {
    console.error('error: one of --dir <path> or --host <name> is required');
    console.error('');
    console.error(usage());
    return 2;
  }
  if (dirIdx !== -1 && hostIdx !== -1) {
    console.error('error: pass only one of --dir or --host, not both');
    return 2;
  }

  let targetParent;

  if (dirIdx !== -1) {
    const val = argv[dirIdx + 1];
    if (!val || val.startsWith('--')) {
      console.error('error: --dir requires a path argument');
      return 2;
    }
    targetParent = path.resolve(val);
  } else {
    const hostName = argv[hostIdx + 1];
    if (!hostName || hostName.startsWith('--')) {
      console.error('error: --host requires a name argument (codex, claude-code)');
      return 2;
    }
    if (hostName === 'cursor') {
      console.error('error: Cursor\'s skills directory has changed across versions.');
      console.error('See README.md\'s Install section for the current location, then');
      console.error('use: node tools/install.js --dir <cursor-skills-dir>');
      return 2;
    }
    const host = HOSTS[hostName];
    if (!host) {
      console.error('error: unknown host "' + hostName + '" (known: codex, claude-code)');
      return 2;
    }
    targetParent = argv.includes('--global') ? host.global() : host.project();
  }

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
