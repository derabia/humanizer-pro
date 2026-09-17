# Competitive analysis: POlLLOGAMER_Humanizer-Prompt-Advanced

## 1. Identity

- **URL**: `https://github.com/POlLLOGAMER/Humanizer-Prompt-Advanced` (found via `git remote -v` on the pinned clone; not stated inside the repo's own files).
- **HEAD SHA**: `c44c2340d9e87b525641cc6061f3398f0d4cf0fd` (`git rev-parse HEAD`).
- **License**: none. No `LICENSE`, `LICENSE.md`, or license text of any kind exists in the repo; the only two tracked files are `README.md` and `descarga (28).png`.
- **Last commit date**: `2025-03-16T21:40:21-06:00` (`git log -1 --format=%cI`).
- **File count**: 2 (`find . -type f | grep -v '.git/' | wc -l` → 2: `README.md`, `descarga (28).png`).
- **What it claims to be**: "This is a specialized prompting for AI to humanize texts, with 100 percent effectiveness in many AIs, which means that no AI detector can detect whether a text is made with AI or not." (`README.md:2`). It further claims the technique "avoids ALL AI detectors, even the most popular one which is GPT ZERO" (`README.md:5`).

## 2. Form factor

Prompt file only — a single Markdown README containing two paragraph-length instruction blocks meant to be pasted into a chat with an LLM (`README.md:8`, `README.md:11`). There is no `SKILL.md`, no manifest, no code, no packaging of any kind.

- Agent-agnostic: yes, by omission rather than design. The README never names a specific host; it refers generically to "AI" and lists benchmark runs against "Qwen 2.5 MAX" and "GPT 4o" as the LLMs used to execute the prompt (`README.md:51`, `README.md:68`, `README.md:84`), implying it is meant to be copy-pasted into whatever chat model the user has, not built for Claude, ChatGPT, or Codex specifically. There is no agent/tool/function-calling integration, no system-prompt scaffolding, and no automation — it is literally two paragraphs of instructions.

## 3. Languages & varieties covered

- English (`README.md:7-8`) and Spanish (`README.md:10-11`) — two near-duplicate prompt variants, one written in English instructing a round-trip translation to Spanish and back, one written natively in Spanish.
- No Arabic support of any kind — no mention of Arabic, فصحى, مصري, شامي, or any Arabic variety anywhere in the repo.
- No other languages are covered. The "Spanish" prompt is not actually a Spanish-language output mode; it's an English-to-Spanish-to-English round-trip trick used as a humanization mechanism (see section 12), and the benchmark section separately tests a native-Spanish version of the same trick on Spanish source text (`README.md:67-98`).

## 4. Pattern catalog

Effectively zero distinct, enumerated AI-tell patterns. The repo does not catalog "AI tells" (like em-dashes, "not X but Y," hedging phrases, etc.) at all. Instead it specifies a handful of unstructured techniques inline in prose, within the two prompt blocks:

1. Introduce "slight incoherence" / non-full structure (`README.md:8`, `README.md:11`).
2. Introduce accidental spaces and missing accent marks (Spanish-specific) (`README.md:8`, `README.md:11`).
3. Common human misuse of commas/periods (`README.md:8`, `README.md:11`).
4. Leave things "unfinished" or go in circles on the same subject (`README.md:8`, `README.md:11`).
5. Randomly drop capital letters (`README.md:8`, `README.md:11`).
6. Round-trip translate through Spanish and back to embed the above flaws in English output (`README.md:8`).
7. Fabricate personal experience even when none exists: "Now you also have to tell personal experiences even if you don't have them" (`README.md:8`).

That is the entire catalog — roughly 6-7 loosely stated techniques, none of which have IDs, provenance citations, or a formal list structure. There are no false-positive carve-outs (nothing about when a construct is legitimate rather than an AI tell) and no explicit before/after example pairs tied to individual patterns. The only "before/after" content in the repo is two full-document benchmark transcripts (one Spanish, one English) run through third-party LLMs (`README.md:16-98`), which illustrate the aggregate effect of the prompt, not a per-pattern example.

## 5. Detection

No deterministic detector or parseable code of any kind exists in the repo — it is prompt-only. There is no scoring logic, no scripts, no offsets, nothing executable. The only "scores" in the repo are third-party numbers the author reports having gotten from running the *output* through an external tool, GPTZero, manually:

- "Score in GPT Zero: 53 percent human probability" (`README.md:65`)
- "Score in GPT Zero: 92 percent of it being human-made" (`README.md:82`)
- "Score in GPT Zero: 100 percent human-made" (`README.md:98`)

These are asserted results from an outside detector, not a detector this repo implements or ships.

## 6. Modes & output contract

One mode only: rewrite/humanize. There is no detect mode, no edit-in-place mode, no SEO modifier, and no self-review/second-pass step described anywhere. Output is freeform prose — the prompt just asks the model to return the rewritten text; there is no specified structure, no "issues found" section, no report format, no JSON, nothing machine-parseable (`README.md:8`, `README.md:11`).

## 7. Voice matching / persona profiles

None. There is no mechanism to supply a writing sample or select a voice/persona; the only "persona" instruction is the blanket, always-on directive to fabricate personal experience (`README.md:8`, `README.md:11`) — the opposite of matching an existing user voice.

## 8. Preservation & SEO safety

None. There is no mention of preserving facts, numbers, links, headings, code, or keywords, and no validator of any kind. The prompt explicitly does the opposite of preservation-safe editing: it authorizes structural incoherence, dropped punctuation/capitalization, and fabricated content as humanization mechanisms (`README.md:8`, `README.md:11`), which would be destructive to any SEO-sensitive or fact-sensitive document (headings, keyword placement, protected spans, etc. are never discussed).

## 9. Tests/evals/evidence: test files, fixtures, eval harnesses, benchmark numbers

No test files, fixtures, or eval harness exist in the repo (there is no code to test). The "evidence" is a single informal benchmark embedded in the README: one Spanish source text and its English counterpart (`README.md:18-46`), each run through the prompt on two different third-party LLMs (Qwen 2.5 MAX and GPT 4o) and then manually checked against GPTZero, with the resulting scores pasted in as prose (`README.md:51-98`) and a screenshot graph (`README.md:100-101`, backed by the file `descarga (28).png`). This is not reproducible: there is no seed prompt file, no script, no dataset, no methodology description (number of trials, how GPTZero was queried, whether cherry-picked), and no version pinning of which model checkpoint of Qwen/GPT-4o was used. It is asserted, not sourced.

## 10. Native-speaker quality signals for Arabic

None — repo has no Arabic support.

## 11. Ethics

The repo is explicitly and unambiguously framed around detector evasion, not "better writing." The README's second sentence states the goal as ensuring "no AI detector can detect whether a text is made with AI or not" (`README.md:2`), and the "More in depth detail" section states it "avoids ALL AI detectors, even the most popular one which is GPT ZERO" (`README.md:5`) — this is evasion framing, not quality framing, with no academic-integrity caveat, no refusal condition, and no discussion of appropriate use anywhere in the document.

It also explicitly instructs fact/content invention: "Now you also have to tell personal experiences even if you don't have them" (`README.md:8`), and the Spanish variant carries the equivalent instruction (`README.md:11`, ending in the same "aveces se le olvide poner mayusculas o separar las comas de el siguiente texto" set of errors-and-embellishment directives). This is a direct, stated instruction to fabricate personal experience/content — the opposite of a never-invent guarantee.

## 12. Notable ideas worth borrowing

This is the most important section for humanizer-pro, even though the source is small and ethically compromised. Concrete, specific techniques worth studying (with the necessary caveat that we would strip the detector-evasion and fact-fabrication framing and repurpose only the mechanical techniques, if we chose to use them at all):

1. **Round-trip translation as a distortion mechanic.** The core trick — translate to a second language, apply distortion rules there, translate back to the original language, "maintaining the same flaws" (`README.md:8`) — is a real technique for scrambling an LLM's own stylistic fingerprint, because translation forces re-generation of syntax rather than surface edits. This is worth a *feasibility note* in `en-patterns.md`/`references/core-principles.md` as a documented, named technique we consciously reject (since we never invent/distort meaning), rather than something we silently haven't considered. It's useful to know competitors use MT round-tripping as a stylistic scrambler.
2. **Explicit "go in circles on the same subject" / leave things unfinished** (`README.md:8`, `README.md:11`) as a named human-authenticity marker (topic drift, incomplete thought resolution) is a legitimate observation about how unedited human prose actually reads, distinct from grammar-level noise. Our `en-patterns.md`/`voice-matching.md` could benefit from a legitimate, non-destructive version of this idea: flagging over-tidy resolution (every paragraph closing on a neat point) as an AI tell to rewrite away, without the fabrication and incoherence baggage.
3. **Simple, portable A/B benchmark structure.** The README's benchmark format — same source text, run the exact same technique across multiple LLMs (Qwen 2.5 MAX, GPT 4o), and report a third-party detector score for each (`README.md:48-98`) — is a lightweight, legible way to present before/after credibility to a skeptical reader, even though this repo's own instance is unreproducible. Our `evals/` already has real harnesses; the borrowable idea is the *presentation* format: source text once, side-by-side model outputs, one external score per output, in the README itself rather than buried in a docs subfolder — good for a quick-glance credibility section, which our own README currently lacks (our README links out to `docs/REVIEW-HANDOFF.md` rather than showing any inline before/after).
4. **Punctuation/capitalization irregularity as a distinct tell-category from lexical tells.** The prompt separates "spelling mistakes" (accents, accidental spaces) from "structural" ones (comma/period misuse, dropped capitalization) (`README.md:8`). Our own `en-patterns.md` catalog is presumably lexical/phrase-level (per `SKILL.md:239`); confirming whether punctuation-and-orthography-level tells are covered as their own category (distinct from Tier 1A/1B vocabulary) is worth a gap check, since this competitor treats it as a first-class technique even though crudely.

## 13. Weaknesses

- **No deterministic anything.** Zero code, zero tests, zero automation — a prompt-only README, so none of its claims are independently checkable by re-running anything in the repo.
- **No license.** The repo has no LICENSE file at all, meaning reuse rights are legally ambiguous/default-copyright (unlike humanizer-pro's MIT-licensed, provenance-tracked merges per `README.md:284-300` of our own project).
- **Unreproducible, unverifiable benchmark.** Three GPTZero percentages (`README.md:65`, `82`, `98`) are asserted with no methodology, no date, no GPTZero version, no sample size beyond one text per language, and no disclosure of whether outputs were cherry-picked from multiple attempts.
- **Explicit content fabrication as a designed feature**, not a bug: "tell personal experiences even if you don't have them" (`README.md:8`) is a direct instruction to hallucinate, which would corrupt factual, biographical, or SEO/keyword-bearing text with zero preservation guardrails.
- **No Arabic, no multi-language beyond an English/Spanish translation trick**, no SEO safety, no voice matching, no structured output, no scoring engine, no fixtures, no false-positive handling, no edit-in-place mode, no mode selection logic at all — it is a single undifferentiated prompt.
- **Ethical framing is a serious liability for any legitimate use case.** The README leads with detector-evasion as the value proposition (`README.md:2`, `README.md:5`), which is disqualifying for any context (education, publishing) where AI-detector evasion crosses into policy violation or academic dishonesty — the repo has no refusal logic, no caveats, and no discussion of legitimate-use boundaries anywhere.
- **Stale and apparently abandoned.** Last commit `2025-03-16`; the closing line of the README is an open call for outside help ("If you can give me ideas to improve this or if you can improve it yourself, that would be fantastic," `README.md:104`) with no evidence of any follow-up commits, issues, or contributions in the pinned clone.
- **Internal inconsistency in the Spanish prompt.** The Spanish variant (`README.md:11`) contains a garbled clause — "por silo no siempre poner comas o puntos" — that reads as a typo/non-native-Spanish construction itself, undermining the prompt's own credibility as carefully engineered Spanish-language guidance.

## 14. Verdict vs humanizer-pro

| Dimension | POlLLOGAMER_Humanizer-Prompt-Advanced | humanizer-pro | Who leads |
|---|---|---|---|
| Form factor | Single-file prompt-only README, no packaging, no manifest | `SKILL.md` + reference files + zero-dependency Node scripts, host-agnostic install docs for Codex/Claude Code/Cursor/Claude apps (`README.md:44-90` of our project) | we lead |
| Languages & varieties | English + a Spanish round-trip trick; no Arabic | English + Arabic (فصحى, مصري, شامي) with automatic variety detection (`README.md:8-11` of our project) | we lead |
| Pattern catalog | ~6-7 unstructured techniques in prose, no IDs, no provenance, no false-positive carve-outs | Large merged pattern catalogs (`en-patterns.md`, `en-vocabulary.md`, `ar-*.md`) with pattern IDs and upstream provenance mapping (`docs/PROVENANCE.md`, `SKILL.md:239`) | we lead |
| Detection | Prompt-only; no code; relies on manually pasting output into third-party GPTZero | Deterministic `detect.js` script with weighted scoring engine, `--json`, offsets, exit codes (`README.md:144-163` of our project) | we lead |
| Modes & output contract | One undifferentiated rewrite mode, freeform output | detect / rewrite / edit modes + seo modifier, mandatory second-pass audit, structured report contract (`SKILL.md:58-183`) | we lead |
| Voice matching / persona | None | `voice-matching.md`, sample calibration, five voice profiles (`SKILL.md:142-144`, `SKILL.md:237`) | we lead |
| Preservation & SEO safety | None; prompt actively authorizes incoherence and fabricated content | Protected-content precedence level 1, dedicated `validate.js` preservation validator, SEO protected-span list (`SKILL.md:136-138`, `README.md:189-208` of our project) | we lead |
| Tests/evals/evidence | One unreproducible inline benchmark (3 GPTZero percentages, no methodology) | `node --test` suite, `evals/` with iteration-based grading runs, `docs/evidence/` backing claims (self-assessed only, per `docs/REVIEW-HANDOFF.md`) | we lead |
| Native-speaker quality signals (Arabic) | none - repo has no Arabic support | Self-assessed only; all 30 Arabic fixtures builder-written, Levantine unreviewed by any native speaker (`docs/REVIEW-HANDOFF.md:233-246`) | tie (both effectively unverified by a native speaker, but we at least have Arabic content to review) |
| Ethics | Leads with detector-evasion as the explicit value proposition; instructs fabricating personal experience even when none exists (`README.md:2`, `README.md:5`, `README.md:8`) | Explicitly refuses detector-evasion/academic-dishonesty requests and never invents facts, quotes, or experience (`README.md:13-17` of our project) | we lead |
| Notable ideas to borrow | Round-trip translation as a distortion mechanic; circling/unfinished-thought as an authenticity marker; inline side-by-side benchmark presentation | (n/a — this row assesses the competitor's contribution) | they lead (their inline benchmark presentation and translation-scrambling idea are worth studying even though we would not adopt the underlying evasion goal) |
| Weaknesses | No code, no license, no tests, no reproducibility, explicit fabrication instruction, abandoned since March 2025 | Self-assessed only, Arabic fixtures self-written, Levantine experimental, English engine's known upstream issues carried over (`docs/REVIEW-HANDOFF.md:229-311`) | we lead |
