import { Card, Button } from 'react-bootstrap';
import { acceptBooking, denyBooking } from '../services/bookings';


export const RequestedBooking = ( { booking } ) => {

    const bookingTime = new Date(booking.start_time);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const formattedDate = bookingTime.toLocaleDateString('en-UK', options);


    const onAccept = async (bookingId) => {
        try {
            console.log(bookingId)
            await acceptBooking(bookingId, booking.tutorId, booking.start_time)
        } catch(error) {
            console.log(error)
        }
    }
    
    const onDeny = async (bookingId) => {
        try {
            console.log(bookingId)
            await denyBooking(bookingId)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Card style={{ width: '18rem', marginBottom: '10px', fontSize: '0.8rem' }}>
            <Card.Body>
            <Card.Text>
                {formattedDate}
            </Card.Text>
                <Button variant="success" style={{fontSize: "0.75rem"}} size="sm" onClick={() => onAccept(booking._id)}>Accept</Button>{' '}
                <Button variant="danger"  style={{fontSize: "0.75rem"}} size="sm" onClick={() => onDeny(booking._id)}>Deny</Button>
            </Card.Body>
        </Card>
    )
}