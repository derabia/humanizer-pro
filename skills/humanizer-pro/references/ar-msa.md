# Arabic — Modern Standard Arabic (MSA / الفصحى)

MSA-specific rules and MSA's own nuance on shared patterns. Ported from
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md` (28 patterns, pinned
commit `2c9d4fbe3e0086d373b59bfebc9556082275cf62`), cross-referenced against
`docs/inventory/semitic.md` §3.1 and `docs/CONFLICTS.md`.

Read `ar-shared.md` first. Every pattern below that is substantially absorbed
into a shared rule is a short entry pointing at the `AR-SH-*` id; the entry
still gets an `AR-MSA-*` id (IDs are assigned 1:1 against the 28 upstream
`SM-MSA-*` patterns, in source order, so this file's numbering is contiguous
and every upstream pattern is traceable to exactly one AR-MSA id even when
its content lives in ar-shared).

Severity tiers: **P0** critical, **P1** significant, **P2** minor (see
`ar-shared.md` for the mapping rationale).

---

## AR-MSA-001 — Hedging Phrase Overload | فرط التحوّط

**Severity:** P1. **See:** `ar-shared.md` AR-SH-001 (full entry, same fix,
same before/after example — `SM-MSA-001`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:44-55`).

**MSA-specific nuance:** In MSA, the fix is to delete the hedge and state the
claim directly in the same register — unlike Egyptian and Levantine, there
is no dialect-swap step; the replacement stays formal.

---

## AR-MSA-002 — Clichéd Opening Phrases | افتتاحيات مستهلكة

**Severity:** P1

**Provenance:** `SM-MSA-002`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:58-69`. MSA-only — no
equivalent pattern named in the Egyptian or Levantine files.

**What it looks like:** A paragraph opens with a stock scene-setting phrase:
في الآونة الأخيرة، في العصر الحديث، إن العالم اليوم، يشهد العالم حاليًا، في
ظل التطورات المتسارعة، في خضم التحولات، مع تسارع وتيرة، في عالم يتغير بسرعة.

**Why it reads as AI:** These openers delay the actual claim behind a
scene-setting throat-clear; they are interchangeable across almost any
topic, which is itself the tell — genuine writing starts with something
specific to the piece.

**Fix:** Delete the opener entirely; start the paragraph with the
substantive claim, observation, or image.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:67-68`):
- ❌ في ظل التطورات المتسارعة في مجال الذكاء الاصطناعي، تواجه المؤسسات تحديات
  جديدة.
- ✓ الذكاء الاصطناعي لا يطرق الباب — إنه يُعيد تشكيل البيت من الداخل.

**Carve-outs:** None stated upstream.

---

## AR-MSA-003 — Wrong Transition Phrase (علاوة على ذلك) | حرف عطف خاطئ

**Severity:** P0. **See:** `ar-shared.md` AR-SH-002 (full entry — this is the
single strongest MSA AI signature per upstream, `SM-MSA-003`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:72-83,490,626`).

**MSA-specific nuance:** None beyond what's in AR-SH-002 — this pattern is
MSA-native in its full critical weight; the etymological note (علاوة
classically meant camel cargo overage) is MSA-register trivia worth keeping
in mind when explaining the fix to a user.

---

## AR-MSA-004 — Transition Phrase Overuse | فرط الروابط الانتقالية

**Severity:** P1. **See:** `ar-shared.md` AR-SH-002 (`SM-MSA-004`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:86-97`).

**MSA-specific nuance:** Upstream states a numeric density trigger for this
pattern (a specific repeat count and a per-word-count rate for any single
transition phrase — وبالتالي، بالإضافة إلى، مع ذلك، ومن ثَمّ، على الرغم من
ذلك، لذا). That number is not reproduced here — it is uncited (no corpus or
method given) and dropped per this skill's statistics policy; see
`docs/dedup-log/ar-shared-msa.md`. The qualitative trigger is: if the same
transition phrase, or transitions generally, start feeling repetitive on a
read-through, that's the signal to act.

---

## AR-MSA-005 — Formulaic Conclusion Phrases | خواتيم نمطية

**Severity:** P1. **See:** `ar-shared.md` AR-SH-002 and AR-SH-003
(`SM-MSA-005`, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:100-111`).

**MSA-specific nuance:** Upstream also flags pure-restatement "summary
sentences" (a conclusion that just repeats the piece's claims in slightly
different words) as its own sub-case of this pattern, distinct from the
named formulaic phrases (في الخلاصة، باختصار، وختاماً) — worth checking for
even when no named formulaic phrase is present.

---

## AR-MSA-006 — Passive Voice تم/يتم Overuse | فرط استخدام "تمّ/يتمّ"

**Severity:** P0

**Provenance:** `SM-MSA-006`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:114-125,491`. MSA-only —
this is the periphrastic تم/يتم + verbal-noun construction specifically,
which is distinct from the morphological passive family (يُعتبر، يُستخدم)
covered in `ar-shared.md` AR-SH-007; Egyptian and Levantine's passive
patterns (`SM-EGT-008`, `SM-SHM-014`) list only the morphological forms, not
تم/يتم, so this entry is kept MSA-specific per `docs/CONFLICTS.md` C-07.

**What it looks like:** تم/يتم prefixed to a verbal noun to form a passive —
تم إجراء الدراسة، تم جمع البيانات، تمت معالجتها — repeated within a single
paragraph, or noticeably dense across the piece as a whole. (Upstream states
a specific per-word-count density number here; it is dropped per this
skill's statistics policy — see `docs/dedup-log/ar-shared-msa.md`.)

**Why it reads as AI:** This construction lets the writer avoid ever naming
who performed the action; chained across several clauses in one paragraph it
produces the flat, agentless tone typical of generated MSA prose.

**Fix:** Convert to active voice, naming the actual agent; if the agent is
genuinely unknown, use a general/indefinite-subject active construction
instead of تم/يتم.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:122-124`):
- ❌ تم إجراء الدراسة من قِبَل الباحثين، وتم جمع البيانات على مدى ثلاثة أشهر،
  وتمت معالجتها إحصائيًا.
- ✓ أجرى الباحثون دراستهم على مدى ثلاثة أشهر، جمعوا خلالها البيانات وحللوها
  إحصائيًا.

**Carve-outs:** None stated upstream — flagged critical without exception
("reduce to at most one per 300 words").

---

## AR-MSA-007 — Vocabulary Homogeneity | جمود المفردات

**Severity:** P1

**Provenance:** `SM-MSA-007`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:134-145`. MSA-only.

**What it looks like:** Either the same word for a concept repeated across
paragraphs with no variation, or the opposite failure — mechanical synonym
rotation with no real semantic distinction, e.g. أثبتت الدراسات / أظهرت
الأبحاث / كشفت الدراسات العلمية used interchangeably as if they were the
same claim dressed up three ways.

**Why it reads as AI:** Both failure modes come from the same root — the
writer (or model) isn't tracking what each word actually contributes; either
it defaults to one safe word, or it rotates synonyms as decoration rather
than for genuine distinction.

**Fix:** Consolidate repeated concepts to one accurate word where variation
adds nothing, or use genuine synonyms purposefully where they mark a real
distinction (different evidence type, different degree of certainty).

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:143-144`):
- ❌ أثبتت الدراسات أهمية النوم. وقد أظهرت الأبحاث أن قلة النوم تؤثر على
  الأداء. وكشفت الدراسات العلمية أن ساعات النوم الكافية...
- ✓ تُؤكد الأدلة المتراكمة — من التجارب المخبرية إلى الدراسات الميدانية — أن
  النوم ليس استراحة بيولوجية بل عملية ترميم معرفي.

**Carve-outs:** None stated upstream.

---

## AR-MSA-008 — Formal MSA Over-Formalization | فرط الرسمية

**Severity:** P1. **See:** `ar-shared.md` AR-SH-001 and AR-SH-006
(`SM-MSA-008`, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:148-159`).

**MSA-specific nuance:** This pattern is specifically a *register mismatch*
within MSA itself — formal phrases (يتجلى ذلك في، تجدر الإشارة إلى، وعليه
يمكن القول، ومما لا شك فيه) that are correct MSA grammar but wrong for the
audience (blog, newsletter, LinkedIn post). The fix is to match register to
audience, which is a judgment call this skill's workflow should surface to
the user (see "MSA workflow notes" below) rather than a mechanical
find-and-replace.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:156-158`):
- ❌ يتجلى ذلك جليًا في إطار تحليلنا للمؤشرات الاقتصادية، ومما لا شك فيه أن
  هذه البيانات تعكس واقعًا محددًا.
- ✓ الأرقام تقول ما يكرهه المسؤولون: الانكماش حقيقي، وتجاهله لن يجعله يختفي.

---

## AR-MSA-009 — Conjunction Overuse (و/أو/لكن) | فرط أدوات العطف

**Severity:** P1

**Provenance:** `SM-MSA-009`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:162-173`. MSA-only.

**What it looks like:** A chain connecting more than ~3 items or clauses
with و/أو/لكن; upstream gives an uncited heuristic that a
conjunctions-per-sentence average above 3.5 across a paragraph signals AI.

**Why it reads as AI:** Listing everything with و instead of grouping,
compressing, or prioritizing is a generation shortcut — it avoids the work
of deciding what matters most.

**Fix:** Group related items, compress the list, or pick the two or three
that matter and drop or subordinate the rest.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:170-172`):
- ❌ يعاني المجتمع من مشكلات في التعليم والصحة والبنية التحتية والبطالة
  والفقر والتفاوت الاجتماعي والهجرة الداخلية.
- ✓ البنية الاجتماعية تتشقق من جهات عدة: تعليم متراجع، صحة مُثقلة، وبطالة
  تدفع نحو الهجرة — وكلها أعراض لجرح واحد.

**Carve-outs:** None stated upstream.

---

## AR-MSA-010 — Prefix/Suffix Redundancy (ال / ب) | تكرار زوائد لا لزوم لها

**Severity:** P2

**Provenance:** `SM-MSA-010`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:176-187`. MSA-only.

**What it looks like:** Reflexive, unnecessary ال piled onto chains of
nouns, or overuse of the preposition ب in circumstantial phrases where it
adds nothing.

**Why it reads as AI:** Over-definitizing every noun in a chain (المؤسسات
الحكومية...الإصلاحات الضرورية...الأنظمة التعليمية الحالية) produces a dense,
bureaucratic texture rather than a natural one.

**Fix:** Remove definiteness where it is not semantically required;
restructure the sentence to avoid definiteness pileups rather than just
deleting individual ال's.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:184-186`):
- ❌ يتطلب الأمر من المؤسسات الحكومية القيامَ بالإصلاحات الضرورية في الأنظمة
  التعليمية الحالية.
- ✓ على المؤسسات الحكومية أن تُصلح أنظمتها التعليمية — والوقت لا يصبر.

**Carve-outs:** None stated upstream.

---

## AR-MSA-011 — Domain Vocabulary Rigidity | جمود المفردات المتخصصة

**Severity:** P2

**Provenance:** `SM-MSA-011`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:190-201`. MSA-only.

**What it looks like:** One domain term standing in for all its
sub-meanings — مرض used for every condition instead of اضطراب، حالة، عَرَض
as appropriate; تقنية used everywhere instead of varying تكنولوجيا، ذكاء
رقمي، نظام.

**Why it reads as AI:** Real domain writing distinguishes between related
but different concepts using the precise term for each; collapsing them into
one safe word is a generalization shortcut.

**Fix:** Apply the precise sub-meaning term per sentence — not variety for
its own sake, but accuracy.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:198-200`):
- ❌ يعاني المريض من مرض نفسي. هذا المرض يؤثر على سلوكه. يمكن علاج هذا المرض
  بالعلاج النفسي.
- ✓ يرزح المريض تحت وطأة اضطراب يُشوّه علاقته بالواقع — وما نراه من سلوكيات
  ليس سوى الأعراض الخارجية لحالة أعمق بكثير.

**Carve-outs:** None stated upstream.

---

## AR-MSA-012 — Syntactic Template Overuse | فرط القوالب التركيبية

**Severity:** P1

**Provenance:** `SM-MSA-012`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:210-221`. MSA-only.

**What it looks like:** Most of a paragraph's sentences share the same
opening template (upstream states a specific percentage threshold here,
dropped per this skill's statistics policy — see
`docs/dedup-log/ar-shared-msa.md`) — إن/أن + noun + verb، يُعد + noun + adjective، من
الواضح أن، لا شك أن + clause، تُشير الأبحاث/الدراسات إلى أن — or uniform
VSO (verb-subject-object) order throughout.

**Why it reads as AI:** Human MSA writers vary sentence-opening structure
for rhythm and emphasis (fronting, topicalization); a fixed template
repeated across a paragraph is a generation artifact.

**Fix:** Vary sentence openings through fronting or topicalization instead
of defaulting to the same template each time.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:218-220`):
- ❌ يُعد التعليم أمرًا بالغ الأهمية. ويُعتبر الاستثمار فيه ضرورة ملحة.
  ويُشكّل الركيزة الأساسية للتنمية.
- ✓ التعليم ليس أداةً — إنه الأساس. ومن يُقلّص ميزانيته اليوم يُهيّئ أزمة
  اقتصادية لغدٍ لا يستطيع تحمّلها.

**Carve-outs:** None stated upstream.

---

## AR-MSA-013 — Sentence Length Uniformity | رتابة طول الجملة

**Severity:** P0. **See:** `ar-shared.md` AR-SH-004 (full entry —
`SM-MSA-013`, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:224-235,492`).

**Dropped statistic:** upstream states a specific standard-deviation cutoff
and word-count range that "AI text" is claimed to cluster in, against a
stated human-variance percentage (`SM-MSA-013`). None of it is reproduced
here — no corpus, sample, or method is cited (see
`docs/CONFLICTS.md` C-12 and `docs/dedup-log/ar-shared-msa.md` for the exact
figures and where they came from). Use the qualitative read instead: does
this paragraph's sentences all feel the same length and shape?

---

## AR-MSA-014 — Paragraph Length Uniformity | رتابة طول الفقرة

**Severity:** P2

**Provenance:** `SM-MSA-014`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:238-252`. MSA-only.

**What it looks like:** Every paragraph runs 3-5 sentences with no
deviation anywhere in the piece.

**Why it reads as AI:** Same underlying issue as sentence-length uniformity
(AR-MSA-013 / AR-SH-004) but at the paragraph level — human writing lets
important claims stand alone and lets less important material run longer.

**Fix:** Pull the 2-3 most important claims into standalone single-sentence
paragraphs; allow at least one paragraph to run noticeably longer than the
rest.

**Example** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:250-251`):
"الثقة لا تُبنى بالبيانات الرسمية." given as a worked example of a
standalone single-sentence paragraph carrying a key claim.

**Carve-outs:** None stated upstream.

---

## AR-MSA-015 — Bullet Point & List Overuse | فرط استخدام القوائم

**Severity:** P1. **See:** `ar-shared.md` AR-SH-005 (full entry, including
the feature-comparison/step-instruction/spec-list carve-out imported from
`docs/CONFLICTS.md` C-08 — `SM-MSA-015`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:255-272`).

**MSA-specific nuance:** This is the only upstream variety file with a
dedicated list-overuse pattern; see AR-SH-005's coverage note for why it was
generalized to all varieties rather than kept MSA-only.

---

## AR-MSA-016 — Markdown Overuse | فرط استخدام صياغة الماركداون

**Severity:** P2

**Provenance:** `SM-MSA-016`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:275-286`. MSA-only in
this inventory (not independently attested in the Egyptian or Levantine
files, though the underlying complaint — markdown decoration doesn't belong
in running Arabic prose — is plausibly universal; kept MSA-scoped here
rather than generalized, unlike AR-MSA-015, because no second variety file
independently made the claim).

**What it looks like:** **Bold**, *italic*, H1-H3 headers, `---` horizontal
rules, or inline code used inside running Arabic prose (not in genuinely
structured reference material).

**Why it reads as AI:** Markdown emphasis substitutes for the rhetorical
work Arabic already has tools for (word-order fronting, exclamatory
particles); reaching for bold instead of restructuring the sentence is a
generation habit carried over from chat-interface output formatting.

**Fix:** Remove the markdown; replace bold-for-emphasis with word-order
fronting or exclamatory particles (ألا إنّ، حقًا، بل).

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:283-285`):
- ❌ **أهمية التعليم:** يُعدّ التعليم من أهم العوامل المؤثرة في **التنمية
  الاقتصادية** و**الاجتماعية**.
- ✓ لا يحتاج التعليم إلى تعريف بالخط العريض — حاجتنا إليه هي التي تحتاج إلى
  فهم.

**Carve-outs:** Genuinely structured reference material (tables, specs,
step lists) is not covered by this pattern — see the list-overuse carve-out
in AR-SH-005 for the same logic applied to bullets.

---

## AR-MSA-017 — Pronoun-Antecedent Repetition | تكرار المرجع بدل الضمير

**Severity:** P2

**Provenance:** `SM-MSA-017`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:289-300`. MSA-only.

**What it looks like:** The same noun repeated as subject or object in
three or more consecutive sentences, where a pronoun (هو/هي/هم/هن/ذلك/تلك)
or a zero-subject construction would read naturally once the referent is
established.

**Why it reads as AI:** Repeating the full noun phrase every time avoids
the anaphora resolution a human writer does automatically; it reads as
mechanically cautious rather than fluent.

**Fix:** Use a pronoun or zero-subject after the referent is established;
combine repeated-subject sentences into one complex sentence with relative
clauses.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:297-299`):
- ❌ أجرى الباحث دراسة ميدانية. الباحث جمع البيانات من عشر مدن. الباحث حلّل
  البيانات خلال ستة أشهر. الباحث نشر النتائج في مجلة دولية.
- ✓ أجرى الباحث دراسةً ميدانية شاملة، جمع خلالها بيانات من عشر مدن، وقضى
  ستة أشهر في تحليلها قبل أن ينشر نتائجه في مجلة دولية.

**Carve-outs:** None stated upstream.

---

## AR-MSA-018 — Absence of Saj' (السجع) | غياب السجع

**Severity:** P2

**Provenance:** `SM-MSA-018`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:309-321`. MSA-only.
Cross-referenced in `ar-shared.md` "Rhetorical devices that are NOT tells in
Arabic" — that section covers why this device is endorsed rather than
flagged; this entry covers the fix procedure.

**What it looks like:** Complete absence of phonetic harmony across
consecutive sentence-final phrases, especially noticeable at paragraph
openings, section endings, and conclusions — read the endings aloud and
listen for whether they land the same way each time (flat) or with any
resonance (present).

**Why it reads as AI:** Classical and literary MSA style uses light
end-of-clause phonetic harmony as a rhythm device; text that never does this
anywhere reads as functionally competent but stylistically flat — a
generation-model default rather than a deliberate style choice.

**Fix:** Revise key sentence endings for light phonetic harmony (not full
rhyme) — prioritize opening sentences, section ends, and final sentences
over the middle of a paragraph.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:317-320`):
- ❌ التعليم يُعد أمرًا ضروريًا لبناء المجتمعات وتحقيق التنمية المستدامة في
  المنطقة.
- ✓ التعليم بناءٌ وتنميةٌ وانتماء — ثلاثية لا تكتمل بأحدها دون الآخرَين.
  (saj' pattern: بناء/تنمية/انتماء, all ـاء ending)

**Carve-outs:** Full rhyme, or saj' forced onto every sentence, produces its
own artificial-sounding pattern — the device is meant to be light and
occasional, not pervasive.

---

## AR-MSA-019 — No Metaphor or Figurative Language | غياب المجاز

**Severity:** P1

**Provenance:** `SM-MSA-019`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:324-335`. MSA-only. Its
dead-metaphor examples (مفتاح النجاح، أسس التنمية، ركائز المجتمع) are also
cited in `ar-shared.md` AR-SH-003 as an example of significance-inflation
phrasing — the two entries are related but distinct: AR-SH-003 is about
inflating importance with a stock phrase, this entry is about the broader
absence of any original figurative language at all.

**What it looks like:** No metaphor, simile, personification, metonymy, or
extended image anywhere in a text longer than ~300 words; or the text relies
only on dead/clichéd metaphors (مفتاح النجاح، أسس التنمية، ركائز المجتمع)
rather than anything original.

**Why it reads as AI:** Figurative language requires committing to a
specific, sometimes risky comparison; defaulting to literal statement (or to
the safest possible cliché) avoids that risk in a way that reads as
generated caution rather than a stylistic choice.

**Fix:** Add at least one original metaphor per ~400 words, drawn from a
concrete domain (body, water, architecture, agriculture, light, weather);
avoid clichés even when adding new figurative language.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:332-334`):
- ❌ يُعتبر التعليم من أهم الركائز التي تُبنى عليها الدول المتقدمة وتُحقق من
  خلاله التنمية الشاملة.
- ✓ الدولة التي تُهمل تعليمها تُشيّد قصرًا فوق رمال — شامخٌ في الصورة، يتصدع
  بأول عاصفة.

**Carve-outs:** Technical/reference text where figurative language would
undermine precision is exempt — the pattern targets argumentative/expository
prose specifically.

---

## AR-MSA-020 — Generic Cultural References | مرجعية ثقافية عامة

**Severity:** P1

**Provenance:** `SM-MSA-020`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:338-349`. MSA-only.

**What it looks like:** No specific Arab-culture, -history, -geography, or
-literary touchstone anywhere in the text — the content could apply "to any
society in any language with simple translation," per upstream's own
framing.

**Why it reads as AI:** Generic phrasing avoids the risk of an inaccurate
or region-mismatched cultural reference by not attempting one at all; the
result is content that could have been written about anywhere, which reads
as placeless rather than universal.

**Fix:** If the target region or audience isn't already known, ask; then add
accurate, respectful cultural grounding — regional history, a named
movement (e.g. النهضة), a specific place.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:346-348`):
- ❌ واجهت المجتمعات العربية تحديات كثيرة في مجال التنمية خلال العقود
  الماضية.
- ✓ منذ أن أشعلت النهضةُ فتيلَ التساؤل في القرن التاسع عشر، والسؤال نفسه
  يُلاحقنا: لماذا تتقدم غيرنا ونتعثر نحن؟ الجواب ليس في الجغرافيا ولا في
  الجينات — إنه في الخيارات.

**Carve-outs:** Don't fabricate a cultural reference to satisfy this rule —
an inaccurate one is worse than none; ask the user for the target
region/audience when it isn't already given.

---

## AR-MSA-021 — No Rhetorical Questions | غياب الاستفهام البلاغي

**Severity:** P1. **See:** `ar-shared.md` "Rhetorical devices that are NOT
tells in Arabic" (full quote and cross-variety framing — `SM-MSA-021`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:352-363`).

**MSA-specific fix detail:** Add 1-2 rhetorical questions per major section,
placed at transitions or immediately before a core claim (not scattered
randomly).

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:360-362`):
- ❌ إن التعليم يؤثر بشكل مباشر على مستوى التنمية الاقتصادية والاجتماعية في
  أي مجتمع من المجتمعات.
- ✓ متى تعلّمنا أخيرًا أن الأمم لا تُبنى بالثروات، بل بما تفعله بها؟

---

## AR-MSA-022 — Semantic Clustering | تكتّل المعنى الجامد

**Severity:** P2

**Provenance:** `SM-MSA-022`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:366-377`. MSA-only.

**What it looks like:** A rigid one-concept-per-paragraph structure with no
cross-referencing between paragraphs — the piece reads like a series of
separate encyclopedia entries rather than a connected argument.

**Why it reads as AI:** Human argumentative writing threads ideas back
through the piece (a claim from paragraph 2 gets referenced again in
paragraph 5); strict compartmentalization suggests each paragraph was
generated somewhat independently.

**Fix:** Distribute 2-3 key concepts across the whole piece instead of
confining each to one paragraph; add explicit cross-references between
paragraphs ("كما أشرنا سابقًا", or a direct callback to an earlier claim).

**Note:** upstream's example for this pattern is structural (a paragraph
plan) rather than a literal before/after sentence pair
(`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:374-376`).

**Carve-outs:** None stated upstream.

---

## AR-MSA-023 — Diacritic Inconsistency | تفاوت التشكيل

**Severity:** P1

**Provenance:** `SM-MSA-023`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:386-400`. MSA-specific
workflow note (see `docs/CONFLICTS.md` C-06 for the conflict with Egyptian's
unconditional tanwin-strip rule).

**What it looks like:** Some words in a text are diacritized and others are
not, with no discernible pattern — typically because diacritics were only
added to words a generation process found ambiguous, rather than following
a consistent editorial policy.

**Why it reads as AI:** A human editor picks a diacritics policy for the
whole piece (or the whole genre) and applies it uniformly; partial,
ambiguity-triggered diacritization is a generation-process artifact.

**Fix / diacritics policy for this skill:** Pick one standard per genre and
apply it uniformly across the document — undiacritized for modern prose
(the overwhelmingly common default for contemporary MSA writing:
journalism, essays, blog posts, reports), fully diacritized only for
religious, classical, or explicitly pedagogical text. As stated in
`ar-shared.md`'s typography section: never change the source document's
existing diacritics policy on your own initiative — this pattern is about
*consistency* once a policy is chosen (by the source, or by explicit user
instruction), not about imposing diacritics where none existed.

**Example** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:394-399`):
upstream shows a sentence with يُعدّ diacritized but أهم، بناء، التنمية left
bare, then gives both a fully-undiacritized and a fully-diacritized correct
version — demonstrating that either extreme is fine, the inconsistency is
not.

**Carve-outs:** Words whose meaning is genuinely ambiguous without a
diacritic may keep one even in an otherwise undiacritized document (e.g.
disambiguating homographs) — this is the one case upstream allows deviation
from "all or nothing."

---

## AR-MSA-024 — Incorrect Diacritic Placement (Case Endings) | خطأ في موضع الحركات الإعرابية

**Severity:** P1

**Provenance:** `SM-MSA-024`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:403-414`. MSA-specific
workflow note (case endings; see `docs/CONFLICTS.md` C-06).

**What it looks like:** Wrong case marking (رفع/نصب/جر) in a diacritized
text — most commonly in an iḍāfa construction (المضاف والمضاف إليه) or after
a preposition, where the second noun needs جر (genitive) and gets marked
otherwise.

**Why it reads as AI:** Case-ending errors in diacritized text are a
reliable signal of a process that applied diacritics mechanically rather
than parsing the actual grammatical structure.

**Fix:** Correct the case endings, dual and sound-plural suffixes, broken
plurals, and case marking inside quoted phrases according to standard
Arabic grammar — this is a proofreading/correctness pattern, not a stylistic
one, and applies only when the document is diacritized at all (per
AR-MSA-023's policy).

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:411-413`):
- ❌ نظرَ الباحثُ في نتائجَ الدراسةِ (نتائجَ marked incorrect — should be
  نتائجِ as مضاف إليه)
- ✓ نظرَ الباحثُ في نتائجِ الدراسةِ

**Carve-outs:** Only applies to diacritized text — see AR-MSA-023's policy
for when diacritics should be present at all.

---

## AR-MSA-025 — Overgeneralization of Formal MSA | تعميم الفصحى في غير موضعها

**Severity:** P1

**Provenance:** `SM-MSA-025`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:417-428`. MSA-only.

**What it looks like:** Dialogue or quoted speech written in full formal
MSA when the speaker would naturally use dialect or at least a reduced
register; or an informal context (social captions, personal narrative)
written in full formal MSA throughout.

**Why it reads as AI:** No Arabic speaker's actual spoken dialogue is
grammatically full MSA; rendering dialogue that way is a generation default
(the model doesn't distinguish narration register from dialogue register)
rather than a deliberate literary choice.

**Fix:** Give dialogue the speaker's actual dialect, or at minimum a
reduced/informal register, even inside an otherwise formal MSA piece.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:425-427`):
- ❌ قال المدير: "ينبغي علينا أن نُعيد النظر في استراتيجياتنا المتعلقة
  بإدارة الموارد البشرية."
- ✓ قال المدير: "لازم نراجع طريقة إدارتنا للفريق — الوضع مش تمام."

<!-- NATIVE-REVIEW: msa -->
Upstream's own "human" fix example above uses مش تمام, a colloquial
negation form (broadly Egyptian-leaning, also heard Levantine/Gulf-adjacent)
inside a skill whose scope is formal MSA text — the source doesn't specify
which dialect the manager's dialogue is meant to represent. This may be a
deliberate illustration that dialogue-in-MSA-prose should drop to some
colloquial register, or an unmarked colloquial blend that a native speaker
would want to pin to a specific dialect (or generalize as "colloquial" more
explicitly) before this example ships in the skill. Flagged in
`docs/inventory/semitic.md` §10-11 (item 4) as a known discrepancy in the
source itself, not introduced by this port.

**Carve-outs:** Formal registers genuinely calling for MSA dialogue (a
historical drama in Classical Arabic setting, a legal-document quotation)
are exempt — the pattern targets contemporary realistic dialogue.

---

## AR-MSA-026 — Passive Voice Disguise (يُعتبر / يُستخدم family) | تعمية بصيغة المبني للمجهول

**Severity:** P1. **See:** `ar-shared.md` AR-SH-007 (full entry, cross-variety —
`SM-MSA-026`, `_sources/semitic/skills/humanizer-ar-msa/SKILL.md:431-442`).

**MSA-specific nuance:** Distinct from AR-MSA-006 (تم/يتم periphrastic
passive), which stays MSA-only and carries a stricter numeric cap (>2 per
300 words, critical) versus this pattern's threshold (>2 per 200 words,
significant) — check both when auditing an MSA text for passive-voice
density, since upstream treats them as two separately-triggered patterns
even though both are "passive voice."

---

## AR-MSA-027 — Zipfian Distribution Deviation | خروج عن التوزيع الزيفي

**Severity:** P2

**Provenance:** `SM-MSA-027`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:445-457`. MSA-only;
upstream itself labels this a stylometric/heuristic pattern rather than a
rule with a clean trigger phrase.

**What it looks like:** Vocabulary confined entirely to a mid-frequency
"safe" band — never reaching for literary, technical, or regional words even
where one would be more precise or vivid.

**Why it reads as AI:** Generation models tend toward the statistically
safest, most common word for a given slot; a text that never deviates from
that band, across an entire piece, reads as unnaturally smoothed compared to
how human vocabulary choice actually distributes (a genuine Zipfian tail of
rarer words used deliberately).

**Fix:** Introduce 2-3 edge-of-distribution words (classical, technical, or
phonetically vivid) at points where they are genuinely more precise than the
safe default — not scattered for their own sake.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:453-456`):
- ❌ الأزمة الاقتصادية أثّرت بشكل سلبي على الأوضاع المعيشية للسكان وزادت من
  صعوبة الحياة اليومية.
- ✓ الأزمة أنهكت — بالمعنى الحرفي، لا المجازي — قدرةَ الناس على الصمود، فلم
  يعد الفقر مفهومًا اقتصاديًا بل حالًا يُعاش لحظةً بلحظة.

**Carve-outs:** None stated upstream. Treat "Zipfian distribution" as
descriptive framing, not a measured statistic — no corpus or frequency data
is cited.

---

## AR-MSA-028 — Low Syntactic & Semantic Diversity | ضعف التنوع التركيبي والدلالي

**Severity:** P1

**Provenance:** `SM-MSA-028`,
`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:460-471`. MSA-only.

**What it looks like:** Three or more consecutive sentences that are
near-paraphrases of each other, or that share an identical syntactic
skeleton (e.g. NP + verb + object, repeated) with only the surface words
changed.

**Why it reads as AI:** Restating the same claim several times in
structurally identical sentences pads length without adding evidence,
qualification, or a new angle — a generation habit when a model is asked to
elaborate without new information to add.

**Fix:** Keep the single strongest sentence; convert the others into real
evidence, a qualification, or an illustration from a different domain — or
simply delete them as redundant.

**Before / after** (`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:468-470`):
- ❌ التعليم مهم جدًا. التعليم يُحسّن حياة الناس. التعليم يُعدّ أداةً فاعلة
  في تحسين الأوضاع الاجتماعية. التعليم يُسهم في رفع مستوى المعيشة.
- ✓ التعليم يُحوّل. ليس تحويلًا أيديولوجيًا — بل تحويلًا في الاحتمالات: ما
  يستطيع الإنسان أن يفعله، وما يستطيع أن يتخيله، وما يرفض أن يقبله.

**Carve-outs:** Genuine repetition-for-emphasis (a deliberate rhetorical
device, distinct from saj' in AR-MSA-018) is not the target — the tell is
near-paraphrase padding, not intentional repetition.

---

## MSA-specific workflow notes

These are procedural notes for applying this reference, not individual
patterns — ported from the MSA skill's "Processing Workflow" and "Voice
Calibration" sections
(`_sources/semitic/skills/humanizer-ar-msa/SKILL.md:474-544`).

**Diacritics policy (see AR-MSA-023, AR-MSA-024, and `ar-shared.md`
typography section).** Before editing any MSA text, determine — from the
source document, or by asking — whether it is diacritized at all. If yes,
diacritics-consistency (AR-MSA-023) and case-ending correctness
(AR-MSA-024) both apply. If no, do not add diacritics; only strip
inconsistent partial diacritization if present. Never silently switch a
document's diacritics policy.

**Case endings (إعراب) as a distinct correctness layer.** Case-ending
errors (AR-MSA-024) are a grammar-correctness check, separate from every
other pattern in this file, and only relevant when the text is diacritized.
Running this check against an undiacritized document is a no-op, not an
error.

**Critical-pattern priority order.** Upstream marks three MSA patterns as
always-must-fix regardless of other constraints: AR-MSA-003 (علاوة على
ذلك), AR-MSA-006 (تم/يتم overuse), and AR-MSA-013 (sentence-length
uniformity). When triaging a large set of flagged issues in one pass,
address these three first, then hedging/passive-voice patterns, then
rhetorical-texture patterns (metaphor, saj', rhetorical questions).

**Register-matching is a judgment call, not a mechanical rule.**
AR-MSA-008 (over-formalization) requires knowing the target audience and
genre — ask if it isn't already given, rather than guessing.

**Dialogue inside MSA prose.** Per AR-MSA-025, quoted dialogue should
reflect the speaker's actual register (dialect or reduced-formality MSA),
even inside an otherwise fully formal MSA piece — this is the one place
where switching out of MSA register mid-document is correct, not a defect.

---

## Classical-rhetoric layer (AR-MSA-029 … AR-MSA-033)

Added in improvement round 1 (IMP-12). Everything above this heading
diagnoses MSA AI text **lexically**: a phrase, a word family, a measurable
distribution. The five entries below come from a different tradition, the
classical Arabic sciences of البلاغة (المعاني، البيان، البديع) and
الفصاحة, and they diagnose **structure**: what the text does with sentence
mood, with person and tense, and with the verb-plus-object pairings Arabic
has already settled on.

Idea and structure adapted from `hazemshan1-rgb/humanizer-ar`
(`skills/humanizer-ar/references/patterns.md` items 21, 24, 26 and 27, plus
the عيوب الفصاحة checklist in item 25), MIT licence, credited in
`docs/provenance/ar-shared-msa.md`. The prose here is written for this
reference and is not a translation of theirs. Two of the five are scored by
the engine (AR-MSA-031, AR-MSA-032); the other three are review guidance
and are deliberately not scored, for the reason each entry gives.

Items 22 and 23 of that source are not given ids here: item 22
(context-free emphatic particles) is already AR-SH-001 plus the
لا شك / بالتأكيد entries in its phrase list, and item 23 (الإطناب against
الإيجاز) is already AR-MSA-028 with a classical name attached. Adding ids
for them would duplicate rules the engine already carries.

---

## AR-MSA-029 — Declarative Rigidity (خبر with no إنشاء) | جمود الخبر وغياب تنويع الإنشاء

**Severity:** P2 (informational; not scored by the engine)

**Provenance:** adapted from
`_sources/competitors/hazemshan1-rgb_humanizer-ar/skills/humanizer-ar/references/patterns.md:235-241`
(MIT), which builds it on the "ترتيب الكلام" domain of Marathe (2022).
MSA-only. Not implemented in `lib/ar-detector`: see "Why this is not
scored" below.

**What it looks like:** Page after page of الجملة الخبرية, the declarative
sentence that reports a fact, with no إنشاء anywhere: no استفهام إنكاري or
تقريري, no نداء, no تعجب, no أمر addressed to the reader, no تمنٍّ. Every
sentence has the same illocutionary shape, so the reader is never once
positioned as an interlocutor.

**Why it reads as AI:** Skilled Arabic prose moves between خبر and إنشاء on
purpose, and the movement is where the rhythm and the reader-contact come
from. A model asked for an informative passage optimizes for reported
content and produces a flat run of خبر. The tell is total absence of
variation across a long passage, not the presence of any one mood.

**Fix:** Where the argument actually turns, let the sentence mood turn with
it: an استفهام إنكاري that names the objection you are about to answer, a
نداء or an أمر where you genuinely address the reader, a تعجب where the
finding is genuinely surprising. One or two well-placed shifts across a
long piece is the target, not a quota.

**Before / after** (written for this reference):
<!-- NATIVE-REVIEW: msa -->
- ❌ تُظهر البيانات أن الإنفاق ارتفع. ويُظهر التحليل أن الأثر كان محدودًا.
  وتُظهر المقارنة أن النتيجة لم تتغير.
- ✓ ارتفع الإنفاق. فأين ذهب؟ التحليل يقول إن الأثر كان محدودًا، والمقارنة
  مع العام السابق لا تُظهر فرقًا يُذكر.

**Why this is not scored:** The pattern is an **absence**, and
`scripts/README.md` ("Conservative by default") states that absence signals
are not scored in this engine because they fire on every short or technical
text. There is a second reason specific to this one: `ar-shared.md`
("Rhetorical devices that are NOT tells in Arabic") records that rhetorical
questions are never treated as a signal in Arabic, and a scored
"too few rhetorical questions" check would invert that rule by the back
door. Treat AR-MSA-029 as a rewrite prompt, not a detection.

**Carve-outs:** Reference entries, technical documentation, legal text and
abstracts are legitimately all-خبر. The pattern only says something about
discursive prose long enough to have a shape.

---

## AR-MSA-030 — Missing iltifat (no shift of person or tense) | غياب الالتفات

**Severity:** P2 (informational; not scored by the engine)

**Provenance:** adapted from
`_sources/competitors/hazemshan1-rgb_humanizer-ar/skills/humanizer-ar/references/patterns.md:261-265`
(MIT). MSA-only. Not implemented in `lib/ar-detector`.

**What it looks like:** One grammatical person and one tense held for the
whole document without a single deliberate shift. Usually third person plus
either an unbroken المضارع or an unbroken الماضي. الالتفات, the intentional
move between غائب, مخاطب and متكلم, or between الماضي and المضارع inside
one passage, is absent.

**Why it reads as AI:** الالتفات is a marked, high-skill device: a writer
uses it to pull a reader into a scene, or to make a past event present. A
model has no reason to reach for it, so generated prose is uniformly
consistent in a way that skilled Arabic writing usually is not.

**Fix:** Nothing, in most cases. Where the passage has a genuine turn (a
result the reader is meant to feel, a past event whose consequences are
live), shift into المضارع for that stretch, or address the reader directly
for one sentence, then return.

**Before / after** (written for this reference):
<!-- NATIVE-REVIEW: msa -->
- ❌ خرج السكان من البيوت في الليلة نفسها، ووقفوا في الساحة حتى الفجر،
  ولم يعودوا إلا بعد أن هدأ كل شيء.
- ✓ خرج السكان من البيوت في الليلة نفسها. وها هم يقفون في الساحة حتى
  الفجر، لا يعودون إلا بعد أن يهدأ كل شيء.

**Confidence: low, and lower than any other entry in this file.** The
source itself calls it a low-confidence indicator. Most competent, entirely
human practical writing (a manual, a report, a news item) contains no
الالتفات at all, so its absence is close to uninformative. The useful
direction is one-way: **presence** of well-placed الالتفات is weak evidence
of a human writer; absence is evidence of nothing. That asymmetry is why no
score attaches to it here.

**Carve-outs:** Do not insert الالتفات into text that has no rhetorical
turn to justify it. A mechanical person or tense shift is a grammar error,
not a device, and it reads worse than the uniformity it replaced.

---

## AR-MSA-031 — Light-Verb Calques (قام بـ + مصدر) | الأفعال المساعدة الفارغة بدل الفعل المباشر

**Severity:** P2, fires from the second occurrence

**Provenance:** adapted from
`_sources/competitors/hazemshan1-rgb_humanizer-ar/skills/humanizer-ar/references/patterns.md:279-291`
(MIT), which grounds it in the Arabic collocation-extraction literature
(Brashi, *Arabic Collocations: Implications for Translation*, and the
Musaheb collocation tooling). MSA-only. Implemented in
`lib/ar-detector/lexicons.js` as pattern id `AR-MSA-031`.

**What it looks like:** The verb slot is filled by an empty light verb,
قام / قامت / يقوم / تقوم / القيام, and the actual action is demoted to a
verbal noun after بـ: قام بإجراء الدراسة instead of أجرى الدراسة,
قام بتقديم الطلب instead of قدّم الطلب, تم القيام بتحليل البيانات instead
of حلّل الباحث البيانات.

**Why it reads as AI:** English forms a large share of its verbs this way
(*make a decision*, *conduct a study*, *provide support*), and text
generated or translated under English influence carries the construction
across even though Arabic has the direct verb available in nearly every
case. It is not a grammatical error, which is exactly why it survives a
proofread; it is a register and naturalness defect, and its repetition as a
default choice is the tell.

**Fix:** Recover the direct verb from the verbal noun and drop the light
verb: إجراء to أجرى, تقديم to قدّم, اتخاذ to اتخذ, تنفيذ to نفّذ,
إعداد to أعدّ. If the verbal noun carries a long definite modifier chain
that resists conversion, keep the periphrasis and fix the others.

**Before / after** (written for this reference; the shape of the example
follows patterns.md:288-291):
<!-- NATIVE-REVIEW: msa -->
- ❌ قامت اللجنة بإجراء مراجعة شاملة للملفات، ثم قامت بتقديم توصياتها،
  وبعد ذلك تم القيام باتخاذ القرار النهائي.
- ✓ راجعت اللجنة الملفات كلها، وقدّمت توصياتها، ثم اتخذت قرارها.

**How the detector avoids the obvious false positive:** A bare قام بـ
regex is unusable, because قام بسرعة (adverbial), قام بدور (idiomatic),
قام بزيارة and قام بنفسه are all ordinary Arabic. The implementation
therefore requires **both** a curated light-verb host and a curated verbal
noun whose direct verb always exists, with the بـ attached to the verbal
noun as Arabic writes it. There is no bare قام بـ branch at all, so
قام بسرعة cannot match; this is covered by a regression test in
`tests/ar-detector.test.js`.

**Carve-outs:** قام بدور, قام بزيارة, قام بجولة, قام بواجبه and
قام بمحاولة are idiomatic and are excluded from the verbal-noun list.
A single occurrence is not scored either: `minCount` is 2, because one
periphrastic construction is a stylistic choice and a run of them is the
calque.

---

## AR-MSA-032 — Collocation Calques (أخذ قرارًا, أخذ بعين الاعتبار) | التصادفات اللفظية المُقحمة من الإنجليزية

**Severity:** P2

**Provenance:** adapted from
`_sources/competitors/hazemshan1-rgb_humanizer-ar/skills/humanizer-ar/references/patterns.md:293-299`
(MIT), same collocation literature as AR-MSA-031. MSA-only. Implemented in
`lib/ar-detector/lexicons.js` as pattern id `AR-MSA-032`, restricted to the
two collocations the source documents as attested.

**What it looks like:** Every word in the phrase is correct Arabic, and the
pairing is not: أخذ قرارًا, a word-for-word rendering of *take a decision*,
where Arabic has اتخذ قرارًا; أخذ بعين الاعتبار for *take into
consideration*, where راعى or وضع في الحسبان is the settled form.

**Why it reads as AI:** Collocation is the part of a language that is
learned by exposure rather than by rule, so it is also the part that a
word-level mapping from English gets wrong while staying grammatical. The
text passes every grammar check and still reads as translated.

**Fix:** Ask which verb an Arabic writer actually uses with that specific
noun, and use it: قرار takes اتخذ, اعتبار takes راعى or أخذ في الحسبان,
نتيجة takes خلص إلى or توصّل إلى.

**Before / after** (written for this reference):
<!-- NATIVE-REVIEW: msa -->
- ❌ أخذت قرارًا متأخرًا بعد أن أخذت بعين الاعتبار كل الملاحظات.
- ✓ اتخذت قرارًا متأخرًا بعد أن راعت كل الملاحظات.

**Why the engine list is short, on purpose:** The full inventory of Arabic
collocations is a lexicographic project, not a phrase list, and the source
says as much: it treats the class as a review judgment rather than a match.
Only the two attested pairs above are scored here. The general check
belongs in review: for each verb-plus-noun pair, ask whether it is the pair
a native writer uses with that noun, or a grammatical stand-in borrowed
from an English template. That question is worth asking even when the
sentence contains no English word at all.

**Carve-outs:** أخذ in its ordinary senses (أخذ الكتاب, أخذ يقرأ,
أخذ مكانه) is untouched; only the two calqued pairings are listed. The
engine also matches the **adjacent** pairing only: أخذت قرارًا is flagged,
أخذت الإدارة قرارًا with the subject between the verb and its object is
not. Widening that to allow an intervening constituent would require
parsing, which this engine does not do, so the split pairing stays a review
judgment like the rest of the class.

---

## AR-MSA-033 — Classical Fluency Defects (عيوب الفصاحة) | عيوب الفصاحة الكلاسيكية

**Severity:** varies by item (review checklist; not scored by the engine)

**Provenance:** adapted from
`_sources/competitors/hazemshan1-rgb_humanizer-ar/skills/humanizer-ar/references/patterns.md:267-277`
(MIT), where the category is drawn from the traditional عيوب الفصاحة and
from the negative-scoring category in Marathe (2022). MSA-only. Not
implemented in `lib/ar-detector`.

**What it looks like:** Five defects that classical فصاحة names, each of
which machine-influenced Arabic commits readily:

1. **الدخيل / التعريب غير الموفق.** A foreign word transliterated straight
   in where a natural Arabic term exists.
2. **سوء استخدام المصطلح (catachresis).** A word used slightly outside its
   precise sense, typically because an English concept was mapped to an
   Arabic term that only partly overlaps it.
3. **أخطاء صرفية أو نحوية.** Concentrated, in generated text, in
   passive-voice conjugation and in gender or number agreement across long
   clauses.
4. **تنافر الحروف والكلمات.** Adjacent words that are awkward to
   pronounce. A generator does not hear what it writes, so it has no reason
   to avoid this.
5. **غرابة الاستعمال.** A word that is correct and eloquent in general but
   unusual in this particular context.

**Why it reads as AI:** Each defect is invisible to a grammar check and
audible to a reader. Together they produce the specific impression of text
that is correct and still not written by anyone.

**Fix:** Read the passage aloud. Replace the transliteration if a natural
term exists, tighten any term used loosely, check agreement across the long
clauses specifically, and re-order any sequence that is hard to say.

**Why this is not scored:** None of the five is a string match. Items 1, 2
and 5 need to know the intended sense; item 3 needs a parser this engine
does not have; item 4 needs a phonological model. `minCount`-style
heuristics for any of them would fire on ordinary technical Arabic, which
is exactly the false-positive class this engine is built to avoid. It is a
checklist for the rewrite pass and for native review, not a detection.

**Carve-outs:** Established loanwords with no natural Arabic equivalent in
the target register (تلفزيون, راديو, إنترنت, and most standardized
technical vocabulary) are not الدخيل. The defect is the avoidable
transliteration, not the settled loan.
