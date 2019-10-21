import React from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./app";
import Menu from "./menu";


const Index = () => (
  <HashRouter>
    <Menu />
    <App />
  </HashRouter>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
