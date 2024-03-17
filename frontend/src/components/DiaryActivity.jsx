import { Card } from 'react-bootstrap';

export const DiaryActivity = ( { activity, type } ) => {

    const bookingTime = new Date(activity.start_time);

    const formattedTime = bookingTime.toLocaleTimeString('en-UK', { hour: 'numeric', minute: 'numeric' });
    
    let timeActivity
    let color

    if (type === "availableSlot") {
        timeActivity = "Available"
        color = "bg-secondary bg-gradient bg-opacity-75"
    } else if (type === "bookingAccepted") {
        timeActivity = "Accepted booking"
        color = "bg-success bg-gradient bg-opacity-75"
    } else if (type === "bookingRequested") {
        timeActivity = "Requested booking"
        color = "bg-warning bg-gradient bg-opacity-75"

    }

    return (
        <Card className={color} style={{ width: 'auto', marginBottom: '10px', fontSize: '0.8rem', border: 'none'}}>
            <Card.Body style={{padding: "5px"}}>
            <Card.Text>
                {formattedTime} - {timeActivity}
            </Card.Text>
            </Card.Body>
        </Card>
    )

}