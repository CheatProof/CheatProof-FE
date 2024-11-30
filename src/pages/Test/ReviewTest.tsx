

// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "../../components";

// const ReviewTest = () => {

//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
//         <Sidebar />
//         <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
//           <div className="w-full pl-3">
//            {/* add code here */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReviewTest;

// import { useNavigate } from "react-router-dom";
// import { Sidebar } from "../../components";
// import { Box, Typography, Button } from "@mui/material";
// import { FiFileText } from "react-icons/fi";
// import { FaUsers } from "react-icons/fa";
// import { AiOutlineCheckCircle } from "react-icons/ai";

// const ReviewTest = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
//         <Sidebar />
//         <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
//           <div className="w-full pl-3">
//             {/* Stepper */}
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 4,
//               }}
//             >
//               {["Select Test", "Assign", "Test Settings", "Review"].map(
//                 (step, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       textAlign: "center",
//                       color: index === 3 ? "red" : "gray", // Highlight the current step
//                       fontWeight: index === 3 ? "bold" : "normal",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         width: "30px",
//                         height: "30px",
//                         borderRadius: "50%",
//                         backgroundColor: index === 3 ? "red" : "gray",
//                         color: "white",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         margin: "auto",
//                         mb: 1,
//                       }}
//                     >
//                       {index + 1}
//                     </Box>
//                     <Typography variant="caption">{step}</Typography>
//                   </Box>
//                 )
//               )}
//             </Box>

//             {/* Success Message */}
//             <Box
//               sx={{
//                 textAlign: "center",
//                 p: 4,
//                 mb: 4,
//                 border: "1px solid #e0e0e0",
//                 borderRadius: "8px",
//                 backgroundColor: "#f9f9f9",
//               }}
//             >
//               <AiOutlineCheckCircle
//                 size={50}
//                 color="green"
//                 style={{ marginBottom: "16px" }}
//               />
//               <Typography variant="h5" mb={2}>
//                 Your Test is assigned to your Group!
//               </Typography>
//               <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
//                 <Box display="flex" alignItems="center" mr={2}>
//                   <FiFileText size={20} />
//                   <Typography ml={1}>test1</Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center" mr={2}>
//                   <Typography>{"->"}</Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center">
//                   <FaUsers />
//                   <Typography ml={1}>group1</Typography>
//                 </Box>
//               </Box>
//               <Box display="flex" justifyContent="center" gap={2}>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={() => navigate("/results")}
//                 >
//                   Go to Results and Settings
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   onClick={() => navigate("/add-members")}
//                 >
//                   Add members to the group
//                 </Button>
//               </Box>
//             </Box>

//             {/* Notify Members */}
//             <Box
//               sx={{
//                 textAlign: "center",
//                 p: 2,
//                 border: "1px solid #e0e0e0",
//                 borderRadius: "8px",
//                 backgroundColor: "#f9f9f9",
//               }}
//             >
//               <Typography variant="body1" mb={2}>
//                 You can now notify users from the Group Members Page
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="success"
//                 onClick={() => navigate("/notify-members")}
//               >
//                 Notify Members
//               </Button>
//             </Box>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReviewTest;


import { Sidebar } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

const ReviewTest = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {group,test} = location.state;
  

  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
          <div className="w-full pl-3">
            {/* Stepper */}
            {/* <div className="flex items-center justify-center mb-8">
              <div className="flex gap-6 items-center text-gray-700 dark:text-gray-300">
                {["Select Test", "Assign", "Test Settings", "Review"].map(
                  (step, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-medium ${
                          index === 3
                            ? "bg-red-500 text-white"
                            : "bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span
                        className={`hover:cursor-pointer ${
                          index === 3 ? "font-bold text-red-500" : ""
                        }`}
                      >
                        {step}
                      </span>
                      {index < 3 && (
                        <hr className="border-gray-400 w-8 mx-2" />
                      )}
                    </div>
                  )
                )}
              </div>
            </div> */}
            <div className="flex items-center justify-center">
                <div className="flex gap-6 items-center text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">1</div>
                    <span className="hover:cursor-pointer" onClick={() => navigate('/selecttest')}>Select Test</span>
                  </div>
                  <hr className="border-gray-400 w-8" />
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 text-white rounded-full flex items-center justify-center font-medium">2</div>
                    <span>Assign</span>
                  </div>
                  <hr className="border-gray-400 w-8" />
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">3</div>
                    <span>Test settings</span>
                  </div>
                  <hr className="border-gray-400 w-8" />
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">4</div>
                    <span>Review</span>
                  </div>
                </div>
              </div>

            {/* Success Message */}
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md text-center mb-6">
              <AiOutlineCheckCircle
                size={50}
                className="text-green-500 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Test is assigned to your Group!
              </h1>
              <div className="flex justify-center items-center gap-4 mb-6 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FiFileText className="w-5 h-5" />
                  <span> {test.testName}</span>
                </div>
                <span>→</span>
                <div className="flex items-center gap-2">
                  <FaUsers className="w-5 h-5" />
                  <span>{group.groupName}</span>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold"
                  onClick={() => navigate("/teacher-dashboard/grouptest")}
                >
                  Go to Results and Settings
                </button>
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold"
                  onClick={() => navigate("/add-members")}
                >
                  Add members to the group
                </button>
              </div>
            </div>

            {/* Notify Members */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You can now notify users from the Group Members Page
              </p>
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold"
                onClick={() => navigate("/notify-members")}
              >
                Notify Members
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewTest;
