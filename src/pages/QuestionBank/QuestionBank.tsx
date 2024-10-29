// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Sidebar } from "../../components";
// import QuestionCard from "../../components/Question/QuestionCard";
// import QuestionFilter from "../../components/Question/QuestionFilter";
// import { getQuestionsByTeacherId } from "../../api/question";
// import { Circles } from 'react-loader-spinner';

// const QuestionBank = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [questions, setQuestions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get("page") || "1"));
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true); // Loading state
//   const pageSize = 10;

//   const getQuestions = async (page = 1) => {
//     const data = await getQuestionsByTeacherId(page, pageSize);
//     if (data.code === 200) {
//       console.log(data.data);
//       setQuestions(data.data.questions);
//       setTotalPages(Math.ceil(data.data.totalQuestions / pageSize));
//     }
//   };

//   useEffect(() => {
//     getQuestions(currentPage);
//     window.scrollTo(0, 0);
//   }, [currentPage]);

//   const handlePageChange = (page:any) => {
//     setCurrentPage(page);
//     navigate(`?page=${page}`);
//   };

//   const renderPagination = () => {
//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageChange(i)}
//           className={`px-4 py-2 mx-1 rounded ${
//             i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
//           } hover:bg-blue-600 transition-colors`}
//         >
//           {i}
//         </button>
//       );
//     }
//     return pages;
//   };

//   return (
//     <>
//     <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
//       <Sidebar />
//       <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
//         <div className="w-full pl-3">
//           <h2 className="text-3xl text-black font-bold mb-6 py-6">Question Bank</h2>
//           <QuestionFilter />
//           <div className="question-list">
//             {questions.map((question, idx) => (
//               <QuestionCard key={idx} question={question} idx={currentPage} onDelete={getQuestions}/>
//             ))}
//           </div>

//           {/* Custom Pagination Controls */}
//           <div className="flex justify-center mt-8 mb-4">
//             {renderPagination()}
//           </div>
//         </div>
//       </div>
//     </div>
    
//     </>

//   );
// };

// export default QuestionBank;



import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components";
import QuestionCard from "../../components/Question/QuestionCard";
import QuestionFilter from "../../components/Question/QuestionFilter";
import { getQuestionsByTeacherId } from "../../api/question";
import { Circles } from 'react-loader-spinner';

const QuestionBank = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get("page") || "1"));
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const pageSize = 10;

  const getQuestions = async (page = 1) => {
    setLoading(true);
    const data = await getQuestionsByTeacherId(page, pageSize);
    if (data.code === 200) {
      console.log(data.data);
      setQuestions(data.data.questions);
      setTotalPages(Math.ceil(data.data.totalQuestions / pageSize));
    }
    setLoading(false);
  };

  useEffect(() => {
    getQuestions(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePageChange = (page:any) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded ${
            i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          } hover:bg-blue-600 transition-colors`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
          <div className="w-full pl-3">
            <h2 className="text-3xl text-black font-bold mb-6 py-6">Question Bank</h2>
            <QuestionFilter />
            {loading ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '50vh',
                }}
              >
                <Circles
                  height="80"
                  width="80"
                  color="#152487"
                  ariaLabel="circles-loading"
                />
              </div>
            ) : (
              <>
                <div className="question-list">
                  {questions.map((question, idx) => (
                    <QuestionCard key={idx} question={question} idx={currentPage} onDelete={getQuestions} />
                  ))}
                </div>
                {/* Custom Pagination Controls */}
                <div className="flex justify-center mt-8 mb-4">
                  {renderPagination()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionBank;

