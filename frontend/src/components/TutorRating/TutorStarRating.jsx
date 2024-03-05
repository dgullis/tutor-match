import { useState, useEffect } from "react";

export const TutorStarRating = ({tutorReviews}) => {
    const [avgRating, setAvgRating] = useState(null)
    const [stars, setStars] = useState([])

    useEffect(() => {
        // return sum of tutors ratings
        const sumOfRatings = tutorReviews.reduce((accumulator, currentReview) => {
            return accumulator + currentReview.rating;
            }, 0);
        
        // set average rating rounded to nearest whole number
        const averageRating = sumOfRatings / tutorReviews.length;
        setAvgRating(Math.round(averageRating))
        
        //create new array to length of tutors avg rating
        //for each item in array create span element which contains a yellow star
        const starsArray = Array.from({ length: avgRating }, (_, index) => (
            <span key={index} style={{ color: "#ffc107" }}> &#9733; </span>
        ));
        
        setStars(starsArray)
    }, [tutorReviews])

    return (
        <div className="container text-center">
            {stars}
        </div>


    )
}