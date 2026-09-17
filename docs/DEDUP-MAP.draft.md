# English dedup map (draft) — blader (BL-001…025) vs avoid-ai-writing (AW-001…090)

Scope: English-language patterns only (blader's 25-pattern catalog and
avoid-ai-writing's 90 distinct named `###` entries, per
`docs/inventory/blader.md` §3 and `docs/inventory/avoid-ai-writing.md` §3).
This is a **research map**, not a final ID assignment — no `EN-001…` ids are
minted here. Every BL id and every AW id appears exactly once below: either
in a merge row (as the row's primary BL id, or listed under an existing row's
AW column) or in the "Unique to one source" lists.

One row per BL id (all 25 rows present). "Same tell?" is yes/partial/no,
judged against the actual detection trigger and fix text in both sources, not
just the pattern name.

## Merge map

| Proposed merged concept | BL id(s) | AW id(s) | Same tell? | Which fix/threshold to keep and why | Notes |
|---|---|---|---|---|---|
| Not-X-but-Y contrast, split-sentence negation, mirrored/stranded contrast | BL-001 | AW-007, AW-063, AW-073, AW-083 | yes (AW-007 core); partial (AW-063/073/083 are contrast-family variants: invented mirrored pairs, dramatized crowd-contrast, stranded auxiliary contrast) | Keep BL-001's carve-out ("keep a contrast only when the negative half corrects a belief the reader actually holds, or when both halves carry information") — AW-007 has no published carve-out text in the inventory, only the trigger/fix. Fold AW-063/073/083 in as sub-cases of the same family rather than 3 separate rules. | BL-001 is "act on one sighting" (not weak-alone); AW gives AW-007 no P-tier (judgment-only) but AW-063 is P1 — minor severity mismatch, resolve per C-09/C-14 in CONFLICTS.md. |
| One-line closers, dramatic fragments, staccato drama, negation-chain fragments, generic/social closers | BL-002 | AW-022 (partial, "future looks bright" send-offs — also tags to BL-013), AW-035, AW-059, AW-079, AW-085 | partial — BL-002's own examples ("No aesthetic prior. No nostalgia.") are the literal AW-079 negation-chain trigger; AW-035/059/085 are adjacent closer-family patterns, not identical triggers | Keep BL-002's fix ("cut a closer that repeats... merge a row of fragments into a sentence with a specific claim") as the umbrella; keep AW-085's more specific "staccato drama" framing as a named sub-case since it names the setup/reversal punchline shape BL-002 doesn't call out. | AW-022 is also cross-listed under BL-013 (inflated significance) — it straddles both "closer" and "inflation" families; pick one home during ID assignment, don't duplicate the rule. |
| Sayings that sound deep / aphorism formulas / performed insight | BL-003 | AW-021, AW-078 | yes (AW-021); partial (AW-078 performed-insight is a narrower sub-case, "the real insight here is") | Keep BL-003's fix ("replace the saying with the specific claim") — AW-021 has no published carve-out; BL-003 has none either, so no carve-out conflict. AW-078's detector is explicitly partial (omits literal "the punchline"/"worth naming"), so keep BL's broader trigger list as primary. | — |
| Staged run-up / formulaic openers / "Let's" constructions / formulaic challenges | BL-004 | AW-018, AW-037, AW-042 | yes | Keep BL-004's carve-out — "'Honestly' or 'look' inside a casual sentence is ordinary; the tell is the standalone opener before a routine claim" — none of AW-018/037/042 publish an equivalent register carve-out per the inventory, so this is a real value-add from BL to keep. | AW-042 (formulaic challenges) shares AW's `formulaic-opener` detector type with AW-018, confirming they're the same underlying rule in AW's own engine. |
| Arguing with no one / false concession / narrated candor | BL-005 | AW-062, AW-069 | yes (AW-062 false-concession is a near-exact match to BL-005's "Some might say... but" / "A tempting approach would be"); partial (AW-069 narrated candor targets the "I'm not saying / to be clear" announced-honesty flavor specifically) | Keep BL-005's carve-out ("keep an objection the text attributes or answers in full, and keep an option a reader would actually weigh... several unrelated rejections in a row are a stronger sign than one") — AW-069's only published carve-out is narrower (conflict-of-interest disclosure only). Union the carve-outs. | AW-069 is explicitly "judgment-only; tried and reverted as a detector" per the inventory — corroborates BL's own "weak" framing isn't stated but the practical difficulty is the same. |
| Forced triads / compulsive rule of three / colon-into-a-triple | BL-006 | AW-012, AW-084 | yes (AW-012); partial (AW-084 is the colon-specific sub-case: "three things: X, Y, and Z") | Keep BL-006's carve-out ("keep three real items when the meaning needs three") verbatim — AW-012 has no published carve-out in the inventory. | — |
| Repeated sentence openings / rhythm-and-uniformity (opener sub-case) | BL-007 | AW-082, AW-086 (partial) | yes (AW-082); partial (AW-086 rhythm/uniformity is a broader stylometric rule that includes but isn't limited to repeated openers) | Keep BL-007's carve-out for deliberate rhetorical repetition ("She came. She saw. She conquered.") — AW-082's carve-out is functionally the same ("Deliberate anaphora is a rhetorical device... a run that isn't doing persuasive work is a tell"), so these agree; keep AW's wording since it's more precise about *when* it's a tell. | AW-086 also covers paragraph-length and vocabulary-repetition uniformity — keep those aspects as a separate rule, not folded into BL-007. |
| Dashes as universal connector (em/en dash rule) | BL-008 | AW-001 | yes, but thresholds conflict — see `docs/CONFLICTS.md` C-01 | Do not resolve here; this is a conflict, not a simple dedup. Carry both threshold texts into the conflict-resolution step. | Marked *(weak alone)* in BL; AW-001 has no severity tag in the catalog table but a numeric hard cap in prose and weight-0 in the detector — see C-01/C-09. |
| Stacked qualifiers / hedging / hedge-stacked predictions / parenthetical hedging / confidence calibration | BL-009 | AW-010, AW-023, AW-065, AW-071 | yes (AW-010, AW-023 core); partial (AW-065 parenthetical hedging and AW-071 confidence-calibration are narrower syntactic sub-cases of the same overclaiming-repair phenomenon) | Keep BL-009's carve-out ("keep scope statements, legal and safety notices, and real corrections. Ordinary hedges such as *perhaps* or *tends to* are human habits and not tells") — none of the four AW entries publish an equivalent human-habit carve-out per the inventory; this is a real value-add to keep. | BL-009 is *(weak alone)*; AW-023 hedge-stack carries detector weight 6 (mid-high) — severity mismatch, resolve per C-09/C-14. |
| Hyphenated pairs everywhere / hyphenated modifier stacking / unnecessary hyphenation | BL-010 | AW-048, AW-049 | yes | Keep BL-010's grammar-based rule ("keep the hyphen before a noun when grammar needs it... drop it after the noun") — AW-049's detector is explicitly "curated subclasses only" (narrower coverage), so BL's general grammar rule should be the base with AW's curated list as additional coverage, not a replacement. | BL-010 is *(weak alone)*; AW-049 is P2 but detector weight 0 (non-scoring) — both effectively agree this is a weak/cosmetic signal. |
| Passive voice and missing subjects / subjectless fragments and agentless passives | BL-011 | AW-030 | yes | Keep BL-011's fix ("use active voice when it makes the actor and action clearer") — plain and unconditional; AW-030 is judgment-only with no published fix text beyond the trigger in the inventory, so BL supplies the operative guidance. | BL-011 is *(weak alone)*; AW-030 has no severity tag at all (unranked) — both effectively agree this needs corroboration before acting. See C-07 for the sharper MSA contrast. |
| Overused AI words (single-list) vs tiered vocabulary replacement table | BL-012 | AW-013 | yes, BL's 28-word list is a subset of AW's ~135-entry tiered table (112 word rows + 10 phrase rows, per `docs/inventory/avoid-ai-writing.md` §4) | Keep AW's tiered system (1A/1B/2/3 + phrases) as the base — it is strictly more granular and has documented per-tier weighting/review rules; fold BL's 28 words in by tier (most map to AW's Tier 1A/2, e.g. "delve," "robust," "meticulous" appear in both lists verbatim). | BL's carve-out ("gate/gated/gating... and robust keep their technical uses; a formal word outside the list is not a tell by itself") should be preserved — AW's technical-context exemption list is similar but not identical (covers robust, comprehensive, seamless, ecosystem, leverage, facilitate, underpin, streamline, harness — not gate/gating). Union both exemption lists. |
| Inflated significance / significance inflation / novelty inflation / lingering-attention / self-labeling significance | BL-013 | AW-020, AW-055, AW-061, AW-072 | yes (AW-020 core, near-verbatim match including the "marking a pivotal moment" example phrase in both); partial (AW-055/061/072 are adjacent inflation sub-cases: novelty framing, "will be remembered" claims, self-declared importance) | Keep BL-013's carve-out ("if the source states real plans, use those") — real, sourced future plans are not inflation. Keep AW-020's P0 tag as the anchor severity for the whole family. | AW-020 is explicitly P0 (AW's highest tier) — corroborates BL's implicit high priority (Section C intro: "the fact underneath is usually sound... remove the dressing"). AW-022 (generic future-narrative closers) is the "the future looks bright" send-off sub-case and is listed under BL-002 instead, since it's a closer-shape tell first; treat it as shared between the two families rather than duplicated here. |
| Vague connection or association | BL-014 | — | no — closest AW analogues (AW-033, AW-039, both merged under BL-017 below) target a different phenomenon (unnamed-authority attribution / vague third-party endorsement) rather than BL-014's specific "associated with / connected to / tied to" relationship-vagueness | Keep BL-014 as its own rule; its anti-fabrication carve-out ("If the source does not say, keep the vague wording rather than inventing a role") has no AW equivalent and should not be discarded by folding into AW-033/039. | No merge — kept separate so BL-014's "name the relationship" fix isn't lost inside BL-017's borrowed-authority rule. |
| Shallow -ing riders / superficial -ing analyses | BL-015 | AW-040 | yes | Keep BL-015's carve-out ("keep the rider only when the source supports what it claims [even when attributed to a named person]") — AW-040's detector is weight-0/style-only per the inventory (no scoring effect), consistent with BL's framing that the rider itself isn't inherently false, just unsupported. | — |
| Sales language / promotional language / launch-copy dramatic introductions | BL-016 | AW-041, AW-057 (partial) | yes (AW-041); partial (AW-057 is the specific "Enter Flowdesk" / "Meet X" launch-copy sub-case) | Keep BL-016's trigger list (boasts, vibrant, nestled, in the heart of, breathtaking, etc.) merged with AW-041's — both target advertisement-register prose; keep AW-057 as a named sub-case for product-launch openers specifically, since BL has no equivalent worked example. | BL-016's carve-out ("'groundbreaking' and 'rich' keep their literal senses") has no stated AW-041 equivalent — keep it. |
| Borrowed authority / vague attributions / vague third-party validation | BL-017 | AW-033, AW-039 | yes | Keep BL-017's carve-out — "A missing citation alone is not a tell; most writing is unsourced... Never invent a source... when the source does name a real source, use it" — this anti-fabrication framing is more developed than AW-033's published text in the inventory. Keep AW-033's P0 tag as the severity anchor. | — |
| Avoiding is/are/has / copula avoidance | BL-018 | AW-029 | yes | Keep BL-018's fix ("Use *is*, *are*, and *has*") as the plain instruction; AW-029 is judgment-only with the same trigger list shape (serves as, stands as, functions as, boasts, features, offers) per the inventory. | — |
| Bold as decoration / bold overuse | BL-019 | AW-002 | yes | Converges cleanly, see CONFLICTS.md "Non-conflicts checked." Keep BL-019's stronger fix ("turn a labeled list into prose when the labels carry no information of their own") combined with AW-002's numeric guardrail ("one bolded phrase per major section at most, or none" / detector fires past 3 bold spans). | — |
| Decorative headings / emoji in headers / title case headings / excessive structure | BL-020 | AW-003, AW-047, AW-076 (partial) | yes (AW-003, AW-047); partial (AW-076 excessive-structure is broader — too many headers/bullets overall, not just decoration) | Keep BL-020's fix (sentence case, remove decoration/rules, title stands once) merged with AW-003's emoji carve-out ("social posts may use one or two emoji sparingly — at the end of a line") and AW-047's technical-context suppression of title-case flagging. Keep AW-076 as a related but separate structural rule (see C-08 for its bullet-list analogue), plus fold in AW-075 (recap-flattery opener) as a partner to BL-024 instead — see below. | BL-020's "document opens with a top-level heading that repeats its own title" and "horizontal rule between every section" sub-cases have no direct AW equivalent — keep as BL-specific additions. |
| Curly quotation marks / immaculate typography | BL-021 | AW-005, AW-006 (partial) | yes (AW-005); partial (AW-006 immaculate-typography is a related but distinct register-fluency signal, not specifically about quote-curling) | Both sources agree curly quotes are weak/corroborating only — see CONFLICTS.md "Non-conflicts checked." Keep AW-005's more detailed carve-out (locale-correct punctuation for French/German — flagging the Arabic gap per C-03) plus AW-006's inverse-case guidance ("preserve a human's typos/contractions when editing casual text — smoothing them erases the fingerprint"), which BL-021 doesn't have. | — |
| Chatbot residue / chatbot artifacts / citation markup leaks / sycophantic tone / acknowledgment loops | BL-022 | AW-036, AW-053, AW-068, AW-070 | yes (AW-036 core, both call this the most certain/top-severity tell); partial (AW-053/068/070 are adjacent leftover-artifact sub-cases: raw citation markup, sycophancy, and repeated acknowledgment loops) | Keep BL-022's framing ("the most certain tell in this list... remove the wrapper and keep the content") as the umbrella instruction; keep AW-053/AW-054-style markup-leak detection as mechanical sub-checks since BL has no equivalent for literal citation-markup or UTM-parameter leaks (see AW-054 in the unique list). | AW-070 (acknowledgment loops) is explicitly "judgment-only; tried and retired" per the inventory — a detector limitation, not a rule disagreement. |
| Knowledge-limit disclaimers and guesses / cutoff disclaimers / speculative gap-filling / unfilled placeholders | BL-023 | AW-050, AW-051, AW-052 (partial) | yes (AW-050, AW-051); partial (AW-052 unfilled placeholders — literal `[insert X here]` residue — is a related but mechanically distinct leftover-artifact tell) | Keep BL-023's fix ("state what the source does not show, or remove the sentence. Never present a guess as a fact") merged with AW-050's P0 tag (cutoff-disclaimer is one of AW's highest-weight detector types at 10). | — |
| A heading repeated in the first sentence / recap-flattery opener | BL-024 | AW-075 (partial) | partial — AW-075's recap-flattery opener (restating a preceding prompt/heading with a flattering frame) is adjacent but not identical to BL-024's narrower "heading restated as a plain first sentence" | Keep BL-024's fix ("remove the repeated sentence") as the base; AW-075 adds the flattery-framing sub-case ("Great question about X — here's...") which BL-024 doesn't cover. | This is the weakest merge in the table — consider keeping as two related-but-distinct rules rather than one merged concept during ID assignment. |
| Writing about the previous version | BL-025 | — | no AW equivalent found | Keep as a BL-only rule; no fold-in needed. | Unique to blader — see list below. |

## Unique to one source

**Unique to blader (BL) — no AW merge partner found:**
- BL-025 — Writing about the previous version (`blader/SKILL.md:352-359`)

(BL-024 has only a weak partial partner, AW-075, and is listed in the merge
table above rather than here, per the task's "merge row or unique list"
instruction — treat it as borderline.)

**Unique to avoid-ai-writing (AW) — no BL merge partner found (36 ids):**

AW-004 Excessive bullet lists · AW-008 Hollow intensifiers · AW-009 Vague
endorsement ("worth [verb]ing") · AW-011 Missing bridge sentences ·
AW-014 Audience-fit domain-term collision · AW-015 Template phrases ·
AW-016 Transition phrases to remove or rewrite · AW-017 Uniform paragraph
length · AW-019 Suspiciously clean grammar · AW-024 Real/actual adjective
inflation · AW-025 Moral-adjective category errors · AW-026 Transformation
crutch · AW-027 Hashtag stuffing · AW-028 Bullet lists of bare noun phrases ·
AW-031 False agency · AW-032 Synonym cycling · AW-034 Filler phrases ·
AW-038 Notability name-dropping (+ historical analogy stacking) ·
AW-043 Speculative scenario openers · AW-044 False ranges ·
AW-045 Inline-header lists · AW-046 List-label periods · AW-054 AI-tool URL
parameters · AW-056 Infomercial engagement hooks · AW-058 Fake-casual
register · AW-060 Stock reaction framing · AW-064 Rhetorical question
openers (see CONFLICTS.md C-02 — no BL equivalent, and directly conflicts
with semitic) · AW-066 Numbered list inflation · AW-067 Reasoning chain
artifacts · AW-074 Wall-of-text replies · AW-077 Diff-anchored writing ·
AW-080 Dev-blog boilerplate · AW-081 Stacked rhetorical questions ·
AW-087 Vocabulary diversity (TTR) · AW-088 Paragraph-reshuffle immunity ·
AW-089 Treadmill effect / low information density.

(That is 36 listed ids; AW-090 "When to rewrite from scratch vs. patch" is
excluded from both the merge table and this list — it is a meta/process
section per `docs/inventory/avoid-ai-writing.md` §3, not a detectable
pattern, and should carry forward as workflow guidance rather than a
catalog entry.)

## AW detector `type`s with no `###` catalog entry

Per `docs/inventory/avoid-ai-writing.md` §15 ("Group B — detector-only, no
skill prose"), four of the engine's 53 `type`s exist purely as stylometric
math over the whole document and have no corresponding `###` section in
`references/patterns.md` at all:

- `punct-distribution`
- `fnword-trigram-entropy`
- `cross-para-burstiness`
- `normalization-flag`

These are detector-only signals (used in AW's trinary
HUMAN_ONLY/MIXED/AI_ONLY classifier as "weak corroborators," per
`docs/inventory/avoid-ai-writing.md` §8) with no editorial rule text to merge
against blader at all — flag for later phases as engine-only signals, not
candidates for the EN-* prose catalog.

## How to verify

- BL pattern text: `sed -n '1,374p' _sources/blader/SKILL.md` (or per-pattern
  line ranges in `docs/inventory/blader.md` §3).
- AW pattern text: `sed -n '1,604p' _sources/avoid-ai-writing/references/patterns.md`
  (or per-pattern line ranges in `docs/inventory/avoid-ai-writing.md` §3).
- AW detector type count / Group B list:
  `grep -n "TYPE_LABELS" _sources/avoid-ai-writing/detector/patterns.js`;
  `sed -n '1,30p' _sources/avoid-ai-writing/detector/CATEGORIES.md`.
- Tier-1A word overlap with BL-012's list: compare
  `sed -n '198,206p' _sources/blader/SKILL.md` against
  `sed -n '49,99p' _sources/avoid-ai-writing/references/patterns.md`.
