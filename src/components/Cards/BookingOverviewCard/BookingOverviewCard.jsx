import React from "react";
import "./BookingOverviewCard.css";
import bookingsImage from "../../../assets/images/booking-graph.svg";

const BookingOverviewCard = () => {
  return (
    <div className="booking-card">
      <div className="booking-header">
        <h2>Bookings Overview</h2>
        <button className="time-button">This Week</button>
      </div>
      <img
        src={bookingsImage}
        alt="Bookings graph"
        className="bookings-image"
      />
    </div>
  );
};

export default BookingOverviewCard;
