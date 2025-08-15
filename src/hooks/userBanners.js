// hooks/useCategorys.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBanner,
  getBanners,
  removeBanner,
  updateBanner,
} from "services/banners";
import { setBanners } from "store/bannerSlice";

const useBanner = () => {
  const banner = useSelector((state) => state.banner.banners);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch Categorys
  const fetchBanner = async () => {
    setLoading(true);
    try {
      const data = await getBanners();
      dispatch(setBanners(data.results));
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch Categorys");
    } finally {
      setLoading(false);
    }
  };

  // Create Category
  const addBanner = async (newCategory) => {
    setLoading(true);
    try {
      const response = await createBanner(newCategory);
      fetchBanner();
      return response;
    } catch (err) {
      setError(err.response.data.message || "Failed to create Category");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Edit Category
  const editBanner = async (updatedData) => {
    setLoading(true);
    try {
      const updated = await updateBanner(updatedData);

      fetchBanner();

      return updated;
    } catch (err) {
      setError(err.message || "Failed to update slider");
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const deleteBanner = async (id) => {
    setLoading(true);
    try {
      await removeBanner(id);
      fetchBanner();
      return true;
    } catch (err) {
      setError(err.message || "Failed to delete slider");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchbanner(); // Fetch initial data
  // }, []);

  return {
    banner,
    loading,
    error,
    fetchBanner,
    addBanner,
    editBanner,
    deleteBanner,
  };
};

export default useBanner;
