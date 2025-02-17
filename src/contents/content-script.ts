console.log("this is content script");

chrome.runtime.sendMessage(
  { message: "hello from content script" },
  (response) => {
    console.log(response);
  }
);

const createButton = () => {
  const button = document.createElement("button");
  button.textContent = "버튼";
  button.type = "button";
  button.onclick = function () {
    chrome.runtime.sendMessage(
      { message: "hello from content script" },
      (response) => {
        console.log(response);
      }
    );
  };

  return button;
};

const createButton2 = () => {
  const button = document.createElement("button");
  button.textContent = "버튼2";
  button.type = "button";
  button.onclick = function () {
    chrome.runtime.sendMessage(
      { message: "hello from content script", type: "append-log" },
      (response) => {
        console.log(response);
      }
    );
  };

  return button;
};

// const timer = setInterval(() => {
//   console.log("메시지 보내는중");
//   chrome.runtime.sendMessage(
//     { message: "hello from content script", type: "append-log" },
//     (response) => {
//       if (chrome.runtime.lastError) {
//         console.log(chrome.runtime.lastError.message);
//       } else {
//         console.log(response);
//       }
//     }
//   );
// }, 1000);

const buttonElement = createButton();
const buttonElement2 = createButton2();
document.body.insertBefore(buttonElement, document.body.firstChild);
document.body.insertBefore(buttonElement2, document.body.firstChild);
