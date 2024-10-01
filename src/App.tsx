import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Categories,
  CreateUser,
  EditCategory,
  EditOrder,
  EditProduct,
  EditReview,
  EditUser,
  HelpDesk,
  HomeLayout,
  Landing,
  LandingV2,
  Login,
  Notifications,
  Orders,
  Products,
  Profile,
  Register,
  Reviews,
  Users,
} from "./pages";

import QuestionBank from "./pages/QuestionBank/QuestionBank";
import CreateTestManual from "./pages/Test/CreateTestManual";
import TestManage from "./pages/Test/TestManage";
import TestDashboard from "./pages/Test/TestDashboard";
// import MCQCard from "./components/PreviewCards/MCQCard";
import GroupTestMange from "./pages/GroupTest/GroupTestManage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },

      {
        path: "/grouptest",
        element: <GroupTestMange />,
      },

      {
        path: "/categories",
        element: <Categories />,
      },

      {
        path: "/questionbank",
        element: <QuestionBank />,
      },
      {
        path: "/alltests",
        element: <TestManage />,
      },
      {
        path: "/test/:id",
        element: <TestDashboard />,
      },
      {
        path: "/landing-v2",
        element: <LandingV2 />,
      },
      {
        path: "/createQuestion",
        element: <CreateTestManual />,
      },
      {
        path: "/products",
        element: <Products />,
      },
     
      {
        path: "/products/:id",
        element: <EditProduct />,
      },

     
      {
        path: "/categories/:id",
        element: <EditCategory />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/1",
        element: <EditOrder />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
      {
        path: "/reviews/:id",
        element: <EditReview />,
      },
    
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <EditUser />,
      },
      {
        path: "/users/create-user",
        element: <CreateUser />,
      },
      {
        path: "/help-desk",
        element: <HelpDesk />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },


    ],
    
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
