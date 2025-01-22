import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer, Header, Sidebar } from '../../components';
import QuestionCard from '../../components/Question/QuestionCard';
import { getQuestionsByTeacherId, getQuestionTypes } from '../../api/question';
import { Circles } from 'react-loader-spinner';
import { LuEye } from "react-icons/lu";

import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Modal, Typography, Box, Tooltip, IconButton } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import { FaCaretDown } from 'react-icons/fa';
import { BiHide } from 'react-icons/bi';
import { getAllChildCategories } from '@/api/child-category';

const QuestionBank = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [totalQuestions,setTotalQuestions] = useState(0);
  const [totalArchive,setTotalArchive] = useState(0);
  const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get('page') || '1'));
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  const [activeTab, setActiveTab] = useState<string>('active');
  const [anchorElActions, setAnchorElActions] = useState<null | HTMLElement>(null);
  const [anchorElAddQuestion, setAnchorElAddQuestion] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    type: '',
    search:'',

  });
  const [hideAnswer,setHideAnswer] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await getAllChildCategories();
      if (data.code === 200) {
        setCategories(data.data); // Adjust the response structure based on your API
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };


  const fetchQuestionTypes = async () => {
    // Fetch question types from your API
    const data = await getQuestionTypes()
    if (data.code === 200) {
      setQuestionTypes(data.data); // Adjust the response structure based on your API
    }
  };

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

  const popperOpenActions = Boolean(anchorElActions);
  const popperOpenAddQuestion = Boolean(anchorElAddQuestion);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const getQuestions = async (page = 1,filters:any) => {
    setLoading(true);
    const data = await getQuestionsByTeacherId(page, pageSize,`categoryId=${filters.category}&questionTypeById=${filters.type}&searchItem=${filters.search}&isArchive=${activeTab==="active"?false:true}${filters.status === ""? ``:`&status=${filters.status}`} `); // Modify API as needed
    const data1 = await getQuestionsByTeacherId(page, pageSize,`categoryId=${filters.category}&questionTypeById=${filters.type}&searchItem=${filters.search}&isArchive=${true}`); // Modify API as needed

    if (data.code === 200) {
  
      setQuestions(data.data.questions);
      
      if(data1.code === 200){
      setTotalArchive(data1.data.totalQuestions);
      }
      setTotalPages(Math.ceil(data.data.totalQuestions / pageSize));
      if(activeTab==="active"){
      setTotalQuestions(data.data.totalQuestions);
      }
    }
    if(data.code=== 404){
      setQuestions([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchQuestionTypes();
    getQuestions(currentPage,filters);
  }, [currentPage, activeTab,filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded ${i === currentPage ? 'bg-color2 text-white' : 'bg-gray-200 text-black'} hover:bg-color1 transition-colors`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const handleFilterChange = (e:any) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full ">
        <Header />

        <div className="w-full pl-3 min-h-screen">
        <div className="w-full px-3 py-4 flex text-center justify-center md:justify-start ">
        <span className="text-2xl font-semibold ">Tests {'>'} Question Bank </span>
        </div>
          {/* Question Filter Section */}


          <div className="bg-white p-4 mr-10 mb-4 shadow-md rounded-md flex flex-col space-y-6 md:space-y-4">
            <div className="flex flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border-b-2 pb-3 border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-3 py-1 text-md font-semibold ${activeTab === 'active' ? 'text-color1 border-b-2 border-blue-500' : 'text-color3'}`}
                >
                  Active <span className="bg-blue-100 text-blue-400 text-xs px-2 py-1 rounded-full ml-1">{totalQuestions}</span>
                </button>
                <button
                  onClick={() => setActiveTab('archived')}
                  className={`px-3 py-1 text-md font-semibold ${activeTab === 'archived' ? 'text-color1 border-b-2 border-blue-500' : 'text-color3'}`}
                >
                  Archived <span className="bg-blue-100 text-blue-400 text-xs px-2 py-1 rounded-full ml-1">{totalArchive}</span>
                </button>
              </div>
              <div className="flex space-x-4 items-center">
                <div onMouseLeave={handleMouseLeaveActions}>
                  <button
                    className="w-full md:w-auto hover:cursor-pointer px-8 pl-4 py-2 border flex border-gray-300 rounded-lg text-sm text-black font-semibold"
                    onMouseEnter={handleMouseEnterActions}
                    onClick={handleMouseEnterActions}
                  >
                    Actions <FaCaretDown className="my-auto ml-2" />
                  </button>
                  <Popper open={popperOpenActions} anchorEl={anchorElActions} placement="bottom-start">
                    <ClickAwayListener onClickAway={handleMouseLeaveActions}>
                      <Paper sx={{ padding: 1 }}>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Edit question settings</button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Export question</button>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                </div>
                <div onMouseLeave={handleMouseLeaveAddQuestion}>
                  <button
                    className="bg-color2 hover:bg-fore text-white px-4 md:py-2 rounded-lg text-sm"
                    onMouseEnter={handleMouseEnterAddQuestion}
                    onClick={handleMouseEnterAddQuestion}
                  >
                    + Add Question
                  </button>
                  <Popper open={popperOpenAddQuestion} anchorEl={anchorElAddQuestion} placement="bottom-start">
                    <ClickAwayListener onClickAway={handleMouseLeaveAddQuestion}>
                      <Paper sx={{ padding: 1 }}>
                        <button onClick={handleOpenModal} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                          Add a new question
                        </button>
                        <button
                          onClick={() => navigate('/teacher-dashboard/questionbank/import')}
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

                 <div className='flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 pb-1'>
                    <div className='flex space-x-4'>
                      <button onClick={()=>setHideAnswer(!hideAnswer)} className="border-gray-300 rounded-lg border-2  mb-4 md:mb-0">
                        <Tooltip title={hideAnswer?"Unhide Answer":'Hide Answers'}>
                          <IconButton>
                        {hideAnswer?(<LuEye className='w-6 h-4 text-color1'/>): (<BiHide className='w-6 h-4 text-color1'/>)}
                        </IconButton>
                        </Tooltip>
                      </button>
                    </div>
                    <div className='flex space-x-2 md:space-x-4 items-center'>
                      <div className="relative w-full md:w-auto">
                        <input
                          type="text"
                          value={filters.search}
                          name='search'
                          onChange={handleFilterChange}
                          placeholder="Search"
                          className="w-full px-4 py-2 border hover:border-black border-gray-300 rounded-lg text-sm"
                        />
                        <button className="absolute right-2 top-2 text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 3a5 5 0 100 10A5 5 0 008 3zM1 8a7 7 0 1112.682 4.243l4.451 4.451a1 1 0 01-1.414 1.414l-4.451-4.451A7 7 0 011 8z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
            
                      <select 
                      name="status"
                      value={filters.status}
                    
                      onChange={handleFilterChange}
                      className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500">
                        <option value={""}>Any Status</option>
                        <option value={"used"}>Used</option>
                        <option value={"unUsed"}>Unused</option>
                      </select>
            
                      <select 
                      className="w-full md:w-auto px-4 py-2 border border-gray-300 hover:border-black rounded-lg text-sm text-gray-500"
                      value={filters.type}
                      name="type"
                      onChange={handleFilterChange}
                      >
                        <option value={""}>All Question Types</option>
                        {questionTypes.map((questionType:any) => (
                  <option key={questionType.id} value={questionType.id}>
                    {questionType.questionTypeName}
                  </option>
                ))}
                      </select>
            
                      <select
                name="category"
                className="w-full md:w-1/5 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-500"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map((category:any) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-500 rounded-lg text-sm">
                        Filter
                      </button>
                    </div>
                  </div>
                
          </div>
          {/* Questions List */}
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
              }}
            >
              <Circles height="80" width="80" color="#152487" ariaLabel="circles-loading" />
            </div>
          ) : (
            <>
              <div className="question-list">
                {questions.map((question, idx) => (
                  <QuestionCard key={idx} question={question} idx={currentPage} hide={hideAnswer} onDelete={getQuestions} />
                ))}
              </div>
              <div className="flex justify-center mt-8 mb-4">{questions.length===0?"": renderPagination()}</div>
            </>
          )}
        </div>
        <Footer/>
      </div>
      {/* Modal */}
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
                className="bg-color1 hover:bg-fore text-white px-5 py-2 rounded-lg"
                onClick={() => navigate('/teacher-dashboard/createQuestion')}
              >
                Create new Test
              </button>
            </Box>
      
           
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="p" sx={{ mb: 2, fontWeight: 'bold' }}>
                Into your Question Bank
              </Typography>
              <button
                className="bg-color1 hover:bg-fore text-white px-5 py-2 rounded-lg"
                onClick={() => navigate('/teacher-dashboard/createQuestion')}
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


      
    </div>
  );
};

export default QuestionBank;
