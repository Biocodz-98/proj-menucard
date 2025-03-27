import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../../store/store";

export const ProtectedRoute = () => {
  const { auth } = useStore();

  return auth.user ? <Outlet /> : <Navigate to="/" replace />;
};

export const AuthRedirect = () => {
  const { auth } = useStore();

  return auth.user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
