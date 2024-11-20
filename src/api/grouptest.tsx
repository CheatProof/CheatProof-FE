import axios from 'axios';

/**
 * Fetch test details from the API.
 
 */
export const fetchTestDetails = async (body:any) => {
  try {
    const token = localStorage.getItem('token'); // Replace 'authToken' with the actual key
    console.log('Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const url = `http://localhost:8080/api/test/assign/groupTest/new`;

    const response = await axios.post(
      url,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      return response.data.data; // Assuming API returns data in the "data" field
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching test details:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

// import { baseUrl } from "../env/Env"; // Adjust the path as necessary

// /**
//  * Fetches test details for a specific test and group.
//  * @param testId - ID of the test.
//  * @param groupId - ID of the group.
//  * @returns A promise resolving to the API response data.
//  */
// export const fetchTestDetails = (testId: string, groupId: string) => {
//   const url = `${baseUrl}/api/test/assign/groupTest/new?testId=${testId}&groupId=${groupId}`;

//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + localStorage.getItem('authToken'), // Ensure the token key matches your setup
//     },
//     body: JSON.stringify({}), // Include a body if the API expects it, otherwise leave it empty
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => data)
//     .catch(error => {
//       console.error('Error fetching test details:', error);
//       throw error; // Re-throw the error for handling in the calling code
//     });
// };

