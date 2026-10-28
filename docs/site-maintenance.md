# Site maintenance notes

This guide documents two site workflows raised in [Issue #33](https://github.com/smilevo/smilevo.github.io/issues/33) and [Issue #64](https://github.com/smilevo/smilevo.github.io/issues/64).

## Embed a YouTube video in an event

Event pages are stored under `content/event/<event-slug>/index.md`. Add the YouTube shortcode to the Markdown body after the closing front-matter delimiter (`---`):

```text
{{< youtube VIDEO_ID >}}
```

Replace `VIDEO_ID` with the ID from the YouTube video URL. For example, `https://www.youtube.com/watch?v=cnwV4HQGdRs` has the ID `cnwV4HQGdRs`. In the site editor, put the shortcode in the event's **Body** Markdown field. The existing [ICSR 2020 event](../content/event/ali-mohamed-hussein-talk-icsr2020/index.md) demonstrates this format.

For inline playback, use the body shortcode rather than assuming that filling the `url_video` front-matter field alone will embed a player. Preview the event page and confirm the video is public or otherwise playable for the intended audience.

## Google Analytics 4

The GA4 setting is `marketing.google_analytics` in `config/_default/params.yaml`. The repository currently has a GA4 Measurement ID configured there. If it needs to change, use the Measurement ID for the intended GA4 web data stream; do not paste a legacy Universal Analytics ID into this setting. The ID is configuration, not proof that the property is active or receiving data.

After deployment, verify the intended property and confirm that visits appear in GA4. Repository code alone cannot establish that the configured ID belongs to the correct account or that events are being collected. Keep using the existing theme integration rather than adding a second analytics script unless the integration is intentionally being replaced.
