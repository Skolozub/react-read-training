import React from "react";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../app";
import Clock from "./clock.svg";
import styles from "./finish-schulte.module.scss";

const FinishSchulte = () => (
  <StepsTemplate>
    <StoreContext.Consumer>
      {({ isRetryEnable, actions }) => {
        const { changeComponentIndex } = actions;
        const onClickRetryStep = () => changeComponentIndex(index => index - 1);
        const onClickNextStep = () => changeComponentIndex(index => index + 1);

        return (
          <div className={styles.wrapper}>
            <Clock />
            <div className={styles.text}>
              Отлично! Ты справился за{" "}
              <span className={styles.bold}>00:08</span>
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
