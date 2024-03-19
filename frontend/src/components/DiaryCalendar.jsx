import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { DiaryActivity } from "./DiaryActivity";
import { Container, Row, Col } from "react-bootstrap";

export const DiaryCalendar = ({ userDetails }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activityDates, setActivityDates] = useState([])
    const [selectedDateActivities, setSelectedDateActivities] = useState([])

    useEffect(()=> {
        
        if(userDetails.bookings){
            var tutorsBookingsDates = [...userDetails.bookings]
            if(userDetails.availability) {
                var tutorsAvailabileDates = userDetails.availability.filter((availableSlot) =>{
                    return availableSlot.available === true;
                });
                var combinedDates = [...tutorsBookingsDates, ...tutorsAvailabileDates];
                setActivityDates(combinedDates);
            } else {
                setActivityDates(tutorsBookingsDates)
            }
        }
        // if (userDetails.availability) {
        //     var tutorsAvailabileDates = userDetails.availability.filter((availableSlot) =>{
        //         return availableSlot.available === true;
        //     });
        // }
        
        // if (userDetails.bookings) {
        //     var combinedDates = [...tutorsAvailabileDates, ...userDetails.bookings];
        //     setActivityDates(combinedDates);
        // } else {
        //     setActivityDates(tutorsAvailabileDates);
        // }

    }, [userDetails])

    useEffect(() => {
        var activitiesForDate = activityDates.filter((item) => {
            return new Date(item.start_time).toDateString() === selectedDate.toDateString()
        })

        activitiesForDate.sort((a, b) => {
            return new Date(a.start_time) - new Date(b.start_time);
        });

        setSelectedDateActivities(activitiesForDate)

    }, [userDetails, activityDates, selectedDate])

    


    const isAvailableDate = (date) => {
        // Return true if the date is in the activityDates array, otherwise false
        if (activityDates && activityDates.length > 0) {
        return activityDates.some(
            (activityDate) =>
            new Date(activityDate.start_time).toDateString() === date.toDateString()
        );
        }
    }

    return (
        <Container fluid className="mb-2">
        <Row>
            {selectedDateActivities.length > 0 ? (
                <>
                    <Col>
                        <DatePicker 
                            showIcon
                            selected={selectedDate} 
                            onChange={(date) => setSelectedDate(date)}
                            filterDate={isAvailableDate}
                            timeIntervals={60}
                            placeholderText="Select a date"
                            dateFormat="dd-MM-yy HH:00"
                            open={true}
                            inline
                        />
                    </Col>
                    <Col>
                        {selectedDateActivities.map((activity, index) => (
                            <div key={index}>
                                {activity.available && <DiaryActivity activity={activity} type="availableSlot" />}
                                {activity.status === "accepted" && <DiaryActivity activity={activity} type="bookingAccepted" />}
                                {activity.status === "requested" && <DiaryActivity activity={activity} type="bookingRequested" />}
                            </div>
                        ))}
                    </Col>
                </>
            ) : (
                <Col>
                    <DatePicker 
                        showIcon
                        selected={selectedDate} 
                        onChange={(date) => setSelectedDate(date)}
                        filterDate={isAvailableDate}
                        timeIntervals={60}
                        placeholderText="Select a date"
                        dateFormat="dd-MM-yy HH:00"
                        open={true}
                        inline
                    />
                </Col>
            )}
        </Row>
    </Container>

    )

    
}