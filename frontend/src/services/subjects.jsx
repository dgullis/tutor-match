const BACKEND_URL = "http://localhost:5000";


export const searchTutor = async (query) => {
    try {
        const queryString = new URLSearchParams(query).toString();
        const response = await fetch(`${BACKEND_URL}/tutors?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);

        }
    } catch(error) {
        console.error(`Error: ${error.message}`);
        throw new Error('Network error or other issue occurred')
    }

}

export const addSubject = async (subject, grade, firebase_id) => {
    const payload = {
        grade: grade,
        firebase_id: firebase_id
    };
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }

    let response = await fetch(`${BACKEND_URL}/subjects/${subject}/add`, requestOptions);
    const data = await response.json();

    if (response.status === 201) {
        console.log("SEE HERE DATA", data)
        return data;
    } else {
        console.log("SEE HERE DATA", data)
        return data;
        //throw new Error (await response.json().then((data) => data.message))
    }

}

export const searchSubjects = async (query) => {
    try {
        const queryString = new URLSearchParams(query).toString();
        const response = await fetch(`${BACKEND_URL}/subjects?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);

        }
    } catch(error) {
        console.error(`Error: ${error.message}`);
        throw new Error('Network error or other issue occurred')
    }

}