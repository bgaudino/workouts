import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export default function AuthGuard({ children }) {
  const auth = useAuth();
  const { isAuthenticated, loading } = auth;
  if (loading) {
    return (
      <div class="container is-max-desktop">
        <progress className="progress is-info" />
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
}
