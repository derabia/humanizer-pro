# ziadfaisalaljdy-beep / arabic-humanizer — competitor review

Repo root reviewed: `_sources/competitors/ziadfaisalaljdy-beep_arabic-humanizer/` (3 files, all read: `LICENSE`, `README.md`, `SKILL.md`).

## 1. Identity

- URL: implied `github.com/ziadfaisalaljdy-beep/arabic-humanizer` (folder name; no remote inspected in this clone).
- HEAD SHA: `188b0e3cd91a63b9e498e8319c3b7f92aa20672c` (`git log -1`: "Rename SKILL.MD to SKILL.md", Sun Sep 6 2026).
- License: MIT, `LICENSE:1,3` — "MIT License / Copyright (c) 2026 ziadfaisalaljdy-beep".
- Last commit date: 2026-09-06.
- File count: 3.
- Claim (quote, `README.md:1,3`): "أنسَنة — Arabic Humanizer" / "**أول مهارة عربية لتنقية النصوص من بصمات الذكاء الاصطناعي.**" ("The first Arabic skill for cleansing texts of AI fingerprints.")

## 2. Form factor

Agent Skill (`SKILL.md:1-6`, YAML frontmatter: `name: arabic-humanizer`, `description`, `license: MIT`, `version: 1.0.0`). No scripts, no CLI, no analyzer — pure Markdown ruleset. Explicitly claims compatibility with "معيار Agent Skills" (the Agent Skills standard, `README.md:16`) and offers a second, host-agnostic usage path: `README.md:17`: "الصق محتوى SKILL.md مرة واحدة لأي ذكاء اصطناعي وقل له..." ("Paste the SKILL.md content once to any AI and tell it..."). This is the most explicitly agent-agnostic of the four competitors — it is designed to be usable as a raw prompt paste to *any* LLM, not just inside a specific skill-loading host.

## 3. Languages & varieties

Arabic only, and the SKILL.md itself is written **in Arabic** (unlike the other three competitors, whose instruction files are in English with Arabic examples). No variety specified as MSA explicitly, but the vocabulary and grammar (e.g. "المبني للمجهول" / passive voice conversion, formal connector phrases like "علاوة على ذلك") indicate MSA / formal written Arabic is the implicit target register. The roadmap section explicitly flags dialect support as **not yet built**: `README.md:25`: "نسخ لهجات (خليجي، مصري، سوداني)" ("dialect versions: Gulf, Egyptian, Sudanese") is listed under "خارطة الطريق v1.1" (v1.1 roadmap), i.e., an acknowledged future gap, not a current feature. No other languages.

## 4. Pattern catalog

14 numbered rules across 4 sections in `SKILL.md`, plus one appended 15th rule and an "تعليمات التنفيذ" (execution instructions) block:
- Section 1 (words/phrases, rules 1-4): formal filler connectors ("علاوة على ذلك", "بالإضافة إلى ذلك", "من الجدير بالذكر", "في هذا السياق" — `SKILL.md:15`), favored AI vocabulary ("زاخر", "غاصّ", "نسيج", "فسيفساء", "متشابك", "ثورة حقيقية", "في عصرنا الرقمي المتسارع", "لا يسعنا إلا" — `SKILL.md:20`), overblown praise ("مذهل", "استثنائي", "فريد من نوعه", "لا غنى عنه" — `SKILL.md:25`), hedging/filler ("بشكل عام", "إلى حد ما", "يمكن القول إن", "من المهم أن نذكر" — `SKILL.md:30`).
- Section 2 (constructions, rules 5-8): passive-to-active conversion, heavy "يُعدّ" nominal-sentence restructuring, forced triads, uniform sentence rhythm.
- Section 3 (openings/closings, rules 9-11): canned openers, canned formulaic conclusions, "did you ever wonder" openers.
- Section 4 (formatting, rules 12-14): excessive lists, excessive bolding, emoji in headers.
- Rule 15 (appended after the full example, `SKILL.md:84`): "لا تحذف فكرة كاملة" (never delete a complete idea) — a content-preservation instruction, not an AI-tell.

Total: **14 core rules + 1 content-preservation rule = 15 rules**, each with exactly one ❌/✅ before/after example pair (`SKILL.md:16-83`), all short, single-sentence, and idiomatic — genuinely natural-reading Arabic contrasts, e.g. `SKILL.md:26-27`: "❌ تطبيق مذهل سيغيّر حياتك بشكل استثنائي. / ✅ التطبيق وفّر عليّ ساعتين يومياً." ("An amazing app that will change your life exceptionally" → "The app saved me two hours a day" — replacing empty superlative with a concrete claim). No IDs on any rule (numbered 1-15 only, no stable pattern-ID scheme). No false-positive carve-outs documented.

## 5. Detection

None. Prompt-only; no script, no scoring, no offsets. The entire mechanism is: paste `SKILL.md`'s 15 rules into an agent's context and ask it to apply them (`README.md:15-18`). No self-audit checklist step either (unlike almuthanawork's "Final anti-AI audit" two-pass, or MrBridgeHQ's deterministic score-gated loop) — the closest thing to a check is the one execution instruction: `SKILL.md:89`: "إن كان النص طبيعياً أصلاً، قل ذلك ولا تعدّل بلا داعٍ" ("If the text is already natural, say so and don't edit unnecessarily") — a restraint instruction, not a verification step.

## 6. Modes & output contract

One mode only: rewrite. No detect-only, no edit-in-place, no SEO modifier. Output contract is three short execution instructions at the end (`SKILL.md:86-89`): preserve meaning/dialect/intent, add no new information, and don't edit unnecessarily if already natural. No structured report format (no "Issues found / Rewritten / What changed" breakdown) — the deliverable is implicitly just the rewritten text.

## 7. Voice matching / profiles

None. No voice-sample calibration, no profiles, no register selection beyond the implicit MSA target.

## 8. Preservation & SEO safety

No SEO mode, no keyword/link/heading protection, no validator. There is a genuine, explicit content-preservation rule, appended as rule 15 and restated in the execution instructions: `SKILL.md:84-85`: "### 15. لا تحذف فكرة كاملة — أعد صياغة كل فكرة موجودة في النص الأصلي؛ التنظيف يعني تغيير اللباس، لا حذف الأفكار." ("Never delete a whole idea — rephrase every idea present in the original text; cleaning means changing the clothes, not deleting the ideas.") and `SKILL.md:87-88`: "حافظ على المعنى واللهجة والمقصود الأصلي" / "لا تضف معلومات جديدة" (preserve meaning/dialect/original intent; add no new information). This is a real, if simple, anti-fabrication and anti-deletion guardrail — narrower in scope than humanizer-pro's protected-span system (no facts/numbers/links/headings enumeration) but philosophically aligned.

## 9. Tests/evals/evidence

No formal test suite or fixtures. The README does include one real anecdotal example presented as evidence: `README.md:28-32`: "## مثال حي (اختبار حقيقي على Gemini)" ("Live example (real test on Gemini)") with one ❌ before / ✅ after pair claimed to be an actual output from applying the rules via Gemini. This is a single anecdotal data point, not a benchmark or reproducible eval — but it is at least a claimed real-model test rather than a purely hypothetical illustration, which distinguishes it from almuthanawork's and MrBridgeHQ's purely-authored examples (though MrBridgeHQ additionally has a real sourced Wikipedia FP-fixture, which this repo does not).

## 10. Native-speaker quality signals

The Arabic throughout — README, SKILL.md rules, and all 15 before/after examples — reads as fluent, natural, idiomatic Arabic to a non-native reviewer, and unusually so: the "after" examples consistently sound like plausible casual/direct human writing rather than stilted correctness, e.g. `SKILL.md:58-59`: "❌ في عالمنا المتسارع، أصبح الذكاء الاصطناعي جزءاً لا يتجزأ من حياتنا. / ✅ جرّبتُ خمس أدوات ذكاء اصطناعي هذا الأسبوع، أفضلها كان..." (replacing a generic scene-setter with a concrete first-person anecdote opener). The live-test example in the README (`README.md:30-32`) also reads naturally, including an inserted personal address ("يا زياد" — "Ziad" is presumably the author's own name), which is a nice authentic touch suggesting the author tested with their own voice. Overall this repo's Arabic prose quality is the strongest "feels human" signal among the four competitors reviewed, though it is the least evidenced/tested.

## 11. Ethics

Framed entirely around better/more natural writing, explicitly contrasted with detector-evasion tooling in a positioning statement rather than aimed at academic dishonesty: `README.md:6-8`: "أدوات الأنسنة الإنجليزية (مثل blader/humanizer) لا تفهم العربية، ونصوص الذكاء الاصطناعي العربية لها بصماتها الخاصة" ("English humanizer tools... don't understand Arabic, and Arabic AI text has its own fingerprints") — notably, this repo explicitly credits and positions itself against **blader/humanizer** (`README.md:37`: "مستوحى من: blader/humanizer" / "Inspired by: blader/humanizer"), which is one of humanizer-pro's own three upstream sources (per humanizer-pro `README.md:287-289`). No mention of detectors, Copyleaks, GPTZero, or passing any check. Has an explicit, if narrow, anti-fabrication rule (§8: "لا تضف معلومات جديدة" / add no new information) and an explicit meaning-preservation rule, both genuinely aligned with non-deceptive intent. Open-contribution framing: `README.md:20-21`: "ساهم معنا... المشروع مفتوح للجميع" (open for contributions via Issues/PRs).

## 12. Notable ideas worth borrowing

- **Bilingual dual-path installation instruction** (`README.md:15-18`): offering both a proper skill-folder install *and* a "just paste the file to any AI" fallback in the same README is a good minimal-friction onboarding pattern worth considering for humanizer-pro's own docs (it already documents multi-host install, but doesn't explicitly offer a "paste this file directly, no install" path for hosts with no skill-loading mechanism — though `SKILL.md` §9 "When the scripts cannot run" is functionally adjacent).
- **"If it's already natural, say so and don't touch it"** (`SKILL.md:89`) is a crisp one-line restraint principle worth checking is present as clearly in humanizer-pro's own mode contracts (it likely is, via the never-pad-thin-drafts principle, but this is a good phrasing to compare against).
- **The rule 15 framing "cleaning means changing the clothes, not deleting the ideas"** (`SKILL.md:85`, "التنظيف يعني تغيير اللباس، لا حذف الأفكار") is a memorable, teachable metaphor for the preserve-meaning principle that could improve the clarity of humanizer-pro's own core-principles doc.
- **Concrete-over-superlative before/after pattern** (`SKILL.md:26-27`, replacing "مذهل... استثنائي" with a specific quantified claim "وفّر عليّ ساعتين يومياً") is a clean, minimal illustration of the general "specificity beats inflated praise" principle, useful as a compact example in doctrine.
- **Single anecdotal live-model test presented transparently as such** (`README.md:28-32`, labeled "اختبار حقيقي على Gemini") is a low-cost way to show *some* real evidence beyond invented examples, even without a full eval harness.

## 13. Weaknesses

- No detection mechanism at all — not even a manual self-audit checklist step, which even the other prompt-only competitor (almuthanawork) has.
- No tests or fixtures beyond a single anecdotal example; the "25 patterns"-style specificity that MrBridgeHQ has (174 vocab entries, 54 pytest tests) is entirely absent here — this is the smallest and least evidenced catalog of the four (15 rules total).
- Explicitly acknowledges it has no dialect coverage yet (roadmap item, `README.md:25`), unlike humanizer-pro which already ships Egyptian and experimental Levantine.
- No structured output contract, no modes beyond rewrite, no SEO/preservation validator, no voice matching.
- Version 1.0.0 with an openly incomplete roadmap (`README.md:23-27`: expanded vocabulary, dialect versions, and publishing to skills.sh are all still TODO) — the project self-identifies as early/incomplete.

## 14. Verdict vs humanizer-pro

| Dimension | ziadfaisalaljdy-beep/arabic-humanizer | humanizer-pro | Verdict |
|---|---|---|---|
| 1. Identity/maturity | MIT, dated commit, self-described v1.0.0 with open TODO roadmap | MIT, "v0.1.0-build," documented weak spots (REVIEW-HANDOFF §3) | tie — both honestly early-stage |
| 2. Form factor | Agent Skill, explicitly agent-agnostic (paste-anywhere fallback documented) | Agent Skill, explicit multi-host install docs | tie — both genuinely portable, differently packaged |
| 3. Languages/varieties | Arabic, MSA-implicit only; dialects explicitly on the TODO roadmap | MSA + Egyptian + experimental Levantine already shipped | we lead |
| 4. Pattern catalog | 15 rules total, one example each, no IDs | Tiered vocabulary + pattern IDs, far larger catalog | we lead |
| 5. Detection | None, not even a self-audit checklist | Deterministic scorer (`detect.js`) | we lead |
| 6. Modes & output contract | One mode (rewrite), no structured report | detect/rewrite/edit/seo, mandatory second-pass audit | we lead |
| 7. Voice matching | None | Named profiles + sample calibration | we lead |
| 8. Preservation & SEO safety | Simple, genuine "preserve meaning, add nothing, don't delete ideas" rule; no SEO/structural checks | Dedicated SEO mode + mechanical validator | we lead — though their preservation *principle* is philosophically sound and simply expressed |
| 9. Tests/evals/evidence | One anecdotal live-model example, no fixtures/tests | node --test suite + eval runs (self-graded) | we lead |
| 10. Native-quality signals | Strongest apparent natural-Arabic feel among all four competitors reviewed, per non-native read; untested/unverified formally | Self-flagged pending native review | they lead on apparent prose quality, though neither has independent native verification — call it they lead |
| 11. Ethics | Genuinely non-deceptive positioning, credits blader/humanizer (a shared upstream with humanizer-pro), narrow but real anti-fabrication rule | Explicit anti-fabrication + explicit refusal of detector-evasion requests | we lead — broader and more explicit guardrails |
| 12. Borrowable ideas | Paste-anywhere onboarding, "clothes not ideas" metaphor, concrete-over-superlative example, transparent anecdotal test | — | they lead (this section is about what to borrow FROM them) |
| 13. Weaknesses | Smallest/least-evidenced catalog of the four, no dialect coverage yet, no detection at all | Self-documented, extensive weak-spot list (11 items) | we lead — despite our own long weak-spot list, our shipped feature set is substantially more complete |
