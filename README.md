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

v0.1.0-build; builder self-assessed only, not independently reviewed;
Levantine Arabic experimental pending native review.

This is not a production-ready release. It has not been reviewed by
anyone outside the build session that produced it, and the Arabic
detector's weights and thresholds are tuned against this repository's
own fixtures, not a measured corpus. Read `docs/REVIEW-HANDOFF.md` and
`docs/NATIVE-REVIEW.md` before relying on it for anything that matters.

## What's in the box

`skills/humanizer-pro/` is a self-contained skill folder: `SKILL.md`,
Markdown reference files, and a small set of zero-dependency Node
scripts. There is nothing to `npm install`. The rest of this
repository (`docs/`, `tools/`, `tests/`, `_sources/`) is the build's
own scaffolding, not part of what you install into a host.

## Install

Pick the section for your host. In every case you are copying the
single folder `skills/humanizer-pro/` into a location that host scans
for skills. Nothing needs building first, except the Claude-apps zip.

### Codex

Project-scoped: `.agents\skills\humanizer-pro\`. Global:
`%USERPROFILE%\.agents\skills\humanizer-pro\`.

### Claude Code

Project-scoped: `.claude\skills\humanizer-pro\`. Global:
`%USERPROFILE%\.claude\skills\humanizer-pro\`.

### Cursor

Cursor's skills/rules directory has changed across versions: see
Cursor's own docs for the current location before copying anything
in. The same copy step applies once you know that path.

### Claude apps (claude.ai, desktop, mobile)

Claude apps take a custom skill as a zip upload, not a folder copy.
Build it with `npm run build:zip`, which produces
`dist\humanizer-pro.zip` with `humanizer-pro/` as the archive root (so
`humanizer-pro/SKILL.md` is the top-level entry). Upload that file as
a custom skill from the app's skill-management screen.

### `npx skills add`

Once this repository is published to a registry `npx skills add`
recognizes: `npx skills add <repo>`. Not usable yet: publishing has
not happened.

### Copy commands

Windows (PowerShell), Claude Code project-scoped, then global:

```powershell
Copy-Item -Recurse -Force .\skills\humanizer-pro '.\.claude\skills\humanizer-pro'
Copy-Item -Recurse -Force .\skills\humanizer-pro "$env:USERPROFILE\.claude\skills\humanizer-pro"
```

macOS/Linux equivalent:

```bash
cp -R ./skills/humanizer-pro ~/.claude/skills/humanizer-pro
```

Swap `.claude\skills` for `.agents\skills` for Codex, project- or
user-scoped as shown above.

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
  from a weighted phrase-and-signal model tuned against this
  repository's own fixtures, not a measured corpus. A low score is not
  evidence of human authorship, nor a high score proof of AI origin.
- **Synthetic-human fixtures pending native review.** Every Arabic
  human-style fixture under `tests/fixtures/ar-*/human-*.md` was
  written for this project, not sampled from native writing, and is
  listed in `docs/native-review/fixtures.md`.
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
tests/                     node --test suite, fixtures
tools/                     check-skill.js, check-upstream.js, merge-docs.js, run-tests.js
_sources/                  pinned upstream clones (gitignored, not shipped)
```

## Development

```
npm test
node tools/check-skill.js
node tools/check-upstream.js
node tools/merge-docs.js
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
