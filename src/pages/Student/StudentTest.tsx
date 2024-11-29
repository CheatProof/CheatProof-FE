import  { AppSidebar}  from "../../components/Student/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeaderStudent from "@/components/HeaderStudent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAssignedTestsByGroup } from "@/api/test-session";
import { Card, Typography } from "@mui/material";



// TabPanel component for displaying content based on the active tab


const StudentTest: React.FC = () => {
    const data:any[] = [
        {
          id: "31fdec5a-020b-4491-8336-a3d6061a77bd",
          testName: "CNN Quiz 1",
          testIntroduction: "<p>This is First Quiz for Computer Communication and Networks (CCN).</p>",
          isActive: true,
          createdBy: "1936b586-8ab5-4d61-a0f7-1402f322ba7a",
          categoryId: "88bbe0e8-3b82-4ea9-a4d3-a8bd5ed319f9",
        },
        {
          id: "50a47f8a-126c-46a1-8ea3-fc7c6063fabc",
          testName: "AI Quiz 1",
          testIntroduction: "<p>This is First Quiz for Artificial Intelligence (AI).</p>",
          isActive: true,
          createdBy: "d436b685-9cb5-4f61-b2f7-2403f352ba8a",
          categoryId: "12bce0f8-2b72-5ba9-b7d3-a9bd6ed218f9",
        },
      ];

  const {groupId} = useParams()
  const [test, setTest] = useState<any | null>(null);

  const getTest = async( )=>{
    // fetch test data from the backend here
    // return test data
    const data = await fetchAssignedTestsByGroup(groupId)
    setTest(data.data)
  }
  useEffect(() => {
    getTest()
  }, [groupId])

  return (
    <SidebarProvider>
         <AppSidebar/>
    <main className="w-full">
    <HeaderStudent />
     
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full  ">
        <div className="w-full px-3 py-4">
       <h1 className="!text-3xl !font-semibold">{test?.groupName}</h1>
        {/* <div dangerouslySetInnerHTML={{__html:test?.groupMessage}}  className="mt-4"/> */}
        {test?.AssignedTestGroups.map((quiz:any) => (
        <Card key={quiz.AssignedTests.Tests.id} className="bg-white shadow-md p-3 my-2">
          <div className="flex justify-between items-center">
            <h6  className="text-blue-500 font-bold">
              {quiz.AssignedTests.Tests.testName}
            </h6>
            <p  className="text-sm text-gray-500">
              Attempt Allowed : 0/{quiz.AssignedTests.attemptsAllowed}
            </p>
            </div>
            <div className="flex justify-between my-1">
            <div
              className="text-gray-700 mt-2"
              dangerouslySetInnerHTML={{ __html: quiz.AssignedTests.Tests.testIntroduction }}
            ></div>
            <div>
            <span className={`text-sm  p-1 px-2 rounded-full ${quiz.AssignedTests.Tests.isActive?"text-green-500 bg-green-100":"text-red-500 bg-red-100"}`}>
               {quiz.AssignedTests.Tests.isActive ? "Active" : "Inactive"}
            </span>
            </div>
            </div>
            <div className="flex justify-between items-center">
<div>
    <a href={`/student/test/${quiz.AssignedTests.Tests.id}`} className="text-white bg-blue-700 rounded px-2 py-1">
      Start Test
    </a>
  
</div>
            <div>
            <p className="text-sm text-gray-500">
              <strong>Created By:</strong> {quiz.AssignedTests.Tests.createdBy}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Category ID:</strong> {quiz.AssignedTests.Tests.categoryId}
            </p>

            </div>
            </div>
        
        </Card>
      ))}

        </div>
      </div>
    </main>
    </SidebarProvider>
  );
};

export default StudentTest;
