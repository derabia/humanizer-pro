# Discrepancies: prompt expectations vs. upstream reality

Started per phase-2 merge task. Each entry quotes the expectation as given to
the agent, then what the pinned upstream source actually contains, with a
`repo/file:line` citation. This file records mismatches only — for full
positive coverage of each repo, see `docs/inventory/*.md`.

## (a) avoid-ai-writing

**Expectation given:** "avoid-ai-writing: three modes detect/rewrite/edit,
two-pass audit, tiered vocabulary table (1A,1B,2,3), voice profiles,
deterministic JS detector 0–100, preservation validator, structured output
format."

**What the source actually has:**

1. **The three modes, tiered vocabulary tiers, voice profiles, detector, and
   preservation validator all exist and match** — confirmed in
   `avoid-ai-writing/SKILL.md:105-276` (modes),
   `avoid-ai-writing/references/patterns.md:35-213` (tiers),
   `avoid-ai-writing/references/patterns.md:602-643` (voice profiles),
   `avoid-ai-writing/detector/patterns.js` (detector),
   `avoid-ai-writing/detector/validate.js` (validator).
2. **"Two-pass audit" is not a real name in the source — it's a two-pass
   *editing* budget, and audits are explicitly free.** `SKILL.md:125` states:
   "One editing pass is one stage that changes the returned text or named
   file... Audits, re-reading, detector rechecks, and preservation checks do
   not consume an editing pass." There is no section titled "two-pass audit"
   anywhere in the repo (`docs/inventory/avoid-ai-writing.md` §16 point 1).
3. **The detector is not a single 0–100 score — it's a dual system.** Beyond
   `score`/`label` (0–100), `analyzeText()` also returns a full "GPTZero-
   shaped" trinary classifier (`HUMAN_ONLY`/`MIXED`/`AI_ONLY` +
   `class_probabilities` + `confidence_category`), deliberately biased toward
   false negatives (`avoid-ai-writing/detector/patterns.js:2723-2799`,
   quoted in `docs/inventory/avoid-ai-writing.md` §8 step 18). The prompt's
   "0–100 score" undersells this.
4. **The vocabulary table is not "1A, 1B, 2, 3" as four flat tiers of
   comparable weight — 1B is explicitly *not* AI evidence.** `patterns.md`
   states Tier 1B is "wordiness and inflated formality... a 1B hit is **not**
   evidence of machine authorship," and gives it detector weight 3 (same as
   Tier 2, not Tier 1A's weight 5) — `avoid-ai-writing/references/patterns.md:427`
   (Tier 1B row), `avoid-ai-writing/detector/patterns.js:357-455` (weight
   table). The tier-name framing in the expectation flattens a real
   evidentiary distinction the source draws deliberately.
5. **"Structured output format" undersells that Tier 1A's own "5-20x more
   common in AI text" premise is itself unverified.** `patterns.md:45`
   (quoted in the inventory): "Treat 1A as a well-supported convention rather
   than a verified statistic until this repo measures the ratios itself" —
   the tiered table's headline justification is stated by the source itself
   to be inherited, not measured.
6. **The repo is a 7-skill network, not one skill** — `avoid-ai-writing-router`,
   `ai-writing-detector`, `voice-preserving-rewriter`, `file-edit-in-place`,
   `preservation-verifier`, `false-positive-reviewer` are thin companion
   skills layered on top of the canonical `avoid-ai-writing/SKILL.md`
   (`docs/inventory/avoid-ai-writing.md` §1, §16 point 8). Not mentioned in
   the expectation.

## (b) blader

**Expectation given:** "blader: voice matching from a user writing sample,
core pattern philosophy, pattern catalog."

**What the source actually has:**

1. **Voice matching and the pattern catalog both exist and match** —
   confirmed in `blader/SKILL.md:40-44` (voice) and `blader/SKILL.md:54-359`
   (25-pattern catalog).
2. **The voice-matching section contains a real, shipped bug: a stale
   cross-reference.** `SKILL.md:42` says "The sample overrides the patterns
   below, including §6" when describing the dash rule, but in the current
   (v3.0.0) numbering §6 is "Forced triads" — dashes are §8. This is "almost
   certainly a leftover from the v3.0.0 renumbering," is not caught by the
   repo's own CI validator (`scripts/validate-package.py` only checks heading
   numbering, not inline `§N` cross-references), and is a real defect in the
   shipped prompt text, not an invented finding
   (`docs/inventory/blader.md` §9 point 1).
3. **"Core pattern philosophy" is presented as original but is explicitly an
   operationalization of a single external source, not independent
   research.** `SKILL.md:372-374` ("Source" section): "The patterns come
   from Wikipedia's 'Signs of AI writing'... and from reviews of AI-generated
   text on Wikipedia and elsewhere." No proprietary detection method,
   classifier, or benchmark exists anywhere in the repo
   (`docs/inventory/blader.md` §6, §9 point 2).
4. **Voice-sample override scope is broader than the expectation implies.**
   "The sample overrides the patterns below" (`SKILL.md:42`) is textually
   unqualified — read literally it applies to all 25 patterns (vocabulary,
   bold, headings), not just the dash/rhythm patterns one might assume "voice
   matching" means; only the dash rate is given as a worked example
   (`docs/inventory/blader.md` §9 point 3). This scope question is carried
   into `docs/CONFLICTS.md` C-13.
5. **Two unsourced claims sit inside the "core philosophy" section without
   citation**: "People who judge by feel do little better than chance" and
   "human writing keeps absorbing AI habits" (`SKILL.md:362`) — neither has a
   study, link, or footnote (`docs/inventory/blader.md` §6, §9 point 2). The
   expectation's framing of "core pattern philosophy" as settled doesn't
   surface that part of its own philosophy is asserted, not sourced.

## (c) semitic

**Expectation given:** "semitic: MSA/Egyptian/Levantine patterns."

**What the source actually has:**

1. **The three named skills exist 1:1 as expected** — `humanizer-ar-msa`
   (28 patterns), `humanizer-ar-egt` (25 patterns), `humanizer-ar-shami`
   (25 patterns), confirmed against in-file numbered headings
   (`docs/inventory/semitic.md` §9).
2. **A fourth skill, `humanizer-he` (Modern Hebrew, 35 patterns per README),
   ships in the same package/plugin and is not mentioned in the
   expectation** — `_sources/semitic/skills/humanizer-he/SKILL.md`
   (out of scope per task, noted only — `docs/inventory/semitic.md` §1, §10).
3. **The three Arabic skills are not mutually independent, despite being
   marketed that way.** Egyptian and Levantine both define themselves in
   direct opposition to MSA and reuse overlapping MSA-tell vocabulary and
   phrase families (علاوة على ذلك, من المهم أن نلاحظ, يُعتبر/يُستخدم passive
   family) that the MSA skill also treats as its own subject matter —
   see `docs/inventory/semitic.md` §4 and `docs/CONFLICTS.md` C-04/C-05/C-07/C-11.
4. **"Levantine" is not one dialect — it's three regional sub-variants fused
   into one file** (Syrian/Lebanese/Palestinian), with materially different
   grammar, negation morphology, and code-switching-language rules (French
   for Lebanese vs. English for Syrian/Palestinian) —
   `_sources/semitic/skills/humanizer-ar-shami/SKILL.md` (1247 lines,
   per-pattern regional tables throughout; `docs/inventory/semitic.md` §10).
5. **Every quantitative/research claim in the repo is unsourced.** BLEU
   scores ("1.3 BLEU... a 17x gap," README line 15 and
   `humanizer-ar-shami/SKILL.md:24-27`), percentage thresholds ("AI uses
   syntactic templates 95% of the time. Human Arabic writers: 38%," README
   line 100), and multiple numeric word-count/frequency thresholds across all
   three skills (e.g. `SM-MSA-013`'s "15–22 word AI range," std-dev <6) carry
   no citation, dataset name, or methodology anywhere in the repo — full list
   in `docs/inventory/semitic.md` §8. None of these should be reproduced as
   fact in the rebuilt skill.
6. **The source itself contains internal data-quality artifacts** consistent
   with not being fully copy-edited (e.g. `humanizer-ar-egt/SKILL.md:440`
   lists a "spelling variant" table row as `هيعمل / هيعمل / هيعمل` — three
   visually identical strings; `humanizer-ar-shami/SKILL.md:956-962` has
   several similarly identical "variant" pairs) — `docs/inventory/semitic.md`
   §11. Flagged for native-speaker review before reuse, not assumed correct.

## (d) The prompt's expectation that avoid-ai-writing removes em dashes by default

**Expectation given:** "avoid-ai-writing removes em dashes by default."

**What the source actually has:** The prose rule is close to this ("Target:
zero. Hard max: one per 1,000 words," applied to headings too —
`avoid-ai-writing/references/patterns.md:10`), but the **detector explicitly
does not score em dashes as authorship evidence** — `em-dash` carries
**weight 0** in `avoid-ai-writing/detector/patterns.js`'s `ISSUE_WEIGHTS`
table (`docs/inventory/avoid-ai-writing.md` §13), specifically because
"usage has varied by model generation and vendor, so do not score or invert
it as an authorship signal" (`avoid-ai-writing/SKILL.md:182`). So the source
is internally split: the prose-editing rule leans toward "remove by default,"
while the machine-scoring layer treats em dashes as inert. Neither layer
states a writer-sample override the way blader does (see
`docs/CONFLICTS.md` C-01, which is the fuller writeup of this discrepancy
against blader's sample-overridable rule).

## (e) The prompt's expectation that semitic covers Arabic typography norms

**Expectation given:** an implicit expectation (per the task's own conflict
brief) that semitic supplies "Arabic typographic norms" to reconcile against
curly quotes / en dashes — i.e. that the source addresses Arabic punctuation
(، ؛ ؟), guillemets (« »), and digit conventions.

**What the source actually has:** **Nothing.** Confirmed by direct search:
`grep` for the Arabic punctuation glyphs and for "curly"/"smart quote" across
all three Arabic `SKILL.md` files returns no dedicated-rule hits — the
Arabic question mark ؟ only appears as a literal character inside ordinary
example sentences (e.g. `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:360-362`),
never as the subject of a typography rule. Arabic-Indic vs. Western digit
usage is likewise never addressed. The closest material that exists is
tashkeel/diacritics guidance (MSA `SM-MSA-023`/`SM-MSA-024`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:380-414`; Levantine
`SM-SHM-018`, `_sources/semitic/skills/humanizer-ar-shami/SKILL.md:693-715`)
and Markdown-formatting guidance (MSA `SM-MSA-016`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:275-286`) — both about
markup/vocalization, not punctuation glyphs or digit style. This gap is
carried forward as `docs/CONFLICTS.md` C-03: there is no upstream
language/dialect-reference rule to defer to for Arabic punctuation, so the
merged skill needs a new rule here, not a reconciliation of two existing
ones.

## Additional items pulled from inventories' "Surprises" sections

(Beyond a/b/c/d/e above, for completeness — not separately requested but
directly relevant to a merge task.)

- **blader's version-history churn**: pattern count went 24→28→29→30→33→35
  across versions before being "consolidated" back down to 25
  (`blader/README.md` §"Version history", `docs/inventory/blader.md` §6) —
  the current 25-pattern catalog is the *end* of several rounds of
  expansion/contraction, not a stable original design.
- **avoid-ai-writing's rewrite-preservation eval currently reports a FAIL**
  for the most recent stack (PRs #295/#296): a live model
  (`opencode/mimo-v2.5-free`) claimed to have made an edit it did not
  actually make on a "protected content" scenario, and the stack remains
  unmerged pending issue #322
  (`_sources/avoid-ai-writing/evals/rewrite/reports/automated-stack-295-296-2026-09-16/README.md`,
  `docs/inventory/avoid-ai-writing.md` §11, §16 point 10). This is live
  evidence that "accurate Verification/Changes reporting" is an unsolved
  problem in the upstream project itself, not a settled property to inherit
  by default.
- **avoid-ai-writing's own three pattern-category counts don't reconcile on
  purpose** (74 README / 112+10 vocabulary rows / 53 detector types / 90
  distinct named `###` entries by this project's own inventory count) —
  `avoid-ai-writing/detector/CATEGORIES.md:14-20` explicitly says these
  "coexist on purpose and should not be forced to match." Any single "how
  many patterns does avoid-ai-writing have" claim in downstream docs should
  cite which of the four counts it means.

## How to verify

- (a) two-pass budget text: `sed -n '123,125p' _sources/avoid-ai-writing/SKILL.md`.
- (a) trinary classifier: `sed -n '2723,2799p' _sources/avoid-ai-writing/detector/patterns.js`.
- (a) Tier 1B non-evidence framing: `sed -n '420,430p' docs/inventory/avoid-ai-writing.md` (quotes `patterns.md` directly).
- (b) stale §6/§8 cross-reference: `grep -n 'including §6' _sources/blader/SKILL.md` (line 42) vs. `sed -n '139,150p;159,167p' _sources/blader/SKILL.md`.
- (b) unsourced philosophy claims: `sed -n '360,363p' _sources/blader/SKILL.md`.
- (c) BLEU/percentage claims: `grep -n 'BLEU\|95%\|38%' _sources/semitic/README.md _sources/semitic/skills/*/SKILL.md`.
- (d) em-dash weight 0: `grep -n "'em-dash'" _sources/avoid-ai-writing/detector/patterns.js`.
- (e) Arabic punctuation gap: `grep -rn '؟\|،\|؛\|«\|curly' _sources/semitic/skills/*/SKILL.md`.


---

<!-- source fragment: docs/discrepancies/en.md -->

## Discrepancies — EN catalog build

Places where the upstream source text (`_sources/blader/SKILL.md`,
`_sources/avoid-ai-writing/references/patterns.md`) differed from
`docs/inventory/blader.md`, `docs/inventory/avoid-ai-writing.md`, or
`docs/DEDUP-MAP.draft.md`, discovered while building
`skills/humanizer-pro/references/en-patterns.md` and `en-vocabulary.md`.

## 1. DEDUP-MAP.draft.md missed a real merge: BL-025 ↔ AW-077

`docs/DEDUP-MAP.draft.md`'s merge table lists BL-025 ("Writing about the
previous version") as having "no AW equivalent found," and its "Unique to
avoid-ai-writing" list separately lists AW-077 ("Diff-anchored writing")
as having "no BL merge partner found."

Reading both source texts directly:

- `blader/SKILL.md:352-359` (BL-025): "Documentation and comments describe
  what the text replaced instead of the current behavior... **Before:**
  'This function was added to replace the previous approach of iterating
  through all items, which caused O(n²) performance.' **After:** 'This
  function uses a hash map for O(1) lookups, avoiding the O(n²) cost of
  naive iteration.'"
- `avoid-ai-writing/references/patterns.md:524-527` (AW-077):
  "Documentation or comments narrating a change instead of describing the
  thing as it is: 'This function was added to replace the previous
  approach of iterating through all items.' ... Fix: describe current
  behavior using implementation and rationale already present in the
  source... Carve-out: documents that are inherently version-scoped —
  changelogs, release notes, migration guides, decision records — narrate
  change correctly and stay unflagged."

These are the same pattern with the same before-example almost verbatim
("This function was added to replace the previous approach of iterating
through all items") and the same fix and the same carve-out class
(changelogs/migration docs exempt). AW-077's own text even says "Adapted
from `blader/humanizer` P30" (`patterns.md:527`) — AW's own catalog
already documents the lineage that the draft map's research missed.

**Resolution:** merged as EN-012 in `en-patterns.md`; see
`docs/dedup-log/en.md` for the merge-decision entry. This file records the
draft map's miss so a future pass doesn't re-introduce two separate
entries for the same tell.

## 2. AW-042 ("Formulaic challenges") shares a detector `type` with AW-018, not a distinct trigger family

`docs/inventory/avoid-ai-writing.md`'s catalog table lists AW-042 with
detector `type` `formulaic-opener` — the same `type` as AW-018 ("Formulaic
openings"). Reading `avoid-ai-writing/references/patterns.md:342-343`,
AW-042's actual text ("'Despite challenges, [subject] continues to
thrive'... This is a non-statement") is not really a staged-opener pattern
at all — it is a content-inflation pattern (a non-statement propping up a
subject) that happens to share the engine's `formulaic-opener` `type`
label for implementation reasons, not because the two are the same
editorial rule. `docs/DEDUP-MAP.draft.md` folds AW-042 into the BL-004
staged-openers row anyway (alongside AW-018/037), following the shared
detector type rather than the prose meaning.

**Resolution:** kept AW-042 under EN-004 (staged run-up, per the draft
map) rather than moving it to EN-006 (inflated significance, where its
prose content would arguably fit better), because "Despite challenges…
continues to thrive" is also explicitly listed as a BL-013/EN-006 trigger
phrase already (`blader/SKILL.md:209`, "Despite these challenges...
continues to thrive"). Rather than duplicate the phrase across two
entries, left AW-042 where the draft map put it and cross-referenced the
overlap in EN-006's trigger list implicitly via the shared example. No
file was changed to "fix" this — noted here so the shared-detector-type
artifact doesn't get mistaken for an editorial judgment in a later phase.

## 3. BL-012's "key" (adjective) contradicts AW's own fix vocabulary

Not a discrepancy between the inventories and the source text, but a
cross-source contradiction discovered while placing BL-012's vocabulary
words: blader flags "key (adjective)" as a tell to replace
(`blader/SKILL.md:200`), while avoid-ai-writing's own tier table
*recommends* "key" as the replacement word for other flagged terms — e.g.
`crucial | important, key, necessary` (`avoid-ai-writing/references/
patterns.md:142`) and `pivotal | important, key, critical`
(`patterns.md:63`). Applying BL's rule and AW's fix suggestions
mechanically in sequence would flag AW's own recommended replacement.

**Resolution:** placed BL-012's "key" at Tier 3 (density-flagged only,
~3%+ of words) rather than Tier 1A/2 (flag per-instance or per-cluster),
so a single use of "key" as a fix for "crucial" is never itself flagged —
only saturation-level overuse of "key" is. See `docs/dedup-log/
en.md#vocabulary-placements`.

## 4. Severity mismatch between blader's implicit tier and AW's explicit P-tags (general, not a single instance)

`docs/CONFLICTS.md` C-09 already documents that blader's *(weak alone)*
label and AW's P0-P2 scale don't map 1:1. Building the catalog surfaced no
new instances beyond what C-09/C-14 already describe — every severity
assignment in `en-patterns.md` follows the C-09 resolution (AW's P0-P2 as
the base scale, blader's *weak alone* as an orthogonal modifier) and is
logged per-entry in `docs/dedup-log/en.md` where the assignment required
a judgment call (e.g. EN-005, EN-041). No further discrepancy to report
beyond confirming the conflict as already scoped.

## None found beyond the above

No other cases were found where the upstream source text contradicted the
inventory documents' descriptions, line-range citations, or quoted
examples. Spot-checked all merge rows involving a "yes" same-tell judgment
in `docs/DEDUP-MAP.draft.md` against the live source text during catalog
construction; all matched the map's characterization except item 1 above.


---

<!-- source fragment: docs/discrepancies/modes-voice-seo.md -->

## Discrepancies: modes, voice-matching, seo-mode, core-principles

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
