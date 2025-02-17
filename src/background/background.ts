console.log("hi background script 111");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  sendResponse("hello from background script");
  return true;
});
