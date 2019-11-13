import React from "react";

class Timer extends React.Component {
  state = {
    timerId: 0,
    timer: 0
  };

  componentDidMount = () => {
    const { isStart } = this.props;
    if (isStart) this.startTimer();
  };

  componentDidUpdate = prevProps => {
    const { isStart } = this.props;
    if (prevProps.isStart !== isStart) {
      if (isStart) return this.startTimer();
      this.stopTimer();
    }
  };

  componentWillUnmount = () => {
    this.stopTimer();
  };

  getUserFriendlyTime = ms => {
    if (!ms) return "00:00";

    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60));
    return `${`0${minutes}`.slice(-2)}:${`0${seconds}`.slice(-2)}`;
  };

  startTimer = () => {
    const startMSeconds = Date.now();

    clearInterval(this.state.timerId);

    const timerId = setInterval(() => {
      const currMSeconds = Date.now();
      const deltaMSeconds = currMSeconds - startMSeconds;

      this.setState({ timer: deltaMSeconds });
    }, 1);

    this.setState({ timerId });
  };

  stopTimer = () => {
    const { timer } = this.state;
    clearInterval(this.state.timerId);
    this.props.getTime(this.getUserFriendlyTime(timer));
  };

  render = () => {
    return <div>{this.getUserFriendlyTime(this.state.timer)}</div>;
  };
}

export default Timer;
