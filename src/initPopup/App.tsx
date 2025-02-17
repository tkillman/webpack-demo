import { useEffect, useState } from "react";
import Button from "../components/ButtonComponent";

const App = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const onClickButton = () => {
    chrome.runtime.sendMessage({ type: "focus-popup" });
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      console.log("i am popup", message);
      if (message.type === "append-log") {
        setLogs((prev) => {
          const newLogs = [...prev, message.message];
          return newLogs;
        });
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-5 bg-red-500 min-w-80">
      hihi123
      <Button onClick={onClickButton}>버튼팝업</Button>
      <div>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
