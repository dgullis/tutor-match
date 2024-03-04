import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../components/authContext";
import { getUser } from "../services/users";
import { searchSubjects } from "../services/subjects";
import { AddSubject } from "../components/AddSubject";
import { AddAvailability } from "../components/AddAvailability";
import UserProfile from "../components/User";
import ProfileSubjects from "../components/ProfileSubjects";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const handle = useParams()
    const firebase_id = handle.id
    const [userDetails, setUserDetails] = useState({})
    const [refresh, setRefresh] = useState(false)


    const [gcse, setGcse] = useState([])
    const [alevel, setAlevel] = useState([])
    console.log("user")
    console.log(user)
    const gcseQueryParams = {
        "firebaseId": firebase_id,
        "grade": "gcse"
    }
    const alevelQueryParams = {
        "firebaseId": firebase_id,
        "grade": "alevel"
    }

    const minDate = new Date();
    const maxDate = new Date("01/01/2025 01:00 AM");
    const dateValue = new Date()

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
                //console.log(data)
                //console.log(data.result[0].name)
                setGcse(data.result)
            })
            .catch((err) => {
                console.log(err);
            })
        searchSubjects(alevelQueryParams)
            .then((data) => {
                //console.log(data)
                setAlevel(data.result)
            })
            .catch((err) => {
                console.log(err);
            })
    },[refresh]);

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
        {userDetails.status === "Tutor" &&
        <ProfileSubjects gcse = {gcse} alevel = {alevel} />}
        </div>
        </div>
        </div>



        {user.uid === firebase_id && userDetails.status === "Tutor" && 
            <div className = "addSubject">
            <AddSubject firebaseId={firebase_id} onSubjectAdded={() => 
            setRefresh(!refresh)}/>
            </div>}

        {user.uid === firebase_id && userDetails.status === "Tutor" && 
            <div className="add-availability">
                <AddAvailability firebaseId = {firebase_id}/>
            </div> }

        </>
    )    
}

export default Profile