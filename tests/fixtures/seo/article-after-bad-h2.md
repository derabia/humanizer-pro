---
title: Edge caching for high-traffic APIs
description: A practical guide to edge caching and cutting CDN latency.
---

# Edge caching for high-traffic APIs

Edge caching moves the responses users request most often out to servers
near them, which cuts CDN latency by a wide margin for endpoints that get
read far more than they get written. When a nearby server already holds a
fresh copy of the answer, the origin never hears about the request, and
the client gets a reply in a few milliseconds rather than after a full
trip across the network. This pays off most for APIs handing the same
small set of resources to a lot of clients, where one cached copy can
answer thousands of requests before it goes stale. Teams usually start
edge caching on static assets before tackling API responses, since keeping
cache invalidation correct for dynamic data is the harder problem
[shortcode cache-badge tier="pro"].

## Why speed matters

Once the edge holds a cached response, most of the request's latency
budget vanishes. What is left is the connection setup between the client
and the nearest server, usually far smaller than a round trip to the
origin. See the [cache invalidation guide](/docs/cache-invalidation) for
the companion piece on keeping cached responses fresh, and read more from
[our CDN partner](https://example-cdn.com/docs) on point-of-presence
coverage.

<!-- wp:paragraph {"align":"left"} -->
<p>Configuration lives in <code>cache.config.js</code>.</p>
<!-- /wp:paragraph -->

## Cache invalidation strategies

Cache invalidation is the hard part of edge caching. Purge-on-write clears
a key the moment its source data changes; short TTLs trade some staleness
for simplicity. A team we spoke with cut their average response time from
220ms to 40ms after adopting a 60-second TTL on their read-heavy
endpoints, a four-and-a-half times improvement, while keeping correctness
acceptable for their use case.

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

Most teams get the bulk of the benefit from a short TTL strategy at a
fraction of the operational cost, and CDN latency gains like these add up
as traffic grows.
