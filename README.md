# humanizer-pro

A skill for Claude (and other agent hosts that read `SKILL.md`-style
skills) that humanizes AI-generated writing and strips AI-isms, in
English and Arabic. It works as a router: it picks a mode (detect,
rewrite, edit, plus an SEO modifier), identifies the language and
Arabic variety, loads only the reference files that situation needs,
and runs that mode's contract. Arabic support covers فصحى (Modern
Standard Arabic), مصري (Egyptian) and شامي (Levantine), with automatic
variety detection and rules against MSA vocabulary leaking into
dialect output.

It never invents facts, quotes, statistics, sources, or personal
experience to make a text read as more human, and it never helps
evade academic-integrity rules, plagiarism checks, or AI-detection
policies. If a request amounts to "make this pass a detector," the
skill says so and stops instead of complying.

## Status

v0.2.0-build; builder self-assessed only, not independently reviewed;
Levantine Arabic experimental pending native review.

This is not a production-ready release. It has not been reviewed by
anyone outside the build sessions that produced it. The Arabic
detector's false-positive rate is now measured against a 300-document
corpus of pre-2022 human Arabic, and its weights and thresholds are
still reasoned from doctrine rather than fitted to data. Read
`docs/REVIEW-HANDOFF.md` and `docs/NATIVE-REVIEW.md` before relying on
it for anything that matters.

### What changed in round 1

- **A measured false-positive rate.** `corpus/` holds 300 Arabic
  Wikimedia documents (230 encyclopedic, 70 news) whose revisions all
  predate 2022-11-30, so any `AI` verdict on one is a false positive by
  construction. `node tools/fp-measure.js` reports 0 of 300 flagged,
  Wilson 95% upper bound 1.26%, down from 5 of 300 at the start of the
  round. Quote the upper bound, not the zero: 300 documents cannot
  separate a true rate of 0% from one of 1%, the corpus covers two
  registers of Wikimedia text, and there is no dialect corpus and no
  true-positive corpus.
- **Two fixes the corpus paid for.** Nine Arabic dialect markers turned
  out to be MSA homographs in every one of their 102 corpus hits
  (`دي` as Latin "de", `إيه` as the A of CIA), and they no longer count
  as dialect evidence. Separately, no single pattern can now push a
  document past `HUMAN` on its own, however often it fires.
- **`evals/benchmark.json` and `evals/run-benchmark.js`**: 16
  deterministic cases, each with required and forbidden strings,
  protected spans, a minimum edit ratio, and a check that fails on any
  number the rewrite invented. All 16 pass.
- **Self-scan with budgets.** `npm run self-scan` runs the detector over
  30 of this repository's own files and fails when a file drifts past
  its recorded budget. Both engines honour ignore regions
  (`<!-- humanizer:ignore -->` ... `<!-- /humanizer:ignore -->`), which
  the reference files need, since they quote the bad examples they warn
  against.
- **Test count 114 to 226**, plus a fidelity check for names, dates and
  citations on every validator run, a formal-register profile for
  Arabic, and `authorshipClaim: false` on every `--json` report.

Round 1 did not close four things, and all four are waiting on a person
rather than on code: the native-speaker ballots under
`docs/native-review/` (18 Egyptian items, 35 Levantine) are unfilled,
the blinded pairwise kit has never been run by a reviewer, the CI
workflow has never executed because nothing has been pushed to a
remote, and nothing is tagged or published. See
`docs/REVIEW-HANDOFF.md` section 7, "Round-1 acceptance".

## What's in the box

`skills/humanizer-pro/` is a self-contained skill folder: `SKILL.md`,
Markdown reference files, and a small set of zero-dependency Node
scripts. There is nothing to `npm install`. The rest of this
repository (`docs/`, `tools/`, `tests/`, `_sources/`) is the build's
own scaffolding, not part of what you install into a host.

## Install

Clone the repository first:

```bash
git clone https://github.com/derabia/humanizer-pro.git
```

```powershell
git clone https://github.com/derabia/humanizer-pro.git
```

Then pick the section for your host. In every case (other than the
Claude Code plugin path and the Claude-apps zip) you are copying the
single folder `skills/humanizer-pro/` into a location that host scans
for skills.

### Codex

Project-scoped: `.agents\skills\humanizer-pro\`. Global:
`%USERPROFILE%\.agents\skills\humanizer-pro\`.

Windows (PowerShell):

```powershell
Copy-Item -Recurse -Force .\humanizer-pro\skills\humanizer-pro '.\.agents\skills\humanizer-pro'
Copy-Item -Recurse -Force .\humanizer-pro\skills\humanizer-pro "$env:USERPROFILE\.agents\skills\humanizer-pro"
```

macOS/Linux:

```bash
cp -R ./humanizer-pro/skills/humanizer-pro .agents/skills/humanizer-pro
cp -R ./humanizer-pro/skills/humanizer-pro ~/.agents/skills/humanizer-pro
```

### Claude Code

Project-scoped: `.claude\skills\humanizer-pro\`. Global:
`%USERPROFILE%\.claude\skills\humanizer-pro\`.

Windows (PowerShell):

```powershell
Copy-Item -Recurse -Force .\humanizer-pro\skills\humanizer-pro '.\.claude\skills\humanizer-pro'
Copy-Item -Recurse -Force .\humanizer-pro\skills\humanizer-pro "$env:USERPROFILE\.claude\skills\humanizer-pro"
```

macOS/Linux:

```bash
cp -R ./humanizer-pro/skills/humanizer-pro .claude/skills/humanizer-pro
cp -R ./humanizer-pro/skills/humanizer-pro ~/.claude/skills/humanizer-pro
```

**As a Claude Code plugin instead of a folder copy.** `.claude-plugin/`
ships `marketplace.json` (catalog name `humanizer-pro`) and
`plugin.json` (plugin name `humanizer-pro`), so the marketplace-add
form works once this repository is reachable at the URL above. This
install syntax is not exercised by any script in this repository (no
CI run has published or installed the plugin yet); it is the
documented convention used by comparable Claude Code plugin repos
under `_sources/competitors/` (`finestructure-ai_humanizer-multilingual`
and `sawradip_rehumanize`), applied to this repo's own manifest names:

```
/plugin marketplace add derabia/humanizer-pro
/plugin install humanizer-pro@humanizer-pro
```

### Cursor

Cursor's skills/rules directory has changed across versions: see
Cursor's own docs for the current location before copying anything
in. Once you know that path, the same copy pattern applies:

```powershell
Copy-Item -Recurse -Force .\humanizer-pro\skills\humanizer-pro '<cursor-skills-dir>\humanizer-pro'
```

```bash
cp -R ./humanizer-pro/skills/humanizer-pro <cursor-skills-dir>/humanizer-pro
```

### Claude apps (claude.ai, desktop, mobile)

Claude apps take a custom skill as a zip upload, not a folder copy.
Build it with `npm run build:zip`, which produces
`dist\humanizer-pro.zip` with `humanizer-pro/` as the archive root (so
`humanizer-pro/SKILL.md` is the top-level entry). Upload that file as
a custom skill from the app's skill-management screen. The build step
is the same command on every OS:

```powershell
cd humanizer-pro
npm run build:zip
```

```bash
cd humanizer-pro
npm run build:zip
```

### `npx skills add`

Once this repository is published to a registry `npx skills add`
recognizes: `npx skills add <repo>`. Not usable yet: publishing has
not happened.

## Examples

`docs/EXAMPLES.md` has a full installation-and-usage walkthrough with
real before/after pairs and scores for every supported language and
variety (English, MSA, Egyptian, Levantine), the SEO-safe mode, voice
matching, and a CLI cookbook with real command output. One teaser pair
from that file, both real:

English (`en-rewrite-01`), score 8 to 5:

> Before: "Basecraft's new onboarding module might possibly help teams
> who are potentially struggling with inconsistent ramp-up times,
> though results could vary..."
> After: "Basecraft's onboarding module is built for that gap. Ramp-up
> time varies by team size and role complexity, and by how good the
> existing documentation is..."

Egyptian (`egt-rewrite-01`), score 52 to 2:

> Before: "من المهم أن نتحدث اليوم عن سماعة...والتي تم إطلاقها الشهر
> الماضي..."
> After: "يعني خليني أحكيلكم عن سماعة...طلعت الشهر اللي فات..."

## Usage examples

The skill activates from natural language; no command syntax to memorize. It infers mode, language, and variety from the request.

### English

Detect (audit only, no rewrite):
> Does this paragraph read like it was written by AI? Score it.

Rewrite (default mode):
> Humanize this draft and remove the AI tone.

Edit a file in place:
> Clean up the AI-isms in README.md directly.

SEO-safe rewrite with keywords:
> Rewrite this blog post so it doesn't sound like AI, but don't touch
> the SEO: keep "budget travel insurance" as the primary keyword and
> "backpacker travel insurance" as a secondary one.

Voice matching from a sample:
> Here's a paragraph I wrote myself: [sample]. Rewrite the draft below
> to sound like that, not like a generic AI voice.

### Arabic

<!-- NATIVE-REVIEW: egt/msa -->

فصحى (MSA), auditing:
> هل ده كلام ذكاء اصطناعي؟ افحص النص وقيّم النص.

مصري (Egyptian), humanizing:
> خلي الكلام طبيعي وشيل أسلوب الذكاء الاصطناعي من النص ده.

شامي (Levantine, experimental: see Limitations):
> بدي إياه يبين مكتوب بإيد إنسان، شيل أسلوب الذكاء الاصطناعي.

SEO-safe Arabic rewrite:
> عايز المقال ده يبان مكتوب بإيد بني آدم بس من غير ما تلمس الكلمات
> المفتاحية.

The rewritten text stays in the language and dialect of the input
(Egyptian input comes back Egyptian, MSA comes back MSA), while report
headings follow the language of the request. Levantine output always
carries the experimental warning described in Limitations.

## CLI usage

The scripts also work standalone from `skills/humanizer-pro/scripts/`
(or via `npm run detect` / `npm run validate` from the repo root).
Both require Node >= 18, are CommonJS, and have zero npm dependencies.

### `detect.js`

```
node detect.js <file|-> [--lang en|ar] [--variety msa|egt|shami] [--json] [--markdown]
```

Scores one document for AI-writing tells and prints a report. Routes
to the English or Arabic detector engine and never edits anything.

- `<file>`: UTF-8 text or Markdown file; `-` reads stdin.
- `--lang en|ar`: force the engine instead of auto-detecting it.
- `--variety msa|egt|shami`: force the Arabic variety; implies `--lang ar`.
- `--json`: print the raw analysis object with a `lang` field in
  front, instead of the human-readable report.
- `--markdown`: analyse as *rendered* Markdown
  (`sourceMode: 'rendered-markdown'`) on either engine.

Exit codes: `0` always, including an `AI` verdict; `2` for an input
error (missing/unreadable file or stdin, unknown flag, bad
`--lang`/`--variety` value, no input argument).

### `validate.js`

```
node validate.js before.md after.md [--seo keywords.txt] [--json] [--lang en|ar] [--variety msa|egt|shami] [--strict-digits]
```

Compares an original document against a rewrite and fails when the
rewrite touched something it had no business touching, or when the
rewrite's AI-detector score got worse.

- `before.md` / `after.md`: required, in that order.
- `--seo keywords.txt`: one keyword per line, first line primary; enables the SEO checks.
- `--json`: machine-readable output.
- `--lang en|ar`, `--variety msa|egt|shami`: same as `detect.js`.
- `--strict-digits`: a digit-script change with the same value
  (Western `0-9` vs. Arabic-Indic/Extended Arabic-Indic) fails instead of warning.

Exit codes: `0` every check passed (warnings allowed); `1` at least
one check FAILED; `2` usage or input error.

See `skills/humanizer-pro/scripts/README.md` for the full check list,
JSON shapes, and Arabic-specific behavior (offset mapping, digit
handling, heading comparison).

## SEO mode

`seo` is a modifier, not a standalone mode: combine it with `detect`,
`rewrite`, or `edit`. It adds a protected-spans list and an SEO check.
Protected spans:

- Target and secondary keywords, from the user's list or confirmed
  detection, never invented from the prose itself.
- Heading hierarchy and heading text, especially where a heading
  carries a target keyword.
- Internal and external links, anchor text, and URLs.
- Image alt text, captions, and file names.
- JSON-LD/schema blocks, FAQ blocks, tables, shortcodes, WordPress
  block comments, and HTML attributes.
- Meta title and description in frontmatter.

The validator backs this up: keyword presence, keyword placement
(title/H1, first 100 words, each H2 that had it), stuffing (count more
than doubling), and thin sections (any heading's body under 40 words,
always a warning, never a failure).

## Limitations

- **Levantine Arabic is experimental.** `ar-levantine.md` has not had
  a native review, and its three regional sub-variants (Syrian,
  Lebanese, Palestinian) are treated as one variety. Say so whenever
  Levantine text is delivered.
- **Dialect identification on short texts is unreliable.** Routing
  needs two distinct dialect markers at a density of one per 100
  Arabic words before it leaves the MSA default; short snippets
  usually get analyzed as MSA. Pass `--variety` when you know it.
- **The detector is heuristic, not proof of authorship.** Scores come
  from a weighted phrase-and-signal model. Its false-positive rate is
  measured (`corpus/RESULTS.md`); its weights, tier values and label
  thresholds are not fitted to data, and every `--json` report carries
  `authorshipClaim: false` and `calibration:
  uncalibrated-review-signal` for that reason. A low score is not
  evidence of human authorship, nor a high score proof of AI origin.
- **Nothing measures whether the detector catches AI text.** The corpus
  measures false positives only. True-positive behaviour rests on this
  repository's own synthetic AI fixtures.
- **Most human fixtures are still synthetic, and pending native
  review.** Every Arabic human-style fixture under
  `tests/fixtures/ar-*/human-*.md` was written for this project, not
  sampled from native writing, and is listed in
  `docs/native-review/fixtures.md`. Two sourced exceptions exist,
  `tests/fixtures/human-sourced/msa-01.md` and `egt-01.md`. There is no
  sourced Levantine fixture: paragraph-length published Levantine prose
  that can be cached under a usable licence was searched for and not
  found, so Levantine is the least evidenced of the three varieties.
- **Node 18 compatibility is a target, not a verified fact.** The code
  avoids anything newer than Node 18 by design, but this build ran
  only on Node 25; no real Node 18 run has been performed here.

## Repository layout

```
skills/humanizer-pro/     the installable skill (see Install above)
  SKILL.md                 router: modes, language ID, precedence, workflow
  references/               core-principles, modes, precedence, voice-matching,
                             seo-mode, en-patterns, en-vocabulary, ar-shared,
                             ar-msa, ar-egyptian, ar-levantine
  scripts/                 detect.js, validate.js, lib/ (detector + validator)
  LICENSES/                 verbatim upstream MIT license texts
docs/
  ARCHITECTURE.md          how the build is actually laid out, and why
  PROVENANCE.md            pattern ID -> upstream file/line mapping (merged)
  CONFLICTS.md             every rule conflict and its resolution
  DEDUP-LOG.md             duplicate/near-duplicate patterns dropped
  DISCREPANCIES.md         upstream vs. build-prompt discrepancies
  NATIVE-REVIEW.md         everything flagged for native-speaker review
  REVIEW-HANDOFF.md        reproduction steps, decision register, weak spots
  evidence/                raw output backing every "passes/verified" claim
  provenance/, dedup-log/, native-review/, discrepancies/
                            per-area fragments merged into the docs above
corpus/                    Arabic false-positive corpus: manifest.json (300
                             pinned revisions), README.md, RESULTS.md;
                             raw/ is gitignored, re-fetch it
evals/                     benchmark.json + run-benchmark.js (16 deterministic
                             cases), human/ (blinded pairwise kit), runs/
tests/                     node --test suite, fixtures, fixtures/human-sourced/
tools/                     check-skill.js, check-upstream.js, merge-docs.js,
                             run-tests.js, fetch-corpus.js, fp-measure.js,
                             self-scan.js, prepare-pairwise.js, check-version.js
_sources/                  pinned upstream clones (gitignored, not shipped)
```

## Development

```
npm test
node tools/check-skill.js
node tools/check-upstream.js
node tools/merge-docs.js
node tools/check-version.js
node tools/check-node18.js
node tools/check-skill.js --refs
node tools/check-evals.js
node evals/run-benchmark.js
npm run self-scan
node tools/fetch-corpus.js && node tools/fp-measure.js
```

- `npm test`: runs `tools/run-tests.js`, which enumerates
  `tests/*.test.js` under Node's built-in test runner instead of
  `node --test tests/` directly, since directory-arg behavior differs
  across Node 18/20/current.
- `node tools/check-skill.js`: validates `SKILL.md` frontmatter and
  the reference cross-links inside the skill folder.
- `node tools/check-upstream.js`: compares SHAs pinned in
  `UPSTREAM.md` against each upstream repo's remote HEAD via `git
  ls-remote`, and lists which `docs/provenance/*.md` fragments depend
  on a repo that moved.
- `node tools/merge-docs.js`: concatenates the per-area fragments in
  `docs/provenance/`, `docs/dedup-log/`, `docs/native-review/`, and
  `docs/discrepancies/` into the canonical top-level `docs/*.md`
  files; run it after editing any fragment.
- `node tools/check-version.js`: asserts `package.json` version,
  `SKILL.md` frontmatter `metadata.version`, and the latest
  `CHANGELOG.md` heading agree (a `-build`/`-rc` suffix is tolerated);
  pass `--require-tag` to also require a matching git tag.
- `node tools/check-node18.js`: statically greps `skills/`, `tools/`,
  and `tests/` for JS/Node APIs newer than Node 18; a real Node 18 CI
  run is still the actual compatibility gate.
- `node tools/check-skill.js --refs`: also checks every pattern heading
  in `references/` against `docs/COVERAGE-MAP.md`.
- `node evals/run-benchmark.js`: runs the 16 deterministic cases in
  `evals/benchmark.json` and fails on a missing required string, a
  forbidden string, a touched protected span, an edit ratio below the
  case minimum, or a number the candidate invented.
- `npm run self-scan`: runs the detector over this repository's own
  Markdown and compares each file against `tools/self-scan-budgets.json`.
  Exits non-zero when a budget is exceeded. Both engines skip text
  between `<!-- humanizer:ignore -->` and `<!-- /humanizer:ignore -->`
  (or `<!-- humanizer-ignore-start -->` and
  `<!-- humanizer-ignore-end -->`), which is how the reference files
  quote bad examples without scoring for them.
- `node tools/fetch-corpus.js` then `node tools/fp-measure.js`: re-fetches
  the 300 pinned corpus revisions into the gitignored `corpus/raw/` and
  rewrites the measurement tables in `corpus/RESULTS.md`. Needs network
  access to the Wikimedia APIs.

## Credits and license

`humanizer-pro` itself is MIT licensed (see `LICENSE`). It merges and
adapts material from three upstream MIT-licensed repositories:

- **blader/humanizer**: pattern philosophy, base English pattern
  catalog, voice samples, and the seed precedence/mode structure.
- **conorbronsdon/avoid-ai-writing**: the three modes, the two-pass
  audit, tiered vocabulary, voice profiles, and the executable
  detector and preservation-validator engines.
- **OthmanAdi/humanizer-semitic**: MSA, Egyptian, and Levantine
  Arabic pattern content (Hebrew content from this source is
  explicitly not used).

Full commit-level provenance is in `docs/PROVENANCE.md`; pinned commit
SHAs and acquisition details are in `UPSTREAM.md`. Original license
text for each project is kept verbatim in
`skills/humanizer-pro/LICENSES/`, and adapted files carry their
original upstream headers. See `CREDITS.md` for the full breakdown.
