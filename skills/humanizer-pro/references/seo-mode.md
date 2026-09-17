# SEO mode

`origin: humanizer-pro`. Neither upstream repo defines an SEO mode or a
protected-spans list for search-relevant elements — confirmed absent from
both `_sources/blader/` (no SEO material anywhere) and
`_sources/avoid-ai-writing/` (grep of `SKILL.md` and `references/patterns.md`
for "seo", "keyword", "meta description", "alt text", "schema", "json-ld",
"shortcode" returns only one unrelated match, the `--style` house-config
option). Where an element below is already protected by avoid-ai-writing's
existing preservation validator, that is cited explicitly; everything else
is a humanizer-pro addition.

This is a modifier, not a mode: combine it with `detect`, `rewrite`, or
`edit` (see `modes.md`). It adds two sections to that mode's output:
**Protected spans** and **SEO check**.

## Protected spans

Never altered unless the user explicitly allows it. On any SEO-modified
run, before editing, list which of these are present in the target text.

1. **Target and secondary keywords.** From the user's list, or detected
   from title/H1/meta only if the user confirms the detection before
   editing. Never invent a keyword list from the prose itself without
   confirmation.
2. **Heading hierarchy and heading text.** H1-H6 (or Markdown `#`-`######`).
   Already partially protected by avoid-ai-writing's validator: heading
   *count* and *nesting* changes are hard errors (`heading-count`,
   `heading-level`), while heading *wording* changes are warning-level only
   because the skill explicitly permits Title-Case/emoji fixes
   (`_sources/avoid-ai-writing/detector/validate.js`, cited in
   `docs/inventory/avoid-ai-writing.md:872-874`). SEO mode tightens this:
   heading *text* is also protected when it carries a target keyword,
   because rewording it risks the keyword placement check below.
3. **Internal and external links, anchor text, URLs.** Already protected:
   `url-missing` is a hard error in the validator, with AI-tracking
   parameters (`utm_source=chatgpt.com` and similar) stripped from both
   sides before comparison because the skill instructs stripping them
   (`_sources/avoid-ai-writing/detector/validate.js`, `docs/inventory/
   avoid-ai-writing.md:870,879-884`). SEO mode extends this to anchor
   *text*, which the base validator does not check: never reword anchor
   text, and never delete an internal link.
4. **Image alt text, captions, file names.**
5. **JSON-LD / schema blocks, FAQ blocks, tables, shortcodes `[shortcode]`,
   WordPress block comments `<!-- wp:... -->`, HTML attributes.** Tables
   are already a hard-protected region (`table-modified` error,
   `_sources/avoid-ai-writing/detector/validate.js`); the rest are
   humanizer-pro additions, following the same principle the validator
   already applies to code fences and frontmatter — a structured,
   machine-read block is never prose to rewrite.
6. **Meta title / description in frontmatter.** Frontmatter is already a
   hard-protected region: `frontmatter-modified` is an error
   (`_sources/avoid-ai-writing/detector/validate.js`, `docs/inventory/
   avoid-ai-writing.md:866`). SEO mode does not relax this; meta
   title/description edits require explicit user sign-off even though
   they live in frontmatter.

## Rules

- **Preserve keyword presence and approximate placement.** Title, first 100
  words, and at least one H2 are the three checkpoints. Do not move the
  keyword out of any of the three during a rewrite unless the user asked
  for restructuring broad enough to permit it (same scope test
  `core-principles.md` states for structural edits generally).
- **Do not stuff.** Adding repeated keyword instances to "help SEO" is out
  of scope by default — it is exactly the kind of unsupported addition
  `core-principles.md` prohibits, applied to keywords instead of facts.
- **Never delete an internal link.** Not even a link inside a passage
  otherwise authorized for a full rewrite.
- **Flag thin sections; never pad them.** A section that is too short to
  rank is a finding to report (`Issues found` in the underlying mode's
  output, or a dedicated SEO-check line), not something to fill with
  restated or invented content. This is the SEO-specific instance of
  `core-principles.md`'s "if the draft lacks substance, say so."

## How the validator checks this

Intended behavior for `scripts/validate.js --seo keywords.txt`, following
the shape avoid-ai-writing's own `detector/validate.js` already uses
(`options` object, `{ ok, errors[], warnings[], stats }` return shape,
non-zero exit on any hard violation — `docs/inventory/avoid-ai-writing.md`
§9):

- Reads `keywords.txt` (one target/secondary keyword per line) alongside
  the original and rewritten files.
- For each protected span category above, runs the same class of check
  `detector/validate.js` already runs for its own protected regions
  (count/content diff for links, tables, frontmatter, headings; presence
  diff for alt text, JSON-LD blocks, shortcodes).
- Checks keyword presence in: document title, first 100 words, at least one
  H2 — each a separate check.
- Exits non-zero (1) on any violated protected span or a missing keyword
  checkpoint; exits 0 clean; exits 2 on a tool/usage error, matching
  `detector/validate.js`'s own exit-code convention
  (`docs/inventory/avoid-ai-writing.md:899-901`).
- Does not judge keyword *density* or attempt stuffing detection —
  stuffing is a model-only judgment call per the "do not stuff" rule above,
  the same way avoid-ai-writing leaves promotional-language judgment calls
  to the model rather than the deterministic detector
  (`docs/inventory/avoid-ai-writing.md` §15, Group C).

If `scripts/validate.js` cannot run, use the manual checklist below and say
explicitly that the SEO check was model-only — the same disclosure rule
`modes.md` requires for the base detector/validator.

## Manual checklist (scripts unavailable)

- [ ] Every protected span listed above is present, unaltered, and in its
      original position in the rewrite.
- [ ] Target keyword appears in the title, in the first 100 words, and in
      at least one H2.
- [ ] No new repeated keyword instance was added beyond what the source
      already contained.
- [ ] No internal link was removed. External links unchanged unless the
      user explicitly authorized updating one.
- [ ] Heading hierarchy (H1-H6 nesting) unchanged; heading text unchanged
      wherever it carries a keyword.
- [ ] Alt text, captions, and file names unchanged.
- [ ] JSON-LD/schema, FAQ blocks, tables, shortcodes, `<!-- wp:... -->`
      comments, and HTML attributes byte-for-byte unchanged.
- [ ] Frontmatter meta title/description unchanged unless the user
      explicitly authorized editing it.
- [ ] Any thin section is flagged in the report, not padded.

## Examples

**English.** Source: `## Why caching matters` with target keyword "edge
caching" required in an H2. A rewrite that reworks the paragraph under that
heading but changes the heading itself to `## Why speed matters` silently
drops the keyword checkpoint — reject that change; keep the heading text
(or add "edge caching" back into it) even if it otherwise reads less
elegantly than the model's preferred phrasing.

<!-- NATIVE-REVIEW: msa -->
**Arabic.** المصدر: `## أهمية التخزين المؤقت عند الحافة` وكلمة السيو
المستهدفة "التخزين المؤقت عند الحافة" مطلوبة داخل عنوان فرعي (H2). إعادة
الصياغة التي تُبقي الفقرة لكنها تُغيّر العنوان إلى `## لماذا نهتم بالسرعة`
تُسقط الكلمة المفتاحية من نقطة التحقق المطلوبة — يجب رفض هذا التغيير
والإبقاء على نص العنوان الأصلي (أو إعادة الكلمة المفتاحية إليه)، حتى لو بدت
الصياغة البديلة أفصح.
<!-- /NATIVE-REVIEW -->

## Provenance and discrepancies

See `docs/provenance/modes-voice-seo.md` and
`docs/discrepancies/modes-voice-seo.md`.
