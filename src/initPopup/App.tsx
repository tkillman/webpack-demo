import Button from "../components/ButtonComponent";

const App = () => {
  const onClickButton = () => {
    const popupUrl = chrome.runtime.getURL("popup.html");

    chrome.windows.create({
      url: popupUrl,
      type: "popup",
      width: 600,
      height: 600,
    });
  };

  return (
    <div className="flex flex-col gap-5 bg-red-500 min-w-lg">
      hihi
      <Button onClick={onClickButton}>버튼팝업</Button>
    </div>
  );
};

export default App;
