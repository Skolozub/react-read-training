import React from "react";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../app";
import Clock from "./clock.svg";
import styles from "./finish-stroop.module.scss";

const FinishStroop = () => (
  <StepsTemplate>
    <StoreContext.Consumer>
      {({ isRetryEnable, stroopTest, actions }) => {
        const { changeComponentIndex } = actions;
        const onClickRetryStep = () => changeComponentIndex(index => index - 1);
        const onClickNextStep = () => changeComponentIndex(index => index + 1);

        const { stroopTime } = stroopTest;

        return (
          <div className={styles.wrapper}>
            <Clock />
            <div className={styles.text}>
              Отлично! Ты справился за{" "}
              <span className={styles.bold}>{stroopTime}</span>
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

export default FinishStroop;
