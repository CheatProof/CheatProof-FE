// import React from 'react';
// import { TiTick } from "react-icons/ti";

// const GrammarCard: React.FC = () => {
//   const question = "this wrong? is";
//   const correctAnswer = "is this wrong?";

//   return (
//     <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-8 border border-gray-300">
//       {/* Question */}
//       <div className="mb-4">
//         <h3 className="text-lg sm:text-xl font-semibold mb-6">{question}</h3>
//         <div className="flex flex-row border-b-2 border-gray-200"></div>
//         <h3 className="text-md sm:text-lg font-medium my-6">Correct Grammar: </h3>
//       </div>

//       {/* Correct Answer */}
//       <div className="space-y-4 mb-6">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 border border-green-500 rounded-lg">
//           <span className="text-green-500">
//             <TiTick size={24} />
//           </span>
//           <span className="text-gray-700 text-sm sm:text-base">{correctAnswer}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GrammarCard;



import React from 'react';
import { TiTick } from "react-icons/ti";

interface GrammarCardProps {
  question: string;
  correctAnswer: string;
}

const GrammarCard: React.FC<GrammarCardProps> = ({ question, correctAnswer }) => {
  return (
    <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-8 border border-gray-300">
      {/* Question */}
      <div className="mb-4">
        {/* <h3 className="">{question}</h3> */}
        <div className='text-lg sm:text-xl mb-6' dangerouslySetInnerHTML={{ __html: question }} />
        <div className="flex flex-row border-b-2 border-gray-200"></div>
        <h3 className="text-md sm:text-lg font-medium my-6">Correct Grammar: </h3>
      </div>

      {/* Correct Answer */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 border border-green-500 rounded-lg">
          <span className="text-green-500">
            <TiTick size={24} />
          </span>
          {/* <span className="text-gray-700 text-sm sm:text-base">{correctAnswer}</span> */}
          <div dangerouslySetInnerHTML={{ __html: correctAnswer }} />
        </div>
      </div>
    </div>
  );
};

export default GrammarCard;

