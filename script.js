document.getElementById("volume-input").addEventListener("change", (e) => {
  chrome.runtime.sendMessage({
    type: "volume-change",
    data: {volume: e.target.value},
  });
});
