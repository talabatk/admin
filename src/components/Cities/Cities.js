import { Ring } from "@uiball/loaders";
import "assets/styles/table.scss";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import DeleteItem from "components/Ui/DeleteItem/DeleteItem";
// import useCity from "@hooks/useCity";
import City from "./City/City";
import useCity from "hooks/useCity";
import AddCity from "./AddCity/AddCity";
import EditCity from "./EditCity/EditCity";

const Cities = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const { loading, deleteCity } = useCity();
  const data = useSelector((state) => state.city.cities);
  const toast = useRef(null);

  const showMessage = (type, head, content) => {
    toast.current.show({
      severity: type,
      summary: head,
      detail: content,
      life: 3000,
    });
  };

  const toggleAddForm = () => {
    setShowAddForm((pre) => (pre = !pre));
  };

  const toggleEditForm = () => {
    setShowEditForm((pre) => (pre = !pre));
  };

  const setSelectedRegionValue = (category) => {
    setSelectedRegion(category);
  };

  const toggleDelete = () => {
    setShowDelete((pre) => (pre = !pre));
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteCity(selectedRegion.id);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        showMessage("warn", "تم الحذف", "تم حذف المنطقه بنجاح");
        toggleDelete();
      } else {
        showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
      }
    } catch (err) {
      console.error("Error adding Area:", err);
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
            <div>
              <button className="button" onClick={toggleAddForm}>
                إضافه مدينه
              </button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th style={{ width: "100px" }}>الاسم</th>
                  <th style={{ width: "100px" }}>الاسم باللغه الانجليزيه</th>
                  <th style={{ width: "50px" }}>الاعدادات</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((region) => (
                    <City
                      key={region.id}
                      region={region}
                      selectedRegion={selectedRegion}
                      toggleEditForm={toggleEditForm}
                      setSelectedRegionValue={setSelectedRegionValue}
                      toggleDelete={toggleDelete}
                    />
                  ))
                ) : (
                  <h4>لا يوجد مدن!</h4>
                )}
              </tbody>
            </table>
          </div>
          <AddCity
            show={showAddForm}
            close={toggleAddForm}
            showMessage={showMessage}
          />
          <EditCity
            show={showEditForm}
            close={toggleEditForm}
            showMessage={showMessage}
            region={selectedRegion}
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
export default Cities;
