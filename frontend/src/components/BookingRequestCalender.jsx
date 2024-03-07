import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Form, Button, Alert } from 'react-bootstrap';
import { requestBooking } from "../services/bookings";
import { useEffect } from "react";
import { sendEmail } from "../services/emailCommunications";
import { useAuth } from "../components/authContext"; 


export const BookingRequestCalender = ({tutorDetails, loggedInUser, onRequestBooking, showSubmit}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableDates, setAvailableDates] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const { idToken } = useAuth()
    console.log(tutorDetails)

    const tutorFirebaseId = tutorDetails.firebase_id && tutorDetails.firebase_id;
    const loggedInUserFirebaseId = loggedInUser.firebase_id && loggedInUser.firebase_id



    useEffect(()=> {

        if (tutorDetails.availability) {
            var tutorsAvailability = tutorDetails.availability.filter((availableSlot) =>{
                return availableSlot.available === true;
            });
        }

        setAvailableDates(tutorsAvailability)

    }, [tutorDetails])

        const closeAlert = () => {
            setErrorMessage("")
            setSuccessMessage("")
        }


        const isAvailableDate = (date) => {
            // Return true if the date is in the availableDates array, otherwise false
            if (availableDates && availableDates.length > 0) {
            return availableDates.some(
                (availableDate) =>
                new Date(availableDate.start_time).toDateString() === date.toDateString()
            );
            }
        }

        const isAvailableTime = (time) => {
            if (availableDates && availableDates.length > 0) {
            return availableDates.some(
                (availableDate) =>
                    new Date(availableDate.start_time).getTime() === new Date(time).getTime()
            );
            }
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            try {
                const result = await requestBooking(tutorFirebaseId, loggedInUserFirebaseId, selectedDate.toISOString(), idToken)
                if (result.success){
                    setErrorMessage("")
                    setSuccessMessage(result.message)
                    onRequestBooking()
                    sendEmail(tutorDetails.email, "requestBooking")

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
                <div className = "text-center mt-4 mb-4">
                    <div className = "justify-content-center">
                    
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
                        
                        {showSubmit && showSubmit === true &&
                        <div className="m-3">
                            <Button className="d-grid mx-auto" variant="primary" type="submit" justifyContent="center" style={{ width: '200px' }}>
                                Request
                            </Button> 
                        </div>
                        
                        }
                        
                        
                    
                        </Form>
                        <div style={{ maxWidth: '400px', margin: 'auto', fontSize: '14px' }}>
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

