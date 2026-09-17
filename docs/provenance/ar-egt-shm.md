# Provenance — `ar-egyptian.md` / `ar-levantine.md`

Maps every `AR-EGT-*` / `AR-SHM-*` id to its upstream source, or to `origin: humanizer-pro`
with a stated rationale when no single upstream id covers it. Upstream file abbreviations:
`egt:` = `_sources/semitic/skills/humanizer-ar-egt/SKILL.md`; `shm:` =
`_sources/semitic/skills/humanizer-ar-shami/SKILL.md`. Both pinned at commit
`2c9d4fbe3e0086d373b59bfebc9556082275cf62` (OthmanAdi/humanizer-semitic,
`feat: publish to npm as humanizer-semitic`).

## Egyptian (`ar-egyptian.md`)

| id | source | file:line |
|---|---|---|
| AR-EGT-001 | SM-EGT-001 | egt:72–105 |
| AR-EGT-002 | SM-EGT-002 | egt:108–119 |
| AR-EGT-003 | SM-EGT-003 | egt:122–138 |
| AR-EGT-004 | SM-EGT-004 | egt:141–157 |
| AR-EGT-005 | SM-EGT-005 | egt:160–176 |
| AR-EGT-006 | SM-EGT-006 | egt:185–196 |
| AR-EGT-007 | SM-EGT-007 | egt:199–219 |
| AR-EGT-008 | SM-EGT-008 | egt:222–236 |
| AR-EGT-009 | SM-EGT-009 | egt:239–257 |
| AR-EGT-010 | SM-EGT-010 (deferred to ar-shared.md: uniform sentence rhythm; dialect fix/example retained) | egt:260–271 |
| AR-EGT-011 | SM-EGT-011 (deferred to ar-shared.md: formulaic transitions; dialect fix set retained) | egt:280–304 |
| AR-EGT-012 | SM-EGT-012 (deferred to ar-shared.md: formulaic transitions; dialect fix set retained) | egt:307–328 |
| AR-EGT-013 | SM-EGT-013 | egt:331–342 |
| AR-EGT-014 | SM-EGT-014 | egt:345–359 |
| AR-EGT-015 | SM-EGT-015 | egt:362–378 |
| AR-EGT-016 | SM-EGT-016 | egt:387–404 |
| AR-EGT-017 | SM-EGT-017 | egt:407–425 |
| AR-EGT-018 | SM-EGT-018 | egt:428–444 |
| AR-EGT-019 | SM-EGT-019 | egt:447–466 |
| AR-EGT-020 | SM-EGT-020 | egt:469–480 |
| AR-EGT-021 | SM-EGT-021 | egt:489–509 |
| AR-EGT-022 | SM-EGT-022 | egt:512–532 |
| AR-EGT-023 | SM-EGT-023 | egt:535–544 |
| AR-EGT-024 | SM-EGT-024 | egt:547–567 |
| AR-EGT-025 | SM-EGT-025 | egt:570–581 |
| AR-EGT-026 | origin: humanizer-pro — rationale: no single SM-EGT id names an "MSA leakage" umbrella pattern (unlike Levantine, where SM-SHM-001 is itself the umbrella). This entry aggregates the cross-references already carried by AR-EGT-001/002/003/004/005/006/007/013/014 (each mapped exactly once above) and anchors on the source's own Stage-3 checklist and Quick Reference table, which have no pattern number of their own. | egt:659–667, egt:841–868 |

## Levantine (`ar-levantine.md`)

| id | source | file:line |
|---|---|---|
| AR-SHM-001 | SM-SHM-001 (also serves as the dedicated MSA-leakage umbrella section — the source itself frames this pattern as the non-regional baseline failure) | shm:116–140, shm:1041–1048, shm:1236–1242 |
| AR-SHM-002 | SM-SHM-002 | shm:143–172 |
| AR-SHM-003 | SM-SHM-003 | shm:174–197 |
| AR-SHM-004 | SM-SHM-004 | shm:199–218 |
| AR-SHM-005 | SM-SHM-005 | shm:220–255 |
| AR-SHM-006 | SM-SHM-006 | shm:265–304 |
| AR-SHM-007 | SM-SHM-007 | shm:307–343 |
| AR-SHM-008 | SM-SHM-008 | shm:345–374 |
| AR-SHM-009 | SM-SHM-009 | shm:377–401 |
| AR-SHM-010 | SM-SHM-010 | shm:403–439 |
| AR-SHM-011 | SM-SHM-011 | shm:448–483 |
| AR-SHM-012 | SM-SHM-012 (deferred to ar-shared.md: formulaic transitions; regional table retained) | shm:486–515 |
| AR-SHM-013 | SM-SHM-013 | shm:518–542 |
| AR-SHM-014 | SM-SHM-014 | shm:545–571 |
| AR-SHM-015 | SM-SHM-015 | shm:574–602 |
| AR-SHM-016 | SM-SHM-016 | shm:612–652 |
| AR-SHM-017 | SM-SHM-017 | shm:655–691 |
| AR-SHM-018 | SM-SHM-018 | shm:693–715 |
| AR-SHM-019 | SM-SHM-019 | shm:718–748 |
| AR-SHM-020 | SM-SHM-020 | shm:751–779 |
| AR-SHM-021 | SM-SHM-021 | shm:789–827 |
| AR-SHM-022 | SM-SHM-022 | shm:830–864 |
| AR-SHM-023 | SM-SHM-023 | shm:867–902 |
| AR-SHM-024 | SM-SHM-024 (deferred to ar-shared.md: uniform sentence rhythm; paratactic-chain nuance retained) | shm:905–936 |
| AR-SHM-025 | SM-SHM-025 | shm:939–976 |

## Notes

- Severity tags (P0/P1/P2) in both reference files are `origin: humanizer-pro` judgment
  calls applying the owner-approved rubric (minor→P2, significant→P1, critical→P0) to the
  source's own emphasis language, since the Egyptian source carries no severity tags at
  all and the Levantine source only explicitly tiers Category 1. See each file's preamble.
- "Dialect markers" lists at the end of each reference file are not independent ids —
  they compile marker words already cited inside the numbered entries above, for
  downstream language-ID script use, and are not separately provenance-mapped here.
- The MSA skill (`humanizer-ar-msa`) is out of scope for this task; no `AR-MSA-*` ids
  are produced.
