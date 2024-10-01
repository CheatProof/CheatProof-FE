import { baseUrl } from "../env/Env";

export const getAllParentCategories = () => {
    return fetch(`${baseUrl}/api/parentCategory`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        window.location.href = `${baseUrl}/api/auth/login`;  // Redirect to login page on error
    });
};

export const getParentCategoryById = (id:any) => {
    return fetch(`${baseUrl}/api/parentCategory/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        window.location.href = `${baseUrl}/api/auth/login`;  // Redirect to login page on error
    });
};

export const updateParentCategory = (id:any, body:any) => {
    return fetch(`${baseUrl}/api/parentCategory/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        window.location.href = `${baseUrl}/api/auth/login`;  // Redirect to login page on error
    });
};

export const deleteParentCategory = (id:any) => {
    return fetch(`${baseUrl}/api/parentCategory/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        window.location.href = `${baseUrl}/api/auth/login`;  // Redirect to login page on error
    });
};

export const createParentCategory = (body:any) => {
    return fetch(`${baseUrl}/api/parentCategory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        window.location.href = `${baseUrl}/api/auth/login`;  // Redirect to login page on error
    });
};
