import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Form, Button, Alert } from 'react-bootstrap';
import { requestBooking } from "../services/bookings";
import { useEffect } from "react";


export const BookingRequestCalender = ({tutorDetails, loggedInUser}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableDates, setAvailableDates] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const tutorAvailability = tutorDetails.availability
    const tutorFirebaseId = tutorDetails.firebase_id
    const loggedInUserFirebaseId = loggedInUser.firebase_id


    useEffect(()=> {

        // var  = array.filter(function(item) {
        //     return condition;
        //   });

    }, [tutorDetails])

        const closeAlert = () => {
            setErrorMessage("")
            setSuccessMessage("")
        }


        const isAvailableDate = (date) => {
            // Return true if the date is in the availableDates array, otherwise false
            if (tutorAvailability && tutorAvailability.length > 0) {
            return tutorAvailability.some(
                (availableDate) =>
                new Date(availableDate.start_time).toDateString() === date.toDateString()
            );
            }
        }

        const isAvailableTime = (time) => {
            if (tutorAvailability && tutorAvailability.length > 0) {
            return tutorAvailability.some(
                (availableDate) =>
                    new Date(availableDate.start_time).getTime() === new Date(time).getTime()
            );
            }
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                console.log("this is beign submitted", selectedDate.toISOString())
                const result = await requestBooking(tutorFirebaseId, loggedInUserFirebaseId, selectedDate.toISOString())
                if (result.success){
                    setErrorMessage("")
                    setSuccessMessage(result.message)
                } else {
                    setSuccessMessage("")
                    setErrorMessage(result.error)
                }
            } catch(error){
                setSuccessMessage("")
                setErrorMessage(error.error)
            }
        }


    
    return (
                <div className = "container text-center">
                    <div className = "row justify-content-center">
                    
                        <Form onSubmit={handleSubmit} >
                        <DatePicker 
                            showIcon
                            selected={selectedDate} 
                            onChange={(date) => setSelectedDate(date)}
                            filterDate={isAvailableDate}
                            filterTime={isAvailableTime}
                            showTimeSelect
                            timeIntervals={60}
                            placeholderText="Select a date"
                            dateFormat="dd-MM-yy HH:00"
                            open={true}
                            inline
                        />
                        
                            <Button className="d-grid mx-auto" variant="primary" type="submit" justifyContent="center" style={{ width: '200px' }}>
                                Request
                            </Button> 
                    
                        </Form>
                        <div>
                            {errorMessage && 
                                    <Alert variant="info" dismissible onClose={closeAlert} >
                                        {errorMessage}
                                    </Alert>
                                }
                                {successMessage && 
                                    <Alert variant="info" dismissible onClose={closeAlert} >
                                        {successMessage}
                                    </Alert>
                                }
                        </div>  

                    </div>
                </div>

    );
};

