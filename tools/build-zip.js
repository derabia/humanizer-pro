#!/usr/bin/env node
// Zips skills/humanizer-pro/ into dist/humanizer-pro.zip, with
// humanizer-pro/ as the archive root (so humanizer-pro/SKILL.md is the
// top-level entry inside the zip), for upload as a Claude-apps custom skill.
//
// Uses PowerShell's Compress-Archive on Windows and the `zip` binary
// elsewhere, via child_process, so it has zero npm dependencies. Fails with
// a clear message if neither is available.
//
// Usage:
//   node tools/build-zip.js
//
// Exit codes:
//   0 - zip built successfully
//   1 - build failed (missing source dir, no zip tool available, or the
//       underlying command failed)
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const SKILL_DIR = path.join(root, 'skills', 'humanizer-pro');
const DIST_DIR = path.join(root, 'dist');
const ZIP_PATH = path.join(DIST_DIR, 'humanizer-pro.zip');

function fail(msg) {
  console.error(`build-zip: ${msg}`);
  process.exit(1);
}

function main() {
  if (!fs.existsSync(SKILL_DIR) || !fs.statSync(SKILL_DIR).isDirectory()) {
    fail(`source directory not found: ${path.relative(root, SKILL_DIR)}`);
  }

  fs.mkdirSync(DIST_DIR, { recursive: true });

  // Remove any previous zip so a failed build never leaves a stale artifact
  // that looks like a fresh one.
  if (fs.existsSync(ZIP_PATH)) {
    fs.unlinkSync(ZIP_PATH);
  }

  if (process.platform === 'win32') {
    buildWithPowerShell();
  } else {
    buildWithZip();
  }

  if (!fs.existsSync(ZIP_PATH)) {
    fail(`zip command reported success but ${path.relative(root, ZIP_PATH)} does not exist`);
  }

  const size = fs.statSync(ZIP_PATH).size;
  console.log(`build-zip: wrote ${path.relative(root, ZIP_PATH)} (${size} bytes)`);
}

// Windows: both PowerShell's Compress-Archive and
// System.IO.Compression.ZipFile.CreateFromDirectory (as run under Windows
// PowerShell 5.1's .NET Framework) write archive entry names with backslash
// path separators, which is non-conformant to the zip spec (entry names
// must use '/') and breaks extraction of nested folders on Linux/macOS
// unzip (verified: entries came out as literal
// "humanizer-pro\references\..." filenames instead of subdirectories,
// under both approaches).
//
// So entry names are built explicitly, here in Node with forward slashes,
// and each file is added to the archive individually with
// [ZipFileExtensions]::CreateEntryFromFile($archive, $sourcePath,
// $entryName, ...), which takes the entry name as given instead of deriving
// it from the filesystem path.
function buildWithPowerShell() {
  const files = listFilesRecursive(SKILL_DIR).map((abs) => {
    const rel = path.relative(SKILL_DIR, abs).split(path.sep).join('/');
    return { abs, entryName: `humanizer-pro/${rel}` };
  });

  const manifestPath = path.join(
    fs.mkdtempSync(path.join(require('os').tmpdir(), 'humanizer-pro-zip-')),
    'manifest.json',
  );
  fs.writeFileSync(manifestPath, JSON.stringify(files), 'utf8');

  const psScript = `
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$manifest = Get-Content -Raw -LiteralPath '${manifestPath.replace(/'/g, "''")}' | ConvertFrom-Json
$zipPath = '${ZIP_PATH.replace(/'/g, "''")}'
if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
$archive = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($f in $manifest) {
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
      $archive, $f.abs, $f.entryName, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally {
  $archive.Dispose()
}
`;

  try {
    const result = spawnSync(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-Command', psScript],
      { encoding: 'utf8' },
    );

    if (result.error) {
      fail(`could not run powershell.exe: ${result.error.message}. Neither .NET's ZipArchive class nor a zip binary is available.`);
    }
    if (result.status !== 0) {
      fail(`zip build via ZipArchive failed (exit ${result.status}): ${(result.stderr || result.stdout || '').trim()}`);
    }
  } finally {
    fs.rmSync(path.dirname(manifestPath), { recursive: true, force: true });
  }
}

function listFilesRecursive(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFilesRecursive(full));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

// macOS/Linux: `zip -r`, run from inside skills/ so the archive root is
// naturally humanizer-pro/ without staging a copy.
function buildWithZip() {
  const skillsDir = path.join(root, 'skills');
  const result = spawnSync('zip', ['-r', ZIP_PATH, 'humanizer-pro'], {
    cwd: skillsDir,
    encoding: 'utf8',
  });

  if (result.error) {
    fail(`could not run 'zip': ${result.error.message}. Install zip (e.g. 'apt-get install zip' or 'brew install zip') and retry.`);
  }
  if (result.status !== 0) {
    fail(`zip failed (exit ${result.status}): ${(result.stderr || result.stdout || '').trim()}`);
  }
}

main();
