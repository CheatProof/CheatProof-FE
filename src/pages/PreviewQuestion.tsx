
// import {
//     Sidebar
//   } from "../components";
// import MCQCard from "../components/PreviewCards/MCQCard";
// import TrueFalseCard from "../components/PreviewCards/TrueFalseCard";
// import FreeTextCard from "../components/PreviewCards/FreeTextCard";
// import GrammarCard from "../components/PreviewCards/GrammarCard";
// import EssayCard from "../components/PreviewCards/EssayCard";
// import MatchingCard from "../components/PreviewCards/MatchingCard";
// import Test from "../components/Test/Test";
  
//   const PreviewQuestion = () => {
//     return (
//       <>
//         <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
          
//           <Sidebar />
  
//           <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex flex-col sm:flex-row max-sm:flex-wrap gap-x-10 max-[1700px]:flex-wrap max-[400px]:pl-2">
            
//             <div className="w-full pl-3">
//             <h2 className=" text-gray-700 mb-6 font-bold text-xl">
//             Tests {">"} Question Bank {">"} Add New Questions
//           </h2>
              
//               {/* <h2 className="text-2xl sm:text-3xl text-black font-bold mb-6 py-6">
//                 Question Preview
//               </h2> */}
  
//      <MCQCard />
//       <TrueFalseCard />
//        <FreeTextCard />
//               <GrammarCard />
//               <EssayCard />
//               <MatchingCard />
  
//               <div className="mx-4 mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
//                 <button className="border-black bg-red-600 px-5 py-2 rounded-md text-white">
//                   Edit
//                 </button>
//                 <button className="border-black bg-blue-600 px-5 py-2 rounded-md text-white">
//                   Save
//                 </button>
//                 <button className="border-black bg-blue-600 px-5 py-2 rounded-md text-white">
//                   Save and add more
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };
  
//   export default PreviewQuestion;
  


import { Sidebar } from "../components";
import MCQCard from "../components/PreviewCards/MCQCard";
import TrueFalseCard from "../components/PreviewCards/TrueFalseCard";
import FreeTextCard from "../components/PreviewCards/FreeTextCard";
import GrammarCard from "../components/PreviewCards/GrammarCard";
import EssayCard from "../components/PreviewCards/EssayCard";
import MatchingCard from "../components/PreviewCards/MatchingCard";
import { useLocation } from "react-router-dom";


const PreviewQuestion = () => {
  const location = useLocation();
  const { selectedQuestionType } = location.state || {}; 

  // Render different cards based on the selected question type
  const renderPreviewCard = () => {
    switch (selectedQuestionType) {
      case "multipleChoice":
        return <MCQCard />;
      case "trueFalse":
        return <TrueFalseCard />;
      case "freeText":
        return <FreeTextCard />;
      case "grammar":
        return <GrammarCard />;
      case "essay":
        return <EssayCard />;
      case "matching":
        return <MatchingCard />;
      default:
        return <div>No question type selected</div>;
    }
  };
  return (
    <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex flex-col sm:flex-row max-sm:flex-wrap gap-x-10 max-[1700px]:flex-wrap max-[400px]:pl-2">
        <div className="w-full pl-3">
          <h2 className=" text-gray-700 mb-10 mt-5 font-bold text-xl">
            Tests {">"} Question Bank {">"} Add New Questions
          </h2>

         
          {renderPreviewCard()}

          <div className="mx-4 mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="border-black bg-rose-800 px-6 py-2 rounded-md text-white">Edit</button>
            <button className="border-black bg-sky-600 px-5 py-2 rounded-md text-white">Save</button>
            <button className="border-black bg-sky-600 px-5 py-2 rounded-md text-white">
              Save and add more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewQuestion;
