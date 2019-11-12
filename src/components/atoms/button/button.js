import React from "react";
import cn from "classnames";
import styles from "./button.module.scss";

const Button = ({ color = "darkpink", children, ...props }) => (
  <button {...props} className={cn(styles.button, styles[color])}>
    {children}
  </button>
);

export default Button;
