import { baseUrl } from "../env/Env";

// http://localhost:8080/api/testSession/groups/byStudent

export const fetchStudentGroupsBySession = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/testSession/groups/byStudent`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}` // replace YOUR_ACCESS_TOKEN with your actual access token
        }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching student groups by session:", error);
    throw error;
  }
};

// http://localhost:8080/api/testSession/assignedTests/byGroup/57184a5f-a950-473a-8596-0f134428e907

export const fetchAssignedTestsByGroup = async (groupId:any) => {
  try {
    const response = await fetch(`${baseUrl}/api/testSession/assignedTests/byGroup/${groupId}`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}` // replace YOUR_ACCESS_TOKEN with your actual access token
        }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching assigned tests by group:", error);
    throw error;
  }
};

// http://localhost:8080/api/testSession/start : Start a test session

export const startTestSession = async (testSession: any) => {
  try {
    const response = await fetch(`${baseUrl}/api/testSession/start`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}` // replace YOUR_ACCESS_TOKEN with your actual access token
        },
        body: JSON.stringify(testSession)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error starting test session:", error);
    throw error;
  }
};

// http://localhost:8080/api/testSession/end : Submit a test session

export const endTestSession = async (testSession: any) => {
  try {
    const response = await fetch(`${baseUrl}/api/testSession/end`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}` // replace YOUR_ACCESS_TOKEN with your actual access token
        },
        body: JSON.stringify(testSession)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting test session:", error);
    throw error;
  }
};


// http://localhost:8080/api/testSession/results/byStudent

export const fetchStudentResultsBySession = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/testSession/results/byStudent`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}` // replace YOUR_ACCESS_TOKEN with your actual access token
        }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching student results by session:", error);
    throw error;
  }
};

// /results/byGroupTest/:assignedTestGroupId',

export const fetchGroupTestResultsByAssignedTestGroup = async (assignedTestGroupId: any) => {
  try {
    const response = await fetch(`${baseUrl}/api/testSession/results/byGroupTest/${assignedTestGroupId}`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}` // replace YOUR_ACCESS_TOKEN with your actual access token
        }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching group test results by assigned test group:", error);
    throw error;
  }
};


// '/incomplete/byStudent'

export const fetchIncompleteTestsByStudent = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/testSession/incomplete/byStudent`,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}` // replace YOUR_ACCESS_TOKEN with your actual access token
        }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching incomplete tests by student:", error);
    throw error;
  }
}; 
  



