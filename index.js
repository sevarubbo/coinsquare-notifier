(() => {
  const audio = new Audio("./sound.wav")
  const observer = new MutationObserver(() => audio.play());
  
  
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
