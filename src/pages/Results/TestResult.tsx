import HeaderStudent from "@/components/HeaderStudent";
import ResultQuestionCard from "@/components/Question/ResultQuestionCard";
import { AppSidebar } from "@/components/Student/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { IconButton, Typography } from "@mui/material";
import { User } from "lucide-react";
import { useLocation } from "react-router-dom";

const ResultSummaryCard = () => {
  const user:any = localStorage.getItem('user')

  const location = useLocation();
  const { results ,quiz} = location.state;
  console.log(quiz)

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

    <div className="bg-white w-full flex items-center justify-center">
  <div className="max-w-3xl w-full mx-auto mt-10 rounded-3xl overflow-hidden flex items-center bg-gradient-to-bl h-full shadow-xl from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]">
    {/* Header Section */}
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

    {/* Details Section */}
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

      {/* Percentage */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-800 text-sm font-medium">Percentage</p>
        <p className="text-sm">{results.percentage.toFixed(2)}%</p>
      </div>

      {/* Duration */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-800 text-sm font-medium">Duration</p>
        <p className="text-sm">{formatDuration(results.duration)}</p>
      </div>

      {/* Start Date */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-800 text-sm font-medium">Date Started</p>
        <p className="text-sm">{formatDate(results.dateStarted)}</p>
      </div>

      {/* Finish Date */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-800 text-sm font-medium">Date Finished</p>
        <p className="text-sm">{formatDate(results.dateFinished)}</p>
      </div>

      {/* Continue Button */}
      <div className="w-full flex justify-center mt-6">
        <button className="w-48 h-10 bg-[#1E3A8A] text-white rounded-full">Continue</button>
      </div>
    </div>
  </div>
</div>

    <div className="max-w-4xl mx-auto">
        {
            results.allQuestions.map((question:any,index:any)=>{
                // const answers=JSON.parse(question.userAnswers)
               return (
            <div key={question.question.id}>
                <ResultQuestionCard question={question.question}  userAnswers={question.userAnswer} idx={index}/>
            </div>)})
        }
      </div>
     </main>
     </SidebarProvider>
    </>
  );
};

export default ResultSummaryCard;
