import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

import { ProfileCalendarItem } from "./ProfileCalendarItem";

export const ProfileCalendar = ({mongoUser}) => {

    return (
        <div className="container-fluid">
            <div className="row justify-content-center text-center">
                {mongoUser.bookings && mongoUser.bookings.length === 0 ? (
                    <Card style={{ width: '18rem', marginBottom: '10px', fontSize: '0.8rem' }}>
                    <Card.Body>
                    <Card.Text>No tutoring sessions booked or requested</Card.Text>
                    </Card.Body>
                    </Card>
                ) : (
                    mongoUser.bookings && mongoUser.bookings.map((booking) => (
                        <div className="row justify-content-center text-center" > 
                            <ProfileCalendarItem
                                key={booking._id}
                                booking={booking}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    // return (
    //     <div className="container-fluid">
    //         <div className="row justify-content-center text-center">
    //                 <p className = "lead">My tutoring sessions</p>
    //         </div>
    //         <div className="row justify-content-center text-center">
    //             {mongoUser.bookings.map((booking) => (
    //                 <div className="row justify-content-center text-center" > 
    //                     <ProfileCalendarItem
    //                         key={booking._id}
    //                         booking={booking}
    //                     />
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );

};