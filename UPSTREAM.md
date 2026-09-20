# Pinned upstream sources

Acquired with git clone --depth 1 on 2026-09-17 (Africa/Cairo).

| Repository | Commit | Version | Version source | License | Intended contribution |
|---|---|---|---|---|---|
| https://github.com/blader/humanizer | 9862685f575c65a8247f90369951df1b3416e3d6 | 3.0.0 | SKILL.md metadata.version | LICENSE | Pattern philosophy, catalog, voice samples |
| https://github.com/conorbronsdon/avoid-ai-writing | 7a2c7d11d4a74d90c6be41fbed8402d972543798 | 3.35.0 | package.json version | LICENSE | Editing contracts, vocabulary, detector, validator |
| https://github.com/OthmanAdi/humanizer-semitic | 2c9d4fbe3e0086d373b59bfebc9556082275cf62 | 1.0.0 | package.json version | LICENSE | MSA, Egyptian, Levantine patterns; Hebrew excluded from implementation |

Local clones: _sources/blader, _sources/avoid-ai-writing, _sources/semitic.
No upstream implementation has been merged at Phase 1.

## Build environment

- Builder: an AI assistant, running in a coding-agent desktop app, acting as orchestrator; implementation delegated to sub-agents on the same underlying model family, with a stronger-reasoning variant for architecture/hard decisions. Reasoning effort per sub-agent is not configurable in this environment.
- Prior attempt (Phase 1 only) was made by another model (recorded as GPT-6 in Codex); its pins were re-verified on 2026-09-17 (see docs/PRIOR-ATTEMPT.md).
- OS: Windows 11 Pro 10.0.26200.
- Node: v25.2.1 (Node 18 compatibility is a target; a real Node 18 run is not available on this machine unless noted in docs/evidence/).
- Git: 2.52.0.windows.1.
- Build start (this session): 2026-09-17.
- Project: D:/Dev/htdocs/humanizer-pro, branch build/humanizer-pro.

Raw reproducible inspection: docs/evidence/phase1-sources.txt.
