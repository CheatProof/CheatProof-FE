import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

const QuestionCard = ({ question }: any) => {
  // Check if question data is available
  if (!question) {
    return <p>Loading options...</p>;
  }

  return (
    <div className="bg-white mr-10 shadow-md rounded-lg p-6 my-4 border border-gray-200">
      <div className="mb-4 ml-2">
        <div className='flex flex-row border-b-2 border-gray-200'>
          <h2 className="text-lg font-semibold text-black">Question 1</h2>
          <p className='mx-auto mr-8 text-gray-400 text-sm'>Generic Parent / Generic</p>
          <p className='text-gray-400 mb-10 text-sm'>{question.points} pts</p>
        </div>
      </div>
      <div className='ml-2'>
        <h3 dangerouslySetInnerHTML={{__html:question.questionText}} className='text-xl font-semibold mb-6 mt-6'></h3>
      </div>
      {/* Display options for multiple-choice questions, true/false, etc. */}
      <div className="space-y-2 mb-6 pb-4 border-b-2 border-gray-200">
        {question?.MultipleChoiceQuestions?.[0]?.MultipleChoiceOptions?.map((opt: any, idx: any) => (
          <button
            key={idx}
            className={`w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg 
              ${opt.isAnswer ? 'bg-gray-100 border border-green-500' : ''}`}
          >
            <span className="inline-block mr-2">
              {opt.isAnswer ? (
                <CiCircleCheck className="text-green-500" />
              ) : (
                <MdOutlineRadioButtonUnchecked className="text-gray-400" />
              )}
            </span>
            <span dangerouslySetInnerHTML={{ __html:opt.optionText}}/>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
