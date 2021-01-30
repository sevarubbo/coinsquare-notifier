const audio = new Audio("./sound1.wav")

chrome.runtime.onMessage.addListener((message, callback) => {
  if (message == "orderchange"){
    chrome.notifications.create(`my-notification-${Date.now()}`, {
        type: "basic",
        title: "Что-то",
        iconUrl: "./icon.png",
        message: "Что-то произошло",
    });
    
    audio.play();
  }
});
