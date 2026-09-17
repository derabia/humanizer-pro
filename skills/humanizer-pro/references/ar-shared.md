# Arabic — Shared Rules (all varieties)

Rules in this file apply to Modern Standard Arabic (MSA), Egyptian Arabic
(Masri), and Levantine Arabic (Shami) alike. They were built by merging
patterns that recur — verbatim-in-spirit or independently reworded — across
at least two of the three upstream variety files in
`_sources/semitic/skills/humanizer-ar-{msa,egt,shami}/SKILL.md`
(pinned commit `2c9d4fbe3e0086d373b59bfebc9556082275cf62`), per
`docs/inventory/semitic.md` §4. See `docs/provenance/ar-shared-msa.md` for the
line-by-line source map and `docs/dedup-log/ar-shared-msa.md` for what was
merged, dropped, or kept separate.

Severity tiers used throughout this skill: **P0** (critical — must always be
fixed), **P1** (significant — fix unless there's a stated reason not to),
**P2** (minor — fix opportunistically). This replaces the upstream 50-point
rubric, which is dropped per owner decision (see dedup log).

**Family tags.** Every `AR-SH-*` entry below, and every `AR-EGT-*` /
`AR-SHM-*` entry in the per-variety files, carries a `**Family:**` line
using one of five cross-variety families: `calque` (a construction
translated word for word from another language, usually English),
`stock-units` (a fixed formulaic phrase or closing/opening unit, not a
single word), `typography` (script, punctuation, diacritics, or orthographic
representation), `register-flattening` (a dialect or informal text pulled
toward a more formal or MSA-level register than the context calls for), and
`english-syntax` (a discourse or sentence structure imported from English
argument-structure conventions rather than native Arabic rhetoric). A sixth
tag, `chatbot-residue`, is reserved for an entry that fits none of the five;
none of the entries in this file, `ar-egyptian.md`, or `ar-levantine.md`
needed it for this pass. Taxonomy idea credited to
finestructure-ai/humanizer-multilingual (MIT); the five names and their
definitions here are this project's own, not reproduced from the source.
See `precedence.md`'s How-to-apply step 6 for the P2-only stop rule these
tags support in `detect` reports.

Every uncited statistic, benchmark, or percentage that appeared in the
upstream prose (BLEU scores, "AI hedges 3-4x the human rate," std-dev
thresholds, etc.) has been dropped from this document. The underlying
*patterns* are kept; the numbers claimed to justify them are not repeated as
fact. Where a numeric band is still useful as a rough editorial heuristic, it
is labeled "uncited heuristic," not a measured statistic.

---

## AR-SH-001 — Hedging Overload | التحوّط المفرط

**Severity:** P1

**Provenance:** SM-MSA-001 (Hedging Phrase Overload), SM-MSA-008 (Formal MSA
Over-Formalization) — `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:44-55,148-159`;
SM-EGT-011 (Formal Openers) — `_sources/semitic/skills/humanizer-ar-egt/SKILL.md:280-304`;
SM-SHM-012 (Formal Transition Phrases, hedge-opener portion) —
`_sources/semitic/skills/humanizer-ar-shami/SKILL.md:486-515`.

**Family:** register-flattening

**What it looks like:** A sentence — especially an opening or topic
sentence — is prefaced with a hedge that adds no information: من المهم
الإشارة إلى، يجب الإشارة إلى، من الضروري أن نذكر، تجدر الإشارة إلى، لا بد من
التنويه، ومما لا شك فيه. More than one such hedge per ~200 words, or a hedge
opening a paragraph, is the tell.

**Why it reads as AI:** The hedge performs caution without taking a
position. A human writer states the claim and lets its strength speak;
hedge-stacking is a generation artifact of models trained to sound careful
rather than committed.

**Fix:** Delete the hedge and state the claim directly. If the uncertainty is
real, name its actual nature and degree instead of a generic softener.

**Before / after** (MSA, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:53-54`):
- ❌ من المهم الإشارة إلى أن الاقتصاد الرقمي يُغير طبيعة العمل في المنطقة.
- ✓ الاقتصاد الرقمي يُعيد رسم خريطة العمل في المنطقة، وهذا لم يعد موضع جدل.

**Dialect note:** In Egyptian and Levantine, the same MSA hedge phrase family
gets swapped for a dialect-appropriate opener rather than simply deleted —
see AR-SH-006 and the per-variety reference for the replacement set (e.g.
Egyptian بصّ...، اسمع...، تعرف إيه؟, `SM-EGT-011`).

**Carve-outs:** A hedge is not a tell when it expresses genuine, specific
uncertainty (a stated confidence level, a named source of doubt) rather than
a reflexive softener.

---

## AR-SH-002 — Formulaic Transitions and Conclusions | روابط وخواتيم نمطية

**Severity:** P0 for علاوة على ذلك specifically (see below); P1 for the rest
of the family.

**Provenance:** SM-MSA-003 (Wrong Transition Phrase — Critical), SM-MSA-004
(Transition Phrase Overuse), SM-MSA-005 (Formulaic Conclusion Phrases) —
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:72-111`; SM-EGT-012
(Hyper-Formal Closing) — `_sources/semitic/skills/humanizer-ar-egt/SKILL.md:307-328`;
SM-SHM-012 (Formal Transition Phrases) —
`_sources/semitic/skills/humanizer-ar-shami/SKILL.md:486-515`.

**Family:** stock-units

**What it looks like:** Mechanical connective tissue at paragraph
boundaries — transitions like وبالتالي، بالإضافة إلى، مع ذلك، ومن ثَمّ, and
especially **علاوة على ذلك** ("moreover") — plus formulaic closings: في
الخلاصة، باختصار، وختاماً، وبهذا نكون قد، في نهاية المطاف يتضح، مما سبق يتبين
أن.

علاوة على ذلك is singled out upstream (`SM-MSA-003`) as the single strongest
per-pattern MSA AI signature: the source notes its classical meaning is
"camel cargo overage," and correct MSA "moreover" is إضافة إلى ذلك / بالإضافة
إلى ذلك / فضلًا عن ذلك. Three or more instances of علاوة على ذلك in one text
is treated as sufficient on its own to suspect AI authorship. It is flagged
critical in MSA and also appears in the Levantine formal-transition list
(`SM-SHM-012`), so it is P0 here regardless of variety.

**Why it reads as AI:** Real writing links ideas by content, not by a
rotating stock of connector phrases; formulaic conclusions restate the piece
instead of ending on a claim, image, or question.

**Fix:** Remove transitions where the logical connection is already clear
from content; where a connector is needed, rotate its form (إضافة إلى ذلك،
فضلًا عن ذلك، وثمة أيضًا، بل إن) and never repeat the same one. Replace a
formulaic closer with a compressed final claim, a rhetorical question, or a
resonant image — or simply stop.

**Before / after** (MSA, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:81-82`):
- ❌ علاوة على ذلك، فإن التعليم يُعد ركيزة أساسية للتنمية.
- ✓ فضلًا عن ذلك، التعليم ليس خدمة اجتماعية — إنه استثمار في البنية التحتية
  للأمة.

**Before / after (formulaic conclusion)** (MSA, `SKILL.md:108-110`):
- ❌ وخلاصة القول، أثبتنا في هذا المقال أن التعليم مهم وأن الاستثمار فيه
  ضروري لتحقيق التنمية.
- ✓ أمة لا تُعلّم أطفالها تدفع الثمن مرتين: مرة حين تُهدر طاقاتهم، ومرة حين
  تستورد من غيرها ما كان يمكنها أن تصنعه بنفسها.

**Carve-outs:** A transition is not a tell when it carries real logical
weight (contrast, concession, causal claim) that the reader would otherwise
miss — the fix is variety and necessity, not elimination on sight.

---

## AR-SH-003 — Significance Inflation via Formulaic Closings | تضخيم الأهمية بصيغ نمطية

**Severity:** P1

**Provenance:** SM-MSA-005 (Formulaic Conclusion Phrases, grandiose-claim
portion) and SM-MSA-019 (dead-metaphor examples: مفتاح النجاح، أسس التنمية،
ركائز المجتمع) — `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:100-111,324-335`;
SM-EGT-012 (Hyper-Formal Closing) —
`_sources/semitic/skills/humanizer-ar-egt/SKILL.md:307-328`; SM-SHM-012
(closing-equivalence table, خلاصة القول→يعني بالآخر) —
`_sources/semitic/skills/humanizer-ar-shami/SKILL.md:486-515`.

Note on this entry's provenance: "significance inflation" is not a named
category in any of the three upstream files. It is a synthesized label for a
pattern the three files describe independently — closing or topic sentences
that assert outsized importance in stock phrasing (يُعد ركيزة أساسية، من أهم
العوامل، مما لا شك فيه أن) rather than earning the claim with specifics. See
the dedup log for the exact reasoning.

**Family:** stock-units

**What it looks like:** A claim's importance is asserted through a fixed,
grandiose formula — يُعد ركيزة أساسية، من أهم العوامل المؤثرة، أثبتنا أن X
مهم — instead of demonstrated with a specific consequence, number, or
example.

**Why it reads as AI:** The inflated-importance formula is a substitute for
argument: it tells the reader something is significant without showing why,
which is cheap to generate and reads as padding once the pattern is
recognized.

**Fix:** Replace the superlative formula with the actual reason the claim
matters — a consequence, a mechanism, a comparison — or cut the sentence
entirely if it adds nothing beyond asserting significance.

**Before / after** (MSA, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:332-334`):
- ❌ يُعتبر التعليم من أهم الركائز التي تُبنى عليها الدول المتقدمة وتُحقق من
  خلاله التنمية الشاملة.
- ✓ الدولة التي تُهمل تعليمها تُشيّد قصرًا فوق رمال — شامخٌ في الصورة، يتصدع
  بأول عاصفة.

**Carve-outs:** A strong claim of importance is fine when the text has
already earned it (data, example, consequence given nearby) — the tell is
the *formula*, not the claim of importance itself.

---

## AR-SH-004 — Uniform Sentence Rhythm | رتابة إيقاع الجملة

**Severity:** P0

**Provenance:** SM-MSA-013 (Sentence Length Uniformity — Critical) —
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:224-235`; SM-EGT-010
(Uniform Sentence Length) —
`_sources/semitic/skills/humanizer-ar-egt/SKILL.md:260-271`; SM-SHM-024
(Uniform Sentence Length Distribution) —
`_sources/semitic/skills/humanizer-ar-shami/SKILL.md:905-936`.

**Family:** register-flattening

**What it looks like:** Every sentence in a paragraph runs roughly the same
length, with no short punchy sentence and no long paratactic run breaking the
pattern.

**Why it reads as AI:** Human writing varies sentence length for emphasis —
a short sentence after a long one lands a point; a long chained sentence
carries an accumulating argument. Metronomic uniformity is a generation
artifact.

**Fix:** After 2-3 longer sentences, insert a short one (5-9 words, or even a
fragment) carrying the sharpest claim or image. In Levantine specifically,
also allow very long paratactic chains (30-60+ words linked by وبعدين/بس)
alongside 1-4 word fragments — the dialect's natural range is wider than
MSA's or Egyptian's.

**Before / after** (MSA, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:232-234`):
one long ~40-word AI sentence about Arab youth challenges →
✓ split into the long sentence plus a two-word finisher: "يريدون نتائج. الآن."

**Sentence-rhythm thresholds:** see the dedicated section below — the three
varieties give different numeric bands for what counts as "too uniform," and
none of them cite a corpus or measurement method. Treat any specific number
as an uncited heuristic, not a research-backed cutoff.

**Carve-outs:** None — this is flagged as a must-fix in every variety
(critical in MSA).

---

## AR-SH-005 — List-Instead-of-Argument | القوائم بدل الحجاج

**Severity:** P1

**Provenance:** SM-MSA-015 (Bullet Point & List Overuse) —
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:255-272`.

Coverage note: unlike the other entries in this file, this pattern is
explicitly written up only in the MSA source file — the Egyptian and
Levantine files do not carry a dedicated list-overuse pattern among their 25
patterns each. It is placed here rather than in `ar-msa.md` because the
underlying claim (a bulleted list standing in for connected argument reads as
AI) is a document-formatting issue that is not MSA-specific; it is
generalized to all three varieties as an editorial judgment, not because two
upstream files independently made the claim. See the dedup log for this
single-source generalization.

**Family:** english-syntax

**What it looks like:** Lists making up more than roughly 15% of a text by
line count; list items that are really sentences pretending to be bullets;
or any list of more than ~5 items inside argumentative or analytical prose
where the items have a real logical relationship to each other (cause,
contrast, sequence).

**Why it reads as AI:** A list of claims presented as parallel, disconnected
bullets hides the actual relationship between them (which caused which,
which matters more) — the connective work a human writer would do in prose
is simply skipped.

**Fix:** Convert the list to prose with explicit connective logic (فتراكم...
في غياب...، وانسحب... حين). Keep the list only where the content is
genuinely parallel and non-argumentative.

**Before / after** (MSA, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:264-271`):
- ❌ (bulleted list: ضعف الحوكمة / غياب الشفافية / التضخم المتصاعد / انخفاض
  الاستثمار الأجنبي)
- ✓ الأزمة لم تنشأ من عامل واحد: الحوكمة الهشة أتاحت الفرصة، وغياب الشفافية
  حجب المحاسبة، فتراكم التضخم في غياب رادع، وانسحب الاستثمار الأجنبي حين فقد
  ثقته بالمشهد.

**Carve-outs:** Feature comparisons, step-by-step instructions, and API/spec
parameter lists stay as lists — this carve-out is imported from the
non-Arabic shared core (`docs/CONFLICTS.md` C-08) because the upstream MSA
pattern has no such exception on its own and would otherwise strip
legitimate structure from how-to or reference content.

---

## AR-SH-006 — Translated-from-English Discourse Structures | بنى خطابية مترجمة عن الإنجليزية

**Severity:** P1

**Provenance:** SM-EGT-011 (Formal Openers, explicitly named "direct Arabic
translations of English AI ritual openers (Certainly!, It is important to
note...)") and SM-EGT-015 (Sycophantic Opener, explicitly named "ChatGPT-era
English sycophancy") — `_sources/semitic/skills/humanizer-ar-egt/SKILL.md:280-304,362-378`;
the same underlying phrase family (formal hedge/ritual openers) recurs,
without the explicit English-translation framing, in SM-MSA-001/SM-MSA-008
and SM-SHM-012 — see `docs/inventory/semitic.md` §4 "Formal-opener/closer
critique pattern."

Coverage note: only the Egyptian file names this as a translation-from-
English phenomenon outright. MSA and Levantine flag the same phrase shapes
(formal hedges, ritual transitions) as generic AI tells without diagnosing
their English origin. This entry is placed in ar-shared because the
*phrase family* is genuinely cross-variety (per §4); the "translated from
English" *explanation* is an Egyptian-only claim, reproduced here as
attributed commentary, not as an independently-verified etiology.

**Family:** calque

**What it looks like:** Openers that read as calqued English chatbot
ritual — بالتأكيد! (Certainly!), شكراً على سؤالك الرائع (Thank you for that
great question), يسعدني مساعدتك (I'd be happy to help), من المهم أن نلاحظ (It
is important to note) — used as reflexive politeness/acknowledgment rather
than because the content requires them.

**Why it reads as AI:** These are not native Arabic register conventions;
they are English assistant-speak run through translation, and an
Arabic-literate reader recognizes the seam immediately.

**Fix:** Delete the sycophantic/ritual opener entirely. If an
acknowledgment is genuinely needed, use a natural register-appropriate one
(MSA: state the point directly; Egyptian: أيوه، ماشي، تمام، خد بالك).

**Before / after** (Egyptian, `_sources/semitic/skills/humanizer-ar-egt/SKILL.md:375-377`):
- ❌ شكراً على سؤالك الرائع! يسعدني الإجابة عليه بكل سرور
- ✓ أيوه، خد بالك...

**Carve-outs:** A genuine expression of thanks or acknowledgment in a
personal, non-formulaic register is not a tell — the marker is the *stock
phrase*, not politeness itself.

---

## AR-SH-007 — Formal Passive Disguise (يُعتبر / يُستخدم / يُلاحظ family) | تعمية بصيغة المبني للمجهول

**Severity:** P1 (P0 in MSA when combined with تم/يتم density — see `ar-msa.md` AR-MSA for the MSA-specific تم/يتم pattern, which is a distinct sub-form kept separate from this entry).

**Provenance:** SM-MSA-026 (Passive Voice Disguise) —
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:431-442`; SM-EGT-008
(Robotic Passive Voice) —
`_sources/semitic/skills/humanizer-ar-egt/SKILL.md:222-236`; SM-SHM-014
(Heavy Passive Voice) —
`_sources/semitic/skills/humanizer-ar-shami/SKILL.md:545-571`. Identified as
a cross-variety pattern in `docs/inventory/semitic.md` §4 ("يُعتبر / يُستخدم /
يُلاحظ passive-voice family flagged as an AI tell in all three") and
discussed for its severity mismatch in `docs/CONFLICTS.md` C-07.

**Family:** register-flattening

**What it looks like:** Formal morphological passive beyond the تم/يتم
periphrastic construction — يُستخدم، يُعتبر، يُلاحَظ، يُشار إلى، يُرى، يُقال —
used to avoid naming an agent, more than roughly 2 instances per 200 words.

**Why it reads as AI:** Hiding the agent behind a passive verb form is a
generation habit (the model doesn't commit to who is doing what); a human
writer usually knows and states who is claiming, using, or observing
something.

**Fix:** Identify the actual agent and rewrite active; where the agent is
genuinely unknown or irrelevant, use an indefinite-subject active
construction instead of the morphological passive.

**Before / after** (MSA, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:439-441`):
- ❌ يُعتبر التعليم ركيزة أساسية، ويُلاحَظ أن الاستثمار فيه يُرى على المدى
  الطويل.
- ✓ يعتبر خبراء التنمية التعليمَ الركيزة الأولى — ويستطيع أي محلل اقتصادي أن
  يرى آثاره تتراكم على مدى عقود.

**Dialect fixes:** Egyptian converts to active with a generic subject (ناس،
حد، إحنا، هم) — e.g. يُستخدم هذا النظام بشكل واسع → ناس كتير بيستخدموا النظام
ده (`SM-EGT-008`). Levantine offers several avoidance strategies: dropped
subject (قالوا إنو...), صار+noun (صار وضع غريب), مفعول-participle stative
(الباب مقفول), or active with a general subject (`SM-SHM-014`).

**Carve-outs:** A passive is acceptable where the agent is genuinely unknown,
irrelevant to the claim, or where naming it would be awkward and the
information-structure reason for passive voice (focus on the patient) is
real — the tell is passive-as-default, not passive voice itself.

---

## Typography and numbers

**Origin: humanizer-pro.** None of the three upstream variety files address
Arabic punctuation glyphs, quotation-mark convention, or digit convention as
a dedicated topic (confirmed by direct search — see
`docs/inventory/semitic.md` §6 and `docs/CONFLICTS.md` C-03). These rules
are original to this skill, added to close that gap; they are not ported
from any upstream source.

**Arabic comma، semicolon؛، question mark؟** Use the Arabic forms (،  ؛  ؟),
not their Latin equivalents (, ; ?), in Arabic-script prose. Rationale: the
Latin forms are a visible tell that text was produced by a process that
didn't fully localize punctuation — most commonly seen when content is
machine-translated or copy-pasted from a Latin-punctuation source and only
partially cleaned up.

- ❌ هل يمكن أن نتحقق من هذا الافتراض, ثم نراجع النتيجة?
- ✓ هل يمكن أن نتحقق من هذا الافتراض، ثم نراجع النتيجة؟

<!-- NATIVE-REVIEW: shared -->

**Quotation marks.** Preserve the source document's existing convention.
Where no convention is established: default to guillemets « » for MSA
print-style text (books, articles, formal reports); "" (or the ASCII
double-quote if the surrounding document already uses it) is acceptable in
web or dialect text, chat transcripts, and informal register. Do not mix
conventions within a single document.

**Tashkeel (diacritics).** Do not add or strip diacritics unless the source
document does. This generalizes the upstream MSA and Levantine guidance:
MSA treats diacritics as a genre-gated stylistic choice — undiacritized for
modern prose, fully diacritized for religious/classical/pedagogical
text — applied consistently within a document (`SM-MSA-023`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:386-400`); Levantine
treats tashkeel presence in casual dialect text as itself a tell and
prescribes stripping it except for shadda (ّ) (`SM-SHM-018`,
`_sources/semitic/skills/humanizer-ar-shami/SKILL.md:693-715`). The shared
rule for this skill: never change the source's diacritics policy on your own
initiative; if the source is undiacritized, keep it that way; if it is
diacritized, keep the diacritics (and fix placement errors — see
`ar-msa.md` AR-MSA for case-ending specifics).

**Tatweel (ـ, kashida).** Never add tatweel. It is a justification/
typesetting device, not a writing convention, and its presence in running
text is itself a formatting artifact regardless of authorship.

**Arabic-Indic (٠١٢٣٤٥٦٧٨٩) vs. Western digits (0-9).** Preserve the source
document's existing digit convention; never mix the two systems within one
document. Dates and numbers are protected content — do not renormalize a
date format, a statistic, or a numeral's digit system as part of a
"humanizing" pass; only touch surrounding prose.

- ❌ (mixed within one document) وقع الحدث في ٢٠٢٤/03/15 بحضور 45 مشاركًا،
  وكان عدد الحضور في الدورة السابقة ٣٠.
- ✓ (consistent Western) وقع الحدث في 2024/03/15 بحضور 45 مشاركًا، وكان عدد
  الحضور في الدورة السابقة 30.
- ✓ (consistent Arabic-Indic) وقع الحدث في ٢٠٢٤/٠٣/١٥ بحضور ٤٥ مشاركًا، وكان
  عدد الحضور في الدورة السابقة ٣٠.

<!-- NATIVE-REVIEW: shared -->

---

## Rhetorical devices that are NOT tells in Arabic

Unlike English-language AI-detection guidance (which treats an unearned
rhetorical question as a stalling tactic to cut, per `avoid-ai-writing`;
see `docs/CONFLICTS.md` C-02), Arabic rhetorical convention runs the other
direction: the *absence* of these devices is the AI tell, and adding them is
the fix. Do not apply English-language rhetorical-question suppression rules
to Arabic text — see C-02 for the full conflict writeup.

**Rhetorical questions (الاستفهام البلاغي).** All three variety files
independently instruct *adding* rhetorical questions where they are absent,
and call this a fundamental tool of Arabic rhetoric rather than a stalling
device:
- MSA: "الاستفهام البلاغي (rhetorical questioning) is one of the most
  fundamental tools of Arabic rhetoric... Flag if none are present in texts
  longer than 400 words." Add 1-2 per major section.
  (`SM-MSA-021`, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:352-363`)
- Egyptian: "No Questions to the Reader... AI 'monologues.'" Add ≥1
  reader-directed question per substantial paragraph.
  (`SM-EGT-021`, `_sources/semitic/skills/humanizer-ar-egt/SKILL.md:489-509`)
- Levantine: "No Reader-Directed Questions... add 2-3 confirmation
  questions" at natural pause points.
  (`SM-SHM-015`, `_sources/semitic/skills/humanizer-ar-shami/SKILL.md:574-602`)

**Controlled سجع (light phonetic end-rhyme/cadence).** MSA explicitly
endorses reintroducing light phonetic harmony across consecutive sentence
endings — not full rhyme, but rhythmic resonance — especially at paragraph
openings, section ends, and conclusions, as a marker of authentic literary
Arabic style: "التعليم بناءٌ وتنميةٌ وانتماء" (بناء/تنمية/انتماء, all ـاء
ending) is given as the worked example.
(`SM-MSA-018`, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:309-321`)
Only MSA's file addresses سجع explicitly; Egyptian and Levantine are silent
on it (neither endorses nor flags it), so treat controlled سجع as an
MSA-register device rather than assuming it applies to dialect text.

**Parallelism.** MSA's saj' example above is itself a triadic parallel
structure (three ـاء-ending nouns in series). MSA also separately endorses
paratactic/parallel sentence construction as part of varying syntactic
templates rather than defaulting to uniform إن/أن + noun + verb openings
(`SM-MSA-012`). Levantine's natural paratactic long-chain style (linking
clauses with وبعدين/بس/ويلا, per `SM-SHM-024`) is a dialect-native form of
the same device — extended parallel/serial clause construction is a feature
to preserve, not a tell, in both registers.

**Carve-out:** these devices are earned by genuine rhetorical need, the same
way any device is — mechanically inserting a rhetorical question at every
paragraph break, or forcing end-rhyme onto every sentence, produces its own
kind of artificial pattern. The instruction is "make sure these tools are
present when the text calls for them," not "maximize their frequency."

---

## Sentence rhythm thresholds

The three variety files each assert a numeric band for what counts as
suspiciously uniform sentence length, and the three numbers disagree (per
`docs/CONFLICTS.md` C-12):

- MSA: claims a specific standard-deviation cutoff and a narrow word-count
  band that "AI text" supposedly clusters in, versus a stated human
  variance percentage. (`SM-MSA-013`)
- Egyptian: claims a different, narrower word-count band for uniform
  sentences. (`SM-EGT-010`)
- Levantine: claims a third, still-different word-count band, while also
  noting that natural Levantine text swings from short fragments to very
  long paratactic chains. (`SM-SHM-024`)

None of the three cites a corpus, sample size, or measurement method for its
specific numbers (per `docs/inventory/semitic.md` §8, items 11-12, 17) — per
this skill's owner-approved policy, none of those numbers are reproduced
here; see `docs/dedup-log/ar-shared-msa.md` for the exact figures dropped
and where each came from.

**Shared guideline for this skill:** don't anchor decisions to a specific
word-count number or percentage at all. Instead, read a paragraph and ask
whether every sentence feels the same length and shape; if so, break the
pattern (insert a short sentence, or in Levantine allow a long paratactic
run). The disagreement between the three varieties' unstated numeric bands
is itself evidence that no single cutoff is reliable — treat this as a
qualitative read, not an arithmetic check.
