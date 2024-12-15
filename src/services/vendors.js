// api/restaurantsApi.js
import { api } from "api";
import {
  getAllRestaurants,
  addRestaurant,
  editRestaurant,
  deleteUser,
} from "api/apiURLs";

export const getVendors = async () => {
  const response = await api.get(getAllRestaurants);
  return response.data;
};

export const createVendor = async (data) => {
  const response = await api.post(addRestaurant, data);
  return response.data;
};

export const editVendor = async (data) => {
  const response = await api.patch(editRestaurant, data);
  console.log(response);

  return response.data;
};

export const deleteVendor = async (id) => {
  const response = await api.delete(`${deleteUser}/${id}`);
  return response.data;
};
