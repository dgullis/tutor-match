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
