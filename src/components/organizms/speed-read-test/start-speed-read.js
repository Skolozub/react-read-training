import React from "react";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../index";
import styles from "./start-speed-read.module.scss";

const StartSpeedRead = () => (
  <StepsTemplate>
    <StoreContext.Consumer>
      {({ actions }) => {
        const { changeComponentIndex } = actions;
        const onClickStart = () => changeComponentIndex(index => index + 1);

        return (
          <div className={styles.wrapper}>
            <div className={styles.text}>
              Внимательно прочитайте текст, а затем ответьте на несколько
              вопросов
            </div>
            <Button onClick={onClickStart}>Начать</Button>
          </div>
        );
      }}
    </StoreContext.Consumer>
  </StepsTemplate>
);

export default StartSpeedRead;
