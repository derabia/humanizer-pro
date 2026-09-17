# Grade — shami-rewrite-01

| Checklist item | Result | Evidence |
|---|---|---|
| Meaning/facts preserved | PASS | "السوق المركزي", "خمسة عشر", "خمسة وعشرين دولارًا", and the full-day recommendation all present unchanged in `rewritten.md`. |
| Correct language/variety; no MSA leakage | PASS (with one deliberate, documented exception) | Grep for يُريدُ/سوف/لا يستطيع/يجب على/الذي: zero real hits. `detect.js --variety shami` residual after second pass: only `AR-SHM-018` (tanwin on `دولارًا`, inside the protected price figure — kept deliberately per Level-1 protected-content precedence over the Level-5 tashkeel rule) and a weak P2 paragraph-uniformity note. |
| Output contract followed exactly | PASS | Issues found → Rewritten version (once) → What changed → mandatory second-pass audit (all four Verification items + five-tell re-scan) present. |
| Second pass present and useful | PASS | Genuinely caught and fixed a P0 uniform-rhythm finding (AR-SH-004) between first and second pass; score improved 30→16 as a direct result, not just re-stated. |
| Detector score improved or explanation given | PASS | 71 (before) → 16 (after; `scores-before.json`/`scores-after.json`). |
| Experimental Levantine flag | PASS | Report opens and closes with an explicit experimental/pending-native-review notice, and the second-pass section repeats it per SKILL.md §3's instruction to "say so when you deliver Levantine text." |
| Reads naturally to a native reader | NEEDS-NATIVE-REVIEW | Full dialect rewrite generated without native Levantine review; flagged explicitly per task instructions and per the skill's own experimental-coverage warning. |

**Judgment call worth surfacing:** kept the tanwin on `دولارًا` (protected numeric/currency content, Level 1) rather than stripping it per the shared Level-5 tashkeel-removal rule for casual Levantine — this is the precedence system working as designed (protected content beats language reference), documented explicitly in the report rather than silently resolved.

**Overall: PASS.**
