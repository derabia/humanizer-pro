# History rewrite: attribution removal

On 2026-09-20 every commit message in this repository was rewritten to remove
the `Co-Authored-By` trailer that named the AI assistant used during the build.
The file content of every commit is unchanged: the tree hash of the tip before
and after the rewrite is identical. Only commit messages, and therefore commit
hashes, changed.

Why this file exists: several documents cite commit hashes as provenance, and
the raw command captures under `docs/evidence/` are kept verbatim, so they
still print the pre-rewrite hashes. Use the table below to translate any hash
found in an evidence file into the hash that exists in the published history.

Narrative documents (CHANGELOG.md, docs/REVIEW-HANDOFF.md, docs/PROGRESS.md,
docs/COMPETITIVE-ANALYSIS.md, docs/EXAMPLES.md, corpus/RESULTS.md) were updated
to the new hashes. Files under docs/evidence/ were deliberately left untouched.

| # | subject | old hash | new hash |
|---|---|---|---|
| 1 | phase-1: pin upstream sources | `8521bf8f9f` | `8521bf8f9f` |
| 2 | phase-0: bootstrap progress tracking and save build prompt | `073e321817` | `a838f59f97` |
| 3 | phase-2: upstream inventories (blader 25, avoid-ai-writing 90, semitic | `afb31b9fd2` | `1b00ef6db4` |
| 4 | phase-2: inventory and conflict map | `98fd493106` | `b850411630` |
| 5 | phase-3: precedence system; phase-4/5: core principles, modes, voice m | `626d4b74da` | `d3b95fa6f0` |
| 6 | phase-6a: adapt English detector/validator, add Arabic normalizer and  | `e845dc4ae5` | `814dc62028` |
| 7 | phase-6a: normalize line endings to LF | `0cc89d1a3a` | `c16d16d19b` |
| 8 | docs: progress update after phase 3/4/6a | `6ac7194868` | `5c96028baa` |
| 9 | phase-4: verify Arabic references; merge provenance, dedup, native-rev | `f7086e1a4e` | `1272843e71` |
| 10 | phase-10a: license, credits, check-upstream tool, architecture notes | `88e5dd416a` | `73b866f167` |
| 11 | phase-7: SKILL.md router (265 lines, 973-char description) and check-s | `56615ddc7c` | `ae8b55a4a3` |
| 12 | phase-6b: validate.js preservation validator with SEO checks, EN and S | `74253a744c` | `2fa9a7bc9a` |
| 13 | phase-6b: Arabic detector engine, detect.js CLI, Arabic fixtures and t | `e90dc734d6` | `abaf93017c` |
| 14 | docs: progress after phase 6b/7/10a | `5848c3be1b` | `05df4ef52d` |
| 15 | phase-10: README with Arabic quick-start, zip builder, dist/humanizer- | `30d03d7be5` | `99b989f4e6` |
| 16 | phase-9: author 16 evals with inputs, keywords, voice samples, and che | `8e9eaceac1` | `fa923f98e0` |
| 17 | phase-6b: register-mix promotion gated on lexical dialect evidence and | `9b565667c6` | `d54d426ab4` |
| 18 | phase-10: rebuild dist zip after detector fix | `f1cf8b80e5` | `ad5c47f075` |
| 19 | phase-9: iteration-1 eval runs (en, msa); add missing hedge variants f | `da36da56ab` | `e2447f9282` |
| 20 | phase-9: iteration-1 eval runs (egt, shami) | `1f025cd582` | `bd33bfd82f` |
| 21 | phase-9: builder self-assessment (iteration 1) and iteration-2 script  | `d76a78ca97` | `4a286ffe9a` |
| 22 | phase-11: review handoff, acceptance evidence, final test run, zip reb | `84f666a171` | `6f05454644` |
| 23 | docs: competitive reviews of 11 humanizer repos (rubric-based, file:li | `557ae13458` | `286bed232c` |
| 24 | docs: competitive analysis and proposed improvement plan (not started) | `37c889122a` | `203711159d` |
| 25 | docs: add sawradip/rehumanize review; extend competitive analysis (IMP | `566f563850` | `ae8094ef04` |
| 26 | state: start improvement round 1 | `548dc3bfbc` | `a9b6e7cb88` |
| 27 | round-1: IMP-03 CI workflow, IMP-05 packaging and host manifests, IMP- | `45894380d7` | `b352c0f518` |
| 28 | round-1: IMP-04 deterministic benchmark, IMP-07 blinded pairwise kit,  | `7821f636e5` | `c47975a0c4` |
| 29 | round-1: IMP-11 coverage map + parity test, IMP-15 family tags + P2-on | `5532f4f535` | `e3359703cd` |
| 30 | round-1: IMP-09 fidelity check and --mode, IMP-10 overlap grouping and | `3388a16959` | `08de32af22` |
| 31 | round-1: document --mode rewrite and --strict-fidelity in modes.md and | `ccf1441691` | `10cc7aea08` |
| 32 | round-1: IMP-01 Arabic FP corpus (300 docs, Wilson CI) and fp-measure  | `0e63a64512` | `a2fe215bc3` |
| 33 | round-1: IMP-20 ignore regions in detect.js and self-scan tool with re | `949da072ac` | `ff659652a3` |
| 34 | round-1: IMP-27 ambiguous-marker routing guard, per-pattern contributi | `9de5d8f92c` | `801cf9564e` |
| 35 | round-1: closure. Version 0.2.0, changelog, review handoff and competi | `475a51e289` | `0416101ee1` |
| 36 | docs: publication guide with real before/after examples for English, M | `cc92b98069` | `1cd784eba6` |
| 37 | state: record publication to github | `99409d9ff5` | `d0c7b47868` |
| 38 | docs: retire the Node 18 weak spot, CI is green on 18/20/22 and Window | `9c683491d9` | `2c3b51004e` |

The pre-rewrite history is kept locally under `refs/original/` in the build
machine checkout. It was never published.
