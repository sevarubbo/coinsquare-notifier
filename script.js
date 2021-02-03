document.getElementById("volume-input").addEventListener("change", (e) => {
  chrome.runtime.sendMessage({
    type: "volume-change",
    data: {volume: e.target.value},
  });
});

chrome.storage.sync.get(['volume'], (result) => {
  document.getElementById("volume-input").value = result.volume !== undefined ? result.volume : 0.5;
});
