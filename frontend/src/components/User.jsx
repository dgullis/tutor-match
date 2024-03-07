import UploadImage from "./UploadImage";
import AboutMe from "./AboutMe";
import ProfileSubjects from "./ProfileSubjects";
import { TutorStarRating } from "./TutorRating/TutorStarRating";
import { useAuth } from "../components/authContext";

const UserProfile = (props) => {
    const { idToken } = useAuth()
    return (
        <div key={props.user.firebase_id} style={{ marginBottom: '20px' }}>
            <div>
                <img 
                    src={props.user.profileImage ? props.user.profileImage : "https://res.cloudinary.com/dzkvzncgr/image/upload/v1707228333/ph2p8wvxud1qbsqqfxqk.png"} 
                    alt="Image description" 
                    style={{ width: "150px", height: "150px", borderRadius: "50%", margin: '10px' }}
                />
            </div>
            <div>
                <TutorStarRating 
                    tutorReviews={props.user.reviews}
                    tutorRating={props.user.rating}
                    userStatus={props.user.status}
                />
            </div>

            {props.isCurrentUser &&
                <div style={{ marginBottom: '10px' }}>
                    <UploadImage 
                        firebase_id={props.user.firebase_id}
                        onChangeProfileImage={props.onChangeProfileImage}
                        idToken={idToken} />
                </div>
            }
            <div>
                <strong>Name:</strong><br/> {props.user.name} 
            </div>
            <div>
                <strong>Email:</strong> <br/>{props.user.email}
            </div>
            <div>
                <strong>About me:</strong> <br/>
            {props.isCurrentUser ? (
                <div>
                    <AboutMe
                        userDetails={props.user}
                    />
                </div>
            ) : (
                <div>
                    {props.user.bio}
                </div>
            )}
                <div>
                    <ProfileSubjects 
                        gcse = {props.gcse} 
                        alevel = {props.alevel} 
                    />
                </div>
            </div>
        </div>

    );
    };

export default UserProfile;