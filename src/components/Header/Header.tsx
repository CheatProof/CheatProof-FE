import { useState, useEffect } from "react";
// import { Add } from "@mui/icons-material";
import { HiOutlineHome, HiDocumentText, HiOutlineX } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ name, page, id }: any) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar visibility
  const [isLandingOpen, setIsLandingOpen] = useState(false); // For the "Test" section dropdown


  // Responsive Sidebar Initialization
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1400) {
        setIsSidebarOpen(true); // lg screens or larger => sidebar closed initially
      } else {
        setIsSidebarOpen(false); // smaller screens => sidebar open initially
      }
    };

    handleResize(); // Set the initial state on component mount
    window.addEventListener("resize", handleResize); // Listen for window resizing

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navActiveClass =
    "flex items-center my-2 font-medium justify-center text-center gap-4 py-2  text-fore bg-gray-200 rounded-lg";
  const navInactiveClass =
    "flex item-center gap-4 py-2 px-6 font-medium text-white hover:bg-gray-700 rounded-lg";

  return (
    <div className="relative">
       {/* Hamburger Icon for Opening Sidebar  */}
      
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="top-4 left-4 justify-center absolute text-fore text-lg font-semibold z-50 hover:text-gray-400"
        >
         ☰ 
        </button>
      )}

      {/* Sidebar Wrapper */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-60 overflow-auto h-[100vh] bg-gray-800 pt-6 text-center flex flex-col text-white xl:sticky xl:top-0 transition-transform duration-300 ease-in-out border-r-[1px] border-black fixed z-50`}
      >
        {/* Cross Icon for Collapsing Sidebar */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-white text-lg hover:text-gray-400"
        >
          <HiOutlineX />
        </button>

       

        {/* Sidebar Title */}
        <div className="mb-3 mt-6">
          <h4 className="text-lg font-semibold">{name}</h4>
          <h4 className="text-lg opacity-75 font-semibold">{page}</h4>
        </div>

         {/* Back Button */}
         <div onClick={() => navigate(-1)} 
         className="flex items-center self-stretch py-2 my-2 pl-6 hover:bg-gray-700 cursor-pointer text-white">
         <IoMdArrowRoundBack className="text-lg "/>
         <span
          
          // className="hover:cursor-pointer bg-gray-800 text-white flex mt-4 font-semibold py-2 rounded-lg text-base mb-5"
       className="text-base font-semibold pl-2"
       >
          
          Back
        </span>
        </div>
        {/* Test Section with Dropdown */}
        <div
          onClick={() => setIsLandingOpen(!isLandingOpen)}
          className="flex items-center self-stretch py-2 my-2 pl-6 hover:bg-gray-700 cursor-pointer text-white"
        >
          <HiDocumentText className="text-lg" />
          <span className="text-base font-semibold pl-2">Add Question</span>
        </div>
        {isLandingOpen && (
          <div className="pl-3 text-sm text-left">
            <NavLink
              to={`/teacher-dashboard/createQuestion?testId=`}
              className={({ isActive }) =>
                isActive ? navActiveClass : navInactiveClass
              }
            >
              Add a new question
            </NavLink>
            <NavLink
              to={`/teacher-dashboard/test/test-editor/question-bank/${id}`}
              className={({ isActive }) =>
                isActive ? navActiveClass : navInactiveClass
              }
            >
              Reuse from question bank
            </NavLink>
            <NavLink
              to={`/teacher-dashboard/test/test-editor/question-bulk-list/${id}`}
              className={({ isActive }) =>
                isActive ? navActiveClass : navInactiveClass
              }
            >
              Add random questions
            </NavLink>
            <NavLink
              to="/files"
              className={({ isActive }) =>
                isActive ? navActiveClass : navInactiveClass
              }
            >
              Import spreadsheet
            </NavLink>
          </div>
        )}

        {/* Actions Link */}
        <div className="">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? navActiveClass : navInactiveClass
          }
        >
          <HiOutlineHome className="text-lg" />
          <span className="text-base font-semibold">Actions</span>
        </NavLink>
          </div>
        {/* Additional Buttons */}
        {/* <button className="bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-800 border-2 text-white mt-8 w-1/4 text-center ml-20 font-medium py-2 my-4 rounded-lg text-sm flex items-center justify-center">
          <Add />
        </button> */}
      </div>
    </div>
  );
};

export default Sidebar;
