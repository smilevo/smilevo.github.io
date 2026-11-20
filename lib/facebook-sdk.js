import { FACEBOOK_SDK_VERSION } from './social.mjs';

let sdkPromise = null;

/** Loads Facebook's JavaScript SDK once per page. Rejects if it is blocked (ad blockers, tracking protection). */
export function loadFacebookSdk() {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'));
  if (window.FB?.XFBML) return Promise.resolve(window.FB);
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    if (!document.getElementById('fb-root')) {
      const root = document.createElement('div');
      root.id = 'fb-root';
      document.body.appendChild(root);
    }
    window.fbAsyncInit = () => {
      window.FB.init({ xfbml: false, version: FACEBOOK_SDK_VERSION });
      resolve(window.FB);
    };
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => {
      sdkPromise = null;
      script.remove();
      reject(new Error('Facebook SDK blocked'));
    };
    document.body.appendChild(script);
  });
  return sdkPromise;
}
