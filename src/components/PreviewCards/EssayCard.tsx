// import React from "react";

// const EssayCard: React.FC = () => {
//   const question = "Write down steps for Finite state Automata";
 

//   return (
//     <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-8 border border-gray-300 max-sm:p-4">
      
//       <div className="mb-4">
//         <h3 className="text-xl sm:text-2xl font-semibold my-6">{question}</h3>
//         <div className="flex flex-row border-b-2 border-gray-200 mb-10"></div>
//       </div>

     
//     </div>
//   );
// };

// export default EssayCard;


import React from "react";

interface EssayCardProps {
  question: string;
}

const EssayCard: React.FC<EssayCardProps> = ({question}) => {
  return (
    <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-8 border border-gray-300 max-sm:p-4">
      {/* Question */}
      <div className="mb-4">
      <div className="text-xl sm:text-2xl my-6" dangerouslySetInnerHTML={{ __html: question }} />
        <div className="flex flex-row border-b-2 border-gray-200 mb-10"></div>
      </div>
    </div>
  );
};

export default EssayCard;

