import React from 'react';
import { useState } from 'react';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Form, Button } from 'react-bootstrap';
import { addAvailability } from '../services/users';
import { Alert } from 'react-bootstrap';
import '../App.css';



export const AddAvailability = ({firebaseId, idToken, onChangeAvailability}) => {

    const todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)

    const initialtDate = new Date("01/03/2024 00:00 AM")

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [availability, setAvailability] = useState([])
    const [successMessage, setSuccessMessage] = useState("")

    const minDate = new Date();
    const maxDate = new Date("01/01/2025 01:00 AM");

    const closeAlert = () => {
        setErrorMessage("")
        setSuccessMessage("")
    }

    const handleStartDateChange = (args) => {
        const selectedDate = args.value;
        selectedDate.setMinutes(0);
        selectedDate.setSeconds(0);
        setStartDate(selectedDate);
    }

    const handleEndDateChange = (args) => {
        const selectedDate = args.value;
        selectedDate.setMinutes(0);
        selectedDate.setSeconds(0);
        setEndDate(selectedDate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (startDate < todayDate) {
            setSuccessMessage("")
            setErrorMessage("Date and time cannot be in the past")
        }
        if (endDate <= startDate || !endDate || !startDate) {
            setSuccessMessage("")
            setErrorMessage("End date and time must be at least one hour after start date")
        } else {
            setAvailability([startDate, endDate])
            onChangeAvailability()
            try {
                await addAvailability(firebaseId, idToken, startDate, endDate)
                setErrorMessage("")
                setSuccessMessage("Availability added")
            } catch (error) {
                setSuccessMessage("")
                setErrorMessage("Error adding availability")
            }
        }
    }


    return (

        <>
        <Form onSubmit={handleSubmit}>
            <div style={{marginBottom: "10px"}}>
            <DateTimePickerComponent id="startdatetimepicker" placeholder="Choose start date and time" min={minDate} max={maxDate}
                value={startDate}
                format="dd-MM-yy HH:00"
                step={60}
                onChange={handleStartDateChange}
                
                // style={{marginBottom: "10px"}}
                >
            </DateTimePickerComponent>
            </div>
            <div style={{marginBottom: "10px"}}>
            <DateTimePickerComponent id="enddatetimepicker" placeholder="Choose end date and time" min={minDate} max={maxDate}
                value={endDate}
                format="dd-MM-yy HH:00"
                step={60}
                onChange={handleEndDateChange}
                
                // style={{marginBottom: "10px"}}
                >
            </DateTimePickerComponent>
            </div>

            <div className = "d-grid">
                <Button variant="primary bg-gradient" type="submit" className="d-grid" justifyContent="center" >
                Add to profile
                </Button> 
            </div>  

            
            {errorMessage && 
            <div className= "row-md-4 mt-3 pt-3 pb-3">
                <Alert variant="info" dismissible onClose={closeAlert} >
                    {errorMessage}
                </Alert>
            </div>
            }

            {successMessage && 
            <div className= "row-md-4 mt-3 pt-3 pb-3">
                <Alert variant="info" dismissible onClose={closeAlert} >
                    {successMessage}
                </Alert>
            </div>   
            }

        </Form>
        </>

    )
}
