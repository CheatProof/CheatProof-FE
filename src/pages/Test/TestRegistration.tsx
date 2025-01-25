// // import { Header } from '@/components';
// // import { useState } from 'react';

// // const TestRegistration = () => {
// //   const [formData, setFormData] = useState({
// //     firstName: '',
// //     lastName: '',
// //     username: '',
// //     password: '',
// //     confirmPassword: '',
// //     groupCode: '',
// //   });

// //   const handleInputChange = (e: any) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = (e: any) => {
// //     e.preventDefault();
// //     console.log("Form Submitted:", formData);
// //     // Perform form validation or API call
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
       
// //       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
// //         <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
// //           Register as Test Taker
// //         </h1>
// //         <form onSubmit={handleSubmit}>
// //           {/* First Name */}
// //           <div className="mb-4">
// //             <label htmlFor="firstName" className="block text-gray-600 font-medium mb-2">
// //               First Name
// //             </label>
// //             <input
// //               type="text"
// //               id="firstName"
// //               name="firstName"
// //               value={formData.firstName}
// //               onChange={handleInputChange}
// //               required
// //               className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
// //               placeholder="Enter your first name"
// //             />
// //           </div>

// //           {/* Last Name */}
// //           <div className="mb-4">
// //             <label htmlFor="lastName" className="block text-gray-600 font-medium mb-2">
// //               Last Name
// //             </label>
// //             <input
// //               type="text"
// //               id="lastName"
// //               name="lastName"
// //               value={formData.lastName}
// //               onChange={handleInputChange}
// //               required
// //               className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
// //               placeholder="Enter your last name"
// //             />
// //           </div>

// //           {/* Username */}
// //           <div className="mb-4">
// //             <label htmlFor="username" className="block text-gray-600 font-medium mb-2">
// //               Username
// //             </label>
// //             <input
// //               type="text"
// //               id="username"
// //               name="username"
// //               value={formData.username}
// //               onChange={handleInputChange}
// //               required
// //               className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
// //               placeholder="Choose a username"
// //             />
// //           </div>

// //           {/* Password */}
// //           <div className="mb-4">
// //             <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               id="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleInputChange}
// //               required
// //               className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
// //               placeholder="Create a password"
// //             />
// //           </div>

// //           {/* Confirm Password */}
// //           <div className="mb-4">
// //             <label htmlFor="confirmPassword" className="block text-gray-600 font-medium mb-2">
// //               Confirm Password
// //             </label>
// //             <input
// //               type="password"
// //               id="confirmPassword"
// //               name="confirmPassword"
// //               value={formData.confirmPassword}
// //               onChange={handleInputChange}
// //               required
// //               className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
// //               placeholder="Confirm your password"
// //             />
// //           </div>

// //           {/* Group Code */}
// //           <div className="mb-4">
// //             <label htmlFor="groupCode" className="block text-gray-600 font-medium mb-2">
// //               Group Code
// //             </label>
// //             <input
// //               type="text"
// //               id="groupCode"
// //               name="groupCode"
// //               value={formData.groupCode}
// //               onChange={handleInputChange}
// //               required
// //               className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
// //               placeholder="Enter your group code"
// //             />
// //           </div>

// //           {/* Submit Button */}
// //           <div className="mt-6">
// //             <button
// //               type="submit"
// //               className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
// //             >
// //               Register
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default TestRegistration;


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






import React from "react";
import CheatProof from "../../assets/transCheatProof.png";
import { Footer } from "@/components";

const TestRegistration = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="absolute top-14 left-2 md:top-4 md:left-4 flex items-center px-2">
        <img
          src={CheatProof} // Replace with the actual path of your logo
          alt="Logo"
          className="h-8 w-8 object-contain mr-2" // Adjust size of the logo
        />
        <h2 className="text-lg sm:text-2xl font-bold text-fore">CheatProof</h2>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-6">
        <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-6 my-8">
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Register as a Test Taker
          </h1>

          {/* Banner */}
          <div className="bg-blue-100 border border-blue-300 text-blue-700 p-4 rounded-md mb-6">
            Use this form if you have been given a registration code by your instructor to sign up.
          </div>

          {/* Form */}
          <form>
            {/* Registration Code */}
            <div className="mb-6">
              <label
                htmlFor="registrationCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Registration Code
              </label>
              <input
                type="text"
                id="registrationCode"
                name="registrationCode"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Username & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <span className="block text-xs text-gray-500 mb-1">
                  Use only numbers, letters, underscores, and maximum 1 dot (.).
                  No spaces.
                </span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <span className="block text-xs text-gray-500 mb-1">
                  Min 10 characters including 1 number, 1 letter, and 1 special
                  character.
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Email Address & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a country</option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="France">France</option>
                  <option value="Brazil">Brazil</option>
                </select>
              </div>
            </div>

            {/* Register Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full sm:w-auto bg-color1 hover:bg-fore text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register
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
