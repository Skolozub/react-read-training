import React from "react";
import MainTemplate from "../../templates/main-template";
import Select from "../../atoms/select/select";
import Button from "../../atoms/button";
import { getAgesOptions } from "../../../functions/generate-age";
import styles from "./start-step.module.scss";
import { StoreContext } from "../../../app";

const ages = getAgesOptions(8, 99, [
  { id: "def", value: "default", text: "Выберите возраст" },
  { id: 7, value: 7, text: "7 лет и младше" }
]);

const StartStep = () => (
  <MainTemplate>
    <StoreContext.Consumer>
      {({ startStep, actions }) => {
        const { age, error, changeAgeState } = startStep;
        const onChangeAge = e => {
          changeAgeState({
            age: e.currentTarget.value,
            error: false
          });
        };

        const { changeComponentIndex } = actions;
        const onClickStart = () => {
          changeAgeState(state => ({ ...state, error: true }));
          if (age !== "default") changeComponentIndex(index => index + 1);
        };

        return (
          <div className={styles.wrapper}>
            <div className={styles.text}>
              Привет! До начала тренировки, пожалуйста, укажи, сколько тебе лет
            </div>
            <div className={styles.panel}>
              <Select
                input={{
                  name: "age",
                  value: age,
                  onChange: onChangeAge
                }}
                isError={error}
                options={ages}
              />
              <Button onClick={onClickStart}>Начать</Button>
            </div>
          </div>
        );
      }}
    </StoreContext.Consumer>
  </MainTemplate>
);

export default StartStep;
