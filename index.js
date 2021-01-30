(() => {
  const observer = new MutationObserver((m) => {
    chrome.runtime.sendMessage("orderchange");
  });
  
  
  window.addEventListener('DOMContentLoaded', () => {
    const ordersBlock = document.querySelectorAll(".tabbedContainer.FlexBox-eeYpfQ.hgRnHk")[1];
  
    if (!ordersBlock) {
      console.error("Order block not found");
      return;
    }

    observer.observe(
      ordersBlock,
      { attributes: false, childList: true, subtree: true }
    )
  });
})()
