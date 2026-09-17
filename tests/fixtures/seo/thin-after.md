---
title: Edge caching basics
description: A short primer on edge caching.
---

# Edge caching basics

Edge caching moves the responses users request most often out to servers
near them, which cuts CDN latency for read-heavy endpoints and takes real
load off the origin, especially during traffic spikes when a lot of
clients ask for the exact same handful of resources at once.

## Why edge caching helps

Edge caching helps because it removes most of the round-trip cost between
the client and the origin, replacing it with a much shorter hop to a
nearby point of presence that already holds a fresh copy of the response
the client wants.

## Cache invalidation

Cache invalidation is the hard part.
