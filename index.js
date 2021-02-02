const OBSERVE_DELAY = 2000;

(() => {
  let orders = null;
  let sellOrderPositions = null;
  let buyOrderPositions = null;
  
  const observer = new MutationObserver((m) => {
    (() => {
      let nextOrders = document.querySelectorAll("[class^=OrderRow__OrderRowContainer]").length;
    
      if (orders !== null && orders !== nextOrders) {
        chrome.runtime.sendMessage({
          type: "orderchange",
          message: nextOrders > orders ? "neworder" : "orderfulfilled",
        });
      }

      orders = nextOrders;
    })();
    
    (() => {
      const allOrdersList = document.querySelector("[class^=Container__BookBody]");
      
      if (!allOrdersList) {
        return;
      }
      
      const sellOrders = [...allOrdersList.children[0].querySelectorAll("[class^=BookItem__BookItemRow]")].reverse();
      const buyOrders = [...allOrdersList.children[2].querySelectorAll("[class^=BookItem__BookItemRow]")];
      
      const userSellOrders = sellOrders.filter(o => o.querySelector("#LeftArrow"));
      const nextSellOrderPositions = userSellOrders.map(o => sellOrders.indexOf(o) + 1).toString();
      
      if (nextSellOrderPositions !== sellOrderPositions) {
        chrome.runtime.sendMessage({
          type: "order_position_change",
          data: {
            orderType: "sell",
            positions: nextSellOrderPositions,
          },
        });
      }
      
      sellOrderPositions = nextSellOrderPositions;
      
      const userBuyOrders = buyOrders.filter(o => o.querySelector("#LeftArrow"));
      const nextBuyOrderPositions = userBuyOrders.map(o => buyOrders.indexOf(o) + 1).toString();
      
      if (nextBuyOrderPositions !== buyOrderPositions) {
        chrome.runtime.sendMessage({
          type: "order_position_change",
          data: {
            orderType: "buy",
            positions: nextBuyOrderPositions,
          },
        });
      }
      
      buyOrderPositions = nextBuyOrderPositions;
    })()
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      observer.observe(
        document.body,
        { attributes: false, childList: true, subtree: true },
      );
    }, OBSERVE_DELAY);
  });
})()
