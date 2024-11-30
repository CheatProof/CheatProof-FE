import { Input } from "@mui/material";
import { useState } from "react";
import React from "react";
// import { TiTick } from "react-icons/ti";

// interface FreeTextCardProps {
//   question: string;
//   correctAnswers: string[];
//   onAnswerSubmit: (answer: string) => void;
// }

const FreeTextCard: React.FC<any> = ({ question,answers,saveAnswer }) => {
  const [userAnswer, setUserAnswer] = useState(answers.filter((a:any) => a.questionId === question.id).length>0?answers.filter((a:any) => a.questionId === question.id)[0].answer:"");
  
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
    saveAnswer(question.id,event.target.value);
  };

 
    


  return (
    <div className="bg-white w-5/6 md:w-full mx-auto max-w-3xl h-auto shadow-md rounded-md p-6 my-8 border border-gray-300 max-sm:p-4">
      {/* Question */}
      <div className="mb-4">
        <div dangerouslySetInnerHTML={{ __html: question.questionText }} />
        <div className="flex flex-row border-b-2 border-gray-200"></div>
      </div>

      {/* Acceptable Answers */}
      {/* <div className="space-y-4 mb-6">
        {correctAnswers.map((answer, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 border border-green-500 rounded-lg max-sm:space-x-2">
            <span className="text-green-500 text-lg sm:text-xl">
              <TiTick />
            </span>
            <span className="text-gray-700 text-base sm:text-lg">{answer}</span>
          </div>
        ))}
      </div> */}

      {/* User Input for Answer */}
      <h3 className="text-lg sm:text-xl font-medium mb-6">Add your answer:</h3>
      <Input 
        value={userAnswer} 
        onChange={handleAnswerChange} 
        className="w-full p-2 border border-gray-300 rounded" 
      />
 
    </div>
  );
};

export default FreeTextCard;
