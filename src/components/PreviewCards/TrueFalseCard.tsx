// import React, { useState } from "react";

// interface TrueFalsePreviewCardProps {
//   question: string;
//   options: { text: string; isCorrect: boolean }[];
// }

// const TrueFalseCard: React.FC<TrueFalsePreviewCardProps> = ({question, options}) => {
//   const [selectedOption, setSelectedOption] = useState<string[]>([]);
//   // const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   // const question = "HTML stands for Hyper Text Markup Language";
//   // const options = ["True", "False"];
//   // const correctAnswer = "True";
//   const [randomizeAnswer] = useState("No");

//   const handleOptionSelect = (option: string) => {
//     setSelectedOption([option]);
//   };

//   return (
//     <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-8 border border-gray-300 max-sm:p-4">
//       {/* Question */}
//       <div className="mb-4">
//        <div dangerouslySetInnerHTML={{ __html: question }} />
//         {/* <h3 className="text-xl sm:text-2xl font-semibold mb-6">{question}</h3> */}
//         <div className="flex flex-row border-b-2 border-gray-200"></div>
//         <h3 className="text-lg sm:text-xl font-medium my-6">
//           Randomize Answer: <span>{randomizeAnswer}</span>
//         </h3>
//       </div>

//       {/* Options */}
//       <div className="space-y-4 mb-6">
//         {options.map((option, index) => (
//           <label
//             key={index}
//             className={`flex items-center space-x-3 cursor-pointer p-3 border ${
//               option.isCorrect
//                 ? "border-green-500 border-2"
//                 : "border-gray-300"
//             } rounded-lg max-sm:space-x-2`}
//           >
//             <input
//               type="radio"
//               name="truefalse-option"
//               value={option.text}
//               checked={selectedOption.includes(option.text)}
//               onChange={() => handleOptionSelect(option.text)}
//               className="form-radio h-5 w-5 text-green-500"
//             />
//             {/* <span className="text-gray-700 text-base sm:text-lg">{option}</span> */}
//             <div dangerouslySetInnerHTML={{ __html: option.text }} />
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrueFalseCard;



import React, { useState } from "react";

interface TrueFalsePreviewCardProps {
  question: string;
  options: { text: string; isCorrect: boolean }[];
}

const TrueFalseCard: React.FC<TrueFalsePreviewCardProps> = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [randomizeAnswer] = useState("No");

  
  const handleOptionSelect = (option: string) => {
    setSelectedOption([option]);  
  };

  return (
    <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-8 border border-gray-300 max-sm:p-4">
      {/* Question */}
      <div className="mb-4">
        <div dangerouslySetInnerHTML={{ __html: question }} />
        <div className="flex flex-row border-b-2 border-gray-200"></div>
        <h3 className="text-lg sm:text-xl font-medium my-6">
          Randomize Answer: <span>{randomizeAnswer}</span>
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-6">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center space-x-3 cursor-pointer p-3 border ${
              option.isCorrect ? "border-green-500 border-2" : "border-gray-300"
            } rounded-lg max-sm:space-x-2`}
          >
            <input
              type="radio"
              name="truefalse-option"
              value={option.text}
              checked={selectedOption.includes(option.text)}
              onChange={() => handleOptionSelect(option.text)}
              className="form-radio h-5 w-5 text-green-500"
            />
            <div dangerouslySetInnerHTML={{ __html: option.text }} />
          </label>
        ))}
      </div>
    </div>
  );
};

export default TrueFalseCard;



