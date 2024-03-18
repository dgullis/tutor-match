import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const AboutUsModal = ({showAboutModal, toggleAboutModal}) => {

    
    return (

        <>
            <Button variant="primary bg-gradient" onClick={toggleAboutModal} style={{ display: 'flex', justifyContent:'center', width: '200px' }}>
                About Us
            </Button>

            <Modal 
                show={showAboutModal}
                onHide={toggleAboutModal}
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>About Us</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center' }}>
                    <p>Completed during the Makers Academy software development Bootcamp.
                    Two-week, small group project to design and build a product from scratch that adhered to the self selected theme of “Tech for good”.<br /><br />
                    Contact Dan Gullis for more information</p>
                    <ul style={{listStyle: 'none'}}>
                        <li>Dan Gullis - <a href="https://github.com/dgullis" target="_blank" rel="noopener noreferrer" className="custom-link">@dgullis</a></li>
                        <li>Ann Galloway - <a href="https://github.com/AnnGalloway" target="_blank" rel="noopener noreferrer" className="custom-link">@AnnGalloway</a></li>
                        <li>Leah Simon - <a href="https://github.com/nsleeah" target="_blank" rel="noopener noreferrer" className="custom-link">@Nsleeah</a></li>
                        <li>Kat Bielecka - <a href="https://github.com/KatBiel" target="_blank" rel="noopener noreferrer" className="custom-link">@KatBiel</a></li>
                        <li>Simon Budden - <a href="https://github.com/fantastito" target="_blank" rel="noopener noreferrer" className="custom-link">@fantastito</a></li>
                        <li>Muhtadi Maahir - <a href="https://github.com/MMaahir" target="_blank" rel="noopener noreferrer" className="custom-link">@MMaahir</a></li>
                        <li>Pier Bruno Pompilii - <a href="https://github.com/PierPompilii" target="_blank" rel="noopener noreferrer" className="custom-link">@PierPompilii</a></li>
                    </ul>
                </Modal.Body>
            </Modal>

            </>

    );
};