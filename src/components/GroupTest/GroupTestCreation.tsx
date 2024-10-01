import React, { useState } from 'react';
import { Box, Typography, Button, Card, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
import { FiFileText } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Card */}
      <Card sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center">
          <FiFileText size={30} />
          <Box ml={2}>
            <Typography variant="h5">CCN prep</Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <FaUsers />
              <Typography ml={1}>Section B</Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" gap={2}>
          <Button variant="contained" color="success">Available</Button>
          <Button variant="outlined" startIcon={<FiFileText />}>Preview</Button>
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
                  <TableCell><Typography fontWeight="bold">Name</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Percentage</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Score</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Duration</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Date</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Actions</Typography></TableCell>
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
