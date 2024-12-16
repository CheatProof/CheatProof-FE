import  { AppSidebar}  from "../../components/Student/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import HeaderStudent from "@/components/HeaderStudent";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAssignedTestsByGroup } from "@/api/test-session";
import { Card } from "@mui/material";
import { Footer } from "@/components";



// TabPanel component for displaying content based on the active tab


const StudentTest: React.FC = () => {
  const location = useLocation()
  const {group}=location.state

  const {groupId} = useParams()
  const [test, setTest] = useState<any | null>(null);

  const getTest = async( )=>{
    // fetch test data from the backend here
    // return test data
    const data = await fetchAssignedTestsByGroup(groupId)
    setTest(data.data)
    // setTest(data) // update the state with the fetched data
    console.log(data)
  } 
  useEffect(() => {
    getTest()
  }, [groupId])

  return (
    <SidebarProvider>
         <AppSidebar/>
    <main className="w-full">
    <HeaderStudent />
     
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full h ">
        <div className="w-full px-3 py-4">
       <h1 className="!text-3xl !font-semibold">{group?.groupName}</h1>
        {/* <div dangerouslySetInnerHTML={{__html:test?.groupMessage}}  className="mt-4"/> */}
        {test?.newGroup?.map((quiz:any) => (
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
    <Link to={`/test-session/${quiz.assignedTestId}`}
       state={{
         quiz: quiz,
       }}
      className="text-white bg-blue-700 rounded px-2 py-1">
      Start Test
    </Link>
  
</div>
            <div>
            <p className="text-sm text-gray-500">
              <strong>Created By:</strong> {quiz.AssignedTests.Tests.Users.firstName + " " + quiz.AssignedTests.Tests.Users.lastName}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Category ID:</strong> {quiz.AssignedTests.Tests.Categories.categoryName}
            </p>

            </div>
            </div>
        
        </Card>
      ))}

        </div>
      </div>
      <Footer />
    </main>
    </SidebarProvider>
  );
};

export default StudentTest;
