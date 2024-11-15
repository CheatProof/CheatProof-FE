import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import testIcon from "../../assets/test.png";
import { IoArrowRedoSharp } from "react-icons/io5";
import { CgPlayButtonO } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { FcStatistics } from "react-icons/fc";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { Box, Grid, Button, Typography, IconButton, Card, CardContent, Tooltip, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { getTestById } from "../../api/test";

const TestDashboard: React.FC = () => {

    const {id} = useParams();
    const navigate = useNavigate()

    const [test, setTest] = useState<any>();
    const [loading, setLoading] = useState(true);

    const fetchTest=async()=>{
        // Fetch Test Data
        // Set test state and set loading to false
        const testData = await getTestById(id);
        if(testData.code === 200){
            console.log(loading)
            console.log(testData.data);
            setTest(testData.data);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchTest();
    }, [id]);
    




    return (

        <Box sx={{ display: 'flex', height: 'auto', backgroundColor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 5 }, backgroundColor: 'background.default' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* Main Test Card */}
                        <Card sx={{ boxShadow: 3, borderLeft: 4, borderColor: 'primary.main' }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} display="flex" flexDirection="column" justifyContent="space-between">
                                        <Box>
                                            <Typography variant="h5" component="h1" fontFamily="poppins" fontWeight="bold">
                                                {test?.testName}
                                            </Typography>
                                           
                                                <p className="mt-2" dangerouslySetInnerHTML={{__html:test?.testIntroduction}}></p>
                                              
                                           
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                            <Box display="flex" gap={2}>
                                                {/* <Button variant="contained" color="primary" onClick={()=>navigate(`/test-dashboard/preview/${id}`)} startIcon={<CgPlayButtonO />}>
                                                    Preview
                                                </Button>
                                                <Button variant="contained" color="secondary" startIcon={<IoArrowRedoSharp />}>
                                                    Assign Test
                                                </Button> */}
                                                <button
                                                className="bg-teal-600 hover:bg-teal-700 text-white px-4 md:py-2 rounded-lg text-sm flex items-center"
                                                onClick={()=>navigate(`/test-dashboard/preview/${id}`)} 
                                            >
                                                <CgPlayButtonO className="mr-2"/>
                                                Preview
                                            </button>
                                            <button
                                                className=" bg-sky-600 hover:bg-sky-700 text-white px-4 md:py-2 rounded-lg text-sm flex items-center"
                                                    
                                            >
                                                <IoArrowRedoSharp className="mr-2" />
                                                Assign Test
                                            </button>
                                            </Box>
                                            <Box display="flex" gap={1}>
                                                <Tooltip title="Statistics">
                                                    <IconButton>
                                                        <FcStatistics fontSize="large" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Duplicate">
                                                    <IconButton>
                                                        <HiMiniDocumentDuplicate fontSize="large" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton color="error">
                                                        <FaRegTrashAlt fontSize="large" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} display="flex" flexDirection="column-reverse" className="h-full gap-y-3 justify-end" justifyContent="end" alignItems="center">
                                        {/* <Button onClick={()=>navigate(`/test/test-editor/view/${id}`)} variant="outlined" startIcon={<CiEdit />} >
                                            Edit Test
                                        </Button> */}
                                         <button onClick={()=>navigate(`/test/test-editor/view/${id}`)}
                                                className=" text-blue-950 bg-white px-4 border border-blue-950 hover:bg-blue-950 hover:text-white md:py-2 rounded-lg text-sm flex items-center"
                                                    
                                            >
                                                <CiEdit className="mr-2" />
                                                Edit Test
                                            </button>
                                        <Box component="img" src={testIcon} alt="test" sx={{ width: 128 }} />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Table Section for Assignments */}
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                            Assigned 3 times
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {/* First Row */}
                                    <TableRow>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <FcStatistics style={{ marginRight: '8px' }} />
                                                <Typography variant="body1">Zaryab</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">Settings</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="secondary" disabled>
                                                Unavailable
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="success">
                                                Results
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                    {/* Second Row */}
                                    <TableRow>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <FcStatistics style={{ marginRight: '8px' }} />
                                                <Typography variant="body1">Section B</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">Settings</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="success">
                                                Available
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="success">
                                                Results
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                    {/* Third Row */}
                                    <TableRow>
                                        <TableCell>
                                            <Box display="flex" alignItems="center">
                                                <FcStatistics style={{ marginRight: '8px' }} />
                                                <Typography variant="body1">Zaryab</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">Settings</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" color="success">
                                                Available
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="success">
                                                Results
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default TestDashboard;
