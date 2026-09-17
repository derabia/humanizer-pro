# Review handoff

For an independent reviewer who did not see the build session. Everything below
is reproducible from files and commands in this repository. Build head at the
time of writing: `1f025cd` on branch `build/humanizer-pro`. Raw output for every
command quoted here is in `docs/evidence/phase11-acceptance.txt`, generated in
the same session as this document. Builder environment: Node v25.2.1, git
2.52.0.windows.1, Windows 11 Pro 10.0.26200 (`UPSTREAM.md`, "Build
environment"). Nothing here is a review: eval grading was done by the builder's
own agents and is labelled a builder self-assessment throughout.

## 1. Reproduce from scratch

Bash first, PowerShell where the two differ. Each step says whether it was
actually executed while writing this handoff.

### 1.1 Clone this repository

```bash
git clone <repo-url> humanizer-pro
cd humanizer-pro
git checkout build/humanizer-pro
git log --oneline          # 21 commits, 8521bf8 oldest, 1f025cd newest
```

PowerShell is identical. Not re-run here; `git log --oneline` reports 21 commits.

### 1.2 Re-clone the three upstreams at their pinned SHAs

`_sources/` is gitignored, so a fresh clone of this repo has no upstream
checkout. The three pins are in `UPSTREAM.md`. All three pinned SHAs are still
the remote HEAD as of this writing, so a plain `--depth 1` clone already lands
on the right commit. The `fetch` line is the fallback for when a pin falls
behind remote HEAD: a depth-1 clone carries no history, so `git checkout <SHA>`
on its own would fail with "reference is not a tree".

```bash
mkdir -p _sources

git clone --depth 1 https://github.com/blader/humanizer _sources/blader
git -C _sources/blader fetch --depth 1 origin 9862685f575c65a8247f90369951df1b3416e3d6 || true
git -C _sources/blader checkout 9862685f575c65a8247f90369951df1b3416e3d6
git clone --depth 1 https://github.com/conorbronsdon/avoid-ai-writing _sources/avoid-ai-writing
git -C _sources/avoid-ai-writing fetch --depth 1 origin 7a2c7d11d4a74d90c6be41fbed8402d972543798 || true
git -C _sources/avoid-ai-writing checkout 7a2c7d11d4a74d90c6be41fbed8402d972543798
git clone --depth 1 https://github.com/OthmanAdi/humanizer-semitic _sources/semitic
git -C _sources/semitic fetch --depth 1 origin 2c9d4fbe3e0086d373b59bfebc9556082275cf62 || true
git -C _sources/semitic checkout 2c9d4fbe3e0086d373b59bfebc9556082275cf62

# then, per repo:
git -C _sources/<name> rev-parse HEAD
```

PowerShell differences: `New-Item -ItemType Directory -Force _sources` instead
of `mkdir -p`, and Windows PowerShell 5.1 has no `||` operator, so drop
`|| true` and run the `fetch` line on its own. Each `rev-parse HEAD` must print
the SHA recorded in `UPSTREAM.md`; a detached HEAD is expected.

NOT re-run, because re-cloning would overwrite the working `_sources/` tree
this session verified provenance against. The syntax follows `git clone --help`
(`--depth` implies `--single-branch`) and `git fetch --help` (fetching an exact
commit needs the server to allow arbitrary SHA1 in want, which GitHub does).
The equivalent already-run check is `node tools/check-upstream.js` (section 1.4).

### 1.3 Install nothing

Nothing to install: `package.json` declares no `dependencies` and no
`devDependencies`, and every script is CommonJS requiring only Node core.

### 1.4 Run the checks

```bash
npm test                          # runs node tools/run-tests.js
node tools/check-skill.js
node tools/check-evals.js
node tools/check-upstream.js      # needs network
```

All four were run, identically in PowerShell. `npm test`: 114 tests, 114 pass,
0 fail, 0 skipped. `check-skill`: 0 failures, 0 warnings (265 lines,
description 973 characters, frontmatter parsed). `check-evals`: PASS (16
entries; 4 per language; detect 4, rewrite 6, edit 6; seo 5; one voice-sample
eval per language family; 1 thin-content). `check-upstream`: all three repos
unchanged.

### 1.5 Run the detector over every fixture

```bash
for f in tests/fixtures/*/*.md; do
  node skills/humanizer-pro/scripts/detect.js "$f" --json |
    node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const r=JSON.parse(s);console.log([process.argv[1],r.lang,r.variety||"-",r.score,r.label].join(" | "))})' "$f"
done
```

PowerShell:

```powershell
Get-ChildItem tests/fixtures -Recurse -Filter *.md | ForEach-Object {
  $j = node skills/humanizer-pro/scripts/detect.js $_.FullName --json | ConvertFrom-Json
  "{0} | {1} | {2} | {3} | {4}" -f $_.FullName, $j.lang, $j.variety, $j.score, $j.label
}
```

Both were run: the bash loop across all 74 fixture files, the PowerShell loop
as a six-file spot check producing the same values. Full table in
`docs/evidence/phase11-acceptance.txt`. All 15 Arabic `ai-*.md` fixtures score
84 to 100 (`AI`), all 15 Arabic `human-*.md` fixtures score 0 (`HUMAN`), all 5
Arabic false-positive fixtures score 0. These match
`docs/evidence/phase6b-fixture-scores.txt` exactly; the one apparent difference
is a flag difference, not drift, since that file used `--markdown` and
`false-positives/ar-technical-en-terms.md` scores 14 with `--markdown`
(re-verified) against 0 without it. Nothing moved after the `lexicons.js`
change in `da36da5`.

English scores are not comparable against the Arabic thresholds: the English
engine is upstream's, with its own label ladder plus a separate trinary
`document_classification`. English `ai-*` fixtures land at 15 to 42 with
`MIXED` or `AI_ONLY`; English `human-*` fixtures at 0 to 2, all `HUMAN_ONLY`.

### 1.6 Run the validator on the SEO ok/bad pairs

```bash
for f in tests/fixtures/seo/article-after-*.md; do
  node skills/humanizer-pro/scripts/validate.js \
    tests/fixtures/seo/article-before.md "$f" \
    --seo tests/fixtures/seo/keywords.txt > /dev/null 2>&1
  echo "$f exit=$?"
done

# same two-file form for the Arabic pair (ar-article-before.md against
# ar-article-after-ok.md and ar-article-after-bad-digits.md, with and without
# --strict-digits, --seo tests/fixtures/seo/ar-keywords.txt) and for the
# thin-content pair (thin-before.md / thin-after.md, --seo keywords.txt)
```

PowerShell (also run): replace the loop idiom with `Get-ChildItem
tests/fixtures/seo/article-after-*.md | ForEach-Object { node ... ;
"$($_.Name) exit=$LASTEXITCODE" }`.

Run. All 13 `article-after-bad-*.md` fixtures exit 1, one protected-element
class each: image alt text, blockquote, code block, frontmatter, H2 wording,
JSON-LD, keyword removal, link, number, shortcode, keyword stuffing, table
cell, WordPress block comment. `article-after-ok.md` exits 0. The Arabic
digit-system change exits 0 with a warning by default and 1 under
`--strict-digits` (documented design, not a miss), and the thin-content pair
exits 0 with one `seo-thin-sections` WARN, the intended flag-do-not-pad
behaviour.

### 1.7 Re-run the evals

Follow `evals/README.md`, "How to run one eval manually", for each of the 16
entries in `evals/evals.json`: paste the eval `prompt` plus its `inputFile`
(and `keywordsFile` / `voiceSampleFile` when set) into a fresh session with the
skill loaded, save the verbatim response, then run `detect.js` before and after
and `validate.js` for `edit` and `seo` evals. Coverage is re-checkable
mechanically with `node tools/check-evals.js`.

The evals are model-run rather than scriptable, so they were NOT re-run here.
Compare your runs against the committed iteration-1 outputs under
`evals/runs/iteration-1/<eval-id>/` (`input.md`, `prompt.txt`, `output.md`,
`scores-before.json`, `scores-after.json`, `validate.txt`, `grade.md`) and the
two batch summaries `SUMMARY-en-msa.md` and `SUMMARY-egt-shami.md` in the same
directory. `evals/runs/iteration-1/SELF-ASSESSMENT.md` and
`evals/runs/iteration-2/` were written concurrently by a separate agent and
were not read here; read them before treating iteration-1 as final.

### 1.8 Rebuild the zip and compare the listing

```bash
node tools/build-zip.js
unzip -l dist/humanizer-pro.zip | awk 'NR>3 && NF>=4 {print $4}' | sort > rebuilt.txt
awk 'NR>3 && NF>=4 {print $4}' docs/evidence/phase10-zip-listing.txt | sort > recorded.txt
diff recorded.txt rebuilt.txt
```

PowerShell, without an `unzip` binary (also run, 26 entries): `Add-Type
-AssemblyName System.IO.Compression.FileSystem` then
`[IO.Compression.ZipFile]::OpenRead((Resolve-Path
dist/humanizer-pro.zip).Path).Entries | ForEach-Object { $_.FullName } |
Sort-Object`.

Run, with the rebuild copied to a scratch directory and
`git checkout -- dist/humanizer-pro.zip` afterwards so the committed artifact
stayed untouched. Entry names are identical across the recorded listing, the
committed zip and a fresh rebuild. Exactly one entry length differs:
`humanizer-pro/scripts/lib/ar-detector/lexicons.js` is 26064 bytes committed
and 26195 rebuilt, because `da36da5` added hedge variants to that file after
the zip was last built in `f1cf8b8`. The committed zip is stale by that one
change; see section 6.

## 2. Decision register

Every non-obvious decision with a pointer to where it is justified; line numbers are from the files as committed at `1f025cd`.

| # | Decision | Where it is justified |
|---|---|---|
| 1 | Docs are authored as fragments under `docs/{provenance,dedup-log,native-review,discrepancies}/` and concatenated into the canonical top-level files by `tools/merge-docs.js`. The top-level files stay the reviewable artifact. `DISCREPANCIES.md` is hand-maintained with fragments appended once, not fully regenerated. | `docs/ARCHITECTURE.md` "Layout deviations", item 1 |
| 2 | CommonJS everywhere, zero runtime dependencies, Node >=18, `path` for all filesystem paths. | `docs/ARCHITECTURE.md` "Module system"; `package.json` (`engines.node`, no deps) |
| 3 | The English detector is upstream's `detector/patterns.js` relocated essentially verbatim, with a `Modified by humanizer-pro` header rather than a rewrite, so upstream fixes stay diffable. | `skills/humanizer-pro/scripts/lib/en-detector/index.js:1-30` (header, note at line 27); parity proof in `tests/en-detector.parity.test.js` |
| 4 | `scripts/validate.js` wraps two layers: `lib/en-validate.js` (upstream validator, unedited) plus `lib/validate-extra.js` (humanizer-pro original) for SEO spans and Arabic-aware heading/number comparison. | `skills/humanizer-pro/scripts/README.md:350-362`; `docs/ARCHITECTURE.md` "Layout deviations", item 2 |
| 5 | Severity is unified on a single three-tier P0/P1/P2 scale. There is no fourth judgment-only tier; blader's "weak alone" becomes a corroboration note inside P2; semitic's minor/significant/critical maps onto the same three tiers. | `skills/humanizer-pro/references/precedence.md:189-205` ("Severity mapping"), rows C-09 and C-14 at lines 111 and 116 |
| 6 | Em dashes: removed by default in English, but a user voice sample that uses them overrides and sets the rate; the list-item carve-out and code/path/URL spans are exempt; a dash is never scored as authorship evidence (upstream weight 0). | `references/precedence.md:103` (C-01) and worked examples EN-1/EN-2 at lines 120-135; upstream split documented in `docs/DISCREPANCIES.md` section (d) |
| 7 | Rhetorical questions are treated oppositely by language: an AI stall to be earned in English, a required rhetorical device in Arabic whose absence is the tell. The two rules are kept mutually exclusive and language-scoped rather than merged into shared core. | `docs/CONFLICTS.md` C-02; `references/precedence.md` C-02 row and level-5 scoping |
| 8 | Register-mix promotion (an MSA-routed document re-scored as a dialect) is gated in two layers, and failing either leaves the MSA verdict untouched: gate 1 requires lexical dialect intent (`dialectEvidence[variety].distinct >= 2`, or `distinct >= 1 AND hits >= 3`); gate 2 requires the dialect score to beat MSA and clear `THRESHOLDS.AI`, AND `scoreWithoutLeakage` to independently clear `THRESHOLDS.MIXED`. | `skills/humanizer-pro/scripts/README.md:55-95`, including the documented regression it fixes; `tests/detect-autoroute.test.js` |
| 9 | Quoted-speech masking: `identify()` masks quoted spans (guillemets, straight and curly double quotes) before counting dialect markers, so a quoted speaker never routes the whole document. Bare colon-led dialogue is deliberately not masked. | `skills/humanizer-pro/scripts/README.md:110-126`; `tests/fixtures/false-positives/ar-quoted-speech.md` |
| 10 | Arabic engine weights P0=14, P1=6, P2=2, with per-pattern diminishing returns and no length normalization, chosen so no single signal can reach the AI threshold (one P0 hit scores 14, still `HUMAN`). | `skills/humanizer-pro/scripts/README.md:192-214` |
| 11 | Arabic labels: `HUMAN` below 25, `MIXED` 25 to 54, `AI` at 55 and above, exported as `THRESHOLDS = { MIXED: 25, AI: 55, TOO_SHORT_WORDS: 20, TOO_SHORT_CAP: 24 }`. | `skills/humanizer-pro/scripts/README.md:177-190` |
| 12 | MSA-leakage gate (dialect varieties only): requires at least 4 total function-word hits, then fires P1 at ratio >= 0.5 and P0 at ratio >= 0.75, where ratio is `msaHits / (msaHits + dialectHits)`. | `skills/humanizer-pro/scripts/README.md:235, 240-247` |
| 13 | Short-text cap: under 20 words the score is capped at 24, so a short text can never be labelled `MIXED` or `AI`; issues are still reported, only the score is capped. | `skills/humanizer-pro/scripts/README.md:190, 288-293` |
| 14 | Dialect identification defaults to `msa` unless at least 2 distinct dialect markers are present at a density of at least 1 per 100 words, matched against normalized text. | `docs/ARCHITECTURE.md` "Language routing"; `skills/humanizer-pro/scripts/lib/lang.js` |
| 15 | semitic's 50-point, 5-dimension quality rubric is dropped entirely rather than mapped onto the severity scale; the detector score and HUMAN/MIXED/AI label stay as an optional reporting layer. | `references/precedence.md:216` and C-14 row at line 116; `docs/DEDUP-LOG.md:149-161` |
| 16 | Every uncited upstream statistic (BLEU claims, percentage thresholds, word-count bands, demographic counts) is dropped from the reference prose; the pattern shape is kept, the number is not. | `docs/DEDUP-LOG.md:85-148` (Egyptian/Levantine) and `:322-390` (shared/MSA), each drop quoted with its upstream line |
| 17 | `AR-EGT-026` is `origin: humanizer-pro`: Egyptian has no upstream MSA-leakage umbrella pattern the way Levantine's SM-SHM-001 is one, so this entry aggregates cross-references already carried by nine Egyptian patterns and anchors on the source's unnumbered Stage-3 checklist and Quick Reference table. | `docs/PROVENANCE.md`, Egyptian table, `AR-EGT-026` row (cites `egt:659-667, egt:841-868`) |
| 18 | C-08 was resolved differently from the CONFLICTS.md proposal. The proposal was to import the avoid-ai-writing carve-out into the MSA list rule while keeping MSA's >15% / >5-item thresholds. The final rule treats structurally list-like content (steps, parameters, feature comparisons, spec tables) as protected content at precedence level 1, never converted to prose in any language, with the MSA thresholds firing only on the residue. | `references/precedence.md:110` (final) against `docs/CONFLICTS.md` C-08 (proposal) |
| 19 | C-09 and C-14 were also resolved differently from their proposals. The proposals kept a judgment-only tier with blader's "weak alone" as an orthogonal modifier flag. The final scale collapses to exactly three tiers with no judgment-only tier, and "weak alone" becomes prose inside the P2 definition. | `references/precedence.md:111, 116, 189-205` against `docs/CONFLICTS.md` C-09 and C-14 |
| 20 | `rewrite` mode always emits an `Issues found` section, and the second-pass audit is always visible. Both differ from upstream, which makes `Issues found` conditional on an explicit audit request and the corrective second pass conditional on finding another in-scope edit. The two-pass editing ceiling itself is preserved. | `docs/DISCREPANCIES.md`, fragment `docs/discrepancies/modes-voice-seo.md`, "Contract changes vs upstream, and why" |
| 21 | Arabic punctuation and digit-convention handling is authored fresh rather than inherited: no upstream file addresses Arabic punctuation glyphs or Arabic-Indic digits at all, so there was no level-5 rule to defer to. | `docs/CONFLICTS.md` C-03 and `docs/DISCREPANCIES.md` section (e); `references/ar-shared.md` "Typography and numbers" |
| 22 | SEO mode is entirely `origin: humanizer-pro` apart from the protected-span classes reused from the upstream validator (headings, links/URLs, tables, frontmatter). | `docs/DISCREPANCIES.md`, modes/voice/seo fragment, "SEO mode origin"; `docs/provenance/modes-voice-seo.md` |
| 23 | Voice-profile names needed no mapping: upstream's five profiles are already casual / professional / technical / warm / blunt. Recorded so the check is visible rather than assumed. | `docs/DISCREPANCIES.md`, modes/voice/seo fragment, "Profile-name mapping" |
| 24 | `tools/run-tests.js` exists because `node --test <dir>` behaves differently across Node 18, 20 and current releases; the tool enumerates `tests/*.test.js` explicitly and passes the resolved file list to `spawnSync`. | `docs/ARCHITECTURE.md` "Layout deviations", item 3 |
| 25 | `tools/check-upstream.js` does more than diff SHAs: when a remote HEAD has moved it also greps the provenance fragments and lists what needs re-verifying. | `docs/ARCHITECTURE.md` "Layout deviations", item 4 |
| 26 | The zip is built by enumerating files in Node and adding each one with an explicit forward-slash entry name through `ZipFileExtensions::CreateEntryFromFile`, because both `Compress-Archive` and `ZipFile::CreateFromDirectory` under Windows PowerShell 5.1 write backslash entry names that break extraction on Linux and macOS. | `tools/build-zip.js:60-74` (comment) and `buildWithPowerShell()` |
| 27 | Commit `0cc89d1` ("phase-6a: normalize line endings to LF") accidentally swept in `en-patterns.md`, `en-vocabulary.md` and the `ar-*.md` drafts through a broad `git add -A`. This was recorded rather than hidden, and history was not rewritten. | `docs/PROGRESS.md`, "Completed steps", the Phase 4 row |
| 28 | `BL-025` and `AW-077` were merged as `EN-012` even though the draft dedup map listed both as having no partner; the two upstream texts share the same before-example and carve-out, and AW's own text names blader P30 as its source. | `docs/DISCREPANCIES.md`, EN fragment, item 1; `docs/dedup-log/en.md` |
| 29 | `AW-042` stays under `EN-004` (staged run-up) rather than moving to `EN-006`, to avoid duplicating a trigger phrase that `EN-006` already carries; the shared detector `type` is an implementation artifact, not an editorial judgment. | `docs/DISCREPANCIES.md`, EN fragment, item 2 |
| 30 | "key" (adjective) is placed at Tier 3 (density-flagged only), because avoid-ai-writing recommends "key" as the replacement for other flagged words while blader flags it; only saturation-level overuse is flagged. | `docs/DISCREPANCIES.md`, EN fragment, item 3 |
| 31 | Hebrew (`humanizer-he`, a fourth skill in the semitic package) is out of scope by instruction and is not implemented. | `docs/BUILD-PROMPT.md` section 0 table; `docs/DISCREPANCIES.md` section (c), item 2 |

## 3. Known weak spots, ranked by risk

Highest risk first, with why it is a risk and how to probe it.

**3.1 All 30 Arabic fixtures are self-written.** The human side of the Arabic
detector's calibration is 15 `human-*.md` files (5 per variety) plus 5 Arabic
false-positive fixtures, all written by the builder to look human rather than
sampled from native writing, so a shared blind spot is invisible to the test
suite (`skills/humanizer-pro/scripts/README.md:334-337`).
Probe: run `detect.js` on real published Arabic; anything at or above 25 is a false positive.

**3.2 Levantine is entirely unreviewed by a native speaker.** `ar-levantine.md`
carries `status: experimental` on line 2 and 25 `NATIVE-REVIEW: shami` markers,
and no Levantine reviewer exists for this project. It also fuses three regional
sub-variants (Syrian, Lebanese, Palestinian) that upstream treats as
grammatically distinct.
Probe: read `docs/NATIVE-REVIEW.md` "## Levantine" (25 items) with a Levantine
speaker, starting with `AR-SHM-005` negation morphology.

**3.3 Dialect identification is unreliable on short texts, and wrong-dialect
text is not detected at all.** `lib/lang.js` needs 2 distinct markers at 1 per
100 words before leaving the `msa` default, so a short Egyptian or Levantine
paragraph routes to MSA and loses the leakage signal; and forcing the wrong
dialect scores `HUMAN`, because the two dialects share most leakage-side
vocabulary (`skills/humanizer-pro/scripts/README.md:300-333`).
Probe: in the section 1.5 loop, `tests/fixtures/ar-shami/human-02.md`,
`human-03.md` and `human-04.md` all auto-route to `egt`.

**3.4 The Levantine leakage signal can improve without moving the headline
score.** In `shami-edit-01` the edit removed a textbook MSA-reversion
paragraph, `stats.msaLeakage.ratio` fell from 0.3 to 0.1, and the score stayed
at 14, because the P1 leakage gate needs ratio >= 0.5; the similar
`shami-seo-01` did move (20 to 14). Edit mode reports a before/after score as
its verification signal, so that signal is unreliable in exactly the "one bad
paragraph in an otherwise-good post" case.
Probe: `evals/runs/iteration-1/SUMMARY-egt-shami.md`, "Skill defects found",
defect 1.

**3.5 The Arabic weights and thresholds were tuned on 15 AI and 20 human
fixtures, with no corpus calibration.** `scripts/README.md:338-343` says so:
the numbers are chosen so no single signal can cross the threshold, not fitted
to data, and 35 documents cannot establish a false-positive rate.
Probe: perturb `WEIGHTS` or `THRESHOLDS` and count how few fixtures flip.

**3.6 Every Arabic human fixture scores exactly 0.** Not one lands between 1
and 24. That clean a separation suggests the score is carried by lexicon hits
human-style text simply never contains rather than by a graded stylometric
signal, and gives no evidence about where the real boundary sits.
Probe: insert one `AR-SH-001` hedge phrase into any `human-*.md` fixture and
watch the score jump past the interesting middle range.

**3.7 The register-mix note has to guess between `egt` and `shami` when there
is no lexical evidence.** With a P0/P1 MSA issue but zero dialect vocabulary,
both dialect engines score nearly the same, so there is no principled way to
prefer one (`skills/humanizer-pro/scripts/README.md:55-58`). The two gates keep
this out of the verdict, but the advisory note still names a dialect.
Probe: run `detect.js` on pure-MSA AI text and read `stats.registerMix.note`.

**3.8 The English engine is upstream's, unchanged, so its known limitations
carry over:** the em-dash weight-0 contradiction against its own prose rule,
the unverified "5-20x more common in AI text" premise behind Tier 1A, and
upstream's unresolved rewrite-preservation eval failure. See
`docs/DISCREPANCIES.md` sections (a) and (d) and "Additional items".
Probe: `tests/en-detector.parity.test.js` proves identity with upstream, which
is exactly the point.

**3.9 Node 18 was never actually executed.** `package.json` claims
`engines.node: ">=18"` and `tools/run-tests.js` exists to keep `npm test`
version-stable, but every run in `docs/evidence/` is Node v25.2.1 on Windows.
Probe: install Node 18 and run `npm test`.

**3.10 The `metadata` frontmatter block in `SKILL.md` was never validated
against a real skill loader.** `tools/check-skill.js` is this project's own
checker: it confirms the file parses as YAML with `name` and `description`
within limits, not that a host accepts the `metadata` shape.
Probe: load `dist/humanizer-pro.zip` into Claude apps, or drop
`skills/humanizer-pro/` into `.claude/skills/` and `.agents/skills/`.

**3.11 Eval grading was done by the builder's own agents.** The grades in
`evals/runs/iteration-1/*/grade.md` and the two SUMMARY files come from the
same system that produced the outputs, and every Arabic eval carries a
NEEDS-NATIVE-REVIEW flag on the "reads naturally" row.
Probe: re-run a few evals independently per section 1.7 and compare.

## 4. Provenance sampling index

Flat index of every pattern ID, so a reviewer can pick random rows and open the
exact spot under `_sources/`. Extracted mechanically from `docs/PROVENANCE.md`
with a throwaway Node script (not saved to the repo), then cross-checked
against the reference files. Counts: 55 EN + 7 AR-SH + 28 AR-MSA + 26 AR-EGT + 25 AR-SHM = 141 expected.
**Actual count: 141 rows.** Cross-check of headings against this table, run in
the same session:

```
headings found: 141   table rows: 141
in refs but not in table: none / in table but not a heading in refs: none
ids appearing as a heading more than once: none
by family: {"AR-EGT":26,"AR-SHM":25,"AR-MSA":28,"AR-SH":7,"EN":55}
```

No mismatches, so no rows were added or removed and no reference file was
edited. Heading levels differ by file (`## EN-`, `## AR-SH-`, `## AR-MSA-`,
`### AR-EGT-`, `### AR-SHM-`), so the check matched `##` through `####`. The
engine-internal pseudo-id `AR-SH-TYPO` is a lexicon label, not a numbered
pattern, and is correctly absent from both sides.

SHA legend (full values in `UPSTREAM.md`):
- `blader@9862685` = blader/humanizer `9862685f575c65a8247f90369951df1b3416e3d6`
- `aw@7a2c7d1` = conorbronsdon/avoid-ai-writing `7a2c7d11d4a74d90c6be41fbed8402d972543798`
- `sem@2c9d4fb` = OthmanAdi/humanizer-semitic `2c9d4fbe3e0086d373b59bfebc9556082275cf62`

Long source notes are truncated with `...`; full text in `docs/PROVENANCE.md`.
Line ranges paste straight into `sed -n 'a,bp' <file>`. Five rows were
spot-checks were run this way (EN-001 against both English upstreams,
AR-MSA-001, AR-EGT-003, AR-SHM-004); the opened source text is in
`docs/evidence/phase11-acceptance.txt` and matched in every case.

| Pattern ID | Upstream id / origin | Upstream file:line | SHA |
|---|---|---|---|
| AR-EGT-001 | SM-EGT-001 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:72-105 | sem@2c9d4fb |
| AR-EGT-002 | SM-EGT-002 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:108-119 | sem@2c9d4fb |
| AR-EGT-003 | SM-EGT-003 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:122-138 | sem@2c9d4fb |
| AR-EGT-004 | SM-EGT-004 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:141-157 | sem@2c9d4fb |
| AR-EGT-005 | SM-EGT-005 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:160-176 | sem@2c9d4fb |
| AR-EGT-006 | SM-EGT-006 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:185-196 | sem@2c9d4fb |
| AR-EGT-007 | SM-EGT-007 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:199-219 | sem@2c9d4fb |
| AR-EGT-008 | SM-EGT-008 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:222-236 | sem@2c9d4fb |
| AR-EGT-009 | SM-EGT-009 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:239-257 | sem@2c9d4fb |
| AR-EGT-010 | SM-EGT-010 (deferred to ar-shared.md: uniform sentence rhythm; dialect fix/example retained) | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:260-271 | sem@2c9d4fb |
| AR-EGT-011 | SM-EGT-011 (deferred to ar-shared.md: formulaic transitions; dialect fix set retained) | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:280-304 | sem@2c9d4fb |
| AR-EGT-012 | SM-EGT-012 (deferred to ar-shared.md: formulaic transitions; dialect fix set retained) | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:307-328 | sem@2c9d4fb |
| AR-EGT-013 | SM-EGT-013 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:331-342 | sem@2c9d4fb |
| AR-EGT-014 | SM-EGT-014 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:345-359 | sem@2c9d4fb |
| AR-EGT-015 | SM-EGT-015 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:362-378 | sem@2c9d4fb |
| AR-EGT-016 | SM-EGT-016 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:387-404 | sem@2c9d4fb |
| AR-EGT-017 | SM-EGT-017 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:407-425 | sem@2c9d4fb |
| AR-EGT-018 | SM-EGT-018 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:428-444 | sem@2c9d4fb |
| AR-EGT-019 | SM-EGT-019 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:447-466 | sem@2c9d4fb |
| AR-EGT-020 | SM-EGT-020 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:469-480 | sem@2c9d4fb |
| AR-EGT-021 | SM-EGT-021 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:489-509 | sem@2c9d4fb |
| AR-EGT-022 | SM-EGT-022 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:512-532 | sem@2c9d4fb |
| AR-EGT-023 | SM-EGT-023 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:535-544 | sem@2c9d4fb |
| AR-EGT-024 | SM-EGT-024 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:547-567 | sem@2c9d4fb |
| AR-EGT-025 | SM-EGT-025 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:570-581 | sem@2c9d4fb |
| AR-EGT-026 | origin: humanizer-pro (rationale in docs/PROVENANCE.md) | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:659-667, 841-868 | sem@2c9d4fb |
| AR-SHM-001 | SM-SHM-001 (also serves as the dedicated MSA-leakage umbrella section - the source itself frames... | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:116-140, 1041-1048, 1236-1242 | sem@2c9d4fb |
| AR-SHM-002 | SM-SHM-002 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:143-172 | sem@2c9d4fb |
| AR-SHM-003 | SM-SHM-003 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:174-197 | sem@2c9d4fb |
| AR-SHM-004 | SM-SHM-004 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:199-218 | sem@2c9d4fb |
| AR-SHM-005 | SM-SHM-005 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:220-255 | sem@2c9d4fb |
| AR-SHM-006 | SM-SHM-006 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:265-304 | sem@2c9d4fb |
| AR-SHM-007 | SM-SHM-007 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:307-343 | sem@2c9d4fb |
| AR-SHM-008 | SM-SHM-008 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:345-374 | sem@2c9d4fb |
| AR-SHM-009 | SM-SHM-009 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:377-401 | sem@2c9d4fb |
| AR-SHM-010 | SM-SHM-010 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:403-439 | sem@2c9d4fb |
| AR-SHM-011 | SM-SHM-011 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:448-483 | sem@2c9d4fb |
| AR-SHM-012 | SM-SHM-012 (deferred to ar-shared.md: formulaic transitions; regional table retained) | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:486-515 | sem@2c9d4fb |
| AR-SHM-013 | SM-SHM-013 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:518-542 | sem@2c9d4fb |
| AR-SHM-014 | SM-SHM-014 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:545-571 | sem@2c9d4fb |
| AR-SHM-015 | SM-SHM-015 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:574-602 | sem@2c9d4fb |
| AR-SHM-016 | SM-SHM-016 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:612-652 | sem@2c9d4fb |
| AR-SHM-017 | SM-SHM-017 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:655-691 | sem@2c9d4fb |
| AR-SHM-018 | SM-SHM-018 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:693-715 | sem@2c9d4fb |
| AR-SHM-019 | SM-SHM-019 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:718-748 | sem@2c9d4fb |
| AR-SHM-020 | SM-SHM-020 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:751-779 | sem@2c9d4fb |
| AR-SHM-021 | SM-SHM-021 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:789-827 | sem@2c9d4fb |
| AR-SHM-022 | SM-SHM-022 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:830-864 | sem@2c9d4fb |
| AR-SHM-023 | SM-SHM-023 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:867-902 | sem@2c9d4fb |
| AR-SHM-024 | SM-SHM-024 (deferred to ar-shared.md: uniform sentence rhythm; paratactic-chain nuance retained) | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:905-936 | sem@2c9d4fb |
| AR-SHM-025 | SM-SHM-025 | _sources/semitic/skills/humanizer-ar-shami/SKILL.md:939-976 | sem@2c9d4fb |
| AR-SH-001 | SM-MSA-001, SM-MSA-008 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:44-55,148-159 | sem@2c9d4fb |
| AR-SH-002 | SM-MSA-003, SM-MSA-004, SM-MSA-005 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:72-111,490,626 | sem@2c9d4fb |
| AR-SH-003 | SM-MSA-005, SM-MSA-019 (dead-metaphor examples) | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:100-111,324-335 | sem@2c9d4fb |
| AR-SH-004 | SM-MSA-013 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:224-235,492 | sem@2c9d4fb |
| AR-SH-005 | SM-MSA-015 (single-source - see dedup log for the generalization decision) | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:255-272 | sem@2c9d4fb |
| AR-SH-006 | SM-EGT-011, SM-EGT-015 | _sources/semitic/skills/humanizer-ar-egt/SKILL.md:280-304,362-378 | sem@2c9d4fb |
| AR-SH-007 | SM-MSA-026 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:431-442 | sem@2c9d4fb |
| AR-MSA-001 | SM-MSA-001 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:44-55 | sem@2c9d4fb |
| AR-MSA-002 | SM-MSA-002 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:58-69 | sem@2c9d4fb |
| AR-MSA-003 | SM-MSA-003 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:72-83,490,626 | sem@2c9d4fb |
| AR-MSA-004 | SM-MSA-004 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:86-97 | sem@2c9d4fb |
| AR-MSA-005 | SM-MSA-005 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:100-111 | sem@2c9d4fb |
| AR-MSA-006 | SM-MSA-006 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:114-125,491 | sem@2c9d4fb |
| AR-MSA-007 | SM-MSA-007 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:134-145 | sem@2c9d4fb |
| AR-MSA-008 | SM-MSA-008 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:148-159 | sem@2c9d4fb |
| AR-MSA-009 | SM-MSA-009 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:162-173 | sem@2c9d4fb |
| AR-MSA-010 | SM-MSA-010 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:176-187 | sem@2c9d4fb |
| AR-MSA-011 | SM-MSA-011 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:190-201 | sem@2c9d4fb |
| AR-MSA-012 | SM-MSA-012 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:210-221 | sem@2c9d4fb |
| AR-MSA-013 | SM-MSA-013 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:224-235,492 | sem@2c9d4fb |
| AR-MSA-014 | SM-MSA-014 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:238-252 | sem@2c9d4fb |
| AR-MSA-015 | SM-MSA-015 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:255-272 | sem@2c9d4fb |
| AR-MSA-016 | SM-MSA-016 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:275-286 | sem@2c9d4fb |
| AR-MSA-017 | SM-MSA-017 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:289-300 | sem@2c9d4fb |
| AR-MSA-018 | SM-MSA-018 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:309-321 | sem@2c9d4fb |
| AR-MSA-019 | SM-MSA-019 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:324-335 | sem@2c9d4fb |
| AR-MSA-020 | SM-MSA-020 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:338-349 | sem@2c9d4fb |
| AR-MSA-021 | SM-MSA-021 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:352-363 | sem@2c9d4fb |
| AR-MSA-022 | SM-MSA-022 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:366-377 | sem@2c9d4fb |
| AR-MSA-023 | SM-MSA-023 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:386-400 | sem@2c9d4fb |
| AR-MSA-024 | SM-MSA-024 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:403-414 | sem@2c9d4fb |
| AR-MSA-025 | SM-MSA-025 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:417-428 | sem@2c9d4fb |
| AR-MSA-026 | SM-MSA-026 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:431-442 | sem@2c9d4fb |
| AR-MSA-027 | SM-MSA-027 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:445-457 | sem@2c9d4fb |
| AR-MSA-028 | SM-MSA-028 | _sources/semitic/skills/humanizer-ar-msa/SKILL.md:460-471 | sem@2c9d4fb |
| EN-001 | BL-001; AW-007, AW-063, AW-073, AW-083 | _sources/blader/SKILL.md:58-74; _sources/avoid-ai-writing/references/patterns.md:18, 443-445, 498-502, 553-555 | blader@9862685 + aw@7a2c7d1 |
| EN-002 | BL-002; AW-035, AW-079, AW-085 | _sources/blader/SKILL.md:75-95; _sources/avoid-ai-writing/references/patterns.md:315-316, 534-538, 561-571 | blader@9862685 + aw@7a2c7d1 |
| EN-003 | BL-003; AW-021, AW-078 | _sources/blader/SKILL.md:96-107; _sources/avoid-ai-writing/references/patterns.md:243-247, 529-532 | blader@9862685 + aw@7a2c7d1 |
| EN-004 | BL-004; AW-018, AW-037, AW-042 | _sources/blader/SKILL.md:109-121; _sources/avoid-ai-writing/references/patterns.md:236, 322-323, 342-343 | blader@9862685 + aw@7a2c7d1 |
| EN-005 | BL-005; AW-062, AW-069 | _sources/blader/SKILL.md:122-133; _sources/avoid-ai-writing/references/patterns.md:440-441, 464-472 | blader@9862685 + aw@7a2c7d1 |
| EN-006 | BL-013; AW-020, AW-022, AW-055, AW-061, AW-072 | _sources/blader/SKILL.md:207-222; _sources/avoid-ai-writing/references/patterns.md:239-241, 249-252, 391-396, 434-438, 490-496 | blader@9862685 + aw@7a2c7d1 |
| EN-007 | BL-014 | _sources/blader/SKILL.md:224-231 | blader@9862685 |
| EN-008 | BL-015; AW-040 | _sources/blader/SKILL.md:233-240; _sources/avoid-ai-writing/references/patterns.md:335-337 | blader@9862685 + aw@7a2c7d1 |
| EN-009 | BL-016; AW-041, AW-057 | _sources/blader/SKILL.md:242-249; _sources/avoid-ai-writing/references/patterns.md:339-340, 403-407 | blader@9862685 + aw@7a2c7d1 |
| EN-010 | BL-017; AW-033, AW-038, AW-039 | _sources/blader/SKILL.md:251-262; _sources/avoid-ai-writing/references/patterns.md:305-306, 325-333 | blader@9862685 + aw@7a2c7d1 |
| EN-011 | BL-023; AW-050, AW-051 | _sources/blader/SKILL.md:325-336; _sources/avoid-ai-writing/references/patterns.md:372-376 | blader@9862685 + aw@7a2c7d1 |
| EN-012 | BL-025; AW-077 | _sources/blader/SKILL.md:352-359; _sources/avoid-ai-writing/references/patterns.md:524-527 | blader@9862685 + aw@7a2c7d1 |
| EN-013 | AW-024 | _sources/avoid-ai-writing/references/patterns.md:258-262 | aw@7a2c7d1 |
| EN-014 | AW-025 | _sources/avoid-ai-writing/references/patterns.md:264-268 | aw@7a2c7d1 |
| EN-015 | AW-026 | _sources/avoid-ai-writing/references/patterns.md:270-273 | aw@7a2c7d1 |
| EN-016 | AW-031 | _sources/avoid-ai-writing/references/patterns.md:296-299 | aw@7a2c7d1 |
| EN-017 | AW-043 | _sources/avoid-ai-writing/references/patterns.md:345-348 | aw@7a2c7d1 |
| EN-018 | AW-044 | _sources/avoid-ai-writing/references/patterns.md:350-351 | aw@7a2c7d1 |
| EN-019 | AW-080 | _sources/avoid-ai-writing/references/patterns.md:540-543 | aw@7a2c7d1 |
| EN-020 | BL-006; AW-012, AW-084 | _sources/blader/SKILL.md:139-149; _sources/avoid-ai-writing/references/patterns.md:23, 557-559 | blader@9862685 + aw@7a2c7d1 |
| EN-021 | BL-007; AW-082 | _sources/blader/SKILL.md:151-157; _sources/avoid-ai-writing/references/patterns.md:549-551 | blader@9862685 + aw@7a2c7d1 |
| EN-022 | BL-008; AW-001 | _sources/blader/SKILL.md:159-166; _sources/avoid-ai-writing/references/patterns.md:10 | blader@9862685 + aw@7a2c7d1 |
| EN-023 | BL-009; AW-010, AW-023, AW-065, AW-071 | _sources/blader/SKILL.md:168-175; _sources/avoid-ai-writing/references/patterns.md:21, 254-256, 450-451, 482-488 | blader@9862685 + aw@7a2c7d1 |
| EN-024 | BL-010; AW-048, AW-049 | _sources/blader/SKILL.md:177-184; _sources/avoid-ai-writing/references/patterns.md:362-370 | blader@9862685 + aw@7a2c7d1 |
| EN-025 | BL-011; AW-030 | _sources/blader/SKILL.md:186-192; _sources/avoid-ai-writing/references/patterns.md:291-294 | blader@9862685 + aw@7a2c7d1 |
| EN-026 | BL-018; AW-029 | _sources/blader/SKILL.md:264-271; _sources/avoid-ai-writing/references/patterns.md:287-289 | blader@9862685 + aw@7a2c7d1 |
| EN-027 | BL-021; AW-005, AW-006 | _sources/blader/SKILL.md:304-310; _sources/avoid-ai-writing/references/patterns.md:14-15 | blader@9862685 + aw@7a2c7d1 |
| EN-028 | AW-008, AW-009 | _sources/avoid-ai-writing/references/patterns.md:19-20 | aw@7a2c7d1 |
| EN-029 | AW-015 | _sources/avoid-ai-writing/references/patterns.md:215-222 | aw@7a2c7d1 |
| EN-030 | AW-016 | _sources/avoid-ai-writing/references/patterns.md:224-232 | aw@7a2c7d1 |
| EN-031 | AW-032 | _sources/avoid-ai-writing/references/patterns.md:301-303 | aw@7a2c7d1 |
| EN-032 | AW-034 | _sources/avoid-ai-writing/references/patterns.md:308-313 | aw@7a2c7d1 |
| EN-033 | BL-019; AW-002 | _sources/blader/SKILL.md:277-289; _sources/avoid-ai-writing/references/patterns.md:11 | blader@9862685 + aw@7a2c7d1 |
| EN-034 | BL-020; AW-003, AW-047 | _sources/blader/SKILL.md:291-302; _sources/avoid-ai-writing/references/patterns.md:12, 359-360 | blader@9862685 + aw@7a2c7d1 |
| EN-035 | BL-024 | _sources/blader/SKILL.md:338-350 | blader@9862685 |
| EN-036 | AW-004, AW-076 | _sources/avoid-ai-writing/references/patterns.md:13, 518-522 | aw@7a2c7d1 |
| EN-037 | AW-011 | _sources/avoid-ai-writing/references/patterns.md:22 | aw@7a2c7d1 |
| EN-038 | AW-028 | _sources/avoid-ai-writing/references/patterns.md:281-285 | aw@7a2c7d1 |
| EN-039 | AW-045, AW-046 | _sources/avoid-ai-writing/references/patterns.md:353-357 | aw@7a2c7d1 |
| EN-040 | AW-066 | _sources/avoid-ai-writing/references/patterns.md:453-454 | aw@7a2c7d1 |
| EN-041 | BL-022; AW-036, AW-068, AW-070 | _sources/blader/SKILL.md:316-323; _sources/avoid-ai-writing/references/patterns.md:318-320, 460-462, 474-480 | blader@9862685 + aw@7a2c7d1 |
| EN-042 | AW-075 | _sources/avoid-ai-writing/references/patterns.md:511-516 | aw@7a2c7d1 |
| EN-043 | AW-064, AW-081 | _sources/avoid-ai-writing/references/patterns.md:447-448, 545-547 | aw@7a2c7d1 |
| EN-044 | AW-060 | _sources/avoid-ai-writing/references/patterns.md:427-432 | aw@7a2c7d1 |
| EN-045 | AW-067 | _sources/avoid-ai-writing/references/patterns.md:456-458 | aw@7a2c7d1 |
| EN-046 | AW-086, AW-017, AW-019 | _sources/avoid-ai-writing/references/patterns.md:235, 237, 573-584 | aw@7a2c7d1 |
| EN-047 | AW-087 | _sources/avoid-ai-writing/references/patterns.md:586-592 | aw@7a2c7d1 |
| EN-048 | AW-088 | _sources/avoid-ai-writing/references/patterns.md:594-596 | aw@7a2c7d1 |
| EN-049 | AW-089 | _sources/avoid-ai-writing/references/patterns.md:598-600 | aw@7a2c7d1 |
| EN-050 | AW-053, AW-054 | _sources/avoid-ai-writing/references/patterns.md:382-389 | aw@7a2c7d1 |
| EN-051 | AW-052 | _sources/avoid-ai-writing/references/patterns.md:378-380 | aw@7a2c7d1 |
| EN-052 | AW-027 | _sources/avoid-ai-writing/references/patterns.md:275-279 | aw@7a2c7d1 |
| EN-053 | AW-058, AW-056 | _sources/avoid-ai-writing/references/patterns.md:398-401, 409-419 | aw@7a2c7d1 |
| EN-054 | AW-074 | _sources/avoid-ai-writing/references/patterns.md:504-509 | aw@7a2c7d1 |
| EN-055 | AW-059 | _sources/avoid-ai-writing/references/patterns.md:421-425 | aw@7a2c7d1 |

## 5. Upstream vs prompt discrepancies

Full detail in `docs/DISCREPANCIES.md` (428 lines); one line per item here.

**(a) avoid-ai-writing**
1. Modes, tiers, voice profiles, detector and validator all exist as described.
2. There is no "two-pass audit" in the source; it is a two-pass editing budget, and audits are explicitly free.
3. The detector is not one 0-100 score; it also returns a GPTZero-shaped trinary classifier with class probabilities.
4. The vocabulary tiers are not four flat tiers: Tier 1B is explicitly not evidence of machine authorship and carries a lower weight.
5. Tier 1A's own "5-20x more common in AI text" premise is stated by the source to be inherited convention, not a measured statistic.
6. The repo is a seven-skill network, not one skill.

**(b) blader**
1. Voice matching and the 25-pattern catalog exist as described.
2. A shipped stale cross-reference: `SKILL.md:42` says "including section 6" where the dash rule is now section 8.
3. The "core pattern philosophy" is an operationalization of Wikipedia's "Signs of AI writing", not independent research.
4. The voice-sample override is textually unqualified, so read literally it overrides all 25 patterns (carried into C-13).
5. Two claims inside the philosophy section carry no citation.

**(c) semitic**
1. The three Arabic skills exist 1:1 with the expected pattern counts (28 / 25 / 25).
2. A fourth skill, `humanizer-he` (Hebrew), ships in the same package and is out of scope here.
3. The three Arabic skills are not mutually independent; Egyptian and Levantine reuse MSA-tell vocabulary the MSA skill also owns.
4. "Levantine" is three regional sub-variants fused into one file, with different grammar and code-switching rules.
5. Every quantitative claim in the repo (BLEU numbers, percentages, word-count bands) is unsourced.
6. The source carries copy-edit artifacts, for example a "spelling variants" row listing three identical strings.

**(d)** avoid-ai-writing is internally split on em dashes: the prose rule says target zero, the detector scores them at weight 0 deliberately.

**(e)** semitic contains no Arabic punctuation or Arabic-Indic digit rule at all, so there was no upstream typography rule to defer to.

**Additional items**
1. blader's pattern count churned 24 to 35 across versions before being consolidated back to 25.
2. avoid-ai-writing's own rewrite-preservation eval currently reports a FAIL, unmerged pending its issue #322.
3. avoid-ai-writing has four non-reconciling pattern counts on purpose (74 / 122 / 53 / 90), so any count downstream must say which one it means.

**EN catalog fragment**
1. The draft dedup map missed a real merge (BL-025 and AW-077 are the same tell); merged as EN-012.
2. AW-042 shares a detector `type` with AW-018 for implementation reasons, not editorial ones; kept under EN-004 with the reasoning recorded.
3. blader flags "key" as a tell while avoid-ai-writing recommends "key" as a fix word; resolved by placing it at Tier 3.
4. No further severity mismatches beyond what C-09 and C-14 already scope.

**Modes / voice / SEO fragment**
1. No voice-profile renaming was needed; the five names match 1:1 (recorded to show the check happened).
2. `rewrite` always shows `Issues found`, which is a real behaviour change from upstream, flagged for the owner to confirm.
3. The second-pass audit is always visible; the two-pass editing ceiling is unchanged.
4. `voice-matching.md` uses blader's checklist as primary and folds avoid-ai-writing's contraction rate into word choice.
5. SEO mode is original work apart from the protected-span classes reused from the upstream validator.
6. The Arabic digit and punctuation gap is filled from the user's own sample rather than from any upstream rule, and flagged rather than quietly filled.

## 6. What was not done, and why

- **No real Node 18 run:** only Node v25.2.1 was available (`UPSTREAM.md` says
  so), so the `>=18` claim is untested.
- **No native-speaker review of any Arabic content.** 33 reference-file markers
  are queued in `docs/NATIVE-REVIEW.md` (1 MSA, 5 Egyptian, 25 Levantine, 2
  shared) plus eval-output and fixture items. MSA and Egyptian await the
  project owner; no Levantine reviewer exists.
- **Hebrew excluded by design:** `humanizer-he` ships in the same upstream
  package and is deliberately not ported.
- **`.claude-plugin/plugin.json` was not created.** The build prompt lists it
  as optional, and the exact key set a marketplace manifest requires was never
  verified against a spec, so nothing was guessed.
- **Levantine regional sub-variant rules are not implemented in the engine:**
  `ar-levantine.md` documents Syrian / Lebanese / Palestinian differences, but
  the detector has one `shami` lexicon and cannot tell them apart.
- **Wrong-dialect detection does not exist.** Egyptian text forced to `shami`
  (or the reverse) scores `HUMAN` because the two share most leakage-side
  vocabulary (`skills/humanizer-pro/scripts/README.md:329-333`).
- **`dist/humanizer-pro.zip` was not rebuilt after `da36da5`** (section 1.8).
  Rebuilding belongs in the Phase 11 commit step; it was left alone here to
  keep this handoff's diff to three files.
- **No independent review, and no release claim:** eval grading is builder
  self-assessment; nothing here is reviewed, validated or production-ready.
- **The final commit is not tagged:** `v0.1.0-build` is the Phase 11 commit
  step and was deliberately not created here.
- **`STATE.md` was not updated.** It still describes the Phase 6b/README state
  and names `e90dc73` as last verified; it was outside this task's allowed file
  set. Treat `docs/PROGRESS.md` as authoritative.
- **Two iteration-1 eval defects are recorded, not fixed:** the Levantine
  leakage-versus-score inconsistency (weak spot 3.4) and `validate.js`
  auto-detecting the wrong dialect on a mixed-signal document, both written up
  with proposed fixes in `evals/runs/iteration-1/SUMMARY-egt-shami.md`. The MSA
  hedge-variant defect from the other batch was fixed in `da36da5`.

## 7. Acceptance criteria checklist

The 16 boxes from `docs/BUILD-PROMPT.md` section 4; raw output for every command cited here is in `docs/evidence/phase11-acceptance.txt`.

| # | Criterion | Status | Evidence |
|---|---|---|---|
| 1 | `UPSTREAM.md` lists all three repos with exact commit SHAs | MET | `UPSTREAM.md` table; `node tools/check-upstream.js` confirms all three still match remote HEAD |
| 2 | `SKILL.md` <= 500 lines, description <= 1024 chars, valid YAML frontmatter | MET | `node tools/check-skill.js`: 265 lines, 973 characters, frontmatter parsed (keys name, description, license, metadata) |
| 3 | Every pattern has an ID and a provenance entry; no orphan or duplicate patterns | MET | Section 4 cross-check: 141 headings, 141 table rows, no IDs missing in either direction, no duplicate headings |
| 4 | `docs/CONFLICTS.md` resolves every identified conflict with a cited precedence rule | MET, with a caveat | All 14 conflicts C-01 to C-14 have a final resolution and precedence level in `references/precedence.md:103-116`. `CONFLICTS.md` itself holds the phase-2 *proposals* and was not back-edited, and C-08, C-09 and C-14 were resolved differently from their proposals (decision register 18 and 19). Read `precedence.md` as the authority |
| 5 | English detector scores match the upstream engine on its own fixtures | MET | `tests/en-detector.parity.test.js` loads `_sources/avoid-ai-writing/detector/patterns.js` directly and asserts identical score and label; 6 parity tests ran and passed (not skipped) in the recorded `npm test` |
| 6 | Arabic detector returns exact original-string offsets; human fixtures below the threshold, AI fixtures above | MET | `tests/ar-detector.test.js` "every issue offset indexes the ORIGINAL text exactly"; fixture loop in section 1.5: 15 AI fixtures 84 to 100 (`AI`), 15 human fixtures 0 (`HUMAN`), 5 Arabic false-positive fixtures 0 |
| 7 | `validate.js` catches every protected element type in tests | MET | `tests/validate.test.js` inside the 114-test run, plus the section 1.6 loop: 13 protected-element classes each exit 1, the clean pair exits 0 |
| 8 | `npm test` passes on Windows with Node 18+ and zero runtime dependencies | PARTIAL | 114/114 pass on Windows 11 with Node v25.2.1; `package.json` has no dependencies of any kind. Node 18 itself was never executed (section 6) |
| 9 | All evals pass or are listed as needing native-speaker review | MET for iteration-1 as recorded | `evals/runs/iteration-1/SUMMARY-en-msa.md` (8 evals, no failures, 4 NEEDS-NATIVE-REVIEW flags) and `SUMMARY-egt-shami.md` (8 evals, all PASS, 1 detector FLAG, all Arabic output NEEDS-NATIVE-REVIEW). `SELF-ASSESSMENT.md` and `iteration-2/` were written concurrently and not read here |
| 10 | All licenses and credits present; adapted files carry original headers | MET | `skills/humanizer-pro/LICENSES/` holds all three MIT texts; `LICENSE`, `CREDITS.md`; `scripts/lib/en-detector/index.js:27` and `scripts/lib/en-validate.js:34` carry the upstream header plus a `Modified by humanizer-pro` note |
| 11 | Skill still functions as Markdown-only when scripts cannot execute | MET | `SKILL.md` section 9 "When the scripts cannot run", plus inline fallbacks at lines 91 and 197; `check-skill` confirms all 11 reference paths are reachable from the router |
| 12 | Skill loads from both `.agents\skills\` and `.claude\skills\` without modification | NOT VERIFIED IN A HOST | The skill directory is self-contained and path-agnostic, and `README.md:44-47, 86-89` documents both locations, but no load was performed in Codex or Claude Code. Structural compatibility only; see weak spot 3.10 |
| 13 | Every "passes/verified" claim has a matching raw output file in `docs/evidence/` | MET | 13 files in `docs/evidence/`, including `phase11-acceptance.txt` written for this handoff, which carries the full raw output of every command quoted above |
| 14 | Git history has at least one commit per phase; final commit tagged `v0.1.0-build` | PARTIAL | 21 commits with phase-labelled messages covering phases 0 to 10. Phase 5 is folded into `626d4b7` and phase 8 (tests) has no dedicated commit; the tests landed inside `e845dc4`, `74253a7`, `e90dc73` and `9b56566`. The tag is NOT MET: it is the Phase 11 commit step and was deliberately not created here |
| 15 | `docs/NATIVE-REVIEW.md` lists all uncertain Arabic items; `ar-levantine.md` marked experimental | MET | `docs/NATIVE-REVIEW.md` (495 lines) grouped by area and variety; marker counts re-counted this session and matching (1 MSA, 5 Egyptian, 25 Levantine, 2 shared; the 26th grep hit in `ar-levantine.md` is the backticked prose mention on line 14, which `NATIVE-REVIEW.md:16-19` also excludes); `ar-levantine.md` line 2 begins `status: experimental` |
| 16 | `docs/REVIEW-HANDOFF.md` is complete enough to reproduce everything without the build session | MET as far as the builder can judge | This file: reproduce commands with their run status, 31 decisions with pointers, 11 ranked weak spots, a 141-row provenance index with a passing cross-check, a discrepancy summary, and an explicit not-done list. Whether it is sufficient is the reviewer's call |

Summary: 12 met, 3 partial or caveated (4, 8, 14), 1 not verified in a host (12).
The only outright NOT MET item is the `v0.1.0-build` tag, which is the next step
rather than a gap.
