# Grade: en-edit-01

## Against `expected` block

- **mustPreserve (bash shebang, set -euo pipefail, three script lines, echo line, ~2 min / ~5 min / ~1 min, "twice this year"):** PASS — diffed `input.md` against `edited.md` directly and via `validate.js`'s `code-blocks`/`table-cells` PASS lines. The bash fence and table are byte-identical; "twice this year" (in the paragraph below the table, not part of the scope) is untouched.
- **mustNotContain "robust and seamless":** PASS — removed.
- **mustNotContain "foundational capability":** PASS — removed.
- **mustNotContain "every dimension of the software lifecycle":** PASS — removed.
- **scoreShouldImprove: true:** PASS — `scores-before.json` score 5 → `scores-after.json` score 0, both real `detect.js` runs; `validate.js`'s own `detector-score` check independently confirms "did not worsen: 5 → 0".
- **notes — only the 'Furthermore, it is worth noting...' paragraph in scope:** PASS — `output.md`'s "Edits made" section shows exactly one before/after pair, for that paragraph only.
- **notes — code fence and table survive byte-for-byte:** PASS — confirmed both by direct read and by `validate.txt`'s `[PASS] code-blocks` and `[PASS] table-cells` lines.
- **notes — report before/after for exactly that one paragraph:** PASS.
- **notes — Verification confirms code/table untouched, reports validate.js exit code:** PASS — `output.md` states exit code 0 explicitly and names both checks.

## Against the general Phase 9 checklist

- **Meaning/facts preserved:** PASS — the rewritten paragraph grounds its claim in a fact already stated in the doc's own opening paragraph (not special-casing tools) rather than asserting a new, generic claim.
- **Output contract followed exactly:** PASS — file-type confirmation → Edits made (before/after, single location) → Verification, matching `modes.md`'s `edit` contract.
- **Protected spans untouched:** PASS — confirmed via `validate.js`, exit code 0, zero violations, zero warnings.
- **Second pass / Verification useful:** PASS — states the editing-pass count, names the exact command run, quotes the actual PASS output, and explicitly lists what was checked byte-for-byte (fence contents, table numbers, "twice this year").
- **Detector score improved or explanation given:** PASS — 5 → 0, verified two ways (direct `detect.js` run and the validator's internal check).
- **Reads naturally:** PASS — the replacement paragraph is short, concrete, and ties directly to the doc's own stated practice rather than sounding like a second AI paragraph swapped in for the first.

## Overall

13/13 PASS. 0 FAIL, 0 NEEDS-NATIVE-REVIEW (English-only, and the validator provides deterministic confirmation rather than requiring judgment).
