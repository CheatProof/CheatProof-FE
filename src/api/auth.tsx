import { baseUrl } from "../env/Env";

export const signIn = (body:any) => {
    return fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

export const signUp = (body:any) => {
    return fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

export const resetPassword = (body:any) => {
    return fetch(`${baseUrl}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

export const resetOTP = (body:any) => {
    return fetch(`${baseUrl}/api/auth/reset-password-otp/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

// http://localhost:8080/api/user/getTestAnalytics?month=12

export const getTestAnalytics = (month: string) => {
    console.log(month)
    return fetch(`${baseUrl}/api/user/getTestAnalytics?month=12`, {
        method: 'GET',
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

// http://localhost:8080/api/user/getUserAnalytics

export const getUserAnalytics = () => {
    return fetch(`${baseUrl}/api/user/getUserAnalytics`, {
        method: 'GET',
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


