import React, { useState, useEffect } from 'react';
import { Box, Typography, Card } from '@mui/material';
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
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableFooter, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar,AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
 
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

  const [results, setResults] = useState<Result[]>([ ]);

  const safeValue = (value:any, fallback:any = "N/A") => (value !== null && value !== undefined ? value : fallback);

  const location = useLocation();
  const { groupTest1, group1 } = location?.state;
  console.log(groupTest1)


  const [testName,setTestName] = useState(groupTest1?.AssignedTests?.Tests?.testName); // Default test name
  const [groupName,setgroupName] = useState(group1?.groupName); // Default group name
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
      const results = await fetchGroupTestResultsByAssignedTestGroup(id);

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
    const groupMembers = data?.data?.Groups?.GroupMembers;

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


const props:any={}

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
    <Box className="min-h-[90vh]" sx={{ px: 2,pb:2 }}>
      {/* Header Card */}
      <Card className="!rounded-lg" sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center">
          <FiFileText className="bg-color1/20 p-3 border-color1 border-[1px] rounded" size={60} />
          <Box ml={2}>
            <Typography className="!font-[Poppins]" variant="h5">{testName}</Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <FaUsers />
              <Typography className="!font-[Poppins]" ml={1}>{groupName}</Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" gap={2}>
          <button className="bg-color1 hover:bg-fore text-white px-5 py-2 rounded-lg">
          {groupTest?.AssignedTests?.availabilityStatus==="available"?"Available":"Unavailable"}
          </button>
          {/* <button className="border border-blue-900 text-fore hover:text-white hover:bg-fore px-5 py-2 rounded-lg flex justify-center items-center">
            <FiFileText className="mx-1" />
            Preview
          </button> */}
          <button onClick={() => exportToCSV(results, 'test_results.csv')} className="border border-blue-900 text-fore hover:text-white hover:bg-fore px-5 py-2 rounded-lg flex justify-center items-center">
            Export to CSV
          </button>
        </Box>
      </Card>

      {/* Tabs */}
      <Tabs value={"Results"}  indicatorColor="primary" textColor="primary">
        <TabsHeader className='bg-blue-gray-100' {...props}>
        <Tab {...props} key={0} value="Results" >Results</Tab>
        <Tab {...props} key={1} value="Settings" >Settings</Tab>
        <Tab {...props} key={2} value="Statistics" >Statistics</Tab>
        </TabsHeader>

        <TabsBody {...props}>
          <TabPanel value="Results" key={0}>

          <Box sx={{ mt: 3 }}>
          <Table className="bg-gray-50">
      <TableCaption>Summary of Results</TableCaption>
      <TableHeader className="bg-color1/20">
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Percentage</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.length > 0 ? (
          results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box className="flex items-center">
                  <Avatar  className="mr-2 bg-color1/20">
                   
                    <AvatarFallback className="bg-color1/20"> {index === 0 ? <FaUsers /> : safeValue(result.name, "N/A").charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{safeValue(result.name)}</span>
                  {index === 0 && (
                    <Button variant="ghost" className="ml-2 p-1">
                      <BiHelpCircle />
                    </Button>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <Box className="flex items-center">
                  <Box
                    className="h-2 rounded-full"
                    style={{
                      width: `${safeValue(result.percentage, 0)}%`,
                      backgroundColor: getPercentageColor(safeValue(result.percentage, 0)),
                    }}
                  />
                  <span className="ml-2">{safeValue(result.percentage, 0)}%</span>
                </Box>
              </TableCell>
              <TableCell>{safeValue(result.score)}</TableCell>
              <TableCell>{safeValue(result.duration)}</TableCell>
              <TableCell>{safeValue(result.date)}</TableCell>
              <TableCell>
                {index !== 0 && (
                  <Button variant="outline" className="rounded-lg bg-color1 text-white">
                    Answers
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No results available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6} className="text-center">
            End of Results
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
        </Box>

          </TabPanel>

          <TabPanel value="Settings" key={0}>
          <div className='mt-2 pb-2 overflow-hidden pr-3 transition-all min-h-[70vh] bg-white rounded-lg'>
         {groupTest && <Settings groupTest={groupTest?.AssignedTests} handleSave={handleSave} />}

        </div>
          </TabPanel>


      <TabPanel value="Statistics" key={0}>
<div>Under Develpoement</div>
      </TabPanel>

        </TabsBody>
      </Tabs>

      {/* Tab Content */}
    
     
      <Toaster />
    </Box>
  );
};

export default TestDetails;
