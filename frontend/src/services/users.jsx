const BACKEND_URL = "http://localhost:5000";

export const signup = async (firebase_id, name, email, status) => {
    const payload = {
        firebase_id: firebase_id,
        name: name,
        email: email,
        status: status
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
