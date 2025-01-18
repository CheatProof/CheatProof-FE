import HeaderStudent from "@/components/HeaderStudent";
import ResultQuestionCard from "@/components/Question/ResultQuestionCard";
import { AppSidebar } from "@/components/Student/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const ResultSummaryCard = () => {
  const user:any = localStorage.getItem('user')

  const location = useLocation();
  const { results ,quiz} = location.state;
  console.log(results)

  // Format duration to minutes and seconds
  const formatDuration = (ms:any) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes} min ${seconds} sec`;
  };

  // Format date to readable format
  const formatDate = (date:any) => {
    return new Date(date).toLocaleString();
  };

  return (
   <>
   <SidebarProvider>
         <AppSidebar/>
    <main className="w-full">
    <HeaderStudent />

    {/* <div className="bg-white w-full flex items-center justify-center">
  <div className="max-w-3xl w-full mx-auto mt-10 rounded-3xl overflow-hidden flex items-center bg-gradient-to-bl h-full shadow-xl from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]">
   
    <div className="w-2/6 text-white p-6 text-center">
      <h3 className="text-lg">Your Result</h3>
      <div className="mt-4">
        <h1 className="text-6xl font-bold">{results.obtainedPoints}</h1>
        <p className="text-sm mt-2">
          of <span className="text-gray-300">{results.totalPoints}</span> points
        </p>
      </div>
      <h2 className="text-2xl font-semibold mt-4">{results.status}</h2>
    </div>

    
    <div className="bg-white p-6 w-4/6">
      <div className="flex items-center justify-between bg-white mb-3">
        <div className="flex items-center">
          <h1 className="font-bold text-gray-700 text-2xl">{quiz.AssignedTests.Tests.testName}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <IconButton>
            <User fontSize="large" />
          </IconButton>
          <Typography variant="body1" className="text-gray-700">
            {JSON.parse(user).firstName + " " + JSON.parse(user).lastName}
          </Typography>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 opacity-90 mb-6">Summary</h3>

      
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-800 text-sm font-medium">Percentage</p>
        <p className="text-sm">{results.percentage.toFixed(2)}%</p>
      </div>

    
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-800 text-sm font-medium">Duration</p>
        <p className="text-sm">{formatDuration(results.duration)}</p>
      </div>

    
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-800 text-sm font-medium">Date Started</p>
        <p className="text-sm">{formatDate(results.dateStarted)}</p>
      </div>

     
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-800 text-sm font-medium">Date Finished</p>
        <p className="text-sm">{formatDate(results.dateFinished)}</p>
      </div>

  
      <div className="w-full flex justify-center mt-6">
        <button className="w-48 h-10 bg-[#1E3A8A] text-white rounded-full">Continue</button>
      </div>
    </div>
  </div>
</div> */}

<div className="flex justify-center items-center mt-20 mb-36">
    <div className="bg-white shadow-lg rounded-lg p-6 w-9/12 h-4/5 mx-auto">
      {/* Header Section */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-xl font-semibold text-fore">
        {JSON.parse(user).firstName + " " + JSON.parse(user).lastName}
        </h1>
        <p className="text-color2 text-sm">{quiz.AssignedTests.Tests.testName}</p>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-2 gap-6 items-center">
        {/* Score Details */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-color1">
            <strong>Points:</strong> {results.obtainedPoints} / {results.totalPoints}
          </p>
          <p className="text-sm font-medium text-color1">
            <strong>Duration:</strong> {formatDuration(results.duration)}
          </p>
          <p className="text-sm font-medium text-color1">
            <strong>Date started:</strong> {formatDate(results.dateStarted)}
          </p>
          <p className="text-sm font-medium text-color1">
            <strong>Date finished:</strong> {formatDate(results.dateFinished)}
          </p>

          <p className="text-sm font-medium text-color1">
            <strong>Status:</strong> {formatDate(results.status)}
          </p>
          <button className="text-fore text-sm font-medium hover:underline">
            Show previous scores
          </button>
        </div>

        {/* Percentage Circle */}
        <div className="flex justify-center items-center">
          <div className="relative w-32 h-32">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                className="text-gray-300 stroke-current"
                strokeWidth="4"
                fill="none"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-fore stroke-current"
                strokeWidth="4"
                strokeDasharray={`${results.percentage.toFixed(2)}, 100`}
                fill="none"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold tcolor1">{results.percentage.toFixed(2)}%</span>
            </div>
          </div>
        </div>

{/* <div>
          <div className="relative h-6 rounded-full bg-gray-200 overflow-hidden shadow-inner">
            <div
              className="absolute h-full rounded-full bg-green-500"
              style={{ width: `${percentage}%` }}
            />
            <span className="absolute inset-0 flex justify-center items-center text-sm font-bold text-gray-700">
              {percentage}%
            </span>
          </div>
        </div>
      </div>*/}
      </div> 

      {/* Footer Section */}
      <div className="mt-10 bg-blue-100 p-4 rounded-md">
        <p className="text-fore font-medium">
            Test is Finished.
        </p>
        <p className="text-fore text-sm">
          Your answers have been saved for review.
        </p>
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto">
        {
            results.allQuestions.map((question:any,index:any)=>{
                // const answers=JSON.parse(question.userAnswers)
               return (
            <div key={question.question.id}>
                <ResultQuestionCard question={question.question}  userAnswers={question.userAnswer} idx={index} correctQuestions={results.correctQuestions}/>
            </div>)})
        }
      </div>
     </main>
     </SidebarProvider>
    </>
  );
};

export default ResultSummaryCard;
