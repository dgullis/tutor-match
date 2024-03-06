import {Button, Row, Col} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export const TutorSearchResult = ( { tutor }) => {

    return (
        <Card style={{ minWidth: '500px' , margin: "20px" }}>
            <Card.Body>
            <Row>
            <Col md={4}>
                <Card.Img variant="top" src="holder.js/100px180" />
            </Col>
            <Col md={8}>
                <Link to={`/profile/${tutor.firebase_id}`} style={{color: 'hsl(0, 0%, 20%)', textDecoration: 'none'}}>
                    <Card.Title>{tutor.name}</Card.Title>
                </Link>
            </Col>
            </Row>
            </Card.Body>
        </Card>
    );
}
