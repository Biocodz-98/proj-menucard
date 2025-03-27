import React, { useState } from "react";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, setErrors, loading } = useStore();
  const navigate = useNavigate();

  // For a more complete form, you'd add these state variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // For the demo, we'll use the hardcoded values
    const loginUsername = "meme";
    const loginPassword = "passy";

    try {
      const response = await login(loginUsername, loginPassword);

      if (response.status === 200) {
        // No need to navigate here - AuthRedirect will handle this
        console.log("Login successful");
      }
    } catch (err) {
      console.error("Login error:", err);

      const errorMessage =
        err.response?.data?.message || err.message || "Login Failed";

      setErrors("login", true, errorMessage);
    }
  };

  return (
    <div className="flex ">
      {/* <div></div>
      <h1>Login</h1> */}
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
       
        <div className="form-group bg-red-500">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username (demo: meme)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password (demo: passy)"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
