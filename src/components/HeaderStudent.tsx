import {  HiOutlineLogout } from "react-icons/hi";

import { useAppDispatch, useAppSelector } from "../hooks";
import { Link, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";
import Profile from "../assets/user.png";

const HeaderStudent = () => {

  const navigate = useNavigate();


  // Safely parse user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 dark:bg-blackPrimary bg-white shadow-md">
      <div className="flex justify-between items-center px-9 py-2 max-xl:flex-col max-xl:gap-y-7 max-[400px]:px-4">
        <SidebarTrigger />

        <div className="flex gap-4 items-center max-xl:justify-center">
          <Link to="/student-dashboard/profile">
            <div className="flex gap-2 items-center">
              <img
                src={Profile}
                alt="profile"
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <p className="dark:text-whiteSecondary text-blackPrimary text-base max-xl:text-sm">
                  {user?.username || "Guest"}
                </p>
                <p className="dark:text-whiteSecondary text-blackPrimary text-sm max-xl:text-xs">
                  {user?.Roles?.[0]?.roleName || "Role"}
                </p>
              </div>
            </div>
          </Link>
          <HiOutlineLogout
            className="text-xl dark:text-whiteSecondary text-blackPrimary cursor-pointer"
            onClick={handleLogout}
            title="Logout"
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderStudent;
