import { Ring } from "@uiball/loaders";
import "assets/styles/table.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import DeleteItem from "components/Ui/DeleteItem/DeleteItem";
import Category from "./Category/Category";
import useOptions from "hooks/useOptions";
import { setPage } from "store/optionSlice";
import AddOptions from "./AddOptions/AddOptions";
import EditOptions from "./EditOptions/EditOptions";
import { Pagination, Stack } from "@mui/material";

const Options = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { loading, editOption, deleteOption, fetchOptions } = useOptions();
  const data = useSelector((state) => state.option.options);
  const pages = useSelector((state) => state.option.pages);
  const page = useSelector((state) => state.option.page);
  const toast = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let newParams = {};
    newParams.page = page;
    newParams.size = 10;

    fetchOptions(newParams);
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

  const toggleAddForm = () => {
    setShowAddForm((pre) => (pre = !pre));
  };

  const toggleEditForm = () => {
    setShowEditForm((pre) => (pre = !pre));
  };

  const setSelectedCategoryValue = (category) => {
    setSelectedCategory(category);
  };

  const toggleDelete = () => {
    setShowDelete((pre) => (pre = !pre));
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteOption(selectedCategory.id);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        showMessage("warn", "تم الحذف", "تم حذف الاضافه بنجاح");
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
                إضافه
              </button>
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10px" }}>#</th>
                  <th style={{ width: "100px" }}>الاسم</th>
                  <th style={{ width: "50px" }}>الاعدادات</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((category) => (
                    <Category
                      key={category.id}
                      category={category}
                      editCategory={editOption}
                      selectedCategory={selectedCategory}
                      toggleEditForm={toggleEditForm}
                      setSelectedCategoryValue={setSelectedCategoryValue}
                      toggleDelete={toggleDelete}
                    />
                  ))
                ) : (
                  <h4>لا يوجد اضافات!</h4>
                )}
              </tbody>
            </table>
          </div>
          <Stack spacing={1}>
            <Pagination
              count={pages}
              defaultPage={page}
              shape="rounded"
              color="#0f7f3d"
              style={{ margin: "20px auto 0" }}
              onChange={handleChangePage}
            />
          </Stack>
          <AddOptions
            show={showAddForm}
            close={toggleAddForm}
            showMessage={showMessage}
          />
          <EditOptions
            show={showEditForm}
            close={toggleEditForm}
            showMessage={showMessage}
            category={selectedCategory}
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
export default Options;
