import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const MyCalendar = () => {
  return (
    <div  >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar  />
      </LocalizationProvider>
    </div>
  );
};

export default MyCalendar;
