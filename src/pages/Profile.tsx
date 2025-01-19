import { HiOutlineSave, HiOutlineUpload, HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { InputWithLabel, Sidebar, SimpleInput } from "../components";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import profile from "../assets/user.png";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const data: any = localStorage.getItem("user");
  const user = JSON.parse(data);

  // const [inputObject, setInputObject] = useState({
  //   username: user.username,
  //   email: user.email,
  //   password: "",
  //   confirmPassword: "",
  // });

  const inputObject:any = {
    username: user.username,
    email: user.email,
    password: "",
    confirmPassword: "",
  }

  const [passwordSection, setPasswordSection] = useState(false);
  const [usernameSection, setUsernameSection] = useState(false);

  const [passwordInput, setPasswordInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [usernameInput, setUsernameInput] = useState({
    newUsername: "",
    confirmUsername: "",
  });

  const handlePasswordUpdate = async () => {
    toast.success("Password updated successfully!");
    console.log("Password update payload:", passwordInput);
  };

  const handleUsernameUpdate = async () => {
    toast.success("Username updated successfully!");
    console.log("Username update payload:", usernameInput);
  };

  return (
    <div className="h-auto border-t border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
      <Sidebar />
      <div className="dark:bg-blackPrimary bg-whiteSecondary w-full">
        <div className="dark:bg-blackPrimary bg-whiteSecondary py-10">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-800 flex justify-between items-center max-sm:flex-col max-sm:gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-7 dark:text-whiteSecondary text-blackPrimary">
                Your Profile
              </h2>
            </div>
            {/* <WhiteButton
              disabled={false}
              textSize="lg"
              width="48"
              py="2"
              text="Update profile"
              // onClick={() => toast.info("Profile update coming soon!")}
              // className="hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <HiOutlineSave className="dark:text-blackPrimary text-whiteSecondary text-xl" />
            </WhiteButton> */}
            <Button className="hover:bg-white border-fore border-2 hover:text-fore bg-fore text-white text-base font-medium py-5 px-5">
              Update Profile
            </Button>
          </div>
          <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-10">
                <div className="flex items-center gap-4">
                  <img
                    src={profile}
                    alt="Profile"
                    className="rounded-full w-20 h-20"
                  />
                  <div>
                    <p className="dark:text-whiteSecondary text-blackPrimary text-xl">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <p className="dark:text-whiteSecondary text-blackPrimary">
                      {user.Roles[0].roleName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toast("Change profile picture functionality coming soon!")}
                  className="hover:bg-white border-fore rounded-md border-2 hover:text-fore bg-fore text-white text-base font-semibold py-3 px-5 duration-200 flex items-center justify-center gap-x-2 hover:shadow-md"
                >
                  <HiOutlineUpload className="" />
                  <span className="">
                    Change profile picture
                  </span>
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-5">
                <InputWithLabel label="Your username">
                  <p className="dark:text-whiteSecondary text-blackPrimary flex items-center gap-2">
                    {inputObject.username}{" "}
                    <HiOutlineSave className="text-xl cursor-pointer hover:text-blue-500" />
                  </p>
                </InputWithLabel>
                <InputWithLabel label="Your email">
                  <p className="dark:text-whiteSecondary text-blackPrimary flex items-center gap-2">
                    {inputObject.email}{" "}
                    <HiOutlineSave className="text-xl cursor-pointer hover:text-blue-500" />
                  </p>
                </InputWithLabel>
              </div>

              {/* Collapsible Sections */}
              <div className="mt-8">
                {/* Change Password Section */}
                <div className="border-b border-gray-600 pb-4 mb-4">
                  <button
                    onClick={() => setPasswordSection(!passwordSection)}
                    className="w-full text-left text-lg font-medium dark:text-whiteSecondary text-blackPrimary flex justify-between items-center hover:underline"
                  >
                    Change Password
                    {passwordSection ? (
                      <HiOutlineChevronUp className="text-xl" />
                    ) : (
                      <HiOutlineChevronDown className="text-xl" />
                    )}
                  </button>
                  {passwordSection && (
                    <div className="mt-4">
                      <InputWithLabel label="Current Password">
                        <SimpleInput
                          type="password"
                          placeholder="Current Password"
                          value={passwordInput.currentPassword}
                          onChange={(e) =>
                            setPasswordInput({
                              ...passwordInput,
                              currentPassword: e.target.value,
                            })
                          }
                        />
                      </InputWithLabel>
                      <InputWithLabel label="New Password">
                        <SimpleInput
                          type="password"
                          placeholder="New Password"
                          value={passwordInput.newPassword}
                          onChange={(e) =>
                            setPasswordInput({
                              ...passwordInput,
                              newPassword: e.target.value,
                            })
                          }
                        />
                      </InputWithLabel>
                      <InputWithLabel label="Confirm New Password">
                        <SimpleInput
                          type="password"
                          placeholder="Confirm New Password"
                          value={passwordInput.confirmNewPassword}
                          onChange={(e) =>
                            setPasswordInput({
                              ...passwordInput,
                              confirmNewPassword: e.target.value,
                            })
                          }
                        />
                      </InputWithLabel>
                      {/* <WhiteButton
                        disabled={false}
                        textSize="lg"
                        width="48"
                        py="2"
                        text="Update Password"
                        onClick={handlePasswordUpdate}
                        // className="hover:bg-gray-200 dark:hover:bg-gray-700"
                      /> */}
                      <button onClick={handlePasswordUpdate}
                       className="hover:bg-white border-fore rounded-md border-2 hover:text-fore bg-fore text-white text-sm font-medium mt-4 py-2 px-3 duration-200 flex items-center justify-center hover:shadow-md"
                > Update Password</button>
                    </div>
                  )}
                </div>

                {/* Change Username Section */}
                <div>
                  <button
                    onClick={() => setUsernameSection(!usernameSection)}
                    className="w-full text-left text-lg font-medium dark:text-whiteSecondary text-blackPrimary flex justify-between items-center hover:underline"
                  >
                    Change Username
                    {usernameSection ? (
                      <HiOutlineChevronUp className="text-xl" />
                    ) : (
                      <HiOutlineChevronDown className="text-xl" />
                    )}
                  </button>
                  {usernameSection && (
                    <div className="mt-4">
                      <InputWithLabel label="New Username">
                        <SimpleInput
                          type="text"
                          placeholder="New Username"
                          value={usernameInput.newUsername}
                          onChange={(e) =>
                            setUsernameInput({
                              ...usernameInput,
                              newUsername: e.target.value,
                            })
                          }
                        />
                      </InputWithLabel>
                      <InputWithLabel label="Confirm Username">
                        <SimpleInput
                          type="text"
                          placeholder="Confirm Username"
                          value={usernameInput.confirmUsername}
                          onChange={(e) =>
                            setUsernameInput({
                              ...usernameInput,
                              confirmUsername: e.target.value,
                            })
                          }
                        />
                      </InputWithLabel>
                      {/* <WhiteButton
                        disabled={false}
                        textSize="lg"
                        width="48"
                        py="2"
                        text="Update Username"
                        onClick={handleUsernameUpdate}
                        // className="hover:bg-gray-200 dark:hover:bg-gray-700"
                      /> */}
                      <button onClick={handleUsernameUpdate}
                       className="hover:bg-white border-fore rounded-md border-2 hover:text-fore bg-fore text-white text-sm font-medium mt-4 py-2 px-3 duration-200 flex items-center justify-center hover:shadow-md"
                      >Update Username</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Include Toast Container */}
      {/* <div>{toast.success && <toast />}</div> */}
      <Toaster/>
    </div>
  );
};

export default Profile;
