import { Ring } from "@uiball/loaders";
import "assets/styles/table.scss";
import useVendors from "hooks/useVendors";
import { useDispatch, useSelector } from "react-redux";
import Vendor from "./Vendor/Vendor";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  filterDateByName,
  setPage,
  setVendors,
  filterDateByCity,
} from "store/vendorSlice";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import DeleteItem from "components/Ui/DeleteItem/DeleteItem";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";

const Vendors = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const { vendors, loading, updateVendor, removeVendor } = useVendors();
  const currentPageData = useSelector((state) => state.vendor.currentPageData);
  const pages = useSelector((state) => state.vendor.pages);
  const currentPage = useSelector((state) => state.vendor.currentPage);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const cities = useSelector((state) => state.city.cities);
  const adminInfo = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!adminInfo?.super_admin) {
      dispatch(filterDateByCity(adminInfo.cityId));
    }
  }, [adminInfo]);
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
    const value = e.target.value;
    if (value !== "") {
      dispatch(filterDateByName(value));
    } else {
      dispatch(setVendors(vendors));
    }
  };
  const searchChangeCity = (e) => {
    const value = e.target.value;
    if (value !== "") {
      dispatch(filterDateByCity(value));
    } else {
      dispatch(setVendors(vendors));
    }
  };
  const setSelectedVendorValue = (vendor) => {
    setSelectedVendor(vendor);
  };

  const toggleDelete = () => {
    setShowDelete((pre) => (pre = !pre));
  };

  const confirmDelete = async () => {
    try {
      const response = await removeVendor(selectedVendor.id);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        showMessage("warn", "تم الحذف", "تم حذف المطعم بنجاح");
        toggleDelete();
      } else {
        showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
      }
    } catch (err) {
      console.error("Error adding vendor:", err);
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
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="search"
                placeholder="البحث بإستخدام الاسم "
                className="form-control"
                onChange={searchChangeHandler}
              />
              {adminInfo?.super_admin ? (
                <Form.Select onChange={searchChangeCity}>
                  <option value={""}>الكل</option>
                  {cities?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              ) : null}
            </div>
            <div>
              <NavLink to={"add"} className="button">
                إضافه مطعم
              </NavLink>
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
                  <th style={{ width: "50px" }}>المناطق</th>
                  <th style={{ width: "100px" }}>الحاله</th>
                  <th style={{ width: "100px" }}>التصنيف</th>
                  <th style={{ width: "100px" }}>النوع</th>
                  <th style={{ width: "50px" }}>الاعدادات</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData ? (
                  currentPageData.map((vendor) => (
                    <Vendor
                      key={vendor.id}
                      vendor={vendor}
                      updateVendor={updateVendor}
                      setSelectedVendor={setSelectedVendor}
                      setSelectedVendorValue={setSelectedVendorValue}
                      toggleDelete={toggleDelete}
                    />
                  ))
                ) : (
                  <h4>لا يوجد مطاعم!</h4>
                )}
              </tbody>
            </table>
          </div>
          <Stack spacing={1}>
            <Pagination
              count={pages}
              page={currentPage}
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
            confirm={confirmDelete}
          />
        </>
      )}
    </div>
  );
};
export default Vendors;
