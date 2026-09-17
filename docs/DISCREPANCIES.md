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
