import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ condition = true, children }) => {
  const adminInfo = useSelector((state) => state.auth.userData);

  if (!adminInfo) {
    // still loading, or user not logged in
    return <Navigate to="/login" replace />;
  }

  if (!condition) {
    // user logged in but no permission
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
