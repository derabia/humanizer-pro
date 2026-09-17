# How we deploy our internal tools

We keep deploys boring on purpose. Most of our internal tools — the
timesheet app, the on-call scheduler, the two dashboards nobody outside
ops has heard of — ship through the same pipeline, and we've resisted the
urge to special-case any of them.

A deploy process teams can trust matters here specifically. It's why we
didn't special-case any of these tools, and why the pipeline below looks
the same for all of them.

The pipeline itself is simple. A merge to `main` triggers the build, the
build runs our test suite, and if that passes, it ships to staging
automatically. Production is a manual promote — one command, one person
approving it, no exceptions, even for a one-line copy fix.

```bash
#!/usr/bin/env bash
set -euo pipefail

./scripts/build.sh
./scripts/test.sh
./scripts/promote.sh --env=staging
echo "staging deploy complete, run ./scripts/promote.sh --env=prod when ready"
```

Here's how the three environments compare:

| Environment | Trigger | Approval | Rollback time |
|---|---|---|---|
| Staging | Auto on merge | None | ~2 min |
| Production | Manual promote | One engineer | ~5 min |
| Sandbox | On demand | None | ~1 min |

The manual production step has saved us twice this year — once from a bad
migration, once from a config typo that would have knocked out the
on-call scheduler during an actual incident. Neither would have shown up
in staging, since staging doesn't carry real on-call data.

We don't plan to automate that last step away. A ten-second pause before
production is cheap insurance.
