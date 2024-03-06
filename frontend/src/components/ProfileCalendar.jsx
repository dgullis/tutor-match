import 'bootstrap/dist/css/bootstrap.min.css';

import { ProfileCalendarItem } from "./ProfileCalendarItem";

export const ProfileCalendar = ({mongoUser}) => {


    return (
        <div className="container-fluid">
            <div className="row justify-content-center text-center">
                    <p className = "lead">My tutoring sessions</p>
            </div>
            <div className="row justify-content-center text-center">
                {mongoUser.bookings.map((booking) => (
                    <div className="row justify-content-center text-center" > 
                        <ProfileCalendarItem
                            key={booking._id}
                            booking={booking}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

};