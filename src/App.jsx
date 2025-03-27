import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { AuthRedirect, ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { useStore } from "../store/store";
import LoadingScreen from "./components/LoadingScreen"; // Import correctly

function App() {
  const { loading } = useStore();

  return (
    <>
      {loading && <LoadingScreen loading={loading} />}
      <Router>
        <Routes>
          <Route element={<AuthRedirect />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* Add a default route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
