import React from "react";
import "./buttoncs.css";
const Button = ({ onClick, children }) => {
  return (
    <div>
      <button className="button-btn" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
