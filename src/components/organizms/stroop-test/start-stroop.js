import React from "react";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../index";
import styles from "./start-stroop.module.scss";

const StartStroop = () => (
  <StepsTemplate>
    <StoreContext.Consumer>
      {({ actions }) => {
        const { changeComponentIndex } = actions;
        const onClickStart = () => changeComponentIndex(index => index + 1);

        return (
          <div className={styles.wrapper}>
            <div className={styles.text}>
              Выберите правильную комбинацию цветов (порядок: слева направо)
            </div>
            <Button onClick={onClickStart}>Начать</Button>
          </div>
        );
      }}
    </StoreContext.Consumer>
  </StepsTemplate>
);

export default StartStroop;
