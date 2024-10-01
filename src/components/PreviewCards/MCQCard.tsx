

// import React, { useState } from "react";

// const MCQPreviewCard: React.FC = ({question,options,answerSelection}:any, ) => {
//   const [setSelectedOption, setSelectedOption] = useState<string | null>(null);
//   // const question = "What is unit of Energy?";
//   // const options = ["Joules", "metres", "watt"];
//   const correctAnswer = "Joules";
//   const [randomizeAnswer] = useState("No");

//   console.log(question)

//   const handleOptionSelect = (option: string) => {
//     if (isMultipleCorrect) {
//       // Toggle option selection for checkboxes
//       if (selectedOptions.includes(option)) {
//         setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
//       } else {
//         setSelectedOptions([...selectedOptions, option]);
//       }
//     } else {
      
//       setSelectedOptions([option]);
//     }
//   };

//   return (
//     <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-4 border border-gray-300 max-sm:p-4">
//       {/* Question */}
//       <div className="mb-4">
//       <div dangerouslySetInnerHTML={{ __html: question }} />
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
//               type={answerSelection}
//               name="mcq-option"
//               value={option}
//               checked={selectedOptions.includes(option)}
//               onChange={() => handleOptionSelect(option)}
//               className="form-checkbox h-5 w-5 text-green-500"
//             />
//            <div dangerouslySetInnerHTML={{__html:option.text}}/>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MCQPreviewCard;





import React, { useState } from "react";

interface MCQPreviewCardProps {
  question: string;
  options: { text: string; isCorrect: boolean }[];
  answerSelection: "radio" | "checkbox";
}

const MCQPreviewCard: React.FC<MCQPreviewCardProps> = ({ question, options, answerSelection }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [randomizeAnswer] = useState("No");

  // Handle selection of options
  const handleOptionSelect = (option: string) => {
    if (answerSelection === "checkbox") {
      // Toggle option selection for checkboxes (multiple answers)
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      // For radio buttons (single answer), only one option can be selected
      setSelectedOptions([option]);
    }
  };

  return (
    <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-4 border border-gray-300 max-sm:p-4">
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
              type={answerSelection}
              name="mcq-option"
              value={option.text}
              checked={selectedOptions.includes(option.text)}
              onChange={() => handleOptionSelect(option.text)}
              className={answerSelection === "checkbox" ? "form-checkbox h-5 w-5 text-green-500" : "form-radio h-5 w-5 text-green-500"}
            />
            <div dangerouslySetInnerHTML={{ __html: option.text }} />
          </label>
        ))}
      </div>
    </div>
  );
};

export default MCQPreviewCard;
