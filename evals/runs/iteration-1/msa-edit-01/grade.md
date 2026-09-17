# Grade: msa-edit-01

## Against `expected` block

- **mustPreserve (fetch(...) line, Authorization header, مجاني/احترافي/مؤسسات, 60, 600, 429):** PASS — confirmed both by direct byte comparison and by `validate.js`'s `[PASS] code-blocks`, `[PASS] table-cells`, and `[PASS] numbers` lines.
- **mustNotContain "نهج موحّد وشامل":** PASS — removed.
- **mustNotContain "بالغ الأهمية":** PASS — removed.
- **mustNotContain "جميع جوانب دورة حياة المنتج":** PASS — removed.
- **scoreShouldImprove: true:** Borderline PASS — `scores-before.json` and `scores-after.json` both score 0 ("HUMAN"). The detector's word list does not currently include the exact phrase "من الجدير بالإشارة" (it has "تجدر الإشارة إلى" and "من المهم الإشارة إلى" from other fixtures, but not this variant — confirmed by checking `scores-before.json`, which shows `issues: []` even though the paragraph is clearly a hedge-plus-inflation AI paragraph by the reference files' own definition). The score did not worsen (0 → 0, and `validate.js` confirms this explicitly), but it could not "improve" numerically because it started at the floor. This is a real detector-coverage gap, not a scoring error in this run — see the "Skill defects found" note this generates for `SUMMARY-en-msa.md`.
- **notes — only the "من الجدير بالإشارة أن اعتماد نهج موحّد وشامل..." paragraph in scope:** PASS — single before/after pair in "التعديلات المنفَّذة".
- **notes — code block and table (60/600, 429) untouched:** PASS — confirmed via `validate.js`.
- **notes — Edits made with before/after, Verification confirming code/table survived:** PASS.

## Against the general Phase 9 checklist

- **Meaning/facts preserved:** PASS — the replacement sentence grounds itself in the doc's own stated fact (most developers hit the same two questions in week one) rather than asserting a new claim.
- **Correct language/variety, no MSA leakage:** PASS — output stays MSA throughout; `scores-after.json` shows `variety: "msa"` with no register-mix flag.
- **Output contract followed exactly:** PASS — file-type check → التعديلات المنفَّذة → التحقق, in Arabic headings, matching `modes.md`.
- **Protected spans untouched:** PASS — `validate.js` exit code 0, 0 violations, 0 warnings.
- **Second pass / Verification useful:** PASS — explicitly names the detector-coverage gap noted above rather than silently claiming a clean score improvement it didn't get.
- **Detector score improved or explanation given:** PASS (explanation given, per the borderline note above — score stayed 0→0, honestly reported and explained rather than glossed over).
- **Reads naturally to a native reader:** NEEDS-NATIVE-REVIEW. Same basis as `msa-rewrite-01`: the source fixture is marked `<!-- NATIVE-REVIEW: msa -->`, and the replacement sentence's phrasing has not been checked by a native speaker for idiom and register fit within a developer-documentation tone.

## Overall

8/9 PASS, 1 borderline-but-honestly-reported (score plateau at 0 due to a detector vocabulary gap, not a false claim), 1 NEEDS-NATIVE-REVIEW. 0 FAIL.
