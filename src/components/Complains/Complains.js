import { Ring } from "@uiball/loaders";
import "assets/styles/table.scss";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { setPage } from "store/complainSlice";
import DeleteItem from "components/Ui/DeleteItem/DeleteItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import useComplain from "hooks/useComplain";
import Complain from "./complainItem";
import SendNotification from "./SendNotification/SendNotification";

const Complains = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showSendNotification, setSendNotification] = useState(false);
  const [selectedComplain, setSelectedComplain] = useState(null);
  const { loading, fetchComplains, deleteComplain } = useComplain();
  const page = useSelector((state) => state.complain.page);
  const data = useSelector((state) => state.complain.complains);
  const pages = useSelector((state) => state.complain.pages);
  const dispatch = useDispatch();
  const toast = useRef(null);

  useEffect(() => {
    let newParams = {};
    newParams.page = page;
    newParams.size = 12;

    fetchComplains(newParams);
  }, [page]);

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

  const toggleDelete = () => {
    setShowDelete((pre) => (pre = !pre));
  };

  const toggleNotification = () => {
    setSendNotification((pre) => (pre = !pre));
  };

  const setSelectedComplainValue = (complain) => {
    setSelectedComplain(complain);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteComplain(selectedComplain.id);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        showMessage("warn", "تم الحذف", "تم حذف الشكوى بنجاح");
        toggleDelete();
      } else {
        showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      showMessage("error", "هناك خطأ", "حدث خطأ غير متوقع");
    }
  };

  return (
    <div className="items">
      <Toast style={{ direction: "rtf" }} ref={toast} position="top-left" />
      <h2
        className="text-center"
        style={{ margin: "20px 0", color: "#0f7f3d" }}
      >
        الشكاوى
      </h2>
      {loading ? (
        <div className="loadingSpinner">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : (
        <>
          <div className="row row-cols-1" style={{ padding: "10px" }}>
            {data.length ? (
              data.map((complain) => (
                <Complain
                  complain={complain}
                  toggleDelete={toggleDelete}
                  setSelectedComplainValue={setSelectedComplainValue}
                  toggleNotification={toggleNotification}
                  key={complain.id}
                />
              ))
            ) : (
              <h3>لا يوجد شكاوى</h3>
            )}
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
          <SendNotification
            show={showSendNotification}
            close={toggleNotification}
            fcm={selectedComplain ? selectedComplain.user.fcm : ""}
            showMessage={showMessage}
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
export default Complains;
