<!-- fixture: synthetic-human ; lang: en ; source: humanizer-pro -->

I spent most of Tuesday chasing a bug that turned out to be a stale cache entry. Nothing fancy — just forgot to bust it after a schema change, and the old rows kept showing up in the admin panel like ghosts. Took me an embarrassingly long time to notice, mostly because I was staring at the query instead of the cache layer.

Once I found it, the fix was two lines. I added a comment explaining why, because I know I'll forget again in six months and blame the database.

Anyway, the deploy went out around 4pm. No fireworks, no rollback, just a quiet fix that nobody but our support team will ever notice. I like those days more than I probably should.
