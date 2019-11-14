import React from "react";
import StepsTemplate from "../../templates/steps-template";
import { StoreContext } from "../../../index";
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
                Стараясь смотреть на область в центре, максимально быстро найдите и кликните на буквы от А до З в алфавитном порядке
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
