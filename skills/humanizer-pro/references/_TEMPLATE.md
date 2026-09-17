---
status: TEMPLATE (copy this file's structure; do not load it as a reference)
---

# How to add a new language or Arabic variety

This is a contributor recipe, not a loaded reference; `SKILL.md`'s loading
table never points here. Follow the numbered steps in order. Each one names
the file it touches and what "done" looks like.

## 0. Before you start

Read `references/core-principles.md`'s "Shared core, thin adapters" section
first. The file you are about to write is a **thin adapter**: it states
only what is specific to the new language or variety and points back to
`core-principles.md` and, for an Arabic variety, `ar-shared.md`, for
everything that already applies generally. Do not copy an existing
variety's entries and edit the words; that reintroduces the duplication the
shared-core architecture exists to avoid.

## 1. Pick the naming

- **BCP 47 tag** for documentation and `SKILL.md` frontmatter: see
  `docs/LANGUAGE-CODES.md` for the language/script/region rule and the
  worked Arabic table. Add a region subtag only once the variety's output
  genuinely differs from its neighbors, not as a placeholder.
- **Engine id** for `scripts/lib/lang.js`, CLI flags, and JSON output: a
  short lowercase identifier, matching the existing style (`msa`, `egt`,
  `shami`), not the BCP 47 tag itself. Record both in
  `docs/LANGUAGE-CODES.md`'s worked table when you add the variety, so the
  BCP 47 tag and the engine id never drift apart silently.
- **Reference file name**: `references/<language-or-variety>.md`, e.g.
  `ar-gulf.md` for Gulf Arabic, `es.md` for a first Spanish variety.

## 2. Write the reference file, entry by entry

Use this entry format for every pattern (adapted from the shape
`ar-egyptian.md` and `ar-levantine.md` already use):

```
### <PREFIX>-NNN: Short Title

**Severity:** P0 | P1 | P2  **Provenance:** <source citation or `origin: humanizer-pro`>
**Family:** calque | stock-units | typography | register-flattening | english-syntax | chatbot-residue
**What it looks like:** concrete description of the surface pattern.
**Why it reads as AI:** the underlying reason, not a restated description.
**Fix:** the concrete edit, with a before/after example where one is available.
**Carve-outs:** cases where the pattern is not a tell, or "None stated in source."
```

- **`<PREFIX>`**: a short, stable, all-caps code unique to this
  language/variety (`AR-EGT`, `AR-SHM`, `EN`; pick something equally short
  and distinct for a new language, e.g. `ES` or `ES-MX`).
- **Family tag**: pick the one of the five families in `ar-shared.md`'s
  "Family tags" note that actually describes the pattern's mechanism, not
  the one that is convenient. Add `chatbot-residue` only when a pattern
  genuinely fits none of the five, and say so explicitly in the entry
  (every current Arabic entry fits one of the five; the sixth tag exists
  for the case where that stops being true).
- **Do not restate a cross-variety pattern.** If the pattern already exists
  in the shared file (hedging, formulaic transitions, uniform rhythm,
  list-instead-of-argument, translated discourse structures, passive
  disguise, for Arabic; the shared-core catalog for any other language),
  write "See `<shared-file>.md`: <pattern name>, apply the shared rule" and
  keep only the language-specific nuance and example, the same pattern
  `ar-egyptian.md`'s AR-EGT-010 through AR-EGT-012 already use for entries
  that point back to `ar-shared.md`.

## 3. Provenance and native-review fragments

Every claim needs a citation, exactly like the existing files:

- Cite the upstream source file and line range if one exists
  (`` `_sources/<repo>/SKILL.md:NN-NN` ``), or write `origin: humanizer-pro`
  for a pattern this project defined itself.
- Add a row to `docs/provenance/round1-docs.md` (or a new
  `docs/provenance/<name>.md` if the addition is large enough to warrant
  its own file) mapping each new section to its source.
- Any example, translation, or grammatical claim that a non-native
  contributor cannot personally verify goes inside a
  `<!-- NATIVE-REVIEW: <code> -->` ... `<!-- /NATIVE-REVIEW -->` comment
  pair, the same convention `precedence.md` and `modes.md` already use for
  Arabic examples. Log the open review need in
  `docs/discrepancies/round1-docs.md` (or the current round's discrepancies
  file) so it is not forgotten.

## 4. Wire the lexicon and `lib/lang.js`

- If any pattern is a deterministic word/phrase match, add it to
  `scripts/lib/ar-detector/lexicons.js`'s `RAW_PATTERNS` (Arabic) or the
  equivalent structure for a new language's own detector module, with an
  `id` matching the reference entry's `<PREFIX>-NNN`. This is scripts work;
  it is out of scope for a documentation-only contribution and should be
  flagged as a follow-up if you cannot touch `scripts/` in this pass.
- Add the variety's marker words (for dialect identification) to
  `scripts/lib/lang.js`, following the existing `EGYPTIAN_MARKERS` /
  `LEVANTINE_MARKERS` pattern: cite the source line for each marker, and
  keep the two-distinct-markers-plus-density threshold `SKILL.md` §3
  documents rather than inventing a new threshold per variety.
- Update `SKILL.md` §3's routing heuristics and §4's reference-loading
  table with the new variety's row.

## 5. Fixtures and tests

- Add `tests/fixtures/<engine-id>/ai-0N.md` and `human-0N.md` pairs,
  mirroring the existing `tests/fixtures/ar-egt/` and `tests/fixtures/ar-msa/`
  layout, each with a provenance note for where the sample came from.
- Add or extend a `tests/*.test.js` file exercising the new lexicon entries
  and `lib/lang.js` identification, following `tests/lang.test.js` and
  `tests/ar-detector.test.js`'s existing shape (each Arabic fixture string
  cites the source SKILL.md and line it was adapted from).
- Update `docs/COVERAGE-MAP.md` by hand so every new pattern ID gets a
  `lexicon` / `signal` / `judgment-only` row (see that file's own header
  for how each class is decided), then run `node tools/check-skill.js
  --refs` and `npm test` (which includes `tests/coverage-map.test.js`) to
  confirm nothing is missing.

## 6. Experimental status

A new variety ships **experimental** until it has had a native-speaker
review, the same status `ar-levantine.md` carries today (frontmatter
`status: experimental (pending native <variety> review)`, and a matching
note in `SKILL.md` §3 saying so and asking the assistant to flag
uncertainty when delivering that variety's output). Do not remove the
experimental status until a native reviewer has actually gone through the
`<!-- NATIVE-REVIEW: ... -->` fragments and either confirmed or corrected
them; a contributor's own confidence in the material is not sufficient to
lift the flag.

## 7. Final checklist

- [ ] BCP 47 tag and engine id both recorded in `docs/LANGUAGE-CODES.md`.
- [ ] Reference file written as a thin adapter, not a restatement of the
      shared core.
- [ ] Every entry has Severity, Provenance, Family, and the four content
      fields.
- [ ] Native-review fragments added wherever a non-native contributor
      cannot personally verify a claim.
- [ ] `docs/provenance/` updated.
- [ ] `docs/COVERAGE-MAP.md` and `tests/coverage-map.test.js` pass for the
      new pattern IDs.
- [ ] `SKILL.md` §3 and §4 updated, and `node tools/check-skill.js` still
      passes (line count, description length, no em/en dash, referenced
      paths exist).
- [ ] Frontmatter and `SKILL.md` both say `experimental` until a native
      review has actually happened.

## Credits

Structure adapted from sawradip/rehumanize's contributor template for
adding a language (`skills/_TEMPLATE.md`, MIT license); wording and every
step's content here are original to this project, not reproduced from the
source.
