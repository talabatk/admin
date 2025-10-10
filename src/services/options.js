import { api } from "api";

export const getOptions = async (params) => {
  const response = await api.get("api/general-option", { params });
  return response.data;
};

export const createOption = async (data) => {
  const response = await api.post("api/general-option", data);
  return response.data;
};

export const updateOption = async (data) => {
  const response = await api.patch(
    `${"api/general-option/" + data.get("id")}}`,
    data
  );
  console.log(response);

  return response.data;
};

export const removeOption = async (id) => {
  const response = await api.delete(`api/general-option/${id}`);
  return response.data;
};
