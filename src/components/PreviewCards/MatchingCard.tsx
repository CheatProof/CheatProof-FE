import React, { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface MatchingCardProps {
  question: string;
  correctPairs: { clue: string; match: string }[];
  incorrectPairs: { text: string }[];
}

const MatchingCard: React.FC<MatchingCardProps> = ({ question, correctPairs, incorrectPairs }) => {
  // Combine correct and incorrect matches for selection
  const options = [...correctPairs.map((pair) => pair.match), ...incorrectPairs.map((pair) => pair.text)];
  
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(correctPairs.length).fill("Choose"));

  // Handle selection of answers
  const handleSelect = (index: number, answer: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  return (
    <div className="bg-white w-5/6 md:w-full max-w-4xl h-auto shadow-md rounded-md py-10 px-16 my-8 border border-gray-300 max-sm:p-4">
      {/* Question */}
      <div className="mb-4">
        {/* <h3 className="text-xl sm:text-2xl font-semibold mb-6">{question}</h3> */}
        <div className="text-xl sm:text-2xl font-semibold mb-6" dangerouslySetInnerHTML={{ __html: question }} />
        <div className="flex flex-row border-b-2 border-gray-200"></div>
      </div>

      {/* Matching correctPairs to dropdown options */}
      <div className="space-y-4 mb-6">
        {correctPairs.map((pair, index) => (
          <div key={index} className="flex justify-between items-center space-x-3 p-3 border-b border-gray-300">
            {/* Display clue (Editor in read-only mode) */}
            <div className="w-6/12 border">
            <div className="text-xl sm:text-2xl font-semibold mb-6" dangerouslySetInnerHTML={{ __html: pair.clue }} />
            </div>

            {/* Matching selection */}
            <select
              className="border rounded-md py-2 px-10 w-5/12"
              value={selectedAnswers[index]}
              onChange={(e) => handleSelect(index, e.target.value)}
            >
              <option value="Choose">Choose</option>
              {options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Points display or other meta info */}
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-8">
        <p className="font-bold">Category:</p>
        <p>Points: 1</p>
      </div>
    </div>
  );
};

export default MatchingCard;
