// import { useState, useEffect } from 'react';
// import { Box, Button, IconButton, Typography } from '@mui/material';
// import QuestionNavigationModal from '../../components/Test/QuestionNavigationModal';
// import MCQTestCard from '../../components/SessionQuestionCards/MCQCard';
// import TrueFalseCard from '../../components/SessionQuestionCards/TrueFalseCard';
// import FreeTextCard from '../../components/SessionQuestionCards/FreeTextCard';
// import { ListIcon, User } from 'lucide-react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getTestQuestionById } from '../../api/test';



// function TestSession() {
//     const { id } = useParams();
//     const history = useNavigate();
  
//     const [showInstructions, setShowInstructions] = useState<boolean>(
//       () => JSON.parse(sessionStorage.getItem('showInstructions') || 'true')
//     );
//     const [currentQuestion, setCurrentQuestion] = useState<number>(0);
//     const [modalOpen, setModalOpen] = useState<boolean>(false);
//     const [selectedAnswers, setSelectedAnswers] = useState<any[]>(
//       () => JSON.parse(localStorage.getItem('selectedAnswers') || '[]')
//     );
//     const [timer, setTimer] = useState<number>(()=>Number(localStorage.getItem("timer") || 0.050 * 60 * 60) );
//     const [questions, setQuestions] = useState<any[]>([]);
//     const [testStarted, setTestStarted] = useState<boolean>( 
//         JSON.parse(localStorage.getItem('testStaretd') || 'true')
//     ); // Track if test has started
  
//     const handleStartTest = () => {
//       setShowInstructions(false);
//       sessionStorage.setItem('showInstructions', 'false');
//       setTestStarted(true); // Indicate that the test has started
//       localStorage.setItem('testStarted', "true"); // Store timer in local storage
//       setTimer(0.50 * 60 * 60); // Set timer to 5 hours in seconds
//     };
  
//     const handleSelectAnswer = (questionId: string, answer: any | any[]) => {
//       const newSelectedAnswers = selectedAnswers.map((ans: any) =>
//         ans.questionId === questionId ? { questionId, answer } : ans
//       );
//       if (!selectedAnswers.find((ans: any) => ans.questionId === questionId)) {
//         newSelectedAnswers.push({ questionId, answer });
//       }
//       setSelectedAnswers(newSelectedAnswers);
//       localStorage.setItem('selectedAnswers', JSON.stringify(newSelectedAnswers));
//       updateAnsweredStatus(questionId);
//     };
  
//     const updateAnsweredStatus = (questionId: string) => {
//       setQuestions((prevQuestions) =>
//         prevQuestions.map((q) => (q.id === questionId ? { ...q, answered: true } : q))
//       );
//     };
  
//     const renderSessionCard = (question: any) => {
//       switch (question.questionTypeId) {
//         case '0d1010c6-5835-4f21-a610-435dddabf739':
//           return <MCQTestCard question={question} saveAnswer={handleSelectAnswer} answers={selectedAnswers} />;
//         case '1edada12-0532-4058-b79f-3e43efac97e1':
//           return <TrueFalseCard question={question} saveAnswer={handleSelectAnswer} answers={selectedAnswers} />;
//         case 'cfa02311-dde4-4b4f-ae96-6d416a5c0396':
//           return <FreeTextCard question={question} saveAnswer={handleSelectAnswer} answers={selectedAnswers} />;
//         default:
//           return <div>No question type selected</div>;
//       }
//     };
  
//     const handleNextQuestion = () => {
//       if (currentQuestion < questions.length - 1) {
//         setCurrentQuestion(currentQuestion + 1);
//       }
//     };
  
//     const handlePreviousQuestion = () => {
//       if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
//     };
  
//     const openModal = () => setModalOpen(true);
//     const closeModal = (index: number) => {
//       setCurrentQuestion(index);
//       setModalOpen(false);
//     };
  
//     const fetchQuestions = async () => {
//       const data = await getTestQuestionById(id);
//       if (data.code === 200) {
//         const fetchedQuestions = data.data.map((question: any) => ({
//           ...question,
//           answered: selectedAnswers.some((ans) => ans.questionId === question.id),
//         }));
//         setQuestions(fetchedQuestions);
//         const savedQuestionIndex = parseInt(sessionStorage.getItem('currentQuestion') || '0');
//         setCurrentQuestion(savedQuestionIndex);
//       }
//     };
  
//     const checkAllAnsweredOrEnd = () => {
//       const allAnswered = questions.every((question) => question.answered);
//       return allAnswered || currentQuestion === questions.length - 1;
//     };
  
//     const finishTest = () => {
//       localStorage.removeItem('selectedAnswers');
//       localStorage.removeItem('timer');
//       localStorage.removeItem('currentQuestion');
//       sessionStorage.removeItem('showInstructions');
//       localStorage.removeItem('testStarted');

//       history(-1);
//     };
  
//     useEffect(() => {
//       fetchQuestions();
//     }, []);
  
//     useEffect(() => {
//       if (testStarted) {
//         const interval = setInterval(() => {
//           setTimer((prev) => {
//             const updatedTimer = prev - 1;
//             localStorage.setItem('timer', updatedTimer.toString());
//             return updatedTimer;
//           });
//         }, 1000);
//         return () => clearInterval(interval);
//       }
//     }, [testStarted]);
  
//     useEffect(() => {
//       if (timer <= 0) {
//         finishTest();
//       }
//     }, [timer, testStarted]);
  
//     useEffect(() => {
//       sessionStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
//     }, [currentQuestion, questions]);
  
//   return (
//     <div className="p-4 flex min-h-screen justify-center items-center">
//       {showInstructions ? (
//         <div className="flex max-w-3xl w-full items-center justify-center">
  
//           <Box className="p-6 rounded-lg w-full text-fore">
//             <h1 className="w-full font-bold text-2xl opacity-70 text-center mb-6">CCN Preparation</h1>
//             <Box className="bg-gray-50 p-4 px-5 py-6 mt-5 mb-6 w-full">
//               <h4 className="w-full font-bold text-lg text-center opacity-70 mb-6">Instructions</h4>
              
//               <Typography variant="body1" component="div" className="text-gray-700">
//                 <ul className="list-disc list-inside space-y-2 text-fore">
//                   <li className="text-sm">Number of questions: <strong>49</strong></li>
//                   <li className="text-sm">Has a time limit of: <strong>05:00:00</strong></li>
//                   <li className="text-sm">Number of attempts allowed:</li>
//                   <li className="text-sm">Must be finished in one sitting. You cannot save and finish later.</li>
//                   <li className="text-sm">Questions displayed per page: <strong>1</strong></li>
//                   <li className="text-sm">Will allow you to go back and change your answers.</li>
//                   <li className="text-sm">Will let you finish with some questions unanswered.</li>
//                 </ul>
//               </Typography>
//             </Box>
//             <Typography variant="body2" className="text-color1 mb-4">Note: This is Test for Preparation</Typography>
//             <div className="flex justify-center">
//               {/* <Button variant="contained" color="error" onClick={handleStartTest} className="px-8">Continue</Button> */}
//               <button
//           className="bg-color2 hover:bg-color1 text-white px-4 py-2 rounded-lg"
//           onClick={handleStartTest}
//         >
//           Continue
//         </button>
//             </div>
//           </Box>
//         </div>
//       ) : (
//         <div className="max-w-3xl px-4 w-full mx-auto">
//           <div className="flex items-center justify-between bg-white">
//             <div className="flex items-center">
//               <h1 className="font-bold text-gray-700 text-3xl">CCN Preparation</h1>
//             </div>
//             <div className="flex items-center space-x-2">
//               <IconButton><User fontSize="large" /></IconButton>
//               <Typography variant="body1" className="text-gray-700">Syed Zaryab</Typography>
//             </div>
//           </div>
//           <Button
//             startIcon={<ListIcon />}
//             variant="text"
//             color="primary"
//             className="normal-case"
//             onClick={openModal}
//           >
//             See all questions
//           </Button>
//           <div>Time Left: {new Date(timer * 1000).toISOString().substr(11, 8)}</div>
//           <div className="my-4 mx-auto w-full flex flex-col items-center flex-wrap">
//             <h3 className="w-full">Question {currentQuestion + 1} of {questions.length}</h3>
//             {questions.length > 0 && renderSessionCard(questions[currentQuestion])}
//           </div>
//           <div className="flex space-x-4 items-center justify-center">
//             {/* <Button variant="outlined" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>Previous</Button> */}
//              {/* <Button variant="contained" onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>Next</Button> */}
//             {/* <Button variant="contained" color="error" disabled={!checkAllAnsweredOrEnd()} onClick={finishTest}>Finish</Button> */}
//             <button className="bg-color2 enabled:hover:bg-color1 text-white disabled:opacity-50 px-4 py-2 rounded-md" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}
//         >
//           Previous
//         </button>
//         <button className="bg-color2 enabled:hover:bg-color1 text-white disabled:opacity-50 px-4 py-2 rounded-md" onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}
//         >
//           Next
//         </button>
//         <button className="bg-white text-fore border enabled:hover:bg-fore  enabled:hover:text-white border-fore font-semibold disabled:opacity-40 px-4 py-2 rounded-md" disabled={!checkAllAnsweredOrEnd()} onClick={finishTest}
//         >
//           Finish
//         </button>
           
//           </div>
//           <QuestionNavigationModal
//             open={modalOpen}
//             onClose={closeModal}
//             questions={questions}
//             currentQuestion={currentQuestion}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default TestSession;



import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import QuestionNavigationModal from '../../components/Test/QuestionNavigationModal';
import MCQTestCard from '../../components/SessionQuestionCards/MCQCard';
import TrueFalseCard from '../../components/SessionQuestionCards/TrueFalseCard';
import FreeTextCard from '../../components/SessionQuestionCards/FreeTextCard';
import { ListIcon, User } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTestQuestionById } from '../../api/test';

function TestSession() {
  const { id } = useParams();
  const history = useNavigate();

  const [showInstructions, setShowInstructions] = useState<boolean>(
    () => JSON.parse(sessionStorage.getItem('showInstructions') || 'true') 
  );
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>(
    () => JSON.parse(localStorage.getItem('selectedAnswers') || '[]')
  );
  const [timer, setTimer] = useState<number>(() =>
    Number(localStorage.getItem('timer') || 0.05 * 60 * 60)
  );
  const [questions, setQuestions] = useState<any[]>([]);
  const [testStarted, setTestStarted] = useState<boolean>(
    JSON.parse(localStorage.getItem('testStarted') || 'false')
  ); // Track if test has started

  const totalTime = 0.05 * 60 * 60; // Total time in seconds (5 hours)

  const handleStartTest = () => {
    setShowInstructions(false);
    sessionStorage.setItem('showInstructions', 'false');
    setTestStarted(true); // Indicate that the test has started
    localStorage.setItem('testStarted', 'true');
    setTimer(totalTime); // Set timer to 5 hours in seconds
  };

  const handleSelectAnswer = (questionId: string, answer: any | any[]) => {
    const newSelectedAnswers = selectedAnswers.map((ans: any) =>
      ans.questionId === questionId ? { questionId, userAnswer:answer,timeTaken:240 } : ans
    );
    if (!selectedAnswers.find((ans: any) => ans.questionId === questionId)) {
      newSelectedAnswers.push({ questionId, userAnswer:answer,timeTaken:240 });
    }
    setSelectedAnswers(newSelectedAnswers);
    localStorage.setItem('selectedAnswers', JSON.stringify(newSelectedAnswers));
    updateAnsweredStatus(questionId);
  };

  const updateAnsweredStatus = (questionId: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, answered: true } : q
      )
    );
  };

  const renderSessionCard = (question: any) => {
    if (!question) {
      return <Typography variant="body1">No question available</Typography>;
    }
  
    switch (question.questionTypeId) {
      case '0d1010c6-5835-4f21-a610-435dddabf739':
        return <MCQTestCard question={question} saveAnswer={handleSelectAnswer} answers={selectedAnswers} />;
      case '1edada12-0532-4058-b79f-3e43efac97e1':
        return <TrueFalseCard question={question} saveAnswer={handleSelectAnswer} answers={selectedAnswers} />;
      case 'cfa02311-dde4-4b4f-ae96-6d416a5c0396':
        return <FreeTextCard question={question} saveAnswer={handleSelectAnswer} answers={selectedAnswers} />;
      default:
        return <Typography variant="body1">Unsupported question type</Typography>;
    }
  };
  
 

  // const renderSessionCard = (question: any) => {
  //         switch (question.questionTypeId) {
  //           case '0d1010c6-5835-4f21-a610-435dddabf739':
  //             return <MCQTestCard question={question} saveAnswer={handleSelectAnswer} answers={selectedAnswers} />;
  //           case '1edada12-0532-4058-b79f-3e43efac97e1':
  //             return <TrueFalseCard question={question} saveAnswer={handleSelectAnswer} answers={selectedAnswers} />;
  //           case 'cfa02311-dde4-4b4f-ae96-6d416a5c0396':
  //             return <FreeTextCard question={question} saveAnswer={handleSelectAnswer} answers={selectedAnswers} />;
  //           default:
  //             return <div>No question type selected</div>;
  //         }
  // };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  // const closeModal = (index: number) => {
  //   setCurrentQuestion(index);
  //   setModalOpen(false);
  // };
  
  const openModal = () => setModalOpen(true);


  const fetchQuestions = async () => {
    const data = await getTestQuestionById(id);
    if (data.code === 200) {
      const fetchedQuestions = data.data.map((question: any) => ({
        ...question,
        answered: selectedAnswers.some((ans) => ans.questionId === question.id),
      }));
      setQuestions(fetchedQuestions);
      const savedQuestionIndex = parseInt(sessionStorage.getItem('currentQuestion') || '0');
      setCurrentQuestion(savedQuestionIndex);
    }
  };

  const checkAllAnsweredOrEnd = () => {
    const allAnswered = questions.every((question) => question.answered);
    return allAnswered || currentQuestion === questions.length - 1;
  };

  const finishTest = () => {
    localStorage.removeItem('selectedAnswers');
    localStorage.removeItem('timer');
    localStorage.removeItem('currentQuestion');
    sessionStorage.removeItem('showInstructions');
    localStorage.removeItem('testStarted');

    history(-1);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (testStarted) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          const updatedTimer = prev - 1;
          localStorage.setItem('timer', updatedTimer.toString());
          return updatedTimer;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [testStarted]);

  useEffect(() => {
    if (timer <= 0) {
      finishTest();
    }
  }, [timer, testStarted]);

  useEffect(() => {
    sessionStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
  }, [currentQuestion, questions]);

  const timeBarWidth = (timer / totalTime) * 100; // Calculate percentage width of the time bar

  return (
    <div className="p-4 flex min-h-screen justify-center items-center">
      {showInstructions ? (
        <div className="flex max-w-3xl w-full items-center justify-center">
          {/* Instructions Section */}
          <Box className="p-6 rounded-lg w-full text-fore">
            <h1 className="w-full font-bold text-2xl opacity-70 text-center mb-6">CCN Preparation</h1>
            <Box className="bg-gray-50 p-4 px-5 py-6 mt-5 mb-6 w-full">
              <h4 className="w-full font-bold text-lg text-center opacity-70 mb-6">Instructions</h4>
              <Typography variant="body1" component="div" className="text-gray-700">
                <ul className="list-disc list-inside space-y-2 text-fore">
                  <li className="text-sm">Number of questions: <strong>49</strong></li>
                  <li className="text-sm">Has a time limit of: <strong>05:00:00</strong></li>
                  <li className="text-sm">Number of attempts allowed:</li>
                  <li className="text-sm">Must be finished in one sitting. You cannot save and finish later.</li>
                  <li className="text-sm">Questions displayed per page: <strong>1</strong></li>
                  <li className="text-sm">Will allow you to go back and change your answers.</li>
                  <li className="text-sm">Will let you finish with some questions unanswered.</li>
                </ul>
              </Typography>
            </Box>
            <Typography variant="body2" className="text-color1 mb-4">Note: This is Test for Preparation</Typography>
            <div className="flex justify-center">
              <button
                className="bg-color2 hover:bg-color1 text-white px-4 py-2 rounded-lg"
                onClick={handleStartTest}
              >
                Continue
              </button>
            </div>
          </Box>
        </div>
      ) : (
        <div className="max-w-3xl px-4 w-full mx-auto">
  <div className="flex items-center justify-between bg-white mb-3">
    <div className="flex items-center">
      <h1 className="font-bold text-gray-700 text-3xl">CCN Preparation</h1>
    </div>
    <div className="flex items-center space-x-2">
      <IconButton>
        <User fontSize="large" />
      </IconButton>
      <Typography variant="body1" className="text-gray-700">Syed Zaryab</Typography>
    </div>
  </div>
  <Button
    startIcon={<ListIcon />}
    variant="text"
    color="primary"
    className="normal-case"
    onClick={openModal}
  >
    See all questions
  </Button>
  <div>Time Left: {new Date(timer * 1000).toISOString().substr(11, 8)}</div>
  <div className="w-full bg-gray-300 rounded-md mt-2 h-4 overflow-hidden">
    <div
      className="bg-color2 h-full transition-all duration-100 ease-linear"
      style={{ width: `${timeBarWidth}%` }}
    />
  </div>
  {/* <div className="mt-6">
    {renderSessionCard(questions[currentQuestion])}
  </div> */}
{/* <div className="my-4 mx-auto w-full flex flex-col items-center flex-wrap"> */}
      
          
<div className="mt-6">
<h3 className="w-full">Question {currentQuestion + 1} of {questions.length}</h3>
  {questions.length > 0 && currentQuestion >= 0 && currentQuestion < questions.length ? (
    renderSessionCard(questions[currentQuestion])
  ) : (
    <Typography variant="body1">Loading question...</Typography>
  )}
</div>


  {/* <div className="flex space-x-2 mt-4">
    <button
      className="bg-color1 text-white px-4 py-2 rounded-lg"
      disabled={currentQuestion <= 0}
      onClick={handlePreviousQuestion}
    >
      Previous
    </button>
    <button
      className="bg-color1 text-white px-4 py-2 rounded-lg"
      disabled={checkAllAnsweredOrEnd()}
      onClick={handleNextQuestion}
    >
      Next
    </button>
    <button
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
      onClick={finishTest}
    >
      Finish Test
    </button>
  </div> */}

<div className="flex space-x-4 items-center justify-center">
           
        <button className="bg-color2 enabled:hover:bg-color1 text-white disabled:opacity-50 px-4 py-2 rounded-md" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}
        >
         Previous       </button>
         <button className="bg-color2 enabled:hover:bg-color1 text-white disabled:opacity-50 px-4 py-2 rounded-md" onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}
       >
         Next
        </button>
       <button className="bg-white text-fore border enabled:hover:bg-fore  enabled:hover:text-white border-fore font-semibold disabled:opacity-40 px-4 py-2 rounded-md" disabled={!checkAllAnsweredOrEnd()} onClick={finishTest}
        >
          Finish
        </button>
           
          </div>
  <QuestionNavigationModal
    questions={questions}
    open={modalOpen}
    // onClose={closeModal}
    onClose={() => setModalOpen(false)}
    currentQuestion={currentQuestion}
  />
</div>

      )}
    </div>
  );
}

export default TestSession;
