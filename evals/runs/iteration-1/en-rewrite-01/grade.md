# Grade: en-rewrite-01

## Against `expected` block

- **mustPreserve (all 12 terms):** PASS — checked each against `rewritten.md`: Basecraft, onboarding module, Task tracking, Manager check-ins, Document library, Progress dashboard, Slack reminders, Buddy system pairing, Feedback surveys, Calendar sync, role-based templates, API. All present verbatim.
- **mustNotContain "might possibly":** PASS — not present in `rewritten.md`.
- **mustNotContain "potentially struggling":** PASS — not present.
- **mustNotContain "Great question about":** PASS — not present; opener replaced entirely.
- **scoreShouldImprove: true:** PASS — `scores-before.json` score 8 → `scores-after.json` score 5 (both from actual `detect.js` runs). Label stayed "Minimal AI signals" but the hedge-stack finding is gone and word count only dropped by 2, so the improvement is real, not just noise from a shortened text.
- **notes — drops recap-flattery opener:** PASS — "Great question about..." replaced with a direct claim (EN-042 cited).
- **notes — drops hedge-stacked "might possibly...potentially...though results could vary":** PASS — collapsed to one sentence keeping the real qualifiers (team size, role complexity, documentation quality) without the cancel-each-other-out hedging (EN-023 cited).
- **notes — flat 8-item bullet dump (EN-036) kept without inventing a metric:** PASS — the list was deliberately left as a list (it's genuinely feature-shaped, protected structure) rather than converted to prose; "fewer missed steps" stayed exactly as qualitative as the source states it — no invented percentage was added. This is called out explicitly in Issues found and What changed.
- **notes — voice sample's short declarative sentences, sparse punctuation, no em dashes, one rhetorical aside ('And honestly?'):** PASS — `rewritten.md` has zero em dashes, short declarative sentences throughout, and exactly one "And honestly?" aside placed at the close, matching the sample's own placement pattern. Confirmed by re-reading `voice.md` against `rewritten.md`.
- **notes — full second-pass audit required:** PASS — all four Verification items (Editing passes, Checks, Residuals, Stop reason) present in `output.md`, plus the mandated five-tell re-scan.

## Against the general Phase 9 checklist

- **Meaning/facts preserved:** PASS — every feature name and both qualitative claims (fewer missed steps, less time on questions) match the source; no invented fact, number, or credential.
- **Output contract followed exactly:** PASS — Issues found → Rewritten version (exactly once) → What changed → Second-pass audit, in that order.
- **Second pass present and useful:** PASS — not boilerplate; it specifically calls out the one borderline EN-007 candidate left alone and explains why, rather than claiming a clean sweep.
- **Detector score improved or explanation given:** PASS — 8 → 5, both real runs.
- **Reads naturally / voice fidelity:** PASS, with one judgment call worth flagging — the rewrite explicitly declines to import the voice sample's own first-person claim ("I've hired a lot of people") into the piece, on never-invent grounds, and states this reasoning in the "Voice-matching notes" section rather than silently doing the safer thing. This is arguably the correct call per `core-principles.md`, but it's a judgment call a grader could disagree with, so it's flagged here rather than assumed uncontroversial.

## Overall

10/10 PASS on explicit checks. 0 FAIL. 0 NEEDS-NATIVE-REVIEW (English-only). One judgment call flagged above (declining to adopt the sample's own biographical claim) — reported as a deliberate, defensible choice, not a defect.
