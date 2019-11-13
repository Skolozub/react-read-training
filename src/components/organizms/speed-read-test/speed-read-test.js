import React, { useEffect, useState } from "react";
import random from "random";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../app";
import TestDescription from "../../atoms/test-description";
import { texts } from "../../../constants/speed-read-test";
import styles from "./speed-read-test.module.scss";
import Timer from "../../molecules/timer";

const SpeedReadTest = () => {
  const [text, setText] = useState({});
  useEffect(() => {
    const randomTextNumber = random.int(0, texts.length - 1);
    setText(texts[randomTextNumber]);
  }, []);

  return (
    <StepsTemplate>
      <StoreContext.Consumer>
        {({ speedreadTest, actions }) => {
          const { changeComponentIndex } = actions;
          const onClickStart = () => changeComponentIndex(index => index + 1);

          const { changeSpeedreadText, changeSpeedreadTime } = speedreadTest;
          changeSpeedreadText(text);
          return (
            <>
              <TestDescription>
                Внимательно прочитайте текст, а затем ответьте на несколько
                вопросов
              </TestDescription>
              <div className={styles.time}>
                Время:{" "}
                <span className={styles.bold}>
                  <Timer getTime={changeSpeedreadTime} isStart />
                </span>
              </div>
              <div className={styles.wrapper}>
                <div className={styles.title}>{text.title}</div>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: text.description }}
                />
                <Button onClick={onClickStart}>Прочитал</Button>
              </div>
            </>
          );
        }}
      </StoreContext.Consumer>
    </StepsTemplate>
  );
};

export default SpeedReadTest;
