'use client';
import { useEffect, useRef, useState } from 'react';
import { loadFacebookSdk } from '@/lib/facebook-sdk';

const RENDER_TIMEOUT_MS = 8000;

/** One live Facebook post (media, likes and comments are served by Facebook). */
export default function FacebookPost({ url }) {
  const wrapper = useRef(null);
  const embed = useRef(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer;
    setBlocked(false);
    // Facebook accepts widths between 350 and 750 px.
    const width = Math.min(750, Math.max(350, Math.floor(wrapper.current?.clientWidth || 700)));
    embed.current?.setAttribute('data-width', String(width));
    loadFacebookSdk()
      .then((FB) => {
        if (cancelled || !wrapper.current) return;
        // parse() renders the fb-post elements *inside* the node it is given; passing the
        // fb-post element itself does nothing, so hand it the wrapper.
        FB.XFBML.parse(wrapper.current);
        timer = setTimeout(() => {
          if (!cancelled && !embed.current?.querySelector('iframe')) setBlocked(true);
        }, RENDER_TIMEOUT_MS);
      })
      .catch(() => !cancelled && setBlocked(true));
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [url]);

  return (
    <div className="fb-post-wrap" ref={wrapper}>
      <div className="fb-post" data-href={url} ref={embed} />
      {blocked && (
        <p className="fb-blocked">
          This post could not be displayed here. It may be unavailable, or your browser may be
          blocking Facebook content.
        </p>
      )}
      <a className="text-link fb-fallback" href={url} target="_blank" rel="noopener noreferrer">
        View on Facebook<span aria-hidden="true"> ↗</span>
      </a>
    </div>
  );
}
