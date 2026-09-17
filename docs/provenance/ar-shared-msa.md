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
