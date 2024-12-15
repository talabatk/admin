import { Ring } from "@uiball/loaders";
import "assets/styles/table.scss";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import DeleteItem from "components/Ui/DeleteItem/DeleteItem";
import useVendors from "hooks/useVendors";
import useSliders from "hooks/useSliders";
import Slider from "./Slider/Slider";
import AddSlider from "./AddSlider/Addslider";
import EditSlider from "./EditSlider/EditSlider";

const Sliders = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const { loading, deleteSlider, fetchSliders } = useSliders();
  const { vendors } = useVendors();
  const data = useSelector((state) => state.slider.sliders);
  const toast = useRef(null);

  useEffect(() => {
    fetchSliders();
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
      const response = await deleteSlider(selectedSlider.id);
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
                إضافه سلايدر
              </button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th style={{ width: "100px" }}>العنوان</th>
                  <th style={{ width: "80px" }}>المطعم</th>
                  <th style={{ width: "50px" }}>الاعدادات</th>
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  data.map((slider) => (
                    <Slider
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
          <AddSlider
            show={showAddForm}
            close={toggleAddForm}
            showMessage={showMessage}
            vendors={vendors}
          />
          <EditSlider
            show={showEditForm}
            close={toggleEditForm}
            showMessage={showMessage}
            slider={selectedSlider}
            vendors={vendors}
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
export default Sliders;
