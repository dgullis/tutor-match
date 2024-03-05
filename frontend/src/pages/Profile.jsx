import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../components/authContext";
import { getUser } from "../services/users";

import { searchSubjects } from "../services/subjects";
import { AddSubject } from "../components/AddSubject";
import { AddAvailability } from "../components/AddAvailability";
import { BookingRequestCalender } from "../components/BookingRequestCalender";
import { RequestedBooking } from "../components/RequestedBooking";

const Profile = () => {
    const navigate = useNavigate();
    const { user, mongoUser } = useAuth()
    const handle = useParams()
    const firebase_id = handle.id
    const [userDetails, setUserDetails] = useState({})
    const [gcse, setGcse] = useState([])
    const [alevel, setAlevel] = useState([])
    const [refresh, setRefresh] = useState(false)


    const gcseQueryParams = {
        "firebaseId": firebase_id,
        "grade": "gcse"
    }
    const alevelQueryParams = {
        "firebaseId": firebase_id,
        "grade": "alevel"
    }



    useEffect(() => {
        getUser(firebase_id)
            .then((data) => {
                setUserDetails(data.user)
            })
            .catch((err) => {
                console.log(err);
                navigate("/login");
            });
        searchSubjects(gcseQueryParams)
            .then((data) => {
                console.log(data)
                console.log(data.result[0].name)
                setGcse(data.result)
            })
            .catch((err) => {
                console.log(err);
            })
        searchSubjects(alevelQueryParams)
            .then((data) => {
                console.log(data)
                setAlevel(data.result)
            })
            .catch((err) => {
                console.log(err);
            })
    },[refresh, firebase_id]);

    return(
        <>
        <div>
        <h2>Tutor Details</h2>
        <p>Name: {userDetails.name}<br/>
        Email: {userDetails.email}<br/>
        GCSEs: {gcse.map((subject) => (
            <div>
                {subject.name}
            </div>
        ))}
        A Levels: {alevel.map((subject) => (
            <div>
                {subject.name}
            </div>
        ))}</p>
        {userDetails.bookings && <div>
            Requested Bookings: {userDetails.bookings.map((booking) => (
                (booking.status === "requested") && 
                    <RequestedBooking 
                        key={booking._id}
                        booking={booking}
                    />
                ))}
                {/* <div>{userDetails.bookings}</div> */}
            </div>
        }
        </div>

        {user.uid === firebase_id && <div className = "addSubject">
            <AddSubject firebaseId={firebase_id} />
        </div>}

        <div className="add-availability">
            <AddAvailability firebaseId = {firebase_id}/>
        </div> 

        <div className="booking-request">
            <BookingRequestCalender 
                tutorDetails = {userDetails}
                loggedInUser = {mongoUser} />
        </div>

        </>
    )    
}

export default Profile