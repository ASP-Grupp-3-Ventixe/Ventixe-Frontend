import React from "react";
import "./ReviewCard.css";

const ReviewCard = ({ user, rating, date, comment, eventTitle, category }) => {
  return (
    <div className="review-card">
      <div className="review-card__header">
        <span className="review-card__user">{user}</span>
        <span className="review-card__rating">⭐ {rating}</span>
      </div>
      <div className="review-card__date">{date}</div>
      <div className="review-card__comment">"{comment}"</div>
      <div className="review-card__footer">
        <span className="review-card__event">{eventTitle}</span>
        <span className="review-card__category">{category}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
