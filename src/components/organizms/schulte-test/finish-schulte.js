import React from "react";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../index";
import Clock from "./clock.svg";
import styles from "./finish-schulte.module.scss";

const FinishSchulte = () => (
  <StepsTemplate>
    <StoreContext.Consumer>
      {({ isRetryEnable, schulteTest, actions }) => {
        const { changeComponentIndex } = actions;
        const onClickRetryStep = () => changeComponentIndex(index => index - 1);
        const onClickNextStep = () => changeComponentIndex(index => index + 1);

        const { schulteTime } = schulteTest;
        return (
          <div className={styles.wrapper}>
            <Clock />
            <div className={styles.text}>
              Отлично! Ты справился за{" "}
              <span className={styles.bold}>{schulteTime}</span>
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

export default FinishSchulte;
