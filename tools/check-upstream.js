#!/usr/bin/env node
// Compares the pinned upstream commit SHAs recorded in UPSTREAM.md against the
// current remote HEAD of each upstream repository, so a maintainer can tell
// whether the sources humanizer-pro was built from have moved since the pin.
//
// Usage:
//   node tools/check-upstream.js [--json]
//
// Exit codes:
//   0 - checked successfully, no repo has moved
//   1 - checked successfully, at least one repo has moved
//   2 - could not parse UPSTREAM.md (no repo rows found, or malformed table)
//   3 - network unavailable (git ls-remote could not reach one or more repos)
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
const UPSTREAM_PATH = path.join(root, 'UPSTREAM.md');
const PROVENANCE_PATH = path.join(root, 'docs', 'PROVENANCE.md');
const PROVENANCE_DIR = path.join(root, 'docs', 'provenance');
const LS_REMOTE_TIMEOUT_MS = 20000;

function parseArgs(argv) {
  return { json: argv.includes('--json') };
}

// Extracts a short, greppable name for a repo from its URL, e.g.
// https://github.com/blader/humanizer -> "blader" (matches the short names
// used throughout docs/provenance/*.md and docs/PROVENANCE.md: blader,
// avoid-ai-writing, semitic).
function shortName(url) {
  const m = url.match(/github\.com\/([^/]+)\/([^/]+?)\/?$/i);
  if (!m) return url;
  const [, owner, repo] = m;
  if (/^humanizer-semitic$/i.test(repo)) return 'semitic';
  if (/^avoid-ai-writing$/i.test(repo)) return 'avoid-ai-writing';
  if (/^humanizer$/i.test(repo)) return owner.toLowerCase();
  return repo.toLowerCase();
}

// Parses the "Pinned upstream sources" table in UPSTREAM.md:
//   | Repository | Commit | Version | Version source | License | Intended contribution |
// Returns [{ url, sha, version, raw }], or throws if no rows are found.
function parseUpstreamMd(text) {
  const lines = text.split(/\r?\n/);
  const rows = [];
  for (const line of lines) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 3) continue;
    const [repoCell, commitCell, versionCell] = cells;
    if (!/^https?:\/\//i.test(repoCell)) continue; // header / separator rows
    const shaMatch = commitCell.match(/[0-9a-f]{7,40}/i);
    if (!shaMatch) continue;
    rows.push({
      url: repoCell.replace(/\s+/g, ''),
      sha: shaMatch[0],
      version: versionCell || '(unknown)',
      raw: line,
    });
  }
  if (rows.length === 0) {
    throw new Error('no repository rows found in UPSTREAM.md (expected a markdown table with a Repository|Commit|... header)');
  }
  return rows;
}

// Runs `git ls-remote <url> HEAD` and returns the 40-char HEAD sha, or a
// structured error describing why it failed (network vs. other).
function lsRemoteHead(url) {
  let result;
  try {
    result = spawnSync('git', ['ls-remote', url, 'HEAD'], {
      timeout: LS_REMOTE_TIMEOUT_MS,
      encoding: 'utf8',
    });
  } catch (err) {
    return { ok: false, network: true, error: `spawn failed: ${err.message}` };
  }
  if (result.error) {
    // ENOENT (no git), or timeout kill signal surfaced as an Error.
    const isTimeout = result.error.code === 'ETIMEDOUT' || result.signal === 'SIGTERM';
    return { ok: false, network: isTimeout, error: result.error.message };
  }
  if (result.signal) {
    return { ok: false, network: true, error: `git ls-remote timed out after ${LS_REMOTE_TIMEOUT_MS}ms` };
  }
  if (result.status !== 0) {
    const stderr = (result.stderr || '').trim();
    // Treat typical connectivity failures as "network unavailable"; treat a
    // clean non-zero exit with no network-looking message as a real error
    // (e.g. repo renamed/deleted) but still surfaced as unreachable for our
    // purposes, since we can't distinguish confidently offline.
    const looksNetworky = /could not resolve|unable to access|connection|timed out|network|temporary failure|could not read from remote/i.test(stderr);
    return { ok: false, network: looksNetworky || !stderr, error: stderr || `git ls-remote exited ${result.status}` };
  }
  const stdout = result.stdout || '';
  const line = stdout.split(/\r?\n/).find((l) => /\bHEAD\b/.test(l));
  if (!line) {
    return { ok: false, network: false, error: 'HEAD not found in git ls-remote output' };
  }
  const sha = line.split(/\s+/)[0];
  if (!/^[0-9a-f]{40}$/i.test(sha)) {
    return { ok: false, network: false, error: `unexpected ls-remote output: ${line}` };
  }
  return { ok: true, sha };
}

// Finds which docs/provenance/*.md fragments and which docs/PROVENANCE.md
// rows mention this repo, by grepping for the repo's short name and/or pinned
// SHA (full or 7-char short form).
function findReferences(name, sha) {
  const shaShort = sha.slice(0, 7);
  const needleRe = new RegExp(`${escapeRe(name)}|${escapeRe(sha)}|${escapeRe(shaShort)}`, 'i');

  const fragments = [];
  if (fs.existsSync(PROVENANCE_DIR)) {
    for (const f of fs.readdirSync(PROVENANCE_DIR).filter((f) => f.endsWith('.md')).sort()) {
      const p = path.join(PROVENANCE_DIR, f);
      const content = fs.readFileSync(p, 'utf8');
      if (needleRe.test(content)) fragments.push(path.relative(root, p).replace(/\\/g, '/'));
    }
  }

  const provenanceRows = [];
  if (fs.existsSync(PROVENANCE_PATH)) {
    const lines = fs.readFileSync(PROVENANCE_PATH, 'utf8').split(/\r?\n/);
    lines.forEach((line, i) => {
      if (line.trim().startsWith('|') && needleRe.test(line)) {
        provenanceRows.push({ line: i + 1, text: line.trim() });
      }
    });
  }

  return { fragments, provenanceRows };
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function main() {
  const { json } = parseArgs(process.argv.slice(2));

  let rows;
  try {
    const text = fs.readFileSync(UPSTREAM_PATH, 'utf8');
    rows = parseUpstreamMd(text);
  } catch (err) {
    const msg = `check-upstream: failed to parse ${path.relative(root, UPSTREAM_PATH)}: ${err.message}`;
    if (json) {
      console.log(JSON.stringify({ ok: false, error: msg }, null, 2));
    } else {
      console.error(msg);
    }
    process.exit(2);
  }

  const results = [];
  let anyNetworkFailure = false;

  for (const row of rows) {
    const name = shortName(row.url);
    const remote = lsRemoteHead(row.url);
    if (!remote.ok) {
      results.push({
        name,
        url: row.url,
        recordedSha: row.sha,
        version: row.version,
        remoteHead: null,
        status: 'error',
        error: remote.error,
        network: remote.network,
      });
      if (remote.network) anyNetworkFailure = true;
      continue;
    }
    const changed = !remote.sha.toLowerCase().startsWith(row.sha.toLowerCase()) && !row.sha.toLowerCase().startsWith(remote.sha.toLowerCase());
    const entry = {
      name,
      url: row.url,
      recordedSha: row.sha,
      version: row.version,
      remoteHead: remote.sha,
      status: changed ? 'CHANGED' : 'unchanged',
    };
    if (changed) {
      const refs = findReferences(name, row.sha);
      entry.reverify = refs;
    }
    results.push(entry);
  }

  // If every single repo failed for network-shaped reasons, report offline
  // and exit 3 rather than a misleading "changed"/"unchanged" verdict.
  const allFailed = results.every((r) => r.status === 'error');
  if (allFailed && anyNetworkFailure) {
    if (json) {
      console.log(JSON.stringify({ ok: false, offline: true, results }, null, 2));
    } else {
      console.log('check-upstream: network unavailable — could not reach any upstream repository.');
      for (const r of results) {
        console.log(`  ${r.name}: ${r.error}`);
      }
    }
    process.exit(3);
  }

  const anyChanged = results.some((r) => r.status === 'CHANGED');

  if (json) {
    console.log(JSON.stringify({ ok: true, anyChanged, results }, null, 2));
  } else {
    for (const r of results) {
      console.log(`\n${r.name}  (${r.url})`);
      console.log(`  recorded SHA: ${r.recordedSha}  (version ${r.version})`);
      if (r.status === 'error') {
        console.log(`  remote HEAD:  <error: ${r.error}>${r.network ? ' (looks like a network problem)' : ''}`);
        continue;
      }
      console.log(`  remote HEAD:  ${r.remoteHead}`);
      console.log(`  status:       ${r.status}`);
      if (r.status === 'CHANGED') {
        console.log('  re-verify:');
        if (r.reverify.fragments.length === 0) {
          console.log('    (no docs/provenance/*.md fragments reference this repo by name/SHA)');
        } else {
          for (const f of r.reverify.fragments) console.log(`    fragment: ${f}`);
        }
        if (r.reverify.provenanceRows.length === 0) {
          console.log('    (no docs/PROVENANCE.md rows reference this repo by name/SHA)');
        } else {
          for (const row of r.reverify.provenanceRows) console.log(`    docs/PROVENANCE.md:${row.line}: ${row.text}`);
        }
      }
    }
    console.log('');
    console.log(anyChanged ? 'Result: one or more upstream repositories have moved since they were pinned.' : 'Result: all upstream repositories are unchanged since they were pinned.');
  }

  process.exit(anyChanged ? 1 : 0);
}

main();
