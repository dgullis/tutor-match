const BACKEND_URL = process.env.BACKEND_URL;

export const signup = async (firebase_id, name, email, status, safeguarding) => {
    const payload = {
        firebase_id: firebase_id,
        name: name,
        email: email,
        status: status,
        safeguarding: safeguarding
    };
    console.log(payload)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };

    let response = await fetch(`${BACKEND_URL}/signup`, requestOptions);

    if (response.status === 201) {
        const data = await response.json();
        return data;
    } else {
        throw new Error (await response.json().then((data) => data.message));
    }
};

export const getUser = async (firebase_id, idToken) => {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    }

    try {
    let response = await fetch(`${BACKEND_URL}/users/${firebase_id}`, requestOptions);
    var data = await response.json()
    
    if (response.status === 200) {
        return data;
    } else {
        throw new Error('Error fetching user')
    }
    } catch (error) {
        console.error(error)
        throw error;
    }
}

//Bio 
export const updateBio = async (firebase_id, bio, idToken) => {
    try {
        console.log(firebase_id)
        console.log(bio)
        const response = await fetch(`${BACKEND_URL}/users/${firebase_id}/bio`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
                
            },
            body: JSON.stringify({ bio })
        });
        if (!response.ok) {
            throw new Error('Failed to update bio');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Error updating bio:', error);
    }
};

export const addAvailability = async (firebase_id, idToken, startTime, endTime) => {

    const availabilityInHourSlots = [];
    let currentSlot = new Date(startTime);
    currentSlot.setMinutes(0, 0, 0);

    while (currentSlot < endTime) {
        const nextSlot = new Date(currentSlot);
        nextSlot.setHours(currentSlot.getHours() + 1);

        availabilityInHourSlots.push({
            start_time: new Date(currentSlot),
            end_time: new Date(nextSlot)
        });

        currentSlot.setHours(currentSlot.getHours() + 1);
    }

    const payload = {
        "availability": availabilityInHourSlots
    };
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(payload)
    }

    try {
        let response = await fetch(`${BACKEND_URL}/tutors/${firebase_id}/availability`, requestOptions);

        const data = await response.json()

        if (response.status === 201) {
            return data;
        } else {
            console.error("Error adding availability:", data.message);
            throw new Error(data.message);
        }
    } catch (error){
        console.error("Unexpected error:", error);
        throw error;
    }

}

export const getPendingTutors = async(idToken) => {
    const requestOptions = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    }

    try {
    let response = await fetch(`${BACKEND_URL}/pending`, requestOptions);
    var data = await response.json()
    
    if (response.status === 200) {
        return data;
    } else {
        throw new Error('Error fetching users')
    }
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const updatePendingTutor = async(idToken,firebase_id) => {
    const requestOptions = {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${idToken}`
        }
    }
    let response = await fetch(`${BACKEND_URL}/pending/${firebase_id}`, requestOptions);

    if (response.status === 204) {
        return;
    } else {
        throw new Error (await response.json().then((data) => data.message));
    }
    
}

export const submitReview = async (tutorId, rating, comment, reviewerId, idToken) => {
    const payload = {
        "rating": rating,
        "comment": comment,
        "reviewerId": reviewerId
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(payload)
    };

    try {      
    
        let response = await fetch(`${BACKEND_URL}/users/${tutorId}/review`, requestOptions);
        const data = await response.json();

        if (response.status === 201) {
            return { "success": true, "message": data.message };        
        } else {
            return { "success": false, "error": data.message };
        }
    } catch (error) {
        console.error("An error occurred requesting a booking:", error);
        return { "error": "An error occurred while processing the request."}
    }
}

export const addProfilePicture = async (firebase_id, profilePictureUrl, idToken) => {
    
    const payload = {
        "profilePictureUrl": profilePictureUrl
    };
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(payload)
    }

    try {
        let response = await fetch(`${BACKEND_URL}/users/${firebase_id}/profile-picture`, requestOptions);

        const data = await response.json()

        if (response.status === 201) {
            return data;
        } else {
            console.error("Error adding profile picture:", data.error);
            throw new Error(data.message);
        }
    } catch (error){
        console.error("Unexpected error:", error);
        throw error;
    }
}



