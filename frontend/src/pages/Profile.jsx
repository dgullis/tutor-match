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
import { Container, Row, Col, Card } from "react-bootstrap";
import RequestedBookingsScrollable from "../components/RequestedBookingsScrollable"; 
import { ProfileCalendar } from "../components/ProfileCalendar";
import UserProfile from "../components/User";
import ProfileSubjects from "../components/ProfileSubjects";
import AboutMe from "../components/AboutMe";
import PendingTutorList from "../components/PendingTutors";
import { addProfilePicture } from "../services/users";

import { TutorReview } from "../components/TutorRating/TutorRating";
import { TutorStarRating } from "../components/TutorRating/TutorStarRating";

const DEFAULT_PFP = "https://res.cloudinary.com/dzkvzncgr/image/upload/v1707228333/ph2p8wvxud1qbsqqfxqk.png";

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
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const [pageToDisplay, setPageToDisplay] = useState("")

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
        getUser(firebase_id, idToken)
            .then((data) => {
                //console.log(data)
                setUserDetails(data.user)
            })
            .catch((err) => {
                console.log(err);
                navigate("/login");
            });
        searchSubjects(gcseQueryParams, idToken)
            .then((data) => {
                //console.log(data)
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
                //console.log(data)
                setPendingTutors(data.result)
            })
            .catch((err) => {
                console.log(err);
            })

    },[refresh, firebase_id]);

    useEffect(()=> {

        if (userDetails.status === "Student"){
            if (user.uid === firebase_id){
                setPageToDisplay("STUDENT_OWNER")
            } else {
                setPageToDisplay("STUDENT_VISITOR")
            }
        } else if (userDetails.status === "Tutor"){
            if (user.uid === firebase_id){
                if(userDetails.safeguarding === "Approved"){
                    setPageToDisplay("TUTOR_OWNER_APPROVED")
                } else {
                    setPageToDisplay("TUTOR_OWNER_PENDING")
                }
            } else {
                setPageToDisplay("TUTOR_VISITOR")
            }
        } else if (userDetails.status === "Admin"){
            setPageToDisplay("ADMIN")
        }

    }, [userDetails])
    
    
    
    

    // student profile page, not belonging to logged in user
    // if (userDetails && userDetails.status === "Student" && user.uid !== firebase_id)
    if(pageToDisplay === "STUDENT_VISITOR") {
        return (
            <Container fluid className="px-5">
                <Row className="gx-5">
                <Col md={{ span: 6, offset: 3 }}>
                <Card className="shadow-sm p-3 mb-3 bg-white rounded" >
                    <Card.Body className="text-center">
                        <Card.Title>
                            Student Details
                        </Card.Title>
                        <UserProfile user = {userDetails} isCurrentUser = {false} firebase_id={firebase_id}/>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        )
    }

    // student profile page, belonging to logged in user
    // if (userDetails && userDetails.status === "Student" && user.uid === firebase_id)
    
    if(pageToDisplay === "STUDENT_OWNER") {
        
        return (
            <Container fluid className="px-5">
            <Row className="gx-5">
                <Col>
                <Card className="shadow-sm p-3 mb-3 bg-white rounded">
                    <Card.Body className="text-center">
                        <Card.Title>
                            Student Details
                        </Card.Title>
                        <UserProfile 
                            user = {userDetails} 
                            isCurrentUser = {true}
                            onChangeProfileImage={() => 
                                setRefresh(!refresh)}/>
                    </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card className="shadow-sm p-3 mb-3 bg-white rounded">
                    <Card.Title className="row justify-content-center text-center">
                        My tutoring sessions
                    </Card.Title>
                        <div className="profileCalendar">
                            <ProfileCalendar
                                mongoUser = {mongoUser}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
        )
    }

    // approved tutor profile page, belonging to logged in user
    // if (userDetails && userDetails.status === "Tutor" && userDetails.safeguarding === "Approved" && user.uid === firebase_id) 
    if (pageToDisplay === "TUTOR_OWNER_APPROVED"){
        return (
            <Container fluid className="px-5">
            <Row className="gx-5">
            <Col md={6}>
                    <Row>
                    <Card className="shadow-sm p-3 mb-3 bg-white rounded">
                        <Card.Body className="text-center">
                            <Card.Title>
                                Tutor Details
                            </Card.Title>
                            <UserProfile 
                                user = {userDetails} 
                                isCurrentUser = {true}
                                gcse = {gcse} 
                                alevel = {alevel}
                                onChangeProfileImage={() => 
                                    setRefresh(!refresh)}/>
                                
                        </Card.Body>
                        </Card>
                    </Row>
                        <Row>
                        <Card className="shadow-sm p-3 mb-3 bg-white rounded">
                        <Card.Body className="text-center">
                        <Card.Title style={{marginBottom: "20px"}}>
                            Update subjects
                        </Card.Title>
                        <AddSubject 
                            firebaseId={firebase_id} 
                            idToken={idToken} 
                            onSubjectAdded={() => 
                                setRefresh(!refresh)}
                        />
                        </Card.Body>
                        </Card>
                    </Row>
                </Col>
                <Col md={6} className="pl-md-5">
                    <Row>
                    <Card className="shadow-sm p-3 mb-3 bg-white rounded" style={{ maxHeight: '500px', overflowY: 'auto'}}>
                            <Card.Body className="text-center">
                                <Card.Title style={{marginBottom: "20px"}}> 
                                    Requested Bookings
                                </Card.Title>
                                    <RequestedBookingsScrollable 
                                        userDetails={userDetails}
                                        onChangeBookingStatus={() => 
                                            setRefresh(!refresh)} 
                                    />   
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                    <Card className="shadow-sm p-3 mb-3 bg-white rounded">

                            <Card.Body className="text-center">
                                <Card.Title style={{marginBottom: "20px"}}>
                                    My tutoring sessions
                                </Card.Title>
                                    <div className="profileCalendar">
                                        <ProfileCalendar
                                            mongoUser = {mongoUser}
                                        />
                                    </div>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                    <Card className="shadow-sm p-3 mb-3 bg-white rounded">

                            <Card.Body className="text-center">
                                <Card.Title style={{marginBottom: "20px"}}>
                                    Update Availability
                                </Card.Title>
                                <AddAvailability 
                                    firebaseId = {firebase_id} 
                                    idToken={idToken}
                                    onChangeAvailability={() => 
                                        setRefresh(!refresh)}
                                />
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
                </Row>
            </Container>
        )
    }
    // approved tutor profile page, not belonging to logged in user
    // if (userDetails && userDetails.status === "Tutor" && userDetails.safeguarding === "Approved" && user.uid !== firebase_id) 
    
    if (pageToDisplay === "TUTOR_VISITOR"){
        return (
            <Container fluid className="px-5">
            <Row className="gx-5">
            <Col md={6}>
                <Row>
                    <Card className="shadow-sm p-3 mb-3 bg-white rounded">
                    <Card.Body className="text-center">
                        <Card.Title>
                            Tutor Details
                        </Card.Title>
                        <UserProfile 
                            user = {userDetails} 
                            isCurrentUser = {false}
                            gcse = {gcse} 
                            alevel = {alevel}
                        />
                    </Card.Body>
                    </Card>
                </Row>
                <Row>
                <Card className="shadow-sm p-3 bg-white rounded">
                    <Card.Body className="text-center">
                    <Card.Title style={{marginBottom: "20px"}}>
                        Leave a review
                    </Card.Title>
                    <TutorReview 
                        tutorId={firebase_id}
                        loggedInUser = {mongoUser}
                        onSubmitReview={() => 
                            setRefresh(!refresh)}
                        idToken={idToken}
                    />
                    </Card.Body>
                    </Card>
                </Row>
            </Col>

            <Col md={6}>
                <Row>
                    <Card className="shadow-sm p-3 mb-3 bg-white rounded">

                        <Card.Body className="text-center">
                            <Card.Title style={{marginBottom: "20px"}}> 
                                Request session
                            </Card.Title>
                            <BookingRequestCalender 
                                tutorDetails = {userDetails}
                                loggedInUser = {mongoUser}
                                onRequestBooking={() => 
                                    setRefresh(!refresh)} />

                                
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
            </Row>
        </Container>
        )
    }

    if( pageToDisplay === "TUTOR_OWNER_PENDING"){
        return (
            <Container fluid className="px-5">
                <Row className="gx-5">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card className="shadow-sm p-3 mb-3 bg-white rounded" >
                            <Card.Body className="text-center">
                                <Card.Title>
                                    Tutor Details
                                </Card.Title>
                                <Card.Text>
                                    Your account is awaiting background checks. <br/> 
                                    Please ensure you respond to all requests for further information promptly.
                                </Card.Text>
                                <UserProfile 
                                    user = {userDetails} 
                                    isCurrentUser = {true} 
                                    firebase_id={firebase_id}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        )
    }

    if( pageToDisplay === "ADMIN"){
        return (
            <Container fluid className="px-5">
                <Row className="gx-5">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card className="shadow-sm p-3 mb-3 bg-white rounded" >
                            <Card.Body className="text-center">
                                <Card.Title>
                                    ADMIN
                                </Card.Title>
                                    <PendingTutorList idToken = {idToken}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
        )
    }

    return (
        <>
        {/* previous code */}
        <div className = "container-fluid">
            <div className = "row justify-content-center mt-3">
                <div className = "col-md-4 text-center">
        {userDetails.safeguarding === "Pending" && <p>Your account is awaiting background checks. <br/> Please ensure you respond to all requests for further information promptly.
        </p>}
        {userDetails.status === "Tutor" && <h2>Tutor Details</h2> }
        {userDetails.status === "Student" && <h2>Student Details</h2>}
        {userDetails.status === "Admin" && <h2>Admin Account</h2>}
        <div className = "profile">
            <UserProfile user = {userDetails} defaultPicture = {DEFAULT_PFP} />
            
        </div>
        <br/>
        {userDetails.status === "Tutor" &&
        <ProfileSubjects gcse = {gcse} alevel = {alevel} />}
        </div>
        </div>
        </div>

        {userDetails.reviews && 
        <div className="show-rating">
            <TutorStarRating 
                tutorReviews={userDetails.reviews}
                tutorRating={userDetails.rating}
                
            />
        </div>
        }

        <div className="d-flex align-items-center justify-content-center">
        <AboutMe userDetails={userDetails} firebase_id={firebase_id} setUserDetails={setUserDetails} />
        </div>


        {user.uid === userDetails.firebase_id && userDetails.status === "Tutor" && userDetails.safeguarding === "Approved" && (
            <RequestedBookingsScrollable 
            userDetails={userDetails}
            onChangeBookingStatus={() => 
                setRefresh(!refresh)} />
        )}

        {user.uid === firebase_id && userDetails.status === "Tutor" && 
            <div className = "addSubject">
                <AddSubject firebaseId={firebase_id} idToken={idToken} onSubjectAdded={() => 
                setRefresh(!refresh)}/>
            </div>}

        {user.uid === firebase_id && userDetails.status === "Tutor" && userDetails.safeguarding === "Approved" && 

            <div className="add-availability">
                <AddAvailability 
                    firebaseId = {firebase_id} 
                    idToken={idToken}
                    onChangeAvailability={() => 
                        setRefresh(!refresh)}
                    />
            </div> }
        
        { user.uid === firebase_id &&
            <div className="profileCalendar">
                <ProfileCalendar
                    mongoUser = {mongoUser}
                />
            </div>
        }


        <div className="booking-request">
            <BookingRequestCalender 
                tutorDetails = {userDetails}
                loggedInUser = {mongoUser}
                onRequestBooking={() => 
                    setRefresh(!refresh)} />
        </div>
        
        {user.uid === firebase_id && userDetails.status === "Admin" &&
        <div>
        <PendingTutorList idToken = {idToken}/>
        </div>}


        {user.uid != firebase_id && userDetails.status === "Tutor" &&

        <div className="booking-request">
            <BookingRequestCalender 
                tutorDetails = {userDetails}
                loggedInUser = {mongoUser}
                onRequestBooking={() => 
                    setRefresh(!refresh)} />

        </div> }

        {user.uid != firebase_id && userDetails.status === "Tutor" &&
        <div className="tutor-rating">
            <TutorReview 
                tutorId={firebase_id}
                loggedInUser = {mongoUser}
                onSubmitReview={() => 
                    setRefresh(!refresh)}
            />
        </div> }
        </>
    )    
}

export default Profile

