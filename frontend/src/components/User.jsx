import UploadImage from "./UploadImage";

const UserProfile = (props) => {
    return (
        <div key={props.user.firebase_id} style={{ marginBottom: '20px' }}>
        
            <img 
                src={props.user.profileImage ? props.user.profileImage : "https://res.cloudinary.com/dzkvzncgr/image/upload/v1707228333/ph2p8wvxud1qbsqqfxqk.png"} 
                alt="Image description" 
                style={{ width: "150px", height: "150px", borderRadius: "50%", margin: '10px' }}
            />
            {props.isCurrentUser &&
            <div style={{ marginBottom: '10px' }}>
                <UploadImage 
                    firebase_id={props.user.firebase_id}
                    onChangeProfileImage={props.onChangeProfileImage} />
            </div>
            }
            <div>
                <strong>Name:</strong><br/> {props.user.name} 
            </div>
            <div>
            <strong>Email:</strong> <br/>{props.user.email}
            </div>
            <div>
            <strong>About me:</strong> <br/>{props.user.bio}
            </div>
        </div>
    );
    };

export default UserProfile;