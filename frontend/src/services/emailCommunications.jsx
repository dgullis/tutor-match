const BACKEND_URL = "http://localhost:5000";

export const sendEmail = async (to, subject, body) => {
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

