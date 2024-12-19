// hooks/useProduct.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComplains, removeComplains } from "services/complains";
import { setComplains } from "store/complainSlice";
import { useSearchParams } from "react-router-dom";

const useProduct = () => {
  const products = useSelector((state) => state.complain.complains);
  const page = useSelector((state) => state.complain.page);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const [params, setParams] = useState({});

  useEffect(() => {
    let newParams = {};
    newParams.page = page;
    newParams.size = 12;

    setParams(newParams);
  }, [page]);

  // Fetch Product
  const fetchComplains = async (params) => {
    setLoading(true);
    try {
      const data = await getComplains(params);
      dispatch(setComplains(data));
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch complains");
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const deleteComplain = async (id) => {
    setLoading(true);
    try {
      await removeComplains(id);
      fetchComplains(params);
      return true;
    } catch (err) {
      setError(err.message || "Failed to delete Product");
      return err;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchComplains,
    deleteComplain,
  };
};

export default useProduct;
