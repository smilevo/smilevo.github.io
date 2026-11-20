# Adding posts to the social media feed

The homepage carousel and the `/social/` page are built from `content/social.json`.

- Every post has a `date` (`YYYY-MM-DD`). The site sorts **newest first** by that date, so the order in the file doesn't matter.
- The homepage carousel shows the 5 most recent posts (`CAROUSEL_COUNT` in `lib/social.mjs`). `/social/` shows all of them, 10 per page.
- Nothing is fetched automatically: a post appears only after you add it here.

## Add a Facebook post

The post must be public (grey globe icon next to its time). Copy its link, which looks like
`https://www.facebook.com/<profile>/posts/<number>`, and add:

```json
{
  "id": "fb-<number>",
  "platform": "facebook",
  "date": "2026-11-18",
  "url": "https://www.facebook.com/<profile>/posts/<number>"
}
```

## Add a LinkedIn post

On the public post, click **⋯ → Embed this post** and copy the code. From
`src="https://www.linkedin.com/embed/feed/update/urn:li:share:<number>?collapsed=1"` and its `height="…"`:

```json
{
  "id": "li-<number>",
  "platform": "linkedin",
  "date": "2026-11-18",
  "urn": "urn:li:share:<number>",
  "height": 600
}
```

A LinkedIn post's real date can be read from its number (the first 41 bits are a millisecond timestamp), so you can
check a date with: `python3 -c "import datetime;print(datetime.datetime.fromtimestamp((<number>>>22)/1000, datetime.UTC).date())"`.

Run `npm run check` before committing. It rejects bad links, duplicates and invalid dates.

## About the existing dates

Facebook doesn't expose a post's date to this site, so each Facebook post's date is entered by hand. The dates on the
older Facebook posts were first estimated and then **confirmed by the site owner on 2026-11-19**. LinkedIn dates are
exact (decoded from the post id, see above).
