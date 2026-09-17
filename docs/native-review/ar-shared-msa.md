# Native-speaker review queue — `ar-shared.md` and `ar-msa.md`

Every item below is marked `<!-- NATIVE-REVIEW: msa -->` or
`<!-- NATIVE-REVIEW: shared -->` in the source file, immediately after the
Arabic text it applies to. Items fall into two categories: examples this
port wrote itself (no native-speaker check has been done at all), and an
upstream example this port reproduces verbatim but that the inventory
already flagged as internally inconsistent.

## Shared

### 1. `skills/humanizer-pro/references/ar-shared.md:358-359` (Typography — Arabic punctuation)

```
❌ هل يمكن أن نتحقق من هذا الافتراض, ثم نراجع النتيجة?
✓ هل يمكن أن نتحقق من هذا الافتراض، ثم نراجع النتيجة؟
```

**Why flagged:** Self-authored for this port (origin: humanizer-pro — no
upstream file addresses Arabic punctuation glyphs at all, per
`docs/inventory/semitic.md` §6). Not checked against native usage. Specific
things a reviewer should verify: whether "هل يمكن أن نتحقق من هذا
الافتراض" is a natural way to phrase this particular hedge-question in
running MSA prose (vs. a more idiomatic construction), and whether the
sentence break/comma placement before "ثم نراجع النتيجة" reads naturally or
is a slightly calqued construction.

### 2. `skills/humanizer-pro/references/ar-shared.md:392-397` (Typography — digit convention)

```
❌ وقع الحدث في ٢٠٢٤/03/15 بحضور 45 مشاركًا، وكان عدد الحضور في الدورة
   السابقة ٣٠.
✓ وقع الحدث في 2024/03/15 بحضور 45 مشاركًا، وكان عدد الحضور في الدورة
   السابقة 30.
✓ وقع الحدث في ٢٠٢٤/٠٣/١٥ بحضور ٤٥ مشاركًا، وكان عدد الحضور في الدورة
   السابقة ٣٠.
```

**Why flagged:** Self-authored for this port, same reason as item 1 — no
upstream source for Arabic digit-convention examples. A reviewer should
check: whether "وقع الحدث" is the most natural verb choice for "the event
took place" in this register, whether the date-format slash convention
(٢٠٢٤/٠٣/١٥) is how a native MSA writer would actually format a date next to
Arabic-Indic numerals (vs. a different separator or word order), and
whether the sentence is otherwise idiomatic.

## MSA

### 3. `skills/humanizer-pro/references/ar-msa.md:676-681` (AR-MSA-025, Overgeneralization of Formal MSA — dialogue fix example)

```
❌ قال المدير: "ينبغي علينا أن نُعيد النظر في استراتيجياتنا المتعلقة بإدارة
   الموارد البشرية."
✓ قال المدير: "لازم نراجع طريقة إدارتنا للفريق — الوضع مش تمام."
```

**Why flagged:** Reproduced verbatim from upstream
(`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:425-427`), not
self-authored — but the inventory that fed this port already identified a
specific problem with it: the "human" fix example uses مش تمام, a colloquial
negation form (broadly Egyptian-leaning, also heard Levantine/Gulf-adjacent),
inside a skill whose stated scope is formal MSA text, and the source never
specifies which dialect the manager's dialogue is meant to represent. This
may be a deliberate illustration that MSA-prose dialogue should drop to
*some* colloquial register (the pattern's own point), or it may be an
unmarked colloquial blend that should be pinned to a specific dialect (or
generalized more explicitly as "colloquial, dialect unspecified") before
this example is presented to a user as an authoritative fix. Originally
flagged in `docs/inventory/semitic.md` §10 ("Surprises") and §11
("Confidence notes," item 4) — this port carries the same concern forward
rather than resolving it, since resolving it requires native-speaker
judgment this task did not have access to.

## Summary

| # | File:line | Section | Origin |
|---|---|---|---|
| 1 | `ar-shared.md:358-359` | Typography — Arabic punctuation | Self-authored (humanizer-pro) |
| 2 | `ar-shared.md:392-397` | Typography — digit convention | Self-authored (humanizer-pro) |
| 3 | `ar-msa.md:676-681` | AR-MSA-025 dialogue example | Verbatim upstream, pre-existing inconsistency |

Total flagged items: 3 (2 shared, 1 MSA).
