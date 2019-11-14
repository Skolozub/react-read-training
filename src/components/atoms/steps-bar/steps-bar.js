import React from "react";
import cn from "classnames";
import styles from "./steps-bar.module.scss";
import First from "./first.svg";
import Right from "./right.svg";
import Left from "./left.svg";
import { StoreContext } from "../../../app";

const StepsBar = ({ steps, activeNum }) => (
  <StoreContext.Consumer>
    {({ componentIndex }) => {
      return (
        <div className={styles.wrapper}>
          {steps.map(({ name, activeArr }, i) =>
            i === 0 ? (
              <div
                key={i}
                className={cn(styles.step, {
                  [styles.active]: activeArr.includes(componentIndex)
                })}
              >
                <First />
                <div className={styles.stepName}>{name}</div>
                <Right />
              </div>
            ) : (
              <div
                key={i}
                className={cn(styles.step, {
                  [styles.active]: activeArr.includes(componentIndex)
                })}
              >
                <Left />
                <div className={styles.stepName}>{name}</div>
                <Right />
              </div>
            )
          )}
        </div>
      );
    }}
  </StoreContext.Consumer>
);

export default StepsBar;
