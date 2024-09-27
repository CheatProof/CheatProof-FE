import React, { useState } from 'react';
import { Box, Typography, Paper, Collapse, Divider, Radio, RadioGroup, FormControlLabel, Switch, Tabs, Tab } from '@mui/material';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

const Settings: React.FC = () => {
  const [openSettings, setOpenSettings] = useState({
    attempts: false,
    availability: false,
    printCopy: false,
    recordIP: false,
  });

  const [activeTab, setActiveTab] = useState(0);

  const toggleSetting = (setting: string) => {
    setOpenSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box display="flex">
      {/* Left Sidebar Tabs */}
      <Box minWidth={180} mr={2}>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Setup" />
          <Tab label="Taking the Test" />
          <Tab label="Test Completion" />
        </Tabs>
      </Box>

      {/* Main Content */}
      <Box flex={1}>
        {activeTab === 0 && (
          <>
            <Typography variant="h6" mb={2}>Setup</Typography>

            {/* Availability */}
            <Paper sx={{ mb: 2, p: 2 }}>
              <Box display="flex" justifyContent="space-between" onClick={() => toggleSetting('availability')}>
                <Typography variant="body1"><strong>Availability</strong></Typography>
                {openSettings.availability ? <MdExpandLess /> : <MdExpandMore />}
              </Box>
              <Collapse in={openSettings.availability}>
                <Divider sx={{ my: 2 }} />
                <Typography>Available</Typography>
              </Collapse>
            </Paper>

            {/* Attempts */}
            <Paper sx={{ mb: 2, p: 2 }}>
              <Box display="flex" justifyContent="space-between" onClick={() => toggleSetting('attempts')}>
                <Typography variant="body1"><strong>Attempts</strong></Typography>
                {openSettings.attempts ? <MdExpandLess /> : <MdExpandMore />}
              </Box>
              <Collapse in={openSettings.attempts}>
                <Divider sx={{ my: 2 }} />
                <RadioGroup defaultValue="unlimited">
                  <FormControlLabel value="one" control={<Radio />} label="One" />
                  <FormControlLabel value="multiple" control={<Radio />} label="Multiple (set as 2 or higher)" />
                  <FormControlLabel value="unlimited" control={<Radio />} label="Unlimited" />
                </RadioGroup>
              </Collapse>
            </Paper>

            {/* Print / Copy / Paste / Translate */}
            <Paper sx={{ mb: 2, p: 2 }}>
              <Box display="flex" justifyContent="space-between" onClick={() => toggleSetting('printCopy')}>
                <Typography variant="body1"><strong>Print / Copy / Paste / Translate</strong></Typography>
                {openSettings.printCopy ? <MdExpandLess /> : <MdExpandMore />}
              </Box>
              <Collapse in={openSettings.printCopy}>
                <Divider sx={{ my: 2 }} />
                <Typography>Disallowed</Typography>
              </Collapse>
            </Paper>

            {/* Record IP Address */}
            <Paper sx={{ mb: 2, p: 2 }}>
              <Box display="flex" justifyContent="space-between" onClick={() => toggleSetting('recordIP')}>
                <Typography variant="body1"><strong>Record IP Address</strong></Typography>
                {openSettings.recordIP ? <MdExpandLess /> : <MdExpandMore />}
              </Box>
              <Collapse in={openSettings.recordIP}>
                <Divider sx={{ my: 2 }} />
                <Switch defaultChecked />
                <Typography>On</Typography>
              </Collapse>
            </Paper>
          </>
        )}

        {activeTab === 1 && (
          <>
            <Typography variant="h6" mb={2} mt={4}>Taking the Test</Typography>

            {/* Instructions */}
            <Paper sx={{ mb: 2, p: 2 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1"><strong>Instructions</strong></Typography>
                <Typography>On</Typography>
              </Box>
            </Paper>

            {/* Question Settings */}
            <Paper sx={{ mb: 2, p: 2 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1"><strong>Question Settings</strong></Typography>
                <Typography>1 Question per Page</Typography>
              </Box>
            </Paper>

            {/* Answer Settings */}
            <Paper sx={{ mb: 2, p: 2 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1"><strong>Answer Settings</strong></Typography>
                <Typography>Mandatory, Can Change Answers</Typography>
              </Box>
            </Paper>

            {/* Randomize */}
            <Paper sx={{ mb: 2, p: 2 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1"><strong>Randomize</strong></Typography>
                <Typography>Off</Typography>
              </Box>
            </Paper>
          </>
        )}

        {activeTab === 2 && (
          <>
            <Typography variant="h6" mb={2}>Test Completion</Typography>
            {/* Test Completion Settings (similar structure can be added here) */}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Settings;
