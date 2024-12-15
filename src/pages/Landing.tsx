import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Sidebar } from "../components";
import Dashboard from "../components/Dashboard/Dashboard";


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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setTabValue(newValue);
  };

  return (
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-3 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
        <div className="w-full text-black">
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Overview" />
            <Tab label="Latest Result" />
            {/* Add more tabs here if necessary */}
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Dashboard />
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
