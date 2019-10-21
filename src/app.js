import React from "react";
import { Route, Switch } from "react-router-dom";
import Schulte from "./schulte";
import SpeedRead from "./speed-read";
import Stroop from "./stroop";
import { shulte, speedread, stroop } from "./options";
import "./reset.css";
import "./app.css";

const App = () => (
  <Switch>
    <Route exact path="/schulte">
      <Schulte {...{ ...shulte }} />
    </Route>
    <Route exact path="/speedread">
      <SpeedRead {...{ ...speedread }} />
    </Route>
    <Route exact path="/stroop">
      <Stroop {...{ ...stroop }} />
    </Route>
  </Switch>
);

export default App;
