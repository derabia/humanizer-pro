# Grade — egt-detect-01

| Checklist item | Result | Evidence |
|---|---|---|
| Meaning/facts preserved (no invented facts) | PASS | Detect mode made no edits; app name "زاد" preserved verbatim in Issues found and quotes. |
| Correct language/variety retained; no MSA leakage in dialect output | PASS (as audit) | No rewrite text produced (detect mode); report correctly identifies the input as MSA-leaking, not genuine Egyptian, matching eval's own expected framing. |
| Output contract followed exactly | PASS | Sections present: المشكلات المرصودة (grouped P0/P1/P2, quoted text + pattern IDs, Tier-1A/1B note), التقييم, النتيجة. No rewritten text, zero editing passes stated. Arabic (MSA) headings used per modes.md even though input is dialect-targeted. |
| Protected spans untouched (SEO/edit) | N/A | No seo modifier, no edit. |
| Second pass present and useful | N/A | Detect mode has no second pass per modes.md; correctly omitted. |
| Detector score improved or explanation given | PASS | Score reported as 100 (AI) from `node scripts/detect.js ... --variety egt --json`, matches `scores-before.json`; scoreShouldImprove=false in eval (detect mode, no rewrite) so flat score is correct behavior. |
| Reads naturally to a native reader | NEEDS-NATIVE-REVIEW | Report prose is MSA (correct per modes.md's heading-language rule); no dialect prose was generated to assess. Flagging per instructions since I am not a native Arabic speaker. |

**Additional notes:** `--variety egt` was forced to get itemized findings; unforced auto-detection returns `variety: msa` because zero Egyptian dialect markers are present — this itself is the finding the eval expects ("reads as MSA dressed up... not clean Egyptian"), and the report states this explicitly.

**Overall: PASS** (one item NEEDS-NATIVE-REVIEW, expected for all Arabic output per task instructions).
