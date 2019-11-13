import React from "react";
import styles from "./test-description.module.scss";

const TestDescription = ({ children }) => (
  <div className={styles.description}>{children}</div>
);

export default TestDescription;
