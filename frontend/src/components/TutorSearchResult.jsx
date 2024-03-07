import {Button, Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export const TutorSearchResult = ( { tutor }) => {

    return (
        <Card style={{ minWidth: '500px' , margin: "20px" }}>
            <Card.Body>
            <Row>
            <Col md={4}>
                <Card.Img style={{ width: "80px", height: "80px", borderRadius: "50%" }} variant="top" src={tutor.profileImage ? tutor.profileImage : "https://res.cloudinary.com/dzkvzncgr/image/upload/v1707228333/ph2p8wvxud1qbsqqfxqk.png"}/>
            </Col>
            <Col md={8} className="d-flex align-items-center">
                <Link to={`/profile/${tutor.firebase_id}`} style={{color: 'hsl(0, 0%, 20%)', textDecoration: 'none'}}>
                    <Card.Title>{tutor.name}</Card.Title>
                </Link>
            </Col>
            </Row>
            </Card.Body>
        </Card>
    );
}

//const DEFAULT_PFP = "https://res.cloudinary.com/dzkvzncgr/image/upload/v1707228333/ph2p8wvxud1qbsqqfxqk.png";
//user.profileImage ? (
//     <img
//     src={props.user.profileImage}
//     alt="Profile"
//     style={{ width: "100px", height: "100px", borderRadius: "50%" }}
//     />
// ) : (
//     <img
//     src={props.defaultPicture} 
//     alt="Default Profile"
//     style={{ width: "100px", height: "100px", borderRadius: "50%" }}
//     />
// )}
