# Competitive review: Pythonation/AI-Text-Humanizer-Protocol

## 1. Identity

- **URL:** `https://github.com/Pythonation/AI-Text-Humanizer-Protocol` (from `git remote -v` in the cloned working copy; not stated inside README.md or LICENSE itself).
- **HEAD SHA:** `33778b30eed9326ee37b4c778bcc4e23fb639f44` (`git rev-parse HEAD`).
- **Commit history:** a single commit (`git log --oneline | wc -l` = 1). There is no visible development history behind the "v2.5.1" version claim.
- **License:** MIT, full standard text, copyright "Python Arabic Community" (`LICENSE:1-3`). Note the contradiction: `README.md:4` renders a shields.io badge reading `License-Copyrighted-red`, i.e. the README's own badge claims the opposite of what the LICENSE file grants.
- **Last commit date:** `2026-05-18T18:23:03+01:00` (`git log -1 --format=%cI`).
- **File count:** 2 tracked files total (`README.md`, `LICENSE`), confirmed with `find . -type f | grep -v '/.git/' | wc -l` = 2. No source code, no tests, no CI config, no `SKILL.md`, no scripts.
- **What it claims to be:** "هذا المستودع يحتوي على موجه نظامي (System Prompt) احترافي ومتقدم جداً، مصمم خصيصاً لإجبار نماذج الذكاء الاصطناعي (مثل ChatGPT, Claude, وغيرها) على التخلي عن أسلوبها الآلي والممل في الكتابة." (README.md:8) — "This repository contains a professional and highly advanced System Prompt, designed specifically to force AI models (such as ChatGPT, Claude, and others) to abandon their mechanical and boring writing style." It states its authority as "AUTHORITY: Wikipedia 'Signs of AI writing' — WikiProject AI Cleanup" (README.md:27) and self-labels `PROTOCOL: HUMANIZER‑v2.5.1` (README.md:25).

## 2. Form factor

The entire artifact is one Markdown README containing a single large fenced code block (README.md:23-246) meant to be pasted as a system prompt or first chat message: "قم بنسخ هذا الموجه واستخدامه كـ `System Prompt` أو كأول رسالة في المحادثة" (README.md:21). There is no `SKILL.md`, no skill manifest/frontmatter, no packaging metadata, and no code of any kind — it is a **prompt file**, not an agent skill and not an application or library.

It names "ChatGPT, Claude, وغيرها" (and others) as intended hosts (README.md:8) and the prompt block itself is written in generic XML-ish pseudo-tags (`<system_state>`, `<role>`, `<execution_rule>`, `<process>`, `<output_structure>`) rather than any host-specific syntax. It is **agent-agnostic by design** — a copy-paste prompt with no host-specific tool calls, file conventions, or invocation triggers — but also has no discovery mechanism (no `description` field, no trigger phrases, no activation logic): a human must manually paste it into a conversation each time.

## 3. Languages & varieties covered

The README wrapper (headings, explanatory prose, badges) is written in Arabic (e.g. "بروتوكول أنسنة النصوص" at README.md:1), and the LICENSE copyright holder is "Python Arabic Community" (LICENSE:3). The prompt itself states `OUTPUT_LANGUAGE: Same as input` (README.md:28), implying it can run against Arabic input text.

However, **every single one of the 29 pattern rules (Sections A-E) is written entirely in English**, with English-only "Watch" word lists (e.g. B.1's vocabulary list: "Actually, additionally, align with, crucial, delve, emphasizing, enduring, enhance, fostering, garner, highlight, interplay, intricate, landscape, pivotal, showcase, tapestry, testament, underscore, vibrant" at README.md:120). There is no Arabic vocabulary list, no Arabic-script-specific rule (e.g. nothing on Arabic punctuation, kashida, digit scripts, or RTL formatting), no dialect coverage, and no MSA-vs-dialect distinction of any kind. The claim of Arabic support is entirely wrapper-level (the repo's own presentation and instructions to Arabic-speaking users), not encoded in the pattern catalog itself.

## 4. Pattern catalog

**29 distinct, ID-labeled AI-tell rules**, organized into five lettered sections:

- Section A — Content patterns: A.1-A.6 (6 rules), README.md:91-113
- Section B — Language & grammar patterns: B.1-B.7 (7 rules), README.md:119-139
- Section C — Style patterns: C.1-C.6 (6 rules), README.md:145-161
- Section D — Communication patterns: D.1-D.3 (3 rules), README.md:167-176
- Section E — Filler & redundancy patterns: E.1-E.7 (7 rules), README.md:182-201

Each entry has an ID (e.g. `[A.1]`), a title, a one-line "**Watch:**" trigger-phrase list or description, and a one-line "**Rule:**" instruction. There are **no worked before/after examples anywhere in the catalog** — the single closest thing is a parenthetical illustration inside E.1's rule text: "(e.g., 'In order to achieve this goal' -> 'To achieve this')" (README.md:183). No other entry shows sample input/output text.

**Provenance:** all 29 IDs cite no external source individually. The catalog as a whole claims one blanket source: "<reference>Based on Wikipedia:Signs of AI writing, maintained by WikiProject AI Cleanup.</reference>" (README.md:244-245) — no URL, no revision/date, no per-pattern citation. The separate "soul-injection" material (README.md:69-85, discussed in §11-12 below) carries no citation at all and is not attributable to that Wikipedia source.

**False-positive carve-outs are minimal.** Only two rules qualify their own scope:
- C.1 (em dash): "Rewrite **most** with commas, periods, or parentheses" (README.md:146) — implicitly allows some em dashes to remain, but gives no criterion for which.
- E.4 (hyphenated pairs): "Remove hyphens from common pairs **unless genuinely ambiguous**" (README.md:192).

No other rule states a condition under which it should not fire (contrast with humanizer-pro's `en-patterns.md`, which has an explicit "Carve-outs (do not flag when):" line per pattern — see §12).

## 5. Detection

There is **no deterministic detector or parseable code of any kind** in the repository — it is prompt-only. "Detection" means instructing an LLM to self-audit its own draft by internally asking a fixed question: "**Phase 5: Anti-AI Audit (Mandatory)** - Ask internally: 'What makes the below so obviously AI generated?' Revise accordingly." (README.md:224, restated at 52 and 235).

There is **no numeric score or confidence value** anywhere in the repository, and **no character/line offsets or flagged spans** — findings are meant to be listed inside a free-text `<thinking>` block ("Tag every instance of patterns A–E. List them in `<thinking>`." — README.md:221) with no structured location data.

## 6. Modes & output contract

There is one workflow, not multiple named modes: a six-phase `<process>` (Read, Identify, Rewrite, Draft Output, Anti-AI Audit, Final Output — README.md:219-226) that always ends in an `<output_structure>` (README.md:230-238) requiring, in order:

1. Draft rewrite
2. The literal audit question "What makes the below so obviously AI generated?"
3. Final rewrite
4. Optional summary of changes

This is a **mandatory two-pass structure with a self-review step baked in** (draft → audit question → revised final), conceptually similar to a second-pass audit, but the output contract requires presenting **both** the draft and the final rewrite to the end user (README.md:234, 236). Output is unstructured freeform prose/Markdown with no JSON, diff, or annotation format.

Internal note for §14: this differs from humanizer-pro, whose `SKILL.md:165-166` explicitly forbids exactly this pattern ("the Rewritten version exactly once (never a draft superseded by a second full version)").

## 7. Voice matching / persona profiles

Yes, and this is one of the catalog's more developed sections. Section "[1.1] Voice Calibration" (README.md:54-64) instructs the model to analyze a user-supplied writing sample ("sentence length patterns, word choice level, paragraph openings, punctuation habits, recurring verbal tics, transition style" — README.md:58) and match it, with two supported input methods: inline paste or a referenced file path (README.md:62-64).

When no sample is given, section "[1.2] Default Voice" (README.md:66-85) supplies a fallback persona: a bulleted list of "signs of soulless writing" to reject (README.md:69-74) and a technique table with six rows — Have opinions, Vary rhythm, Acknowledge complexity, Use "I" when it fits, Let mess in, Be specific about feelings (README.md:78-85). There is only one named default voice, not multiple selectable profiles (contrast with a system offering several distinct personas).

## 8. Preservation & SEO safety

This is the catalog's clearest weakness. The **only** preservation instruction anywhere in the repository is a single line: "**Preserve meaning:** Keep the core message intact." (README.md:49). There is no protection for numbers, dates, names, quotations, citations, URLs, file paths, code blocks, tables, or SEO keywords — none of these terms appear anywhere in the document.

Worse, several rules are actively **destructive to structure that an SEO- or format-conscious rewrite would need to protect**:
- C.2: "Remove mechanical boldface. Use plain text." (README.md:149) — strips emphasis markup wholesale.
- C.3: "Convert bold-header-colon lists into flowing prose." (README.md:152) — collapses structured lists into prose.
- C.4: "Convert AI Title Case to sentence case." (README.md:155) — rewrites heading text, which can affect a heading's exact-match SEO value.
- C.5: "Strip all emojis." (README.md:158)
- C.6: "Replace curly quotes... with straight quotes." (README.md:161)

None of these carries a carve-out for headings that carry a target keyword, for CMS/shortcode markup, or for any other structural exception. There is **no validator** of any kind — no script, no checklist, no manual verification step referenced anywhere in the repository.

## 9. Tests/evals/evidence

None. There are no test files, no fixtures, no eval harness, and no benchmark numbers anywhere in the repository (confirmed by the 2-file total in §1). The only self-reported "quality" claim is the version badge itself ("Version-2.5.1") with a single commit behind it — an assertion, not a reproducible measurement.

## 10. Native-speaker quality signals for Arabic

None — the pattern catalog has no Arabic content to review. As established in §3, the wrapper text (headings, explanations, badges) is written in Arabic but every pattern rule, watch-list, and vocabulary item in Sections A-E is English-only. There is no dialect authenticity marker, no MSA-vs-dialect distinction, no native-review flag, and no acknowledgment that Arabic prose has different AI-tell signatures than English prose. If Arabic input is actually run through this prompt, the model would be applying an English-tuned rule set to it with no dedicated guidance, an unaddressed gap the repo does not flag.

## 11. Ethics

The repository frames itself explicitly as "better writing help," not detector evasion — the stated authority is Wikipedia's own "Signs of AI writing" cleanup guide (README.md:27, 244-245), a legitimate style-quality reference, and no watch-list or rule mentions AI-detector tools, plagiarism checkers, or academic-integrity contexts. There is **no explicit refusal or scope statement** about academic dishonesty either way — the topic is simply never raised, unlike humanizer-pro's explicit stop-and-say-so rule (`SKILL.md:48-50`: "Evading academic-integrity rules, plagiarism checks, or AI-detection policies... Say so and stop.").

The more concrete ethical concern is that the "soul-injection" voice-default section **actively instructs inventing content not present in the source**: "React to facts, not just report them. 'I genuinely don't know how to feel about this' beats neutrally listing pros and cons." (README.md:80); "Tangents, asides, half-formed thoughts are human." (README.md:84); "Not 'this is concerning' but 'there's something unsettling about agents churning away at 3am while nobody's watching.'" (README.md:85, a fabricated first-person sensory anecdote presented as a model example). Separately, D.2 instructs deleting honest epistemic hedges: "**Rule:** Delete hedging about incomplete information. State what is known directly." (README.md:172-173) — this converts genuine uncertainty into false confidence, the opposite of factual carefulness. There is **no never-invent rule anywhere in the repository** — no equivalent of humanizer-pro's explicit "never invents facts, quotes, statistics, sources, or personal experience" guarantee (README.md project's own README:13-14, i.e. humanizer-pro's own top-level README).

## 12. Notable ideas worth borrowing

Cross-checked against `skills/humanizer-pro/references/en-patterns.md` and `en-vocabulary.md` before making any "we lack this" claim:

1. **Paragraph-level escalation on vocabulary co-occurrence (B.1, README.md:121):** "If two or more co-occur in one paragraph, rewrite the paragraph entirely." This is a graduated severity rule — single hits get replaced, clusters trigger a full paragraph rewrite — that is sharper than a flat per-word flag. Worth checking whether `en-vocabulary.md`'s tiering already does this, and if not, whether the detector's scoring (`scripts/lib/`) could add a density-triggered escalation similar to what `docs/REVIEW-HANDOFF.md:243-246` (item 3.6/3.7 area) already gestures at for Arabic.
2. **The single-question audit framing (README.md:52, 224, 235):** "What makes the below so obviously AI generated?" is a compact, reusable self-critique prompt. humanizer-pro's mandatory second pass (`SKILL.md:174-183`) is more structured (Editing passes/Checks/Residuals/Stop reason), but this one-line question is a good final gut-check to append as a last micro-step before the Residuals report, cheap to add and easy to remember.
3. **The "soulless writing" negative-space checklist (README.md:69-74)** — six diagnostic signs of AI flatness stated as *symptoms* rather than lexical triggers ("Every sentence identical in length and structure," "No acknowledgment of uncertainty or mixed feelings," "No humor, edge, or personality"). This is a genuinely different diagnostic axis from pattern-matching against a word list, closer to a rhythm/voice audit. humanizer-pro's `voice-matching.md` and `core-principles.md` should be checked for whether this "detect flatness structurally" angle already exists; if not, it's a candidate addition — with the never-invent guardrail kept intact, since the content this repo pairs it with (README.md:80-85) crosses into fabrication.
4. **E.7, fragmented headers (README.md:200-201):** "Delete the one-line paragraph after a heading that merely restates the heading." humanizer-pro's `en-patterns.md:482` (EN-047's neighbor, the fragmented-header pattern) already covers this near-identically — confirms convergent discovery rather than a gap, useful as external validation that this specific tell is worth keeping weighted highly.
5. **D.2, knowledge-cutoff disclaimers (README.md:171-173)** maps directly onto `en-patterns.md:234`'s "as of [date]," "up to my last training update" entry — again convergent, but the *rule* phrasing here ("State what is known directly") is punchier prose than ours and could be borrowed as connective tissue text even though the underlying pattern is already covered.
6. **Bilingual README wrapper structure for an Arabic-speaking audience (README.md:1, 7-17):** regardless of the weak pattern content, presenting the *README itself* bilingually (Arabic prose describing an English-pattern tool) is a distribution/discoverability trick worth considering for humanizer-pro's own docs if targeting Arabic-speaking users who evaluate tools before installing them — our README is English-only end to end.
7. **Explicit phase-numbered workflow scaffolding (`<process>` tags, README.md:219-226)** using XML-pseudo-tags (`<system_state>`, `<role>`, `<execution_rule>`, `<process>`, `<output_structure>`) is a lightweight structuring convention some hosts parse more reliably than Markdown headers; worth a note for future host-compatibility work even though humanizer-pro deliberately targets the `SKILL.md` convention instead.

Items already covered by our own catalog (checked via grep, not assumed): False ranges (`EN-018`), copula avoidance (`EN-026`), synonym cycling/elegant variation (`EN-031`), title-case flagging with carve-outs (`en-patterns.md:476`), one-line closers/dramatic fragments (`EN-002`), "Challenges and Future Prospects"-style sections (`en-patterns.md:184`), and the acknowledgment-loop/sycophancy family (`en-patterns.md:546`) — so items 4 and 5 above are confirmed overlaps, not gaps, and should not be filed as new work.

## 13. Weaknesses

- **Internal contradiction: "Sections A–F" vs. actual "Sections A–E."** Line 47 says "Scan against all patterns in Sections A–F below," but the catalog only has Sections A through E (confirmed in §4) — line 221 correctly says "A–E." A model following the prompt literally is told to scan a Section F that does not exist.
- **License badge contradicts the actual license.** README.md:4 badge reads "License-Copyrighted-red" while LICENSE:1 is a standard MIT license. A user skimming the badges would incorrectly conclude the content isn't freely reusable.
- **Zero test coverage, zero evidence, zero reproducibility** (§9) — every claim in the README, including the "2.5.1" version number and the "based on Wikipedia" authority claim, is asserted, not demonstrated.
- **No deterministic detector, no score, no offsets** (§5) — "detection" is entirely dependent on whatever LLM happens to be running the prompt that session; results are not reproducible or comparable across runs.
- **No preservation guarantees for facts, links, code, or SEO structure** (§8), combined with several rules that are actively destructive to Markdown structure (bold, lists, emoji, heading case) with no exception list.
- **Instructs content fabrication** (§11) — the soul-injection default voice explicitly models inventing first-person sensory detail and opinions not present in the source text, which is a direct conflict with any factual-integrity guarantee.
- **No Arabic pattern content despite an Arabic-branded repository** (§3, §10) — the wrapper implies Arabic capability that the actual rule catalog does not deliver.
- **Single commit, no changelog, no issue tracker activity visible** — the "v2.5.1" version number implies iteration history that doesn't exist in this git history.
- **No installation/activation mechanism** — it is a manual copy-paste artifact with no skill manifest, no `description` trigger field, and no automated way for a host to discover or invoke it.
- **No licensing attribution for the Wikipedia source material** — the catalog derives its content from "Wikipedia:Signs of AI writing" (README.md:245) but provides no link, no CC-BY-SA attribution, and no indication of how much text was directly adapted versus independently written, which is a provenance gap for a community wiki source.

## 14. Verdict vs humanizer-pro

| Dimension | Pythonation_AI-Text-Humanizer-Protocol | humanizer-pro | Who leads |
|---|---|---|---|
| 2. Form factor | Single copy-paste prompt file, no manifest, no packaging, agent-agnostic but manual-invocation-only | Proper `SKILL.md` + reference files + zero-dependency Node scripts, installable across Codex/Claude Code/Claude apps with documented copy paths | we lead |
| 3. Languages & varieties | English-only pattern catalog; Arabic confined to wrapper prose with no dialect or MSA-leakage handling | English plus فصحى/مصري/شامي with automatic variety detection and MSA-leakage rules (`SKILL.md:8-11`) | we lead |
| 4. Pattern catalog | 29 IDed rules, no before/after examples (one parenthetical), one blanket unlinked citation, 2 narrow carve-outs | Larger catalog (`en-patterns.md` has EN-002 through EN-047+) with worked what-it-looks-like/why/fix per entry and explicit per-pattern carve-out lines | we lead |
| 5. Detection | Prompt-only self-audit via one fixed question; no score, no offsets, not reproducible | Deterministic `detect.js` CLI, 0-100 score, JSON output, exit codes, separate EN/AR engines | we lead |
| 6. Modes & output contract | One workflow, mandates presenting both draft and final rewrite to the user | detect/rewrite/edit + seo modifier, single final rewrite only, structured mandatory second-pass audit report (`SKILL.md:174-183`) | we lead |
| 7. Voice matching / persona | Sample-based calibration plus one default "soulless writing" persona (README.md:54-85) | Sample-based voice matching plus five named voice profiles (`references/voice-matching.md`) | we lead |
| 8. Preservation & SEO safety | One line ("keep the core message intact"); several rules actively strip Markdown structure; no validator | Explicit protected-content precedence level 1, dedicated `seo-mode.md` with protected-span list, `validate.js` validator with SEO checks | we lead |
| 9. Tests/evals/evidence | None: zero test files, zero fixtures, zero benchmark numbers | `node --test` suite, fixtures, `evals/` runs, `docs/evidence/` (though self-graded, per `REVIEW-HANDOFF.md` 3.11) | we lead |
| 10. Native-speaker signals for Arabic | None — no Arabic pattern content exists to review | Arabic support exists with explicit unresolved gaps flagged (Levantine unreviewed, self-written fixtures) per `REVIEW-HANDOFF.md` 3.1-3.2 | we lead (their absence isn't a comparison; ours has real but disclosed gaps) |
| 11. Ethics | No never-invent rule; soul-injection instructions explicitly model fabricating first-person content and deleting honest hedges (D.2); no academic-integrity stance either way | Explicit never-invent guarantee and explicit refusal to help evade AI-detection/academic-integrity checks (`SKILL.md:16, 48-50`) | we lead |
| 12. Notable ideas to borrow | Several real ideas (paragraph-escalation on co-occurrence, single-question audit, soulless-writing symptom list, bilingual README) — see §12 | N/A (this is the "what could we take" column) | tie (their catalog offers legitimate raw ideas despite being weaker overall) |
| 13. Weaknesses | Numerous and structural: broken section reference, contradictory license badge, no tests, no preservation guarantees, fabrication-encouraging instructions | Weaknesses are documented and scoped (`REVIEW-HANDOFF.md` section 3, 11 ranked items) rather than undisclosed | we lead |
