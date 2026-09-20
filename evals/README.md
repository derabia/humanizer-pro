# humanizer-pro evals

This directory holds the qualitative eval set for `skills/humanizer-pro/`
(Phase 9 of `docs/BUILD-PROMPT.md`). It is a prompt-and-input set to be run
manually, as a real user of the skill would — there is no automated grader
for the humanized output itself, since judging "does this read as human" is
exactly what the skill (and the agent running it) does, not what a script does.

## Files

```
evals/
  evals.json              the 16 eval entries (schema below)
  inputs/                 one realistic input file per eval, plus
                           .keywords.txt (seo evals) and .voice.md
                           (voice-sample evals)
  runs/
    iteration-N/
      <eval-id>/
        output.md          the agent's full response for that eval
        scores-before.json detect.js run on the input
        scores-after.json  detect.js run on the rewritten/edited output
        validate.txt        validate.js output (edit / seo evals only)
      SELF-ASSESSMENT.md    builder self-assessment for that iteration
```

`evals/runs/` is intentionally empty until iteration 1 is actually run.

## `evals.json` schema

Each entry:

```json
{
  "id": "en-rewrite-01",
  "lang": "en",
  "variety": null,
  "mode": "rewrite",
  "seo": false,
  "voiceSample": false,
  "thinContent": false,
  "prompt": "the exact user request",
  "inputFile": "evals/inputs/en-rewrite-01.md",
  "keywordsFile": null,
  "voiceSampleFile": null,
  "expected": {
    "reportLanguage": "en",
    "outputLanguage": "en",
    "outputVariety": null,
    "mustPreserve": ["facts/numbers/names that must survive"],
    "mustNotContain": ["forms the output must not contain"],
    "scoreShouldImprove": true,
    "notes": "what a grader looks for"
  }
}
```

`lang` is `en` or `ar`; `variety` is `null`, `msa`, `egt`, or `shami`.
`mode` is one of `detect`, `rewrite`, `edit` — `seo` is a modifier flag, not
a mode value (`modes.md` §"seo modifier"), so an eval can be e.g.
`mode: "edit", seo: true`.

## How to run one eval manually

1. Open `evals/evals.json` and pick an eval entry by `id`.
2. Start a fresh conversation with the skill loaded (or invoke it the way
   your host does — `/humanizer-pro` or equivalent).
3. Paste the eval's `prompt` exactly as written, then paste the contents of
   `inputFile`. If `keywordsFile` is set, also supply that file's contents
   (or attach it) the way you would for a real SEO request. If
   `voiceSampleFile` is set, paste it too, in the same message, the way the
   `prompt` implies ("here's a sample of how I write").
4. Let the agent run the skill to completion. Save its entire response,
   verbatim, to `evals/runs/iteration-N/<id>/output.md`.
5. Run the deterministic checks:
   ```
   node skills/humanizer-pro/scripts/detect.js evals/inputs/<id>.md --json \
     > evals/runs/iteration-N/<id>/scores-before.json

   # extract just the rewritten/edited text into a temp file first, then:
   node skills/humanizer-pro/scripts/detect.js <extracted-output>.md --json \
     > evals/runs/iteration-N/<id>/scores-after.json
   ```
   For `edit` and any `seo`-modified eval, also run:
   ```
   node skills/humanizer-pro/scripts/validate.js evals/inputs/<id>.md \
     <extracted-output>.md [--seo evals/inputs/<id>.keywords.txt] \
     > evals/runs/iteration-N/<id>/validate.txt
   ```
   If a shell isn't available in that environment, skip this step and note
   in the self-assessment that scoring/validation was model-only — never
   fabricate a score or exit code that wasn't actually produced.
6. Grade the run against the checklist below and record the result (pass /
   fail / needs-native-review) in
   `evals/runs/iteration-N/SELF-ASSESSMENT.md`, titled as a **builder
   self-assessment**, not an independent review.
7. Fix any failures in the skill's references/scripts, then re-run the
   failing evals as `iteration-(N+1)`. Stop when all evals pass or the
   remaining issue requires a native-speaker decision (flag it instead of
   guessing).

## Grading checklist

Verbatim from `docs/BUILD-PROMPT.md` §"Phase 9 — Evals (qualitative)":

- Meaning and facts preserved (no invented facts/quotes/numbers).
- Correct language/variety retained; no MSA leakage in dialect output.
- Output contract followed exactly.
- Protected spans untouched (SEO/edit).
- Second pass present and useful.
- Detector score improved or explanation given.
- Reads naturally to a native reader (flag uncertain Arabic for human
  review).

Use each eval's `expected` block (`mustPreserve`, `mustNotContain`,
`scoreShouldImprove`, `notes`) as the concrete instance of this checklist
for that specific input — the checklist above is the general rule, the
`expected` block is what it means for that eval.

## Coverage in this set

16 evals: 4 English, 4 MSA, 4 Egyptian, 4 Levantine. Modes: `detect` x4,
`rewrite` x6, `edit` x6 (each >= 3), `seo` modifier x5 (>= 3, spread across
`detect`/`rewrite`/`edit`). One `voiceSample` eval for English
(`en-rewrite-01`) and one for Egyptian (`egt-rewrite-01`). One
`thinContent` eval (`en-seo-01`), where the correct behavior is to flag the
thin sections in the report rather than pad them with invented specifics.

Run `node tools/check-evals.js` to verify this coverage against
`evals/evals.json` mechanically; see `docs/evidence/phase9-check-evals.txt`
for the last recorded run.

## Deterministic benchmark (IMP-04)

`evals/benchmark.json` holds one mechanical-invariant case per eval in
`evals/evals.json` (16 cases). It is **not** a substitute for the
qualitative grading above — it only catches the failure modes a script
actually can: an invented number, a candidate that just echoes the source,
a dropped protected span, or a detector score that got worse. Each case
carries:

- `required` — strings that must appear in the candidate.
- `forbidden` — strings that must not appear (literal `mustNotContain`
  entries from `evals.json` plus a small fixed list of English AI-isms /
  MSA-leakage tokens, for the language/variety of that case).
- `protected` — spans copied from the input that must survive verbatim
  (numbers, names, links, code, headings). For this dataset it is the same
  verified subset of `mustPreserve` as `required`; a few `mustPreserve`
  entries are intentionally excluded here because the real candidate
  legitimately re-flows or re-cases them (documented per-case in
  `_notes`).
- `minEditRatio` / `maxEditRatio` — a character-level edit-ratio window
  (normalized Levenshtein distance / max length) so a candidate that
  echoes the input fails `minEditRatio`, and one that rewrites far more
  than the mode calls for fails `maxEditRatio`. Bounds were derived by
  measuring the real iteration-1 candidates and leaving headroom; see
  `docs/evidence/round1-benchmark.txt`.
- `forbidUnexpectedNumbers` — every number in the candidate (Western or
  Arabic-Indic digits) must already appear in the input.
- `scoreMustNotWorsen` — `detect.js`'s score on the candidate must not
  exceed its score on the input, run with the case's `--lang`/`--variety`
  so auto-detection doesn't score the wrong engine.

Run it:

```
node evals/run-benchmark.js               # all 16 cases, human-readable table
node evals/run-benchmark.js --case msa-edit-01
node evals/run-benchmark.js --json        # machine-readable
```

Exit code is 1 if any case fails any applicable check. `tests/benchmark.test.js`
proves the invariants actually bite (an injected invented number, and a
verbatim echo of the source, are both constructed and asserted to fail) and
that the real iteration-1 candidates pass today. If a genuine invariant
failure shows up on real candidates, the fix is to fix the candidate or the
skill, not to loosen the invariant — record the failure in
`docs/evidence/round1-benchmark.txt` instead.

## Blinded pairwise kit (IMP-07)

`tools/prepare-pairwise.js` builds a blinded human-rating ballot from a
pairs spec:

```
node tools/prepare-pairwise.js --seed 42 --pairs evals/human/pairs.json --out evals/human/
```

This writes `evals/human/ballot.md` (Arabic + English instructions, then
each pair's original text plus its two candidates labelled "1" and "2" in
an order randomized from the seed, with a rating grid) and
`evals/human/key.json` (the seed plus, per pair, which label maps to which
candidate — the only place that mapping is recorded). Given the same seed
and the same `--pairs` spec, the output is byte-identical every time
(`tests/pairwise.test.js` proves this, proves different seeds diverge, and
proves no candidate-identifying path or the `key.json` A/B mapping ever
appears in `ballot.md`).

`evals/human/pairs.json` is the initial spec: input vs. the iteration-1
rewrite/edit for the 12 evals that produced one (the 4 `detect`-only evals
are skipped, since there is no second candidate to compare). Because
`candidateA` in that spec is always the unedited input itself, the ballot
omits the separate "original text" reference block for those pairs (it
would otherwise be visibly byte-identical to whichever label is the
original, defeating the blinding) and says so inline. A future spec with
two genuinely different candidates (e.g. two model versions) would show
the reference block normally.

See `docs/evidence/round1-pairwise.txt` for a dry run (seed 42, both a
determinism check via `sha256sum` across two runs and a different-seed
divergence check) and the test output.
