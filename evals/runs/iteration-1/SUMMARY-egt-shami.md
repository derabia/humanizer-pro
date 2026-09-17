# iteration-1 summary — egt / shami evals (8)

Run manually as an agent invoking the `humanizer-pro` skill per its own SKILL.md
Step-3 reference table (ar-shared + ar-egyptian or ar-shared + ar-levantine, plus
voice-matching / seo-mode where applicable). All Arabic dialect output carries a
`<!-- NATIVE-REVIEW: ... -->` marker and is not confirmed natural by a native
speaker — see the "reads naturally" row in each eval's `grade.md`.

| id | mode | score before → after | leakage tokens in rewritten span | validate.js exit | grade | notable |
|---|---|---|---|---|---|---|
| egt-detect-01 | detect | 100 (AI) → n/a (no rewrite) | n/a | n/a | PASS | Correctly identifies the "Egyptian" input as near-total MSA with zero real dialect markers. |
| egt-rewrite-01 | rewrite + voice sample | 52 → 2 (HUMAN) | 0 real (1 grep false-positive: "لم" substring inside "بتكلم") | n/a | PASS | Second pass caught and fixed a real residual (uniform sentence rhythm) the first pass missed. |
| egt-edit-01 | edit | 12 → 6 (HUMAN) | 0 | 0 | PASS | Single in-scope paragraph edited; code fence + table byte-identical per validator. |
| egt-seo-01 | rewrite + seo | 6 → 0 (HUMAN) | 0 | 0 | PASS | Fixed a real pre-existing keyword-placement gap without touching protected title/H2; flagged thin sections instead of padding them. |
| shami-detect-01 | detect + seo | 71 (AI) → n/a | n/a | n/a | PASS | Correctly flags full MSA reversion incl. doubled "علاوة على ذلك"; SEO check correctly framed as presence-only. |
| shami-rewrite-01 | rewrite | 71 → 16 (HUMAN) | 0 real | n/a | PASS | Second pass fixed a genuine P0 uniform-rhythm finding; deliberately kept tanwin on a protected price figure (Level 1 beats Level 5). |
| shami-edit-01 | edit | 14 → 14 (flat, `--variety shami` forced) | 0 real | 0 | PASS content/process; FLAG on detector score | Headline score didn't move even though `stats.msaLeakage.ratio` dropped 0.3→0.1 — see defect below. |
| shami-seo-01 | edit + seo | 20 → 14 (HUMAN) | 0 real | 0 | PASS | `stats.msaLeakage.ratio` dropped 0.25→0 (full removal); headline score did move here, unlike shami-edit-01. |

"Leakage tokens" = grep for MSA negators/future markers/demonstratives/relatives
(لا/لم/لن/ليس, سـ/سوف, هذا/هذه, الذي/التي for egt evals; يُريدُ/سوف/لا يستطيع/
يجب على/الذي for shami evals) run against the actual rewritten/edited spans
only (rewritten.md / edited.md / rewritten-full.md), not the Arabic-headed
report prose around them. Every non-zero grep hit was manually checked and was
a substring false-positive (e.g. "لم" matching inside "بتكلم"), not a real
negator/relative-pronoun instance.

## Skill defects found

**1. `detect.js`'s headline `score` does not reliably reflect `stats.msaLeakage`
improvement when the MSA-leaking paragraph is short relative to an otherwise-
dialectal document.** Reproduced in `shami-edit-01`: editing out a textbook
MSA-reversion paragraph ("يُريدُ المستخدم أن...", "من الضروري أن يتم...") dropped
`stats.msaLeakage.ratio` from 0.3 to 0.1, but the reported `score` stayed
exactly flat at 14 before and after, because the tool's itemized `issues` list
never emitted an msa-leakage/msa-vocabulary-type entry for that paragraph in
full-document context — even though the same phrase family ("يُريدُ" + "أن" +
verb) *is* itemized correctly in `shami-detect-01`'s more MSA-heavy input, and
even when the same paragraph was tested in isolation as a standalone ~25-word
snippet during this session (verified interactively, not saved to disk). By
contrast, `shami-seo-01`'s very similar single-sentence MSA-hedge fix ("من
الجدير بالإشارة أن...") *did* move the headline score (20→14) with the same
`--variety shami` flag on a similarly-sized surrounding document, and its
`msaLeakage.ratio` dropped fully to 0. This suggests the per-instance Levantine
MSA-reversion detector rule (the AR-SHM-001 umbrella pattern specifically) is
inconsistently gated — possibly by a document-level ratio or minimum-hit
threshold — in a way that a single, dense, fully-vocalized MSA verb form like
"يُريدُ" does not reliably clear even though a similar-severity MSA-hedge
sentence elsewhere does. This makes edit mode's before/after score comparison
— the exact verification signal `modes.md` tells the agent to report —
unreliable in precisely the "one bad paragraph in an otherwise-good post"
scenario these two edit evals are designed to test.

**Proposed fix:** either (a) have `detect.js` fold `stats.msaLeakage.ratio`
into `rawScore` with some weight regardless of document length or which
specific MSA construction triggered it, or (b) audit why "يُريدُ"-headed
MSA-reversion sentences don't reliably produce a scored `issues` entry in
Levantine full-document context while `AR-SH-001`-family hedge openers do.
File: `skills/humanizer-pro/scripts/lib/` (the Arabic detector engine that
computes `msaLeakage` and `issues`; exact filename not confirmed from this
agent's vantage point since `scripts/lib/` internals were not opened in this
session — whoever picks this up should start at wherever `msaLeakage.ratio`
is computed and trace why it isn't reliably reflected in `rawScore`/`issues`
for Levantine text).

**2. No corresponding Egyptian-side reproduction.** `egt-edit-01`'s single bad
paragraph did move the score (12→6) cleanly. This may be Levantine-specific
(the Levantine AR-SHM-001 umbrella pattern vs. Egyptian's per-item AR-EGT-00N
patterns are structured differently — see `ar-egyptian.md` AR-EGT-026's own
provenance note that Egyptian has no single named umbrella pattern the way
Levantine's AR-SHM-001 is). Worth checking whether the Levantine detector's
issues-emission logic is keyed specifically off the umbrella pattern in a way
the itemized Egyptian patterns aren't, and specifically whether fully-vocalized
MSA verb forms like "يُريدُ" are handled differently from plain hedge-opener
phrases within that umbrella rule.

## Remaining issues / caveats

- All Arabic rewrites in this run were produced by a non-native-Arabic-speaking
  agent. Every eval's `grade.md` marks "reads naturally to a native reader" as
  **NEEDS-NATIVE-REVIEW**, per task instructions — this is not a skill defect,
  it is an acknowledged limitation of this run.
- Levantine coverage (`ar-levantine.md`) is itself marked experimental by the
  skill; both `shami-rewrite-01` and `shami-detect-01` outputs repeat that
  disclosure per SKILL.md section 3, and it should be treated as a stronger
  caveat than the Egyptian outputs.
- `egt-seo-01`'s keyword-placement fix (adding the phrase "أكل مصري سريع" to
  the intro) is a defensible reading of seo-mode.md's "preserve keyword
  presence and approximate placement" rule applied to a pre-existing gap, but
  a stricter reviewer could argue any keyword insertion needs explicit user
  sign-off the same way protected-span edits do — flagged in that eval's own
  `grade.md` as a judgment call, not hidden.
- `shami-edit-01`'s `validate.js` run without an explicit `--variety` flag
  auto-detects `egt` (not `shami`) for that particular file and reports a
  different score pair than the `--variety shami`-forced run used for
  grading; the saved `validate.txt` for that eval uses the `--variety shami`
  run. Worth noting that `validate.js`'s auto-detection can silently pick the
  wrong dialect engine for a mixed-signal document — a second, smaller
  instance of defect #1's underlying cause (variety misclassification
  degrading the reliability of the scored verification signal).
