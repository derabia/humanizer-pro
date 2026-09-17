# Grade — egt-edit-01

| Checklist item | Result | Evidence |
|---|---|---|
| Meaning/facts preserved | PASS | Code fence, before/after table (including "ساعتين يوميًا", "نص ساعة بس"), title, intro all byte-identical per `validate.js`. |
| Correct language/variety; no MSA leakage | PASS | Replacement paragraph uses اتعلمت/فرق معايا/ضفت — genuine Masri, matches rest of post's register. Grep for MSA negators/future/demonstratives in `edited.md`: zero real hits. |
| Output contract followed exactly | PASS | Edit-mode contract: refused-file check N/A (already prose), Edits made (single before/after span with location), Verification (re-read confirmation, pass count, validate.js exit code). |
| Protected spans untouched | PASS | `validate.js input.md edited.md` → exit=0, 0 violations. code-blocks and table-cells all PASS. |
| Detector score improved or explanation given | PASS | 12 → 6, `scores-before.json`/`scores-after.json`, matches `validate.js`'s own reported delta (12→6). |
| mustNotContain absent | PASS | "نهج شامل ومتكامل", "بالغ الأهمية", "النجاح المستدام على المدى الطويل" all absent from edited.md (grep-confirmed). |
| Reads naturally to a native reader | NEEDS-NATIVE-REVIEW | Replacement paragraph is short and plausible Masri but unverified by a native speaker. |

**Overall: PASS.**
