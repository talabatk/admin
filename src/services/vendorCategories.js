import { api } from "api";

export const getCategories = async () => {
  const response = await api.get("api/vendor_category2");
  return response.data;
};

export const createCategory = async (data) => {
  const response = await api.post("api/vendor_category", data);
  return response.data;
};

export const updateCategory = async (data) => {
  const response = await api.patch(
    `${"api/vendor_category/" + data.get("id")}}`,
    data
  );

  return response.data;
};

export const removeCategory = async (id) => {
  const response = await api.delete(`api/vendor_category/${id}`);
  return response.data;
};
