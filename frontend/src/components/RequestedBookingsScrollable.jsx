import React from 'react';
import { Card, CardTitle } from 'react-bootstrap';
import { RequestedBooking } from './RequestedBooking';

const RequestedBookingsScrollable = ({ userDetails, onChangeBookingStatus }) => {
    return (
        <div className="requested-bookings">
            {userDetails.bookings && (
            <div className="container text-center">
                <div className="row justify-content-center">

    
                    <div>
                        {userDetails.bookings.map((booking) => (
                        booking.status === "requested" && 
                        <RequestedBooking 
                            key={booking._id}
                            booking={booking}
                            onChangeBookingStatus={onChangeBookingStatus}
                        />
                        ))}
                    </div>

                </div>
            </div>
            )}
        </div>
    );
    };

export default RequestedBookingsScrollable;