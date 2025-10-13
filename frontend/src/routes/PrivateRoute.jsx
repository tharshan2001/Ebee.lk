import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // While checking authentication, show a temporary state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-lg font-semibold">Checking authentication...</h2>
      </div>
    );
  }

  // If authenticated, render the page; otherwise redirect to login
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
