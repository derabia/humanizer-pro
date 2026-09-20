# Discrepancies, round 1 doc-only wave (waveE)

Notes on places where the improvement-plan instructions (the competitive-analysis
document, kept outside the published repository, §6, IMP-11, 15, 16, 18, 19,
21, 22, 25, 26) did not match the actual shape of
the files being edited, and how this pass resolved each one.

## 1. Era tagging (IMP-21): 0 of 49 Tier 1A entries are sourced

Instruction: "add an Era column or tag to Tier 1A entries ONLY where
`_sources/avoid-ai-writing` or `_sources/blader` text supports a date or
model-generation note; otherwise tag `unknown`."

Grepped both source trees for year strings and vendor/model names, and
`generation` (case-insensitive). Two hits are date/model-generation notes,
and neither is attached to an individual Tier 1A word:

- `_sources/avoid-ai-writing/SKILL.md:182` dates the **em-dash frequency
  rule** ("usage has varied by model generation and vendor"), which is a
  formatting rule in `precedence.md` C-01, not a Tier 1A vocabulary entry.
- `_sources/avoid-ai-writing/references/patterns.md:41` dates the **Tier 1B
  false-positive test corpus** ("Measured against 257 paragraphs of
  verified pre-2023 human prose"), which describes the corpus used to
  validate Tier 1B's low false-positive rate, not any specific word's
  first-observed date, and it is Tier 1B, not 1A.
- `docs/inventory/blader.md:414` records a genuinely dated rule ("Text
  written before November 30, 2022 is not AI-written," the ChatGPT
  public-launch date), but it is blader's global "When not to act" carve-out
  for the whole skill, not a claim about any single Tier 1A word.

Result: all 49 Tier 1A rows in `en-vocabulary.md` are tagged `unknown` in
the new Era column. Zero rows had a sourced date to attach. This is
reported as the honest outcome, not a shortfall to fix by inventing dates.
`core-principles.md`'s never-invent rule applies to this project's own
documentation the same as it does to a humanized text.

## 2. Family taxonomy (IMP-15): heading level is `###`, not `##`, for the per-variety files

Instruction: "add a `**Family:**` line to every `## AR-` entry."

`ar-shared.md` entries are indeed `## AR-SH-NNN` (H2). But `ar-egyptian.md`
and `ar-levantine.md` use `### AR-EGT-NNN` / `### AR-SHM-NNN` (H3) for their
per-pattern headings; `## ` in those two files is reserved for the top-level
"Dialect markers" section. Treated the instruction as applying to the
pattern-entry heading regardless of its exact level (H2 in the shared file,
H3 in the two variety files), since the goal (a Family tag on every AR-*
pattern entry) is level-independent. `docs/COVERAGE-MAP.md` and
`tests/coverage-map.test.js` read the correct heading level per file.

## 3. Family assignment is this project's editorial judgment, not upstream-sourced

The five/six family names are borrowed from finestructure-ai's taxonomy
concept (credited in `ar-shared.md` and `precedence.md`), but which family
each of the 58 AR-SH/AR-EGT/AR-SHM entries belongs to is this project's own
read of each entry's "What it looks like" text, not a mapping stated in any
upstream source. Counts (AR-SH / AR-EGT / AR-SHM / total): `register-flattening`
3 / 17 / 20 / 40, `stock-units` 2 / 2 / 1 / 5, `typography` 0 / 5 / 4 / 9,
`calque` 1 / 2 / 0 / 3, `english-syntax` 1 / 0 / 0 / 1. No entry needed the
reserved sixth tag, `chatbot-residue`; all 58 fit one of the five.

The result skews heavily toward `register-flattening` because
`ar-egyptian.md` and `ar-levantine.md` are, in substance, mostly MSA-leakage
catalogs (a dialect text pulled toward formal MSA register), which is
exactly what that family name describes. This is reported rather than
rebalanced; forcing a more even distribution across families would
misdescribe what the patterns actually are.

## 4. Coverage-map classification (IMP-11) for `EN-*` is a correlation, not an ID lookup

`scripts/lib/en-detector/index.js` does not tag any issue with an `EN-NNN`
ID; it uses its own `type`/`category` strings (`em-dash`, `hedge-stack`,
`negation-chain`, etc.). `docs/COVERAGE-MAP.md` marks an `EN-*` pattern
`signal` only where this project judged a category name plausibly
corresponds to that catalog entry's title, and says so in the map's own
header note. Every `EN-*` pattern without a clearly-corresponding category
name is marked `judgment-only`, per the instruction to default to
`judgment-only` when unsure. 36 of 55 `EN-*` entries were marked `signal`
this way; 19 are `judgment-only`.

## 5. `--mode rewrite` flag: written around its absence, then it landed mid-pass

At the time `modes.md` and `SKILL.md` §7 were first drafted in this pass,
`scripts/validate.js` (off-limits to edit here) had no `--mode` flag, so
both files documented the "recommended for every rewrite" rule using only
the validator's existing positional CLI (`before.md after.md`), without a
flag. A concurrent scripts-touching pass then added exactly this flag
(`--mode rewrite|edit|seo`, defaulting to `seo` when `--seo` is given, else
`edit`), with its own docstring citing `references/modes.md` and
`SKILL.md` step 6 as the source of the "recommended for every rewrite"
wording, which confirms the two passes converged on the same contract
independently. `modes.md`'s "Verify with the validator" section and
`SKILL.md` §7 were re-read against the landed flag afterward; both remained
accurate as written (they describe the requirement, not the exact flag
syntax) and were left as-is rather than hand-edited to a moving target
mid-pass. A follow-up documentation touch could add the explicit
`--mode rewrite` example to both files once the scripts wave is confirmed
stable.

## 6. Per-vendor manifests were removed after the round-1 runs that reference them

Three per-vendor manifest paths, one per host, existed at the
time of `docs/evidence/round1-npm-pack.txt` and the passages in
`docs/BUILD-PROMPT.md:264` (frozen, not edited for this) that mention a
host-specific plugin manifest. The project owner objected to per-vendor
manifest files at the repo root, so a later pass removed all three and
replaced them with `tools/install.js`, a single neutral installer. That
evidence file and `docs/BUILD-PROMPT.md` were originally left as captured;
this entry recorded that their manifest references were stale. A later
neutrality scrub (see §7 below) regenerated `round1-npm-pack.txt` and
lightly edited `docs/BUILD-PROMPT.md` in place, so both now also postdate
the manifest removal rather than merely being stale about it.

## 7. Neutrality scrub (vendor-name removal from tracked files)

- `docs/evidence/round1-waveA-checks.txt` was deleted rather than
  regenerated. It contained a stale per-vendor manifest version line
  (a vendor plugin manifest's version) from `check-version.js`
  before that check was simplified, and it was not cited as proof of any
  specific acceptance criterion in `docs/REVIEW-HANDOFF.md` (only
  `round1-final-checks.txt`, the later closing-checks capture, is cited
  that way). Its content is superseded by `round1-final-checks.txt`.
- `docs/evidence/round1-final-checks.txt`, `docs/evidence/round1-npm-pack.txt`,
  and `docs/evidence/round1-pairwise.txt` were regenerated by re-running the
  commands they record, because each is cited in `docs/REVIEW-HANDOFF.md` as
  evidence for an acceptance item. The only substantive change is that
  scratch-directory paths that happened to embed a coding-agent vendor's name
  (an unrelated tool's OS temp-folder name, not a project reference) now use a
  project-local `_local/tmp/` directory instead; hashes, exit codes, and
  pass/fail outcomes are unchanged.
- `docs/evidence/phase11-acceptance.txt` was not regenerated. One line deep
  inside it is the literal, unedited output of `git show --stat da36da5`,
  which prints an actual commit trailer from this repository's own git
  history naming the model that authored that commit. That trailer is a
  fact of the existing commit object; re-running the same command against
  the same commit reproduces the identical line, and this task does not
  rewrite git history. The single trailer line was therefore redacted in
  place with a note, rather than the vendor name being silently reproduced
  or the whole 650-line multi-command capture being deleted or
  fabricated-fresh.
