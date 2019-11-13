import React, { useEffect, useState } from "react";
import random from "random";
import StepsTemplate from "../../templates/steps-template";
import Button from "../../atoms/button";
import { StoreContext } from "../../../app";
import TestDescription from "../../atoms/test-description";
import styles from "./shulte-test.module.scss";
import Schulte from "../../molecules/schulte/schulte";
import { shulteOptions } from "./schulte.options";

const SchulteTest = () => {
  return (
    <StepsTemplate>
      <StoreContext.Consumer>
        {({ schulteTest, actions }) => {
          const { changeComponentIndex } = actions;
          const { changeSchulteTime } = schulteTest;

          return (
            <>
              <TestDescription>
                Стараясь смотреть на область в центре, максимально быстро
                найдите буквы от А до Д
              </TestDescription>
              <div className={styles.wrapper}>
                <Schulte
                  {...{
                    ...shulteOptions,
                    changeSchulteTime,
                    changeComponentIndex
                  }}
                />
              </div>
            </>
          );
        }}
      </StoreContext.Consumer>
    </StepsTemplate>
  );
};

export default SchulteTest;
