import React, { useState } from "react";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login, setErrors, loading } = useStore();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginUsername = "meme";
    const loginPassword = "passy";

    try {
      const response = await login(loginUsername, loginPassword);

      if (response.status === 200) {
        console.log("Login successful");
      }
    } catch (err: any) {
      console.error("Login error:", err);

      const errorMessage =
        err.response?.data?.message || err.message || "Login Failed";

      setErrors("login", true, errorMessage);
    }
  };

  return (
    <div className="flex">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group bg-red-500">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username (demo: meme)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password (demo: passy)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
