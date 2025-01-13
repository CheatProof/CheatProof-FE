// import HeaderStudent from "@/components/HeaderStudent";
// import { useAppDispatch, useAppSelector } from "@/hooks";
// import { Link, useNavigate } from "react-router-dom";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import Profile from "../assets/user.png";
// import { AppSidebar } from "@/components/Student/Sidebar";
// import { Footer } from "@/components";


// const ResultCard = ()=>{
//     const navigate = useNavigate();
//     return(
//         <a className="relative bg-white block p-6 border border-gray-100 rounded-lg max-w-2xl mx-auto mt-24" href="#">
//     <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-color3 via-color2 to-color1"></span>

    
//     <h2 className="text-fore text-2xl font-bold pb-2">CCN Spring 2024 </h2>
//     <div className="flex flex-row gap-x-20">
//     <div className="my-4">
        
//         <p className="text-color1 py-1 text-sm">Attempts Allowed: 2</p>
//         <p className="text-color1 py-1 text-sm">Attempts Remaining: 0</p>
//         <a className="text-fore font-semibold text-sm py-4 hover:underline">Previous Scores</a>
//     </div>
//     <div className="my-4">
//     <p className="text-color1 py-1 text-sm">Marks Obtained: 55/60</p>
//     <p className="text-color1 py-1 text-sm">Percentage: {((55/60)*100).toFixed(2)}</p>
//     </div>
//     </div>
//     <div className="flex justify-end">
//         <button onClick={()=> navigate('/student-dashboard/result-details')} className="px-4 py-2 bg-fore border border-white text-white font-semibold rounded-md hover:scale-105">Details</button>
//     </div>
// </a> 
// )}

// export default ResultCard;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResultCard = () => {
  const navigate = useNavigate();
  const [showPreviousScores, setShowPreviousScores] = useState(false);

  const togglePreviousScores = () => {
    setShowPreviousScores(!showPreviousScores);
  };

  return (
    <div
      className="relative bg-white block p-6 border border-gray-100 rounded-lg min-w-4xl mx-auto mt-12"

    >
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-color3 via-color2 to-color1"></span>

      <h2 className="text-fore text-2xl font-bold pb-2">CCN Spring 2024</h2>
      <div className="flex flex-row gap-x-20">
        <div className="my-4">
          <p className="text-color1 py-1 text-sm">Attempts Allowed: 2</p>
          <p className="text-color1 py-1 text-sm">Attempts Remaining: 0</p>
          <button
            className="text-fore font-semibold text-sm py-4 hover:underline"
            onClick={togglePreviousScores}
          >
            {showPreviousScores ? "Hide Previous Scores ▲" : "Show Previous Scores ▼"}
          </button>
        </div>
        <div className="my-4">
          <p className="text-color1 py-1 text-sm">Marks Obtained: 55/60</p>
          <p className="text-color1 py-1 text-sm">
            Percentage: {((55 / 60) * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Previous Scores Section */}
      {showPreviousScores && (
        <div className="mt-4">
          <table className="w-full text-left border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">%</th>
                <th className="border border-gray-200 px-4 py-2">Score</th>
                <th className="border border-gray-200 px-4 py-2">Duration</th>
                <th className="border border-gray-200 px-4 py-2">Date Started</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">100%</td>
                <td className="border border-gray-200 px-4 py-2">25/25</td>
                <td className="border border-gray-200 px-4 py-2">00:17:38</td>
                <td className="border border-gray-200 px-4 py-2">Thu 25 Apr '24 15:30</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={() => navigate("/student-dashboard/result-details")}
          className="px-4 py-2 bg-fore border border-white text-white font-semibold rounded-md hover:scale-105"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default ResultCard;




