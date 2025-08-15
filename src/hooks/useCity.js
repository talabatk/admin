// hooks/useCategorys.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCity, getCitys, removeCity, updateCity } from "services/cities";
import { setCities } from "store/citySlice";

const useCity = () => {
  const cities = useSelector((state) => state.city.cities);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch Categorys
  const fetchCities = async () => {
    setLoading(true);
    try {
      const data = await getCitys();
      dispatch(setCities(data.results));
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch Categorys");
    } finally {
      setLoading(false);
    }
  };

  // Create Category
  const addCity = async (newArea) => {
    setLoading(true);
    try {
      const response = await createCity(newArea);
      fetchCities();
      return response;
    } catch (err) {
      setError(err.response.data.message || "Failed to create Category");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Edit Category
  const editCity = async (updatedData) => {
    setLoading(true);
    try {
      const updated = await updateCity(updatedData);

      fetchCities();

      return updated;
    } catch (err) {
      setError(err.message || "Failed to update Category");
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const deleteCity = async (id) => {
    setLoading(true);
    try {
      await removeCity(id);
      return true;
    } catch (err) {
      setError(err.message || "Failed to delete Category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities(); // Fetch initial data
  }, []);

  return {
    cities,
    loading,
    error,
    fetchCities,
    addCity,
    editCity,
    deleteCity,
  };
};

export default useCity;
