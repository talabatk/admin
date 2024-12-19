import { api } from "api";

export const getComplains = async (params) => {
  const response = await api.get("api/complains", { params });
  return response.data;
};

export const removeComplains = async (id) => {
  const response = await api.delete(`api/complains/${id}`);
  return response.data;
};
