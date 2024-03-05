import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../components/authContext";
import { getUser } from "../services/users";
import { searchSubjects } from "../services/subjects";
import { AddSubject } from "../components/AddSubject";
import { AddAvailability } from "../components/AddAvailability";
import { BookingRequestCalender } from "../components/BookingRequestCalender";
import { RequestedBooking } from "../components/RequestedBooking";
import { Card, CardTitle } from "react-bootstrap";
import RequestedBookingsScrollable from "../components/RequestedBookingsScrollable"; 
import UserProfile from "../components/User";
import ProfileSubjects from "../components/ProfileSubjects";

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
        console.log("line 20 profile.jsx")
        console.log(user)
        console.log(userDetails)
        console.log(idToken)
        getUser(firebase_id, idToken)
            .then((data) => {
                setUserDetails(data.user)
            })
            .catch((err) => {
                console.log(err);
                navigate("/login");
            });
        searchSubjects(gcseQueryParams, idToken)
            .then((data) => {
                //console.log(data)
                //console.log(data.result[0].name)
                setGcse(data.result)
            })
            .catch((err) => {
                console.log(err);
            })
        searchSubjects(alevelQueryParams, idToken)
            .then((data) => {
                //console.log(data)
                setAlevel(data.result)
            })
            .catch((err) => {
                console.log(err);
            })
    },[refresh, firebase_id]);

    return(
        <>
      
        <div className = "container-fluid">
            <div className = "row justify-content-center mt-3">
                <div className = "col-md-4 text-center">
        {userDetails.status === "Tutor" && <h2>Tutor Details</h2> }
        {userDetails.status === "Student" && <h2>Student Details</h2>}
        <div className = "profile">
            <UserProfile user = {userDetails} />
        </div>
        <br/>
        {userDetails.status === "Tutor" &&
        <ProfileSubjects gcse = {gcse} alevel = {alevel} />}
        </div>
        </div>
        </div>


       
        {user.uid === userDetails.firebase_id && userDetails.status === "Tutor" && (
            <RequestedBookingsScrollable 
            userDetails={userDetails} 
            onChangeBookingStatus={() => 
                setRefresh(!refresh)} />
        )}

        {user.uid === firebase_id && userDetails.status === "Tutor" && 
            <div className = "addSubject">
            <AddSubject firebaseId={firebase_id} idToken={idToken} onSubjectAdded={() => 
            setRefresh(!refresh)}/>

          </div>}



        {user.uid === firebase_id && userDetails.status === "Tutor" && 
            <div className="add-availability">
                <AddAvailability 
                    firebaseId = {firebase_id} 
                    idToken={idToken}
                    onChangeAvailability={() => 
                      setRefresh(!refresh)}
                    />
            </div> }


        <div className="booking-request">
            <BookingRequestCalender 
                tutorDetails = {userDetails}
                loggedInUser = {mongoUser}
                onRequestBooking={() => 
                    setRefresh(!refresh)} />
        </div>

        </>
    )    
}

export default Profile