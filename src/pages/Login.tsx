// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useStore } from "../../store/store";
// import { Eye, EyeOff } from "lucide-react";

// const Login: React.FC = () => {
//   const { login, setErrors, loading } = useStore();
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await login(username, password);
//       if (response.status === 200) {
//         navigate("/dashboard");
//       }
//     } catch (err: any) {
//       const errorMessage =
//         err.response?.data?.message || err.message || "Login Failed";
//       setErrors("login", true, errorMessage);
//     }
//   };

//   return (
//     <>
//       <div className="flex h-[100dvh] w-[100dvw]">
//         <div
//           className="w-[50%] py-[5rem] pl-[6rem] pr-[5rem]"
//           style={{ backgroundImage: "url('/images/Rectangle 1.png')" }}
//         >
//           <div className="w-fit mb-[3rem]  flex items-center gap-[1rem]">
//             <img
//               src="/images/serving-food (1).svg"
//               alt="Logo"
//               className="w-[2.5rem] h-[2.5rem]"
//             />

//             <span className="text-white leading-[1%] font-[400] text-[18px] ">
//               CHOP CENTRAL
//             </span>
//           </div>

//           <div className="mb-[3rem] w-[100%] text-left">
//             <span className=" font-[500] text-[1.5rem] leading-[24px] text-white text-left">
//               Opportunities don’t happen. You create them. Success comes to
//               those who seek it, plan for it, and work relentlessly toward it.
//             </span>
//           </div>

//           <div className=" w-[100%] text-left">
//             <span className=" font-[400] text-[.9rem] leading-[24px] text-white text-left">
//               - Chris Grosser
//             </span>
//           </div>
//         </div>

//         <div className="w-[50%] relative flex flex-col  items-center">
//           {/* <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
//               Login
//             </h2>
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div>
//                 <label className="block text-gray-600 mb-1">Username</label>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your username"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-600 mb-1">Password</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your password"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-blue-400 py-2 rounded-lg hover:bg-blue-700 transition"
//                 disabled={loading}
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </form>

//             <Link to="/forgot-password">
//               <button className="text-red">Forgot Password</button>
//             </Link>
//             <Link to="/sign-up">
//               <button className="text-green">Sign Up</button>
//             </Link>
//           </div> */}

//           <img
//             src="/images/Group 1.png"
//             alt="backdrop"
//             className="w-[100%] h-[15rem]"
//           />

//           <div className="flex-col w-full px-[5rem] absolute top-[15%] flex justify-center">
//             <div className="mb-[2rem] flex flex-col">
//               <span className="font-[600] text-[20px] text-[#080B10] ">
//                 Log in to your account
//               </span>
//               <span className="text-[#6B7280] text-[12px] font-[300] tracking-wide ">
//                 Access your dashboard to manage your restaurant with ease.
//               </span>
//             </div>

//             <form className="mb-[2rem]">
//               <div className="w-full mb-[1rem] flex flex-col gap-1 items-start ">
//                 <label className="text-[12px] font-[300]">Email Address</label>
//                 <div className="border-1 w-full flex border-[#d1d5db] rounded-[0.5rem]">
//                   <input
//                     type="email"
//                     className="w-full rounded-l-[0.5rem] px-[8px] focus:outline-none"
//                   />
//                   <div className="flex py-[8px] px-[12px] items-center justify-center">
//                     <img
//                       src="/images/Email.svg"
//                       alt="backdrop"
//                       className=" w-[20px]"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full mb-[1.5rem] flex flex-col gap-1 items-start ">
//                 <label className="text-[12px] font-[300]">Password</label>
//                 <div className="border-1 w-full flex border-[#d1d5db] rounded-[0.5rem]">
//                   <input
//                     type="password"
//                     className="w-full rounded-l-[0.5rem] px-[8px] focus:outline-none"
//                   />
//                   <div className="flex py-[8px] px-[12px] items-center justify-center">
//                     {/* <Eye strokeWidth={1} color="#9CA3AF" /> */}

//                     <EyeOff strokeWidth={1} color="#9CA3AF" />
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full hover:scale-[1.01] hover:cursor-pointer bg-[#1A55E3] focus:border-1 focus:bg-[#1A55E3] hover:bg-[#4A69F9] rounded-[8px] px-[1rem] py-[8px] "
//               >
//                 <span className="text-white text-[14px]">Login</span>
//               </button>
//             </form>

//             <div className="w-full gap-2 flex flex-col items-start">
//               <Link
//                 to="/forgot-password"
//                 className="hover:scale-[1.01] text-[#1A55E3] focus:text-[#1A55E3] hover:text-[#4A69F9] font-[500] "
//               >
//                 <span className="text-[12px]">Forgot Password?</span>
//               </Link>

//               <div className=" flex gap-1 text-[12px]">
//                 <span className="text-[#6B7280]">Don't have an account?</span>
//                 <Link
//                   to="/sign-up"
//                   className="hover:scale-[1.01] text-[#1A55E3] focus:text-[#1A55E3] hover:text-[#4A69F9] font-[500]"
//                 >
//                   <span>Sign up</span>
//                 </Link>
//               </div>
//             </div>

//             <div className="my-[1rem] w-full flex justify-between items-center gap-2">
//               <div className="w-[45%] h-[1px] bg-[#D1D5DB] " />
//               <span className="text-[12px]">or</span>
//               <div className="w-[45%] h-[1px] bg-[#D1D5DB] " />
//             </div>

//             <button
//               type="submit"
//               className="w-full hover:scale-[1.01] hover:cursor-pointer flex justify-center items-center gap-4 border-1 border-[#D1D5DB] bg-transparent rounded-[8px] px-[1rem] py-[8px] "
//             >
//               <img
//                 src="/icons/devicon_google.svg"
//                 alt="google"
//                 className="w-[1rem] h-[1rem]"
//               />
//               <span className="text-[#303030] text-[13px]">
//                 Continue with Google
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { Eye, EyeOff } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login: React.FC = () => {
  const { login, setErrors, loading, googleLogin } = useStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Login Failed";
      setErrors("login", true, errorMessage);
    }
  };

 const handleGoogleLogin = async (credentialResponse: any) => {
   setIsGoogleLoading(true);

   // Debug: Check that we're receiving the credential
   console.log("Google credential received:", credentialResponse);

   try {
     // Debug: Log before API call
     console.log("Attempting Google login with credential");

     // Call googleLogin from your store
     const response = await googleLogin(credentialResponse.credential);

     // Debug: Log response
     console.log("Google login response:", response);

     // Check if response is successful and has the necessary data
     if (response && response.data) {
       console.log("Auth data received:", response.data);

       // Debug: Check auth state after login
       setTimeout(() => {
         const currentAuthState = localStorage.getItem("token");
         console.log("Token in localStorage after login:", currentAuthState);
       }, 500);

       // Navigate to dashboard after successful authentication
       console.log("Navigating to dashboard");
       navigate("/dashboard");
     } else {
       console.error("Response missing expected data structure", response);
     }
   } catch (err: any) {
     // Enhanced error logging
     console.error("Google login error:", err);
     console.error("Error details:", {
       message: err.message,
       response: err.response,
       stack: err.stack,
     });

     const errorMessage =
       err.response?.data?.message || err.message || "Google Login Failed";
     setErrors("login", true, errorMessage);
   } finally {
     setIsGoogleLoading(false);
   }
 };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex h-[100dvh] w-[100dvw]">
        <div
          className="w-[50%] py-[5rem] pl-[6rem] pr-[5rem]"
          style={{ backgroundImage: "url('/images/Rectangle 1.png')" }}
        >
          <div className="w-fit mb-[3rem]  flex items-center gap-[1rem]">
            <img
              src="/images/serving-food (1).svg"
              alt="Logo"
              className="w-[2.5rem] h-[2.5rem]"
            />

            <span className="text-white leading-[1%] font-[400] text-[18px] ">
              CHOP CENTRAL
            </span>
          </div>

          <div className="mb-[3rem] w-[100%] text-left">
            <span className=" font-[500] text-[1.5rem] leading-[24px] text-white text-left">
              Opportunities don't happen. You create them. Success comes to
              those who seek it, plan for it, and work relentlessly toward it.
            </span>
          </div>

          <div className=" w-[100%] text-left">
            <span className=" font-[400] text-[.9rem] leading-[24px] text-white text-left">
              - Chris Grosser
            </span>
          </div>
        </div>

        <div className="w-[50%] relative flex flex-col  items-center">
          <img
            src="/images/Group 1.png"
            alt="backdrop"
            className="w-[100%] h-[15rem]"
          />

          <div className="flex-col w-full px-[5rem] absolute top-[15%] flex justify-center">
            <div className="mb-[2rem] flex flex-col">
              <span className="font-[600] text-[20px] text-[#080B10] ">
                Log in to your account
              </span>
              <span className="text-[#6B7280] text-[12px] font-[300] tracking-wide ">
                Access your dashboard to manage your restaurant with ease.
              </span>
            </div>

            <form className="mb-[2rem]" onSubmit={handleLogin}>
              <div className="w-full mb-[1rem] flex flex-col gap-1 items-start ">
                <label className="text-[12px] font-[300]">Email Address</label>
                <div className="border-1 w-full flex border-[#d1d5db] rounded-[0.5rem]">
                  <input
                    type="email"
                    className="w-full rounded-l-[0.5rem] px-[8px] focus:outline-none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <div className="flex py-[8px] px-[12px] items-center justify-center">
                    <img
                      src="/images/Email.svg"
                      alt="email icon"
                      className=" w-[20px]"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mb-[1.5rem] flex flex-col gap-1 items-start ">
                <label className="text-[12px] font-[300]">Password</label>
                <div className="border-1 w-full flex border-[#d1d5db] rounded-[0.5rem]">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-l-[0.5rem] px-[8px] focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div
                    className="flex py-[8px] px-[12px] items-center justify-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <Eye strokeWidth={1} color="#9CA3AF" />
                    ) : (
                      <EyeOff strokeWidth={1} color="#9CA3AF" />
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full hover:scale-[1.01] hover:cursor-pointer bg-[#1A55E3] focus:border-1 focus:bg-[#1A55E3] hover:bg-[#4A69F9] rounded-[8px] px-[1rem] py-[8px] "
                disabled={loading}
              >
                <span className="text-white text-[14px]">
                  {loading ? "Logging in..." : "Login"}
                </span>
              </button>
            </form>

            <div className="w-full gap-2 flex flex-col items-start">
              <Link
                to="/forgot-password"
                className="hover:scale-[1.01] text-[#1A55E3] focus:text-[#1A55E3] hover:text-[#4A69F9] font-[500] "
              >
                <span className="text-[12px]">Forgot Password?</span>
              </Link>

              <div className=" flex gap-1 text-[12px]">
                <span className="text-[#6B7280]">Don't have an account?</span>
                <Link
                  to="/sign-up"
                  className="hover:scale-[1.01] text-[#1A55E3] focus:text-[#1A55E3] hover:text-[#4A69F9] font-[500]"
                >
                  <span>Sign up</span>
                </Link>
              </div>
            </div>

            <div className="my-[1rem] w-full flex justify-between items-center gap-2">
              <div className="w-[45%] h-[1px] bg-[#D1D5DB] " />
              <span className="text-[12px]">or</span>
              <div className="w-[45%] h-[1px] bg-[#D1D5DB] " />
            </div>

            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <div className="w-full">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    setErrors("login", true, "Google Login Failed");
                  }}
                  useOneTap
                  type="standard"
                  theme="outline"
                  text="continue_with"
                  shape="rectangular"
                  logo_alignment="center"
                  width="100%"
                />
              </div>
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;