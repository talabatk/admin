import { Ring } from "@uiball/loaders";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import useOrder from "hooks/useOrder";
import { setPage } from "store/orderSlice";
import DeleteItem from "components/Ui/DeleteItem/DeleteItem";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import Order from "./Order/Order";
import useVendors from "hooks/useVendors";
import useUser from "hooks/useUser";

const Orders = (props) => {
  const adminInfo = useSelector((state) => state.auth.userData);
  const { vendors } = useVendors();
  const { users, fetchUsers } = useUser();
  const [orderValue, setOrderValue] = useState(1);
  const [deleteAllOrders, setDeleteAllOrders] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { loading, fetchOrders, deleteOrder, deleteOrders, editOrder } =
    useOrder();
  const page = useSelector((state) => state.order.page);
  const data = useSelector((state) => state.order.orders);
  const pages = useSelector((state) => state.order.pages);
  const count = useSelector((state) => state.order.count);
  const total = useSelector((state) => state.order.total);
  const shipping = useSelector((state) => state.order.shipping);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState(null);

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
    fetchOrders(newParams);
    fetchUsers({ role: "delivery" });
  }, [page, props.newOrder, searchParams]);

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
      searchParams.set("search", e.target[0].value);
    }
    setSearchParams(searchParams);
    dispatch(setPage(1));
  };

  const setSelectedOrderValue = (vendor) => {
    setSelectedOrder(vendor);
  };

  const toggleDelete = () => {
    setShowDelete((pre) => (pre = !pre));
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteOrder(selectedOrder.id);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        showMessage("warn", "تم الحذف", "تم حذف الطلب بنجاح");
        toggleDelete();
      } else {
        showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
    }
  };

  const deleteAll = async () => {
    try {
      const response = await deleteOrders(params);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        showMessage("warn", "تم الحذف", "تم حذف الطلبات بنجاح");
        setDeleteAllOrders(false);
        toggleDelete();
      } else {
        showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
      }
    } catch (err) {
      console.error("Error deleting order:", err);
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
          <div
            className="row row-cols-2 row-cols-md-3 filters"
            style={{ padding: "20px", alignItems: "center" }}>
            <div className="col">
              <h6>المطاعم</h6>
              <Form.Select
                defaultValue={searchParams.get("vendor") || ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    searchParams.delete("vendor");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.set("vendor", e.target.value);
                    setSearchParams(searchParams);
                  }
                }}>
                <option value={""}>الكل</option>
                {vendors?.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col">
              <h6>ديلفرى</h6>
              <Form.Select
                defaultValue={searchParams.get("delivery") || ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    searchParams.delete("delivery");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.set("delivery", e.target.value);
                    setSearchParams(searchParams);
                  }
                }}>
                <option value={""}>الكل</option>
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col">
              <h6>الحاله</h6>
              <Form.Select
                defaultValue={searchParams.get("status") || ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    searchParams.delete("status");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.set("status", e.target.value);
                    setSearchParams(searchParams);
                  }
                }}>
                <option value={""}>الكل</option>
                {status?.map((s) => (
                  <option key={s.en} value={s.en}>
                    {s.ar}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col" style={{ marginTop: "15px" }}>
              <h6>من</h6>
              <input
                className="form-control"
                type="date"
                defaultValue={searchParams.get("startDate") || ""}
                onChange={(e) => {
                  console.log(e.target.value);

                  if (e.target.value === "") {
                    searchParams.delete("startDate");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.set("startDate", e.target.value);
                    setSearchParams(searchParams);
                  }
                }}
              />
            </div>
            <div className="col" style={{ marginTop: "15px" }}>
              <h6>الى</h6>
              <input
                className="form-control"
                type="date"
                defaultValue={searchParams.get("endDate") || ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    searchParams.delete("endDate");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.set("endDate", e.target.value);
                    setSearchParams(searchParams);
                  }
                }}
              />
            </div>
            <div className="col" style={{ marginTop: "20px" }}>
              <h6>حساب الاجمالي</h6>
              <input
                className="form-control"
                type="number"
                defaultValue={1}
                min={1}
                onChange={(e) => {
                  setOrderValue(+e.target.value);
                }}
                style={{
                  maxWidth: "calc(50% - 20px)",
                  display: "inline-block",
                }}
              />
              <span className="vendor-total">{+count * orderValue} شيكل </span>
            </div>
          </div>
          <div
            className="row row-cols-1 row-cols-md-2"
            style={{ padding: "20px" }}>
            <div className="col" style={{ display: "flex", flexWrap: "wrap" }}>
              <div className="orders-total" style={{ marginLeft: "10px" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "10px",
                    color: "#0f7f3d",
                  }}>
                  الاجمالي:
                </span>
                <span>{total?.toLocaleString() || 0}</span>
              </div>
              <div className="orders-total">
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "10px",
                    color: "#0f7f3d",
                  }}>
                  نسبه 5%:
                </span>
                <span>{(total * 0.05).toLocaleString() || 0}</span>
              </div>
              <div className="orders-total" style={{ marginRight: "10px" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "10px",
                    color: "#0f7f3d",
                  }}>
                  اجمالي الشحن:
                </span>
                <span>{shipping?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>
          <div className="controls">
            <form style={{ display: "flex" }} onSubmit={searchChangeHandler}>
              <input
                type="search"
                placeholder="البحث بالأسم "
                defaultValue={searchParams.get("search") || ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    searchParams.delete("search");
                    setSearchParams(searchParams);
                  }
                }}
                style={{ minWidth: "200px" }}
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
            {adminInfo.name === "05432668291" || adminInfo.name === "دار" ? (
              <button
                onClick={() => {
                  setDeleteAllOrders(true);
                  toggleDelete();
                }}
                style={{ backgroundColor: "red", color: "#fff" }}>
                حذف الكل
              </button>
            ) : null}
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th style={{ width: "100px" }}>الاسم</th>
                  <th style={{ width: "80px" }}>المطعم</th>
                  <th style={{ width: "50px" }}>المجموع</th>
                  <th style={{ width: "100px" }}>الحاله</th>
                  <th style={{ width: "100px" }}>وقت التحضير</th>
                  <th style={{ width: "100px" }}>الديلفرى</th>
                  <th style={{ width: "100px" }}>نوع الطلب</th>
                  <th style={{ width: "100px" }}>طلب مجاني؟</th>
                  <th style={{ width: "100px" }}>وقت الانشاء</th>
                  <th style={{ width: "50px" }}>الاعدادات</th>
                </tr>
              </thead>
              {data.length ? (
                <tbody>
                  {data.map((order) => (
                    <Order
                      key={order.id}
                      order={order}
                      setSelectedOrder={setSelectedOrder}
                      setSelectedOrderValue={setSelectedOrderValue}
                      toggleDelete={toggleDelete}
                      editOrder={editOrder}
                    />
                  ))}
                </tbody>
              ) : (
                <h4>لا يوجد طلبات!</h4>
              )}
            </table>
          </div>
          <Stack spacing={1}>
            <Pagination
              count={pages}
              page={page}
              shape="rounded"
              color="#0f7f3d"
              style={{ margin: "20px auto 0" }}
              onChange={handleChangePage}
            />
          </Stack>
          <DeleteItem
            show={showDelete}
            close={toggleDelete}
            loading={loading}
            confirm={deleteAllOrders ? deleteAll : confirmDelete}
          />
        </>
      )}
    </div>
  );
};
export default Orders;

const status = [
  { en: "not started", ar: "لم يبدأ", color: "#6c757d" }, // Gray: Neutral/Inactive
  { en: "started", ar: "تم البدء  ", color: "#17a2b8" }, // Cyan: In Progress
  { en: "preparing", ar: "قيد التحضير", color: "#ffc107" }, // Yellow: Preparing/Waiting
  { en: "finished", ar: "انتهى التحضير", color: "#28a745" }, // Green: Success/Completed
  { en: "in the way", ar: "في الطريق", color: "#007bff" }, // Blue: On its way
  { en: "complete", ar: "اكتمل", color: "#20c997" }, // Teal: Fully Complete
  { en: "cancel", ar: "مرفوض", color: "#dc3545" }, // Red: Cancelled/Rejected
  { en: "deleted", ar: "تم المسح", color: "#343a40" }, // Dark Gray: Deleted/Removed
];
