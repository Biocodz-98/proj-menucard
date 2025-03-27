import React from "react";
import { useStore } from "../../store/store";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout, auth, loading } = useStore();
//   const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // No need to navigate here - ProtectedRoute will handle redirection
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>Dashboard</h1>
        <div className="user-info">
          {auth.user && <span>Welcome, {auth.user.name}</span>}
          <button onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      <main>
        <p>This is your protected dashboard. You're logged in!</p>
        {/* Your dashboard content here */}
      </main>
    </div>
  );
};

export default Dashboard;
