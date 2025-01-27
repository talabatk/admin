// hooks/useCategorys.js
import { useState } from "react";
import {
  getUserNotifications,
  sendUserNotifications,
  statistics,
  updateUserNotifications,
  updateAlerts,
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

  const updateAlertsContent = async (newData) => {
    setLoading(true);
    try {
      const data = await updateAlerts(newData);
      return data;
    } catch (err) {
      setError(err.message || "Failed to edit notification");
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

  const sendNotification = async (data) => {
    setLoading(true);
    try {
      const res = await sendUserNotifications(data);
      return res;
    } catch (err) {
      setError(err.message || "Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchNotification,
    sendNotification,
    updateNotification,
    updateAlertsContent,
    fetchData,
  };
};

export default useHome;
