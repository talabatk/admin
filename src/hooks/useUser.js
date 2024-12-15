// hooks/useCategorys.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  editUser,
  removeUser,
  createAdmin,
  createDelivery,
} from "services/user";
import { setUsers } from "store/userSlice";
import { useSearchParams } from "react-router-dom";

const useUser = () => {
  const users = useSelector((state) => state.user.users);
  const page = useSelector((state) => state.user.page);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const [params, setParams] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let newParams = {};
    newParams.page = page;
    newParams.size = 10;

    if (searchParams.get("search")) {
      newParams.search = searchParams.get("search");
    }
    if (searchParams.get("role")) {
      newParams.role = searchParams.get("role");
    }

    setParams(newParams);
  }, [page, searchParams]);

  // Fetch Categorys
  const fetchUsers = async (params) => {
    setLoading(true);
    try {
      const data = await getUsers(params);
      dispatch(setUsers(data));
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Create Category
  const addAdmin = async (newAdmin) => {
    setLoading(true);
    try {
      const response = await createAdmin(newAdmin);
      fetchUsers(params);
      return response;
    } catch (err) {
      setError(err.response.data?.message || "Failed to create admin");
      return err;
    } finally {
      setLoading(false);
    }
  };

  // Edit Category
  const addDelivery = async (updatedData) => {
    setLoading(true);
    try {
      const updated = await createDelivery(updatedData);

      fetchUsers(params);

      return updated;
    } catch (err) {
      setError(err.response.data.message || "Failed to add delivery");
      return err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedData) => {
    setLoading(true);
    try {
      const updated = await editUser(updatedData);

      fetchUsers(params);

      return updated;
    } catch (err) {
      setError(err.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await removeUser(id);

      fetchUsers(params);

      return true;
    } catch (err) {
      setError(err.message || "Failed to delete Category");
      return err;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    addAdmin,
    addDelivery,
    deleteUser,
    updateUser,
  };
};

export default useUser;
