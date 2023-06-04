import React from "react";
import classnames from "classnames";
import "./button.scss";

/**
 * 
 * @param {type} 'confirm', 'delete'
 */
const Button = ({ children, type, classname }) => {
  return <button className={classnames("btn", classname, {
    'is-confirm' : type === 'corfirm',
    'is-delete' : type === 'delete'
  })}>{children}</button>;
};

export default Button;
