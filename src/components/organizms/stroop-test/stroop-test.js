import React, { useEffect, useState } from "react";
import random from "random";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../index";
import TestDescription from "../../atoms/test-description";
import { colors } from "../../../constants/stroop-test";
import Timer from "../../molecules/timer";
import styles from "./stroop-test.module.scss";

const StroopTest = () => {
  const [randColors, setRandColors] = useState([]);
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

    const shakedColors = randColorsArray.reduce(
      (acc, [_, hex]) => {
        const randNum = random.int(0, acc[1].length - 1);
        const { [randNum]: randNewName, ...restAcc } = acc[1];

        return [[...acc[0], [randNewName[0], hex]], Object.values(restAcc)];
      },
      [[], randColorsArray]
    )[0];
    setRandColors(shakedColors);

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

    const shakeAnwersArray = (arr, maxElt, result = {}) => {
      if (arr.length === 0) return result;
      const randPos = random.int(0, maxElt);
      if (result[randPos]) return shakeAnwersArray(arr, maxElt, result);

      const { 0: newElt, ...rest } = arr;

      return shakeAnwersArray(Object.values(rest), maxElt, {
        ...result,
        [randPos]: newElt
      });
    };

    const shakedAnswersCombinations = shakeAnwersArray(
      [
        ...answerVariants.map(elt => [elt, false]),
        [randColorsArray.map(([name]) => name), true]
      ],
      3
    );

    setAnswersCombinations(Object.values(shakedAnswersCombinations));
  }, []);

  return (
    <StepsTemplate>
      <StoreContext.Consumer>
        {({ stroopTest, actions }) => {
          const { changeComponentIndex } = actions;
          const { setStroopAnswer, changeStroopTime } = stroopTest;
          const onClickStart = status => {
            setStroopAnswer(status);
            changeComponentIndex(index => index + 1);
          };

          return (
            <>
              <TestDescription>
                Выберите правильную комбинацию цветов (порядок: слева направо)
              </TestDescription>
              <div className={styles.time}>
                Время:{" "}
                <span className={styles.bold}>
                  <Timer getTime={changeStroopTime} isStart />
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
                <div className={styles.buttons}>
                  {answersCombinations.map(([names, status], i) => (
                    <div key={i} className={styles.button}>
                      <Button onClick={() => onClickStart(status)} color="pink">
                        {names.join("-")}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        }}
      </StoreContext.Consumer>
    </StepsTemplate>
  );
};

export default StroopTest;
