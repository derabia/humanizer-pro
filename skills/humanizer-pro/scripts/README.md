# scripts/

`origin: humanizer-pro` unless noted. Node >= 18, CommonJS, zero npm
dependencies.

## validate.js

`node validate.js before.md after.md [--seo keywords.txt] [--json] [--lang en|ar] [--variety msa|egt|shami] [--strict-digits]`

Compares an original document against a rewrite and fails when the rewrite
touched something it had no business touching, or when the rewrite's
AI-detector score got worse. Built on two layers:

- `lib/en-validate.js` — adapted verbatim from avoid-ai-writing's
  `detector/validate.js` (MIT). Not edited by this script; wrapped as-is.
  Covers: fenced code blocks, inline code, YAML frontmatter, blockquotes,
  Markdown tables, URLs (AI-tracking query parameters stripped from both
  sides before comparison), file paths, and heading count/nesting.
- `lib/validate-extra.js` — humanizer-pro original. Adds the SEO-mode
  protected spans from `references/seo-mode.md` that the upstream
  validator has no concept of, plus an Arabic-aware replacement for the
  heading-wording and number comparisons.

### Usage

```
node validate.js before.md after.md
node validate.js before.md after.md --seo keywords.txt
node validate.js before.md after.md --json
node validate.js before.md after.md --lang ar --variety egt
node validate.js before.md after.md --strict-digits
```

- `before.md` / `after.md` — required positional arguments, in that order.
- `--seo keywords.txt` — one target/secondary keyword per line, first line
  is the primary keyword. Enables the `seo-*` checks below. Blank lines
  and lines starting with `#` are ignored.
- `--json` — machine-readable output: `{ ok, checks: [{name, status,
  details}], scores: {before, after}, lang, variety }`.
- `--lang en|ar` — force the language instead of auto-detecting it (via
  `lib/lang.js`, run against the `before` text) for the detector-score
  comparison and the Arabic-aware checks.
- `--variety msa|egt|shami` — force the Arabic dialect passed to the
  Arabic detector engine when `--lang ar` is in effect (or was
  auto-detected). Ignored for English.
- `--strict-digits` — a rewrite that changes a number's digit system
  (Western `0-9` ↔ Arabic-Indic `٠-٩` / Extended Arabic-Indic `۰-۹`)
  without changing its value fails instead of warning. See "Arabic digit
  handling" below.

### Exit codes

- `0` — every check passed (warnings may still be present).
- `1` — at least one check FAILED.
- `2` — usage or input error (wrong argument count, unreadable file, bad
  flag value, empty `--seo` keyword file).

### Checks

Each check appears in the report/`--json` output as one of
`PASS` / `FAIL` / `WARN`. `FAIL` on any check makes the run exit `1`;
`WARN` never affects the exit code.

| check | status meaning | source |
|---|---|---|
| `code-blocks` | fenced code block(s) added, removed, or edited | en-validate.js |
| `frontmatter` | YAML frontmatter block changed at all | en-validate.js |
| `blockquotes` | blockquote content changed or removed | en-validate.js |
| `table-cells` | Markdown table content changed or removed | en-validate.js |
| `inline-code` | inline `` `code` `` span removed | en-validate.js |
| `urls` | a URL was removed or altered (AI-tool tracking parameters excluded from comparison) | en-validate.js |
| `file-paths` | a file path was removed or altered | en-validate.js |
| `json-ld` | a `<script type="application/ld+json">…</script>` block changed | validate-extra.js |
| `shortcodes` | a `[shortcode …]` token changed (Markdown links `[text](url)` are not shortcodes and are excluded) | validate-extra.js |
| `wp-comments` | a `<!-- wp:… -->` / `<!-- /wp:… -->` block comment changed | validate-extra.js |
| `html-attributes` | an HTML tag's attributes changed on a kept tag | validate-extra.js |
| `image-alt-captions` | a Markdown image's alt text, title/caption, or file name changed | validate-extra.js |
| `link-anchor-internal` | an internal link was deleted, or any link's anchor text changed | validate-extra.js |
| `frontmatter-meta` | frontmatter `title`/`description`/`meta_title`/`meta_description` changed | validate-extra.js |
| `heading-structure` | heading count/nesting changed (FAIL); wording changed after Arabic-normalization comparison (WARN) | validate-extra.js (Arabic-aware; supersedes en-validate.js's heading check) |
| `numbers` | a number's value changed or was removed (FAIL); digit system changed with the same value (WARN, or FAIL under `--strict-digits`) | validate-extra.js (Arabic-aware) |
| `seo-keyword-presence` | (only with `--seo`) a keyword present in the original is entirely absent from the rewrite | validate-extra.js |
| `seo-keyword-placement` | (only with `--seo`) the primary keyword dropped out of the title/H1, the first 100 words, or every H2 where it used to appear | validate-extra.js |
| `seo-stuffing` | (only with `--seo`) a keyword's occurrence count more than doubled | validate-extra.js |
| `seo-thin-sections` | (only with `--seo`) a heading's section shrank below 40 words — always WARN, never FAIL | validate-extra.js |
| `detector-score` | the rewrite's AI-detector score is higher (more AI-like) than the original's | validate.js, via `lib/en-detector` or `lib/ar-detector` |

### SEO keyword semantics (`--seo keywords.txt`)

Keywords are read one per line; the first non-blank, non-`#` line is the
**primary** keyword, the rest are secondary. Per `references/seo-mode.md`:

- **Presence.** Every keyword present in the original body must still
  appear somewhere in the rewritten body. Missing entirely → `seo-keyword-presence` FAIL.
- **Placement.** The primary keyword is checked in three checkpoints:
  the title (frontmatter `title` + H1 text combined), the first 100 words
  of the body, and the text of every H2. A checkpoint only has to be kept
  if the keyword was present there in the original — e.g. if the primary
  keyword was never in an H2 to begin with, losing it from H2 text is not
  a failure. Any checkpoint that regresses → `seo-keyword-placement` FAIL.
- **Stuffing.** For each keyword, if it occurred at least once in the
  original, its occurrence count in the rewrite must not exceed 2× the
  original count. Exceeding that → `seo-stuffing` FAIL. A keyword absent
  from the original is not checked for stuffing.
- **Thin sections.** Any heading's body section under 40 words is
  reported — never a failure, always `seo-thin-sections` WARN, so a
  legitimately short section is visible but never blocks a rewrite from
  passing.

Body text for all of the above excludes YAML frontmatter and fenced/inline
code, matching the "structured block, not prose" principle the base
validator already applies to code fences and frontmatter.

### Arabic digit handling

Numbers are extracted with a digit class covering ASCII `0-9`,
Arabic-Indic `٠-٩` (U+0660–U+0669), and Extended Arabic-Indic `۰-۹`
(U+06F0–U+06F9), along with their thousands/decimal/percent separators
(`,` `٬` `٫` `%` `٪`). Comparison happens on the value after mapping every
digit to its Western form:

- A number whose **value** is missing or changed in the rewrite → `numbers` FAIL, regardless of digit script.
- A number whose value is unchanged but whose **digit script** changed
  (e.g. `220` → `٢٢٠`) → `numbers` WARN by default. This reflects that
  a script change alone is often an intentional localization choice, not
  a content error.
- Pass `--strict-digits` to make a pure digit-script change fail instead
  of warn.

### Heading comparison (Arabic-aware)

Heading **count** and **nesting level** changing between the two
documents is always a FAIL — restructuring is out of scope for a
validated rewrite. Heading **text** changing is only a WARN, and the
comparison runs both sides through `lib/arabic-normalize.js` first (strip
tashkeel/tatweel, unify alef forms, unify alef maqsura) so a heading whose
Arabic diacritics or alef-form spelling shifted, but whose wording did
not, is not reported as reworded. This normalization is a no-op on
non-Arabic text.

### Detector score comparison ("score comparison skipped" behaviour)

`validate.js` routes to the matching AI-detection engine to compare
`before` and `after`:

- `--lang en` (or auto-detected `en`/no strong Arabic signal) uses
  `lib/en-detector/index.js`.
- `--lang ar` (or auto-detected `ar`/`mixed`) uses
  `lib/ar-detector/index.js` with the resolved `--variety` (defaulting to
  the language-ID's detected variety, or `msa`).
- Language auto-detection runs `lib/lang.js`'s `identify()` against the
  `before` text once and applies the same engine to both files.

If the required engine module cannot be `require()`'d (for example,
`lib/ar-detector/` not yet present in a partial build) or the engine
throws while analyzing either text, the `detector-score` check reports
**PASS** with details `"Score comparison skipped: … (not computed)"` and
`scores: {before: null, after: null}` in `--json` output — a missing
engine is never treated as a validation failure. When the engine is
available, the check FAILs if the rewrite's score is higher (more
AI-like) than the original's by any amount, and PASSes otherwise
(equal or improved).
