import React from "react";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../app";
import styles from "./finish-step.module.scss";

const speedReadTable = {
  7: { f: 20, t: 40 },
  8: { f: 40, t: 70 },
  9: { f: 70, t: 100 },
  10: { f: 100, t: 110 },
  11: { f: 110, t: 120 },
  12: { f: 120, t: 130 },
  13: { f: 130, t: 140 },
  14: { f: 140, t: 150 },
  15: { f: 150, t: 160 },
  16: { f: 160, t: 201 }
};

const speedReadTexts = [
  "Ты молодец, но нужно поработать над скоростью чтения!",
  "Ты читаешь очень хорошо!",
  "Великолепно! Твоей скорости чтения можно позавидовать!"
];

const speedReadTextsAnswers = [
  "0% запоминания… Память требует тренировки…",
  "Неплохо, но нужно еще тренироваться!",
  "Запомнил половину! Супер! Но есть к чему стремиться!",
  "Запомнил почти всё!",
  "Отличный уровень запоминания!"
];

const stroopTexts = [
  "Внимание на высоте!",
  "Будь внимательнее! Упражнения помогут тебе в этом."
];

const FinishStep = () => (
  <StepsTemplate>
    <StoreContext.Consumer>
      {({ isRetryEnable, startStep, stroopTest, speedreadTest, actions }) => {
        const { changeComponentIndex } = actions;
        const onClickRetryTest = () => changeComponentIndex(0);

        const { age } = startStep;
        const {
          speedreadWordsInMinute,
          speedreadText,
          speedreadAnswers
        } = speedreadTest;
        const fromTo = speedReadTable[age];

        const getSpeedReadRaiting = fromToData => {
          if (speedreadWordsInMinute < fromToData.f) return speedReadTexts[0];
          if (speedreadWordsInMinute > fromToData.t) return speedReadTexts[2];

          return speedReadTexts[1];
        };

        const speedReadRating = getSpeedReadRaiting(fromTo);

        const getNumOfRightAnswers = () => {
          const { rightAnswers } = speedreadText;

          return Object.values(rightAnswers).reduce(
            (acc, ans, i) => acc + Number(ans === speedreadAnswers[i]),
            0
          );
        };
        const numOfRightAnswers = getNumOfRightAnswers();
        const rightAnswersRaiting = speedReadTextsAnswers[numOfRightAnswers];
        const rightAnswersPercent = `${numOfRightAnswers * 25}%`;

        const { stroopAnswer } = stroopTest;
        const memoryRaiting = stroopTexts[Number(stroopAnswer)];

        return (
          <div className={styles.wrapper}>
            <div className={styles.statistic}>
              <div className={styles.leftSide}>
                <div className={styles.titel}>Скорость</div>
                <div className={styles.description}>{speedReadRating}</div>
                <div className={styles.titel}>Память</div>
                <div className={styles.description}>{rightAnswersRaiting}</div>
                <div className={styles.titel}>Внимание</div>
                <div className={styles.description}>{memoryRaiting}</div>
              </div>
              <div className={styles.rightSide}>
                <div className={styles.titel}>Общая точность ответов</div>
                <div className={styles.ball}>
                  <div
                    className={styles.progress}
                    style={{ height: rightAnswersPercent }}
                  />
                  <div className={styles.percent}>{rightAnswersPercent}</div>
                </div>
              </div>
            </div>

            <div className={styles.panel}>
              {isRetryEnable && (
                <Button onClick={onClickRetryTest} color="pink">
                  Еще подход
                </Button>
              )}
              <Button href="/">Вернуться на сайт</Button>
            </div>
          </div>
        );
      }}
    </StoreContext.Consumer>
  </StepsTemplate>
);

export default FinishStep;
