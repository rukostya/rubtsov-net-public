/* Shared GA4 tracking for links to the author's Telegram channel. */
(function () {
  'use strict';
  if (window.rubtsovTelegramTracking) return;
  window.rubtsovTelegramTracking = true;

  function track(event) {
    if (event.defaultPrevented || (event.type === 'auxclick' ? event.button !== 1 : event.button !== 0)) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link || typeof window.gtag !== 'function') return;
    var url;
    try { url = new URL(link.href, document.baseURI); } catch (_) { return; }
    if (!/^https?:$/.test(url.protocol) || !/^(t\.me|telegram\.me)$/i.test(url.hostname) ||
        url.pathname.replace(/\/+$/, '').toLowerCase() !== '/kostyarubtsov') return;

    var section = link.closest('section[id], footer, header');
    var params = {
      send_to: 'G-JNPMM83LE2',
      link_url: url.href,
      link_position: link.getAttribute('data-telegram-position') ||
        (section && (section.id || section.tagName.toLowerCase())) || 'content',
      page_path: window.location.pathname,
      content_language: document.documentElement.lang || 'unknown',
      transport_type: 'beacon'
    };
    // Give GA time to send same-tab clicks; always continue if it is blocked.
    var sameTab = event.type === 'click' && !event.metaKey && !event.ctrlKey &&
      !event.shiftKey && !event.altKey && (!link.target || link.target === '_self') && !link.hasAttribute('download');
    if (sameTab) {
      var navigated = false;
      var navigate = function () {
        if (!navigated) { navigated = true; window.location.assign(url.href); }
      };
      event.preventDefault();
      params.event_callback = navigate;
      params.event_timeout = 600;
      window.setTimeout(navigate, 650);
    }
    window.gtag('event', 'telegram_click', params);
  }
  document.addEventListener('click', track);
  document.addEventListener('auxclick', track);
}());
