import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export default function AuthGuard({ children }) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}
