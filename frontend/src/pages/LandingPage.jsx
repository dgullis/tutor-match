import React from 'react';

// container, row, and col-md-6 classes from Bootstrap to create a responsive layout with two columns.

const LandingPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>Welcome to Our Website!</h1>
                    <p>This is a Makers Academy final project using FReMP tech stack by</p>
                    <ul className="list-unstyled">
                        <li>John Doe</li>
                        <li>Bob Marley</li>
                        <li>Alice in Wonderland</li>
                    </ul>
                    <button className="btn btn-primary">Create a free account</button>
                </div>
                <div className="col-md-6">
                    <img src="/images/logo.png" alt="Logo" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;