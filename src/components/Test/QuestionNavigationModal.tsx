import  { useState } from 'react';
import { Modal, Tabs, Tab, List, ListItem, ListItemText, IconButton, Badge } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

function QuestionNavigationModal({ open, onClose, questions,setQuestions  ,setClose,selectedAnswers}:any) {
    const [selectedTab, setSelectedTab] = useState(0);
    // const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    // const [modalOpen, setModalOpen] = useState<boolean>(false);
// selectedAnswer 
// [
//     {
//         questionId,
//         userAnswer,

//     }
// ]
    const isAnswered = (questionId:any)=> {
        return selectedAnswers.some((answer:any)=>{return answer.questionId===questionId});
    }

    const handleTabChange = (event:any, newValue:any) => {
        console.log(event);
        setSelectedTab(newValue);
    };

    const handleBookmark = (index:any)=>{
        const newQuestions = [...questions];
        newQuestions[index].bookmarked =!newQuestions[index].bookmarked;
        setQuestions(newQuestions);
    }

    return (
        <Modal className='flex justify-center items-center' open={open}  >
           
            <div className="p-4 w-full max-w-2xl mx-auto max-h-[500px]  bg-white rounded-md shadow-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">All Questions</h2>
                    <IconButton onClick={()=>setClose(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Tabs value={selectedTab} onChange={handleTabChange} className="mt-2">
                    <Tab label="All Questions" />
                    <Tab 
                        label={
                            <Badge badgeContent={0} color="primary">
                                Bookmarked
                            </Badge>
                        } 
                    />
                </Tabs>
                <div className="overflow-y-auto max-h-80 mt-4">
                    {selectedTab === 0 && (
                        <List>
                            {questions.map((question:any, index:any) => (
                                <ListItem key={index} divider>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                            {/* <BookmarkBorderIcon    className="mr-2" /> */}
                                           <span className='w-[7%] mr-2'> {question.bookmarked ? <FaBookmark size={20} onClick={()=>handleBookmark(index)} className="  "/> : <FaRegBookmark size={20} onClick={()=>handleBookmark(index)} className=' '/>}</span>
                                            <ListItemText
                                                primary={<div
                                                    dangerouslySetInnerHTML={{ __html: question.questionText }}
                                                  />
                                              }
                                                secondary={isAnswered(question.id) ? "Answered" : "Unanswered"}
                                                className={`text-sm ${isAnswered(question.id) ? 'text-green-500' : 'text-red-500'}`}
                                            />
                                        </div>
                                        <IconButton edge="end" onClick={() => {onClose(index)}}>
                                            <ArrowForwardIosIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    )}
                    {selectedTab === 1 && (
                        <List>
                            {questions
                                .filter((q:any) => q.bookmarked)
                                .map((question:any, index:any) => (
                                    <ListItem key={index} divider>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center">
                                                {/* <BookmarkBorderIcon className="mr-2" /> */}
                                                <ListItemText
                                                  primary={<div
                                                    dangerouslySetInnerHTML={{ __html: question.questionText }}
                                                  />}
                                                secondary={question.answered ? "Answered" : "Unanswered"}
                                                className={`text-sm ${question.answered ? 'text-green-500' : 'text-red-500'}`}
                                                />
                                            </div>
                                            <IconButton edge="end" onClick={() => {/* navigate to question */}}>
                                                <ArrowForwardIosIcon fontSize="small" />
                                            </IconButton>
                                        </div>
                                    </ListItem>
                                ))
                            }
                        </List>
                    )}
                </div>
            </div>
            
        </Modal>
    );
}

export default QuestionNavigationModal;
