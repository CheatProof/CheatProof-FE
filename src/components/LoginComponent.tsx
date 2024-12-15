


// import { useState } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
// import { FaReact } from "react-icons/fa6"; 
// import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
// import { InputWithLabel, SimpleInput, ThirdPartyAuthButton, WhiteButton } from "../components";
// import { Link, useNavigate } from "react-router-dom";
// import { signIn } from "../api/auth";
// // import { baseUrl } from "../env/Env";

// const LoginComponent = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("john@email.com");
//   const [password, setPassword] = useState("pass1234567890");
//   const [loading, setLoading] = useState(false);
//   const [openForgotPassword, setOpenForgotPassword] = useState(false);
//   const [openOTPDialog, setOpenOTPDialog] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [resetEmail, setResetEmail] = useState("");  // To store the email entered during forgot password

//   // Handle login
//   const handleSubmit = async () => {
//     setLoading(true); 
//     try {
//       const body = { email, password };
//       const data = await signIn(body);
//       if(data.code == 200){
//         localStorage.setItem('token',data.data.token);
//         localStorage.setItem('user',JSON.stringify(data.data.user));
//         navigate("/");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleSendOTP = async () => {
//     setLoading(true); 
//     try {
//       const body = { email};
//       const data = await signIn(body);
//       if(data.code == 200){
//         localStorage.setItem('token',data.data.token);
//         localStorage.setItem('user',JSON.stringify(data.data.user));
//         navigate("/");
//       } else {
//         alert("Invalid Email");
//       }
//     } catch (error) {
//       console.error("Reset Password failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleResetPassword = async () => {
//     setLoading(true); 
//     try {
//       const body = { email, otp, newPassword };
//       const data = await signIn(body);
//       if(data.code == 200){
//         localStorage.setItem('token',data.data.token);
//         localStorage.setItem('user',JSON.stringify(data.data.user));
//         navigate("/");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Reset Password failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };



//   // Open Forgot Password Popup
//   const handleForgotPassword = () => {
//     setOpenForgotPassword(true);
//   };

//   // Handle sending OTP
//   // const handleSendOTP = () => {
//   //   // Simulate sending OTP
//   //   console.log(`OTP sent to ${resetEmail}`);
//   //   setOpenForgotPassword(false);
//   //   setOpenOTPDialog(true);
//   // };

//   // Handle OTP Verification and Password Reset
//   // const handleResetPassword = () => {
//   //   console.log(`Resetting password for ${resetEmail}, OTP: ${otp}, New Password: ${newPassword}`);
//   //   setOpenOTPDialog(false);
//   // };

//   return (
//     <div className="w-[500px] h-[750px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
//       <div className="flex flex-col items-center gap-10">
//         <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
//         <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
//           Welcome to the dashboard!
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
//           <InputWithLabel label="Email">
//             <SimpleInput
//               type="email"
//               placeholder="Enter an email..."
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Password">
//             <SimpleInput
//               type="password"
//               placeholder="Enter a password..."
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </InputWithLabel>
//         </div>
        
//         {/* Forgot Password Link */}
//         <p 
//           className="dark:text-gray-400 text-gray-700 text-base dark:hover:text-gray-300 hover:text-gray-600 cursor-pointer transition-colors max-sm:text-sm"
//           onClick={handleForgotPassword}
//         >
//           Forgot password?
//         </p>

//         <WhiteButton
//           onClick={handleSubmit}
//           disabled={loading}
//           textSize="lg"
//           width="full"
//           py="2"
//           text={loading ? "Logging in..." : "Login now"} 
//         />

//         {loading && (
//           <p className="dark:text-gray-400 text-gray-700 text-base mt-2">Processing your login...</p>
//         )}

//         <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
//           Not registered yet?{" "}
//           <Link
//             to="/register"
//             className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
//           >
//             Register <FaArrowRight className="mt-[2px]" />
//           </Link>
//         </p>
//       </div>

//       {/* Forgot Password Dialog */}
//       {/* <Dialog open={openForgotPassword} onClose={() => setOpenForgotPassword(false)}
//          sx={{
         
          
          
//         }}>
//         <DialogTitle>Forgot Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Enter your email"
//             value={resetEmail}
//             onChange={(e) => setResetEmail(e.target.value)}
//             margin="normal"
//           />
//         </DialogContent> */}
//         <Dialog 
//   open={openForgotPassword} 
//   onClose={() => setOpenForgotPassword(false)}
//   fullWidth={true}  // Makes the dialog use the full width of its container
//   maxWidth="md"     // Sets the maximum width of the dialog to 'md' (medium) - can be 'xs', 'sm', 'md', 'lg', 'xl'
//   sx={{ 
//     '& .MuiDialog-paper': {
//       minHeight: '100px',  // Sets minimum height
//       maxHeight: '400px',  // Sets maximum height
//       minWidth: '300px',   // Sets minimum width
//       maxWidth: '500px',   // Sets maximum width
//     }
//   }}
// >
//   <DialogTitle>Forgot Password</DialogTitle>
//   <DialogContent>
//     <TextField
//       fullWidth
//       label="Enter your email"
//       value={resetEmail}
//       onChange={(e) => setResetEmail(e.target.value)}
//       margin="normal"
//     />
//   </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSendOTP} variant="contained"  sx={{
//             alignItems: "center",
//             justifyContent: "center",
//             margin: "auto",
          
//         }}>Send OTP</Button>
//         </DialogActions>
//       </Dialog>

//       {/* OTP Verification and Password Reset Dialog */}
//       <Dialog open={openOTPDialog} onClose={() => setOpenOTPDialog(false)}>
//         <DialogTitle>Reset Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Email"
//             value={resetEmail}
//             margin="normal"
//             disabled
//           />
//           <TextField
//             fullWidth
//             label="OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="New Password"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleResetPassword} variant="contained" sx={{margin: "auto",}}>Confirm</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default LoginComponent;







// import { useState } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
// import { FaReact } from "react-icons/fa6"; 
// import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
// import { InputWithLabel, SimpleInput, ThirdPartyAuthButton, WhiteButton } from "../components";
// import { Link, useNavigate } from "react-router-dom";
// import { signIn, resetOTP, resetPassword } from "../api/auth";  // Import the necessary API functions

// const LoginComponent = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openForgotPassword, setOpenForgotPassword] = useState(false);
//   const [openOTPDialog, setOpenOTPDialog] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [resetEmail, setResetEmail] = useState("");  // To store the email entered during forgot password

//   // Handle login
//   const handleSubmit = async () => {
//     setLoading(true); 
//     try {
//       const body = { email, password };
//       const data = await signIn(body);
//       if(data.code == 200){
//         localStorage.setItem('token',data.data.token);
//         localStorage.setItem('user',JSON.stringify(data.data.user));
//         navigate("/");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle sending OTP for password reset
//   const handleSendOTP = async () => {
//     setLoading(true); 
//     try {
//       const body = { email: resetEmail };
//       const data = await resetOTP(body);  // Use the correct send OTP API function
//       if (data.code == 200) {
//         alert("OTP sent to your email.");
//         setOpenForgotPassword(false); // Close the dialog
//         setOpenOTPDialog(true); // Open OTP verification dialog
//       } else {
//         alert("Failed to send OTP. Please check the email address.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle password reset with OTP
//   const handleResetPassword = async () => {
//     setLoading(true); 
//     try {
//       const body = { email: resetEmail, otp, newPassword };
//       const data = await resetPassword(body);  // Use the correct reset password API function
//       if (data.code == 200) {
//         alert("Password reset successfully.");
//         setOpenOTPDialog(false); // Close OTP dialog
//         navigate("/login"); // Redirect to login page
//       } else {
//         alert("Invalid OTP or failed to reset password.");
//       }
//     } catch (error) {
//       console.error("Error resetting password", error);
//     } finally {
//       setLoading(false);
//     }
//   };

 

//   // Open Forgot Password Popup
// const handleForgotPassword = (e: React.MouseEvent<HTMLParagraphElement>) => {
//   e.preventDefault(); // Prevents the login button from triggering at the same time
//   setOpenForgotPassword(true);
// };




//   return (
//     <div className="w-[500px] h-[750px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
//       <div className="flex flex-col items-center gap-10">
//         <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
//         <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
//           Welcome to the dashboard!
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
//           <InputWithLabel label="Email">
//             <SimpleInput
//               type="email"
//               placeholder="Enter an email..."
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Password">
//             <SimpleInput
//               type="password"
//               placeholder="Enter a password..."
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </InputWithLabel>
//         </div>
        
//         {/* Forgot Password Link */}
//         <p 
//           className="dark:text-gray-400 text-gray-700 text-base dark:hover:text-gray-300 hover:text-gray-600 cursor-pointer transition-colors max-sm:text-sm"
//           onClick={handleForgotPassword}
//         >
//           Forgot password?
//         </p>

//         <WhiteButton
//           onClick={handleSubmit}
//           disabled={loading}
//           textSize="lg"
//           width="full"
//           py="2"
//           text={loading ? "Logging in..." : "Login now"} 
//         />

//         {loading && (
//           <p className="dark:text-gray-400 text-gray-700 text-base mt-2">Processing your login...</p>
//         )}

//         <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
//           Not registered yet?{" "}
//           <Link
//             to="/register"
//             className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
//           >
//             Register <FaArrowRight className="mt-[2px]" />
//           </Link>
//         </p>
//       </div>

//       <Dialog open={openForgotPassword} onClose={() => setOpenForgotPassword(false)}
//         fullWidth={true} maxWidth="md" sx={{ '& .MuiDialog-paper': { minHeight: '100px', maxHeight: '400px', minWidth: '300px', maxWidth: '500px' } }}>
//         <DialogTitle>Forgot Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Enter your email"
//             value={resetEmail}
//             onChange={(e) => setResetEmail(e.target.value)}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSendOTP} variant="contained">Send OTP</Button>
//         </DialogActions>
//       </Dialog>

//       {/* OTP Verification and Password Reset Dialog */}
//       <Dialog open={openOTPDialog} onClose={() => setOpenOTPDialog(false)}>
//         <DialogTitle>Reset Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Email"
//             value={resetEmail}
//             margin="normal"
//             disabled
//           />
//           <TextField
//             fullWidth
//             label="OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="New Password"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleResetPassword} variant="contained">Confirm</Button>
//         </DialogActions>
//       </Dialog>
//     </div>


// );
// };
      
    
// export default LoginComponent;










// import { useState } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
// import { FaReact } from "react-icons/fa6"; 
// import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
// import { InputWithLabel, SimpleInput, ThirdPartyAuthButton, WhiteButton } from "../components";
// import { Link, useNavigate } from "react-router-dom";
// import { signIn, resetOTP, resetPassword } from "../api/auth";  // Import the necessary API functions

// const LoginComponent = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openForgotPassword, setOpenForgotPassword] = useState(false);
//   const [openOTPDialog, setOpenOTPDialog] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [resetEmail, setResetEmail] = useState("");  // To store the email entered during forgot password

//   // Handle login
//   const handleSubmit = async () => {
//     setLoading(true); 
//     try {
//       const body = { email, password };
//       const data = await signIn(body);
//       if(data.code == 200){
//         localStorage.setItem('token',data.data.token);
//         localStorage.setItem('user',JSON.stringify(data.data.user));
//         navigate("/");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle sending OTP for password reset
//   const handleSendOTP = async () => {
//     setLoading(true); 
//     try {
//       const body = { email: resetEmail };
//       const data = await resetOTP(body);  // Use the correct send OTP API function
//       if (data.code == 200) {
//         alert("OTP sent to your email.");
//         setOpenForgotPassword(false); // Close the dialog
//         setOpenOTPDialog(true); // Open OTP verification dialog
//       } else {
//         alert("Failed to send OTP. Please check the email address.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle password reset with OTP
//   const handleResetPassword = async () => {
//     setLoading(true); 
//     try {
//       const body = { email: resetEmail, otp, newPassword };
//       const data = await resetPassword(body);  // Use the correct reset password API function
//       if (data.code == 200) {
//         alert("Password reset successfully.");
//         setOpenOTPDialog(false); // Close OTP dialog
//         navigate("/login"); // Redirect to login page
//       } else {
//         alert("Invalid OTP or failed to reset password.");
//       }
//     } catch (error) {
//       console.error("Error resetting password", error);
//     } finally {
//       setLoading(false);
//     }
//   };

 

//   // Open Forgot Password Popup
// const handleForgotPassword = (e: React.MouseEvent<HTMLParagraphElement>) => {
//   e.preventDefault(); // Prevents the login button from triggering at the same time
//   setOpenForgotPassword(true);
// };


// const isLoginEnabled = email.trim() !== "" && password.trim() !== "";

//   return (
//     <div className="w-[500px] h-[750px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
//       <div className="flex flex-col items-center gap-10">
//         <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
//         <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
//           Welcome to the dashboard!
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
//           <InputWithLabel label="Email">
//             <SimpleInput
//               type="email"
//               placeholder="Enter an email..."
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Password">
//             <SimpleInput
//               type="password"
//               placeholder="Enter a password..."
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </InputWithLabel>
//         </div>
        
//         {/* Forgot Password Link */}
//         <p 
//           className="dark:text-gray-400 text-gray-700 text-base dark:hover:text-gray-300 hover:text-gray-600 cursor-pointer transition-colors max-sm:text-sm"
//           onClick={handleForgotPassword}
//         >
//           Forgot password?
//         </p>

//         <WhiteButton
//           onClick={handleSubmit}
//           disabled={!isLoginEnabled || loading}
//           textSize="lg"
//           width="full"
//           py="2"
//           text={loading ? "Logging in..." : "Login now"} 
//         />


//         {loading && (
//           <p className="dark:text-gray-400 text-gray-700 text-base mt-2">Processing your login...</p>
//         )}

//         <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
//           Not registered yet?{" "}
//           <Link
//             to="/register"
//             className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
//           >
//             Register <FaArrowRight className="mt-[2px]" />
//           </Link>
//         </p>
//       </div>

//       <Dialog open={openForgotPassword} onClose={() => setOpenForgotPassword(false)}
//         fullWidth={true} maxWidth="md" sx={{ '& .MuiDialog-paper': { minHeight: '100px', maxHeight: '400px', minWidth: '300px', maxWidth: '500px' } }}>
//         <DialogTitle>Forgot Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Enter your email"
//             value={resetEmail}
//             onChange={(e) => setResetEmail(e.target.value)}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSendOTP} variant="contained">Send OTP</Button>
//         </DialogActions>
//       </Dialog>

//       {/* OTP Verification and Password Reset Dialog */}
//       <Dialog open={openOTPDialog} onClose={() => setOpenOTPDialog(false)}>
//         <DialogTitle>Reset Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Email"
//             value={resetEmail}
//             margin="normal"
//             disabled
//           />
//           <TextField
//             fullWidth
//             label="OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="New Password"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleResetPassword} variant="contained">Confirm</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default LoginComponent;

















// import { useState } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
// import { FaReact } from "react-icons/fa6"; 
// import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
// import { InputWithLabel, SimpleInput, ThirdPartyAuthButton, WhiteButton } from "../components";
// import { Link, useNavigate } from "react-router-dom";
// import { signIn, resetOTP, resetPassword } from "../api/auth";  // Import the necessary API functions

// const LoginComponent = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
//   const [openForgotPassword, setOpenForgotPassword] = useState(false);
//   const [openOTPDialog, setOpenOTPDialog] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
//   const [resetEmail, setResetEmail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   // Handle login
//   const handleSubmit = async () => {
//     setLoading(true); 
//     try {
//       const body = { email, password };
//       const data = await signIn(body);
//       if (data.code == 200) {
//         localStorage.setItem('token', data.data.token);
//         localStorage.setItem('user', JSON.stringify(data.data.user));
//         navigate("/");
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle sending OTP for password reset
//   const handleSendOTP = async () => {
//     setOtpLoading(true); 
//     try {
//       const body = { email: resetEmail };
//       const data = await resetOTP(body);
//       if (data.code == 200) {
//         alert("OTP sent to your email.");
//         setOpenForgotPassword(false);
//         setOpenOTPDialog(true);
//       } else {
//         alert("Failed to send OTP. Please check the email address.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP", error);
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   // Handle password reset with OTP
//   const handleResetPassword = async () => {
//     if (newPassword !== confirmPassword) {
//       setErrorMessage("Passwords do not match. Please try again.");
//       return;
//     }
    
//     setResetPasswordLoading(true); 
//     try {
//       const body = { email: resetEmail, otp, newPassword };
//       const data = await resetPassword(body);
//       if (data.code == 200) {
//         alert("Password reset successfully.");
//         setOpenOTPDialog(false);
//         navigate("/login");
//       } else {
//         alert("Invalid OTP or failed to reset password.");
//       }
//     } catch (error) {
//       console.error("Error resetting password", error);
//     } finally {
//       setResetPasswordLoading(false);
//     }
//   };

//   // Open Forgot Password Popup
//   // const handleForgotPassword = (e) => {
//   //   e.preventDefault();
//   //   setOpenForgotPassword(true);
//   // };

//   const handleForgotPassword = (e: React.MouseEvent<HTMLParagraphElement>) => {
//       e.preventDefault(); // Prevents the login button from triggering at the same time
//       setOpenForgotPassword(true);
//     };

//   const isLoginEnabled = email.trim() !== "" && password.trim() !== "";

//   return (
//     <div className="w-[500px] h-[750px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
//       <div className="flex flex-col items-center gap-10">
//         <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
//         <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
//           Welcome to the dashboard!
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
//           <InputWithLabel label="Email">
//             <SimpleInput
//               type="email"
//               placeholder="Enter an email..."
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Password">
//             <SimpleInput
//               type="password"
//               placeholder="Enter a password..."
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </InputWithLabel>
//         </div>
        
//         <p 
//           className="dark:text-gray-400 text-gray-700 text-base dark:hover:text-gray-300 hover:text-gray-600 cursor-pointer transition-colors max-sm:text-sm"
//           onClick={handleForgotPassword}
//         >
//           Forgot password?
//         </p>

//         <WhiteButton
//           onClick={handleSubmit}
//           disabled={!isLoginEnabled || loading}
//           textSize="lg"
//           width="full"
//           py="2"
//           text={loading ? "Logging in..." : "Login now"} 
//         />

//         {loading && (
//           <p className="dark:text-gray-400 text-gray-700 text-base mt-2">Processing your login...</p>
//         )}

//         <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
//           Not registered yet?{" "}
//           <Link
//             to="/register"
//             className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
//           >
//             Register <FaArrowRight className="mt-[2px]" />
//           </Link>
//         </p>
//       </div>

//       <Dialog open={openForgotPassword} onClose={() => setOpenForgotPassword(false)}
//         fullWidth={true} maxWidth="md" sx={{ '& .MuiDialog-paper': { minHeight: '100px', maxHeight: '400px', minWidth: '300px', maxWidth: '500px' } }}>
//         <DialogTitle>Forgot Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Enter your email"
//             value={resetEmail}
//             onChange={(e) => setResetEmail(e.target.value)}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSendOTP} variant="contained">Send OTP</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openOTPDialog} onClose={() => setOpenOTPDialog(false)}>
//         <DialogTitle>Reset Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Email"
//             value={resetEmail}
//             margin="normal"
//             disabled
//           />
//           <TextField
//             fullWidth
//             label="OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="New Password"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Confirm Password"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             margin="normal"
//           />
//           {errorMessage && (
//             <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleResetPassword} variant="contained">Confirm</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default LoginComponent;


















import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { FaReact } from "react-icons/fa6"; 
import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
import { InputWithLabel, SimpleInput, ThirdPartyAuthButton, WhiteButton } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { signIn, resetOTP, resetPassword } from "../api/auth";  // Import the necessary API functions
import toast, { Toaster } from 'react-hot-toast';

const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openOTPDialog, setOpenOTPDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Handle login
  const handleSubmit = async () => {
    // Reset error message
    setErrorMessage("");

    // Validate email and password fields
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const body = { username:email, password };
      const data = await signIn(body);
      if (data.code === 200) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        if(data.data.user.Roles[0].roleName === "Teacher"){
        navigate(`/teacher-dashboard`);
        } else if(data.data.user.Roles[0].roleName === "Student"){
        navigate(`/student-dashboard`);
        }
      } else {
        toast.error("Invalid credentials.",{
          position:"top-center",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please try again.", {
        position:"top-center",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle sending OTP for password reset
  const handleSendOTP = async () => {
    setOtpLoading(true); 
    try {
      const body = { email: resetEmail };
      const data = await resetOTP(body);
      if (data.code === 200) {
        toast.success("OTP sent to your email.", {
          position:"top-center",
          duration: 5000,
        });
        setOpenForgotPassword(false);
        setOpenOTPDialog(true);
      } else {
        toast.error("Failed to send OTP. Please check the email address.",{
          position:"top-center",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error sending OTP", error);
    } finally {
      setOtpLoading(false);
    }
  };

  // Handle password reset with OTP
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }

    setResetPasswordLoading(true); 
    try {
      const body = { email: resetEmail, otp, newPassword };
      const data = await resetPassword(body);
      if (data.code === 200) {
        toast.success("Password reset successfully.", {
          position:"top-center",
          duration: 5000,
        });
        setOpenOTPDialog(false);
        navigate("/login");
      } else {
        toast.error("Invalid OTP. Failed to reset password.", {
          position:"top-center",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error resetting password", error);
    } finally {
      setResetPasswordLoading(false);
    }
  };

  // Open Forgot Password Popup
  const handleForgotPassword = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    setOpenForgotPassword(true);
  };

  const isLoginEnabled = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="w-[700px] h-[740px] relative dark:bg-gray-900 border-4 rounded-xl border-fore bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
      <Toaster/>
      <div className="absolute top-4 left-4 flex items-center px-2">
        <img
          src="/public/transCheatProof.png" // Replace with the actual path of your logo
          alt="Logo"
          className="h-8 w-8 object-contain mr-2" // Adjust size of the logo
        />
        <h2 className="text-2xl font-bold text-fore">CheatProof</h2>
      </div>
      <div className="flex flex-col items-center gap-10">
      

        <h5 className="text-5xl dark:text-whiteSecondary font-bold text-black max-sm:text-xl mt-20">
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-color2 via-color1 to-fore animate-gradient-move text-5xl font-extrabold">Welcome Back!</span>
        </h5>
        
        {/* <div className="text-transparent bg-clip-text bg-gradient-to-r from-color2 via-color1 to-fore animate-gradient-move text-6xl font-extrabold">
        CheatProof
      </div> */}
        <h5 className="text-xl dark:text-whiteSecondary font-semibold text-transparent bg-clip-text bg-gradient-to-r from-color2 via-color1 to-fore animate-gradient-move max-sm:text-xl">
          Please enter your credentials
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
          
        </div> */}

        {/* <p className="dark:text-gray-400 text-gray-700 text-xl max-sm:text-base">OR</p> */}

        <div className="w-full flex flex-col gap-8">
          {/* <InputWithLabel label="Email"> */}
          <label className="text-black font-semibold mt-4">
            Email
            <SimpleInput
              type="email"
              placeholder="Enter an email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </label>
          {/* </InputWithLabel> */}

          <label className="text-black font-semibold">
            Password
            <SimpleInput
              type="password"
              placeholder="Enter a password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        {errorMessage && (
          <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
        )}

        <p 
          className="dark:text-gray-400 text-gray-700 text-base dark:hover:text-gray-300 hover:text-gray-600 cursor-pointer transition-colors max-sm:text-sm"
          onClick={handleForgotPassword}
        >
          Forgot password?
        </p>

        {/* <WhiteButton
          onClick={handleSubmit}
          disabled={!isLoginEnabled || loading}
          textSize="lg"
          width="full"
          py="2"
          text={loading ? "Logging in..." : "Login now"} 
        /> */}
        <button
  onClick={handleSubmit}
  disabled={!isLoginEnabled || loading}
  className={`text-lg px-10 rounded-md py-2 ${
    !isLoginEnabled || loading ? "bg-white text-gray-400 cursor-not-allowed" : "text-fore font-semibold bg-white border border-fore hover:text-white hover:bg-fore"
  }`}
>
  {loading ? "Logging in..." : "Login"}
</button>


        {loading && (
          <p className="dark:text-gray-400 text-gray-700 text-base mt-2">Processing your login...</p>
        )}

        <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
          Not registered yet?{" "}
          <Link
            to="/register"
            className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
          >
            Register <FaArrowRight className="mt-[2px]" />
          </Link>
        </p>
      </div>

      <Dialog open={openForgotPassword} onClose={() => setOpenForgotPassword(false)}
        fullWidth={true} maxWidth="md" sx={{ '& .MuiDialog-paper': { minHeight: '100px', maxHeight: '400px', minWidth: '300px', maxWidth: '500px' } }}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleSendOTP} variant="contained">Send OTP</Button> */}
          <button onClick={handleSendOTP} className="text-white bg-fore px-4 ml-2 py-2 rounded-lg flex items-center">Send OTP</button>
        </DialogActions>
      </Dialog>

      <Dialog open={openOTPDialog} onClose={() => setOpenOTPDialog(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email"
            value={resetEmail}
            margin="normal"
            disabled
          />
          <TextField
            fullWidth
            label="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          {errorMessage && (
            <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
          )}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleResetPassword} variant="contained">Confirm</Button> */}
          <button onClick={handleResetPassword} className="text-white bg-fore px-4 ml-2 py-2 rounded-lg flex items-center">Confirm</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginComponent;














// import { useState } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
// import { FaReact } from "react-icons/fa6"; 
// import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
// import { InputWithLabel, SimpleInput, ThirdPartyAuthButton, WhiteButton } from "../components";
// import { Link, useNavigate } from "react-router-dom";
// import { signIn, resetOTP, resetPassword } from "../api/auth";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginComponent = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
//   const [openForgotPassword, setOpenForgotPassword] = useState(false);
//   const [openOTPDialog, setOpenOTPDialog] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [resetEmail, setResetEmail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async () => {
//     setErrorMessage("");
//     if (!email.trim() || !password.trim()) {
//       toast.error("Both email and password are required.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const body = { email, password };
//       const data = await signIn(body);
//       if (data.code === 200) {
//         localStorage.setItem('token', data.data.token);
//         localStorage.setItem('user', JSON.stringify(data.data.user));
//         navigate("/");
//       } else {
//         toast.error("Invalid credentials.");
//       }
//     } catch (error) {
//       console.error("Login failed", error);
//       toast.error("Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendOTP = async () => {
//     setOtpLoading(true); 
//     try {
//       const body = { email: resetEmail };
//       const data = await resetOTP(body);
//       if (data.code === 200) {
//         toast.success("OTP sent to your email.");
//         setOpenForgotPassword(false);
//         setOpenOTPDialog(true);
//       } else {
//         toast.error("Failed to send OTP. Please check the email address.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP", error);
//       toast.error("Error sending OTP. Please try again.");
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match. Please try again.");
//       return;
//     }

//     setResetPasswordLoading(true); 
//     try {
//       const body = { email: resetEmail, otp, newPassword };
//       const data = await resetPassword(body);
//       if (data.code === 200) {
//         toast.success("Password reset successfully.");
//         setOpenOTPDialog(false);
//         navigate("/login");
//       } else {
//         toast.error("Invalid OTP or failed to reset password.");
//       }
//     } catch (error) {
//       console.error("Error resetting password", error);
//       toast.error("Error resetting password. Please try again.");
//     } finally {
//       setResetPasswordLoading(false);
//     }
//   };

//   const handleForgotPassword = (e) => {
//     e.preventDefault();
//     setOpenForgotPassword(true);
//   };

//   const isLoginEnabled = email.trim() !== "" && password.trim() !== "";

//   return (
//     <div className="w-[500px] h-[750px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//       <div className="flex flex-col items-center gap-10">
// //         <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
// //         <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
// //           Welcome to the dashboard!
// //         </h2>
// //         <div className="flex gap-5">
// //           <ThirdPartyAuthButton>
// //             <FaGoogle className="text-2xl max-sm:text-xl" />
// //           </ThirdPartyAuthButton>
// //           <ThirdPartyAuthButton>
// //             <FaGithub className="text-2xl max-sm:text-xl" />
// //           </ThirdPartyAuthButton>
// //         </div>

// //         <p className="dark:text-gray-400 text-gray-700 text-xl max-sm:text-base">OR</p>

// //         <div className="w-full flex flex-col gap-5">
//            <InputWithLabel label="Email">
//              <SimpleInput
//               type="email"
//               placeholder="Enter an email..."
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </InputWithLabel>

//           <InputWithLabel label="Password">
//             <SimpleInput
//               type="password"
//               placeholder="Enter a password..."
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </InputWithLabel>
//         </div>

//         {errorMessage && (
//           <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
//         )}

//         <p 
//           className="dark:text-gray-400 text-gray-700 text-base dark:hover:text-gray-300 hover:text-gray-600 cursor-pointer transition-colors max-sm:text-sm"
//           onClick={handleForgotPassword}
//         >
//           Forgot password?
//         </p>

//         <WhiteButton
//           onClick={handleSubmit}
//           disabled={!isLoginEnabled || loading}
//           textSize="lg"
//           width="full"
//           py="2"
//           text={loading ? "Logging in..." : "Login now"} 
//         />

//         {loading && (
//           <p className="dark:text-gray-400 text-gray-700 text-base mt-2">Processing your login...</p>
//         )}

//         <p className="dark:text-gray-400 text-gray-700 text-base cursor-pointer transition-colors flex gap-1 items-center max-sm:text-sm">
//           Not registered yet?{" "}
//           <Link
//             to="/register"
//             className="dark:text-whiteSecondary text-blackPrimary hover:text-black flex gap-1 items-center dark:hover:text-white max-sm:text-sm hover:underline"
//           >
//             Register <FaArrowRight className="mt-[2px]" />
//           </Link>
//         </p>
//       </div>
      
//       {/* Other components and content */}

//       <Dialog open={openForgotPassword} onClose={() => setOpenForgotPassword(false)}
//         fullWidth={true} maxWidth="md" sx={{ '& .MuiDialog-paper': { minHeight: '100px', maxHeight: '400px', minWidth: '300px', maxWidth: '500px' } }}>
//         <DialogTitle>Forgot Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Enter your email"
//             value={resetEmail}
//             onChange={(e) => setResetEmail(e.target.value)}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleSendOTP} variant="contained">Send OTP</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openOTPDialog} onClose={() => setOpenOTPDialog(false)}>
//         <DialogTitle>Reset Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Email"
//             value={resetEmail}
//             margin="normal"
//             disabled
//           />
//           <TextField
//             fullWidth
//             label="OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="New Password"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Confirm Password"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleResetPassword} variant="contained">Confirm</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default LoginComponent;
