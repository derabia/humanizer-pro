# Discrepancies: modes, voice-matching, seo-mode, core-principles

## Profile-name mapping

**No mapping needed.** The build prompt asked to map avoid-ai-writing's
voice-profile names to the five humanizer-pro exposes (casual /
professional / technical / warm / blunt) wherever they differ, and log the
mapping. Checked directly against
`_sources/avoid-ai-writing/references/patterns.md` (quoted in full in
`docs/inventory/avoid-ai-writing.md:602-632`): avoid-ai-writing's five
named voice profiles are exactly `casual`, `professional`, `technical`,
`warm`, `blunt` — an exact, 1:1 match with no renaming required. This is
recorded here to show the check was done, not skipped.

(Distinct from avoid-ai-writing's separate **context** profiles —
`linkedin`, `blog`, `technical-blog`, `investor-email`, `docs`, `casual` —
which are a different axis entirely and out of scope for this file; see
`modes.md`/`seo-mode.md` for where context-profile-like distinctions such as
"prose vs. code file" appear.)

## Contract changes vs. upstream, and why

### `rewrite` mode always includes "Issues found"

Upstream avoid-ai-writing reserves the `Issues found` section for an
explicitly requested detailed/exhaustive audit; the default rewrite
response is Final rewrite → optional Changes → Verification only
(`_sources/avoid-ai-writing/SKILL.md:244`, `docs/inventory/
avoid-ai-writing.md:522`).

The build prompt for `modes.md` specifies the `rewrite` contract as
`Issues found` → `Rewritten version` → `What changed` → `Second-pass audit`
(mandatory) — i.e. `Issues found` as a standing section, not conditional on
an explicit "detailed audit" request. This reference file follows the build
prompt's contract as given rather than upstream's conditional version.
Rationale for the change, as best can be inferred: humanizer-pro's `detect`
and `rewrite` share a consistent shape (both open with the same `Issues
found` contract), which makes the two modes easier to compare and makes
`rewrite`'s output self-justifying without a separate audit request. Flag
for the skill owner: confirm this default is intended, since it is a real
behavior change from upstream, not just a wording adaptation.

### Mandatory second-pass audit

Upstream's iterate-to-convergence budget makes a *corrective* second pass
conditional ("only when review finds another justified in-scope edit,"
`_sources/avoid-ai-writing/SKILL.md:123`) — the *review* itself (comparing
final text to source) is stated as happening on every rewrite
(`_sources/avoid-ai-writing/SKILL.md:226`), but the four-item Verification
report was, in upstream's own text, sometimes terse. The build prompt
requires the second-pass audit section itself to be mandatory and visible
in every `rewrite` response, which this file implements by making step 4
non-optional. This is a presentation change (always show the review), not a
budget change (the two-pass ceiling from `_sources/avoid-ai-writing/
SKILL.md:123` is preserved as-is).

## Precedence between blader and avoid-ai-writing voice guidance

Where both sources describe sample-based calibration, they agree in
substance and differ only in which dimensions they name explicitly (blader:
sentence length, word choice, punctuation, openings, transitions;
avoid-ai-writing: sentence-length pattern, contraction rate, paragraph
openings, recurring word choices). `voice-matching.md` uses blader's list as
the primary checklist because it is more explicit and is the source
directly named in the build prompt ("blader's sample-based calibration
procedure in full"), and folds avoid-ai-writing's "contraction rate" in as
an added facet of "word choice / lexicon" rather than a sixth checklist
item, to avoid a redundant near-duplicate category.

## SEO mode origin

All of `seo-mode.md` is `origin: humanizer-pro` except the protected-span
categories it explicitly reuses from avoid-ai-writing's existing
`detector/validate.js` (headings, links/URLs, tables, frontmatter) — see
`docs/provenance/modes-voice-seo.md` for the exact citations. No upstream
source defines an SEO mode, keyword-placement rule, or protected-span list
for keywords/alt-text/JSON-LD/shortcodes; these were authored fresh,
following the same protection philosophy the validator already applies to
code fences and frontmatter.

## Arabic digit/punctuation convention gap

`docs/inventory/semitic.md` §6 explicitly flags that none of the three
Arabic dialect skills address Arabic-Indic vs. Western digit convention or
Arabic-specific punctuation (، ؛ ؟, « ») as a standalone topic. This gap
would otherwise propagate silently into `voice-matching.md`'s Arabic
samples section. Rather than leave it unaddressed, digit convention and
Arabic punctuation habits were added to the "what to analyze" list for
Arabic samples, sourced from the sample itself rather than from any
upstream rule (since none exists). Flagged here so the gap is visible
rather than quietly filled.
