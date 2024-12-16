import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { Link } from "react-router-dom";
import { assignTestAQuestion } from "../../api/question";
import { removeQuestionFromTest } from "../../api/test";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';

const QuestionEditorCard = ({ question, idx, testId }: any) => {
  const [check, setCheck] = useState(question?.assignedStatus);
  const [loading, setLoading] = useState(false); // New loading state

  // Check if question data is available
  if (!question) {
    return <p>Loading options...</p>;
  }

  const assignQuestion = async () => {
    setLoading(true); // Start loader
    const body = {
      testId: testId,
      questionId: question.id
    };
    try {
      if (check) {
        const data = await removeQuestionFromTest(testId, question.id);
        if (data.code === 200 || data.code === 201) {
          setCheck(false);
          toast.success("Question unassigned successfully", {
            duration: 3000,
            position: 'top-center',
          });
        } else {
          toast.error("Failed to unassign question from test", {
            duration: 3000,
            position: 'top-center',
          });
        }
      } else {
        const data = await assignTestAQuestion(body);
        if (data.code === 200 || data.code === 201) {
          setCheck(true);
          toast.success("Question assigned successfully", {
            duration: 3000,
            position: 'top-center',
          });
        } else {
          toast.error("Failed to assign question to test", {
            duration: 3000,
            position: 'top-center',
          });
        }
      }
    } catch (error) {
      console.error("Error during question assignment:", error);
      toast.error("An error occurred while processing the request", {
        duration: 3000,
        position: 'top-center',
      });
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className={`bg-white mr-10 shadow-md rounded-lg p-6 my-4 border border-gray-200 ${check === true ? "bg-green-200/40" : ""}`}>
      <Toaster />
      <div className="mb-4 ml-2">
        <div className="flex flex-row border-b-2 border-gray-200">
          <h2 className="text-lg font-semibold text-black">Question {idx + 1}</h2>
          <p className="mx-auto mr-8 text-color2 text-sm">{question.Categories.ParentCategories.parentCategoryName} / {question.Categories.categoryName}</p>
          <p className="text-color2 mb-10 text-sm">{question.points} pts</p>
        </div>
      </div>
      <div className="ml-2">
        <h3 dangerouslySetInnerHTML={{ __html: question.questionText }} className="text-xl font-semibold mb-6 mt-6"></h3>
      </div>
      {question.questionTypeId === "0d1010c6-5835-4f21-a610-435dddabf739" ? (
        <div className="space-y-2 mb-6 pb-4 border-b-2 border-gray-200">
          {question?.MultipleChoiceQuestions?.MultipleChoiceOptions?.map((opt: any, idx: any) => (
            <button
              key={idx}
              className={`w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg 
                ${opt.isAnswer ? 'bg-gray-100 border border-fore' : ''}`}
            >
              <span className="inline-block mr-2">
                {opt.isAnswer ? (
                  <CiCircleCheck className="text-fore" />
                ) : (
                  <MdOutlineRadioButtonUnchecked className="text-gray-400" />
                )}
              </span>
              <span className="inline-block" dangerouslySetInnerHTML={{ __html: opt.optionText }} />
            </button>
          ))}
        </div>) : null}

      <div className="flex justify-between">
        <div className="flex space-x-4 text-sm text-color1 ml-2">
          <Link to={`/teacher-dashboard/questionbank/${question.id}`} className="hover:underline">Edit</Link>
          <button className="hover:underline">Used In</button>
        </div>
        {(typeof check === "boolean") &&
          <div className="flex space-x-4 text-sm text-color1 ml-2">
            <button onClick={assignQuestion} className="hover:underline">
              {loading ? (
                <Circles
                  height="20"
                  width="20"
                  color="fore"
                  ariaLabel="circles-loading"
                  visible={true}
                />
              ) : (!check ? "Assign to Test" : "Remove From Test")}
            </button>
          </div>}
      </div>
    </div>
  );
};

export default QuestionEditorCard;
