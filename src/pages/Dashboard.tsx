import React from "react";
import { useStore } from "../../store/store";


const Dashboard = () => {
  const { logout, auth, loading } = useStore();
//  

  const handleLogout = async () => {
    try {
      await logout();
      
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
       
      </main>
    </div>
  );
};

export default Dashboard;
