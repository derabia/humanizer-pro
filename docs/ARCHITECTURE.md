# Architecture

How `humanizer-pro` is actually laid out, and why it deviates from the
target layout in `docs/BUILD-PROMPT.md` §2 where it does. As of this
writing, Phases 1–6a are complete (sources pinned, references built,
Arabic normalizer/detector plumbing and `lang.js` routing in place); Phase 7
(`SKILL.md`), the `en-detector`'s sibling `ar-detector`, `scripts/detect.js`,
`scripts/validate.js`, `README.md`, and `evals/` have not been built yet and
so are not described here as if they existed.

## Module system

Everything is CommonJS (`require`/`module.exports`), zero runtime
dependencies, Node >=18 (see `package.json`). No bundler, no transpilation.
`path` is used for all filesystem paths so the code runs unmodified on
Windows and POSIX.

## Layout deviations from BUILD-PROMPT §2

1. **`docs/{provenance,dedup-log,native-review,discrepancies}/` fragment
   directories, merged by `tools/merge-docs.js`.** BUILD-PROMPT specifies
   single files (`docs/PROVENANCE.md`, `DEDUP-LOG.md`, `NATIVE-REVIEW.md`,
   `DISCREPANCIES.md`). Those single files still exist and are still what
   gets read and reviewed — but each covers five independent problem areas
   (EN, AR shared/MSA, AR Egyptian/Levantine, modes/voice/SEO, precedence)
   built in separate passes. Editing one 400-line concatenated file from
   multiple sub-agent passes invites merge conflicts and makes it hard to
   tell which pass a change belongs to. The fragments in `docs/provenance/`,
   `docs/dedup-log/`, and `docs/native-review/` are the editable source of
   truth, one per area; `tools/merge-docs.js` concatenates them
   (alphabetically by filename, wrapped with a shared header and an SHA
   footer) into the canonical top-level file. Run it after editing any
   fragment. `docs/discrepancies/` follows the same fragment pattern, but
   `docs/DISCREPANCIES.md` itself is hand-maintained with fragments appended
   once rather than fully regenerated, since it also carries prose that
   predates the fragment split.

2. **`scripts/lib/en-validate.js` kept as a verbatim-adapted upstream file,
   wrapped by `scripts/validate.js`.** The preservation validator from
   `avoid-ai-writing` (quoted material, code blocks, tables, attributed
   text, technical details) is high-value, already-tested logic with no
   English-specific dependency that would prevent Arabic use. Rather than
   reimplementing it, `en-validate.js` is kept close to its upstream form
   (see its file header and `docs/provenance/en.md` for the exact mapping)
   so upstream fixes remain diffable against it. `scripts/validate.js`
   (Phase 6, not yet written) will be the language-agnostic entry point that
   picks `en-validate.js` for English input and applies Arabic-aware
   preservation rules — built on `arabic-normalize.js` offsets — for Arabic
   input, so callers never need to know which engine ran.

3. **`tools/run-tests.js`, not `node --test <dir>` directly.** `package.json`
   defines `"test": "node tools/run-tests.js"` instead of
   `node --test tests/`. Node's `--test` with a directory argument behaves
   differently across supported Node versions (glob/directory-arg support
   for `--test` changed between Node 18, 20, and current releases), which
   would make `npm test` version-dependent on contributors' machines.
   `tools/run-tests.js` enumerates `tests/*.test.js` explicitly with
   `fs.readdirSync` and passes the resolved file list to
   `spawnSync(process.execPath, ['--test', ...files])`, which is stable
   across Node 18+.

4. **`tools/check-upstream.js` takes on re-verification guidance, not just a
   SHA diff.** BUILD-PROMPT describes it only as "compares recorded SHAs to
   remote HEADs." Because the upstream-derived content is spread across
   fragment files (deviation 1) rather than one file per repo, a plain
   changed/unchanged verdict would leave a maintainer to manually search for
   what to re-check. So when a repo's remote HEAD has moved past the pinned
   SHA, the tool also greps `docs/provenance/*.md` and `docs/PROVENANCE.md`
   for that repo's short name/SHA and lists the matching fragments and rows,
   turning "SHA changed" into "here is what to re-verify."

5. **No `tools/check-skill.js` yet.** BUILD-PROMPT's layout doesn't list one
   explicitly, and none exists in this repo as of Phase 6a. If a
   skill-packaging validator is added later (checking `SKILL.md`
   frontmatter and reference cross-links once Phase 7 exists), it belongs
   in `tools/` for the same reason `check-upstream.js`/`merge-docs.js` do:
   it operates across the whole repo, not inside the installable skill dir.

6. **`docs/inventory/`** (Phase 2 output) has no fixed home in §2's diagram;
   `docs/inventory/{blader,avoid-ai-writing,semitic}.md` is the natural
   per-repo location, referenced by CREDITS.md and the provenance fragments.

Everything else present (`skills/humanizer-pro/references/*.md`,
`skills/humanizer-pro/LICENSES/`, `tests/`, `UPSTREAM.md`, `.gitattributes`)
matches BUILD-PROMPT §2 as specified.

## Language routing: `detect.js` → `lang.js` → engine

`scripts/lib/lang.js` (`identify(text, options?)`) is the single routing
decision point. It computes the ratio of Arabic-script letters to total
letters (digits/punctuation/whitespace excluded from both counts):

- ratio ≥ 0.6 → `lang: 'ar'`
- ratio ≤ 0.15 → `lang: 'en'`
- otherwise → `lang: 'mixed'`, routed to the Arabic engine (mixed text still
  gets a best-guess `variety`)
- fewer than 3 letters total → `lang: 'unknown'`

For Arabic text, dialect (`msa` / `egt` / `shami`) is scored by whole-word
marker matching against the *normalized* text (via `arabic-normalize.js`,
so tashkeel/alef-form variation doesn't cause misses), defaulting to `msa`
unless at least 2 distinct dialect markers are found at density ≥1/100
words. `scripts/detect.js` (Phase 7, not yet written) will be the CLI entry
point that calls `identify()` and dispatches to `en-detector/index.js` for
English or the Arabic detector (not yet built) for Arabic/mixed input.

## `validate.js` wrapping `en-validate.js`

`en-validate.js` exports `validate(originalText, rewrittenText)` and
enforces the preservation contract: rewrites must not silently alter quoted
material, code blocks, tables, or attributed text. It carries two
upstream-documented carve-outs (AI-referrer URL params and any span this
skill's own instructions explicitly say to edit) so the validator doesn't
fire on its own skill's sanctioned edits. `scripts/validate.js` (not yet
written) will wrap it as the language-agnostic entry point: call
`lang.js#identify` first, delegate straight to `en-validate.js` for English,
and apply the equivalent Arabic-aware preservation checks — built on
`arabic-normalize.js`'s reversible offset map — for Arabic, presenting one
`validate()` call to CLI/skill callers regardless of language.

## Rendered-markdown offset data flow

`en-detector/index.js` accepts `sourceMode: 'plain' | 'rendered-markdown'`.
In `rendered-markdown` mode it masks YAML frontmatter, HTML comments, and
source-only Markdown spans (link syntax, emphasis markers, etc.) by
*blanking* characters in place rather than deleting them — every masking
pass operates on a fixed-length character array and overwrites spans with
placeholder characters instead of splicing the string. This keeps every
downstream index (issue spans, highlight ranges, sentence regions from
`buildSentenceRegions`) aligned with byte offsets in the original source
file, so a caller can take a detector issue's `[start, end)` range and index
directly into the untouched source text — no separate offset-translation
step is needed. `arabic-normalize.js` uses the same principle for its own
normalization pass (tashkeel/tatweel stripping, alef unification): it keeps
an explicit index map back to the original string rather than just
returning normalized text, for the same reason.

## Progressive-disclosure loading model

`SKILL.md` (Phase 7, not yet written) is designed to be the only file a
caller reads up front: router, workflow, mode contracts, and precedence
rules stay in its body. Everything deeper — full pattern catalogs
(`en-patterns.md`, `en-vocabulary.md`), Arabic variety files
(`ar-shared.md`, `ar-msa.md`, `ar-egyptian.md`, `ar-levantine.md`),
`voice-matching.md`, `seo-mode.md`, and `core-principles.md` — lives in
`skills/humanizer-pro/references/` and is loaded by the skill only when the
active mode or detected language actually needs it. This keeps the
always-loaded context small while the full catalog (which is large once EN
+ 3 Arabic varieties are merged) stays available on demand.
