import React, { useState } from "react";
import ReactDOM from "react-dom";
import StartStep from "./components/organizms/start-step";
import {
  StartSchulte,
  FinishSchulte,
  SchulteTest
} from "./components/organizms/schulte-test";
import {
  StartSpeedRead,
  SpeedReadTest,
  FinishSpeedRead,
  SpeedReadQuestions
} from "./components/organizms/speed-read-test";
import {
  StartStroop,
  FinishStroop,
  StroopTest
} from "./components/organizms/stroop-test";
import FinishStep from "./components/organizms/finish-step/finish-step";
import "./global-styles/reset.css";
import "./global-styles/global.css";

export const StoreContext = React.createContext();
const Components = [
  StartStep,
  StartSchulte,
  SchulteTest,
  FinishSchulte,
  StartSpeedRead,
  SpeedReadTest,
  SpeedReadQuestions,
  FinishSpeedRead,
  StartStroop,
  StroopTest,
  FinishStroop,
  FinishStep
];

const App = () => {
  const [componentIndex, changeComponentIndex] = useState(0);
  const [{ age, error }, changeAgeState] = useState({
    age: "default",
    error: false
  });

  const [schulteTime, changeSchulteTime] = useState("00:00");

  const [speedreadTime, changeSpeedreadTime] = useState("00:00");
  const [speedreadText, changeSpeedreadText] = useState("");
  const [speedreadAnswers, changeSpeedreadAnswers] = useState({});
  const [speedreadWordsInMinute, setSpeedreadWordsInMinute] = useState(0);
  console.log("speedreadAnswers", speedreadAnswers);

  const [stroopTime, changeStroopTime] = useState("00:00");
  const [stroopAnswer, setStroopAnswer] = useState({});

  const Component = Components[componentIndex];

  const store = {
    startStep: {
      age,
      error,
      changeAgeState
    },
    schulteTest: {
      schulteTime,
      changeSchulteTime
    },
    speedreadTest: {
      speedreadText,
      changeSpeedreadText,
      speedreadTime,
      changeSpeedreadTime,
      speedreadWordsInMinute,
      setSpeedreadWordsInMinute,
      speedreadAnswers,
      changeSpeedreadAnswers
    },
    stroopTest: { stroopTime, changeStroopTime, stroopAnswer, setStroopAnswer },
    actions: {
      changeComponentIndex
    },
    isRetryEnable: true
  };

  return (
    <StoreContext.Provider value={store}>
      <Component />
    </StoreContext.Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
