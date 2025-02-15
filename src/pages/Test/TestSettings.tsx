import { useNavigate, useLocation } from "react-router-dom";
import Settings from "@/components/GroupTest/Settings";
import { Footer, Header, Sidebar } from "../../components";
import { Box, Typography, Card } from "@mui/material";
import { FiFileText } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { CreateTestGroupAsignement } from "@/api/grouptest";
import {toast, Toaster} from "react-hot-toast";
// import { useState } from "react";
const TestSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();

//  const [loading, setLoading] = useState(false);
  

  // Extract data from the location state
  const { test, selectedGroup } = location?.state ;


  console.log(selectedGroup)


  // const handleSave = async (data: any) => {
  //   try {
  //     // Perform save operation here
  //     // For demonstration purposes, we just log the save action
  //     console.log(data);
  
  //     const assignBody: any = {
  //       ...data,
  //       groupId: selectedGroup.id,
  //       testId: test.id,
  //     };
  
  //     // Simulate API call to save the test settings
  //     const response = await CreateTestGroupAsignement(assignBody);
  //     toast.success("Test settings saved successfully!");
  //     // Navigate to review page after successful assignment
  //     navigate("/teacher-dashboard/reviewtest", {
  //       state: {
  //         group: selectedGroup,
  //         test,
  //         response: response,
  //         message: "Test is Assigned saved successfully!",
  //       },
  //     });
      
  //     console.log("Test Settings Saved");
  //   } catch (error) {
  //     // Handle any errors during the save operation
  //     toast.error("Failed to save test settings!"); 
  //     console.error("Error saving test settings:", error);
  //     // You can display an error message or do other error handling here
  //   }
  // };

  const handleSave = async (data: any, setLoading: (value: boolean) => void) => {
    try {
      setLoading(true); // Start the loader
  
      // Prepare the data for the API call
      const assignBody: any = {
        ...data,
        groupId: selectedGroup.id,
        testId: test.id,
      };
  
      // Simulate API call to save the test settings
      const response = await CreateTestGroupAsignement(assignBody);
  
      toast.success("Test settings saved successfully!");
  
      // Navigate to the review page after successful assignment
      navigate("/teacher-dashboard/reviewtest", {
        state: {
          group: selectedGroup,
          test,
          response: response,
          message: "Test is Assigned successfully!",
        },
      });
  
      console.log("Test Settings Saved");
    } catch (error) {
      // Handle any errors during the save operation
      toast.error("Failed to save test settings!");
      console.error("Error saving test settings:", error);
    } finally {
      setLoading(false); // Stop the loader in both success and error cases
    }
  };
  

  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
          <Header/>
        <Toaster />
          <div className="w-11/12 mx-auto pl-3 min-h-screen flex flex-col mt-5 ">
            <div className="flex items-center justify-center">
              <div className="flex gap-6 items-center text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">1</div>
                  <span className="hover:cursor-pointer" onClick={() => navigate('/teacher-dashboard/selecttest')}>Select Test</span>
                </div>
                <hr className="border-gray-400 w-8" />
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 text-white rounded-full flex items-center justify-center font-medium">2</div>
                  <span className="hover:cursor-pointer" onClick={() => navigate('/teacher-dashboard/assigntest')}>Assign</span>
                </div>
                <hr className="border-gray-400 w-8" />
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-color2 dark:bg-gray-700 text-white dark:text-white rounded-full flex items-center justify-center font-medium">3</div>
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
            className="!rounded-lg  !shadow"
              sx={{
                p: 3,
                mb: 3,
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
              }}
            >
              
              <Box display="flex" alignItems="center">
                <FiFileText className="bg-color1/20 p-3 border-color1 border-[1px] rounded" size={60} />
                <Box ml={2}>
                  <Typography className="!font-[Poppins]" variant="h5">{test.testName}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <FaUsers />
                    <Typography className="!font-[Poppins]" ml={1}>{selectedGroup.groupName}</Typography>
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* Settings Component */}
            <div className="bg-white rounded-lg overflow-hidden pr-3 pb-3 shadow">
            <Settings handleSave={handleSave}/>
            </div>

            {/* <button
              className="bg-sky-600 hover:bg-sky-700 ml-48 text-white px-4 md:py-2 rounded-lg text-sm"
              onClick={() => navigate('/reviewtest')}
            >
              Assign Test
            </button> */}
          </div>
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default TestSettings;
