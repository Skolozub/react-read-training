import React from "react";
import Container from "../../atoms/container";
import styles from "./box.module.scss";

const Box = ({ children }) => (
  <Container>
    <div className={styles.wrapper}>{children}</div>
  </Container>
);

export default Box;
