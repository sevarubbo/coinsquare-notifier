(() => {
  const audio = new Audio("./sound.wav")
  const observer = new MutationObserver(() => audio.play());
  
  const ordersBlock = document.querySelectorAll(".tabbedContainer.FlexBox-eeYpfQ.hgRnHk")[1];
  
  if (!ordersBlock) {
    console.error("Order block not found");
  }
  
  observer.observe(
    ordersBlock,
    { attributes: false, childList: true, subtree: true }
  )
})()
