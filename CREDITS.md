# Credits

`humanizer-pro` merges and adapts material from three upstream MIT-licensed
repositories. Full commit-level provenance (which pattern came from which
upstream file/line) is in `docs/PROVENANCE.md`; pin dates and acquisition
method are in `UPSTREAM.md`. The original license text for each project is
kept verbatim in `skills/humanizer-pro/LICENSES/`.

## blader/humanizer

- **Author/copyright**: Copyright (c) 2025 Siqi Chen (verbatim from
  `_sources/blader/LICENSE`)
- **URL**: https://github.com/blader/humanizer
- **Pinned commit**: `9862685f575c65a8247f90369951df1b3416e3d6`
- **Version**: 3.0.0 (from `SKILL.md` metadata.version)
- **License**: MIT — `skills/humanizer-pro/LICENSES/blader-humanizer.MIT.txt`
- **What humanizer-pro takes from it**: pattern philosophy and the overall
  "why AI text reads as AI" framing, the base English pattern catalog and
  voice samples, and the seed structure for the precedence/mode system.
  Concretely: `skills/humanizer-pro/references/core-principles.md`,
  `modes.md`, and `voice-matching.md` derive substantially from this
  repository's SKILL.md content, and a portion of the entries in
  `en-patterns.md` trace back to it (see `docs/provenance/modes-voice-seo.md`
  and `docs/provenance/en.md` for the entry-by-entry mapping).

## conorbronsdon/avoid-ai-writing

- **Author/copyright**: Copyright (c) 2026 Conor Bronsdon (verbatim from
  `_sources/avoid-ai-writing/LICENSE`)
- **URL**: https://github.com/conorbronsdon/avoid-ai-writing
- **Pinned commit**: `7a2c7d11d4a74d90c6be41fbed8402d972543798`
- **Version**: 3.35.0 (from `package.json` version)
- **License**: MIT — `skills/humanizer-pro/LICENSES/avoid-ai-writing.MIT.txt`
- **What humanizer-pro takes from it**: the editing contracts (what a
  rewrite/edit pass is and is not allowed to change), the tiered English
  vocabulary table, and — most directly — the executable detector and
  validator engines. `skills/humanizer-pro/scripts/lib/en-detector/index.js`
  and `skills/humanizer-pro/scripts/lib/en-validate.js` are adapted/kept
  from this repository's detection and preservation-validation code (see the
  file headers and `docs/provenance/en.md` for the line-level mapping). Most
  of `en-patterns.md` and all of `en-vocabulary.md` originate here.

## OthmanAdi/humanizer-semitic

- **Author/copyright**: Copyright (c) 2026 OthmanAdi (verbatim from
  `_sources/semitic/LICENSE`)
- **URL**: https://github.com/OthmanAdi/humanizer-semitic
- **Pinned commit**: `2c9d4fbe3e0086d373b59bfebc9556082275cf62`
- **Version**: 1.0.0 (from `package.json` version)
- **License**: MIT — `skills/humanizer-pro/LICENSES/humanizer-semitic.MIT.txt`
- **What humanizer-pro takes from it**: Modern Standard Arabic (MSA),
  Egyptian Arabic, and Levantine Arabic pattern content, mapped id-by-id in
  `docs/provenance/ar-shared-msa.md` and `docs/provenance/ar-egt-shm.md` into
  `skills/humanizer-pro/references/ar-shared.md`, `ar-msa.md`,
  `ar-egyptian.md`, and `ar-levantine.md`. Dialect marker word lists used by
  `skills/humanizer-pro/scripts/lib/lang.js` are sourced from this
  repository's inventory (`docs/inventory/semitic.md`).
- **Hebrew is explicitly not used.** `humanizer-semitic` upstream also
  contains Hebrew-language material; humanizer-pro implements only the MSA,
  Egyptian, and Levantine Arabic content from this source and does not use,
  adapt, or ship any Hebrew patterns, samples, or code from it.
