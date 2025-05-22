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

  /*useEffect(() => {
    // Steg 1: Hämta från ditt API
    fetch('https://localhost:7111/api/calendar')
      .then((response) => response.json()) // Steg 2: Konvertera svaret till JSON
      .then((data) => {
        // Steg 3: Konvertera datan till rätt format
        const mappedEvents = data.map((evt) => ({
          title: evt.title,
          start: new Date(evt.startTime), // viktigt: gör om till Date-objekt
          end: new Date(evt.endTime),
          allDay: evt.isAllDay,
        }));
  
        // Steg 4: Spara i state
        setEvents(mappedEvents);
      })
      .catch((error) => {
        // Steg 5: Fånga eventuella fel
        console.error("Kunde inte hämta events:", error);
      });
  }, []);
  */
 useEffect(() => {
  // Kommentera bort API-anropet tillfälligt
  /*
  fetch('https://localhost:7111/api/calendar')
    .then((response) => response.json())
    .then((data) => {
      const mappedEvents = data.map((evt) => ({
        title: evt.title,
        start: new Date(evt.startTime),
        end: new Date(evt.endTime),
        allDay: evt.isAllDay,
      }));
      setEvents(mappedEvents);
    })
    .catch((error) => {
      console.error("Kunde inte hämta events:", error);
    });
  */

  // Lägg till hårdkodade events
 const testEvents = [
  {
    title: 'Möte med teamet',
    start: new Date(2025, 4, 23, 10, 0),
    end: new Date(2025, 4, 23, 11, 0),
    allDay: false,
    location: "Kontor 3A",
    address: "Storgatan 5, Malmö",
  },
  {
    title: 'Heldagsevent',
    start: new Date(2025, 4, 24),
    end: new Date(2025, 4, 24),
    allDay: true,
    location: "Stockholm",
    address: "Kungsgatan 12",
  },
];


  setEvents(testEvents);
}, []);
  

  const handleViewChange = useCallback((newView) => {
    setView(newView);
  }, []);

  const handleNavigate = useCallback((newDate) => {
    setDate(newDate);
  }, []);

  const CustomEvent = ({ event }) => {
    const startTime = new Date(event.start).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  
    return (
      <div className="custom-event">
        <div className="event-title">{event.title}</div>
        <div className="event-time">{startTime}</div>
      </div>
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
         onSelectEvent={(event) => {
  console.log("Event clicked:", event); // 👈 Se om location finns här
  setSelectedEvent(event);
}}
         components={{ 
           toolbar: CustomToolbar, 
           event: CustomEvent 
         }}
         popup
         style={{ height: '100%' }}
      />
       <EventModal 
      event={selectedEvent} 
      onClose={() => setSelectedEvent(null)} 
    />
    </div>
  );
};

export default CalendarView;
