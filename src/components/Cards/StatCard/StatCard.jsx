import React from "react";
import "./StatCard.css";
import statCardIcon from "../../../assets/images/statcard-image.svg";

const StatCard = ({ label, value, percentage, positive }) => {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        <img src={statCardIcon} alt="Statistik Ikon" />
      </div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
      {percentage !== undefined && (
        <div
          className={`stat-card__percentage ${
            positive ? "positive" : "negative"
          }`}
        >
          {positive ? "+" : "-"}
          {percentage}%
        </div>
      )}
    </div>
  );
};

export default StatCard;
