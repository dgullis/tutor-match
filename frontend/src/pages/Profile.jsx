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
import { Card, CardTitle } from "react-bootstrap";
import RequestedBookingsScrollable from "../components/RequestedBookingsScrollable"; 
import UserProfile from "../components/User";
import ProfileSubjects from "../components/ProfileSubjects";
import AboutMe from "../components/AboutMe";
import PendingTutorList from "../components/PendingTutors";
import { addProfilePicture } from "../services/users";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
    const [image, setImage] = useState(null)
    //console.log("user")
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
        //console.log("line 20 profile.jsx")
        //console.log(user)
        //console.log(userDetails)
        //console.log(idToken)
        getUser(firebase_id, idToken)
            .then((data) => {
                console.log(data)
                setUserDetails(data.user)
            })
            .catch((err) => {
                console.log(err);
                navigate("/login");
            });
        searchSubjects(gcseQueryParams, idToken)
            .then((data) => {
                //console.log(data)
                //console.log(data.result[0].name)
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
                console.log(data)
                setPendingTutors(data.result)
            })
            .catch((err) => {
                console.log(err);
            })
    },[refresh, firebase_id]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    
    const handleUpload = async () => {
        if (image) {
            const imageRef = ref(storage, `profile-images/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image);
            // Event listeners:
            // When you perform an upload or download operation, Firebase Storage provides you with a snapshot object that allows you to monitor the progress of the task and handle various events related to it.
            uploadTask.on('state_changed',
                (snapshot) => {
                    console.log('Uploaded file succesfully')
                },
                (error) => {
                    console.log(error);
                },
                );

            try {
                await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    setUserDetails((prevDetails => ({
                        ...prevDetails,
                        profileImage: downloadURL,
                    })));
                    const result = await addProfilePicture(firebase_id, downloadURL)
                    
                })
            } catch (error) {
                console.log("error", error);
            }
    };
    }


    return (
        <>

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

        {user.uid === firebase_id && userDetails.status === "Tutor" && userDetails.safeguarding === "Approved" && 
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