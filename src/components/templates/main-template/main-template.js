import React from "react";
import Header from "../../molecules/header";
import Box from "../../molecules/box";
import styles from "./main-template.module.scss";

const MainTemplate = ({ children }) => (
  <>
    <Header />
    <div className={styles.wrapper}>
      <Box>{children}</Box>
    </div>
  </>
);

export default MainTemplate;
