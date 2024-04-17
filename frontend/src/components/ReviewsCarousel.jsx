import React from 'react';
import {Carousel} from 'react-bootstrap';
import './ReviewsCarousel.css'

export const ReviewsCarousel = () => {
    const stars = [
        <span className="star" style={{ color: '#F2CC8F', fontSize: '24px' }}>&#9733;</span>,
        <span className="star" style={{ color: '#F2CC8F', fontSize: '24px' }}>&#9733;</span>,
        <span className="star" style={{ color: '#F2CC8F', fontSize: '24px' }}>&#9733;</span>,
        <span className="star" style={{ color: '#F2CC8F', fontSize: '24px' }}>&#9733;</span>,
        <span className="star" style={{ color: '#F2CC8F', fontSize: '24px' }}>&#9733;</span>

    ];
    return (
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <div className="carousel-review-container">
                <p>"Without TutorMatch I could not afford tutoring."</p>

                <div className="stars">
                    {stars}
                </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="carousel-review-container">
            <p>"TutorMatch has helped me pass my A-levels with flying colours!"</p>

            <div className="stars">
                {stars}
                </div>
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="carousel-review-container">
            <p>"TutorMatch helped me find a tutor that I can connect with!"</p>

            <div className="stars">
                {stars}
                </div>
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="carousel-review-container">
            <p>"Great experience! Highly recommend TutorMatch!"</p>

            <div className="stars">
                {stars}
                </div>
            </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="carousel-review-container">
            <p>"TutorMatch helped me develop problem-solving skills!"</p>
            <div className="stars">
                {stars}
                </div>
            </div>
            </Carousel.Item>
        </Carousel>
    );
}

