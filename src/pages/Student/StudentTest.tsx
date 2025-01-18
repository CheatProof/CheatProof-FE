// import  { AppSidebar}  from "../../components/Student/Sidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import HeaderStudent from "@/components/HeaderStudent";
// import { Link, useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchAssignedTestsByGroup } from "@/api/test-session";
// import { Card } from "@mui/material";
// import { Footer } from "@/components";
// import { Circles } from "react-loader-spinner";


// // TabPanel component for displaying content based on the active tab


// const StudentTest: React.FC = () => {
//   const location = useLocation()
//   const {group}=location.state

//   const {groupId} = useParams()
//   const [test, setTest] = useState<any | null>(null);
//   const [loading, setLoading] = useState(false);

//   const getTest = async( )=>{
//     setLoading(true)
//     // fetch test data from the backend here
//     // return test data
//     const data = await fetchAssignedTestsByGroup(groupId)
//     setTest(data.data)
//     // setTest(data) // update the state with the fetched data
//     setLoading(false)  
//     console.log(data)
//   } 
//   useEffect(() => {
//     getTest()
//   }, [groupId])

//   const countAssignedTest = (id:any)=>{
//     const attempts = test.attemptsByUser.TestSessions.filter((session:any)=>{return session.assignedTestId === id})
//     return attempts.length
//   }

//   return (
//     <SidebarProvider>
//          <AppSidebar/>
//     <main className="w-full">
//     <HeaderStudent />
     
//       <div className="dark:bg-blackPrimary bg-whiteSecondary w-full min-h-screen  ">
//         <div className="w-full px-3 py-4">
//        <h1 className="!text-3xl !font-semibold">{group?.groupName}</h1>
//         {/* <div dangerouslySetInnerHTML={{__html:test?.groupMessage}}  className="mt-4"/> */}
//         {loading ? (
//                             <div className="flex justify-center items-center h-40">
//                               <Circles height="80" width="80" color="#152487" ariaLabel="loading" />
//                             </div>
//                           ) : (
//         {test?.newGroup?.map((quiz:any) => (
//         <Card key={quiz.AssignedTests.Tests.id} className="bg-white shadow-md p-3 my-2">
//           <div className="flex justify-between items-center">
//             <h6  className="text-blue-500 font-bold">
//               {quiz.AssignedTests.Tests.testName}
//             </h6>
//             <p  className="text-sm text-gray-500">
//               Attempt Allowed : {countAssignedTest(quiz.assignedTestId)}/{quiz.AssignedTests.attemptsAllowed}
//             </p>
//             </div>
//             <div className="flex justify-between my-1">
//             <div
//               className="text-gray-700 mt-2"
//               dangerouslySetInnerHTML={{ __html: quiz.AssignedTests.Tests.testIntroduction }}
//             ></div>
//             <div>
//             <span className={`text-sm  p-1 px-2 rounded-full ${quiz.AssignedTests.Tests.isActive?"text-green-500 bg-green-100":"text-red-500 bg-red-100"}`}>
//                {quiz.AssignedTests.Tests.isActive ? "Active" : "Inactive"}
//             </span>
//             </div>
//             </div>
//             <div className="flex justify-between items-center">
// <div>
// { !(countAssignedTest(quiz.assignedTestId)  >= quiz.AssignedTests.attemptsAllowed)  &&   <Link to={`/test-session/${quiz.assignedTestId}`}
//        state={{
//          quiz: quiz,
//        }}
//       className="text-white bg-blue-700 rounded px-2 py-1">
//       Start Test
//     </Link>}

//     { (countAssignedTest(quiz.assignedTestId)  >= quiz.AssignedTests.attemptsAllowed)  &&   <span
//       className="text-white bg-red-400 rounded px-2 py-1">
//       zero Attempts Remaining
//     </span>}

//      {!quiz.AssignedTests.Tests.isActive && <p className="text-sm text-gray-500">Quiz is not active yet.</p>}
  
// </div>
//             <div>
//             <p className="text-sm text-gray-500">
//               <strong>Created By:</strong> {quiz.AssignedTests.Tests.Users.firstName + " " + quiz.AssignedTests.Tests.Users.lastName}
//             </p>
//             <p className="text-sm text-gray-500">
//               <strong>Category ID:</strong> {quiz.AssignedTests.Tests.Categories.categoryName}
//             </p>

//             </div>
//             </div>
        
//         </Card>
//       ))}
//     )}
//         </div>
//       </div>
//       <Footer />
//     </main>
//     </SidebarProvider>
//   );
// };

// export default StudentTest;



// import { AppSidebar } from "../../components/Student/Sidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import HeaderStudent from "@/components/HeaderStudent";
// import { Link, useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchAssignedTestsByGroup } from "@/api/test-session";
// import { Card } from "@mui/material";
// import { Footer } from "@/components";
// import { Circles } from "react-loader-spinner";

// const StudentTest: React.FC = () => {
//   const location = useLocation();
//   const { group } = location.state;

//   const { groupId } = useParams();
//   const [test, setTest] = useState<any | null>(null);
//   const [loading, setLoading] = useState(false);

//   const getTest = async () => {
//     setLoading(true);
//     const data = await fetchAssignedTestsByGroup(groupId);
//     setTest(data.data);
//     setLoading(false);
//     console.log(data);
//   };

//   useEffect(() => {
//     getTest();
//   }, [groupId]);

//   const countAssignedTest = (id: any) => {
//     const attempts = test?.attemptsByUser?.TestSessions?.filter((session: any) => {
//       return session.assignedTestId === id;
//     });
//     return attempts ? attempts.length : 0;
//   };

//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main className="w-full">
//         <HeaderStudent />

//         <div className="dark:bg-blackPrimary bg-whiteSecondary w-full min-h-screen">
//           <div className="w-full px-3 py-4">
//             <h1 className="!text-3xl !font-semibold">{group?.groupName}</h1>

//             {loading ? (
//               <div className="flex justify-center items-center h-40">
//                 <Circles height="80" width="80" color="#152487" ariaLabel="loading" />
//               </div>
//             ) : (
//               test?.newGroup?.map((quiz: any) => (
//                 <Card key={quiz.AssignedTests.Tests.id} className="bg-white shadow-md p-3 my-2">
//                   <div className="flex justify-between items-center">
//                     <h6 className="text-blue-500 font-bold">
//                       {quiz.AssignedTests.Tests.testName}
//                     </h6>
//                     <p className="text-sm text-gray-500">
//                       Attempt Allowed: {countAssignedTest(quiz.assignedTestId)}/{
//                         quiz.AssignedTests.attemptsAllowed
//                       }
//                     </p>
//                   </div>
//                   <div className="flex justify-between my-1">
//                     <div
//                       className="text-gray-700 mt-2"
//                       dangerouslySetInnerHTML={{
//                         __html: quiz.AssignedTests.Tests.testIntroduction,
//                       }}
//                     ></div>
//                     <div>
//                       <span
//                         className={`text-sm p-1 px-2 rounded-full ${
//                           quiz.AssignedTests.Tests.isActive
//                             ? "text-green-500 bg-green-100"
//                             : "text-red-500 bg-red-100"
//                         }`}
//                       >
//                         {quiz.AssignedTests.Tests.isActive ? "Active" : "Inactive"}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       {!(
//                         countAssignedTest(quiz.assignedTestId) >=
//                         quiz.AssignedTests.attemptsAllowed
//                       ) && (
//                         <Link
//                           to={`/test-session/${quiz.assignedTestId}`}
//                           state={{ quiz: quiz }}
//                           className="text-white bg-blue-700 rounded px-2 py-1"
//                         >
//                           Start Test
//                         </Link>
//                       )}

//                       {countAssignedTest(quiz.assignedTestId) >=
//                         quiz.AssignedTests.attemptsAllowed && (
//                         <span className="text-white bg-red-400 rounded px-2 py-1">
//                           Zero Attempts Remaining
//                         </span>
//                       )}

//                       {!quiz.AssignedTests.Tests.isActive && (
//                         <p className="text-sm text-gray-500">Quiz is not active yet.</p>
//                       )}
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">
//                         <strong>Created By:</strong> {" "}
//                         {quiz.AssignedTests.Tests.Users.firstName +
//                           " " +
//                           quiz.AssignedTests.Tests.Users.lastName}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         <strong>Category ID:</strong> {" "}
//                         {quiz.AssignedTests.Tests.Categories.categoryName}
//                       </p>
//                     </div>
//                   </div>
//                 </Card>
//               ))
//             )}
//           </div>
//         </div>
//         <Footer />
//       </main>
//     </SidebarProvider>
//   );
// };

// export default StudentTest;



import { AppSidebar } from "../../components/Student/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeaderStudent from "@/components/HeaderStudent";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAssignedTestsByGroup } from "@/api/test-session";
import { Card } from "@mui/material";
import { Footer } from "@/components";
import { Circles } from "react-loader-spinner";

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
            <h1 className="!text-3xl !font-semibold">{group?.groupName}</h1>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Circles height="80" width="80" color="#152487" ariaLabel="loading" />
              </div>
            ) : (
              test?.newGroup?.map((quiz: any) => (
                <Card key={quiz.AssignedTests.Tests.id} className="bg-white shadow-md p-3 my-2">
                  <div className="flex justify-between items-center">
                    <h6 className="text-blue-500 font-bold">
                      {quiz.AssignedTests.Tests.testName}
                    </h6>
                    <p className="text-sm text-gray-500">
                      Attempt Allowed: {countAssignedTest(quiz.assignedTestId)}/
                      {quiz.AssignedTests.attemptsAllowed === 0
                        ? "Unlimited"
                        : quiz.AssignedTests.attemptsAllowed}
                    </p>
                  </div>
                  <div className="flex justify-between my-1">
                    <div
                      className="text-gray-700 mt-2"
                      dangerouslySetInnerHTML={{
                        __html: quiz.AssignedTests.Tests.testIntroduction,
                      }}
                    ></div>
                    <div>
                      <span
                        className={`text-sm p-1 px-2 rounded-full ${
                          quiz.AssignedTests.Tests.isActive
                            ? "text-green-500 bg-green-100"
                            : "text-red-500 bg-red-100"
                        }`}
                      >
                        {quiz.AssignedTests.Tests.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      {!(
                        quiz.AssignedTests.attemptsAllowed !== 0 &&
                        countAssignedTest(quiz.assignedTestId) >= quiz.AssignedTests.attemptsAllowed
                      ) && (
                        <Link
                          to={`/test-session/${quiz.assignedTestId}`}
                          state={{ quiz: quiz }}
                          className="text-white bg-blue-700 rounded px-2 py-1"
                        >
                          Start Test
                        </Link>
                      )}

                      {quiz.AssignedTests.attemptsAllowed !== 0 &&
                        countAssignedTest(quiz.assignedTestId) >=
                          quiz.AssignedTests.attemptsAllowed && (
                          <span className="text-white bg-red-400 rounded px-2 py-1">
                            Zero Attempts Remaining
                          </span>
                        )}

                      {!quiz.AssignedTests.Tests.isActive && (
                        <p className="text-sm text-gray-500">Quiz is not active yet.</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        <strong>Created By:</strong>{" "}
                        {quiz.AssignedTests.Tests.Users.firstName +
                          " " +
                          quiz.AssignedTests.Tests.Users.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Category ID:</strong>{" "}
                        {quiz.AssignedTests.Tests.Categories.categoryName}
                      </p>
                    </div>
                  </div>
                </Card>
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

