# Grade: en-seo-01

## Against `expected` block

- **mustPreserve (frontmatter title/description, shortcode, both internal links, wp:paragraph comment, desk-specs.json, desk-corner.jpg, JSON-LD, 40/48/55):** PASS for all — confirmed by direct comparison and independently by `validate.js --seo keywords.txt`, which passed every structural check (`frontmatter`, `shortcodes`, `wp-comments`, `link-anchor-internal`, `image-alt-captions`, `json-ld`, `numbers`) with 0 violations.
- **mustNotContain "invented review quotes":** PASS — none added.
- **mustNotContain "invented user counts":** PASS — none added.
- **mustNotContain "padded filler sentences added to the thin sections":** PASS — the "Sizes to consider" section was trimmed, not padded; word count went from 42 to 24 words in that section (shorter, not longer), and the validator's own `seo-thin-sections` warning independently confirms it is still thin, i.e. it was not artificially inflated to look complete.
- **scoreShouldImprove: true:** Borderline PASS — `scores-before.json` and `scores-after.json` both score 0 ("Clean"); the source was already clean by the detector's numeric measure, so there was no headroom for a score improvement. The qualitative improvement (removing the EN-049 redundancy between the intro and "Why standing desks help", tightening the hedge in "Choosing a small-footprint desk") is real but doesn't move a detector that scored 0 to begin with. This is reported honestly in `output.md` rather than claiming a score drop that didn't happen.
- **notes — thin content flagged, not padded, sizes section specifically:** PASS — called out explicitly in Issues found, What changed, and SEO check, with the validator's independent `seo-thin-sections` warning quoted as corroboration.
- **notes — frontmatter/shortcode/wp:paragraph/links/alt/JSON-LD/keyword-in-title-first-100-words-H2 all survive:** PASS — see Protected spans section and the validator's `seo-keyword-placement` PASS line.
- **notes — Protected spans and SEO check sections present:** PASS.

## Against the general Phase 9 checklist

- **Meaning/facts preserved:** PASS — no claim, number, or spec changed; the monitor-arm compatibility (32 inches) and all three desk widths are untouched.
- **Output contract followed exactly:** PASS — Issues found → Rewritten version → What changed → Second-pass audit → Protected spans → SEO check.
- **Protected spans untouched:** PASS — `validate.js` exit code 0, 0 violations.
- **Second pass present and useful:** PASS — explicitly reports the one residual (the thin section, left thin on purpose) and one weak em-dash finding (P2, judged and kept rather than mechanically stripped) instead of claiming a spotless sweep.
- **Detector score improved or explanation given:** PASS (explanation given) — the source was already at 0; the audit says so plainly rather than fabricating an improvement.
- **Reads naturally:** PASS — the rewrite reads as ordinary blog prose, not noticeably different in register from the source (appropriate, since the source itself scored "Clean").

## Overall

12/12 PASS (one borderline item resolved by honest reporting rather than a score gimmick). 0 FAIL, 0 NEEDS-NATIVE-REVIEW.
