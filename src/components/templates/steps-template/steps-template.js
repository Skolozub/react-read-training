import React from "react";
import Header from "../../molecules/header";
import Box from "../../molecules/box";
import styles from "./steps-template.module.scss";
import StepsBar from "../../atoms/steps-bar";
import Container from "../../atoms/container";

const steps = [
  { name: "Боковое зрение", activeArr: [1, 2, 3] },
  { name: "Скоростное чтение", activeArr: [4, 5, 6, 7] },
  { name: "Гибкость мышления", activeArr: [8, 9, 10] },
  { name: "Результаты", activeArr: [11] }
];

const StepsTemplate = ({ children }) => (
  <>
    <Header />
    <div className={styles.stepper}>
      <Container>
        <StepsBar steps={steps} />
      </Container>
    </div>

    <div className={styles.wrapper}>
      <Box>{children}</Box>
    </div>
  </>
);

export default StepsTemplate;
