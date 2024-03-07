import { useState, useRef, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addProfilePicture } from "../services/users";

const UploadImage = ({firebase_id, onChangeProfileImage, idToken}) => {
    const [image, setImage] = useState(null)

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        if (image) {
            handleUpload();
        }
    }, [image]);


    const handleUpload = async () => {
        if (image) {
            const imageRef = ref(storage, `profile-images/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image);
            // Event listeners:
            // When you perform an upload or download operation, Firebase Storage provides you with a snapshot object that allows you to monitor the progress of the task and handle various events related to it.
            uploadTask.on('state_changed',
                (snapshot) => {
                    setImage(null)
                },
                (error) => {
                    console.log(error);
                },
                );

            try {
                await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                const result = await addProfilePicture(firebase_id, downloadURL, idToken)
                onChangeProfileImage()
                    
                })
            } catch (error) {
                console.log(error);
            }
    };
    }


    return (
        <>
        <div class="d-flex justify-content-center">
            <div class="btn btn-primary btn-rounded" style={{padding: '3px', fontSize:'14px'}}>
                <label class="form-label text-white m-1" for="customFile1">Upload image</label>
                <input type="file" class="form-control d-none" id="customFile1" onChange={handleFileChange} />
            </div>
        </div>

        </>
    )
}

export default UploadImage;