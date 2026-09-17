# Grade: msa-seo-01

## Against `expected` block

- **mustPreserve (title/description, shortcode, both internal links, wp:paragraph comment, mail-config.json, email-dashboard.jpg, JSON-LD, معدل الفتح/معدل النقر/معدل إلغاء الاشتراك):** PASS for all — confirmed by direct comparison and by `validate.js --seo keywords.txt`, which passed `frontmatter`, `shortcodes`, `wp-comments`, `link-anchor-internal`, `image-alt-captions`, `json-ld`, and `numbers` with 0 violations. The three rate terms live in the untouched "معدلات يجب مراقبتها" section, outside the one authorized edit span.
- **mustNotContain "من الجدير بالإشارة أن":** PASS — removed.
- **mustNotContain "من المهم الإشارة إلى":** PASS — removed.
- **scoreShouldImprove: true:** PASS — `scores-before.json` score 6 → `scores-after.json` score 0, both real `detect.js` runs; `validate.js`'s own `detector-score` check independently confirms "did not worsen: 6 → 0".
- **notes — only the hedge-heavy sentence under "لماذا تبقى القائمة البريدية مهمة" in scope:** PASS — single before/after pair in "التعديلات المنفَّذة", exactly that sentence.
- **notes — frontmatter, both links, wp:paragraph comment, alt text, JSON-LD, target keyword in title/first-100-words/H2 all survive:** PASS — see "المقاطع المحمية" and the validator's `seo-keyword-placement` PASS line.
- **notes — Edits made, Verification, Protected spans, SEO check sections all present:** PASS.

## Against the general Phase 9 checklist

- **Meaning/facts preserved:** PASS — both claims in the edited sentence (mailing list as a long-term asset, open-rate variance by subject-line quality) survive unchanged in substance.
- **Correct language/variety, no MSA leakage:** PASS — `scores-after.json` shows `variety: "msa"` cleanly.
- **Output contract followed exactly:** PASS — file-type check → التعديلات المنفَّذة → التحقق → المقاطع المحمية → فحص السيو, matching `modes.md` + `seo-mode.md` combined contract.
- **Protected spans untouched:** PASS — `validate.js` exit code 0, 0 violations.
- **Second pass / Verification useful:** PASS — reports the real exit code and the one non-blocking warning (`seo-thin-sections`) rather than hiding it.
- **Detector score improved or explanation given:** PASS — 6 → 0.
- **Reads naturally to a native reader:** NEEDS-NATIVE-REVIEW. Same basis as the other MSA evals in this run — the fixture is marked `<!-- NATIVE-REVIEW: msa -->`, and the edited sentence's phrasing and the surrounding SEO-check prose have not been vetted by a native MSA speaker.

## Notable, correctly-handled edge case

The validator flagged two sections as thin (`seo-thin-sections` warning: the intro paragraph and "معدلات يجب مراقبتها", both under 40 words) that were **not** part of the authorized edit scope — the user asked only about "بعض الأماكن" that sound AI-generated, and the located AI-sounding span was the one hedge-heavy sentence. `output.md`'s SEO check section reports this warning transparently and explains why it was left alone (out of the requested scope) rather than either silently padding those sections or silently ignoring the validator's warning.

## Overall

10/10 PASS on explicit/mechanical checks, 1 NEEDS-NATIVE-REVIEW. 0 FAIL.
