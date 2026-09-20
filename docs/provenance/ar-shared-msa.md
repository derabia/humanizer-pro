# Provenance — `ar-shared.md` and `ar-msa.md`

Source pin: `_sources/semitic`, commit `2c9d4fbe3e0086d373b59bfebc9556082275cf62`.

File hashes at that commit (SHA-256, verified in this working tree):

| File | SHA-256 |
|---|---|
| `_sources/semitic/skills/humanizer-ar-msa/SKILL.md` | `9369a13cde29dfc66e9723552a42cf67da1e486b1720c66121fdc619b6ed4275` |
| `_sources/semitic/skills/humanizer-ar-egt/SKILL.md` | `2c34cce45a0f38ac80a64ff90bdb37231ecd0a6161697a6dc3e3c3c33734a71e` |
| `_sources/semitic/skills/humanizer-ar-shami/SKILL.md` | `f3025a659cd00e94d1c22bcdae2c2026326925bdf8b5a79b0a363923d734d58c` |

## `skills/humanizer-pro/references/ar-shared.md`

| ar-shared id | Source SM ids | File:line | SHA-256 (file) |
|---|---|---|---|
| AR-SH-001 Hedging Overload | SM-MSA-001, SM-MSA-008 | `humanizer-ar-msa/SKILL.md:44-55,148-159` | `9369a13c...b6ed4275` |
| AR-SH-001 (dialect cross-ref) | SM-EGT-011 | `humanizer-ar-egt/SKILL.md:280-304` | `2c34cce4...33734a71e` |
| AR-SH-001 (dialect cross-ref) | SM-SHM-012 | `humanizer-ar-shami/SKILL.md:486-515` | `f3025a65...d734d58c` |
| AR-SH-002 Formulaic Transitions and Conclusions | SM-MSA-003, SM-MSA-004, SM-MSA-005 | `humanizer-ar-msa/SKILL.md:72-111,490,626` | `9369a13c...b6ed4275` |
| AR-SH-002 (dialect cross-ref) | SM-EGT-012 | `humanizer-ar-egt/SKILL.md:307-328` | `2c34cce4...33734a71e` |
| AR-SH-002 (dialect cross-ref) | SM-SHM-012 | `humanizer-ar-shami/SKILL.md:486-515` | `f3025a65...d734d58c` |
| AR-SH-003 Significance Inflation via Formulaic Closings | SM-MSA-005, SM-MSA-019 (dead-metaphor examples) | `humanizer-ar-msa/SKILL.md:100-111,324-335` | `9369a13c...b6ed4275` |
| AR-SH-003 (dialect cross-ref) | SM-EGT-012 | `humanizer-ar-egt/SKILL.md:307-328` | `2c34cce4...33734a71e` |
| AR-SH-003 (dialect cross-ref) | SM-SHM-012 | `humanizer-ar-shami/SKILL.md:486-515` | `f3025a65...d734d58c` |
| AR-SH-003 label itself | none — synthesized label, not an upstream category name | n/a | n/a — see dedup log |
| AR-SH-004 Uniform Sentence Rhythm | SM-MSA-013 | `humanizer-ar-msa/SKILL.md:224-235,492` | `9369a13c...b6ed4275` |
| AR-SH-004 (dialect cross-ref) | SM-EGT-010 | `humanizer-ar-egt/SKILL.md:260-271` | `2c34cce4...33734a71e` |
| AR-SH-004 (dialect cross-ref) | SM-SHM-024 | `humanizer-ar-shami/SKILL.md:905-936` | `f3025a65...d734d58c` |
| AR-SH-005 List-Instead-of-Argument | SM-MSA-015 (single-source — see dedup log for the generalization decision) | `humanizer-ar-msa/SKILL.md:255-272` | `9369a13c...b6ed4275` |
| AR-SH-005 carve-out (feature comparisons/step lists) | not upstream in `_sources/semitic` — imported from `docs/CONFLICTS.md` C-08 (`avoid-ai-writing/references/patterns.md:13`) | n/a | n/a |
| AR-SH-006 Translated-from-English Discourse Structures | SM-EGT-011, SM-EGT-015 | `humanizer-ar-egt/SKILL.md:280-304,362-378` | `2c34cce4...33734a71e` |
| AR-SH-006 (phrase-family cross-ref, no English-etiology claim) | SM-MSA-001, SM-MSA-008 | `humanizer-ar-msa/SKILL.md:44-55,148-159` | `9369a13c...b6ed4275` |
| AR-SH-006 (phrase-family cross-ref, no English-etiology claim) | SM-SHM-012 | `humanizer-ar-shami/SKILL.md:486-515` | `f3025a65...d734d58c` |
| AR-SH-007 Formal Passive Disguise | SM-MSA-026 | `humanizer-ar-msa/SKILL.md:431-442` | `9369a13c...b6ed4275` |
| AR-SH-007 (dialect cross-ref) | SM-EGT-008 | `humanizer-ar-egt/SKILL.md:222-236` | `2c34cce4...33734a71e` |
| AR-SH-007 (dialect cross-ref) | SM-SHM-014 | `humanizer-ar-shami/SKILL.md:545-571` | `f3025a65...d734d58c` |
| AR-SH-008 Vocabulary Concentration | `origin: humanizer-pro` | n/a | n/a |
|, rationale | No upstream file in `_sources/semitic` states a lexical-variety or vocabulary-concentration rule. The three variety files cover sentence-length rhythm (SM-MSA-013, SM-EGT-010, SM-SHM-024) and mechanical synonym rotation for a single claim (SM-MSA-007, absorbed as `ar-msa.md` AR-MSA-007); neither measures how much of a document's content vocabulary one word carries, nor type-token ratio. Confirmed by direct search across all three Arabic `SKILL.md` files. The idea of adding a statistical, corpus-calibrated lexical layer is credited to finestructure-ai/humanizer-multilingual (MIT) per the competitive-analysis document (kept outside the published repository) §6 row IMP-23; the two statistics, the Arabic function-word stoplist, the 80/200-token applicability floors and both numeric gates are this project's own, measured over `corpus/` (see `docs/evidence/round1-wave2F-vocab-distribution.txt`) and not reproduced from that source. | | |
| Typography and numbers (whole section) | `origin: humanizer-pro` | n/a | n/a |
| — rationale | No upstream file in `_sources/semitic` addresses Arabic punctuation glyphs (، ؛ ؟), quotation-mark convention (« » vs ""), tatweel, or Arabic-Indic vs. Western digit convention as a dedicated rule. Confirmed by direct search per `docs/inventory/semitic.md` §6 and `docs/CONFLICTS.md` C-03 (grep for the glyphs and for "curly"/"smart quote" across all three Arabic `SKILL.md` files returns no dedicated-rule hits). The tashkeel/diacritics sub-rule within this section *is* sourced (SM-MSA-023, SM-SHM-018 — cited inline in `ar-shared.md`) and is not itself `origin: humanizer-pro`; only the punctuation/quotes/tatweel/digits sub-rules are original. | | |
| Rhetorical devices — rhetorical questions | SM-MSA-021, SM-EGT-021, SM-SHM-015 | `humanizer-ar-msa/SKILL.md:352-363`; `humanizer-ar-egt/SKILL.md:489-509`; `humanizer-ar-shami/SKILL.md:574-602` | see table above |
| Rhetorical devices — controlled سجع | SM-MSA-018 | `humanizer-ar-msa/SKILL.md:309-321` | `9369a13c...b6ed4275` |
| Rhetorical devices — parallelism | SM-MSA-012, SM-MSA-018, SM-SHM-024 | `humanizer-ar-msa/SKILL.md:210-221,309-321`; `humanizer-ar-shami/SKILL.md:905-936` | see table above |
| Sentence rhythm thresholds (note) | SM-MSA-013, SM-EGT-010, SM-SHM-024 | as above | see table above |

## `skills/humanizer-pro/references/ar-msa.md`

Every AR-MSA id maps 1:1 to one SM-MSA id, in source order. Entries marked
"absorbed" carry their full content in `ar-shared.md` under the listed
AR-SH id; the AR-MSA entry is a short pointer plus any MSA-specific nuance.

| AR-MSA id | SM id | File:line | Absorbed into |
|---|---|---|---|
| AR-MSA-001 | SM-MSA-001 | `humanizer-ar-msa/SKILL.md:44-55` | AR-SH-001 |
| AR-MSA-002 | SM-MSA-002 | `humanizer-ar-msa/SKILL.md:58-69` | — (MSA-only) |
| AR-MSA-003 | SM-MSA-003 | `humanizer-ar-msa/SKILL.md:72-83,490,626` | AR-SH-002 |
| AR-MSA-004 | SM-MSA-004 | `humanizer-ar-msa/SKILL.md:86-97` | AR-SH-002 |
| AR-MSA-005 | SM-MSA-005 | `humanizer-ar-msa/SKILL.md:100-111` | AR-SH-002, AR-SH-003 |
| AR-MSA-006 | SM-MSA-006 | `humanizer-ar-msa/SKILL.md:114-125,491` | — (MSA-only; distinct from AR-SH-007) |
| AR-MSA-007 | SM-MSA-007 | `humanizer-ar-msa/SKILL.md:134-145` | — (MSA-only) |
| AR-MSA-008 | SM-MSA-008 | `humanizer-ar-msa/SKILL.md:148-159` | AR-SH-001, AR-SH-006 |
| AR-MSA-009 | SM-MSA-009 | `humanizer-ar-msa/SKILL.md:162-173` | — (MSA-only) |
| AR-MSA-010 | SM-MSA-010 | `humanizer-ar-msa/SKILL.md:176-187` | — (MSA-only) |
| AR-MSA-011 | SM-MSA-011 | `humanizer-ar-msa/SKILL.md:190-201` | — (MSA-only) |
| AR-MSA-012 | SM-MSA-012 | `humanizer-ar-msa/SKILL.md:210-221` | — (MSA-only) |
| AR-MSA-013 | SM-MSA-013 | `humanizer-ar-msa/SKILL.md:224-235,492` | AR-SH-004 |
| AR-MSA-014 | SM-MSA-014 | `humanizer-ar-msa/SKILL.md:238-252` | — (MSA-only) |
| AR-MSA-015 | SM-MSA-015 | `humanizer-ar-msa/SKILL.md:255-272` | AR-SH-005 |
| AR-MSA-016 | SM-MSA-016 | `humanizer-ar-msa/SKILL.md:275-286` | — (MSA-only) |
| AR-MSA-017 | SM-MSA-017 | `humanizer-ar-msa/SKILL.md:289-300` | — (MSA-only) |
| AR-MSA-018 | SM-MSA-018 | `humanizer-ar-msa/SKILL.md:309-321` | referenced from AR-SH "Rhetorical devices" section (endorsement), full fix stays here |
| AR-MSA-019 | SM-MSA-019 | `humanizer-ar-msa/SKILL.md:324-335` | dead-metaphor examples referenced from AR-SH-003 |
| AR-MSA-020 | SM-MSA-020 | `humanizer-ar-msa/SKILL.md:338-349` | — (MSA-only) |
| AR-MSA-021 | SM-MSA-021 | `humanizer-ar-msa/SKILL.md:352-363` | AR-SH "Rhetorical devices" section |
| AR-MSA-022 | SM-MSA-022 | `humanizer-ar-msa/SKILL.md:366-377` | — (MSA-only) |
| AR-MSA-023 | SM-MSA-023 | `humanizer-ar-msa/SKILL.md:386-400` | — (MSA-only workflow note; cross-ref AR-SH typography) |
| AR-MSA-024 | SM-MSA-024 | `humanizer-ar-msa/SKILL.md:403-414` | — (MSA-only workflow note) |
| AR-MSA-025 | SM-MSA-025 | `humanizer-ar-msa/SKILL.md:417-428` | — (MSA-only; example carries a NATIVE-REVIEW flag, see native-review log) |
| AR-MSA-026 | SM-MSA-026 | `humanizer-ar-msa/SKILL.md:431-442` | AR-SH-007 |
| AR-MSA-027 | SM-MSA-027 | `humanizer-ar-msa/SKILL.md:445-457` | — (MSA-only) |
| AR-MSA-028 | SM-MSA-028 | `humanizer-ar-msa/SKILL.md:460-471` | — (MSA-only) |
| MSA workflow notes (diacritics policy, case-ending layer, critical-priority order, register-matching, dialogue register) | SM-MSA (Processing Workflow, Voice Calibration) | `humanizer-ar-msa/SKILL.md:474-544` | n/a — procedural, not a pattern id |

All hashes above truncated in the AR-MSA table for readability; full values
are in the file-hash table at the top of this document.

---

## Round-1 additions (IMP-12): the classical-rhetoric layer, AR-MSA-029 to AR-MSA-033

These five entries do not come from `_sources/semitic`. They are adapted
from a competitor repository reviewed in the competitive-research notes
(kept outside the published repository).

Source pin:

| field | value |
|---|---|
| repository | `hazemshan1-rgb/humanizer-ar` |
| URL | `https://github.com/hazemshan1-rgb/humanizer-ar` |
| HEAD SHA | `5289d4a60aa52815125d4cb5548cdf51dad2790f` |
| licence | MIT (`LICENSE:1-3`, "Copyright (c) 2026 Hazem Shannak") |
| local path | `_sources/competitors/hazemshan1-rgb_humanizer-ar` |
| file used | `skills/humanizer-ar/references/patterns.md` |
| file SHA-256 | `b6a9cc170c0608912100934ad1102920a82ba849998b2006db2a22d5bd3bbf02` |

What was taken, and what was not. MIT permits reuse of the text itself;
this port takes only the **idea and the structure** of each pattern and
rewrites the prose, examples included, in this reference's own voice and
template. No sentence of `patterns.md` is reproduced. The upstream
research citations (Marathe 2022 on Arabic rhetorical-device density, and
the Arabic collocation-extraction literature) are repeated as the source
gives them and have not been independently verified by this project; they
are attributed to the source, not asserted by it.

| ar-msa id | Source item | File:line | Engine status | Notes |
|---|---|---|---|---|
| AR-MSA-029 Declarative Rigidity (خبر with no إنشاء) | patterns.md item 21, "جمود الخبر وغياب تنويع الإنشاء" | `patterns.md:235-241` | judgment-only, not scored | Absence signal. Not scored per `scripts/README.md` ("Conservative by default") and per `ar-shared.md`'s rule that rhetorical questions are never a signal in Arabic. The source itself marks its own check informational, not a flag |
| AR-MSA-030 Missing iltifat | patterns.md item 24, "غياب الالتفات" | `patterns.md:261-265` | judgment-only, not scored | Source calls it a low-confidence indicator; this port records the asymmetry (presence is weak human evidence, absence is no evidence) and scores neither direction |
| AR-MSA-031 Light-Verb Calques | patterns.md item 26, "الأفعال المساعدة الفارغة بدل الفعل المباشر" | `patterns.md:279-291` | lexicon, `P2`, `minCount` 2 | Curated host list plus curated verbal-noun list, both required. The source's own warning that a naive قام + بـ regex misfires is honoured by having no bare قام بـ branch; regression-tested on قام بسرعة |
| AR-MSA-032 Collocation Calques | patterns.md item 27, "التصادفات اللفظية المُقحمة من الإنجليزية" | `patterns.md:293-299` | lexicon, `P2`, `minCount` 1 | Only the two collocations the source documents as attested (أخذ قرارًا, أخذ بعين الاعتبار) are matched. The general class stays a review judgment, as the source recommends |
| AR-MSA-033 Classical Fluency Defects (عيوب الفصاحة) | patterns.md item 25, "عيوب الفصاحة الكلاسيكية" | `patterns.md:267-277` | judgment-only, not scored | Five-item reviewer checklist. None of the five is string-matchable; the source also treats the category as a review judgment rather than a script check |
| (no id) context-free emphatic particles | patterns.md item 22 | `patterns.md:243-247` | already covered | Duplicates AR-SH-001 and its لا شك / بالتأكيد phrase entries. No id minted |
| (no id) الإطناب against الإيجاز | patterns.md item 23 | `patterns.md:249-259` | already covered | Duplicates AR-MSA-028 (near-paraphrase padding) with a classical name attached. No id minted |

Cross-variety status: all five are MSA-only. None is promoted to
`ar-shared.md`, because the source addresses MSA exclusively and neither
`ar-egyptian.md` nor `ar-levantine.md` has a corresponding rule to
generalize from.

Self-authored examples in these five entries carry
`<!-- NATIVE-REVIEW: msa -->` and are logged in
`docs/native-review/ar-shared-msa.md` as items 4 to 7.

## Round-1 additions (IMP-17): definite-article clitic in phrase matching

No new pattern id. `lib/ar-detector/lexicons.js` gains an opt-in
`stemPhrases` list per pattern, matched with the definite article ال
allowed after the optional proclitic, and `AR-SH-001` moves
جدير بالذكر and جدير بالإشارة into it so الجدير بالذكر,
والجدير بالذكر and للجدير بالذكر match the same entry. Provenance is this
project's own (origin: humanizer-pro), from the widening recorded as
borrow 8 in the competitive-analysis document (kept outside the published repository) section 5. The measured
false-positive effect of the widening is recorded in `corpus/RESULTS.md`.
