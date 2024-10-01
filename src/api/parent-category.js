import { baseUrl } from "../env/Env";


export const getAllParentCategories = () => {
    return fetch(`${baseUrl}/api/parentCategory`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
};


export const getParentCategoryById = (id) => {
    return fetch(`${baseUrl}/api/parentCategory/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
};


export const updateParentCategory = (id, body) => {
    return fetch(`${baseUrl}/api/parentCategory/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
};


export const deleteParentCategory = (id) => {
    return fetch(`${baseUrl}/api/parentCategory/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
};


export const createParentCategory = (body) => {
    return fetch(`${baseUrl}/api/parentCategory`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),  
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
};
