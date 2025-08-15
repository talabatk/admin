import { api } from "api";

export const getCitys = async () => {
  const response = await api.get("api/city");
  return response.data;
};

export const createCity = async (data) => {
  const response = await api.post("api/city", data);
  return response.data;
};

export const updateCity = async (data) => {
  const response = await api.patch(`api/city/${data.get("id")}`, data);

  return response.data;
};

export const removeCity = async (id) => {
  const response = await api.delete(`api/city/${id}`);
  return response.data;
};
