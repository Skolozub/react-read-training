import React, { useEffect, useState } from "react";
import random from "random";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../app";
import TestDescription from "../../atoms/test-description";
import { colors } from "../../../constants/stroop-test";
import Timer from "../../molecules/timer";
import styles from "./stroop-test.module.scss";

const StroopTest = () => {
  const [randColors, setRandColors] = useState([]);
  const [rightCombination, setRightCombination] = useState([]);
  const [answersCombinations, setAnswersCombinations] = useState([]);

  useEffect(() => {
    const randColorsArray = [...Array(4)].reduce(
      acc => {
        const randNum = random.int(0, acc[1].length - 1);
        const { [randNum]: randColor, ...rest } = acc[1];
        return [[...acc[0], randColor], Object.values(rest)];
      },
      [[], colors]
    )[0];
    setRightCombination(randColorsArray);
    console.log("randColorsArray", randColorsArray);

    const shakedColors = randColorsArray.reduce(
      (acc, [_, hex]) => {
        const randNum = random.int(0, acc[1].length - 1);
        const { [randNum]: randNewName, ...restAcc } = acc[1];

        return [[...acc[0], [randNewName[0], hex]], Object.values(restAcc)];
      },
      [[], randColorsArray]
    )[0];
    setRandColors(shakedColors);
    console.log("shakedColors", shakedColors);

    const answerVariants = [...Array(3)].map((_, i) => {
      const maxElement = randColorsArray.length;
      const shift = i + 1;

      const shakedNamesAnswers = randColorsArray.reduce(
        (acc, [name], currentPosition) => {
          const newPosition = currentPosition + shift;
          return newPosition < maxElement
            ? { ...acc, [newPosition]: name }
            : { ...acc, [newPosition % maxElement]: name };
        },
        {}
      );
      return Object.values(shakedNamesAnswers);
    });
    console.log("answerVariants", answerVariants);

    const f = (arr, result = []) => {
      if (arr.length === 0) return arr;

      const randPos = random.int(0, arr.length - 1);
      if (result[randPos]) f(arr, result);

      const { 0: newElt, ...rest } = arr;
      console.log("rest", rest);

      f(Object.values(rest, { ...result, [randPos]: newElt }));
    };

    setAnswersCombinations();
  }, []);

  return (
    <StepsTemplate>
      <StoreContext.Consumer>
        {({ speedreadTest, actions }) => {
          const { changeComponentIndex } = actions;
          const onClickStart = () => changeComponentIndex(index => index + 1);

          const { changeSpeedreadText, changeSpeedreadTime } = speedreadTest;

          return (
            <>
              <TestDescription>
                Выберите правильную комбинацию цветов (порядок: слева направо)
              </TestDescription>
              <div className={styles.time}>
                Время:{" "}
                <span className={styles.bold}>
                  <Timer getTime={changeSpeedreadTime} isStart />
                </span>
              </div>
              <div className={styles.wrapper}>
                <div className={styles.colors}>
                  {randColors.map(([name, hex], i) => (
                    <div
                      className={styles.color}
                      key={i}
                      style={{ color: hex }}
                    >
                      {name.replace(/^./, $1 => $1.toUpperCase())}
                    </div>
                  ))}
                </div>
                <Button onClick={onClickStart}>
                  {rightCombination.map(([name]) => name).join("-")}
                </Button>
              </div>
            </>
          );
        }}
      </StoreContext.Consumer>
    </StepsTemplate>
  );
};

export default StroopTest;
