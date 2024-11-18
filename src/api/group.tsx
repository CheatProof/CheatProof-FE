import { baseUrl } from "../env/Env";

export const fetchGroups = ()=>{
    const url = `${baseUrl}/api/group/get/byUserId`;
    return fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}

// get groups by ID

export const fetchGroupById = (groupId:any) => {
    const url = `${baseUrl}/api/group/get/byGroupId/${groupId}`;
    return fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}

// new group request

export const createGroup = (groupData:any) => {
    const url = `${baseUrl}/api/group/new`;
    return fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: JSON.stringify(groupData)
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}

// update group request

export const updateGroup = (groupId:any, groupData:any) => {
    const url = `${baseUrl}/api/group/update/${groupId}`;
    return fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: JSON.stringify(groupData)
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}

// delete group request

export const deleteGroup = (groupId:any) => {
    const url = `${baseUrl}/api/group/delete/${groupId}`;
    return fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}