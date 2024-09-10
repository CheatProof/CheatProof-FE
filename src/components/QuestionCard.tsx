interface QuestionCardProps {
  question: string;
  options: string[];
  onOptionSelect: (selectedOption: string) => void;
}

// const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, onOptionSelect }) => {
    const QuestionCard = () => {
  return (
    <div className="bg-white mr-10 shadow-md rounded-lg p-6 my-4 border border-gray-200">
      
      <div className="mb-4 ml-2">
        <div className='flex flex-row border-b-2 border-gray-200'>
          
        
        <h2 className="text-lg font-semibold text-black">Question 1</h2>
        <p className='mx-auto mr-8 text-gray-400 text-sm'>Generic Parent / Generic</p>
          <p className='text-gray-400 mb-10 text-sm'>1 pt</p>
      </div>
      </div>

    <div className='ml-2'>
      <h3 className='text-xl font-semibold mb-6 mt-6 '>This is a question</h3>
    </div>

      
      <div className="space-y-2 mb-6 pb-4 border-b-2 border-gray-200">
        {/* {options.map((option, index) => ( */}
          <button
            // key={index}
            // onClick={() => onOptionSelect(option)}
            className="w-full px-4 py-2 hover:bg-gray-100  text-left text-gray-700"
          >
            {/* {option} */}
            Option 1
            </button>
            <button className='w-full px-4 py-2 hover:bg-gray-100  text-left text-gray-700'> Option 2</button>
            <button className='w-full px-4 py-2 hover:bg-gray-100  text-left text-gray-700'> Option 3</button>
            <button className='w-full px-4 py-2 hover:bg-gray-100  text-left text-gray-700'> Option 4</button>
          
        {/* ))} */}
        </div>
        <div className="flex flex-col ml-4 mb-4 pb-4 space-y-2  border-b-2  border-gray-200 text-gray-500 text-sm">
          <p>Question Type:</p>
          <p>Randomize Answers:</p>
          <p>Date Added:</p>
          <p>Last Modified:</p>
          <p>QID#:</p>
        </div>

        <div className='flex flex-col sm:flex-row ml-4 space-y-2 sm:space-y-0 sm:space-x-5 opacity-20 hover:opacity-100 hover:text-blue-500'>
          <a className="hover:underline hover:cursor-pointer">Answers</a>
          <a className="hover:underline hover:cursor-pointer">Edit</a>
          <a className="hover:underline hover:cursor-pointer">Duplicate</a>
          <a className="hover:underline hover:cursor-pointer">Archive</a>
          <a className="hover:underline hover:cursor-pointer">Delete</a>
          <a className="hover:underline hover:cursor-pointer">Used In</a>
        
      </div>
    </div>
  );
};

export default QuestionCard;



