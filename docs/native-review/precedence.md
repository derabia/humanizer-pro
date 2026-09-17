# Native review queue — precedence.md

Every item marked `<!-- NATIVE-REVIEW: ... -->` in
`skills/humanizer-pro/references/precedence.md`, grouped by variety. Line
numbers are as of the commit that adds the file.

## MSA (`msa`)

| File | Line | Excerpt | What is uncertain |
|---|---|---|---|
| `skills/humanizer-pro/references/precedence.md` | 143 | Worked example AR-1: before `إن التعليم يؤثر بشكل مباشر على مستوى التنمية الاقتصادية والاجتماعية في أي مجتمع من المجتمعات.` → after `متى تعلّمنا أخيرًا أن الأمم لا تُبنى بالثروات، بل بما تفعله بها؟` | Both sentences are copied verbatim from `semitic/skills/humanizer-ar-msa/SKILL.md:361-362`, but upstream presents them as a paired AI/human contrast, not as a minimal edit of one into the other. A reviewer should confirm that the pair still reads as the *same* claim rewritten, and that the rhetorical question is idiomatic standing alone outside its original section. |

## Egyptian (`egt`)

| File | Line | Excerpt | What is uncertain |
|---|---|---|---|
| `skills/humanizer-pro/references/precedence.md` | 161 | Worked example AR-3: `سوف نتحدث عن هذا الموضوع لاحقاً وسأذهب لمقابلته غداً` → `هنتكلم في الموضوع ده بعدين وهروح أقابله بكره` | Copied verbatim from `semitic/skills/humanizer-ar-egt/SKILL.md:136-137`. Uncertain: the surrounding claim that the *same* sentence would be left untouched in an MSA-target document. A reviewer should confirm that the MSA "before" line is acceptable MSA on its own (it carries the adverbial لاحقاً with tanwin, which the MSA reference would treat under its diacritic-consistency rule, not the future-marker rule). |
| `skills/humanizer-pro/references/precedence.md` | 170 | Worked example AR-4: described, not quoted — a seven-step numbered install procedure in Egyptian with an MSA hedged opener `من الجدير بالذكر أن ...` | The example is deliberately described rather than written out, so no Egyptian prose was invented. A reviewer should decide whether a concrete Egyptian before/after is worth adding here, and if so supply it; the opener phrase is taken from `semitic/skills/humanizer-ar-egt/SKILL.md:287`. |

## Levantine (`shami`)

| File | Line | Excerpt | What is uncertain |
|---|---|---|---|
| `skills/humanizer-pro/references/precedence.md` | 180 | Worked example AR-5: `هاد الأسلوب أحسن لأنو بيوفر وقت وجهد، بتفهم؟` | Copied from `semitic/skills/humanizer-ar-shami/SKILL.md:601`, but truncated — upstream continues `يعني النتايج رح تكون ممتازة، مش هيك؟`. A reviewer should confirm the truncated clause stands alone, and that the sub-regional form (هاد / لأنو / بتفهم؟ are given as Syrian-Lebanese-Palestinian-general upstream) is safe to present without naming a sub-region. All Levantine items are flagged unconditionally, per the build rule. |
