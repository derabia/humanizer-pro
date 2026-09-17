# Grade: en-detect-01

## Against `expected` block

- **mustPreserve "Corvus Notes":** PASS — no rewrite occurred (detect mode); the name is untouched by definition, and `output.md` quotes it accurately.
- **mustNotContain:** N/A (empty list).
- **scoreShouldImprove: false:** PASS — no rewrite was produced; only `scores-before.json` exists, as the eval spec requires for detect mode.
- **notes — audit catches the not-X-but-Y opener:** PASS — "Corvus Notes isn't just another note-taking app — it's a statement..." flagged as EN-001.
- **notes — one-line closers ('Let that sink in.', 'That's the real unlock.'):** PASS — both quoted and cited as EN-002.
- **notes — stacked transition words (Furthermore/Moreover/In addition):** PASS — flagged as EN-030, matches `scores-before.json`'s three `transition` hits.
- **notes — forced triad (speed, clarity, control):** PASS — flagged as EN-020 with an explicit note on why it tips over from a defensible list.
- **notes — rhetorical question:** PASS — flagged as EN-043, P2.
- **notes — social-endorsement closer:** PASS — the "Like and subscribe..." line flagged as EN-055.
- **notes — pattern IDs, P0/P1/P2 grouping, Assessment, numeric Score:** PASS — all present; Score is `17/100` from an actually-executed `detect.js` run (`scores-before.json`), not fabricated.

## Against the general Phase 9 checklist

- **Meaning/facts preserved:** PASS — no rewrite; nothing to preserve beyond correct quoting.
- **Correct language/variety, no MSA leakage:** N/A (English, no dialect).
- **Output contract followed exactly:** PASS — Issues found (P0/P1/P2, Tier-1A markers visually separated from other findings) → Assessment → Score, zero editing passes stated explicitly.
- **Protected spans untouched:** N/A (not an edit/seo eval).
- **Second pass present and useful:** N/A — detect mode has no second-pass requirement; correctly omitted.
- **Detector score improved or explanation given:** PASS (as "N/A, detect mode" per eval design) — score reported honestly as 17/100 from a real run, with the detector's own findings distinguished from model-only findings.
- **Reads naturally / no fabrication:** PASS — the numeric score (17), classification (MIXED), and all quoted excerpts are copied verbatim from the actual `detect.js` run captured in `scores-before.json`, not invented.

## Overall

7/7 PASS. No FAIL, no NEEDS-NATIVE-REVIEW (English-only eval).
