const BACKEND_URL = "http://localhost:5000";

export const requestBooking = async (tutorId, studentId, start_time) => {
    const payload = {
        tutorId: tutorId,
        studentId: studentId,
        start_time: start_time,
        status: "requested"
    };
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    let response = await fetch(`${BACKEND_URL}/bookings`, requestOptions);

    if (response) {
        return;
    } else {
        throw new Error (await response.json().then((data) => data.message))
    }

}