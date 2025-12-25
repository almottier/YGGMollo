(function() {
  'use strict';

  function init() {
    const urlMatch = window.location.pathname.match(/\/torrent\/[^\/]+\/[^\/]+\/(\d+)-/);

    if (!urlMatch || !urlMatch[1]) {
      return;
    }

    const torrentId = urlMatch[1];

    chrome.storage.local.set({
      currentTorrent: {
        id: torrentId,
        name: torrentId,
        url: window.location.href,
        timestamp: Date.now()
      }
    });
  }

  const delay = Math.floor(Math.random() * 2000) + 500;

  setTimeout(function() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }, delay);
})();
