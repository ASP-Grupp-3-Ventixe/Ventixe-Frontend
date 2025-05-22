import React from 'react';
import './EventModal.css'; // Om du vill styla separat

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  console.log("Selected event:", event); // 👈 Lägg till detta

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{event.title}</h2>
        <p><strong>Start Date:</strong> {new Date(event.start).toLocaleString()}</p>
        <p><strong>End Date:</strong> {new Date(event.end).toLocaleString()}</p>

        {/* Här är lösningen – visa plats och adress om de finns */}
        {event.location ? (
          <p><strong>Location:</strong> {event.location}</p>
        ) : (
          <p><strong>Location:</strong> Ej angiven</p>
        )}

        {event.address ? (
          <p><strong>Address:</strong> {event.address}</p>
        ) : (
          <p><strong>Address:</strong> Ej angiven</p>
        )}

        <button onClick={onClose}>CLOSE</button>
      </div>
    </div>
  );
};


export default EventModal;
