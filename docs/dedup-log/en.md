# Dedup log — EN catalog

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
