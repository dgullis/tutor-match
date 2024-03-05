import React from 'react';

const AboutMe = ({ userDetails }) => {
  return (
    <>
       {/* Bios for Students/Tutors*/}
       <div>
            {userDetails.status === "Tutor" && (
                <div>
                    <h2>Tutor Bio</h2>
                    {/* Tutor */}
                </div>
            )}

            {userDetails.status === "Student" && (
                <div>
                    <h2>Student Bio</h2>
                    {/* About Students */}
                </div>
            )}
        </div>
    </>
  );
};

export default AboutMe;

