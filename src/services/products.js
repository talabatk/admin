import { api } from "api";
import {
  createCommonGroup,
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "api/apiURLs";

export const getProducts = async (params) => {
  const response = await api.get(getAllProducts, { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`${getAllProducts}/${id}`);
  return response.data;
};

export const addProduct = async (data) => {
  const response = await api.post(createProduct, data);
  return response.data;
};
export const addGroup = async (data) => {
  const response = await api.post(createCommonGroup, data);
  return response.data;
};

export const updateProduct = async (data) => {
  const response = await api.patch(`${editProduct + data.get("id")}`, data);
  console.log(response);

  return response.data;
};

export const removeProduct = async (id) => {
  const response = await api.delete(`${deleteProduct}${id}`);
  return response.data;
};
