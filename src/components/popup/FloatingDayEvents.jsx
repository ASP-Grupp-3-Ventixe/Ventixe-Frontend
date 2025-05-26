import React from 'react';
import './FloatingDayEvents.css'; // Skapa denna fil för stilen
import {FiX} from 'react-icons/fi';

const FloatingDayEvents = ({ events, onClose, onEventClick }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="floating-overlay">
      <div className="floating-modal">
        <button className="close-button" onClick={onClose}>
                        <FiX size={50} />
                      </button>
        <h3 className="floating-title">Events</h3>
        {events.map((event, index) => {
          const time = new Date(event.start).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          });

          const categoryColors = {
  Concert: '#fcd3fe',  // rosa
  Sport: '#fcd3fe',
  Film: '#fcd3fe',
  Food: '#fcd3fe',
  Meetings: '#eeefff', // blå
  Other: '#fcd3fe',
};

          const backgroundColor = categoryColors[event.category] || '#E0E0E0';

          return (
            <div
              key={index}
              className="custom-event"
              style={{
                backgroundColor,
                borderRadius: '4px',
                padding: '4px',
                marginBottom: '6px',
                cursor: 'pointer'
              }}
              onClick={() => {
                onEventClick(event);
                onClose();
              }}
            >
              <div className="event-title">{event.title}</div>
              <div className="event-time">{time}</div>
              <div className="event-category">{event.category}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingDayEvents;
