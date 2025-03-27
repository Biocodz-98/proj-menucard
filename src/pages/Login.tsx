// import React, { useState } from "react";
// import { useStore } from "../../store/store";
// import { useNavigate } from "react-router-dom";

// const Login: React.FC = () => {
//   const { login, setErrors, loading } = useStore();
//   const navigate = useNavigate();

//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const loginUsername = "meme";
//     const loginPassword = "passy";

//     try {
//       const response = await login(loginUsername, loginPassword);

//       if (response.status === 200) {
//         console.log("Login successful");
//       }
//     } catch (err: any) {
//       console.error("Login error:", err);

//       const errorMessage =
//         err.response?.data?.message || err.message || "Login Failed";

//       setErrors("login", true, errorMessage);
//     }
//   };

//   return (
//     <div className="flex bg-red-500">
//       <div className="w-[50%]">

//       </div>
//       <h1>Login</h1>
//       {/* <form onSubmit={handleLogin}>
//         <div className="form-group bg-red-500">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Username (demo: meme)"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Password (demo: passy)"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form> */}
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";

const Login: React.FC = () => {
  const { login, setErrors, loading } = useStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <>
      <div className="flex h-[100dvh] w-[100dvw]">
        <div
          className="w-[55%] p-[3rem]"
          style={{ backgroundImage: "url('/images/Rectangle 1.png')" }}
        >
          <div className="w-fit  flex items-center gap-[1rem]">
            <img
              src="/images/serving-food (1).svg"
              alt="Logo"
              className="w-[3rem] h-[3rem]"
            />

            <span className="text-white leading-[0.5%] font-[500] text-[27px] ">
              CHOP CENTRAL
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg text-center">
            Securely access your account and manage your data efficiently.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-[45%] flex justify-center items-center p-10">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
              Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <Link to="/forgot-password">
              <button className="text-red">Forgot Password</button>
            </Link>
            <Link to="/sign-up">
              <button className="text-green">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
