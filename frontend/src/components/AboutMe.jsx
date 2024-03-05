import React from 'react';
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateBio } from '../services/users';

const AboutMe = ({ userDetails, firebase_id, setUserDetails }) => {
    //console.log(userDetails.bio)
    const [bio, setBio] = useState(userDetails.bio);
    const [Editing, setIsEditing] = useState(false)

    //Helper Functions.
    const handleChangeBio = (e) => {
        console.log(e.target.value);
        setBio(e.target.value);
        //console.log("CHECK CONSOLE.")
        console.log(bio)
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBio(firebase_id, bio); 
            console.log("Updated Bio:", bio);
            setIsEditing(false);
            setUserDetails(prevUserDetails => ({ ...prevUserDetails, bio: bio }));
        } catch (error) {
            console.error('Error updating bio:', error);
        }
    };
    
      return (
        <div>
            {/* Bios for Students/Tutors */}
            <div>
                {userDetails.status === "Tutor" && (
                    <div>
                        <h2>Tutor Bio</h2>
                    </div>
                )}

                {userDetails.status === "Student" && (
                    <div>
                        <h2>Student Bio</h2> 
                    </div>
                )}
            </div>
            
            {/* Updating Bio */}
            {Editing ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="bioTextArea">
                        {/* <Form.Label>Bio</Form.Label>*/}
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={bio}
                            onChange={handleChangeBio}
                            style={{width: '300px'}}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            ) : (
                <>
                    <p>{bio}</p>
                    <Button variant="primary" onClick={() => setIsEditing(true)}>
                        Edit Bio
                    </Button>
                </>
            )}
        </div>
    );
};

export default AboutMe;