


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







import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { FaReact } from "react-icons/fa6"; 
import { FaGoogle, FaGithub, FaArrowRight } from "react-icons/fa6";
import { InputWithLabel, SimpleInput, ThirdPartyAuthButton, WhiteButton } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { signIn, resetOTP, resetPassword } from "../api/auth";  // Import the necessary API functions

const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("john@email.com");
  const [password, setPassword] = useState("pass1234567890");
  const [loading, setLoading] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openOTPDialog, setOpenOTPDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");  // To store the email entered during forgot password

  // Handle login
  const handleSubmit = async () => {
    setLoading(true); 
    try {
      const body = { email, password };
      const data = await signIn(body);
      if(data.code == 200){
        localStorage.setItem('token',data.data.token);
        localStorage.setItem('user',JSON.stringify(data.data.user));
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle sending OTP for password reset
  const handleSendOTP = async () => {
    setLoading(true); 
    try {
      const body = { email: resetEmail };
      const data = await resetOTP(body);  // Use the correct send OTP API function
      if (data.code == 200) {
        alert("OTP sent to your email.");
        setOpenForgotPassword(false); // Close the dialog
        setOpenOTPDialog(true); // Open OTP verification dialog
      } else {
        alert("Failed to send OTP. Please check the email address.");
      }
    } catch (error) {
      console.error("Error sending OTP", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset with OTP
  const handleResetPassword = async () => {
    setLoading(true); 
    try {
      const body = { email: resetEmail, otp, newPassword };
      const data = await resetPassword(body);  // Use the correct reset password API function
      if (data.code == 200) {
        alert("Password reset successfully.");
        setOpenOTPDialog(false); // Close OTP dialog
        navigate("/login"); // Redirect to login page
      } else {
        alert("Invalid OTP or failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password", error);
    } finally {
      setLoading(false);
    }
  };

  // Open Forgot Password Popup
  // const handleForgotPassword = () => {
  //   event.preventDefault();  // Prevent the default link behavior
  //   event.stopPropagation();  // Stop event from propagating further
  //   setOpenForgotPassword(true);
  // };


  // Open Forgot Password Popup
const handleForgotPassword = (e: React.MouseEvent<HTMLParagraphElement>) => {
  e.preventDefault(); // Prevents the login button from triggering at the same time
  setOpenForgotPassword(true);
};




  return (
    <div className="w-[500px] h-[750px] dark:bg-gray-900 bg-white flex flex-col justify-between items-center py-10 max-sm:w-[400px] max-[420px]:w-[320px] max-sm:h-[750px]">
      <div className="flex flex-col items-center gap-10">
        <FaReact className="text-5xl dark:text-whiteSecondary text-blackPrimary hover:rotate-180 hover:duration-1000 hover:ease-in-out cursor-pointer max-sm:text-4xl" />
        <h2 className="text-2xl dark:text-whiteSecondary text-blackPrimary font-medium max-sm:text-xl">
          Welcome to the dashboard!
        </h2>
        <div className="flex gap-5">
          <ThirdPartyAuthButton>
            <FaGoogle className="text-2xl max-sm:text-xl" />
          </ThirdPartyAuthButton>
          <ThirdPartyAuthButton>
            <FaGithub className="text-2xl max-sm:text-xl" />
          </ThirdPartyAuthButton>
        </div>

        <p className="dark:text-gray-400 text-gray-700 text-xl max-sm:text-base">OR</p>

        <div className="w-full flex flex-col gap-5">
          <InputWithLabel label="Email">
            <SimpleInput
              type="email"
              placeholder="Enter an email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWithLabel>

          <InputWithLabel label="Password">
            <SimpleInput
              type="password"
              placeholder="Enter a password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWithLabel>
        </div>
        
        {/* Forgot Password Link */}
        <p 
          className="dark:text-gray-400 text-gray-700 text-base dark:hover:text-gray-300 hover:text-gray-600 cursor-pointer transition-colors max-sm:text-sm"
          onClick={handleForgotPassword}
        >
          Forgot password?
        </p>

        <WhiteButton
          onClick={handleSubmit}
          disabled={loading}
          textSize="lg"
          width="full"
          py="2"
          text={loading ? "Logging in..." : "Login now"} 
        />

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
          <Button onClick={handleSendOTP} variant="contained">Send OTP</Button>
        </DialogActions>
      </Dialog>

      {/* OTP Verification and Password Reset Dialog */}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetPassword} variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>


);
};
      
    
export default LoginComponent;
