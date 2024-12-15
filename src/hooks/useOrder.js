// hooks/useOrder.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  getOrder,
  removeOrder,
  updateOrder,
} from "services/order";
import { setOrders } from "store/orderSlice";
import { useSearchParams } from "react-router-dom";

const useOrder = () => {
  const orders = useSelector((state) => state.order.orders);
  const page = useSelector((state) => state.order.page);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const [params, setParams] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let newParams = {};
    newParams.page = page;
    newParams.size = 12;
    if (searchParams.get("vendor")) {
      newParams.vendorId = searchParams.get("vendor");
    }
    if (searchParams.get("delivery")) {
      newParams.deliveryId = searchParams.get("delivery");
    }
    if (searchParams.get("status")) {
      newParams.status = searchParams.get("status");
    }
    if (searchParams.get("startDate")) {
      newParams.startDate = searchParams.get("startDate");
    }
    if (searchParams.get("endDate")) {
      newParams.endDate = searchParams.get("endDate");
    }
    if (searchParams.get("search")) {
      newParams.search = searchParams.get("search");
    }
    setParams(newParams);
  }, [page, searchParams]);

  // Fetch Order
  const fetchOrders = async (params) => {
    setLoading(true);
    try {
      const data = await getAllOrders(params);

      dispatch(setOrders(data));
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Order
  const fetchOrderBYId = async (id) => {
    setLoading(true);
    try {
      const data = await getOrder(id);

      return data.order;
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Edit Order
  const editOrder = async (id, updatedData) => {
    setLoading(true);
    try {
      const updated = await updateOrder(id, updatedData);

      fetchOrders(params);

      return updated;
    } catch (err) {
      setError(err.response.data.message || "Failed to edit product");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Delete Order
  const deleteOrder = async (id) => {
    setLoading(true);
    try {
      await removeOrder(id);

      fetchOrders(params);

      return true;
    } catch (err) {
      setError(err.message || "Failed to delete Order");
      return err;
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    fetchOrderBYId,
    deleteOrder,
    editOrder,
  };
};

export default useOrder;
