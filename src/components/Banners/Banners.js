import { Ring } from "@uiball/loaders";
import "assets/styles/table.scss";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import DeleteItem from "components/Ui/DeleteItem/DeleteItem";
import useBanner from "hooks/userBanners";
import Banner from "./Banner/Banner";
import AddBanner from "./AddBanner/AddBanner";
import EditBanner from "./EditBanner/EditBanner";

const Banners = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const { loading, deleteBanner, fetchBanner } = useBanner();
  const data = useSelector((state) => state.banner.banners);
  const toast = useRef(null);

  useEffect(() => {
    fetchBanner();
  }, []);

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

  const setSelectedSliderValue = (slider) => {
    setSelectedSlider(slider);
  };

  const toggleDelete = () => {
    setShowDelete((pre) => (pre = !pre));
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteBanner(selectedSlider.id);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        showMessage("warn", "تم الحذف", "تم حذف سلايدر بنجاح");
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
            <div>
              <button className="button" onClick={toggleAddForm}>
                إضافه بانر
              </button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th style={{ width: "100px" }}>العنوان</th>
                  <th style={{ width: "80px" }}>الوصف</th>
                  <th style={{ width: "80px" }}>الحاله</th>
                  <th style={{ width: "50px" }}>الاعدادات</th>
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  data.map((slider) => (
                    <Banner
                      key={slider.id}
                      slider={slider}
                      selectedSlider={selectedSlider}
                      toggleEditForm={toggleEditForm}
                      setSelectedSliderValue={setSelectedSliderValue}
                      toggleDelete={toggleDelete}
                    />
                  ))
                ) : (
                  <h4>لا يوجد بيانات!</h4>
                )}
              </tbody>
            </table>
          </div>
          <AddBanner
            show={showAddForm}
            close={toggleAddForm}
            showMessage={showMessage}
          />
          <EditBanner
            show={showEditForm}
            close={toggleEditForm}
            showMessage={showMessage}
            slider={selectedSlider}
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
export default Banners;
