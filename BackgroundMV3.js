// Manifest V3 service worker for the VTT Enhancement Suite local port.

function parseBundleUrl(text) {
  if (!text) return null;
  let m = text.match(/https?:\/\/cdn\.roll20\.net\/vtt\/legacy\/production\/latest\/vtt\.bundle[^"'`\\\s<>)]*?\.js(?:\?[^"'`\\\s<>)]*)?/i);
  if (m) return m[0];
  m = text.match(/\/\/cdn\.roll20\.net\/vtt\/legacy\/production\/latest\/vtt\.bundle[^"'`\\\s<>)]*?\.js(?:\?[^"'`\\\s<>)]*)?/i);
  if (m) return 'https:' + m[0];
  m = text.match(/vtt\.bundle\.[A-Za-z0-9_-]+\.js/i);
  if (m) return 'https://cdn.roll20.net/vtt/legacy/production/latest/' + m[0];
  return null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const bundleUrl = message && message.VTTES_WANTS_CDN_SCRIPTS_FROM_BACKGROUND;
  if (bundleUrl) {
    (async () => {
      try {
        console.log('[VTTES MV3 v6] Fetching Roll20 bundle:', bundleUrl);
        const separator = bundleUrl.includes('?') ? '&' : '?';
        const response = await fetch(`${bundleUrl}${separator}n=${Date.now()}`, {
          credentials: 'omit',
          cache: 'no-store'
        });
        if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
        const text = await response.text();
        sendResponse({ VTT_BUNDLE: text });
      } catch (error) {
        console.error('[VTTES MV3 v6] Bundle fetch failed:', error);
        sendResponse({ VTT_BUNDLE: null, VTTES_ERROR: String(error) });
      }
    })();
    return true;
  }

  const startJsUrl = message && message.VTTES_FIND_BUNDLE_FROM_STARTJS;
  if (startJsUrl) {
    (async () => {
      try {
        console.log('[VTTES MV3 v6] Resolving bundle URL from startjs:', startJsUrl);
        const response = await fetch(startJsUrl, {
          credentials: 'include',
          cache: 'no-store'
        });
        if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
        const text = await response.text();
        const url = parseBundleUrl(text);
        if (!url) throw new Error('No vtt.bundle URL found in startjs');
        console.log('[VTTES MV3 v6] Resolved bundle URL:', url);
        sendResponse({ VTTES_BUNDLE_URL: url });
      } catch (error) {
        console.error('[VTTES MV3 v6] startjs bundle lookup failed:', error);
        sendResponse({ VTTES_BUNDLE_URL: null, VTTES_ERROR: String(error) });
      }
    })();
    return true;
  }

  return false;
});

console.log('[VTTES MV3 v6] Background service worker initialized.');
