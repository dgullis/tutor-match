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
    try {
        const response = await fetch(`${BACKEND_URL}/bookings`, requestOptions);
        const data = await response.json();
        if (response.status === 201) {
            return { "success": true, "message": data.message };
        } else {
            return { "success": false, "error": data.message };
        }
    } catch (error) {
        console.error("An error occurred requesting a booking:", error);
        return { "error": "An error occurred while processing the request." };
    }

}