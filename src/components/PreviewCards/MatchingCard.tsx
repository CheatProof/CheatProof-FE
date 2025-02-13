import React, { useState } from "react";

interface MatchingCardProps {
  question: string;
  correctPairs: { clue: string; match: string }[];
  incorrectPairs: { text: string }[];
}

const MatchingCard: React.FC<MatchingCardProps> = ({ question, correctPairs, incorrectPairs }) => {
  const options = [...correctPairs.map((pair) => pair.match), ...incorrectPairs.map((pair) => pair.text)];

  // Store selected answers as an array of objects
  const [selectedAnswers, setSelectedAnswers] = useState<{ clueText: string; matchText: string }[]>([]);

  // Handle selection of answers
  const handleSelect = (clueText: string, matchText: string) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = prev.filter((item) => item.clueText !== clueText);
      return [...updatedAnswers, { clueText, matchText }];
    });

    console.log("Updated Selection:", selectedAnswers);
  };

  return (
    <div className="bg-white w-5/6 md:w-full max-w-4xl h-auto shadow-md rounded-md py-10 px-16 my-8 border border-gray-300 max-sm:p-4">
      <div className="mb-4">
        <div className="text-xl sm:text-2xl font-semibold mb-6" dangerouslySetInnerHTML={{ __html: question }} />
        <div className="flex flex-row border-b-2 border-gray-200"></div>
      </div>

      <div className="space-y-4 mb-6">
        {correctPairs.map((pair) => (
          <div key={pair.clue} className="flex justify-between items-center space-x-3 p-3 border-b border-gray-300">
            <div className="w-6/12">
              <div className="text-xl sm:text-2xl font-semibold" dangerouslySetInnerHTML={{ __html: pair.clue }} />
            </div>

            <select
              className="border rounded-md py-2 px-10 w-5/12"
              value={selectedAnswers.find((item) => item.clueText === pair.clue)?.matchText || "Choose"}
              onChange={(e) => handleSelect(pair.clue, e.target.value)}
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

      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-8">
        <p className="font-bold">Category:</p>
        <p>Points: 1</p>
      </div>
    </div>
  );
};

export default MatchingCard;
