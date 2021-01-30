(() => {
  let orders = null;
  
  const observer = new MutationObserver((m) => {
    console.log("mutation", m);
    
    let nextOrders = document.querySelectorAll("[class^=OrderRow__OrderRowContainer]").length;
    
    if (orders !== null && orders !== nextOrders) {
      
      
      chrome.runtime.sendMessage({
        type: "orderchange",
        message: nextOrders > orders ? "neworder" : "orderfulfilled",
      });
    }
    
    orders = nextOrders;
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    const ordersBlock = document.querySelectorAll(".tabbedContainer.FlexBox-eeYpfQ.hgRnHk")[1];

    if (!ordersBlock) {
      return;
    }
    
    setTimeout(() => {
      observer.observe(
        ordersBlock,
        { attributes: true, childList: true, subtree: true }
      );
    }, 2000); // Wait a couple sec
  });
})()
