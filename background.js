const audio = new Audio("./sound1.wav");
const audio3 = new Audio("./sound3.wav");

let [sellPosition, buyPosition] = [null, null];

chrome.runtime.onMessage.addListener((message, callback) => {
  const messageId = `message-${Date.now()}`;
  const defaultTitle = "👐";
  
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
      const position = message.data.positions.split(",")[0];
      
      if (position && position <= 5) {
        const didMoveUp = position < sellPosition;
        sellPosition = position;
        
        chrome.notifications.create(messageId, {
          type: "basic",
          title: defaultTitle,
          iconUrl: "./icon.png",
          message: `Селл ордер ${didMoveUp ? "поднялся" : "опустился"} на позицию: ${position}`,
        });
        audio3.play();
      }
    }
    
    if (message.data.orderType === "buy") {
      const position = message.data.positions.split(",")[0];
      
      if (position && position <= 5) {
        const didMoveUp = position < buyPosition;
        buyPosition = position;
        
        chrome.notifications.create(messageId, {
          type: "basic",
          title: defaultTitle,
          iconUrl: "./icon.png",
          message: `Бай ордер ${didMoveUp ? "поднялся" : "опустился"} на позицию: ${position}`,
        });
        audio3.play();
      }
    }
  }
});
