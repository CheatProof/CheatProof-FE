// import { Sidebar } from "../../components";


// const AssignTest = () => {


//   return (
//     <>
//       <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
//         <Sidebar />
//         <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
//           <div className="w-full pl-3">
//             {/* add code here */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AssignTest;


import { Sidebar } from "../../components";
import { useNavigate } from 'react-router-dom';
import { FaUserGroup } from "react-icons/fa6";
const AssignTest = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="h-auto border-t dark:border-blackSecondary border-blackSecondary border-1 flex dark:bg-blackPrimary bg-whiteSecondary">
        <Sidebar />
        <div className="dark:bg-blackPrimary bg-whiteSecondary w-full pt-6 pl-9 max-sm:pt-6 max-sm:pl-5 flex max-[1700px]:flex-wrap gap-x-10 max-[400px]:pl-2">
          <div className="w-full pl-3">
            {/* Add code here */}
            <div className="flex flex-col gap-6">
              {/* Header Steps */}
              <div className="flex items-center justify-center">
                <div className="flex gap-6 items-center text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">1</div>
                    <span className="hover:cursor-pointer" onClick={() => navigate('/selecttest')}>Select Test</span>
                  </div>
                  <hr className="border-gray-400 w-8" />
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">2</div>
                    <span>Assign</span>
                  </div>
                  <hr className="border-gray-400 w-8" />
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">3</div>
                    <span>Test settings</span>
                  </div>
                  <hr className="border-gray-400 w-8" />
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 text-blackSecondary dark:text-white rounded-full flex items-center justify-center font-medium">4</div>
                    <span>Review</span>
                  </div>
                </div>
              </div>

              {/* Page Title */}
              <div className="text-xl mt-6 font-semibold text-gray-900 dark:text-white text-center">
                How do you want to give your Test?
              </div>

              {/* Test Name */}
              <div className="text-center text-gray-700 dark:text-gray-300">
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h10m-7 4h7" />
                  </svg>
                  test1
                </span>
              </div>

             
                {/* Send to Group Card */}
                {/* <div className="bg-gray-100 dark:bg-gray-800 p-6 h-[400px] rounded-lg w-[400px] flex flex-col items-center shadow-md">
                  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5l7 7H9m13 1a9 9 0 11-6-8.63" />
                    </svg>
                    
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Send to a Group</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 mb-4">User registration required</p>
                  <div className="bg-green-100 text-green-600 text-sm rounded-lg p-2 mt-2 mb-4 text-center">
                    You can Save and Review Test Results given via Groups with a Free Account.
                  </div>
                  <button className="bg-blue-500 text-white px-6 mt-6 py-2 rounded-lg font-semibold">
                    Send to a Group
                  </button>
                </div> */}
 {/* Assignment Options */}
 <div className="flex justify-center gap-6 mt-6">
<div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg w-[400px] flex flex-col items-start shadow-md">
  {/* Icon */}
  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4 self-center">
    <svg
      className="w-6 h-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.5l7 7H9m13 1a9 9 0 11-6-8.63"
      />
    </svg>
  </div>
  {/* Title */}
  <h3 className="text-lg font-semibold mb-2 self-center">Send to a Group</h3>
  {/* Subtitle */}
  <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 mb-4 self-center">
    User registration required
  </p>
  {/* Info Box */}
  <div className="bg-green-100 text-green-600 text-sm rounded-lg p-2 mt-2 mb-4 text-center w-full">
    You can Save and Review Test Results given via Groups with a Free Account.
  </div>
  {/* Section 1: Select Groups */}
  <div className="text-gray-800 dark:text-gray-200 text-sm w-full">
    <h4 className="font-medium mb-2">1. Select Groups</h4>
    <div className="flex items-center gap-2 mb-2">
      <input type="checkbox" id="group1" className="h-4 w-4 text-blue-500 border-gray-300 rounded" />
      <label htmlFor="group1" className="text-gray-700 dark:text-gray-300">
        group1
      </label>
    </div>
    <button className="text-blue-500 text-sm underline">+ Create new Group</button>
  </div>
  {/* Section 2: Pre-set Settings */}
  <div className="text-gray-800 dark:text-gray-200 text-sm w-full mt-6">
    <h4 className="font-medium mb-2">
      2. Pre-set settings
      <span className="ml-2 text-gray-400 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 8.75h1.5M11.25 12h1.5m-6 7.25v-6c0-.966.784-1.75 1.75-1.75h8.5c.966 0 1.75.784 1.75 1.75v6m-12 0h12M9.5 4.75h5m-5 0C9.086 3.5 8.216 3 7.25 3H4.75C3.784 3 3 3.784 3 4.75v14.5c0 .966.784 1.75 1.75 1.75h14.5c.966 0 1.75-.784 1.75-1.75V4.75c0-.966-.784-1.75-1.75-1.75h-2.5c-.966 0-1.836.5-2.25 1.25z"
          />
        </svg>
      </span>
    </h4>
    <button className="text-blue-500 text-sm underline">Select from existing settings</button>
    <p className="text-gray-500 dark:text-gray-400 mt-1">Using default settings at present</p>
  </div>
  {/* Next Button */}
  <button className="bg-blue-500 text-white px-6 py-2 mt-6 rounded-lg font-semibold self-center"  onClick={() => navigate('/testsettings')}>
    Next
  </button>
</div>



                {/* Send a Link Card */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg w-[400px] flex flex-col items-center shadow-md">
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3m-3 7v6m7-3v6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Send a Link</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 mt-2">No user registration</p>
                  <div className="bg-red-100 text-red-600 text-sm rounded-lg p-2 mt-2 mb-4 text-center">
                    You cannot Save or Review Test Results given via Links with a Free Account. Upgrade.
                  </div>
                  <button className="bg-green-500 text-white mt-6 px-6 py-2 rounded-lg font-semibold">
                    Send a Link
                  </button>
                </div>
              </div>
            </div>
            {/* End of added code */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignTest;


