import { api } from "api";
import {
  getAllUsers,
  deleteUser,
  updateUser,
  addAdmin,
  addDeliveryUser,
} from "api/apiURLs";

export const getUsers = async (params) => {
  const response = await api.get(getAllUsers, { params });
  return response.data;
};

export const createAdmin = async (data) => {
  const response = await api.post(addAdmin, data);
  return response.data;
};

export const createDelivery = async (data) => {
  const response = await api.post(addDeliveryUser, data);
  return response.data;
};

export const editUser = async (data) => {
  const response = await api.patch(updateUser, data);
  return response.data;
};

export const removeUser = async (id) => {
  const response = await api.delete(`${deleteUser}/${id}`);
  return response.data;
};
