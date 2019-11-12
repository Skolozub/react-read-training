import React from "react";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../app";
import styles from "./start-shulte.module.scss";

const StartSchulte = () => (
  <StepsTemplate>
    <StoreContext.Consumer>
      {({ actions }) => {
        const { changeComponentIndex } = actions;
        const onClickStart = () => changeComponentIndex(index => index + 1);

        return (
          <div className={styles.wrapper}>
            <div className={styles.text}>
              Стараясь смотреть на область в центре, максимально быстро найдите
              буквы от А до Д
            </div>
            <Button onClick={onClickStart}>Начать</Button>
          </div>
        );
      }}
    </StoreContext.Consumer>
  </StepsTemplate>
);

export default StartSchulte;
