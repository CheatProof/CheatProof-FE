// import { useState } from "react";
// import React from "react";
// import { TiTick } from "react-icons/ti";

// const FreeTextCard: React.FC = () => {
//   const question = "Name any operating system";
//   const correctAnswers = ["Windows", "Linux", "iOS"];
//   const [randomizeAnswer] = useState("No");

//   return (
//     <div className="bg-white w-5/6 md:w-full max-w-3xl h-auto shadow-md rounded-md p-6 my-8 border border-gray-300 max-sm:p-4">
//       {/* Question */}
//       <div className="mb-4">
//         <h3 className="text-xl sm:text-2xl font-semibold mb-6">{question}</h3>
//         <div className="flex flex-row border-b-2 border-gray-200"></div>
//         <h3 className="text-lg sm:text-xl font-medium my-6">
//           Randomize Answer: <span>{randomizeAnswer}</span>
//         </h3>
//       </div>

//       {/* Acceptable Answers */}
//       <div className="space-y-4 mb-6">
//         {correctAnswers.map((option, index) => (
//           <div
//             key={index}
//             className="flex items-center space-x-3 p-3 border border-green-500 rounded-lg max-sm:space-x-2"
//           >
//             <span className="text-green-500 text-lg sm:text-xl">
//               <TiTick />
//             </span>
//             <span className="text-gray-700 text-base sm:text-lg">{option}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FreeTextCard;


import { Input } from "@mui/material";
import { useState } from "react";
import React from "react";
import { TiTick } from "react-icons/ti";

interface FreeTextCardProps {
  question: string;
  options: { text: string; isCorrect: boolean }[];
}

const FreeTextCard: React.FC<FreeTextCardProps> = ({ question, options }) => {
  const [randomizeAnswer] = useState("No");

  return (
    <div className="bg-white w-5/6 md:w-full max-w-3xl h-auto shadow-md rounded-md p-6 my-8 border border-gray-300 max-sm:p-4">
      {/* Question */}
      <div className="mb-4">
        <div dangerouslySetInnerHTML={{ __html: question }} />
        <div className="flex flex-row border-b-2 border-gray-200"></div>
        <h3 className="text-lg sm:text-xl font-medium my-6">
          Randomize Answer: <span>{randomizeAnswer}</span>
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        {options.map((option, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 border border-green-500 rounded-lg max-sm:space-x-2"
          >
            <span className="text-green-500 text-lg sm:text-xl">
              <TiTick />
            </span>
            
            <div dangerouslySetInnerHTML={{ __html: option.text }} />
          </div>
        ))}
      </div>

      {/* Add your input field here */}
      <h3 className="text-lg sm:text-xl font-medium mb-6">
        Add your answer:
      </h3>
      <Input />
    </div>
  );
};

export default FreeTextCard;
