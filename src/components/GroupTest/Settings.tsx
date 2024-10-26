import React, { useState } from 'react';
import { Box, Typography, Paper, Collapse, Divider, Radio, RadioGroup, FormControlLabel, Tabs, Tab, TextField, MenuItem, Select, Button, Switch, Checkbox } from '@mui/material';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

const Settings: React.FC = () => {
  const [openSettings1, setOpenSettings1] = useState({
    instructions: false,
    questionSettings: false,
    answerSettings: false,
    randomize: false,
  });

  const [displayGuidelines, setDisplayGuidelines] = useState(true);
  const [questionsPerPage, setQuestionsPerPage] = useState(1);
  const [displayPoints, setDisplayPoints] = useState(false);
  const [displayCategories, setDisplayCategories] = useState(false);



  const [openSettings, setOpenSettings] = useState({
    attempts: false,
    availability: false,
    printCopy: false,
    recordIP: false,
  });

  

  const [activeTab, setActiveTab] = useState(0);
  const [availabilityStatus, setAvailabilityStatus] = useState('available');
  const [availabilityFrom, setAvailabilityFrom] = useState('');
  const [availabilityUntil, setAvailabilityUntil] = useState('');

  const toggleSetting = (setting: any) => {
    setOpenSettings((prev:any) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const toggleSetting1 = (setting: any) => {
    setOpenSettings1((prev:any) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
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

                {/* Availability Option 1 */}
                <Typography variant="body2" mb={2}><strong>Option 1:</strong> Set Availability Status</Typography>
                <RadioGroup
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value)}
                  row
                >
                  <FormControlLabel value="available" control={<Radio />} label="Available" />
                  <FormControlLabel value="unavailable" control={<Radio />} label="Unavailable" />
                </RadioGroup>

                {/* Availability Option 2 */}
                <Typography variant="body2" mt={4} mb={2}><strong>Option 2:</strong> Set Availability Period</Typography>
                <Typography>Your time zone: (GMT+05:00) Islamabad, Karachi</Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Users can enter the test between these times. As long as they enter before the end date/time, they will be able to complete their test. If they leave and try to come back after the end date, they will not be able to access it.
                </Typography>

                <Box display="flex" gap={2}>
                  <TextField
                    label="Available from"
                    type="datetime-local"
                    value={availabilityFrom}
                    onChange={(e) => setAvailabilityFrom(e.target.value)}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    label="Available until"
                    type="datetime-local"
                    value={availabilityUntil}
                    onChange={(e) => setAvailabilityUntil(e.target.value)}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>

                <Box display="flex" justifyContent="flex-end" mt={3}>
                  <Button variant="contained" color="primary">
                    Save Changes
                  </Button>
                </Box>
              </Collapse>
            </Paper>

            {/* Other settings like Attempts, Print/Copy, etc. */}
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
            {/* Other Sections like Print/Copy, Record IP, etc. can follow the same pattern */}
          </>
        )}

        {/* Additional tabs can have similar logic */}
        {activeTab === 1 && (
        <Box flex={1}>
        <Typography variant="h6" mb={2}>Taking the Test</Typography>
  
        {/* Instructions */}
        <Paper sx={{ mb: 2, p: 2 }}>
          <Box display="flex" justifyContent="space-between" onClick={() => toggleSetting1('instructions')}>
            <Typography variant="body1"><strong>Instructions</strong></Typography>
            {openSettings1.instructions ? <MdExpandLess /> : <MdExpandMore />}

          </Box>
          <Collapse in={openSettings1.instructions}>
            <Divider sx={{ my: 2 }} />
            <FormControlLabel
              control={
                <Checkbox checked={displayGuidelines} onChange={() => setDisplayGuidelines(!displayGuidelines)} />
              }
              label="Display guidelines before Test starts"
            />
          </Collapse>
        </Paper>
  
        {/* Question Settings */}
        <Paper sx={{ mb: 2, p: 2 }}>
          <Box display="flex" justifyContent="space-between" onClick={() => toggleSetting1('questionSettings')}>
            <Typography variant="body1"><strong>Question Settings</strong></Typography>
            {openSettings1.questionSettings ? <MdExpandLess /> : <MdExpandMore />}
          </Box>
          <Collapse in={openSettings1.questionSettings}>
            <Divider sx={{ my: 2 }} />
            <Box mb={2}>
              <Typography>Display:</Typography>
              <Select
                value={questionsPerPage}
                onChange={(e) => setQuestionsPerPage(e.target.value as number)}
                sx={{ width: 120 }}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num} Question{num > 1 && 's'} Per Page
                  </MenuItem>
                ))}
              </Select>
            </Box>
  
            <FormControlLabel
              control={
                <Checkbox checked={displayPoints} onChange={() => setDisplayPoints(!displayPoints)} />
              }
              label="Display Points each Question is worth during Test"
            />
            <FormControlLabel
              control={
                <Checkbox checked={displayCategories} onChange={() => setDisplayCategories(!displayCategories)} />
              }
              label="Display Category for each Question"
            />
          </Collapse>
        </Paper>
  
        {/* Answers Settings */}
        <Paper sx={{ mb: 2, p: 2 }}>
          <Box display="flex" justifyContent="space-between" onClick={() => toggleSetting1('answerSettings')}>
            <Typography variant="body1"><strong>Answer Settings</strong></Typography>
            {openSettings1.answerSettings ? <MdExpandLess /> : <MdExpandMore />}
          </Box>
          <Collapse in={openSettings1.answerSettings}>
            <Divider sx={{ my: 2 }} />
            <Typography>Answers are mandatory, and users can change answers before submission.</Typography>
          </Collapse>
        </Paper>

  
        {/* Randomize Questions */}
        <Paper sx={{ mb: 2, p: 2 }}>
          <Box display="flex" justifyContent="space-between" onClick={() => toggleSetting1('randomize')}>
            <Typography variant="body1"><strong>Randomize Questions</strong></Typography>
            {openSettings1.randomize ? <MdExpandLess /> : <MdExpandMore />}
          </Box>
          <Collapse in={openSettings1.randomize}>
            <Divider sx={{ my: 2 }} />
            <Typography>Randomize questions for each user.</Typography>
          </Collapse>
        </Paper>
  
        {/* Save Changes Button */}
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
        )}

        {activeTab === 2 && (
          <>
            <Typography variant="h6" mb={2}>Test Completion</Typography>
            {/* Test Completion Settings */}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Settings;
