# Inventory — `_sources/semitic` (OthmanAdi/humanizer-semitic)

Source: `_sources/semitic/`, pinned at commit `2c9d4fbe3e0086d373b59bfebc9556082275cf62`
(`feat: publish to npm as humanizer-semitic`, OthmanAdi, 2026-08-03).

Scope of this inventory: full read of README, package manifests, and the three Arabic
skills (MSA, Egyptian, Levantine). Hebrew (`humanizer-he`) is noted for existence/size only —
its patterns are **not** inventoried here, per task scope.

---

## 1. File list

| File | Lines | Purpose |
|---|---:|---|
| `README.md` | 135 | Project pitch, skill table (pattern counts, install commands), usage instructions, "related skills" credits (says these are modeled on `blader/humanizer`), license (MIT). |
| `package.json` | 37 | npm package manifest publishing all 4 skills as one `pi` package (`humanizer-semitic`); author "Ahmad Othman Ammar Adi"; repo `github.com/OthmanAdi/humanizer-semitic`. |
| `.claude-plugin/plugin.json` | 15 | Claude Code plugin manifest; lists the 4 skill directories as plugin skills. |
| `skills/humanizer-ar-msa/SKILL.md` | 675 | Modern Standard Arabic (الفصحى) humanizer skill — 28 patterns across 5 categories. |
| `skills/humanizer-ar-egt/SKILL.md` | 876 | Egyptian Arabic (عامية مصرية) humanizer skill — 25 patterns across 5 categories. |
| `skills/humanizer-ar-shami/SKILL.md` | 1247 | Levantine Arabic (Syrian/Lebanese/Palestinian) humanizer skill — 25 patterns across 5 categories, with per-region variant tables. |
| `skills/humanizer-he/SKILL.md` | 727 | Modern Hebrew humanizer skill — **out of scope**, noted only. Frontmatter says 35 patterns (per README table); not read beyond ~30 lines / frontmatter. |
| `LICENSE`, `banner.png`, `.git/*` | — | Not inventoried (license text not read in full; binary banner not opened). |

Total lines read in full for this inventory: README (135) + package.json (37) + plugin.json (15) + MSA (675) + Egyptian (876) + Levantine (1247) = 2985 lines read end-to-end. Hebrew: first ~30 lines only.

---

## 2. Frontmatter of each Arabic SKILL.md (verbatim)

### `skills/humanizer-ar-msa/SKILL.md` (lines 1–10)
```yaml
---
name: humanizer-ar-msa
description: Remove AI-generated writing patterns from Modern Standard Arabic (MSA/الفصحى) text. Use when editing or reviewing Arabic formal text to make it sound naturally human-written.
allowed-tools: Read, Write, Edit, AskUserQuestion
metadata:
  version: 1.0.0
  based-on: blader/humanizer
  language: Modern Standard Arabic (MSA / الفصحى)
  source: https://github.com/blader/humanizer
---
```

### `skills/humanizer-ar-egt/SKILL.md` (lines 1–10)
```yaml
---
name: humanizer-ar-egt
description: Remove AI-generated writing patterns from Egyptian Arabic (عامية مصرية / Masri) text. Use when editing or reviewing Egyptian dialect text to make it sound authentically human-written.
allowed-tools: Read, Write, Edit, AskUserQuestion
metadata:
  version: 1.0.0
  based-on: blader/humanizer
  language: Egyptian Arabic (عامية مصرية / Masri)
  source: https://github.com/blader/humanizer
---
```

### `skills/humanizer-ar-shami/SKILL.md` (lines 1–10)
```yaml
---
name: humanizer-ar-shami
description: Remove AI-generated writing patterns from Levantine Arabic (الشامي — Syrian, Lebanese, Palestinian) text. Use when editing or reviewing Levantine dialect text to make it sound authentically human-written.
allowed-tools: Read, Write, Edit, AskUserQuestion
metadata:
  version: 1.0.0
  based-on: blader/humanizer
  language: Levantine Arabic (الشامي / Syrian, Lebanese, Palestinian)
  source: https://github.com/blader/humanizer
---
```

### `skills/humanizer-he/SKILL.md` (lines 1–10, noted only, not inventoried further)
```yaml
---
name: humanizer-he
description: Remove AI-generated writing patterns from Modern Hebrew (עברית מודרנית) text. Use when editing or reviewing Hebrew text to make it sound naturally human-written.
allowed-tools: Read, Write, Edit, AskUserQuestion
metadata:
  version: 1.0.0
  based-on: blader/humanizer
  language: Modern Hebrew (עברית מודרנית)
  source: https://github.com/blader/humanizer
---
```

All four skills share the identical frontmatter shape: `name`, `description`, `allowed-tools: Read, Write, Edit, AskUserQuestion`, and a `metadata` block with `version: 1.0.0`, `based-on: blader/humanizer`, `language`, `source: https://github.com/blader/humanizer`. This is a verbatim shared template, not paraphrase.

---

## 3. Pattern-by-pattern listing

IDs assigned in file order: `SM-MSA-001…028`, `SM-EGT-001…025`, `SM-SHM-001…025`.

### 3.1 MSA — `skills/humanizer-ar-msa/SKILL.md` (28 patterns, 5 categories)

**Category 1 — Hedging & Formulaic Language** (heading "CATEGORY 1", line 38)

**SM-MSA-001 — Hedging Phrase Overload** (heading line 44, body 44–55)
- Trigger: scan for من المهم الإشارة إلى، يجب الإشارة إلى، من الضروري أن نذكر، يُعتقد أنّ، قد يكون، ربما، من المحتمل أنّ، تجدر الإشارة إلى، لا بد من التنويه; flag if >1 per 200 words or opening a sentence.
- Fix: remove hedge, state directly; if uncertainty is genuine, express its nature/degree precisely.
- Example (line 53–54):
  - ❌ من المهم الإشارة إلى أن الاقتصاد الرقمي يُغير طبيعة العمل في المنطقة.
  - ✓ الاقتصاد الرقمي يُعيد رسم خريطة العمل في المنطقة، وهذا لم يعد موضع جدل.
- No carve-outs stated beyond "genuine uncertainty."

**SM-MSA-002 — Clichéd Opening Phrases** (line 58, body 58–69)
- Trigger: paragraph-opening sentences beginning with في الآونة الأخيرة، في العصر الحديث، إن العالم اليوم، يشهد العالم حاليًا، في ظل التطورات المتسارعة، في خضم التحولات، مع تسارع وتيرة، في عالم يتغير بسرعة.
- Fix: delete opener; start with substantive claim/observation/image.
- Example (line 67–68):
  - ❌ في ظل التطورات المتسارعة في مجال الذكاء الاصطناعي، تواجه المؤسسات تحديات جديدة.
  - ✓ الذكاء الاصطناعي لا يطرق الباب — إنه يُعيد تشكيل البيت من الداخل.

**SM-MSA-003 — Wrong Transition Phrase (Critical AI Signature)** (line 72, body 72–83)
- Trigger: every instance of علاوة على ذلك — flagged as *the* strongest single-pattern AI signature ("appearing three or more times... sufficient to identify AI authorship").
- Detail: explains علاوة classically meant camel cargo overage; correct MSA "moreover" = إضافة إلى ذلك / بالإضافة إلى ذلك / فضلًا عن ذلك.
- Fix: replace every instance; rotate إضافة إلى ذلك، فضلًا عن ذلك، وثمة أيضًا، بل إن — no repeats.
- Example (line 81–82):
  - ❌ علاوة على ذلك، فإن التعليم يُعد ركيزة أساسية للتنمية.
  - ✓ فضلًا عن ذلك، التعليم ليس خدمة اجتماعية — إنه استثمار في البنية التحتية للأمة.
- Flagged CRITICAL in the Stage-1 checklist (line 490) and quick reference (line 626).

**SM-MSA-004 — Transition Phrase Overuse** (line 86, body 86–97)
- Trigger: وبالتالي، بالإضافة إلى، مع ذلك، ومن ثَمّ، على الرغم من ذلك، لذا، وفي هذا الإطار — flag if any phrase >2× per 300 words, or collective rate >1 per 80 words.
- Fix: remove where connection is obvious; vary form or reorder to make transition unneeded.
- Example (line 95–96):
  - ❌ يعاني النظام من قصور هيكلي. وبالتالي، لا يمكنه الاستجابة للتحديات الراهنة. وبالإضافة إلى ذلك، يفتقر إلى الكفاءة. لذا، من الضروري إصلاحه.
  - ✓ النظام قاصر هيكليًا ولا يملك أدوات الاستجابة — وهذا يجعل الإصلاح حاجة لا رفاهية.

**SM-MSA-005 — Formulaic Conclusion Phrases** (line 100, body 100–111)
- Trigger: final paragraph/sentences containing في الخلاصة، باختصار، وختاماً، وبهذا نكون قد، في نهاية المطاف يتضح، مما سبق يتبين أن، وخلاصة القول; also flags pure-restatement "summary sentences."
- Fix: remove formulaic opener; end on compressed claim, rhetorical question, or resonant image.
- Example (line 108–110):
  - ❌ وخلاصة القول، أثبتنا في هذا المقال أن التعليم مهم وأن الاستثمار فيه ضروري لتحقيق التنمية.
  - ✓ أمة لا تُعلّم أطفالها تدفع الثمن مرتين: مرة حين تُهدر طاقاتهم، ومرة حين تستورد من غيرها ما كان يمكنها أن تصنعه بنفسها.

**SM-MSA-006 — Passive Voice تم/يتم Overuse** (line 114, body 114–125)
- Trigger: تم/يتم + verbal-noun constructions; flag any paragraph with >1, or overall rate >3 per 300 words (stated AI threshold).
- Fix: convert to active voice, naming agent, or use فاعل عام (indefinite-subject active) if agent unknown.
- Example (line 122–124):
  - ❌ تم إجراء الدراسة من قِبَل الباحثين، وتم جمع البيانات على مدى ثلاثة أشهر، وتمت معالجتها إحصائيًا.
  - ✓ أجرى الباحثون دراستهم على مدى ثلاثة أشهر، جمعوا خلالها البيانات وحللوها إحصائيًا.
- Flagged CRITICAL ("reduce to at most one per 300 words," line 491).

**Category 2 — Lexical & Vocabulary Patterns** (heading line 128)

**SM-MSA-007 — Vocabulary Homogeneity** (line 134, body 134–145)
- Trigger: same concept expressed with same word repeatedly across paragraphs; OR mechanical synonym rotation with no semantic distinction (أثبتت الدراسات / أظهرت الأبحاث / كشفت الدراسات العلمية used interchangeably).
- Fix: consolidate to single accurate word, or use genuine synonyms purposefully.
- Example (line 143–144):
  - ❌ أثبتت الدراسات أهمية النوم. وقد أظهرت الأبحاث أن قلة النوم تؤثر على الأداء. وكشفت الدراسات العلمية أن ساعات النوم الكافية...
  - ✓ تُؤكد الأدلة المتراكمة — من التجارب المخبرية إلى الدراسات الميدانية — أن النوم ليس استراحة بيولوجية بل عملية ترميم معرفي.

**SM-MSA-008 — Formal MSA Over-Formalization** (line 148, body 148–159)
- Trigger: register mismatch — يتجلى ذلك في، تجدر الإشارة إلى، وعليه يمكن القول، ومما لا شك فيه، في إطار هذا التحليل used in accessible-writing contexts (blog, newsletter, LinkedIn).
- Fix: strip register-inappropriate formality; match competent-educated-writer register to audience.
- Example (line 156–158):
  - ❌ يتجلى ذلك جليًا في إطار تحليلنا للمؤشرات الاقتصادية، ومما لا شك فيه أن هذه البيانات تعكس واقعًا محددًا.
  - ✓ الأرقام تقول ما يكرهه المسؤولون: الانكماش حقيقي، وتجاهله لن يجعله يختفي.

**SM-MSA-009 — Conjunction Overuse (و/أو/لكن)** (line 162, body 162–173)
- Trigger: chains connecting >3 items/clauses; conjunctions-per-sentence average >3.5 across a paragraph signals AI.
- Fix: group/compress/prioritize instead of listing everything.
- Example (line 170–172):
  - ❌ يعاني المجتمع من مشكلات في التعليم والصحة والبنية التحتية والبطالة والفقر والتفاوت الاجتماعي والهجرة الداخلية.
  - ✓ البنية الاجتماعية تتشقق من جهات عدة: تعليم متراجع، صحة مُثقلة، وبطالة تدفع نحو الهجرة — وكلها أعراض لجرح واحد.

**SM-MSA-010 — Prefix/Suffix Redundancy** (line 176, body 176–187)
- Trigger: reflexive/unnecessary ال on noun chains; overuse of preposition ب in circumstantial phrases.
- Fix: remove definiteness where not semantically required; restructure to avoid definiteness pileups.
- Example (line 184–186):
  - ❌ يتطلب الأمر من المؤسسات الحكومية القيامَ بالإصلاحات الضرورية في الأنظمة التعليمية الحالية.
  - ✓ على المؤسسات الحكومية أن تُصلح أنظمتها التعليمية — والوقت لا يصبر.

**SM-MSA-011 — Domain Vocabulary Rigidity** (line 190, body 190–201)
- Trigger: single domain term used for all sub-meanings (مرض used everywhere instead of اضطراب، حالة، عَرَض; تقنية instead of varying تكنولوجيا، ذكاء رقمي، نظام).
- Fix: apply the precise sub-meaning term per sentence, not variety for its own sake.
- Example (line 198–200):
  - ❌ يعاني المريض من مرض نفسي. هذا المرض يؤثر على سلوكه. يمكن علاج هذا المرض بالعلاج النفسي.
  - ✓ يرزح المريض تحت وطأة اضطراب يُشوّه علاقته بالواقع — وما نراه من سلوكيات ليس سوى الأعراض الخارجية لحالة أعمق بكثير.

**Category 3 — Structural & Syntactic Patterns** (heading line 204)

**SM-MSA-012 — Syntactic Template Overuse** (line 210, body 210–221)
- Trigger: >60% of paragraph's sentences share opening template — إن/أن + noun + verb، يُعد + noun + adjective، من الواضح أن، لا شك أن + clause، تُشير الأبحاث/الدراسات إلى أن; also uniform VSO order.
- Fix: vary openings via fronting/topicalization.
- Example (line 218–220):
  - ❌ يُعد التعليم أمرًا بالغ الأهمية. ويُعتبر الاستثمار فيه ضرورة ملحة. ويُشكّل الركيزة الأساسية للتنمية.
  - ✓ التعليم ليس أداةً — إنه الأساس. ومن يُقلّص ميزانيته اليوم يُهيّئ أزمة اقتصادية لغدٍ لا يستطيع تحمّلها.

**SM-MSA-013 — Sentence Length Uniformity** (line 224, body 224–235)
- Trigger: std-dev of sentence word count <6 words per paragraph; stated AI text clusters in 15–22 word range vs. human variance >40% of mean.
- Fix: insert a 5–9 word sentence after every 2–3 long sentences, carrying sharpest claim/image.
- Example (line 232–234): one long AI sentence (~40 words about Arab youth challenges) → ✓ split into long sentence + "يريدون نتائج. الآن." (short, 2-word finisher).
- Flagged CRITICAL ("break the uniformity without exception," line 492).

**SM-MSA-014 — Paragraph Length Uniformity** (line 238, body 238–252)
- Trigger: all paragraphs 3–5 sentences with no deviation.
- Fix: pull 2–3 most important claims into standalone single-sentence paragraphs; allow one paragraph to run longer.
- Example (line 250–251): "الثقة لا تُبنى بالبيانات الرسمية." given as standalone-sentence-paragraph example.

**SM-MSA-015 — Bullet Point & List Overuse** (line 255, body 255–272)
- Trigger: lists >15% of text by line count; lists whose items could be prose; lists >5 items inside argumentative/analytical text.
- Fix: convert to integrated prose with explicit connective logic.
- Example (line 264–271):
  - ❌ (bulleted list: ضعف الحوكمة / غياب الشفافية / التضخم المتصاعد / انخفاض الاستثمار الأجنبي)
  - ✓ الأزمة لم تنشأ من عامل واحد: الحوكمة الهشة أتاحت الفرصة، وغياب الشفافية حجب المحاسبة، فتراكم التضخم في غياب رادع، وانسحب الاستثمار الأجنبي حين فقد ثقته بالمشهد.

**SM-MSA-016 — Markdown Overuse** (line 275, body 275–286)
- Trigger: **bold**, *italic*, H1–H3, `---` rules, inline code in running Arabic prose.
- Fix: remove markdown; replace bold with word-order fronting or exclamatory particles (ألا إنّ، حقًا، بل).
- Example (line 283–285):
  - ❌ **أهمية التعليم:** يُعدّ التعليم من أهم العوامل المؤثرة في **التنمية الاقتصادية** و**الاجتماعية**.
  - ✓ لا يحتاج التعليم إلى تعريف بالخط العريض — حاجتنا إليه هي التي تحتاج إلى فهم.

**SM-MSA-017 — Pronoun-Antecedent Repetition** (line 289, body 289–300)
- Trigger: same noun repeated as subject/object in ≥3 consecutive sentences where هو/هي/هم/هن/ذلك/تلك or zero-subject would serve.
- Fix: use pronouns/zero-subject after referent established; combine into complex sentence with relative clauses.
- Example (line 297–299):
  - ❌ أجرى الباحث دراسة ميدانية. الباحث جمع البيانات من عشر مدن. الباحث حلّل البيانات خلال ستة أشهر. الباحث نشر النتائج في مجلة دولية.
  - ✓ أجرى الباحث دراسةً ميدانية شاملة، جمع خلالها بيانات من عشر مدن، وقضى ستة أشهر في تحليلها قبل أن ينشر نتائجه في مجلة دولية.

**Category 4 — Rhetorical & Stylistic Deficiencies** (heading line 303)

**SM-MSA-018 — Absence of Saj' (السجع)** (line 309, body 309–321)
- Trigger: read sentence-final phrases aloud; check for phonetic harmony across consecutive endings; complete absence is the tell, especially at paragraph endings/conclusion.
- Fix: revise key sentence endings for light phonetic harmony (not full rhyme), especially opening sentences, section ends, final sentences.
- Example (line 317–320):
  - ❌ التعليم يُعد أمرًا ضروريًا لبناء المجتمعات وتحقيق التنمية المستدامة في المنطقة.
  - ✓ التعليم بناءٌ وتنميةٌ وانتماء — ثلاثية لا تكتمل بأحدها دون الآخرَين. (annotated: saj' pattern بناء/تنمية/انتماء, all ـاء ending)

**SM-MSA-019 — No Metaphor or Figurative Language** (line 324, body 324–335)
- Trigger: no metaphor/simile/personification/metonymy/extended image in texts >300 words; also flags dead metaphors (مفتاح النجاح، أسس التنمية، ركائز المجتمع).
- Fix: ≥1 original metaphor per 400 words from a concrete domain (body, water, architecture, agriculture, light, weather); avoid clichés.
- Example (line 332–334):
  - ❌ يُعتبر التعليم من أهم الركائز التي تُبنى عليها الدول المتقدمة وتُحقق من خلاله التنمية الشاملة.
  - ✓ الدولة التي تُهمل تعليمها تُشيّد قصرًا فوق رمال — شامخٌ في الصورة، يتصدع بأول عاصفة.

**SM-MSA-020 — Generic Cultural References** (line 338, body 338–349)
- Trigger: no specific Arab-culture/history/geography/literary touchstones — text could apply "to any society in any language with simple translation."
- Fix: ask target region/audience; add accurate, respectful cultural grounding (نهضة، Ibn Khaldun, regional history).
- Example (line 346–348):
  - ❌ واجهت المجتمعات العربية تحديات كثيرة في مجال التنمية خلال العقود الماضية.
  - ✓ منذ أن أشعلت النهضةُ فتيلَ التساؤل في القرن التاسع عشر، والسؤال نفسه يُلاحقنا: لماذا تتقدم غيرنا ونتعثر نحن؟ الجواب ليس في الجغرافيا ولا في الجينات — إنه في الخيارات.

**SM-MSA-021 — No Rhetorical Questions** (line 352, body 352–363)
- Trigger: no interrogative sentences (؟) in texts >400 words; or all questions hedged/buried (نتساءل هنا عن).
- Fix: add 1–2 rhetorical questions per major section at transitions or before core claim.
- Example (line 360–362):
  - ❌ إن التعليم يؤثر بشكل مباشر على مستوى التنمية الاقتصادية والاجتماعية في أي مجتمع من المجتمعات.
  - ✓ متى تعلّمنا أخيرًا أن الأمم لا تُبنى بالثروات، بل بما تفعله بها؟

**SM-MSA-022 — Semantic Clustering** (line 366, body 366–377)
- Trigger: rigid concept-per-paragraph structure with no cross-referencing or idea distribution (reads like separate encyclopedia entries).
- Fix: distribute 2–3 key concepts across the piece; add explicit cross-references between paragraphs.
- Example (line 374–376): described structurally, not literal Arabic text (paragraph-plan example rather than sentence pair).

**Category 5 — Diacritics & Morphological Patterns** (heading line 380)

**SM-MSA-023 — Diacritic Inconsistency** (line 386, body 386–400)
- Trigger: some words diacritized, others not, without pattern; diacritics only on words model found ambiguous.
- Fix: pick one standard per genre (undiacritized for modern prose; fully diacritized for religious/classical) and apply uniformly.
- Example (line 394–399): يُعدّ diacritized but أهم، بناء، التنمية not → shown fixed both ways (undiacritized and fully diacritized versions given).

**SM-MSA-024 — Incorrect Diacritic Placement** (line 403, body 403–414)
- Trigger: wrong case marking (رفع/نصب/جر) especially in iḍāfa (المضاف والمضاف إليه) and after prepositions.
- Fix: correct case endings, dual/sound-plural suffixes, broken plurals, quoted-phrase case marking.
- Example (line 411–413):
  - ❌ نظرَ الباحثُ في نتائجَ الدراسةِ (marked incorrect: نتائجَ should be نتائجِ as مضاف إليه)
  - ✓ نظرَ الباحثُ في نتائجِ الدراسةِ

**SM-MSA-025 — Overgeneralization of Formal MSA** (line 417, body 417–428)
- Trigger: dialogue/quoted speech written in formal MSA; also flags informal contexts (social captions, personal narrative) using full formal MSA.
- Fix: dialogue should reflect speaker's dialect or at minimum reduced register.
- Example (line 425–427):
  - ❌ قال المدير: "ينبغي علينا أن نُعيد النظر في استراتيجياتنا المتعلقة بإدارة الموارد البشرية."
  - ✓ قال المدير: "لازم نراجع طريقة إدارتنا للفريق — الوضع مش تمام." (note: this "human" example itself code-switches into Egyptian-flavored colloquial mش تمام inside an MSA skill — see §10 Surprises.)

**SM-MSA-026 — Passive Voice Disguise** (line 431, body 431–442)
- Trigger: formal passive morphology beyond تم/يتم — يُستخدم، يُعتبر، يُلاحَظ، يُشار إلى، يُرى، يُقال; >2 per 200 words = AI threshold.
- Fix: identify agent; name and rewrite active, or use indefinite-subject active if agent unknown.
- Example (line 439–441):
  - ❌ يُعتبر التعليم ركيزة أساسية، ويُلاحَظ أن الاستثمار فيه يُرى على المدى الطويل.
  - ✓ يعتبر خبراء التنمية التعليمَ الركيزة الأولى — ويستطيع أي محلل اقتصادي أن يرى آثاره تتراكم على مدى عقود.

**SM-MSA-027 — Zipfian Distribution Deviation** (line 445, body 445–457)
- Trigger: (stylometric/heuristic) vocabulary confined to mid-frequency "safe" band, never literary/technical/regional.
- Fix: introduce 2–3 edge-of-distribution words (classical, technical, or phonetically vivid) where more precise.
- Example (line 453–456):
  - ❌ الأزمة الاقتصادية أثّرت بشكل سلبي على الأوضاع المعيشية للسكان وزادت من صعوبة الحياة اليومية.
  - ✓ الأزمة أنهكت — بالمعنى الحرفي، لا المجازي — قدرةَ الناس على الصمود، فلم يعد الفقر مفهومًا اقتصاديًا بل حالًا يُعاش لحظةً بلحظة.

**SM-MSA-028 — Low Syntactic & Semantic Diversity** (line 460, body 460–471)
- Trigger: 3 consecutive sentences that are near-paraphrases of each other or share identical syntactic skeleton (NP+V+O repeated).
- Fix: keep the strongest sentence; convert others to genuine evidence/qualification/illustration from a different domain, or delete as redundant.
- Example (line 468–470):
  - ❌ التعليم مهم جدًا. التعليم يُحسّن حياة الناس. التعليم يُعدّ أداةً فاعلة في تحسين الأوضاع الاجتماعية. التعليم يُسهم في رفع مستوى المعيشة.
  - ✓ التعليم يُحوّل. ليس تحويلًا أيديولوجيًا — بل تحويلًا في الاحتمالات: ما يستطيع الإنسان أن يفعله، وما يستطيع أن يتخيله، وما يرفض أن يقبله.

---

### 3.2 Egyptian — `skills/humanizer-ar-egt/SKILL.md` (25 patterns, 5 categories)

**Category 1 — Register Collapse (AI Defaults to MSA)** (heading line 66)

**SM-EGT-001 — MSA Vocabulary Substitution** (line 72, body 72–105)
- Trigger: core everyday MSA words used where Egyptian has wholesale different words (not slang — the entire daily lexicon).
- Fix table (line 80–100), full mandatory substitution list, e.g.: الآن→دلوقتي، أريد→عايز/عايزة، اذهب→روح، أرى→أشوف، هذا→ده، هذه→دي، هؤلاء→دول، ماذا→إيه، كيف→ازاي، هكذا→كده، نعم→أيوه، جداً→أوي، أيضاً→كمان، لكن→بس، ثم→وبعدين، بعد→بعدين، دائماً→طول الوقت.
- Example (line 103–104): AI: الآن أريد أن أذهب لأرى هذا الشيء → Human: دلوقتي عايز أروح أشوف الحاجة دي

**SM-EGT-002 — Tanwin and Case Endings** (line 108, body 108–119)
- Trigger: ـاً/ـٍ/ـٌ or case vowels; أيضاً، شكراً جزيلاً، تمامًا، مثلاً.
- Fix: strip tanwin/case endings; أيضاً→كمان، شكراً→متشكر، تمامًا→تمام، مثلاً→زي مثلاً/زي.
- Example (line 117–118): AI: شكراً جزيلاً على مساعدتك، وأيضاً تمامًا فهمت ما قلته → Human: متشكر على مساعدتك، وكمان فهمت اللي قلته

**SM-EGT-003 — Wrong Future Tense Marker** (line 122, body 122–138)
- Trigger: سـ prefix or سوف before any verb.
- Fix: سـ/سوف+verb → حـ/هـ + imperfect (no بـ). سوف نتحدث→هنتكلم، سأذهب→هروح، سيفعل→هيعمل، سنأكل→هناكل، ستفهم→هتفهم(f)/هيفهم(m).
- Example (line 135–137): AI: سوف نتحدث عن هذا الموضوع لاحقاً وسأذهب لمقابلته غداً → Human: هنتكلم في الموضوع ده بعدين وهروح أقابله بكره

**SM-EGT-004 — Present Tense Without بـ Prefix** (line 141, body 141–157)
- Trigger: bare imperfect (يكتب، يذهب، يفهم، يعمل) used as descriptive present.
- Fix: add بـ — يكتب→بيكتب، تروح→بتروح، أعمل→بعمل، نفهم→بنفهم، تعمل إيه→بتعمل إيه.
- Example (line 154–156): AI: هو يكتب الرسالة الآن ويفهم المشكلة → Human: هو بيكتب الرسالة دلوقتي وبيفهم المشكلة

**SM-EGT-005 — Wrong Demonstrative Order** (line 160, body 160–176)
- Trigger: هذا/هذه/هؤلاء before noun (MSA order).
- Fix: flip to after noun + Egyptian form — هذا الكتاب→الكتاب ده، هذه المشكلة→المشكلة دي، هؤلاء الناس→الناس دول، هذا الرجل→الراجل ده، هذه البنت→البنت دي.
- Example (line 173–175): AI: هذه المشكلة وهؤلاء الناس سببوا هذا الموقف → Human: المشكلة دي والناس دول عملوا الموقف ده

**Category 2 — Unnatural Sentence Structure** (heading line 179)

**SM-EGT-006 — The Long Formal Arabic Sentence** (line 185, body 185–196)
- Trigger: sentences >25–30 words; heavy الذي/التي/الذين subordination; journalistic embedding (يُعدّ X من Y التي Z).
- Fix: break into fragments; connect with يعني/بس; vary length (some 2-word, some 5-word).
- Example (line 193–195): AI: يُعدّ هذا الموضوع من المواضيع الشائكة التي تستوجب التعمق والدراسة المستفيضة قبل إصدار أي حكم أو موقف → Human: الموضوع ده صعب. محتاج تفكير. مش بسيط خالص.

**SM-EGT-007 — Wrong Negation System** (line 199, body 199–219)
- Trigger: لا، لم، لن، ليس، لست، لسنا as main negators.
- Fix table (line 207–213): verb negation ما+verb+ش (ماعرفش، ماجاش، مابقاش); nominal/adjective مش (مش كويس، مش عارف); future negation مش حـ (مش حيجي، مش هيعمل); existence مفيش (مفيش حاجة، مفيش وقت).
- Example (line 216–218): AI: لم أستطع أن أفهم ذلك لأنه لم يكن واضحاً → Human: ماقدرتش أفهم ده لأنه ماكانش واضح

**SM-EGT-008 — Robotic Passive Voice** (line 222, body 222–236)
- Trigger: يُفعل patterns — يُعتبر, يُستخدم, يُلاحظ, يُقال, يُشار, يُذكر, يُرى; مُ- prefix passives (مُستخدم, مُعتبر, مُلاحظ).
- Fix: convert to active with generic subject (ناس, حد, إحنا, هم). يُعتبر هذا الأمر هاماً→الحاجة دي مهمة; يُستخدم هذا النظام بشكل واسع→ناس كتير بيستخدموا النظام ده; يُلاحظ أن...→الواضح إن...
- Example (line 233–235): AI: يُعتبر هذا الأمر من الأمور الهامة التي يجب أن يُلاحظها الجميع → Human: الحاجة دي مهمة وكل الناس لازم تاخد بالها منها

**SM-EGT-009 — Missing Discourse Particles** (line 239, body 239–257)
- Trigger: absence of يعني, بقى, خلاص, ماشي, طب, يا سلام, والله, زي مثلاً, يعني إيه, بس خلاص — "zero of these... is a definitive AI tell."
- Notes carried functions: يعني (used 10x more than any MSA equivalent), بقى (consequence marker), خلاص ("done"/"enough"), ماشي ("okay"), طب ("okay but").
- Fix: insert at natural discourse junctions — don't overload but don't leave a whole paragraph particle-free.
- Example (line 254–256): AI: إذا كان الأمر كذلك، فسيكون الحل واضحاً ولا داعي للقلق → Human: يعني لو الأمر كده، يبقى الحل واضح خلاص. مفيش داعي للقلق.

**SM-EGT-010 — Uniform Sentence Length** (line 260, body 260–271)
- Trigger: all sentences ~12–20 words with little variance.
- Fix: insert 1–2 word sentences (صح؟, خلاص., بجد., مش كده؟); ≥1 very short sentence after explanatory passage.
- Example (line 268–270): AI: هذا الأمر صعب وغير بسيط وهو يستوجب التفكير الجيد قبل اتخاذ أي قرار → Human: الموضوع ده صعب. بجد. محتاج تفكير كتير قبل ما تقرر حاجة.

**Category 3 — Vocabulary and Register Tells** (heading line 274)

**SM-EGT-011 — Formal Openers (AI Ritual Phrases)** (line 280, body 280–304)
- Trigger: بالتأكيد، من المهم أن نلاحظ، تجدر الإشارة إلى، جدير بالذكر، من الجدير بالذكر أن، في هذا السياق، يتضح لنا من ذلك، مما لا شك فيه أن — explicitly called "direct Arabic translations of English AI ritual openers (Certainly!, It is important to note...)."
- Fix: delete; replace with بصّ...، اسمع...، تعرف إيه؟، الحقيقة..., or start directly.
- Example (line 301–303): AI: بالتأكيد! من المهم أن نلاحظ أن هذا الموضوع يستحق الاهتمام → Human: بصّ، الموضوع ده مهم فعلاً.

**SM-EGT-012 — Hyper-Formal Closing** (line 307, body 307–328)
- Trigger: وفي الختام، خلاصة القول، وبهذا نكون قد، وفي نهاية المطاف، مما سبق يتضح أن، آمل أن يكون ذلك مفيداً.
- Fix: stop without formal close, or use يعني كده، وخلاص، فاهم يعني؟، ده اللي عندي.
- Example (line 325–327): AI: وفي الختام، آمل أن يكون هذا الحديث قد أفاد الجميع → Human: يعني كده. فاهمين يعني؟

**SM-EGT-013 — جداً Instead of أوي** (line 331, body 331–342)
- Trigger: any جداً in informal text — "One جداً = AI."
- Fix: replace with أوي (or doubled أوي أوي for strong emphasis; جامد/تقيل for extreme informal).
- Example (line 339–341): AI: هو شاطر جداً في عمله وذكي جداً → Human: هو شاطر أوي في شغله وذكي أوي

**SM-EGT-014 — لأن and لكي Instead of عشان** (line 345, body 345–359)
- Trigger: لأن (because), لكي/كي (in order to), من أجل أن.
- Fix: replace with عشان uniformly (covers both "because" and "in order to" in Egyptian).
- Example (line 356–358): AI: ذهبت لكي أشتري طعاماً لأنني كنت جائعاً → Human: رحت عشان أجيب أكل عشان كنت جعان

**SM-EGT-015 — Sycophantic Opener** (line 362, body 362–378)
- Trigger: شكراً على سؤالك الرائع، يسعدني مساعدتك، بكل سرور سأساعدك، سؤال ممتاز، سعيد بمساعدتك — explicitly named as "ChatGPT-era English sycophancy" translated to Arabic.
- Fix: delete entirely; if acknowledgment needed use أيوه, ماشي, تمام, خد بالك.
- Example (line 375–377): AI: شكراً على سؤالك الرائع! يسعدني الإجابة عليه بكل سرور → Human: أيوه، خد بالك...

**Category 4 — Code-Switching and Orthography** (heading line 381)

**SM-EGT-016 — No Code-Switching** (line 387, body 387–404)
- Trigger: 100% Arabic where educated urban Cairo speech would code-switch to English.
- Domains listed: tech/work (deadline, update, meeting, sync, call, presentation, feature, bug, crash), emotions (stressed, overwhelmed, excited, bored, awkward, vibes), modern life (coffee, delivery, cancel, subscribe, upload, download), social media (story, reel, post, like, comment, live).
- Fix: use الـ + English noun for definite treatment.
- Example (line 402–403): AI: الموعد النهائي بكره والاجتماع الساعة عشرة → Human: الـ deadline بكره والـ meeting الساعة عشرة

**SM-EGT-017 — No Arabizi** (line 407, body 407–425)
- Trigger: absence of Latin-script Arabizi in WhatsApp/Instagram/Twitter/YouTube-comment contexts. Number-letter mapping given: 3=ع, 7=ح, 2=ء, 5=خ, 9=ص.
- Examples of Arabizi given: mesh 3aref (مش عارف), 7aga 7elwa (حاجة حلوة), 7abibi (حبيبي), yalla (يلا), 2olta (قلت).
- Fix: context-dependent — add for simulated chat platforms.
- Example (line 423–424): AI (WhatsApp sim): يا صديقي لا أعرف ما يجب أن أفعله → Human (WhatsApp): ya man mesh 3aref aعمل إيه *(note: mixed-script artifact in source — see §11 Confidence notes)*.

**SM-EGT-018 — Perfect Orthographic Consistency** (line 428, body 428–444)
- Trigger: AI picks one spelling per word and holds it throughout, unlike real (no-official-standard) Egyptian variation.
- Variable-spelling examples given: إيه/ايه/ايه؟، دلوقتي/دلوقتى/دلوقت، كده/كدة/كدا، عشان/علشان، هيعمل/هيعمل/هيعمل *(source lists three identical spellings here — likely an authoring artifact, see §11)*, إزاي/ازاي.
- Fix: introduce natural, "unplanned"-feeling variation (e.g., إيه in one place, ايه elsewhere).
- No before/after example pair given for this pattern (only the variation table).

**SM-EGT-019 — Missing Letter Lengthening** (line 447, body 447–466)
- Trigger: no letter repetition for emotional emphasis.
- Examples: أووووي، لاأأأأ/لاأاا، تمامممم، ياساتر، بجدددد، جاهزززز.
- Fix: add at 2–3 points of genuine emotional weight; don't overdo.
- Example (line 463–465): AI: أيوه، هذا صحيح تماماً ولا → Human: أيوهههه ده صح تمامممم لاأأ

**SM-EGT-020 — Wrong Laughter Representation** (line 469, body 469–480)
- Trigger: absence of laughter markers, or use of ح instead of ه for laughter.
- Convention: ه repeated, length = intensity — هه (mild), هههه (funny), هههههههه (losing it). Explicitly: do not use ح for laughter.
- Fix: use هههههه (min 4–6 ه's), matched to intensity.
- Example (line 477–479): AI: هذا مضحك جداً ويجعلني أضحك → Human: ده بجد مضحك هههههههه

**Category 5 — Pragmatic and Cultural Patterns** (heading line 483)

**SM-EGT-021 — No Questions to the Reader** (line 489, body 489–509)
- Trigger: no reader-directed questions; AI "monologues."
- Phrases: فاهم؟، فاهم يعني؟، عارف إيه يعني؟، ما قلتلكش؟، صح؟، مش كده؟، قلتلك مش كده؟
- Fix: ≥1 reader-directed question per substantial paragraph.
- Example (line 507–508): AI: هذا الموضوع معقد ويحتاج إلى دراسة متأنية وفهم عميق → Human: الموضوع ده معقد، بجد. محتاج تفهمه كويس. مش بسيط، فاهم يعني؟

**SM-EGT-022 — No Hedge or Disfluency Markers** (line 512, body 512–532)
- Trigger: uniformly certain/smooth/direct text, no hedging.
- Phrases: أنا فاكر إن، على حسب، مش متأكد بس، حاجة زي كده، يعني نوعاً ما، على قد ما أعرف، بشكل تقريبي.
- Fix: one hedge per idea where topic is not 100% certain, especially opinions/predictions/secondhand info.
- Example (line 529–531): AI: الحل هو استخدام النظام الجديد الذي سيحل المشكلة → Human: أنا فاكر إن الحل هو النظام الجديد ده. مش متأكد بس، على حسب الموقف يعني.

**SM-EGT-023 — ج/ق Orthographic Tell** (line 535, body 535–544)
- Trigger: consistent formal ق (should often be glottal-stop ء in colloquial writing) and inconsistency around ج pronounced "g" not "j".
- Fix: be consistent with how Egyptians actually write these sounds; awareness that ج=g (جاب=gaab not jaab, جمل=gamal).
- No before/after example pair given (only phonological explanation).

**SM-EGT-024 — No Terms of Address** (line 547, body 547–567)
- Trigger: يا صديقي (formal/distant) or no address term at all.
- Address terms: يا حبيبي/يا حبيبتي (universal warm), يا عم (older men), يا طا/يا أستاذ (respected older men), يا بنت, يا ولد, يا باشا, يا صاحبي.
- Fix: replace يا صديقي with يا حبيبي or يا صاحبي per tone; add at natural points.
- Example (line 565–566): AI: يا صديقي، أعتقد أنك محق في هذا الأمر → Human: يا حبيبي، أنت صح في الحاجة دي

**SM-EGT-025 — High Word Frequency Repetition** (line 570, body 570–581)
- Trigger: (stylometric) over-reliance on 5–10 high-frequency content words, sharp drop-off to rare/domain words.
- Fix: audit top-10 used words, introduce synonyms/domain-specific alternatives for ≥3; ground vocabulary in specifics (place names, tool names, jargon).
- Example (line 578–580): AI: الموضوع ده مهم وعايزين نشتغل عليه كويس عشان الحاجة دي مهمة → Human: الموضوع ده critical والـ sprint اللي جاي لازم نخلصه. الـ backlog معبي والـ deadlines بتحاصرنا.

---

### 3.3 Levantine — `skills/humanizer-ar-shami/SKILL.md` (25 patterns, 5 categories, 3 regional variants: Syrian/Lebanese/Palestinian)

**Category 1 — Core Structural Failures** (heading line 109)

**SM-SHM-001 — MSA Reversion** (line 116, body 116–140)
- Trigger: full MSA grammar in Levantine text — case-ending vowels, يُريدُ أن / يستطيعُ أن formal conjugation, Classical syntax order, الذي/التي/الذين instead of اللي. Called "the #1 failure," non-regional (applies to all three variants identically).
- Fix: replace entire clause, not word-swap (word-swap alone "produces uncanny hybrid text worse than either original").
- Example (line 137–139): AI: يُريدُ أن يذهبَ إلى المنزلِ الآنَ → Human (Syr/Leb): بدو يروح عالبيت هلق; Human (Pal): بدو يروح عالبيت هلق (same core, add ـش to nearby negated verbs).

**SM-SHM-002 — Missing ب-prefix (Present Tense)** (line 143, body 143–172)
- Trigger: bare imperfect (يشتغل، تاكل، نروح) for present indicative — "single most reliable AI marker in Levantine Arabic verb morphology."
- Full conjugation table (line 150–157): 1sg بـ (بعرف), 2sg.m بتـ (بتعرف), 2sg.f بتـ+ي (بتعرفي), 3sg.m بيـ (بيعرف), 3sg.f بتـ (بتعرف), 1pl منـ (Syr/Leb: منعرف), 2pl بتـ+و (بتعرفو), 3pl بيـ+و (بيعرفو).
- Fix: prefix every present-indicative verb; exceptions after رح (future) and عم (progressive) — no بـ there.
- Example (line 168–170): AI: هي تشتغل كتير وما تنام بوقتها → Human: هي بتشتغل كتير وما بتنام بوقتها

**SM-SHM-003 — Missing عم Progressive Marker** (line 174, body 174–197)
- Trigger: continuous actions described with bare imperfect or with الآن/هلق appended instead of عم.
- Regional note: عم universal; verb takes بـ after عم in Lebanese (عم بياكل) but drops it in some Syrian registers (عم ياكل) — both acceptable.
- Fix: add عم before verb for ongoing/in-progress actions.
- Example (line 192–195): AI: هو يأكل الآن، ما فيك تكلمو → Human (Syr): هو عم ياكل هلق، ما فيك تحكيه هلق; Human (Leb): هو عم بياكل هلأ، ما فيك تحكيه هلق

**SM-SHM-004 — Wrong Future: سوف/سـ instead of رح** (line 199, body 199–218)
- Trigger: سوف or سـ prefix for future — "exclusive MSA future marker... zero ambiguity — it is an AI artifact."
- Fix: replace with رح; remove any بـ prefix from following verb (بare imperfect after رح).
- Example (line 214–216): AI: سأذهب إلى الشغل غداً وسوف أكمل التقرير → Human: رح روح عالشغل بكرا ورح كمّل التقرير

**SM-SHM-005 — Wrong Negation System** (line 220, body 220–255)
- Trigger: لا، لم، لن، ليس (MSA negators) in Levantine context.
- Regional split table:
  - Verbal ما (universal): ما رحت (Syr/Leb) vs. ما رحتش (Palestinian, ـش suffix); ما بعرف (Syr/Leb) vs. ما بعرفش (Pal).
  - Nominal: مش (Syrian/Lebanese: مش كتير، مش هون، مش عارف); مو (Syrian nominal preference: مو هيك، مو صح); مش broader in Lebanese, can negate almost anything.
  - Prohibition: لا retained for direct commands (لا تروح!) in all variants.
- Fix: replace لم+verb with ما+verb(+ـش for Pal); replace ليس/لا يكون nominal with مش (Leb/Syr) or مو (Syrian).
- Example (line 249–253): AI: لم يذهب إلى الاجتماع لأنه ليس متاحاً → Human (Syr): ما راح عاللقاء لأنو مو فاضي (or مش فاضي); Human (Leb): ما راح عاللقاء لأنو مش فاضي; Human (Pal): ما راحش عاللقاء لأنو مش فاضي

**Category 2 — Vocabulary Substitutions** (heading line 257)

**SM-SHM-006 — MSA Question Words and Demonstratives** (line 265, body 265–304)
- Trigger: ماذا، متى، كيف، أين، هذا/هذه/هؤلاء، كم، لماذا.
- Full regional substitution table (line 272–288): ماذا→شو(Syr/Leb)/إيش(Pal); أين→وين (all); كيف→كيف/شلون (all); متى→إيمتا (all); الآن→هلق(Syr)/هلأ(Leb)/هلق(Pal); كثيراً→كتير (all); لماذا→ليش (all); هذا/هذه→هاد/هاي(Syr)/هيدا/هيدي(Leb)/هاد/هاي(Pal); هؤلاء→هدول(Syr)/هيدول(Leb)/هدول(Pal); كم→قديش(Syr)/أديش(Leb)/أديش(Pal); الذي/التي→اللي (all); حتى→لحتى/تا (all); أيضاً→كمان (all); فقط→بس (all); إذا→إذا/لو (all).
- Example (line 300–303): AI: ماذا تريد أن تفعل الآن؟ هذا الأمر يحتاج إلى كثير من الوقت → Human (Syr): شو بدك تعمل هلق؟ هاد الشي بدو كتير وقت; Human (Leb): شو بدك تعمل هلأ؟ هيدا الشي بدو كتير وقت; Human (Pal): إيش بدك تعمل هلق؟ هاد الشي بدو كتير وقت

**SM-SHM-007 — أريد instead of بدّ** (line 307, body 307–343)
- Trigger: أريد، أودّ، أتمنى، أرغب for "I want" — بدّ system "AI almost never produces... spontaneously."
- Full بدّ conjugation table (line 319–326): بدّي (I want), بدّك (you m/f), بدّو (he), بدّها (she), بدّنا (we), بدّكن/بدّكم (you pl), بدّهن/بدّهم (they). Note: verb after بدّ takes bare imperfect (no بـ) — بدّي نام not بدّي بنام.
- Fix: أريد→بدّي، يريد→بدّو، تريد(f)→بدّها، نريد→بدّنا; ensure following verb is bare imperfect.
- Example (line 339–341): AI: أريد أن أنام مبكراً الليلة، وهو يريد أن يذهب إلى السينما → Human: بدّي نام بكير الليلة، وهو بدّو يروح عالسينما

**SM-SHM-008 — MSA Pronouns and Verb Agreement** (line 345, body 345–374)
- Trigger: أنتم، هم، هن and dual forms هما/أنتما; missing -و on 2nd/3rd plural verb agreement.
- Pronoun table (line 352–358): أنتم→انتو (all); هم/هن→هني/هنّ(Syr)/هودي(Leb)/هني(Pal); هما(dual)→collapses into plural form per variant; نحن→نحنا/إحنا(Syr)/نحنا(Leb)/إحنا(Pal); أنا→أنا/انا (all).
- Fix: replace أنتم→انتو، هم/هن→هني(Syr/Pal) or هودي(Leb); remove dual forms; add -و to plural verbs (بتشتغلو، بيروحو، بتاكلو، بتعملو).
- Example (line 370–373): AI: هل أنتم موافقون؟ هم لم يفهموا ما قلته → Human (Syr): انتو موافقين؟ هني ما فهمو شو قلت; Human (Leb): انتو موافقين؟ هودي ما فهمو شو قلت

**SM-SHM-009 — MSA Prepositions (إلى/من instead of عـ)** (line 377, body 377–401)
- Trigger: إلى for motion-to (ذهب إلى البيت); Levantine contracts إلى+definite article into عـ universally.
- Forms: عالبيت، عالشغل، عالمدرسة، عالسوق، عالمستشفى; indefinite less common (عبيت/عشغل); note في البيت acceptable in some formal Levantine writing but not casual.
- Fix: contract إلى+definite noun to عـ+noun in all location/destination phrases.
- Example (line 397–399): AI: ذهب إلى البيت وأكل، ثم عاد إلى المدرسة → Human: راح عالبيت واكل، وبعدين رجع عالمدرسة

**SM-SHM-010 — Active Participle as Present State** (line 403, body 403–439)
- Trigger: conjugated verbs for stative predicates (أنا أعرف، أنا أذهب، أنا أفهم) instead of active-participle forms.
- Participle table (line 411–422): يعرف→عارف/عارفة, يذهب→رايح/رايحة, يجي→جاي/جاية, يمشي→ماشي/ماشية, يشوف→شايف/شايفة, يسمع→سامع/سامعة, يفهم→فاهم/فاهمة, يحب→حابب/حاببة, يخاف→خايف/خايفة, يرفع→رافع/رافعة.
- Fix: identify stative contexts (knowing, location, motion, perception) and replace conjugated verb with gender-agreed participle.
- Example (line 435–437): AI: أنا أعرف هذا الموضوع جيداً وأنا ذاهب إلى هناك الآن → Human: أنا عارف هاد الموضوع منيح وأنا رايح لهونيك هلق

**Category 3 — Discourse and Register** (heading line 441)

**SM-SHM-011 — Missing Discourse Fillers** (line 448, body 448–483)
- Trigger: clean particle-free clause chains.
- Particle table (line 458–469): يعني (universal, "I mean"/hedge), بس (universal, "but/just/only"), هيك (Syr/Pal, "like this/right?"), طبعاً (universal), والله (universal, "honestly/I swear"), يلا (universal), لا2 (universal written "no but actually"), آخ (universal, frustration/longing), بالكيف (Syrian), عنجد (Lebanese-heavy, "seriously"), وبعدين (universal), ما أدري (universal, softer than ما بعرف).
- Fix: add particles by pragmatic need, not mechanically — every 2–3 clauses minimum in informal register.
- Example (line 481–482): AI: هذا الأمر صعب وأحتاج وقتاً للتفكير فيه. لا أعرف ما يجب فعله → Human: يعني هاد الشي صعب، بدّي وقت أفكر فيه بس، والله ما عارف شو لازم أعمل

**SM-SHM-012 — Formal Transition Phrases** (line 486, body 486–515)
- Trigger: من المهم أن نلاحظ، تجدر الإشارة إلى، في هذا السياق، وفي ختام القول، علاوة على ذلك، من ناحية أخرى.
- Regional equivalence table (line 493–500): من ناحية أخرى→بس من ناحية تانية (all); علاوة على ذلك→وكمان/وبعدين (all); في هذا السياق→يعني بهاد/بهيدا الموضوع; من المهم أن→المهم/بدّنا; لذلك/لهذا→مشان هيك(Syr)/لهيك(Leb)/مشان هيك(Pal); بالإضافة إلى ذلك→وزيادة عليه/وكمان; خلاصة القول→يعني بالآخر.
- Fix: replace with paratactic Levantine equivalent; >2 formal transitions per 100 words needs structural rethink, not surface substitution.
- Example (line 512–514): AI: من المهم أن نلاحظ أن هذا الوضع يحتاج إلى معالجة دقيقة. علاوة على ذلك، يجب أن نأخذ في الاعتبار → Human: المهم هاد الوضع بدو معالجة منيحة. وكمان لازم ناخد بعين الاعتبار

**SM-SHM-013 — Uniform Register** (line 518, body 518–542)
- Trigger: flat consistent register throughout with no emotional peaks or register drops; called a universal (cross-variant) discriminator, though Lebanese shows most dramatic swings and Syrian shows warm→dry→funny patterns.
- Fix: introduce deliberate register variation — formal → sudden warmth → pull back → dry observation; use intimate address (حبيبي، والله) after formal passage.
- Example (line 539–541): AI (flat): هذا الموضوع يحتاج إلى اهتمام. يجب أن نتعامل معه بجدية. النتائج ستكون مهمة. → Human (varied): هاد الموضوع بدو اهتمام، بس — والله يا حبيبي — لو تعرف قديش صار يعني. بدّنا نعمل شي. آخ.

**SM-SHM-014 — Heavy Passive Voice** (line 545, body 545–571)
- Trigger: يُعتبَر، يُستخدَم، يُلاحَظ، يُقال، يُفترَض — carried over from AI MSA generation.
- Avoidance strategies given: dropped subject (قالوا إنو...), صار+noun (صار وضع غريب), مفعول-participle stative (الباب مقفول), active with general subject (كل واحد بيستخدم...).
- Fix: convert every morphological passive to one of the above active strategies.
- Example (line 568–570): AI: يُعتبَر هذا الأمر مهماً ويُستخدَم كثيراً في هذا المجال → Human: هاد الشي مهم وكل واحد بيستخدمو بهاد المجال

**SM-SHM-015 — No Reader-Directed Questions** (line 574, body 574–602)
- Trigger: monologic text, no confirmation-seeking questions.
- Table (line 581–589), all-variant convergent set: مش هيك؟، بتفهم؟، يعني؟، شايف/إيش شو قصدي؟، مشان هيك؟/لهيك؟، آه؟، صح؟
- Fix: add 2–3 confirmation questions at natural pause points (after key argument, surprising statement, explanation end) — "2-3 per 200 words is natural."
- Example (line 599–601): AI: هذا النهج أفضل لأنه يوفر الوقت والجهد. النتائج ستكون ممتازة. → Human: هاد الأسلوب أحسن لأنو بيوفر وقت وجهد، بتفهم؟ يعني النتايج رح تكون ممتازة، مش هيك؟

**Category 4 — Code-Switching and Orthography** (heading line 605)

**SM-SHM-016 — Lebanese: Missing French Code-Switching** (line 612, body 612–652)
- Trigger: applies ONLY to Lebanese text; pure Arabic in a dialect described as "one of the most heavily French-influenced dialects in the world."
- Domain table (line 624–635): thanks→merci (vs شكراً "too formal"); greeting→bonjour/bonsoir (vs مرحبا "less marked"); transport→voiture/taxi/ascenseur; clothing→pantalon/chemise/veste; food/drink→café/boulangerie/crêpe; medical→médecin/pharmacie/urgences; housing→appartement/immeuble; driving→permis/parking; problems→problème/stress/tension; centre/mall→centre/mall.
- Frequency stated: ≥3–5 French insertions per 100 words minimum for authentic Beiruti text; heavy speakers 10–15 per 100 words.
- Carve-out: explicitly NOT for Syrian or Palestinian text.
- Example (line 649–651): AI: شكراً جزيلاً على مساعدتك. كانت سيارتك أمام المصعد → Human (Leb): merci كتير! عنجد تعبتو حالكن. كانت الـ voiture أمام الـ ascenseur

**SM-SHM-017 — Syrian/Palestinian: Missing English Code-Switching** (line 655, body 655–691)
- Trigger: formal Arabic tech/work vocabulary (الحاسوب، البريد الإلكتروني، الهاتف المحمول، الاجتماع) where English is natural; applies to Syrian and Palestinian (and Jordanian); Lebanese also code-switches English but French dominates there.
- Domain table (line 665–676): ok/okay (vs حسناً); cool/vibe/mood (vs رائع); sorry (vs آسف); meeting/deadline/update (vs اجتماع، موعد نهائي); DM/message/post/story (vs رسالة، منشور); screenshot/share/follow; email/WhatsApp (vs بريد إلكتروني); wow/omg (vs واو); brunch/dessert (vs إفطار متأخر); cashback/transfer (vs إعادة مبلغ).
- Fix: English for tech/work/digital, Arabic for emotion/family/social.
- Example (line 688–690): AI: أرسل لي رسالة إلكترونية عندما تنتهي من الاجتماع → Human (Syr): بعتلي message أو DM لمّا تخلص من الـ meeting

**SM-SHM-018 — Diacritics Present (Tashkeel)** (line 693, body 693–715)
- Trigger: full/partial tashkeel (fatha, kasra, damma, sukun, tanwin) in non-Quranic, non-pedagogical text — called "one of the strongest single-feature predictors of AI authorship" per stylometric authorship-attribution research cited in the text.
- Carve-out: shadda (ّ) retained, especially on doubled consonants carrying meaning (بدّي, هلّق).
- Fix: strip all diacritics except shadda (mechanical operation).
- Example (line 712–714): AI: يُريدُ أنْ يَذهبَ إلى البَيتِ الآنَ → Human: بدو يروح عالبيت هلق

**SM-SHM-019 — Formal Hamza Writing** (line 718, body 718–748)
- Trigger: precise initial hamza (أنا، إلى، أكل، إنّ، أيضاً) where informal Levantine simplifies/drops it.
- Table (line 727–734): أنا→انا، أكل/يأكل→اكل/ياكل، إلى→ل/عـ (usually contracted anyway), أيضاً→كمان (replaced), أيمتى→ايمتا، إيش→ايش(Pal), إنّ/إنّو→إنو/انو.
- Fix: apply selectively, esp. أنا→انا, يأكل→ياكل, إنّو→انو; don't over-apply — "some words retain hamza even in informal writing."
- Example (line 745–747): AI: أنا أريد أن أكل شيئاً الآن → Human: انا بدّي آكل شي هلق (or: انا بدي ياكل شي هلق in some orthographic registers)

**SM-SHM-020 — ث/ذ Not Phonologically Shifted** (line 751, body 751–779)
- Trigger: MSA interdentals ث/ذ preserved where Levantine speech/informal writing shifts them; explicitly flagged as needing careful/selective application — "over-application produces caricature."
- Shift list (line 759–765): هذا→هاد/هاداك (replacement, not spelling), ثاني→تاني, كذب/كذبة→كدب/كدبة (Syrian ذ→د), ذهب→راح (replacement verb), ثلاثة→تلاتة (very common ث→ت in counting), ذوق→دوق.
- Fix: apply selectively to most-common words only (هذا, ثاني, كذب, تلاتة); do not mechanically shift every ث/ذ.
- Example (line 776–778): AI: هذا الشخص كاذب، وهذا ثاني شخص يفعل هذا → Human: هاد الشخص كدّاب، وهاد تاني شخص عم يعمل هيك

**Category 5 — Cultural and Pragmatic** (heading line 782)

**SM-SHM-021 — Missing Interjections** (line 789, body 789–827)
- Trigger: emotionally flat descriptions with no interjective response — "AI describes; humans react."
- Full interjection table (line 797–812) with regional notes: والله/وبالله (universal), يخرب بيتك (universal affectionate curse), يسلمو/يسلم إيدك (Syrian primary), يعطيك العافية (universal), يا سلام (universal), آخ (universal), ضبي (Palestinian/South Levantine), يا حيوان (Syrian/Lebanese informal), شو هالشي! (Syrian/Lebanese), ما شاء الله (universal), يلعن دينو (universal, moderate), حرام (universal), الله يرحمو (universal, deceased), يا ويلي (universal).
- Fix: add interjection at each emotionally significant beat.
- Example (line 825–826): AI: هذا الطعام لذيذ جداً، ويستحق المدح → Human (Syr): والله يا حبيبي هاد الأكل يسلمو إيدو، آخ ما أحلاه، شو هالشي!

**SM-SHM-022 — Wrong Terms of Address** (line 830, body 830–864)
- Trigger: يا صديقي (formal), يا أخي (somewhat formal), يا سيدي (very formal) — MSA conventions.
- Full address table by relationship/region (line 839–849): general affection→حبيبي/حبيبتي (all); older man→عمو; older woman→عمتي; male peer→يا زلمي/يا زلمة(Syr)/يا زلمي(Leb/Pal); male peer casual→يا عمي; group→يا شباب; girl→يا بنت (Pal adds ضبي); close friend f-f→يا روحي; warm→يا قلبي; professional neutral→يا أستاذ.
- Note: حبيبي used even for strangers in service contexts (waiter, shopkeeper) without romantic implication.
- Fix: replace يا صديقي/يا أخي/يا سيدي with the context-appropriate Levantine term.
- Example (line 861–863): AI: يا صديقي، أنت تعرف أن هذا صحيح → Human: حبيبي، انت عارف إنو هاد صح، مش هيك؟

**SM-SHM-023 — Missing Turkish Loanwords (Syrian)** (line 867, body 867–902)
- Trigger: applies ONLY to Syrian text ("Do not introduce Turkish loans to Lebanese or Palestinian text — they sound foreign there").
- Loan table (line 878–889): oda→أوضة (vs غرفة); fincan→فنجال (vs فنجان); çamaşır→جمشير (archaic, less used now, vs غسيل); tencere→طنجرة (vs وعاء/قدر); boya→بوية (vs صبغة); çizme→جزمة (vs حذاء); yufka→يفكة (vs خبز رقيق); bardak→بردقة (dialectal, vs كأس); çanta→شنطة (vs حقيبة); kahve→قهوة (shared root).
- Fix: apply selectively where the Turkish loan is genuinely the everyday default.
- Example (line 899–901): AI: وضع حقيبته في الغرفة وانتظر → Human (Syr): حط شنطتو بالأوضة وستنّا

**SM-SHM-024 — Uniform Sentence Length Distribution** (line 905, body 905–936)
- Trigger: sentences hover 15–25 words, no fragments, no 60+-word paratactic run-ons — Levantine text is described as "particularly extreme" in natural variation due to paratactic structure.
- Required range: ultra-short (1–4 words: بدّك؟ ليش؟ مش هيك؟ والله؟ يعني...), short (5–10), medium (11–20), long paratactic chains (30–60+ words linked by وبعدين/بس/ويلا).
- Fix: deliberately fragment some sentences; deliberately merge others into long chains; range 3 to 50+ words across the text.
- Example (line 932–935): AI: ذهبت إلى السوق اليوم واشتريت بعض الأشياء. كان الطقس جميلاً وكنت سعيداً بتجربتي. → Human: رحت عالسوق اليوم. والله. اشتريت أشياء وبعدين الجو كان منيح وكنت مبسوط وبعدين رجعت عالبيت وأكلت وناميت. بس هيك.

**SM-SHM-025 — Consistent Spelling of Variable Words** (line 939, body 939–976)
- Trigger: AI always spells the same word identically throughout — described as absence of any prescriptive dialect orthography being the "correct" state, so perfect consistency is itself the AI artifact.
- Variation table (line 951–961): هلق/هلأ (both widely used), هني/هنّي/هنّ (Syrian), هاد/هادا, هيدا (Lebanese, "minor variation" — source lists هيدا/هيدا, likely a duplication artifact, see §11), ما (spacing variation), بدّي/بدي (shadda dropped), معي/معي/مي (source lists near-identical entries, see §11), كيف/كيف (identical, no real variant shown), هونيك/هونيك/هون, بس/بس (identical, spacing note only).
- Fix: introduce 1–2 deliberate variations per document (not more).
- Example (line 974–976): AI: هو هني هلق. هني بيشتغلو هلق. ما بعرف وين هني. → Human: هو هني هلق. هنّ عم يشتغلو هلأ. ما بعرف وينن.

---

## 4. Shared/common rules across the three Arabic varieties

Verbatim-shared (not paraphrase):
- **Frontmatter template** — identical structure and boilerplate across all four skills (`allowed-tools: Read, Write, Edit, AskUserQuestion`; `based-on: blader/humanizer`; `source: https://github.com/blader/humanizer`).
- **Three-stage workflow** — "Identify → Rewrite → Audit/Polish" appears in all three Arabic skills as the named stage structure (MSA: "Processing Workflow" §474; Egyptian: "Processing Workflow" §584; Levantine: "Processing Workflow" §980, renamed "Stage 1 — Regional Identification and Diagnosis" but same 3-stage shape).
- **50-point / 5-dimension quality rubric** — all three Arabic skills score exactly 5 dimensions × 10 points = 50 total, with near-identical score-band language ("Excellent/Ready for publication" top band, "Rewrite Required/fundamental restructuring" bottom band). Dimension *names* differ (MSA: Directness, Rhythm, Authenticity, Density, Rhetoric; Egyptian: Authenticity, Register, Rhythm, Particles, Code-Switching; Levantine: Dialect Authenticity, Verb System, Code-Switching, Discourse Flow, Emotional Texture) — this is paraphrase/re-templating of a shared rubric shape, not verbatim reuse.
- **Formal-opener/closer critique pattern** — all three flag formulaic MSA discourse markers (hedging opener, formulaic conclusion) as AI tells; the specific phrase lists overlap heavily:
  - علاوة على ذلك flagged in MSA (SM-MSA-003, critical) and again in Levantine (SM-SHM-012, as one item in a longer "formal transitions" list) — same phrase, different severity framing (MSA treats it as the single strongest AI signature; Levantine treats it as one of six formal transitions to paratactic-ize).
  - من المهم أن نلاحظ / من المهم الإشارة إلى / تجدر الإشارة إلى appear as hedge/formal-opener tells in MSA (SM-MSA-001, SM-MSA-008), Egyptian (SM-EGT-011), and Levantine (SM-SHM-012) — same underlying MSA phrase family, each skill supplies its own dialect-specific replacement.
  - يُعتبر / يُستخدم / يُلاحظ passive-voice family flagged as an AI tell in all three: MSA (SM-MSA-026), Egyptian (SM-EGT-008), Levantine (SM-SHM-014) — consistent claim that formal Arabic morphological passive is a cross-dialect AI marker.
  - سوف/سـ future-tense marker flagged as wrong in Egyptian (SM-EGT-003) and Levantine (SM-SHM-004) — near-identical fix (replace with dialect حـ/هـ or رح, drop following بـ prefix); MSA does not flag this (سـ/سوف is correct MSA future).
  - لا/لم/لن/ليس negation family flagged as MSA-tell in Egyptian (SM-EGT-007) and Levantine (SM-SHM-005) — Egyptian and Levantine give different dialect negation systems (ما...ش vs. tripartite ما/مش/مو) but the same underlying complaint about MSA negators leaking into dialect text.
  - Sentence-length/register uniformity flagged as an AI marker in all three (MSA Pattern 13, Egyptian Pattern 10, Levantine Pattern 24) — each cites slightly different stated thresholds (MSA: std-dev <6 words, 15–22 word AI band; Egyptian: 12–20 word band; Levantine: 15–25 word band, extended paratactic-chain framing) — same claim, independently worded, not verbatim reuse.
- **Egyptian-vs-Levantine relationship**: the Egyptian skill's negation table (ما+verb+ش, مش, مفيش) and the Levantine skill's Palestinian-variant negation (ما+verb+ش) describe the same circumfix ماـش negation pattern; the two skills present it independently (no shared text), and Levantine explicitly scopes ـش to the Palestinian/South-Levantine variant only, while Egyptian treats it as universal Egyptian.
- No literal cross-file copy-paste of full paragraphs was found; overlaps are at the level of which AI-tell phrases are targeted and the general claims about MSA leakage, not shared prose.

---

## 5. Dialect marker words used to characterize each variety

**Egyptian** (`humanizer-ar-egt/SKILL.md`):
- Core deictic/lexical set given in the philosophy section (line 50): يعني, بقى, خلاص, ماشي, يا سلام.
- Full MSA→Egyptian substitution table (line 80–100) doubles as the marker-word list: دلوقتي، عايز/عايزة، روح، أشوف، ده، دي، دول، إيه، ازاي، كده، أيوه، أوي، كمان، بس، وبعدين، بعدين، طول الوقت.
- Discourse particles (Pattern 9, line 241–248): يعني، بقى، خلاص، ماشي، طب، يا سلام، والله، زي مثلاً.
- README summary (line 104) independently lists: الآن → دلوقتي, أريد → عايز as the flagship examples.
- The task prompt's example set (مش، ده، دي، إزاي، عشان) is fully attested in-file: مش (Pattern 7, negation, line 210), ده/دي (Pattern 5/1, demonstratives), إزاي is attested as ازاي (Pattern 1 substitution table, line 90, and Pattern 23 spelling-variation list, line 441: إزاي/ازاي), عشان (Pattern 14, line 345–354).

**Levantine** (`humanizer-ar-shami/SKILL.md`):
- Cross-regional core vocabulary (Philosophy section, line 42): شو (not ماذا), بدّ (not أريد), هلق (not الآن), رايح (not ذاهب).
- Pattern 6 table (line 272–288) gives the fullest marker-word inventory, per region: شو/إيش (what), وين (where), كيف/شلون (how), إيمتا (when), هلق/هلأ (now), كتير (a lot), ليش (why), هاد/هيدا (this), هدول/هيدول (these), قديش/أديش (how much), اللي (who/which).
- The task prompt's example set (شو، هيك، هلق) is fully attested: شو (Pattern 6), هيك (Pattern 11 discourse-filler table, line 460, tagged Syr/Pal), هلق (Pattern 6 table, tagged Syrian spelling vs. هلأ Lebanese).
- Region-specific badge words used to auto-detect variant (line 94–97, "When Variant Is Unclear"): هيدا → Lebanese; إيش or ما...ش → Palestinian; يسلمو or هدول → Syrian.

**MSA leakage / "avoid MSA in dialect" guidance:**
- Egyptian: the entire Category 1 ("Register Collapse — AI Defaults to MSA," line 66) is dedicated to this; explicit statement (line 30): "the model reaches for MSA vocabulary, MSA grammar, MSA word order, and MSA discourse patterns... A Cairo native reads two sentences and says مش مصري ده." Stage-3 audit checklist (line 659–667) is an explicit "no MSA leakage" checklist (أوي not جداً, عشان not لأن/لكي, مش not ليس/لا, دلوقتي not الآن, ده/دي/دول not هذا/هذه/هؤلاء, no tanwin, حـ/هـ future not سـ/سوف, بـ-prefixed present).
- Levantine: Category 1 is literally titled "Core Structural Failures" and Pattern 1 is named "MSA Reversion" (line 116) — described as "the #1 failure... non-regional... the AI's baseline failure mode regardless of which variant was requested." Stage-3 audit (line 1041–1048) lists "MSA vocabulary leaks" as the first named residual-failure category, and the Quick Reference Card's "Non-negotiable fixes" (line 1236–1242) is essentially an MSA-purge checklist.
- MSA skill itself has no "avoid MSA" guidance (it targets MSA directly), but does warn against *over-formalization within MSA* (Pattern 8) and against writing *dialogue* in formal MSA when a dialect would be natural (Pattern 25, line 417) — the MSA file's own "human" example for Pattern 25 (line 427) slips into Egyptian-flavored colloquial (مش تمام) inside dialogue, which is the MSA skill's own acknowledgment that dialect ≠ MSA even in an MSA-focused document.

---

## 6. Typography / punctuation / digit conventions

None of the three Arabic files contain an explicit, dedicated section on Arabic punctuation marks (، ؛ ؟) or on Arabic-Indic vs. Western digit usage — this topic is **not addressed** as a standalone convention anywhere in the three files. What is present:

- **Tashkeel/diacritics** is the one typographic dimension treated at length, but only for MSA and Levantine:
  - MSA Category 5 ("Diacritics & Morphological Patterns," line 380) — two full patterns (SM-MSA-023, SM-MSA-024) on diacritic consistency and grammatical-case placement; treats diacritics as a legitimate, genre-gated stylistic choice (undiacritized modern prose vs. fully diacritized religious/classical/pedagogical text).
  - Levantine Pattern 18 (SM-SHM-018, line 693) treats tashkeel presence itself as an AI tell in casual dialect text and prescribes wholesale stripping except shadda (ّ), citing (unattributed) "stylometric" authorship-attribution research.
  - Egyptian does not address tashkeel at all as a category, though its "Tanwin and Case Endings" pattern (SM-EGT-002) is functionally the same complaint (case-vowel/tanwin marks are an MSA-only feature that must be stripped from Egyptian text).
- **Arabic-specific punctuation glyphs** (، ؛ ؟, « »): not mentioned in any of the three files. The Arabic question mark ؟ is used constantly as a literal character in examples (e.g., MSA Pattern 21 discussion) but the files never discuss it as a stylistic/typographic rule to teach.
- **Arabic-Indic vs. Western digits**: not addressed in any of the three files.
- **Letter lengthening for emphasis** (Egyptian Pattern 19, SM-EGT-019) and **laughter-letter convention** (Egyptian Pattern 20, SM-EGT-020) are the closest things to an orthographic-convention section outside diacritics, but they are dialect-specific informal-writing conventions, not formal typography rules.
- **Markdown formatting** (MSA Pattern 16, SM-MSA-016) is treated as a typographic AI-tell (bold/headers/rules inappropriate in Arabic prose) but is about markup, not Arabic script punctuation.

**Gap flag:** the task's expected checklist item (Arabic comma ،, semicolon ؛, question mark ؟, guillemets « », Arabic-Indic vs Western digits) is **not covered** by the source material at all, beyond the diacritics/tashkeel material summarized above. Anyone building a downstream skill on this inventory should treat Arabic punctuation/digit conventions as an unaddressed gap in the upstream source, not something to carry forward from it.

---

## 7. Workflow, modes, output format prescribed by the skills

All three Arabic skills prescribe the same three-stage shape, with dialect-specific detail:

**MSA** ("Processing Workflow," line 474–521):
1. Stage 1 — Identify: read full text without changes, assign preliminary Quality Rubric score (baseline), mark every pattern instance + severity (minor/significant/critical), identify audience/genre/purpose/intentional stylistic choices, note what already works. Three patterns are marked "Critical patterns that must always be addressed" (SM-MSA-003, SM-MSA-006, SM-MSA-013).
2. Stage 2 — Rewrite: paragraph by paragraph; principles: preserve meaning, preserve what works, prioritize impact (critical→sentence-length→hedging→passive→rhetoric order), match register, "Arabic first" (don't translate-through-English-syntax).
3. Stage 3 — Audit & Polish: "would I suspect this is AI?" test; explicit re-checks for saj' (SM-MSA-018), rhetorical questions (SM-MSA-021), figurative language (SM-MSA-019), sentence-length variation (SM-MSA-013); re-score against Stage-1 baseline, require ≥10-point improvement; read aloud (mentally) for flow.
- Also has a **Voice Calibration** sub-workflow (line 523–544): sample analysis (register, sentence architecture, rhetorical style, signature phrases, cultural grounding, rhythm) → calibration → consistency check against original sample.
- Output format: not machine-specified (no JSON/schema); implied deliverable is rewritten Arabic text plus the Quality Rubric score.

**Egyptian** ("Processing Workflow," line 584–839):
1. Stage 1 — Identify: full read; itemized scan lists by category (vocabulary/structure/register/code-switching-orthography/pragmatic — line 590–622).
2. Stage 2 — Rewrite: an explicit **20-step numbered priority order** (line 628–649) — from MSA vocabulary substitution through diversifying vocabulary.
3. Stage 3 — Audit and Polish: single test question "Would a Cairo native read this without flinching?" plus a 4-part checklist (lexicon/structure/voice/rhythm, line 657–684).
- Also has **Voice Calibration by register tier** (line 690–727): Ultra-Casual / Casual-Conversational / Informal-Professional / Semi-Formal Egyptian, each with explicit rules on code-switching intensity, letter lengthening, particle density.
- **Explicit "Execution Instructions"** section (line 818–837) — the only one of the three Arabic files to give a numbered, agent-facing procedure: (1) read input first, (2) identify register/context, (3) run Stage 1 against all 25 patterns, (4) declare patterns found before rewriting, (5) run Stage 2, (6) run Stage 3, (7) output humanized text, (8) score with 50-point rubric, (9) explain the 2–3 most impactful changes. Also prescribes using `AskUserQuestion` for context/audience/preserve-terms questions, with an explicit "don't ask what's inferable" constraint.

**Levantine** ("Processing Workflow," line 980–1062):
1. Stage 1 — Regional Identification and Diagnosis: 4 numbered steps — (1) identify regional variant via marker-word scan, ask if unclear; (2) run Category-1 diagnostic, count failures, ">5 Category 1 failures per 100 words → deeply MSA, plan full rewrite not surface edits"; (3) check code-switching (French count for Lebanese, English presence for Syr/Pal); (4) check orthography (tashkeel, hamza, ث/ذ).
2. Stage 2 — Systematic Rewrite: 6-step priority order (verb system → vocabulary → code-switching → discourse particles → cultural texture → orthographic cleanup).
3. Stage 3 — Audit and Polish: "native speaker test" read-aloud-in-head per sentence; lists 6 common residual failures; 8-question "authenticity questions" checklist (line 1050–1058) that must all be "yes" before scoring.
- **Voice Calibration**: Formal-Casual Continuum (4 tiers: Ultra-casual/Casual written/Semi-formal/Formal Levantine, line 1071–1089) plus an **Emotional Register Mapping table** (line 1093–1101) mapping 7 emotions to Levantine marker phrases.
- **Quick Reference Card** (line 1224–1247): 7-step agent procedure (ask variant → ask register → run Stage-1 diagnostic → apply Stage-2 in order → run Stage-3 8-question audit → score 5 dimensions → report original+rewrite+scores+key changes) plus "Non-negotiable fixes" and "Regional non-negotiables" bullet lists.

Common output contract across all three (implied, not schema-enforced): rewritten Arabic text + a 50-point rubric score breakdown + a short list of the most impactful changes made. None of the three files specifies a machine-readable output format (no JSON schema, no fixed section headers for the reply) — the "format" is prose instructions to the agent, not a template for the final answer to the end user.

---

## 8. Statistics, research citations, benchmark/marketing claims (exhaustive — must NOT carry into final skill unsourced)

These are prose claims presented as fact/finding, with no citation, DOI, dataset name, or methodology given anywhere in the repo (no `references/`, `bibliography`, or footnote apparatus exists in the source). Flag = **UNSOURCED** unless noted otherwise.

1. **README, line 15**: "Levantine AI text scores **1.3 BLEU** on generation benchmarks — a 17x gap from the reverse direction." — UNSOURCED (no paper cited, no benchmark name given).
2. **README, line 100** (MSA skill highlight): "AI uses syntactic templates 95% of the time. Human Arabic writers: 38%." — UNSOURCED, presented as a blockquote "finding."
3. **README, line 106** (Egyptian skill highlight): "AI almost never produces the Egyptian circumfix negation pattern `ما...ش`. Its absence is one of the strongest AI tells in colloquial Arabic." — UNSOURCED qualitative claim, no frequency data given.
4. **README, line 112** (Levantine skill highlight): "Research benchmark: LLMs score 1.3 BLEU generating Levantine Arabic — versus 23 BLEU on the reverse direction." — Same claim as #1, repeated; UNSOURCED, no benchmark/paper name, dataset, or model list given anywhere.
5. **Levantine SKILL.md, lines 24–27** (Philosophy): Restates the 1.3 BLEU vs 23 BLEU claim as "The research finding is stark," calling it a "17x performance differential" — again UNSOURCED, no citation.
6. **Levantine SKILL.md, line 45**: "Turkish substrate — 3,000+ Turkish borrowings in Syrian Arabic alone" — UNSOURCED specific count, no source given (Pattern 23 body, line 867 area, repeats the claim implicitly via its loanword table but does not re-cite the 3,000 figure).
7. **Levantine SKILL.md, lines 471–472** (Pattern 11, discourse fillers): "Stylometric research on Arabic text shows that discourse particle frequency and distribution is one of the strongest human/AI discriminators." — UNSOURCED ("research" invoked with no name/link).
8. **Levantine SKILL.md, lines 528–529** (Pattern 13, uniform register): "Stylometric research on human Arabic text confirms that 'formal tone consistency' — uniform register across a text — is a primary AI authorship marker." — UNSOURCED.
9. **Levantine SKILL.md, lines 703–705** (Pattern 18, tashkeel): "Studies on Arabic authorship attribution show that the presence of tashkeel in non-religious text is one of the strongest single-feature predictors of AI authorship." — UNSOURCED ("studies" invoked with no name/link).
10. **Levantine SKILL.md, lines 923–924** (Pattern 24, sentence length): "Sentence length uniformity is one of the most robust machine-learning features for AI text detection in Arabic." — UNSOURCED.
11. **MSA SKILL.md, line 226** (Pattern 13): "Human MSA text shows variance above 40% of the mean sentence length. AI text clusters sentences in the 15–22 word range." — UNSOURCED specific statistical thresholds.
12. **MSA SKILL.md, line 164** (Pattern 9): "Count conjunctions-per-sentence average: above 3.5 per sentence across a paragraph signals AI writing." — UNSOURCED specific numeric threshold.
13. **MSA SKILL.md, line 40** (Category 1 intro): "AI hedges at three to four times the human rate." — UNSOURCED numeric claim.
14. **Egyptian SKILL.md, line 16**: "Egyptian Arabic (Masri) is the only Arabic dialect that is understood — passively at minimum — by virtually all Arabic speakers across all 22 Arab countries. That means this skill serves over 400 million Arabic speakers." — the "22 Arab countries" and "400 million speakers" figures are plausible-magnitude demographic claims but UNSOURCED in-file (no citation to Arab League population data or similar).
15. **README, line 15** and **README general framing**: "Modern Standard Arabic AI text reads like a government report... Hebrew AI text gets the gender wrong and calls it done" — marketing/rhetorical framing, not a statistic, but stated as fact rather than opinion.
16. **README, lines 120–129** ("Related skills"): claims `blader/humanizer` has "12.9k stars" — this is a checkable GitHub-star claim, unsourced/undated in-file (star counts drift; no retrieval date given). Not independently verified as part of this inventory (out of scope — no network fetch performed).
17. Multiple **numeric detection thresholds** presented as authoritative without methodology across all three files (e.g., MSA "more than three تم/يتم constructions per 300 words," Egyptian "12-20 word range" AI band, Levantine ">5 Category 1 failures per 100 words → deeply MSA") — these read as heuristic authoring guidance dressed as measured statistics; none cite a corpus, sample size, or measurement method.

**Summary for downstream use:** every quantitative or research-flavored claim in this repository (BLEU scores, percentage rates, word-count thresholds, "22 countries / 400 million speakers," "3,000+ Turkish borrowings," GitHub star count) is asserted without citation. None should be reproduced as fact in a rebuilt skill; if retained at all, they should be reframed as unverified author claims or dropped.

---

## 9. Per-variety pattern counts and total

| Variety | File | Categories | Patterns claimed (README table) | Patterns actually enumerated in-file |
|---|---|---:|---:|---:|
| MSA | `skills/humanizer-ar-msa/SKILL.md` | 5 | 28 | 28 (SM-MSA-001…028) — matches |
| Egyptian | `skills/humanizer-ar-egt/SKILL.md` | 5 | 25 | 25 (SM-EGT-001…025) — matches |
| Levantine | `skills/humanizer-ar-shami/SKILL.md` | 5 | 25 | 25 (SM-SHM-001…025) — matches |
| **Arabic total** | — | 15 category-instances | **78** | **78** |
| Hebrew (out of scope) | `skills/humanizer-he/SKILL.md` | not counted | 35 (README table only) | not verified — out of scope |

All three Arabic README-claimed counts (28/25/25) were independently verified against the in-file numbered pattern headings during this read; no discrepancy found.

---

## 10. Surprises / discrepancies vs. expectations

Expectation given: "Arabic patterns: MSA (humanizer-ar-msa), Egyptian (humanizer-ar-egt), Levantine (humanizer-ar-shami)."

- **Matches expectation structurally** — exactly these three skill directories exist, each maps 1:1 to the named dialect, and each is a single `SKILL.md` file (no sub-files, no separate pattern-data files, no external reference docs bundled per skill).
- **Fourth skill present but out of scope**: the repo also ships `humanizer-he` (Modern Hebrew, 727 lines, 35 patterns per README) as an equal sibling in the same package/plugin — not mentioned in the task's expectation list, confirmed present and correctly excluded from detailed inventory here.
- **The three Arabic skills are NOT mutually exclusive/independent in content** — despite being marketed as "four independent skills," the Egyptian and Levantine skills both explicitly define themselves *in opposition to MSA* and both reuse MSA-tell vocabulary lists that substantially overlap with the MSA skill's own patterns (see §4). A reader could reasonably expect three orthogonal skills; in practice they share a large common "MSA is the enemy" scaffold with dialect-specific vocabulary substituted in.
- **Levantine is a compound skill, not one dialect** — despite the README selling it as a single "Levantine Arabic" skill, the file internally defines and constantly branches on three regional sub-variants (Syrian/Lebanese/Palestinian) with materially different grammar, vocabulary, and code-switching-language rules (French for Lebanese vs. English for Syrian/Palestinian). This is more like three sub-skills fused into one file than a single dialect skill; a downstream implementer should decide whether to keep this fusion or split it.
- **Inconsistent regional scoping enforcement language**: some patterns are marked strictly single-variant ("applies ONLY to Lebanese," SM-SHM-016; "Syrian Arabic only... sound foreign there [in other variants]," SM-SHM-023) while others are asserted universal across all three variants with only cosmetic per-region spelling differences (SM-SHM-002, SM-SHM-006, etc.) — the file is internally consistent about this, but a downstream reader must track a per-pattern regional-scope flag, which none of the three quality rubrics enforce structurally (the rubric just says "Dialect Authenticity 9-10: correct regional variant applied throughout" without a checklist tied to individual patterns).
- **MSA skill's own Pattern 25 example breaks its own register rule**: the "Human" fix example for Overgeneralization of Formal MSA (line 427) uses مش تمام, an Egyptian/broadly-colloquial negation form, inside a skill whose entire premise is "these are formal MSA text edits." This is either a deliberate illustration that dialogue-in-MSA-prose should drop to colloquial, or an unflagged inconsistency — worth a native-speaker check.
- **Two visible data artifacts inside the source itself** (not full errors, but worth flagging — see §11) suggest the source content was itself partly AI-generated or not fully copy-edited: Egyptian Pattern 18's spelling-variation table lists هيعمل three times identically as "variants" (line 440), and Egyptian Pattern 17's Arabizi example mixes scripts mid-word (`ya man mesh 3aref aعمل إيه`, line 424). Levantine Pattern 25's variation table similarly lists apparently-identical pairs (هيدا/هيدا line 956; معي/معي/مي line 959; كيف/كيف line 960; هونيك/هونيك line 961; بس/بس line 962) as if they were meaningfully different spellings.
- **No shared "core"/"common" file or cross-reference mechanism** exists between the three Arabic skills or the four skills generally — despite heavy conceptual overlap (see §4), there is no shared config, shared vocabulary table, or `common.md`; each skill re-derives its MSA-vs-dialect framing independently, which is why the overlaps documented in §4 are similar-but-reworded rather than literally shared text.
- **Package/plugin metadata is consistent** — `package.json` and `.claude-plugin/plugin.json` agree on the four skills and their paths; no discrepancy found there.

---

## 11. Confidence notes (seed for native-speaker review)

Flagging items that look potentially machine-generated, internally inconsistent, or non-native even without native fluency, based on internal textual evidence (repetition, script-mixing, self-contradiction):

1. **Egyptian Pattern 17 (Arabizi) example, line 424**: `ya man mesh 3aref aعمل إيه` — mixes Latin and Arabic script mid-phrase inconsistently (starts in Arabizi, "aعمل" appears to be a stray/malformed token mixing a Latin "a" directly onto the Arabic word عمل, missing the expected `a3mal eih`-style full transliteration). This reads as a copy-paste or generation artifact rather than a deliberate style choice, since the whole point of the pattern is showing *consistent* Arabizi vs. Arabic-script AI output.
2. **Egyptian Pattern 18 (Perfect Orthographic Consistency), line 440**: the "variant spellings" table lists `هيعمل / هيعمل / هيعمل` — three visually identical strings offered as three spelling variants. Either a rendering/encoding issue (invisible character differences) or a straightforward authoring error; needs a byte-level diff by a native reader/editor to confirm whether any subtle Unicode variation (e.g., different hamza presentation forms) was intended.
3. **Levantine Pattern 25 (Consistent Spelling), lines 956–962**: several "variant spelling" pairs are listed as identical strings: `هيدا / هيدا` (line 956, labeled "Minor variation"), `معي / معي / مي` (line 959, two identical plus one clearly different word), `كيف / كيف` (line 960), `هونيك / هونيك` (line 961), `بس / بس` (line 962, labeled "Identical, but note spacing habits"). Some of these may be intentional (documenting that spacing/invisible-character variation exists even when the visible glyph string looks the same), but as written they read as low-quality filler rows rather than substantiated dialectal variation, and should be re-verified against real corpora rather than reused as-is.
4. **MSA Pattern 25 example, line 427**: "لازم نراجع طريقة إدارتنا للفريق — الوضع مش تمام" as the "human" MSA-context dialogue fix uses مش, a colloquial (Egyptian-leaning, also generally Levantine/Gulf-adjacent) negator, not a Levantine or Egyptian-labeled example — the skill doesn't specify which dialect the dialogue is supposed to represent, so a native reviewer should judge whether this reads as an unmarked colloquial blend or as specifically Egyptian-flavored, either of which is a mismatch for a "generic dialogue in an MSA piece" illustration.
5. **Broad "23 BLEU reverse direction" and "1.3 BLEU generation" figures** (README lines 15, 112; Levantine lines 25–26): repeated verbatim/near-verbatim across README and the Levantine skill with zero citation. Even without Arabic fluency, this is a red flag pattern typical of AI-generated marketing copy (a specific-sounding number with no source, reused for emphasis). A native/domain reviewer fluent in Arabic NLP literature should check whether any real benchmark produces these exact figures before this claim is allowed anywhere near the rebuilt skill.
6. **General density of unfalsifiable "X is a strong AI-detection signal" claims** attributed to unnamed "research," "studies," or "stylometric analysis" (see full list in §8, items 7–10) — this rhetorical pattern (confident, uncited, stylometric-sounding claims) recurs enough times across the Levantine file specifically that it reads as authorial-voice padding rather than grounded citation, and should not be trusted as fact without independent verification.
7. **Vocabulary/example quality otherwise appears internally coherent** — aside from the specific artifacts above, the bulk of the Arabic examples (hundreds of before/after sentence pairs across all three files) are grammatically well-formed Arabic as far as script-level inspection can confirm, and the regional-variant tables (Syrian/Lebanese/Palestinian pronoun/negation/question-word splits) are internally consistent across the file — these are lower-priority for native review than items 1–6 above, but a full linguistic accuracy pass (are the claimed regional splits actually correct sociolinguistically?) was not performed as part of this inventory and would need native speakers per dialect.

---

*End of inventory. This document reflects a full read of README.md, package.json, .claude-plugin/plugin.json, and all three Arabic SKILL.md files at commit `2c9d4fbe3e0086d373b59bfebc9556082275cf62`. Hebrew skill content was intentionally not inventoried beyond its frontmatter and line count, per task scope.*
