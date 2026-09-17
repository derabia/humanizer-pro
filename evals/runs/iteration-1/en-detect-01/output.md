# Issues found

**Tier-1A authorship markers** (vocabulary claimed to appear far more often in machine text — kept separate from the clarity edits below; a cluster of these is evidence about how the passage was produced, not just a style note):

- P1 — "total **game-changer**" — Tier-1A word, paired with sales framing (EN-009).
- P1 — "**seamless**, robust, and comprehensive editing experience" — Tier-1A word.
- P1 — "**robust**, and comprehensive editing experience" — Tier-1A word.
- P1 — "**comprehensive** editing experience" — Tier-1A word.
- P1 — "a **pivotal** moment in how people capture and organize ideas" — Tier-1A word, also part of the significance-inflation finding below.

**P0**

- "We rebuilt the editor around three pillars: **speed, clarity, and control**." — forced triad, colon into a triple (EN-020). Nothing in the surrounding text establishes that these are the three load-bearing dimensions rather than a default rhythm.
- "Corvus Notes represents a pivotal moment in how people capture and organize ideas — a true shift that will resonate with anyone who has ever lost a good thought to a bad interface." — inflated significance / future-narrative closer (EN-006). An ordinary product release is framed as a historic turning point with no supporting evidence.

**P1**

- "Corvus Notes isn't just another note-taking app — it's a statement about how knowledge workers should think." — not-X-but-Y contrast (EN-001). The negative half ("just another note-taking app") names an objection no one raised.
- "This isn't about writing faster — it's about thinking clearer. **That's the real unlock.**" — a second not-X-but-Y (EN-001) immediately followed by a one-line closer that restates it (EN-002).
- "**Let that sink in.**" — one-line closer / dramatic fragment standing alone as its own paragraph beat (EN-002).
- "Furthermore, the new release delivers a seamless... Moreover, teams that adopt structured note-taking... In addition, the redesigned search..." — three stacked transition words opening three consecutive sentences (EN-030). This is mechanical connective tissue, not an earned transition each time.
- "Like and subscribe for more updates, and let us know what you think in the comments below!" — social-media engagement sign-off appended to prose that isn't a video/social script (EN-055). It performs audience engagement rather than adding information.
- "the kind of improvement that compounds over time, week after week, project after project" — extends the same significance-inflation move as the P0 closer above (EN-006), on a smaller claim (sync reliability).

**P2**

- "Isn't it time your notes worked as hard as you do?" — rhetorical question used as a stalling transition rather than earned by a specific setup (EN-043).
- 4 em dashes in a 228-word piece (EN-022) — over the no-sample default (target zero, hard cap one per 1,000 words). Weak alone as authorship evidence, but corroborates the other findings here; flagging it as style-only, not proof.
- "We're thrilled to announce the latest release" — promotional/launch-copy framing (EN-009), same family as "game-changer" above but a phrase-level clarity issue rather than a Tier-1A vocabulary hit.

## Assessment

This text should be treated as a real problem, not a borderline case. The tells corroborate each other rather than standing alone: five Tier-1A vocabulary hits, a stacked-transition paragraph, two separate not-X-but-Y contrasts each capped with a one-line closer, a forced triad, and a significance-inflation closer that oversells a note-taking app release as a "pivotal moment" — that's a dense cluster, not one or two defensible choices.

Nothing here reads as a defensible authorial choice in context: there's no voice sample or established register that would explain the "Let that sink in." / "That's the real unlock." pattern, and the closing "Like and subscribe" line is a leftover social-media prop that doesn't fit a note-taking app announcement written as prose. The single rhetorical question (EN-043) and the 4 em dashes (EN-022) are individually weaker signals — either alone would be a "worth a second look" flag — but here they sit inside a paragraph that's already failing on stronger grounds, so they corroborate rather than stand alone.

The one place a writer could reasonably push back is the forced triad ("speed, clarity, and control"): three real product dimensions can legitimately need three words. It's flagged because nothing in the surrounding text develops any of the three individually — they're named and dropped — which is what tips it from "genuine list" to "default rhythm."

## Score

Score: 17/100 ("Some AI patterns", per `scripts/detect.js`)

Detector classification: MIXED (human 0.454 / mixed 0.441 / ai 0.105, medium confidence). The numeric score and label above came from running `node scripts/detect.js evals/inputs/en-detect-01.md --markdown --json` — see `scores-before.json` in this folder for the full output. The script caught 5 Tier-1A vocabulary hits, 4 stacked transitions, one significance-inflation hit, and the 4 em dashes; it does not independently flag the not-X-but-Y contrasts, the one-line closers, the forced triad, the rhetorical question, or the social-endorsement closer — those are model-only findings from the audit above, cited with pattern IDs per `en-patterns.md`.

Zero editing passes were run. This is a detect-mode response: no rewriting, no marks normalization.
