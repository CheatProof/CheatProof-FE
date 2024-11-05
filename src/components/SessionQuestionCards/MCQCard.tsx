import React, { useState, useEffect } from "react";

const MCQTestCard: React.FC<any> = ({ question, saveAnswer, answers }) => {
  const { questionText, MultipleChoiceQuestions } = question;
  const { answerSelection, MultipleChoiceOptions } = MultipleChoiceQuestions;
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  useEffect(() => {
    const savedAnswer = answers.find((a: any) => a.questionId === question.id);
    if (savedAnswer) {
      setSelectedOptions(savedAnswer.answer);
    } else {
      setSelectedOptions([]);
    }
  }, [answers, question]);

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
    saveAnswer(question.id, updatedSelectedOptions); // Save selected answers to the database
  };

  return (
    <div className="bg-white w-5/6 md:w-full max-w-2xl mx-auto h-auto shadow-md rounded-md p-6 my-4 border border-gray-300 max-sm:p-4">
      {/* Question Text */}
      <div className="mb-4">
        <div dangerouslySetInnerHTML={{ __html: questionText }} />
        <div className="flex flex-row border-b-2 border-gray-200"></div>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-6">
        {MultipleChoiceOptions.map((option: any) => (
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
