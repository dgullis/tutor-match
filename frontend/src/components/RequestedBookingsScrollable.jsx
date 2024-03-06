import React from 'react';
import { Card, CardTitle } from 'react-bootstrap';
import { RequestedBooking } from './RequestedBooking';

const RequestedBookingsScrollable = ({ userDetails, onChangeBookingStatus }) => {
    return (
        <div className="requested-bookings">
            {userDetails.bookings && (
            <div className="container text-center">
                <div className="row justify-content-center">
                <Card style={{ minWidth: '291.33px', maxWidth: 'fit-content', maxHeight: '300px', overflowY: 'auto' }}>
                    <CardTitle>Requested Bookings:</CardTitle>
                    <Card.Body>
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
                    </Card.Body>
                </Card>
                </div>
            </div>
            )}
        </div>
    );
    };

export default RequestedBookingsScrollable;