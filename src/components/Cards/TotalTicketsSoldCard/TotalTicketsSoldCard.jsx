import React from "react";
import "./TotalTicketsSoldCard.css";
import ticketSoldCard from "../../../assets/images/statcard-image.svg";

const TotalTicketsSoldCard = ({ label, value, percentage, positive }) => {
  return (
    <div className="total-card">
      <div className="total__icon">
        <img src={ticketSoldCard} alt="Total Tickets sold Icon" />
      </div>
      <div className="total_value">{value}</div>
      <div className="total__label">{label}</div>
      {percentage !== undefined && (
        <div
          className={`total__percentage ${positive ? "positive" : "negative"}`}
        >
          {positive ? "+" : "-"}
          {percentage}%
        </div>
      )}
    </div>
  );
};

export default TotalTicketsSoldCard;
