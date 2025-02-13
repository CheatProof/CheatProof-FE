import React, { useEffect, useState } from "react";

// interface MatchingCardProps {
//   question: any;
//   selectedAnswers:any
//   answers:any
//   saveAnswers: (questionId: any, selectedAnswers: any) => void;
// }

const MatchingCard: React.FC<any> = ({ question,saveAnswers , answers}) => {
  const {clueArray , matchArray} = question.MatchingQuestions;
  

    useEffect(() => {
      const answer = answers.find((a: any) => a.questionId === question.id);
      if (answer) {
        setSelectedAnswers(answer.userAnswer);
      } else {
        setSelectedAnswers([]);
      }
    }, [answers, question]);

  const options = [...matchArray];

  // Store selected answers as an array of objects
  const [selectedAnswers, setSelectedAnswers] = useState<{ clueText: string; matchText: string }[]>([]);

  // Handle selection of answers
  const handleSelect = (clueText: string, matchText: string) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = prev.filter((item) => item.clueText !== clueText);
      saveAnswers(question.id , [...updatedAnswers, { clueText, matchText }])
      return [...updatedAnswers, { clueText, matchText }];
    });

    
    console.log("Updated Selection:", selectedAnswers);
  };

  return (
    <div className="bg-white w-5/6 md:w-full max-w-4xl h-auto shadow-md rounded-md py-10 px-16 my-8 border border-gray-300 max-sm:p-4">
      <div className="mb-4">
        <div className="text-xl sm:text-2xl font-semibold mb-6" dangerouslySetInnerHTML={{ __html: question.text }} />
        <div className="flex flex-row border-b-2 border-gray-200"></div>
      </div>

      <div className="space-y-4 mb-6">
        {clueArray.map((pair:any) => (
          <div key={pair} className="flex justify-between items-center space-x-3 p-3 border-b border-gray-300">
            <div className="w-6/12">
              <div className="text-xl sm:text-2xl font-semibold" dangerouslySetInnerHTML={{ __html: pair }} />
            </div>

            <select
              className="border rounded-md py-2 px-10 w-5/12"
              value={selectedAnswers.find((item) => item.clueText === pair)?.matchText || "Choose"}
              onChange={(e) => handleSelect(pair, e.target.value)}
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

      {/* <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-8">
        <p className="font-bold">Category:</p>
        <p>Points: 1</p>
      </div> */}
    </div>
  );
};

export default MatchingCard;
