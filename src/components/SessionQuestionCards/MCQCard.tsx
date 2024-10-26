import React, { useState } from "react";

// interface QuestionProps {
//   question: {
//     id: string;
//     questionText: string;
//     MultipleChoiceQuestions: {
//       answerSelection: "radio" | "checkbox";
//       isRandomize: boolean;
//       MultipleChoiceOptions: {
//         id: string;
//         optionText: string;
//       }[];
//     };
//   };
//   // saveAnswer: (questionId: string, selectedOptions: string[]) => void;
// }


const MCQTestCard: React.FC<any> = ({ question }) => {
  const { questionText, MultipleChoiceQuestions } = question;
  const { answerSelection, MultipleChoiceOptions } = MultipleChoiceQuestions;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Randomize options if required
  const options =  MultipleChoiceOptions;

  const handleOptionSelect = (optionId: string) => {
    let updatedSelectedOptions;
    if (answerSelection === "checkbox") {
      // Toggle selection for checkbox type questions
      updatedSelectedOptions = selectedOptions.includes(optionId)
        ? selectedOptions.filter((id) => id !== optionId)
        : [...selectedOptions, optionId];
    } else {
      // Single selection for radio type questions
      updatedSelectedOptions = [optionId];
    }
    setSelectedOptions(updatedSelectedOptions);
    // saveAnswer(question.id, updatedSelectedOptions); // Save selected answers to the database
  };

  return (
    <div className="bg-white w-5/6 md:w-full max-w-2xl h-auto shadow-md rounded-md p-6 my-4 border border-gray-300 max-sm:p-4">
      {/* Question Text */}
      <div className="mb-4">
        <div dangerouslySetInnerHTML={{ __html: questionText }} />
        <div className="flex flex-row border-b-2 border-gray-200"></div>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-6">
        {options.map((option:any) => (
          <label
            key={option.id}
            className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-300 rounded-lg max-sm:space-x-2"
          >
            <input
              type={answerSelection}
              name={`mcq-option-${question.id}`}
              value={option.id}
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionSelect(option.id)}
              className={
                answerSelection === "checkbox"
                  ? "form-checkbox h-5 w-5 text-green-500"
                  : "form-radio h-5 w-5 text-green-500"
              }
            />
            <div dangerouslySetInnerHTML={{ __html: option.optionText }} />
          </label>
        ))}
      </div>
    </div>
  );
};

export default MCQTestCard;
