# Competitor review: hazemshan1-rgb/humanizer-ar

Repository read in full (10 tracked files) at
`D:\Dev\htdocs\humanizer-pro\_sources\competitors\hazemshan1-rgb_humanizer-ar`.

## 1. Identity

- **URL:** `https://github.com/hazemshan1-rgb/humanizer-ar` (from `git -C <dir> remote -v`,
  `origin` fetch/push URL; not stated inside any repo file — no explicit URL appears in
  README.md or elsewhere in the tree).
- **HEAD SHA:** `5289d4a60aa52815125d4cb5548cdf51dad2790f` (`git rev-parse HEAD`).
- **License:** MIT. `LICENSE:1-3`: "MIT License / Copyright (c) 2026 Hazem Shannak /
  Permission is hereby granted, free of charge, to any person obtaining a copy...".
- **Last commit date:** `2026-08-17T14:09:58+08:00` (`git log -1 --format=%cI`). The repo's
  entire visible history is a single commit (`git log --all` returns exactly one entry:
  "docs: verify weak citations properly, add 10 further research candidates").
- **File count:** 10 tracked files (`find . -type f | grep -v '.git/' | wc -l`), listed in
  full: `LICENSE`, `README.md`, `.gitignore`, `scripts/score_arabic_text.py`,
  `skills/humanizer-ar/SKILL.md`, `skills/humanizer-ar/references/patterns.md`,
  `tests/test_scanner.py`, `tests/fixtures/bad_ai_sample.txt`,
  `tests/fixtures/good_human_sample.txt`, `tests/fixtures/synthetic_formal_sample.txt`.
- **What it claims to be:** README.md:1: "A Claude Code skill that removes signs of
  AI-generated writing from **Arabic** text. Built from scratch for Arabic, not a
  translation of an English pattern list run through Google Translate."

## 2. Form factor

Agent skill, `SKILL.md`-based, present at `skills/humanizer-ar/SKILL.md`. The frontmatter
(`SKILL.md:1-24`) declares `name: humanizer-ar`, `version: 1.3.0`, an Arabic
`description`, and an `allowed-tools` list (`Read, Write, Edit, Grep, Glob, Bash,
AskUserQuestion`).

It targets **Claude Code specifically**, not agent-agnostic use: README.md's Install
section instructs `ln -s ... ~/.claude/skills/humanizer-ar` and the Usage section says
"Inside Claude Code: `/humanizer-ar`" (README.md, "Install" and "Usage" sections). There
is no mention of Codex, Cursor, ChatGPT, or a generic skill-loader contract anywhere in
the repo — no `metadata` block, no host-portability discussion. `allowed-tools:
AskUserQuestion` (`SKILL.md:23`) is itself a Claude-Code-specific tool name, reinforcing
the single-host design.

## 3. Languages & varieties covered

MSA-only by explicit design; no dialect pattern catalog exists. README.md:1: "Pattern
catalog and mechanical checks are **MSA-focused**, with a register-consistency check for
dialect drift — see 'Known limitations' below for what's not covered yet."

README.md "Known limitations" section states directly: "**Dialectal Arabic is not
covered.** The pattern catalog, banned-phrase list, and every mechanical check are tuned
for Modern Standard Arabic," citing Alharthi (2025) on dialectal-Arabic AI-detection
accuracy, then adding a verification caveat: "despite five separate access attempts
(DOAJ, ResearchGate, ScienceDirect, IEEE Xplore), the primary paper stayed behind a
paywall/blocked every time — this claim rests on consistent secondary descriptions...
flagged here as the least-verified citation in this project." It explicitly declines to
build a dialect catalog: "Rather than ship a shallow, likely-wrong dialect catalog, this
skill limits itself to a lighter, honest signal."

The only dialect-aware mechanism is a **register-drift check**, `SKILL.md:56`: "النص
الآلي العربي يميل للانجراف بين الفصحى والعامية داخل النص نفسه (خصوصًا حين يُطلب أسلوب
'خليجي' أو 'مصري' أو 'شامي' ثم ينزلق تلقائيًا إلى صياغة فصحى قياسية منتصف الفقرة)" ["AI
Arabic text tends to drift between MSA and colloquial within the same text (especially
when a 'Gulf', 'Egyptian', or 'Levantine' style is requested and it slides automatically
into standard MSA phrasing mid-paragraph)"], immediately followed by: "ولا تتوقع من هذا
الدليل تغطية كل لهجة تفصيليًا" ["don't expect this guide to cover every dialect in
detail"]. Gulf/خليجي, Egyptian/مصري, and Levantine/شامي are named only as labels a request
might use, never given their own pattern sets, vocabulary lists, or worked examples. No
other language (English, French, etc.) is addressed anywhere in the repo.

## 4. Pattern catalog

`skills/humanizer-ar/references/patterns.md` (303 lines) contains **27 numbered
patterns**, organized into six named categories (`patterns.md:9-297`):

- أنماط المحتوى (Content patterns): #1–6 (inflated significance, vague attribution,
  promotional language, superficial مما result clauses, negative parallelism,
  rule-of-three padding)
- أنماط لغوية وصرفية (Linguistic/morphological patterns): #7–11 (repeated AI vocabulary,
  تم+masdar passive avoidance of direct verbs, copula avoidance يُعد/يُعتبر, formulaic
  openers, stock closers)
- آثار المحادثة الآلية (Chatbot artifacts): #12–13 (chatbot phrases, excessive hedging)
- أنماط الرسم الإملائي (Orthographic/technical patterns, "no English equivalent"): #14–18
  (diacritics, tatweel/kashida, mixed digit systems, foreign punctuation, و-joined
  run-ons)
- أنماط معجمية إحصائية (Statistical/lexical patterns, "backed by quantitative research"):
  #19–20 (vocabulary concentration, weak technical-term usage)
- علم الفصاحة والبلاغة الكلاسيكي (Classical rhetoric/eloquence layer): #21–27 (khabar/
  insha' rigidity, disproportionate emphasis, unjustified إطناب vs بلاغي إيجاز, missing
  التفات, classical فصاحة defects as negative points, empty light-verb constructions,
  English-calqued collocations)

**Before/after examples:** present for roughly half the catalog — patterns #1–6, #7–9,
#10–13, #17, #23, #26 all carry quoted قبل/بعد pairs (e.g. `patterns.md:17-21`,
`patterns.md:255-259`, `patterns.md:287-291`). Patterns #14–16, #18 (informational),
#19–22, #24–25, and #27 do **not** have before/after pairs — they are explained in prose
only (e.g. #25's "عيوب الفصاحة" list, `patterns.md:267-277`, is stated as a mental
checklist, not a text-matchable pattern).

**IDs:** patterns are numbered 1–27 but carry no cross-referenced provenance IDs (no
`AR-SH-001`-style tags). Each pattern instead cites its grounding inline — a named study
(Al-Shaibani & Ahmed 2025, Marathe 2022), a classical rhetorician (al-Jurjani), or "direct
observation" when no literature exists (explicitly flagged as weaker, `patterns.md:5`).

**False-positive carve-outs:** several, and unusually explicit about testing that found
them:
- Pattern #3 filler-adjective note (`patterns.md:47`): "استثنائي"/"حيوي"/"محوري" have
  legitimate literal uses outside promotional filler; says this was confirmed by testing
  a real formal-text sample where both "محوري" hits were legitimate, not filler.
- Pattern #8 (`patterns.md:109`): passive voice ("تم") is legitimate when the agent is
  genuinely unknown/unimportant; the problem is only its use as a mechanical default.
- Pattern #14 diacritics (`patterns.md:173-177`): downgraded to informational-only after
  testing showed ~8–9% diacritic density on **both** the AI-cliche and clean-human
  samples.
- Pattern #18 run-ons (`patterns.md:201-203`): formal-register carve-out via `--formal`
  mode, discovered because a formal sample had a 35-word **median** sentence length.
- `score_arabic_text.py:56-62`: the light-verb regex explicitly excludes "قام بسرعة"
  (a real verb + adverb, not the light-verb calque) to avoid false-positiving on قام used
  literally.

## 5. Detection

Deterministic, parseable detector: `scripts/score_arabic_text.py` (372 lines, pure
Python 3 stdlib plus an optional `textstat` dependency for readability scores,
`score_arabic_text.py:19-23`). It is not prompt-only — every check is a discrete,
testable function (`check_phrases`, `check_filler_adjectives`,
`check_light_verb_overuse`, `check_diacritics`, `check_tatweel`, `check_mixed_digits`,
`check_foreign_punctuation`, `check_run_on_sentences`, `vocabulary_stats`,
`readability_stats`, `sentence_type_variety`, `score_arabic_text.py:99-278`).

**Scoring:** yes — a single `TOTAL VIOLATIONS` integer plus a normalized "violations per
100 words" rate (`score_arabic_text.py:300-309, 338-340`), and separate informational
stats (vocabulary TTR, top-5-word share, sentence-length std-deviation, OSMAN/LIX
readability, khabar/insha' ratio). There is no 0–100 calibrated score comparable to
humanizer-pro's detector — it is a raw violation count, not a bounded/weighted score.

**Offsets:** none. Output is human-readable `print()` text to stdout
(`score_arabic_text.py:281-349`); no `--json` flag, no character or line offsets for
flagged spans — run-on sentences are reported as a truncated 80-character snippet only
(`score_arabic_text.py:212`, `:328-329`). No structured machine-readable output format
exists at all.

## 6. Modes & output contract

No distinct detect/rewrite/edit/SEO modes. `SKILL.md` describes one undifferentiated
9-step workflow ("آلية العمل", `SKILL.md:49-61`) covering lexical/rhetorical scan →
scanner run → orthographic scan → register-consistency check → bilingual-term review →
classical rhetoric pass → rewrite → "add soul" → final self-critique pass, followed by a
separate "سير العمل الكامل" (full workflow) section (`SKILL.md:100-114`) that restates a
9-step sequence ending in a **mandatory two-pass self-critique**: step 7 asks "ما الذي
يجعل النص أدناه يبدو آليًا بوضوح؟" (what makes this text obviously look AI-generated?)
and step 8 "الآن اجعله لا يبدو آليًا" (now make it not look AI-generated),
`SKILL.md:112-113`. Output is freeform Markdown prose with no fixed report headings, no
JSON schema, and no separate "detect-only, no rewrite" mode — the skill always proceeds
toward a rewrite.

## 7. Voice matching / persona profiles

None found. No file, section, or code path addresses matching a user-supplied writing
sample or selecting a named voice profile (casual/professional/technical/etc.). `SKILL.md`
step 8 ("أضف روحًا", add soul, `SKILL.md:60`) tells the model to add personal
opinion/voice generically, but this is a generic instruction, not a calibratable
voice-matching mechanism.

## 8. Preservation & SEO safety

None. There is no SEO mode, no protected-spans concept, no keyword/heading/link/code
preservation logic, and no before/after preservation validator anywhere in the repo — the
only script is the detector (`scripts/score_arabic_text.py`); there is no second script
comparable to a `validate.js`.

## 9. Tests/evals/evidence

`tests/test_scanner.py` (171 lines), zero-dependency stdlib Python, run via
`python3 tests/test_scanner.py`. It is a regression suite against exactly three fixtures:
`tests/fixtures/bad_ai_sample.txt` (9 lines), `tests/fixtures/good_human_sample.txt`
(7 lines), `tests/fixtures/synthetic_formal_sample.txt` (7 lines) — all synthetic and
self-written, explicitly disclosed: README.md, "What testing actually found":
"`tests/fixtures/synthetic_formal_sample.txt` is a synthetic, purpose-written sample...
no real third-party document is included in this repo." The suite encodes concrete
assertions (e.g. `test_scanner.py:65`: AI-cliche sample must have `>= 8` banned-phrase
hits; `test_scanner.py:79-84`: general-mode run-on check must over-fire at `>= 30%` on
the formal sample; `test_scanner.py:87-92`: `--formal` mode must suppress that flood to
0). These are sourced and reproducible in the narrow sense that anyone can re-run the
same three fixtures through the same script and get the same numbers, but there is no
eval harness, no external/held-out corpus, and no benchmark numbers beyond these three
hand-picked texts — the checks test the scanner's own regressions, not a measured
detection accuracy.

## 10. Native-speaker quality signals for Arabic

No claim of native-speaker review appears anywhere in the repo — no "reviewed by," no
native-review log, no experimental/unreviewed status flag comparable to humanizer-pro's
`NATIVE-REVIEW.md` process. The author (per `LICENSE:3`, "Hazem Shannak") writes in fluent
Arabic throughout, and the catalog itself is dialect-aware only at the level of
acknowledging the MSA-leakage problem (see section 3) — it does not attempt dialect
production at all, so there is no dialect-authenticity risk to assess in the way
humanizer-pro's مصري/شامي output carries one; the risk here is the opposite one:
everything non-MSA is out of scope.

Spot-checking the MSA examples themselves: the قبل/بعد pairs read as natural, idiomatic
MSA. E.g. patterns.md:17-21, before: "يُعد إطلاق هذا التطبيق بمثابة نقلة نوعية حقيقية في
قطاع التوصيل..." vs after: "التطبيق الجديد يقلّص وقت التوصيل من 40 دقيقة إلى 22 دقيقة في
المتوسط" — grammatically correct, register-appropriate MSA on both sides, with the
"after" showing a genuine tightening (concrete numbers replacing empty superlatives)
rather than mechanical phrase-deletion. The classical-rhetoric section
(`patterns.md:227-297`) demonstrates real command of traditional Arabic
بلاغة/فصاحة terminology (خبر/إنشاء, التفات, تنافر الحروف, نظرية النظم) used correctly and
attributed to specific classical/academic sources (al-Jurjani's دلائل الإعجاز, Marathe
2022). I found no grammatical or lexical errors in any of the Arabic text read across
`SKILL.md`, `patterns.md`, or the three fixture files.

The most direct MSA-vocabulary-leaking-into-dialect awareness anywhere in the project is
the register-drift check in `SKILL.md:56` quoted in section 3 above — this is the single
mechanism addressing that exact failure mode, and it is explicitly scoped as a detection
signal ("مؤشر آلي حقيقي يستحق إعادة الصياغة", a real automated signal worth a rewrite),
not a dialect-production system.

## 11. Ethics

No explicit academic-integrity or detector-evasion refusal statement exists anywhere in
the repo — unlike humanizer-pro, there is no "if this amounts to evading a detector, say
so and stop" clause. The framing instead leans entirely on epistemic humility about
detection itself: `scripts/score_arabic_text.py:9`: "This is a diagnostic aid, not a
verdict," and README.md's "A note on limits" section, which cites Almohaimeed et al.
(2025) (a commercial detector's accuracy "collapsed to 12% accuracy / 88% false-positive
rate" on lightly-polished human Arabic) and Labib et al. (2026) (a trained BERT ensemble
still misclassifying "~38% of genuinely human-written Arabic as machine-generated"),
concluding: "Treat every flag from this skill or its scanner as 'worth a second look,'
never as proof." This functions as a *de facto* discouragement of over-trusting detector
output, but it is not framed as a refusal policy, and no file states a position on
whether the tool may be used to help a text evade an actual AI-detection or plagiarism
check. On fact invention: no explicit "never invents facts" rule was found in `SKILL.md`
or `patterns.md`; the worked example in `SKILL.md:118-134` shows a rewrite adding
specific illustrative numbers/details not present in the "before" text (three farms,
three months, an 18% figure in a different example at `patterns.md:33`) purely as
prompt-craft demonstration, not as a stated policy on fabrication — this is worth
flagging as a documentation gap (see section 13).

## 12. Notable ideas worth borrowing

- **Classical Arabic rhetoric as a diagnostic layer, not just a lexicon.** Patterns
  #21–27 (`patterns.md:227-297`) apply خبر/إنشاء variety, تفاصيل and التوكيد calibration,
  إيجاز/إطناب balance, التفات, classical عيوب الفصاحة (with *negative* scoring — a defect
  category, `patterns.md:267-277`), and collocation-calque detection (قام بـ + مصدر vs
  the direct verb; أخذ قرارًا vs the idiomatic اتخذ قرارًا) grounded explicitly in
  al-Jurjani's نظرية النظم (theory of composition, `patterns.md:233`). humanizer-pro's
  `ar-msa.md`/`ar-shared.md` reference layer would gain real depth from a comparable
  classical-rhetoric pass — this goes well beyond a phrase-matching cliche list and
  targets structural style, which is exactly the kind of signal a phrase blocklist can't
  catch.
- **A curated, false-positive-tested light-verb detector.** `score_arabic_text.py:47-69`
  documents *why* a naive "قام + any ب-word" regex was rejected (it would flag قام used
  as a literal verb, e.g. "قام بسرعة") and instead ships a curated list of 16
  unambiguous verbal nouns. The docstring at `score_arabic_text.py:117-131` and the
  regression tests at `test_scanner.py:129-154` together are a strong worked example of
  "document the false positive you found, then lock in the fix as a test" — a pattern
  humanizer-pro's own `scripts/README.md` evidence discipline could extend to more of its
  Arabic checks.
- **Provenance tiers with explicit confidence grading**, `SKILL.md:146-172`: sources are
  split into "مصادر قُرئت مباشرة" (read directly, full text), "مصادر مؤكَّدة وظيفيًا"
  (not read but the referenced tool/method was tested and works), and "مصادر مؤكَّدة
  بشكل ثانوي" (secondary-confirmed only, access blocked) — including candid admissions
  like the Alharthi (2025) citation being "the least-verified citation in this project"
  after five failed access attempts (`SKILL.md:163`). This is a stronger, more granular
  provenance-honesty practice than a flat citation list, and is directly reusable for
  humanizer-pro's own `docs/PROVENANCE.md`/`docs/NATIVE-REVIEW.md` discipline.
- **A `--formal` register-calibrated threshold mode**
  (`score_arabic_text.py:187-213`), discovered by running the run-on-sentence check
  against a real formally-structured Arabic sample and finding a 35-word *median*
  sentence length with up to 9 و-joins as the register norm, not an outlier. This is the
  same class of problem flagged as an open weak spot in humanizer-pro's own
  `docs/REVIEW-HANDOFF.md` (3.4, leakage-gate threshold instability) — a
  register-conditional threshold set (rather than one universal threshold) is a concrete,
  transferable fix.
- **A statistically grounded vocabulary-concentration signal**, `patterns.md:213-224`
  and `score_arabic_text.py:266-278` (`vocabulary_stats`): top-5-word share and
  type-token ratio, tied to a specific published finding (Al-Shaibani & Ahmed 2025: AI
  Arabic text's top word exceeded 3000 repetitions vs under 2000 for human text of
  comparable length). This is a graduated statistical signal that complements phrase
  matching rather than duplicating it.
- **A public "further research candidates, not yet integrated" section**
  (README.md, final content section before Credits) that names sources found during
  research but deliberately not yet acted on, with reasons (paywalled, or would require
  a real dependency change like CAMeL Tools/Farasa morphological analysis). This is an
  unusually transparent way to separate "what shipped" from "what was found," and is a
  good model for humanizer-pro's own `docs/DISCREPANCIES.md`-style tracking.
- **Explicit per-pattern confidence grading inside the catalog itself** — pattern #18's
  entry (`patterns.md:203`) states outright that it "may be in the completely opposite
  direction" based on Dickins (2017), and instructs the reader to treat it as the
  lowest-confidence signal in the whole catalog. Very few pattern catalogs admit a
  specific pattern might point the wrong way; this is a genuinely rare level of honesty
  worth matching in humanizer-pro's own pattern documentation.

## 13. Weaknesses

- **MSA-only; zero dialect pattern catalogs.** No مصري, شامي, or خليجي pattern lists,
  vocabulary tables, or worked examples exist anywhere (README.md "Known limitations,"
  section 3 above) — dialect handling is limited to one register-drift heuristic
  (`SKILL.md:56`).
- **No preservation/validation step at all.** No SEO mode, no protected-spans concept, no
  before/after diff validator — a rewrite could silently alter facts, numbers, links, or
  structure with nothing to catch it (contrast section 8).
- **No modes.** There is no way to request "audit only, don't rewrite" — the single
  workflow always proceeds to a rewrite (section 6), unlike a dedicated detect-only
  contract.
- **No structured/offset output.** The scanner prints human-readable text only; no
  `--json`, no character/line offsets for flagged spans, no exit-code contract documented
  (contrast humanizer-pro's `detect.js`/`validate.js` exit codes) — harder to wire into
  automated pipelines (section 5).
- **Tests validate the scanner's own regressions, not detection accuracy.** All 3
  fixtures are self-written/synthetic (explicitly disclosed, section 9); there is no held-
  out or externally sourced corpus, and no reported false-positive/recall numbers of its
  own — the README says so directly under "The scanner is heuristic, not a classifier."
- **Light-verb detection is a curated 16-item list**, not a morphological analyzer
  (`score_arabic_text.py:63-66`) — acknowledged directly in README's "Further research
  candidates" section as needing CAMeL Tools/Farasa to generalize; will miss any
  light-verb construction using a verbal noun outside that list.
- **No explicit anti-fabrication or detector-evasion policy statement.** Unlike
  humanizer-pro's explicit "never invents facts... never helps evade... AI-detection
  policies" clause, this repo has no comparable stated rule (section 11) — the worked
  example even demonstrates adding invented specific numbers as a rewrite technique
  without flagging that as a boundary.
- **Single commit, no build/test CI, no packaging.** The entire visible history is one
  commit (`git log --all`); no `package.json`/CI config exists to verify the test suite
  runs automatically; `textstat` for readability scores is an optional, unpinned
  dependency (`score_arabic_text.py:19-23`).
- **No status/maturity disclosure.** Nothing in the repo states a version-maturity
  caveat comparable to humanizer-pro's "v0.1.0-build... not independently reviewed" — a
  reader has to infer the single-commit, self-tested nature of the project rather than
  being told directly.

## 14. Verdict vs humanizer-pro

| Dimension | hazemshan1-rgb_humanizer-ar | humanizer-pro | Who leads |
|---|---|---|---|
| 2. Form factor | Skill, Claude-Code-only (`ln -s ~/.claude/skills`, `AskUserQuestion` tool dependency) | Skill, explicitly multi-host (Codex, Claude Code, Cursor, Claude apps zip) | we lead |
| 3. Languages & varieties | MSA-only; register-drift heuristic names مصري/شامي/خليجي but has no dialect catalogs | فصحى/مصري/شامي each with dedicated reference files and automatic variety detection | we lead |
| 4. Pattern catalog | 27 patterns, one file, ~half with before/after, no cross-referenced IDs, several explicit confidence caveats and a classical-rhetoric layer | Merged multi-source English + Arabic catalogs with pattern-ID provenance (per REVIEW-HANDOFF), no classical-rhetoric layer | tie |
| 5. Detection | Deterministic Python scanner, raw violation count + rate, no JSON, no offsets | Deterministic JS detector, weighted 0–100 score, `--json`, documented exit codes | we lead |
| 6. Modes & output contract | One undifferentiated workflow with mandatory two-pass self-critique, freeform Markdown | detect/rewrite/edit + seo modifier, fixed report contracts per mode, mandatory second-pass audit | we lead |
| 7. Voice matching / personas | None | Dedicated `voice-matching.md`, sample calibration, five named profiles | we lead |
| 8. Preservation & SEO safety | None | Dedicated `seo-mode.md`, protected-spans list, `validate.js` preservation validator | we lead |
| 9. Tests/evals/evidence | One regression suite, 3 self-written synthetic fixtures, no held-out corpus | 30 Arabic fixtures + English suite, evals/ harness with iteration runs — but also all self-written per REVIEW-HANDOFF 3.1/3.11 | tie |
| 10. Native Arabic quality signals | No native-review claim; spot-checked MSA reads clean; dialect production entirely out of scope | Explicit NATIVE-REVIEW tracking process, but Levantine unreviewed and all fixtures self-written (REVIEW-HANDOFF 3.1–3.2) | tie |
| 11. Ethics | No explicit detector-evasion/academic-integrity refusal clause; strong "diagnostic aid, not verdict" framing with real cited false-positive rates | Explicit refusal clause for detector evasion and academic-integrity misuse; explicit never-invent-facts rule | we lead |
| 12. Notable borrowable ideas | Classical-rhetoric layer, tiered source-confidence grading, register-calibrated thresholds, self-documented false-positive fixes as regression tests | (N/A — this row assesses what they offer to learn from) | they lead |
| 13. Weaknesses | MSA-only, no preservation step, no modes, no structured output, curated (non-general) light-verb list, no maturity disclosure | Levantine unreviewed, dialect ID unreliable on short text, self-tuned thresholds, English engine's inherited limitations, Node-18 claim unverified (REVIEW-HANDOFF 3.1–3.11) | tie |
