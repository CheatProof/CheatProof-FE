import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import { useParams } from "react-router-dom";
import { getTestById, getTestForAssignment } from "../../../api/test";
import { Circles } from "react-loader-spinner";
import { assignTestAQuestionInBulk, getQuestionTypes } from "@/api/question";

const AddQuestionBulk = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());
  const [test, setTest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [questionTypes, setQuestionTypes] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [randomModalVisible, setRandomModalVisible] = useState(false);
  const [randomCounts, setRandomCounts] = useState<any>({});
  const [selectCount, setSelectCount] = useState(10);

  const fetchTest = async () => {
    const testData = await getTestById(id);
    if (testData.code === 200) {
      setTest(testData.data);
      setLoading(false);
    }
  };

  const fetchQuestionTypes = async () => {
    const data = await getQuestionTypes();
    if (data.code === 200) {
      setQuestionTypes(data.data);
    }
  };

  const fetchQuestionByUser = async () => {
    try {
      const data = await getTestForAssignment(id);
      if (data.success) {
        setQuestions(data.data);
        const preSelected = new Set(
          data.data.filter((q: any) => q.assignedStatus).map((q: any) => q.id)
        );
        setSelectedQuestions(preSelected);
      } else {
        console.error("Error fetching questions", data);
      }
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  useEffect(() => {
    fetchQuestionTypes();
    fetchQuestionByUser();
    fetchTest();
  }, []);

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

  const handleSelectAll = () => {
    if (selectedQuestions.size === questions.length) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(questions.map((q: any) => q.id)));
    }
  };

  const handleAssignQuestions = async () => {
    try {
      const questionIds = Array.from(selectedQuestions);
      const body = {
        testId: id,
        questionIds:questionIds,
      };
      const response = await assignTestAQuestionInBulk(body);
      if (response.success) {
        alert("Questions assigned successfully!");
        setSelectedQuestions(new Set());
      } else {
        alert("Failed to assign questions.");
      }
    } catch (error) {
      alert("An error occurred while assigning questions.");
    }
  };

  const handleRandomSelection = () => {
    const randomSelected = new Set();
    questionTypes.forEach((type: any) => {
      const typeQuestions:any = questions.filter((q: any) => q.questionTypeId === type.id);
      const count = randomCounts[type.id] || 0;
      for (let i = 0; i < count && i < typeQuestions.length; i++) {
        const randomIndex = Math.floor(Math.random() * typeQuestions.length);
        randomSelected.add(typeQuestions[randomIndex].id);
      }
    });
    setSelectedQuestions(randomSelected);
    setRandomModalVisible(false);
  };

  const handleSelectTopN = (n:any) => {
    setSelectedQuestions(new Set(questions.slice(0, n).map((q:any) => q.id)));
    setModalVisible(false);
  };



  return (
    <main className="flex">
      <Header name={test?.testName} page={"Add Bulk Questions"} id={id} />
      <div className="w-full max-w-4xl mx-auto my-8">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Circles height="80" width="80" color="#152487" ariaLabel="circles-loading" />
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <div>
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  onClick={handleSelectAll}
                >
                  {selectedQuestions.size === questions.length ? "Deselect All" : "Select All"}
                </button>
                <button
                  className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => setRandomModalVisible(true)}
                >
                  Select Random
                </button>

                <button
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => setModalVisible(true)}
                >
                  Select Top N Questions
                </button>
              </div>
              <div>
                Selected: {selectedQuestions.size} / {questions.length}
              </div>
            </div>

            <div className="overflow-auto max-h-[450px]">
              <table className="w-full border-collapse border border-gray-300 table-auto">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Select</th>
                    <th className="border border-gray-300 px-4 py-2">Index</th>
                    <th className="border border-gray-300 px-4 py-2">Question</th>
                    <th className="border border-gray-300 px-4 py-2">Question Types</th>

                    <th className="border border-gray-300 px-4 py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question: any) => (
                    <tr
                      key={question.id}
                      className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
                    >
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <input
                          type="checkbox"
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
              </table>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
                onClick={handleAssignQuestions}
              >
                Assign Questions
              </button>
            </div>

            {randomModalVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-lg font-bold mb-4">Select Random Questions</h2>
                  <div className="grid grid-cols-2 gap-6 my-2">

                  {questionTypes.map((type: any) => (
          <div key={type.id} className="flex flex-col">
            <label className="block mb-2 font-medium text-gray-700">
              {type.questionTypeName}
            </label>
            <input
              type="number"
              min="0"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={randomCounts[type.id] || ""}
              onChange={(e) =>
                setRandomCounts({
                  ...randomCounts,
                  [type.id]: Number(e.target.value),
                })
              }
            />
          </div>
        ))}
        </div>
                  <div className="flex justify-between">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      onClick={handleRandomSelection}
                    >
                      Select
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => setRandomModalVisible(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

{modalVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-lg font-bold mb-4">Select Top N Questions</h2>
                  <div className="flex justify-around">
                    {[10, 20, 30].map((n) => (
                      <button
                        key={n}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={() => handleSelectTopN(n)}
                      >
                        Top {n}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="block mb-2">Custom Count:</label>
                    <input
                      type="number"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={selectCount}
                      onChange={(e) => setSelectCount(Number(e.target.value))}
                    />
                    <button
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      onClick={() => handleSelectTopN(selectCount)}
                    >
                      Select
                    </button>
                  </div>
                  <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => setModalVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default AddQuestionBulk;
