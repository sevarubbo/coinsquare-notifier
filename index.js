(() => {
  const observer = new MutationObserver((m) => {
    console.log("mutation", m);
    chrome.runtime.sendMessage("orderchange");
  });
  
  setTimeout(() => {
    window.addEventListener('DOMContentLoaded', () => {
      const ordersBlock = document.querySelectorAll(".tabbedContainer.FlexBox-eeYpfQ.hgRnHk")[1];

      if (!ordersBlock) {
        return;
      }

      observer.observe(
        ordersBlock,
        { attributes: true, childList: true, subtree: true }
      )
    });
  }, 1000); // Wait just a little bit
})()
