// import { useState, KeyboardEvent } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
// import { KeyRound, User, ArrowRight, Loader2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { signIn, resetOTP, resetPassword } from "../api/auth";
// import toast, { Toaster } from 'react-hot-toast';

// const LoginComponent = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openForgotPassword, setOpenForgotPassword] = useState(false);
//   const [openOTPDialog, setOpenOTPDialog] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [resetEmail, setResetEmail] = useState("");
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};

//     if (!username.trim()) {
//       newErrors.username = "Username is required";
//     } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
//       newErrors.username = "Username must be alphanumeric";
//     }

//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       const body = { username, password };
//       const data = await signIn(body);
      
//       if (data.code === 200) {
//         localStorage.setItem('token', data.data.token);
//         localStorage.setItem('user', JSON.stringify(data.data.user));
        
//         const role = data.data.user.Roles[0].roleName;
//         navigate(role === "Teacher" ? "/teacher-dashboard" : "/student-dashboard");
        
//         toast.success("Login successful!", {
//           position: "top-center",
//           duration: 3000,
//         });
//       } else {
//         handleApiError(data);
//       }
//     } catch (error: any) {
//       handleApiError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApiError = (error: any) => {
//     if (error.errors) {
//       const newErrors: { [key: string]: string } = {};
//       error.errors.forEach((err: any) => {
//         newErrors[err.field] = err.message;
//       });
//       setErrors(newErrors);
//     } else {
//       toast.error(error.message || "Invalid credentials", {
//         position: "top-center",
//         duration: 5000,
//       });
//     }
//   };

//   const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' && !loading && username && password) {
//       handleSubmit();
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!resetEmail.trim()) {
//       setErrors({ resetEmail: "Email is required" });
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await resetOTP({ email: resetEmail });
//       if (data.code === 200) {
//         setOpenForgotPassword(false);
//         setOpenOTPDialog(true);
//         toast.success("OTP sent to your email!", {
//           position: "top-center",
//           duration: 3000,
//         });
//       } else {
//         handleApiError(data);
//       }
//     } catch (error: any) {
//       handleApiError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!otp.trim() || !newPassword.trim() || !confirmPassword.trim()) {
//       setErrors({
//         otp: !otp.trim() ? "OTP is required" : "",
//         newPassword: !newPassword.trim() ? "New password is required" : "",
//         confirmPassword: !confirmPassword.trim() ? "Confirm password is required" : "",
//       });
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setErrors({ confirmPassword: "Passwords do not match" });
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await resetPassword({
//         email: resetEmail,
//         otp,
//         newPassword,
//       });

//       if (data.code === 200) {
//         setOpenOTPDialog(false);
//         setOtp("");
//         setNewPassword("");
//         setConfirmPassword("");
//         setResetEmail("");
//         toast.success("Password reset successful! Please login with your new password.", {
//           position: "top-center",
//           duration: 5000,
//         });
//       } else {
//         handleApiError(data);
//       }
//     } catch (error: any) {
//       handleApiError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//       <Toaster />
      
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-12 space-y-10">
//         <div className="flex items-center justify-center space-x-3">
//           <img src={CheatProof} alt="CheatProof Logo" className="h-12 w-12" />
//           <h1 className="text-3xl font-bold text-gray-900">
//             CheatProof
//           </h1>
//         </div>

//         <div className="space-y-8">
//           <div className="space-y-2">
//             <h2 className="text-4xl font-bold text-center text-gray-900">Welcome back</h2>
//             <p className="text-center text-gray-600 text-lg">Enter your credentials to continue</p>
//           </div>

//           <div className="space-y-6">
//             <div className="relative">
//               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className={`w-full pl-12 pr-4 py-4 text-lg border ${
//                   errors.username ? 'border-red-500' : 'border-gray-300'
//                 } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
//               />
//               {errors.username && (
//                 <p className="mt-2 text-sm text-red-500">{errors.username}</p>
//               )}
//             </div>

//             <div className="relative">
//               <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className={`w-full pl-12 pr-4 py-4 text-lg border ${
//                   errors.password ? 'border-red-500' : 'border-gray-300'
//                 } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
//               />
//               {errors.password && (
//                 <p className="mt-2 text-sm text-red-500">{errors.password}</p>
//               )}
//             </div>
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold
//                      hover:bg-blue-700 focus:ring-4 focus:ring-blue-200
//                      transition-all duration-200 ease-in-out flex items-center justify-center space-x-2"
//           >
//             {loading ? (
//               <Loader2 className="animate-spin h-6 w-6" />
//             ) : (
//               <>
//                 <span>Sign in</span>
//                 <ArrowRight className="h-5 w-5" />
//               </>
//             )}
//           </button>

//           <div className="flex flex-col space-y-4 text-center">
//             <button
//               onClick={() => setOpenForgotPassword(true)}
//               className="text-base text-gray-600 hover:text-blue-600 transition"
//             >
//               Forgot your password?
//             </button>

//             <div className="text-base">
//               <span className="text-gray-600">Don't have an account? </span>
//               <Link
//                 to="/register"
//                 className="font-semibold text-blue-600 hover:text-blue-700 transition"
//               >
//                 Sign up
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Dialog open={openForgotPassword} onClose={() => setOpenForgotPassword(false)}>
//         <DialogTitle>Reset Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Email Address"
//             type="email"
//             fullWidth
//             value={resetEmail}
//             onChange={(e) => setResetEmail(e.target.value)}
//             error={!!errors.resetEmail}
//             helperText={errors.resetEmail}
//           />
//         </DialogContent>
//         <DialogActions>
//           <button
//             onClick={() => setOpenForgotPassword(false)}
//             className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleForgotPassword}
//             disabled={loading}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center space-x-2"
//           >
//             {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Send OTP"}
//           </button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openOTPDialog} onClose={() => setOpenOTPDialog(false)}>
//         <DialogTitle>Enter OTP</DialogTitle>
//         <DialogContent>
//           <div className="space-y-4">
//             <TextField
//               autoFocus
//               margin="dense"
//               label="OTP"
//               type="text"
//               fullWidth
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               error={!!errors.otp}
//               helperText={errors.otp}
//             />
//             <TextField
//               margin="dense"
//               label="New Password"
//               type="password"
//               fullWidth
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               error={!!errors.newPassword}
//               helperText={errors.newPassword}
//             />
//             <TextField
//               margin="dense"
//               label="Confirm Password"
//               type="password"
//               fullWidth
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               error={!!errors.confirmPassword}
//               helperText={errors.confirmPassword}
//             />
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <button
//             onClick={() => setOpenOTPDialog(false)}
//             className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleResetPassword}
//             disabled={loading}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center space-x-2"
//           >
//             {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Reset Password"}
//           </button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default LoginComponent;




import { useState, KeyboardEvent } from "react";
import { User, Lock, Loader2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { resetOTP, resetPassword, signIn } from "@/api/auth";
import CheatProof from "../assets/transCheatProof.png";
import ilustration from '../assets/undraw_access-account_aydp.svg'


function App() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!username.trim()) {
      newErrors.email = "Username is required";
    } 

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      const body = { username, password };
      const data = await signIn(body);
      // Add your login logic here

      if (data.code === 200) {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                
                const role = data.data.user.Roles[0].roleName;
                navigate(role === "Teacher" ? "/teacher-dashboard" : "/student-dashboard");
                
                toast.success("Login successful!", {
                  position: "top-center",
                  duration: 3000,
                });
              }

      // toast.success("Login successful!");
      // Add your login logic here
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!username.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      const data = await resetOTP({ username: username });
            if (data.code === 200) {
              setShowForgotPassword(false);
              setShowOTPDialog(true);
              toast.success("OTP sent to your email!", {
                position: "top-center",
                duration: 3000,
              });
            }

    
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setErrors({
        otp: !otp.trim() ? "OTP is required" : "",
        newPassword: !newPassword.trim() ? "New password is required" : "",
        confirmPassword: !confirmPassword.trim() ? "Confirm password is required" : "",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      const data = await resetPassword({
                
                otp,
                newPassword,
              });
        
              if (data.code === 200) {
                setShowOTPDialog(false);
                setOtp("");
                setNewPassword("");
                setConfirmPassword("");
                toast.success("Password reset successful! Please login with your new password.", {
                  position: "top-center",
                  duration: 5000,
                });
              }

      // toast.success("Password reset successful! Please login with your new password.");
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
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
              <h2 className="text-3xl font-bold text-color2-900">Welcome back</h2>
              <p className="mt-2 text-color2-600">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-color2-700">
                    Username
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 " />
                    </div>
                    <input
                      id="email"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
              </div>

              <div className="flex items-center justify-end">
                {/* <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-color1 focus:ring-color1 border-color2/75 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-color2">
                    Remember for 30 days
                  </label>
                </div> */}

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-medium text-color1 hover:text-color2"
                >
                  Forgot password?
                </button>
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
                    "Sign in"
                  )}
                </button>

                <button
                onClick={()=>navigate("/register")}
                  type="button"
                  className="w-full flex items-center justify-center py-2 px-4 border border-color2-300 rounded-md shadow-sm text-sm font-medium text-color2-700 bg-white hover:bg-color2/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color2"
                >
                  {/* <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-2" /> */}
                  Register
                </button>
              </div>
            </form>

            <p className="text-center text-sm text-color2-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-color1 hover:text-color2">
                Sign up
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

      {/* Forgot Password Dialog */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-color2-900">Reset Password</h3>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="text-color2-400 hover:text-color2-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-color2-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="reset-email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`mt-1 block w-full border ${
                    errors.email ? 'border-red-500' : 'border-color2-300'
                  } rounded-md shadow-sm py-2 px-3 focus:ring-color1-500 focus:border-color1-500 sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="px-4 py-2 text-color2/70 hover:text-color2/80"
                >
                  Cancel
                </button>
                <button
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="px-4 py-2 bg-color1/90 text-white rounded hover:bg-color1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color1/50 flex items-center space-x-2"
                >
                  {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Send OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTP Dialog */}
      {showOTPDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold ">Enter OTP</h3>
              <button
                onClick={() => setShowOTPDialog(false)}
                className="text-color2 hover:text-color2/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-color2/70">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`mt-1 block w-full border ${
                    errors.otp ? 'border-red-500' : 'border-color2/30'
                  } rounded-md shadow-sm py-2 px-3 focus:ring-color1-500 focus:border-color1/50 sm:text-sm`}
                />
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-500">{errors.otp}</p>
                )}
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-color2-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`mt-1 block w-full border ${
                    errors.newPassword ? 'border-red-500' : 'border-color2-300'
                  } rounded-md shadow-sm py-2 px-3 focus:ring-color1-500 focus:border-color1-500 sm:text-sm`}
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-color2-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`mt-1 block w-full border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-color2-300'
                  } rounded-md shadow-sm py-2 px-3 focus:ring-color1-500 focus:border-color1-500 sm:text-sm`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowOTPDialog(false)}
                  className="px-4 py-2 text-color2/70 hover:text-color2/80"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="px-4 py-2 bg-color1 text-white rounded hover:bg-color2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-color2 flex items-center space-x-2"
                >
                  {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Reset Password"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;