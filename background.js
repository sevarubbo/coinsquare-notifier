const audio = new Audio("./sound.wav")

chrome.runtime.onMessage.addListener((message, callback) => {
  if (message == "orderchange"){
    chrome.notifications.create(`my-notification-${Date.now()}`, {
        type: "basic",
        title: "My Title",
        message: "My Message",
    });
    
    audio.play();
  }
});
