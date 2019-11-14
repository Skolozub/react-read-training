import React from "react";
import cn from "classnames";
import styles from "./button.module.scss";

const Button = ({ color = "darkpink", children, ...props }) => {
  const Component = props.href ? "a" : "button";
  return (
    <Component {...props} className={cn(styles.button, styles[color])}>
      {children}
    </Component>
  );
};

export default Button;
