import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext";
import Spinner from 'react-bootstrap/Spinner';
import { sendEmail } from "../services/emailCommunications";


const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");
    const [safeguarding, setSafeguarding] = useState("Approved");
    const [notice, setNotice] = useState("");   
    const [passwordPrompt, setPasswordPrompt] = useState([]);
    const { user, mongoUser, signUpAuth, isLoading  } = useAuth()

    useEffect(() => {
        if (mongoUser && !isLoading) {
            if (mongoUser.status === "Student") {
                navigate(`/search`);
            } else if (user && user.uid){
                navigate(`/profile/${user.uid}`);
            }
        }
    }, [mongoUser, isLoading, navigate, user]);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value
        const newPrompt = [
            newPassword.length >= 8 ? '' : 'password must be at least 8 characters',
            /[\W_]/.test(newPassword) ? '' : 'password must contain a special character',
            /\d/.test(newPassword) ? '' : 'password must contain a number',
            /[A-Z]/.test(newPassword) ? '' : 'password must contain a capital letter',  
        ];
        setPasswordPrompt(newPrompt);
        setPassword(newPassword);
    }

    const setTutor = () => {
        setSafeguarding("Pending")
        setStatus("Tutor")
    }

    
    const signupWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;  
        const emailLocalPart = email ? email.match(/^[^@]+/)[0] : null;
        const emaiLocalPartRegex = /^[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*$/;


        if (email) {
            if (emaiLocalPartRegex.test(emailLocalPart)) {
                if (passwordRegex.test(password)) {
                    if (password === confirmPassword) {
                        console.log(safeguarding)
                        const signUpResult = await signUpAuth(email, password, name, status, safeguarding)

                        if (signUpResult.success === false) {
                            if (signUpResult.errorType === "emailInUse") {
                                setNotice("Email is already in use. Please try logging in instead."); 
                            } else {
                                setNotice("Sorry, something went wrong. Please try again.");
                            }
                        } else if (signUpResult.success === true) {
                            setNotice("Sign up successfull!")
                            if (status === "Student"){
                                sendEmail(email, "signUpStudent")
                            } else if (status === "Tutor"){
                                sendEmail(email, "signUpTutor")
                            }
                        } 
                    }
                } else {
                    setNotice("Password doesn't meet requirements. Please try again.")
                }

            } else {
                setNotice("Email address is not valid. Please try again.")
                }  
        } else {
            setNotice("Email address is not valid. Please try again.")
        }

    }


    return (
        <div className = "container-fluid">
            <div className = "row justify-content-center mt-3">
                <div className = "col-md-4 text-center">
                    <p className = "lead">Sign up</p>
                </div>
                <div className = "container">
                    <div className = "row justify-content-center">
                        <form className = "col-md-4 mt-3 pt-3 pb-3" >
                            { notice &&
                                <div className = "alert alert-warning" role = "alert">
                                    { notice }    
                                </div>
                            }
                            <div className = "form-floating mb-3">
                        <input id = "signupName" type = "text" className = "form-control" aria-describedby = "nameHelp" placeholder = "Your Name" value = { name } onChange = { (e) => setName(e.target.value) }></input>
                        <label htmlFor = "signupName" className = "form-label">Enter your name</label>
                        </div>
                        <div className = "form-floating mb-3">
                            <input id = "signupEmail" type = "email" className = "form-control" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                            <label htmlFor = "signupEmail" className = "form-label">Enter your email address</label>
                        </div>
                        <div className = "form-floating mb-3">
                            <input id = "signupPassword" type = "password" className = "form-control" placeholder = "Password" value = { password } onChange = {handlePasswordChange}></input>
                            <label htmlFor = "signupPassword" className = "form-label">Password</label>
                        </div>
                        <div className = "form-floating mb-3">
                            <input id = "confirmPassword" type = "password" className = "form-control" placeholder = "Confirm Password" value = { confirmPassword } onChange = { (e) => setConfirmPassword(e.target.value) }></input>
                            <label htmlFor = "confirmPassword" className = "form-label">Confirm Password</label>
                        </div>
                        <div className="custom-control custom-radio">
                        <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" onChange = { (e) => setTutor()}></input>
                        <label className="custom-control-label" htmlFor="customRadio1">Tutor</label>
                        </div>
                        <div className="custom-control custom-radio">
                        <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" onChange = { (e) => setStatus("Student")}></input>
                        <label className="custom-control-label" htmlFor="customRadio2">Student</label>
                        </div>


                            <div className = "d-grid">
                                <button style={{ backgroundColor: '#025E84', color: 'white' }} type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => signupWithUsernameAndPassword(e)}>Sign up</button>
                            </div>

                            {password && (
                                <ul>
                                    {passwordPrompt.map((requirement, index) => requirement && <li key={index}>{requirement}</li>)}
                                </ul>
                            )}
                            <div className = "mt-3 text-center">
                                <span>Go back to login? <Link to = "/login">Click here.</Link></span>
                            </div>  

                            {isLoading && 
                                <div className="d-flex justify-content-center">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;