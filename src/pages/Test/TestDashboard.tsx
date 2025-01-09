import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import testIcon from "../../assets/test.png";
import { IoArrowRedoSharp } from "react-icons/io5";
import { CgPlayButtonO } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { FcStatistics } from "react-icons/fc";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Card,
  CardContent,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getTestById, getTestWithGroups } from "../../api/test";
import { Circles } from "react-loader-spinner";

const TestDashboard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState<any>();
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTest = async () => {
    const testData = await getTestById(id);
    if (testData.code === 200) {
      setTest(testData.data);
    }
  };

  const fetchtestWithGroups = async () => {
    const testData = await getTestWithGroups(id);
    if (testData.code === 200) {
      setGroups(testData.data.AssignedTests);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loader
      try {
        await Promise.all([fetchTest(), fetchtestWithGroups()]); // Wait for both API calls to complete
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "auto",
        backgroundColor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 5 },
          backgroundColor: "background.default",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Main Test Card */}
            <Card sx={{ boxShadow: 3, borderLeft: 4, borderColor: "primary.main" }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        component="h1"
                        fontFamily="poppins"
                        fontWeight="bold"
                      >
                        {test?.testName}
                      </Typography>
                      <p
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                          __html: test?.testIntroduction,
                        }}
                      ></p>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={2}
                    >
                      <Box display="flex" gap={2}>
                        <button
                          className="bg-color2 hover:bg-color1 text-white px-4 md:py-2 rounded-lg text-sm flex items-center"
                          onClick={() =>
                            navigate(`/teacher-dashboard/test-dashboard/preview/${id}`)
                          }
                        >
                          <CgPlayButtonO className="mr-2" />
                          Preview
                        </button>
                        <button
                          className=" bg-color2 hover:bg-color1 text-white px-4 md:py-2 rounded-lg text-sm flex items-center"
                          onClick={() => navigate("/teacher-dashboard/selecttest")}
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
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    display="flex"
                    flexDirection="column-reverse"
                    justifyContent="end"
                    alignItems="center"
                  >
                    <button
                      onClick={() =>
                        navigate(`/teacher-dashboard/test/test-editor/view/${id}`)
                      }
                      className=" text-fore mt-4 bg-white px-4 border border-blue-950 hover:bg-fore hover:text-white md:py-2 rounded-lg text-sm flex items-center"
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
          {loading ? (
            <div className="flex text-center justify-center items-center mx-auto mt-40">
              <Circles
                height="80"
                width="80"
                color="#152487"
                ariaLabel="circles-loading"
                visible={true}
              />
            </div>
          ) : (
            <Grid item xs={12}>
              <Typography className="text-3xl" sx={{ mb: 2 }}>
                Assigned {groups.length} times
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {groups.map((group: any) => (
                      <TableRow key={group.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <FcStatistics style={{ marginRight: "8px" }} />
                            <Typography variant="body1">
                              {group.AssignedTestGroups?.Groups?.groupName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">Settings</Typography>
                        </TableCell>
                        <TableCell>
                          <button className="bg-white border border-color2 hover:border-fore text-fore px-4 md:py-2 rounded-lg text-sm flex items-center">
                            AVAILABLE
                          </button>
                        </TableCell>
                        <TableCell>
                          <button className="bg-color2 hover:bg-color1 text-white px-5 md:py-2 rounded-md text-sm flex items-center">
                            RESULTS
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default TestDashboard;
