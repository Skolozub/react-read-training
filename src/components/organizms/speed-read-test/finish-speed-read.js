import React from "react";
import cn from "classnames";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../app";
import Car from "./car.svg";
import styles from "./finish-speed-read.module.scss";

const FinishSpeedRead = () => (
  <StepsTemplate>
    <StoreContext.Consumer>
      {({ isRetryEnable, speedreadTest, actions }) => {
        const { changeComponentIndex } = actions;
        const onClickRetryStep = () => changeComponentIndex(index => index - 2);
        const onClickNextStep = () => changeComponentIndex(index => index + 1);

        const {
          speedreadTime,
          speedreadText,
          setSpeedreadWordsInMinute
        } = speedreadTest;
        const wordsNumber = (
          speedreadText.description.match(/([а-яА-ЯёЁ]+)/g) || []
        ).length;
        console.log("wordsNumber", wordsNumber);

        const [minutes, seconds] = speedreadTime.split(":").map(Number);

        const commonTime = 60 * minutes + seconds || 1;
        const wordsInSecond = Math.floor(wordsNumber / commonTime);
        const wordsInMinute = wordsInSecond * 60;
        setSpeedreadWordsInMinute(wordsInMinute);

        return (
          <div className={styles.wrapper}>
            <Car />
            <div className={cn(styles.text, styles.speedText)}>
              Скорость чтения:{" "}
              <span className={styles.bold}>{wordsInMinute} слов/мин</span>
            </div>
            <div className={cn(styles.text, styles.timeText)}>
              Ты прочитал текст за{" "}
              <span className={styles.bold}>{speedreadTime}</span>
            </div>
            <div className={styles.panel}>
              {isRetryEnable && (
                <Button onClick={onClickRetryStep} color="pink">
                  Еще подход
                </Button>
              )}
              <Button onClick={onClickNextStep}>Следующий тест</Button>
            </div>
          </div>
        );
      }}
    </StoreContext.Consumer>
  </StepsTemplate>
);

export default FinishSpeedRead;
