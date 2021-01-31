(() => {
  let orders = null;
  let sellOrderPositions = "";
  
  const observer = new MutationObserver((m) => {
    console.log("mutation", m);
    
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
      
      const sellOrders = [...allOrdersList.children[0].querySelectorAll("[class^=BookItem__BookItemRow]")].reverse();
      const buyOrders = [...allOrdersList.children[2].querySelectorAll("[class^=BookItem__BookItemRow]")];
      
      const userSellOrders = sellOrders.filter(o => o.querySelector("#LeftArrow"));
      const nextSellOrderPositions = userSellOrders.map(o => [...sellOrders]).toString();
      
      if (nextSellOrderPositions !== sellOrderPositions) {
        chrome.runtime.sendMessage({
          type: "order_position_change",
          data: {
            orderType: "sell"
          },
        });
      }
      
      sellOrderPositions = nextSellOrderPositions
    })()
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    observer.observe(
      document.body,
      { attributes: true, childList: true, subtree: true },
    );
  });
})()
