import {Button, Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export const TutorSearchResult = ( { tutor }) => {

    return (
        <Card style={{ minWidth: '500px' , margin: "20px" }}>
            <Card.Body>
            <Row>
            <Col md={4}>
                <Card.Img style={{ width: "80px", height: "80px", borderRadius: "50%" }} variant="top" src={tutor.profileImage ? tutor.profileImage : "https://firebasestorage.googleapis.com/v0/b/tutormatch-e2a6a.appspot.com/o/profile-images%2FScreenshot%202024-03-07%20at%2010.12.22.png?alt=media&token=22295bdd-8c61-4837-aba0-6bc98985c0f3"}/>
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

