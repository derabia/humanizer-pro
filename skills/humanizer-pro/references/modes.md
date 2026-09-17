# Modes

Four modes: `detect`, `rewrite` (default), `edit`, and the `seo` modifier
(combinable with any of the other three). Contracts are adapted from
avoid-ai-writing's mode contracts (`_sources/avoid-ai-writing/SKILL.md:105-276`,
inventoried in `docs/inventory/avoid-ai-writing.md` §5), extended with a
mandatory second-pass audit for `rewrite` (adapted from blader's four-step
workflow, `_sources/blader/SKILL.md:31-44`) and with scoring/language
extensions this skill adds. Read `core-principles.md` first — every output
below is still bound by "never invent" and "detection alone never authorizes
rewriting."

All patterns cited by ID come from `en-patterns.md`, `en-vocabulary.md`, or
the relevant `ar-*.md` file (not duplicated here). Precedence between
overlapping upstream rules is resolved in `precedence.md`.

## `detect`

Adapted from avoid-ai-writing's detect-mode contract
(`_sources/avoid-ai-writing/SKILL.md:246-256`). No rewriting, no marks pass,
zero editing passes.

1. **Issues found** — bulleted list, grouped by severity (P0 / P1 / P2 per
   `_sources/avoid-ai-writing/SKILL.md:159-182`). Each item quotes the
   offending text and cites a pattern ID (`EN-012`, `AR-SH-003`,
   `AR-EGT-004`, etc.). Keep Tier-1B clarity edits visually separate from
   Tier-1A markers and say which is which — "a wordiness fix is a writing
   suggestion, not evidence about who wrote the text"
   (`_sources/avoid-ai-writing/SKILL.md:249`).
2. **Assessment** — for each flag, real problem vs. possibly intentional or
   effective in context. "Some AI-associated patterns are effective writing
   techniques... Call out which flags the writer should definitely fix vs.
   which ones are worth a second look" (`_sources/avoid-ai-writing/SKILL.md:250`).
   If the text is clean, say so.
3. **Score** — run `scripts/detect.js <file>` if the skill's scripts are
   installed and runnable; report the numeric score it returns. If the
   script cannot run, write exactly: "Score: not computed: scripts
   unavailable" and say the audit above was model-only
   (`_sources/avoid-ai-writing/SKILL.md:255`, "State whether the detector
   actually ran or the audit was model-only").

Report zero editing passes; detect mode performs no marks normalization or
rewriting (`_sources/avoid-ai-writing/SKILL.md:256`).

## `rewrite` (default)

Adapted from avoid-ai-writing's rewrite-mode contract
(`_sources/avoid-ai-writing/SKILL.md:220-244`) plus blader's mandatory
self-critique step (`_sources/blader/SKILL.md:33`, "Check the draft" —
README calls this a visible three-part output: first rewrite, critique,
final version, `docs/inventory/blader.md:359`).

1. **Issues found** — same contract as `detect`, quoting text and citing
   pattern IDs, grouped P0/P1/P2. Include this section in every rewrite
   response — humanizer-pro always shows its audit, whereas upstream
   avoid-ai-writing reserves this section for an explicitly requested
   detailed audit (`_sources/avoid-ai-writing/SKILL.md:244`); see
   `docs/discrepancies/modes-voice-seo.md` for why this default changed.
2. **Rewritten version** — the full rewritten text exactly once. "Never
   publish a first-pass draft and then supersede it with another full
   version" (`_sources/avoid-ai-writing/SKILL.md:222`). If no justified edit
   remains, copy the source unchanged and say so
   (`_sources/avoid-ai-writing/SKILL.md:224`).
3. **What changed** — a short list of meaningful changes; omit for a no-op
   (`_sources/avoid-ai-writing/SKILL.md:132`, "Summarize when useful").
4. **Second-pass audit** (mandatory) — adapted verbatim where possible from
   avoid-ai-writing's iterate-to-convergence budget
   (`_sources/avoid-ai-writing/SKILL.md:125`): "Before delivery, compare the
   final text with the source. Account for each changed span: it must
   address a justified finding or belong to an explicitly requested
   transformation... If review finds an unauthorized change, repair it only
   within the remaining editing budget; otherwise report the unresolved
   failure" (`_sources/avoid-ai-writing/SKILL.md:226-228`). Report, using
   avoid-ai-writing's four Verification items: **Editing passes** (used and
   limit, default ceiling two — initial pass plus one corrective pass,
   `_sources/avoid-ai-writing/SKILL.md:123`), **Checks** (executed,
   model-only, or unavailable), **Residuals** (findings left and why, or
   none found), **Stop reason** (no further justified in-scope edit,
   requested limit reached, or unresolved verification failure — "a pass
   count alone is not a stop reason," `_sources/avoid-ai-writing/SKILL.md:234`).
   This step also folds in blader's read-aloud self-check: search
   specifically for the tells that most often survive a rewrite (a
   not-X-but-Y contrast, a one-line closer, a dash, a triad, a bold label —
   `_sources/blader/SKILL.md:33`) before finalizing.

## `edit`

Adapted from `_sources/avoid-ai-writing/SKILL.md:117,258-276`.

1. Read the file the writer named.
2. Confirm it is a prose file. **Refuse** source code, configuration, and
   generated data files — extensions such as `.py .js .ts .go .rs .java .c
   .cpp .rb .php .sh .ps1 .json .yaml .yml .toml .ini .env .sql .csv .xml`
   (config/data formats), and any file whose content is majority code
   syntax rather than prose even under a `.md`/`.txt` extension. Explain
   that prose rewrites can corrupt structured content
   (`_sources/avoid-ai-writing/SKILL.md:117`).
3. **Edits made** — apply minimal, targeted fixes to justified, authorized
   spans with the Edit tool; leave already-human passages untouched
   (`_sources/avoid-ai-writing/SKILL.md:118`). Report as a bulleted list,
   each with file location and before → after, only the spans touched
   (`_sources/avoid-ai-writing/SKILL.md:259-260`).
4. **Verification** — re-read the file; state whether any further justified
   in-scope edit remains; report editing passes used, checks that ran, and
   anything left alone because it was already human, intentional,
   protected, source-blocked, or beyond the pass limit
   (`_sources/avoid-ai-writing/SKILL.md:262-263`). Run
   `node scripts/validate.js <original> <rewritten>` if the skill's scripts
   are installed and runnable; report its exit code and any listed
   violation. If the script cannot run, use the manual fallback checklist
   below and say so explicitly — never claim a file is verified when the
   check did not run (`_sources/avoid-ai-writing/SKILL.md:275`).

## `seo` modifier

Combinable with any mode above. Adds two sections after the mode's own
output: **Protected spans** and **SEO check**. See `seo-mode.md` for the
full protected-span list, the validator contract, and worked examples.

## Report language follows the request

Report headings (`Issues found`, `Rewritten version`, etc.) follow the
language of the user's request. The rewritten text itself stays in the
language and variety of the input, independent of the report language —
these are two separate choices.

English report headings map to:

<!-- NATIVE-REVIEW: msa -->
| English | Arabic |
|---|---|
| Issues found | المشكلات المرصودة |
| Rewritten version | النسخة المعدَّلة |
| What changed | ما الذي تغيّر |
| Second-pass audit | المراجعة الثانية |
| Assessment | التقييم |
| Score | النتيجة |
| Edits made | التعديلات المنفَّذة |
| Verification | التحقق |
| Protected spans | المقاطع المحمية |
| SEO check | فحص تحسين محركات البحث |
<!-- /NATIVE-REVIEW -->

For a dialect-flavored request (e.g. Egyptian or Levantine), still use the
MSA heading forms above for report scaffolding — headings are metadata, not
the humanized prose, and the dialect applies to the rewritten text, not the
report chrome. Flag this choice in `docs/discrepancies/modes-voice-seo.md`
if a native reviewer disagrees.

## Manual fallback checklist

Use when `scripts/detect.js` or `scripts/validate.js` cannot run (not
installed, no Node available, script errors). Do not silently skip
verification — always say explicitly that the check below was model-only.

- [ ] Every changed span traces to a cited pattern ID or an explicitly
      requested transformation.
- [ ] No fenced code block, inline code span, URL, file path, or table cell
      changed content (only cosmetic reflow of surrounding prose, if any).
- [ ] YAML frontmatter unchanged.
- [ ] Heading count and nesting (H1..H6) unchanged; only wording changed
      where a Title-Case or decoration fix was in scope.
- [ ] No blockquote content altered.
- [ ] No number, name, date, quote, or citation present in the source is
      missing from the rewrite, unless a specific pattern authorized cutting
      it.
- [ ] Word count did not drop by more than roughly 40% without an explicit
      condensation request (mirrors avoid-ai-writing's `large-shrink`
      warning threshold, `docs/inventory/avoid-ai-writing.md:876`).
- [ ] Re-scan the rewrite for the five tells most likely to survive a first
      pass: not-X-but-Y, one-line closer, a bare dash, a forced triad, a
      bold label (`_sources/blader/SKILL.md:33`).
- [ ] For `seo`: every protected span from `seo-mode.md` is present,
      unaltered, and in its original position.

## Provenance and discrepancies

See `docs/provenance/modes-voice-seo.md` and
`docs/discrepancies/modes-voice-seo.md`.
