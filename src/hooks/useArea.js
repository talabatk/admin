// hooks/useCategorys.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArea, getAreas, removeArea, updateArea } from "services/regions";
import { setAreas } from "store/areaSlice";

const useArea = () => {
  const areas = useSelector((state) => state.area.areas);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch Categorys
  const fetchAreas = async () => {
    setLoading(true);
    try {
      const data = await getAreas();
      dispatch(setAreas(data.results));
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch Categorys");
    } finally {
      setLoading(false);
    }
  };

  // Create Category
  const addArea = async (newArea) => {
    setLoading(true);
    try {
      const response = await createArea(newArea);
      fetchAreas();
      return response;
    } catch (err) {
      setError(err.response.data.message || "Failed to create Category");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Edit Category
  const editArea = async (updatedData) => {
    setLoading(true);
    try {
      const updated = await updateArea(updatedData);

      fetchAreas();

      return updated;
    } catch (err) {
      setError(err.message || "Failed to update Category");
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const deleteArea = async (id) => {
    setLoading(true);
    try {
      await removeArea(id);
      return true;
    } catch (err) {
      setError(err.message || "Failed to delete Category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas(); // Fetch initial data
  }, []);

  return {
    areas,
    loading,
    error,
    fetchAreas,
    addArea,
    editArea,
    deleteArea,
  };
};

export default useArea;
