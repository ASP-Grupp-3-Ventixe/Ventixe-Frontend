import React from 'react';
import './EventModal.css'; // Om du vill styla separat

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{event.title}</h2>
        <p><strong>Start Date:</strong> {new Date(event.start).toLocaleString()}</p>
        <p><strong>End Date:</strong> {new Date(event.end).toLocaleString()}</p>
        {event.description && <p><strong>Description:</strong> {event.description}</p>}
        <button onClick={onClose}>CLOSE</button>
      </div>
    </div>
  );
};

export default EventModal;
