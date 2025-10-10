// hooks/useCategorys.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOption,
  getOptions,
  removeOption,
  updateOption,
} from "services/options";
import { setOptions } from "store/optionSlice";

const useOptions = () => {
  const options = useSelector((state) => state.option.options);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch Categorys
  const fetchOptions = async (params) => {
    setLoading(true);
    try {
      const data = await getOptions(params);
      dispatch(setOptions(data));
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch options");
    } finally {
      setLoading(false);
    }
  };

  // Create Category
  const addOption = async (newCategory) => {
    setLoading(true);
    try {
      const response = await createOption(newCategory);
      return response;
    } catch (err) {
      setError(err.response.data.message || "Failed to create Category");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Edit Category
  const editOption = async (updatedData) => {
    setLoading(true);
    try {
      const updated = await updateOption(updatedData);

      return updated;
    } catch (err) {
      setError(err.message || "Failed to update Category");
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const deleteOption = async (id) => {
    setLoading(true);
    try {
      await removeOption(id);
      return true;
    } catch (err) {
      setError(err.message || "Failed to delete Category");
    } finally {
      setLoading(false);
    }
  };

  return {
    options,
    loading,
    error,
    fetchOptions,
    addOption,
    editOption,
    deleteOption,
  };
};

export default useOptions;
