import { useEffect, useState } from "react";
import { Tabs, Tab, Box, CircularProgress } from "@mui/material";
import  Sidebar  from "../components/Sidebar";
import Dashboard from "../components/Dashboard/Dashboard";
import { getTeacherAnalytics } from "@/api/auth";
import { Footer, Header } from "@/components";

// TabPanel component for displaying content based on the active tab
const TabPanel = ({ children, value, index }: any) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Landing: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  // const [analytics, setAnalytics] = useState(null);
  const [userData, setUserData] = useState(null); // Add state for user analytics
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchAnalytics = async () => {
    setLoading(true); // Start loading
    try {
      // const data = await getTestAnalytics("12");
      const userData = await getTeacherAnalytics()
        
      // Fetch analytics
      setUserData(userData.data); // Set user analytics state if available
      // setAnalytics(data);
      console.log(userData);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("Tab changed:", event); // Log tab change event for debugging purposes
    setTabValue(newValue);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="h-auto border-t max-w-[100vw]  dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      
      <div className="dark:bg-blackPrimary bg-gray-50 w-full  ">
      <Header />
        <div className="w-full text-black min-h-screen p-2">
          <Tabs className="m-0" value={tabValue} onChange={handleChange}>
            <Tab label="Overview" />
            <Tab label="Latest Result" />
          </Tabs>

          <TabPanel className="m-0" value={tabValue} index={0}>
            {loading ? (
              // Show spinner while loading
              <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress size={50} />
              </Box>
            ) : (
              // Show Dashboard when data is loaded
              <Dashboard analyticsData={userData} />
            )}
          </TabPanel>

          <TabPanel className="m-0" value={tabValue} index={1}>
            <div>Tab 2 Content</div>
          </TabPanel>
        </div>
    <Footer />

      </div>
    </div>
  );
};

export default Landing;
