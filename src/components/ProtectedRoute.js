import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user data

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not logged in
  }

  // Check if user role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Redirect unauthorized users
  }

  return element; // Allow access if conditions are met
};

export default ProtectedRoute;
