// import { FaReact } from "react-icons/fa6";
// import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
// import {
//   InputWithLabel,
//   SimpleInput,
//   ThirdPartyAuthButton,
//   WhiteButton,
// } from "../components";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { signUp } from "../api/auth";

// const RegisterComponent = () => {
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [roleId, setRoleId] = useState(""); // Assuming role selection is fixed for now
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     setRoleId("aa07d85b-aecb-47b1-858e-719fc1dcf4a8");
//     setLoading(true); // Start loading
//     try {
//       console.log("Registering with email: ", email, " and password: ", password);
//       const body = {
//         username,
//         firstName,
//         lastName,
//         roleId,
//         email,
//         password,
//       };
//       const data = await signUp(body);

//       console.log(data);
//       if (data.code === 201) {
//         // Registration successful, navigate to login
//         navigate("/login");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Registration failed", error);
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <div className="w-[500px] h-[1060px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[800px]">
//       <div className="flex flex-col items-center gap-10">
//         <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
//         <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
//           Register on the dashboard!
//         </h2>
//         <div className="flex gap-5">
//           <ThirdPartyAuthButton>
//             <FaGoogle className="text-2xl max-sm:text-xl" />
//           </ThirdPartyAuthButton>
//           <ThirdPartyAuthButton>
//             <FaGithub className="text-2xl max-sm:text-xl" />
//           </ThirdPartyAuthButton>
//         </div>

//         <p className="dark:text-gray-400 text-gray-700 text-xl max-sm:text-base">OR</p>

//         <div className="w-full flex flex-col gap-5">
//           <InputWithLabel label="Username">
//             <SimpleInput
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="First Name">
//             <SimpleInput
//               type="text"
//               placeholder="Enter your first name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Last Name">
//             <SimpleInput
//               type="text"
//               placeholder="Enter your last name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Email">
//             <SimpleInput
//               type="email"
//               placeholder="Enter an email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Password">
//             <SimpleInput
//               type="password"
//               placeholder="Enter a password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Confirm Password">
//             <SimpleInput
//               type="password"
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </InputWithLabel>
//         </div>

//         <WhiteButton
//           onClick={handleSubmit}
//           textSize="lg"
//           width="full"
//           py="2"
//           text={loading ? "Registering..." : "Register now"}
//           disabled={loading} // Disable button while loading
//         />

//         {loading && <p className="text-blue-500">Please wait, registering...</p>} {/* Optional loading message */}

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
















// import { FaReact } from "react-icons/fa6";
// import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
// import {
//   InputWithLabel,
//   SimpleInput,
//   ThirdPartyAuthButton,
//   WhiteButton,
// } from "../components";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { signUp } from "../api/auth";

// const RegisterComponent = () => {
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [roleId, setRoleId] = useState("aa07d85b-aecb-47b1-858e-719fc1dcf4a8");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Check if all fields are filled
//   const isFormComplete =
//     username &&
//     firstName &&
//     lastName &&
//     roleId &&
//     email &&
//     password &&
//     confirmPassword;

//   const handleSubmit = async () => {
//     setLoading(true); // Start loading
//     try {
//       const body = { username, firstName, lastName, roleId, email, password };
//       const data = await signUp(body);

//       if (data.code === 201) {
//         navigate("/login");
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Registration failed", error);
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   return (
//     <div className="w-[500px] h-[1060px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[800px]">
//       <div className="flex flex-col items-center gap-10">
//         <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
//         <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
//           Register on the dashboard!
//         </h2>
//         <div className="flex gap-5">
//           <ThirdPartyAuthButton>
//             <FaGoogle className="text-2xl max-sm:text-xl" />
//           </ThirdPartyAuthButton>
//           <ThirdPartyAuthButton>
//             <FaGithub className="text-2xl max-sm:text-xl" />
//           </ThirdPartyAuthButton>
//         </div>

//         <p className="dark:text-gray-400 text-gray-700 text-xl max-sm:text-base">OR</p>

//         <div className="w-full flex flex-col gap-5">
//           <InputWithLabel label="Username">
//             <SimpleInput
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="First Name">
//             <SimpleInput
//               type="text"
//               placeholder="Enter your first name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Last Name">
//             <SimpleInput
//               type="text"
//               placeholder="Enter your last name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Email">
//             <SimpleInput
//               type="email"
//               placeholder="Enter an email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Password">
//             <SimpleInput
//               type="password"
//               placeholder="Enter a password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Confirm Password">
//             <SimpleInput
//               type="password"
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </InputWithLabel>
//         </div>

//         <WhiteButton
//           onClick={handleSubmit}
//           textSize="lg"
//           width="full"
//           py="2"
//           text={loading ? "Registering..." : "Register now"}
//           disabled={loading || !isFormComplete} // Disable when form is incomplete or loading
//           style={{
//             opacity: loading || !isFormComplete ? 0.5 : 1, // Lower opacity when disabled
//             cursor: loading || !isFormComplete ? 'not-allowed' : 'pointer',
//           }}
//         />

//         {loading && <p className="text-blue-500">Please wait, registering...</p>} {/* Optional loading message */}

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



// import { FaReact } from "react-icons/fa6";
// import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
// import {
//   InputWithLabel,
//   SimpleInput,
//   ThirdPartyAuthButton,
//   WhiteButton,
// } from "../components";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { signUp } from "../api/auth";
// import styled from "styled-components";

// const StyledWhiteButton = styled(WhiteButton)<{ disabled: boolean }>`
//   color: ${({ disabled }) => (disabled ? "palevioletred" : "black")};
//   cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
// `;


// const RegisterComponent = () => {
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [roleId, setRoleId] = useState(""); // Assuming role selection is fixed for now
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     setRoleId("aa07d85b-aecb-47b1-858e-719fc1dcf4a8");
//     setLoading(true); // Start loading
//     try {
//       console.log("Registering with email: ", email, " and password: ", password);
//       const body = {
//         username,
//         firstName,
//         lastName,
//         roleId,
//         email,
//         password,
//       };
//       const data = await signUp(body);

//       console.log(data);
//       if (data.code === 201) {
//         // Registration successful, navigate to login
//         navigate("/login");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Registration failed", error);
//     } finally {
//       setLoading(false); // End loading
//     }
//   };

//   // Check if all required fields are filled and passwords match
//   const isFormValid =
//     username &&
//     firstName &&
//     lastName &&
//     email &&
//     password &&
//     confirmPassword &&
//     password === confirmPassword;

//   return (
//     <div className="w-[500px] h-[1060px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[800px]">
//       <div className="flex flex-col items-center gap-10">
//         <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
//         <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
//           Register on the dashboard!
//         </h2>
//         <div className="flex gap-5">
//           <ThirdPartyAuthButton>
//             <FaGoogle className="text-2xl max-sm:text-xl" />
//           </ThirdPartyAuthButton>
//           <ThirdPartyAuthButton>
//             <FaGithub className="text-2xl max-sm:text-xl" />
//           </ThirdPartyAuthButton>
//         </div>

//         <p className="dark:text-gray-400 text-gray-700 text-xl max-sm:text-base">OR</p>

//         <div className="w-full flex flex-col gap-5">
//           <InputWithLabel label="Username">
//             <SimpleInput
//               type="text"
//               placeholder="Enter username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="First Name">
//             <SimpleInput
//               type="text"
//               placeholder="Enter your first name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Last Name">
//             <SimpleInput
//               type="text"
//               placeholder="Enter your last name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Email">
//             <SimpleInput
//               type="email"
//               placeholder="Enter an email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Password">
//             <SimpleInput
//               type="password"
//               placeholder="Enter a password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Confirm Password">
//             <SimpleInput
//               type="password"
//               placeholder="Confirm your password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </InputWithLabel>
//         </div>

//         <StyledWhiteButton
//           onClick={handleSubmit}
//           textSize="lg"
//           width="full"
//           py="2"
//           text={loading ? "Registering..." : "Register now"}
//           disabled={!isFormValid || loading} // Disable button if form is invalid or loading
//         />

//         {loading && <p className="text-blue-500">Please wait, registering...</p>} {/* Optional loading message */}

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



import { FaReact } from "react-icons/fa6";
import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
import {
  InputWithLabel,
  SimpleInput,
  ThirdPartyAuthButton,
  WhiteButton,
} from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../api/auth";
import styled from "styled-components";
import toast, { Toaster } from 'react-hot-toast';

const StyledWhiteButton = styled(WhiteButton)<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? "palevioletred" : "black")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleId, setRoleId] = useState("aa07d85b-aecb-47b1-858e-719fc1dcf4a8"); // Pre-defined for now
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
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newErrors: typeof errors = {
      username: !username ? "Username is required" : "",
      firstName: !firstName ? "First name is required" : "",
      lastName: !lastName ? "Last name is required" : "",
      email: !email ? "Email is required" : "",
      password: !password ? "Password is required" : "",
      confirmPassword: confirmPassword !== password ? "Passwords do not match" : "",
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return; // Don't proceed if there are validation errors
    }

    setLoading(true); // Start loading
    try {
      const body = { username, firstName, lastName, roleId, email, password };
      const data = await signUp(body);

      if (data.code === 201) {
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.", {
          position: "top-center",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="w-[740px] h-[1070px] dark:bg-gray-900 relative bg-white border-2 rounded-xl border-fore flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[800px]">
     <Toaster />
     <div className="absolute top-4 left-4 flex items-center px-2">
        <img
          src="/public/transCheatProof.png" // Replace with the actual path of your logo
          alt="Logo"
          className="h-8 w-8 object-contain mr-2" // Adjust size of the logo
        />
        <h2 className="text-2xl font-bold text-fore">CheatProof</h2>
      </div>
      <div className="flex flex-col items-center gap-10">
        
        <h5 className="text-4xl font-semibold dark:text-whiteSecondary text-blackPrimary max-sm:text-xl mt-20">
          Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-color2 via-color1 to-fore ">CheatProof</span> Community!
        </h5>
        <h5 className="text-3xl dark:text-whiteSecondary font-semibold text-transparent bg-clip-text bg-gradient-to-r from-color2 via-color1 to-fore max-sm:text-xl">
          Sign up
        </h5>
        
        {/* <div className="flex gap-x-8">
          
          <button className="text-fore px-6 py-2 rounded-lg flex items-center bg-white border border-fore hover:bg-fore hover:text-white">
            <span className="font-medium text-lg mr-3">Google</span>
            <FaGoogle className="text-2xl max-sm:text-xl" />
          </button>
          
         
          <button className="text-fore px-6 py-2 rounded-lg flex items-center bg-white border border-fore hover:bg-fore hover:text-white">
          <span className="font-medium text-lg mr-3">Github</span>
            <FaGithub className="text-2xl max-sm:text-xl" />
            </button>
          
        </div>

        <p className="dark:text-gray-400 text-gray-700 text-xl max-sm:text-base">OR</p> */}

        <div className="w-full flex flex-col gap-5">
          <InputWithLabel label="Username">
            <SimpleInput
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
          </InputWithLabel>

          <InputWithLabel label="First Name">
            <SimpleInput
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </InputWithLabel>

          <InputWithLabel label="Last Name">
            <SimpleInput
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </InputWithLabel>

          <InputWithLabel label="Email">
            <SimpleInput
              type="email"
              placeholder="Enter an email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </InputWithLabel>

          <InputWithLabel label="Password">
            <SimpleInput
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </InputWithLabel>

          <InputWithLabel label="Confirm Password">
            <SimpleInput
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          </InputWithLabel>
        </div>

        {/* <StyledWhiteButton
          onClick={handleSubmit}
          textSize="lg"
          width="full"
          py="2"
          text={loading ? "Registering..." : "Register now"}
          disabled={loading} // Disable button if loading
        /> */}
        <button
  onClick={handleSubmit}
  disabled={loading}
  className={`text-lg px-6 rounded-md py-2 text-fore font-semibold bg-white border border-fore hover:text-white hover:bg-fore
  }`}
>
  {loading ? "Registering..." : "Register now"}
</button>

        {loading && <p className="text-blue-500">Please wait, registering...</p>}

        <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
          Have an account?{" "}
          <Link
            to="/login"
            className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
          >
            Login <FaArrowRight className="mt-[2px]" />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;











