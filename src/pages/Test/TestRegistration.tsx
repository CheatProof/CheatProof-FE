// import React from "react";

// import CheatProof from "../../assets/transCheatProof.png"
// import { Footer } from "@/components";

// const TestRegistration = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
//       <div className="absolute top-14 left-2 md:top-4 md:left-4 flex items-center px-2">
//         <img
//           src={CheatProof} // Replace with the actual path of your logo
//           alt="Logo"
//           className="h-8 w-8 object-contain mr-2" // Adjust size of the logo
//         />
//         <h2 className="text-lg sm:text-2xl font-bold text-fore">CheatProof</h2>
//       </div>
//       <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-6 my-8">
//         {/* Heading */}
//         <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//           Register as a Test Taker
//         </h1>

//         {/* Banner */}
//         <div className="bg-blue-100 border border-blue-300 text-blue-700 p-4 rounded-md mb-6">
//           Use this form if you have been given a registration code by your instructor to sign up.
//         </div>

//         {/* Form */}
//         <form>
//           {/* Registration Code */}
//           <div className="mb-6">
//             <label htmlFor="registrationCode" className="block text-sm font-medium text-gray-700 mb-1">
//               Registration Code
//             </label>
//             <input
//               type="text"
//               id="registrationCode"
//               name="registrationCode"
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* First Name & Last Name */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           {/* Username & Password */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                 Username
//               </label>
//               <span className="block text-xs text-gray-500 mb-1">
//                 Use only numbers, letters, underscores, and maximum 1 dot (.). No spaces.
//               </span>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <span className="block text-xs text-gray-500 mb-1">
//                 Min 10 characters including 1 number, 1 letter, and 1 special character.
//               </span>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           {/* Email Address & Country */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
//                 Country
//               </label>
//               <select
//                 id="country"
//                 name="country"
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="">Select a country</option>
//                 <option value="USA">United States</option>
//                 <option value="Canada">Canada</option>
//                 <option value="UK">United Kingdom</option>
//                 <option value="Australia">Australia</option>
//                 <option value="Germany">Germany</option>
//                 <option value="India">India</option>
//                 <option value="China">China</option>
//                 <option value="Japan">Japan</option>
//                 <option value="France">France</option>
//                 <option value="Brazil">Brazil</option>
//               </select>
//             </div>
//           </div>

//           {/* Register Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="w-full sm:w-auto bg-color1 hover:bg-fore text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Register
//             </button>
//           </div>
//         </form>
        
//       </div>
     
//       <Footer />
//     </div>
    
//   );
// };

// export default TestRegistration;


















// // import React from "react";
// import { useParams } from "react-router-dom";
// import CheatProof from "../../assets/transCheatProof.png";
// import { Footer } from "@/components";
// import { addGroupMembersByCode } from "@/api/group";
// import toast from "react-hot-toast";

// const TestRegistration = () => {

// const {id} = useParams();


// const getMembersByCode = async (registrationCode: string, memberData: any, ) => {
//   try {
//     const response = await addGroupMembersByCode(registrationCode, memberData);
    
//     if (!response || response.error) {
//       toast.error("Error adding group members:", response?.error || "Unknown error");
//       return null;
//     }
    
//     return response; // Return the successful response
//   } catch (error) {
//     console.error("Error fetching members by code:", error);
//     return null;
//   }
// };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Header */}
//       <div className="absolute top-14 left-2 md:top-4 md:left-4 flex items-center px-2">
//         <img
//           src={CheatProof} // Replace with the actual path of your logo
//           alt="Logo"
//           className="h-8 w-8 object-contain mr-2" // Adjust size of the logo
//         />
//         <h2 className="text-lg sm:text-2xl font-bold text-fore">CheatProof</h2>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow flex justify-center items-center p-6">
//         <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-6 my-8">
//           {/* Heading */}
//           <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//             Register as a Test Taker
//           </h1>

//           {/* Banner */}
//           <div className="bg-blue-100 border border-blue-300 text-blue-700 p-4 rounded-md mb-6">
//             Use this form if you have been given a registration code by your instructor to sign up.
//           </div>

//           {/* Form */}
//           <form>
//             {/* Registration Code */}
//             <div className="mb-6">
//               <label
//                 htmlFor="registrationCode"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Registration Code
//               </label>
//               <input
//                 type="text"
//                 id="registrationCode"
//                 name="registrationCode"
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* First Name & Last Name */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Username & Password */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Username
//                 </label>
//                 <span className="block text-xs text-gray-500 mb-1">
//                   Use only numbers, letters, underscores, and maximum 1 dot (.).
//                   No spaces.
//                 </span>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Password
//                 </label>
//                 <span className="block text-xs text-gray-500 mb-1">
//                   Min 10 characters including 1 number, 1 letter, and 1 special
//                   character.
//                 </span>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Email Address & Country */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="country"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Country
//                 </label>
//                 <select
//                   id="country"
//                   name="country"
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="">Select a country</option>
//                   <option value="USA">United States</option>
//                   <option value="Canada">Canada</option>
//                   <option value="UK">United Kingdom</option>
//                   <option value="Australia">Australia</option>
//                   <option value="Germany">Germany</option>
//                   <option value="India">India</option>
//                   <option value="China">China</option>
//                   <option value="Japan">Japan</option>
//                   <option value="France">France</option>
//                   <option value="Brazil">Brazil</option>
//                 </select>
//               </div>
//             </div>

//             {/* Register Button */}
//             <div className="text-center">
//               <button
//               onClick={()=> getMembersByCode()}
//                 type="submit"
//                 className="w-full sm:w-auto bg-color1 hover:bg-fore text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default TestRegistration;



















// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import CheatProof from "../../assets/transCheatProof.png";
// import { Footer } from "@/components";
// import { addGroupMembersByCode } from "@/api/group";
// import toast from "react-hot-toast";
// import { CircularProgress } from "@mui/material";

// const TestRegistration = () => {
//   // const { id } = useParams();
//   const [formData, setFormData] = useState({
//     registrationCode: "",
//     firstName: "",
//     lastName: "",
//     username: "",
//     password: "",
//     email: "",
//   });

//   // Function to update state on input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent page reload

//     if (!formData.registrationCode) {
//       toast.error("Registration Code is required!");
//       return;
//     }

//     try {
//       const response = await addGroupMembersByCode(formData.registrationCode, {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         username: formData.username,
//         password: formData.password,
//         email: formData.email,
        
//       });

//       if (!response || response.error) {
//         toast.error("Error: " + (response?.error || "Unknown error"));
//         return;
//       }

//       toast.success("Registration successful!");
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Header */}
//       <div className="absolute top-14 left-2 md:top-4 md:left-4 flex items-center px-2">
//         <img src={CheatProof} alt="Logo" className="h-8 w-8 object-contain mr-2" />
//         <h2 className="text-lg sm:text-2xl font-bold text-fore">CheatProof</h2>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow flex justify-center items-center p-6">
//         <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-6 my-8">
//           <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//             Register as a Test Taker
//           </h1>

//           <div className="bg-blue-100 border border-blue-300 text-blue-700 p-4 rounded-md mb-6">
//             Use this form if you have been given a registration code by your instructor to sign up.
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit}>
//             {/* Registration Code */}
//             <div className="mb-6">
//               <label htmlFor="registrationCode" className="block text-sm font-medium text-gray-700 mb-1">
//                 Registration Code
//               </label>
//               <input
//                 type="text"
//                 id="registrationCode"
//                 name="registrationCode"
//                 value={formData.registrationCode}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             {/* First Name & Last Name */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Username & Password */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Email Address & Country */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
              
//             </div>

//             {/* Register Button */}
//             <div className="text-center">
//               <button type="submit" className="w-full sm:w-auto bg-color1 hover:bg-fore text-white font-medium py-2 px-4 rounded-md">
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default TestRegistration;









// {/* <div>
//                 <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
//                   Country
//                 </label>
//                 <select
//                   id="country"
//                   name="country"
//                   value={formData.}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   <option value="">Select a country</option>
//                   <option value="USA">United States</option>
//                   <option value="Canada">Canada</option>
//                   <option value="UK">United Kingdom</option>
//                   <option value="Australia">Australia</option>
//                 </select>
//               </div> */}
















import { useState } from "react";
// import { useParams } from "react-router-dom";
import CheatProof from "../../assets/transCheatProof.png";
import { Footer } from "@/components";
import { addGroupMembersByCode } from "@/api/group";

import { CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const TestRegistration = () => {
  const [formData, setFormData] = useState({
    registrationCode: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false); 

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault(); // Prevent page reload

    if (!formData.registrationCode) {
      toast.error("Registration Code is required!");
      return;
    }

    setLoading(true); // Show loader

    try {
      const response = await addGroupMembersByCode(formData.registrationCode, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });

      // if (!response || response.error) {
      //   toast.error("Error: " + (response?.error || "Unknown error"));
      // } else {
      //   toast.success("Registration successful!");
      // }
      if (response?.code === 200 || response?.code === 201 ) {
        toast.success("Registration successful!");
      } else {
        toast.error("Error: " + (response?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Hide loader after response
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
       <Toaster />
      {/* Header */}
      <div className="absolute top-14 left-2 md:top-4 md:left-4 flex items-center px-2">
        <img src={CheatProof} alt="Logo" className="h-8 w-8 object-contain mr-2" />
        <h2 className="text-lg sm:text-2xl font-bold text-fore">CheatProof</h2>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-6">
        <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-6 my-8">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Register as a Test Taker
          </h1>

          <div className="bg-blue-100 border border-blue-300 text-blue-700 p-4 rounded-md mb-6">
            Use this form if you have been given a registration code by your instructor to sign up.
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="registrationCode" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Code
              </label>
              <input
                type="text"
                id="registrationCode"
                name="registrationCode"
                value={formData.registrationCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Register Button with Loader */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full sm:w-auto bg-color1 hover:bg-fore text-white font-medium py-2 px-4 rounded-md flex justify-center items-center"
                disabled={loading} // Disable button when loading
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestRegistration;
