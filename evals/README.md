# humanizer-pro evals

This directory holds the qualitative eval set for `skills/humanizer-pro/`
(Phase 9 of `docs/BUILD-PROMPT.md`). It is a prompt-and-input set to be run
manually, as a real user of the skill would — there is no automated grader
for the humanized output itself, since judging "does this read as human" is
exactly what the skill (and Claude) does, not what a script does.

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
