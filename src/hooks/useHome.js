// hooks/useCategorys.js
import { useState } from "react";
import {
  getUserNotifications,
  statistics,
  updateUserNotifications,
} from "services/home";

const useHome = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Categorys
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await statistics();
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch Categorys");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotification = async (params) => {
    setLoading(true);
    try {
      const data = await getUserNotifications(params);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch notification");
    } finally {
      setLoading(false);
    }
  };

  const updateNotification = async () => {
    setLoading(true);
    try {
      const data = await updateUserNotifications();
      return data;
    } catch (err) {
      setError(err.message || "Failed to edit notification");
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    fetchNotification,
    updateNotification,
    fetchData,
  };
};

export default useHome;
