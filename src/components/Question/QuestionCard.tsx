import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { Link } from "react-router-dom";
import { archiveQuestion, deleteQuestion, usedInTests } from "../../api/question";
import toast, { Toaster } from 'react-hot-toast';
import { Circles } from "react-loader-spinner";

const QuestionCard = ({ question, idx, onDelete ,hide}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isUsedInModalOpen, setIsUsedInModalOpen] = useState(false);
  const [usedInQuestions, setUsedInQuestions] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false)

  if (!question) {
    return <p>Loading options...</p>;
  }

  // Handle delete action
  const handleDelete = async () => {
    setDeleteLoading(true);
    const response = await deleteQuestion(question.id);
    if (response.code === 200) {
      onDelete(idx);
      toast.success("Question deleted successfully.", {
        duration: 3000,
        position: "top-center",
        
      });
    } else {
      toast.error("Failed to delete the question. Please try again.", {
        duration: 3000,
        position: "top-center",
      });
      setDeleteLoading(false); // Hide spinner in case of error
    }
    setIsModalOpen(false);
  };
  // Handle archive action
  const handleArchive = async () => {
    // TODO: Implement archive question logic
    const response = await archiveQuestion(question.id);
    if (response.code === 200) {
      toast.success("Question archived successfully.", {
        duration: 3000,
        position: "top-center"
      });
    } else {
      toast.error("Failed to archive the question. Please try again.", {
        duration: 3000,
        position: "top-center"
      });
    }
    setIsArchiveModalOpen(false);
  };

  const fetchUsedInTest = async()=>{
    // TODO: Implement logic to fetch questions that use this question
    const response = await usedInTests(question.id);
    if (response.code === 200) {
      setUsedInQuestions(response.data);
    } else {
      toast.error("Failed to fetch questions that use this question. Please try again.", {
        duration: 3000,
        position: "top-center"
      });
    }
  }

  useEffect(() => {
    if(isUsedInModalOpen){
      fetchUsedInTest()
    }
  },[isUsedInModalOpen]);

  return (
    <div className="bg-white mr-10 shadow-md rounded-lg p-6 my-4 border border-gray-200">
      <Toaster />
      {/* Question header */}
      <div className="mb-4 ml-2">
        <div className="flex flex-row border-b-2 border-gray-200">
          <h2 className="text-lg font-semibold text-black">Question {question.index}</h2>
          <p className="mx-auto mr-8 text-color2 text-sm">
            {question.Categories.ParentCategories.parentCategoryName} / {question.Categories.categoryName}
          </p>
          <p className="text-color2 mb-10 text-sm">{question.points} pts</p>
        </div>
      </div>
      {/* Question content */}
      <div className="ml-2">
        <h3 dangerouslySetInnerHTML={{ __html: question.questionText }} className="text-xl font-semibold mb-6 mt-6"></h3>
      </div>

      {/* Image Section */}
      {question.questionMedia && (
        <div className="flex justify-center mb-6">
          <img src={question.questionMedia} alt="Question image" className="max-w-lg max-h-[500px] rounded-lg shadow" />
        </div>
      )}
      {/* Options */}
      
      {!hide  && (question.questionTypeId === "0d1010c6-5835-4f21-a610-435dddabf739" ? (
        <div className="space-y-2 mb-6 pb-4 border-b-2 border-gray-200">
          {question?.MultipleChoiceQuestions?.MultipleChoiceOptions?.map((opt: any, idx: any) => (
            <button
              key={idx}
              className={`w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg 
                ${opt.isAnswer ? 'bg-gray-100 border border-fore' : ''}`}
            >
              <span className="inline-block mr-2">
                {opt.isAnswer ? <CiCircleCheck className="text-fore" /> : <MdOutlineRadioButtonUnchecked className="text-gray-400" />}
              </span>
              <span className="inline-block" dangerouslySetInnerHTML={{ __html: opt.optionText }} />
            </button>
          ))}
        </div>
      ) : question.questionTypeId === "1edada12-0532-4058-b79f-3e43efac97e1" ? (
        <div className="space-y-2 mb-6 pb-4 border-b-2 border-gray-200">
          {question?.TrueFalseQuestions?.map((opt: any, idx: any) =>(
            <button
              key={idx}
              className={`w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg 
                ${opt.isAnswer ? 'bg-gray-100 border border-fore' : ''}`}

            >
              <span className="inline-block mr-2">
                {opt.isAnswer ? <CiCircleCheck className="text-fore" /> : <MdOutlineRadioButtonUnchecked className="text-gray-400" />}
              </span>
              <span className="inline-block" dangerouslySetInnerHTML={{ __html: opt.optionText }} />
            </button>
          ))}
        </div>
      ) : question.questionTypeId === "cfa02311-dde4-4b4f-ae96-6d416a5c0396" ? (
        <div className="space-y-2 mb-6 pb-4 border-b-2 border-gray-200">
          {question?.FreeTextQuestions?.map((opt: any, idx: any) => (
            <button
              key={idx}
              className={`w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg 
                bg-gray-100 border border-fore`}
            >
              <span className="inline-block mr-2">
                <CiCircleCheck className="text-fore" />
              </span>
              <span className="inline-block" dangerouslySetInnerHTML={{ __html: opt.correctAnswer }} />
            </button>
          ))}
        </div>
      )  : question.questionTypeId === "53ef2fab-ff7e-4ee0-8a60-3f4d7b20adfb" ?(
        <div className="space-y-2 mb-6 pb-4 border-b-2 border-gray-200">
          <div className="flex justify-start w-9/12 " >
          
            <p className="w-1/2 font-semibold">Clue</p> 
            <p className="w-1/2 font-semibold">Match</p>
          </div>
          {question?.MatchingQuestions?.MatchingOptions.map((opt: any, idx: any) => (
             <div key={idx} className="flex border-dashed w-9/12 border-color1/25 !mt-5 border-b">
                <div className="w-1/2 " dangerouslySetInnerHTML={{__html:opt.clueText}}/>
                <div className="w-1/2 " dangerouslySetInnerHTML={{__html:opt.matchText}}/>
              
             </div>

          ))}
          {question?.MatchingQuestions.IncorrectMatchOptions.map((opt:any,idx:any)=>(
             <div key={idx} className="flex border-dashed w-9/12 border-color1/25 !mt-5 border-b">
                <div className="w-1/2 " dangerouslySetInnerHTML={{__html:"<p>Incorrect Matching Option</p>"}}/>
                <div className="w-1/2 " dangerouslySetInnerHTML={{__html:`<p>${opt.incorrectMatchText}</p>`}}/>
             </div>
          ))

          }
        
           
          </div>
      ) : null)}

      {/* Actions */}
      <div className="flex space-x-4 text-sm text-color1 ml-2">
        <Link to={`${question.id}`} className="hover:underline">Edit</Link>
        <button onClick={()=> setIsModalOpen(true)} className="hover:underline">Delete</button>
        <button onClick={()=> setIsArchiveModalOpen(true)} className="hover:underline">Archive</button>
        <button onClick={()=> setIsUsedInModalOpen(true)} className="hover:underline">Used In</button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this question?</p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-color2 text-white rounded hover:bg-color1 flex items-center justify-center"
                disabled={deleteLoading} // Disable button while loading
              >
                {deleteLoading ? (
                  <Circles
                    height="20"
                    width="20"
                    color="#fff"
                    ariaLabel="loading-indicator"
                    visible={true}
                  />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Archive Confirmation Modal */}

      {isArchiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Archive Confirmation</h2>
            <p>Are you sure you want to archive this question?</p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsArchiveModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
              onClick={handleArchive}
                className="px-4 py-2 bg-color2 text-white rounded hover:bg-color1"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )
    }
    {isUsedInModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-semibold mb-4">Used In</h2>
          {/* TODO: Implement used in modal */}
      {usedInQuestions.length!==0 ?(  <ul>
          {usedInQuestions.map((test:any, index:any) => (
            <li className=" list-none" key={index}>
              <span className="text-color2 text-sm mr-2">{index + 1}. </span>
              {test.testName}
            </li>
          ))}
        </ul>):(<p>Question Not used in any Test</p>)}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setIsUsedInModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )

    }
    </div>
  );
};

export default QuestionCard;
