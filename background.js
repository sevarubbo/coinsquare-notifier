const audio = new Audio("./sound.wav")

chrome.runtime.onMessage.addListener((message, callback) => {
  if (message == "orderchange"){
    chrome.notifications.create({message: "Yoooo"});
    
    audio.play();
  }
});
