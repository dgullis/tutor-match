import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap'

export const TutorStarRating = ({tutorReviews, tutorRating}) => {
    const [avgRating, setAvgRating] = useState(null)
    const [stars, setStars] = useState([])
    const [numRatings, setNumRatings] = useState(null)
    const [showReviews, setShowReviews] = useState(false)

    const handleClick = () => setShowReviews(true);
    const handleClose = () => setShowReviews(false)
    

    useEffect(() => {
        setAvgRating(Math.round(tutorRating))
        setNumRatings(tutorReviews.length)

        const starsArray = Array.from({ length: avgRating }, (_, index) => (
            <span key={index} style={{ color: "#ffc107" }}> &#9733; </span>
        ));
        
        setStars(starsArray)
    }, [tutorReviews, tutorRating])


    return (
        <>
        {numRatings > 0 ? (

            <div className="container text-center">
                <span style={{ fontSize: '14px' }}>({avgRating})</span>
                {stars}
                <span style={{ fontSize: '14px' }}>{numRatings}{numRatings > 1 ? ' reviews' : ' review'}</span>
            

                <div onClick={handleClick} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    see reviews
                </div>

            </div>

        ) : (

            <div className="container text-center">
                <span style={{ fontSize: '14px' }}>No reviews</span>
            </div>
        
        )}
        

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

        </>
    )

}