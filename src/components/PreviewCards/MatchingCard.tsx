import React, { useState } from 'react';

const MatchingCard: React.FC = () => {
  // Question data
  const question = "Match the Elements to their Chemical symbols";
  const elements = ["Potassium", "Copper", "Oxygen"];
  const options = ["K", "Cu", "O"];
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(elements.length).fill("Choose"));
  const totalPoints = 1; 

  
  const handleSelect = (index: number, answer: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  return (
    <div className="bg-white w-5/6 md:w-full max-w-4xl h-auto shadow-md rounded-md py-10 px-16 my-8 border border-gray-300 max-sm:p-4">
      {/* Question */}
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6">{question}</h3>
        <div className="flex flex-row border-b-2 border-gray-200"></div>
      </div>

      {/* Matching elements to dropdown */}
      <div className="space-y-4 mb-6">
        {elements.map((element, index) => (
          <div key={index} className="flex justify-between items-center space-x-3 p-3 border-b border-gray-300">
            <span className="text-lg sm:text-xl">{element}</span>
            <select
              className="border rounded-md py-2 px-10"
              value={selectedAnswers[index]}
              onChange={(e) => handleSelect(index, e.target.value)}
            >
              <option value="Choose">Choose</option>
              {options.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-8">
        <p className="font-bold">Category:</p>
        <p>Points: {totalPoints}</p>
      </div>
    </div>
  );
};

export default MatchingCard;
