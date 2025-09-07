import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "store/authSlice";
import useLogin from "hooks/uselogin";
import LoadingSpinner from "components/Ui/LoadingSpinner/LoadingSpinner";

const ProtectedRoute = ({ condition = true, children }) => {
  const { isAuthenticated } = useSelector(selectAuth);
  const { getProfileBytoken, loading, error } = useLogin();

  useEffect(() => {
    if (!isAuthenticated) {
      getProfileBytoken();
    }
  }, [isAuthenticated, getProfileBytoken]);

  // Show a loading indicator while fetching the profile
  if (loading) {
    return <LoadingSpinner />; // Replace with a proper loading component if needed
  }

  // Redirect to login if not authenticated and there's an error
  if (!isAuthenticated && error) {
    return <Navigate to="/login" />;
  }
  if (!condition) {
    // user logged in but no permission
    return <Navigate to="/" replace />;
  }

  // Render the protected content if authenticated
  return children;
};

export default ProtectedRoute;
