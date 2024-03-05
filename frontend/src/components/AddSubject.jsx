import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSubject } from "../services/subjects";
import { Alert } from 'react-bootstrap';
import { onIdTokenChanged } from "firebase/auth";

//

export const AddSubject = ({firebaseId, idToken, onSubjectAdded}) => {
    const [subject, setSubject] = useState("")
    const [grade, setGrade] = useState("")
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const closeAlert = () => {
        setErrorMessage("")
        setSuccessMessage("")
    }

    const addSubjectAndLevel = async (e) => {
        e.preventDefault();

    if (!subject || !grade) {
        setErrorMessage("Please select subject/grade.")
    } else {
        try {
            const addSubjectResult = await addSubject(subject, grade, firebaseId, idToken);
            console.log("add subject result: ", addSubjectResult.error)
            if (addSubjectResult.error) {
                setSuccessMessage("")
                setErrorMessage(addSubjectResult.error)
            } else {
                setErrorMessage("")
                setSuccessMessage(addSubjectResult.message) 
                onSubjectAdded()
            }

        } catch(error) {
            setSuccessMessage("")
            setErrorMessage(error.message) 
        }
    }
}


    return(
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
                                <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => addSubjectAndLevel(e)}>Add Subject</button>
                            </div>  
                                <div className= "row-md-4 mt-3 pt-3 pb-3">
                                {errorMessage &&
                                    <Alert variant="info" dismissible onClose={closeAlert} >
                                        {errorMessage}
                                    </Alert>
                                }
                                {successMessage &&
                                    <Alert variant="info" dismissible onClose={closeAlert} >
                                        {successMessage}
                                    </Alert>
                                }
                                </div>                 
                        </form>
                    </div>
                </div>
            </div>
            </div>
    )
}