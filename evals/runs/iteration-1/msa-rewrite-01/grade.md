# Grade: msa-rewrite-01

## Against `expected` block

- **mustPreserve (منصة "جسر"، دروس تفاعلية، اختبارات قصيرة، تقارير للأهل، دعم فني مستمر، خمسين مدرسة، الفصل الدراسي الأول):** PASS — checked each against `rewritten.md`; all present verbatim, including the exact quoted form `منصة "جسر"` with the quotation marks intact.
- **mustNotContain "من المهم الإشارة إلى":** PASS — removed.
- **mustNotContain "علاوة على ذلك، فإن":** PASS — removed (the single strongest MSA AI signature per `ar-shared.md` AR-SH-002).
- **mustNotContain "من الجدير بالذكر أن":** PASS — removed.
- **mustNotContain "من ناحية أخرى":** PASS — removed.
- **scoreShouldImprove: true:** PASS — `scores-before.json` score 39 (MIXED) → `scores-after.json` score 0 (HUMAN), both real `detect.js` runs.
- **notes — strip hedge openers and formulaic-transition stack while keeping every feature and the "50 schools in the first term" figure unexaggerated:** PASS — all four features preserved; "خمسين مدرسة" and "الفصل الدراسي الأول" carried over exactly, with no invented growth number or percentage added.
- **notes — full second-pass audit, reported in Arabic headings:** PASS — المراجعة الثانية section present with all four items (عدد مراحل التحرير / الفحوص / البواقي / سبب التوقف) plus the five-tell re-scan.

## Against the general Phase 9 checklist

- **Meaning/facts preserved:** PASS — every feature, the platform name, and the school count survive; the one sentence cut ("وفي هذا السياق، يمكن القول إن هذا النهج يمثل نقلة نوعية") was a pure significance-inflation claim with no factual content of its own, and its removal is explicitly justified in "ما الذي تغيّر" rather than silently dropped.
- **Correct language/variety, no MSA leakage:** PASS (with a caveat worth surfacing) — the source `scores-before.json` includes a `registerMix` block noting the *source* text mixes MSA and Egyptian markers (`variety: "egt"` detected as a secondary signal, `promoted: false`). This is a property of the **source** text, not something introduced by the rewrite; the rewrite was produced targeting MSA throughout (per the eval's `expected.outputVariety: "msa"`), and `scores-after.json` shows a clean MSA-only reading (`variety: "msa"`, no `registerMix` block on the output). Flagged here for transparency since it's the kind of leakage signal this project cares about, but it resolved correctly.
- **Output contract followed exactly:** PASS — المشكلات المرصودة → النسخة المعدَّلة (once) → ما الذي تغيّر → المراجعة الثانية, matching `modes.md`'s `rewrite` contract with Arabic headings per the report-language rule.
- **Second pass present and useful:** PASS — states a real, checked score delta (39 → 0) rather than an unverified claim.
- **Detector score improved or explanation given:** PASS — 39 → 0.
- **Reads naturally to a native reader:** NEEDS-NATIVE-REVIEW. The rewrite drops the hedges and connectors correctly per the pattern catalog, and keeps the source's rhetorical closing question (a legitimate native MSA device per AR-MSA-021, not an English-style stalling tell). However, the overall rhythm and register of the rewritten Arabic paragraphs have not been checked by a native MSA speaker — this file is explicitly marked `<!-- NATIVE-REVIEW: msa -->` in the source fixture itself, which is this project's own signal that native review is expected before trusting the Arabic prose quality judgment.

## Overall

9/9 PASS on explicit/mechanical checks, 1 NEEDS-NATIVE-REVIEW (Arabic prose naturalness — consistent with the fixture's own `NATIVE-REVIEW` marker). 0 FAIL.
