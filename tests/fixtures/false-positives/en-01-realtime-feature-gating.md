<!-- fixture: false-positive ; lang: en ; source: humanizer-pro -->

The new sync endpoint pushes updates to connected clients over a websocket, so changes made on one device show up on another within a second or two. It sits behind a feature flag right now because we still see occasional out-of-order delivery under load, and we'd rather ship it dark than roll it back after a bad rollout.

The flag is off by default and can be enabled per workspace in the admin settings. When it's off, clients fall back to polling every thirty seconds, which is slower but reliable.

We plan to flip it on for internal workspaces first, then a small percentage of paid accounts, before making it the default for everyone.
