import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = (newMode,replace = false) => {
    mode!==initial &&replace === false&& setHistory([...history, mode]);
    setMode(newMode);
  }
  const back = () => {
    setMode(history[history.length-1]);
    const newHistory = [...history];
    history.length>=2&&newHistory.pop();
    setHistory(newHistory);
  };
  // console.log(history);
  return { mode,transition ,back};
};


export default useVisualMode;