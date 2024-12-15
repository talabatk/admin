import { api } from "api";
import {
  addCategory,
  getCategoreis,
  editCategory,
  deleteCategory,
} from "api/apiURLs";

export const getCategories = async () => {
  const response = await api.get(getCategoreis);
  return response.data;
};

export const createCategory = async (data) => {
  const response = await api.post(addCategory, data);
  return response.data;
};

export const updateCategory = async (data) => {
  const response = await api.patch(`${editCategory + data.get("id")}}`, data);
  console.log(response);

  return response.data;
};

export const removeCategory = async (id) => {
  const response = await api.delete(`${deleteCategory}${id}`);
  return response.data;
};
