# Builder self-assessment (iteration 1) — not an independent review

This document was written by the same agent(s) that built and ran the
`humanizer-pro` skill. Every score, grade, and naturalness judgment below
was produced by the builder's own tooling and the builder's own agents —
**none of it has been checked by a person independent of this build, and
none of the Arabic naturalness judgments have been checked by a native
Arabic speaker.** Treat every PASS in the "reads naturally" column as
provisional until a native reviewer signs off; see
[Native review still pending](#native-review-still-pending) below.

Grading checklist (7 items) is Phase 9 of `docs/BUILD-PROMPT.md`:
1. Meaning and facts preserved (no invented facts/quotes/numbers).
2. Correct language/variety retained; no MSA leakage in dialect output.
3. Output contract followed exactly.
4. Protected spans untouched (SEO/edit).
5. Second pass present and useful.
6. Detector score improved or explanation given.
7. Reads naturally to a native reader (flag uncertain Arabic for human review).

Scores below are taken directly from each eval's `scores-before.json` /
`scores-after.json` (`.score` field) and `validate.txt` (last line), not
from prose recollection. Two numbers in `SUMMARY-egt-shami.md`'s table
disagreed with the underlying JSON — `shami-rewrite-01`'s "before" score was
written there as 71 (that is `shami-detect-01`'s score, apparently copied
across rows); the JSON file (`shami-rewrite-01/scores-before.json`) says 57.
This table uses the JSON value (57) and flags the discrepancy here for the
record; it does not change any grade or conclusion.

## Results table

| id | lang/variety | mode | score before→after | validate exit | checklist (1–7) | notes |
|---|---|---|---|---|---|---|
| en-detect-01 | en | detect | 17 → N/A (detect mode, no rewrite) | N/A | 1 PASS, 2 PASS, 3 PASS, 4 N/A, 5 N/A, 6 PASS, 7 PASS | English-only; no NEEDS-NATIVE-REVIEW possible or needed. |
| en-rewrite-01 | en | rewrite (voice sample) | 8 → 5 | N/A (not edit/seo) | 1–7 all PASS | 10-item internal checklist in grade.md, all PASS. |
| en-edit-01 | en | edit | 5 → 0 | exit=0 | 1–7 all PASS | 13-item internal checklist, all PASS; validator confirms code fence + table byte-identical. |
| en-seo-01 | en | rewrite+seo (thin content) | 0 → 0 | exit=0 | 1–7 all PASS (1 borderline judgment call, disclosed) | Correctly flagged missing substance rather than padding. |
| msa-detect-01 | ar/msa | detect | 59 → N/A (detect mode) | N/A | 1 PASS, 2 PASS, 3 PASS, 4 N/A, 5 N/A, 6 PASS, 7 NEEDS-NATIVE-REVIEW | — |
| msa-rewrite-01 | ar/msa | rewrite | 39 → 0 | N/A (not edit/seo) | 1–6 PASS, 7 NEEDS-NATIVE-REVIEW | — |
| msa-edit-01 | ar/msa | edit | 0 → 0 (detector gap; see below) | exit=0 | 1–6 PASS (score plateau explained, not a false claim), 7 NEEDS-NATIVE-REVIEW | Lexicon gap found here; fixed before iteration-2 (see below). |
| msa-seo-01 | ar/msa | edit+seo | 6 → 0 | exit=0 | 1–6 PASS, 7 NEEDS-NATIVE-REVIEW | — |
| egt-detect-01 | ar/egt | detect | 100 → N/A (detect mode) | N/A | 1–6 PASS, 7 NEEDS-NATIVE-REVIEW | Correctly identifies input as MSA dressed up, not clean Egyptian. |
| egt-rewrite-01 | ar/egt | rewrite (voice sample) | 52 → 2 | N/A (not edit/seo) | 1–6 PASS, 7 NEEDS-NATIVE-REVIEW | Second pass caught a real residual (uniform sentence rhythm) first pass missed. |
| egt-edit-01 | ar/egt | edit | 12 → 6 | exit=0 | 1–6 PASS, 7 NEEDS-NATIVE-REVIEW | Single in-scope paragraph edited; code fence + table byte-identical. |
| egt-seo-01 | ar/egt | rewrite+seo | 6 → 0 | exit=0 | 1–6 PASS, 7 NEEDS-NATIVE-REVIEW | One judgment call (keyword insertion into a pre-existing gap), disclosed in grade.md. |
| shami-detect-01 | ar/shami | detect+seo | 71 → N/A (detect mode) | N/A | 1–6 PASS, 7 NEEDS-NATIVE-REVIEW | Correctly flags full MSA reversion incl. doubled "علاوة على ذلك". |
| shami-rewrite-01 | ar/shami | rewrite | 57 → 16 | N/A (not edit/seo) | 1–6 PASS, 7 NEEDS-NATIVE-REVIEW | Score corrected from SUMMARY doc's 71 (copy-paste error) to the JSON's actual 57; conclusion unchanged. |
| shami-edit-01 | ar/shami | edit | 14 → 14 (flat) | exit=0 | 1–5 PASS, 6 PASS-WITH-EXPLANATION (documented leakage-gate limitation, not a defect), 7 NEEDS-NATIVE-REVIEW | See "Leakage gate" section below for the exact numbers. |
| shami-seo-01 | ar/shami | edit+seo | 20 → 14 | exit=0 | 1–6 PASS, 7 NEEDS-NATIVE-REVIEW | `msaLeakage.ratio` dropped fully to 0 here; headline score did move, unlike shami-edit-01. |

## Totals

- **16 / 16 evals: overall PASS** (0 overall FAIL). `shami-edit-01` carries an
  explicit **FLAG on the detector-score signal** (item 6), documented below
  as an engine limitation rather than a build defect — it is not counted as
  a FAIL.
- **Checklist items across all 16 evals:** every applicable item PASS except:
  - Item 6 ("detector score improved or explanation given"): 15 PASS,
    1 PASS-WITH-EXPLANATION (`shami-edit-01`).
  - Item 7 ("reads naturally to a native reader"): **12 of 12 Arabic evals**
    (all `msa-*`, `egt-*`, `shami-*`) are marked **NEEDS-NATIVE-REVIEW**; the
    4 English evals correctly show no such flag (English grading used the
    deterministic validator, not native-speaker judgment).
- **0 FAIL** on any checklist item in any eval.

## Every NEEDS-NATIVE-REVIEW item, with a pointer

All 12 are the same checklist item ("reads naturally to a native reader"),
one per Arabic eval, each because Arabic prose was generated and graded by a
non-native-Arabic-speaking agent, not because of a specific detected flaw:

| eval | pointer |
|---|---|
| msa-detect-01 | `evals/runs/iteration-1/msa-detect-01/grade.md` |
| msa-rewrite-01 | `evals/runs/iteration-1/msa-rewrite-01/grade.md` |
| msa-edit-01 | `evals/runs/iteration-1/msa-edit-01/grade.md` |
| msa-seo-01 | `evals/runs/iteration-1/msa-seo-01/grade.md` |
| egt-detect-01 | `evals/runs/iteration-1/egt-detect-01/grade.md` |
| egt-rewrite-01 | `evals/runs/iteration-1/egt-rewrite-01/grade.md` (flags "بيتخانق" specifically as plausible-but-unverified) |
| egt-edit-01 | `evals/runs/iteration-1/egt-edit-01/grade.md` |
| egt-seo-01 | `evals/runs/iteration-1/egt-seo-01/grade.md` |
| shami-detect-01 | `evals/runs/iteration-1/shami-detect-01/grade.md` |
| shami-rewrite-01 | `evals/runs/iteration-1/shami-rewrite-01/grade.md` |
| shami-edit-01 | `evals/runs/iteration-1/shami-edit-01/grade.md` |
| shami-seo-01 | `evals/runs/iteration-1/shami-seo-01/grade.md` |

Every one of the 8 `egt-*`/`shami-*` output files also carries its own
`<!-- NATIVE-REVIEW: ... -->` marker directly in `output.md` (line 1),
independent of the grade.md flag — see `docs/native-review/evals.md` for the
consolidated list with exact paths.

## Skill defects found by the runners, and what was done

1. **Lexicon gap (confirmed defect, fixed).** `msa-edit-01`'s runner found
   that `skills/humanizer-pro/scripts/lib/ar-detector/lexicons.js`'s
   `AR-SH-001` hedge-phrase list had `'من الجدير بالذكر'` but not the equally
   common variant `'من الجدير بالإشارة'`, so the eval's input paragraph
   (which opens with exactly that phrase, and which the eval's own
   `expected` block calls a P1 finding) scored `0`/`HUMAN` from `detect.js`
   instead of registering the hedge. **Status: fixed.** The lexicon now
   contains `'من الجدير بالإشارة'` and `'يجدر بالإشارة'`
   (`skills/humanizer-pro/scripts/lib/ar-detector/lexicons.js:105-106`, each
   commented `// eval msa-edit-01 finding`). Re-scored in iteration-2 — see
   `evals/runs/iteration-2/SELF-ASSESSMENT.md` for the corrected before-score.

2. **MSA-leakage headline-score gate (investigated, documented as a
   conservative threshold, not a defect).** `shami-edit-01`'s runner found
   that fixing a textbook MSA-reversion paragraph inside an otherwise
   dialectal document dropped `stats.msaLeakage.ratio` from 0.3 to 0.1 but
   left the headline `score` flat at 14 both before and after. Per
   `skills/humanizer-pro/scripts/README.md` (signal `g`, MSA-leakage ratio,
   and the "score floors, leakage excluded (gate 2)" section), the engine
   only scores an `msa-leakage`/dialect-variety issue once a paragraph
   clears **≥ 4 total MSA function-word hits**, then tiers it **P0 at ratio
   ≥ 0.75** or **P1 at ratio ≥ 0.5**. `shami-edit-01`'s single offending
   paragraph had 3 MSA hits before the edit (ratio 1.0, but below the 4-hit
   floor) and the surrounding document is mostly dialect, so the ratio and
   hit-count gate that exists specifically to stop a short leaking span from
   swinging the whole-document score never engaged — this is the documented
   "score floors, leakage excluded" behavior working as designed, not a
   scoring bug. **Status: documented, not changed.** Left as a known weak
   spot: the engine's before/after score is not always a reliable
   improvement signal for a single short MSA paragraph embedded in a longer
   dialectal document; `stats.msaLeakage.ratio` is the more sensitive signal
   in that specific case and is what the eval's own `grade.md` reports
   instead.

No other defect was confirmed in any reference file (`core-principles.md`,
`precedence.md`, `modes.md`, `seo-mode.md`, `voice-matching.md`,
`en-patterns.md`, `en-vocabulary.md`, `ar-shared.md`, `ar-msa.md`,
`ar-egyptian.md`, `ar-levantine.md`) or in `validate.js` across all 16 runs.

## Native review still pending

All 12 Arabic evals' "reads naturally to a native reader" judgments were
made by the builder's own (non-native-Arabic-speaking) grading agent, using
its own linguistic knowledge, not a native Arabic speaker's judgment. This
self-assessment does not certify Arabic naturalness for any variety,
including MSA. Levantine (`shami`) coverage is additionally marked
experimental by the skill itself (`ar-levantine.md`), which every
`shami-*` eval's `output.md` repeats via its `<!-- NATIVE-REVIEW: shami —
... تجريبية ... -->` marker. No claim in this document, `SUMMARY-en-msa.md`,
or `SUMMARY-egt-shami.md` should be read as native-speaker-verified.
