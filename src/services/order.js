import { api } from "api";
import { getOrders, getOrderDetails, deleteOrder, edit } from "api/apiURLs";

export const getAllOrders = async (params) => {
  const response = await api.get(getOrders, { params });
  return response.data;
};

export const getOrder = async (id) => {
  const response = await api.get(`${getOrderDetails}${id}`);
  return response.data;
};
export const updateOrder = async (id, data) => {
  const response = await api.patch(`api/order/${id}`, data);
  return response.data;
};
export const removeOrder = async (id) => {
  const response = await api.delete(`${deleteOrder}${id}`);
  return response.data;
};
