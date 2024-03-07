import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap'

export const TutorStarRating = ({tutorReviews, tutorRating, userStatus}) => {
    const [avgRating, setAvgRating] = useState(null)
    const [stars, setStars] = useState([])
    const [numRatings, setNumRatings] = useState(null)
    const [showReviews, setShowReviews] = useState(false)

    const handleClick = () => setShowReviews(true);
    const handleClose = () => setShowReviews(false)
    

    useEffect(() => {
        setAvgRating(tutorRating ? tutorRating.toFixed(1) : 0)
        setNumRatings(tutorReviews ? tutorReviews.length: 0)

    }, [tutorReviews, tutorRating])

    useEffect(() => {
        const starsArray = Array.from({ length: avgRating }, (_, index) => (
            <span key={index} style={{ color: "#ffc107" }}> &#9733; </span>
        ));
    
        setStars(starsArray);
    }, [avgRating]);

    if (userStatus === "Student"){
        return
    }

    return (
        <>
        {numRatings > 0 ? (

            <div className="container text-center">
                <span style={{ fontSize: '14px' }}>({avgRating})</span>
                {stars}
                <span style={{ fontSize: '14px' }}>{numRatings}{numRatings > 1 ? ' reviews' : ' review'}</span>
            

                <div onClick={handleClick} style={{ fontSize: '14px', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    see reviews
                </div>

                <Modal show={showReviews} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reviews</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {tutorReviews.map((review) => {
                            return <p>"{review.comment}"</p>
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer> 
                </Modal>

            </div>

        ) : (
            <div className="container text-center">
                <span style={{ fontSize: '14px' }}>No reviews</span>
            </div>
        
        )}
        

        </>
    )

}