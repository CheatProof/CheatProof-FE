import React, { useState, useEffect } from 'react';
import { Box, Typography, Card  } from '@mui/material';
import { FiFileText } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';
import Settings from './Settings';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UpdateAssignedGroupTest } from '@/api/grouptest';
import toast, { Toaster } from 'react-hot-toast';
import { fetchGroupTestResultsByAssignedTestGroup } from '@/api/test-session';
import { getAssignedGroupTest } from '@/api/group';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface Result {
  name: string;
  lastName: string;
  percentage: number;
  totalPoints: number;
  score: number;
  duration: string;
  date: string;
  member: any;
  id: string;
}

const props:any={}

const exportToCSV = (data: Result[], filename: string) => {
  const headers = ['Name','Last Name' ,'Percentage', 'Obtained Marks', "Total Marks", 'Duration', 'Date'];
  const csvContent =
    [headers.join(','), ...data.map((row) => `${row.name},${row.lastName},${row.percentage},${row.score},${row.totalPoints},${row.duration},${row.date}`)].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
};

const TestDetails: React.FC = () => {
  const { id } = useParams();
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Result; direction: 'asc' | 'desc' } | null>(null);

  const safeValue = (value: any, fallback: any = "N/A") => (value !== null && value !== undefined ? value : fallback);

  const location = useLocation();
  const { groupTest1, group1 } = location?.state;
  console.log(groupTest1);

  const [testName, setTestName] = useState(groupTest1?.AssignedTests?.Tests?.testName);
  const [groupName, setGroupName] = useState(group1?.groupName);
  const [groupTest, setGroupTest] = useState(groupTest1);
  const [group, setGroup] = useState(group1);

  const handleSave = async (body: any, setLoading: any) => {
    setLoading(true);
    try {
      const assignBody = {
        ...body,
        groupId: group.id,
        testId: groupTest.AssignedTests.Tests.id,
      };

      const response = await UpdateAssignedGroupTest(groupTest.assignedTestId, assignBody);
      console.log(response);
      await fetchGroupTest();
      toast.success("Changes saved Successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error updating assigned group test:", error);
      toast.error("Error updating assigned group test");
      setLoading(false);
    }
  };

  const fetchGroupTest = async () => {
    try {
      const response = await getAssignedGroupTest(id);
      setGroupTest(response?.data);
      setTestName(response.data?.AssignedTests?.Tests?.testName);
    } catch (err) {
      console.error("Error fetching group test:", err);
      toast.error("Error fetching group test");
    }
  };

  const fetchResults = async () => {
    try {
      const results = await fetchGroupTestResultsByAssignedTestGroup(id);

      if (!results || results.code !== 200) {
        throw new Error("Failed to fetch results or invalid response structure.");
      }

      console.log(results);

      setGroup(results.data.Groups);
      setGroupName(results.data.Groups.groupName);
      const transformedResults = transformData(results);

      if (transformedResults.length > 0) {
        const totalScores = transformedResults.reduce((acc, item) => acc + item.score, 0);
        const totalMaxScores = transformedResults.reduce((acc, item) => acc + item.totalPoints, 0);
        const totalDurations = transformedResults.reduce((acc, item) => acc + parseDuration(item.duration), 0);

        const averageResult: any = {
          name: "Average",
          percentage: ((totalScores / totalMaxScores) * 100).toFixed(2),
          totalPoints: `${totalMaxScores}`,
          score: `${(totalScores/transformedResults.length).toFixed(2)}`,
          
          duration: formatDuration(totalDurations / transformedResults.length),
          date: "N/A",
        };
        setAverageResult(averageResult)

        // transformedResults.unshift(averageResult);
      }

      setResults(transformedResults);
      setFilteredResults(transformedResults);
    } catch (error) {
      console.error("Error fetching group test results:", error);
    }
  };

  const [averageResult,setAverageResult] = useState<any>({
    name: "Average",
    percentage: 0,
    totalPoints: 0,
    score: 0,
    duration: "00:00:00",
    date: "N/A",
  })

  const parseDuration = (duration: any) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatDuration = (totalSeconds: any) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return [hours, minutes, seconds]
      .map((val) => String(val).padStart(2, '0'))
      .join(':');
  };

  const transformData = (data: any): Result[] => {
    const groupMembers = data?.data?.Groups?.GroupMembers;

    return groupMembers.flatMap((member: any) => {
      return member.TestSessions.map((session: any) => {
        const { points = 0, totalPoints = 0, duration = 0, dateStarted = 0 } = session.TestResults || {};
        const percentage = ((points / totalPoints) * 100).toFixed(2);
        const formattedDuration = new Date(duration).toISOString().substr(11, 8);
        const formattedDate = new Date(dateStarted).toLocaleDateString() + " " + new Date(dateStarted).toLocaleTimeString();

        return {
          name: member.firstName,
          lastName: member.lastName,
          percentage: parseFloat(percentage),
          score: points,
          totalPoints: totalPoints,
          duration: formattedDuration,
          date: formattedDate,
          member: member,
          id: session.id,
        };
      });
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
    fetchGroupTest();
  }, []);

  const getPercentageColor = (percentage: any) => {
    const red = percentage < 50 ? 255 : Math.floor(255 - (percentage - 50) * 5.1);
    const green = percentage > 50 ? 255 : Math.floor(percentage * 5.1);
    return `rgb(${red}, ${green}, 0)`;
  };

  const handleSearch = (query: string) => {
    console.log('handleSearch', query);
    setSearchQuery(query);
    const filtered = results.filter(
      (result) =>
        result.name.toLowerCase().includes(query.toLowerCase()) ||
      result.lastName.includes(query)
      
      
    );
    setFilteredResults(filtered);
  };

  const handleSort = (key: keyof Result) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredResults].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredResults(sorted);
  };

  return (
    <Box className="min-h-[90vh]" sx={{ px: 2, pb: 2 }}>
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
            {groupTest?.AssignedTests?.availabilityStatus === "available" ? "Available" : "Unavailable"}
          </button>
          <button onClick={() => exportToCSV(filteredResults, `'${groupName}_${testName}_results.csv'`)} className="border border-blue-900 text-fore hover:text-white hover:bg-fore px-5 py-2 rounded-lg flex justify-center items-center">
            Export to CSV
          </button>
        </Box>
      </Card>

      <Tabs value={"Results"} indicatorColor="primary" textColor="primary">
        <TabsHeader {...props} className='bg-blue-gray-100'>
          <Tab {...props} key={0} value="Results">Results ({filteredResults.length})</Tab>
          <Tab {...props} key={1} value="Settings">Settings</Tab>
          <Tab {...props} key={2} value="Statistics">Statistics</Tab>
        </TabsHeader>

        <TabsBody {...props}>
          <TabPanel value="Results" key={0}>
            <Box sx={{ mt: 3 }}>
            <div className="relative my-2">
              <Input
                type="text"
                placeholder="Search Student"
                value={searchQuery}
                onChange={(e: any) => handleSearch(e.target.value)}
                className="pl-10 w-56"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
              <Table className="bg-gray-50">
                <TableCaption>Summary of Results</TableCaption>
                <TableHeader className="bg-color1/20">
                  <TableRow>
                    <TableHead className='cursor-pointer hover:bg-blue-gray-300'  onClick={() => handleSort('name')}>First Name {sortConfig?.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓')             : '↑'}</TableHead>
                    <TableHead className='cursor-pointer hover:bg-blue-gray-300' onClick={() => handleSort('lastName')}>Last Name {sortConfig?.key === 'lastName' ? (sortConfig.direction === 'asc' ? '↑' : '↓')      : '↑'}</TableHead>
                    <TableHead className='cursor-pointer hover:bg-blue-gray-300' onClick={() => handleSort('percentage')}>Percentage {sortConfig?.key === 'percentage' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↑'}</TableHead>
                    <TableHead className='cursor-pointer hover:bg-blue-gray-300' onClick={() => handleSort('score')}>Obtained Marks {sortConfig?.key === 'score' ? (sortConfig.direction === 'asc' ? '↑' : '↓')                : '↑'}</TableHead>
                    <TableHead className='cursor-pointer hover:bg-blue-gray-300' onClick={() => handleSort('totalPoints')}>Total Marks {sortConfig?.key === 'totalPoints' ? (sortConfig.direction === 'asc' ? '↑' : '↓')                : '↑'}</TableHead>

                    <TableHead className='cursor-pointer hover:bg-blue-gray-300' onClick={() => handleSort('duration')}>Duration {sortConfig?.key === 'duration' ? (sortConfig.direction === 'asc' ? '↑' : '↓')       : '↑'}</TableHead>
                    <TableHead className='cursor-pointer hover:bg-blue-gray-300' onClick={() => handleSort('date')}>Date {sortConfig?.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓')                   : '↑'}</TableHead>

                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                  <TableCell>
                          <Box className="flex w-72 items-center">
                            <Avatar className="mr-2 bg-color1/20">
                              <AvatarFallback className="bg-color1/20"> {<FaUsers />}</AvatarFallback>
                            </Avatar>
                            <span>Average</span>
                            {true && (
                              <Button variant="ghost" className="ml-2 p-1">
                                <BiHelpCircle />
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>{safeValue("N/A")}</TableCell>
                        <TableCell>
                          <Box className="flex items-center">
                            <Box
                              className="h-2 rounded-full"
                              style={{
                                width: `${safeValue(averageResult.percentage, 0)}%`,
                                backgroundColor: getPercentageColor(safeValue(averageResult.percentage, 0)),
                              }}
                            />
                            <span className="ml-2">{safeValue(averageResult.percentage, 0)}%</span>
                          </Box>
                        </TableCell>
                        <TableCell>{safeValue(averageResult.score)}</TableCell>
                        <TableCell>{safeValue("N/A")}</TableCell>
                        <TableCell>{safeValue(averageResult.duration)}</TableCell>
                        <TableCell>{safeValue(averageResult.date)}</TableCell>
                       

                  </TableRow>
                  {filteredResults.length > 0 ? (
                    filteredResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box className="flex w-72 items-center">
                            <Avatar className="mr-2 bg-color1/20">
                              <AvatarFallback className="bg-color1/20"> {false ? <FaUsers /> : safeValue(result.name, "N/A").charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span>{safeValue(result.name)}</span>
                            {false && (
                              <Button variant="ghost" className="ml-2 p-1">
                                <BiHelpCircle />
                              </Button>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>{safeValue(result.lastName)}</TableCell>
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
                        <TableCell>{safeValue(result.totalPoints)}</TableCell>

                        <TableCell>{safeValue(result.duration)}</TableCell>
                        <TableCell>{safeValue(result.date)}</TableCell>
                        <TableCell>
                          {true  && (
                            <Button onClick={() => navigate(`/teacher-dashboard/group-member/test-result/${result.id}`, {
                              state: {
                                user: result.member,
                                testName: testName,
                                groupName: groupName
                              }
                            })} variant="outline" className="rounded-lg bg-color1 text-white">
                              Answers
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No results available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      End of Results
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Box>
          </TabPanel>

          <TabPanel value="Settings" key={1}>
            <div className='mt-2 pb-2 overflow-hidden pr-3 transition-all min-h-[70vh] bg-white rounded-lg'>
              {groupTest && <Settings groupTest={groupTest?.AssignedTests} handleSave={handleSave} />}
            </div>
          </TabPanel>

          <TabPanel value="Statistics" key={2}>
            <div>Under Development</div>
          </TabPanel>
        </TabsBody>
      </Tabs>

      <Toaster />
    </Box>
  );
};

export default TestDetails;