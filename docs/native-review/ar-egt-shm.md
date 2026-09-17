# Native-review queue — `ar-egyptian.md` / `ar-levantine.md`

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
