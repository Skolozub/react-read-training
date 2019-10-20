import React from "react";
import { Router, Switch, Route } from "react-router";
import { history } from "./constants";
import ReactDOM from "react-dom";
import App from "./app";

const Index = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
    </Switch>
  </Router>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
