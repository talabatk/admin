// hooks/useVendors.js
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVendors,
  createVendor,
  deleteVendor,
  editVendor,
  createCosts,
  getVendorById,
} from "services/vendors";
import { setVendors } from "store/vendorSlice";

const useVendors = () => {
  const vendors = useSelector((state) => state.vendor.vendors);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch Vendors
  const fetchVendors = async () => {
    setLoading(true);
    try {
      const data = await getVendors();

      dispatch(setVendors(data.results));
    } catch (err) {
      setError(err.message || "Failed to fetch Vendors");
    } finally {
      setLoading(false);
    }
  };

  // Create Vendor
  const addVendor = async (newVendor) => {
    setLoading(true);
    try {
      const response = await createVendor(newVendor);
      return response;
    } catch (err) {
      setError(err.response.data.message || "Failed to create Vendor");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Create Vendor
  const addDeliveryCost = async (costs) => {
    setLoading(true);
    try {
      const response = await createCosts(costs);
      return response;
    } catch (err) {
      setError(err.response.data.message || "Failed to create Vendor");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Create Vendor
  const getVendor = async (id) => {
    setLoading(true);
    try {
      const response = await getVendorById(id);
      return response;
    } catch (err) {
      setError(err.response.data.message || "Failed to create Vendor");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Edit Vendor
  const updateVendor = async (updatedData) => {
    setLoading(true);
    try {
      const updated = await editVendor(updatedData);
      return updated;
    } catch (err) {
      setError(err.message || "Failed to update Vendor");
    } finally {
      setLoading(false);
    }
  };

  // Delete Vendor
  const removeVendor = async (id) => {
    setLoading(true);
    try {
      await deleteVendor(id);

      dispatch(setVendors(vendors.filter((vendor) => vendor.id !== id)));

      return true;
    } catch (err) {
      setError(err.message || "Failed to delete Vendor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors(); // Fetch initial data
  }, []);

  return {
    vendors,
    loading,
    error,
    fetchVendors,
    addVendor,
    updateVendor,
    removeVendor,
    addDeliveryCost,
    getVendor,
  };
};

export default useVendors;
