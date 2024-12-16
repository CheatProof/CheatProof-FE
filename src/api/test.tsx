import { baseUrl } from "../env/Env";

// Get all tests
export const getAllTests = () => {
    return fetch(`${baseUrl}/api/test/`, {
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
        window.location.href = `${baseUrl}/api/auth/login`;
    });
};

// Get test by ID
export const getTestById = (id:any) => {
    return fetch(`${baseUrl}/api/test/getById/${id}`, {
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
        window.location.href = `${baseUrl}/api/auth/login`;
    });
};

// Create test by user
export const createTestByUser = (body:any) => {
    return fetch(`${baseUrl}/api/test/new`, {
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
        // window.location.href = `${baseUrl}/api/auth/login`;
    });
};

// Update test by ID
export const updateTestById = (id:any, body:any) => {
    return fetch(`${baseUrl}/api/test/update/${id}`, {
        method: 'PUT',
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
        window.location.href = `${baseUrl}/api/auth/login`;
    });
};

// Delete test by ID
export const deleteTestById = (id:any) => {
    return fetch(`${baseUrl}/api/test/delete/${id}`, {
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
        window.location.href = `${baseUrl}/api/auth/login`;
    });
};

// Get test by user
export const getTestByUser = () => {
    return fetch(`${baseUrl}/api/test/get/byUserId`, {
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
        window.location.href = `${baseUrl}/api/auth/login`;
    });
};

export const getTestQuestionById =(id: any)=>{

    return fetch(`${baseUrl}/api/test/get/questionByTestId/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ localStorage.getItem('token'),
        },
    })
   .then(response => response.json())

   .catch(error => {
        console.error('Error:', error);
        throw error;
    });

}

export const getTestForAssignment =(id: any)=>{

    return fetch(`${baseUrl}/api/test/get/questionForAssignment/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ localStorage.getItem('token'),
        },
    })
   .then(response => response.json())

   .catch(error => {
        console.error('Error:', error);
        throw error;
    });



}

export const removeQuestionFromTest = (testId:any,questionId:any)=>{
    return fetch(`${baseUrl}/api/test/remove/question/${testId}/${questionId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ localStorage.getItem('token'),
        },
    })
   .then(response => response.json())
   .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

// /get/testWithGroups/:testId

export const getTestWithGroups = (testId:any) => {
    return fetch(`${baseUrl}/api/test/get/testWithGroups/${testId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ localStorage.getItem('token'),
        },
    })
   .then(response => response.json())
   .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}
