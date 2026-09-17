# Iteration-2 self-assessment — script-only re-score

This is a **script-only** re-score of iteration-1's saved inputs and model
outputs (`input.md` + `rewritten.md`/`edited.md`/`rewritten-full.md`, copied
verbatim from `evals/runs/iteration-1/<id>/`). **No model output was
regenerated.** Only `node skills/humanizer-pro/scripts/detect.js` and, for
edit/seo evals, `node skills/humanizer-pro/scripts/validate.js` were re-run,
against the exact same files iteration-1 graded.

**The only skill change between iteration-1 and iteration-2 is the hedge
lexicon fix** in
`skills/humanizer-pro/scripts/lib/ar-detector/lexicons.js` (adds
`'من الجدير بالإشارة'` and `'يجدر بالإشارة'` to the `AR-SH-001` phrase list;
see lines 105-106, each commented `// eval msa-edit-01 finding`). Nothing
else in the skill, its reference files, `detect.js`, or `validate.js`
changed.

Each eval's `detect.js` invocation used the same `--lang`/`--variety` and
`--markdown` flags iteration-1's own `scores-before.json`/`scores-after.json`
recorded via `stats.sourceMode` (en-\* and msa-\* were originally run with
`--markdown`, i.e. `sourceMode: rendered-markdown`; egt-\* and shami-\* were
run without it, i.e. `sourceMode: plain`) — reproduced here so the only
variable between the two iterations is the lexicon fix, not an invocation
difference. Raw combined output of every command run for this re-score is
saved to `docs/evidence/phase9-iteration-2-rescore.txt`.

## Results

| id | iter-1 before→after | iter-2 before→after | changed? | validate exit |
|---|---|---|---|---|
| en-detect-01 | 17 → N/A | 17 → N/A | no | N/A |
| en-rewrite-01 | 8 → 5 | 8 → 5 | no | N/A |
| en-edit-01 | 5 → 0 | 5 → 0 | no | exit=0 |
| en-seo-01 | 0 → 0 | 0 → 0 | no | exit=0 |
| msa-detect-01 | 59 → N/A | 59 → N/A | no | N/A |
| msa-rewrite-01 | 39 → 0 | 39 → 0 | no | N/A |
| **msa-edit-01** | **0 → 0** | **6 → 0** | **yes — before-score rose 0→6** | exit=0 |
| **msa-seo-01** | **6 → 0** | **9 → 0** | **yes — before-score rose 6→9** | exit=0 |
| egt-detect-01 | 100 → N/A | 100 → N/A | no | N/A |
| egt-rewrite-01 | 52 → 2 | 52 → 2 | no | N/A |
| egt-edit-01 | 12 → 6 | 12 → 6 | no | exit=0 |
| egt-seo-01 | 6 → 0 | 6 → 0 | no | exit=0 |
| shami-detect-01 | 71 → N/A | 71 → N/A | no | N/A |
| shami-rewrite-01 | 57 → 16 | 57 → 16 | no | N/A |
| shami-edit-01 | 14 → 14 | 14 → 14 | no | exit=0 |
| shami-seo-01 | 20 → 14 | 20 → 14 | no | exit=0 |

(`shami-rewrite-01`'s iteration-1 "before" score is shown here as 57, taken
directly from `evals/runs/iteration-1/shami-rewrite-01/scores-before.json`;
`SUMMARY-egt-shami.md`'s table wrote 71 for that row, which is
`shami-detect-01`'s score, apparently copied across rows — a documentation
typo, not a scoring discrepancy. See `evals/runs/iteration-1/SELF-ASSESSMENT.md`.)

## What changed, and why

Only two of the sixteen evals changed, and both are exactly the ones the
lexicon fix targets:

- **`msa-edit-01`**: its input paragraph opens with `"من الجدير بالإشارة أن
  اعتماد نهج موحّد وشامل..."`. In iteration-1, `detect.js` did not recognize
  this hedge phrase, so the "before" score was `0`/`HUMAN` even though the
  eval's own `expected` block calls it a P1 finding — the scoring gap
  documented as a confirmed defect in
  `evals/runs/iteration-1/SELF-ASSESSMENT.md`. With the lexicon fix, the
  same input now scores `6` and the `msa-leakage`/`AR-SH-001` hedge is
  itemized in `issues`. The edited version still scores `0`, so the
  before→after delta is now a real, mechanically-verified improvement
  (`6 → 0`) instead of a flat `0 → 0` that had to be explained in prose.
  `validate.js`'s `detector-score` check now reads "did not worsen: 6 → 0"
  instead of "6 → 0" being unavailable as an improvement signal.
- **`msa-seo-01`**: its input contains the same `AR-SH-001`-family hedge
  construction in one of its sections. The lexicon fix moved its "before"
  score from `6` to `9`; the "after" score stays `0`. `validate.js` still
  passes with exit code 0 and 0 violations, 0 warnings, same as
  iteration-1.

No other eval's before or after score, `validate.js` verdict, or exit code
changed. In particular, all four `egt-*` and all four `shami-*` evals'
scores are byte-identical to iteration-1 — their inputs don't contain the
two newly added hedge phrases, so the lexicon fix has no effect on them.
This is expected: the fix only touches the `AR-SH-001` phrase list, which
these two MSA evals happened to trigger and the others did not.

## Not re-checked here

This is a scores-only re-run. It does not re-grade the other six Phase 9
checklist items (meaning/facts preserved, protected spans untouched, output
contract, second-pass presence, or native-reader naturalness) — those
judgments, including all 12 `NEEDS-NATIVE-REVIEW` flags from iteration-1,
stand unchanged and are not re-verified by this script-only pass. See
`evals/runs/iteration-1/SELF-ASSESSMENT.md` for the full checklist grading.
