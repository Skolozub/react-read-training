import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./global-styles/reset.css";
import "./global-styles/global.css";
import StartStep from "./components/organizms/start-step";
import {
  StartSchulte,
  FinishSchulte
} from "./components/organizms/schulte-test";
import {
  StartSpeedRead,
  FinishSpeedRead
} from "./components/organizms/speed-read-test";
import { StartStroop, FinishStroop } from "./components/organizms/stroop-test";

export const StoreContext = React.createContext();
const Components = [
  StartStroop,
  FinishStroop,
  StartSpeedRead,
  FinishSpeedRead,
  StartStep,
  StartSchulte,
  FinishSchulte
];

const App = () => {
  const [componentIndex, changeComponentIndex] = useState(0);
  const [{ age, error }, changeAgeState] = useState({
    age: "default",
    error: false
  });
  const Component = Components[componentIndex];

  const store = {
    startStep: {
      age,
      error,
      changeAgeState
    },
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
