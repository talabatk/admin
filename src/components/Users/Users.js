import { Ring } from "@uiball/loaders";
import "assets/styles/table.scss";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import useUser from "hooks/useUser";
import { setPage } from "store/userSlice";
import DeleteItem from "components/Ui/DeleteItem/DeleteItem";
import User from "./User/User";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import AddUser from "./AddUser/AddUser";
import EditUser from "./EditUser/EditUser";
import { Form } from "react-bootstrap";
import useCity from "hooks/useCity";

const Users = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { loading, fetchUsers, deleteUser } = useUser();
  const page = useSelector((state) => state.user.page);
  const data = useSelector((state) => state.user.users);
  const pages = useSelector((state) => state.user.pages);
  const currentPage = useSelector((state) => state.user.page);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cities } = useCity();

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
    fetchUsers(newParams);
  }, [page, searchParams]);

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const showMessage = (type, head, content) => {
    toast.current.show({
      severity: type,
      summary: head,
      detail: content,
      life: 3000,
    });
  };

  const searchChangeHandler = (e) => {
    e.preventDefault();
    if (e.target[0].value !== "") {
      console.log(e.target[0].value);
      searchParams.set("role", e.target[0].value);
    }
    if (e.target[1].value !== "") {
      console.log(e.target[0].value);
      searchParams.set("search", e.target[1].value);
    }
    setSearchParams(searchParams);
    dispatch(setPage(1));
  };

  const toggleAddForm = () => {
    setShowAddForm((pre) => (pre = !pre));
  };

  const toggleEditForm = () => {
    setShowEditForm((pre) => (pre = !pre));
  };

  const setSelectedUserValue = (vendor) => {
    setSelectedUser(vendor);
  };

  const toggleDelete = () => {
    setShowDelete((pre) => (pre = !pre));
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteUser(selectedUser.id);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        showMessage("warn", "تم الحذف", "تم حذف المستخدم بنجاح");
        toggleDelete();
      } else {
        showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
    }
  };

  return (
    <div className="items">
      <Toast style={{ direction: "rtf" }} ref={toast} position="top-left" />

      {loading ? (
        <div className="loadingSpinner">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : (
        <>
          <div className="controls">
            <form style={{ display: "flex" }} onSubmit={searchChangeHandler}>
              <Form.Select
                defaultValue={searchParams.get("role") || ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    searchParams.delete("role");
                    setSearchParams(searchParams);
                  }
                }}>
                <option value={""}>الكل</option>
                <option value={"delivery"}>عامل توصيل</option>
                <option value={"customer"}>مستخدم</option>
                <option value={"vendor"}>مطعم</option>
                <option value={"admin"}>مشرف</option>
              </Form.Select>
              <input
                type="search"
                placeholder="البحث بالهاتف "
                defaultValue={searchParams.get("search") || ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    searchParams.delete("search");
                    setSearchParams(searchParams);
                  }
                }}
                className="form-control"
              />
              <button type="submit" style={{ background: "transparent" }}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="lg"
                  color="#0f7f3d"
                />
              </button>
            </form>
            <div>
              <button className="button" onClick={toggleAddForm}>
                إضافه مستخدم
              </button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th style={{ width: "100px" }}>الاسم</th>
                  <th style={{ width: "80px" }}>العنوان</th>
                  <th style={{ width: "80px" }}>المدينه</th>
                  <th style={{ width: "50px" }}>النوع</th>
                  <th style={{ width: "100px" }}>الحظر</th>
                  <th style={{ width: "50px" }}>الاعدادات</th>
                </tr>
              </thead>
              {data.length ? (
                <tbody>
                  {data.map((user) => (
                    <User
                      key={user.id}
                      user={user}
                      setSelectedUser={setSelectedUser}
                      toggleEditForm={toggleEditForm}
                      setSelectedUserValue={setSelectedUserValue}
                      toggleDelete={toggleDelete}
                    />
                  ))}
                </tbody>
              ) : (
                <h4>لا يوجد مطاعم!</h4>
              )}
            </table>
          </div>
          <Stack spacing={1}>
            <Pagination
              count={pages}
              defaultPage={currentPage}
              shape="rounded"
              color="#0f7f3d"
              style={{ margin: "20px auto 0" }}
              onChange={handleChangePage}
            />
          </Stack>
          <AddUser
            show={showAddForm}
            close={toggleAddForm}
            showMessage={showMessage}
            cities={cities}
          />
          <EditUser
            show={showEditForm}
            close={toggleEditForm}
            showMessage={showMessage}
            user={selectedUser}
            cities={cities}
          />
          <DeleteItem
            show={showDelete}
            close={toggleDelete}
            loading={loading}
            confirm={confirmDelete}
          />
        </>
      )}
    </div>
  );
};
export default Users;
