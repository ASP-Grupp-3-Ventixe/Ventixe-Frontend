import React from "react";
import "./Badge.css";

const Badge = ({ label, bgColor, textColor, icon }) => {
  return (
    <span
      className="badge"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {icon && <img src={icon} alt="icon" />}
      {label}
    </span>
  );
};

export default Badge;
