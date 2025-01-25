// import { useEffect, useState } from "react";
// import Header from "../../../components/Header/Header";
// import { useParams } from "react-router-dom";
// import { getTestById, getTestForAssignment } from "../../../api/test";
// import { Circles } from "react-loader-spinner";
// import { assignTestAQuestionInBulk, getQuestionTypes } from "@/api/question";
// import { toast, Toaster } from "react-hot-toast";
// // import { CheckTwoTone } from "@mui/icons-material";
// import { Checkbox } from "@mui/material";

// const AddQuestionBulk = () => {
//   const { id } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState(new Set());
//   const [test, setTest] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [questionLoading, setQuestionLoading] = useState(true);
//   const [questionTypes, setQuestionTypes] = useState<any>([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [randomModalVisible, setRandomModalVisible] = useState(false);
//   const [randomCounts, setRandomCounts] = useState<any>({});
//   const [selectCount, setSelectCount] = useState(10);
//   const [isAssigning, setIsAssigning] = useState(false); 
//   const [multipleChoiceQuestions, setMultipleChoiceQuestion] = useState([])
//   const [singleChoiceQuestions, setSingleChoiceQuestion] = useState([])
//   const [trueFalseQuestions, setTrueFalseQuestion] = useState([])
//   const [essayQuestions, setEssayQuestion] = useState([])
//   const [freeTextQuestions,setFreeTextQuestion] = useState([])
//   const [matchingQuestions, setMatchingQuestion] = useState([])
//   const [grammarQuestions, setGrammarQuestion] = useState([])

//   const [multipleChoiceQuestionType, setMultipleChoiceQuestionType] = useState("")
//   const [trueFalseQuestionType, setTrueFalseQuestionType] = useState("")
//   const [essayQuestionType, setEssayQuestionType] = useState("")
//   const [freeTextQuestionType, setFreeTextQuestionType] = useState("")
//   const [matchingQuestionType, setMatchingQuestionType] = useState("")
//   const [grammarQuestionType, setGrammarQuestionType] = useState("")


//   const fetchTest = async () => {
//     const testData = await getTestById(id);
//     if (testData.code === 200) {
//       setTest(testData.data);
//       setLoading(false);
//     }
//   };

//   const fetchQuestionTypes = async () => {
//     const data = await getQuestionTypes();
//     if (data.code === 200) {
//       setQuestionTypes(data.data);
//       setMultipleChoiceQuestionType(questionTypes.find((t: any) => t.questionTypeName === "MultipleChoice")?.id);
//       setTrueFalseQuestionType(questionTypes.find((t: any) => t.questionTypeName === "TrueFalse")?.id);
//       setEssayQuestionType(questionTypes.find((t: any) => t.questionTypeName === "Essay")?.id);
//       setFreeTextQuestionType(questionTypes.find((t: any) => t.questionTypeName === "FreeText")?.id);
//       setMatchingQuestionType(questionTypes.find((t: any) => t.questionTypeName === "Matching")?.id);
//       fetchQuestionByUser();
//     }
//   };

//   const fetchQuestionByUser = async () => {
//     try {
//       const data = await getTestForAssignment(id);
//       if (data.success) {
//         setQuestions(data.data);
//         const preSelected = new Set(
//           data.data.filter((q: any) => q.assignedStatus).map((q: any) => q.id)
//         );
//         setSelectedQuestions(preSelected);
//         setMultipleChoiceQuestion(
//           data.data.filter((q: any) => q.questionTypeId === multipleChoiceQuestionType && q.MultipleChoiceQuestions.answerSelection !== "radio")
//         )
//         setSingleChoiceQuestion(
//           data.data.filter((q: any) => q.questionTypeId === multipleChoiceQuestionType && q.MultipleChoiceQuestions.answerSelection === "radio")
//         )
//         setTrueFalseQuestion(
//           data.data.filter((q: any) => q.questionTypeId === trueFalseQuestionType)
//         )
//         setEssayQuestion(
//           data.data.filter((q: any) => q.questionTypeId === essayQuestionType)
//         )
//         setFreeTextQuestion(
//           data.data.filter((q: any) => q.questionTypeId === freeTextQuestionType)
//         )
//         setMatchingQuestion(
//           data.data.filter((q: any) => q.questionTypeId === matchingQuestionType)
//         )
//         setGrammarQuestion(
//           data.data.filter((q: any) => q.questionTypeId === grammarQuestionType)
//         )

//         setQuestionLoading(false);
//       } else {
//         console.error("Error fetching questions", data);
//       }
//     } catch (error) {
//       console.error("Error fetching questions", error);
//     }
//   };

//   useEffect(() => {
//     fetchQuestionTypes();
//     // fetchQuestionByUser();
//     fetchTest();
//   }, []);

  // const handleCheckboxChange = (questionId: any) => {
  //   setSelectedQuestions((prevSelected) => {
  //     const updatedSelected = new Set(prevSelected);
  //     if (updatedSelected.has(questionId)) {
  //       updatedSelected.delete(questionId);
  //     } else {
  //       updatedSelected.add(questionId);
  //     }
  //     return updatedSelected;
  //   });
  // };

  // const handleSelectAll = () => {
  //   if (selectedQuestions.size === questions.length) {
  //     setSelectedQuestions(new Set());
  //   } else {
  //     setSelectedQuestions(new Set(questions.map((q: any) => q.id)));
  //   }
  // };

  // const handleAssignQuestions = async () => {
  //   setIsAssigning(true); // Start loader
  //   try {
  //     const questionIds = Array.from(selectedQuestions);
  //     const body = {
  //       testId: id,
  //       questionIds: questionIds,
  //     };
  //     const response = await assignTestAQuestionInBulk(body);
  //     if (response.code ===201 || response.code === 200) {
  //       toast.success("Questions assigned successfully!");
  //       // setSelectedQuestions(new Set());
  //     } else {
  //       toast.error("Failed to assign questions.");
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred while assigning questions.");
  //   } finally {
  //     setIsAssigning(false); 
  //   }
  // };


//   const handleRandomSelection = () => {
//     const randomSelected = new Set<number>();
  
//     questionTypes.forEach((type: any) => {
//       const typeQuestions: any[] = questions.filter((q: any) => q.questionTypeId === type.id);
//       const count = randomCounts[type.id] || 0;
  
//       if (count > 0) {
//         // To ensure unique random indexes, shuffle and pick the required count
//         const shuffledIndexes = Array.from({ length: typeQuestions.length }, (_, i) => i)
//           .sort(() => Math.random() - 0.5)
//           .slice(0, count);
  
//         shuffledIndexes.forEach((index) => randomSelected.add(typeQuestions[index].id));
//       }
//     });
  
//     setSelectedQuestions(randomSelected);
//     setRandomModalVisible(false);
//   };
  

  // const handleSelectTopN = (n:any) => {
  //   setSelectedQuestions(new Set(questions.slice(0, n).map((q:any) => q.id)));
  //   setModalVisible(false);
  // };



//   return (
//     <main className="flex">
//       <Header name={test?.testName} page={"Add Bulk Questions"} id={id} />
      
//       <div className="w-full  mx-3 my-8">
//         <Toaster />
//         <div className="w-full  mb-3 flex text-center justify-center md:justify-start">
//         <span className="text-3xl font-semibold ">Add Bulk Questions </span>
//         </div>
//         {questionLoading ? (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100vh",
//             }}
//           >
//             <Circles height="80" width="80" color="#152487" ariaLabel="circles-loading" />
//           </div>
//         ) : (
//           <div>
            // <div className="flex justify-between mb-4">
            //   <div>
            //     <button
            //       className="px-4 py-2 bg-white text-fore border-2 border-fore rounded-lg hover:bg-fore hover:text-white"
            //       onClick={handleSelectAll}
            //     >
            //       {selectedQuestions.size === questions.length ? "Deselect All" : "Select All"}
            //     </button>
            //     <button
            //       className="ml-4 px-4 py-2 bg-color1 text-white rounded-lg hover:bg-fore"
            //       onClick={() => setRandomModalVisible(true)}
            //     >
            //       Select Random
            //     </button>

            //     <button
            //       className="ml-4 px-4 py-2 bg-color1 text-white rounded-lg hover:bg-fore"
            //       onClick={() => setModalVisible(true)}
            //     >
            //       Select Top N Questions
            //     </button>
            //   </div>
            //   <div className="mt-3">
            //     Selected: {selectedQuestions.size} / {questions.length}
            //   </div>
            // </div>

        //     <div className="overflow-auto max-h-[63vh] border-2 border-gray-300">
        //       <table className="w-full border-collapse top-0 border-2 border-gray-300 table-auto">
        //         <thead className="sticky top-[-1px] z-[9]  bg-gray-100">
        //           <tr>
        //             <th className="border border-gray-300 px-4 py-2">Select</th>
        //             <th className="border border-gray-300 px-4 py-2">Index</th>
        //             <th className="border border-gray-300 px-4 py-2">Question</th>
        //             <th className="border border-gray-300 px-4 py-2">Question Types</th>

        //             <th className="border border-gray-300 px-4 py-2">Points</th>
        //           </tr>
        //         </thead>

        //         {loading ? (
        //   <div
        //     style={{
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       height: "80vh",
        //     }}
        //   >
        //     <Circles height="80" width="80" color="#152487" ariaLabel="circles-loading" />
        //   </div>
        // ) : (
        //         <tbody>
        //           {questions.map((question: any) => (
        //             <tr
        //               key={question.id}
        //               className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
        //             >
        //               <td className="border border-gray-300 px-4 py-2 text-center">
        //                 <Checkbox className="bg-fore text-fore  z-0"
        //                   // type="checkbox"
        //                   checked={selectedQuestions.has(question.id)}
        //                   onChange={() => handleCheckboxChange(question.id)}
        //                 />
        //               </td>
        //               <td className="border border-gray-300 px-4 py-2 text-center">
        //                 {question.index}
        //               </td>
        //               <td className="border border-gray-300 px-4 py-2">
        //                 <h3
        //                   dangerouslySetInnerHTML={{ __html: question.questionText }}
        //                   className="text-sm font-medium"
        //                 ></h3>
        //               </td>
        //               <td className="border border-gray-300 px-4 py-2 text-center">
                        
        //               {questionTypes.find((questionType: any) => questionType.id === question.questionTypeId)?.questionTypeName}


        //               </td>
        //               <td className="border border-gray-300 px-4 py-2 text-center">
        //                 {question.points}
        //               </td>
                      
        //             </tr>
        //           ))}
        //         </tbody>
        // )}
        //       </table>
        //     </div>

            //   <div className="flex justify-end mt-4">
            //   <button
            //     className="px-3 py-2 bg-color1 text-white rounded-lg shadow-md hover:bg-fore transition-all flex items-center"
            //     onClick={handleAssignQuestions}
            //     disabled={isAssigning} // Disable the button while loading
            //   >
            //     {isAssigning && (
            //       <Circles height="20" width="20" color="#ffffff" ariaLabel="loading-spinner" />
            //     )}
            //     <span className="ml-2">
            //       {isAssigning ? "Assigning..." : "Assign Questions"}
            //     </span>
            //   </button>
            // </div>

        //     {randomModalVisible && (
        //       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[11] items-center">
        //         <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        //           <h2 className="text-lg font-bold mb-4">Select Random Questions</h2>
        //           <p className="bg-gray-100 mb-5 rounded text-black/55 text-xs p-3">
        //           Select the number of questions for each question category. 
        //           The system will randomly choose that number of questions from the question bank for each category.
        // </p>
        //           <div className="grid grid-cols-2 gap-6 my-2">

        //           {questionTypes.map((type: any) => (
        //   <div key={type.id} className="flex flex-col">
        //     <label className="block mb-2 font-medium text-gray-700">
        //       {type.questionTypeName}
        //     </label>
        //     <input
        //       type="number"
        //       min="0"
        //       className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       value={randomCounts[type.id] || ""}
        //       onChange={(e) =>
        //         setRandomCounts({
        //           ...randomCounts,
        //           [type.id]: Number(e.target.value),
        //         })
        //       }
        //     />
        //   </div>
        // ))}
        // </div>
        //           <div className="flex justify-between mt-5">
        //             <button
        //               className="px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
        //               onClick={handleRandomSelection}
        //             >
        //               Select
        //             </button>
        //             <button
        //               className="px-5 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
        //               onClick={() => setRandomModalVisible(false)}
        //             >
        //               Cancel
        //             </button>
        //           </div>
        //         </div>
        //       </div>
        //     )}

// {modalVisible && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[11] items-center">
//                 <div className="bg-white p-8 rounded-lg shadow-lg">
//                   <h2 className="text-lg font-bold mb-4">Select Top N Questions</h2>
//                   <p className="bg-gray-100 mb-5 rounded text-black/55 text-xs p-3">
//                   Select the top 'n' questions from the question bank to assign to the test. <br /><br />
//                   The Custom Count option allows users to specify the exact number of questions to be assigned.
//         </p>
//                   <div className="flex justify-around gap-x-2 mb-4">
//                     {[10, 20, 30].map((n) => (
//                       <button
//                         key={n}
//                         className="px-4 py-2 bg-color2 text-white rounded-lg hover:bg-color1"
//                         onClick={() => handleSelectTopN(n)}
//                       >
//                         Top {n} Questions

//                       </button>
//                     ))}
//                   </div>
//                   <div className="mt-6 mb-3">
//                     <label className="block mb-2">Custom Count:</label>
//                     <input
//                       type="number"
//                       className="border border-gray-300 rounded px-2 py-1 w-full"
//                       value={selectCount}
//                       onChange={(e) => setSelectCount(Number(e.target.value))}
//                     />
//                     </div>
//                     <div className="flex justify-between mt-5">
//                     <button
//                       className="mt-2 px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
//                       onClick={() => handleSelectTopN(selectCount)}
//                     >
//                       Select
//                     </button>
                  
//                   <button
//                     className="mt-2 px-5 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
//                     onClick={() => setModalVisible(false)}
//                   >
//                     Cancel
//                   </button>
//                  </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default AddQuestionBulk;


import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useParams } from "react-router-dom";
import { getTestById, getTestForAssignment } from "../../../api/test";
import { Circles } from "react-loader-spinner";
import { assignTestAQuestionInBulk, getQuestionTypes } from "@/api/question";
import { toast, Toaster } from "react-hot-toast";
import { Checkbox } from "@mui/material";

const AddQuestionBulk = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());
  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [questionTypes, setQuestionTypes] = useState<any>([]);
  const [randomCounts, setRandomCounts] = useState<any>({});
  const [summaryModalVisible, setSummaryModalVisible] = useState(false);
  const [randomModalVisible, setRandomModalVisible] = useState(false);
  const [randomSummary, setRandomSummary] = useState<any>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const [filteredQuestions, setFilteredQuestions] = useState<any>({
    multipleChoice: [],
    singleChoice: [],
    trueFalse: [],
    essay: [],
    freeText: [],
    matching: [],
    grammar: [],
  });

  const fetchTest = async () => {
    const testData = await getTestById(id);
    if (testData.code === 200) {
      setTest(testData.data);
      setLoading(false);
    }
  };
  const handleAssignQuestions = async () => {
    setIsAssigning(true); // Start loader
    try {
      const questionIds = Array.from(selectedQuestions);
      const body = {
        testId: id,
        questionIds: questionIds,
      };
      const response = await assignTestAQuestionInBulk(body);
      if (response.code ===201 || response.code === 200) {
        toast.success("Questions assigned successfully!");
        // setSelectedQuestions(new Set());
      } else {
        toast.error("Failed to assign questions.");
      }
    } catch (error) {
      toast.error("An error occurred while assigning questions.");
    } finally {
      setIsAssigning(false); 
    }
  };

  const handleSelectAll = () => {
    if (selectedQuestions.size === questions.length) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(questions.map((q: any) => q.id)));
    }
  };

  const handleSelectTopN = (n:any) => {
    setSelectedQuestions(new Set(questions.slice(0, n).map((q:any) => q.id)));
    setModalVisible(false);
  };

  const fetchQuestionTypes = async () => {
    const data = await getQuestionTypes();
    if (data.code === 200) {
      setQuestionTypes(data.data);
      fetchQuestions(data.data);
    }
  };

  const fetchQuestions = async (questionTypes:any) => {
    try {
      const data = await getTestForAssignment(id);
      if (data.success) {
        setQuestions(data.data);

        const preSelected = new Set(
          data.data.filter((q: any) => q.assignedStatus).map((q: any) => q.id)
        );
        setSelectedQuestions(preSelected);

        console.log(questionTypes)
        const filtered:any = {
          multipleChoice: data.data.filter(
            (q: any) => q.questionTypeId === questionTypes.find((t: any) => t.questionTypeName === "Multiple Choice")?.id
            && q.MultipleChoiceQuestions?.answerSelection === "checkbox"
          ),
          singleChoice: data.data.filter(
            (q: any) =>
              q.questionTypeId === questionTypes.find((t: any) => t.questionTypeName === "Multiple Choice")?.id &&
              q.MultipleChoiceQuestions?.answerSelection === "radio"
          ),
          trueFalse: data.data.filter(
            (q: any) => q.questionTypeId === questionTypes.find((t: any) => t.questionTypeName === "True False")?.id
          ),
          essay: data.data.filter(
            (q: any) => q.questionTypeId === questionTypes.find((t: any) => t.questionTypeName === "Essay")?.id
          ),
          freeText: data.data.filter(
            (q: any) => q.questionTypeId === questionTypes.find((t: any) => t.questionTypeName === "Free Text")?.id
          ),
          matching: data.data.filter(
            (q: any) => q.questionTypeId === questionTypes.find((t: any) => t.questionTypeName === "Matching")?.id
          ),
          grammar: data.data.filter(
            (q: any) => q.questionTypeId === questionTypes.find((t: any) => t.questionTypeName === "Grammar")?.id
          ),
        };
        console.log(filtered)


        setFilteredQuestions(filtered);

        const summary:any[]=[]
        Object.keys(filtered).forEach((type) => {
         const indexes= filtered[type].filter((question:any) =>{
            return question.assignedStatus
          }).map((question:any) => question.index)

          if(indexes.length !==0){
          summary.push({
            type,
            count: indexes.length,
            indexes:indexes
          })
        }
        })

        setRandomSummary(summary);


        
        setQuestionLoading(false);
      }
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  const [selectCount, setSelectCount] = useState(10);

  const handleCheckboxChange = (questionId: any) => {
    setSelectedQuestions((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(questionId)) {
        updatedSelected.delete(questionId);
      } else {
        updatedSelected.add(questionId);
      }
      return updatedSelected;
    });
  };

  useEffect(() => {
    fetchQuestionTypes();
    fetchTest();
  }, []);

  const handleRandomSelection = () => {
    const newSelectedQuestions = new Set();
    const summary: any = [];

    Object.keys(filteredQuestions).forEach((type) => {
      console.log(filteredQuestions);
      const count = randomCounts[type] || 0;
      const questionsOfType = [...filteredQuestions[type]];
      if (count > 0) {
        const shuffledIndexes = Array.from({ length: questionsOfType.length }, (_, i) => i)
          .sort(() => Math.random() - 0.5)
          .slice(0, count);

          console.log(questionsOfType)
          console.log(shuffledIndexes)

        shuffledIndexes.forEach((index) => newSelectedQuestions.add(questionsOfType[index].id));

        summary.push({
          type,
          count,
          indexes: shuffledIndexes.map((index) => questionsOfType[index].index),
        });
      }
    });
    console.log(newSelectedQuestions);


    setSelectedQuestions(newSelectedQuestions);
    setRandomSummary(summary);
    setSummaryModalVisible(true);
  };

  return (
    <main className="flex">
      <Header name={test?.testName} page={"Add Bulk Questions"} id={id} />

      <div className="w-full mx-3 my-8">
        <Toaster />
        <div className="w-full mb-3 flex text-center justify-center md:justify-start">
          <span className="text-3xl font-semibold ">Add Bulk Questions</span>
        </div>
        {questionLoading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Circles height="80" width="80" color="#152487" ariaLabel="loading" />
          </div>
        ) : (
          <div>
            {/* Random Question Selection Modal */}
          



<div className="flex justify-between mb-4">
              <div>
                <button
                  className="px-4 py-2 bg-white text-fore border-2 border-fore rounded-lg hover:bg-fore hover:text-white"
                  onClick={handleSelectAll}
                >
                  {selectedQuestions.size === questions.length ? "Deselect All" : "Select All"}
                </button>
                <button
                  className="ml-4 px-4 py-2 bg-color1 text-white rounded-lg hover:bg-fore"
                  onClick={() => setRandomModalVisible(true)}
                >
                  Select Random
                </button>

                <button
                  className="ml-4 px-4 py-2 bg-color1 text-white rounded-lg hover:bg-fore"
                  onClick={() => setModalVisible(true)}
                >
                  Select Top N Questions
                </button>

                <button
                  className="ml-4 px-4 py-2 bg-color1 text-white rounded-lg hover:bg-fore"
                  onClick={() => setSummaryModalVisible(true)}
                >
                  Show Selection Summary
                </button>
              </div>
              <div className="mt-3">
                Selected: {selectedQuestions.size} / {questions.length}
              </div>
            </div>

            {/* Questions Table */}
            <div className="overflow-auto max-h-[63vh] border-2 border-gray-300">
              <table className="w-full border-collapse top-0 border-2 border-gray-300 table-auto">
                <thead className="sticky top-[-1px] z-[9]  bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Select</th>
                    <th className="border border-gray-300 px-4 py-2">Index</th>
                    <th className="border border-gray-300 px-4 py-2">Question</th>
                    <th className="border border-gray-300 px-4 py-2">Question Types</th>

                    <th className="border border-gray-300 px-4 py-2">Points</th>
                  </tr>
                </thead>

                {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Circles height="80" width="80" color="#152487" ariaLabel="circles-loading" />
          </div>
        ) : (
                <tbody>
                  {questions.map((question: any) => (
                    <tr
                      key={question.id}
                      className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <Checkbox className="bg-fore text-fore  z-0"
                          // type="checkbox"
                          checked={selectedQuestions.has(question.id)}
                          onChange={() => handleCheckboxChange(question.id)}
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {question.index}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <h3
                          dangerouslySetInnerHTML={{ __html: question.questionText }}
                          className="text-sm font-medium"
                        ></h3>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        
                      {questionTypes.find((questionType: any) => questionType.id === question.questionTypeId)?.questionTypeName}


                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {question.points}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
        )}
              </table>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="px-3 py-2 bg-color1 text-white rounded-lg shadow-md hover:bg-fore transition-all flex items-center"
                onClick={handleAssignQuestions}
                disabled={isAssigning} // Disable the button while loading
              >
                {isAssigning && (
                  <Circles height="20" width="20" color="#ffffff" ariaLabel="loading-spinner" />
                )}
                <span className="ml-2">
                  {isAssigning ? "Assigning..." : "Assign Questions"}
                </span>
              </button>
            </div>
          </div>

        )}

        {randomModalVisible && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[50] items-center">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-lg font-bold mb-4">Select Random Questions</h2>
      <p className="bg-gray-100 mb-5 rounded text-black/55 text-xs p-3">
        Select the number of questions for each question category.
        The system will randomly choose that number of questions from the question bank for each category.
      </p>
      <div className="grid grid-cols-2 gap-6 my-2">
        {Object.keys(filteredQuestions).map((type) => (
        filteredQuestions[type].length ?  <div key={type} className="flex flex-col">
            <label className="block mb-1 font-medium text-gray-700">
              {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="number"
              min="0"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={randomCounts[type] || ""}
              onChange={(e) =>
                setRandomCounts({
                  ...randomCounts,
                  [type]: Number(e.target.value),
                })
              }
            />
           <p className="text-xs text-black/75"> Total Questions : {filteredQuestions[type].length} </p>
          </div> : null
        ))}
      </div>
      <div className="flex justify-between mt-5">
        <button
          className="px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
          onClick={() => {
            handleRandomSelection(); // Ensure it triggers random selection logic
            setRandomModalVisible(false); // Close modal after selection
          }}
        >
          Select
        </button>
        <button
          className="px-5 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
          onClick={() => setRandomModalVisible(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
            {summaryModalVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[50] items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-4"> Selection Summary</h2>
                  <ul>
                    {randomSummary.map((typeSummary: any) => (
                      <li key={typeSummary.type} className="mb-2">
                        <strong>{typeSummary.type.charAt(0).toUpperCase() + typeSummary.type.slice(1).replace(/([A-Z])/g, " $1")}</strong>: {typeSummary.count} selected
                        <br />
                        Indexes: {typeSummary.indexes.join(", ")}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSummaryModalVisible(false)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

{modalVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-[11] items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-lg font-bold mb-4">Select Top N Questions</h2>
                  <p className="bg-gray-100 mb-5 rounded text-black/55 text-xs p-3">
                  Select the top 'n' questions from the question bank to assign to the test. <br /><br />
                  The Custom Count option allows users to specify the exact number of questions to be assigned.
        </p>
                  <div className="flex justify-around gap-x-2 mb-4">
                    {[10, 20, 30].map((n) => (
                      <button
                        key={n}
                        className="px-4 py-2 bg-color2 text-white rounded-lg hover:bg-color1"
                        onClick={() => handleSelectTopN(n)}
                      >
                        Top {n} Questions

                      </button>
                    ))}
                  </div>
                  <div className="mt-6 mb-3">
                    <label className="block mb-2">Custom Count:</label>
                    <input
                      type="number"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={selectCount}
                      onChange={(e) => setSelectCount(Number(e.target.value))}
                    />
                    </div>
                    <div className="flex justify-between mt-5">
                    <button
                      className="mt-2 px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                      onClick={() => handleSelectTopN(selectCount)}
                    >
                      Select
                    </button>
                  
                  <button
                    className="mt-2 px-5 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
                    onClick={() => setModalVisible(false)}
                  >
                    Cancel
                  </button>
                 </div>
                </div>
              </div>
            )}

      </div>
    </main>
  );
};

export default AddQuestionBulk;
