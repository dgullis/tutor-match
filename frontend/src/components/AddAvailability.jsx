import { useState } from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import '../App.css';

export const AddAvailability = () => {
    const todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)

    const initialtDate = new Date(todayDate)
    initialtDate.setMinutes(0);

    const [startDate, setStartDate] = useState(initialtDate)
    const [endDate, setEndDate] = useState(initialtDate)
    const [errorMessage, setErrorMessage] = useState("")
    const [showTimes, setShowTimes] = useState("")

    const minDate = new Date();
    const maxDate = new Date("01/01/2025 01:00 AM");

    const handleStartDateChange = (args) => {
        const selectedDate = args.value;
        selectedDate.setMinutes(0);
        setStartDate(selectedDate);
    }

    const handleEndDateChange = (args) => {
        const selectedDate = args.value;
        selectedDate.setMinutes(0);
        setEndDate(selectedDate);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowTimes([startDate, endDate])

    }


    return (
        <>
        <DateTimePickerComponent id="datetimepicker" placeholder="Choose start date and time" min={minDate} max={maxDate}
            value={startDate}
            format="dd-MM-yy HH:00"
            step={60}
            onChange={handleStartDateChange}>
        </DateTimePickerComponent>
        <DateTimePickerComponent id="datetimepicker" placeholder="Choose start date and time" min={minDate} max={maxDate}
            value={endDate}
            format="dd-MM-yy HH:00"
            step={60}
            onChange={handleEndDateChange}>
        </DateTimePickerComponent>

        <button type = "submit" className = "btn btn-primary pt-3 pb-3" onSubmit={handleSubmit}>Submit</button>
        {/* {showTimes && <p>{showTimes}</p>} */}
        </>

    )
}