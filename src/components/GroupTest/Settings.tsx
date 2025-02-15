import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Collapse, Divider, Radio, RadioGroup, FormControlLabel, Tabs, Tab, TextField, MenuItem, Select, Switch, Checkbox, Tooltip, Alert } from '@mui/material';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { Circles } from 'react-loader-spinner';
// import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { Calendar, Clipboard, ClipboardList, FileQuestion, Network, Percent, Play, ScrollText, Settings2, Shuffle, SquarePlay, Timer } from 'lucide-react';


const Settings = ({ handleSave ,groupTest }: any) => {
  console.log('Setting',groupTest);
  const [openSettings1, setOpenSettings1] = useState({
    instructions: false,
    questionSettings: false,
    answerSettings: false,
    randomize: false,
    timeLimit: false,
    resumeLater: false
  });

  const [openSettings, setOpenSettings] = useState({
    attempts: false,
    availability: false,
    printCopy: false,
    recordIP: false,
  });


  const [openSettings2, setOpenSettings2] = useState({
    resultPage: false,
    showCertificate: false,
    emailResult: false,
    passMarks: false,
    webHooks:false
  });

  const formatToDateTimeLocal = (date:any) => {
    if (!date) return ""; // Return an empty string if no date is provided
  
    const d = new Date(date); // Create a Date object
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  console.log(groupTest?.attemptsAllowed)

  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const [availabilityStatus, setAvailabilityStatus] = useState(groupTest?.availabilityStatus || "available");
  const [availabilityFrom, setAvailabilityFrom] = useState(formatToDateTimeLocal(groupTest?.availableFrom) || '');
  const [availabilityUntil, setAvailabilityUntil] = useState(formatToDateTimeLocal(groupTest?.availableUntil) ||'');
  const [attemptCount, setAttemptCount] = useState(Number(groupTest?.attemptsAllowed) || 1);

  const [ipRecord, setIpRecord] = useState(groupTest?.recordPublicIP ?? false);
  const [allowPrinting, setAllowPrinting] = useState(groupTest?.allowPrinting ?? false);
  const [allowHighlightCopy, setAllowHighlightCopy] = useState(groupTest?.allowCopyText ?? false);
  const [allowPasting, setAllowPasting] = useState(groupTest?.allowPastingText ?? false);
  const [allowTranslation, setAllowTranslation] = useState(groupTest?.allowTextTransition ?? false);
 



  const [displayGuidelines, setDisplayGuidelines] = useState(groupTest?.displayInstructions? groupTest?.displayInstructions:true);
  const [questionsPerPage, setQuestionsPerPage] = useState(groupTest?.questionPerPage? groupTest?.questionPerPage:1);
  const [displayPoints, setDisplayPoints] = useState(groupTest?.displayPoints? groupTest?.displayPoints:true);
  const [displayCategories, setDisplayCategories] = useState(groupTest?.displayCategories? groupTest?.displayCategories:true);



  
  const [mandatory, setMandatory] = useState(groupTest?.mandatoryAnswer? groupTest?.mandatoryAnswer:true);
  const [autoFinish, setAutoFinish] = useState(groupTest?.autoFinishTest? groupTest?.autoFinishTest:false);
  const [instantReview, setInstantReview] = useState(groupTest?.instantReview? groupTest?.instantReview:true);
  const [revealAnswers, setRevealAnswers] = useState(groupTest?.revealCorrectAnswer? groupTest?.revealCorrectAnswer:false);
  const [changeAnswers, setChangeAnswers] = useState(groupTest?.allowChangeAnswer? groupTest?.allowChangeAnswer:true);
  const [bookmarkQuestions, setBookmarkQuestions] = useState(groupTest?.allowQuestionBookmark? groupTest?.allowQuestionBookmark:false);
  const [spellCheck, setSpellCheck] = useState(groupTest?.spellCheck? groupTest?.spellCheck:false);



  const [randomizeQuestions, setRandomizeQuestions] = useState(groupTest?.randomize? groupTest?.randomize:false);
  const [testDuration,setTestDuration] = useState(groupTest?.timeLimit? groupTest?.timeLimit:30);
  const [resumeLaterDisplay,setResumeLaterDisplay] = useState(groupTest?.resumeLater? groupTest?.resumeLater:false);




  const [points, setPoints] = useState(groupTest?.resultScorePoints? groupTest?.resultScorePoints:true);
  const [percentage, setPercentage] = useState(groupTest?.resultScorePoercentage? groupTest?.resultScorePoercentage:true);
  const [customFeedback, setCustomFeedback] = useState(groupTest?.customFeedback? groupTest?.customFeedback:true);
  const [gradedQuestions, setGradedQuestions] = useState(groupTest?.gradedQuestions? groupTest?.gradedQuestions:true);
  const [revealAnswers1, setRevealAnswers1] = useState(groupTest?.revealCorrectResults? groupTest?.revealCorrectResults:true);
  const [incorrectQuestionsOnly, setIncorrectQuestionsOnly] = useState(groupTest?.revealIncorrectResults? groupTest?.revealIncorrectResults:false);
  const [resultsByCategory, setResultsByCategory] = useState(groupTest?.resultByCategory? groupTest?.resultByCategory:false);
  const [downloadCertificate, setDownloadCertificate] = useState(groupTest?.showCertificate? groupTest?.showCertificate:false);

  useEffect(() => {
    if (groupTest) {
      setIpRecord(groupTest.recordPublicIP ?? false);
      setAllowPrinting(groupTest.allowPrinting ?? false);
      setAllowHighlightCopy(groupTest.allowCopyText ?? false);
      setAllowPasting(groupTest.allowPastingText ?? false);
      setAllowTranslation(groupTest.allowTextTransition ?? false);

      setDisplayGuidelines(groupTest.displayInstructions??true);
      setQuestionsPerPage(groupTest.questionPerPage??1);
      setDisplayPoints(groupTest.displayPoints??true);
      setDisplayCategories(groupTest.displayCategories??true);

      setMandatory(groupTest.mandatoryAnswer??true);
      setAutoFinish(groupTest.autoFinishTest??false);
      setInstantReview(groupTest.instantReview??true);
      setRevealAnswers(groupTest.revealCorrectAnswer??false);
      setChangeAnswers(groupTest.allowChangeAnswer??true);
      setBookmarkQuestions(groupTest.allowQuestionBookmark??false);
      setSpellCheck(groupTest.spellCheck??false);

      setRandomizeQuestions(groupTest.randomize??false);
      setTestDuration(groupTest.timeLimit??30);
      setResumeLaterDisplay(groupTest.resumeLater??false);

      setPoints(groupTest.resultScorePoints? groupTest.resultScorePoints:true);
      setPercentage(groupTest.resultScorePoercentage? groupTest.resultScorePoercentage:true);
      setCustomFeedback(groupTest.customFeedback? groupTest.customFeedback:true);
      setGradedQuestions(groupTest.gradedQuestions? groupTest.gradedQuestions:true);
      setRevealAnswers1(groupTest.revealCorrectResults? groupTest.revealCorrectResults:true);
      setIncorrectQuestionsOnly(groupTest.revealIncorrectResults? groupTest.revealIncorrectResults:false);
      setResultsByCategory(groupTest.resultByCategory? groupTest.resultByCategory:false);
      setDownloadCertificate(groupTest.showCertificate? groupTest.showCertificate:false);
    }
  }, [groupTest]);

      /* {
{
    "id": "f420a91d-8a09-4372-8a9c-4a68cbf1eaef",
    "testId": "0cbb4c8d-e816-4f72-8f11-b9eb46b45f16",
    "takenDate": null,
 
    "resultScorePoints": true,
    "resultScorePoercentage": true,
    "customFeedback": true,
    "gradedQuestions": true,
    "revealCorrectResults": true,
    "revealIncorrectResults": false,
    "resultByCategory": false,
    "showCertificate": false,
    "displayCertificateOnPassing": false,
    "emailResults": null,
    "passingMarksPercentage": 75,
    "testCompletedMessage": "Congraulations",
    "webhook": "http://localhost",
    "Tests": {
        "id": "0cbb4c8d-e816-4f72-8f11-b9eb46b45f16",
        "testName": "CCN Preparation",
        "testIntroduction": "<p>This test is made for the Examination Preparation of HCIA Data-com Certification</p>\n",
        "isActive": true,
        "createdBy": "1936b586-8ab5-4d61-a0f7-1402f322ba7a",
        "categoryId": "88bbe0e8-3b82-4ea9-a4d3-a8bd5ed319f9"
    }
}
}*/



  const [passMark, setPassMark] = useState(groupTest?.passingMarksPercentage? groupTest?.passingMarksPercentage:'');
  const [testCompletedMessage, setTestCompletedMessage] = useState(groupTest?.testCompletedMessage? groupTest?.testCompletedMessage:'');










  const handleSwitchChange = (event:any) => {
    setIpRecord(event.target.checked)
  };

  const toggleSetting = (setting: any) => {
    setOpenSettings((prev: any) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const toggleSetting1 = (setting: any) => {
    setOpenSettings1((prev: any) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const toggleSetting2 = (setting: any) => {
    setOpenSettings2((prev: any) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setActiveTab(newValue);
  };

  const handleRadioChange = (event: any) => {
    const selectedValue = event.target.value;

    // Update count based on the selected radio value
    if (selectedValue === 'unlimited') {
      setAttemptCount(0);
    } else if (selectedValue === 'one') {
      setAttemptCount(1);
    } else if (selectedValue === 'multiple') {
      setAttemptCount(2); // Default value for "multiple"
    }
  };

  const handleCustomCountChange = (event: any) => {
    const enteredCount = parseInt(event.target.value, 10) || 2; // Default to 2 if input is invalid
    setAttemptCount(enteredCount);
  };


  return (
    <>
    <Toaster/>
      <Box  display="flex">
        {/* Left Sidebar Tabs */}
        <Box minWidth={180} mr={2}>
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab
            
             className={`!font-[Poppins] ${activeTab===0?"!bg-color1/20":""}`} label="Setup" />
            <Tab
             className={`!font-[Poppins] ${activeTab===1?"!bg-color1/20":""}`} label="Taking the Test" />
            <Tab
             className={`!font-[Poppins] ${activeTab===2?"!bg-color1/20":""}`} label="Test Completion" />
          </Tabs>
        </Box>

        {/* Main Content */}
        <Box flex={1}>
          {activeTab === 0 && (
            <>
              <Typography className="!font-[Poppins] !font-semibold py-3" variant="h6" mb={2}>Setup</Typography>

              {/* Availability */}
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box  display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting('availability')}>
                  <div className='flex items-center'>
                  <Calendar className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins]' variant="body1"><strong>Availability</strong></Typography>
                  </div>
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

                  <Box  display="flex" justifyContent="flex-end" mt={3}>
                    {/* <Button variant="contained" color="primary">
                    Save Changes
                  </Button> */}
                    {/* <button
                      className="bg-color2 hover:bg-color1 text-white px-4 py-2 rounded-lg"

                    >
                      Save Changes
                    </button> */}
                  </Box>
                </Collapse>
              </Paper>

              {/* Other settings like Attempts, Print/Copy, etc. */}
              {/* Attempts */}
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting('attempts')}>
                  <div className='flex items-center'>
                <SquarePlay className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Attempts</strong></Typography>
                  </div>
                  {openSettings.attempts ? <MdExpandLess /> : <MdExpandMore />}
                </Box>
                <Collapse in={openSettings.attempts}>
                  <Divider sx={{ my: 2 }} />
                  <RadioGroup
                    value={attemptCount === 0 ? 'unlimited' : attemptCount === 1 ? 'one' : 'multiple'}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel value="one" control={<Radio />} label="One" />
                    <FormControlLabel
                      value="multiple"
                      control={<Radio />}
                      label="Multiple (set as 2 or higher)"
                    />
                    <FormControlLabel value="unlimited" control={<Radio />} label="Unlimited" />
                  </RadioGroup>

                  {attemptCount > 1 && (
                    <TextField
                      type="number"
                      label="Set Count"
                      variant="outlined"
                      value={attemptCount}
                      onChange={handleCustomCountChange}
                      sx={{ marginTop: 2 }}
                    />
                  )}
                </Collapse>
              </Paper>

              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting('printCopy')}>
                  <div className='flex items-center'>
                <Clipboard className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Print / Copy / Paste / Translate</strong></Typography>
                  </div>
                  {openSettings.printCopy ? <MdExpandLess /> : <MdExpandMore />}
                </Box>
                <Collapse in={openSettings.printCopy}>
                  <Divider sx={{ my: 2 }} />
                  <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Switch checked={allowPrinting} onChange={(e) => setAllowPrinting(e.target.checked)} />
          <Typography>Allow Printing</Typography>
          <Tooltip title="Enable or disable printing for students">
            <Typography variant="body1" sx={{ cursor: "pointer" }}>
              ?
            </Typography>
          </Tooltip>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Switch checked={allowHighlightCopy} onChange={(e) => setAllowHighlightCopy(e.target.checked)} />
          <Typography>Allow Highlight & Copy Text</Typography>
          <Tooltip title="Enable or disable text highlight and copy functionality">
            <Typography variant="body1" sx={{ cursor: "pointer" }}>
              ?
            </Typography>
          </Tooltip>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Switch checked={allowPasting} onChange={(e) => setAllowPasting(e.target.checked)} />
          <Typography>Allow Pasting Text</Typography>
          <Tooltip title="Enable or disable pasting text into the system">
            <Typography variant="body1" sx={{ cursor: "pointer" }}>
              ?
            </Typography>
          </Tooltip>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Switch checked={allowTranslation} onChange={(e) => setAllowTranslation(e.target.checked)} />
          <Typography>Allow Browser Text Translation Services</Typography>
          <Tooltip title="Enable or disable browser text translation features">
            <Typography variant="body1" sx={{ cursor: "pointer" }}>
              ?
            </Typography>
          </Tooltip>
        </Box>
                </Collapse>
              </Paper>

              {/* Record IP Address */}
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting('recordIP')}>
                  <div className='flex items-center'>
                <Network className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Record IP Address</strong></Typography>
                  </div>
                  {openSettings.recordIP ? <MdExpandLess /> : <MdExpandMore />}
                </Box>
                <Collapse in={openSettings.recordIP}>
                  <Divider sx={{ my: 2 }} />
                <Switch checked={ipRecord} onChange={handleSwitchChange} />
                  <Typography>{ipRecord ? 'On' : 'Off'}</Typography>
                </Collapse>
              </Paper>
              {/* Other Sections like Print/Copy, Record IP, etc. can follow the same pattern */}
            </>
          )}

          {/* Additional tabs can have similar logic */}
          {activeTab === 1 && (
            <Box flex={1}>
                           <Typography className="!font-[Poppins] !font-semibold py-3" variant="h6" mb={2}>Taking the Test</Typography>


              {/* Instructions */}
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting1('instructions')}>
                  <div className='flex items-center'>
                <ScrollText className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Instructions</strong></Typography>
                  </div>
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
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting1('questionSettings')}>
                  <div className='flex items-center'>
                <FileQuestion className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Question Settings</strong></Typography>
                  </div>
                  {openSettings1.questionSettings ? <MdExpandLess /> : <MdExpandMore />}
                </Box>
                <Collapse in={openSettings1.questionSettings}>
                  <Divider sx={{ my: 2 }} />
                  <Box mb={2}>
                    <Typography>Display:</Typography>
                    <Select
                      value={questionsPerPage}
                      onChange={(e) => setQuestionsPerPage(e.target.value as number)}
                      sx={{ width: 220 }}
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
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting1('answerSettings')}>
                  <div className='flex items-center'>
                <Settings2 className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Answers Settings</strong></Typography>
                  </div>
                  {openSettings1.answerSettings ? <MdExpandLess /> : <MdExpandMore />}
                </Box>
                <Collapse in={openSettings1.answerSettings}>
                  <Divider sx={{ my: 2 }} />
                  <Typography>Answers are mandatory, and users can change answers before submission.</Typography>
                
      {/* Mandatory Section */}
      <Box display="flex" alignItems="center" mt={2}>
        <Switch checked={mandatory} onChange={(e) => setMandatory(e.target.checked)} />
        <Typography>Mandatory: Must answer Questions</Typography>
        <Tooltip title="Force users to answer all questions during the test">
          <Typography variant="body1" sx={{ cursor: "pointer", ml: 1 }}>
            ?
          </Typography>
        </Tooltip>
      </Box>

      <Box display="flex" alignItems="center" mt={2}>
        <Switch checked={autoFinish} onChange={(e) => setAutoFinish(e.target.checked)} />
        <Typography>Auto-Finish Test on incorrect answer</Typography>
        <Tooltip title="Automatically finish the test if a wrong answer is given">
          <Typography variant="body1" sx={{ cursor: "pointer", ml: 1 }}>
            ?
          </Typography>
        </Tooltip>
      </Box>

      {/* Instant Review Section */}
      <Box display="flex" alignItems="center" mt={2}>
        <Switch checked={instantReview} onChange={(e) => setInstantReview(e.target.checked)} />
        <Typography>Instant Review: Question grading and Feedback during Test</Typography>
        <Tooltip title="Provide immediate feedback on answers during the test">
          <Typography variant="body1" sx={{ cursor: "pointer", ml: 1 }}>
            ?
          </Typography>
        </Tooltip>
      </Box>

      <Box display="flex" alignItems="center" mt={2}>
        <Switch checked={revealAnswers} onChange={(e) => setRevealAnswers(e.target.checked)} />
        <Typography>Reveal correct answers during Test</Typography>
        <Tooltip title="Show correct answers during the test">
          <Typography variant="body1" sx={{ cursor: "pointer", ml: 1 }}>
            ?
          </Typography>
        </Tooltip>
      </Box>

      {/* Change Answers Section */}
      <Box display="flex" alignItems="center" mt={2}>
        <Switch checked={changeAnswers} onChange={(e) => setChangeAnswers(e.target.checked)} />
        <Typography>Allow Test takers to go back during Test</Typography>
        <Tooltip title="Enable users to go back and change their answers">
          <Typography variant="body1" sx={{ cursor: "pointer", ml: 1 }}>
            ?
          </Typography>
        </Tooltip>
      </Box>

      <Box display="flex" alignItems="center" mt={2}>
        <Switch
          checked={bookmarkQuestions}
          onChange={(e) => setBookmarkQuestions(e.target.checked)}
        />
        <Typography>Questions can be Bookmarked</Typography>
        <Tooltip title="Allow users to bookmark questions for review">
          <Typography variant="body1" sx={{ cursor: "pointer", ml: 1 }}>
            ?
          </Typography>
        </Tooltip>
      </Box>

      {/* Spell Check Section */}
      <Box display="flex" alignItems="center" mt={2}>
        <Switch checked={spellCheck} onChange={(e) => setSpellCheck(e.target.checked)} />
        <Typography>Allow Browser Spell Checking</Typography>
        <Tooltip title="Enable or disable browser spell checking">
          <Typography variant="body1" sx={{ cursor: "pointer", ml: 1 }}>
            ?
          </Typography>
        </Tooltip>
      </Box>

      {/* Note */}
      <Alert severity="info" sx={{ mt: 2 }}>
        Note: With <strong>Instant review</strong> and <strong>Change answers</strong> both enabled,
        Test takers can review gradings and re-attempt Questions during the Test to achieve 100%.
      </Alert>
      
                </Collapse>
              </Paper>


              {/* Randomize Questions */}
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting1('randomize')}>
                  <div className='flex items-center'>
                <Shuffle className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Randomize Questions</strong></Typography>
                  </div>
                  {openSettings1.randomize ? <MdExpandLess /> : <MdExpandMore />}
                </Box>
                <Collapse in={openSettings1.randomize}>
                  <Divider sx={{ my: 2 }} />
                  <Typography>Randomize questions for each user.</Typography>
                  <Switch 
                  checked={randomizeQuestions}
                  onChange={(e:any)=>setRandomizeQuestions(e.target.checked)} />


                </Collapse>
              </Paper>

              {/* Test Duration */}
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting1('timeLimit')}>
                  <div className='flex items-center'>
                <Timer className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Time Duration</strong></Typography>
                  </div>
                  {openSettings1.timeLimit ? <MdExpandLess /> : <MdExpandMore />}
                </Box>
                <Collapse in={openSettings1.timeLimit}>
                  <Divider sx={{ my: 2 }} />
                  <TextField
                    label="Test Duration (in minutes)"
                    type="number"
                    value={testDuration}
                    onChange={(e:any) => setTestDuration(e.target.value)}
                    sx={{ width: 180 }}
                  />
                </Collapse>
              </Paper>

              {/* {resume Later check} */}
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting1('resumeLater')}>
                  <div className='flex items-center'>
                <Play className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Resume Later</strong></Typography>
                  </div>
                  {openSettings1.resumeLater? <MdExpandLess /> : <MdExpandMore />}
                </Box>
                <Collapse in={openSettings1.resumeLater}>
                  <Divider sx={{ my: 2 }} />
                  <Box mb={2 } 
                  className="flex items-center"
                   >
                    <Typography>Display:</Typography>
                    <Switch
                      checked={resumeLaterDisplay}
                      onChange={(e) => setResumeLaterDisplay(e.target.checked)}
                     
                   />

                   

                  </Box>
                  
                  </Collapse>

              </Paper>




              {/* Save Changes Button */}
            </Box>
          )}

          {activeTab === 2 && (
            <>
   
              <Typography className="!font-[Poppins] !font-semibold py-3" variant="h6" mb={2}>Test Completion</Typography>

              {/* Test Completion Settings */}
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting2('resultPage')}>
                  <div className='flex items-center'>
                <ClipboardList className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Result Page Settings</strong></Typography>
                  </div>
                  {openSettings2.resultPage? <MdExpandLess /> : <MdExpandMore />}
                </Box>
                <Collapse in={openSettings2.resultPage}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" gutterBottom>
          Upon completion, Test takers can see:
        </Typography>

        {/* Score Section */}
        <Box display="flex" flexDirection="column" gap={1} mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={points}
                onChange={() => setPoints(!points)}
              />
            }
            label="Score: Points"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={percentage}
                onChange={() => setPercentage(!percentage)}
              />
            }
            label="Score: Percentage"
          />
        </Box>

        {/* Feedback Section */}
        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={customFeedback}
                onChange={() => setCustomFeedback(!customFeedback)}
              />
            }
            label="Feedback: Custom Feedback as set below"
          />
        </Box>

        {/* Questions Section */}
        <Box display="flex" flexDirection="column" gap={1} mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={gradedQuestions}
                onChange={() => setGradedQuestions(!gradedQuestions)}
              />
            }
            label="Questions: Graded Questions"
          />
          <Box pl={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={revealAnswers1}
                  onChange={() => setRevealAnswers1(!revealAnswers1)}
                />
              }
              label="Reveal correct answers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={incorrectQuestionsOnly}
                  onChange={() => setIncorrectQuestionsOnly(!incorrectQuestionsOnly)}
                />
              }
              label="Display incorrectly answered questions only"
            />
          </Box>
        </Box>

        {/* Categories Section */}
        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={resultsByCategory}
                onChange={() => setResultsByCategory(!resultsByCategory)}
              />
            }
            label="Categories: Results by Category (Upgraded Features)"
          />
        </Box>

        {/* Certificate Section */}
        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={downloadCertificate}
                onChange={() => setDownloadCertificate(!downloadCertificate)}
              />
            }
            label="Certificate: Link to Download Certificate included when applicable"
          />
        </Box>
      </Collapse>
              </Paper>

              {/* Pass Marks Percent Settings */}
              <Paper className='!shadow'  sx={{ mb: 2, p: 2,boxShadow:"none"  }}>
                <Box display="flex" justifyContent="space-between" alignItems={"center"} onClick={() => toggleSetting2('passMarks')}>
                  <div className='flex items-center'>
                <Percent className='p-1 mr-2 bg-color1/20 border-color1 border-[1px] rounded-lg' size={40}/>
                  <Typography className='!font-[Poppins] ' variant="body1"><strong>Passing Marks & Percentage Settings</strong></Typography>
                  </div>
                  {openSettings2.passMarks? <MdExpandLess /> : <MdExpandMore />}
                </Box>
                <Collapse in={openSettings2.passMarks}>
        <Box mt={2}>
          {/* Pass Mark Field */}
          <Box mb={2}>
            <Typography variant="body2">Pass Mark:</Typography>
            <TextField
              type="number"
              placeholder="Enter pass mark %"
              value={passMark}
              onChange={(e) => setPassMark(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          
          </Box>

          {/* Test Completed Message Field */}
          <Box mb={2}>
            <Typography variant="body2">Test Completed Message:</Typography>
            <TextField
              placeholder="Enter message"
              multiline
              rows={3}
              value={testCompletedMessage}
              onChange={(e) => setTestCompletedMessage(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
           
          </Box>
        </Box>
      </Collapse>
              </Paper>
            </>
          )}
        </Box>
      </Box>

      {/* <button
        className="bg-color1 hover:bg-fore ml-48 text-white px-4 md:py-2 rounded-lg text-sm"
        onClick={() => handleSave({
          assignTestTypeId: "cfcb5964-bbf8-4d34-bb68-d0b114d2c52e",
          ...groupTest,
   
          //Availability

          availableFrom:availabilityFrom,
          availableUntil:availabilityUntil,
          availabilityStatus:availabilityStatus,

          //Attempts

          attemptsAllowed:attemptCount,

          // Print/Copy/paste/IP

          allowPrinting:allowPrinting,
          allowCopyText:allowHighlightCopy,
          allowPasting:allowPasting,
          allowTextTransition:allowTranslation,

          // IP recording

          recordPublic:ipRecord,
          recordPrivate:true,

          // Question Settings


          displayCategories:displayCategories,
          displayInstructions:displayGuidelines,
          displayPoints:displayPoints,
          questionPerPage:questionsPerPage,

          // Answer Settings


          
          mandatoryAnswer:mandatory,
          autoFinishTest: autoFinish,
          instantReview: instantReview,
          revealCorrectAnswer: revealAnswers,
          allowChangeAnswer: changeAnswers,
          allowQuestionBookmark: bookmarkQuestions,
          spellCheck: spellCheck,


          // Randomize Settings
          randomize: randomizeQuestions,

          // Time Limit Settings


          timeLimit:testDuration,

          // Resume Settings
          resumeLater:resumeLaterDisplay,

          // Result Page

          resultScorePoints:points,
          resultScorePercentage:percentage,
          customFeedback:customFeedback,
          gradedQuestions:gradedQuestions,

          revealCorrectResults:revealAnswers1,
          revealIncorrectResults:incorrectQuestionsOnly,
          resultByCategory:resultsByCategory,


          displayCertificateOnPassing:downloadCertificate,
          passingMarksPercentage:passMark,
          testCompletedMessage:testCompletedMessage,
         
          webhook:"http://localhost",
          
         setLoading

        })}
      >
        {loading ? (
                <Circles
                  height="20"
                  width="20"
                  color="primary"
                  ariaLabel="circles-loading"
                  visible={true}
                />
              ) : (
        "Assign Test" )}
      </button> */}

<button
  className="bg-color1 hover:bg-fore ml-48 text-white px-4 md:py-2 rounded-lg text-sm"
  onClick={() => handleSave({
    assignTestTypeId: "cfcb5964-bbf8-4d34-bb68-d0b114d2c52e",
    ...groupTest,
    // Availability
    availableFrom: availabilityFrom,
    availableUntil: availabilityUntil,
    availabilityStatus: availabilityStatus,
    // Attempts
    attemptsAllowed: attemptCount,
    // Print/Copy/paste/IP
    allowPrinting: allowPrinting,
    allowCopyText: allowHighlightCopy,
    allowPastingText: allowPasting,
    allowTextTransition: allowTranslation,
    // IP recording
    recordPublicIP: ipRecord,
    recordPrivateIP: true,
    // Question Settings
    displayCategories: displayCategories,
    displayInstructions: displayGuidelines,
    displayPoints: displayPoints,
    questionPerPage: questionsPerPage,
    // Answer Settings
    mandatoryAnswer: mandatory,
    autoFinishTest: autoFinish,
    instantReview: instantReview,
    revealCorrectAnswer: revealAnswers,
    allowChangeAnswer: changeAnswers,
    allowQuestionBookmark: bookmarkQuestions,
    spellCheck: spellCheck,
    // Randomize Settings
    randomize: randomizeQuestions,
    // Time Limit Settings
    timeLimit: testDuration,
    // Resume Settings
    resumeLater: resumeLaterDisplay,
    // Result Page
    resultScorePoints: points,
    resultScorePercentage: percentage,
    customFeedback: customFeedback,
    gradedQuestions: gradedQuestions,
    revealCorrectResults: revealAnswers1,
    revealIncorrectResults: incorrectQuestionsOnly,
    resultByCategory: resultsByCategory,
    displayCertificateOnPassing: downloadCertificate,
    passingMarksPercentage: passMark,
    testCompletedMessage: testCompletedMessage,
    webhook: "http://localhost",
  }, setLoading)} // Pass setLoading as a separate argument
>
  {loading ? (
    <Circles
      height="20"
      width="20"
      color="primary"
      ariaLabel="circles-loading"
      visible={true}
    />
  ) : (
    "Assign Test"
  )}
</button>

    </>
  );
};

export default Settings;
