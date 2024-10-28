import { baseUrl } from "../env/Env";

export const createQuestion = (body:any) => {
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

export const getQuestionsByTeacherId = (page = 1, limit = 10) => {
    return fetch(`${baseUrl}/api/question/get/byCreator?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(response => response.json());
};



export const getQuestionsById = (id:any) => {
    return fetch(`${baseUrl}/api/question/getById/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
   .then(response => response.json())
}



export const getQuestionTypes = ()=>{
    return fetch(`${baseUrl}/api/question/get/questionTypes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
   .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });




}

export const updateQuestion = (id:any,question:any)=>{

    return fetch(`${baseUrl}/api/question/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(question)
    })
   .then(response => response.json())
}


export const assignTestAQuestion = (body:any) => {
    return fetch(`${baseUrl}/api/test/assign/question`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body)
    })
   .then(response => response.json())
}

//http://localhost:8080/api/question/importQuestions

export const importQuestions = (file:any) => {
    const formData = new FormData();
    formData.append('csvFile', file);

    return fetch(`${baseUrl}/api/question/importQuestions/mcq`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
    })
   .then(response => response.json())
}



// /delete/:id

export const deleteQuestion = (id:any) => {
    return fetch(`${baseUrl}/api/question/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
};