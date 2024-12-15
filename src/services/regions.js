import { api } from "api";
import {
  createDeliveryArea,
  getDeliveryArea,
  deleteDeliveryArea,
  editDeliveryArea,
} from "api/apiURLs";

export const getAreas = async () => {
  const response = await api.get(getDeliveryArea);
  return response.data;
};

export const createArea = async (data) => {
  const response = await api.post(createDeliveryArea, data);
  return response.data;
};

export const updateArea = async (data) => {
  const response = await api.patch(
    `${editDeliveryArea + data.get("id")}}`,
    data
  );
  console.log(response);

  return response.data;
};

export const removeArea = async (id) => {
  const response = await api.delete(`${deleteDeliveryArea}${id}`);
  return response.data;
};
