# Dedup log — `ar-shared.md` and `ar-msa.md`

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
