import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Form, Button } from 'react-bootstrap';
import { requestBooking } from "../services/bookings";


export const BookingRequestCalender = ({tutorDetails, loggedInUser}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const tutorAvailability = tutorDetails.availability
    // const tutorFirebaseId = tutorDetails.firebase_id
    // const loggedInUserFirebaseId = loggedInUser.firebase_id


        const isAvailableDate = (date) => {
            // Return true if the date is in the availableDates array, otherwise false
            return tutorAvailability.some(
                (availableDate) =>
                new Date(availableDate.start_time).toDateString() === date.toDateString()
            );
        }

        const isAvailableTime = (time) => {

            return tutorAvailability.some(
                (availableDate) =>
                    new Date(availableDate.start_time).getTime() === new Date(time).getTime()

            );
        }

        const handleSubmit = async (e) => {
            e.preventDefault()
            // try {
            //     await requestBooking(tutorFirebaseId, loggedInUserFirebaseId, selectedDate)
            //     //tutorId, studentId, start_time
            // } catch(error){
            //     console.log(error)
            // }
        }


    
    return (
        <div className = "container-fluid">
            <div className = "row justify-content-center mt-3">
                <div className = "container">
                    <div className = "row justify-content-center">
                        <>
                        <Form onSubmit={handleSubmit} className = "col-md-4 mt-3 pt-3 pb-3">
                        <DatePicker 
                            showIcon
                            selected={selectedDate} 
                            onChange={(date) => setSelectedDate(date)}
                            filterDate={isAvailableDate}
                            filterTime={isAvailableTime}
                            showTimeSelect
                            timeIntervals={60}
                            placeholderText="Select a date"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <div className = "d-grid">
                            <Button variant="primary" type="submit" className="d-grid" justifyContent="center" >
                                Request
                            </Button> 
                        </div> 
                        </Form>
                        </>

                    </div>
                </div>
            </div>
        </div>
    );
};

