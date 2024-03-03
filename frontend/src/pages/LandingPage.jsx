import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// AboutUsModal component/ button
const AboutUsModal = () => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                About Us
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>About Us</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This is a Makers Academy final project using FReMP tech stack by:</p>
                    <ul>
                        <li>Ann Galloway</li>
                        <li>Leah Simon</li>
                        <li>Kat Bielecka</li>
                        <li>Dan Gullis</li>
                        <li>Simon Budden</li>
                        <li>Muhtadi Maahir</li>
                        <li>Pier Bruno Pompilii</li>
                    </ul>
                    <p>Please, do not sign in :)</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

// Define the LandingPage component
const LandingPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>Online tutoring that releases potential</h1>
                    <p>TutorMatch connects students with DBS checked tutors. Find top-rated tutors online for free!</p>
                    <Link to="/signup" className="btn btn-primary mb-3 mb-md-0">Create a free account</Link>
                </div>
                <div className="col-md-6">
                    <img src="/images/logo.png" alt="Logo" className="img-fluid" style={{ maxWidth: '70%' }}/>
                </div>
            </div>

{/* Student reviews section */}
<div className="container-fluid mt-5">
    <h2>Student Reviews</h2>
    <div className="row">
        <div className="col-md-4">
            <div className="review">
                <div className="stars" style={{ color: 'gold', display: 'flex' }}>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                </div>
                <p>"Great experience! Highly recommend TutorMatch!"</p>
            </div>
        </div>
        <div className="col-md-4">
            <div className="review">
                <div className="stars" style={{ color: 'gold', display: 'flex' }}>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                </div>
                <p>"TutorMatch has helped me pass my A-levels with flying colours!"</p>
            </div>
        </div>
        <div className="col-md-4">
            <div className="review">
                <div className="stars" style={{ color: 'gold', display: 'flex' }}>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                </div>
                <p>"TutorMatch helped me find a tutor that I can vibe with!"</p>
            </div>
        </div>
        <div className="col-md-4">
            <div className="review">
                <div className="stars" style={{ color: 'gold', display: 'flex' }}>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                </div>
                <p>"Without TutorMatch I could not afford tutoring."</p>
            </div>
        </div>
        <div className="col-md-4">
            <div className="review">
                <div className="stars" style={{ color: 'gold', display: 'flex' }}>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                    <span className="star" style={{ fontSize: '24px' }}>&#9733;</span>
                </div>
                <p>"TutorMatch helped me develop problem-solving skills!"</p>
            </div>
        </div>
    </div>
</div>

            {/* About Us modal button */}
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col">
                        <AboutUsModal />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;