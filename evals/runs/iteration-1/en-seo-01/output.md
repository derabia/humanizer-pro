# Issues found

**P2**

- Sections restate the same idea rather than advancing it (EN-049, treadmill effect / low information density): the intro says alternating sitting and standing "makes the workday feel less tiring," and the very next section ("Why standing desks help") opens by explaining the same thing again ("Standing desks help because they let you change position throughout the day instead of staying seated for eight hours straight") without adding a new fact. Tightened so the mechanism is stated once instead of twice.
- "It's worth thinking about how much desk space you actually use day to day before buying anything." — mild hedge-filler (EN-030 family), restated more directly.
- **"Sizes to consider" is thin content, not an AI-tell to fix by rewriting harder.** The section states three widths and a recommended range and stops — there's no guidance on what a "small" vs. "large" size actually buys you (desk-depth tradeoffs, when 40" is too narrow, what monitor setups need 55"). This is the article's real substance gap. Per `seo-mode.md` ("flag thin sections; never pad them") and `core-principles.md` ("if the draft lacks substance, say so"), this was **not** padded with invented reviews, made-up measurements, or a fabricated user count — it needs the writer's own specifics (e.g. actual desk-depth numbers, what fits a given monitor arm) to become a real section. Flagged here and in SEO check below rather than filled in.

## Rewritten version

---
title: Standing desks for small home offices
description: A quick look at standing desks for compact home offices.
---

# Standing desks for small home offices

A standing desk lets you change position during the day instead of sitting
for eight hours straight, and that's most of why people working from home
reach for one. Posture and energy levels are the usual reasons people give,
and alternating between sitting and standing does make a long workday feel
less tiring for a lot of people [shortcode
cta id="12"].

## Why standing desks help

Movement helps circulation, and switching between sitting and standing
breaks up the kind of stretch that makes your back stiffen up at a desk.
That's the whole mechanism: change position often enough and the day feels
shorter. See our [home office setup guide](/blog/home-office-setup) for more
general tips, and check out
[our desk accessories roundup](/blog/desk-accessories) for things that pair
well with a standing desk.

<!-- wp:paragraph {"align":"left"} -->
<p>Compatible with monitor arms up to 32 inches, per the spec sheet in
<code>desk-specs.json</code>.</p>
<!-- /wp:paragraph -->

## Choosing a small-footprint desk

In a small home office, footprint and stability matter more than almost
anything else. A desk that wobbles when you type is worse than no standing
desk at all, and a desk that's too deep will make a small room feel
cramped no matter how nice the desk itself is. Measure how much desk space
you actually use day to day before buying anything — most people use far
less surface than they think.

![A compact standing desk in a small home office corner](desk-corner.jpg)

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"Standing desks for small home offices"}
</script>

## Sizes to consider

Sizes here run roughly 40, 48, and 55 inches wide, and most small offices
land somewhere in the 40-to-48-inch range depending on the room.

## What changed

- Merged the redundant restatement between the intro and "Why standing desks help" into one explanation of the mechanism, instead of saying it twice in different words.
- Tightened the closing sentence of "Choosing a small-footprint desk" from a hedge ("It's worth thinking about...") into a direct instruction, without adding a claim the source doesn't make.
- Trimmed "Sizes to consider" for wordiness only — the three widths (40, 48, 55) and the recommended range are unchanged; no new specifics were invented. The section is still thin; see Issues found and SEO check.
- Did not touch: frontmatter, the shortcode, both internal links, the `wp:paragraph` block and its code span, the image and its alt text, or the JSON-LD block.

## Second-pass audit

**Editing passes:** 1 of 2 used (initial pass only).

**Checks:** ran `node skills/humanizer-pro/scripts/detect.js` on the source and on `rewritten.md` (`scores-before.json`, `scores-after.json` in this folder), and `node skills/humanizer-pro/scripts/validate.js input.md rewritten.md --seo keywords.txt` (`validate.txt` in this folder).

**Residuals:** the thin "Sizes to consider" section remains thin — that is the correct outcome, reported rather than papered over with invented content.

**Stop reason:** no further justified in-scope edit remains; the validator confirms every protected span is intact and flags the one thing that actually needs the writer's input.

**Re-scan for the five tells that most often survive a rewrite:** not-X-but-Y — none present. One-line closer — none added. Bare dash — one em dash remains ("most people use far less surface than they think" clause is joined with a dash in the "Choosing a small-footprint desk" paragraph); left in place because it reads as a natural aside rather than the universal-connector pattern, and the source had none to compare against (no voice sample supplied) — flagged here as a residual style note, weak alone per EN-022. Forced triad — the "40, 48, and 55 inches" list is a genuine spec-style enumeration (three real sizes with real numbers), not a manufactured rhythm; kept. Bold label — none used.

## Protected spans

Present and confirmed unaltered in the rewrite, byte-for-byte:

- Frontmatter: `title: Standing desks for small home offices` / `description: A quick look at standing desks for compact home offices.`
- Shortcode: `[shortcode cta id="12"]`
- Internal links: `/blog/home-office-setup`, `/blog/desk-accessories` (anchor text unchanged on both)
- WordPress block comment and its content: `<!-- wp:paragraph {"align":"left"} -->` … `<!-- /wp:paragraph -->`, including `desk-specs.json`
- Image alt text and file name: `desk-corner.jpg`
- JSON-LD block: `<script type="application/ld+json">...</script>`
- Numbers: 40, 48, 55 (sizes), 32 (monitor-arm compatibility)
- Heading hierarchy and wording (H1 + three H2s), unchanged

## SEO check

- Target keyword "standing desk" present in the title (frontmatter and H1), in the first 100 words of body text, and in an H2 ("Why standing desks help"). All three checkpoints hold.
- Secondary keywords "small home office" and "home office setup" both still present.
- No new repeated keyword instance was added; no stuffing.
- No internal link removed or reworded.
- **Thin content, not padded:** "Sizes to consider" (24 words) is below a reasonable section length for ranking and has no real substance beyond three numbers. The correct fix is more from the writer — actual guidance on what each width fits, ideally with real desk-depth or monitor-count specifics — not invented reviews, invented user counts, or restated filler to make the section look longer. Ran `node scripts/validate.js input.md rewritten.md --seo keywords.txt`; result: `PASS — 0 violation(s), 1 warning(s)`, **exit code 0**, with the validator's own `seo-thin-sections` check independently flagging the same section: `[WARN] seo-thin-sections: Section(s) below 40 words: "Sizes to consider" (24 words)`. Full output in `validate.txt`.
