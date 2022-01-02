import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export default function AuthGuard({ children }) {
  const auth = useAuth();
  const { isAuthenticated } = auth;
  return isAuthenticated ? children : <Navigate to="/login" />;
}
