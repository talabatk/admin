import { api } from "api";
import { getStatistics } from "api/apiURLs";

export const statistics = async (cityId) => {
  const response = await api.get(getStatistics, { params: { cityId: cityId } });
  return response.data;
};

export const getUserNotifications = async (params) => {
  const response = await api.get("api/user-notifications", { params });
  return response.data;
};
export const updateUserNotifications = async () => {
  const response = await api.get("api/edit-notifications");
  return response.data;
};

export const updateAlerts = async (data) => {
  const response = await api.patch("api/alert", data);
  return response.data;
};
export const sendUserNotifications = async (data) => {
  const response = await api.post("api/send-notification", data);
  return response.data;
};
