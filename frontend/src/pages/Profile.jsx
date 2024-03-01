import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../components/authContext";
import { getUser } from "../services/users";

import { searchSubjects } from "../services/subjects";
import { AddSubject } from "../components/AddSubject";
import { AddAvailability } from "../components/AddAvailability";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const handle = useParams()
    const firebase_id = handle.id
    const [userDetails, setUserDetails] = useState({})

    const [gcse, setGcse] = useState([])
    const [alevel, setAlevel] = useState([])
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
    },[]);

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
        </div>

        {user.uid === firebase_id && <div className = "addSubject">
            <AddSubject firebaseId={firebase_id} />
        </div>}

        <div className="add-availability">
            <AddAvailability firebaseId = {firebase_id}/>
        </div> 

        </>
    )    
}

export default Profile