// Popup script for YGGMollo

document.addEventListener('DOMContentLoaded', function() {
  const torrentSection = document.getElementById('torrentSection');
  const noTorrent = document.getElementById('noTorrent');
  const downloadBtn = document.getElementById('downloadBtn');
  const optionsBtn = document.getElementById('optionsBtn');
  const statusDiv = document.getElementById('status');
  const torrentNameEl = document.getElementById('torrentName');
  const torrentIdEl = document.getElementById('torrentId');

  let currentTorrent = null;

  // Load torrent info
  chrome.storage.local.get(['currentTorrent'], function(result) {
    if (result.currentTorrent && result.currentTorrent.id) {
      currentTorrent = result.currentTorrent;

      // Check if torrent is recent (less than 5 minutes old)
      const age = Date.now() - currentTorrent.timestamp;
      if (age < 5 * 60 * 1000) {
        showTorrent(currentTorrent);
      } else {
        showNoTorrent();
      }
    } else {
      showNoTorrent();
    }
  });

  // Download button handler
  downloadBtn.addEventListener('click', function() {
    if (!currentTorrent) return;

    chrome.storage.sync.get(['passkey'], function(result) {
      if (!result.passkey) {
        showStatus('Veuillez configurer votre passkey', 'error');
        return;
      }

      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Téléchargement...';

      const downloadUrl = `https://yggapi.eu/torrent/${currentTorrent.id}/download?passkey=${result.passkey}`;

      chrome.runtime.sendMessage({
        action: 'download',
        url: downloadUrl,
        filename: `${sanitizeFilename(currentTorrent.name)}.torrent`
      }, function(response) {
        if (response && response.success) {
          showStatus('Téléchargement démarré !', 'success');
          downloadBtn.textContent = 'Téléchargé !';
          setTimeout(function() {
            downloadBtn.disabled = false;
            downloadBtn.textContent = 'Télécharger via Ygg-API';
          }, 2000);
        } else {
          showStatus('Erreur: ' + (response ? response.error : 'Unknown error'), 'error');
          downloadBtn.disabled = false;
          downloadBtn.textContent = 'Télécharger via Ygg-API';
        }
      });
    });
  });

  // Options button handler
  optionsBtn.addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
    window.close();
  });

  function showTorrent(torrent) {
    torrentNameEl.textContent = torrent.name;
    torrentIdEl.textContent = torrent.id;
    torrentSection.classList.remove('hidden');
    noTorrent.classList.add('hidden');
  }

  function showNoTorrent() {
    torrentSection.classList.add('hidden');
    noTorrent.classList.remove('hidden');
  }

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = 'status status-' + type;
    statusDiv.classList.remove('hidden');

    setTimeout(function() {
      statusDiv.classList.add('hidden');
    }, 3000);
  }

  function sanitizeFilename(name) {
    return name.replace(/[^a-z0-9_\-\.]/gi, '_').substring(0, 200);
  }
});
