import { api } from "api";
import {
  addSlider,
  deleteSlider,
  editSlider,
  getSliderData,
} from "api/apiURLs";

export const getSliders = async () => {
  const response = await api.get(getSliderData);
  return response.data;
};

export const createSlider = async (data) => {
  const response = await api.post(addSlider, data);
  return response.data;
};

export const updateSlider = async (data) => {
  const response = await api.patch(`${editSlider + data.get("id")}`, data);

  return response.data;
};

export const removeSlider = async (id) => {
  const response = await api.delete(`${deleteSlider}${id}`);
  return response.data;
};
