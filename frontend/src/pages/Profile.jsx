import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/authContext";
import { getUser } from "../services/users";
import { searchSubjects } from "../services/subjects";
import { getPendingTutors } from "../services/users";
import { AddSubject } from "../components/AddSubject";
import { AddAvailability } from "../components/AddAvailability";
import { BookingRequestCalender } from "../components/BookingRequestCalender";
import { RequestedBooking } from "../components/RequestedBooking";
import { Card, CardTitle } from "react-bootstrap";
import RequestedBookingsScrollable from "../components/RequestedBookingsScrollable"; 
import UserProfile from "../components/User";
import ProfileSubjects from "../components/ProfileSubjects";
import PendingTutorList from "../components/PendingTutors";


const Profile = () => {
    const navigate = useNavigate();
    const { user, mongoUser, idToken } = useAuth()
    const handle = useParams()
    const firebase_id = handle.id
    const [userDetails, setUserDetails] = useState({})

    const [refresh, setRefresh] = useState(false)
    const [gcse, setGcse] = useState([])
    const [alevel, setAlevel] = useState([])
    const [pendingTutors, setPendingTutors] = useState([])
    //console.log("user")
    //console.log(user)

    const gcseQueryParams = {
        "firebaseId": firebase_id,
        "grade": "gcse"
    }
    const alevelQueryParams = {
        "firebaseId": firebase_id,
        "grade": "alevel"
    }

    useEffect(() => {
        //console.log("line 20 profile.jsx")
        //console.log(user)
        //console.log(userDetails)
        //console.log(idToken)
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
        getPendingTutors(idToken)
            .then((data) => {
                console.log(data)
                setPendingTutors(data.result)
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
        {userDetails.safeguarding === "Pending" && <p>Your account is awaiting background checks. <br/> Please ensure you respond to all requests for further information promptly.
        </p>}
        {userDetails.status === "Tutor" && <h2>Tutor Details</h2> }
        {userDetails.status === "Student" && <h2>Student Details</h2>}
        {userDetails.status === "Admin" && <h2>Admin Account</h2>}
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

        {user.uid === firebase_id && userDetails.status === "Tutor" && userDetails.safeguarding === "Approved" && 
            <div className = "addSubject">
            <AddSubject firebaseId={firebase_id} idToken={idToken} onSubjectAdded={() => 
            setRefresh(!refresh)}/>

        </div>}



        {user.uid === firebase_id && userDetails.status === "Tutor"  && 

            <div className="add-availability">
                <AddAvailability 
                    firebaseId = {firebase_id} 
                    idToken={idToken}
                    onChangeAvailability={() => 
                        setRefresh(!refresh)}
                    />
            </div> }
        
        {user.uid === firebase_id && userDetails.status === "Admin" &&
        <div>
        <PendingTutorList idToken = {idToken}/>
        </div>}

        {userDetails.status != "Admin" &&
        <div className="booking-request">
            <BookingRequestCalender 
                tutorDetails = {userDetails}
                loggedInUser = {mongoUser}
                onRequestBooking={() => 
                    setRefresh(!refresh)} />
                </div>}

        </>
    )    
}

export default Profile