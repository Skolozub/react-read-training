import React from "react";
import Header from "../../molecules/header";
import Box from "../../molecules/box";
import styles from "./steps-template.module.scss";

const StepsTemplate = ({ children }) => (
  <>
    <Header />
    <div className={styles.wrapper}>
      <Box>{children}</Box>
    </div>
  </>
);

export default StepsTemplate;
