// import React, { useState } from 'react';
// import { Box, Typography, Button, Card, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
// import { FiFileText } from 'react-icons/fi';
// import { FaUsers } from 'react-icons/fa';
// import { BiHelpCircle } from 'react-icons/bi';
// import Settings from './Settings';

// interface Result {
//   name: string;
//   percentage: number;
//   score: string;
//   duration: string;
//   date: string;
// }

// const results: Result[] = [
//   { name: 'Average', percentage: 4, score: '2 / 50', duration: '00:04:44', date: '' },
//   { name: 'yabzar naqvi', percentage: 4, score: '2 / 50', duration: '00:04:44', date: "Sat 21 Sep '24 6:37pm" },
// ];

// const TestDetails: React.FC = () => {
//   const [activeTab, setActiveTab] = useState(0);

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     console.log(event);
//     setActiveTab(newValue);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Header Card */}
//       <Card sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Box display="flex" alignItems="center">
//           <FiFileText size={30} />
//           <Box ml={2}>
//             <Typography variant="h5">CCN prep</Typography>
//             <Box display="flex" alignItems="center" mt={1}>
//               <FaUsers />
//               <Typography ml={1}>Section B</Typography>
//             </Box>
//           </Box>
//         </Box>
//         <Box display="flex" gap={2}>
//           {/* <Button variant="contained" color="success">Available</Button> */}
//           <button
//           className=" bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg"
//         >
//           Available
//         </button>
//         <button
//           className="border border-blue-900 text-blue-950 hover:text-white hover:bg-blue-950 px-5 py-2 rounded-lg flex justify-center items-center"
//         >
//           <FiFileText className='mx-1' />
//           Preview
//         </button>
//           {/* <Button variant="outlined" startIcon={<FiFileText />}>Preview</Button> */}
//         </Box>
//       </Card>

//       {/* Tabs */}
//       <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
//         <Tab label="Results" />
//         <Tab label="Settings" />
//         <Tab label="Statistics" />
//       </Tabs>

//       {/* Tab Content */}
//       {activeTab === 0 && (
//         <Box sx={{ mt: 3 }}>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell><Typography fontWeight="bold">Name</Typography></TableCell>
//                   <TableCell><Typography fontWeight="bold">Percentage</Typography></TableCell>
//                   <TableCell><Typography fontWeight="bold">Score</Typography></TableCell>
//                   <TableCell><Typography fontWeight="bold">Duration</Typography></TableCell>
//                   <TableCell><Typography fontWeight="bold">Date</Typography></TableCell>
//                   <TableCell><Typography fontWeight="bold">Actions</Typography></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {results.map((result, index) => (
//                   <TableRow key={index}>
//                     <TableCell>
//                       <Box display="flex" alignItems="center">
//                         <Avatar sx={{ mr: 2 }}>
//                           {index === 0 ? <FaUsers /> : result.name.charAt(0).toUpperCase()}
//                         </Avatar>
//                         <Typography>{result.name}</Typography>
//                         {index === 0 && (
//                           <IconButton>
//                             <BiHelpCircle />
//                           </IconButton>
//                         )}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
//                         <Box
//                           sx={{
//                             width: `${result.percentage}%`,
//                             bgcolor: result.percentage > 0 ? 'primary.main' : 'transparent',
//                             height: '8px',
//                             borderRadius: '4px',
//                           }}
//                         />
//                         <Typography sx={{ ml: 1 }}>{result.percentage}%</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell>{result.score}</TableCell>
//                     <TableCell>{result.duration}</TableCell>
//                     <TableCell>{result.date}</TableCell>
//                     <TableCell>
//                       {index !== 0 && <Button variant="outlined">Answers</Button>}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}
//         {activeTab === 1 && <Settings />}
//     </Box>
//   );
// };

// export default TestDetails;


// import React, { useState, useEffect } from 'react'; 
// import { Box, Typography, Button, Card, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
// import { FiFileText } from 'react-icons/fi';
// import { FaUsers } from 'react-icons/fa';
// import { BiHelpCircle } from 'react-icons/bi';
// import axios from 'axios';
// import Settings from './Settings';

// interface Result {
//   name: string;
//   percentage: number;
//   score: string;
//   duration: string;
//   date: string;
// }

// const results: Result[] = [
//   { name: 'Average', percentage: 4, score: '2 / 50', duration: '00:04:44', date: '' },
//   { name: 'yabzar naqvi', percentage: 4, score: '2 / 50', duration: '00:04:44', date: "Sat 21 Sep '24 6:37pm" },
// ];

// const TestDetails: React.FC = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [testName, setTestName] = useState('CCN prep'); // Default test name
//   const [groupName, setGroupName] = useState('Section B'); // Default group name
//   const testId = '56b14a68-1b49-4c26-ada9-ed162fbc7b55'; // Example test ID
//   const groupId = 'dd158061-6de4-472b-8815-1bdd4e4d4a09'; // Example group ID

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setActiveTab(newValue);
//   };

//   useEffect(() => {
//     const fetchTestDetails = async () => {
//       try {
//         // Making the POST request
//         const response = await axios.post('http://localhost:8080/api/test/assign/groupTest/new', {
//           testId,
//           groupId,
//         });

//         if (response.status === 201) {
//           // Dynamically update test and group name based on the response
//           setTestName(response.data.data.testName || 'Test Name');
//           setGroupName(response.data.data.groupName || 'Group Name');
//         }
//       } catch (error) {
//         console.error('Error assigning test to group:', error);
//       }
//     };

//     fetchTestDetails();
//   }, [testId, groupId]);

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Header Card */}
//       <Card sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Box display="flex" alignItems="center">
//           <FiFileText size={30} />
//           <Box ml={2}>
//             <Typography variant="h5">{testName}</Typography>
//             <Box display="flex" alignItems="center" mt={1}>
//               <FaUsers />
//               <Typography ml={1}>{groupName}</Typography>
//             </Box>
//           </Box>
//         </Box>
//         <Box display="flex" gap={2}>
//           <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg">
//             Available
//           </button>
//           <button className="border border-blue-900 text-blue-950 hover:text-white hover:bg-blue-950 px-5 py-2 rounded-lg flex justify-center items-center">
//             <FiFileText className="mx-1" />
//             Preview
//           </button>
//         </Box>
//       </Card>

//       {/* Tabs */}
//       <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
//         <Tab label="Results" />
//         <Tab label="Settings" />
//         <Tab label="Statistics" />
//       </Tabs>

//       {/* Tab Content */}
//       {activeTab === 0 && (
//         <Box sx={{ mt: 3 }}>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <Typography fontWeight="bold">Name</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">Percentage</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">Score</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">Duration</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">Date</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">Actions</Typography>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {results.map((result, index) => (
//                   <TableRow key={index}>
//                     <TableCell>
//                       <Box display="flex" alignItems="center">
//                         <Avatar sx={{ mr: 2 }}>
//                           {index === 0 ? <FaUsers /> : result.name.charAt(0).toUpperCase()}
//                         </Avatar>
//                         <Typography>{result.name}</Typography>
//                         {index === 0 && (
//                           <IconButton>
//                             <BiHelpCircle />
//                           </IconButton>
//                         )}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
//                         <Box
//                           sx={{
//                             width: `${result.percentage}%`,
//                             bgcolor: result.percentage > 0 ? 'primary.main' : 'transparent',
//                             height: '8px',
//                             borderRadius: '4px',
//                           }}
//                         />
//                         <Typography sx={{ ml: 1 }}>{result.percentage}%</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell>{result.score}</TableCell>
//                     <TableCell>{result.duration}</TableCell>
//                     <TableCell>{result.date}</TableCell>
//                     <TableCell>
//                       {index !== 0 && <Button variant="outlined">Answers</Button>}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}
//       {activeTab === 1 && <Settings />}
//     </Box>
//   );
// };

// export default TestDetails;





// import React, { useState, useEffect } from 'react'; 
// import { Box, Typography, Button, Card, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
// import { FiFileText } from 'react-icons/fi';
// import { FaUsers } from 'react-icons/fa';
// import { BiHelpCircle } from 'react-icons/bi';
// import axios from 'axios';
// import Settings from './Settings';

// interface Result {
//   name: string;
//   percentage: number;
//   score: string;
//   duration: string;
//   date: string;
// }

// const results: Result[] = [
//   { name: 'Average', percentage: 4, score: '2 / 50', duration: '00:04:44', date: '' },
//   { name: 'yabzar naqvi', percentage: 4, score: '2 / 50', duration: '00:04:44', date: "Sat 21 Sep '24 6:37pm" },
// ];

// const TestDetails: React.FC = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [testName, setTestName] = useState('CCN prep'); // Default test name
//   const [groupName, setGroupName] = useState('Section B'); // Default group name
//   const testId = '56b14a68-1b49-4c26-ada9-ed162fbc7b55'; // Example test ID
//   const groupId = 'dd158061-6de4-472b-8815-1bdd4e4d4a09'; // Example group ID

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setActiveTab(newValue);
//   };
//   useEffect(() => {
//     const fetchTestDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         console.log('Token retrieved:', token); // Add this log to check if token is retrieved
  
//         if (!token) {
//           throw new Error('Authentication token is missing');
//         }
  
//         const url = `http://localhost:8080/api/test/assign/groupTest/new?testId=${testId}&groupId=${groupId}`;
  
//         const response = await axios.post(
//           url,
//           {},
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
  
//         console.log('API Response:', response.data);
  
//         if (response.status === 201) {
//           const { testName, groupName } = response.data.data;
//           setTestName(testName || 'Default Test Name');
//           setGroupName(groupName || 'Default Group Name');
//         } else {
//           console.error('Unexpected response status:', response.status);
//         }
//       } catch (error) {
//         console.error('Error assigning test to group:', error);
//       }
//     };
  
//     fetchTestDetails();
//   }, [testId, groupId]);
  
//   // useEffect(() => {
//   //   const fetchTestDetails = async () => {
//   //     try {
//   //       const url = `http://localhost:8080/api/test/assign/groupTest/new?testId=${testId}&groupId=${groupId}`;
  
//   //       // Retrieve token from localStorage (or wherever it’s stored)
//   //       const token = localStorage.getItem('authToken'); // Replace 'authToken' with the actual key
  
//   //       if (!token) {
//   //         throw new Error('Authentication token is missing');
//   //       }
  
//   //       // Making the POST request with Authorization header
//   //       const response = await axios.post(
//   //         url,
//   //         {},
//   //         {
//   //           headers: {
//   //             'Content-Type': 'application/json',
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         }
//   //       );
        
//   //       console.log('API Response:', response.data);
  
//   //       if (response.status === 201) {
//   //         const { testName, groupName } = response.data.data;
//   //         setTestName(testName || 'Default Test Name');
//   //         setGroupName(groupName || 'Default Group Name');
//   //       } else {
//   //         console.error('Unexpected response status:', response.status);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error assigning test to group:', error);
//   //     }
//   //   };
  
//   //   fetchTestDetails();
//   // }, [testId, groupId]);
   
//   // useEffect(() => {
//   //   const fetchTestDetails = async () => {
//   //     try {
//   //       // Constructing the URL with query parameters
//   //       const url = `http://localhost:8080/api/test/assign/groupTest/new?testId=${testId}&groupId=${groupId}`;
  
//   //       // Making the POST request
//   //       const response = await axios.post(url);
  
//   //       // Debugging: Log the full response
//   //       console.log('API Response:', response.data);
  
//   //       if (response.status === 201) {
//   //         const { testName, groupName } = response.data.data;
  
//   //         // Check if values exist before updating state
//   //         setTestName(testName || 'Default Test Name');
//   //         setGroupName(groupName || 'Default Group Name');
//   //       } else {
//   //         console.error('Unexpected response status:', response.status);
//   //       }
//   //     } catch (error) {
//   //       // Log the exact error
//   //       console.error('Error assigning test to group:', error);
//   //     }
//   //   };
  
//   //   fetchTestDetails();
//   // }, [testId, groupId]); // Ensure testId and groupId trigger this effect
  

  
//   // useEffect(() => {
//   //   const fetchTestDetails = async () => {
//   //     try {
//   //       // Constructing the URL with query parameters
//   //       const url = `http://localhost:8080/api/test/assign/groupTest/new?testId=${testId}&groupId=${groupId}`;

//   //       // Making the POST request
//   //       const response = await axios.post(url);

//   //       if (response.status === 201) {
//   //         // Dynamically update test and group name based on the response
//   //         setTestName(response.data.data.testName || 'Test Name');
//   //         setGroupName(response.data.data.groupName || 'Group Name');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error assigning test to group:', error);
//   //     }
//   //   };

//   //   fetchTestDetails();
//   // }, [testId, groupId]);



//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Header Card */}
//       <Card sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Box display="flex" alignItems="center">
//           <FiFileText size={30} />
//           <Box ml={2}>
//             <Typography variant="h5">{testName}</Typography>
//             <Box display="flex" alignItems="center" mt={1}>
//               <FaUsers />
//               <Typography ml={1}>{groupName}</Typography>
//             </Box>
//           </Box>
//         </Box>
//         <Box display="flex" gap={2}>
//           <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg">
//             Available
//           </button>
//           <button className="border border-blue-900 text-blue-950 hover:text-white hover:bg-blue-950 px-5 py-2 rounded-lg flex justify-center items-center">
//             <FiFileText className="mx-1" />
//             Preview
//           </button>
//         </Box>
//       </Card>

//       {/* Tabs */}
//       <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
//         <Tab label="Results" />
//         <Tab label="Settings" />
//         <Tab label="Statistics" />
//       </Tabs>

//       {/* Tab Content */}
//       {activeTab === 0 && (
//         <Box sx={{ mt: 3 }}>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <Typography fontWeight="bold">Name</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">Percentage</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">Score</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">Duration</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">Date</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">Actions</Typography>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {results.map((result, index) => (
//                   <TableRow key={index}>
//                     <TableCell>
//                       <Box display="flex" alignItems="center">
//                         <Avatar sx={{ mr: 2 }}>
//                           {index === 0 ? <FaUsers /> : result.name.charAt(0).toUpperCase()}
//                         </Avatar>
//                         <Typography>{result.name}</Typography>
//                         {index === 0 && (
//                           <IconButton>
//                             <BiHelpCircle />
//                           </IconButton>
//                         )}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
//                         <Box
//                           sx={{
//                             width: `${result.percentage}%`,
//                             bgcolor: result.percentage > 0 ? 'primary.main' : 'transparent',
//                             height: '8px',
//                             borderRadius: '4px',
//                           }}
//                         />
//                         <Typography sx={{ ml: 1 }}>{result.percentage}%</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell>{result.score}</TableCell>
//                     <TableCell>{result.duration}</TableCell>
//                     <TableCell>{result.date}</TableCell>
//                     <TableCell>
//                       {index !== 0 && <Button variant="outlined">Answers</Button>}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}
//       {activeTab === 1 && <Settings />}
//     </Box>
//   );
// };

// export default TestDetails;



import React, { useState, useEffect } from 'react'; 
import { Box, Typography, Button, Card, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
import { FiFileText } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';
import { fetchTestDetails } from '@/api/grouptest'; // Import the API function
import Settings from './Settings';

interface Result {
  name: string;
  percentage: number;
  score: string;
  duration: string;
  date: string;
}

const results: Result[] = [
  { name: 'Average', percentage: 4, score: '2 / 50', duration: '00:04:44', date: '' },
  { name: 'yabzar naqvi', percentage: 4, score: '2 / 50', duration: '00:04:44', date: "Sat 21 Sep '24 6:37pm" },
];

const TestDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [testName, setTestName] = useState('CCN prep'); // Default test name
  const [groupName, setGroupName] = useState('Section B'); // Default group name
  const testId = '56b14a68-1b49-4c26-ada9-ed162fbc7b55'; // Example test ID
  const groupId = 'dd158061-6de4-472b-8815-1bdd4e4d4a09'; // Example group ID

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const getTestDetails = async () => {
      try {
        const data = await fetchTestDetails();
        setTestName(data.testName || 'Default Test Name');
        setGroupName(data.groupName || 'Default Group Name');
      } catch (error) {
        console.error('Error while fetching test details:', error);
      }
    };

    getTestDetails();
  }, [testId, groupId]);

  // useEffect(() => {
  //   const getTestDetails = async () => {
  //     try {
  //       const data = await fetchTestDetails(testId, groupId);
  //       console.log('Fetched Test Details:', data);

  //       if (data && data.data) {
  //         const { testName, groupName } = data.data;
  //         setTestName(testName || 'Default Test Name');
  //         setGroupName(groupName || 'Default Group Name');
  //       }
  //     } catch (error) {
  //       console.error('Error while fetching test details:', error);
  //     }
  //   };

  //   getTestDetails();
  // }, [testId, groupId]);
  return (
    <Box sx={{ p: 3 }}>
      {/* Header Card */}
      <Card sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center">
          <FiFileText size={30} />
          <Box ml={2}>
            <Typography variant="h5">{testName}</Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <FaUsers />
              <Typography ml={1}>{groupName}</Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" gap={2}>
          <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg">
            Available
          </button>
          <button className="border border-blue-900 text-blue-950 hover:text-white hover:bg-blue-950 px-5 py-2 rounded-lg flex justify-center items-center">
            <FiFileText className="mx-1" />
            Preview
          </button>
        </Box>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
        <Tab label="Results" />
        <Tab label="Settings" />
        <Tab label="Statistics" />
      </Tabs>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box sx={{ mt: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Percentage</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Score</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Duration</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ mr: 2 }}>
                          {index === 0 ? <FaUsers /> : result.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography>{result.name}</Typography>
                        {index === 0 && (
                          <IconButton>
                            <BiHelpCircle />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: `${result.percentage}%`,
                            bgcolor: result.percentage > 0 ? 'primary.main' : 'transparent',
                            height: '8px',
                            borderRadius: '4px',
                          }}
                        />
                        <Typography sx={{ ml: 1 }}>{result.percentage}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>{result.duration}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>
                      {index !== 0 && <Button variant="outlined">Answers</Button>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {activeTab === 1 && <Settings />}
    </Box>
  );
};

export default TestDetails;
