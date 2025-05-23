import React from "react";
import "./BookingCategoryCard.css";
import donutImage from "../../../assets/images/booking-category-image.svg";

const BookingCategoryCard = ({ categories }) => {
  return (
    <div className="booking-category-card">
      <div className="category-header">
        <h2>Bookings Category</h2>
        <button className="week-button">This Week</button>
      </div>

      <div className="top-section">
        <div className="donut-image-wrapper">
          <img src={donutImage} alt="Total Bookings Chart" />
        </div>

        <div className="category-bars">
          {categories.map((cat) => (
            <div key={cat.name} className="category-row">
              <span>
                {cat.name} <small>({cat.percent}%)</small>
              </span>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{
                    width: `${cat.percent}%`,
                    backgroundColor: cat.color,
                  }}
                ></div>
              </div>
              <strong>{cat.count.toLocaleString()}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingCategoryCard;
