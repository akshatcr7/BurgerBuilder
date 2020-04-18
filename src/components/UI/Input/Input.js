import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          className={classes.InputElement}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          className={classes.InputElement}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          value={props.value}
          className={classes.InputElement}
          onChange={props.changed}>
              {props.elementConfig.options.map(option => (
                  <option key={option.value} value={option.value}>{option.displayValue}</option>
              ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          className={classes.InputElement}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
