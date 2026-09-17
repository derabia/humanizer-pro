# Deduplication log

Every merge, split, drop and vocabulary placement, per area. Fragments in docs/dedup-log/.

Upstream commits: blader 9862685f575c65a8247f90369951df1b3416e3d6; avoid-ai-writing 7a2c7d11d4a74d90c6be41fbed8402d972543798; semitic 2c9d4fbe3e0086d373b59bfebc9556082275cf62.



---

<!-- source fragment: docs/dedup-log/ar-egt-shm.md -->

## Dedup log — `ar-egyptian.md` / `ar-levantine.md`

Every `SM-EGT-001…025` and `SM-SHM-001…025` id from `docs/inventory/semitic.md` §3.2/§3.3
appears in exactly one row of the two mapping tables below (never in the dropped-statistics
table — those are referenced by `file:line` only, never by SM id, so that id-counting
scripts don't double-count them).

## Egyptian: SM-EGT-001…025 → destination

| SM id | destination |
|---|---|
| SM-EGT-001 | AR-EGT-001 |
| SM-EGT-002 | AR-EGT-002 |
| SM-EGT-003 | AR-EGT-003 |
| SM-EGT-004 | AR-EGT-004 |
| SM-EGT-005 | AR-EGT-005 |
| SM-EGT-006 | AR-EGT-006 |
| SM-EGT-007 | AR-EGT-007 |
| SM-EGT-008 | AR-EGT-008 |
| SM-EGT-009 | AR-EGT-009 |
| SM-EGT-010 | deferred to ar-shared: uniform sentence rhythm (kept as AR-EGT-010 short entry with Egyptian-specific fix/example) |
| SM-EGT-011 | deferred to ar-shared: formulaic transitions (kept as AR-EGT-011 short entry with Egyptian-specific fix set) |
| SM-EGT-012 | deferred to ar-shared: formulaic transitions (kept as AR-EGT-012 short entry with Egyptian-specific fix set) |
| SM-EGT-013 | AR-EGT-013 |
| SM-EGT-014 | AR-EGT-014 |
| SM-EGT-015 | AR-EGT-015 |
| SM-EGT-016 | AR-EGT-016 |
| SM-EGT-017 | AR-EGT-017 |
| SM-EGT-018 | AR-EGT-018 |
| SM-EGT-019 | AR-EGT-019 |
| SM-EGT-020 | AR-EGT-020 |
| SM-EGT-021 | AR-EGT-021 |
| SM-EGT-022 | AR-EGT-022 |
| SM-EGT-023 | AR-EGT-023 |
| SM-EGT-024 | AR-EGT-024 |
| SM-EGT-025 | AR-EGT-025 |

Note: AR-EGT-026 (MSA-leakage summary checklist) is `origin: humanizer-pro` and does not
have its own SM id — it aggregates/cross-references SM-EGT-001/002/003/004/005/006/007/
013/014, each of which is already mapped exactly once above. See
`docs/provenance/ar-egt-shm.md` for the rationale.

## Levantine: SM-SHM-001…025 → destination

| SM id | destination |
|---|---|
| SM-SHM-001 | AR-SHM-001 (also serves as the dedicated MSA-leakage umbrella section) |
| SM-SHM-002 | AR-SHM-002 |
| SM-SHM-003 | AR-SHM-003 |
| SM-SHM-004 | AR-SHM-004 |
| SM-SHM-005 | AR-SHM-005 |
| SM-SHM-006 | AR-SHM-006 |
| SM-SHM-007 | AR-SHM-007 |
| SM-SHM-008 | AR-SHM-008 |
| SM-SHM-009 | AR-SHM-009 |
| SM-SHM-010 | AR-SHM-010 |
| SM-SHM-011 | AR-SHM-011 |
| SM-SHM-012 | deferred to ar-shared: formulaic transitions (kept as AR-SHM-012 short entry with regional table retained) |
| SM-SHM-013 | AR-SHM-013 |
| SM-SHM-014 | AR-SHM-014 |
| SM-SHM-015 | AR-SHM-015 |
| SM-SHM-016 | AR-SHM-016 |
| SM-SHM-017 | AR-SHM-017 |
| SM-SHM-018 | AR-SHM-018 |
| SM-SHM-019 | AR-SHM-019 |
| SM-SHM-020 | AR-SHM-020 |
| SM-SHM-021 | AR-SHM-021 |
| SM-SHM-022 | AR-SHM-022 |
| SM-SHM-023 | AR-SHM-023 |
| SM-SHM-024 | deferred to ar-shared: uniform sentence rhythm (kept as AR-SHM-024 short entry with paratactic-chain nuance retained) |
| SM-SHM-025 | AR-SHM-025 |

## Dropped statistics / unsourced claims

Referenced by `file:line` and quote only (per `docs/inventory/semitic.md` §8 and the
statistic-drop rule) — none reproduced as fact in the reference files.

### Egyptian (`egt:`)

- egt:16: "over 400 million Arabic speakers" (22-Arab-countries/400M demographic claim,
  presented without citation) — dropped; context sentence kept in narrative only where
  needed, figure not reused.
- egt:42: "a 400-million-person audience" — same claim repeated, dropped.
- egt:244: "used 10x more than any MSA equivalent" (يعني frequency multiplier) — dropped,
  noted in AR-EGT-009 as an unsourced stylometric claim.
- egt:262: "12-20 words" as the AI sentence-length band — dropped in AR-EGT-010 (deferred
  to ar-shared, which owns the general numeric-threshold decision).
- egt:187 / egt:670 (Pattern 6 detection and Stage-3 checklist): "sentences over 25 words" /
  "longer than 25-30 words" threshold — kept as a prescriptive editing threshold (not a
  claim about AI/human behavior), not dropped; distinguished from the AI-band statistics
  above.
- egt:574: "AI language models favor high-frequency words because they dominate training
  data" framed as a stylometric "finding" with no corpus/method named — kept as a
  qualitative claim in AR-EGT-025 (no numeric figure to drop), flagged in-file as such.

### Levantine (`shm:`)

- shm:24–27: "1.3 BLEU... 23 BLEU... 17x performance differential" (MSA-to-Levantine
  translation benchmark claim) — dropped entirely; not reproduced anywhere in
  `ar-levantine.md`.
- shm:30: "30+ million people in Syria, Lebanon, and Palestine" — dropped (demographic
  claim, no citation).
- shm:45: "3,000+ Turkish borrowings in Syrian Arabic alone" — dropped; AR-SHM-023 keeps
  the qualitative "Turkish loans are the everyday default" claim and the loan-word table
  without the count.
- shm:129–130: "Stylometric classifiers trained on Arabic text use MSA grammatical markers
  as their primary AI detection feature" — dropped as an uncited claim; AR-SHM-001 keeps
  only the "thee/thou" analogy and the non-regional scoping.
- shm:471–472: "Stylometric research on Arabic text shows that discourse particle
  frequency and distribution is one of the strongest human/AI discriminators" — dropped;
  AR-SHM-011 keeps the "particle desert" qualitative description and the "every 2-3
  clauses" prescriptive fix.
- shm:509–510: "more than two formal transitions per 100 words" — kept as a prescriptive
  editing threshold in AR-SHM-012 (not a claim about AI/human behavior at large), not
  dropped.
- shm:528–529: "Stylometric research on human Arabic text confirms that 'formal tone
  consistency'... is a primary AI authorship marker" — dropped; AR-SHM-013 keeps the
  qualitative register-variation description only.
- shm:597: "2-3 per 200 words is natural" (reader-directed questions) — kept as a
  prescriptive editing target in AR-SHM-015, not dropped (no claim about AI/human
  statistics, just an authoring guideline).
- shm:637–638: "3-5 French insertions per 100 words minimum... heavy speakers 10-15 per
  100 words" — dropped from AR-SHM-016; qualitative "integrate naturally" instruction kept.
- shm:703–706: "Studies on Arabic authorship attribution show that the presence of
  tashkeel... is one of the strongest single-feature predictors of AI authorship" —
  dropped; AR-SHM-018 keeps the mechanical strip-all-except-shadda instruction only.
- shm:908 / shm:924: "15-25 words" AI band and "one of the most robust machine-learning
  features for AI text detection in Arabic" — dropped from AR-SHM-024 (deferred to
  ar-shared, which owns the general numeric-threshold decision); the paratactic-chain
  nuance and word-count ranges by fragment type (shm:916–921) are kept as prescriptive
  authoring ranges, not AI-detection statistics.
- shm:996: "more than 5 Category 1 failures per 100 words → the text is deeply MSA" —
  this is a Stage-1 diagnostic threshold in the source's own workflow section, not part
  of any of the 25 numbered patterns; not carried into any AR-SHM entry (out of scope
  for the pattern-by-pattern reference), noted here for completeness only.

## Not carried forward (out of scope, not "dropped statistics")

- The 50-point / 5-dimension quality rubrics from both source files (egt:730–815,
  shm:1105–1220) are workflow/scoring scaffolding, not AI-tell patterns — not ported into
  either reference file. No SM id is attached to them in the inventory, so nothing to
  reconcile here.
- The Processing Workflow / Voice Calibration sections (egt:584–726, shm:980–1101) are
  likewise workflow scaffolding, not individual patterns — not ported.


---

<!-- source fragment: docs/dedup-log/ar-shared-msa.md -->

## Dedup log — `ar-shared.md` and `ar-msa.md`

Scope: what happened to every `SM-MSA-001`...`028` pattern, what wording was
kept for each cross-variety merge into `ar-shared.md`, and every uncited
statistic dropped from prose during this build. Source pin throughout:
`_sources/semitic`, commit `2c9d4fbe3e0086d373b59bfebc9556082275cf62`.

## 1. Where every SM-MSA id went

| SM id | Destination | Notes |
|---|---|---|
| SM-MSA-001 | AR-MSA-001 (short) → AR-SH-001 (full) | Hedging overload. |
| SM-MSA-002 | AR-MSA-002 (full) | MSA-only, no merge. |
| SM-MSA-003 | AR-MSA-003 (short) → AR-SH-002 (full) | The critical علاوة على ذلك pattern. |
| SM-MSA-004 | AR-MSA-004 (short) → AR-SH-002 (full) | Transition overuse. |
| SM-MSA-005 | AR-MSA-005 (short) → AR-SH-002 + AR-SH-003 (full) | Split: transition/closing mechanics → AR-SH-002; grandiose-claim framing → AR-SH-003. |
| SM-MSA-006 | AR-MSA-006 (full, kept MSA-only) | تم/يتم periphrastic passive; deliberately NOT merged into AR-SH-007 (see §2). |
| SM-MSA-007 | AR-MSA-007 (full) | MSA-only, no merge. |
| SM-MSA-008 | AR-MSA-008 (short) → AR-SH-001 + AR-SH-006 (full) | Over-formalization; register-mismatch half → AR-SH-001, English-translation-adjacent half → AR-SH-006. |
| SM-MSA-009 | AR-MSA-009 (full) | MSA-only, no merge. |
| SM-MSA-010 | AR-MSA-010 (full) | MSA-only, no merge. |
| SM-MSA-011 | AR-MSA-011 (full) | MSA-only, no merge. |
| SM-MSA-012 | AR-MSA-012 (full) | MSA-only; also cited (not merged) in AR-SH "Rhetorical devices — parallelism." |
| SM-MSA-013 | AR-MSA-013 (short) → AR-SH-004 (full) | Sentence-length uniformity, critical. |
| SM-MSA-014 | AR-MSA-014 (full) | MSA-only, no merge. |
| SM-MSA-015 | AR-MSA-015 (short) → AR-SH-005 (full) | List-instead-of-argument — single-source generalization, see §3. |
| SM-MSA-016 | AR-MSA-016 (full) | MSA-only; explicitly NOT generalized to ar-shared, unlike SM-MSA-015 — no second variety file independently raised markdown-overuse, so it stayed MSA-scoped (see §3 for why this is treated differently from the list-overuse case). |
| SM-MSA-017 | AR-MSA-017 (full) | MSA-only, no merge. |
| SM-MSA-018 | AR-MSA-018 (full) → cited (not merged) in AR-SH "Rhetorical devices — controlled سجع" | Endorsement summary lives in ar-shared; the fix procedure and full example stay in ar-msa. |
| SM-MSA-019 | AR-MSA-019 (full) → dead-metaphor examples cited in AR-SH-003 | Not merged wholesale — only the دead-metaphor illustration is reused in AR-SH-003; the "add original metaphor" fix stays MSA-scoped since only MSA's file addresses figurative-language absence as a named pattern. |
| SM-MSA-020 | AR-MSA-020 (full) | MSA-only, no merge. |
| SM-MSA-021 | AR-MSA-021 (short) → AR-SH "Rhetorical devices — rhetorical questions" (full quote) | Cross-variety (MSA + EGT + SHM). |
| SM-MSA-022 | AR-MSA-022 (full) | MSA-only, no merge. |
| SM-MSA-023 | AR-MSA-023 (full) | MSA-only workflow note; diacritics-policy language in AR-SH "Typography and numbers" cites this pattern but does not absorb it (the AR-SH text generalizes the *policy shape* — pick one standard per genre — while the MSA-specific case-marking detail stays in ar-msa). |
| SM-MSA-024 | AR-MSA-024 (full) | MSA-only, no merge (case-ending correctness has no dialect equivalent — dialects don't carry case endings). |
| SM-MSA-025 | AR-MSA-025 (full) | MSA-only; example carries a NATIVE-REVIEW flag (see native-review log) — the flag reproduces a discrepancy already noted in `docs/inventory/semitic.md` §10-11 item 4, not a new one introduced by this port. |
| SM-MSA-026 | AR-MSA-026 (short) → AR-SH-007 (full) | يُعتبر/يُستخدم/يُلاحظ family, cross-variety per inventory §4. |
| SM-MSA-027 | AR-MSA-027 (full) | MSA-only, no merge. |
| SM-MSA-028 | AR-MSA-028 (full) | MSA-only, no merge. |

Every SM-MSA id (001-028) appears in the table above exactly once as a
"where it went" row — verified programmatically at the end of this task (see
the coverage-check script output in the final report).

## 2. Cross-variety merges into `ar-shared.md` — which wording was kept

- **AR-SH-001 (Hedging Overload).** Base wording and the before/after example
  are taken verbatim from SM-MSA-001
  (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:44-55`) because it is
  the most fully worked-out version of the pattern (explicit trigger list,
  explicit fix, explicit example). SM-EGT-011 and SM-SHM-012 are folded in
  as "dialect note" pointers rather than merged prose, since their fixes are
  dialect-specific replacement sets, not a shared fix — merging them into
  one sentence would have hidden that the Egyptian/Levantine fix is
  "swap register," not "delete," which MSA's fix is.

- **AR-SH-002 (Formulaic Transitions and Conclusions).** MSA wording kept as
  the base for both the transition-phrase half (SM-MSA-003, SM-MSA-004) and
  the conclusion half (SM-MSA-005), again because MSA's file is the only one
  that separates "wrong transition phrase" from "transition phrase overuse"
  from "formulaic conclusion" as three distinct sub-patterns with three
  distinct examples — Egyptian and Levantine each fold the equivalent
  content into one pattern (SM-EGT-012, SM-SHM-012). The merged entry keeps
  MSA's granularity in its "what it looks like" list and cites Egyptian's
  and Levantine's patterns as the dialect-specific fix destinations rather
  than re-deriving separate prose for each.

- **AR-SH-003 (Significance Inflation).** This is the one entry in
  `ar-shared.md` where no upstream file supplies a ready-made merged
  pattern — see §3 below for the full reasoning. The wording is original to
  this port; only the before/after example (from SM-MSA-019) and the phrase
  citations (SM-MSA-005, SM-EGT-012, SM-SHM-012) are upstream-sourced.

- **AR-SH-004 (Uniform Sentence Rhythm).** MSA wording and example kept as
  base (SM-MSA-013 is the only one of the three marked critical, and has
  the most explicit fix instruction — insert a short sentence after 2-3
  long ones). Egyptian's and Levantine's numeric bands are cited by name
  only (not reproduced as numbers — see §4) since all three disagree and
  none is more authoritative than another.

- **AR-SH-005 (List-Instead-of-Argument).** Wholly MSA-sourced (SM-MSA-015)
  — see §3 for why it was generalized to all varieties anyway. The
  feature-comparison/step-list carve-out is imported unchanged from the
  non-Arabic shared core (`docs/CONFLICTS.md` C-08, sourced from
  `avoid-ai-writing/references/patterns.md:13`), per the C-08 resolution
  itself, since MSA's own pattern has no such carve-out and would otherwise
  over-flag legitimate structured content.

- **AR-SH-006 (Translated-from-English Discourse Structures).** Egyptian
  wording kept as base (SM-EGT-011, SM-EGT-015) because Egyptian is the
  only file that names the English-translation etiology explicitly; MSA's
  and Levantine's overlapping phrase lists (SM-MSA-001/008, SM-SHM-012) are
  cited as "the same phrase family, without the etiology claim" rather than
  merged into one voice, to avoid attributing an Egyptian-only diagnostic
  claim to MSA or Levantine as if all three files said it.

- **AR-SH-007 (Formal Passive Disguise).** MSA wording and example kept as
  base (SM-MSA-026), since inventory §4 explicitly identifies this exact
  phrase family (يُعتبر / يُستخدم / يُلاحظ) as flagged in all three files.
  Egyptian's and Levantine's dialect-specific avoidance strategies
  (generic-subject active, صار+noun, participle-stative, dropped subject)
  are kept as a "Dialect fixes" list rather than merged into MSA's single
  fix instruction, because they are meaningfully different techniques, not
  paraphrases of the same fix.

  **Deliberately NOT merged:** SM-MSA-006 (تم/يتم periphrastic passive) was
  considered for merging into AR-SH-007 but kept separate as AR-MSA-006,
  because (a) Egyptian's and Levantine's passive-voice patterns
  (SM-EGT-008, SM-SHM-014) list only the morphological يُفعل-type passive
  forms in their trigger lists, not تم/يتم, so a merge would have
  misattributed a تم/يتم claim to files that don't make it; and (b)
  SM-MSA-006 carries a stricter, separately-numbered critical threshold in
  MSA that doesn't map onto SM-MSA-026's threshold — collapsing the two
  would have lost that distinction (see `docs/CONFLICTS.md` C-07 for the
  general severity-mismatch problem this avoids).

## 3. Single-source generalizations (patterns promoted to ar-shared despite
   only one upstream file naming them)

Two patterns in `ar-shared.md` are sourced from only one variety file, not
"≥2 files independently make this claim" as with the other five. Both
decisions are made explicit here rather than silently presented as
cross-variety consensus:

- **AR-SH-005 (List-Instead-of-Argument), from SM-MSA-015 only.** Neither
  the Egyptian (`_sources/semitic/skills/humanizer-ar-egt/SKILL.md`) nor
  the Levantine (`_sources/semitic/skills/humanizer-ar-shami/SKILL.md`)
  25-pattern catalogs contain a dedicated list-overuse pattern — confirmed
  against the full pattern listing in `docs/inventory/semitic.md` §3.2-3.3.
  This was promoted to `ar-shared.md` anyway (rather than kept in
  `ar-msa.md`) because the task brief names "list-instead-of-argument" as
  one of the patterns expected in the shared file, and because the
  underlying claim — a bulleted list substituting for connected argument
  reads as AI — is a document-formatting issue with no plausible reason to
  be MSA-specific. This is an editorial generalization, not a documented
  cross-variety finding; flagged here so a later reviewer can downgrade it
  to MSA-only if that judgment is disputed.

- **AR-SH-006 (Translated-from-English Discourse Structures) — partially.**
  The *phrase family* (formal ritual openers/hedges) is genuinely
  cross-variety per inventory §4. The *"translated from English"
  explanation* for why it's a tell is Egyptian-only (SM-EGT-011,
  SM-EGT-015). This is not a full single-source generalization like
  AR-SH-005 — the pattern itself is cross-variety — but the specific
  etiology claim in its title and "why it reads as AI" section is
  attributed only to Egyptian and should not be read as something MSA's or
  Levantine's files independently assert.

- **AR-SH-003 (Significance Inflation) — synthesized label.** No upstream
  file uses this term. It merges: MSA's formulaic-conclusion grandiose-claim
  sub-case (SM-MSA-005) and dead-metaphor examples (SM-MSA-019), Egyptian's
  hyper-formal closing (SM-EGT-012), and Levantine's closing-equivalence
  table (SM-SHM-012). Each of those patterns independently describes
  closing/topic sentences asserting outsized importance via stock phrasing;
  none names the phenomenon "significance inflation." The label and
  "why it reads as AI" framing are original to this port; the phrase
  examples and the before/after pair are upstream-sourced (see the
  provenance table for exact citations).

## 4. Dropped statistics (quote + line, per owner decision: drop every
   uncited statistic/benchmark/BLEU/percentage from prose, keep the
   patterns)

All of the following were present in the upstream source material relevant
to the patterns used in `ar-shared.md`/`ar-msa.md` and are **not**
reproduced as fact anywhere in either file. Where a pattern's trigger still
needed *some* actionable guidance, it was rewritten qualitatively (see the
"Dropped statistic" notes inline in `ar-msa.md`) instead of citing the
number.

1. `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:40` — "AI hedges at
   three to four times the human rate." (Category 1 intro, feeds
   AR-SH-001/AR-MSA-001.) Dropped; not reproduced anywhere.
2. `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:164` — "Count
   conjunctions-per-sentence average: above 3.5 per sentence across a
   paragraph signals AI writing." (SM-MSA-009, AR-MSA-009.) Dropped; entry
   now says only that a chain connecting more than ~3 items is the trigger
   shape, without the 3.5 average claim.
3. `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:212` (Pattern 12
   trigger, "60%") — "more than 60% of a paragraph's sentences share
   opening template." (SM-MSA-012, AR-MSA-012.) Dropped from prose; entry
   now says "most of a paragraph's sentences" with an inline note that the
   percentage was dropped.
4. `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:226` — "Human MSA text
   shows variance above 40% of the mean sentence length. AI text clusters
   sentences in the 15-22 word range." (SM-MSA-013, AR-SH-004/AR-MSA-013.)
   Dropped; both entries now describe the *shape* of the tell (every
   sentence the same length) without the percentage/word-range figures.
5. `_sources/semitic/skills/humanizer-ar-egt/SKILL.md:262` (approx.,
   Pattern 10 trigger) — "all sentences ~12-20 words with little variance."
   (SM-EGT-010, cited in AR-SH-004.) The word-count band itself is not
   reproduced in `ar-shared.md`; only "a different, narrower word-count
   band" is stated.
6. `_sources/semitic/skills/humanizer-ar-shami/SKILL.md:905-936` (Pattern 24
   trigger) — "sentences hover 15-25 words... range 3 to 50+ words across
   the text." (SM-SHM-024, cited in AR-SH-004.) The specific bands are not
   reproduced; only the qualitative "swings from short fragments to very
   long paratactic chains" is kept.
7. `_sources/semitic/skills/humanizer-ar-shami/SKILL.md:923-924` — "Sentence
   length uniformity is one of the most robust machine-learning features for
   AI text detection in Arabic." Dropped in full; not cited or paraphrased
   anywhere in `ar-shared.md`.
8. `_sources/semitic/skills/humanizer-ar-shami/SKILL.md:703-705` — "Studies
   on Arabic authorship attribution show that the presence of tashkeel in
   non-religious text is one of the strongest single-feature predictors of
   AI authorship." (SM-SHM-018, cited in AR-SH typography section.) Dropped
   — the typography section states the tashkeel policy (don't add/strip
   unless the source does) without repeating this claim.
9. `_sources/semitic/skills/humanizer-ar-shami/SKILL.md:471-472` — "Stylometric
   research on Arabic text shows that discourse particle frequency and
   distribution is one of the strongest human/AI discriminators."
   (SM-SHM-011 — not used in either file; noted here because it sits in the
   same phrase-family territory as AR-SH-001/006 and was deliberately left
   out rather than folded in under this claim.)
10. `_sources/semitic/skills/humanizer-ar-shami/SKILL.md:528-529` —
    "Stylometric research on human Arabic text confirms that 'formal tone
    consistency'... is a primary AI authorship marker." (SM-SHM-013 — not
    used in either file, same reasoning as #9.)
11. `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:114-125` (Pattern 6
    trigger) — "flag any paragraph with >1 [تم/يتم construction], or overall
    rate >3 per 300 words" and the CRITICAL note "reduce to at most one per
    300 words" (`SKILL.md:491`). (SM-MSA-006, AR-MSA-006.) The specific
    per-word-count rate is dropped from prose; the entry now says
    "repeated within a single paragraph, or noticeably dense across the
    piece."
12. README.md and Levantine SKILL.md BLEU-score claims (1.3 BLEU / 23 BLEU,
    "17x gap") and the "3,000+ Turkish borrowings" and "22 Arab
    countries / 400 million speakers" claims (inventory §8 items 1, 4-6,
    14) — none of these are cited anywhere in `ar-shared.md` or `ar-msa.md`;
    they belong to Levantine and Egyptian content out of this port's direct
    scope and were never drafted in, so there is nothing to remove, only to
    confirm as absent.

**Kept as operational (not epistemic) thresholds, not dropped:** a handful
of length/count numbers remain in `ar-msa.md` and `ar-shared.md` where they
function as a *trigger for when to apply a fix* rather than a claim about
measured AI-vs-human distributions — e.g. "no metaphor in texts longer than
~300-400 words" (AR-MSA-019), "more than ~5 items in an argumentative list"
(AR-SH-005), "insert a short 5-9 word sentence" (AR-SH-004 fix
instruction), ">2 per 200 words" for the morphological passive family
(AR-SH-007). These are hedged with "roughly"/"~" and are not presented as
measured findings; they were judged to be necessary for the pattern to be
actionable at all, unlike the epistemic "AI text scores X" claims listed
above. A stricter future pass could remove these too if the owner wants
zero numbers anywhere, including operational ones.


---

<!-- source fragment: docs/dedup-log/en.md -->

## Dedup log — EN catalog

Every merge, split, drop, and vocabulary-placement decision made while
building `skills/humanizer-pro/references/en-patterns.md` and
`en-vocabulary.md` from `docs/DEDUP-MAP.draft.md`, `docs/CONFLICTS.md`, and
the two upstream sources.

## Merges (followed docs/DEDUP-MAP.draft.md as researched)

These merges match the draft map's row without material change: the fix
kept, the carve-outs kept, and the reasoning are as stated in
`docs/DEDUP-MAP.draft.md`.

| EN id | Merge | Fix/threshold kept and why |
|---|---|---|
| EN-003 | BL-003 ← AW-021, AW-078 | Kept BL-003's fix (replace the saying with the specific claim) as the umbrella; AW-078's narrower "performed-insight" detector folded in as additional trigger phrases rather than a second entry, per the map's own recommendation. |
| EN-004 | BL-004 ← AW-018, AW-037, AW-042 | Kept BL-004's register carve-out ("Honestly/look inside a casual sentence is ordinary") since neither AW-018/037/042 publishes an equivalent. |
| EN-006 | BL-013 ← AW-020, AW-055, AW-061, AW-072 (+ AW-022, see split note below) | Kept BL-013's carve-out ("if the source states real plans, use those") and AW-020's P0 tag as the anchor severity. |
| EN-007 | BL-014, no merge | Kept as its own rule per the map — AW-033/039 target a different phenomenon (unnamed-authority attribution vs. relationship-vagueness); folding would lose BL-014's anti-fabrication carve-out. |
| EN-008 | BL-015 ← AW-040 | Kept BL-015's carve-out (rider only when the source supports the claim, even when attributed to a named person). |
| EN-009 | BL-016 ← AW-041, AW-057 | Kept BL-016's trigger list merged with AW-041's; kept AW-057 as a named launch-copy sub-case. |
| EN-011 | BL-023 ← AW-050, AW-051 | Kept BL-023's fix merged with AW-050's P0 anchor. |
| EN-018 | AW-044, no BL partner | Standalone per the unique-to-AW list. |
| EN-020 | BL-006 ← AW-012, AW-084 | Kept BL-006's carve-out ("keep three real items when the meaning needs three") verbatim — AW-012 publishes none. |
| EN-021 | BL-007 ← AW-082 | Kept BL-007's carve-out for deliberate rhetorical repetition; AW-082's wording on *when* it's a tell is functionally identical, so no conflict to resolve. |
| EN-023 | BL-009 ← AW-010, AW-023, AW-065, AW-071 | Kept BL-009's human-habit carve-out ("perhaps, tends to are human habits") — none of the four AW entries publish an equivalent. |
| EN-024 | BL-010 ← AW-048, AW-049 | Kept BL-010's general grammar rule as the base (hyphen before noun, not after); AW-049's curated subclass list is additional coverage, not a replacement. |
| EN-025 | BL-011 ← AW-030 | Kept BL-011's plain fix ("use active voice when it makes the actor and action clearer"); AW-030 supplies no fix text of its own beyond the trigger. |
| EN-026 | BL-018 ← AW-029 | Kept BL-018's plain instruction ("use is, are, has"). |
| EN-027 | BL-021 ← AW-005, AW-006 | Kept AW-005's more detailed locale-punctuation carve-out plus AW-006's inverse-case guidance (preserve a human's typos when editing casual text) — neither is in BL-021. |
| EN-033 | BL-019 ← AW-002 | Kept BL-019's stronger fix (turn a labeled list into prose) combined with AW-002's numeric guardrail (one bold phrase per section at most). |

## Merges that diverge from the draft map (with reasoning)

The draft map is explicitly a research map, not a final ID assignment
(`docs/DEDUP-MAP.draft.md`'s own scope note). The following final
assignments depart from its suggested grouping; each is logged because the
map suggested a different placement or left the question open.

- **EN-002 (BL-002 ← AW-035, AW-079, AW-085).** The draft map listed
  AW-022 under this row too ("also cross-listed under BL-013… pick one
  home during ID assignment, don't duplicate the rule"). Assigned AW-022
  to EN-006 (BL-013's inflation family) instead, because AW-022's own text
  ("may become one of the most important narratives of the next market
  cycle") is closer to BL-013's future-looks-bright send-off example than
  to BL-002's fragment/closer shape. Logged per the map's own instruction
  to pick one home.
- **EN-001 (BL-001 ← AW-007, AW-063, AW-073, AW-083).** Followed the map's
  explicit recommendation to fold AW-063/073/083 in as sub-cases of one
  family rather than three separate rules, despite their partial-match
  status, because their fixes are variations on the same "don't manufacture
  a contrast" instruction (reach for a real opposite / cut the invented
  crowd / ration the stranded-auxiliary rhythm), not genuinely different
  edits.
- **EN-005 (BL-005 ← AW-062, AW-069).** Kept merged per the map, but
  unlike the map's severity note (which flags this as a mismatch to
  resolve via C-09/C-14), assigned P1 as the merged severity, anchored on
  AW-069's tag rather than treating blader's un-tagged "weak" framing as
  authoritative, since BL-005 is not in blader's own *(weak alone)* list
  (`blader/SKILL.md:169` names only §8-11 and §21).
- **EN-009 (BL-016 ← AW-041, AW-057).** Followed the map, and additionally
  logged AW-057's judgment-only surfaces (bare "Enter X.", "Meet X, your
  new [role]") as carve-outs in the EN-009 entry itself, since the map
  summarized AW-057 without reproducing its stated exceptions.
- **EN-010 (BL-017 ← AW-033, AW-039) + AW-038.** The draft map's row for
  BL-017 lists only AW-033 and AW-039. AW-038 (Notability name-dropping)
  was in the map's "unique to AW" list, not merged anywhere. Folded AW-038
  into EN-010 anyway: both AW-033/039 (vague/unnamed authority) and AW-038
  (specific, over-cited authority) are the same underlying move — borrowing
  external prestige to prop up a claim — just with the authority named vs.
  unnamed. Logged as a fold beyond the draft map's own research.
- **EN-012 (BL-025 ← AW-077).** The draft map explicitly lists BL-025 as
  "no AW equivalent found" and separately lists AW-077 (Diff-anchored
  writing) as "unique to AW — no BL merge partner found." Both descriptions
  are wrong: BL-025 ("Writing about the previous version") and AW-077
  ("Diff-anchored writing," documentation narrating a change instead of
  describing current behavior) describe the same phenomenon with the same
  fix (describe current behavior; keep prior-version language only in
  changelogs/release notes/migration guides). Merged as EN-012. See
  `docs/discrepancies/en.md` for this as a logged discrepancy against the
  draft map.

## Splits (fixes genuinely differ from a merged/partial row)

| Split | Reasoning |
|---|---|
| EN-007 (BL-014) vs. EN-010 (BL-017/AW-033/038/039) | Not a split of one row so much as confirming the draft map's own "no merge" call: BL-014 targets relationship-vagueness ("associated with"), EN-010 targets authority-borrowing ("experts believe," prestige lists). Different trigger phrases, different fixes (name the relationship vs. name or cut the source). Kept separate as the map recommended. |
| EN-034 (BL-020/AW-003/047) vs. EN-036 (AW-004/076) | The draft map's BL-020 row folds AW-076 in as "a related but separate structural rule." Split confirmed: EN-034's fix is decoration removal (sentence case, drop emoji/rules) on a per-heading basis; EN-036's fix is a document-level density judgment (too many headings/bullets for the word count) requiring structural-editing scope. Different trigger conditions (presence of decoration vs. count/density) and different authorization requirements. |
| EN-021 (BL-007/AW-082, language) vs. EN-046 (AW-086/017/019, structural detection) | The draft map's BL-007 row notes AW-086 "also covers paragraph-length and vocabulary-repetition uniformity — keep those aspects as a separate rule, not folded into BL-007." Followed that instruction: EN-021's fix is a per-passage rewrite (merge/vary the repeated opener); EN-046's fix is a whole-document diagnostic (vary rhythm by clarifying the source, not a word-count band) that folds in AW-017 (uniform paragraph length) and AW-019 (suspiciously clean grammar) as the same whole-document judgment call. |
| EN-041 (BL-022/AW-036/068/070, communication) vs. EN-050 (AW-053/054, tool fingerprints) | The draft map's BL-022 row keeps AW-053-style markup-leak detection as a "mechanical sub-check" alongside the chatbot-residue umbrella, since BL-022 has no equivalent for literal citation-markup leaks. Split into two entries instead of one: EN-041's fix is judgment-based removal of a verbal wrapper ("remove the wrapper, keep the content"); EN-050's fix is mechanical token-stripping with zero judgment involved ("the token itself is enough" — `avoid-ai-writing/references/patterns.md:385`). The two fixes don't share a decision procedure, so kept as separate catalog entries rather than one entry with sub-cases. |
| EN-011 (BL-023/AW-050/051, content) vs. EN-051 (AW-052, tool fingerprints) | The draft map's BL-023 row treats AW-052 (unfilled placeholders) as "a related but mechanically distinct leftover-artifact tell." Split confirmed: EN-011's fix requires judgment (state what the source doesn't show, or cut); EN-051's fix is mechanical (fill from source or flag, full stop) and the trigger is a literal bracket-shaped token, not a prose pattern. |
| EN-035 (BL-024, structure) vs. EN-042 (AW-075, communication) | The draft map calls this "the weakest merge in the table" and explicitly suggests "consider keeping as two related-but-distinct rules." Took that suggestion: BL-024's trigger is a heading immediately followed by a one-line restatement (a structural/formatting shape); AW-075's trigger is a reply opener that recaps a person's own prior work with praise (a conversational/register shape). Different fixes (delete the restated sentence vs. delete the recap-and-praise frame while keeping any real thanks), different categories. |

## Vocabulary placements (BL-012 → en-vocabulary.md tiers)

BL-012's flat 28-word list has no cluster/density distinction of its own.
Each word was placed in the AW tier whose *trigger definition* fits it —
not by guessing at BL's intent, since blader's SKILL.md gives no tier
signal beyond "the only vocabulary list in this skill."

| BL-012 word | Placement | Reasoning |
|---|---|---|
| delve, landscape, tapestry, testament (to), robust, pivotal, underscore(s), meticulous/meticulously, deep dive, intricate/intricacies, vibrant, quietly, enduring, fostering, showcase | Already covered (Tier 1A/2, via inflection rule) | Same word or a listed morphological variant already exists in AW's tables; AW's own "match inflected forms" rule (`patterns.md:33`) means no new row was needed. Logged so the 28-word list's full coverage is traceable, not silently dropped. |
| bolstered | Already covered → Tier 2 `bolster` | Inflected form of an existing Tier 2 entry. |
| additionally | New row, Tier 1B | AW's own catalog treats "Additionally" as a transition phrase (EN-030) rather than a vocabulary-tier word. Placed as a new Tier 1B row (clarity edit, not authorship evidence) rather than duplicating it as a trigger phrase under EN-030, since BL-012 presents it as a vocabulary item specifically. |
| actually (filler sense) | New row, Tier 2 | Also covered under EN-028 (hollow intensifiers, AW-008) as a sentence-structure rule with the same correction-word carve-out. Kept in both places — the vocabulary table and the sentence-structure catalog test different things (density-in-a-paragraph vs. per-sentence judgment) — logged rather than silently duplicated. |
| align with | New row, Tier 2 | No AW tier equivalent; fits Tier 2's "legitimate alone, flag in clusters" definition — a figurative collocation like the existing `resonate with`. |
| enhance | New row, Tier 2 | No AW tier equivalent; common enough alone that Tier 1A (single-instance strong signal) would overclaim without AW's stated frequency evidence behind it. |
| garner | New row, Tier 2 | No AW tier equivalent. |
| gate/gated/gating (figurative) | New row, Tier 2, with BL's own technical-use carve-out preserved | No AW tier equivalent; BL-012's carve-out ("keep technical uses") kept verbatim since AW's own technical-exemption list (`patterns.md:667`) does not name gate/gated/gating — a real value-add from BL, not duplicated coverage. |
| highlight (verb) | New row, Tier 2 | No AW tier equivalent; distinct from Tier 1A's `underscores`, which AW treats as the stronger frequency marker for the same general move. |
| key (adjective) | New row, Tier 3 | Not Tier 1A/2: AW itself lists "key" as a *suggested replacement word* for other entries (e.g. `crucial → important, key, necessary`). Flagging bare "key" as a tell only at density (Tier 3), never per-instance, avoids contradicting AW's own fix vocabulary. Logged as a discrepancy in `docs/discrepancies/en.md`. |
| valuable | New row, Tier 3 | Not in any AW tier; common enough that a density threshold avoids false positives on ordinary formal writing. |

## Drops (id, reason)

| Id | Reason |
|---|---|
| BL-012 | Not a catalog entry in en-patterns.md — it's a vocabulary list, moved wholesale to en-vocabulary.md and folded word-by-word into AW's tiers per the table above. |
| AW-013 | The tier table itself (`patterns.md:25-213`) — moved to en-vocabulary.md as the file's spine rather than a single EN catalog entry, since it is the tier system, not one pattern among 55. |
| AW-014 | Judgment-only P2 caveat attached to the vocabulary tiers (crypto "proof"/"proof point" collision) — moved to en-vocabulary.md as a "Domain-term caveat" section rather than a standalone EN entry, since it only makes sense in the context of the vocabulary tables it qualifies. |
| AW-090 | "When to rewrite from scratch vs. patch" (`patterns.md:602-604`) is process/workflow guidance about *how much* to edit once findings exist, not a detectable AI-writing pattern itself — confirmed by `docs/inventory/avoid-ai-writing.md`'s own classification of it as "Meta." No EN catalog entry; noted in `docs/provenance/en.md`'s drop table as `origin: humanizer-pro` workflow guidance to preserve for a future skill-level "how much to rewrite" section, not lost. |
