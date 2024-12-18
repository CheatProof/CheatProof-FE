import { HiOutlineMoon, HiOutlineSun, HiOutlineLogout } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSidebar } from "../features/dashboard/dashboardSlice";
import { Link, useNavigate } from "react-router-dom";
import Profile from '../assets/user.png';
import { toggleDarkMode } from "../features/darkMode/darkModeSlice";
import Logo from "../assets/CheatProof.svg";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 dark:bg-blackPrimary bg-white shadow-md">
      <div className="flex justify-between items-center px-9 max-xl:flex-col max-[400px]:px-4">
        <HiOutlineMenu
          className="text-2xl dark:text-whiteSecondary text-blackPrimary absolute bottom-7 left-5 xl:hidden max-sm:static max-sm:order-1 cursor-pointer"
          onClick={() => dispatch(setSidebar())}
        />
        <Link className="flex items-center" to="/">
          <img className="w-[3.5rem] p-3" src={Logo} alt="Logo" />
          <span className="dark:text-whiteSecondary text-fore text-xl font-bold">CheatProof</span>
        </Link>
        <div className="flex gap-4 items-center max-xl:justify-center">
          {/* <span className="dark:text-whiteSecondary text-fore">EN</span>
          {darkMode ? (
            <HiOutlineSun
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl dark:text-whiteSecondary text-fore cursor-pointer"
            />
          ) : (
            <HiOutlineMoon
              onClick={() => dispatch(toggleDarkMode())}
              className="text-xl dark:text-whiteSecondary text-fore cursor-pointer"
            />
          )}
          <Link to="/notifications">
            <HiOutlineBell className="text-xl dark:text-whiteSecondary text-fore" />
          </Link> */}
          <Link to="/teacher-dashboard/profile">
            <div className="flex gap-2 items-center">
              <img
                src={Profile}
                alt="profile"
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <p className="dark:text-whiteSecondary text-fore text-base max-xl:text-sm">
                  {user?.username || "Guest"}
                </p>
                <p className="dark:text-whiteSecondary text-fore text-sm max-xl:text-xs">
                  {user?.Roles?.[0]?.roleName || "Role"}
                </p>
              </div>
            </div>
          </Link>
          <HiOutlineLogout
            className="text-xl dark:text-whiteSecondary text-fore cursor-pointer"
            onClick={handleLogout}
            title="Logout"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
