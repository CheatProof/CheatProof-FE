// import React, { useState } from 'react';
// import { BiHide } from "react-icons/bi";

// import Popper from '@mui/material/Popper';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import ClickAwayListener from '@mui/material/ClickAwayListener';

// const QuestionFilter: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>('active');




//   return (
//     <div className="bg-white p-4 mr-10 mb-10 shadow-md rounded-md flex flex-col space-y-6 md:space-y-4">
     
//       <div className="flex flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border-b-2 pb-3 border-gray-200">
        
//         <div className="flex space-x-4">
//           <button
//             onClick={() => setActiveTab('active')}
//             className={`px-3 py-1 text-md font-semibold ${activeTab === 'active' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-500'}`}
//           >
//             Active <span className="bg-blue-100 text-blue-400 text-xs px-2 py-1 rounded-full ml-1">1</span>
//           </button>
//           <button
//             onClick={() => setActiveTab('archived')}
//             className={`px-3 py-1 text-md font-semibold ${activeTab === 'archived' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-500'}`}
//           >
//             Archived <span className="bg-blue-100 text-blue-400 text-xs px-2 py-1 rounded-full ml-1">0</span>
//           </button>
//         </div>

        
//         <div className="flex space-x-4 items-center">
//           <select className="w-full md:w-auto hover:cursor-pointer pl-4 py-2 border border-gray-300 rounded-lg text-sm text-black font-semibold">
//             <option>Actions</option>
//             <option>Edit question settings</option>
//             <option>Export question</option>
//           </select>

//           <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:py-2 rounded-lg text-sm">
//             + Add Question
//           </button>
          
//         </div>
//       </div>

      
//       {/* <div className="flex flex-col md:flex-row md:space-x-4 items-center"> */}
//       <div className='flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 pb-3'>
//         {/* Hide Button */}
//         <div className='flex space-x-4'>
//         <button className="border-gray-300 rounded-lg border-2 px-2 py-2 mb-4 md:mb-0 ">
//           <BiHide />
//         </button>
//         </div>
//         <div className='flex space-x-2 md:space-x-4 items-center '>
//         {/* Search Box */}
//         <div className="relative w-full md:w-auto">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full px-4 py-2 border hover:border-black border-gray-300 rounded-lg text-sm"
//           />
//           <button className="absolute right-2 top-2 text-gray-500">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M8 3a5 5 0 100 10A5 5 0 008 3zM1 8a7 7 0 1112.682 4.243l4.451 4.451a1 1 0 01-1.414 1.414l-4.451-4.451A7 7 0 011 8z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </div>

       
//         <select className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
//           <option>Any Status</option>
//           <option>Used</option>
//           <option>Unused</option>
//         </select>

        
//         <select className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
//           <option>All Question Types</option>
//           <option>Multiple Choice</option>
//           <option>True False</option>
//         </select>

       
//         <select className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
//           <option>All Categories</option>
//           <option>Generic Parent</option>
//         </select>

        
//         <button className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg text-sm">
//           Filter
//         </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionFilter;




import React, { useState } from 'react';
import { BiHide } from "react-icons/bi";
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Modal, Typography, Box, Tooltip, IconButton } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";


const QuestionFilter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('active');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
  const [openModal, setOpenModal] = useState(false); // For Modal

  const [anchorElActions, setAnchorElActions] = useState<null | HTMLElement>(null); // For "Actions" button
  const [anchorElAddQuestion, setAnchorElAddQuestion] = useState<null | HTMLElement>(null); // For "+ Add Question" button

  // Handle hover to open the Popper
  // const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMouseLeave = () => {
  //   setAnchorEl(null);
  // };


const handleMouseEnterActions = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElActions(event.currentTarget);
};
const handleMouseLeaveActions = () => {
  setAnchorElActions(null);
};


const handleMouseEnterAddQuestion = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorElAddQuestion(event.currentTarget);
};
const handleMouseLeaveAddQuestion = () => {
  setAnchorElAddQuestion(null);
};


  const handleOptionClick = (url: string) => {
    window.location.href = url; 
  };

  const popperOpenActions = Boolean(anchorElActions); // To check if Actions Popper should be open
  const popperOpenAddQuestion = Boolean(anchorElAddQuestion); // To check if Add Question Popper should be open

 
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // const popperOpen = Boolean(anchorEl); // To check if Popper should be open

  return (
    <div className="bg-white p-4 mr-10 mb-10 shadow-md rounded-md flex flex-col space-y-6 md:space-y-4">
      <div className="flex flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border-b-2 pb-3 border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1 text-md font-semibold ${activeTab === 'active' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Active <span className="bg-blue-100 text-blue-400 text-xs px-2 py-1 rounded-full ml-1">1</span>
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`px-3 py-1 text-md font-semibold ${activeTab === 'archived' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-500'}`}
          >
            Archived <span className="bg-blue-100 text-blue-400 text-xs px-2 py-1 rounded-full ml-1">0</span>
          </button>
        </div>

        <div className="flex space-x-4 items-center">

        <div onMouseLeave={handleMouseLeaveActions}>
        
           <button
              className="w-full md:w-auto hover:cursor-pointer px-8 pl-4 py-2 border flex border-gray-300 rounded-lg text-sm text-black font-semibold"
              onMouseEnter={handleMouseEnterActions}
              
            >
             Actions
             <FaCaretDown className='my-auto ml-2'></FaCaretDown>
            </button>
            
            <Popper open={popperOpenActions} anchorEl={anchorElActions} placement="bottom-start">
              <ClickAwayListener onClickAway={handleMouseLeaveActions}>
                <Paper sx={{ padding: 1 }}>
                  <button
                    onClick={() => handleOptionClick('/page3')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Edit question settings
                  </button>
                  <button
                    onClick={() => handleOptionClick('/page4')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Export question
                  </button>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </div>

          <div onMouseLeave={handleMouseLeaveAddQuestion}>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:py-2 rounded-lg text-sm"
              onMouseEnter={handleMouseEnterAddQuestion}
            >
              + Add Question
            </button>
            {/* Popper appears on hover */}
            <Popper open={popperOpenAddQuestion} anchorEl={anchorElAddQuestion} placement="bottom-start">
              <ClickAwayListener onClickAway={handleMouseLeaveAddQuestion}>
                <Paper sx={{ padding: 1 }}>
                  
                  <button
                    onClick={handleOpenModal}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Add a new question
                  </button>

                  <button
                    onClick={() => window.location.href = '/page2'}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Import spreadsheet (.CSV)
                  </button>
                </Paper>
              </ClickAwayListener>
            </Popper>
          </div>
        </div>
      </div>

      <Modal
  open={openModal}
  onClose={handleCloseModal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600, 
      bgcolor: 'background.paper',
      borderRadius: '8px', 
      boxShadow: 24,
      p: 4,
    }}
  >

<IoMdClose
      onClick={handleCloseModal}
      style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        cursor: 'pointer',
        fontSize: '24px', 
        color: '#999', 
        transition: 'color 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'black')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#999')}
    />
  
    <Typography
      id="modal-modal-title"
      variant="h6"
      component="h2"
      sx={{ textAlign: 'center', mb: 4 }} 
    >
      Where do you want to add your new Questions?
      
    </Typography>

   
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="p" sx={{ mb: 2, fontWeight: 'bold' }}>
          Into a Test
        </Typography>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={() => alert('Create new test')}
        >
          Create new Test
        </button>
      </Box>

     
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="p" sx={{ mb: 2, fontWeight: 'bold' }}>
          Into your Question Bank
        </Typography>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={() => alert('Add to Question Bank')}
        >
          Add to Question Bank
        </button>
      </Box>
    </Box>

  
    <Typography variant="body2" sx={{ mt: 4, color: 'gray' }}>
      <ul>
        <li>Tips:</li>
        <li>Your Question Bank is where all your Questions are stored.</li>
        <li>
          When adding and removing Questions from Tests, Questions will always remain in your Question Bank.
        </li>
      </ul>
    </Typography>
  </Box>
</Modal>


      <div className='flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 pb-3'>
        <div className='flex space-x-4'>
          <button className="border-gray-300 rounded-lg border-2  mb-4 md:mb-0">
            <Tooltip title='Hide Answers'>
              <IconButton>
            <BiHide className='w-6 h-4'/>
            </IconButton>
            </Tooltip>
          </button>
        </div>
        <div className='flex space-x-2 md:space-x-4 items-center'>
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border hover:border-black border-gray-300 rounded-lg text-sm"
            />
            <button className="absolute right-2 top-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 3a5 5 0 100 10A5 5 0 008 3zM1 8a7 7 0 1112.682 4.243l4.451 4.451a1 1 0 01-1.414 1.414l-4.451-4.451A7 7 0 011 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <select className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
            <option>Any Status</option>
            <option>Used</option>
            <option>Unused</option>
          </select>

          <select className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
            <option>All Question Types</option>
            <option>Multiple Choice</option>
            <option>True False</option>
          </select>

          <select className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
            <option>All Categories</option>
            <option>Generic Parent</option>
          </select>

          <button className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg text-sm">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionFilter;
