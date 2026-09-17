---
title: Edge caching basics
description: A short primer on edge caching.
---

# Edge caching basics

Edge caching moves frequently requested responses closer to users, which
cuts CDN latency for read-heavy endpoints and reduces the load on the
origin server considerably, especially during traffic spikes when a large
number of clients request the exact same handful of resources at once.

## Why edge caching helps

Edge caching helps because it removes most of the round-trip cost between
the client and the origin server, replacing it with a much shorter hop to
a nearby point of presence that already holds a fresh copy of the
response the client is asking for.

## Cache invalidation

Cache invalidation is the hard part of edge caching, since a stale entry
can serve incorrect data to users until it expires or is explicitly purged
by the origin, and getting the timing right takes careful tuning across
every endpoint that participates in the cache.
