import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../../store/store";

export const ProtectedRoute = () => {
  const { auth } = useStore();

  // If the user is not authenticated, redirect to login
  return auth.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AuthRedirect = () => {
  const { auth } = useStore();

  // If the user is already authenticated, redirect to dashboard
  return auth.user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
