import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
import { FiFileText } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';
// import { fetchTestDetails } from '@/api/grouptest'; // Import the API function
import Settings from './Settings';
import { useLocation, useParams } from 'react-router-dom';
import { UpdateAssignedGroupTest } from '@/api/grouptest';
import toast, { Toaster } from 'react-hot-toast';
import { fetchGroupTestResultsByAssignedTestGroup } from '@/api/test-session';
import { getAssignedGroupTest } from '@/api/group';
// import { console } from 'inspector';

interface Result {
  name: string;
  percentage: number;
  score: string;
  duration: string;
  date: string;
}


const exportToCSV = (data: Result[], filename: string) => {
  const headers = ['Name', 'Percentage', 'Score', 'Duration', 'Date'];
  const csvContent =
    [headers.join(','), ...data.map((row) => `${row.name},${row.percentage},${row.score},${row.duration},${row.date}`)].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
};

const TestDetails: React.FC = () => {
  const {id}=useParams();

  const [results, setResults] = useState<Result[]>([
    { name: 'Average', percentage: 4, score: '2 / 50', duration: '00:04:44', date: '' },
    { name: 'yabzar naqvi', percentage: 4, score: '2 / 50', duration: '00:04:44', date: "Sat 21 Sep '24 6:37pm" },
  ]);


  const location = useLocation();
  const { groupTest1, group1 } = location.state;
  console.log(groupTest1)

  const [activeTab, setActiveTab] = useState(0);
  const [testName,setTestName] = useState(groupTest1.AssignedTests.Tests.testName); // Default test name
  const [groupName,setgroupName] = useState(group1.groupName); // Default group name
  const [groupTest,setgroupTest] = useState(groupTest1); 
  const [group,setGroup]=useState(group1)

  

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
      toast.error("Error updating assigned group test");

      // Handle the error, such as showing an error message to the user
      // Example: toast.error("Failed to update the group test settings.");
    }
  };

  const fetchGroupTest = async()=>{
    try {
      const response = await getAssignedGroupTest(id);
      setgroupTest(response?.data);
      setTestName(response.data?.AssignedTests?.Tests?.testName);
      // setgroupName(response?.data?.Groups?.groupName);
      // setGroup(response?.data?.Groups);
      
  }catch(err) {
    console.error("Error fetching group test:", err);
    toast.error("Error fetching group test");
  }

}
  const fetchResults = async () => {
    try {
      // Fetch the results for the current test and group
      const results = await fetchGroupTestResultsByAssignedTestGroup(groupTest.id);

      if (!results || results.code !== 200) {
        throw new Error("Failed to fetch results or invalid response structure.");
      }

      console.log(results);

      setGroup(results.data.Groups);
      setgroupName(results.data.Groups.groupName);
      // Transform the results into the desired format
      const transformedResults = transformData(results);

      // Calculate the average
      if (transformedResults.length > 0) {
        const totalScores = transformedResults.reduce((acc, item) => acc + parseFloat(item.score.split('/')[0]), 0);
        const totalMaxScores = transformedResults.reduce((acc, item) => acc + parseFloat(item.score.split('/')[1]), 0);
        const totalDurations = transformedResults.reduce((acc, item) => acc + parseDuration(item.duration), 0);

        const averageResult: any = {
          name: "Average",
          percentage: ((totalScores / totalMaxScores) * 100).toFixed(2),
          score: `--`,
          duration: formatDuration(totalDurations / transformedResults.length), // average duration
          date: "N/A", // No specific date for the average entry
        };

        // Add the average as the first entry in the results array
        transformedResults.unshift(averageResult);
      }

      // Set the results state with the transformed data
      setResults(transformedResults);
    } catch (error) {
      console.error("Error fetching group test results:", error);
      // Optionally handle the error in the UI or log it further
    }
  };

  // Helper function to convert duration strings like "00:00:41" into seconds
  const parseDuration = (duration: any) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Helper function to format seconds into "HH:MM:SS"
  const formatDuration = (totalSeconds: any) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return [hours, minutes, seconds]
      .map((val) => String(val).padStart(2, '0'))
      .join(':');
  };





  function transformData(data: any): Result[] {
    const groupMembers = data.data.Groups.GroupMembers;

    return groupMembers.flatMap((member: any) => {
      const name = `${member.firstName} ${member.lastName}`;

      return member.TestSessions.map((session: any) => {
        const {
         
            points = 0,
            totalPoints = 0,
            duration = 0,
            dateStarted = 0
         
        } = session.TestResults || {};
        
        const percentage = ((points / totalPoints) * 100).toFixed(2);
        const formattedDuration = new Date(duration).toISOString().substr(11, 8); // Format HH:mm:ss
        const formattedDate = new Date(dateStarted).toLocaleDateString();

        return {
          name,
          percentage: parseFloat(percentage),
          score: `${points}/${totalPoints}`,
          duration: formattedDuration,
          date: formattedDate,
        };
      });
    });
  }


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setActiveTab(newValue);
  };

  useEffect(() => {

    fetchResults();
    fetchGroupTest();
  }, []);


  const getPercentageColor = (percentage: any) => {
    // Calculate the red and green components dynamically
    const red = percentage < 50 ? 255 : Math.floor(255 - (percentage - 50) * 5.1);
    const green = percentage > 50 ? 255 : Math.floor(percentage * 5.1);

    // Return the color in RGB format
    return `rgb(${red}, ${green}, 0)`;
  };





  return (
    <Box sx={{ px: 2 }}>
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
          <button onClick={() => exportToCSV(results, 'test_results.csv')} className="border border-blue-900 text-fore hover:text-white hover:bg-fore px-5 py-2 rounded-lg flex justify-center items-center">
            Export to CSV
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
                            bgcolor: getPercentageColor(result.percentage),
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
         {groupTest && <Settings groupTest={groupTest?.AssignedTests} handleSave={handleSave} />}

        </div>
      }
      <Toaster />
    </Box>
  );
};

export default TestDetails;
