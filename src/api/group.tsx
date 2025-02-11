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
    const url = `${baseUrl}/api/group/selfRegistration/generateCodes`;
    return fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: JSON.stringify({quantity,groupId})
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}

export const removeSelfRegistrationCode = (groupId:any, quantity:any) => {
    const url = `${baseUrl}/api/group/selfRegistration/removeCodes`;
    return fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: JSON.stringify({quantity,groupId})
    })
       .then(response => response.json())
       .then(data => data)
        // Handle errors
        .catch(error => console.error('Error:', error));
}


// export const removeSelfRegistrationCode = (groupId: any, quantity: any) => {
//     const url = `${baseUrl}/api/group/selfRegistration/removeCodes`;
//     console.log("Making DELETE request to:", url);
//     console.log("Payload:", { quantity, groupId });

//     return fetch(url, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token')
//         },
//         body: JSON.stringify({ quantity, groupId })
//     })
//     .then(response => {
//         console.log("Response Status:", response.status);
//         return response.json();
//     })
//     .then(data => {
//         console.log("Response Data:", data);
//         return data;
//     })
//     .catch(error => console.error('Error:', error));
// };


export const registrationCodesByGroupId = (groupId:any) => {
    const url = `${baseUrl}/api/group/get/registrationCodesByGroupId/${groupId}`;
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

export const getAllGroupMembers = () => {
    const url = `${baseUrl}/api/group/get/groupMembers`;
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


// export const getAllGroupMembers = async (groupId: any) => {
//     if (!groupId) {
//         console.error("Group ID is missing!");
//         return null;
//     }

//     const url = `${baseUrl}/api/group/get/groupMembers/${groupId}`;
//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + localStorage.getItem('token')
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`API error: ${response.status} - ${response.statusText}`);
//         }

//         return await response.json();
//     } catch (error) {
//         console.error('Fetch error:', error);
//         return null;
//     }
// };
