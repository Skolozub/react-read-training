import React from "react";
import random from "random";
import Timer from "../timer";
import styles from "./speed-read.module.scss";

class SpeedRead extends React.Component {
  state = {
    text: {},
    isNotStart: true,
    isAnswersValid: true,
    isShowText: false,
    isShowQuestions: false,
    isShowResult: false,
    isStartTimer: true,
    userAnswers: {},
    finishTime: "00:00:00",
    result: 0
  };

  getRandomText = () => {
    const { texts } = this.props;
    const randomTextNumber = random.int(0, texts.length - 1);

    this.setState({ text: texts[randomTextNumber] });
  };

  componentDidMount = () => {
    this.getRandomText();
  };

  showQuestions = () => {
    this.setState({
      isStartTimer: false,
      isShowQuestions: true,
      isShowText: false
    });
  };

  onChangeHandler = e => {
    const { name, value } = e.currentTarget;

    this.setState(({ userAnswers }) => ({
      userAnswers: { ...userAnswers, [name]: value }
    }));
  };

  checkResult = () => {
    const { text, userAnswers } = this.state;
    const { rightAnswers } = text;
    const result = [0, 25, 50, 75, 100];

    const isAnswersValid =
      Object.values(userAnswers).length === rightAnswers.length;

    const rightAnswersNumber = Object.values(userAnswers).reduce(
      (acc, uanswer, i) => acc + +(+rightAnswers[i] === +uanswer),
      0
    );

    this.setState({
      isAnswersValid,
      isShowQuestions: !isAnswersValid,
      isShowResult: isAnswersValid,
      result: result[rightAnswersNumber]
    });
  };

  setFinishTime = time => {
    this.setState({ finishTime: time });
  };

  start = () => {
    this.setState({ isNotStart: false, isShowText: true });
  };

  render = () => {
    const {
      text,
      isAnswersValid,
      isNotStart,
      isShowText,
      isShowQuestions,
      isShowResult,
      isStartTimer,
      finishTime,
      result
    } = this.state;

    return (
      <div>
        {isShowText && (
          <>
            <Timer isStart={isStartTimer} getTime={this.setFinishTime} />
            <h1 className={styles.header}>{text.title}</h1>
            <div className={styles.text}>{text.description}</div>
          </>
        )}

        {isShowQuestions && (
          <ul>
            {text.questions.map(({ question, answers }, i) => (
              <li key={i}>
                <p className={styles.question}>{question}</p>
                {answers.map((answer, j) => (
                  <label key={j} className={styles.label}>
                    <input
                      type="radio"
                      name={i}
                      value={j}
                      onChange={this.onChangeHandler}
                    />
                    {answer}
                  </label>
                ))}
              </li>
            ))}
          </ul>
        )}

        {isShowResult && (
          <div>
            <p>{`Вы прочитали текст за ${finishTime}.`}</p>
            <p>{`Понимание текста на ${result}%.`}</p>
          </div>
        )}

        {!isAnswersValid && (
          <div className={styles.alert}>Необходимо ответить на все вопросы</div>
        )}

        {isNotStart && (
          <div>
            <p>
              Прочитайте текст, затем нажмите на кнопку "Прочитал!" и ответьте
              на несколько вопросов.
            </p>
            <button className={styles.button} onClick={this.start}>
              Начать
            </button>
          </div>
        )}
        {isShowText && (
          <button className={styles.button} onClick={this.showQuestions}>
            Прочитал
          </button>
        )}
        {isShowQuestions && (
          <button className={styles.button} onClick={this.checkResult}>
            Готово
          </button>
        )}
      </div>
    );
  };
}

export default SpeedRead;
