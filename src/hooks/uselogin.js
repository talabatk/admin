import { useState } from "react";
import { api } from "api";
import { adminLogin, getProfile } from "api/apiURLs";
import { useDispatch } from "react-redux";
import { authSliceActions } from "store/authSlice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(adminLogin, credentials);

      setUser(response.data.user); // Assuming the API returns the user data

      dispatch(authSliceActions.login(response.data.user));

      navigate("/");

      return response.data; // You can return any response data if needed
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred"); // Extract API error message
      throw err; // Optionally re-throw the error for further handling
    } finally {
      setLoading(false);
    }
  };

  const getProfileBytoken = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(getProfile);

      setUser(response.data); // Assuming the API returns the user data

      console.log(response);

      dispatch(authSliceActions.login(response.data));

      return response.data; // You can return any response data if needed
    } catch (err) {
      navigate("/login");
      setError(err.response?.message || "An error occurred"); // Extract API error messag
      return;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null); // Clear user data
    dispatch(authSliceActions.logout());
    // Additional logout logic (e.g., clearing tokens) can go here
  };

  return { user, loading, error, login, logout, getProfileBytoken };
};

export default useLogin;
