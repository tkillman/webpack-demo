console.log("hi background script 111");

let popupWindow: chrome.windows.Window | null = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  sendResponse("nice to meet you");

  if (request.type === "focus-popup") {
    const popupUrl = chrome.runtime.getURL("popup.html");

    if (popupWindow) {
      chrome.windows.update(popupWindow.id!, { focused: true });
    } else {
      chrome.windows.create(
        {
          url: popupUrl,
          type: "popup",
          width: 600,
          height: 600,
        },
        (newWindow) => {
          popupWindow = newWindow;
        }
      );
    }
  }
  return true;
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (popupWindow && popupWindow.id === windowId) {
    popupWindow = null;
  }
});
