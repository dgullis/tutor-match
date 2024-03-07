import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateBio } from '../services/users';

import { useAuth } from "../components/authContext";

const AboutMe = ({ userDetails }) => {
    //console.log(userDetails.bio)
    const [bio, setBio] = useState(userDetails.bio);
    const [editing, setIsEditing] = useState(false)
    const textareaRef = useRef(null);
    const { idToken } = useAuth()

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset the height
            textarea.style.height = `${textarea.scrollHeight}px`; // Set the new height
        }
    }, [bio]);


    //Helper Functions.
    const handleChangeBio = (e) => {
        setBio(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            await updateBio(userDetails.firebase_id, bio, idToken); 
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating bio:', error);
        }
    };
    
    return (
        <div>
            {/* Updating Bio */}
                <Form>
                    <Form.Group controlId="bioTextArea">
                        {/* <Form.Label>Bio</Form.Label>*/}
                        <Form.Control
                            as="textarea"
                            ref={textareaRef}
                            value={bio}
                            onChange={handleChangeBio}
                            disabled={editing? false : true}
                            style={{
                                width: '100%',
                                height: 'auto',
                                pointerEvents: editing ? 'auto' : 'none', // Disable pointer events when isDisabled is true
                                background: editing ? '#white' : 'white', // Custom background color when disabled
                                border: editing ? '1px solid grey' : 'none',
                                resize: 'none',
                                textAlign: 'center',
                                padding: '0px',
                                overflow: 'hidden',
                                marginBottom: '10px'

                            }}
                            
                        />
                    </Form.Group>
                    </Form>

                    {editing ? 
                    <Button 
                        variant="primary" 
                        type="button" 
                        onClick={() => {
                            setIsEditing(false) 
                            handleSubmit()}}
                    >
                        Save
                    </Button>

                    :

                    <Button variant="primary" onClick={() => setIsEditing(true)}>
                        Edit Bio
                    </Button>
                    }



        </div>
    );
};

export default AboutMe;