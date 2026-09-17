# Egyptian Arabic (عامية مصرية / Masri) — AI-tell reference

Scope: applies only when the active target dialect/language profile is Egyptian Arabic.
Never apply these substitutions to MSA-target text or to Levantine-target text (see
`docs/CONFLICTS.md` C-04/C-05/C-06 — the same surface form, e.g. هذا or سوف, is correct
MSA and a mandatory-fix AI tell here; these rules are dialect-scoped, precedence level 5).

Severity note: the upstream source (`humanizer-ar-egt/SKILL.md`) carries **no** severity
tags of its own (unlike the MSA skill's minor/significant/critical). Severities below are
assigned by this project from the source's own emphasis language ("definitive AI tell,"
"clearest possible AI signature," "One X = AI," Stage-2 rewrite priority order at
egt:628–649) per the owner-approved rubric (significant→P1, critical→P0, minor→P2). Treat
these tags as this project's judgment call, not an upstream classification.

For patterns that are dialect-specific instances of a cross-variety AI tell (hedging
overload, formulaic transitions, significance inflation, uniform sentence rhythm,
list-instead-of-argument, translated-from-English structures, typography), see
`references/ar-shared.md` for the general rule; only the Egyptian-specific nuance and
example are kept here.

Line references below are to `_sources/semitic/skills/humanizer-ar-egt/SKILL.md`
(pinned commit `2c9d4fbe3e0086d373b59bfebc9556082275cf62`), abbreviated `egt:`.

---

### AR-EGT-001 — MSA Vocabulary Substitution
**Severity:** P0  **Provenance:** SM-EGT-001 (egt:72–105)
**What it looks like:** Core everyday MSA words used where Egyptian has a wholesale
different word — not slang substitution, the entire daily lexicon: الآن، أريد، اذهب، أرى،
هذا، هذه، هؤلاء، ماذا، كيف، هكذا، نعم، جداً، أيضاً، لكن، ثم، بعد، دائماً.
**Why it reads as AI:** Egyptian Arabic substitutes the whole daily-use word set, not just
adds to MSA. "Using الآن instead of دلوقتي does not sound formal — it sounds foreign. It
sounds like a Lebanese news anchor dubbed into Egyptian." (egt:76)
**Fix:** Full substitution table (egt:80–100), mandatory in casual/informal text: الآن→دلوقتي،
أريد→عايز/عايزة، اذهب→روح، أرى→أشوف، هذا→ده، هذه→دي، هؤلاء→دول، ماذا→إيه، كيف→ازاي،
هكذا→كده، نعم→أيوه، جداً→أوي، أيضاً→كمان، لكن→بس، ثم→وبعدين، بعد→بعدين، دائماً→طول الوقت.
**Before:** الآن أريد أن أذهب لأرى هذا الشيء
**After:** دلوقتي عايز أروح أشوف الحاجة دي
**Carve-outs:** None stated in source.

---

### AR-EGT-002 — Tanwin and Case Endings
**Severity:** P1  **Provenance:** SM-EGT-002 (egt:108–119)
**What it looks like:** Words ending in ـاً/ـٍ/ـٌ or any overt case vowel; specifically
أيضاً، شكراً جزيلاً، تمامًا، مثلاً.
**Why it reads as AI:** "Egyptian colloquial Arabic has no case system. Zero. Tanwin does
not exist in native Masri speech." (egt:112) Also carries the relative pronoun tell:
the fixed example uses اللي (not الذي/التي) — see AR-EGT-026 MSA-leakage umbrella.
**Fix:** Strip all tanwin/case endings; replace adverbial forms: أيضاً→كمان، شكراً→متشكر،
تمامًا→تمام، مثلاً→زي مثلاً/زي (egt:114).
**Before:** شكراً جزيلاً على مساعدتك، وأيضاً تمامًا فهمت ما قلته
**After:** متشكر على مساعدتك، وكمان فهمت اللي قلته
**Carve-outs:** None stated in source.

---

### AR-EGT-003 — Wrong Future Tense Marker
**Severity:** P0  **Provenance:** SM-EGT-003 (egt:122–138)
**What it looks like:** سـ prefix (سيذهب، سنتحدث، سأفعل) or سوف before any verb.
**Why it reads as AI:** "MSA future is formed with سـ or سوف. Egyptian Arabic forms the
future with حـ prefix... This is a systematic grammatical difference, not a vocabulary
choice... like writing 'I will to go' in English." (egt:126)
**Fix:** Replace سـ/سوف+verb with حـ+imperfect, no بـ: سوف نتحدث→هنتكلم، سأذهب→هروح،
سيفعل→هيعمل، سنأكل→هناكل، ستفهم→هتفهم(f)/هيفهم(m) (egt:128–133).
**Before:** سوف نتحدث عن هذا الموضوع لاحقاً وسأذهب لمقابلته غداً
**After:** هنتكلم في الموضوع ده بعدين وهروح أقابله بكره
**Carve-outs:** None stated in source.

---

### AR-EGT-004 — Present Tense Without بـ Prefix
**Severity:** P0  **Provenance:** SM-EGT-004 (egt:141–157)
**What it looks like:** Bare imperfect (يكتب، يذهب، يفهم، يعمل) used as descriptive
present, not future/subjunctive.
**Why it reads as AI:** "بيكتب means 'he writes / he is writing.' يكتب in Egyptian Arabic
sounds like a command, a subjunctive, or simply wrong for present tense." (egt:145)
**Fix:** Add بـ prefix: يكتب→بيكتب، تروح→بتروح، أعمل→بعمل، نفهم→بنفهم، تعمل إيه→بتعمل إيه
(egt:148–152).
**Before:** هو يكتب الرسالة الآن ويفهم المشكلة
**After:** هو بيكتب الرسالة دلوقتي وبيفهم المشكلة
**Carve-outs:** None stated in source.

---

### AR-EGT-005 — Wrong Demonstrative Order
**Severity:** P0  **Provenance:** SM-EGT-005 (egt:160–176)
**What it looks like:** هذا/هذه/هؤلاء placed BEFORE the noun (MSA order): هذا الكتاب،
هذه المشكلة، هؤلاء الناس.
**Why it reads as AI:** "MSA places the demonstrative before the noun... Egyptian Arabic
places it after... Placing ده/دي/دول before the noun is simply not Egyptian Arabic."
(egt:164) See C-04: the identical MSA form is correct MSA and forbidden here.
**Fix:** Flip to after the noun + Egyptian form: هذا الكتاب→الكتاب ده، هذه المشكلة→المشكلة
دي، هؤلاء الناس→الناس دول، هذا الرجل→الراجل ده، هذه البنت→البنت دي (egt:166–171).
**Before:** هذه المشكلة وهؤلاء الناس سببوا هذا الموقف
**After:** المشكلة دي والناس دول عملوا الموقف ده
**Carve-outs:** None stated in source.

---

### AR-EGT-006 — The Long Formal Arabic Sentence
**Severity:** P1  **Provenance:** SM-EGT-006 (egt:185–196)
**What it looks like:** Sentences >25–30 words; heavy الذي/التي/الذين subordination;
journalistic embedding (يُعدّ X من Y التي Z) — "belongs in Al-Ahram editorial" (egt:187).
**Why it reads as AI:** "Human Egyptian speech is fragmented. A thought ends. Another
begins... AI-generated text imports MSA's long, embedded sentence structure." (egt:189)
This is the MSA-leakage relative-pronoun tell (الذي/التي→اللي) at the sentence-structure
level; see AR-EGT-026.
**Fix:** Break into fragments; connect with يعني/بس; vary length — "Make some sentences
two words. Make some sentences five." (egt:191)
**Before:** يُعدّ هذا الموضوع من المواضيع الشائكة التي تستوجب التعمق والدراسة المستفيضة
قبل إصدار أي حكم أو موقف
**After:** الموضوع ده صعب. محتاج تفكير. مش بسيط خالص.
**Carve-outs:** None stated in source.

---

### AR-EGT-007 — Wrong Negation System
**Severity:** P0  **Provenance:** SM-EGT-007 (egt:199–219)
**What it looks like:** لا، لم، لن، ليس، لست، لسنا used as main negators.
**Why it reads as AI:** "The negation system is one of the most audible features of the
dialect." (egt:203) See C-10: Egyptian treats the ما…ش circumfix as universal Egyptian
negation, unlike Levantine where the same circumfix is Palestinian-only (see
`ar-levantine.md` AR-SHM-005) — do not merge the two dialects' negation tables.
**Fix table** (egt:207–212): verb negation ما+verb+ش (ماعرفش، ماجاش، مابقاش); nominal/
adjective negation مش (مش كويس، مش عارف); future negation مش حـ (مش حيجي، مش هيعمل);
existence negation مفيش (مفيش حاجة، مفيش وقت).
**Before:** لم أستطع أن أفهم ذلك لأنه لم يكن واضحاً
**After:** ماقدرتش أفهم ده لأنه ماكانش واضح
**Carve-outs:** None stated in source.

---

### AR-EGT-008 — Robotic Passive Voice
**Severity:** P1  **Provenance:** SM-EGT-008 (egt:222–236)
**What it looks like:** يُفعل passives (يُعتبر، يُستخدم، يُلاحظ، يُقال، يُشار، يُذكر،
يُرى) and مُ- prefix passives (مُستخدم، مُعتبر، مُلاحظ).
**Why it reads as AI:** "Egyptian Arabic avoids passive voice heavily... The MSA formal
passive sounds bureaucratic and non-human in casual Egyptian text." (egt:226)
**Fix:** Convert to active with a subject (ناس, حد, إحنا, هم): يُعتبر هذا الأمر
هاماً→الحاجة دي مهمة; يُستخدم هذا النظام بشكل واسع→ناس كتير بيستخدموا النظام ده;
يُلاحظ أن...→الواضح إن... (egt:229–231).
**Before:** يُعتبر هذا الأمر من الأمور الهامة التي يجب أن يُلاحظها الجميع
**After:** الحاجة دي مهمة وكل الناس لازم تاخد بالها منها
**Carve-outs:** None stated in source.

---

### AR-EGT-009 — Missing Discourse Particles
**Severity:** P0  **Provenance:** SM-EGT-009 (egt:239–257)
**What it looks like:** Absence of يعني, بقى, خلاص, ماشي, طب, يا سلام, والله, زي مثلاً,
يعني إيه, بس خلاص across the whole text.
**Why it reads as AI:** "Zero of these appearing in Egyptian Arabic text is a definitive
AI tell." (egt:250) يعني alone is "used 10x more than any MSA equivalent" per the source
(egt:244) — that specific multiplier is an unsourced stylometric claim and is not repeated
here as fact; the underlying instruction (insert particles) is kept.
**Fix:** Insert at natural discourse junctions — خلاص after establishing a point, يبقى/يعني
before a conclusion, ماشي when acknowledging before moving on. "Do not overload — but do
not leave a full paragraph particle-free." (egt:252)
**Before:** إذا كان الأمر كذلك، فسيكون الحل واضحاً ولا داعي للقلق
**After:** يعني لو الأمر كده، يبقى الحل واضح خلاص. مفيش داعي للقلق.
**Carve-outs:** None stated in source.

---

### AR-EGT-010 — Uniform Sentence Length
**Severity:** P1  **Provenance:** SM-EGT-010 (egt:260–271)
See `ar-shared.md`: uniform sentence rhythm — apply the shared-core rule for the general
sentence-length-variance tell. The Egyptian-specific nuance kept here: the source's stated
"12–20 word" AI band (egt:262) is an uncited numeric threshold and is dropped per the
statistic-drop rule (see `docs/dedup-log/ar-egt-shm.md`); the prescriptive fix survives.
**Egyptian fix/example:** insert one-word or two-word sentences (صح؟, خلاص., بجد., مش كده؟)
after an explanatory passage (egt:266).
**Before:** هذا الأمر صعب وغير بسيط وهو يستوجب التفكير الجيد قبل اتخاذ أي قرار
**After:** الموضوع ده صعب. بجد. محتاج تفكير كتير قبل ما تقرر حاجة.
**Carve-outs:** None stated in source.

---

### AR-EGT-011 — Formal Openers (AI Ritual Phrases)
**Severity:** P0  **Provenance:** SM-EGT-011 (egt:280–304)
See `ar-shared.md`: formulaic transitions — apply the shared-core rule for the general
formal-opener/ritual-phrase tell. Source calls these openers "the clearest possible AI
signature" (egt:292) — kept as P0 for Egyptian despite deferral, since the source's own
emphasis is stronger than a generic transition-phrase tell.
**Egyptian phrase set kept here** (egt:283–290): بالتأكيد، من المهم أن نلاحظ، تجدر
الإشارة إلى، جدير بالذكر، من الجدير بالذكر أن، في هذا السياق، يتضح لنا من ذلك، مما لا
شك فيه أن — "direct Arabic translations of English AI ritual openers (Certainly!, It is
important to note...)" (egt:292).
**Egyptian fix set:** بصّ...، اسمع...، تعرف إيه؟، الحقيقة..., or start directly (egt:294–299).
**Before:** بالتأكيد! من المهم أن نلاحظ أن هذا الموضوع يستحق الاهتمام
**After:** بصّ، الموضوع ده مهم فعلاً.
**Carve-outs:** None stated in source.

---

### AR-EGT-012 — Hyper-Formal Closing
**Severity:** P1  **Provenance:** SM-EGT-012 (egt:307–328)
See `ar-shared.md`: formulaic transitions — apply the shared-core rule for the general
formulaic-conclusion tell. Egyptian nuance kept here: the closing phrase set and fix.
**Egyptian phrase set** (egt:310–315): وفي الختام، خلاصة القول، وبهذا نكون قد، وفي نهاية
المطاف، مما سبق يتضح أن، آمل أن يكون ذلك مفيداً — "as absurd as ending a text message
with 'In conclusion.'" (egt:317)
**Egyptian fix set:** يعني كده، وخلاص، فاهم يعني؟، ده اللي عندي (egt:319–323).
**Before:** وفي الختام، آمل أن يكون هذا الحديث قد أفاد الجميع
**After:** يعني كده. فاهمين يعني؟
**Carve-outs:** None stated in source.

---

### AR-EGT-013 — جداً Instead of أوي
**Severity:** P0  **Provenance:** SM-EGT-013 (egt:331–342)
**What it looks like:** جداً anywhere in informal Egyptian text.
**Why it reads as AI:** "This is one of the simplest and most reliable AI detection
signals in Egyptian Arabic text. One جداً = AI." (egt:335)
**Fix:** Replace every جداً with أوي (after the adjective/verb it modifies); double for
strong emphasis (أوي أوي); extreme informal: جامد or تقيل (egt:337).
**Before:** هو شاطر جداً في عمله وذكي جداً
**After:** هو شاطر أوي في شغله وذكي أوي
**Carve-outs:** None stated in source.

---

### AR-EGT-014 — لأن and لكي Instead of عشان
**Severity:** P1  **Provenance:** SM-EGT-014 (egt:345–359)
**What it looks like:** لأن (because), لكي/كي (in order to), من أجل أن.
**Why it reads as AI:** "Egyptian Arabic uses عشان for both 'because' AND 'in order to.'
This is a distinctive feature of the dialect — one word covers both functions." (egt:349)
**Fix:** Replace لأن and لكي/كي/من أجل with عشان in casual contexts: ذهبت لأنني كنت
متأخراً→رحت عشان كنت متأخر; ذاكر كي ينجح→بذاكر عشان ينجح; لأنه كان جاهزاً→عشان كان جاهز
(egt:352–354).
**Before:** ذهبت لكي أشتري طعاماً لأنني كنت جائعاً
**After:** رحت عشان أجيب أكل عشان كنت جعان
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: egt -->
Flag: the source's own fix-table row 1 ("ذهبت لأنني كنت متأخراً→رحت عشان كنت متأخر",
egt:352) rewrites the sentence but the row for "لأنه كان جاهزاً→عشان كان جاهز" (egt:354)
is consistent; however the pattern's *own* Stage-1 checklist example for a different
pattern (SM-EGT-007, egt:217–218: "لم أستطع أن أفهم ذلك لأنه لم يكن واضحاً" →
"ماقدرتش أفهم ده لأنه ماكانش واضح") leaves لأنه (MSA causal) inside the "human" fixed
sentence, which contradicts this pattern's own لأن→عشان rule. A native reviewer should
confirm whether لأنه is acceptable as a fossilized/retained causal in otherwise-Egyptian
text or whether the source's own example is inconsistent.

---

### AR-EGT-015 — Sycophantic Opener
**Severity:** P1  **Provenance:** SM-EGT-015 (egt:362–378)
**What it looks like:** شكراً على سؤالك الرائع، يسعدني مساعدتك، بكل سرور سأساعدك، سؤال
ممتاز، سعيد بمساعدتك.
**Why it reads as AI:** "Arabic translations of ChatGPT-era English sycophancy: 'Great
question!', 'I'd be happy to help!'... No Egyptian person writes this way to another
person." (egt:371) This overlaps the cross-variety "chatbot residue" tell (not itself in
the shared-tells list this project defers to); kept here as a dialect-specific realization
of that overlap — reconcile against `ar-shared.md` if a chatbot-residue entry is added
there later.
**Fix:** Delete entirely; if acknowledgment is needed: أيوه, ماشي, تمام, خد بالك (egt:373).
**Before:** شكراً على سؤالك الرائع! يسعدني الإجابة عليه بكل سرور
**After:** أيوه، خد بالك...
**Carve-outs:** None stated in source.

---

### AR-EGT-016 — No Code-Switching (English)
**Severity:** P1  **Provenance:** SM-EGT-016 (egt:387–404)
**What it looks like:** 100% Arabic where educated urban Cairo speech would code-switch
to English (deadline, update, meeting, sync, call, presentation, feature, bug, crash;
stressed, overwhelmed, excited, bored, awkward, vibes; coffee, delivery, cancel,
subscribe, upload, download; story, reel, post, like, comment, live — egt:394–397).
**Why it reads as AI:** "Code-switching... is a defining feature of educated Cairo urban
speech... a sociolinguistic marker of a specific demographic." (egt:391)
**Fix:** Add natural English insertions in the domains above; use الـ + English noun for
definite treatment.
**Before:** الموعد النهائي بكره والاجتماع الساعة عشرة
**After:** الـ deadline بكره والـ meeting الساعة عشرة
**Carve-outs:** Register-dependent — see Voice Calibration tiers (egt:690–726): heavier in
Ultra-Casual/Casual, selective in Informal-Professional, light in Semi-Formal Egyptian.

---

### AR-EGT-017 — No Arabizi
**Severity:** P2  **Provenance:** SM-EGT-017 (egt:407–425)
**What it looks like:** Absence of Latin-script Arabizi/Franco-Arabic in WhatsApp,
Instagram, Twitter/X, YouTube-comment contexts. Number-letter mapping: 3=ع, 7=ح, 2=ء,
5=خ, 9=ص (egt:411).
**Why it reads as AI:** "Its complete absence in casual social contexts remains an AI
tell. Mixing is natural; zero Arabizi in a WhatsApp thread is suspicious." (egt:411)
**Fix:** Context-dependent — add for simulated chat platforms only; Arabic script is
correct for blog posts/longer-form text (egt:420).
**Before:** يا صديقي لا أعرف ما يجب أن أفعله *(AI, WhatsApp simulation)*
**After:** ya man mesh 3aref aعمل إيه *(source's own "Human" example, egt:424)*
**Carve-outs:** Only for simulated chat/social contexts, not longer-form text.
<!-- NATIVE-REVIEW: egt -->
Flag (verbatim from source, not authored here): the "Human" example at egt:424 mixes
Latin and Arabic script mid-token ("aعمل" glues a bare Latin "a" directly onto the
Arabic word عمل, rather than a full Arabizi transliteration like "a3mal eih"). This reads
as a copy/generation artifact in the upstream source itself (see
`docs/inventory/semitic.md` §11 item 1) and should not be reused as a model example
without a native check.

---

### AR-EGT-018 — Perfect Orthographic Consistency
**Severity:** P2  **Provenance:** SM-EGT-018 (egt:428–444)
**What it looks like:** AI picks one spelling per word and holds it throughout, unlike
real Egyptian Arabic which "has no official written standard" (egt:432).
**Why it reads as AI:** "Different Egyptians spell the same words differently... Artificial
orthographic consistency in informal Egyptian text is an AI fingerprint." (egt:432)
**Fix:** Introduce natural, unplanned-feeling variation — e.g. إيه in one place, ايه
elsewhere; علشان once instead of عشان every time (egt:443).
**Carve-outs:** No before/after example pair is given in the source for this pattern
(only the variation table) — none invented here.
<!-- NATIVE-REVIEW: egt -->
Flag (verbatim from source): the source's own "variable spelling" table lists
"هيعمل / هيعمل / هيعمل" (egt:440) as three variants of the same string with no visible
difference, and "إيه / ايه / ايه؟" (egt:435) lists a question-mark-bearing form as if it
were a spelling variant rather than punctuation. Both read as authoring artifacts in the
upstream source (see `docs/inventory/semitic.md` §11 item 2) — needs a byte-level/native
check before being trusted as real dialectal variation.

---

### AR-EGT-019 — Missing Letter Lengthening
**Severity:** P2  **Provenance:** SM-EGT-019 (egt:447–466)
**What it looks like:** All words at base length, no letter repetition for emphasis, in
emotionally significant contexts.
**Why it reads as AI:** "Letter lengthening expresses emotional emphasis that punctuation
alone cannot carry... This is universal in informal Egyptian writing and its complete
absence marks a text as AI-generated." (egt:451)
**Fix:** Add at 2–3 points of genuine emotional weight: أووووي، لاأأأأ/لاأاا، تمامممم،
ياساتر، بجدددد، جاهزززز (egt:453–459). Do not overdo it.
**Before:** أيوه، هذا صحيح تماماً ولا
**After:** أيوهههه ده صح تمامممم لاأأ
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: egt -->
Flag (verbatim from source): the "AI" example at egt:464 ("أيوه، هذا صحيح تماماً ولا")
ends in a bare ولا with no following clause, which reads as truncated/malformed rather
than a complete AI-style sentence — a native reviewer should confirm this is intentional
(e.g. an elided "ولا لأ" tag-question) rather than a copy error in the source.

---

### AR-EGT-020 — Wrong Laughter Representation
**Severity:** P2  **Provenance:** SM-EGT-020 (egt:469–480)
**What it looks like:** Absence of laughter markers, or use of ح instead of ه for laughter.
**Why it reads as AI:** Convention is ه repeated, length = intensity (هه mild, هههه
funny, هههههههه losing it); "AI sometimes uses ح for laughter... or omits laughter
entirely." (egt:473)
**Fix:** Use هههههه (minimum 4–6 ه's), matched to intensity; never ح for laughter.
**Before:** هذا مضحك جداً ويجعلني أضحك
**After:** ده بجد مضحك هههههههه
**Carve-outs:** None stated in source.

---

### AR-EGT-021 — No Questions to the Reader
**Severity:** P1  **Provenance:** SM-EGT-021 (egt:489–509)
**What it looks like:** Paragraphs/messages with no reader-directed questions; "AI
monologues." (egt:491)
**Why it reads as AI:** "Egyptian Arabic communication style is highly dialogic even in
writing... A paragraph with no reader engagement sounds like a Wikipedia entry, not a
person." (egt:493)
**Fix:** Add ≥1 reader-directed question per substantial paragraph, rotating: فاهم؟، فاهم
يعني؟، عارف إيه يعني؟، ما قلتلكش؟، صح؟، مش كده؟، قلتلك مش كده؟ (egt:496–502).
**Before:** هذا الموضوع معقد ويحتاج إلى دراسة متأنية وفهم عميق
**After:** الموضوع ده معقد، بجد. محتاج تفهمه كويس. مش بسيط، فاهم يعني؟
**Carve-outs:** This project treats rhetorical/reader-directed questions as legitimate
Arabic rhetoric, not an AI tell to be suppressed (owner decision; see `docs/CONFLICTS.md`
C-02) — the general English-language "rhetorical questions are earned, not a stall" rule
is explicitly inverted for Egyptian text and must not be applied here.

---

### AR-EGT-022 — No Hedge or Disfluency Markers
**Severity:** P1  **Provenance:** SM-EGT-022 (egt:512–532)
**What it looks like:** Text that is uniformly certain, smooth, direct, with no hedging.
**Why it reads as AI:** "AI is confident. It states things. It does not hedge because
hedging is not rewarded during training... real humans... hedge constantly." (egt:516)
**Fix:** Add genuine uncertainty markers where the topic is not 100% certain, especially
opinions/predictions/secondhand info: أنا فاكر إن، على حسب، مش متأكد بس، حاجة زي كده،
يعني نوعاً ما، على قد ما أعرف، بشكل تقريبي (egt:519–525). One hedge per idea is enough.
**Before:** الحل هو استخدام النظام الجديد الذي سيحل المشكلة
**After:** أنا فاكر إن الحل هو النظام الجديد ده. مش متأكد بس، على حسب الموقف يعني.
**Carve-outs:** This pattern requires *adding* Egyptian hedge markers — the opposite
direction from a generic "hedging overload" rule. If `ar-shared.md` carries a hedging-
overload tell (removing excess hedges from English-register text), it must not be applied
to strip the Egyptian-dialect hedge markers this pattern calls for; the two rules operate
on different registers and must not be merged.

---

### AR-EGT-023 — ج/ق Orthographic Tell
**Severity:** P2  **Provenance:** SM-EGT-023 (egt:535–544)
**What it looks like:** Consistent formal ق where Egyptian colloquial pronunciation uses
a glottal stop (ء); inconsistency around ج pronounced "g" not "j".
**Why it reads as AI:** "The AI tends to pick one and stick with it uniformly" for ق/ء,
and Egyptian ج=g affects spelling choices for words like جاب (gaab, not jaab), جمل
(gamal) (egt:540–541).
**Fix:** Be consistent with how Egyptian speakers actually write these sounds; glottal-stop
representation can vary naturally in informal text.
**Carve-outs:** No before/after example pair is given in the source for this pattern
(only the phonological explanation) — none invented here.

---

### AR-EGT-024 — No Terms of Address
**Severity:** P1  **Provenance:** SM-EGT-024 (egt:547–567)
**What it looks like:** يا صديقي (formal/distant) or no term of address at all.
**Why it reads as AI:** "Egyptian Arabic has a warm and rich system of address terms...
The use of يا صديقي sounds like a poorly dubbed Western movie." (egt:551)
**Fix:** Replace يا صديقي with يا حبيبي or يا صاحبي per tone; add at natural points
(beginning of a statement, calling attention).
**Egyptian address terms** (egt:554–560): يا حبيبي/يا حبيبتي (universal warm), يا عم
(older men), يا طا/يا أستاذ (respected older men), يا بنت (addressing a woman), يا ولد
(young man, casual), يا باشا (elevated/playful), يا صاحبي ("my friend").
**Before:** يا صديقي، أعتقد أنك محق في هذا الأمر
**After:** يا حبيبي، أنت صح في الحاجة دي
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: egt -->
Flag: the address term "يا طا" (egt:556, glossed "for respected older men") could not be
confirmed by this project as a standard Egyptian address term (it may be a shortened/
regional form or a source typo for a longer term) — verify with a native Egyptian speaker
before treating it as a general-purpose recommendation.

---

### AR-EGT-025 — High Word Frequency Repetition
**Severity:** P2  **Provenance:** SM-EGT-025 (egt:570–581)
**What it looks like:** Stylometric pattern — same 5–10 content words in almost every
paragraph; specialized/domain vocabulary absent; all word choices from the top-frequency
tier.
**Why it reads as AI:** "AI language models favor high-frequency words because they
dominate training data. The result is text with an unnatural word frequency
distribution." (egt:574) — kept as a qualitative claim; no numeric frequency data is
given in the source, and none is invented here.
**Fix:** Audit the top 10 most-used content words; introduce synonyms/domain-specific
alternatives for ≥3 of them; ground vocabulary in specifics (place names, tool names,
jargon) (egt:576).
**Before:** الموضوع ده مهم وعايزين نشتغل عليه كويس عشان الحاجة دي مهمة
**After:** الموضوع ده critical والـ sprint اللي جاي لازم نخلصه. الـ backlog معبي والـ
deadlines بتحاصرنا.
**Carve-outs:** None stated in source.

---

### AR-EGT-026 — MSA Leakage — Summary Checklist
**Severity:** P0 (umbrella — see individual entries for per-item severity)
**Provenance:** origin: humanizer-pro. No single SM id in the source covers this as a
named pattern (unlike Levantine, where SM-SHM-001 "MSA Reversion" is itself the umbrella
— see `ar-levantine.md` AR-SHM-001). This entry aggregates and cross-references
SM-EGT-001/002/003/004/005/006/007/013/014 (each of which has its own AR-EGT-00N entry
above and is mapped exactly once in `docs/dedup-log/ar-egt-shm.md`); it is anchored on
the source's own Stage-3 lexicon checklist (egt:659–667) and Quick Reference Card
(egt:841–868), both of which are explicit "no MSA leakage" checklists with no separate
pattern number of their own.
**What it looks like:** MSA function words/constructions surviving in Egyptian-target
text — the source's own diagnostic frame: "the model reaches for MSA vocabulary, MSA
grammar, MSA word order, and MSA discourse patterns... A Cairo native reads two sentences
and says مش مصري ده." (egt:30)
**Why it reads as AI:** Same as above — MSA leakage is Category 1 of the source
("Register Collapse — AI Defaults to MSA," egt:66–68) and is treated as the foundational
failure mode underlying most of the other 24 patterns.
**MSA → Egyptian checklist** (cited exactly as the source's Stage-3 checklist and Quick
Reference table list them, egt:660–667 and egt:844–868):
- Negators لا/لم/لن/ليس/لست/لسنا → ما+verb+ش / مش / مش حـ / مفيش (AR-EGT-007, egt:199–219)
- Future سـ/سوف → حـ/هـ (AR-EGT-003, egt:122–138)
- Demonstratives هذا/هذه/هؤلاء (before noun) → ده/دي/دول (after noun) (AR-EGT-005,
  egt:160–176)
- Relative الذي/التي (detection at AR-EGT-006, egt:187) → اللي — the only fix example
  the source gives is embedded in AR-EGT-002's example: "فهمت ما قلته" → "فهمت اللي
  قلته" (egt:118); no dedicated substitution table exists for this item in the source.
- Tanwin/case endings — present in MSA, absent in Egyptian (AR-EGT-002, egt:108–119)
- Present tense: bare imperfect → بـ+imperfect (AR-EGT-004, egt:141–157)
- Core vocabulary substitution table (AR-EGT-001, egt:80–100)
- Intensifier جداً → أوي (AR-EGT-013, egt:331–342)
- Causal/purpose لأن/لكي → عشان (AR-EGT-014, egt:345–359)
**Fix:** Run the Stage-3 checklist (egt:659–667) after any rewrite: أوي not جداً anywhere;
عشان not لأن/لكي; مش not ليس/لا as main negator; دلوقتي not الآن; ده/دي/دول not
هذا/هذه/هؤلاء; no tanwin endings remaining; future with حـ/هـ not سـ/سوف; present tense
with بـ prefix.
**Carve-outs:** This checklist applies only to Egyptian-target text; never apply it to
MSA-target text, where these same forms (هذا, سوف, لم, الذي) are correct and required
(see `docs/CONFLICTS.md` C-04/C-05/C-06).

---

## Dialect markers (for language-ID / dialect-detection use)

Cited exactly as the source lists them, for use by a downstream dialect-identification
script — not a rule pattern in its own right.

- Philosophy section core set (egt:50): يعني, بقى, خلاص, ماشي, يا سلام.
- Full MSA→Egyptian substitution table (egt:80–100, AR-EGT-001): الآن، أريد، اذهب، أرى،
  هذا، هذه، هؤلاء، ماذا، كيف، هكذا، نعم، جداً، أيضاً، لكن، ثم، بعد، دائماً → دلوقتي،
  عايز/عايزة، روح، أشوف، ده، دي، دول، إيه، ازاي، كده، أيوه، أوي، كمان، بس، وبعدين،
  بعدين، طول الوقت.
- Discourse particles (Pattern 9, egt:241): يعني، بقى، خلاص، ماشي، طب، يا سلام، والله،
  زي مثلاء، يعني إيه، بس خلاص.
- Negation markers (Pattern 7, egt:207–212): ماـش، مش، مش حـ، مفيش.
- Reader-check phrases (Pattern 21, egt:496–502): فاهم؟، فاهم يعني؟، عارف إيه يعني؟،
  ما قلتلكش؟، صح؟، مش كده؟، قلتلك مش كده؟.
- Hedging markers (Pattern 22, egt:519–525): أنا فاكر إن، على حسب، مش متأكد بس، حاجة زي
  كده، يعني نوعاً ما، على قد ما أعرف، بشكل تقريبي.
- Address terms (Pattern 24, egt:554–560): يا حبيبي/يا حبيبتي، يا عم، يا طا/يا أستاذ،
  يا بنت، يا ولد، يا باشا، يا صاحبي.
