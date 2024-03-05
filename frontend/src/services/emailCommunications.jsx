const BACKEND_URL = "http://localhost:5000";

const emailBody = {
    "signUpTutor": "Thank you for signing up as a tutor on TutorMatch. You profile is awaiting authorisation form one of our administrators. You will be contated when this is complete!",
    "signUpStudent": "Thank you for signing up as a tutor on TutorMatch. Please log in and start searching for tutors who match your requirements!",
    "requestBooking": "A student has requested to book you for tutoring. Please log in and go to your profile to respond this request.",
    "bookingAcepted": "Your booking request has been successfull and is now showing on your calender on your profile page.",
    "bookingDenied": "Your booking request has unfortunately not been aprooved please search for suitable tutors again."
}

const emailSubject = {
    "signUp": "Thankyou for signing up with TutorMatch",
    "requestBooking": "New booking requested on TutorMatch",
    "bookingRequestOutcome":  "Information on your request booking with TutorMatch"
}

export const sendEmail = async (to, type) => {
    var subject
    var body
        
    switch (type) {
        case "signUpTutor":
            subject = emailSubject.signUp
            body = emailBody.signUpTutor
        break;
        case "signUpStudent":
            subject = emailSubject.signUp
            body = emailBody.signUpStudent
        break;
        case "requestBooking":
            subject = emailSubject.requestBooking
            body = emailBody.requestBooking
        break;
        case "bookingAcepted":
            subject = emailSubject.bookingRequestOutcome
            body = emailBody.bookingAcepted
        break;
        case "bookingDenied":
            subject = emailSubject.bookingRequestOutcome
            body = emailBody.bookingDenied
        break;
        default:
            console.log("unknown email type")
    }
    
    const payload = {
        to: to,
        subject: subject,
        body: body
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    let response = await fetch(`${BACKEND_URL}/send-email`, requestOptions);
    
    const data = await response.json();
    console.log("email response", data)
}

