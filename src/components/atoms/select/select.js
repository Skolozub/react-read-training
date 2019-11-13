import React, { useState, useRef } from "react";
import cn from "classnames";
import { Scrollbars } from "react-custom-scrollbars";
import useOutsideClick from "../../../hooks/use-outside-click";
import SelectArrow from "./select-arrow";
import styles from "./select.module.scss";

export const SelectView = ({
  input,
  options = [],
  placeholder = "",
  className = "",
  isError = false,
  isOpened = false,
  toggleHandler,
  closeHandler,
  optionsHeight = 180,
  referer
}) => {
  const isValue = ({ value }) => String(input.value) === String(value);

  return (
    <div className={cn(styles.select, className)}>
      <button
        type="button"
        onClick={toggleHandler}
        className={cn("select-header", styles.header, {
          [styles.error]: isError
        })}
      >
        <div
          className={
            input.value
              ? `select-value ${styles.value}`
              : `select-placeholder ${styles.placeholder}`
          }
        >
          {[...options.filter(isValue), { text: placeholder }][0].text}
        </div>
        <SelectArrow />
      </button>
      <div
        ref={referer}
        style={{ height: `${isOpened ? optionsHeight : 0}px` }}
        className={cn(styles.opener, { [styles.opened]: isOpened })}
      >
        <Scrollbars
          style={{ height: `${optionsHeight}px` }}
          className={cn("select-options", styles.options)}
        >
          {options.map(option => (
            <label
              key={option.id}
              htmlFor={`${input.name}${option.id}`}
              className={cn("select-option", styles.option, {
                [styles.active]: isValue(option)
              })}
              onClick={closeHandler}
            >
              <input
                {...input}
                id={`${input.name}${option.id}`}
                type="radio"
                value={option.value}
              />
              {option.text}
            </label>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};

const Select = props => {
  const [isOpened, changeOpen] = useState(false);

  const toggleHandler = () => {
    if (isOpened) return changeOpen(false);
    changeOpen(true);
  };

  const closeHandler = () => isOpened && changeOpen(false);

  const ref = useRef();
  useOutsideClick(ref, closeHandler);

  return (
    <SelectView
      {...{ isOpened, toggleHandler, closeHandler, referer: ref, ...props }}
    />
  );
};

export default Select;
