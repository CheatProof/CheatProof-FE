// import  { useState } from 'react';
// import { Button, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
// import { Add, Shuffle, Repeat, UploadFile } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const Header = ({name,page,id}:any) => {

//     const navigate = useNavigate()
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenuOpen = (event:any) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
//       {/* Exit Button */}
//       {/* <Button variant="contained" onClick={()=>navigate(-1)} className="bg-gray-600 hover:bg-gray-700">
//         Back
//       </Button> */}
//        <button onClick={()=>navigate(-1)}
//         className=" bg-color2 hover:bg-color1 text-white font-medium px-5 md:py-2 rounded-lg text-sm flex items-center"
                                                    
//          >
                                                
//                                                 Back
//                                             </button>

//       {/* Header Title */}
//       <h4 className="text-lg font-semibold">{name}</h4> / <h4 className="text-lg opacity-55 font-semibold">{page}</h4>

//       {/* Right Actions */}
//       <div className="flex items-center space-x-4">
//         {/* Add Question Button with Hover Menu */}
//         <div onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
//           {/* <Button
//             startIcon={<Add />}
//             variant="contained"
//             color="error"
//             className="hover:bg-red-700"
//           >
//             Add Question
//           </Button> */}
//           <button onClick={()=>navigate(-1)}
//         className="  bg-gray-100 hover:bg-gray-200 font-medium text-fore px-4 md:py-2 rounded-lg text-sm flex items-center"
                                                    
//          >
//                       <Add className='mr-2'/>                          
//                                                 Add Question
//                                             </button>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//             MenuListProps={{
//               onMouseLeave: handleMenuClose,
//             }}
//             PaperProps={{
//               style: {
//                 padding: '10px',
//               },
//             }}
//           >
//             <MenuItem onClick={handleMenuClose}>
//               <ListItemIcon>
//                 <Add />
//               </ListItemIcon>
//               <Typography variant="inherit">Add a new question</Typography>
//             </MenuItem>

//             <MenuItem onClick={()=>navigate(`/test/test-editor/question-bank/${id}`)}>
//               <ListItemIcon>
//                 <Repeat />
//               </ListItemIcon>
//               <Typography variant="inherit">Reuse from your question bank</Typography>
//             </MenuItem>

//             <MenuItem onClick={handleMenuClose}>
//               <ListItemIcon>
//                 <Shuffle />
//               </ListItemIcon>
//               <Typography variant="inherit">Add random questions</Typography>
//             </MenuItem>

//             <MenuItem onClick={handleMenuClose}>
//               <ListItemIcon>
//                 <UploadFile />
//               </ListItemIcon>
//               <Typography variant="inherit">Import spreadsheet (.CSV)</Typography>
//             </MenuItem>
//           </Menu>
//         </div>

//         {/* Actions Button */}
//         {/* <Button variant="contained" className="bg-gray-600 hover:bg-gray-700">
//           Actions
//         </Button> */}
//          <button 
//         className=" bg-gray-100 hover:bg-gray-200 text-fore font-medium px-5 md:py-2 rounded-lg text-sm flex items-center"
                                                    
//          >
                                               
//         Actions
//      </button>

//         {/* Eye Icon */}
//         {/* <Button variant="contained" className="bg-gray-600 hover:bg-gray-700">
//           <Add />
//         </Button> */}
//         <button 
//         className=" bg-color2 hover:bg-color1 text-white px-5 md:py-2 rounded-lg text-sm flex items-center"
                                                    
//          >   
//            <Add />
//           </button>
//       </div>
//     </div>
//   );
// };

// export default Header;



// import { useState } from "react";
// import { Button, Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
// import { Add, Shuffle, Repeat, UploadFile } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";



// const Sidebar = ({ name, page, id }: any) => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);




//   const handleMenuOpen = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
    
//     // <div className="fixed top-0 left-0 h-full w-64  text-center items-center bg-gray-800 p-4 text-white flex flex-col">
//     <div className="relative">
//     <div
//       className={`w-60  overflow-auto h-[100vh] bg-gray-800 pt-6 text-center items-center flex flex-col  text-white xl:sticky xl:top-0 xl:z-10 max-xl:fixed max-xl:top-0 max-xl:z-10 xl:translate-x-0 border-r-[1px] border-black `}
//     >
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="bg-color2 hover:bg-color1 w-24 text-white font-medium py-2 rounded-lg text-sm flex justify-center text-center items-center mb-6"
//       >
//         Back
//       </button>

//       {/* Sidebar Title */}
//       <div className="mb-6">
//         <h4 className="text-lg font-semibold">{name}</h4>
//         <h4 className="text-lg opacity-75 font-semibold">{page}</h4>
//       </div>

//       {/* Add Question Button with Hover Menu */}
//       <div className="mb-4" onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
//         <button
//           className="bg-gray-100 hover:bg-gray-200 text-fore font-medium w-40 py-2 rounded-lg text-sm flex items-center justify-center"
//         >
//           <Add className="mr-2" />
//           Add Question
//         </button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//           MenuListProps={{
//             onMouseLeave: handleMenuClose,
//           }}
//           PaperProps={{
//             style: {
//               padding: "10px",
//             },
//           }}
//         >
//           <MenuItem onClick={handleMenuClose}>
//             <ListItemIcon>
//               <Add />
//             </ListItemIcon>
//             <Typography variant="inherit">Add a new question</Typography>
//           </MenuItem>

//           <MenuItem onClick={() => navigate(`/test/test-editor/question-bank/${id}`)}>
//             <ListItemIcon>
//               <Repeat />
//             </ListItemIcon>
//             <Typography variant="inherit">Reuse from your question bank</Typography>
//           </MenuItem>

//           <MenuItem onClick={handleMenuClose}>
//             <ListItemIcon>
//               <Shuffle />
//             </ListItemIcon>
//             <Typography variant="inherit">Add random questions</Typography>
//           </MenuItem>

//           <MenuItem onClick={handleMenuClose}>
//             <ListItemIcon>
//               <UploadFile />
//             </ListItemIcon>
//             <Typography variant="inherit">Import spreadsheet (.CSV)</Typography>
//           </MenuItem>
//         </Menu>
//       </div>

//       {/* Actions Button */}
//       <button
//         className="bg-gray-100 hover:bg-gray-200 text-fore font-medium py-2 rounded-lg text-sm flex items-center w-1/2 justify-center mb-4"
//       >
//         Actions
//       </button>

//       {/* Eye Icon */}
//       <button
//         className="bg-gray-100 hover:bg-gray-200 text-fore w-1/4 font-medium py-2 rounded-lg text-sm flex items-center text-center justify-center"
//       >
//         <Add className="" />
       
//       </button>
//     </div>
    
//    </div>
//   );
// };

// export default Sidebar;



// import { useState } from "react";
// import { Button, Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
// import { Add, Shuffle, Repeat, UploadFile } from "@mui/icons-material";
// import { useNavigate, NavLink } from "react-router-dom";
// import { HiOutlineHome, HiDocumentText } from "react-icons/hi";

// // Import hooks for Redux (assuming they are correctly set up)
// import { useAppDispatch, useAppSelector } from "../hooks";
// import { setSidebar } from "../features/dashboard/dashboardSlice";

// const Sidebar = ({ name, page, id }: any) => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [isLandingOpen, setIsLandingOpen] = useState(false); // For the "Test" section dropdown

//   // CSS classes for active/inactive links
//   const navActiveClass = "flex items-center mr-6 my-2 font-medium justify-center text-center gap-4 py-1 px-6 text-fore bg-gray-200 rounded-lg";
//   const navInactiveClass = "flex item-center gap-4 py-2 px-6 font-medium text-white hover:bg-gray-700 rounded-lg";

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className="relative">
//       <div
//         className="w-60 overflow-auto h-[100vh] bg-gray-800 pt-6 text-center flex flex-col text-white xl:sticky xl:top-0 border-r-[1px] border-black"
//       >
//         {/* Back Button */}
//         <div className="mb-12">
//         <button
//           onClick={() => navigate(-1)}
//           className="hover:bg-white bg-gray-800 text-white border-2 ml-16 w-24 hover:text-fore font-semibold py-2 rounded-lg text-center text-sm flex justify-center items-center mb-6"
//         >
//           Back
//         </button>
//         </div>
//         {/* Sidebar Title */}
//         <div className="mb-6">
//           <h4 className="text-lg font-semibold">{name}</h4>
//           <h4 className="text-lg opacity-75 font-semibold">{page}</h4>
//         </div>

//         {/* Dashboard Link */}
//         {/* <NavLink
//           to="/"
//           className={({ isActive }) => (isActive ? navActiveClass : navInactiveClass)}
//         >
//           <HiOutlineHome className="text-lg" />
//           <span className="text-md font-semibold">Dashboard</span>
//         </NavLink> */}

//         {/* Test Section with Dropdown */}
//         <div
//           onClick={() => setIsLandingOpen(!isLandingOpen)}
//           className="flex items-center self-stretch gap-4 py-2 my-2 px-6 hover:bg-gray-700 cursor-pointer text-white"
//         >
//           <HiDocumentText className="text-lg" />
//           <span className="text-md font-semibold">Add Question</span>
//         </div>
//         {isLandingOpen && (
//           <div className="pl-6">
//             <NavLink
//               to="/"
//               className={({ isActive }) => (isActive ? navActiveClass : navInactiveClass)}
//             >
//               Add a new question
//             </NavLink>
//             <NavLink
//               to={`/test/test-editor/question-bank/${id}`}
//               className={({ isActive }) => (isActive ? navActiveClass : navInactiveClass)}
//             >
//               Reuse from question bank
//             </NavLink>
//             <NavLink
//               to="/categories"
//               className={({ isActive }) => (isActive ? navActiveClass : navInactiveClass)}
//             >
//               Add random questions
//             </NavLink>
//             <NavLink
//               to="/files"
//               className={({ isActive }) => (isActive ? navActiveClass : navInactiveClass)}
//             >
//               Import spreadsheet
//             </NavLink>
            


//           </div>
//         )}
//           <NavLink
//           to="/"
//           className={({ isActive }) => (isActive ? navActiveClass : navInactiveClass)}
//         >
//           <HiOutlineHome className="text-lg" />
//           <span className="text-md font-semibold">Actions</span>
//         </NavLink>

        
//         <button className="bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-800 border-2 text-white mt-8 w-1/4 text-center ml-20 font-medium py-2 my-4 rounded-lg text-sm flex items-center justify-center">
//           <Add />
//         </button> 
//         {/* Additional Buttons */}
//         {/* <button className="bg-gray-100 hover:bg-gray-200 text-black font-medium py-2 rounded-lg text-sm flex items-center w-1/2 justify-center mb-4">
//           Actions
//         </button>

//         <button className="bg-gray-100 hover:bg-gray-200 text-black font-medium py-2 rounded-lg text-sm flex items-center justify-center">
//           <Add />
//         </button> */}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;




import { useState } from "react";
import { Add } from "@mui/icons-material";
import { HiOutlineHome, HiDocumentText, HiOutlineX } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ name, page, id }: any) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar visibility
  const [isLandingOpen, setIsLandingOpen] = useState(false); // For the "Test" section dropdown

  const navActiveClass =
    "flex items-center mr-6 my-2 font-medium justify-center text-center gap-4 py-1 px-6 text-fore bg-gray-200 rounded-lg";
  const navInactiveClass =
    "flex item-center gap-4 py-2 px-6 font-medium text-white hover:bg-gray-700 rounded-lg";

  return (
    <div className="relative">
      {/* Hamburger Icon for Opening Sidebar */}
      
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 text-fore text-lg z-50 hover:text-gray-400"
        >
          ☰ 
        </button>
      )}

      {/* Sidebar Wrapper */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-60 overflow-auto h-[100vh] bg-gray-800 pt-6 text-center flex flex-col text-white xl:sticky xl:top-0 transition-transform duration-300 ease-in-out border-r-[1px] border-black fixed z-50`}
      >
        {/* Cross Icon for Collapsing Sidebar */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-white text-lg hover:text-gray-400"
        >
          <HiOutlineX />
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-white bg-gray-800 text-white border-2 ml-16 w-24 hover:text-fore font-semibold py-2 rounded-lg text-center text-sm flex justify-center items-center mb-6"
        >
          Back
        </button>

        {/* Sidebar Title */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold">{name}</h4>
          <h4 className="text-lg opacity-75 font-semibold">{page}</h4>
        </div>

        {/* Test Section with Dropdown */}
        <div
          onClick={() => setIsLandingOpen(!isLandingOpen)}
          className="flex items-center self-stretch gap-4 py-2 my-2 px-6 hover:bg-gray-700 cursor-pointer text-white"
        >
          <HiDocumentText className="text-lg" />
          <span className="text-md font-semibold">Add Question</span>
        </div>
        {isLandingOpen && (
          <div className="pl-6">
            <NavLink
              to={`/teacher-dashboard/createQuestion?testId=`}
              className={({ isActive }) =>
                isActive ? navActiveClass : navInactiveClass
              }
            >
              Add a new question
            </NavLink>
            <NavLink
              to={`/teacher-dashboard/test/test-editor/question-bank/${id}`}
              className={({ isActive }) =>
                isActive ? navActiveClass : navInactiveClass
              }
            >
              Reuse from question bank
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? navActiveClass : navInactiveClass
              }
            >
              Add random questions
            </NavLink>
            <NavLink
              to="/files"
              className={({ isActive }) =>
                isActive ? navActiveClass : navInactiveClass
              }
            >
              Import spreadsheet
            </NavLink>
          </div>
        )}

        {/* Actions Link */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? navActiveClass : navInactiveClass
          }
        >
          <HiOutlineHome className="text-lg" />
          <span className="text-md font-semibold">Actions</span>
        </NavLink>

        {/* Additional Buttons */}
        <button className="bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-800 border-2 text-white mt-8 w-1/4 text-center ml-20 font-medium py-2 my-4 rounded-lg text-sm flex items-center justify-center">
          <Add />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
