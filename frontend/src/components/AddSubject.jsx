import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSubject } from "../services/subjects";

export const AddSubject = ({firebaseId}) => {
    const [subject, setSubject] = useState("")
    const [grade, setGrade] = useState("")
    const navigate = useNavigate();


    const addSubjectAndLevel = async (e) => {
        e.preventDefault();

        try {
            await addSubject(subject, grade, firebaseId);
            navigate(0)
    } catch(error) {
        console.log(error)
    }}

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
                        </form>
                    </div>
                </div>
            </div>
            </div>
    )
}