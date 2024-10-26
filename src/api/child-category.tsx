import { baseUrl } from "../env/Env";

export const getAllChildCategories = () => {
    return fetch(`${baseUrl}/api/category/get/byUserId`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        window.location.href = `${baseUrl}/api/auth/login`;  // Redirect to login page on error
    });
};

// Get child category by ID
export const getChildCategoryById = (id:any) => {
    return fetch(`${baseUrl}/api/category/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        window.location.href = `${baseUrl}/api/auth/login`;  // Redirect to login page on error
    });
};

// Create child category
export const createChildCategory = (body:any) => {
    console.log(`Creating child category`, body);
    return fetch(`${baseUrl}/api/category/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        // window.location.href = `${baseUrl}/api/auth/login`;  // Redirect to login page on error
    });
};

export const updateChildCategory = (id:any, body:any) => {
    return fetch(`${baseUrl}/api/category/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
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

// Delete child category
export const deleteChildCategory = (id:any) => {
    return fetch(`${baseUrl}/api/category/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        window.location.href = `${baseUrl}/api/auth/login`;  // Redirect to login page on error
    });
};


// http://localhost:8080/api/category/get/questionsCountByCategory

export const getQuestionsCountByCategoryId = () => {
    return fetch(`${baseUrl}/api/category/get/questionsCountByCategory/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ localStorage.getItem('token'),
        },
    })
   .then(response => response.json())
   .then(data => data)
   .catch(error => {
        console.error('Error:', error);
        // window.location.href = `${baseUrl}/api/auth/login`;  // Redirect to login page on error
    });
};
