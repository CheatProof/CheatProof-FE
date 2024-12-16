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
import ManageResults from "./pages/Results/ManageResults";



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
        element: <ManageResults />,
      },{
        path:"profile",
        element:<Profile/>
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
  return <RouterProvider router={router} />;
}

export default App;
