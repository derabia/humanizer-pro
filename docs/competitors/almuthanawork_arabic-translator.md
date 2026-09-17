# almuthanawork / arabic-translator — competitor review

Repo root reviewed: `_sources/competitors/almuthanawork_arabic-translator/` (3 files, all read: `README.md`, `SKILL.md`, `references/rhetoric-guide.md`).

## 1. Identity

- URL: implied `github.com/almuthanawork/arabic-translator` (folder name; no remote inspected in this clone).
- HEAD SHA: `c9e407cbd2aaca44ab616e694bb273468821eb5f` (`git log -1`: "v3: Deep analysis workflow + integrated humanizer (25 AI patterns)", Mon Mar 30 2026).
- License: not stated anywhere in the repo (no `LICENSE` file, no license field in `SKILL.md` frontmatter, no license section in `README.md`).
- Last commit date: 2026-03-30.
- File count: 3.
- Claim (quote, `README.md:1,3`): "Arabic-to-English Literary Translator — A Claude Code skill for Arabic-to-English literary translation with built-in AI-pattern removal (humanizer)."

## 2. Form factor

Agent Skill (`SKILL.md:1-13`, YAML frontmatter with `name: arabic-translator`, `description`). No script, no CLI, no executable component of any kind — pure Markdown instructions plus one reference doc. Host: named as "Claude Code skill" (`README.md:3`) with install instructions pointing at `~/.claude/skills/arabic-translator/` (`README.md:23-30`), but the content itself (a prompt-following instruction set) is agent-agnostic in practice — any LLM agent that reads `SKILL.md` as a system/context prompt could follow it.

## 3. Languages & varieties

This is fundamentally a **translation** skill (Arabic → English), not an Arabic-generation/humanization skill in the same sense as the other three repos — its "humanizer" is a post-translation polish pass on the *English* output, not on Arabic prose. On the source-Arabic side it explicitly claims broad register coverage: `README.md:15`: "Handles all Arabic registers: MSA, Classical/Quranic, Egyptian, Gulf, Levantine, literary, technical" and `SKILL.md:29`: "Text type: MSA, Classical Arabic, or dialect (which one?)". No Maghrebi mention. The humanizer/anti-AI vocabulary list in `SKILL.md` Sweep 2 (`SKILL.md:64-90`) is entirely **English** vocabulary ("delve," "tapestry," "landscape," etc.) — it never touches Arabic AI-tells, since the deliverable is English prose.

## 4. Pattern catalog

Version string claims "25 AI patterns" (`README.md:17,43`: "25+ banned AI vocabulary words and pattern detection (based on Wikipedia's 'Signs of AI writing')"). Counting the actual `SKILL.md` Sweep 2 content: ~26 banned vocabulary words (`SKILL.md:67`) plus ~7 promotional-tone phrases (`SKILL.md:68`) plus a dozen or so sentence-level pattern categories (copula avoidance, significance inflation, -ing tails, negative parallelisms, rule-of-three, synonym cycling, false ranges — `SKILL.md:70-77`) plus formatting rules (em dashes, boldface, inline-header lists, curly quotes — `SKILL.md:79-83`) plus tone/structure rules (filler phrases, generic endings, emotional flattening, sentence length, author's quirks — `SKILL.md:85-90`). All of this is **English**-language AI-tell doctrine (explicitly "based on Wikipedia's 'Signs of AI writing'", an English-language Wikipedia article), reused wholesale for a translation-humanization task rather than authored for Arabic. Examples quality: one worked before/after pair for the *translation* itself (`SKILL.md:145-154`, with an explanation of each edit) — natural-reading English, and the "Bad" example is genuinely AI-flavored. No IDs on any pattern (matches by string/description only). No false-positive carve-outs documented anywhere.

## 5. Detection

None. No deterministic script or scorer of any kind — the entire skill is prompt-only doctrine executed by the agent's own judgment. The closest thing to a check is the "Final anti-AI audit" self-checklist (`SKILL.md:99-108`): a two-pass manual re-read ("Read your output and ask: 'What makes this obviously AI generated?'") followed by a specific checklist (em dashes? banned vocabulary? rule-of-three? -ing tails? "serves as"/"stands as"? uniform sentence lengths? "Does it sound like it could have been written by any AI about any topic?"). This is entirely self-graded by the same model doing the translation, with no independent measurement, no score, no offsets.

## 6. Modes & output contract

Single fixed three-phase workflow, not selectable modes: Phase 1 Analysis (shown to user, `SKILL.md:25-38`), Phase 2 two-pass translation (analytical draft then natural adaptation, `SKILL.md:40-51`), Phase 3 Polish and Humanize (three sweeps: translation artifacts, AI-pattern removal, voice/soul, plus the final anti-AI audit, `SKILL.md:53-108`). Structured output format is mandated: `SKILL.md:171-179` — Analysis, Translation, Decisions (2-4 lines on what was lost/compensated/fixed), explicitly "Do not deliver a bare translation without the analysis and decisions." This second-pass audit ("Final anti-AI audit... two-pass, do not skip") is functionally similar in spirit to humanizer-pro's mandatory second pass, though entirely manual/model-only rather than script-verified.

## 7. Voice matching / profiles

Present and central to the whole skill, framed as translation fidelity rather than a separate "voice profile" system: `SKILL.md:92-97` (Sweep 3, "Voice and soul") — "The translation must carry the author's personality, not a generic neutral voice... Let the Arabic flavor come through. A translation that could have been written about anywhere has failed." Core Rules reinforce this as the top priority: `SKILL.md:158-160`: "Author's voice wins... When author's voice and English fluency conflict: preserve the voice, adjust the grammar." No named/selectable profile taxonomy (casual/professional/etc.) — voice here means "the source author's voice," discovered per-text, not chosen from a list.

## 8. Preservation & SEO safety

No SEO mode, no keyword/link/heading protection, no numeric/fact preservation validator. There is a translation-specific integrity rule instead: `SKILL.md:161-162` under "Never": "Never insert Western cultural references to replace Arabic ones," and the whole rhetorical-device guide (`references/rhetoric-guide.md`) is explicitly about preserving *effect* (meaning/tone) rather than surface form when translating: `rhetoric-guide.md:3`: "Reproduce the EFFECT, not the form." This is meaning-preservation doctrine for translation, not SEO/structural preservation for a rewrite-in-place task, so it doesn't map onto humanizer-pro's `seo-mode.md`/`validate.js` at all.

## 9. Tests/evals/evidence

None. No test directory, no fixtures, no benchmark numbers, no eval harness. The "25 AI patterns" figure in the version string (`README.md:43`) is a self-reported count, not a tested/measured claim.

## 10. Native-speaker quality signals

The Arabic-language material present (source-text disambiguation guidance, the rhetoric guide's Arabic examples and glosses) reads as informed and idiomatically aware to a non-native reviewer — e.g. `SKILL.md:116-122` correctly explains idafa-chain translation (غرفة نوم → "bedroom" not "room of sleeping"), nominal-vs-verbal sentence semantics, and broken-plural agreement, all of which reflect real command of Arabic grammar rather than surface pattern-matching. `references/rhetoric-guide.md` gives specific, correct examples of 14 rhetorical devices (سجع, طباق, جناس, تورية, كناية, استعارة, تشبيه, المجاز المرسل, إيجاز, إطناب, التفات, توكيد, استفهام, قسم) with plausible translations, e.g. `rhetoric-guide.md:17`: "من لا ماضي له لا حاضر له → 'He who has no past has no present'" — accurate and well-chosen. This suggests either native or very strong non-native Arabic literary competence went into authoring the doctrine, though there is no explicit "written/reviewed by a native speaker" claim anywhere.

## 11. Ethics

Aimed squarely at better writing/translation quality, not detector evasion — there is no mention of Copyleaks/GPTZero/Turnitin/academic integrity anywhere in the repo, and no framing around "passing" anything. The stated goal is literary fidelity: `SKILL.md:17`: "the English reader closes the text with the same feeling in their chest that the Arabic reader had (Nida's 'equivalent effect')." On invented content: there is a real content-fabrication risk structurally built into the "compensation" doctrine — `SKILL.md:51,161`: "Compensation is not embellishment. If you lose a wordplay in one sentence, adding rhythm or alliteration in the next is faithful translation, not invention" and later "Compensation is mandatory: lost effects in one sentence must be restored nearby" (`SKILL.md:161`, item 3). This is presented as translation craft (a real, recognized technique, per Nida) rather than fact invention, and there's a real distinction from inventing statistics/quotes/sources — but it is a rule that explicitly asks the model to add content ("restored nearby") that was not literally in the source, which is a materially different ethical posture from humanizer-pro's blanket "never invents... to make a text feel human."

## 12. Notable ideas worth borrowing

- **The "equivalent effect" framing and compensation doctrine** (`SKILL.md:17,51,93-97,161`) is a sophisticated, well-grounded (cites Nida) approach to the tension between literal fidelity and natural-sounding output — worth studying for humanizer-pro's own rewrite-mode philosophy, particularly the idea that losing a stylistic effect in one place can be legitimately offset elsewhere in the same passage, rather than treated as a flat loss.
- **Structured, mandatory delivery format** (`SKILL.md:171-179`: Analysis → Translation → Decisions, "Do not deliver a bare translation without the analysis and decisions. The thinking is part of the value.") is a clean, simple three-part output contract that forces the model to show its reasoning and its trade-offs, comparable in spirit to humanizer-pro's "Issues found → Rewritten version → What changed" but explicitly framed as accountability ("proves you read deeply before translating").
- **Concrete disambiguation rules keyed to specific Arabic grammar phenomena** (`SKILL.md:110-122`: tashkeel ambiguity, idafa chains, nominal vs. verbal sentences, broken plurals at "41% of Arabic noun plurals are irregular," masdar/verbal-noun function) — this is genuine Arabic-linguistics doctrine (not just an AI-tell vocabulary list) that could sharpen humanizer-pro's `ar-shared.md`/`ar-msa.md` if it doesn't already cover these specific traps.
- **The "author's quirks are features, not bugs" rule** (`SKILL.md:90`: "unusual phrasing, unexpected word choices, or rough edges in the original are features, not bugs. Don't 'correct' them into standard English") is a useful explicit counter-pressure against over-smoothing, worth cross-checking against humanizer-pro's voice-matching doctrine.
- **Register Mapping table** (`SKILL.md:132-141`) giving a one-line target-register mapping per Arabic register (فصحى → "Standard literary English," عامية → "Informal spoken English. No Cockney for Cairo, no Southern US for Sa'idi," etc.) is a clean, scannable reference structure.

## 13. Weaknesses

- No license file — same legal-reuse problem as the amirsaadzayed-rgb repo.
- No detection mechanism whatsoever: fully self-graded by the same model doing the work, with no deterministic check, no score, no offsets, no way to independently verify a "25 AI patterns" claim.
- The AI-tell vocabulary/pattern catalog is 100% English (borrowed from English Wikipedia's "Signs of AI writing"), reused for output-side polish only; it contributes nothing to Arabic-tell detection despite the project name implying Arabic-language work.
- Zero tests, fixtures, or reproducible evidence of any kind.
- The "compensation is mandatory" rule is a structural invitation to add material not present in the source, which needs careful bounding to avoid crossing into fabrication — the skill does not explicitly bound this risk (e.g., no rule against inventing facts, unlike MrBridgeHQ's explicit Gate 2).
- Single-file reference material (one `rhetoric-guide.md`) means very little modularity or maintainability compared to the other Arabic-focused competitor.

## 14. Verdict vs humanizer-pro

| Dimension | almuthanawork/arabic-translator | humanizer-pro | Verdict |
|---|---|---|---|
| 1. Identity/maturity | No license, single "v3" commit, no independent review claimed | MIT, "v0.1.0-build," documented weak spots | tie — both early-stage and unreviewed, ours at least states so explicitly and has a license |
| 2. Form factor | Claude Code skill, Markdown-only (no scripts) | Multi-host Agent Skill with CLI scripts | we lead |
| 3. Languages/varieties | Arabic (broad register claim, unverified) → English translation; not an Arabic-output humanizer | Arabic (MSA/Egyptian/experimental Levantine) output humanizer + English | different scope — not directly comparable; tie by default since the task itself differs |
| 4. Pattern catalog | ~25 English-only AI-tell patterns reused from Wikipedia, no Arabic tells | Tiered EN + AR vocabulary/pattern catalog with IDs | we lead |
| 5. Detection | None; fully self-graded manual checklist | Deterministic scorer (`detect.js`), heuristic but real | we lead |
| 6. Modes & output contract | One fixed 3-phase workflow, mandatory structured delivery | detect/rewrite/edit/seo, mandatory second-pass audit | tie — both have a mandatory audit step; ours has more selectable modes |
| 7. Voice matching | Central doctrine, well-argued (Nida's equivalent effect), no selectable profiles | Named profiles + sample calibration, dedicated reference file | they lead on depth of philosophy, we lead on structure/selectability — call it tie |
| 8. Preservation & SEO safety | Meaning-preservation doctrine for translation only, no SEO/structural mode | Dedicated SEO mode + mechanical validator | we lead |
| 9. Tests/evals/evidence | None | node --test suite + eval runs (self-graded, per REVIEW-HANDOFF) | we lead |
| 10. Native-quality signals | Grammar/rhetoric doctrine reads as linguistically informed and accurate to a non-native reviewer | Self-flagged pending native review | tie — both unverified by an actual native reviewer per the repo's own evidence |
| 11. Ethics | No detector-evasion framing; but "compensation is mandatory" risks content addition without an explicit anti-fabrication bound | Explicit anti-fabrication rule + explicit refusal of detector-evasion requests | we lead |
| 12. Borrowable ideas | Equivalent-effect/compensation doctrine, structured delivery format, Arabic grammar disambiguation rules, register-mapping table | — | they lead (this section is about what to borrow FROM them) |
| 13. Weaknesses | No license, zero detection/tests, English-only tell catalog despite Arabic framing | Self-documented, extensive weak-spot list (11 items) in REVIEW-HANDOFF §3 | tie — theirs are undocumented gaps, ours are documented ones (documentation is itself a point in our favor, but gap-count is comparable) |
