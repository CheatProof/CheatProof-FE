
import HeaderStudent from "@/components/HeaderStudent";


import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/Student/Sidebar";
import { Footer } from "@/components";
import { useLocation } from "react-router-dom";
// import ResultQuestionCard from "@/components/Question/ResultQuestionCard";
// import TestSession from "../Test/PreviewTest";


const ResultDetails = () => { 
  const user:any = localStorage.getItem('user')

  const location = useLocation()
  const {result}=location?.state

  console.log(result)

  return (
    <SidebarProvider>
         <AppSidebar />
    <main className="w-full">
    <HeaderStudent />

    <div className="w-full px-3 py-4  mt-20 flex text-center justify-center md:justify-start md:ml-40">
        <span className="text-2xl font-semibold ">Results {'>'} {result?.test?.Tests?.testName} </span>
        </div>
     
     <div className="flex justify-center items-center mt-20 mb-36">
    <div className="bg-white shadow-lg rounded-lg p-6 w-9/12 h-4/5 mx-auto">
      {/* Header Section */}
      <div className="border-b pb-4 mb-4">
        <h1 className="text-xl font-semibold text-fore">
        {JSON.parse(user).firstName + " " + JSON.parse(user).lastName}
        </h1>
        <p className="text-color2 text-sm">{result?.test?.Tests?.testName}</p>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-2 gap-6 items-center">
        {/* Score Details */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-color1">
            <strong>Points:</strong> {result.TestResults.points} / {result.TestResults.totalPoints}
          </p>
          <p className="text-sm font-medium text-color1">
            <strong>Duration:</strong> {new Date(result?.TestResults?.duration).toISOString().substr(11, 8)}
          </p>
          <p className="text-sm font-medium text-color1">
            <strong>Time started:</strong> {new Date(result?.TestResults?.dateStarted).toLocaleString()}
          </p>
          <p className="text-sm font-medium text-color1">
            <strong>Time finished:</strong> {new Date(result?.TestResults?.dateFinished).toLocaleString()}
          </p>
          {/* <button className="text-fore text-sm font-medium hover:underline">
            Show previous scores
          </button> */}
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
                strokeDasharray={`${((result.TestResults.points/result.TestResults.totalPoints)*100).toFixed(2)}, 100`}
                fill="none"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold tcolor1">{((result.TestResults.points/result.TestResults.totalPoints)*100).toFixed(2)}%</span>
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
    
    {/* <div className="max-w-4xl mx-auto">
        {
            result.attemptedQuestions.map((question:any,index:any)=>{
                // const answers=JSON.parse(question.userAnswers)
               return (
            <div key={question.question.id}>
                <ResultQuestionCard question={question.question}  userAnswers={question.userAnswer} idx={index} correctQuestions={result.correctQuestions}/>
            </div>)})
        }
      </div> */}
    <Footer />
    </main>
    </SidebarProvider>
  );
};

export default ResultDetails;



