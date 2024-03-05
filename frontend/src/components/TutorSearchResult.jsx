import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export const TutorSearchResult = ( { tutor }) => {

    return (
        <Card style={{ width: '18rem', margin: "20px" }}>
            {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
            <Card.Body>
            <Card.Title>{tutor.name}</Card.Title>
            <Card.Text>
            </Card.Text>
            <Link to={`/profile/${tutor.firebase_id}`}>
                <Button variant="primary">See Tutor</Button>
            </Link>
            </Card.Body>
        </Card>
    );
}
