// hooks/useProduct.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  addProduct,
  updateProduct,
  removeProduct,
  addGroup,
  getProductById,
  removeGroup,
  removeOption,
} from "services/products";
import { setProducts } from "store/productSlice";
import { useSearchParams } from "react-router-dom";

const useProduct = () => {
  const products = useSelector((state) => state.product.products);
  const page = useSelector((state) => state.product.page);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const [params, setParams] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let newParams = {};
    newParams.page = page;
    newParams.size = 12;

    if (searchParams.get("search")) {
      newParams.search = searchParams.get("search");
    }
    if (searchParams.get("vendor")) {
      newParams.vendorId = searchParams.get("vendor");
    }
    if (searchParams.get("category")) {
      newParams.categoryId = searchParams.get("category");
    }
    if (searchParams.get("recent")) {
      newParams.recent = searchParams.get("recent");
    }
    if (searchParams.get("bestseller")) {
      newParams.bestSeller = searchParams.get("bestseller");
    }
    if (searchParams.get("featured")) {
      newParams.featured = searchParams.get("featured");
    }

    setParams(newParams);
  }, [page, searchParams]);

  // Fetch Product
  const fetchProducts = async (params) => {
    setLoading(true);
    try {
      const data = await getProducts(params);

      dispatch(setProducts(data));
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Product
  const fetchProductBYId = async (id) => {
    setLoading(true);
    try {
      const data = await getProductById(id);

      return data.product;
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };
  // Create Product
  const createProduct = async (newProduct) => {
    setLoading(true);
    try {
      const response = await addProduct(newProduct);
      return response;
    } catch (err) {
      setError(err.response.data?.message || "Failed to create product");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Create Product
  const createGroup = async (groups) => {
    setLoading(true);
    try {
      const response = await addGroup(groups);
      return response;
    } catch (err) {
      setError(err | "Failed to create group");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Edit Product
  const editProduct = async (updatedData) => {
    setLoading(true);
    try {
      const updated = await updateProduct(updatedData);

      fetchProducts(params);

      return updated;
    } catch (err) {
      setError(err.response.data.message || "Failed to edit product");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await removeProduct(id);

      fetchProducts(params);

      return true;
    } catch (err) {
      setError(err.message || "Failed to delete Product");
      return err;
    } finally {
      setLoading(false);
    }
  };
  // Delete Product
  const deleteGroup = async (id) => {
    setLoading(true);
    try {
      await removeGroup(id);
      return true;
    } catch (err) {
      setError(err.message || "Failed to delete Product");
      return err;
    } finally {
      setLoading(false);
    }
  };
  const deleteOption = async (id) => {
    setLoading(true);
    try {
      await removeOption(id);
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
    fetchProducts,
    editProduct,
    createProduct,
    deleteProduct,
    createGroup,
    fetchProductBYId,
    deleteGroup,
    deleteOption,
  };
};

export default useProduct;
