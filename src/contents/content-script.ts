console.log("this is content script");

chrome.runtime.sendMessage(
  { message: "hello from content script" },
  (response) => {
    console.log(response);
  }
);
