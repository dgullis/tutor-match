import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/authContext";
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notice, setNotice] = useState("");
    const { user, mongoUser, isLoading, logInAuth } = useAuth()

    useEffect(() => {
        if (mongoUser && !isLoading) {
            if (mongoUser.status === "Student") {
                navigate(`/search`);
            } else if (mongoUser.firebase_id){
                navigate(`/profile/${mongoUser.firebase_id}`);
            }
        }
    }, [mongoUser, isLoading, navigate, user]);

    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();

        const loginResult = await logInAuth(email, password) 

        if (loginResult.success === false) {
            setNotice("You entered a wrong username or password.")    
        }
    }

    return (

        <div className = "container-fluid">
            <div className = "row justify-content-center mt-3">
                <div className = "col-md-4 text-center">
                    <p className = "lead">Log in</p>
                </div>
                <div className = "container">
                    <div className = "row justify-content-center">
                        <form className = "col-md-4 mt-3 pt-3 pb-3">
                            { "" !== notice &&
                                <div className = "alert alert-warning" role = "alert">
                                    { notice }    
                                </div>
                            }                  
                            <div className = "form-floating mb-3">
                                <input type = "email" className = "form-control" id = "exampleInputEmail1" aria-describedby = "emailHelp" placeholder = "name@example.com" value = { email } onChange = { (e) => setEmail(e.target.value) }></input>
                                <label htmlFor = "exampleInputEmail1" className = "form-label">Email address</label>
                            </div>
                            <div className = "form-floating mb-3">
                                <input type = "password" className = "form-control" id = "exampleInputPassword1" placeholder = "Password" value = { password } onChange = { (e) => setPassword(e.target.value) }></input>
                                <label htmlFor = "exampleInputPassword1" className = "form-label">Password</label>
                            </div>
                            <div className = "d-grid">
                                <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => loginWithUsernameAndPassword(e)}>Submit</button>
                            </div>
                            <div className = "mt-3 text-center">
                                <span>Need to sign up for an account? <Link to = "/signup">Click here.</Link></span>
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

export default Login