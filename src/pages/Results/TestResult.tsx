import HeaderStudent from "@/components/HeaderStudent";
import ResultQuestionCard from "@/components/Question/ResultQuestionCard";
import { AppSidebar } from "@/components/Student/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const ResultSummaryCard = () => {
  const location = useLocation();
  const { results } = location.state;
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

    <div className="bg-white w-full  flex items-center justify-center">
      <div className="w-[600px] h-auto mx-auto mt-10 bg-white rounded-3xl shadow-lg flex ">
        {/* Header Section */}
        <div className="bg-gradient-to-bl from-[#6D28D9] via-[#6A1FB9] to-[#590F99] text-white rounded-t-3xl p-6 text-center shadow-[inset_0_0_100px_rgba(70,39,202,1)]">
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
        <div className="bg-white p-6 rounded-b-3xl">
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
            <button className="w-48 h-10 bg-[#303B59] text-white rounded-full">
              Continue
            </button>
          </div>
        </div>
      </div>
 
    </div>
    <div className="max-w-6xl mx-auto">
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
