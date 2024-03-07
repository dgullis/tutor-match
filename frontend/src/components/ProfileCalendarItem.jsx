import { Card } from 'react-bootstrap';

export const ProfileCalendarItem = ( { booking } ) => {

    const bookingTime = new Date(booking.start_time);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const formattedDate = bookingTime.toLocaleDateString('en-UK', options);

    return (
        <Card style={{ width: '18rem', marginBottom: '10px', fontSize: '0.8rem' }}>
            <Card.Body>
            <Card.Text>
                {formattedDate}<br></br>
                Status: {booking.status}
            </Card.Text>
            </Card.Body>
        </Card>
    )

}