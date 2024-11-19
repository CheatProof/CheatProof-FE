import { HiLogin, HiOutlineHome, HiUserGroup, HiDocumentText, HiLink, HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { HiOutlineX } from "react-icons/hi";
import { setSidebar } from "../features/dashboard/dashboardSlice";

import { MdVerifiedUser } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isLandingOpen, setIsLandingOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isSidebarOpen } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  // Determine the sidebar class based on isSidebarOpen
  const sidebarClass: string = isSidebarOpen
    ? "sidebar-open"
    : "sidebar-closed";

  const navActiveClass: string =
    "block dark:bg-whiteSecondary flex items-center self-stretch gap-4 py-2 px-6 cursor-pointer max-xl:py-3 dark:text-blackPrimary bg-blue-200 mx-3 rounded text-blackPrimary";
  const navInactiveClass: string =
    "block flex items-center self-stretch gap-4 py-2 px-6 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-3 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary";

  return (
    <div className="relative">
      <div
        className={`w-52 h-[100vh] dark:bg-blackPrimary bg-whiteSecondary pt-6 xl:sticky xl:top-0 xl:z-10 max-xl:fixed max-xl:top-0 max-xl:z-10 xl:translate-x-0 border-r-[1px] border-black ${sidebarClass}`}
      >
        <HiOutlineX
          className="dark:text-whiteSecondary text-blackPrimary text-2xl ml-auto mb-2 mr-2 cursor-pointer xl:py-3"
          onClick={() => dispatch(setSidebar())}
        />
        <div>

        <NavLink
            to="/"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineHome className="text-lg" />
            <span className="text-md font-semibold">Dashboard</span>
        </NavLink>


          <div
            onClick={() => setIsLandingOpen(() => !isLandingOpen)}
            className="flex items-center self-stretch gap-4 py-2 my-2 px-6 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-3 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary"
          >
            <HiDocumentText className="text-lg" />
            <span className="text-md font-semibold">Test</span>
          </div>


          {isLandingOpen && (
            <div>
              <NavLink
                to="/alltests"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">All Test</span>
              </NavLink>


              <NavLink
                to="/questionbank"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Question Bank</span>
              </NavLink>

              <NavLink
                to="/categories"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Categories</span>
              </NavLink>


              <NavLink
                to="/landing-v2"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Files</span>
              </NavLink>


              <NavLink
                to="/landing-v2"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Certificates</span>
              </NavLink>

              <NavLink
                to="/createQuestion"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Certificates</span>
              </NavLink>
            </div>
          )}

          {/* <NavLink
            to="/products"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          > */}
            {/* <HiOutlineDevicePhoneMobile className="text-lg" />
            <span className="text-md">Links</span>
          </NavLink>
          <NavLink
            to="/categories"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          > */}


              <span className="text-xs text-gray-500 pl-6 py-3">GIVE YOUR TEST</span>


             <div
            onClick={() => setIsLinksOpen(() => !isLinksOpen)}
            className="flex items-center self-stretch gap-4 py-2 my-2 px-6 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-3 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary"
          >
            <HiLink className="text-lg" />
            <span className="text-md font-semibold">Links</span>
          </div>


{isLinksOpen && (
            <div>
              <NavLink
                to="/"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">All Links</span>
              </NavLink>

              <NavLink
                to="/landing-v2"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Themes</span>
              </NavLink>


              <NavLink
                to="/landing-v2"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Access Links</span>
              </NavLink>


              <NavLink
                to="/landing-v2"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Export</span>
              </NavLink>


              <NavLink
                to="/landing-v2"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Statistics</span>
              </NavLink>
            </div>
          )}



          {/* <NavLink  to="/orders"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }>
            <HiOutlineTag className="text-lg" />
          <span className="text-md">Groups</span>

         
          </NavLink> */}


<div
            onClick={() => setIsGroupsOpen(() => !isGroupsOpen)}
            className="flex items-center self-stretch gap-4 py-2 my-2 px-6 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-3 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary"
          >
            <HiOutlineUserGroup className="text-lg" />
            <span className="text-md font-semibold">Groups</span>
          </div>
            

          {isGroupsOpen && (
            <div>
              <NavLink
                to="/allgroups"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">All Groups</span>
              </NavLink>

              <NavLink
                to="/landing-v2"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Export</span>
              </NavLink>


              <NavLink
                to="/landing-v2"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <span className="text-lg" />
                <span className="text-md font-semibold">Statistics</span>
              </NavLink>

                </div>
          )}

          {/* </NavLink> */}
          {/* <NavLink
           to="/orders"
           className={(isActiveObj) =>
             isActiveObj.isActive ? navActiveClass : navInactiveClass
           }>
            
            </NavLink> */}




            {/* <HiOutlineTruck className="text-lg" />
            <span className="text-md">Orders</span>
          </NavLink>
          <NavLink
            to="/users"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          > */}
            {/* <HiOutlineUser className="text-lg" />
            <span className="text-md">Users</span>
          </NavLink>
          <NavLink
            to="/reviews"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          > */}
            {/* <HiOutlineStar className="text-lg" />
            <span className="text-md">Reviews</span> */}
          

          <div
            onClick={() => setIsAuthOpen(() => !isAuthOpen)}
            className="flex items-center self-stretch gap-4 py-2 my-2 px-6 dark:bg-blackPrimary dark:hover:bg-blackSecondary cursor-pointer max-xl:py-3 dark:text-whiteSecondary hover:bg-white text-blackPrimary bg-whiteSecondary"
          >
            <MdVerifiedUser className="text-lg" />
            <span className="text-md font-semibold">Auth</span>
          </div>
          {isAuthOpen && (
            <div>
              <NavLink
                to="/login"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiLogin className="text-lg" />
                <span className="text-md font-semibold">Login</span>
              </NavLink>
              <NavLink
                to="/register"
                className={(isActiveObj) =>
                  isActiveObj.isActive ? navActiveClass : navInactiveClass
                }
              >
                <HiUserGroup className="text-lg" />
                <span className="text-md font-semibold">Register</span>
              </NavLink>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 border-1 border-t dark:border-blackSecondary border-blackSecondary w-full">
          <NavLink
            to="/help-desk"
            className={(isActiveObj) =>
              isActiveObj.isActive ? navActiveClass : navInactiveClass
            }
          >
            <HiOutlineInformationCircle className="text-md" />
            <span className="text-sm">Help Desk</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
