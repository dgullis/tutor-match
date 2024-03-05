import React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const AboutMe = ({ userDetails }) => {

    //USESTATE
    const [bio, setBio] = useState("");
    const [Editing, setIsEditing] = useState(false)

    //HANDLES CHANGE BIO
    const handleChangeBio = (e) => {
        console.log(e.target.value);
        setBio(e.target.value);
      };

    //HANDLES SUBMIT
    const handleSubmit = (e) => {
       e.preventDefault();
       console.log("Updated Bio:", bio)
       setIsEditing(false);
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
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={bio}
                            onChange={handleChangeBio}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            ) : (
                <>
                    <p>{bio}</p>
                    <Button variant="success" onClick={() => setIsEditing(true)}>
                        Edit Bio
                    </Button>
                </>
            )}
        </div>
    );
};

export default AboutMe;