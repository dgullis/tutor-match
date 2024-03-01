import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../components/authContext";
import { getUser } from "../services/users";
import { addSubject } from "../services/subjects";
import { AddAvailability } from "../components/AddAvailability";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const handle = useParams()
    const firebase_id = handle.id
    const [userDetails, setUserDetails] = useState({})
    const [subject, setSubject] = useState("")
    const [grade, setGrade] = useState("")
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
    },[]);

    const addSubjectAndLevel = async (e) => {
        e.preventDefault();

        try {
            await addSubject(subject, grade, firebase_id);
            navigate(0)
    } catch(error) {
        console.log(error)
    }}

    return(
        <>
        <div>
        <h2>Tutor Details</h2>
        <p>Name: {userDetails.name}<br/>
        Email: {userDetails.email}<br/>
        Subjects: Maths - GCSE, Science - A Level</p>
        </div>
        <div>
            <div className = "container-fluid">
            <div className = "row justify-content-center mt-3">
                <div className = "col-md-4 text-center">
                    <p className = "lead">Add subjects</p>
                </div>
                <div className = "container">
                    <div className = "row justify-content-center">
                        <form className = "col-md-4 mt-3 pt-3 pb-3">
                        <select className="form-select" aria-label="Default select example" value = {subject} onChange={ (e) => setSubject(e.target.value)}>
                            <option defaultValue>Select your subject</option>
                            <option value="English">English</option>
                            <option value="Maths">Maths</option>
                            <option value="Science">Science</option>
                            </select>
                        <div className="custom-control custom-radio">
                        <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" value = {"gcse"} onChange = { (e) => setGrade(e.target.value)}></input>
                        <label className="custom-control-label" htmlFor="customRadio1">GCSE</label>
                        </div>
                        <div className="custom-control custom-radio">
                        <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" value = {"alevel"} onChange = { (e) => setGrade(e.target.value)}></input>
                        <label className="custom-control-label" htmlFor="customRadio2">A Level</label>
                        </div>


                            <div className = "d-grid">
                                <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => addSubjectAndLevel(e)}>Sign up</button>
                            </div>                   
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className="add-availability">
            <AddAvailability />
        </div> 
        </>
    )    
}

export default Profile