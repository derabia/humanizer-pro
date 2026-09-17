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

---

## Round-1 additions (IMP-12): the classical-rhetoric layer

Four more self-authored Arabic examples entered `ar-msa.md` with the
AR-MSA-029 to AR-MSA-033 block. Each is marked
`<!-- NATIVE-REVIEW: msa -->` in the source file. The summary table above
("Total flagged items: 3") counts only the items that existed before this
round and is superseded by the combined table at the end of this section.

### 4. `skills/humanizer-pro/references/ar-msa.md` AR-MSA-029 before/after pair

```
❌ تُظهر البيانات أن الإنفاق ارتفع. ويُظهر التحليل أن الأثر كان محدودًا.
   وتُظهر المقارنة أن النتيجة لم تتغير.
✓ ارتفع الإنفاق. فأين ذهب؟ التحليل يقول إن الأثر كان محدودًا، والمقارنة
   مع العام السابق لا تُظهر فرقًا يُذكر.
```

**Why flagged:** Self-authored for this port. The upstream source
(`patterns.md:235-241`) gives no before/after pair for this pattern, so
there is nothing to reproduce and nothing to check the example against.
Specific things a reviewer should verify: whether فأين ذهب؟ reads as a
genuine استفهام إنكاري in running report prose rather than as a
journalistic mannerism, and whether the ✓ version's mixture of a bare
verbal sentence with a following nominal one is a natural rhythm or reads
as clipped.

### 5. `skills/humanizer-pro/references/ar-msa.md` AR-MSA-030 before/after pair

```
❌ خرج السكان من البيوت في الليلة نفسها، ووقفوا في الساحة حتى الفجر،
   ولم يعودوا إلا بعد أن هدأ كل شيء.
✓ خرج السكان من البيوت في الليلة نفسها. وها هم يقفون في الساحة حتى
   الفجر، لا يعودون إلا بعد أن يهدأ كل شيء.
```

**Why flagged:** Self-authored for this port; the source gives no example.
This is the riskiest of the four, because it claims a specific tense shift
is an instance of الالتفات rather than an inconsistency. A reviewer should
verify exactly that: whether وها هم يقفون after a ماضٍ opening is read by
a native reader as a deliberate rhetorical shift into the present, or as a
tense error. If it reads as an error, the example should be replaced with a
person shift rather than a tense shift, or the entry should carry no
example at all.

### 6. `skills/humanizer-pro/references/ar-msa.md` AR-MSA-031 before/after pair

```
❌ قامت اللجنة بإجراء مراجعة شاملة للملفات، ثم قامت بتقديم توصياتها،
   وبعد ذلك تم القيام باتخاذ القرار النهائي.
✓ راجعت اللجنة الملفات كلها، وقدّمت توصياتها، ثم اتخذت قرارها.
```

**Why flagged:** Self-authored, though the *shape* of the pair follows the
source's own example at `patterns.md:288-291` (a company conducting a study
and then making a decision). Lowest risk of the four: both sides are
ordinary administrative MSA and the transformation is mechanical. A
reviewer should still confirm that راجعت اللجنة الملفات كلها is the
natural direct-verb rendering rather than راجعت اللجنة كل الملفات, and
that dropping شاملة loses nothing a reviewer would want kept.

### 7. `skills/humanizer-pro/references/ar-msa.md` AR-MSA-032 before/after pair

```
❌ أخذت قرارًا متأخرًا بعد أن أخذت بعين الاعتبار كل الملاحظات.
✓ اتخذت قرارًا متأخرًا بعد أن راعت كل الملاحظات.
```

**Why flagged:** Self-authored. The two calques themselves are taken from
the source (`patterns.md:293-299`), which documents أخذ قرارًا against
اتخذ قرارًا explicitly; the sentence around them is this port's. A
reviewer should verify the replacement verbs specifically: whether راعت is
the verb a native writer reaches for here, or whether وضعت في الحسبان or
أخذت في الحسبان is the more usual form in administrative register, since
the entry's Fix text recommends راعى first.

Note on AR-MSA-033: that entry contains no Arabic example sentence, only
term names for the five classical defects, so it carries no
`NATIVE-REVIEW` marker and appears in no row below.

## Summary, all rounds

| # | File:line | Section | Origin |
|---|---|---|---|
| 1 | `ar-shared.md:358-359` | Typography, Arabic punctuation | Self-authored (humanizer-pro) |
| 2 | `ar-shared.md:392-397` | Typography, digit convention | Self-authored (humanizer-pro) |
| 3 | `ar-msa.md:676-681` | AR-MSA-025 dialogue example | Verbatim upstream, pre-existing inconsistency |
| 4 | `ar-msa.md` AR-MSA-029 | Declarative rigidity example | Self-authored (humanizer-pro) |
| 5 | `ar-msa.md` AR-MSA-030 | Missing iltifat example | Self-authored (humanizer-pro), highest risk of the four |
| 6 | `ar-msa.md` AR-MSA-031 | Light-verb calque example | Self-authored, shape follows the MIT source |
| 7 | `ar-msa.md` AR-MSA-032 | Collocation calque example | Self-authored, calques taken from the MIT source |

Total flagged items after round 1: 7 (2 shared, 5 MSA). Line numbers for
items 4 to 7 are given by pattern id rather than by line, because the
entries sit at the end of a file that later rounds will keep appending to.
