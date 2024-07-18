import React from "react";

const Button = ({ key, children, onClicked, isActivated, title }) => {
  return (
    // <button key={key} onClick={onClicked} className={proprety === isActivated? 'active': null}>
    <button
      key={key}
      onClick={onClicked}
      className={isActivated ? "active" : ""}
    >
      {children}
      <p>{title}</p>
    </button>
  );
};

export default Button;
