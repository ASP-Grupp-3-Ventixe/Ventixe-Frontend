import React from "react";
import "./EventCard.css";

const EventCard = ({
  category,
  title,
  location,
  date,
  time,
  ticketSold,
  ticketsLeft,
  price,
}) => {
  return (
    <div className="event-card">
      <div className="event-card__category">{category}</div>
      <h2 className="event-card__title">{title}</h2>
      <p className="event-card__location">{location}</p>
      <p className="event-card__datetime">
        {date} – {time}
      </p>

      <div className="event-card__progress">
        <div className="event-card__progress-bar">
          <div
            className="event-card__progress-fill"
            style={{ width: `${ticketSold}%` }}
          />
        </div>
        <div className="event-card__ticket-info">
          <span>{ticketSold}% Ticket Sold</span>
          <span>{ticketsLeft} Tickets Left</span>
        </div>
        <div className="event-card__price">${price}</div>
      </div>
    </div>
  );
};

export default EventCard;
