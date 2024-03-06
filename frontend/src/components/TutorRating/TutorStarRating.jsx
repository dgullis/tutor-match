import { useState, useEffect } from "react";

export const TutorStarRating = ({tutorReviews, tutorRating}) => {
    const [avgRating, setAvgRating] = useState(null)
    const [stars, setStars] = useState([])
    const [numRatings, setNumRatings] = useState(null)

    useEffect(() => {
        setAvgRating(Math.round(tutorRating))
        setNumRatings(tutorReviews.length)

        const starsArray = Array.from({ length: avgRating }, (_, index) => (
            <span key={index} style={{ color: "#ffc107" }}> &#9733; </span>
        ));
        
        setStars(starsArray)
    }, [tutorReviews, tutorRating])


    return (
        numRatings > 0 ? 
        <div className="container text-center">
            <span style={{ fontSize: '14px' }}>({avgRating})</span>
            {stars}
            <span style={{ fontSize: '14px' }}>{numRatings}{numRatings > 1 ? ' reviews' : ' review'}</span>
        </div>

        :

        <div className="container text-center">
            <span style={{ fontSize: '14px' }}>No reviews</span>
        </div>


    )
}