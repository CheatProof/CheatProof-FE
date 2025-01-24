// import { FaArrowRight } from "react-icons/fa6";
// import {
//   InputWithLabel,
//   SimpleInput,

 
// } from "../components";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { signUp } from "../api/auth";
// // import styled from "styled-components";
// import toast, { Toaster } from 'react-hot-toast';
// import CheatProof from "../assets/transCheatProof.png"


// // const StyledWhiteButton = styled(WhiteButton)<{ disabled: boolean }>`
// //   color: ${({ disabled }) => (disabled ? "palevioletred" : "black")};
// //   cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
// // `;

// const RegisterComponent = () => {
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const roleId = "aa07d85b-aecb-47b1-858e-719fc1dcf4a8"; // Pre-defined for now
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({
//     username: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const navigate = useNavigate();
  

//   const handleSubmit = async () => {
//     const newErrors: typeof errors = {
//       username: !username ? "Username is required" : "",
//       firstName: !firstName ? "First name is required" : "",
//       lastName: !lastName ? "Last name is required" : "",
//       email: !email ? "Email is required" : "",
//       password: !password ? "Password is required" : "",
//       confirmPassword: confirmPassword !== password ? "Passwords do not match" : "",
//     };

//     setErrors(newErrors);

//     // Check if there are any errors
//     if (Object.values(newErrors).some((error) => error)) {
//       return; // Don't proceed if there are validation errors
//     }

//     setLoading(true); // Start loading
//     try {
//       const body = { username, firstName, lastName, roleId, email, password };
//       const data = await signUp(body);

//       if (data.code === 201) {
//         navigate("/login");
//       } else {
//         toast.error("Registration failed. Please try again.", {
//           position: "top-center",
//           duration: 5000,
//         });
//       }
//     } catch (error) {
//       console.error("Registration failed", error);
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     // max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[800px]
//     <div className="w-full min-w-[350px] md:max-w-[740px] dark:bg-gray-900 relative bg-white border-2 rounded-xl border-fore flex flex-col justify-between items-center py-10 ">
//      <Toaster />
//      <div className="absolute top-4 left-4 flex items-center px-2">
//         <img
//           src={CheatProof} // Replace with the actual path of your logo
//           alt="Logo"
//           className="h-8 w-8 object-contain mr-2" // Adjust size of the logo
//         />
//         <h2 className="text-2xl font-bold text-fore">CheatProof</h2>
//       </div>
//       <div className="flex flex-col items-center gap-10">
        
//         <h5 className="text-4xl font-semibold dark:text-whiteSecondary text-blackPrimary max-sm:text-xl mt-20">
//           Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-color2 via-color1 to-fore ">CheatProof</span> Community!
//         </h5>
//         <h5 className="text-3xl dark:text-whiteSecondary font-semibold text-transparent bg-clip-text bg-gradient-to-r from-color2 via-color1 to-fore max-sm:text-xl">
//           Sign up
//         </h5>
        
     
//         <div className="w-full flex flex-col gap-5">
//           <InputWithLabel label="Username">
//             <SimpleInput
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             {errors.username && <p className="text-red-500">{errors.username}</p>}
//           </InputWithLabel>

//           <InputWithLabel label="First Name">
//             <SimpleInput
//               type="text"
//               placeholder="Enter your first name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//             {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
//           </InputWithLabel>

//           <InputWithLabel label="Last Name">
//             <SimpleInput
//               type="text"
//               placeholder="Enter your last name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//             {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
//           </InputWithLabel>

//           <InputWithLabel label="Email">
//             <SimpleInput
//               type="email"
//               placeholder="Enter an email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <p className="text-red-500">{errors.email}</p>}
//           </InputWithLabel>

//           <InputWithLabel label="Password">
//             <SimpleInput
//               type="password"
//               placeholder="Enter a password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {errors.password && <p className="text-red-500">{errors.password}</p>}
//           </InputWithLabel>

//           <InputWithLabel label="Confirm Password">
//             <SimpleInput
//               type="password"
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
//           </InputWithLabel>
//         </div>

//         {/* <StyledWhiteButton
//           onClick={handleSubmit}
//           textSize="lg"
//           width="full"
//           py="2"
//           text={loading ? "Registering..." : "Register now"}
//           disabled={loading} // Disable button if loading
//         /> */}
//         <button
//   onClick={handleSubmit}
//   disabled={loading}
//   className={`text-lg px-6 rounded-md py-2 text-fore font-semibold bg-white border border-fore hover:text-white hover:bg-fore
//   }`}
// >
//   {loading ? "Registering..." : "Register now"}
// </button>

//         {loading && <p className="text-blue-500">Please wait, registering...</p>}

//         <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
//           Have an account?{" "}
//           <Link
//             to="/login"
//             className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
//           >
//             Login <FaArrowRight className="mt-[2px]" />
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterComponent;



import { useState, KeyboardEvent } from "react";
import { Mail, Lock, Loader2, User, Pen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import {  signUp } from "@/api/auth";
import CheatProof from "../assets/transCheatProof.png";
import ilustration from '../assets/undraw_access-account_aydp.svg'


function App() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const roleId = "aa07d85b-aecb-47b1-858e-719fc1dcf4a8"; // Pre-defined for now
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors: typeof errors = {
      username: !username.trim()
        ? "Username is required and should not contain spaces"
        : "",
      firstName: !firstName
        ? "First name is required"
        : "",
      lastName: !lastName
        ? "Last name is required "
        : "",
      email: !email.trim()
        ? "Email is required"
        : "",
      password:
        !password.trim()
          ? "Password is required"
          : password.length < 6
          ? "Password must be at least 6 characters long"
          : "",
      confirmPassword:
        confirmPassword !== password
          ? "Passwords do not match"
          : "",
    };
  
    // Remove empty errors
    const filteredErrors:any = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value)
    );
  
    setErrors(filteredErrors);
  
    return Object.keys(filteredErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    try {
      const body = { username, firstName, lastName, roleId, email, password };
      const data = await signUp(body);
  
      if (data.code === 201) {
        toast.success("Registration successful!", {
          position: "top-center",
          duration: 3000,
        });
        navigate("/login");
      } else if (data.errors) {
        // Backend errors
        const backendErrors = data.errors.reduce((acc: any, err: any) => {
          acc[err.field] = err.message;
          return acc;
        }, {});
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...backendErrors,
        }));
        toast.error("Please fix the highlighted errors.", {
          position: "top-center",
          duration: 5000,
        });
      }else if (data.code !== 201){
        toast.error(data.message, {
          position: "top-center",
          duration: 5000,
        });
      }
       else {
        toast.error("Registration failed. Please try again.", {
          position: "top-center",
          duration: 5000,
        });
      }
    } catch (error:any) {
      console.error("Registration failed", error.message);
      // toast.error("An error occurred. Please try again later."+error.message, {
      //   position: "top-center",
      //   duration: 5000,
      // });
    } finally {
      setLoading(false); // End loading
    }
  };
    

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-center" />
      
      {/* Left Section */}
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-color1-600 rounded">
              {/* <img src={} alt="" /> */}
              <img src={CheatProof} alt="CheatProof Logo" />
            </div>
            <span className="text-xl font-semibold text-color2-900">CheatProof</span>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-color2-900">Join CheatProof Community</h2>
              <p className="mt-2 text-color2-600">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
              <div>
                  <label htmlFor="username" className="block text-sm font-medium text-color2-700">
                    Username
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 " />
                    </div>
                    <input
                      id="useranem"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.username ? 'border-red-500' : 'border-color1'
                      } rounded-md shadow-sm focus:ring-color1 focus:border-color1/75 sm:text-sm`}
                      placeholder="Enter your username"
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                    )}
                  </div>
                </div>
<div className="flex gap-2 flex-wrap lg:flex-nowrap">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-color2-700">
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Pen className="h-5 w-5 " />
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.firstName ? 'border-red-500' : 'border-color1'
                      } rounded-md shadow-sm focus:ring-color1 focus:border-color1/75 sm:text-sm`}
                      placeholder="Enter your first name"
                    />
                  
                  </div>
                  {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-color2-700">
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Pen className="h-5 w-5 " />

                    </div>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.lastName ? 'border-red-500' : 'border-color1'
                      } rounded-md shadow-sm focus:ring-color1 focus:border-color1/75 sm:text-sm`}
                      placeholder="Enter your username"
                    />
                   
                  </div>
                  {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                </div>

                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-color2-700">
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 " />
                    </div>
                    <input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.email ? 'border-red-500' : 'border-color1'
                      } rounded-md shadow-sm focus:ring-color1 focus:border-color1/75 sm:text-sm`}
                      placeholder="Enter your username"
                    />
                
                  </div>
                  {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                </div>

               
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-color1">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 " />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className={`block w-full pl-10 pr-3 py-2 border ${
                        errors.password ? 'border-red-500' : 'border-color1'
                      } rounded-md shadow-sm focus:ring-color1 focus:border-color1/75 sm:text-sm`}
                      placeholder="••••••••"
                    />
                    
                  </div>
                  {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                </div>
                <div>
                <label 
                 htmlFor="confirmPassword"
                  className="block text-sm font-medium text-color1"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 " />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.confirmPassword? 'border-red-500' : 'border-color1'
                    } rounded-md shadow-sm focus:ring-color1 focus:border-color1/75 sm:text-sm`}
                    placeholder="••••••••"
                  />
                
                </div>
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
                <div>

                </div>

              </div>

            

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-color1 hover:bg-color2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Sign Up"
                  )}
                </button>

                
              </div>
            </form>

            <p className="text-center text-sm text-color2-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-color1 hover:text-color2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="w-1/2 bg-color1 flex items-center justify-center p-8">
        <div className="relative w-full max-w-lg">
          <img
            src={ilustration}
            alt="Decorative"
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>
      </div>

    </div>
  );
}

export default App;











