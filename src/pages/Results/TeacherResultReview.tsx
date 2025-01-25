import { Footer, Header, Sidebar } from "@/components";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTestResultsTestSessionId } from "@/api/test-session";
import ResultQuestionCard from "@/components/Question/ResultQuestionCard";

const TeacherResultView = () => {
  const { sessionId } = useParams();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const location = useLocation();
  const { user } = location?.state || {};

  const fetchResult = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTestResultsTestSessionId(sessionId);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <main className="w-full">
        <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
      </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (!result  || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 font-semibold">No data available to display.</p>
      </div>
    );
  }

  return (
    <div className="h-auto border-t  dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <main className="w-full">
        <Header />

        <div className="w-full px-3 py-4 mt-5 flex text-center justify-center md:justify-start ">
          <span className="text-xl opacity-85 font-semibold">{location?.state?.groupName} {'>'}  Result {'>'} {location?.state?.testName || "Unknown Test"}</span>
        </div>

        <div className="flex justify-center items-center mt-5 mb-5">
          <div className="bg-white shadow-lg w-full rounded-lg p-6 max-w-4xl h-4/5 mx-auto">
            {/* Header Section */}
            <div className="border-b pb-4 mb-4">
              <h1 className="text-xl font-semibold text-fore">
                {user?.firstName + " " + user?.lastName || "Unknown User"}
              </h1>
              <p className="text-color2 text-sm">{location?.state?.testName || "No Test Name Available"}</p>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-2 gap-6 items-center">
              {/* Score Details */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-color1">
                  <strong>Points:</strong> {result?.obtainedPoints || 0} / {result?.totalPoints || 0}
                </p>
                <p className="text-sm font-medium text-color1">
                  <strong>Duration:</strong> {result?.duration ? new Date(result.duration).toISOString().substr(11, 8) : "N/A"}
                </p>
                <p className="text-sm font-medium text-color1">
                  <strong>Time started:</strong> {result?.dateStarted ? new Date(result.dateStarted).toLocaleString() : "N/A"}
                </p>
                <p className="text-sm font-medium text-color1">
                  <strong>Time finished:</strong> {result?.dateFinished ? new Date(result.dateFinished).toLocaleString() : "N/A"}
                </p>
              </div>

              {/* Percentage Circle */}
              <div className="flex justify-center items-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-300 stroke-current"
                      strokeWidth="4"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-fore stroke-current"
                      strokeWidth="4"
                      strokeDasharray={`${((result?.obtainedPoints / result?.totalPoints) * 100 || 0).toFixed(2)}, 100`}
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold tcolor1">{((result?.obtainedPoints / result?.totalPoints) * 100 || 0).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="mt-10 bg-blue-100 p-4 rounded-md">
              <p className="text-fore font-medium">Test is Finished.</p>
              <p className="text-fore text-sm">Your answers have been saved for review.</p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
        {
            result.allQuestions.map((question:any,index:any)=>{
                // const answers=JSON.parse(question.userAnswers)
               return (
            <div key={question.question.id}>
                <ResultQuestionCard question={question.question}  userAnswers={question.userAnswer} idx={index} correctQuestions={result.correctQuestions}/>
            </div>)})
        }
      </div>
        <Footer />

      </main>
    </div>
  );
};

export default TeacherResultView;
