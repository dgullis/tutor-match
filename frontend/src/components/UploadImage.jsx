import { useState, useRef, useEffect } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
            const imageRef = ref(storage, `profile-images/${image.name}`);
            uploadBytes(imageRef, image)
            .then(()=> {
                getDownloadURL(imageRef)
                .then((downloadURL) => {
                    addProfilePicture(firebase_id, downloadURL, idToken)
                    .then((res) => {
                        setImage(null)
                        onChangeProfileImage()
                    })
                })
            })
        }
    
            


    return (
        <>
        <div class="d-flex justify-content-center">
            <div class="btn btn-rounded bg-gradient text-white" style={{padding: '3px', fontSize:'14px'}}>
                <label 
                    class="form-label text-white m-1" 
                    htmlFor="customFile1"
                >
                    Upload image
                </label>
                <input 
                    id="customFile1" 
                    type="file" 
                    name="file" 
                    accept="image/png, image/jpeg" 
                    class="form-control d-none" 
                    onChange={handleFileChange} />
            </div>
        </div>

        </>
    )
}

export default UploadImage;