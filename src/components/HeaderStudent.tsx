import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
// import SearchInput from "./SearchInput";
import { toggleDarkMode } from "../features/darkMode/darkModeSlice";
// import Logo from "../assets/CheatProof.svg";
import { SidebarTrigger } from "./ui/sidebar";
import Profile from '../assets/user.png';
const HeaderStudent = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const user:any= localStorage.getItem("user");
  console.log(user)

  return (
    <header className="sticky top-0 z-50 dark:bg-blackPrimary bg-white shadow-md">
      <div className="flex justify-between items-center px-9 py-2 max-xl:flex-col max-xl:gap-y-7 max-[400px]:px-4">
        
        
    <SidebarTrigger/>
       
        {/* <SearchInput /> */}
        <div className="flex gap-4 items-center max-xl:justify-center">
          <span className="dark:text-whiteSecondary text-blackPrimary">EN</span>
          {darkMode ? (
            <HiOutlineSun
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl dark:text-whiteSecondary text-blackPrimary cursor-pointer"
            />
          ) : (
            <HiOutlineMoon
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl dark:text-whiteSecondary text-blackPrimary cursor-pointer"
            />
          )}
          <Link to="/notifications">
            <HiOutlineBell className="text-xl dark:text-whiteSecondary text-blackPrimary" />
          </Link>
          <Link to="/profile">
            <div className="flex gap-2 items-center">
              <img
                src={Profile}
                alt="profile"
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <p className="dark:text-whiteSecondary text-blackPrimary text-base max-xl:text-sm">
                  {JSON.parse(user).username}
                </p>
                <p className="dark:text-whiteSecondary text-blackPrimary text-sm max-xl:text-xs">
                {JSON.parse(user).Roles[0].roleName}

                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default HeaderStudent;
