// import Settings from "@/components/GroupTest/Settings";
// import { Sidebar } from "../../components";
// import { Box, Typography, Button, Card, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
// import { FiFileText } from 'react-icons/fi';
// import { FaUsers } from 'react-icons/fa';
// import { BiHelpCircle } from 'react-icons/bi';


// const TestSettings = () => {

//   // const navigate = useNavigate();




  


//   return (
//     <>
//       <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
//         <Sidebar />
//         <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
//           <div className="w-full pl-3">
          
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
            
//             <Settings />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TestSettings;


import Settings from "@/components/GroupTest/Settings";
import { Sidebar } from "../../components";
import { Box, Typography, Card } from "@mui/material";
import { FiFileText } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TestSettings = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
          <div className=" w-10/12 pl-3">
            {/* Stepper Section */}
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              {["Select Test", "Assign", "Test Settings", "Review"].map(
                (step, index) => (
                  <Box
                    key={index}
                    sx={{
                      textAlign: "center",
                      color: index === 2 ? "red" : "gray", // Highlight the current step
                      fontWeight: index === 2 ? "bold" : "normal",
                    }}
                  >
                    <Box
                      sx={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: index === 2 ? "red" : "gray",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto",
                        mb: 1,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant="caption">{step}</Typography>
                  </Box>
                )
              )}
            </Box> */}
            <div className="flex items-center justify-center">
                <div className="flex gap-6 items-center text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">1</div>
                    <span className="hover:cursor-pointer" onClick={() => navigate('/selecttest')}>Select Test</span>
                  </div>
                  <hr className="border-gray-400 w-8" />
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 text-white rounded-full flex items-center justify-center font-medium">2</div>
                    <span className="hover:cursor-pointer" onClick={() => navigate('/assigntest')}>Assign</span>
                  </div>
                  <hr className="border-gray-400 w-8" />
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">3</div>
                    <span>Test settings</span>
                  </div>
                  <hr className="border-gray-400 w-8" />
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">4</div>
                    <span>Review</span>
                  </div>
                </div>
              </div>
            {/* Test Card Section */}
            <Card
              sx={{
                p: 3,
                mb: 3,
                mt: 6,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box display="flex" alignItems="center">
                <FiFileText size={30} />
                <Box ml={2}>
                  <Typography variant="h5">test1</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <FaUsers />
                    <Typography ml={1}>group1</Typography>
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* Settings Component */}
            <Settings />

            <button
                                                className=" bg-sky-600 hover:bg-sky-700 ml-48 text-white px-4 md:py-2 rounded-lg text-sm"
                                                onClick={()=> navigate('/reviewtest')}    
                                            >
                                                
                                                Assign Test
                                            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default TestSettings;
