import React, { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './CalendarView.css';
import Button from '../button/Button';
import PlusIcon from '../icons/PlusIcon';
import '../button/Button.css';
import { FiChevronDown, FiCalendar } from 'react-icons/fi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';

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

const events = [
  {
    title: 'Team brainstorm for marketing',
    start: new Date(2025, 3, 1, 10, 0),
    end: new Date(2025, 3, 1, 11, 0),
  },
  {
    title: 'Testevent i april',
    start: new Date(2025, 3, 1, 11, 30),
    end: new Date(2025, 3, 1, 12, 30),
  },
  {
    title: 'Testevent i april',
    start: new Date(2025, 3, 2, 11, 30),
    end: new Date(2025, 3, 2, 12, 30),
  },
];

const CalendarView = () => {
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

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
         components={{ 
           toolbar: CustomToolbar, 
           event: CustomEvent 
         }}
         popup
         style={{ height: '100%' }}
      />
    </div>
  );
};

export default CalendarView;
