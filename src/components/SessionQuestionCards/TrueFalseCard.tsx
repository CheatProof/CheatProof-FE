import React, { useState } from "react";

// interface TrueFalseCardProps {
//   question: {
//     id: string;
//     questionText: string;
//     TrueFalseQuestions: { 
//       id: string; 
//       optionText: string; 
//       isAnswer: boolean 
//     }[];
//   };
//   // saveAnswer: (questionId: string, selectedOption: string) => void
// }

const TrueFalseCard: React.FC<any> = ({ question }) => {
  const { questionText, TrueFalseQuestions } = question;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    // saveAnswer(question.id, optionId); // Save selected answer
  };

  return (
    <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-8 border border-gray-300 max-sm:p-4">
      {/* Question */}
      <div className="mb-4">
        <div dangerouslySetInnerHTML={{ __html: questionText }} />
        <div className="flex flex-row border-b-2 border-gray-200"></div>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-6">
        {TrueFalseQuestions.map((option:any) => (
          <label
            key={option.id}
            className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-300 rounded-lg max-sm:space-x-2"
          >
            <input
              type="radio"
              name={`truefalse-option-${question.id}`}
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionSelect(option.id)}
              className="form-radio h-5 w-5 text-green-500"
            />
            <div dangerouslySetInnerHTML={{ __html: option.optionText }} />
          </label>
        ))}
      </div>
    </div>
  );
};

export default TrueFalseCard;
