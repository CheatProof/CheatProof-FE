import {  HiOutlineUpload, HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { Footer, InputWithLabel, SimpleInput } from "../components";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import profile from "../assets/user.png";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Student/Sidebar";
import HeaderStudent from "@/components/HeaderStudent";
import { updatePassword, updateUsername } from "@/api/auth";

const ProfileStudent = () => {
  const data: any = localStorage.getItem("user");
  const user = JSON.parse(data);

  // const [inputObject, setInputObject] = useState({
  //   username: user.username,
  //   email: user.email,
  //   password: "",
  //   confirmPassword: "",
  // });



  const [passwordSection, setPasswordSection] = useState(false);
  const [usernameSection, setUsernameSection] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingUsername, setLoadingUsername] = useState(false);

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

    if (passwordInput.currentPassword === "" || passwordInput.newPassword === "" || passwordInput.confirmNewPassword === "") {
      toast.error("All fields are required!");
      return;
    }
    if (passwordInput.newPassword!== passwordInput.confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoadingPassword(true);
    const body:any ={
      password: passwordInput.currentPassword,
      newPassword: passwordInput.newPassword,
    }

    const response = await updatePassword(body)
    if(response.code === 200){


      toast.success("Password updated successfully!");
      setPasswordInput({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setPasswordSection(false);
      setLoadingPassword(false);
    } else {
      const error = response?.errors.map((error:any) => error.msg)
      error.join("\n");
      toast.error(`${response.message} \n
        ${error?error:""}`);
      setLoadingPassword(false);
    }
   
  };

  const handleUsernameUpdate = async () => {
    if (usernameInput.newUsername === "" || usernameInput.confirmUsername === "") {
      toast.error("All fields are required!");
      return;
    }
    if (usernameInput.newUsername!== usernameInput.confirmUsername) {
      toast.error("Usernames do not match!");
      return;
    }
    setLoadingUsername(true);
    const body:any ={
      username: usernameInput.newUsername,
    }
    const response = await updateUsername(body)
    if(response.code === 200){
     localStorage.setItem("user", JSON.stringify({...user,username:usernameInput.newUsername}))

      toast.success("Username updated successfully!");
      setUsernameInput({
        newUsername: "",
        confirmUsername: "",
      });
      setUsernameSection(false);
      setLoadingUsername(false);
    } else {
      const error:any = response?.errors.map((error:any) => error.msg)
      if(error){
      error.join("\n");
      toast.error(`${response.message} \n
        ${error?error:""}`);
      }
      if(response.code === 401){
        toast.error(response.message);
      }
      setLoadingUsername(false);
    }
  }

  return (
    <SidebarProvider>
    <AppSidebar />
<main className="w-full bg-gray-100">
<HeaderStudent />
<div className="py-10">
          <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Your Profile</h2>
              <Button className="bg-color1 hover:bg-color2 text-white px-4 py-2 rounded-lg">
                Update Profile
              </Button>
            </div>

            {/* Profile Header */}
            <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
              <img src={profile} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              <div>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {user.firstName + " " + user.lastName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.Roles[0].roleName}</p>
              </div>
              <button
                onClick={() => toast("Change profile picture functionality coming soon!")}
                className="ml-auto bg-color1 hover:bg-color2 text-white text-sm font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <HiOutlineUpload />
                Change Picture
              </button>
            </div>

            {/* Information Section */}
            <div className="mt-6">
              <div className="flex flex-col gap-4">
                <InputWithLabel label="Your Username">
                  <p className="text-gray-800 dark:text-gray-200">{user.username}</p>
                </InputWithLabel>
                <InputWithLabel label="Your Email">
                  <p className="text-gray-800 dark:text-gray-200">{user.email}</p>
                </InputWithLabel>
              </div>
            </div>

            {/* Change Password Section */}
            <div className="mt-8">
              <button
                onClick={() => setPasswordSection(!passwordSection)}
                className="w-full text-left text-lg font-medium text-gray-800 dark:text-gray-200 flex justify-between items-center"
              >
                Change Password
                {passwordSection ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
              </button>
              {passwordSection && (
                <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <InputWithLabel label="Current Password">
                    <SimpleInput
                      type="password"
                      placeholder="Enter current password"
                      value={passwordInput.currentPassword}
                      onChange={(e) =>
                        setPasswordInput({ ...passwordInput, currentPassword: e.target.value })
                      }
                    />
                  </InputWithLabel>
                  <InputWithLabel label="New Password">
                    <SimpleInput
                      type="password"
                      placeholder="Enter new password"
                      value={passwordInput.newPassword}
                      onChange={(e) =>
                        setPasswordInput({ ...passwordInput, newPassword: e.target.value })
                      }
                    />
                  </InputWithLabel>
                  <InputWithLabel label="Confirm New Password">
                    <SimpleInput
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordInput.confirmNewPassword}
                      onChange={(e) =>
                        setPasswordInput({ ...passwordInput, confirmNewPassword: e.target.value })
                      }
                    />
                  </InputWithLabel>
                  <button
                    onClick={handlePasswordUpdate}
                    disabled={loadingPassword}
                    className="mt-4 w-full bg-color1 hover:bg-color2 text-white py-2 rounded-lg"
                  >
                    {loadingPassword ? "Changing..." : "Update Password"}
                  </button>
                </div>
              )}
            </div>

            {/* Change Username Section */}
            <div className="mt-8">
              <button
                onClick={() => setUsernameSection(!usernameSection)}
                className="w-full text-left text-lg font-medium text-gray-800 dark:text-gray-200 flex justify-between items-center"
              >
                Change Username
                {usernameSection ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
              </button>
              {usernameSection && (
                <div className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <InputWithLabel label="New Username">
                    <SimpleInput
                      type="text"
                      placeholder="Enter new username"
                      value={usernameInput.newUsername}
                      onChange={(e) =>
                        setUsernameInput({ ...usernameInput, newUsername: e.target.value })
                      }
                    />
                  </InputWithLabel>
                  <InputWithLabel label="Confirm New Username">
                    <SimpleInput
                      type="text"
                      placeholder="Confirm new username"
                      value={usernameInput.confirmUsername}
                      onChange={(e) =>
                        setUsernameInput({ ...usernameInput, confirmUsername: e.target.value })
                      }
                    />
                  </InputWithLabel>
                  <button
                    onClick={handleUsernameUpdate}
                    disabled={loadingUsername}
                    className="mt-4 w-full bg-color1 hover:bg-color2 text-white py-2 rounded-lg"
                  >
                    {loadingUsername ? "Changing..." : "Update Username"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      {/* Include Toast Container */}
      {/* <div>{toast.success && <toast />}</div> */}
      <Footer/>
      </main>
      <Toaster/>
      
    </SidebarProvider>
  );
};

export default ProfileStudent;
