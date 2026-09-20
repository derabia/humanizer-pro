#!/usr/bin/env node
/**
 * humanizer-pro — version consistency checker
 *
 * origin: humanizer-pro
 *
 * Asserts that three sources of truth agree on the current version:
 *   - package.json "version"
 *   - skills/humanizer-pro/SKILL.md frontmatter "metadata.version"
 *   - the latest (non-Unreleased) heading in CHANGELOG.md
 *
 * A trailing pre-release suffix matching /-(build|rc\.?\d*)$/ is stripped
 * before comparison, so "0.1.0-build" and "0.1.0" are treated as the same
 * version for this check. The three raw strings (suffix included) are also
 * compared, and a mismatch there is reported as a warning, not a failure,
 * since it is expected during an interim build (package.json/SKILL.md may
 * carry a stable "0.1.0" while CHANGELOG documents "0.1.0-build").
 *
 * With --require-tag, also asserts that a git tag for the version exists,
 * checked as both "v<version>" and "<version>" (raw, suffix included, then
 * the suffix-stripped form). Without --require-tag (the default; this is
 * what CI runs), no git commands are executed at all.
 *
 * Usage:
 *   node tools/check-version.js [--require-tag] [--json]
 *
 * Exit codes:
 *   0 - all versions agree (and, with --require-tag, a matching tag exists)
 *   1 - mismatch, missing source, or (with --require-tag) no matching tag
 *
 * Node >= 18, no dependencies, CommonJS.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const PKG_PATH = path.join(root, 'package.json');
const SKILL_PATH = path.join(root, 'skills', 'humanizer-pro', 'SKILL.md');
const CHANGELOG_PATH = path.join(root, 'CHANGELOG.md');

const argv = process.argv.slice(2);
const requireTag = argv.includes('--require-tag');
const asJson = argv.includes('--json');

const errors = [];
const warnings = [];
const notes = [];
function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }
function note(msg) { notes.push(msg); }

const SUFFIX_RE = /-(build|rc\.?\d*)$/i;
function stripSuffix(v) {
  return typeof v === 'string' ? v.replace(SUFFIX_RE, '') : v;
}

// --- package.json ----------------------------------------------------------

let pkgVersion = null;
try {
  const pkgRaw = fs.readFileSync(PKG_PATH, 'utf8');
  const pkg = JSON.parse(pkgRaw);
  pkgVersion = pkg.version;
  if (!pkgVersion) fail('package.json: "version" field is missing');
  else note('package.json version: ' + pkgVersion);
} catch (err) {
  fail('package.json: cannot read or parse (' + err.message + ')');
}

// --- SKILL.md frontmatter metadata.version ---------------------------------

let skillVersion = null;
try {
  const skillText = fs.readFileSync(SKILL_PATH, 'utf8');
  const lines = skillText.split('\n');
  if (lines[0].trim() !== '---') {
    fail('SKILL.md: file does not start with "---" frontmatter fence');
  } else {
    let fmEnd = -1;
    for (let i = 1; i < lines.length; i += 1) {
      if (lines[i].trim() === '---') { fmEnd = i; break; }
    }
    if (fmEnd === -1) {
      fail('SKILL.md: no closing "---" for frontmatter');
    } else {
      const body = lines.slice(1, fmEnd);
      let metaLine = -1;
      for (let i = 0; i < body.length; i += 1) {
        if (/^metadata:\s*$/.test(body[i])) { metaLine = i; break; }
      }
      if (metaLine === -1) {
        fail('SKILL.md: frontmatter has no top-level "metadata:" key');
      } else {
        let versionLine = null;
        for (let i = metaLine + 1; i < body.length; i += 1) {
          const l = body[i];
          if (l.trim() === '') continue;
          if (!/^[ \t]/.test(l)) break; // back at column 0: metadata block ended
          const m = /^[ \t]+version:\s*(.+)$/.exec(l);
          if (m) { versionLine = m[1].trim(); break; }
        }
        if (!versionLine) {
          fail('SKILL.md: "metadata.version" not found under "metadata:"');
        } else {
          const q = /^(['"])([\s\S]*)\1$/.exec(versionLine);
          skillVersion = q ? q[2] : versionLine;
          note('SKILL.md metadata.version: ' + skillVersion);
        }
      }
    }
  }
} catch (err) {
  fail('SKILL.md: cannot read (' + err.message + ')');
}

// --- CHANGELOG.md latest heading --------------------------------------------

let changelogVersion = null;
try {
  const changelogText = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const headingRe = /^##\s*\[([^\]]+)\]/gm;
  let m;
  while ((m = headingRe.exec(changelogText)) !== null) {
    if (/^unreleased$/i.test(m[1].trim())) continue;
    changelogVersion = m[1].trim();
    break;
  }
  if (!changelogVersion) {
    fail('CHANGELOG.md: no released version heading found (only "[Unreleased]"?)');
  } else {
    note('CHANGELOG.md latest heading: ' + changelogVersion);
  }
} catch (err) {
  fail('CHANGELOG.md: cannot read (' + err.message + ')');
}

// --- Compare -----------------------------------------------------------------

if (pkgVersion && skillVersion && changelogVersion) {
  const raw = [pkgVersion, skillVersion, changelogVersion];
  const stripped = raw.map(stripSuffix);

  if (raw[0] === raw[1] && raw[1] === raw[2]) {
    note('all three sources match exactly: ' + raw[0]);
  } else if (stripped[0] === stripped[1] && stripped[1] === stripped[2]) {
    warn(
      'sources agree after stripping a -build/-rc suffix (base version "' +
      stripped[0] + '"), but raw strings differ: package.json="' + raw[0] +
      '", SKILL.md="' + raw[1] + '", CHANGELOG.md="' + raw[2] + '"'
    );
  } else {
    fail(
      'version mismatch: package.json="' + raw[0] + '", SKILL.md="' + raw[1] +
      '", CHANGELOG.md="' + raw[2] + '" (base versions: "' + stripped[0] +
      '", "' + stripped[1] + '", "' + stripped[2] + '")'
    );
  }
}

// --- Optional tag check --------------------------------------------------

if (requireTag) {
  if (!pkgVersion) {
    fail('--require-tag: cannot check tag, package.json version is unknown');
  } else {
    const candidates = new Set([
      pkgVersion, 'v' + pkgVersion,
      stripSuffix(pkgVersion), 'v' + stripSuffix(pkgVersion),
    ]);
    let found = null;
    for (const tag of candidates) {
      const res = spawnSync('git', ['tag', '-l', tag], { cwd: root, encoding: 'utf8' });
      if (res.status === 0 && res.stdout && res.stdout.trim() === tag) {
        found = tag;
        break;
      }
    }
    if (found) {
      note('--require-tag: found matching git tag "' + found + '"');
    } else {
      fail(
        '--require-tag: no git tag found among: ' + Array.from(candidates).join(', ')
      );
    }
  }
} else {
  note('--require-tag not passed; no git commands executed');
}

// --- Report ------------------------------------------------------------------

if (asJson) {
  console.log(JSON.stringify({
    pkgVersion, skillVersion, changelogVersion,
    requireTag, errors, warnings, notes,
  }, null, 2));
} else {
  console.log('check-version:');
  for (const n of notes) console.log('  ok      ' + n);
  for (const w of warnings) console.log('  WARN    ' + w);
  for (const e of errors) console.log('  FAIL    ' + e);
  console.log('');
  console.log('result: ' + errors.length + ' failure(s), ' + warnings.length + ' warning(s)');
}

process.exit(errors.length > 0 ? 1 : 0);
