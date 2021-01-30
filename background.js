const audio = new Audio("./sound1.wav")

chrome.runtime.onMessage.addListener((message, callback) => {
  if (message.type == "orderchange"){
    if (message.message === "neworder") {
      chrome.notifications.create(`my-notification-${Date.now()}`, {
          type: "basic",
          title: "Ну что ж...",
          iconUrl: "./icon.png",
          message: "Заказ размещен",
      });
    }
    
    if (message.message === "orderfulfilled") {
      chrome.notifications.create(`my-notification-${Date.now()}`, {
          type: "basic",
          title: "Мои поздравления",
          iconUrl: "./icon.png",
          message: "Сделка совершена",
      });
    }
    
    audio.play();
  }
});
