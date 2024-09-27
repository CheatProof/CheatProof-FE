// import React, { useState } from "react";

// const MCQPreviewCard: React.FC = () => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const question = "What is unit of Energy?";
//   const options = ["Joules", "metres", "watt"];
//   const correctAnswer = "Joules";
//   const [randomizeAnswer] = useState("No");

//   const handleOptionSelect = (option: string) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div className="bg-white  w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-4 border border-gray-300 max-sm:p-4">
//       {/* Question */}
//       <div className="mb-4">
//         <h3 className="text-xl sm:text-2xl font-semibold mb-6">{question}</h3>
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
//               option === correctAnswer
//                 ? "border-green-500 border-2"
//                 : "border-gray-300"
//             } rounded-lg max-sm:space-x-2`}
//           >
          
//             <input
//               type="radio"
//               name="mcq-option"
//               value={option}
//               checked={selectedOption === option}
//               onChange={() => handleOptionSelect(option)}
//               className="form-radio h-5 w-5 text-green-500"
//             />
//             <span className="text-gray-700 text-base sm:text-lg">{option}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MCQPreviewCard;



import React, { useState } from "react";

const MCQPreviewCard: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);  // Multiple selection for checkboxes
  const question = "What is the unit of Energy?";
  const options = ["Joules", "Metres", "Watt"];
  const correctAnswers = ["Joules", "Watt"];  
  const [randomizeAnswer] = useState("No");

  // Determines if multiple correct answers exist
  const isMultipleCorrect = correctAnswers.length > 1;

  const handleOptionSelect = (option: string) => {
    if (isMultipleCorrect) {
      // Toggle option selection for checkboxes
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      
      setSelectedOptions([option]);
    }
  };

  return (
    <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-4 border border-gray-300 max-sm:p-4">
      {/* Question */}
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6">{question}</h3>
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
              correctAnswers.includes(option)
                ? "border-green-500 border-2"
                : "border-gray-300"
            } rounded-lg max-sm:space-x-2`}
          >
            <input
              type={isMultipleCorrect ? "checkbox" : "radio"}  
              name="mcq-option"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionSelect(option)}
              className="form-checkbox h-5 w-5 text-green-500"
            />
            <span className="text-gray-700 text-base sm:text-lg">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MCQPreviewCard;
