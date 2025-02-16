import { createRoot } from "react-dom/client";
import ButtonComponent from "../components/ButtonComponent";

const App = () => {
  return (
    <div className="flex flex-col">
      <div>asdf</div>
      <div>
        <ButtonComponent>메시지 전송</ButtonComponent>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));

root.render(<App />);
