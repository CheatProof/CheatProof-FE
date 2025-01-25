import React, { useEffect, useState } from "react";
import { Footer, Header, Sidebar } from "../../components";
// import testIcon from "../../assets/test.png";
import { IoArrowRedoSharp } from "react-icons/io5";
import { CgPlayButtonO } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { FcStatistics } from "react-icons/fc";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  Box,
  Grid,
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTestById, getTestWithGroups } from "../../api/test";
import { Circles } from "react-loader-spinner";
import { Button, Typography } from "@material-tailwind/react";
import { PiExam } from "react-icons/pi";

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

  const props:any={};

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
      className="w-full"
        sx={{

          
          backgroundColor: "background.default",
        }}
      >
        <Header/>
       
        <Grid  className="my-4 px-5 min-h-screen justify-start items-start relative" >
          <Grid className="w-full" item xs={12}>
            {/* Main Test Card */}
            <Card
            className="mt-4 relative"
            
            sx={{ boxShadow: 1 }}>

              <CardContent
              className="mb-2">
                
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
                      {...props}
                        variant="h3"
                      className="!font-[Poppins]"
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
                        <Button
                        { ...props}
                          className="bg-color2 hover:bg-color1 text-white px-4 md:py-2  flex items-center"
                          onClick={() =>
                            navigate(`/teacher-dashboard/test-dashboard/preview/${id}`)
                          }
                        >
                          <CgPlayButtonO className="mr-2" />
                          Preview
                        </Button>
                        <Button
                        {...props}
                          className=" bg-color2 hover:bg-color1 text-white px-4 md:py-2 flex items-center"
                          onClick={() => navigate("/teacher-dashboard/selecttest")}
                        >
                          <IoArrowRedoSharp className="mr-2" />
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
                    {/* <Box component="img" src={testIcon} alt="test" sx={{ width: 128 }} /> */}
                     <PiExam
                              size={100}
                              className="p-2 bg-color1/20 rounded-lg border-color1 border-[1px]"
                              
                              />
                  </Grid>
                </Grid>
              </CardContent>
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-color3 via-color2 to-color1"></span>
            </Card>
          </Grid>
          {loading ? (
            <div className="flex text-center justify-center items-center mx-auto">
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
              <Typography {...props} className="text-2xl pb-2 mt-5 font-[Poppins]" >
                Assigned {groups.length} times
              </Typography>
              <TableContainer component={Paper}>
  <Table>
    <TableBody>
      {groups.map((group: any) => (
        <TableRow key={group.id} className="hover:bg-gray-100">
          <TableCell className="w-9/12  ">
            {/* <FcStatistics /> */}
            <Typography {...props} variant="span"  className="truncate">
              {group.AssignedTestGroups?.Groups?.groupName}
            </Typography>
          </TableCell>
          <TableCell className="w-1/12 text-right">
            <Link
              to={`/teacher-dashboard/grouptest/${group.AssignedTestGroups?.id}`}
              state={{
                group1: group.AssignedTestGroups?.Groups,
                groupTest1: group
              }}
              className="text-blue-500 hover:underline"
            >
              <Typography {...props} variant="p">Settings</Typography>
            </Link>
          </TableCell>
          <TableCell className="w-1/12 text-right">
            <div className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm">
              {group.availabilityStatus === "available" ? "Available" : "Unavailable"}
            </div>
          </TableCell>
          <TableCell className="w-1/12 text-right">
            <Button
            onClick={() =>
              navigate(`/teacher-dashboard/grouptest/${group.AssignedTestGroups?.id}`,{
                state: {
                  group1: group.AssignedTestGroups?.Groups,
                  groupTest1: group,
                }
              }
              )
            }
            {...props}
             className="bg-color1 hover:bg-color2 text-white px-5 py-2  text-sm">
              RESULTS
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


            </Grid>
          )}
          
        </Grid>
      

        <Footer />
      </Box>
    </Box>
  );
};

export default TestDashboard;
