# Grade — shami-edit-01

| Checklist item | Result | Evidence |
|---|---|---|
| Meaning/facts preserved | PASS | Config block (SSID/Channel/Extender mode/Backhaul), table rows, and both prose facts ("سرعة ضعيفة بالغرفة الخلفية" etc.) byte-identical per `validate.js`. |
| Correct language/variety; no MSA leakage | PASS | Replacement paragraph uses بدّي/لازم/منيح-register vocabulary matching the rest of the post; grep for the eval's mustNotContain list ("يُريدُ المستخدم", "من الضروري أن يتم", "مواصفات تقنية متقدمة"): zero hits. |
| Output contract followed exactly | PASS | Single-span quote/before/after, Verification section with pass count, validate.js exit code, and explicit checks list. |
| Protected spans untouched | PASS | `validate.js input.md edited.md --variety shami` → exit=0, 0 violations; code-blocks and table-cells explicitly PASS. |
| Detector score improved or explanation given | **PARTIAL — explanation given, not a clean improvement** | Reported score stayed flat at 14→14. The report is transparent about this rather than claiming an improvement that didn't show in the headline number, and traces the real (but unscored) improvement in `stats.msaLeakage` (ratio 0.3→0.1). This is graded PARTIAL because the eval's `scoreShouldImprove: true` expectation was not met by the visible score, even though the underlying content genuinely improved. |
| Reads naturally to a native reader | NEEDS-NATIVE-REVIEW | Per task instructions. |

**Skill defect implicated here** (see SUMMARY "Skill defects found"): `detect.js`'s headline score does not fold in `stats.msaLeakage` improvements when the offending paragraph is short relative to an otherwise-dialectal document, and does not emit a distinct scored issue for "يُريدُ المستخدم أن..." / "من الضروري أن يتم" in this particular full-document context even though the same phrase family is correctly itemized in `shami-detect-01`'s longer, more-MSA-heavy input. This makes the edit-mode "before/after score" verification weaker than intended for exactly the single-bad-paragraph-in-a-good-post scenario this eval is designed to test.

**Overall: PASS on content and process; FLAG on the detector-score signal** (documented as a tool limitation, not an authoring failure).
