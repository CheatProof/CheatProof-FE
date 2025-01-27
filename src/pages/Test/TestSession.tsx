import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import QuestionNavigationModal from '../../components/Test/QuestionNavigationModal';
import MCQTestCard from '../../components/SessionQuestionCards/MCQCard';
import TrueFalseCard from '../../components/SessionQuestionCards/TrueFalseCard';
import FreeTextCard from '../../components/SessionQuestionCards/FreeTextCard';
import { ListIcon, User } from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { continueTest, endTestSession, startTestSession } from '@/api/test-session';
import { AlertDialog,AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,AlertDialogAction } from '@/components/ui/alert-dialog';
import { Circles } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';

function TestSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation()

  const user:any = localStorage.getItem('user')

  const {quiz}= location?.state

  console.log(quiz)

  const [tabSwitchCount, setTabSwitchCount] = useState(() => 
    parseInt(localStorage.getItem('tabSwitchCount') || '0')
  );
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [startedLoading, setStaredLoading] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [nextQuestionLoading, setNextQuestionLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  // const containerRef = useRef<any>(null);
  


  // Disable specific keys
  useEffect(() => {
    const disableKeys = (e: KeyboardEvent) => {
      if ((e.key === "Escape" || e.key === "F11") && isFullScreen) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("keydown", disableKeys);
    return () => {
      document.removeEventListener("keydown", disableKeys);
    };
  }, [isFullScreen]);

  // Fullscreen change listener to update state
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange); // For Safari
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
    };
  }, []);

  const [showInstructions, setShowInstructions] = useState<boolean>(
    () => JSON.parse(sessionStorage.getItem('showInstructions') || 'true')
  );
  const [currentQuestion, setCurrentQuestion] = useState<number>(
    parseInt(sessionStorage.getItem('currentQuestion') || '0')
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>(
    () => JSON.parse(localStorage.getItem('selectedAnswers') || '[]')
  );
  const [timer, setTimer] = useState<number>(() =>
    Number(localStorage.getItem('timer') || 0.05 * 60 * 60)
  );
  
  const [questions, setQuestions] = useState<any[]>( 
    ()=> JSON.parse(localStorage.getItem('Questions') || `[]`)
);
  const [testStarted, setTestStarted] = useState<boolean>(
    JSON.parse(localStorage.getItem('testStarted') || 'false')
  ); // Track if test has started

  const totalTime = quiz.AssignedTests.timeLimit * 60; // Total time in seconds (5 hours)

  const handleStartTest = async() => {
    
    setStaredLoading(true);


    

    const data = await startTestSession({assignedTestId:id})
    console.log(data)

    if (data.code === 200 || data.code === 201){
    const testSessionId = data.data.sessionId;


    const fetchedQuestions = data?.data?.questions?.Tests?.Questions.map((question: any) => ({
      ...question,
      answered: selectedAnswers.some((ans) => ans.questionId === question.id),
    }));
    setQuestions(fetchedQuestions);
    const savedQuestionIndex = parseInt(sessionStorage.getItem('currentQuestion') || '0');
    localStorage.setItem('Questions', JSON.stringify(fetchedQuestions));
    setCurrentQuestion(savedQuestionIndex);

    // Update the URL search params with testSessionId
    const url = new URL(window.location.href);
    url.searchParams.set('sessionId', testSessionId);
    

    setShowInstructions(false);
    sessionStorage.setItem('showInstructions', 'false');
    setTestStarted(true); // Indicate that the test has started
    localStorage.setItem('testStarted', 'true');
    setTimer(totalTime); // Set timer to 5 hours in seconds


    setTabSwitchCount(0);
    localStorage.setItem('tabSwitchCount', '0'); 

    setStaredLoading(false);

    localStorage.setItem('sessionId', testSessionId);
    // toggleFullScreen()


    navigate(`?sessionId=${testSessionId}`,{
      state:{
        quiz:quiz,
        sessionId: testSessionId
      }
    });

  }else if(data.code === 409){
    toast.error('On going test Session Found');
    setStaredLoading(false);
  }else if (data.code === 422){
    toast.error('Test is unavailable ')
    setStaredLoading(false);
  }

  };

  const handleSelectAnswer = (questionId: string, answer: any | any[]) => {
    const newSelectedAnswers = selectedAnswers.map((ans: any) =>
      ans.questionId === questionId ? { questionId, userAnswer:answer,timeTaken:timer } : ans
    );
    if (!selectedAnswers.find((ans: any) => ans.questionId === questionId)) {
      newSelectedAnswers.push({ questionId, userAnswer:answer,timeTaken:timer });
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
  
 


  const handleNextQuestion = async() => {
    
    if (currentQuestion < questions.length - 1) {
      setNextQuestionLoading(true);
      await continueTest({testSessionId:localStorage.getItem('sessionId'),attemptedQuestions:selectedAnswers,currentQuestionIndex:currentQuestion+1})
      setNextQuestionLoading(false);
      setCurrentQuestion(currentQuestion + 1);


    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const closeModal = (index: number) => {
    setCurrentQuestion(index);
    setModalOpen(false);
  };
  
  const openModal = () => setModalOpen(true);


  const checkAllAnsweredOrEnd = () => {
    const allAnswered = questions.every((question) => question.answered);
    return allAnswered || currentQuestion === questions.length - 1;
  };

  const finishTest = async() => {
    setFinishedLoading(true);

    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get("sessionId")?queryParams.get("sessionId"):localStorage.getItem("sessionId");

    const results = await endTestSession({
      testSessionId: sessionId,
      attemptedQuestions: selectedAnswers,
      
    }) 

    if (results.code === 200) {


    localStorage.removeItem('selectedAnswers');
    localStorage.removeItem('timer');
    localStorage.removeItem('currentQuestion');
    sessionStorage.removeItem('showInstructions');
    localStorage.removeItem('testStarted');
    localStorage.removeItem('tabSwitchCount');
    setFinishedLoading(false);
    // toggleFullScreen()

    navigate(`/result-test/${sessionId}`,{
      state: {
        quiz: quiz,
        results: results.data,
      },
    });
  }
  };

 

  useEffect(() => {
    if (testStarted && timer >= 0) {
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

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden && testStarted && !showInstructions) {
  //       const newCount = tabSwitchCount + 1;
  //       setTabSwitchCount(newCount);
  //       localStorage.setItem('tabSwitchCount', newCount.toString());
        
  //       const remainingAttempts = 10 - newCount;
        
  //       if (newCount >= 10) {
  //         setWarningMessage('You have exceeded the maximum number of tab switches. The test will now end.');
  //         setShowTabWarning(true);
  //         setTimeout(() => {
  //           finishTest();
  //         }, 3000);
  //       } else {
  //         setWarningMessage(`Warning: You have switched tabs ${newCount} time${newCount === 1 ? '' : 's'}. The test will end after 10 switches. (${remainingAttempts} attempt${remainingAttempts === 1 ? '' : 's'} remaining)`);
  //         setShowTabWarning(true);
  //       }
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, [tabSwitchCount, testStarted, showInstructions]);


  useEffect(() => {
    const handleVisibilityOrBlur = () => {
      if ((document.hidden || document.activeElement === document.body) && testStarted && !showInstructions) {
        const newCount = tabSwitchCount + 1;
        setTabSwitchCount(newCount);
        localStorage.setItem('tabSwitchCount', newCount.toString());
  
        const remainingAttempts = 10 - newCount;
  
        if (newCount >= 10) {
          setWarningMessage('You have exceeded the maximum number of tab switches or window interactions. The test will now end.');
          setShowTabWarning(true);
          setTimeout(() => {
            finishTest();
          }, 3000);
        } else {
          setWarningMessage(
            `Warning: You have switched tabs or interacted outside the window ${newCount} time${newCount === 1 ? '' : 's'}. 
            The test will end after 10 switches. (${remainingAttempts} attempt${remainingAttempts === 1 ? '' : 's'} remaining)`
          );
          setShowTabWarning(true);
        }
      }
    };
  
    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityOrBlur);
    window.addEventListener('blur', handleVisibilityOrBlur);
  
    return () => {
      // Cleanup event listeners
      document.removeEventListener('visibilitychange', handleVisibilityOrBlur);
      window.removeEventListener('blur', handleVisibilityOrBlur);
    };
  }, [tabSwitchCount, testStarted, showInstructions, finishTest]);
  

  return (
    <div className="p-4 bg-white flex min-h-screen justify-center mt-5">
      {showInstructions ? (
        <div className="flex max-w-3xl w-full items-center justify-center">
          {/* Instructions Section */}
          <Box className="p-6 rounded-lg w-full text-fore">
            <h1 className="w-full font-bold text-2xl opacity-70 text-center mb-6">{quiz.AssignedTests.Tests.testName}</h1>
            <Box className="bg-gray-50 p-4 px-5 py-6 mt-5 mb-6 w-full">
              <h4 className="w-full font-bold text-lg text-center opacity-70 mb-6">Instructions</h4>
              <Typography variant="body1" component="div" className="text-gray-700">
                <ul className="list-disc list-inside space-y-2 text-fore">
                  <li className="text-sm">Number of questions: <strong>{quiz.AssignedTests.Tests.Questions.length}</strong></li>
                  <li className="text-sm">Has a time limit of: <strong>{quiz.AssignedTests.timeLimit}:00 min </strong></li>
                  <li className="text-sm">Number of attempts allowed: <strong>{quiz.AssignedTests.attemptsAllowed===0?"Unlimited":quiz.AssignedTests.attemptsAllowed}</strong> </li>
                  <li className="text-sm">Must be finished in one sitting. You cannot save and finish later.</li>
                  <li className="text-sm">Questions displayed per page: <strong>{quiz.AssignedTests.questionPerPage}</strong></li>
                  <li className="text-sm">Will allow you to go back and change your answers.</li>
                  <li className="text-sm">Will let you finish with some questions unanswered.</li>
                </ul>
              </Typography>
            </Box>
            <Typography variant="body2" className="text-color1 mb-4 flex"><span> Note:</span> <span dangerouslySetInnerHTML={{__html:quiz.AssignedTests.Tests.testIntroduction}}></span></Typography>
            <div className="flex justify-center">
              <button
              disabled={startedLoading}
                className="bg-color2 flex items-center hover:bg-color1 text-white px-4 py-2 rounded-lg"
                onClick={handleStartTest}
              >
                <span className='mr-2'>Continue</span> {startedLoading && (<Circles wrapperClass='mr-2' height="15" width="15" color="#ffffff" ariaLabel="circles-loading" />)}
              </button>
            </div>
          </Box>
        </div>
      ) : (
        <div className="max-w-3xl px-4 w-full mx-auto">
  <div className="flex items-center justify-between bg-white mb-3">
    <div className="flex items-center">
      <h1 className="font-bold text-gray-700 text-3xl">{quiz.AssignedTests.Tests.testName}</h1>
    </div>
    <div className="flex items-center space-x-2">
      <IconButton>
        <User fontSize="large" />
      </IconButton>
      <Typography variant="body1" className="text-gray-700"> {JSON.parse(user).firstName +" "+JSON.parse(user).lastName}</Typography>
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
   
          
<div className="mt-6">
<h3 className="w-full">Question {currentQuestion + 1} of {questions.length}</h3>
  {questions.length > 0 && currentQuestion >= 0 && currentQuestion < questions.length ? (
    renderSessionCard(questions[currentQuestion])
  ) : (
    <Typography variant="body1">Loading question...</Typography>
  )}
</div>


<div className="flex space-x-4 items-center justify-center">
           
        <button className="bg-color2 enabled:hover:bg-color1 text-white disabled:opacity-50 px-4 py-2 rounded-md" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}
        >
         Previous       </button>
         <button className="bg-color2 flex items-center gap-1 enabled:hover:bg-color1 text-white disabled:opacity-50 px-4 py-2 rounded-md" onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}
       >
          <span className='mr-2'>Next</span> {nextQuestionLoading && (<Circles wrapperClass='mr-2' height="15" width="15" color="#ffffff" ariaLabel="circles-loading" />)}
        </button>
       <button  className="bg-white flex items-center text-fore border enabled:hover:bg-fore  enabled:hover:text-white border-fore font-semibold disabled:opacity-40 px-4 py-2 rounded-md" disabled={!checkAllAnsweredOrEnd() || finishedLoading} onClick={finishTest}
        >
                         <span className='mr-2'>Finish</span> {finishedLoading && (<Circles wrapperClass='mr-2' height="15" width="15" color="#16425b" ariaLabel="circles-loading" />)} 
        </button>
           
          </div>
          <QuestionNavigationModal
    selectedAnswers={selectedAnswers}
    questions={questions}
    open={modalOpen}
    onClose={closeModal}
    setClose={setModalOpen}
    currentQuestion={currentQuestion}
  />
</div>

      )}

<AlertDialog    open={showTabWarning} onOpenChange={() => setShowTabWarning(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tab Switch Detected</AlertDialogTitle>
            <AlertDialogDescription>
              {warningMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowTabWarning(false)}>
              Continue Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


<Toaster/>
    </div>
  );
}

export default TestSession;
