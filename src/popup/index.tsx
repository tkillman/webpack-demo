import { createRoot } from "react-dom/client";
//import "../styles/global.css";

import ButtonComponent from "../components/ButtonComponent";

const App = () => {
  const onClick = () => {
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      { message: "hello background" },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
        } else {
          console.log("Response:", response);
        }
      }
    );
  };

  const onClickToInitPopup = () => {
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      { message: "hello from popup", type: "append-log" },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
        } else {
          console.log("Response:", response);
        }
      }
    );
  };
  return (
    <div className="flex flex-col">
      <div>asdf</div>
      <div>
        <ButtonComponent onClick={onClick}>
          메시지 전송(background)
        </ButtonComponent>
        <ButtonComponent onClick={onClickToInitPopup}>
          메시지 전송(popup)
        </ButtonComponent>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
