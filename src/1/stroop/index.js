import React from "react";
import random from "random";
import styles from "./stroop.module.scss";
import Timer from "../timer";

class Stroop extends React.Component {
  componentDidMount = () => {
    const { colors } = this.props;

    const shakedColors = colors.reduce(acc => {
      const nameNum = random.integer(0, colors.length - 1);
      const colorNum = random.integer(0, colors.length - 1);
      console.log(nameNum, colorNum);

      return [...acc, [colors[nameNum][0], colors[colorNum][1]]];
    }, []);
    this.setState({ shakedColors });
  };

  start = () => {
    this.setState({ isStart: true });
  };
  finish = () => {
    this.setState({ isStart: false, isFinish: true });
  };

  setFinishTime = time => {
    this.setState({ time });
  };

  state = {
    shakedColors: [],
    isStart: false,
    time: "00:00:00"
  };

  render = () => {
    const { shakedColors, isStart, isFinish, time } = this.state;

    return (
      <div>
        {!isStart && !isFinish && (
          <div>
            <p>
              Назовите цвет, которым написано слово. Когда назовёте цвета на
              всех строках, нажмите "Готово!"
            </p>
            <button className={styles.button} onClick={this.start}>
              Начать
            </button>
          </div>
        )}

        {isStart && (
          <div>
            <Timer isStart={isStart} getTime={this.setFinishTime} />

            {shakedColors.map(([name, color], i) => (
              <div key={i} style={{ color, fontSize: "2rem" }}>
                {name}
              </div>
            ))}
            <button className={styles.button} onClick={this.finish}>
              Готово
            </button>
          </div>
        )}

        {isFinish && (
          <div className={styles.alert}>{`Вы справились всего за ${time}`}</div>
        )}
      </div>
    );
  };
}

export default Stroop;
