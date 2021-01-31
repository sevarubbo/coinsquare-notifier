const audio = new Audio("./sound1.wav")

chrome.runtime.onMessage.addListener((message, callback) => {
  const messageId = `message-${Date.now()}`;
  
  if (message.type == "orderchange"){
    if (message.message === "neworder") {
      chrome.notifications.create(messageId, {
          type: "basic",
          title: "Ну что ж...",
          iconUrl: "./icon.png",
          message: "Заказ размещен",
      });
    }
    
    if (message.message === "orderfulfilled") {
      chrome.notifications.create(messageId, {
          type: "basic",
          title: "Мои поздравления",
          iconUrl: "./icon.png",
          message: "Сделка совершена",
      });
    }
    
    audio.play();
  }
  
  if (message.type === "order_position_change") {
    if (message.data.orderType === "sell") {
      chrome.notifications.create(messageId, {
        type: "basic",
        title: "Hey",
        iconUrl: "./icon.png",
        message: "Селл ордер сдвинулся",
      });
    }
  }
});
