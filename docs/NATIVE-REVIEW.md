# Native-speaker review queue

Arabic items awaiting a native speaker, grouped by area then variety. MSA and Egyptian: project owner. Levantine: no reviewer yet (whole file experimental). Fragments in docs/native-review/.

Upstream commits: blader 9862685f575c65a8247f90369951df1b3416e3d6; avoid-ai-writing 7a2c7d11d4a74d90c6be41fbed8402d972543798; semitic 2c9d4fbe3e0086d373b59bfebc9556082275cf62.



---

<!-- source fragment: docs/native-review/ar-egt-shm.md -->

## Native-review queue — `ar-egyptian.md` / `ar-levantine.md`

Every item below corresponds to one `<!-- NATIVE-REVIEW: egt -->` or
`<!-- NATIVE-REVIEW: shami -->` marker in the two reference files. Counts must match:
5 markers in `ar-egyptian.md` → 5 items under "## Egyptian"; 25 markers in
`ar-levantine.md` → 25 items under "## Levantine" (the file's preamble also mentions the
tag once, in backticks, as description text — that mention is not a marker and is not
counted).

## Egyptian

1. **File:** `skills/humanizer-pro/references/ar-egyptian.md`, AR-EGT-014 (لأن and لكي
   Instead of عشان). **Excerpt:** upstream Pattern 7 example "لم أستطع أن أفهم ذلك لأنه
   لم يكن واضحاً" → "ماقدرتش أفهم ده لأنه ماكانش واضح" (egt:217–218). **What is
   uncertain:** the "human" fixed sentence keeps لأنه (MSA causal) even though Pattern 14
   (this entry) mandates لأن→عشان. Need a native check on whether لأنه survives as an
   accepted fossilized form in otherwise-Egyptian text, or whether the upstream source is
   internally inconsistent between its own patterns.

2. **File:** `skills/humanizer-pro/references/ar-egyptian.md`, AR-EGT-017 (No Arabizi).
   **Excerpt:** upstream "Human (WhatsApp)" example "ya man mesh 3aref aعمل إيه"
   (egt:424), reproduced verbatim. **What is uncertain:** the token "aعمل" mixes a bare
   Latin "a" directly onto the Arabic word عمل instead of a full Arabizi transliteration
   (e.g. "a3mal eih"). Likely a copy/generation artifact in the upstream source itself
   (flagged in `docs/inventory/semitic.md` §11 item 1); needs a native speaker to say
   whether this is ever real usage or should be corrected/removed before reuse.

3. **File:** `skills/humanizer-pro/references/ar-egyptian.md`, AR-EGT-018 (Perfect
   Orthographic Consistency). **Excerpt:** upstream spelling-variation table entries
   "هيعمل / هيعمل / هيعمل" (egt:440) and "إيه / ايه / ايه؟" (egt:435). **What is
   uncertain:** the three هيعمل forms are visually identical (possible authoring error or
   invisible Unicode difference); ايه؟ pairs a question mark with a spelling variant as if
   punctuation were an orthographic variant. Needs a native/byte-level check
   (`docs/inventory/semitic.md` §11 item 2) before trusting either row as real dialectal
   variation.

4. **File:** `skills/humanizer-pro/references/ar-egyptian.md`, AR-EGT-019 (Missing Letter
   Lengthening). **Excerpt:** upstream "AI" example "أيوه، هذا صحيح تماماً ولا" (egt:464),
   reproduced verbatim. **What is uncertain:** the sentence ends on a bare ولا with no
   following clause, reading as truncated/malformed rather than a complete tag-question.
   Needs a native check on whether this is an elided "ولا لأ"-style tag or a copy error in
   the upstream source.

5. **File:** `skills/humanizer-pro/references/ar-egyptian.md`, AR-EGT-024 (No Terms of
   Address). **Excerpt:** upstream address-term table entry "يا طا" glossed "for respected
   older men" (egt:556). **What is uncertain:** this project could not independently
   confirm يا طا as a standard Egyptian address term (possibly a shortened/regional form,
   or an upstream typo for a longer term such as يا باشا/يا طال عمرك). Needs a native
   Egyptian speaker's confirmation before treating it as a general recommendation.

## Levantine

Levantine has no native reviewer for this build pass (see the file's own
`status: experimental` line). Per owner instruction, every example was kept as close to
the upstream wording as possible rather than rewritten, and every entry therefore carries
a `NATIVE-REVIEW: shami` marker — even where this project has no specific concern beyond
"no native check has been performed yet." Items with a concrete textual concern are noted
as such; the rest are flagged generically for baseline dialectal-accuracy review.

1. **AR-SHM-001** (MSA Reversion / MSA-leakage umbrella). **Excerpt:** Palestinian example
   "بدو يروح عالبيت هلق (same core, add ـش to negated versions nearby)" (shm:139). **What
   is uncertain:** the note refers to adding ـش negation, but the example sentence
   contains no negated verb to apply it to — the instruction is unattached to any visible
   word. Needs a native Palestinian speaker to supply the actually-intended negated form.

2. **AR-SHM-002** (Missing ب-prefix). **Excerpt:** "هي بتشتغل كتير وما بتنام بوقتها"
   (shm:170), reproduced verbatim. **What is uncertain:** no specific concern beyond
   baseline dialectal-accuracy review (no native Levantine reviewer available).

3. **AR-SHM-003** (Missing عم Progressive Marker). **Excerpt:** Syrian example "هو عم
   ياكل هلق، ما فيك تحكيه هلق" (shm:194). **What is uncertain:** هلق appears twice in one
   short sentence; may be intentional repetition (the source elsewhere treats repetition
   as a natural feature, Pattern 25) or a copy-paste artifact. Needs native confirmation.

4. **AR-SHM-004** (Wrong Future: سوف/سـ instead of رح). **Excerpt:** "رح روح عالشغل بكرا
   ورح كمّل التقرير" (shm:216), reproduced verbatim. **What is uncertain:** no specific
   concern beyond baseline review.

5. **AR-SHM-005** (Wrong Negation System). **Excerpt:** three regional variants "ما راح
   عاللقاء لأنو مو فاضي / مش فاضي / ما راحش عاللقاء لأنو مش فاضي" (shm:251–253). **What is
   uncertain:** no specific concern beyond confirming the Syrian مو-vs-مش optionality and
   the Palestinian ـش placement are both natural as written.

6. **AR-SHM-006** (MSA Question Words and Demonstratives). **Excerpt:** three regional
   variants of "شو/إيش بدك تعمل هلق/هلأ؟ هاد/هيدا الشي بدو كتير وقت" (shm:301–303). **What
   is uncertain:** no specific concern beyond baseline review of the full regional table.

7. **AR-SHM-007** (أريد instead of بدّ). **Excerpt:** "بدّي نام بكير الليلة، وهو بدّو يروح
   عالسينما" (shm:341), reproduced verbatim. **What is uncertain:** no specific concern
   beyond baseline review.

8. **AR-SHM-008** (MSA Pronouns and Verb Agreement). **Excerpt:** "انتو موافقين؟ هني/هودي
   ما فهمو شو قلت" (shm:372–373). **What is uncertain:** no specific concern beyond
   confirming هني vs هودي regional split is applied correctly.

9. **AR-SHM-009** (MSA Prepositions). **Excerpt:** "راح عالبيت واكل، وبعدين رجع
   عالمدرسة" (shm:399), reproduced verbatim. **What is uncertain:** no specific concern
   beyond baseline review.

10. **AR-SHM-010** (Active Participle as Present State). **Excerpt:** "أنا عارف هاد
    الموضوع منيح وأنا رايح لهونيك هلق" (shm:437), reproduced verbatim. **What is
    uncertain:** no specific concern beyond baseline review.

11. **AR-SHM-011** (Missing Discourse Fillers). **Excerpt:** "يعني هاد الشي صعب، بدّي وقت
    أفكر فيه بس، والله ما عارف شو لازم أعمل" (shm:482), reproduced verbatim. **What is
    uncertain:** no specific concern beyond baseline review.

12. **AR-SHM-012** (Formal Transition Phrases, deferred to ar-shared). **Excerpt:**
    "المهم هاد الوضع بدو معالجة منيحة. وكمان لازم ناخد بعين الاعتبار" (shm:514). **What is
    uncertain:** no specific concern beyond confirming the regional table (shm:493–501)
    correctly distinguishes بهاد الموضوع (Syr/Pal) from بهيدا الموضوع (Leb).

13. **AR-SHM-013** (Uniform Register). **Excerpt:** "هاد الموضوع بدو اهتمام، بس — والله
    يا حبيبي — لو تعرف قديش صار يعني. بدّنا نعمل شي. آخ." (shm:541). **What is
    uncertain:** no specific concern beyond baseline review of the register-shift claim.

14. **AR-SHM-014** (Heavy Passive Voice). **Excerpt:** "هاد الشي مهم وكل واحد بيستخدمو
    بهاد المجال" (shm:570), reproduced verbatim. **What is uncertain:** no specific
    concern beyond baseline review.

15. **AR-SHM-015** (No Reader-Directed Questions). **Excerpt:** "هاد الأسلوب أحسن لأنو
    بيوفر وقت وجهد، بتفهم؟ يعني النتايج رح تكون ممتازة، مش هيك؟" (shm:601). **What is
    uncertain:** no specific concern beyond baseline review.

16. **AR-SHM-016** (Lebanese: Missing French Code-Switching). **Excerpt:** "merci كتير!
    عنجد تعبتو حالكن. كانت الـ voiture أمام الـ ascenseur" (shm:651). **What is
    uncertain:** no specific concern beyond confirming French-insertion density/placement
    reads as natural Beiruti usage rather than over-applied.

17. **AR-SHM-017** (Syrian/Palestinian: Missing English Code-Switching). **Excerpt:**
    "بعتلي message أو DM لمّا تخلص من الـ meeting" (shm:689), reproduced verbatim. **What
    is uncertain:** no specific concern beyond baseline review.

18. **AR-SHM-018** (Diacritics Present / Tashkeel). **Excerpt:** "بدو يروح عالبيت هلق"
    (shm:714), reproduced verbatim. **What is uncertain:** no specific concern beyond
    confirming the shadda-retention carve-out (بدّي, هلّق) is complete and correct.

19. **AR-SHM-019** (Formal Hamza Writing). **Excerpt:** "انا بدّي آكل شي هلق (or: انا بدي
    ياكل شي هلق in some orthographic registers)" (shm:747). **What is uncertain:** the
    second alternate form uses ياكل (a 3rd-person/participle-adjacent form) after the
    1st-person بدي, which may be a person-agreement inconsistency; the source itself
    hedges with "in some orthographic registers" rather than resolving it. Needs a native
    check on which (if either) form is standard 1st-person usage.

20. **AR-SHM-020** (ث/ذ Not Phonologically Shifted). **Excerpt:** "هاد الشخص كدّاب، وهاد
    تاني شخص عم يعمل هيك" (shm:778), reproduced verbatim. **What is uncertain:** no
    specific concern beyond confirming the selective-application guidance (avoid
    caricature) is followed correctly in downstream use.

21. **AR-SHM-021** (Missing Interjections). **Excerpt:** "والله يا حبيبي هاد الأكل يسلمو
    إيدو، آخ ما أحلاه، شو هالشي!" (shm:826), reproduced verbatim. **What is uncertain:**
    no specific concern beyond confirming the Syrian-tagged interjections (يسلمو) are not
    misapplied to Lebanese/Palestinian text.

22. **AR-SHM-022** (Wrong Terms of Address). **Excerpt:** "حبيبي، انت عارف إنو هاد صح، مش
    هيك؟" (shm:863), reproduced verbatim. **What is uncertain:** no specific concern
    beyond baseline review.

23. **AR-SHM-023** (Missing Turkish Loanwords, Syrian). **Excerpt:** "حط شنطتو بالأوضة
    وستنّا" (shm:901), reproduced verbatim. **What is uncertain:** no specific concern
    beyond confirming these loanwords read as current everyday Syrian usage, not archaic.

24. **AR-SHM-024** (Uniform Sentence Length Distribution, deferred to ar-shared).
    **Excerpt:** "رحت عالسوق اليوم. والله. اشتريت أشياء وبعدين الجو كان منيح وكنت مبسوط
    وبعدين رجعت عالبيت وأكلت وناميت. بس هيك." (shm:934–935), reproduced verbatim. **What
    is uncertain:** no specific concern beyond baseline review of the paratactic-chain
    example.

25. **AR-SHM-025** (Consistent Spelling of Variable Words). **Excerpt:** upstream
    "variant spellings" table entries "هلق/هلأ/هلأ", "هيدا/هيدا" ("Minor variation"),
    "معي/معي/مي", "كيف/كيف", "هونيك/هونيك", "بس/بس" (shm:951–962). **What is uncertain:**
    several pairs are visually identical strings presented as spelling variants — likely
    authoring artifacts in the upstream source (flagged in `docs/inventory/semitic.md`
    §11 item 3). Needs native re-verification against real usage before reuse; the
    "معي/معي/مي" row additionally mixes two identical entries with one that is a
    genuinely different word (مي), which is not explained in the source.


---

<!-- source fragment: docs/native-review/ar-shared-msa.md -->

## Native-speaker review queue — `ar-shared.md` and `ar-msa.md`

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


---

<!-- source fragment: docs/native-review/ballot-egyptian.md -->

## استمارة مراجعة متحدث أصلي — اللهجة المصرية

هاي استمارة مراجعة لمتحدث أصلي باللهجة المصرية لمشروع humanizer-pro. كل صف
تحت بيعرض مقطع عربي (من ملفات المرجع، أمثلة الاختبار، أو مخرجات التقييم
الفعلية) مع توضيح ليش هو غير مؤكد وبيحتاج عين متحدث أصلي.

**العدد الكلي:** 18 عنصر.

**الوقت المتوقع:** حوالي دقيقة إلى دقيقتين لكل عنصر، يعني تقريبًا 27
دقيقة للاستمارة كاملة (ممكن تاخدها على أكتر من جلسة).

**المطلوب منك:** لكل صف، اقرأ المقطع وجاوب:
- **طبيعي؟ (نعم/لا):** هل هيك بيحكي/بيكتب متحدث أصلي فعلاً؟
- **التصحيح المقترح:** إذا الجواب "لا"، اكتب الصيغة الصح (أو الملاحظة اللي
  بتوضح شو غلط).
- **ملاحظات:** أي شي تاني حابب تضيفه (مثلاً: الصيغة صحيحة بس مش شائعة، أو
  بتنتمي لمنطقة فرعية معينة، إلخ).

لا تحتاج تعبّي كل الأعمدة لكل صف إذا ما في عندك ملاحظة — بس "طبيعي؟" مهم
تتعبى لكل صف.


## العناصر

| # | الملف:السطر | المقتطف | ما هو غير مؤكد | طبيعي؟ (نعم/لا) | التصحيح المقترح | ملاحظات |
|---:|---|---|---|---|---|---|
| 1 | `skills/humanizer-pro/references/ar-egyptian.md:249` | upstream Pattern 7 example: "لم أستطع أن أفهم ذلك لأنه لم يكن واضحاً" → "ماقدرتش أفهم ده لأنه ماكانش واضح" (egt:217-218) | الجملة "الإنسانية" المصححة تحتفظ بـ"لأنه" (سبب فصيح) رغم إن نفس النمط (AR-EGT-014) بيفرض لأن→عشان. هل "لأنه" ثابتة ومقبولة بالمصرية العامية، ولا في تضارب داخل المصدر الأصلي؟ |  |  |  |
| 2 | `skills/humanizer-pro/references/ar-egyptian.md:310` | "ya man mesh 3aref aعمل إيه" (مثال المصدر نفسه "Human", egt:424) | الرمز "aعمل" بيخلط حرف لاتيني مفرد "a" مباشرة بكلمة عربية "عمل" بدل ترانسليتريشن أرابيزي كامل (مثلاً a3mal eih). يمكن يكون عيب نسخ/توليد بالمصدر الأصلي. هل ده استخدام حقيقي فعلاً؟ |  |  |  |
| 3 | `skills/humanizer-pro/references/ar-egyptian.md:331` | "هيعمل / هيعمل / هيعمل" (egt:440) و"إيه / ايه / ايه؟" (egt:435) | صيغ "هيعمل" التلاتة متطابقة بصريًا (احتمال خطأ كتابة أو فرق يونيكود غير مرئي)؛ و"ايه؟" بتحط علامة استفهام كأنها تنويع إملائي. محتاجة فحص على مستوى البايت من متحدث أصلي قبل اعتمادها كتنويع لهجي حقيقي. |  |  |  |
| 4 | `skills/humanizer-pro/references/ar-egyptian.md:354` | "أيوه، هذا صحيح تماماً ولا" (مثال "AI", egt:464) | الجملة بتخلص بـ"ولا" من غير جملة تانية بعدها، بتقرا كأنها مبتورة مش سؤال-ذيل كامل. هل دي صيغة محذوفة زي "ولا لأ" ولا غلطة نسخ بالمصدر؟ |  |  |  |
| 5 | `skills/humanizer-pro/references/ar-egyptian.md:443` | "يا طا" — موصوفة إنها "for respected older men" (egt:556) | المشروع مقدرش يأكد "يا طا" كمصطلح مصري قياسي (يمكن تكون صيغة مختصرة/إقليمية، أو خطأ مطبعي في المصدر بدل يا باشا/يا طال عمرك). محتاجة تأكيد من متحدث مصري أصلي قبل اعتمادها كتوصية عامة. |  |  |  |
| 6 | `evals/runs/iteration-1/egt-detect-01/output.md:1` | (تقرير فحص فقط — وضع detect، من غير أي نص معاد كتابته لتقييمه) | التقرير بالكامل (تحليل + تقييم) اتكتب بواسطة وكيل مش متحدث أصلي عربي. محتاج مراجعة عامة للأسلوب والمصطلحات المستخدمة في التقرير. |  |  |  |
| 7 | `evals/runs/iteration-1/egt-edit-01/edited.md:8` | "وحاجة مهمة اتعلمتها وأنا بعمل كده: متحاولش تعمل كل حاجة مرة واحدة. اللي فرق معايا إني بدأت بسيط وبعدين ضفت حاجات بالراحة، مش رميت كل الأتمتة على البوت من أول يوم." | الفقرة دي استبدلت فقرة فصحى مقحمة ("من الجدير بالذكر أن اعتماد نهج شامل ومتكامل...") بنص عامي جديد بالكامل. النص باقي البوست أصلي مصري ومتوقّع يفضل زي ما هو؛ الفقرة الجديدة دي محتاجة تأكيد إنها بتقرا مصري طبيعي فعلاً. |  |  |  |
| 8 | `evals/runs/iteration-1/egt-rewrite-01/rewritten.md:8` | "الصوت كويس بصراحة بشكل عام، بس في حاجة لازم أقولها: المايك بيتخانق شوية في..." | كلمة "بيتخانق" مستخدمة هنا بمعنى تشويش/التقاط صوت زايد من المايك — استخدام عامي محتمل بس مش متأكد منه (مذكور في grade.md كـ"plausible but unverified colloquialism"). هل ده استخدام فعلي شائع؟ |  |  |  |
| 9 | `evals/runs/iteration-1/egt-seo-01/rewritten-full.md:10` | "فيه أكل مصري سريع تقدر تعمله في البيت بنفسك، أكلات بسيطة بتتعمل في أقل من..." (الكلمة المفتاحية "أكل مصري سريع" مُدرجة هنا) | إدراج الكلمة المفتاحية "أكل مصري سريع" داخل الجملة لسه ما اتأكد إنه بيقرا طبيعي (مش حشو سيو واضح) من متحدث أصلي. |  |  |  |
| 10 | `tests/fixtures/ar-egt/human-01.md:2` | "نزلت السوق الصبح بدري عشان أجيب حاجة البيت." (نص كامل عن نزلة سوق يوم جمعة) | طبيعية نص عامي مكتوب من غير متحدث أصلي (synthetic-human)، تركيز خاص على تغطية بادئة الـ"بـ" مع الفعل المضارع (AR-EGT-004). |  |  |  |
| 11 | `tests/fixtures/ar-egt/human-02.md:2` | "الماتش خلص تعادل، بس محدش في المدرج كان بيتكلم عن النتيجة." (نص عن ماتش كورة والرجعة بالعربية) | طبيعية نص عامي مكتوب من غير متحدث أصلي؛ فحص خاص لصيغ المستقبل حـ/هـ (AR-EGT-003) وإزاي بتتكتب فعليًا. |  |  |  |
| 12 | `tests/fixtures/ar-egt/human-03.md:2` | "الملوخية عند تيتة مش بتتكتب. جربت مرة، طلعت الورقة كلها «شوية» و«على قد ما تحسي»." (وصفة ملوخية بأسلوب الجدة) | طبيعية نص عامي مكتوب من غير متحدث أصلي؛ فحص خاص لأي اختيارات إملائية ممكن تبان كتخمين شخص مش أصلي (AR-EGT-018، AR-EGT-023). |  |  |  |
| 13 | `tests/fixtures/ar-egt/human-04.md:2` | "الأتوبيس رقم ٣٢ بيتأخر عشر دقايق على طول، وبعدين ييجي اتنين مع بعض." (رحلة أتوبيس عبر المدينة) | طبيعية نص عامي مكتوب من غير متحدث أصلي (synthetic-human)، بدون نقطة تركيز إضافية محددة غير المراجعة العامة. |  |  |  |
| 14 | `tests/fixtures/ar-egt/human-05.md:2` | "في الشغل النهارده كان في حاجة غريبة بصراحة." (يوم شغل فيه تبديل كود إنجليزي) | فحص خاص: هل كثافة تبديل الكود الإنجليزي في هالملف بتطابق استخدام القاهرة المتعلمة الفعلي (AR-EGT-016)؟ |  |  |  |
| 15 | `tests/fixtures/false-positives/ar-rhetorical-egt.md:2` | "إنت فاكر إن المشكلة في الفلوس؟ لأ. المشكلة في التوقيت." (أسئلة بلاغية موجهة للقارئ، لازم تتصنف HUMAN) | المفروض يتصنف النص ده HUMAN مش AI رغم وجود سؤال موجه للقارئ. هل الصياغة دي فعلاً طبيعية كسؤال بلاغي مصري ومش هتتصنف غلط؟ |  |  |  |
| 16 | `skills/humanizer-pro/references/precedence.md:161` | مثال AR-3: "سوف نتحدث عن هذا الموضوع لاحقاً وسأذهب لمقابلته غداً" → "هنتكلم في الموضوع ده بعدين وهروح أقابله بكره" | الادعاء المحيط بالمثال إنه لو كان النص المستهدف فصحى (MSA) كانت هتفضل الجملة الأصلية زي ما هي من غير تعديل. هل "سوف...لاحقاً" بالتنوين مقبولة فصحى قياسية فعلاً بحالها؟ |  |  |  |
| 17 | `skills/humanizer-pro/references/precedence.md:170` | (موصوف مش مُقتبَس) — إجراء تنصيب مصري من سبع خطوات، بافتتاحية فصحى مقحمة "من الجدير بالذكر أن ..." (مأخوذة من semitic/skills/humanizer-ar-egt/SKILL.md:287) | المثال موصوف بس مش مكتوب فعليًا. هل يستاهل نضيف مثال مصري فعلي (قبل/بعد) هنا؟ |  |  |  |
| 18 | `skills/humanizer-pro/references/voice-matching.md:193` | "مش عارف ليه بس حاسس إن ده مهم" (جملة توضيحية لنموذج كتابة مصري) | الجملة اتكتبت لهذا التوضيح بس (مش منسوخة من عينة مستخدم حقيقية ولا متأكدة من قاموس ar-egt.md مباشرة). هل بتقرا مصري عامي طبيعي فعلاً ولا فيها لمسة فصحى؟ وهل الوصف (بس كأداة ربط، ده كإشارة) دقيق؟ |  |  |  |

---

## كيف ترجع النتائج

عدّل هذا الملف مباشرة (عبّي الأعمدة الفاضية في الجدول اللي فوق)، واحفظه،
وابعتلي إياه (أنا رح آخد نسختك المعدَّلة وأطبّق التصحيحات على ملفات المرجع
المصدر). ما تحتاج تفتح أي ملف تاني — كل المعلومات اللازمة موجودة بعمود
"الملف:السطر" و"المقتطف".



---

<!-- source fragment: docs/native-review/ballot-levantine.md -->

## استمارة مراجعة متحدث أصلي — اللهجة الشامية (اللبنانية/السورية/الفلسطينية)

هاي استمارة مراجعة لمتحدث أصلي باللهجة الشامية (اللبنانية/السورية/الفلسطينية) لمشروع humanizer-pro. كل صف
تحت بيعرض مقطع عربي (من ملفات المرجع، أمثلة الاختبار، أو مخرجات التقييم
الفعلية) مع توضيح ليش هو غير مؤكد وبيحتاج عين متحدث أصلي.

**العدد الكلي:** 35 عنصر.

**الوقت المتوقع:** حوالي دقيقة إلى دقيقتين لكل عنصر، يعني تقريبًا 52
دقيقة للاستمارة كاملة (ممكن تاخدها على أكتر من جلسة).

**المطلوب منك:** لكل صف، اقرأ المقطع وجاوب:
- **طبيعي؟ (نعم/لا):** هل هيك بيحكي/بيكتب متحدث أصلي فعلاً؟
- **التصحيح المقترح:** إذا الجواب "لا"، اكتب الصيغة الصح (أو الملاحظة اللي
  بتوضح شو غلط).
- **ملاحظات:** أي شي تاني حابب تضيفه (مثلاً: الصيغة صحيحة بس مش شائعة، أو
  بتنتمي لمنطقة فرعية معينة، إلخ).

لا تحتاج تعبّي كل الأعمدة لكل صف إذا ما في عندك ملاحظة — بس "طبيعي؟" مهم
تتعبى لكل صف.


**ملاحظة مهمة:** تغطية اللهجة الشامية بهالسكيل (`ar-levantine.md`) موسومة بالكامل "تجريبية" (`status: experimental`) — ما في متحدث شامي أصلي راجعها لهلق. كل عنصر تحت، حتى اللي ما فيه ملاحظة محددة، محتاج مراجعتك الأساسية.

## العناصر

| # | الملف:السطر | المقتطف | ما هو غير مؤكد | طبيعي؟ (نعم/لا) | التصحيح المقترح | ملاحظات |
|---:|---|---|---|---|---|---|
| 1 | `skills/humanizer-pro/references/ar-levantine.md:66` | Palestinian example: "بدو يروح عالبيت هلق (same core, add ـش to negated versions nearby)" (shm:139) | الملاحظة بتشاور لإضافة نفي بـ"ـش"، بس الجملة نفسها ما فيها فعل منفي أصلاً — التعليمة معلقة من غير كلمة تتطبق عليها. محتاج متحدث فلسطيني أصلي يجيب الصيغة المقصودة فعلاً. |  |  |  |
| 2 | `skills/humanizer-pro/references/ar-levantine.md:90` | "هي بتشتغل كتير وما بتنام بوقتها" (shm:170) | مافي ملاحظة محددة أبعد من المراجعة الأساسية لدقة اللهجة (ما في مراجع شامي أصلي متاح). |  |  |  |
| 3 | `skills/humanizer-pro/references/ar-levantine.md:110` | Syrian example: "هو عم ياكل هلق، ما فيك تحكيه هلق" (shm:194) | "هلق" مكررة مرتين بجملة قصيرة؛ ممكن تكون مقصودة (تكرار طبيعي) أو خطأ نسخ. محتاجة تأكيد. |  |  |  |
| 4 | `skills/humanizer-pro/references/ar-levantine.md:130` | "رح روح عالشغل بكرا ورح كمّل التقرير" (shm:216) | مافي ملاحظة محددة أبعد من المراجعة الأساسية. |  |  |  |
| 5 | `skills/humanizer-pro/references/ar-levantine.md:158` | ثلاث صيغ إقليمية: "ما راح عاللقاء لأنو مو فاضي / مش فاضي / ما راحش عاللقاء لأنو مش فاضي" (shm:251-253) | محتاج تأكيد إن التبادل السوري مو/مش والموضع الفلسطيني لـ"ـش" كلاهم طبيعيين زي ما مكتوبين. |  |  |  |
| 6 | `skills/humanizer-pro/references/ar-levantine.md:182` | ثلاث صيغ إقليمية: "شو/إيش بدك تعمل هلق/هلأ؟ هاد/هيدا الشي بدو كتير وقت" (shm:301-303) | مافي ملاحظة محددة أبعد من مراجعة الجدول الإقليمي كامل. |  |  |  |
| 7 | `skills/humanizer-pro/references/ar-levantine.md:201` | "بدّي نام بكير الليلة، وهو بدّو يروح عالسينما" (shm:341) | مافي ملاحظة محددة أبعد من المراجعة الأساسية. |  |  |  |
| 8 | `skills/humanizer-pro/references/ar-levantine.md:222` | "انتو موافقين؟ هني/هودي ما فهمو شو قلت" (shm:372-373) | محتاج تأكيد إن التقسيم الإقليمي هني مقابل هودي مطبق صح. |  |  |  |
| 9 | `skills/humanizer-pro/references/ar-levantine.md:239` | "راح عالبيت واكل، وبعدين رجع عالمدرسة" (shm:399) | مافي ملاحظة محددة أبعد من المراجعة الأساسية. |  |  |  |
| 10 | `skills/humanizer-pro/references/ar-levantine.md:260` | "أنا عارف هاد الموضوع منيح وأنا رايح لهونيك هلق" (shm:437) | مافي ملاحظة محددة أبعد من المراجعة الأساسية. |  |  |  |
| 11 | `skills/humanizer-pro/references/ar-levantine.md:282` | "يعني هاد الشي صعب، بدّي وقت أفكر فيه بس، والله ما عارف شو لازم أعمل" (shm:482) | مافي ملاحظة محددة أبعد من المراجعة الأساسية. |  |  |  |
| 12 | `skills/humanizer-pro/references/ar-levantine.md:307` | "المهم هاد الوضع بدو معالجة منيحة. وكمان لازم ناخد بعين الاعتبار" (shm:514) | محتاج تأكيد إن الجدول الإقليمي (shm:493-501) بيفرّق صح بين "بهاد الموضوع" (سوري/فلسطيني) و"بهيدا الموضوع" (لبناني). |  |  |  |
| 13 | `skills/humanizer-pro/references/ar-levantine.md:332` | "هاد الموضوع بدو اهتمام، بس — والله يا حبيبي — لو تعرف قديش صار يعني. بدّنا نعمل شي. آخ." (shm:541) | مافي ملاحظة محددة أبعد من مراجعة ادعاء تغيّر السجل (register-shift). |  |  |  |
| 14 | `skills/humanizer-pro/references/ar-levantine.md:351` | "هاد الشي مهم وكل واحد بيستخدمو بهاد المجال" (shm:570) | مافي ملاحظة محددة أبعد من المراجعة الأساسية. |  |  |  |
| 15 | `skills/humanizer-pro/references/ar-levantine.md:373` | "هاد الأسلوب أحسن لأنو بيوفر وقت وجهد، بتفهم؟ يعني النتايج رح تكون ممتازة، مش هيك؟" (shm:601) | مافي ملاحظة محددة أبعد من المراجعة الأساسية. |  |  |  |
| 16 | `skills/humanizer-pro/references/ar-levantine.md:397` | "merci كتير! عنجد تعبتو حالكن. كانت الـ voiture أمام الـ ascenseur" (shm:651) | محتاج تأكيد إن كثافة وموضع الكلمات الفرنسية بتقرا كاستخدام بيروتي طبيعي مش مبالغ فيه. |  |  |  |
| 17 | `skills/humanizer-pro/references/ar-levantine.md:420` | "بعتلي message أو DM لمّا تخلص من الـ meeting" (shm:689) | مافي ملاحظة محددة أبعد من المراجعة الأساسية. |  |  |  |
| 18 | `skills/humanizer-pro/references/ar-levantine.md:441` | "بدو يروح عالبيت هلق" (shm:714) | محتاج تأكيد إن استثناء بقاء الشدة (بدّي، هلّق) مكتمل وصحيح. |  |  |  |
| 19 | `skills/humanizer-pro/references/ar-levantine.md:462` | "انا بدّي آكل شي هلق (أو: انا بدي ياكل شي هلق بسجلات إملائية تانية)" (shm:747) | الصيغة التانية بتستخدم "ياكل" (صيغة غائب/مشابهة لاسم فاعل) بعد "بدي" (متكلم) — ممكن يكون عدم توافق بالضمير. المصدر نفسه متردد ("in some orthographic registers") من غير ما يحسم. أي صيغة (أو ولا وحدة) هي القياسية للمتكلم؟ |  |  |  |
| 20 | `skills/humanizer-pro/references/ar-levantine.md:490` | "هاد الشخص كدّاب، وهاد تاني شخص عم يعمل هيك" (shm:778) | محتاج تأكيد إن إرشادات التطبيق الانتقائي (تجنب المبالغة الكاريكاتورية) متبعة صح بالاستخدام اللاحق. |  |  |  |
| 21 | `skills/humanizer-pro/references/ar-levantine.md:513` | "والله يا حبيبي هاد الأكل يسلمو إيدو، آخ ما أحلاه، شو هالشي!" (shm:826) | محتاج تأكيد إن "يسلمو" (موسومة سورية) مش مستخدمة غلط بنص لبناني/فلسطيني. |  |  |  |
| 22 | `skills/humanizer-pro/references/ar-levantine.md:534` | "حبيبي، انت عارف إنو هاد صح، مش هيك؟" (shm:863) | مافي ملاحظة محددة أبعد من المراجعة الأساسية. |  |  |  |
| 23 | `skills/humanizer-pro/references/ar-levantine.md:556` | "حط شنطتو بالأوضة وستنّا" (shm:901) | محتاج تأكيد إن هاي الكلمات المستعارة (تركية الأصل) بتقرا استخدام سوري يومي حالي، مش قديم/مهجور. |  |  |  |
| 24 | `skills/humanizer-pro/references/ar-levantine.md:580` | "رحت عالسوق اليوم. والله. اشتريت أشياء وبعدين الجو كان منيح وكنت مبسوط وبعدين رجعت عالبيت وأكلت وناميت. بس هيك." (shm:934-935) | مافي ملاحظة محددة أبعد من مراجعة مثال السلسلة الجملية المتوازية (paratactic chain). |  |  |  |
| 25 | `skills/humanizer-pro/references/ar-levantine.md:597` | جدول تنويعات إملائية من المصدر الأصلي: "هلق/هلأ/هلأ"، "هيدا/هيدا" ("Minor variation")، "معي/معي/مي"، "كيف/كيف"، "هونيك/هونيك"، "بس/بس" (shm:951-962) | كذا صف فيه سلاسل متطابقة بصريًا معروضة كأنها تنويعات إملائية — يمكن تكون أخطاء تأليف بالمصدر الأصلي. صف "معي/معي/مي" كمان بيخلط بين نسختين متطابقتين وكلمة مختلفة فعليًا (مي) من غير تفسير. محتاج إعادة تحقق من متحدث أصلي قبل إعادة الاستخدام. |  |  |  |
| 26 | `evals/runs/iteration-1/shami-detect-01/output.md:1-2` | (تقرير فحص + تحقق حضور عناصر السيو فقط — وضع detect، من غير أي نص معاد كتابته) | كل التقرير مكتوب بواسطة وكيل مش متحدث أصلي عربي، وغلاف اللهجة الشامية بهالسكيل تجريبي أصلاً (تغطية تجريبية pending native review). |  |  |  |
| 27 | `evals/runs/iteration-1/shami-edit-01/edited.md:8` | "كنت بدّي تغطية قوية بكل أنحاء البيت، فلازم دوّر على راوتر مواصفاته منيحة يضمنلي هيك الشي." | الفقرة دي استبدلت فقرة فصحى مقحمة ("يُريدُ المستخدم أن يحصل على تغطية شاملة...") بنص شامي جديد بالكامل. باقي البوست شامي أصلي ومتوقع يفضل زي ما هو؛ الفقرة الجديدة دي محتاجة تأكيد إنها بتقرا شامي طبيعي فعلاً — وهاد أيضًا العنصر اللي فيه نتيجة الديتكتور ما تحركت رغم التصحيح الحقيقي (انظر SELF-ASSESSMENT.md). |  |  |  |
| 28 | `evals/runs/iteration-1/shami-rewrite-01/rewritten.md:1` | (إعادة كتابة كاملة بمرحلتين لدليل المدينة القديمة، من نموذج صوت) | النص الكامل اتولد من وكيل مش متحدث أصلي، وتغطية اللهجة الشامية بهالسكيل تجريبية لسه بانتظار مراجعة متحدث شامي أصلي (نفس التحذير المكرر بأول سطرين من الملف). |  |  |  |
| 29 | `evals/runs/iteration-1/shami-seo-01/edited.md:7` | "أكلات شامية سهلة للبيت" (الكلمة المفتاحية المستهدفة، ضمن العنوان والفقرة الأولى) | إدراج/بقاء الكلمة المفتاحية بالعنوان والنص لسه ما اتأكد إنه بيقرا شامي طبيعي (مش حشو سيو) من متحدث أصلي. |  |  |  |
| 30 | `tests/fixtures/ar-shami/human-01.md:2` | "نزلت عالسوق الصبح بكير عشان جيب شوية خضرة." (نزلة سوق يوم جمعة) | طبيعية نص عامي مكتوب من غير متحدث أصلي (synthetic-human). المجموعة الشامية فيها أكبر قدر من عدم اليقين: الملفات اتكتبت من غير ما تتثبّت على متغيّر إقليمي واحد، وبتخلط صيغ (يلي/اللي، هني، منيح، عم مع/من غير بادئة بـ، لهيك/مشان هيك). محتاج مراجع يحدد، لكل ملف، أي متغيّر إقليمي مقصود ويخليه متّسق داخليًا. |  |  |  |
| 31 | `tests/fixtures/ar-shami/human-02.md:2` | "الماتش خلص تعادل، بس ما حدا بالمدرج كان عم يحكي عن النتيجة." (ماتش كورة والرجعة) | طبيعية نص عامي مكتوب من غير متحدث أصلي (synthetic-human). المجموعة الشامية فيها أكبر قدر من عدم اليقين: الملفات اتكتبت من غير ما تتثبّت على متغيّر إقليمي واحد، وبتخلط صيغ (يلي/اللي، هني، منيح، عم مع/من غير بادئة بـ، لهيك/مشان هيك). محتاج مراجع يحدد، لكل ملف، أي متغيّر إقليمي مقصود ويخليه متّسق داخليًا. |  |  |  |
| 32 | `tests/fixtures/ar-shami/human-03.md:2` | "الكبة النية عند ستي ما بتنكتب. جربت مرة، طلعت الورقة كلها «شوي» و«على قد ما بتحسي»." (وصفة كبة نية بأسلوب الجدة) | طبيعية نص عامي مكتوب من غير متحدث أصلي (synthetic-human). المجموعة الشامية فيها أكبر قدر من عدم اليقين: الملفات اتكتبت من غير ما تتثبّت على متغيّر إقليمي واحد، وبتخلط صيغ (يلي/اللي، هني، منيح، عم مع/من غير بادئة بـ، لهيك/مشان هيك). محتاج مراجع يحدد، لكل ملف، أي متغيّر إقليمي مقصود ويخليه متّسق داخليًا. |  |  |  |
| 33 | `tests/fixtures/ar-shami/human-04.md:2` | "الباص رقم ٣٢ بيتأخر عشر دقايق دايما، وبعدين بيجوا تنين سوا." (رحلة باص عبر المدينة) | طبيعية نص عامي مكتوب من غير متحدث أصلي (synthetic-human). المجموعة الشامية فيها أكبر قدر من عدم اليقين: الملفات اتكتبت من غير ما تتثبّت على متغيّر إقليمي واحد، وبتخلط صيغ (يلي/اللي، هني، منيح، عم مع/من غير بادئة بـ، لهيك/مشان هيك). محتاج مراجع يحدد، لكل ملف، أي متغيّر إقليمي مقصود ويخليه متّسق داخليًا. |  |  |  |
| 34 | `tests/fixtures/ar-shami/human-05.md:2` | "اليوم بالشغل صار شي غريب." (يوم شغل فيه تبديل كود إنجليزي) | طبيعية نص عامي مكتوب من غير متحدث أصلي (synthetic-human). المجموعة الشامية فيها أكبر قدر من عدم اليقين: الملفات اتكتبت من غير ما تتثبّت على متغيّر إقليمي واحد، وبتخلط صيغ (يلي/اللي، هني، منيح، عم مع/من غير بادئة بـ، لهيك/مشان هيك). محتاج مراجع يحدد، لكل ملف، أي متغيّر إقليمي مقصود ويخليه متّسق داخليًا. |  |  |  |
| 35 | `skills/humanizer-pro/references/precedence.md:180` | مثال AR-5: "هاد الأسلوب أحسن لأنو بيوفر وقت وجهد، بتفهم؟" (مقتبس ومبتور من semitic/skills/humanizer-ar-shami/SKILL.md:601، اللي بيكمل: "يعني النتايج رح تكون ممتازة، مش هيك؟") | الجملة مبتورة عن تكملتها بالمصدر الأصلي. هل الجزء المبتور قايم لحاله كجملة كاملة الوحدة؟ وهل الصيغة الفرعية (هاد/لأنو/بتفهم؟ معطاة كسوري-لبناني-فلسطيني عام بالمصدر) آمنة تُعرض من غير تسمية منطقة فرعية محددة؟ |  |  |  |

---

## كيف ترجع النتائج

عدّل هذا الملف مباشرة (عبّي الأعمدة الفاضية في الجدول اللي فوق)، واحفظه،
وابعتلي إياه (أنا رح آخد نسختك المعدَّلة وأطبّق التصحيحات على ملفات المرجع
المصدر). ما تحتاج تفتح أي ملف تاني — كل المعلومات اللازمة موجودة بعمود
"الملف:السطر" و"المقتطف".



---

<!-- source fragment: docs/native-review/evals.md -->

## Native review — Phase 9 eval outputs

Every `evals/runs/iteration-1/<id>/output.md` whose first line (or first two
lines) carries a `<!-- NATIVE-REVIEW: <variety> -->` marker, grouped by
variety. These are full eval outputs (report prose plus, where the mode
produced one, a full rewritten/edited passage) generated by a
non-native-Arabic-speaking agent and not yet checked by a native speaker.
See `evals/runs/iteration-1/SELF-ASSESSMENT.md` for the corresponding
"reads naturally to a native reader" grading item (flagged
`NEEDS-NATIVE-REVIEW` for every eval listed here).

MSA has no eval-output entries here: the four `msa-*` evals are flagged
`NEEDS-NATIVE-REVIEW` in their `grade.md` files, but their `output.md` files
do not carry an in-file `<!-- NATIVE-REVIEW: ... -->` marker (MSA is not
marked experimental the way Levantine is, and the skill's own reference
files gate the in-body marker to `egt`/`shami` dialect prose). See
`evals/runs/iteration-1/msa-*/grade.md` for the MSA native-review flags.

## Egyptian

1. **Path:** `evals/runs/iteration-1/egt-detect-01/output.md` (line 1: `<!-- NATIVE-REVIEW: egt -->`).
   Detect-mode audit report; no rewritten prose was generated to assess.
2. **Path:** `evals/runs/iteration-1/egt-edit-01/output.md` (line 1: `<!-- NATIVE-REVIEW: egt -->`).
   One edited paragraph in otherwise-untouched Egyptian dialect prose.
3. **Path:** `evals/runs/iteration-1/egt-rewrite-01/output.md` (line 1: `<!-- NATIVE-REVIEW: egt -->`).
   Full two-pass dialect rewrite; grade.md specifically flags "بيتخانق" (mic
   noise-pickup colloquialism) as plausible but unverified.
4. **Path:** `evals/runs/iteration-1/egt-seo-01/output.md` (line 1: `<!-- NATIVE-REVIEW: egt -->`).
   Rewrite + SEO mode; inserted keyword phrase not yet confirmed to read
   naturally by a native speaker.

## Levantine (shami)

Levantine coverage (`ar-levantine.md`) is marked experimental by the skill
itself; every marker below repeats that disclosure in Arabic.

1. **Path:** `evals/runs/iteration-1/shami-detect-01/output.md` (lines 1-2:
   `<!-- NATIVE-REVIEW: shami — تغطية اللهجة الشامية بهذا السكيل تجريبية ولسه
   ما راجعها متحدث شامي أصلي؛ خد النتائج اللي تحت كملاحظات لغوية عامة مش كحكم
   نهائي. -->`). Detect + SEO-presence-check audit report.
2. **Path:** `evals/runs/iteration-1/shami-edit-01/output.md` (lines 1-2:
   `<!-- NATIVE-REVIEW: shami — تغطية اللهجة الشامية تجريبية لسه، بانتظار
   مراجعة متحدث شامي أصلي. -->`). One edited paragraph; also the eval whose
   headline detector score did not move despite a real content fix (see
   `evals/runs/iteration-1/SELF-ASSESSMENT.md`, "Skill defects found" §2).
3. **Path:** `evals/runs/iteration-1/shami-rewrite-01/output.md` (lines 1-2:
   `<!-- NATIVE-REVIEW: shami — تغطية اللهجة الشامية بهاد السكيل تجريبية لسه،
   وما راجعها حدا شامي أصلي؛ النص تحت ممكن يحتاج تدقيق من متحدث شامي حقيقي قبل
   ما ... -->`). Full two-pass dialect rewrite from a voice sample.
4. **Path:** `evals/runs/iteration-1/shami-seo-01/output.md` (lines 1-2:
   `<!-- NATIVE-REVIEW: shami — تغطية اللهجة الشامية تجريبية، بانتظار مراجعة
   متحدث شامي أصلي. -->`). Edit + SEO mode.


---

<!-- source fragment: docs/native-review/fixtures.md -->

## Native review — test fixtures

Fixtures that need a native speaker's eye before they can be trusted as
ground truth. Each entry names what is uncertain about it.

Fixture headers follow the convention:

```
<!-- fixture: ai-style | synthetic-human ; variety: msa|egt|shami ; source: <upstream file:line if adapted, else humanizer-pro> -->
```

Human-style Arabic fixtures carry `<!-- NATIVE-REVIEW: <variety> -->` as
their second line.

---

## Arabic engine

Every fixture below is marked `synthetic-human`: it was written by this
project for `tests/ar-detector.test.js`, not sampled from native writing.
The AI-style fixtures in the same directories are **not** listed here — they
are adaptations of the upstream ❌ examples cited in their headers, and their
job is to be unnatural.

### MSA (`msa`)

| fixture | content | what is uncertain |
|---|---|---|
| `tests/fixtures/ar-msa/human-01.md` | a Friday-market visit | naturalness of self-written dialect text |
| `tests/fixtures/ar-msa/human-02.md` | a football match and the ride home | naturalness of self-written dialect text |
| `tests/fixtures/ar-msa/human-03.md` | a molokhia recipe as a grandmother gives it | naturalness of self-written dialect text |
| `tests/fixtures/ar-msa/human-04.md` | a bus ride across the city | naturalness of self-written dialect text |
| `tests/fixtures/ar-msa/human-05.md` | the periodicals room of a municipal library | naturalness of self-written dialect text |

For the MSA files, "dialect" means register rather than variety: the
uncertainty is whether the prose reads as something a native MSA writer would
actually produce, including the quoted colloquial line in `human-02` /
`human-03` and the mixed-register dialogue in
`tests/fixtures/false-positives/ar-quoted-speech.md`.

### Egyptian (`egt`)

| fixture | content | what is uncertain |
|---|---|---|
| `tests/fixtures/ar-egt/human-01.md` | a Friday-market visit | naturalness of self-written dialect text |
| `tests/fixtures/ar-egt/human-02.md` | a football match and the ride home | naturalness of self-written dialect text |
| `tests/fixtures/ar-egt/human-03.md` | a molokhia recipe as a grandmother gives it | naturalness of self-written dialect text |
| `tests/fixtures/ar-egt/human-04.md` | a bus ride across the city | naturalness of self-written dialect text |
| `tests/fixtures/ar-egt/human-05.md` | a work day with English code-switching | naturalness of self-written dialect text |

Specific things to check in the Egyptian set: the `بـ`-prefix coverage on
present-tense verbs (`AR-EGT-004`), whether the `حـ/هـ` future forms are
spelled the way people actually type them (`AR-EGT-003`), whether the
code-switching density in `human-05` matches educated Cairo usage
(`AR-EGT-016`), and whether any of the orthographic choices read as a
non-native's guess (`AR-EGT-018`, `AR-EGT-023`).

### Levantine (`shami`)

| fixture | content | what is uncertain |
|---|---|---|
| `tests/fixtures/ar-shami/human-01.md` | a Friday-market visit | naturalness of self-written dialect text |
| `tests/fixtures/ar-shami/human-02.md` | a football match and the ride home | naturalness of self-written dialect text |
| `tests/fixtures/ar-shami/human-03.md` | a kibbeh-nayyeh recipe as a grandmother gives it | naturalness of self-written dialect text |
| `tests/fixtures/ar-shami/human-04.md` | a bus ride across the city | naturalness of self-written dialect text |
| `tests/fixtures/ar-shami/human-05.md` | a work day with English code-switching | naturalness of self-written dialect text |

The Levantine set carries the most uncertainty. `references/ar-levantine.md`
is itself marked "experimental — pending native Levantine review", and these
fixtures were written without pinning a regional sub-variant. They mix forms
that the reference marks as Syrian, Lebanese or Palestinian without
committing to one (`يلي` vs `اللي`, `هني`, `منيح`, `عم` with and without the
`بـ`-prefix, `لهيك` vs `مشان هيك`). A native reviewer should decide, per
file, which regional variant it is meant to be and make it internally
consistent — see `AR-SHM-002`, `AR-SHM-003`, `AR-SHM-005`, `AR-SHM-006`,
`AR-SHM-008`.

### False positives (`tests/fixtures/false-positives/`)

These must score `HUMAN`. All are `synthetic-human`.

| fixture | variety | content | what is uncertain |
|---|---|---|---|
| `tests/fixtures/false-positives/ar-rhetorical-msa.md` | msa | legitimate rhetorical questions (الاستفهام البلاغي) | naturalness of self-written dialect text |
| `tests/fixtures/false-positives/ar-rhetorical-egt.md` | egt | legitimate reader-directed questions | naturalness of self-written dialect text |
| `tests/fixtures/false-positives/ar-quoted-speech.md` | msa | MSA narration quoting colloquial speech verbatim | naturalness of self-written dialect text |
| `tests/fixtures/false-positives/ar-changelog-list.md` | msa | an Arabic changelog as a bullet list | naturalness of self-written dialect text |
| `tests/fixtures/false-positives/ar-technical-en-terms.md` | msa | a technical Arabic paragraph with English terms (`real-time`, `feature flag`, `API`) | naturalness of self-written dialect text |

`ar-quoted-speech.md` reuses the colloquial line مش تمام from
`references/ar-msa.md` `AR-MSA-025`, which that reference already flags as an
unpinned colloquial blend in the upstream source. If a reviewer pins it to a
dialect there, pin it here too.


---

<!-- source fragment: docs/native-review/modes-voice-seo.md -->

## Native review queue: modes, voice-matching, seo-mode

All `<!-- NATIVE-REVIEW: ... -->` items introduced by this pass, grouped by
variety. None of these are load-bearing for the English-language content —
each is either a translated heading label or a single illustrative Arabic
example that a native reviewer should confirm before this skill ships.

## MSA (`msa`)

### 1. Report-heading translation table

- **File**: `skills/humanizer-pro/references/modes.md`
- **Section**: "Report language follows the request"
- **Excerpt**:
  | English | Arabic |
  |---|---|
  | Issues found | المشكلات المرصودة |
  | Rewritten version | النسخة المعدَّلة |
  | What changed | ما الذي تغيّر |
  | Second-pass audit | المراجعة الثانية |
  | Assessment | التقييم |
  | Score | النتيجة |
  | Edits made | التعديلات المنفَّذة |
  | Verification | التحقق |
  | Protected spans | المقاطع المحمية |
  | SEO check | فحص تحسين محركات البحث |
- **Uncertainty**: the first six rows (Issues found through Score) were
  given directly in the build prompt and are treated as approved wording.
  The last four (Edits made, Verification, Protected spans, SEO check) are
  humanizer-pro's own translations, not sourced from the build prompt or
  any upstream file, and have not been checked by a native speaker. In
  particular: "التعديلات المنفَّذة" (literally "the edits carried out") and
  "المقاطع المحمية" ("the protected passages/spans") are functional
  translations rather than established SEO/editing terminology in Arabic —
  a reviewer familiar with Arabic technical-writing conventions should
  confirm these read naturally as section headings rather than as
  translated English.

### 2. SEO worked example (Arabic)

- **File**: `skills/humanizer-pro/references/seo-mode.md`
- **Section**: "Examples" → "Arabic"
- **Excerpt**: `## أهمية التخزين المؤقت عند الحافة` (heading), target
  keyword "التخزين المؤقت عند الحافة" ("edge caching"), and the surrounding
  worked-example prose explaining why changing the heading to
  `## لماذا نهتم بالسرعة` drops the keyword checkpoint.
- **Uncertainty**: "التخزين المؤقت عند الحافة" is a literal technical
  translation of "edge caching" constructed for this example, not a term
  verified against real Arabic technical/SEO content or an existing glossary
  (`ar-vocabulary.md` or equivalent, being written concurrently by another
  agent, was not consulted for this term). A reviewer should confirm this is
  the term an Arabic-speaking SEO writer would actually target, or supply
  the conventional term if different.

## Egyptian (`egt`)

### 3. Voice-matching Arabic-sample illustration

- **File**: `skills/humanizer-pro/references/voice-matching.md`
- **Section**: "Arabic samples" → "Illustration"
- **Excerpt**: "مش عارف ليه بس حاسس إن ده مهم" (sample sentence), and the
  surrounding claim that this sentence demonstrates: short clauses, بس as a
  connector, ده as a demonstrative, Western digits, no tashkeel.
- **Uncertainty**: this sentence was constructed for this document as a
  plausible Egyptian colloquial example (informed by the marker-word lists
  in `docs/inventory/semitic.md` §5, e.g. بس/ده/مش attested there for
  Egyptian), not transcribed from a real user sample or verified against
  `ar-egt.md`'s pattern catalog directly. A native Egyptian-Arabic reviewer
  should confirm: (a) the sentence reads as natural Egyptian colloquial
  rather than a MSA-inflected approximation, and (b) the claimed features
  (بس as connector, ده as demonstrative) are accurately described.

## Summary

| Variety | Count | Files touched |
|---|---:|---|
| MSA | 2 | `modes.md`, `seo-mode.md` |
| Egyptian | 1 | `voice-matching.md` |
| **Total** | **3** | 3 reference files |

No Levantine, Gulf, or Hebrew native-review items were introduced by this
pass — `core-principles.md` contains no language-specific illustrative
content (it cites upstream English/Arabic sources but does not construct
new non-English examples of its own).


---

<!-- source fragment: docs/native-review/precedence.md -->

## Native review queue — precedence.md

Every item marked `<!-- NATIVE-REVIEW: ... -->` in
`skills/humanizer-pro/references/precedence.md`, grouped by variety. Line
numbers are as of the commit that adds the file.

## MSA (`msa`)

| File | Line | Excerpt | What is uncertain |
|---|---|---|---|
| `skills/humanizer-pro/references/precedence.md` | 143 | Worked example AR-1: before `إن التعليم يؤثر بشكل مباشر على مستوى التنمية الاقتصادية والاجتماعية في أي مجتمع من المجتمعات.` → after `متى تعلّمنا أخيرًا أن الأمم لا تُبنى بالثروات، بل بما تفعله بها؟` | Both sentences are copied verbatim from `semitic/skills/humanizer-ar-msa/SKILL.md:361-362`, but upstream presents them as a paired AI/human contrast, not as a minimal edit of one into the other. A reviewer should confirm that the pair still reads as the *same* claim rewritten, and that the rhetorical question is idiomatic standing alone outside its original section. |

## Egyptian (`egt`)

| File | Line | Excerpt | What is uncertain |
|---|---|---|---|
| `skills/humanizer-pro/references/precedence.md` | 161 | Worked example AR-3: `سوف نتحدث عن هذا الموضوع لاحقاً وسأذهب لمقابلته غداً` → `هنتكلم في الموضوع ده بعدين وهروح أقابله بكره` | Copied verbatim from `semitic/skills/humanizer-ar-egt/SKILL.md:136-137`. Uncertain: the surrounding claim that the *same* sentence would be left untouched in an MSA-target document. A reviewer should confirm that the MSA "before" line is acceptable MSA on its own (it carries the adverbial لاحقاً with tanwin, which the MSA reference would treat under its diacritic-consistency rule, not the future-marker rule). |
| `skills/humanizer-pro/references/precedence.md` | 170 | Worked example AR-4: described, not quoted — a seven-step numbered install procedure in Egyptian with an MSA hedged opener `من الجدير بالذكر أن ...` | The example is deliberately described rather than written out, so no Egyptian prose was invented. A reviewer should decide whether a concrete Egyptian before/after is worth adding here, and if so supply it; the opener phrase is taken from `semitic/skills/humanizer-ar-egt/SKILL.md:287`. |

## Levantine (`shami`)

| File | Line | Excerpt | What is uncertain |
|---|---|---|---|
| `skills/humanizer-pro/references/precedence.md` | 180 | Worked example AR-5: `هاد الأسلوب أحسن لأنو بيوفر وقت وجهد، بتفهم؟` | Copied from `semitic/skills/humanizer-ar-shami/SKILL.md:601`, but truncated — upstream continues `يعني النتايج رح تكون ممتازة، مش هيك؟`. A reviewer should confirm the truncated clause stands alone, and that the sub-regional form (هاد / لأنو / بتفهم؟ are given as Syrian-Lebanese-Palestinian-general upstream) is safe to present without naming a sub-region. All Levantine items are flagged unconditionally, per the build rule. |
