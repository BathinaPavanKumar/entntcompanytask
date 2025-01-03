import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-view">
      <h3>Calendar View</h3>
      <Calendar
        onChange={setDate}
        value={date}
      />
      {/* TODO: Add communication events to the calendar */}
    </div>
  );
};

export default CalendarView;

