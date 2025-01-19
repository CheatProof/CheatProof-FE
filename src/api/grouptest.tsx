import { baseUrl } from '@/env/Env';
import axios from 'axios';



export const CreateTestGroupAsignement = async (body: any) => {
  try {
    const token = localStorage.getItem('token'); // Replace 'authToken' with the actual key
    console.log('Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const url = `${baseUrl}/api/test/assign/groupTest/new`;

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

// http://localhost:8080/api/test/update/assignedGroupTest/1c47316e-f75a-42e4-aef0-f1eeb7e93646


export const UpdateAssignedGroupTest = async (id: any, body: any) => {
  try {
    const token = localStorage.getItem('token'); // Replace 'authToken' with the actual key
    console.log('Token:', token);
    if (!token) {
      throw new Error('Authentication token is missing');
    }
    const url = `${baseUrl}/api/test/update/assignedGroupTest/${id}`;
    const response = await axios.put(
      url,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (response.status === 200) {
      return response.data.data; // Assuming API returns data in the "data" field
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating test assignment:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}