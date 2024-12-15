import { useNavigate, useLocation } from "react-router-dom";
import Settings from "@/components/GroupTest/Settings";
import { Sidebar } from "../../components";
import { Box, Typography, Card } from "@mui/material";
import { FiFileText } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { CreateTestGroupAsignement } from "@/api/grouptest";

const TestSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();


  

  // Extract data from the location state
  const { test, selectedGroup } = location.state ;


  console.log(selectedGroup)


  const handleSave = async (data: any) => {
    try {
      // Perform save operation here
      // For demonstration purposes, we just log the save action
      console.log(data);
  
      const assignBody: any = {
        ...data,
        groupId: selectedGroup.id,
        testId: test.id,
      };
  
      // Simulate API call to save the test settings
      const response = await CreateTestGroupAsignement(assignBody);
  
      // Navigate to review page after successful assignment
      navigate("/teacher-dashboard/reviewtest", {
        state: {
          group: selectedGroup,
          test,
          response: response,
          message: "Test is Assigned saved successfully!",
        },
      });
  
      console.log("Test Settings Saved");
    } catch (error) {
      // Handle any errors during the save operation
      console.error("Error saving test settings:", error);
      // You can display an error message or do other error handling here
    }
  };

  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
          <div className="w-10/12 pl-3">
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
                  <Typography variant="h5">{test.testName}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <FaUsers />
                    <Typography ml={1}>{selectedGroup.groupName},{selectedGroup.id}</Typography>
                  </Box>
                </Box>
              </Box>
            </Card>

            {/* Settings Component */}
            <Settings handleSave={handleSave}/>

            {/* <button
              className="bg-sky-600 hover:bg-sky-700 ml-48 text-white px-4 md:py-2 rounded-lg text-sm"
              onClick={() => navigate('/reviewtest')}
            >
              Assign Test
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestSettings;
