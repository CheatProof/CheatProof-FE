import React, { useState, useEffect } from 'react'; 
import { Box, Typography, Button, Card, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
import { FiFileText } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';
// import { fetchTestDetails } from '@/api/grouptest'; // Import the API function
import Settings from './Settings';
import { useLocation } from 'react-router-dom';
import { UpdateAssignedGroupTest } from '@/api/grouptest';
import toast from 'react-hot-toast';
// import { console } from 'inspector';

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

  
  const location = useLocation();
  const {groupTest,group} = location.state;
  console.log(groupTest)
  
  const [activeTab, setActiveTab] = useState(0);
  const testName=groupTest.AssignedTests.Tests.testName; // Default test name
  const groupName = group.groupName; // Default group name

  const handleSave = async (body: any) => {
    try {
      // Save the group setting
      const assignBody = {
        ...body,
        groupId: group.id,
        testId: groupTest.AssignedTests.Tests.id,
       
      }
      const response = await UpdateAssignedGroupTest(groupTest.assignedTestId, assignBody);
  
      // Log the response for debugging purposes
      toast.success("Changes saved Successfully")
      console.log(response);
  
      // Update the state with the response or perform other necessary actions
      // For example: setState(response.data);
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error updating assigned group test:", error);
  
      // Handle the error, such as showing an error message to the user
      // Example: toast.error("Failed to update the group test settings.");
    }
  };
  


  

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setActiveTab(newValue);
  };

  useEffect(() => {

  }, []);


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
          <button className="bg-color1 hover:bg-fore text-white px-5 py-2 rounded-lg">
            Available
          </button>
          <button className="border border-blue-900 text-fore hover:text-white hover:bg-fore px-5 py-2 rounded-lg flex justify-center items-center">
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
      {activeTab === 1 && 
      <div className='mt-2'>
      <Settings groupTest={groupTest?.AssignedTests} handleSave={handleSave}/>

      </div>
      }
    </Box>
  );
};

export default TestDetails;
