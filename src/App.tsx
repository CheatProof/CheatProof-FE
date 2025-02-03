import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Categories,
  EditUser,
  HelpDesk,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
} from "./pages";
import { SidebarProvider } from "@/components/ui/sidebar"; // Ensure correct path
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import QuestionBank from "./pages/QuestionBank/QuestionBank";
import CreateTestManual from "./pages/Test/CreateTestManual";
import TestManage from "./pages/Test/TestManage";
import TestDashboard from "./pages/Test/TestDashboard";
import GroupTestMange from "./pages/GroupTest/GroupTestManage";
import UpdateQuestion from "./pages/QuestionBank/UpdateQuestion";
import TestQuestionView from "./pages/Test/TestEditor/TestQuestionView";
import AddQuestionTestEditor from "./pages/Test/TestEditor/AddQuestions";
import ImportQuestion from "./pages/QuestionBank/ImportQuestions";
import PreviewTestSession   from "./pages/Test/PreviewTest";
import Groups from "./pages/Group/Groups";
import GroupsManagement from "./pages/Group/GroupManagment";
import AddGroupUser from "./pages/GroupUser/AddMember";
import SelectTest from "./pages/Test/SelectTest";
import AssignTest from "./pages/Test/AssignTest";
import TestSettings from "./pages/Test/TestSettings";
import ReviewTest from "./pages/Test/ReviewTest";
import StudentDashboard from "./pages/Student/Dashboard";
import HomeLayoutStudent from "./pages/HomeLayoutStudent";
import StudentTest from "./pages/Student/StudentTest";
import TestSession from "./pages/Test/TestSession";
import TestResult from "./pages/Results/TestResult";

import HomePage from "./pages/Home";
// import ManageResults from "./pages/Results/ManageResults";
import AddMemberList from "./pages/GroupUser/AddMemberList";
import StudentResults from "./pages/Student/Results";
import ResultDetails from "./pages/Student/ResultDetails";
import AddQuestionBulk from "./pages/Test/TestEditor/AddQuestionBulk";
import ProfileStudent from "./pages/ProfileStudent";
import AddMemberByCode from "./pages/GroupUser/AddMemberByCode";
import RegistrationCodes from "./pages/GroupUser/RegistrationCode";
import TestRegistration from "./pages/Test/TestRegistration";
import TeacherResultView from "./pages/Results/TeacherResultReview";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:'test-registration',
    element: <TestRegistration />
  },
  {
    path: "/teacher-dashboard",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "selecttest",
        element: <SelectTest />,
      },
      {
        path: "assigntest",
        element: <AssignTest />,
      },
      {
        path: "testsettings",
        element: <TestSettings />,
      },
      {
        path: "reviewtest",
        element: <ReviewTest />,
      },
      {
        path: "grouptest/:id",
        element: <GroupTestMange />,
      },

      {
        path: "categories",
        element: <Categories />,
      },

      {
        path: "questionbank",
        element: <QuestionBank />,
      },
      {
        path: "questionbank/:id",
        element: <UpdateQuestion />,
      },
      {
        path: "questionbank/import",
        element: <ImportQuestion />,
      },
      {
        path: "alltests",
        element: <TestManage />,
      },
      {
        path: "test-dashboard/:id",
        element: <TestDashboard />,
      },
      
      {
        path: "test-dashboard/preview/:id",
        element: <PreviewTestSession />,
      },
      {
        path: "test/test-editor/view/:id",
        element: <TestQuestionView/>,
      },
      {
        path: "test/test-editor/question-bank/:id",
        element: <AddQuestionTestEditor/>,
      },
      {
        path: "test/test-editor/question-bulk-list/:id",
        element: <AddQuestionBulk/>,
      }
      ,
      {
        path:"allgroups",
        element:<Groups/>
      },
      {
        path:"group-management/:id",
        element:<GroupsManagement/>
      },
      {
        path:"group-add-member/:id",
        element:<AddGroupUser/>
      },
      {
        path:"group-code-user/:id",
        element:<AddMemberByCode/> 
      },
      {
        path:"group-registration-codes/:id",
        element:<RegistrationCodes /> 
      },
      {
        path:"group-add-member/new-members",
        element:<AddMemberList/>
      } 
      ,
      {
        path: "createQuestion",
        element: <CreateTestManual />,
      },
     
      {
        path: "users/:id",
        element: <EditUser />,
      },
    
      {
        path: "help-desk",
        element: <HelpDesk />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path:"group-member/test-result/:sessionId",
        element: <TeacherResultView />,
      }
    ], 
  },
  {
    path: "student-dashboard",
    element: <HomeLayoutStudent />,
    children: [

      {
        index:true,
        element: <StudentDashboard />, 
      },
      {
        path: "group-tests/:groupId",
        element: <StudentTest />,
      },
      {
        path: "results",
        element: <StudentResults />,
      },{
        path: "result-details",
        element: <ResultDetails />,
      },
     {
        path:"profile",
        element:<ProfileStudent/>
      }

    ]
      
  }
  ,{
    path: "test-session/:id",
    element: <TestSession/>,
  },
  {
    path: "result-test/:id",
    element: <HomeLayoutStudent/>,

    children:[
      {index: true,
        element:<TestResult/>
      }
    ]
  }
  
]);

function App() {
  <SidebarProvider>
  <Router>
    <Routes>
      <Route path="student-dashboard/results" element={<StudentResults />} />
    </Routes>
  </Router>
</SidebarProvider>
  return <RouterProvider router={router} />;
}

export default App;

