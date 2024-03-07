import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { submitReview } from '../../services/users';

import './TutorReview.css'

export const TutorReview = ({tutorId, loggedInUser, onSubmitReview, idToken}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);
    const [ratingComment, setRatingComment] = useState('')
    const [notice, setNotice] = useState("")

    const closeAlert = () => {
        setNotice("")
    }

    const handleChange = (e) => {
        setRatingComment(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            const submitReviewResult = await submitReview(tutorId, rating, ratingComment, loggedInUser.firebase_id, idToken)
            if(submitReviewResult.success === true){
                setNotice(submitReviewResult.message)
                onSubmitReview()
            } else {
                setNotice(submitReviewResult.error)
            }
        } catch(error) {
            console.log("error submitting review", error)
            setNotice(error.error)
        } 
        setRatingComment("")
        setRating(null)
    }

    return (
        <div className="container text-center">
            <div className="tutorRating">
            <div className="m-3">
                {[...Array(totalStars)].map((star, index) => {
                    const currentRating = index + 1;

                    return (
                    <label key={index}>
                        <input
                            key={star}
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onChange={() => setRating(currentRating)}
                        />
                        <span
                        className="star"
                        style={{
                            color:
                            currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                        }}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        >
                        &#9733;
                        </span>
                    </label>
                    );
                })}
                </div>
                </div>
                <div>
                <input
                    onChange={handleChange}
                    value={ratingComment}
                    type="text"
                    placeholder="leave a comment for your review..."
                    style={{ width: "400px", height: "50px", fontSize: "14px" }}
                />
                </div>

                <div className="m-3">
                <Button className="mx-auto" variant="primary" type="submit" style={{ width: '200px' }} onClick={handleSubmit}>
                    Submit Review
                </Button>
                </div>

                <div style={{ maxWidth: '400px', margin: 'auto', fontSize: '14px' }}>
                    {notice && 
                        <Alert variant="info" dismissible onClose={closeAlert} >
                            {notice}
                        </Alert>
                    }
                </div>  
            </div>
    

);
    }
    
