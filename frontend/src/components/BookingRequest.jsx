import React, { useState } from "react";
import DatePicker from "react-datepicker";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const BookingRequest = () => {
    const [startDate, setStartDate] = useState(new Date());
    const excludedDates = [new Date("2024-03-05"), new Date("2024-03-07")]
    
    return (
        <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)}
            excludeDates={excludedDates}
            showTimeSelect
            placeholderText="Select a date"

        />
    );
};

