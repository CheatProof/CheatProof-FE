import { useState } from 'react';
import { 
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

import { ChevronDown, Download, Upload, Check } from 'lucide-react';
import { importQuestions } from '../../api/question';

const QuestionBankImport = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const steps = [
    { number: 1, label: 'Download template', icon: <Download className="px-1 w-5 h-5" /> },
    { number: 2, label: 'Upload questions', icon: <Upload className="px-1 w-5 h-5" /> },
    { number: 4, label: 'Save questions', icon: <Check className="px-1 w-5 h-5" /> }
  ];

  const questionTypes = [
    { type: 'Multiple Choice', blank: 'Blank', sample: 'Sample' },
    { type: 'Multiple Response', blank: 'Blank', sample: 'Sample' },
    { type: 'True / False', blank: 'Blank', sample: 'Sample' },
    { type: 'Matching', blank: 'Blank', sample: 'Sample' },
    { type: 'Free Text', blank: 'Blank', sample: 'Sample' }
  ];

  const handleFileUpload = (event:any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFileSubmit = async() => {
    // Add file upload logic here
    console.log('Uploaded file:', selectedFile);

    if (selectedFile){
    const data = await importQuestions(selectedFile);
    if (data.code === 200) {
      console.log("Questions imported successfully", data.data);
    } else {
      console.log("Error importing questions", data);
    }
    }
    handleModalClose();
    setActiveStep(3); // Move to the next step after upload
  };

  return (
    <div className="w-full mx-auto p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Tests &gt; Question Bank &gt; Import Questions
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full 
              ${activeStep >= step.number ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step.icon}
            </div>
            <Typography className="ml-2">{step.label}</Typography>
            {index < steps.length - 1 && (
              <div className="mx-4 h-px w-16 bg-gray-300" />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <Card>
          <CardContent>
            <Typography variant="h6" className="mb-4">1: Download .CSV Question Template</Typography>
            
            <Typography variant="subtitle1" className="mb-4">Instructions</Typography>
            
            <div className="space-y-4">
              <Accordion>
                <AccordionSummary expandIcon={<ChevronDown />}>
                  <Typography>How to upload new Questions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Instructions for uploading new questions...</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ChevronDown />}>
                  <Typography>How to override existing Questions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Instructions for overriding questions...</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ChevronDown />}>
                  <Typography>'Upload new' VS 'Override existing' Questions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Comparison of upload options...</Typography>
                </AccordionDetails>
              </Accordion>
            </div>

            <Typography variant="subtitle1" className="mt-6 mb-4">
              Download "Question Import" Templates:
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Question Type</TableCell>
                    <TableCell>CSV Template</TableCell>
                    <TableCell>Instructions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questionTypes.map((row) => (
                    <TableRow key={row.type}>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>
                        <div className="space-x-2">
                          <Button variant="text" className="text-red-500">
                            {row.blank}
                          </Button>
                          <span>|</span>
                          <Button variant="text" className="text-red-500">
                            {row.sample}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="text" className="text-red-500" startIcon={<Download />}>
                          PDF Instructions
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Right Column */}
        <Card className='bg-transparent'>
          <CardContent>
            <Typography variant="h6" className="mb-4">2: Upload Questions</Typography>
            <Typography className="mb-4">When your Question template is ready:</Typography>
            <Button 
              variant="contained" 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleModalOpen}
            >
              Go to Step 2
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upload Modal */}
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Upload Question CSV File</DialogTitle>
        <DialogContent>
          <Typography variant="body2" className="mb-4">
            Please select a .csv file to upload your questions.
          </Typography>
          <TextField
            type="file"
            inputProps={{ accept: '.csv' }}
            onChange={handleFileUpload}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleFileSubmit} 
            color="primary" 
            variant="contained"
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuestionBankImport;
