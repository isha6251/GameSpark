import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
  const { user, isLoaded } = useUser();

  // Show nothing until Clerk finishes loading
  if (!isLoaded) {
    return null;
  }

  // If user exists → allow access, else redirect
  return user ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
