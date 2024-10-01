import { baseUrl } from "../env/Env";

export const createQuestion = (body) => {
    return fetch(`${baseUrl}/api/question/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
};