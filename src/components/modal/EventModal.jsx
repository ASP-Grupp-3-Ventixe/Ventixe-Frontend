import React from 'react';
import { FiMapPin, FiClock, FiCalendar, FiX, FiGrid, FiInfo,} from 'react-icons/fi';
import { BsCurrencyDollar } from 'react-icons/bs';
import './EventModal.css';

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <FiX size={50} />
        </button>
        <h2 className="modal-title">{event.title}</h2>

        <div className="modal-row">
          <FiCalendar className="modal-icon" />
          <div>
            <div className="modal-label">Start Date:</div>
            <div className="modal-value">{new Date(event.start).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="modal-row">
          <FiMapPin className="modal-icon" />
          <div>
            <div className="modal-label">Location:</div>
            <div className="modal-value">{event.location || "Ej angiven"}</div>
          </div>
        </div>

        <div className="modal-row">
          <FiGrid className="modal-icon" />
          <div>
            <div className="modal-label">Category:</div>
            <div className="modal-value">{event.category || "Ej angiven"}</div>
          </div>
        </div>
        <div className="modal-row">
         {event.price > 0 && (
  <>
    <BsCurrencyDollar className="modal-icon" />
    <div>
      <div className="modal-label">Price:</div>
      <div className="modal-value">{event.price}</div>
    </div>
  </>
)}
        </div>
        <div className="modal-row">
          <FiInfo className="modal-icon" />
          <div>
            <div className="modal-label">Description:</div>
            <div className="modal-value">{event.description|| "Ej angiven"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
