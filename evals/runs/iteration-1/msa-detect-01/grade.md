# Grade: msa-detect-01

## Against `expected` block

- **mustPreserve "ثلاثة أشهر":** PASS — detect mode, no rewrite; the phrase is quoted correctly by the source and untouched.
- **mustNotContain:** N/A (empty list).
- **scoreShouldImprove: false:** PASS — only `scores-before.json` produced, no rewrite attempted.
- **notes — audit catches hedging overload (من المهم الإشارة إلى، تجدر الإشارة إلى، لا بد من التنويه):** PASS — all three quoted and cited AR-SH-001, matching `scores-before.json`'s four `hedge-opener` hits (the fourth, "مما لا شك فيه", is also cited).
- **notes — formulaic conclusion (وفي الختام، آمل أن يكون...):** PASS — quoted and cited AR-SH-002-C / AR-MSA-005.
- **notes — تم/يتم passive-voice overuse (تم إطلاق، يُستخدم، يُلاحظ، يُعتبر):** PASS — both تم instances cited AR-MSA-006 (P0), and the يُستخدم/يُلاحظ/يُعتبر family cited AR-SH-007 (P1), matching `scores-before.json`'s exact excerpts and pattern IDs.
- **notes — pattern IDs AR-SH-001 / AR-MSA-005 / AR-MSA-006:** PASS — all three appear, plus AR-SH-007 and AR-SH-002-C which the notes also gesture at via "يُستخدم/يُلاحظ/يُعتبر" and "الختام".
- **notes — MSA heading forms used regardless of dialect:** PASS — headings are المشكلات المرصودة / التقييم / النتيجة, matching `modes.md`'s table; the request itself mixed a dialect-flavored verb ("قول لي") but the input text is MSA and the heading table applies regardless.
- **notes — numeric Score or explicit not-computed string:** PASS — Score: 59/100 (AI), from an actually-executed `detect.js` run.

## Against the general Phase 9 checklist

- **Meaning/facts preserved:** PASS — no rewrite; "ثلاثة أشهر" and every other fact quoted accurately.
- **Correct language/variety, no MSA leakage:** PASS — input and report both MSA; no dialect substitution attempted (none was in scope for detect mode).
- **Output contract followed exactly:** PASS — Issues found (P0/P1/P2) → Assessment → Score, in Arabic, with MSA heading forms.
- **Protected spans untouched:** N/A (not edit/seo).
- **Second pass:** N/A, correctly omitted for detect mode.
- **Detector score improved or explanation given:** PASS (N/A for detect, score reported honestly: 59, AI-classified).
- **Reads naturally to a native reader:** NEEDS-NATIVE-REVIEW. The Arabic prose in "Issues found" and "Assessment" was written by a non-native-Arabic-speaking model process; while it follows the reference files' own Arabic terminology and quotes the source text directly (reducing risk, since most of the Arabic content is verbatim source quotation rather than newly generated prose), the connective analysis sentences around the quotes (e.g. "هذا تراكم كثيف لا إشارة واحدة ضعيفة يمكن غض الطرف عنها") have not been checked by a native MSA speaker for register or idiom naturalness. Flagging per this project's standing instruction to flag uncertain Arabic rather than assume it is fine.

## Overall

8/8 PASS on explicit/mechanical checks, 1 NEEDS-NATIVE-REVIEW (naturalness of the newly-written Arabic analysis prose, not the quoted source text). 0 FAIL.
