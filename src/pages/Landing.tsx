import { useEffect, useState } from "react";
import { Tabs, Tab, Box, CircularProgress } from "@mui/material";
import { Sidebar } from "../components";
import Dashboard from "../components/Dashboard/Dashboard";
import { getTeacherAnalytics } from "@/api/auth";

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
  const [analytics, setAnalytics] = useState(null);
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
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-3 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
        <div className="w-full text-black">
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Overview" />
            <Tab label="Latest Result" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {loading ? (
              // Show spinner while loading
              <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress size={50} />
              </Box>
            ) : (
              // Show Dashboard when data is loaded
              <Dashboard analytics={userData} />
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <div>Tab 2 Content</div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default Landing;
