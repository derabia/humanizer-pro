# iteration-1 summary — English + MSA evals (8 of 16)

Scope: `en-detect-01`, `en-rewrite-01`, `en-edit-01`, `en-seo-01`,
`msa-detect-01`, `msa-rewrite-01`, `msa-edit-01`, `msa-seo-01`. The
`egt-*` and `shami-*` evals already present under `evals/runs/iteration-1/`
were not touched by this run.

All scores below came from actually running `node skills/humanizer-pro/scripts/detect.js`
and `node skills/humanizer-pro/scripts/validate.js` from the repo root or the
eval's own folder; see each eval's `scores-before.json` / `scores-after.json`
/ `validate.txt` for the raw output.

| id | mode | score before to after | validate exit | grade summary | key failures |
|---|---|---|---|---|---|
| en-detect-01 | detect | 17 to N/A (detect mode) | N/A | 7/7 PASS | none |
| en-rewrite-01 | rewrite (voice sample) | 8 to 5 | N/A (not edit/seo) | 10/10 PASS | none |
| en-edit-01 | edit | 5 to 0 | 0 | 13/13 PASS | none |
| en-seo-01 | rewrite + seo (thin content) | 0 to 0 | 0 | 12/12 PASS (1 borderline, honestly reported) | none |
| msa-detect-01 | detect | 59 to N/A (detect mode) | N/A | 8/8 PASS, 1 NEEDS-NATIVE-REVIEW | none |
| msa-rewrite-01 | rewrite | 39 to 0 | N/A (not edit/seo) | 9/9 PASS, 1 NEEDS-NATIVE-REVIEW | none |
| msa-edit-01 | edit | 0 to 0 (detector gap, see below) | 0 | 8/9 PASS, 1 NEEDS-NATIVE-REVIEW | none (score plateau explained, not a false claim) |
| msa-seo-01 | edit + seo | 6 to 0 | 0 | 10/10 PASS, 1 NEEDS-NATIVE-REVIEW | none |

No eval failed its `expected` block or the general Phase 9 checklist. The four
MSA evals each carry one NEEDS-NATIVE-REVIEW flag, consistently for the same
reason: the *newly written* Arabic prose (analysis text and edited sentences)
has not been checked by a native MSA speaker for register/idiom naturalness -
three of the four source fixtures are explicitly marked
`<!-- NATIVE-REVIEW: msa -->` by the eval author, which is this project's own
signal that this class of check is expected before trusting the Arabic output
fully. This is a process flag, not a defect found in the skill.

## Skill defects found

**One confirmed defect**, in the deterministic detector, not in the reference
files:

- **File:** `skills/humanizer-pro/scripts/lib/ar-detector/lexicons.js`, lines
  88-107 (the `AR-SH-001` `phrases` array inside `SHARED_PATTERNS`).
- **What's wrong:** The array includes `'من الجدير بالذكر'` (word-for-word:
  "it is worth mentioning") but not the very close, equally common variant
  `'من الجدير بالإشارة'` ("it is worth noting/pointing out") - same hedge
  family (`ar-shared.md` AR-SH-001 names `تجدر الإشارة إلى` explicitly as a
  member of this family, and `بالإشارة` is the same root as `الإشارة` used
  three other times in the same array). `msa-edit-01`'s input paragraph
  opens with exactly this phrase - "**من الجدير بالإشارة** أن اعتماد نهج
  موحّد وشامل..." - and `node scripts/detect.js` on that input returns
  `issues: []`, `score: 0`, `label: "HUMAN"` (see
  `evals/runs/iteration-1/msa-edit-01/scores-before.json`), even though the
  paragraph is a clear AR-SH-001 hedge opener by the reference file's own
  definition and was independently flagged by the eval's own `expected`
  block as a P1 finding. Because the source already scored 0, the edited
  version could not register a numeric improvement (`scoreShouldImprove:
  true` in `evals.json` could not be verified mechanically for this eval -
  see `msa-edit-01/grade.md`).
- **Proposed fix:** Add `'من الجدير بالإشارة'` (and, for the same reason,
  consider `'يجدر بالإشارة'` and `'يجدر الذكر'` as morphological/word-order
  variants of the same two-word-root family already partially covered) to
  the `phrases` array at `ar-detector/lexicons.js:88-107`. This is a
  same-shape, low-risk addition - it follows the exact pattern already used
  for the `الإشارة` and `الذكر` variants already present in that array - and
  would make `msa-edit-01`'s `scoreShouldImprove` expectation mechanically
  verifiable rather than relying entirely on model-only judgment.

**Nothing else found.** No defect was identified in `core-principles.md`,
`precedence.md`, `modes.md`, `seo-mode.md`, `voice-matching.md`,
`en-patterns.md`, `en-vocabulary.md`, `ar-shared.md`, or `ar-msa.md` during
this run - every pattern ID cited in this iteration's outputs matched an
actual entry in the relevant reference file, the precedence rules resolved
cleanly for every protected-span case encountered (code fences, tables,
frontmatter, shortcodes, JSON-LD, internal links), and `validate.js` behaved
exactly as `modes.md` and `seo-mode.md` describe (0 violations on every
edit/seo run in this batch, with the one `seo-thin-sections` warning firing
correctly as a warning, not a hard error, in both `en-seo-01` and
`msa-seo-01`).
