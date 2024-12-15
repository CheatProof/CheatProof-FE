import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { Link } from "react-router-dom";
import { assignTestAQuestion } from "../../api/question";
import { removeQuestionFromTest } from "../../api/test";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
const QuestionEditorCard = ({ question ,idx ,testId}: any) => {

  const [check,setCheck]=useState(question?.assignedStatus)
  // Check if question data is available
  if (!question) {
    return <p>Loading options...</p>;
  }

  const assignQuestion = async()=>{
    // Add the question to the test
    // Update the test's question list and update the test editor component
    const body={
      testId: testId,
      questionId: question.id
    }
    if(check){
    const data = await removeQuestionFromTest(testId,question.id);
    if(data.code === 200 || data.code === 201){
      setCheck(!check)
      toast.success("Question unassigned successfully", {
        duration: 3000,
        position: 'top-center',
    
      })
    } else {
      toast.error("Failed to assign question to test", {
        duration: 3000,
        position: 'top-center',
      })
    }
    }else{
    const data = await assignTestAQuestion(body);
    if(data.code === 200 || data.code === 201){
      setCheck(!check)
      toast.success("Question assigned successfully", {
        duration: 3000,
        position: 'top-center',
      })
    } else {
      toast.error("Failed to assign question to test", {
        duration: 3000,
        position: 'top-center',
      })
    }
    }
  
  }

  return (
    <div className={`bg-white mr-10 shadow-md rounded-lg p-6 my-4 border border-gray-200 ${check === true?"bg-green-200/40":""}`}>
      <Toaster />
      <div className="mb-4 ml-2">
        <div className='flex flex-row border-b-2 border-gray-200'>
          <h2 className="text-lg font-semibold text-black">Question {idx+1}</h2>
          <p className='mx-auto mr-8 text-color2 text-sm'>{question.Categories.ParentCategories.parentCategoryName} / {question.Categories.categoryName}</p>
          <p className='text-color2 mb-10 text-sm'>{question.points} pts</p>
        </div>
      </div>
      <div className='ml-2'>
        <h3 dangerouslySetInnerHTML={{__html:question.questionText}} className='text-xl font-semibold mb-6 mt-6'></h3>
      </div>
      {/* Display options for multiple-choice questions, true/false, etc. */}
   {question.questionTypeId === "0d1010c6-5835-4f21-a610-435dddabf739"   ? (
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
            <span className="inline-block" dangerouslySetInnerHTML={{ __html:opt.optionText}}/>
          </button>
        ))}
      </div>): question.questionTypeId=== "1edada12-0532-4058-b79f-3e43efac97e1"   ? (<div className="space-y-2 mb-6 pb-4 border-b-2 border-gray-200">
        {question?.TrueFalseQuestions?.map((opt: any, idx: any) => (
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
            <span className="inline-block" dangerouslySetInnerHTML={{ __html:opt.optionText}}/>
          </button>
        ))}
      </div>): question.questionTypeId=== "cfa02311-dde4-4b4f-ae96-6d416a5c0396"   ? 
      (<div className="space-y-2 mb-6 pb-4 border-b-2 border-gray-200">
        {question?.FreeTextQuestions?.map((opt: any, idx: any) => (
          <button
            key={idx}
            className={`w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg 
              ${true ? 'bg-gray-100 border border-fore' : ''}`}
          >
            <span className="inline-block mr-2">
              {true ? (
                <CiCircleCheck className="text-fore" />
              ) : (
                <MdOutlineRadioButtonUnchecked className="text-gray-400" />
              )}
            </span>
            <span className="inline-block" dangerouslySetInnerHTML={{ __html:opt.correctAnswer}}/>
          </button>
        ))}
      </div>): (<></>)}

<div className="flex justify-between">
      <div className="flex space-x-4 text-sm text-color1 ml-2">
        {/* <button className="hover:underline">Answers</button> */}
        <Link to={`/teacher-dashboard/questionbank/${question.id}`} className="hover:underline">Edit</Link>
        {/* <button className="hover:underline">Duplicate</button> */}
        
       
        <button className="hover:underline">Used In</button>
      </div>
     {(typeof check === "boolean") &&  <div className="flex space-x-4 text-sm text-color1 ml-2">
        <button onClick={()=> assignQuestion()} className="hover:underline">{!check?"Assign to Test":"Remove From Test"}</button>
  </div>}
  </div>
    </div>
  );
};

export default QuestionEditorCard;
