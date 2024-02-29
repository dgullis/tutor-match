import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../components/authContext";
import { getUser } from "../services/users";


const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const handle = useParams()
    const firebase_id = handle.id
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        getUser(firebase_id)
            .then((data) => {
                setUserDetails(data.user)
            })
            .catch((err) => {
                console.log(err);
                navigate("/login");
            });
    },[]);

    const logoutUser = async (e) => {
        e.preventDefault();

        await auth.signOut();
        navigate("/");
    }

    return(
        <>
        <h2>Tutor Details</h2>
        <p>Name: {userDetails.name}<br/>
        Email: {userDetails.email}<br/>
        Subjects: Maths - GCSE, Science - A Level</p>
        </>
    )    
}

export default Profile