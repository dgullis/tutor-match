import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

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
                        <li>Ann Galloway - <a href="https://github.com/AnnGalloway" target="_blank" rel="noopener noreferrer" className="custom-link">@AnnGalloway</a></li>
                        <li>Leah Simon - <a href="https://github.com/nsleeah" target="_blank" rel="noopener noreferrer" className="custom-link">@Nsleeah</a></li>
                        <li>Kat Bielecka - <a href="https://github.com/KatBiel" target="_blank" rel="noopener noreferrer" className="custom-link">@KatBiel</a></li>
                        <li>Dan Gullis - <a href="https://github.com/dgullis" target="_blank" rel="noopener noreferrer" className="custom-link">@dgullis</a></li>
                        <li>Simon Budden - <a href="https://github.com/fantastito" target="_blank" rel="noopener noreferrer" className="custom-link">@fantastito</a></li>
                        <li>Muhtadi Maahir - <a href="https://github.com/MMaahir" target="_blank" rel="noopener noreferrer" className="custom-link">@MMaahir</a></li>
                        <li>Pier Bruno Pompilii - <a href="https://github.com/PierPompilii" target="_blank" rel="noopener noreferrer" className="custom-link">@PierPompilii</a></li>
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
                    <p>Tutor Match is a charity set up to connect DBS checked volunteer tutors with students who need a little extra help. Our tutoring services are provided absolutely free to those who need it most.</p>
                    <Link to="/signup" className="btn btn-primary mb-3 mb-md-0">Create a free account</Link>
                </div>
                <div className="col-md-6">
                    <img src="/images/logo4.png" alt="Logo" className="img-fluid" style={{ maxWidth: '70%' }}/>
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
                <p>"TutorMatch helped me find a tutor that I can connect with!"</p>
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