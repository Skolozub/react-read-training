import React, { useState } from "react";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../app";
import styles from "./speed-read-questions.module.scss";

const SpeedReadQuestions = () => {
  const [error, serError] = useState(false);
  return (
    <StepsTemplate>
      <StoreContext.Consumer>
        {({ speedreadTest, actions }) => {
          const {
            speedreadText,
            speedreadAnswers,
            changeSpeedreadAnswers
          } = speedreadTest;
          const { changeComponentIndex } = actions;
          const onClickStart = () => {
            if (
              speedreadText.rightAnswers.length ===
              Object.keys(speedreadAnswers).length
            ) {
              changeComponentIndex(index => index + 1);
            }
            serError(true);
          };

          const onChangeHandler = e => {
            const { name, value } = e.target;

            changeSpeedreadAnswers(answers => ({
              ...answers,
              [name]: Number(value)
            }));
          };

          return (
            <div className={styles.wrapper}>
              <ul className={styles.questions}>
                {speedreadText.questions.map(({ question, answers }, i) => (
                  <li key={i} className={styles.questionBlock}>
                    <p className={styles.question}>{question}</p>
                    {answers.map((answer, j) => (
                      <label key={j} className={styles.label}>
                        <input
                          type="radio"
                          name={i}
                          value={j}
                          onChange={onChangeHandler}
                        />
                        <div className={styles.box} />

                        {answer}
                      </label>
                    ))}
                  </li>
                ))}
              </ul>
              {error && (
                <div className={styles.error}>
                  Вы не дали ответы на все вопросы
                </div>
              )}
              <Button onClick={onClickStart}>Ответить</Button>
            </div>
          );
        }}
      </StoreContext.Consumer>
    </StepsTemplate>
  );
};

export default SpeedReadQuestions;
