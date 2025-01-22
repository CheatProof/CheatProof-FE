import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineRadioButtonUnchecked, MdClose } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import { baseImgUrl, baseUrl } from "@/env/Env";

const ResultQuestionCard = ({ question, userAnswers ,correctQuestions,idx}: any) => {
  if (!question) {
    return <p>Loading options...</p>;
  }

  const isCorrect=correctQuestions.some((ques:any)=>ques.question.id=== question.id)

  return (
    <div className="bg-white mr-10 shadow-md rounded-lg p-6 my-4 border border-gray-200">
      <Toaster />
      {/* Question header */}
      <div className="mb-4 ml-2">
        <div className="flex flex-row border-b-2 border-gray-200">
          <h2 className="text-lg font-semibold text-black">Question no {idx+1} <span className={` ${userAnswers?"text-color1":"text-red-600"}`}>({userAnswers?"Attempted":"Not Attempted"})</span></h2>
          <p className="mx-auto mr-8 text-color2 text-sm">
            {/* {question.Categories.ParentCategories.parentCategoryName} / {question.Categories.categoryName} */}
          </p>
          <p className="text-color2 mb-10 text-sm"> {isCorrect?question.points:0} pts / {question.points} pts</p>
        </div>
      </div>
      {/* Question content */}
      <div className="ml-2">
        <h3
          dangerouslySetInnerHTML={{ __html: question.questionText }}
          className="text-xl font-semibold mb-6 mt-6"
        ></h3>
      </div>
         {question.questionMedia && (
              <div className="flex justify-center mb-6">
                <img src={`${question.questionMedia.startsWith("uploads\\") ? baseUrl:baseImgUrl}/${question.questionMedia}`} alt="Question image" className="max-w-lg max-h-[500px] rounded-lg shadow" />
              </div>
            )}
      {/* Options */}
      <div className="space-y-2 mb-6 pb-4 border-b-2 border-gray-200">
        {/* Handle Multiple Choice Questions */}
        {question.questionTypeId === "0d1010c6-5835-4f21-a610-435dddabf739" &&
          question?.MultipleChoiceQuestions?.MultipleChoiceOptions?.map(
            (opt: any, optIdx: any) => {
              const userAnswer = userAnswers?JSON.parse(userAnswers):null;
              const isUserAnswer =userAnswers? userAnswer?.includes(opt.id):null; // Check if user's answer includes this option
              const isCorrect = opt.isAnswer;
              return (
                <button
                  key={optIdx}
                  className={`w-full px-4 py-2 text-left rounded-lg ${
                    isCorrect
                      ? "bg-green-100 border border-green-500" // Highlight correct answers
                      : isUserAnswer  
                      ? "bg-red-100 border border-red-500" // Highlight wrong answers
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span className="inline-block mr-2">
                    {isCorrect ? (
                      <CiCircleCheck className="text-green-600" />
                    ) : isUserAnswer ? (
                      <MdClose className="text-red-500" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked className="text-gray-400" />
                    )}
                  </span>
                  <span
                    className="inline-block"
                    dangerouslySetInnerHTML={{ __html: opt.optionText }}
                  />
                </button>
              );
            }
          )}
        {/* Handle True/False Questions */}
        {question.questionTypeId === "1edada12-0532-4058-b79f-3e43efac97e1" &&
          question?.TrueFalseQuestions?.map((opt: any, optIdx: any) => {
            const isUserAnswer = userAnswers === opt.id; // Check if user's answer includes this option
            const isCorrect = opt.isAnswer;
            return (
              <button
                key={optIdx}
                className={`w-full px-4 py-2 text-left rounded-lg ${
                  isCorrect
                    ? "bg-green-100 border border-green-500"
                    : isUserAnswer
                    ? "bg-red-100 border border-red-500"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="inline-block mr-2">
                  {isCorrect ? (
                    <CiCircleCheck className="text-green-600" />
                  ) : isUserAnswer ? (
                    <MdClose className="text-red-500" />
                  ) : (
                    <MdOutlineRadioButtonUnchecked className="text-gray-400" />
                  )}
                </span>
                <span
                  className="inline-block"
                  dangerouslySetInnerHTML={{ __html: opt.optionText }}
                />
              </button>
            );
          })}
        {/* Handle Free Text Questions */}
        {question.questionTypeId === "cfa02311-dde4-4b4f-ae96-6d416a5c0396" &&
  question?.FreeTextQuestions?.map((opt: any, optIdx: any) => {
    const isCorrectAnswer = opt.correctAnswer === userAnswers; // Check if the user's answer matches the correct answer
    return (
      <div
        key={optIdx}
        className={`w-full px-4 py-2 text-left rounded-lg bg-gray-100 border ${
          isCorrectAnswer
            ? "border-green-500 text-green-600" // Correct answer styling
            : "border-gray-300 text-gray-600" // Default styling for other answers
        }`}
      >
        <span className="inline-block mr-2">
          {isCorrectAnswer ? (
            <CiCircleCheck className="text-green-600" />
          ) : (
            <MdOutlineRadioButtonUnchecked className="text-gray-400" />
          )}
        </span>
        <span
          className="inline-block"
          dangerouslySetInnerHTML={{ __html: opt.correctAnswer }}
        />
      </div>
    );
  })}

{/* Show user's answer */}
{question.questionTypeId === "cfa02311-dde4-4b4f-ae96-6d416a5c0396" && (
  <p
    className={`text-sm mt-2 w-full px-4 py-2 text-left rounded-lg bg-gray-100 border ${
      question.FreeTextQuestions.some((opt: any) => opt.correctAnswer === userAnswers)
        ? "text-green-500 border-green-600" // Highlight if the user's answer is correct
        : "text-red-500 border-red-600" // Highlight if the user's answer is incorrect
    }`}
  >
    User's Answer: {userAnswers || "No Answer Provided"}
  </p>
)}

      </div>

    </div>
  );
};

export default ResultQuestionCard;
