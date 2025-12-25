// Background script for YGGMollo

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'openOptions') {
    chrome.runtime.openOptionsPage();
  } else if (request.action === 'download') {
    chrome.downloads.download({
      url: request.url,
      filename: request.filename,
      saveAs: false
    }, function(downloadId) {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ success: true, downloadId: downloadId });
      }
    });
    return true;
  }
});
