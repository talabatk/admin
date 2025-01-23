// hooks/useCategorys.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  updateCategory,
  removeCategory,
} from "services/vendorCategories";
import { setCategories } from "store/vendorCategories";

const useVendorCategories = () => {
  const categories = useSelector((state) => state.vendorCategory.categories);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch Categorys
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      dispatch(setCategories(data.results));
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch Categorys");
    } finally {
      setLoading(false);
    }
  };

  // Create Category
  const addCategory = async (newCategory) => {
    setLoading(true);
    try {
      const response = await createCategory(newCategory);
      fetchCategories();
      return response;
    } catch (err) {
      setError(err.response.data.message || "Failed to create Category");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Edit Category
  const editCategory = async (updatedData) => {
    setLoading(true);
    try {
      const updated = await updateCategory(updatedData);

      fetchCategories();

      return updated;
    } catch (err) {
      setError(err.message || "Failed to update Category");
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      await removeCategory(id);
      return true;
    } catch (err) {
      setError(err.message || "Failed to delete Category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch initial data
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    editCategory,
    deleteCategory,
  };
};

export default useVendorCategories;
