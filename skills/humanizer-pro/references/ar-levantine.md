# Levantine Arabic (الشامي — Syrian, Lebanese, Palestinian) — AI-tell reference
status: experimental — pending native Levantine review

Scope: applies only when the active target dialect/language profile is Levantine Arabic
(Syrian, Lebanese, or Palestinian). Never apply these substitutions to MSA-target text or
to Egyptian-target text (see `docs/CONFLICTS.md` C-04/C-05/C-06 — the same surface form,
e.g. هذا or سوف, is correct MSA and a mandatory-fix AI tell here; these rules are
dialect-scoped, precedence level 5). Levantine text is internally split into three
regional sub-variants with materially different grammar/vocabulary/code-switching —
identify the variant before applying region-specific fixes (see Regional note per entry).

There is no native Levantine reviewer for this pass. Per owner instruction, examples below
are kept as close to the upstream wording as possible rather than rewritten; nearly every
example in this file carries `<!-- NATIVE-REVIEW: shami -->` for that reason (exceptions
are noted where an example is cited verbatim with a line number instead).

Severity note: unlike Egyptian, the upstream source explicitly ranks Category 1 ("Core
Structural Failures," patterns 1–5) as the most damaging tier — "Fix these first before
touching anything else" (shm:112) and "a text with even one MSA verb form or wrong future
marker immediately signals AI to a native reader" (shm:104–105). This project maps
Category 1 → P0. Other severities are this project's judgment call from the source's own
emphasis language, per the owner-approved rubric (significant→P1, critical→P0, minor→P2).

For patterns that are dialect-specific instances of a cross-variety AI tell (hedging
overload, formulaic transitions, significance inflation, uniform sentence rhythm,
list-instead-of-argument, translated-from-English structures, typography), see
`references/ar-shared.md` for the general rule; only the Levantine-specific nuance and
example are kept here.

Line references below are to `_sources/semitic/skills/humanizer-ar-shami/SKILL.md`
(pinned commit `2c9d4fbe3e0086d373b59bfebc9556082275cf62`), abbreviated `shm:`.

---

### AR-SHM-001 — MSA Reversion (MSA-leakage umbrella)
**Severity:** P0  **Provenance:** SM-SHM-001 (shm:116–140); this entry also serves as the
dedicated MSA-leakage section for Levantine (the source names this pattern the umbrella
itself — "This is the #1 failure... the AI's baseline failure mode regardless of which
variant was requested," shm:124–125 — unlike Egyptian, which has no single named umbrella
pattern; see `ar-egyptian.md` AR-EGT-026 for the Egyptian equivalent). Also cites the
non-negotiable-fixes list (shm:1236–1242) and the Stage-3 residual-failures list
(shm:1041–1048).
**What it looks like:** Full MSA grammatical structures in ostensibly Levantine text:
case-ending vowels, formal conjugation يُريدُ أن/يستطيعُ أن, Classical syntax order,
formal relative pronouns الذي/التي/الذين where Levantine uses اللي.
**Why it reads as AI:** "MSA grammar in a Levantine context is not a subtle error. It is
like writing 'thee' and 'thou' in a contemporary English text. Native speakers do not read
through it — they stop." (shm:127–129) Non-regional — applies identically to all three
variants (shm:123–125).
**MSA → Levantine checklist** (cited exactly as the source's non-negotiables list gives
it, shm:1236–1242): ب-prefix on all present-indicative verbs (AR-SHM-002); رح for future,
never سوف/سـ (AR-SHM-004 — note: the source gives only رح as the Levantine future marker,
not حـ/هـ, which is Egyptian's marker; do not import Egyptian's حـ/هـ here); ما for verbal
negation, never لم (AR-SHM-005); مش/مو for nominal negation, never ليس (AR-SHM-005);
remove all tashkeel except shadda (AR-SHM-018); ماذا→شو/إيش, الآن→هلق/هلأ, كثيراً→كتير,
هذا→هاد/هيدا, أريد→بدّي (AR-SHM-006, AR-SHM-007).
**Fix:** Replace the entire clause, not just surface words — "MSA and Levantine have
different underlying grammar; a word-swap without restructuring produces uncanny hybrid
text that is worse than either original." (shm:132–134)
**Before:** يُريدُ أن يذهبَ إلى المنزلِ الآنَ
**After (Syr/Leb):** بدو يروح عالبيت هلق
**After (Pal):** بدو يروح عالبيت هلق (source note: "add ـش to negated versions nearby,"
shm:139)
**Carve-outs:** Applies only to Levantine-target text; never to MSA-target text (C-04/C-05).
<!-- NATIVE-REVIEW: shami -->
Flag: the source's own Palestinian example (shm:139) is textually identical to the
Syrian/Lebanese one and adds a parenthetical note about ـش negation, but the example
sentence itself contains no negated verb to apply ـش to — the note is unattached to any
visible word in the example. Needs a native Palestinian check for what the intended
negated form would actually look like here.

---

### AR-SHM-002 — Missing ب-prefix (Present Tense)
**Severity:** P0  **Provenance:** SM-SHM-002 (shm:143–172)
**What it looks like:** Bare imperfect (يشتغل، تاكل، نروح) for present indicative,
without ب-prefix.
**Why it reads as AI:** "This is the single most reliable AI marker in Levantine Arabic
verb morphology... Missing ب-prefix is to Levantine Arabic what missing -ing is to English
progressive." (shm:146, 159)
**Regional note (universal, shm:149–157):** 1sg بعرف; 2sg.m بتعرف; 2sg.f بتعرفي; 3sg.m
بيعرف; 3sg.f بتعرف; 1pl (Syr/Leb) منعرف; 2pl بتعرفو; 3pl بيعرفو.
**Fix:** Prefix every present-indicative verb. Exception: no ب-prefix after رح (future)
or after عم (progressive) (shm:164–166).
**Before:** هي تشتغل كتير وما تنام بوقتها
**After:** هي بتشتغل كتير وما بتنام بوقتها
**Carve-outs:** No ب-prefix after رح or عم.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-003 — Missing عم Progressive Marker
**Severity:** P0  **Provenance:** SM-SHM-003 (shm:174–197)
**What it looks like:** Continuous actions described with bare imperfect, or with
الآن/هلق appended instead of عم.
**Why it reads as AI:** "Without عم, 'he is eating now' and 'he eats' are expressed
identically in AI-generated Levantine... The absence of عم in a clearly progressive
context signals that the model does not control the aspect system." (shm:185–188)
**Regional note:** عم universal; verb takes بـ after عم in Lebanese (عم بياكل) but drops
it in some Syrian registers (عم ياكل) — both acceptable (shm:181–183).
**Fix:** Add عم before the verb for ongoing/in-progress actions.
**Before:** هو يأكل الآن، ما فيك تكلمو
**After (Syr):** هو عم ياكل هلق، ما فيك تحكيه هلق
**After (Leb):** هو عم بياكل هلأ، ما فيك تحكيه هلق
**Carve-outs:** Verb takes بـ after عم in Lebanese but not in some Syrian registers —
both are correct, not a spelling error.
<!-- NATIVE-REVIEW: shami -->
Flag: the Syrian "After" example repeats هلق twice in one short sentence ("هو عم ياكل
هلق، ما فيك تحكيه هلق," shm:194) — this may be intentional (Pattern 25 elsewhere treats
repetition as natural), but a native reviewer should confirm it is not a copy-paste
artifact from the source.

---

### AR-SHM-004 — Wrong Future: سوف/سـ instead of رح
**Severity:** P0  **Provenance:** SM-SHM-004 (shm:199–218)
**What it looks like:** سوف or سـ prefix for future tense.
**Why it reads as AI:** "سوف is one of the most formal MSA markers. Its presence in
Levantine text has zero ambiguity — it is an AI artifact." (shm:208–209)
**Regional note:** رح is universal across all three variants; the verb after رح takes
bare imperfect — no ب-prefix (shm:205–206).
**Fix:** Replace سوف/سـ with رح; remove any ب-prefix from the following verb.
**Before:** سأذهب إلى الشغل غداً وسوف أكمل التقرير
**After:** رح روح عالشغل بكرا ورح كمّل التقرير
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-005 — Wrong Negation System
**Severity:** P0  **Provenance:** SM-SHM-005 (shm:220–255)
**What it looks like:** لا، لم، لن، ليس (MSA negation particles) in Levantine context.
**Why it reads as AI:** "Using لم/لن/ليس in Levantine is as jarring as using 'shall' or
'doth' in modern casual English writing." (shm:242–243)
**Regional note — the most important split in the file (shm:228–241):** verbal negation
ما is universal (ما رحت Syr/Leb vs. ما رحتش Palestinian, with the ـش circumfix suffix
added); nominal/adjectival negation is مش (Syrian/Lebanese) or مو (Syrian preference for
nominals, some speakers); مش is broader in Lebanese and "can negate almost anything";
prohibition لا is retained in all variants for direct commands (لا تروح!).
**Carve-out — do not treat ـش as universal Levantine:** per `docs/CONFLICTS.md` C-10, the
ما…ش circumfix is scoped to Palestinian/South-Levantine only in this source (shm:230–232),
in contrast to Egyptian Arabic, where the identical circumfix is treated as universal
Egyptian negation (see `ar-egyptian.md` AR-EGT-007, egt:207–212). Do not merge the two
dialects' negation tables or apply Egyptian's "ماـش everywhere" rule to Syrian/Lebanese
text.
**Fix:** Replace لم+verb with ما+verb (+ ـش for Palestinian); replace ليس/لا يكون nominal
negation with مش (Leb/Syr) or مو (Syrian).
**Before:** لم يذهب إلى الاجتماع لأنه ليس متاحاً
**After (Syr):** ما راح عاللقاء لأنو مو فاضي (or مش فاضي)
**After (Leb):** ما راح عاللقاء لأنو مش فاضي
**After (Pal):** ما راحش عاللقاء لأنو مش فاضي
**Carve-outs:** لا is retained for direct prohibition in all variants (لا تروح!).
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-006 — MSA Question Words and Demonstratives
**Severity:** P1  **Provenance:** SM-SHM-006 (shm:265–304)
**What it looks like:** ماذا، متى، كيف، أين، هذا/هذه/هؤلاء، كم، لماذا — full MSA
interrogative/demonstrative inventory.
**Why it reads as AI:** "Using ماذا in a Levantine text is like using 'whom' in a casual
text message... AI consistently uses MSA interrogatives because they dominate written
Arabic training data." (shm:290–293)
**Regional substitution table** (shm:272–288): ماذا→شو (Syr/Leb) / إيش (Pal); أين→وين
(all); كيف→كيف/شلون (all); متى→إيمتا (all); الآن→هلق (Syr) / هلأ (Leb) / هلق (Pal);
كثيراً→كتير (all); لماذا→ليش (all); هذا/هذه→هاد/هاي (Syr) / هيدا/هيدي (Leb) / هاد/هاي
(Pal); هؤلاء→هدول (Syr) / هيدول (Leb) / هدول (Pal); كم→قديش (Syr) / أديش (Leb/Pal);
الذي/التي→اللي (all); حتى→لحتى/تا (all); أيضاً→كمان (all); فقط→بس (all); إذا→إذا/لو (all).
**Fix:** Replace every MSA question word and demonstrative; check the surrounding
grammar still coheres after substitution.
**Before:** ماذا تريد أن تفعل الآن؟ هذا الأمر يحتاج إلى كثير من الوقت
**After (Syr):** شو بدك تعمل هلق؟ هاد الشي بدو كتير وقت
**After (Leb):** شو بدك تعمل هلأ؟ هيدا الشي بدو كتير وقت
**After (Pal):** إيش بدك تعمل هلق؟ هاد الشي بدو كتير وقت
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-007 — أريد instead of بدّ
**Severity:** P1  **Provenance:** SM-SHM-007 (shm:307–343)
**What it looks like:** أريد، أودّ، أتمنى، أرغب for "I want" in informal contexts.
**Why it reads as AI:** "AI almost never produces [the بدّ system] spontaneously —
defaulting instead to أريد even when the surrounding text is otherwise Levantine."
(shm:311–312)
**Regional note (universal, shm:319–326):** بدّي (I want), بدّك (you m/f), بدّو (he),
بدّها (she), بدّنا (we), بدّكن/بدّكم (you pl), بدّهن/بدّهم (they). The verb after بدّ
takes bare imperfect — no ب-prefix: بدّي نام, not بدّي بنام (shm:328–329).
**Fix:** أريد→بدّي، يريد→بدّو، تريد(f)→بدّها، نريد→بدّنا; check following verb is bare
imperfect.
**Before:** أريد أن أنام مبكراً الليلة، وهو يريد أن يذهب إلى السينما
**After:** بدّي نام بكير الليلة، وهو بدّو يروح عالسينما
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-008 — MSA Pronouns and Verb Agreement
**Severity:** P1  **Provenance:** SM-SHM-008 (shm:345–374)
**What it looks like:** MSA أنتم، هم، هن and dual forms هما/أنتما; missing -و on
2nd/3rd plural verb agreement.
**Why it reads as AI:** "Levantine انتو is so obligatory that its absence — in any
register short of formal speech — marks the text as foreign or AI-generated." (shm:363–365)
**Regional table** (shm:352–358): أنتم→انتو (all); هم/هن→هني/هنّ (Syr) / هودي (Leb) /
هني (Pal); هما (dual)→collapses into plural form per variant; نحن→نحنا/إحنا (Syr) / نحنا
(Leb) / إحنا (Pal); أنا→أنا/انا (all). Plural verb agreement adds -و: بتشتغلو، بيروحو،
بتاكلو، بتعملو.
**Fix:** Replace أنتم→انتو، هم/هن→هني (Syr/Pal) or هودي (Leb); remove dual forms; add -و
to plural verbs.
**Before:** هل أنتم موافقون؟ هم لم يفهموا ما قلته
**After (Syr):** انتو موافقين؟ هني ما فهمو شو قلت
**After (Leb):** انتو موافقين؟ هودي ما فهمو شو قلت
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-009 — MSA Prepositions (إلى/من instead of عـ)
**Severity:** P1  **Provenance:** SM-SHM-009 (shm:377–401)
**What it looks like:** إلى for motion-to (ذهب إلى البيت).
**Why it reads as AI:** "إلى البيت in casual Levantine text reads like 'I am going to
mine domicile' in English — technically correct but register-wrong." (shm:390–391)
**Regional note (universal):** عـ contraction: عالبيت، عالشغل، عالمدرسة، عالسوق،
عالمستشفى; indefinite less common (عبيت/عشغل); في البيت acceptable in some formal
Levantine writing but not casual (shm:383–388).
**Fix:** Contract إلى+definite noun to عـ+noun in all location/destination phrases.
**Before:** ذهب إلى البيت وأكل، ثم عاد إلى المدرسة
**After:** راح عالبيت واكل، وبعدين رجع عالمدرسة
**Carve-outs:** في البيت acceptable in formal Levantine register, not casual.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-010 — Active Participle as Present State
**Severity:** P1  **Provenance:** SM-SHM-010 (shm:403–439)
**What it looks like:** Conjugated verbs for stative predicates (أنا أعرف، أنا أذهب،
أنا أفهم) instead of active-participle forms.
**Why it reads as AI:** "AI almost never produces [the participle-as-present-state]
because MSA does not use participles this way. Replacing conjugated verb forms with
participles adds a layer of naturalness that is impossible to achieve through vocabulary
substitution alone." (shm:426–429)
**Regional note (universal):** يعرف→عارف/عارفة، يذهب→رايح/رايحة، يجي→جاي/جاية،
يمشي→ماشي/ماشية، يشوف→شايف/شايفة، يسمع→سامع/سامعة، يفهم→فاهم/فاهمة، يحب→حابب/حاببة،
يخاف→خايف/خايفة، يرفع→رافع/رافعة (shm:411–422).
**Fix:** Identify stative contexts (knowing, location, motion, perception) and replace
the conjugated verb with the gender-agreed participle.
**Before:** أنا أعرف هذا الموضوع جيداً وأنا ذاهب إلى هناك الآن
**After:** أنا عارف هاد الموضوع منيح وأنا رايح لهونيك هلق
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-011 — Missing Discourse Fillers
**Severity:** P1  **Provenance:** SM-SHM-011 (shm:448–483)
**What it looks like:** Clean, particle-free clause chains.
**Why it reads as AI:** "AI Arabic has particle desert — long clause chains with zero
particles. Humans sprinkle particles every 2-3 clauses minimum in informal registers."
(shm:472–474) The source's claim that this is confirmed by "stylometric research" (shm:
471–472) is an uncited claim and is dropped per the statistic-drop rule; the prescriptive
instruction is kept.
**Regional note** (shm:458–469): يعني (universal, "I mean"/hedging), بس (universal),
هيك (Syr/Pal, "like this/right?"), طبعاً (universal), والله (universal), يلا (universal),
لا2 (universal written "no but actually"), آخ (universal), بالكيف (Syrian), عنجد
(Lebanese-heavy), وبعدين (universal), ما أدري (universal, softer than ما بعرف).
**Fix:** Add particles by pragmatic need, not mechanically — "Each particle should feel
earned." (shm:478)
**Before:** هذا الأمر صعب وأحتاج وقتاً للتفكير فيه. لا أعرف ما يجب فعله
**After:** يعني هاد الشي صعب، بدّي وقت أفكر فيه بس، والله ما عارف شو لازم أعمل
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-012 — Formal Transition Phrases
**Severity:** P1  **Provenance:** SM-SHM-012 (shm:486–515)
See `ar-shared.md`: formulaic transitions — apply the shared-core rule for the general
formal-transition tell. Levantine-specific nuance kept here: the regional substitution
table, since it diverges from both MSA's and Egyptian's fix sets for the same source
phrase family (see `docs/CONFLICTS.md` C-11 — MSA, Egyptian, and Levantine each supply a
different, dialect-specific replacement for the same underlying من المهم أن نلاحظ /
تجدر الإشارة إلى / علاوة على ذلك phrase family; do not collapse into one universal fix).
**Regional table** (shm:493–501): من ناحية أخرى→بس من ناحية تانية (all); علاوة على
ذلك→وكمان/وبعدين (all); في هذا السياق→يعني بهاد الموضوع (Syr/Pal) / بهيدا الموضوع (Leb);
من المهم أن→المهم/بدّنا (all); لذلك/لهذا→مشان هيك (Syr/Pal) / لهيك (Leb); بالإضافة إلى
ذلك→وزيادة عليه/وكمان (all); خلاصة القول→يعني بالآخر (all).
**Fix:** "If the text has more than two formal transitions per 100 words, it needs
structural re-thinking, not just surface substitution." (shm:509–510) — the "two per 100
words" figure is kept as a prescriptive threshold from the source rather than dropped,
since it functions as an editing rule, not a claim about AI/human behavior.
**Before:** من المهم أن نلاحظ أن هذا الوضع يحتاج إلى معالجة دقيقة. علاوة على ذلك، يجب أن
نأخذ في الاعتبار
**After:** المهم هاد الوضع بدو معالجة منيحة. وكمان لازم ناخد بعين الاعتبار
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-013 — Uniform Register
**Severity:** P1  **Provenance:** SM-SHM-013 (shm:518–542)
**What it looks like:** Flat, consistent formal-casual register throughout; no emotional
peaks, no sudden informality, no register drops.
**Why it reads as AI:** "Humans shift register constantly: they start casual, get
emotional, drop a joke, get serious, then drop to a soft almost-whisper register for
sensitive moments. AI writes in a flat horizontal line." (shm:530–532) The source's claim
that "stylometric research on human Arabic text confirms" this (shm:528–529) is dropped
per the statistic-drop rule; the qualitative observation and fix are kept.
**Regional note:** Universal discriminator, but Lebanese text tends to show the most
dramatic register swings (formal-then-suddenly-affectionate); Syrian tends to show
warm-then-dry-then-funny patterns (shm:525–526).
**Fix:** Introduce deliberate register variation: formal → sudden warmth → pull back →
dry observation; use intimate address (حبيبي، والله) after a formal passage.
**Before:** هذا الموضوع يحتاج إلى اهتمام. يجب أن نتعامل معه بجدية. النتائج ستكون مهمة.
**After:** هاد الموضوع بدو اهتمام، بس — والله يا حبيبي — لو تعرف قديش صار يعني. بدّنا نعمل
شي. آخ.
**Carve-outs:** This entry is kept distinct from `ar-shared.md`'s "uniform sentence
rhythm" concept — it is about emotional/formality register shifts, not sentence-length
variance (that is AR-SHM-024, which is deferred).
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-014 — Heavy Passive Voice
**Severity:** P1  **Provenance:** SM-SHM-014 (shm:545–571)
**What it looks like:** يُعتبَر، يُستخدَم، يُلاحَظ، يُقال، يُفترَض — MSA passive forms
carried over into Levantine generation.
**Why it reads as AI:** "Passive voice in Arabic is a written-register feature. In
Levantine informal text, even one passive verb stands out. Two or more and the text reads
as a news bulletin." (shm:561–563)
**Regional note (universal avoidance strategies, shm:555–559):** drop subject (قالوا
إنو...); صار+noun (صار وضع غريب); مفعول-participle stative (الباب مقفول); active with
general subject (كل واحد بيستخدم...).
**Fix:** Convert every morphological passive to one of the above active strategies.
**Before:** يُعتبَر هذا الأمر مهماً ويُستخدَم كثيراً في هذا المجال
**After:** هاد الشي مهم وكل واحد بيستخدمو بهاد المجال
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-015 — No Reader-Directed Questions
**Severity:** P1  **Provenance:** SM-SHM-015 (shm:574–602)
**What it looks like:** Monologic text — statements, explanations, arguments, but no
question or confirmation check directed at the reader.
**Why it reads as AI:** "Levantine Arabic has a strong oral/dialogic tradition... AI
writes soliloquy. Humans write dialogue even when alone." (shm:591–593)
**Regional table** (shm:581–589): مش هيك؟، بتفهم؟، يعني؟، شايف شو قصدي؟ (Syr/Leb) /
شايف إيش قصدي؟ (Pal)، مشان هيك؟ (Syr/Pal) / لهيك؟ (Leb)، آه؟، صح؟.
**Fix:** Add 2–3 confirmation questions at natural pause points — "2-3 per 200 words is
natural." (shm:597)
**Before:** هذا النهج أفضل لأنه يوفر الوقت والجهد. النتائج ستكون ممتازة.
**After:** هاد الأسلوب أحسن لأنو بيوفر وقت وجهد، بتفهم؟ يعني النتايج رح تكون ممتازة، مش
هيك؟
**Carve-outs:** This project treats rhetorical/reader-directed questions as legitimate
Arabic rhetoric, not an AI tell to be suppressed (owner decision; see `docs/CONFLICTS.md`
C-02) — the general English-language "rhetorical questions are earned, not a stall" rule
is explicitly inverted for Levantine text and must not be applied here.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-016 — Lebanese: Missing French Code-Switching
**Severity:** P0  **Provenance:** SM-SHM-016 (shm:612–652)
**What it looks like:** Pure Arabic in Lebanese-target text.
**Why it reads as AI:** "Producing pure Arabic when writing Lebanese is the single
strongest tell that the text is AI-generated." (shm:640–641)
**Regional note — applies ONLY to Lebanese (shm:619–620):** "Do not add French to Syrian
or Palestinian text." Obligatory domains (shm:624–635): thanks→merci (vs شكراً, "too
formal"); greeting→bonjour/bonsoir (vs مرحبا); transport→voiture/taxi/ascenseur;
clothing→pantalon/chemise/veste; food/drink→café/boulangerie/crêpe; medical→médecin/
pharmacie/urgences; housing→appartement/immeuble; driving→permis/parking; problems→
problème/stress/tension; centre/mall→centre/mall. The source's stated frequency ("3-5
French insertions per 100 words minimum... heavy speakers 10-15 per 100 words," shm:
637–638) is dropped per the statistic-drop rule as an uncited numeric claim; the
qualitative instruction to integrate French naturally is kept.
**Fix:** Identify semantic domains above; replace Arabic equivalents with French
insertions, integrated naturally (not translated or glossed).
**Before:** شكراً جزيلاً على مساعدتك. كانت سيارتك أمام المصعد
**After (Leb):** merci كتير! عنجد تعبتو حالكن. كانت الـ voiture أمام الـ ascenseur
**Carve-outs:** Lebanese only — never apply to Syrian or Palestinian text.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-017 — Syrian/Palestinian: Missing English Code-Switching
**Severity:** P1  **Provenance:** SM-SHM-017 (shm:655–691)
**What it looks like:** Formal Arabic tech/work vocabulary (الحاسوب، البريد الإلكتروني،
الهاتف المحمول، الاجتماع) where English is natural.
**Why it reads as AI:** "The formal Arabic equivalents... are used in formal MSA
contexts... In casual Syrian or Palestinian writing, these terms are jarring. Everyone
says 'message' not 'رسالة' in digital contexts." (shm:678–681)
**Regional note:** Applies to Syrian and Palestinian (and Jordanian); Lebanese also
code-switches to English but French remains dominant there (shm:660–661). Domains
(shm:667–676): ok/okay (vs حسناً); cool/vibe/mood (vs رائع); sorry (vs آسف); meeting/
deadline/update (vs اجتماع، موعد نهائي); DM/message/post/story (vs رسالة، منشور);
screenshot/share/follow; email/WhatsApp (vs بريد إلكتروني); wow/omg (vs واو); brunch/
dessert (vs إفطار متأخر); cashback/transfer (vs إعادة مبلغ).
**Fix:** Replace formal Arabic tech/work vocabulary with English; keep Arabic for
emotion/family/social.
**Before:** أرسل لي رسالة إلكترونية عندما تنتهي من الاجتماع
**After (Syr):** بعتلي message أو DM لمّا تخلص من الـ meeting
**Carve-outs:** Not for Lebanese (French dominates there — see AR-SHM-016).
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-018 — Diacritics Present (Tashkeel)
**Severity:** P0  **Provenance:** SM-SHM-018 (shm:693–715)
**What it looks like:** Full or partial tashkeel (fatha, kasra, damma, sukun, tanwin) in
non-Quranic, non-pedagogical text.
**Why it reads as AI:** "AI models sometimes add diacritics because MSA training text
often includes them for disambiguation... Humans never write tashkeel in casual Arabic."
(shm:696–697, 705) The source's claim that this is confirmed as "one of the strongest
single-feature predictors of AI authorship" by unnamed "studies on Arabic authorship
attribution" (shm:703–706) is an uncited claim and is dropped per the statistic-drop
rule; the mechanical instruction is kept.
**Regional note (universal):** shadda (ّ) is retained, particularly on doubled
consonants carrying meaning (بدّي, هلّق) (shm:700–701).
**Fix:** Strip all diacritics except shadda — a mechanical operation.
**Before:** يُريدُ أنْ يَذهبَ إلى البَيتِ الآنَ
**After:** بدو يروح عالبيت هلق
**Carve-outs:** Shadda is retained; this is the one diacritic not stripped.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-019 — Formal Hamza Writing
**Severity:** P2  **Provenance:** SM-SHM-019 (shm:718–748)
**What it looks like:** Precise initial hamza (أنا، إلى، أكل، إنّ، أيضاً) where informal
Levantine simplifies or drops it.
**Why it reads as AI:** "Formal hamza writing is an orthographic marker of formal
register... hamza simplification is the norm — not laziness, but a stable sociolinguistic
feature of informal Levantine orthography." (shm:736–738)
**Regional note (universal):** أنا→انا، أكل/يأكل→اكل/ياكل، إلى→ل/عـ (usually contracted
anyway)، أيضاً→كمان (replaced)، أيمتى→ايمتا، إيش→ايش (Palestinian)، إنّ/إنّو→إنو/انو
(shm:727–734).
**Fix:** Apply selectively — أنا→انا, يأكل→ياكل, إنّو→انو are the most common; "do not
over-apply — some words retain hamza even in informal writing." (shm:742)
**Before:** أنا أريد أن أكل شيئاً الآن
**After:** انا بدّي آكل شي هلق (source's own alternate: انا بدي ياكل شي هلق "in some
orthographic registers," shm:747)
**Carve-outs:** Apply selectively — not every hamza-initial word simplifies.
<!-- NATIVE-REVIEW: shami -->
Flag: the source itself offers two alternate "Human" forms for the same sentence —
"انا بدّي آكل شي هلق" and "انا بدي ياكل شي هلق" (shm:747) — the second uses ياكل
(a 3rd-person/participle-adjacent form) after the 1st-person بدي, which reads as a
possible person-agreement inconsistency; the source hedges with "in some orthographic
registers" rather than resolving it. A native reviewer should confirm which (if either)
form is standard.

---

### AR-SHM-020 — ث/ذ Not Phonologically Shifted
**Severity:** P2  **Provenance:** SM-SHM-020 (shm:751–779)
**What it looks like:** MSA interdentals ث/ذ preserved where Levantine speech/informal
writing shifts them.
**Why it reads as AI:** "In casual Levantine, especially Syrian, these sounds are merged
with ت/د respectively. Reflecting this in informal writing adds authenticity." (shm:768)
**Regional note:** "One of the most dialect-specific orthographic features and must be
applied carefully and selectively. Over-application produces caricature." (shm:756–757)
Common shifts (shm:760–765): هذا→هاد/هاداك (replacement, not just spelling); ثاني→تاني;
كذب/كذبة→كدب/كدبة (ذ→د in Syrian); ذهب→راح (replacement verb); ثلاثة→تلاتة (ث→ت in
counting, very common); ذوق→دوق.
**Fix:** Apply selectively to the most common words only (هذا, ثاني, كذب, تلاتة); "do not
mechanically shift every ث/ذ — consult the word-by-word usage pattern." (shm:773–774)
**Before:** هذا الشخص كاذب، وهذا ثاني شخص يفعل هذا
**After:** هاد الشخص كدّاب، وهاد تاني شخص عم يعمل هيك
**Carve-outs:** Selective application only; over-application produces caricature. Some
words retain ذ/ث in Levantine even when pronounced differently (shm:770–771).
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-021 — Missing Interjections
**Severity:** P1  **Provenance:** SM-SHM-021 (shm:789–827)
**What it looks like:** Emotionally flat text — descriptions of food, news, events, or
feats with no interjective response. "AI describes; humans react." (shm:793)
**Why it reads as AI:** "The emotional punctuation of a text through interjections is not
optional color — it is how native speakers signal their emotional presence in the text."
(shm:815–816)
**Regional table** (shm:797–812): والله/وبالله (universal); يخرب بيتك (universal
affectionate curse); يسلمو/يسلم إيدك (Syrian primary); يعطيك العافية (universal); يا سلام
(universal); آخ (universal); ضبي (Palestinian/South Levantine); يا حيوان (Syrian/
Lebanese informal); شو هالشي! (Syrian/Lebanese); ما شاء الله (universal); يلعن دينو
(universal, moderate); حرام (universal); الله يرحمو (universal, deceased); يا ويلي
(universal).
**Fix:** At each emotionally significant beat, add the appropriate interjection.
**Before:** هذا الطعام لذيذ جداً، ويستحق المدح
**After (Syr):** والله يا حبيبي هاد الأكل يسلمو إيدو، آخ ما أحلاه، شو هالشي!
**Carve-outs:** Several interjections are region-marked (see table) — do not use
Syrian-only or Palestinian-only items in other-variant text.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-022 — Wrong Terms of Address
**Severity:** P1  **Provenance:** SM-SHM-022 (shm:830–864)
**What it looks like:** يا صديقي (formal), يا أخي (somewhat formal), يا سيدي (very
formal) — MSA address conventions.
**Why it reads as AI:** "No casual Levantine speaker addresses a friend as يا صديقي."
(shm:855–856)
**Regional table** (shm:840–849): general affection (m/f)→حبيبي/حبيبتي (all); older
man→عمو (all); older woman→عمتي (all); male peer informal→يا زلمي/يا زلمة (Syr) / يا
زلمي (Leb/Pal); male peer casual→يا عمي (all); group→يا شباب (all); girl→يا بنت (all,
Pal also ضبي); close friend f-f→يا روحي (all); warm→يا قلبي (all); professional
neutral→يا أستاذ (all). حبيبي is used for strangers in service contexts (waiter,
shopkeeper) without romantic implication (shm:851–852).
**Fix:** Replace يا صديقي/يا أخي/يا سيدي with the context-appropriate Levantine term.
**Before:** يا صديقي، أنت تعرف أن هذا صحيح
**After:** حبيبي، انت عارف إنو هاد صح، مش هيك؟
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-023 — Missing Turkish Loanwords (Syrian)
**Severity:** P2  **Provenance:** SM-SHM-023 (shm:867–902)
**What it looks like:** Standard Arabic vocabulary used in Syrian-target text where
Turkish loanwords are the natural Levantine choice.
**Why it reads as AI:** "Turkish loanwords in Syrian are not archaic or formal — they are
the default terms used in everyday speech." (shm:891–892)
**Regional note — Syrian only (shm:873–874):** "Do not introduce Turkish loans to
Lebanese or Palestinian text — they sound foreign there." Core loans (shm:878–889):
oda→أوضة (vs غرفة); fincan→فنجال (vs فنجان); çamaşır→جمشير (archaic, vs غسيل);
tencere→طنجرة (vs وعاء/قدر); boya→بوية (vs صبغة); çizme→جزمة (vs حذاء); yufka→يفكة (vs
خبز رقيق); bardak→بردقة (dialectal, vs كأس); çanta→شنطة (vs حقيبة); kahve→قهوة (shared
root).
**Fix:** Apply selectively where the Turkish loan is genuinely the everyday default
(أوضة for room, فنجال for coffee cup, طنجرة for pot, شنطة for bag).
**Before:** وضع حقيبته في الغرفة وانتظر
**After (Syr):** حط شنطتو بالأوضة وستنّا
**Carve-outs:** Syrian text only — never apply to Lebanese or Palestinian text.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-024 — Uniform Sentence Length Distribution
**Severity:** P1  **Provenance:** SM-SHM-024 (shm:905–936)
See `ar-shared.md`: uniform sentence rhythm — apply the shared-core rule for the general
sentence-length-variance tell. The source's stated "15–25 word" AI band (shm:908) and the
"most robust machine-learning feature" claim (shm:923–924) are uncited numeric/stylometric
claims and are dropped per the statistic-drop rule; the paratactic-structure nuance below
is kept as Levantine-specific.
**Levantine nuance kept here:** "Levantine human text is particularly extreme in this
variation because of its paratactic structure — native speakers link clauses indefinitely
with وبعدين... without feeling the need to end sentences." (shm:911–914) Required range
(shm:916–921): ultra-short (1–4 words: بدّك؟ ليش؟ مش هيك؟ والله؟ يعني...); short (5–10);
medium (11–20); long paratactic chains (30–60+ words linked by وبعدين/بس/ويلا).
**Fix:** Deliberately fragment some sentences into 1–4 word utterances; deliberately
merge others into long paratactic chains; range 3 to 50+ words across the text.
**Before:** ذهبت إلى السوق اليوم واشتريت بعض الأشياء. كان الطقس جميلاً وكنت سعيداً
بتجربتي.
**After:** رحت عالسوق اليوم. والله. اشتريت أشياء وبعدين الجو كان منيح وكنت مبسوط وبعدين
رجعت عالبيت وأكلت وناميت. بس هيك.
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->

---

### AR-SHM-025 — Consistent Spelling of Variable Words
**Severity:** P2  **Provenance:** SM-SHM-025 (shm:939–976)
**What it looks like:** AI always spells a variable word identically throughout a text
(هلق is always هلق; مش is always مش).
**Why it reads as AI:** "Perfect spelling consistency is an AI artifact. Human keyboard
writers in Arabic dialect have no spellchecker, no standard orthography, and type fast...
AI picks one form and commits to it with machine consistency." (shm:964–968)
**Fix:** Introduce deliberate variation — "1-2 variations per document is enough to break
the AI pattern." (shm:972)
**Before:** هو هني هلق. هني بيشتغلو هلق. ما بعرف وين هني.
**After:** هو هني هلق. هنّ عم يشتغلو هلأ. ما بعرف وينن.
**Carve-outs:** None stated in source.
<!-- NATIVE-REVIEW: shami -->
Flag (verbatim from source, not authored here): the source's own "variant spellings"
table (shm:951–962) lists several pairs as visually identical strings offered as
variants — هلق/هلأ/هلأ (now, "هلأ" repeated); هيدا/هيدا (Lebanese "this," labeled "Minor
variation"); معي/معي/مي (with me — two identical plus one clearly different word);
كيف/كيف (how, identical); هونيك/هونيك (there, identical); بس/بس (so/but, "Identical, but
note spacing habits"). These read as authoring artifacts in the upstream source itself
(see `docs/inventory/semitic.md` §11 item 3) and should be re-verified against real usage
rather than reused as-is.

---

## Dialect markers (for language-ID / dialect-detection use)

Cited exactly as the source lists them, for use by a downstream dialect-identification
script — not a rule pattern in its own right.

- Philosophy core set (shm:42): شو (not ماذا), بدّ (not أريد), هلق (not الآن), رايح
  (not ذاهب).
- Full regional marker table (Pattern 6, shm:272–288, AR-SHM-006): شو/إيش (what), وين
  (where), كيف/شلون (how), إيمتا (when), هلق/هلأ (now), كتير (a lot), ليش (why), هاد/هيدا
  (this), هدول/هيدول (these), قديش/أديش (how much), اللي (who/which).
- Region-detection badge words (shm:94–97): هيدا → Lebanese; إيش or ما…ش → Palestinian;
  يسلمو or هدول → Syrian.
- Discourse fillers (Pattern 11, shm:458–469): يعني، بس، هيك، طبعاً، والله، يلا، لا2، آخ،
  بالكيف (Syrian)، عنجد (Lebanese-heavy)، وبعدين، ما أدري.
- Confirmation-question set (Pattern 15, shm:581–589): مش هيك؟، بتفهم؟، يعني؟، شايف
  شو/إيش قصدي؟، مشان هيك؟/لهيك؟، آه؟، صح؟.
- Address terms (Pattern 22, shm:840–849): حبيبي/حبيبتي، عمو، عمتي، يا زلمي/يا زلمة، يا
  عمي، يا شباب، يا بنت/ضبي، يا روحي، يا قلبي، يا أستاذ.
