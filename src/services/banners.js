import { api } from "api";

export const getBanners = async () => {
  const response = await api.get("api/banner");
  return response.data;
};

export const createBanner = async (data) => {
  const response = await api.post("api/banner", data);
  return response.data;
};

export const updateBanner = async (data) => {
  const response = await api.patch(`api/banner/${data.get("id")}`, data);

  return response.data;
};

export const removeBanner = async (id) => {
  const response = await api.delete(`api/banner/${id}`);
  return response.data;
};
