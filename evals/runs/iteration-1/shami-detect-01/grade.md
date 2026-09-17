# Grade — shami-detect-01

| Checklist item | Result | Evidence |
|---|---|---|
| Meaning/facts preserved | PASS | "حكي", "عشرين ألف مستخدم", "الأشهر الثلاثة الأولى" all quoted verbatim / referenced in the report; detect mode made no edits. |
| Correct language/variety; no MSA leakage flagged | PASS | Report correctly identifies near-total MSA reversion (يُريدُ, علاوة على ذلك x2, سوف, الآن, لا) with AR-SHM-001/002/004/005/006 and AR-SH-001/002-A IDs. |
| Output contract followed exactly | PASS | Detect + seo modifier: Issues found (P0/P1/P2) → Assessment → Score → Protected spans → SEO check, all present; zero editing passes correctly stated. |
| Protected spans / SEO check (presence check, not diff) | PASS | Correctly framed as a presence check since detect mode performs no rewrite (per eval's own note); frontmatter and shortcode confirmed present; explicit statement that no before/after diff applies. |
| Second pass | N/A | Detect mode has none. |
| Detector score | PASS | 71 (AI), matches `scores-before.json`; scoreShouldImprove=false is correct since nothing was rewritten. |
| Experimental Levantine flag | PASS | `<!-- NATIVE-REVIEW: shami -->` banner at top explicitly states the coverage is experimental pending native review, per SKILL.md §3 requirement. |
| SEO gap honestly reported | PASS | Report flags that the primary keyword "تطبيق تعلم لغات" is not literally present in title or any H2 (there is no H2 at all in the source) — a real, pre-existing gap, reported rather than silently assumed clean. |
| Reads naturally to a native reader | NEEDS-NATIVE-REVIEW | Per task instructions — audit prose is MSA (headings-follow-request-language rule), no dialect prose generated to assess directly. |

**Overall: PASS.**
