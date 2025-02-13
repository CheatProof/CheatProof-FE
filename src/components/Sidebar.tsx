// // import {
// //     HiLogin,
// //     HiOutlineHome,
  
// //     HiDocumentText,
// //     HiLink,
// //     HiOutlineUserGroup,
// //     HiOutlineX,
// //   } from "react-icons/hi";
  
// //   import { NavLink, useLocation } from "react-router-dom";
// //   import { useAppDispatch, useAppSelector } from "../hooks";
// //   import { setSidebar } from "../features/dashboard/dashboardSlice";
// //   import { useState, useEffect } from "react";
  
// //   const Sidebar = () => {
// //     const [openDropdown, setOpenDropdown] = useState(""); // Track which dropdown is open
// //     const { isSidebarOpen } = useAppSelector((state) => state.dashboard);
// //     const dispatch = useAppDispatch();
// //     const location = useLocation();
  
// //     const sidebarClass = isSidebarOpen ? "sidebar-open" : "sidebar-closed";
// //     const navActiveClass =
// //       "block dark:bg-whiteSecondary flex items-center self-stretch gap-4 py-2 px-6 cursor-pointer max-xl:py-3 text-white bg-slate-900 mx-1 rounded hover:bg-gray-700";
// //     const navInactiveClass =
// //       "block flex items-center self-stretch gap-4 py-2 px-6 bg-slate-900 cursor-pointer max-xl:py-3 text-white hover:bg-gray-700";
  
// //     // Ensure the active tab's dropdown is open based on the current location
// //     useEffect(() => {
// //       if (
// //         location.pathname.startsWith("/teacher-dashboard/alltests") ||
// //         location.pathname.startsWith("/teacher-dashboard/questionbank") ||
// //         location.pathname.startsWith("/teacher-dashboard/categories") ||
// //         location.pathname.startsWith("/teacher-dashboard/landing-v2") ||
// //         location.pathname.startsWith("/teacher-dashboard/createQuestion")
// //       ) {
// //         setOpenDropdown("test");
// //       } else if (location.pathname.startsWith("/teacher-dashboard/allgroups")) {
// //         setOpenDropdown("groups");
// //       } else if (
// //         location.pathname.startsWith("/login") ||
// //         location.pathname.startsWith("/register")
// //       ) {
// //         setOpenDropdown("auth");
// //       } else {
// //         setOpenDropdown("");
// //       }
// //     }, [location]);
  
// //     const handleDropdownToggle = (dropdown:any) => {
// //       setOpenDropdown((prev) => (prev === dropdown ? "" : dropdown));
// //     };
  
// //     return (
// //       <div className="relative bg-slate-900">
// //         <div
// //           className={`w-60 overflow-auto h-[100vh] bg-slate-900 pt-6 xl:top-0 xl:z-10 max-xl:fixed max-xl:top-0 max-xl:z-10 xl:translate-x-0 border-r-[1px] border-black ${sidebarClass}`}
// //         >
// //           <HiOutlineX
// //             className="dark:text-whiteSecondary text-blackPrimary text-2xl ml-auto mb-2 mr-2 cursor-pointer xl:py-3"
// //             onClick={() => dispatch(setSidebar())}
// //           />
  
// //           <div>
// //             {/* Dashboard Link */}
// //             <NavLink
// //               to="/teacher-dashboard/"
// //               className={(isActiveObj) =>
// //                 isActiveObj.isActive ? navActiveClass : navInactiveClass
// //               }
// //             >
// //               <HiOutlineHome className="text-lg" />
// //               <span className="text-md font-semibold">Dashboard</span>
// //             </NavLink>
  
// //             {/* Test Dropdown */}
// //             <div
// //               onClick={() => handleDropdownToggle("test")}
// //               className={`flex items-center self-stretch gap-4 py-2 my-2 px-6 cursor-pointer max-xl:py-3 text-whiteSecondary hover:bg-gray-700 ${
// //                 openDropdown === "test" ? "bg-gray-700 text-white" : "bg-slate-900"
// //               }`}
// //             >
// //               <HiDocumentText className="text-lg" />
// //               <span className="text-md font-semibold">Test</span>
// //             </div>
  
// //             {openDropdown === "test" && (
// //               <div>
// //                 <NavLink
// //                   to="/teacher-dashboard/alltests"
// //                   className={(isActiveObj) =>
// //                     isActiveObj.isActive ? navActiveClass : navInactiveClass
// //                   }
// //                 >
// //                   <span className="text-md font-semibold">All Test</span>
// //                 </NavLink>
// //                 <NavLink
// //                   to="/teacher-dashboard/questionbank"
// //                   className={(isActiveObj) =>
// //                     isActiveObj.isActive ? navActiveClass : navInactiveClass
// //                   }
// //                 >
// //                   <span className="text-md font-semibold">Question Bank</span>
// //                 </NavLink>
// //                 <NavLink
// //                   to="/teacher-dashboard/categories"
// //                   className={(isActiveObj) =>
// //                     isActiveObj.isActive ? navActiveClass : navInactiveClass
// //                   }
// //                 >
// //                   <span className="text-md font-semibold">Categories</span>
// //                 </NavLink>
// //               </div>
// //             )}
  
// //             {/* Links Dropdown */}
// //             <div
// //               onClick={() => handleDropdownToggle("links")}
// //               className={`flex items-center self-stretch gap-4 py-2 my-2 px-6 cursor-pointer max-xl:py-3 text-whiteSecondary hover:bg-gray-700 ${
// //                 openDropdown === "links" ? "bg-gray-700 text-white" : "bg-slate-900"
// //               }`}
// //             >
// //               <HiLink className="text-lg" />
// //               <span className="text-md font-semibold">Links</span>
// //             </div>
  
// //             {openDropdown === "links" && (
// //               <div>
// //                 <NavLink
// //                   to="/teacher-dashboard/"
// //                   className={(isActiveObj) =>
// //                     isActiveObj.isActive ? navActiveClass : navInactiveClass
// //                   }
// //                 >
// //                   <span className="text-md font-semibold">All Links</span>
// //                 </NavLink>
// //                 <NavLink
// //                   to="/teacher-dashboard/landing-v2"
// //                   className={(isActiveObj) =>
// //                     isActiveObj.isActive ? navActiveClass : navInactiveClass
// //                   }
// //                 >
// //                   <span className="text-md font-semibold">Themes</span>
// //                 </NavLink>
// //               </div>
// //             )}
  
// //             {/* Groups Dropdown */}
// //             <div
// //               onClick={() => handleDropdownToggle("groups")}
// //               className={`flex items-center self-stretch gap-4 py-2 my-2 px-6 cursor-pointer max-xl:py-3 text-whiteSecondary hover:bg-gray-700 ${
// //                 openDropdown === "groups" ? "bg-gray-700 text-white" : "bg-slate-900"
// //               }`}
// //             >
// //               <HiOutlineUserGroup className="text-lg" />
// //               <span className="text-md font-semibold">Groups</span>
// //             </div>
  
// //             {openDropdown === "groups" && (
// //               <div>
// //                 <NavLink
// //                   to="/teacher-dashboard/allgroups"
// //                   className={(isActiveObj) =>
// //                     isActiveObj.isActive ? navActiveClass : navInactiveClass
// //                   }
// //                 >
// //                   <span className="text-md font-semibold">All Groups</span>
// //                 </NavLink>
// //               </div>
// //             )}
  
// //             {/* Auth Dropdown */}
// //             <div
// //               onClick={() => handleDropdownToggle("auth")}
// //               className={`flex items-center self-stretch gap-4 py-2 my-2 px-6 cursor-pointer max-xl:py-3 text-whiteSecondary hover:bg-gray-700 ${
// //                 openDropdown === "auth" ? "bg-gray-700 text-white" : "bg-slate-900"
// //               }`}
// //             >
// //               <HiLogin className="text-lg" />
// //               <span className="text-md font-semibold">Auth</span>
// //             </div>
  
// //             {openDropdown === "auth" && (
// //               <div>
// //                 <NavLink
// //                   to="/login"
// //                   className={(isActiveObj) =>
// //                     isActiveObj.isActive ? navActiveClass : navInactiveClass
// //                   }
// //                 >
// //                   <span className="text-md font-semibold">Login</span>
// //                 </NavLink>
// //                 <NavLink
// //                   to="/register"
// //                   className={(isActiveObj) =>
// //                     isActiveObj.isActive ? navActiveClass : navInactiveClass
// //                   }
// //                 >
// //                   <span className="text-md font-semibold">Register</span>
// //                 </NavLink>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };
  
// //   export default Sidebar;

// import {
//     HiLogin,
//     HiOutlineHome,
  
//     HiDocumentText,
//     HiLink,
//     HiOutlineUserGroup,
//     HiOutlineX,
//   } from "react-icons/hi";
  
//   import { NavLink, useLocation } from "react-router-dom";
//   import { useAppDispatch, useAppSelector } from "../hooks";
//   import { setSidebar } from "../features/dashboard/dashboardSlice";
//   import { useState, useEffect } from "react";
  
//   const Sidebar = () => {
//     const [openDropdown, setOpenDropdown] = useState(""); // Track which dropdown is open
//     const { isSidebarOpen } = useAppSelector((state) => state.dashboard);
//     const dispatch = useAppDispatch();
//     const location = useLocation();
  
//     const sidebarClass = isSidebarOpen ? "sidebar-open" : "sidebar-closed";
//     const navActiveClass =
//       "block dark:bg-whiteSecondary flex items-center self-stretch gap-4 py-2 px-6 cursor-pointer max-xl:py-3 text-white bg-slate-900 mx-1 rounded hover:bg-gray-700";
//     const navInactiveClass =
//       "block flex items-center self-stretch gap-4 py-2 px-6 bg-slate-900 cursor-pointer max-xl:py-3 text-white hover:bg-gray-700";
  
//     // Ensure the active tab's dropdown is open based on the current location
//     useEffect(() => {
//       if (
//         location.pathname.startsWith("/teacher-dashboard/alltests") ||
//         location.pathname.startsWith("/teacher-dashboard/questionbank") ||
//         location.pathname.startsWith("/teacher-dashboard/categories") ||
//         location.pathname.startsWith("/teacher-dashboard/landing-v2") ||
//         location.pathname.startsWith("/teacher-dashboard/createQuestion")
//       ) {
//         setOpenDropdown("test");
//       } else if (location.pathname.startsWith("/teacher-dashboard/allgroups")) {
//         setOpenDropdown("groups");
//       } else if (
//         location.pathname.startsWith("/login") ||
//         location.pathname.startsWith("/register")
//       ) {
//         setOpenDropdown("auth");
//       } else {
//         setOpenDropdown("");
//       }
//     }, [location]);
  
//     const handleDropdownToggle = (dropdown:any) => {
//       setOpenDropdown((prev) => (prev === dropdown ? "" : dropdown));
//     };
  
//     return (
//       <div className="relative bg-slate-900">
//         <div
//           className={`w-60 overflow-auto h-[100vh] bg-slate-900 pt-6 xl:top-0 xl:z-10 max-xl:fixed max-xl:top-0 max-xl:z-10 xl:translate-x-0 border-r-[1px] border-black ${sidebarClass}`}
//         >
//           <HiOutlineX
//             className="dark:text-whiteSecondary text-blackPrimary text-2xl ml-auto mb-2 mr-2 cursor-pointer xl:py-3"
//             onClick={() => dispatch(setSidebar())}
//           />
  
//           <div>
//             {/* Dashboard Link */}
//             <NavLink
//               to="/teacher-dashboard/"
//               className={(isActiveObj) =>
//                 isActiveObj.isActive ? navActiveClass : navInactiveClass
//               }
//             >
//               <HiOutlineHome className="text-lg" />
//               <span className="text-md font-semibold">Dashboard</span>
//             </NavLink>
  
//             {/* Test Dropdown */}
//             <div
//               onClick={() => handleDropdownToggle("test")}
//               className={`flex items-center self-stretch gap-4 py-2 my-2 px-6 cursor-pointer max-xl:py-3 text-whiteSecondary hover:bg-gray-700 ${
//                 openDropdown === "test" ? "bg-gray-700 text-white" : "bg-slate-900"
//               }`}
//             >
//               <HiDocumentText className="text-lg" />
//               <span className="text-md font-semibold">Test</span>
//             </div>
  
//             {openDropdown === "test" && (
//               <div>
//                 <NavLink
//                   to="/teacher-dashboard/alltests"
//                   className={(isActiveObj) =>
//                     isActiveObj.isActive ? navActiveClass : navInactiveClass
//                   }
//                 >
//                   <span className="text-md font-semibold">All Test</span>
//                 </NavLink>
//                 <NavLink
//                   to="/teacher-dashboard/questionbank"
//                   className={(isActiveObj) =>
//                     isActiveObj.isActive ? navActiveClass : navInactiveClass
//                   }
//                 >
//                   <span className="text-md font-semibold">Question Bank</span>
//                 </NavLink>
//                 <NavLink
//                   to="/teacher-dashboard/categories"
//                   className={(isActiveObj) =>
//                     isActiveObj.isActive ? navActiveClass : navInactiveClass
//                   }
//                 >
//                   <span className="text-md font-semibold">Categories</span>
//                 </NavLink>
//               </div>
//             )}
  
//             {/* Links Dropdown */}
//             <div
//               onClick={() => handleDropdownToggle("links")}
//               className={`flex items-center self-stretch gap-4 py-2 my-2 px-6 cursor-pointer max-xl:py-3 text-whiteSecondary hover:bg-gray-700 ${
//                 openDropdown === "links" ? "bg-gray-700 text-white" : "bg-slate-900"
//               }`}
//             >
//               <HiLink className="text-lg" />
//               <span className="text-md font-semibold">Links</span>
//             </div>
  
//             {openDropdown === "links" && (
//               <div>
//                 <NavLink
//                   to="/teacher-dashboard/"
//                   className={(isActiveObj) =>
//                     isActiveObj.isActive ? navActiveClass : navInactiveClass
//                   }
//                 >
//                   <span className="text-md font-semibold">All Links</span>
//                 </NavLink>
//                 <NavLink
//                   to="/teacher-dashboard/landing-v2"
//                   className={(isActiveObj) =>
//                     isActiveObj.isActive ? navActiveClass : navInactiveClass
//                   }
//                 >
//                   <span className="text-md font-semibold">Themes</span>
//                 </NavLink>
//               </div>
//             )}
  
//             {/* Groups Dropdown */}
//             <div
//               onClick={() => handleDropdownToggle("groups")}
//               className={`flex items-center self-stretch gap-4 py-2 my-2 px-6 cursor-pointer max-xl:py-3 text-whiteSecondary hover:bg-gray-700 ${
//                 openDropdown === "groups" ? "bg-gray-700 text-white" : "bg-slate-900"
//               }`}
//             >
//               <HiOutlineUserGroup className="text-lg" />
//               <span className="text-md font-semibold">Groups</span>
//             </div>
  
//             {openDropdown === "groups" && (
//               <div>
//                 <NavLink
//                   to="/teacher-dashboard/allgroups"
//                   className={(isActiveObj) =>
//                     isActiveObj.isActive ? navActiveClass : navInactiveClass
//                   }
//                 >
//                   <span className="text-md font-semibold">All Groups</span>
//                 </NavLink>
//               </div>
//             )}
  
//             {/* Auth Dropdown */}
//             <div
//               onClick={() => handleDropdownToggle("auth")}
//               className={`flex items-center self-stretch gap-4 py-2 my-2 px-6 cursor-pointer max-xl:py-3 text-whiteSecondary hover:bg-gray-700 ${
//                 openDropdown === "auth" ? "bg-gray-700 text-white" : "bg-slate-900"
//               }`}
//             >
//               <HiLogin className="text-lg" />
//               <span className="text-md font-semibold">Auth</span>
//             </div>
  
//             {openDropdown === "auth" && (
//               <div>
//                 <NavLink
//                   to="/login"
//                   className={(isActiveObj) =>
//                     isActiveObj.isActive ? navActiveClass : navInactiveClass
//                   }
//                 >
//                   <span className="text-md font-semibold">Login</span>
//                 </NavLink>
//                 <NavLink
//                   to="/register"
//                   className={(isActiveObj) =>
//                     isActiveObj.isActive ? navActiveClass : navInactiveClass
//                   }
//                 >
//                   <span className="text-md font-semibold">Register</span>
//                 </NavLink>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default Sidebar;

import { LayoutDashboard, StickyNote, CircleHelp, Library, Users, SquareArrowOutDownRight } from "lucide-react";
import Sidebar, { MultilevelSidebarItem, SidebarItem } from "./Sidebar1";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="flex sticky top-0">
        <Sidebar to="/teacher-dashboard">
          <SidebarItem icon={<LayoutDashboard size={20} />} to="/teacher-dashboard" text="Dashboard" active={location.pathname === '/teacher-dashboard'} />
          <MultilevelSidebarItem icon={<StickyNote size={20} />} text="Tests" active={location.pathname.startsWith('/teacher-dashboard/alltests') || location.pathname.startsWith('/teacher-dashboard/questionbank') || location.pathname.startsWith('/teacher-dashboard/categories')}>
            {[
              { icon: <StickyNote size={20} />, text: "All Tests", to: '/teacher-dashboard/alltests', active: location.pathname === '/teacher-dashboard/alltests' },
              { icon: <CircleHelp size={20} />, text: "Question Bank", to: "/teacher-dashboard/questionbank", active: location.pathname === '/teacher-dashboard/questionbank' },
              { icon: <Library size={20} />, text: "Categories", to: "/teacher-dashboard/categories", active: location.pathname === '/teacher-dashboard/categories' },
            ]}
          </MultilevelSidebarItem>
          <MultilevelSidebarItem icon={<Users size={20} />} text="Groups" active={location.pathname.startsWith('/teacher-dashboard/allgroups')}>
            {[
              { icon: <Users size={20} />, text: "All Groups", to: '/teacher-dashboard/allgroups', active: location.pathname === '/teacher-dashboard/allgroups' },
              { icon: <Users size={20} />, text: "All Members", to: '/teacher-dashboard/allmembers', active: location.pathname === '/teacher-dashboard/allmembers' },
              { icon: <SquareArrowOutDownRight size={20} />, text: "Export" },
              { icon: <Library size={20} />, text: "Statistics" },
            ]}
          </MultilevelSidebarItem>

          <hr className="my-3" />
        </Sidebar>
      </div>
    </>
  );
}

export default App;
