# Provenance

Pattern → upstream file/line/commit mapping. Built by concatenating the per-area fragments in docs/provenance/ (kept as the editable source; regenerate with tools/merge-docs.js).

Upstream commits: blader 9862685f575c65a8247f90369951df1b3416e3d6; avoid-ai-writing 7a2c7d11d4a74d90c6be41fbed8402d972543798; semitic 2c9d4fbe3e0086d373b59bfebc9556082275cf62.



---

<!-- source fragment: docs/provenance/ar-egt-shm.md -->

## Provenance — `ar-egyptian.md` / `ar-levantine.md`

Maps every `AR-EGT-*` / `AR-SHM-*` id to its upstream source, or to `origin: humanizer-pro`
with a stated rationale when no single upstream id covers it. Upstream file abbreviations:
`egt:` = `_sources/semitic/skills/humanizer-ar-egt/SKILL.md`; `shm:` =
`_sources/semitic/skills/humanizer-ar-shami/SKILL.md`. Both pinned at commit
`2c9d4fbe3e0086d373b59bfebc9556082275cf62` (OthmanAdi/humanizer-semitic,
`feat: publish to npm as humanizer-semitic`).

## Egyptian (`ar-egyptian.md`)

| id | source | file:line |
|---|---|---|
| AR-EGT-001 | SM-EGT-001 | egt:72–105 |
| AR-EGT-002 | SM-EGT-002 | egt:108–119 |
| AR-EGT-003 | SM-EGT-003 | egt:122–138 |
| AR-EGT-004 | SM-EGT-004 | egt:141–157 |
| AR-EGT-005 | SM-EGT-005 | egt:160–176 |
| AR-EGT-006 | SM-EGT-006 | egt:185–196 |
| AR-EGT-007 | SM-EGT-007 | egt:199–219 |
| AR-EGT-008 | SM-EGT-008 | egt:222–236 |
| AR-EGT-009 | SM-EGT-009 | egt:239–257 |
| AR-EGT-010 | SM-EGT-010 (deferred to ar-shared.md: uniform sentence rhythm; dialect fix/example retained) | egt:260–271 |
| AR-EGT-011 | SM-EGT-011 (deferred to ar-shared.md: formulaic transitions; dialect fix set retained) | egt:280–304 |
| AR-EGT-012 | SM-EGT-012 (deferred to ar-shared.md: formulaic transitions; dialect fix set retained) | egt:307–328 |
| AR-EGT-013 | SM-EGT-013 | egt:331–342 |
| AR-EGT-014 | SM-EGT-014 | egt:345–359 |
| AR-EGT-015 | SM-EGT-015 | egt:362–378 |
| AR-EGT-016 | SM-EGT-016 | egt:387–404 |
| AR-EGT-017 | SM-EGT-017 | egt:407–425 |
| AR-EGT-018 | SM-EGT-018 | egt:428–444 |
| AR-EGT-019 | SM-EGT-019 | egt:447–466 |
| AR-EGT-020 | SM-EGT-020 | egt:469–480 |
| AR-EGT-021 | SM-EGT-021 | egt:489–509 |
| AR-EGT-022 | SM-EGT-022 | egt:512–532 |
| AR-EGT-023 | SM-EGT-023 | egt:535–544 |
| AR-EGT-024 | SM-EGT-024 | egt:547–567 |
| AR-EGT-025 | SM-EGT-025 | egt:570–581 |
| AR-EGT-026 | origin: humanizer-pro — rationale: no single SM-EGT id names an "MSA leakage" umbrella pattern (unlike Levantine, where SM-SHM-001 is itself the umbrella). This entry aggregates the cross-references already carried by AR-EGT-001/002/003/004/005/006/007/013/014 (each mapped exactly once above) and anchors on the source's own Stage-3 checklist and Quick Reference table, which have no pattern number of their own. | egt:659–667, egt:841–868 |

## Levantine (`ar-levantine.md`)

| id | source | file:line |
|---|---|---|
| AR-SHM-001 | SM-SHM-001 (also serves as the dedicated MSA-leakage umbrella section — the source itself frames this pattern as the non-regional baseline failure) | shm:116–140, shm:1041–1048, shm:1236–1242 |
| AR-SHM-002 | SM-SHM-002 | shm:143–172 |
| AR-SHM-003 | SM-SHM-003 | shm:174–197 |
| AR-SHM-004 | SM-SHM-004 | shm:199–218 |
| AR-SHM-005 | SM-SHM-005 | shm:220–255 |
| AR-SHM-006 | SM-SHM-006 | shm:265–304 |
| AR-SHM-007 | SM-SHM-007 | shm:307–343 |
| AR-SHM-008 | SM-SHM-008 | shm:345–374 |
| AR-SHM-009 | SM-SHM-009 | shm:377–401 |
| AR-SHM-010 | SM-SHM-010 | shm:403–439 |
| AR-SHM-011 | SM-SHM-011 | shm:448–483 |
| AR-SHM-012 | SM-SHM-012 (deferred to ar-shared.md: formulaic transitions; regional table retained) | shm:486–515 |
| AR-SHM-013 | SM-SHM-013 | shm:518–542 |
| AR-SHM-014 | SM-SHM-014 | shm:545–571 |
| AR-SHM-015 | SM-SHM-015 | shm:574–602 |
| AR-SHM-016 | SM-SHM-016 | shm:612–652 |
| AR-SHM-017 | SM-SHM-017 | shm:655–691 |
| AR-SHM-018 | SM-SHM-018 | shm:693–715 |
| AR-SHM-019 | SM-SHM-019 | shm:718–748 |
| AR-SHM-020 | SM-SHM-020 | shm:751–779 |
| AR-SHM-021 | SM-SHM-021 | shm:789–827 |
| AR-SHM-022 | SM-SHM-022 | shm:830–864 |
| AR-SHM-023 | SM-SHM-023 | shm:867–902 |
| AR-SHM-024 | SM-SHM-024 (deferred to ar-shared.md: uniform sentence rhythm; paratactic-chain nuance retained) | shm:905–936 |
| AR-SHM-025 | SM-SHM-025 | shm:939–976 |

## Notes

- Severity tags (P0/P1/P2) in both reference files are `origin: humanizer-pro` judgment
  calls applying the owner-approved rubric (minor→P2, significant→P1, critical→P0) to the
  source's own emphasis language, since the Egyptian source carries no severity tags at
  all and the Levantine source only explicitly tiers Category 1. See each file's preamble.
- "Dialect markers" lists at the end of each reference file are not independent ids —
  they compile marker words already cited inside the numbered entries above, for
  downstream language-ID script use, and are not separately provenance-mapped here.
- The MSA skill (`humanizer-ar-msa`) is out of scope for this task; no `AR-MSA-*` ids
  are produced.


---

<!-- source fragment: docs/provenance/ar-shared-msa.md -->

## Provenance — `ar-shared.md` and `ar-msa.md`

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
|, rationale | No upstream file in `_sources/semitic` states a lexical-variety or vocabulary-concentration rule. The three variety files cover sentence-length rhythm (SM-MSA-013, SM-EGT-010, SM-SHM-024) and mechanical synonym rotation for a single claim (SM-MSA-007, absorbed as `ar-msa.md` AR-MSA-007); neither measures how much of a document's content vocabulary one word carries, nor type-token ratio. Confirmed by direct search across all three Arabic `SKILL.md` files. The idea of adding a statistical, corpus-calibrated lexical layer is credited to finestructure-ai/humanizer-multilingual (MIT) per `docs/COMPETITIVE-ANALYSIS.md` §6 row IMP-23; the two statistics, the Arabic function-word stoplist, the 80/200-token applicability floors and both numeric gates are this project's own, measured over `corpus/` (see `docs/evidence/round1-wave2F-vocab-distribution.txt`) and not reproduced from that source. | | |
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
from a competitor repository reviewed in
`docs/competitors/hazemshan1-rgb_humanizer-ar.md`.

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
borrow 8 in `docs/COMPETITIVE-ANALYSIS.md` section 5. The measured
false-positive effect of the widening is recorded in `corpus/RESULTS.md`.


---

<!-- source fragment: docs/provenance/en.md -->

## Provenance — EN catalog and vocabulary

Flat id → upstream source table for `skills/humanizer-pro/references/en-patterns.md`
and `skills/humanizer-pro/references/en-vocabulary.md`.

Upstream commits:
- blader/humanizer: `9862685f575c65a8247f90369951df1b3416e3d6`
- avoid-ai-writing: `7a2c7d11d4a74d90c6be41fbed8402d972543798`

## Pattern catalog (en-patterns.md)

| EN id | Upstream ids | File : line(s) | Commit |
|---|---|---|---|
| EN-001 | BL-001; AW-007, AW-063, AW-073, AW-083 | `blader/SKILL.md:58-74`; `avoid-ai-writing/references/patterns.md:18, 443-445, 498-502, 553-555` | blader 9862685f…; avoid-ai-writing 7a2c7d11… |
| EN-002 | BL-002; AW-035, AW-079, AW-085 | `blader/SKILL.md:75-95`; `avoid-ai-writing/references/patterns.md:315-316, 534-538, 561-571` | blader; avoid-ai-writing |
| EN-003 | BL-003; AW-021, AW-078 | `blader/SKILL.md:96-107`; `avoid-ai-writing/references/patterns.md:243-247, 529-532` | blader; avoid-ai-writing |
| EN-004 | BL-004; AW-018, AW-037, AW-042 | `blader/SKILL.md:109-121`; `avoid-ai-writing/references/patterns.md:236, 322-323, 342-343` | blader; avoid-ai-writing |
| EN-005 | BL-005; AW-062, AW-069 | `blader/SKILL.md:122-133`; `avoid-ai-writing/references/patterns.md:440-441, 464-472` | blader; avoid-ai-writing |
| EN-006 | BL-013; AW-020, AW-022, AW-055, AW-061, AW-072 | `blader/SKILL.md:207-222`; `avoid-ai-writing/references/patterns.md:239-241, 249-252, 391-396, 434-438, 490-496` | blader; avoid-ai-writing |
| EN-007 | BL-014 | `blader/SKILL.md:224-231` | blader |
| EN-008 | BL-015; AW-040 | `blader/SKILL.md:233-240`; `avoid-ai-writing/references/patterns.md:335-337` | blader; avoid-ai-writing |
| EN-009 | BL-016; AW-041, AW-057 | `blader/SKILL.md:242-249`; `avoid-ai-writing/references/patterns.md:339-340, 403-407` | blader; avoid-ai-writing |
| EN-010 | BL-017; AW-033, AW-038, AW-039 | `blader/SKILL.md:251-262`; `avoid-ai-writing/references/patterns.md:305-306, 325-333` | blader; avoid-ai-writing |
| EN-011 | BL-023; AW-050, AW-051 | `blader/SKILL.md:325-336`; `avoid-ai-writing/references/patterns.md:372-376` | blader; avoid-ai-writing |
| EN-012 | BL-025; AW-077 | `blader/SKILL.md:352-359`; `avoid-ai-writing/references/patterns.md:524-527` | blader; avoid-ai-writing |
| EN-013 | AW-024 | `avoid-ai-writing/references/patterns.md:258-262` | avoid-ai-writing |
| EN-014 | AW-025 | `avoid-ai-writing/references/patterns.md:264-268` | avoid-ai-writing |
| EN-015 | AW-026 | `avoid-ai-writing/references/patterns.md:270-273` | avoid-ai-writing |
| EN-016 | AW-031 | `avoid-ai-writing/references/patterns.md:296-299` | avoid-ai-writing |
| EN-017 | AW-043 | `avoid-ai-writing/references/patterns.md:345-348` | avoid-ai-writing |
| EN-018 | AW-044 | `avoid-ai-writing/references/patterns.md:350-351` | avoid-ai-writing |
| EN-019 | AW-080 | `avoid-ai-writing/references/patterns.md:540-543` | avoid-ai-writing |
| EN-020 | BL-006; AW-012, AW-084 | `blader/SKILL.md:139-149`; `avoid-ai-writing/references/patterns.md:23, 557-559` | blader; avoid-ai-writing |
| EN-021 | BL-007; AW-082 | `blader/SKILL.md:151-157`; `avoid-ai-writing/references/patterns.md:549-551` | blader; avoid-ai-writing |
| EN-022 | BL-008; AW-001 | `blader/SKILL.md:159-166`; `avoid-ai-writing/references/patterns.md:10` | blader; avoid-ai-writing |
| EN-023 | BL-009; AW-010, AW-023, AW-065, AW-071 | `blader/SKILL.md:168-175`; `avoid-ai-writing/references/patterns.md:21, 254-256, 450-451, 482-488` | blader; avoid-ai-writing |
| EN-024 | BL-010; AW-048, AW-049 | `blader/SKILL.md:177-184`; `avoid-ai-writing/references/patterns.md:362-370` | blader; avoid-ai-writing |
| EN-025 | BL-011; AW-030 | `blader/SKILL.md:186-192`; `avoid-ai-writing/references/patterns.md:291-294` | blader; avoid-ai-writing |
| EN-026 | BL-018; AW-029 | `blader/SKILL.md:264-271`; `avoid-ai-writing/references/patterns.md:287-289` | blader; avoid-ai-writing |
| EN-027 | BL-021; AW-005, AW-006 | `blader/SKILL.md:304-310`; `avoid-ai-writing/references/patterns.md:14-15` | blader; avoid-ai-writing |
| EN-028 | AW-008, AW-009 | `avoid-ai-writing/references/patterns.md:19-20` | avoid-ai-writing |
| EN-029 | AW-015 | `avoid-ai-writing/references/patterns.md:215-222` | avoid-ai-writing |
| EN-030 | AW-016 | `avoid-ai-writing/references/patterns.md:224-232` | avoid-ai-writing |
| EN-031 | AW-032 | `avoid-ai-writing/references/patterns.md:301-303` | avoid-ai-writing |
| EN-032 | AW-034 | `avoid-ai-writing/references/patterns.md:308-313` | avoid-ai-writing |
| EN-033 | BL-019; AW-002 | `blader/SKILL.md:277-289`; `avoid-ai-writing/references/patterns.md:11` | blader; avoid-ai-writing |
| EN-034 | BL-020; AW-003, AW-047 | `blader/SKILL.md:291-302`; `avoid-ai-writing/references/patterns.md:12, 359-360` | blader; avoid-ai-writing |
| EN-035 | BL-024 | `blader/SKILL.md:338-350` | blader |
| EN-036 | AW-004, AW-076 | `avoid-ai-writing/references/patterns.md:13, 518-522` | avoid-ai-writing |
| EN-037 | AW-011 | `avoid-ai-writing/references/patterns.md:22` | avoid-ai-writing |
| EN-038 | AW-028 | `avoid-ai-writing/references/patterns.md:281-285` | avoid-ai-writing |
| EN-039 | AW-045, AW-046 | `avoid-ai-writing/references/patterns.md:353-357` | avoid-ai-writing |
| EN-040 | AW-066 | `avoid-ai-writing/references/patterns.md:453-454` | avoid-ai-writing |
| EN-041 | BL-022; AW-036, AW-068, AW-070 | `blader/SKILL.md:316-323`; `avoid-ai-writing/references/patterns.md:318-320, 460-462, 474-480` | blader; avoid-ai-writing |
| EN-042 | AW-075 | `avoid-ai-writing/references/patterns.md:511-516` | avoid-ai-writing |
| EN-043 | AW-064, AW-081 | `avoid-ai-writing/references/patterns.md:447-448, 545-547` | avoid-ai-writing |
| EN-044 | AW-060 | `avoid-ai-writing/references/patterns.md:427-432` | avoid-ai-writing |
| EN-045 | AW-067 | `avoid-ai-writing/references/patterns.md:456-458` | avoid-ai-writing |
| EN-046 | AW-086, AW-017, AW-019 | `avoid-ai-writing/references/patterns.md:235, 237, 573-584` | avoid-ai-writing |
| EN-047 | AW-087 | `avoid-ai-writing/references/patterns.md:586-592` | avoid-ai-writing |
| EN-048 | AW-088 | `avoid-ai-writing/references/patterns.md:594-596` | avoid-ai-writing |
| EN-049 | AW-089 | `avoid-ai-writing/references/patterns.md:598-600` | avoid-ai-writing |
| EN-050 | AW-053, AW-054 | `avoid-ai-writing/references/patterns.md:382-389` | avoid-ai-writing |
| EN-051 | AW-052 | `avoid-ai-writing/references/patterns.md:378-380` | avoid-ai-writing |
| EN-052 | AW-027 | `avoid-ai-writing/references/patterns.md:275-279` | avoid-ai-writing |
| EN-053 | AW-058, AW-056 | `avoid-ai-writing/references/patterns.md:398-401, 409-419` | avoid-ai-writing |
| EN-054 | AW-074 | `avoid-ai-writing/references/patterns.md:504-509` | avoid-ai-writing |
| EN-055 | AW-059 | `avoid-ai-writing/references/patterns.md:421-425` | avoid-ai-writing |

## Dropped from the pattern catalog (moved elsewhere or not a pattern)

| Id | Disposition | File : line(s) | Commit |
|---|---|---|---|
| BL-012 | Moved to en-vocabulary.md (folded into Tier 1A/1B/2/3 by word) | `blader/SKILL.md:198-206` | blader |
| AW-013 | Moved to en-vocabulary.md (the tier table itself) | `avoid-ai-writing/references/patterns.md:25-213` | avoid-ai-writing |
| AW-014 | Moved to en-vocabulary.md (domain-term caveat, attached to vocabulary) | `avoid-ai-writing/references/patterns.md:206-213` | avoid-ai-writing |
| AW-090 | Not a pattern — process/workflow guidance ("when to rewrite from scratch vs. patch"); origin: humanizer-pro carries this forward as skill-level workflow guidance, not a catalog entry | `avoid-ai-writing/references/patterns.md:602-604` | avoid-ai-writing |

## Vocabulary (en-vocabulary.md)

| Tier | Rows | Source | Commit |
|---|---|---|---|
| 1A (49 rows) | delve … load-bearing | `avoid-ai-writing/references/patterns.md:49-99` | avoid-ai-writing 7a2c7d11… |
| 1B (10 rows) | utilize … endeavor | `avoid-ai-writing/references/patterns.md:109-120` | avoid-ai-writing |
| 1B + BL-012 (1 new row) | additionally | `blader/SKILL.md:200` | blader 9862685f… |
| 2 (41 rows) | harness … underpinning/underpinnings | `avoid-ai-writing/references/patterns.md:126-167` | avoid-ai-writing |
| 2 + BL-012 (5 new rows) | actually, align with, enhance, garner, gate/gated/gating, highlight | `blader/SKILL.md:200` | blader |
| 3 words (13 rows) | significant … verbatim | `avoid-ai-writing/references/patterns.md:173-187` | avoid-ai-writing |
| 3 + BL-012 (2 new rows) | key (adjective), valuable | `blader/SKILL.md:200` | blader |
| 3 phrases (10 rows) | emerging sector … designed for long-term [X] | `avoid-ai-writing/references/patterns.md:193-204` | avoid-ai-writing |
| BL-012 words already covered by inflection (no new row) | bolstered, enduring, fostering, showcase, underscore (verb), meticulous/meticulously, deep dive, intricate/intricacies, pivotal, robust, testament, landscape, tapestry, vibrant, quietly | `blader/SKILL.md:198-206` | blader |
| Domain-term caveat (AW-014) | crypto "proof"/"proof point" collision | `avoid-ai-writing/references/patterns.md:206-213` | avoid-ai-writing |
| Technical-context exemptions | robust, comprehensive, seamless, ecosystem, leverage, facilitate, underpin, streamline, harness (+ BL's gate/gated/gating) | `avoid-ai-writing/references/patterns.md:667`; `blader/SKILL.md:200` | avoid-ai-writing; blader |

## Cross-cutting rules with no single-entry home (`origin: humanizer-pro`)

These are stated once, in `en-patterns.md`'s header, rather than as a
catalog entry, because they are resolutions of conflicts recorded in
`docs/CONFLICTS.md`, not a pattern description translated from one source.

| Rule | Origin | Rationale |
|---|---|---|
| Severity scale (P0/P1/P2 + "weak alone" modifier) | origin: humanizer-pro, resolving `docs/CONFLICTS.md` C-09/C-14 | Neither upstream scheme is a superset of the other; adopting AW's P0-P2 as the base with blader's "weak alone" as an orthogonal modifier is an owner-approved decision stated in the task brief, not copied from either source verbatim. |
| Em-dash merged rule (default remove, voice-sample override, never scored) | origin: humanizer-pro, resolving `docs/CONFLICTS.md` C-01 | Combines blader's sample-overridable rule with AW's no-sample numeric fallback and weight-0 scoring; the combination itself is not stated in either source. |
| Rhetorical-question English-only scope | origin: humanizer-pro, resolving `docs/CONFLICTS.md` C-02 | AW's rule and the Arabic-variety rules are directly contradictory; scoping AW's rule to English is an owner-approved decision, stated in EN-043 rather than in a separate catalog entry. |
| Category taxonomy (content/language/structure/communication/meta/structural detection/tool fingerprints/conversational register) | origin: humanizer-pro | No upstream source names these eight categories; see the "Category naming note" in `en-patterns.md`. |


---

<!-- source fragment: docs/provenance/modes-voice-seo.md -->

## Provenance: modes, voice-matching, seo-mode, core-principles

Section-by-section source map for the four reference files written by this
pass. Format: section → repo/file:line (or `origin: humanizer-pro`) →
rationale.

## `references/core-principles.md`

| Section | Source | Rationale |
|---|---|---|
| Why AI text reads as AI | `_sources/blader/SKILL.md:17-23` + `_sources/avoid-ai-writing/SKILL.md:19` | blader's five-shape taxonomy is the more structured framing; avoid-ai-writing's "signal, not proof" framing added to prevent detector-evasion misreading. |
| Meaning preservation over detector evasion | `_sources/avoid-ai-writing/SKILL.md:301` ("Never inject these" intro) + `_sources/blader/SKILL.md:44` | Both sources converge on the same warning independently; quoted both to show it's not one repo's opinion. |
| Never invent | `_sources/blader/SKILL.md:35-36` + `_sources/avoid-ai-writing/SKILL.md:61-64,303,309` | Merged anti-fabrication language; avoid-ai-writing's list (fabricated perspective, manufactured stakes, invented specifics) is the more exhaustive enumeration, blader's "ask for it or write a simpler sentence" is the more actionable instruction. |
| If the draft lacks substance, say so | `_sources/blader/SKILL.md` §23 (knowledge-limit disclaimers) | Generalized from the knowledge-limit-disclaimer pattern to a standing principle per the build prompt's explicit requirement. |
| Drop unsourced research claims | `docs/inventory/blader.md` §6, §9 point 2 + `docs/inventory/semitic.md` §8 + `docs/inventory/avoid-ai-writing.md:1023` | Directly implements the build prompt's instruction not to repeat "people judge little better than chance" or similar; cites the inventory sections that already did this verification work. |
| The editing contract | `_sources/avoid-ai-writing/SKILL.md:33-37,71-76` | Verbatim contract; no equivalent exists in blader (blader has no scope/protection framework, only a File mode note). |
| When not to act | `_sources/blader/SKILL.md:361-370` | Verbatim; avoid-ai-writing's equivalent ("self-reference escape hatch") is narrower (only about quoted examples of AI writing), so blader's broader list was used. |

## `references/modes.md`

| Section | Source | Rationale |
|---|---|---|
| `detect` contract | `_sources/avoid-ai-writing/SKILL.md:246-256` | avoid-ai-writing is the only upstream source with named modes; blader has no `detect` mode. |
| `rewrite` — Issues found | `_sources/avoid-ai-writing/SKILL.md:131,244` | Upstream reserves this section for an explicit "detailed audit" request; humanizer-pro makes it standard. See discrepancies log. |
| `rewrite` — Rewritten version | `_sources/avoid-ai-writing/SKILL.md:220-224` | Verbatim "never publish a first-pass draft" rule. |
| `rewrite` — What changed | `_sources/avoid-ai-writing/SKILL.md:132` | "Summarize when useful... omit for a no-op." |
| `rewrite` — Second-pass audit | `_sources/avoid-ai-writing/SKILL.md:125-128,226-228,234` + `_sources/blader/SKILL.md:33` | avoid-ai-writing's iterate-to-convergence budget supplies the mechanism and the four Verification items; blader's step 3 ("Check the draft... search for the five tells that most often survive a rewrite") supplies the concrete self-check content folded into the same step, per the build prompt's instruction to make this mandatory and adapt avoid-ai-writing's procedure "verbatim where possible." |
| `edit` contract | `_sources/avoid-ai-writing/SKILL.md:117-118,258-276` | Verbatim; blader's "File mode" (`_sources/blader/SKILL.md:47-48`) is a much thinner two-sentence rule folded into the extension note in `edit`'s refusal list, not separately cited since it adds no field beyond what avoid-ai-writing already specifies. |
| `seo` modifier | `origin: humanizer-pro` | No upstream equivalent; see `references/seo-mode.md` provenance below. |
| Report language table | `origin: humanizer-pro` | Arabic headings for five items given directly in the build prompt; the remaining four (Edits made, Verification, Protected spans, SEO check) are humanizer-pro's own translations, marked NATIVE-REVIEW for the same reason. |
| Manual fallback checklist | `_sources/avoid-ai-writing/detector/validate.js` checks (`docs/inventory/avoid-ai-writing.md:860-877`) + `_sources/blader/SKILL.md:33` | Restated as a human-executable checklist from the validator's error/warning table, plus blader's five-tells re-scan. |

## `references/voice-matching.md`

| Section | Source | Rationale |
|---|---|---|
| Sample-based calibration — What to analyze | `_sources/blader/SKILL.md:40-42` | Verbatim quote is the primary procedure per the build prompt's instruction ("blader's sample-based calibration procedure in full"). |
| Precedence | `docs/inventory/blader.md` §9 point 3 | The inventory's own analysis of how far "overrides the patterns below" reaches; cited rather than re-derived. |
| Minimum sample size | `docs/inventory/blader.md:369,394` | blader's README example ("2-3 paragraphs") is the only length signal in either source; presented as a practical floor, not a hard rule, since SKILL.md itself states no minimum. |
| Without a sample | `_sources/blader/SKILL.md:44` | Verbatim. |
| Named voice profiles | `_sources/avoid-ai-writing/references/patterns.md` (quoted in `docs/inventory/avoid-ai-writing.md:602-632`) | Verbatim, all five profiles, per the build prompt's "take definitions from avoid-ai-writing's voice profiles verbatim where names match." |
| How voice composes | `_sources/avoid-ai-writing/references/patterns.md` (quoted in `docs/inventory/avoid-ai-writing.md:602-656`) | Verbatim. |
| Calibrate to a sample (avoid-ai-writing's own version) | `_sources/avoid-ai-writing/references/patterns.md`, "Calibrate to a sample" | Quoted in full alongside blader's version to show the two sources agree; avoid-ai-writing's is used only to supply "contraction rate" as an added dimension folded into "word choice / lexicon." |
| Arabic samples | `origin: humanizer-pro` | No upstream Arabic voice-calibration content for user-supplied samples exists; `docs/inventory/semitic.md` §7 describes each dialect skill's own internal "Voice Calibration by register tier" sub-workflow (register tiers, not user-sample calibration), which is a different mechanism from what's built here. Digit convention and dialect-marker reading were added because `docs/inventory/semitic.md` §6 flags Arabic digit/punctuation convention as an unaddressed gap upstream — humanizer-pro fills it rather than leaving it silent. |

## `references/seo-mode.md`

| Section | Source | Rationale |
|---|---|---|
| Whole file | `origin: humanizer-pro` | Confirmed absent from both upstream repos (grep of both SKILL.md/patterns.md trees for SEO-related terms returns no relevant hits). |
| Heading hierarchy/text protection | `_sources/avoid-ai-writing/detector/validate.js` (`heading-count`, `heading-level`, `heading-text` — `docs/inventory/avoid-ai-writing.md:872-874`) | Validator already protects heading count/nesting as hard errors and wording as a warning; SEO mode cites and tightens this rather than inventing new heading-protection logic from scratch. |
| Links/URLs protection | `_sources/avoid-ai-writing/detector/validate.js` (`url-missing`, tracking-param stripping — `docs/inventory/avoid-ai-writing.md:870,879-884`) | Same reuse pattern: cite the existing hard protection, extend to anchor text which the base validator doesn't check. |
| Tables protection | `_sources/avoid-ai-writing/detector/validate.js` (`table-modified` — `docs/inventory/avoid-ai-writing.md:868`) | Already a hard-protected region; SEO mode adds it to its own list rather than re-specifying new table-diff logic. |
| Frontmatter/meta protection | `_sources/avoid-ai-writing/detector/validate.js` (`frontmatter-modified` — `docs/inventory/avoid-ai-writing.md:866`) | Same reuse pattern. |
| Validator contract shape (`{ok, errors[], warnings[], stats}`, exit codes) | `_sources/avoid-ai-writing/detector/validate.js` API (`docs/inventory/avoid-ai-writing.md:846-859,899-901`) | Intended `scripts/validate.js --seo` behavior modeled directly on the existing validator's shape and exit-code convention for consistency across the skill's scripts. |
| Stuffing-detection scope note | `docs/inventory/avoid-ai-writing.md` §15, Group C (skill-only judgment rules, e.g. promotional language) | Used as precedent for leaving stuffing detection to model judgment rather than the deterministic script, matching how avoid-ai-writing itself splits deterministic vs. judgment checks. |


---

<!-- source fragment: docs/provenance/precedence.md -->

## Provenance — `skills/humanizer-pro/references/precedence.md`

Pinned upstream commits:

| Repo | Path under `_sources/` | Commit SHA |
|---|---|---|
| blader/humanizer | `_sources/blader` | `9862685f575c65a8247f90369951df1b3416e3d6` |
| conorbronsdon/avoid-ai-writing | `_sources/avoid-ai-writing` | `7a2c7d11d4a74d90c6be41fbed8402d972543798` |
| OthmanAdi/humanizer-semitic | `_sources/semitic` | `2c9d4fbe3e0086d373b59bfebc9556082275cf62` |

Line numbers below are as of these commits.

## Sections and rules

| Section / rule in precedence.md | Upstream source | Rationale if origin |
|---|---|---|
| Six-level order (the numbering itself) | `origin: humanizer-pro` | No upstream states a precedence order. The levels are derived from the owner-approved order in the build brief and from the two upstream architectures that imply a partial order (avoid-ai-writing's protected-content-over-voice rule, blader's sample-over-patterns rule). |
| Level 1 — protected content list (quotes, code, tables, URLs, paths, identifiers, frontmatter) | `avoid-ai-writing/SKILL.md:69-71` | — |
| Level 1 — "report the finding inside a protected region rather than fixing it" | `avoid-ai-writing/SKILL.md:69-71`, `avoid-ai-writing/SKILL.md:236` | — |
| Level 1 — structurally list-like content (steps, parameters, feature comparisons, spec tables) treated as protected | `avoid-ai-writing/references/patterns.md:13` | `origin: humanizer-pro` for the *placement at level 1*. Upstream states the carve-out but assigns it no precedence. Placing it at level 1 is required for the carve-out to survive against the MSA list rule, which sits at level 5 (see C-08 deviation note). |
| Level 1 — SEO-protected spans | `origin: humanizer-pro` | No upstream mentions SEO. Named in the owner-approved resolution list. |
| Level 2 — explicit instruction may re-scope protected content but a general style request may not | `avoid-ai-writing/SKILL.md:87-89`, `avoid-ai-writing/SKILL.md:276` | — |
| Level 3 — read the sample first; match sentence length, word choice, punctuation, openings, transitions | `blader/SKILL.md:42` | — |
| Level 3 — dash usage follows the sample's rate | `blader/SKILL.md:42`, `blader/SKILL.md:161` | — |
| Level 3 — do not upgrade the writer's vocabulary; match the sample instead of a named profile | `avoid-ai-writing/references/patterns.md:708` | — |
| Level 3 — sample authority capped at style rules (levels 4–6) | `avoid-ai-writing/SKILL.md:87-89` | `origin: humanizer-pro` for the cap. blader's text is unqualified ("overrides the patterns below"); the narrowing to the stylistic subset is our decision, matching avoid-ai-writing's architecture. Resolves C-13. |
| Level 3 — note that blader's inline `§6` is a stale cross-reference | `blader/SKILL.md:42` vs `blader/SKILL.md:159` | `origin: humanizer-pro` observation, already recorded in `docs/DISCREPANCIES.md` (b)(2). Flagged inline so we do not silently propagate an upstream defect. |
| Level 4 — the five profiles casual / professional / technical / warm / blunt | `avoid-ai-writing/references/patterns.md:690-706` | — |
| Level 4 — voice is optional; infer register, do not impose a persona | `avoid-ai-writing/references/patterns.md:692` | — |
| Level 4 — a profile brings out what the source has, never manufactures it | `avoid-ai-writing/references/patterns.md:694` | — |
| Level 5 — rhetorical questions are a native Arabic device, not a tell | `semitic/skills/humanizer-ar-msa/SKILL.md:354-358`, `semitic/skills/humanizer-ar-egt/SKILL.md:491-509`, `semitic/skills/humanizer-ar-shami/SKILL.md:574-602` | — |
| Level 5 — English rhetorical-question rule | `avoid-ai-writing/references/patterns.md:448` | — |
| Level 5 — MSA-leakage rules run only in dialect modes | `semitic/skills/humanizer-ar-egt/SKILL.md:162`, `:124`, `:110`; `semitic/skills/humanizer-ar-shami/SKILL.md:201-215` | `origin: humanizer-pro` for the scoping statement. Each upstream skill is internally scoped but none says the rules must not cross varieties. Resolves C-04, C-05, C-06, C-10. |
| Level 5 — Arabic native typography (، ؛ ؟ « »); no Latin-punctuation or quote-straightening of Arabic | `origin: humanizer-pro` | Confirmed gap: no rule exists in any of the three upstreams (`docs/CONFLICTS.md` C-03 and its verification grep). Minimal rule adopted so the English curly-quote/dash logic has something to defer to instead of misfiring on Arabic. |
| Level 5 — Arabic-Indic vs Western digits never converted | `origin: humanizer-pro`, resting on `avoid-ai-writing/SKILL.md:69-71` | Digits are numbers, and numbers are already level-1 protected content. Stated explicitly because no upstream addresses digit form. |
| Level 6 — shared core catalogue and the no-sample em-dash default | `avoid-ai-writing/references/patterns.md:10`, `blader/SKILL.md:161-162` | — |
| Level 6 — em-dash list-item carve-out (`- **Term** — description`) | `avoid-ai-writing/references/patterns.md:10` | — |
| Level 6 — dashes inside code, inline code, commands, paths, URLs left alone | `blader/SKILL.md:161` | — |
| "How to apply" steps 1–3 (highest level that speaks; then the more specific rule) | `origin: humanizer-pro` | No upstream has a conflict-resolution algorithm. |
| "How to apply" steps 4–5 (less invasive edit, report the tie; never invent a third option) | `origin: humanizer-pro`, consistent with `avoid-ai-writing/SKILL.md:117` (minimal targeted edits) and `avoid-ai-writing/SKILL.md:311` (subtract and sharpen without inventing) | — |
| C-01 row | `blader/SKILL.md:161-162`; `avoid-ai-writing/references/patterns.md:10`; em dash scored style-only per `avoid-ai-writing/SKILL.md:182` | Owner-approved resolution; matches the CONFLICTS.md proposal. |
| C-02 row | as Level 5 sources above | Matches CONFLICTS.md proposal. |
| C-03 row | `origin: humanizer-pro` | CONFLICTS.md called this a build gap; the adopted rule is written here rather than deferred. |
| C-04 / C-05 / C-06 / C-10 / C-11 rows | `semitic/skills/humanizer-ar-egt/SKILL.md:110,124,162,282-290`; `semitic/skills/humanizer-ar-shami/SKILL.md:201-215,220-255,486-515`; `semitic/skills/humanizer-ar-msa/SKILL.md:46,390` | Matches CONFLICTS.md proposals. |
| C-07 row | `semitic/skills/humanizer-ar-msa/SKILL.md:116,489-492`; `blader/SKILL.md:188`; `avoid-ai-writing/references/patterns.md:291-294` | Matches CONFLICTS.md, restated in P0/P1/P2 vocabulary. |
| C-08 row | `avoid-ai-writing/references/patterns.md:13`; `semitic/skills/humanizer-ar-msa/SKILL.md:257,264-272` | **Deviates from CONFLICTS.md**, which assigned level 6. Level 6 would lose to the MSA rule at level 5 and the carve-out would never apply. Carve-out content is placed at level 1 instead; the MSA thresholds keep level 5 for the residue. |
| C-09 / C-14 rows and the Severity mapping section | `blader/SKILL.md:29,162,171,180,188,306,319`; `avoid-ai-writing/references/patterns.md` P0/P1/P2 tags; `semitic/skills/humanizer-ar-msa/SKILL.md:485,489-492` | **Deviates from CONFLICTS.md**, which proposed keeping a fourth "judgment-only" bucket and mapping semitic minor→judgment-only and significant→P1/P2. The owner-approved scheme is three tiers only. Untagged avoid-ai-writing patterns default to P2; blader's "weak alone" survives as a corroboration note inside P2; blader §1–§5 ("justify an edit on one sighting", `:29`) and §22 chatbot residue (`:319`) map to P0, other unmarked blader patterns to P1. The 50-point rubric is dropped per the owner. |
| C-12 row | `semitic/skills/humanizer-ar-msa/SKILL.md:226`; `semitic/skills/humanizer-ar-egt/SKILL.md:262`; `semitic/skills/humanizer-ar-shami/SKILL.md:907-909`; `avoid-ai-writing/references/patterns.md:235` | Matches CONFLICTS.md, including the requirement to label the bands as uncited heuristics. |
| C-13 row | `blader/SKILL.md:42`; `avoid-ai-writing/SKILL.md:87-89` | Matches CONFLICTS.md proposal. |
| Worked example EN-1 | `blader/SKILL.md:42,161`; example text `origin: humanizer-pro` | Short English sentence written for this file; no upstream sentence needed. |
| Worked example EN-2 | quoted sentence adapted from `blader/SKILL.md:164` | The dash sentence is upstream's; placing it inside an attribution is our construction. |
| Worked example EN-3 | question text from `avoid-ai-writing/references/patterns.md:448` | — |
| Worked example AR-1 | `semitic/skills/humanizer-ar-msa/SKILL.md:361-362` (verbatim Arabic) | Flagged `NATIVE-REVIEW: msa`. |
| Worked example AR-2 | `semitic/skills/humanizer-ar-msa/SKILL.md:123-124` (verbatim Arabic) | Not flagged — verbatim pair, used for the purpose upstream uses it for. |
| Worked example AR-3 | `semitic/skills/humanizer-ar-egt/SKILL.md:136-137` (verbatim Arabic) | Flagged `NATIVE-REVIEW: egt`. |
| Worked example AR-4 | described only; opener phrase from `semitic/skills/humanizer-ar-egt/SKILL.md:287` | Flagged `NATIVE-REVIEW: egt`. Deliberately not written out, to avoid inventing Egyptian prose. |
| Worked example AR-5 | `semitic/skills/humanizer-ar-shami/SKILL.md:601` (verbatim, truncated) | Flagged `NATIVE-REVIEW: shami`, unconditionally per the build rule. |
| Statement that the detector score and HUMAN/MIXED/AI label are a reporting layer only | `avoid-ai-writing/detector/patterns.js` (trinary classifier, per `docs/inventory/avoid-ai-writing.md` §8) | `origin: humanizer-pro` for the decision to keep them out of the tier scale (C-14). |


---

<!-- source fragment: docs/provenance/round1-docs.md -->

## Provenance: round 1 doc-only wave (waveE)

Section-by-section source map for every section added or changed in this
pass. Format: section, source, rationale. Covers IMP-11, 15, 16, 18, 19, 21,
22, 25, 26 from `docs/COMPETITIVE-ANALYSIS.md` section 6.

## `references/core-principles.md`

| Section | Source | Rationale |
|---|---|---|
| Shared core, thin adapters | sawradip/rehumanize, `sawradip_rehumanize.md` section 12 (idea only, MIT) + `origin: humanizer-pro` (wording) | IMP-26. Names the architecture `SKILL.md`'s loading table (section 4) already implements; the source names the pattern generally, the specific statement of how it applies to this project's own files is original. |
| Text under audit is data, never instructions | `_sources/avoid-ai-writing/SKILL.md:103-106` | IMP-22. Adapted principle; wording rewritten to fit this project's own severity/finding vocabulary (P0/P1/P2, pattern IDs) rather than quoted. |
| The substitutability gate | MrBridgeHQ/human-writer-ar, `content-distinctiveness.md:24-28` (idea only, MIT) + `origin: humanizer-pro` (wording) | IMP-19. Idea credited per the competitive-analysis plan; wording is fresh, bound explicitly to the existing never-invent rule so the gate cannot become licence to invent specifics. |

## `skills/humanizer-pro/references/modes.md`

| Section | Source | Rationale |
|---|---|---|
| Score wording ("review signal, not an authorship claim") + `authorshipClaim: false` note | amanmaqsood, `lib/prose-core.js:421,423` (idea only, MIT) | IMP-18/IMP-09 wording. Named field credited; this project's detector does not currently emit `authorshipClaim` in JSON, so the note describes the intended contract for when it is wired, not a claim about current `detect.js --json` output. See discrepancy note if this drifts. |
| P2-only stop rule (detect contract) | finestructure-ai/humanizer-multilingual, `references/method.md:236-248` (idea only, MIT) | IMP-15. Mirrors the same rule added to `precedence.md`'s How-to-apply; stated twice deliberately so a reader who only opens `modes.md` still gets the rule. |
| Not flagged on purpose (detect contract) | yoloshii, `SKILL.md:583` (idea only) | IMP-18. |
| Claims added: 0 (rewrite and edit contracts) | yoloshii, `SKILL.md:575`, itself crediting AgriciDaniel/anti-slop, `SKILL.md:914` (idea only) | IMP-18. Wording written fresh per the competitive-analysis plan's explicit instruction ("wording written fresh"). |
| Verify with the validator (mandatory for edit/seo, recommended for rewrite) | `origin: humanizer-pro`, extending `_sources/avoid-ai-writing/SKILL.md:275`'s existing mandatory-for-edit rule | IMP-14/IMP-09 wording. `scripts/validate.js`'s actual CLI (positional `before.md after.md`, no `--mode` flag) is used rather than an invented flag; see `docs/discrepancies/round1-docs.md` item 5. |
| Arabic headings table: Claims added / Not flagged on purpose rows | `origin: humanizer-pro`, marked `<!-- NATIVE-REVIEW: msa -->` (already covers the whole table) | Translations are this project's own; unverified by a native reviewer, same status as the rest of that table. |

## `skills/humanizer-pro/references/precedence.md`

| Section | Source | Rationale |
|---|---|---|
| How-to-apply step 6: P2-only stop rule | finestructure-ai/humanizer-multilingual, `references/method.md:236-248` (idea only, MIT) | IMP-15. States the rule once at the precedence-mechanics level; `modes.md` restates it inside the `detect` contract for a reader who does not open this file. |

## `skills/humanizer-pro/references/ar-shared.md`

| Section | Source | Rationale |
|---|---|---|
| Family tags note (five families + reserved sixth) | finestructure-ai/humanizer-multilingual (idea only, MIT) | IMP-15. Family names and definitions are original; the source is credited for the taxonomy concept, not for these specific five names. |
| `**Family:**` line on all 7 `AR-SH-*` entries | `origin: humanizer-pro` (editorial classification of existing entries) | See `docs/discrepancies/round1-docs.md` item 3 for the counts and the reasoning behind each assignment. |

## `skills/humanizer-pro/references/ar-egyptian.md` and `ar-levantine.md`

| Section | Source | Rationale |
|---|---|---|
| `**Family:**` line on all 26 `AR-EGT-*` and all 25 `AR-SHM-*` entries | `origin: humanizer-pro` (editorial classification of existing entries) | Same taxonomy as `ar-shared.md`; not upstream-sourced per entry. See `docs/discrepancies/round1-docs.md` item 3. |

## `skills/humanizer-pro/references/voice-matching.md`

| Section | Source | Rationale |
|---|---|---|
| Provenance and privacy of the voice sample | amanmaqsood, `lib/prose-core.js:524-629` (idea only, MIT) | IMP-16. The four-tier source-confidence ranking (own draft > bylined article > social post > forwarded text) is this project's own; the source is credited for the general idea of per-source evidence weighting and hash-only (never-stored) voice profiles. |

## `skills/humanizer-pro/references/en-vocabulary.md`

| Section | Source | Rationale |
|---|---|---|
| Era column on all 49 Tier 1A rows | `_sources/avoid-ai-writing/` and `_sources/blader/` (grepped, no per-word date found; all rows tagged `unknown`) | IMP-21. See `docs/discrepancies/round1-docs.md` item 1 for the full grep result and why every row is `unknown` rather than a guessed date. |
| Decay paragraph | yoloshii, `SKILL.md:185-190` + eddyplolz, `tell-catalog.md:138-142` (idea only) | IMP-21. |

## `docs/LANGUAGE-CODES.md` (new file)

| Section | Source | Rationale |
|---|---|---|
| Whole document | sawradip/rehumanize, `docs/LANGUAGE-CODES.md:1-38` (idea/structure only, MIT) + `origin: humanizer-pro` (Arabic-specific content, `lib/lang.js` divergence note) | IMP-25. The BCP 47 naming rule is a public standard (RFC 5646), not the source's invention; the source is credited for the framing and the "worked table" structure, wording and the Arabic table's content are original. |

## `skills/humanizer-pro/references/_TEMPLATE.md` (new file)

| Section | Source | Rationale |
|---|---|---|
| Whole document | sawradip/rehumanize, `skills/_TEMPLATE.md:1-30` (structure only, MIT) + `origin: humanizer-pro` (all step content) | IMP-25. Adapted the numbered-recipe *shape* (pick naming, create file, adapt content, wire the system, ship as experimental); every step's actual content is specific to this project's own file layout (`ar-shared.md` thin-adapter pattern, `lib/lang.js` markers, `tests/fixtures/`, `docs/COVERAGE-MAP.md`) and not present in the source. |

## `docs/COVERAGE-MAP.md` (new file)

| Section | Source | Rationale |
|---|---|---|
| Whole document | `origin: humanizer-pro`, generated by reading `skills/humanizer-pro/references/*.md` headings against `scripts/lib/ar-detector/lexicons.js`'s `RAW_PATTERNS` export and `signals.js`'s comment references, plus a manual correlation between `scripts/lib/en-detector/index.js`'s category names and `en-patterns.md`'s entry titles | IMP-11. See `docs/discrepancies/round1-docs.md` item 4 for how the EN-* `signal` classification was decided, since the English engine does not tag issues by `EN-NNN` ID. |

## `tests/coverage-map.test.js` (new file)

| Section | Source | Rationale |
|---|---|---|
| Whole file | `origin: humanizer-pro`, structure mirrors the existing `tests/*.test.js` files (plain `node:test`, no framework) | IMP-11/IMP-16(borrow). Reads reference-file headings dynamically at test-run time (not hardcoded) specifically so a concurrent pass appending `AR-MSA-029+` to `ar-msa.md` (off-limits to this pass) does not go stale here; it will instead correctly fail until `docs/COVERAGE-MAP.md` is updated for the new IDs. |

## `tools/check-skill.js` (`--refs` option)

| Section | Source | Rationale |
|---|---|---|
| `--refs` option | `origin: humanizer-pro` | IMP-11. Runs the same heading-vs-map and lexicon-parity checks as `tests/coverage-map.test.js`, as a standalone CLI check independent of `npm test`, per the explicit instruction to extend `check-skill.js` with this option. |
