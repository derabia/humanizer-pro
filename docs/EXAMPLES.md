# Installation and usage examples | أمثلة التثبيت والاستخدام

Every before/after pair, score, and command output in this file is real: it
either comes from a file already committed in this repository
(`evals/`, `skills/humanizer-pro/references/`) or from a command that was
actually run against this checkout while writing this page. Nothing here is
invented. Where a variety did not have two clean rewrite pairs in
`evals/runs/iteration-1/`, this file says so and uses the nearest real
example instead of manufacturing one.

## What the skill does, and what it never does

`humanizer-pro` is a Claude skill (and a standalone CLI) that removes
AI-writing tells from a document: the hedge stacks, the formulaic
transitions, the forced triads, the passive-voice overload in Arabic, all
while keeping every fact, number, name, and structural element the source
actually contains. It works in four modes (`detect`, `rewrite`, `edit`, plus
an `seo` modifier) across English and three Arabic varieties: فصحى (Modern
Standard Arabic), مصري (Egyptian), and شامي (Levantine, experimental).

It never invents facts, quotes, statistics, sources, or personal experience
to make a text read as more human, and it never pads thin content with
specifics the source did not provide. If a request amounts to "make this
pass a detector," the skill says so and stops instead of complying.

**A detector score is a review signal, not an authorship claim.** Every
report from `detect.js` carries that line verbatim, and every `--json`
result carries `authorshipClaim: false` and
`calibration: "uncalibrated-review-signal"`. A low score is not proof a
human wrote the text; a high score is not proof an AI did. Treat every
number in this file the same way: as a signal a reviewer should weigh, not
a verdict.

## How to read the examples

**Score scale.** The Arabic engine defines a three-way label:

| score | label |
|---|---|
| 0 to 24 | `HUMAN` |
| 25 to 54 | `MIXED` |
| 55 to 100 | `AI` |

The English engine does not use `HUMAN`/`MIXED`/`AI`. Its `label` field is a
descriptive band instead, the exact wording from
`skills/humanizer-pro/scripts/README.md` is: `Clean`, `Minimal AI signals`,
`Some AI patterns`, and further bands up to a clearly-AI reading, with a
separate `document_classification` field of `HUMAN_ONLY` / `MIXED` /
`AI_ONLY` alongside `class_probabilities`. Every English example below shows
the label string the engine actually printed.

**Where every score came from.** Every score quoted in this file was
produced by running

```
node skills/humanizer-pro/scripts/detect.js <file> --markdown
```

(or its `--json` form, or `validate.js`, when a check compares two files),
never estimated, never rounded for effect. The eval id next to each pair
names the exact run under `evals/runs/iteration-1/<id>/` where the
`scores-before.json` / `scores-after.json` / `validate.txt` backing that
number lives, so any claim here can be checked against a file already in
the repo.

---

## English

The English engine (`skills/humanizer-pro/scripts/lib/en-detector/`) looks
for the vocabulary and structural tells catalogued in
`skills/humanizer-pro/references/en-patterns.md`. Four patterns that recur
across the examples below:

- **EN-001: Not-X-but-Y contrast**: "It isn't just a note-taking app —
  it's a statement about how knowledge workers should think."
- **EN-002: One-line closers and dramatic fragments**: a sentence like
  "Let that sink in." standing alone as its own paragraph beat.
- **EN-030: Transition phrases to remove or rewrite**: `Furthermore`,
  `Moreover`, `In addition` opening consecutive sentences.
- **EN-036: Excessive structure and bullet-list overload**: a flat list of
  bare noun phrases used in place of prose.

### Example 1: rewrite (`en-rewrite-01`)

Prompt: *"Humanize this blog draft about our onboarding checklist module.
Here's a sample of how I actually write, match my voice: [see voice
sample]."*

Before (`evals/inputs/en-rewrite-01.md`), score **8/100** ("Minimal AI
signals"):

```text
Great question about onboarding checklists — let's dig into why they matter
more than most teams realize.

Basecraft's new onboarding module might possibly help teams who are
potentially struggling with inconsistent ramp-up times, though results
could vary depending on team size, role complexity, and how well existing
documentation is maintained.
```

After (`evals/runs/iteration-1/en-rewrite-01/rewritten.md`), score **5/100**
("Minimal AI signals"):

```text
New-hire onboarding isn't paperwork. It's the difference between a new hire
finding their footing in two weeks or two months.

Basecraft's onboarding module is built for that gap. Ramp-up time varies by
team size and role complexity, and by how good the existing documentation
is, and the module keeps onboarding consistent regardless.
```

Patterns addressed: the recap-flattery opener quoted in the "Before" block
above and the triple-hedge sentence right after it (see the quoted excerpt)
are both gone; the 8-item bare-noun-phrase bullet list (`EN-036`) was
intentionally left as a bullet list, since the source content really is a
flat feature list and the grader's own note says not to invent a metric to
dress it up. The "fewer missed steps" line stayed qualitative: no invented
percentage was added.

### Example 2: edit in place (`en-edit-01`)

Prompt: *"Can you clean up the AI-sounding paragraph in this deploy doc?
Edit the file in place, don't touch the script or the table."*

Before, the one paragraph in scope, score **5/100**:

```text
Furthermore, it is worth noting that a robust and seamless deployment
process is essential for any modern engineering organization, and teams
that invest in this foundational capability position themselves for
long-term success across every dimension of the software lifecycle.
```

After, score **0/100**:

```text
A deploy process teams can trust matters here specifically. It's why we
didn't special-case any of these tools, and why the pipeline below looks
the same for all of them.
```

Patterns addressed: `EN-030` (the stacked transition-word opener quoted in
the "Before" block above) and the tier-1 AI-vocabulary cluster it carries
alongside it (see the same quoted excerpt). The bash code fence and the
environment-comparison table around this paragraph were left byte-for-byte
untouched, which
`node skills/humanizer-pro/scripts/validate.js evals/runs/iteration-1/en-edit-01/input.md evals/runs/iteration-1/en-edit-01/edited.md`
confirms: `code-blocks: unchanged`, `table-cells: unchanged`,
`detector-score: Detector score did not worsen: 5 → 0`.

---

## Modern Standard Arabic (الفصحى)

The Arabic engine's shared and MSA-specific pattern files
(`references/ar-shared.md`, `references/ar-msa.md`) define the patterns
below, all of which fire on the examples in this section:

- **AR-SH-001: Hedging Overload | التحوّط المفرط**: stacked hedges such as
  `من المهم الإشارة إلى`، `تجدر الإشارة إلى`.
- **AR-MSA-002: Clichéd Opening Phrases | افتتاحيات مستهلكة**: a scene-setting
  opener like `في ظل التطورات المتسارعة` that fits almost any topic.
- **AR-MSA-005: Formulaic Conclusion Phrases | خواتيم نمطية**: the
  `وفي الختام، آمل أن يكون...` closing ritual.
- **AR-MSA-006: Passive Voice تم/يتم Overuse | فرط استخدام "تمّ/يتمّ"**: repeated
  agentless passives that hide who did the thing.
- **AR-SH-007: Formal Passive Disguise | تعمية بصيغة المبني للمجهول**: the
  `يُستخدم` / `يُعتبر` / `يُلاحظ` family, same effect as AR-MSA-006 with a different verb form.

### Example 1: rewrite (`msa-rewrite-01`)

Prompt: *"خلي الكلام طبيعي، شيل أسلوب الذكاء الاصطناعي من المقال ده عن منصة
جسر التعليمية."*

Before (`evals/inputs/msa-rewrite-01.md`), score **39/100** (`MIXED`):

```text
من المهم الإشارة إلى أن التعليم الإلكتروني أصبح خيارًا أساسيًا وليس مجرد
بديل مؤقت. علاوة على ذلك، فإن منصة "جسر" التعليمية الجديدة تقدم تجربة
تعلم تفاعلية للطلاب في مراحل التعليم الأساسي.
```

After (`evals/runs/iteration-1/msa-rewrite-01/rewritten.md`), score
**0/100** (`HUMAN`):

```text
التعليم الإلكتروني لم يعد بديلاً مؤقتًا؛ صار خيارًا أساسيًا. منصة "جسر"
التعليمية الجديدة تقدّم تجربة تعلّم تفاعلية لطلاب مراحل التعليم الأساسي.
```

Patterns addressed: the `AR-SH-001` hedge opener and the `علاوة على ذلك`
transition (`AR-SH-002`) are both gone. The "50 schools in the first term"
figure and every listed platform feature survived unchanged and
unexaggerated: no invented growth number was added.

### Example 2: edit in place (`msa-edit-01`)

Prompt: *"عدّل الملف نفسه، في فقرة وسط الدليل شكلها كتير رسمي وعامة، بس سيب
الكود والجدول زي ما هم."*

Before, the one paragraph in scope, score **0/100** document-wide (the
over-formal paragraph is a small fraction of a longer, already-clean
guide):

```text
من الجدير بالإشارة أن اعتماد نهج موحّد وشامل في تصميم واجهات البرمجة
يُعدّ أمرًا بالغ الأهمية بالنسبة لأي فريق تقني يسعى إلى تحقيق النجاح على
المدى الطويل في جميع جوانب دورة حياة المنتج.
```

After, document score **0/100** (unchanged: the rest of the guide was
already clean, so removing one bad paragraph did not move the document-wide
number, but the paragraph itself no longer carries the hedge-and-inflation
pattern):

```text
نهج تصميم واحد لواجهة البرمجة يوفر وقت فريقنا التقني على المدى الطويل،
وهذا بالضبط سبب أن معظم المطورين يواجهون نفس السؤالين في الأسبوع الأول:
هذا التوثيق مصمم ليجيب عنهما مباشرة.
```

Patterns addressed: the `من الجدير بالإشارة` hedge opener and the inflated
`بالغ الأهمية... جميع جوانب دورة حياة المنتج` close. The fenced JavaScript
code block (`fetch("https://api.example.com/v1/ping"...`) and the rate-limit
table (60 / 600 / 429) survived byte-for-byte:
`validate.js` reports `code-blocks: unchanged` and `table-cells: unchanged`
for this run.

### Detect-mode example (`msa-detect-01`)

Prompt (quoted verbatim from the eval, not this project's own prose):
<!-- humanizer:ignore -->
*"هل هذا النص فيه أسلوب ذكاء اصطناعي؟ قيّم النص وقول لي المشاكل من غير ما
تعدل فيه."*
<!-- /humanizer:ignore -->
This is a **detect example, not a rewrite**: the skill
audits and scores without editing anything.

Score: **59/100** (`AI`). The audit (`evals/runs/iteration-1/msa-detect-01/output.md`)
flags, among others:

```text
«تم إطلاق منصة رقمية جديدة» — مبني للمجهول بصيغة تم/يتم (AR-MSA-006)
«من المهم الإشارة إلى» أن المستشفيات... — تحوّط مفرط (AR-SH-001)
«وفي الختام، آمل أن يكون» هذا التطور... — خاتمة نمطية (AR-SH-002-C / AR-MSA-005)
```

Two `تم/يتم` hits (`AR-MSA-006`, both `P0`), four separate hedge phrases
(`AR-SH-001`), four formal-passive hits (`AR-SH-007`), one clichéd opener
(`AR-MSA-002`), and one formulaic closer (`AR-MSA-005`): 13 issues total,
none rewritten, per detect mode's contract.

---

## Egyptian Arabic (المصري)

`references/ar-egyptian.md` patterns relevant to these examples:

- **AR-EGT-001: MSA Vocabulary Substitution**: writing `الآن` instead of
  `دلوقتي`, `سوف` instead of a حـ/هـ future.
- **AR-EGT-004: Present Tense Without بـ Prefix**: `يوفر` instead of `بيوفر`.
- **AR-EGT-011: Formal Openers (AI Ritual Phrases)**: a sycophantic
  `بالتأكيد!` or an MSA-style `من المهم` opener grafted onto Egyptian prose.
- **AR-EGT-026: MSA Leakage, Summary Checklist**: the umbrella check for
  MSA function words (`هذا`، `الذي`، `سوف`) leaking into text that is supposed to
  be Masri.

### Example 1: rewrite with voice matching (`egt-rewrite-01`)

Prompt: *"أنسنة النص ده عن السماعة، واكتبه بأسلوبي أنا — ده نموذج من
كلامي."*

Before (`evals/inputs/egt-rewrite-01.md`), score **52/100** (`MIXED`):

```text
من المهم أن نتحدث اليوم عن سماعة "نايل ساوند" اللاسلكية الجديدة، والتي
تم إطلاقها الشهر الماضي بسعر يناسب فئة واسعة من المستخدمين في السوق
المحلي.
```

After (`evals/runs/iteration-1/egt-rewrite-01/rewritten.md`), score
**2/100** (`HUMAN`):

```text
يعني خليني أحكيلكم عن سماعة "نايل ساوند" اللاسلكية. طلعت الشهر اللي فات
بسعر مناسب لشريحة كبيرة من الناس في السوق المحلي. سعرها كويس بجد.
```

Patterns addressed: `AR-EGT-011`'s formal opener and MSA leakage
(`AR-EGT-026`: `من المهم`، `والتي`، `تم إطلاقها`) are gone, replaced with real
Masri (`يعني`، `اللي فات`، دلوقتي-register phrasing). Every stated number
survived exactly: eight-hour battery, 900 EGP price, and the 1,200 to 1,500 EGP
competitor range are unchanged from source to rewrite.

### Example 2: edit in place (`egt-edit-01`)

Prompt: *"عدّل الملف نفسه بس، في فقرة في النص شكلها مش من نفس الأسلوب،
سيبلي الكود والجدول زي ما هم."*

Before, the inserted MSA-formal paragraph, document score **12/100**:

```text
من الجدير بالذكر أن اعتماد نهج شامل ومتكامل في أتمتة خدمة العملاء يُعد
أمرًا بالغ الأهمية لأي نشاط تجاري يسعى لتحقيق النجاح المستدام على المدى
الطويل.
```

After, document score **6/100**:

```text
وحاجة مهمة اتعلمتها وأنا بعمل كده: متحاولش تعمل كل حاجة مرة واحدة. اللي
فرق معايا إني بدأت بسيط وبعدين ضفت حاجات بالراحة، مش رميت كل الأتمتة على
البوت من أول يوم.
```

Patterns addressed: the single inserted MSA-register paragraph
(`AR-EGT-026` leakage plus the "بالغ الأهمية... النجاح المستدام" inflation)
is replaced with real Egyptian; the rest of the post, which was already
real Masri, was left untouched, and the JavaScript code fence and
before/after table survived byte-for-byte.

---

## Levantine Arabic (الشامي)

`references/ar-levantine.md` patterns relevant to these examples:

- **AR-SHM-001: MSA Reversion (MSA-leakage umbrella)**: the general
  fallback-to-MSA failure mode.
- **AR-SHM-004: Wrong Future**: `سوف`/`سـ` instead of `رح`.
- **AR-SHM-005: Wrong Negation System**: `لا يستطيع` instead of `ما بيقدر`.
- **AR-SHM-006: MSA Question Words and Demonstratives**: `الذي` instead of
  `يلي`.
- **AR-SHM-007: Wrong "want"**: `أريد`/`يُريدُ` instead of `بدّي`/`بدّو`/`بدّها`.

### Example 1: rewrite (`shami-rewrite-01`)

Prompt: *"خلي الكلام طبيعي أكتر بالشامي، شيل أسلوب الذكاء الاصطناعي من
دليل المدينة القديمة هاد."*

Before (`evals/inputs/shami-rewrite-01.md`), score **57/100** (`AI`):

```text
يُريدُ الكثير من الزوّار أن يعرفوا أفضل الأماكن في المدينة القديمة قبل
زيارتها، ولذلك سوف نستعرض في هذا المقال أهم النقاط التي يجب أن يزورها أي
سائح لأول مرة.
```

After (`evals/runs/iteration-1/shami-rewrite-01/rewritten.md`), score
**16/100** (`HUMAN`):

```text
كتير من الزوّار بدّهم يعرفوا أحسن الأماكن بالمدينة القديمة قبل ما يزوروها.
رح نحكي بهاد المقال عن أهم النقاط يلي لازم أي سائح يزورها أول مرة.
```

Patterns addressed: `AR-SHM-007` (`يُريدُ` → `بدّهم`), `AR-SHM-004`
(`سوف نستعرض` → `رح نحكي`), and `AR-SHM-006` (`التي` → `يلي`). The $15-25
meal price range and the "allot a full day" recommendation are exact in
both versions.

### Detect-mode example (`shami-edit-01`)

Prompt: *"عدّل الملف نفسه، في فقرة قاعدة تحكي فصحى وسط بوست بالعامية، بس ما
تلمس الكود ولا الجدول."*

Since this is an **edit** (not a second rewrite) confined to one paragraph,
it is included here as the second real example for this variety:

Before, the inserted MSA paragraph, document score **14/100** (`HUMAN`,
unchanged before/after because the paragraph is a small fraction of an
otherwise-clean post):

```text
يُريدُ المستخدم أن يحصل على تغطية شاملة وقوية في جميع أنحاء المنزل، ومن
الضروري أن يتم اختيار جهاز راوتر يتمتع بمواصفات تقنية متقدمة لضمان ذلك.
```

After:

```text
كنت بدّي تغطية قوية بكل أنحاء البيت، فلازم دوّر على راوتر مواصفاته منيحة
يضمنلي هيك الشي.
```

Patterns addressed: `AR-SHM-007` (يُريدُ المستخدم → بدّي) and the
تم/يتم-style passive (من الضروري أن يتم اختيار). The plain-text router
config block (`SSID: home-network`, `Channel: auto`, …) and the
before/after coverage table survived byte-for-byte.

## Levantine caveat

Levantine Arabic support is **experimental**. `references/ar-levantine.md`
is explicitly marked "experimental, pending native Levantine review," the
regional split (Syrian / Lebanese / Palestinian) is not modelled: the
engine treats Levantine as a single variety, and there is no sourced
Levantine human fixture in the corpus (unlike MSA and Egyptian, which each
have one under `tests/fixtures/human-sourced/`). Every Levantine result the
skill delivers says so. The native-speaker review ballot for this variety
is tracked at `docs/native-review/ballot-levantine.md` and, as of this
writing, is unfilled; see `README.md` "Status" and
`docs/REVIEW-HANDOFF.md` section 7 for what round-1 did and did not close.

---

## SEO-safe mode

`seo` is a modifier combined with `detect`, `rewrite`, or `edit`. Example
from `en-seo-01` (prompt: *"Rewrite this standing-desk article so it
doesn't sound AI-written, but don't hurt the SEO — keep the keywords,
links, and structure intact."*):

Protected spans that stayed byte-identical between
`evals/runs/iteration-1/en-seo-01/input.md` and `.../rewritten.md`:

```text
title: Standing desks for small home offices          (frontmatter, unchanged)
[shortcode cta id="12"]                                (shortcode, unchanged)
[home office setup guide](/blog/home-office-setup)     (internal link, unchanged)
<!-- wp:paragraph {"align":"left"} -->                 (WordPress block comment, unchanged)
desk-specs.json / desk-corner.jpg                       (file name / alt text, unchanged)
application/ld+json                                     (JSON-LD block, unchanged)
```

Real `validate.txt` summary line and exit code from this run:

```text
PASS — 0 violation(s), 1 warning(s)

  ... json-ld: 1 block(s), unchanged
  ... shortcodes: 1 block(s), unchanged
  ... link-anchor-internal: 2 link(s): anchors and internal targets unchanged
  [PASS] seo-keyword-presence: All 3 keyword(s) still present.
  [PASS] seo-keyword-placement: Primary keyword "standing desk" placement checkpoints preserved.
  [PASS] seo-stuffing: No keyword stuffing detected.
  [WARN] seo-thin-sections: Section(s) below 40 words: "Sizes to consider" (24 words).
  [PASS] detector-score: Detector score did not worsen: 0 → 0.

  scores: before=0 after=0
exit=0
```

The one `WARN` (`seo-thin-sections`) is doing its job: this source article
really is thin ("Sizes to consider" restates the same idea in 24 words
without adding substance). The correct behavior, confirmed by this run,
is to flag it for the writer, never to pad it with invented specifics,
reviews, or numbers.

---

## Voice matching

Two evals carry a voice sample: `en-rewrite-01` and `egt-rewrite-01`. The
skill reads a short sample of the user's actual writing and matches its
rhythm and register rather than defaulting to a generic voice.

### English (`en-rewrite-01`)

Sample (`evals/runs/iteration-1/en-rewrite-01/voice.md`), first lines:

```text
I've hired a lot of people. Onboarding checklists always sound boring in
the planning meeting — then week one hits and you realize nobody wrote
down where the staging credentials live.
```

Matching features the run picked up: short declarative sentences, one
rhetorical aside ("And honestly?"), sparse punctuation, no em dashes used
as connective tissue.

Rewrite excerpt reflecting that voice:

```text
And honestly? What actually saves time isn't the tracker. It's not
answering the same setup question twice.
```

### Egyptian (`egt-rewrite-01`)

Sample (`evals/runs/iteration-1/egt-rewrite-01/voice.md`), first lines:

```text
يعني هو التطبيق ده كويس بس مش تحفة، تعرفوا يعني؟ استخدمته كذا مرة وكل
مرة بيتأخر شوية في التوصيل، بس المنيو بتاعه غني أوي.
```

Matching features the run picked up: chatty Egyptian discourse particles
(كده/بقى/يعني), a mixed-quality verdict register rather than a flat review
tone.

Rewrite excerpt reflecting that voice:

```text
في الآخر، هي كويسة بس مش تحفة — اختيار كويس لو عايز سماعة عملية بسعر
معقول، بس مش هي الاختيار الأفضل لو شغلك محتاج جودة مايك احترافية في
مكالمات طويلة.
```

---

## CLI cookbook

Synopses below are copied verbatim from
`skills/humanizer-pro/scripts/README.md`. Every output block is real,
captured by running the command against this checkout.

### `detect.js`

```
node detect.js <file|-> [--lang en|ar] [--variety msa|egt|shami] [--register default|formal] [--json] [--markdown]
```

```
$ node skills/humanizer-pro/scripts/detect.js evals/inputs/en-detect-01.md --markdown
file:       evals/inputs/en-detect-01.md
language:   en  (confidence 1.00, engine en)
score:      17   label: Some AI patterns
note:       score is a review signal, not an authorship claim
calibration: uncalibrated-review-signal  engine-version 475a51e  authorship-claim false
stats:      words 228, sourceMode rendered-markdown, register default
coverage:   5 group(s), 4.7% of scored text affected (total-chars)

P1  (6)
         -  tier1  AI vocabulary
            «game-changer»
            → describe what changed
     26:48  significance-inflation  Significance inflation
            «a pivotal moment in»

P2  (5)
      9:21  transition  AI transition
            «Moreover»
       8:1  transition  AI transition
            «Furthermore»
```

### `detect.js --json`

```
$ node skills/humanizer-pro/scripts/detect.js evals/inputs/msa-detect-01.md --markdown --json
{
  "lang": "ar",
  "variety": "msa",
  "confidence": 0.7,
  "engine": "ar",
  "arabicRatio": 0.9402390438247012,
  "score": 59,
  "label": "AI",
  "issues": [
    {
      "type": "cliche-opener",
      "patternId": "AR-MSA-002",
      "start": 104,
      "end": 128,
      "excerpt": "في ظل التطورات المتسارعة",
      "severity": "P1",
      "suggestion": "احذف الافتتاحية المشهدية وابدأ الفقرة بالدعوى أو الملاحظة أو الصورة المحددة (AR-MSA-002)."
    }
  ]
}
```

### `validate.js`

```
node validate.js before.md after.md [--seo keywords.txt] [--json] [--lang en|ar] [--variety msa|egt|shami] [--strict-digits] [--strict-fidelity] [--mode rewrite|edit|seo]
```

```
$ node skills/humanizer-pro/scripts/validate.js evals/runs/iteration-1/en-edit-01/input.md evals/runs/iteration-1/en-edit-01/edited.md
PASS — 0 violation(s), 0 warning(s)  [mode edit]

  [PASS] code-blocks: Fenced code blocks: unchanged.
  [PASS] frontmatter: YAML frontmatter: unchanged.
  [PASS] heading-structure: 1 heading(s), structure and wording unchanged.
  [PASS] numbers: All numbers preserved (values and digit systems).
  [PASS] names-dates-citations: All preserved (0 date(s), 0 name candidate(s), 0 citation marker(s) scanned).
  [PASS] detector-score: Detector score did not worsen: 5 → 0.

  scores: before=5 after=0
```

### `validate.js` with SEO keywords

```
$ node skills/humanizer-pro/scripts/validate.js evals/runs/iteration-1/en-seo-01/input.md evals/runs/iteration-1/en-seo-01/rewritten.md --seo evals/inputs/en-seo-01.keywords.txt
PASS — 0 violation(s), 1 warning(s)  [mode seo]

  [PASS] seo-keyword-presence: All 3 keyword(s) still present.
  [PASS] seo-keyword-placement: Primary keyword "standing desk" placement checkpoints preserved.
  [PASS] seo-stuffing: No keyword stuffing detected.
  [WARN] seo-thin-sections: Section(s) below 40 words: "Sizes to consider" (24 words).
  [PASS] detector-score: Detector score did not worsen: 0 → 0.

  scores: before=0 after=0
```

### Register profile (`--register formal`)

The `formal` profile only relaxes the sentence-rhythm gate (`AR-SH-004`);
everything else stays identical. Run on the same file with both profiles:

```
$ node skills/humanizer-pro/scripts/detect.js tests/fixtures/register/formal-human-msa.md --markdown --register default
score:      31   label: MIXED
stats:      words 200, sentences 6, paragraphs 1, sourceMode rendered-markdown, register default
P0  (1)
       4:1  AR-SH-004  uniform-rhythm

$ node skills/humanizer-pro/scripts/detect.js tests/fixtures/register/formal-human-msa.md --markdown --register formal
score:      17   label: HUMAN
stats:      words 200, sentences 6, paragraphs 1, sourceMode rendered-markdown, register formal
```

The 14-point drop (31 → 17) is exactly `WEIGHTS.P0`, the one rhythm finding
that the `formal` profile no longer trips on a legal/administrative MSA
passage with legitimately uniform sentence length.

### Ignore regions

Text wrapped in `<!-- humanizer:ignore -->` ... `<!-- /humanizer:ignore -->`
(or the `<!-- humanizer-ignore-start -->` / `-end` spelling) is masked
before scoring, used by the reference files to quote bad examples without
scoring themselves for them. Same paragraph, scored with and without the
marker:

```
# marked:
score:      2   label: Minimal AI signals
coverage:   1 group(s), 1.9% of scored text affected (total-chars)

# same file, marker removed:
score:      14   label: Minimal AI signals
coverage:   2 group(s), 4.7% of scored text affected (total-chars)
```

### Self-scan

```
npm run self-scan            # table, exits 1 if any file is over budget
node tools/self-scan.js --json
node tools/self-scan.js --update-budgets   # rewrite the budgets file
```

```
$ npm run self-scan
file                                                raw score  adjusted score  budget  status
--------------------------------------------------  ---------  --------------  ------  ------
README.md                                           1          1               5       ok
skills/humanizer-pro/references/ar-egyptian.md      100        3               5       ok
skills/humanizer-pro/references/en-patterns.md      0          75              75      ok
docs/NATIVE-REVIEW.md                               78         78              100     ok
```

### Benchmark

```
node evals/run-benchmark.js [--case <id>] [--json] [--benchmark <path>]
```

```
$ node evals/run-benchmark.js
PASS  en-detect-01
PASS  en-rewrite-01
PASS  en-edit-01
PASS  en-seo-01
PASS  msa-detect-01
PASS  msa-rewrite-01
PASS  msa-edit-01
PASS  msa-seo-01
PASS  egt-detect-01
PASS  egt-rewrite-01
PASS  egt-edit-01
PASS  egt-seo-01
PASS  shami-detect-01
PASS  shami-rewrite-01
PASS  shami-edit-01
PASS  shami-seo-01

16/16 cases passed
```

---

## Prompts to use

These are the real `prompt.txt` files from `evals/runs/iteration-1/` (or
modelled directly on them), one per mode, in English and Arabic. Paste one
as-is, or adapt it to your own document.

### Detect

English:
> Does this read like AI wrote it? Audit it and give it a score, don't
> rewrite anything yet.

فصحى:
> هل هذا النص فيه أسلوب ذكاء اصطناعي؟ قيّم النص وقول لي المشاكل من غير ما
> تعدل فيه.

مصري:
> النص ده شكله AI، افحصه وقول لي المشاكل من غير ما تعدل حاجة.

### Rewrite

English (with a voice sample):
> Humanize this blog draft about our onboarding checklist module. Here's a
> sample of how I actually write, match my voice: [see voice sample].

مصري (with a voice sample):
> أنسنة النص ده عن السماعة، واكتبه بأسلوبي أنا — ده نموذج من كلامي.

شامي:
> خلي الكلام طبيعي أكتر بالشامي، شيل أسلوب الذكاء الاصطناعي من دليل
> المدينة القديمة هاد.

### Edit

English:
> Can you clean up the AI-sounding paragraph in this deploy doc? Edit the
> file in place, don't touch the script or the table.

فصحى:
> عدّل الملف نفسه، في فقرة وسط الدليل شكلها كتير رسمي وعامة، بس سيب الكود
> والجدول زي ما هم.

### SEO modifier

English:
> Rewrite this standing-desk article so it doesn't sound AI-written, but
> don't hurt the SEO — keep the keywords, links, and structure intact.

فصحى:
> ظبط الملف ده، النص شكله ذكاء اصطناعي في بعض الأماكن، بس حافظ على
> الكلمات المفتاحية والروابط والهيكلة من غير ما تأثر على السيو.

شامي (detect + SEO check, no rewrite):
> شو رأيك، هاد النص شكله AI؟ افحصه وقلي الملاحظات، بس خبرني كمان إذا في
> مشكلة بالسيو، من دون ما تعدل شي.

### Voice matching

English:
> Here's a paragraph I wrote myself: [sample]. Rewrite the draft below to
> sound like that, not like a generic AI voice.

مصري:
> أنسني الكلام ده بس اكتبه بأسلوبي أنا زي النموذج اللي بعتهولك.
