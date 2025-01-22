import { AppSidebar } from "../../components/Student/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeaderStudent from "@/components/HeaderStudent";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAssignedTestsByGroup } from "@/api/test-session";
import { Footer } from "@/components";
import { Circles } from "react-loader-spinner";
import { CircularProgress } from "@mui/material";
import NotFoundImage from "@/assets/undraw_online-test_20lm.svg"

const StudentTest: React.FC = () => {
  const location = useLocation();
  const { group } = location.state;

  const { groupId } = useParams();
  const [test, setTest] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const getTest = async () => {
    setLoading(true);
    const data = await fetchAssignedTestsByGroup(groupId);
    setTest(data.data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    localStorage.removeItem('selectedAnswers');
    localStorage.removeItem('timer');
    localStorage.removeItem('currentQuestion');
    sessionStorage.removeItem('showInstructions');
    localStorage.removeItem('testStarted');
    localStorage.removeItem('tabSwitchCount');
    getTest();
  }, [groupId]);

  const countAssignedTest = (id: any) => {
    const attempts = test?.attemptsByUser?.TestSessions?.filter((session: any) => {
      return session.assignedTestId === id;
    });
    return attempts ? attempts.length : 0;
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <HeaderStudent />

        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full min-h-screen">
          <div className="w-full px-3 py-4">
            {/* <h1 className="!text-3xl !font-semibold mb-4">{group?.groupName}</h1> */}
            <div className="w-full !text-3xl  py-4   flex text-center justify-center md:justify-start ml-3 ">
        <span className="text-2xl font-semibold ">{group?.groupName} {'>'} Available Tests </span>
        </div>
            {!loading && test?.newGroup?.length === 0 ? (<div className="flex justify-center flex-col gap-2">
              <img
              src={NotFoundImage}
              alt="No Test Available"
              className="h-96 w-96 object-contain mx-auto"
            
              />

              <p className="text-center text-3xl">No Test Available</p>
              </div>):(<></>) }

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <CircularProgress />
              </div>
            ) : (
              test?.newGroup?.map((quiz: any) => (
                
                <div
                  key={quiz.AssignedTests.Tests.id}
                  className="relative bg-white block p-6 border border-gray-100 rounded-lg min-w-4xl mx-auto mt-6"
                >
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-color3 via-color2 to-color1"></span>
                 
                  <div className="flex flex-row justify-between items-center gap-x-20">
                  
                  <h2 className="text-fore text-2xl font-bold pb-2">
                    {quiz.AssignedTests.Tests.testName}
                  </h2>


                  <div className="my-4">
                        <p
                          className={`text-sm py-1 px-4 rounded-lg ${
                            quiz.AssignedTests.Tests.isActive
                              ? "text-green-500 bg-green-100"
                              : "text-red-500 bg-red-100"
                          }`}
                        >
                          {quiz.AssignedTests.Tests.isActive ? "Active" : "Inactive"}
                        </p>
                      </div>
                          </div>
                  <div className="mt-1">
                    <p
                      className="text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: quiz.AssignedTests.Tests.testIntroduction,
                      }}
                    ></p>
                  </div>


                  <div className="flex flex-row justify-between items-center gap-x-20">
                    
                    <div className="flex flex-row gap-x-8">
                      <div className="my-4">
                        <p className="text-color1 py-1 text-sm">
                          Attempts Allowed:{" "}
                          {quiz.AssignedTests.attemptsAllowed === 0
                            ? "Unlimited"
                            : quiz.AssignedTests.attemptsAllowed}
                        </p>
                        <p className="text-color1 py-1 text-sm">
                          Attempts Remaining:{" "}
                          {quiz.AssignedTests.attemptsAllowed === 0
                            ? "Unlimited"
                            : quiz.AssignedTests.attemptsAllowed -
                              countAssignedTest(quiz.assignedTestId)}
                        </p>
                      </div>

                     
                    </div>

                    
                    <div className="flex flex-col items-end gap-y-1">
                      <p className="text-sm text-gray-500">
                        <strong>Created By:</strong> {quiz.AssignedTests.Tests.Users.firstName}{" "}
                        {quiz.AssignedTests.Tests.Users.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Category:</strong> {quiz.AssignedTests.Tests.Categories.categoryName}
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    {!(
                      quiz.AssignedTests.attemptsAllowed !== 0 &&
                      countAssignedTest(quiz.assignedTestId) >= quiz.AssignedTests.attemptsAllowed
                    ) && (
                      <Link
                        to={`/test-session/${quiz.assignedTestId}`}
                        state={{ quiz: quiz }}
                        className="text-white bg-color1 hover:bg-fore rounded px-4 py-2"
                      >
                        Start Test
                      </Link>
                    )}

                    {quiz.AssignedTests.attemptsAllowed !== 0 &&
                      countAssignedTest(quiz.assignedTestId) >=
                        quiz.AssignedTests.attemptsAllowed && (
                        <span className="text-white bg-red-500 rounded px-4 py-2">
                          Zero Attempts Remaining
                        </span>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default StudentTest;

