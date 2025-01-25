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
    const url = `${baseUrl}/api/group/getById/${groupId}`;
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

// http://localhost:8080/api/group/addBulkMembersToGroupByEmail

export const addBulkMembersToGroupByEmail = ( body:any) => {
    const url = `${baseUrl}/api/group/addBulkMembersToGroupByEmail/`;
    return fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}


// /get/groupMembersbyGroupId/:groupId

export const getGroupMembersByGroupId = (groupId:any) => {
    const url = `${baseUrl}/api/group/get/groupMembersbyGroupId/${groupId}`;
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

// /getById/assignedGroupTest/:assignedTestGroupId

export const getAssignedGroupTest = (assignedTestGroupId:any) => {
    const url = `${baseUrl}/api/group/getById/assignedGroupTest/${assignedTestGroupId}`;
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


// POST : /notifyMembers/byGroup/:groupId

export const notifyMembersByGroup = (groupId:any, message:any) => {
    const url = `${baseUrl}/api/group/notifyMembers/byGroup/${groupId}`;
    return fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: JSON.stringify(message)
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}

export const generateSelfRegistrationCode = (groupId:any, quantity:any) => {
    const url = `${baseUrl}/api/group/selfRegistration/generateCodes/${groupId}`;
    return fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: JSON.stringify({quantity})
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}

export const registrationCodesByGroupId = (groupId:any) => {
    const url = `${baseUrl}/api/group/getById/registrationCodesByGroupId/${groupId}`;
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


export const addGroupMembersByCode = (registrationCode:any, memberData:any) => {
    const url = `${baseUrl}/api/group/add/groupMembersByCode`;
    return fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: JSON.stringify({ registrationCode, ...memberData }),
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}