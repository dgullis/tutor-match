const BACKEND_URL = "http://localhost:5000";

export const signup = async (name, email, status) => {
    const payload = {
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
        return;
    } else {
        throw new Error (await response.json().then((data) => data.message));
    }
};
