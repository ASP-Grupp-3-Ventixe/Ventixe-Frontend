import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css';
import '../button/Button.css';
import { FiChevronDown, FiCalendar } from 'react-icons/fi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import EventModal from '../modal/EventModal';
import FloatingDayEvents from '../popup/FloatingDayEvents';


const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupEvents, setPopupEvents] = useState([]);
  const [floatingPosition, setFloatingPosition] = useState(null);


  useEffect(() => {
    fetch('https://calendarprovider-cvhugne4gzf3hwb8.swedencentral-01.azurewebsites.net/api/Calendar')
      .then((response) => response.json())
      .then((data) => {
        const mappedEvents = data.map((evt) => {
          const start = new Date(evt.startTime);
          const end = evt.isAllDay
            ? start
            : new Date(start.getTime() + 60 * 60 * 1000);
          return {
            title: evt.title,
            start,
            end,
            location: evt.location,
            allDay: evt.isAllDay,
            status: evt.status,
            category: evt.category,
            description: evt.description,
            price: evt.price
          };
        });
        setEvents(mappedEvents);
      })
      .catch((error) => {
        console.error("Kunde inte hämta events:", error);
      });
  }, []);

  const handleViewChange = useCallback((newView) => {
  setView(newView);
  setFloatingPosition(null);
}, []);

const handleNavigate = useCallback((newDate) => {
  setDate(newDate);
  setFloatingPosition(null); 
}, []);

 const CustomEvent = ({ event }) => {
  const eventsForDay = events.filter(
    e => e.start.toDateString() === event.start.toDateString()
  );
  const isFirst = eventsForDay[0] === event;

  if (!isFirst) return null;

  const startTime = new Date(event.start).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
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
    <>
      {/* Event-rutan */}
      <div
        className="custom-event"
        style={{
          backgroundColor,
          borderRadius: '4px',
          padding: '4px',
          marginBottom: '2px'
        }}
      >
        <div className="event-title">{event.title}</div>
        <div className="event-time">{startTime}</div>
        <div className="event-category">{event.category}</div>
      </div>

      {/* +X more, utanför event-rutan */}
      {eventsForDay.length > 1 && (
        <div
          className="more-events"
          style={{
            fontSize: '11px',
            color: '#6366f1',
            cursor: 'pointer',
            fontWeight: 500,
            marginLeft: '6px',
            marginTop: '2px'
          }}
            onClick={(e) => {
  e.stopPropagation();

  const otherEvents = eventsForDay.slice(1);
  setPopupEvents(otherEvents);
setFloatingPosition({ center: true });

  
}}
        >
          +{eventsForDay.length - 1} more event{eventsForDay.length - 1 > 1 ? 's' : ''}
        </div>
      )}
    </>
  );
};



  const CustomToolbar = ({ label, onNavigate, onView, view }) => {
    return (
      <div className="rbc-toolbar custom-toolbar">
        <div className="nav-left">
          <button className="nav-btn" onClick={() => onNavigate('PREV')}>
            <FiChevronLeft className="side-arrow" />
          </button>
          <span className="calendar-label">{label}</span>
          <button className="nav-btn" onClick={() => onNavigate('NEXT')}>
            <FiChevronRight className="side-arrow" />
          </button>
        </div>

        <div className="nav-right">
          <div className="view-dropdown-wrapper">
            <FiCalendar className="dropdown-left-icon" />
            <select
              className="view-dropdown"
              value={view !== 'agenda' ? view : ''}
              onChange={(e) => onView(e.target.value)}
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
            <FiChevronDown className="dropdown-arrow-icon" />
          </div>

          <button className="agenda-btn" onClick={() => onView('agenda')}>
            <FiPlus size={18} />
            Agenda
          </button>
        </div>
      </div>
    );
  };

  // Visa bara det första eventet per dag
  const getVisibleEvents = () => {
    const grouped = {};
    for (let evt of events) {
      const day = evt.start.toDateString();
      if (!grouped[day]) {
        grouped[day] = [evt];
      } else {
        grouped[day].push(evt);
      }
    }
    return Object.values(grouped).map((group) => group[0]);
  };

  return (
    <div className="calendar-wrapper">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        onSelectEvent={(event) => setSelectedEvent(event)}
        onShowMore={(events, date) => {
          setPopupEvents(events);
          setDate(date);
        }}
       eventPropGetter={() => ({
  style: {
  }
})}
        components={{ toolbar: CustomToolbar, event: CustomEvent }}
        style={{ height: '100%' }}
      />

      {/* Popup för ett enskilt event */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
      {floatingPosition && (
  <FloatingDayEvents
    events={popupEvents}
    position={floatingPosition}
    onClose={() => setFloatingPosition(null)}
    onEventClick={(event) => {
      setSelectedEvent(event);           
      setFloatingPosition(null);         
    }}
  />
)}
    </div>
  )};

export default CalendarView;
