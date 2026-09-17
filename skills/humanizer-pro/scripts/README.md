# scripts/

`origin: humanizer-pro` unless noted. Node >= 18, CommonJS, zero npm
dependencies.

## detect.js

`node detect.js <file|-> [--lang en|ar] [--variety msa|egt|shami] [--json] [--markdown]`

Scores one document for AI-writing tells and prints a report. It routes to
one of two engines and never edits anything.

- `<file>` — path to a UTF-8 text or Markdown file. `-` reads the document
  from stdin.
- `--lang en|ar` — force the engine instead of auto-detecting it.
- `--variety msa|egt|shami` — force the Arabic variety. Implies `--lang ar`.
- `--json` — print the raw analysis object with a `lang` field in front of
  it, instead of the human-readable report.
- `--markdown` — analyse as *rendered* Markdown
  (`sourceMode: 'rendered-markdown'`) on either engine.

### Routing

`lib/lang.js`'s `identify()` decides. `ar` and `mixed` both go to the Arabic
engine: a mixed document is Arabic prose with English terms in it, and
code-switching into English is a documented dialect feature
(`AR-EGT-016`, `AR-SHM-017`), not a tell. Latin-script terms are left alone
by the Arabic engine. `en` and `unknown` go to `lib/en-detector`.

### Exit codes

- `0` — always, including for an `AI` verdict. A detection result is not an
  error.
- `2` — input error only: missing/unreadable file, unreadable stdin, unknown
  flag, bad `--lang`/`--variety` value, no input argument.

### Output

The report prints the language/variety and language-ID confidence, the score
and label, a stats line, and the issues grouped `P0` / `P1` / `P2` with
`line:col`, pattern id, type, excerpt and suggestion. Arabic is written to
stdout as UTF-8 by `process.stdout.write` — no console codepage handling is
needed on Windows.

`--json` prints `{ lang, variety, confidence, engine, arabicRatio, score,
label, issues, stats }`. The two engines' `issues` and `stats` differ in
shape (the English engine reports `{type, text, index, severity:
'critical'|'high'|…}`; the Arabic engine reports `{type, patternId, start,
end, excerpt, severity: 'P0'|'P1'|'P2', suggestion}`); `lang`, `score`,
`label`, `issues` and `stats` are common to both.

### Programmatic use

    const { analyze } = require('./detect.js');
    const result = analyze(text, { lang: 'ar', variety: 'egt', markdown: true });

Same routing and same return shape as `--json`. `validate.js` uses the
underlying engines directly.

---

## The Arabic engine (`lib/ar-detector/`)

`analyzeText(text, { variety, sourceMode }) -> { score, label, issues, stats }`,
plus `PATTERNS`, `WEIGHTS`, `THRESHOLDS` and `GATES` for tests and docs.
Split across three files: `lexicons.js` (phrase lists per pattern id, per
variety), `signals.js` (masking, segmentation, stylometry) and `index.js`
(orchestration and scoring).

Every phrase list in `lexicons.js` cites the reference pattern id it
implements — `AR-SH-*` from `references/ar-shared.md`, `AR-MSA-*` from
`references/ar-msa.md`, `AR-EGT-*` from `references/ar-egyptian.md`,
`AR-SHM-*` from `references/ar-levantine.md`.

### Labels and thresholds

The English engine does not expose a `HUMAN`/`MIXED`/`AI` label: its `label`
is a descriptive band (`Clean`, `Minimal AI signals`, …) and its trinary
field is `document_classification` with `HUMAN_ONLY`/`MIXED`/`AI_ONLY`. The
Arabic engine therefore defines its own three-way label:

| score | label | maps to the English engine's trinary as |
|---|---|---|
| `0 – 24` | `HUMAN` | `HUMAN_ONLY` |
| `25 – 54` | `MIXED` | `MIXED` |
| `55 – 100` | `AI` | `AI_ONLY` |

Exported as `THRESHOLDS = { MIXED: 25, AI: 55, TOO_SHORT_WORDS: 20, TOO_SHORT_CAP: 24 }`.

### Weights

| tier | weight | meaning |
|---|---|---|
| `P0` | 14 | critical — must always be fixed |
| `P1` | 6 | significant — fix unless there's a stated reason not to |
| `P2` | 2 | minor — fix opportunistically |

Repeated hits of the **same** pattern id get diminishing returns: 1.0 for the
first, 0.5 for the second, 0.25 for every later one. `score = min(100,
round(sum of weighted hits))`. There is no length normalization: the repeat
discount already bounds what one phrase can contribute, and a length divisor
would make short dialect samples unscoreable.

### Conservative by default

The weights are chosen so that **no single signal can reach the AI
threshold**, and so that a typical human paragraph containing one hedge
scores `HUMAN`:

- one `P2` signal → 2 → `HUMAN`
- one `P1` hit → 6 → `HUMAN`
- one `P0` hit → 14 → `HUMAN` (not even `MIXED`)
- reaching `AI` needs roughly four independent `P0`-class signals, or a
  realistic accumulation such as two `P0` + three `P1` + two `P2`

Signals that are really *absences* — no discourse particles, no rhetorical
questions, no metaphor, no code-switching, no letter lengthening — are
deliberately **not scored**, because an absence fires on every short or
technical text. And per `ar-shared.md`, "Rhetorical devices that are NOT
tells in Arabic", rhetorical and reader-directed questions are never a
signal in Arabic; the English-language rule is explicitly inverted here.

### Signals

| # | signal | pattern id(s) | tier | gate |
|---|---|---|---|---|
| a | phrase-lexicon hits, matched on the normalized string and mapped back to original offsets | `AR-SH-001/002/003/006/007`, `AR-MSA-002/006/007/008/012`, `AR-EGT-001/003/005/007/013/014/024`, `AR-SHM-001/004/005/006/007/022` | per pattern | some patterns carry a `minCount` (passive voice 2, تم/يتم 2, MSA-vocabulary runs 2, syntactic template 3) — below it they report nothing |
| b | weighted tiers `P0 > P1 > P2` with per-pattern diminishing returns | — | — | — |
| c | sentence-length burstiness (coefficient of variation; split on `.` `؟` `!` `؛` and newlines) | `AR-SH-004` | `P0` | ≥ 5 sentences; fires below CV 0.35 |
| d | paragraph-length uniformity | `AR-MSA-014` | `P2` | ≥ 4 paragraphs; fires below CV 0.22 |
| e | word-trigram repetition | `AR-MSA-028` | `P2` | ≥ 40 words; fires above a 0.04 repeat ratio |
| f | transition-phrase density per 100 words | `AR-SH-002` | `P1` | ≥ 60 words; fires above 2 per 100 words (`ar-levantine.md` `AR-SHM-012`, shm:509-510 — kept because that reference explicitly retains it as an editing rule, not as a claim about AI behaviour) |
| g | MSA-leakage ratio — **dialect varieties only** | `AR-EGT-026` / `AR-SHM-001` | `P0` at ratio ≥ 0.75, `P1` at ≥ 0.5 | ≥ 4 total function-word hits |
| h | punctuation profile: Latin `,` `;` `?` used directly after an Arabic letter, and Arabic-Indic/Western digits mixed in one document | `AR-SH-TYPO` (`ar-shared.md`, "Typography and numbers") | `P2` only, never weighted heavily | — |
| — | tanwin present in Egyptian-target text (measured before normalization) | `AR-EGT-002` | `P1` | variety `egt` |
| — | tashkeel other than shadda in Levantine-target text (measured before normalization) | `AR-SHM-018` | `P0` | variety `shami` |

**MSA-leakage ratio** = `msaHits / (msaHits + dialectHits)`, over the MSA
function-word inventory from the two leakage checklists (negators لم/لن/ليس,
future سـ/سوف, demonstratives هذا/هذه/هؤلاء/ذلك/تلك, relatives
الذي/التي/الذين, interrogatives, core lexicon) against that variety's dialect
equivalents (مش، مفيش، ده/دي/دول، اللي، هاد/هاي/هدول، رح، بدّي …). Bare ما is
deliberately **not** counted on the dialect side — it is also an ordinary MSA
particle, and bare لا is excluded from the MSA side for the same reason (it
is retained for prohibition in every dialect). `stats.msaLeakage` is
**absent** (not `null`) for `variety: 'msa'`: MSA text leaking MSA is not a
concept.

### Offsets

Lexicon matching runs on the normalized string produced by
`lib/arabic-normalize.js` (`taMarbuta: false`, matching `lib/lang.js`), and
every span is mapped back through `toOriginalRange`. `issue.start` and
`issue.end` always index the **original** text, and
`text.slice(start, end) === issue.excerpt` holds — including on
tashkeel- and tatweel-heavy input, which is covered by a test.

Word boundaries are Arabic-aware: JavaScript's `\b` is ASCII-only and would
match لا inside لازم. Each phrase is wrapped in Arabic-letter lookaround with
an optional single-letter proclitic (و ف ب ل ك) allowed in front but excluded
from the reported span, so وعلاوة على ذلك hits and the excerpt is still
علاوة على ذلك.

Overlapping hits from different patterns (the same hedge is listed under
`AR-SH-001`, `AR-SH-006` and `AR-EGT-011`) are collapsed to one issue,
keeping the higher severity and then the longer span.

### What `rendered-markdown` excludes

`sourceMode: 'rendered-markdown'` masks — replaces with spaces, preserving
string length and every newline, exactly as `lib/en-detector` does, so
offsets never shift:

- an initial YAML frontmatter block (a `---` fence with a closing `---` and a
  first substantive line that parses as a YAML mapping key);
- HTML comments;
- fenced code blocks (backtick or tilde fences), fences included.

Masked in **both** modes, because the engine must never flag inside them:

- URLs (`http://…`, `https://…`, `www.…`);
- inline code spans.

### Edge cases

- Empty or whitespace-only input → `score 0`, `HUMAN`, no issues,
  `stats.empty` and `stats.tooShort` true.
- Text with no Arabic letters → `score 0`, `HUMAN`, `stats.noArabic` true.
- Fewer than 20 words → score capped at 24 (so never `AI`, never even
  `MIXED`) and `stats.tooShort` true. Issues are still reported; only the
  score is capped.
- An invalid `variety` or `sourceMode` falls back to `msa` / `plain` and the
  requested value is recorded in `stats.varietyFallback` /
  `stats.sourceModeFallback`.

### Known limitations

- **Short texts.** Under 20 words the score is capped and the stylometric
  signals (c-f) are all gated off; the engine can only report phrase hits.
  Between 20 and about 60 words, burstiness is the only stylometric signal
  that can fire. Treat anything shorter than a paragraph as unscoreable.
- **Dialect ID on short texts.** Routing depends on `lib/lang.js`, which
  needs at least two distinct dialect markers at a density of one per 100
  Arabic words before it leaves the `msa` default. A short Egyptian or
  Levantine snippet will usually be analysed as MSA, which suppresses the
  MSA-leakage signal entirely. Pass `--variety` when you know the target.
- **Levantine is experimental.** `references/ar-levantine.md` is marked
  "experimental — pending native Levantine review", and the regional split
  (Syrian / Lebanese / Palestinian) is not modelled here: the engine treats
  Levantine as one variety. Region-scoped rules — the ما…ش circumfix
  (Palestinian only), French code-switching (Lebanese only), Turkish
  loanwords (Syrian only) — are **not** implemented, because applying them
  across the whole variety would produce false positives in the other two.
- **Single-pattern shortcuts are not honoured.** `ar-shared.md` `AR-SH-002`
  says three instances of علاوة على ذلك alone is enough to suspect AI
  authorship. Under diminishing returns three hits of that one `P0` pattern
  score 24.5 → `HUMAN`. This is deliberate: the engine requires
  corroboration from an independent signal rather than trusting any single
  phrase. All three hits are still reported as `P0` issues even when the
  score stays low.
- **Wrong-dialect text is not detected.** The engine checks a document
  against the variety it was *told* to use; it does not verify that the
  document is in that variety. Egyptian prose analysed as `shami` (or the
  reverse) scores `HUMAN`, because the two dialects share most of the
  leakage-side vocabulary (`مش`, `اللي`, `يعني`, `كمان`, `بس`). Use
  `lib/lang.js` to pick the variety, or pass `--variety` deliberately.
- **Synthetic-human fixtures.** Every Arabic human-style fixture under
  `tests/fixtures/ar-*/human-*.md` was written by this project, not sampled
  from native writing. They are marked `synthetic-human` and listed for
  review in `docs/native-review/fixtures.md`.
- **No corpus calibration.** The weights and thresholds above were tuned
  against this repository's 30 Arabic fixtures and 5 Arabic false-positive
  fixtures. They are not calibrated against a measured corpus, and none of
  the upstream numeric thresholds (which the references dropped as uncited)
  were reintroduced.

---

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
