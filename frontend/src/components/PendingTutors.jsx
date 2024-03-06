import { updatePendingTutor } from "../services/users"
import { getPendingTutors } from "../services/users";
import { useState, useEffect } from "react";
import { Alert } from 'react-bootstrap';

const PendingTutorList = (props) => {
    const [pendingTutors, setPendingTutors] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const closeAlert = () => {
        setErrorMessage("")
        setSuccessMessage("")
    }

    useEffect(() => {
        getPendingTutors(props.idToken)
            .then((data) => {
                console.log(data)
                setPendingTutors(data.result)
            })
            .catch((err) => {
                console.log(err);
            })
    },[refresh])

    const updateTutorList = async (firebaseId) => {
        try {
            await updatePendingTutor(props.idToken, firebaseId)
            setRefresh(!refresh) 
        } catch(error) {
            console.log(error)
        }

    }

    return (
        <div class = "container">
            <div className = "row justify-content-center mt-3">
                <div className = "col-md-4 text-center">
                <h4>Pending Tutors: </h4>
                {pendingTutors.map((user) => (
                    <>
                    <div>
                        Name: {user.name}<br/>
                        E-mail: {user.email}<br/>
                    </div>
                    <div className = "d-grid">
                                <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => updateTutorList(user.firebase_id)}>Approve</button>
                    </div><br/>

                    </>
                ))}
            </div>
        </div>
        </div>
    )
}

export default PendingTutorList