import React from "react";
import queryString from "query-string";
import Schulte from "./schulte";
import { alphabet, texts } from "./constants";
import "./reset.css";
import "./app.css";
import SpeedRead from "./speed-read";
import Menu from "./menu";
import { withRouter } from "react-router";
import Stroop from "./stroop";

const shulteOptions = {
  symbols: [...alphabet, "к"],
  solution: ["а", "б", "в", "г", "д"],
  rows: 7,
  cols: 5,
  withDot: true
};

const speedreadOptions = {
  texts
};

const stroopOptions = {
  colors: [
    ["красный", "#fc2c03"],
    ["синий", "#fc2c03"],
    ["зелёный", "#fc2c03"],
    ["жёлтый", "#fc2c03"],
    ["чёрный", "#000"],
    ["оранжевый", "#ff8c00"],
    ["розовый", "#ff0095"],
    ["голубой", "#00e1ff"],
    ["фиолетовый", "#7b32a8"]
  ]
};

const componentSwitcher = {
  schulte: <Schulte {...{ ...shulteOptions }} />,
  speedread: <SpeedRead {...{ ...speedreadOptions }} />,
  stroop: <Stroop {...{ ...stroopOptions }} />
};

class App extends React.Component {
  componentDidMount = () => {
    const { location } = this.props;
    const { search } = location;

    const { training } = queryString.parse(search);
    this.setState({ componentName: training });
  };

  componentDidUpdate = prevProps => {
    const { location } = this.props;
    const { search } = location;

    if (prevProps.location.search !== search) {
      const { training } = queryString.parse(search);
      this.setState({ componentName: training });
    }
  };

  state = {
    componentName: "schulte"
  };

  render = () => {
    const { componentName } = this.state;
    const Component = componentSwitcher[componentName] || null;

    return (
      <>
        <Menu />
        {Component}
      </>
    );
  };
}

export default withRouter(App);
