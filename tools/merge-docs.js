#!/usr/bin/env node
// Regenerates docs/PROVENANCE.md, DEDUP-LOG.md, NATIVE-REVIEW.md from their
// fragment directories. DISCREPANCIES.md is hand-maintained + fragments appended once.
'use strict';
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const SHAS = 'Upstream commits: blader 9862685f575c65a8247f90369951df1b3416e3d6; avoid-ai-writing 7a2c7d11d4a74d90c6be41fbed8402d972543798; semitic 2c9d4fbe3e0086d373b59bfebc9556082275cf62.';
function merge(dir, out, title, intro) {
  const abs = path.join(root, dir);
  const files = fs.readdirSync(abs).filter((f) => f.endsWith('.md')).sort();
  let s = `# ${title}\n\n${intro}\n\n${SHAS}\n\n`;
  for (const f of files) {
    s += `\n\n---\n\n<!-- source fragment: ${dir}/${f} -->\n\n` + fs.readFileSync(path.join(abs, f), 'utf8').replace(/^# /, '## ');
  }
  fs.writeFileSync(path.join(root, out), s);
  console.log(out, files.length, 'fragments');
}
merge('docs/provenance', 'docs/PROVENANCE.md', 'Provenance', 'Pattern → upstream file/line/commit mapping. Built by concatenating the per-area fragments in docs/provenance/ (kept as the editable source; regenerate with tools/merge-docs.js).');
merge('docs/dedup-log', 'docs/DEDUP-LOG.md', 'Deduplication log', 'Every merge, split, drop and vocabulary placement, per area. Fragments in docs/dedup-log/.');
merge('docs/native-review', 'docs/NATIVE-REVIEW.md', 'Native-speaker review queue', 'Arabic items awaiting a native speaker, grouped by area then variety. MSA and Egyptian: project owner. Levantine: no reviewer yet (whole file experimental). Fragments in docs/native-review/.');
