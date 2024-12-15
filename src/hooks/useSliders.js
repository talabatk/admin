// hooks/useCategorys.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSlider,
  getSliders,
  removeSlider,
  updateSlider,
} from "services/sliders";
import { setSliders } from "store/sliderSlice";

const useSliders = () => {
  const sliders = useSelector((state) => state.slider.sliders);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch Categorys
  const fetchSliders = async () => {
    setLoading(true);
    try {
      const data = await getSliders();
      dispatch(setSliders(data.results));
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch Categorys");
    } finally {
      setLoading(false);
    }
  };

  // Create Category
  const addSlider = async (newCategory) => {
    setLoading(true);
    try {
      const response = await createSlider(newCategory);
      fetchSliders();
      return response;
    } catch (err) {
      setError(err.response.data.message || "Failed to create Category");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Edit Category
  const editSlider = async (updatedData) => {
    setLoading(true);
    try {
      const updated = await updateSlider(updatedData);

      fetchSliders();

      return updated;
    } catch (err) {
      setError(err.message || "Failed to update slider");
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const deleteSlider = async (id) => {
    setLoading(true);
    try {
      await removeSlider(id);
      fetchSliders();
      return true;
    } catch (err) {
      setError(err.message || "Failed to delete slider");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchSliders(); // Fetch initial data
  // }, []);

  return {
    sliders,
    loading,
    error,
    fetchSliders,
    addSlider,
    editSlider,
    deleteSlider,
  };
};

export default useSliders;
