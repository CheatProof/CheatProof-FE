import React from "react";
import { Sidebar } from "../../components";
import testIcon from "../../assets/test.png";
import { IoArrowRedoSharp } from "react-icons/io5";
import { CgPlayButtonO } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { FcStatistics } from "react-icons/fc";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { Box, Grid, Button, Typography, IconButton, Card, CardContent, Tooltip, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const TestDashboard: React.FC = () => {
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
                                            <Typography variant="h5" component="h1" fontWeight="bold">
                                                CCN Preparation
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Instructions and resources for CCN preparation
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                            <Box display="flex" gap={2}>
                                                <Button variant="contained" color="primary" startIcon={<CgPlayButtonO />}>
                                                    Preview
                                                </Button>
                                                <Button variant="contained" color="secondary" startIcon={<IoArrowRedoSharp />}>
                                                    Assign Test
                                                </Button>
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
                                        <Button variant="outlined" startIcon={<CiEdit />} >
                                            Edit Test
                                        </Button>
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
