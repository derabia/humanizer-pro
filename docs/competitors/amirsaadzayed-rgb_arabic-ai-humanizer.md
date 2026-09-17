# amirsaadzayed-rgb / arabic-ai-humanizer — competitor review

Repo root reviewed: `_sources/competitors/amirsaadzayed-rgb_arabic-ai-humanizer/` (9 files, all read: `.DS_Store`, `.gitignore`, `README.md`, `__pycache__/main.cpython-312.pyc`, `main.py`, `requirements.txt`, `static/index.html`, `static/vercel.json`, `users_data.db`).

## 1. Identity

- URL: implied `github.com/amirsaadzayed-rgb/arabic-ai-humanizer` (folder name; no remote inspected in this clone).
- HEAD SHA: `35df899d48a48b5a7ad073e568b833a3bdbd728c` (`git log -1`: "Update login button UI", Sun Aug 16 2026).
- License: none present. No `LICENSE` file anywhere in the tree.
- Last commit date: 2026-08-16.
- File count: 9 (excluding `.git/`), including a committed SQLite DB (`users_data.db`) and a committed `__pycache__/*.pyc`.
- Claim (quote, `README.md:3`): "تطبيق ويب ذكي مبني بـ **FastAPI** و **Python**، مخصص لتحويل النصوص المولدة بواسطة الذكاء الاصطناعي إلى صياغة بشرية طبيعية، سلسة، ودقيقة باللغة العربية." ("A smart web app built with FastAPI and Python, dedicated to converting AI-generated text into natural, smooth, and precise Arabic phrasing.")

## 2. Form factor

A hosted web application (FastAPI backend + static HTML/JS/Tailwind frontend), not an agent skill, not a prompt file, not a library. `main.py:12` instantiates `FastAPI()`; `static/vercel.json` configures it as a Vercel Python function. Host target: Vercel serverless (`static/vercel.json:1-14`). Not agent-agnostic in any sense — it is a SaaS product UI with login and payment modals (`static/index.html:217-238`), with zero relationship to the Agent-Skill/SKILL.md pattern the other three competitors use.

## 3. Languages & varieties

Arabic only, and the UI/prompt do not distinguish any variety (no MSA/Egyptian/Levantine/Gulf/Maghrebi handling anywhere in `main.py` or `index.html`). The single LLM prompt (`main.py:111`) asks for "لغة بشرية طبيعية" (natural human language) with a user-selected "tone" and "length" parameter, but variety/dialect is never modeled. No other languages supported.

## 4. Pattern catalog

None. There is no pattern list, tell catalog, or vocabulary bank anywhere in the codebase — no `rules.yaml`, no `patterns.md`, no regex bank. The entire "humanization" logic is a single hard-coded prompt string sent to a third-party LLM (`main.py:104-133`, function `humanize_text`): the prompt is one sentence long (`main.py:111`) with no examples, no before/after pairs, no enumerated AI-tell list, no IDs, no false-positive carve-outs. Pattern count: **0**.

## 5. Detection

No real detector. `analyze_article_metrics()` (`main.py:20-27`) computes fake scores from a character-sum hash of the input text, not from any linguistic analysis:

```python
def analyze_article_metrics(original_text: str, result_text: str):
    orig_hash = sum(ord(c) for c in original_text) if original_text else 50
    original_ai_score = 88 + (orig_hash % 9)
    res_hash = sum(ord(c) for c in result_text) if result_text else 50
    result_human_score = 92 + (res_hash % 8)
    return original_ai_score, result_human_score
```

This guarantees an "AI score" of 88-96% and a "human score" of 92-99% for *any* input regardless of content — it is not measuring anything about the text; it is a deterministic function of character-code sums bounded to a narrow, marketing-friendly range. The frontend labels this "📊 مقياس تحول النص (AI vs Human Score)" (`static/index.html:138`) and renders it as a real before/after gauge (`static/index.html:144-154`, `578-583`). This is a materially deceptive UX claim: it presents a fabricated number as a measurement.

## 6. Modes & output contract

One mode only: rewrite via a single `/humanize` POST endpoint (`main.py:104`) that takes `text`, `tone`, `length` form fields and returns `{success, result, ai_score, human_score}` (`main.py:126-131`). No detect-only mode, no edit-in-place mode, no second pass, no structured issue list — the endpoint is a thin passthrough to Groq's `llama-3.3-70b-versatile` (`main.py:113`) with `temperature: 0.7` and no system prompt separating instruction from content.

## 7. Voice matching / profiles

None. The only customization is a free-text "tone" and "length" parameter passed into the prompt string (`main.py:111`); no voice-sample calibration, no named profiles, no rhythm/lexicon matching logic.

## 8. Preservation & SEO safety

None. No protected-span concept, no fact/number/link/heading preservation, no validator, no keyword handling. Because the entire transformation is "send text + tone + length to an LLM, return whatever comes back" with no constraints in the prompt beyond tone/length, there is no mechanism to prevent the LLM from altering facts, numbers, or structure.

## 9. Tests/evals/evidence

None. No test directory, no fixtures, no eval harness, nothing under version control that validates output quality. The only "evidence" of AI/human transformation is the fabricated hash-based score described in §5.

## 10. Native-speaker quality signals

The visible Arabic strings in the UI (`static/index.html`, `README.md`) read as fluent, natural Arabic — e.g. `README.md:3` and the modal copy — consistent with native or near-native authorship of the UI text itself. However, there is no way to assess the *output* quality of the humanizer feature itself from the repo, since it is entirely dependent on a live third-party LLM call with a one-line prompt and no examples; nothing in the repo demonstrates or tests what the actual rewritten Arabic looks like.

## 11. Ethics

Aims at a paid consumer product ("مُنسّق برو", `static/index.html:6`) with pricing/checkout flows (Paddle integration, `static/index.html:19-24`, `230-238`) and a Paymob payment backend fully wired into `main.py` (`create-payment` endpoint, `main.py:43-101`, with a hard-coded billing email `amirsaadzayed@gmail.com` at `main.py:71` and a hard-coded phone number at `main.py:76` — the developer's own PII checked into source control). The product's core selling point is the fabricated "AI vs Human Score" gauge (§5), which is an ethically significant finding: users are shown a percentage implying rigorous measurement that is in fact meaningless, in a paid product marketed as helping them evade AI detection ("تحليل الذكاء الاصطناعي: أدوات لقياس وتحليل نسبة النصوص البشرية مقابل نصوص الذكاء الاصطناعي", `README.md:7`). No invented-content guardrail exists in the prompt; nothing prevents the LLM from fabricating facts during rewriting.

## 12. Notable ideas worth borrowing

- Little to borrow technically. The one structurally interesting idea is the **before/after visual gauge UI concept** (`static/index.html:138-165`, two side-by-side percentage dials) — the *UX pattern* of showing a visible AI-score-drop after humanizing is a reasonable product idea, provided it is wired to a real, honest detector (which humanizer-pro's `detect.js` already provides) rather than a hash.
- The **tone/length as first-class user parameters** on the humanize call (`main.py:105`) is a lightweight version of something like a voice-profile selector; worth noting as a minimal-viable pattern for surfacing "tone" as a one-field control if we ever want a simpler alternative entry point than the full voice-matching reference.

## 13. Weaknesses

- Fabricated scoring (§5) is the single most serious finding across all four repos reviewed: it is not a heuristic with known blind spots (like humanizer-pro's or MrBridgeHQ's), it is mathematically decoupled from the text's content entirely.
- No license file — legally, all rights reserved by default; the code cannot be reused even under permissive terms.
- Secrets/PII hygiene: hard-coded personal email and phone number in source (`main.py:71,76`), and a committed SQLite database (`users_data.db`) and `.pyc` bytecode file checked into git.
- No pattern catalog, no tests, no validator, no preservation logic — the product is a UI wrapper around one generic LLM prompt call.
- Single point of failure and no offline mode: everything depends on a live Groq API key (`GROQ_API_KEY` env var) with a plaintext error message leaking API failure text back to the user (`main.py:122`).
- Payment code is production-shaped (Paymob order/payment-key flow) sitting in the same file as the core feature, i.e., no separation of concerns and a much larger attack surface than the product needs.

## 14. Verdict vs humanizer-pro

| Dimension | amirsaadzayed-rgb/arabic-ai-humanizer | humanizer-pro | Verdict |
|---|---|---|---|
| 1. Identity/maturity | No license, PII/secrets in source, DB committed | MIT, documented weak spots, no secrets/PII issues | we lead |
| 2. Form factor | Hosted SaaS web app, Vercel-specific | Portable Agent Skill across multiple hosts | we lead |
| 3. Languages/varieties | Arabic, no variety distinction at all | MSA + Egyptian + experimental Levantine | we lead |
| 4. Pattern catalog | None (0 patterns; one-line LLM prompt) | Tiered vocabulary + pattern IDs across EN/AR | we lead |
| 5. Detection | Fabricated hash-based fake score, not a detector | Deterministic weighted-signal scorer, heuristic but real and documented | we lead — decisively |
| 6. Modes & output contract | One mode (rewrite), no structure | detect/rewrite/edit/seo, structured contract, mandatory second pass | we lead |
| 7. Voice matching | Free-text tone/length field only | Named voice profiles + sample calibration | we lead |
| 8. Preservation & SEO safety | None | Dedicated SEO mode + mechanical validator | we lead |
| 9. Tests/evals/evidence | None | node --test suite + eval runs (self-graded, per REVIEW-HANDOFF) | we lead |
| 10. Native-quality signals | UI copy reads natively; output quality unverifiable (live LLM, no examples) | Self-flagged pending native review, but documented fixtures and doctrine to inspect | we lead |
| 11. Ethics | Deceptive fake-score UX in a paid product; no anti-fabrication guardrail | Explicit anti-fabrication rule + explicit refusal of detector-evasion requests | we lead — decisively |
| 12. Borrowable ideas | Minor UX gauge concept only | — | tie (little to take) |
| 13. Weaknesses | Severe: fake metric, no license, secrets in repo | Self-documented, non-deceptive limitations | we lead |
