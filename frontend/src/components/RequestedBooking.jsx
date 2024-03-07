import { Card, Button } from 'react-bootstrap';
import { acceptBooking, denyBooking } from '../services/bookings';
import { sendEmail } from '../services/emailCommunications';
import { useAuth } from "../components/authContext";


export const RequestedBooking = ( { booking, onChangeBookingStatus } ) => {
    const { idToken } = useAuth()

    const bookingTime = new Date(booking.start_time);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const formattedDate = bookingTime.toLocaleDateString('en-UK', options);


    const onAccept = async (bookingId) => {
        try {
            await acceptBooking(bookingId, booking.tutorId, booking.start_time, idToken)
            onChangeBookingStatus()
        } catch(error) {
            console.log(error)
        }
    }
    
    const onDeny = async (bookingId) => {
        try {
            await denyBooking(bookingId, idToken)
            onChangeBookingStatus()
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <Card style={{ width: '100%', marginBottom: '10px', fontSize: '0.8rem' }}>
            <Card.Body>
            <Card.Text>
                {formattedDate}
            </Card.Text>
                <Button variant="success" style={{fontSize: "0.75rem"}} size="sm" onClick={() => onAccept(booking._id)}>Accept</Button>{' '}
                <Button variant="danger" className = "Deny" style={{fontSize: "0.75rem"}} size="sm" onClick={() => onDeny(booking._id)}>Deny</Button>
            </Card.Body>
        </Card>
    )
}