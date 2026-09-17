---
title: Edge caching for high-traffic APIs
description: A practical guide to edge caching and cutting CDN latency.
---

# Edge caching for high-traffic APIs

Edge caching moves frequently requested responses closer to users, which
cuts CDN latency dramatically for read-heavy endpoints. When a request hits
a point of presence that already holds a fresh copy of the response, the
origin server never sees the request at all, and the client gets an answer
in a few milliseconds instead of a full round trip across the network. This
matters most for APIs that serve the same handful of resources to a large
number of clients, where a single cached copy can serve thousands of
requests before it needs to be refreshed. Teams adopting edge caching
typically start with static assets before moving on to API responses,
since the cache invalidation story for dynamic data is harder to get right
[shortcode cache-badge tier="pro"].

## Why edge caching changes the latency budget

Once a response is cached at the edge, most of the request's latency
budget disappears. The remaining cost is the connection setup between the
client and the nearest point of presence, which is usually an order of
magnitude smaller than a round trip to the origin. See the
[cache invalidation guide](/docs/cache-invalidation) for the companion
piece on keeping cached responses fresh, and read more from
[our CDN partner](https://example-cdn.com/docs) on point-of-presence
coverage.

<!-- wp:paragraph {"align":"left"} -->
<p>Configuration lives in <code>cache.config.js</code>.</p>
<!-- /wp:paragraph -->

## Cache invalidation strategies

Cache invalidation is the hard part of edge caching. Purge-on-write clears
a key the moment its source data changes; short TTLs accept some staleness
in exchange for simplicity. A team we spoke with cut their average
response time from 220ms to 40ms after adopting a 60-second TTL on their
read-heavy endpoints, a four-and-a-half times improvement, while keeping
correctness acceptable for their use case.

| Strategy | Freshness | Complexity |
|---|---|---|
| Purge-on-write | High | High |
| Short TTL | Medium | Low |
| Stale-while-revalidate | Medium | Medium |

> "We stopped worrying about cache invalidation the day we accepted
> 60 seconds of staleness was fine for our dashboard." — a platform
> engineer we interviewed for this piece.

```js
const cache = new EdgeCache({ ttlSeconds: 60 });
```

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"Edge caching for high-traffic APIs"}
</script>

![Diagram of a request hitting a point of presence](edge-cache-diagram.png "Edge caching request flow")

Most teams find that a short TTL strategy gets them most of the benefit
with a fraction of the operational overhead, and CDN latency improvements
of this kind compound as traffic grows.
