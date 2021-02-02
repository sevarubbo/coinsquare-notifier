const playSounds = {
  orderChange: () => new Audio("./sound1.wav").play(),
  orderUp: () => new Audio("./order-up.wav").play(),
  orderDown: () => new Audio("./order-down.wav").play(),
  orderTop: () => new Audio("./order-top.wav").play(),
};

let lastOrderPositions = {sell: null, buy: null};

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
    
    playSounds.orderChange();
  }
  
  if (message.type === "order_position_change") {
    const position = message.data.positions.split(",")[0];
    const orderType = message.data.orderType;
    
    if (lastOrderPositions[orderType] === null) {
      lastOrderPositions[orderType] = position;
      return;
    }
    
    const didMoveUp = position < lastOrderPositions[orderType];
    lastOrderPositions[orderType] = position;
    
    if (position > 5) {
      return;
    }
    
    if (position == 1) {
      playSounds.orderTop();
    } else if (didMoveUp) {
      playSounds.orderUp();
    } else {
      playSounds.orderDown();
    }
    
    if (message.data.orderType === "sell") {
      chrome.notifications.create(messageId, {
        type: "basic",
        title: defaultTitle,
        iconUrl: "./icon.png",
        message: `Селл ордер ${didMoveUp ? "поднялся" : "опустился"} на позицию: ${position}`,
      });
    }
    
    if (message.data.orderType === "buy") {
      chrome.notifications.create(messageId, {
        type: "basic",
        title: defaultTitle,
        iconUrl: "./icon.png",
        message: `Бай ордер ${didMoveUp ? "поднялся" : "опустился"} на позицию: ${position}`,
      });
    }
  }
});
