import React from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { useState } from 'react';
import { AboutUsModal } from '../components/AboutUsModal';
// import '../App.css';
import './LandingPage.css'

const LandingPage = () => {
   

    return (
        <Container fluid className="landing-page-container">
            <Row>
                <Row>
                    <div className="landing-page-logo">
                    <img src="/images/logo4.png" alt="Logo" className="img" style={{ maxWidth: '70%' }}/>
                    </div>
                </Row>
                <Row>
                    <div className="landing-page-bio">
                        <p className="header">Online tutoring that unleashes potential</p>
                        <p>We connect DBS checked volunteer tutors with students who need a little extra help. Our tutoring services are provided absolutely free to those who need it most.</p>
                        <div className="landing-page-bio-create-account">
                        <Link to="/signup" className="btn btn-primary bg-gradient mb-3 mb-md-0" style={{ width: '200px' }}>Create Free Account</Link>
                        </div>
                    </div>
                </Row>   
                <Row>
                    <div className="landing-page-about-modal-button">
                    <AboutUsModal />
                    </div>
                </Row>             
                <Row>
                    <div className="landing-page-reviews-carousel">
                        <ReviewsCarousel />
                    </div>
                </Row>               
                

            </Row>
        </Container>

    );
};

export default LandingPage;