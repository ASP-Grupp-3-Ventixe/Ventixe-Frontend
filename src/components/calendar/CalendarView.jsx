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
    title: 'Testevent i april',
    start: new Date(2025, 3, 1, 10, 0),
    end: new Date(2025, 3, 1, 11, 0),
    description: "HEJ"
  },
  {
    title: 'Event i maj',
    start: new Date(2025, 4, 15, 12, 0),
    end: new Date(2025, 4, 15, 13, 0),
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
              <option value="">Select view</option>
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
            <FiChevronDown className="dropdown-arrow-icon" />
          </div>

          <button className="agenda-btn" onClick={() => onView('agenda')}>
          <PlusIcon />
  Agenda
  
</button>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-wrapper" style={{ height: '68vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        components={{ toolbar: CustomToolbar }}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default CalendarView;
