import React from "react";
import MainTemplate from "../../templates/main-template";
import Select from "../../atoms/select/select";
import Button from "../../atoms/button";
import { StoreContext } from "../../../index";
import styles from "./start-step.module.scss";

const ages = [
  { id: "def", value: "default", text: "Выберите возраст" },
  { id: 7, value: 7, text: "7 лет и младше" },
  { id: 8, value: 8, text: "8 лет" },
  { id: 9, value: 9, text: "9 лет" },
  { id: 10, value: 10, text: "10 лет" },
  { id: 11, value: 11, text: "11 лет" },
  { id: 12, value: 12, text: "12 лет" },
  { id: 13, value: 13, text: "13 лет" },
  { id: 14, value: 14, text: "14 лет" },
  { id: 15, value: 15, text: "15 лет" },
  { id: 16, value: 16, text: "16 лет и старше" }
];

const StartStep = () => (
  <MainTemplate>
    <StoreContext.Consumer>
      {({ startStep, actions, speedreadTest }) => {
        const { age, error, changeAgeState } = startStep;
        const onChangeAge = e => {
          changeAgeState({
            age: e.currentTarget.value,
            error: false
          });
        };
        const { changeSpeedreadAnswers } = speedreadTest;
        const { changeComponentIndex } = actions;

        const onClickStart = () => {
          if (age !== "default") {
            changeComponentIndex(index => index + 1);
            changeSpeedreadAnswers({});
            return null;
          }

          changeAgeState(state => ({ ...state, error: true }));
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
