import { Ring } from "@uiball/loaders";
import "assets/styles/table.scss";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { setPage } from "store/productSlice";
import DeleteItem from "components/Ui/DeleteItem/DeleteItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import useProduct from "hooks/useProducts";
import Product from "./Product/Product";
import useVendors from "hooks/useVendors";
import useCategories from "hooks/useCateogries";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const Products = () => {
  const { vendors } = useVendors();
  const { categories } = useCategories();
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { loading, fetchProducts, deleteProduct } = useProduct();
  const page = useSelector((state) => state.product.page);
  const data = useSelector((state) => state.product.products);
  const pages = useSelector((state) => state.product.pages);
  const currentPage = useSelector((state) => state.product.page);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    let newParams = {};
    newParams.page = page;
    newParams.size = 12;

    if (searchParams.get("search")) {
      newParams.search = searchParams.get("search");
    }
    if (searchParams.get("vendor")) {
      newParams.vendorId = searchParams.get("vendor");
    }
    if (searchParams.get("category")) {
      newParams.categoryId = searchParams.get("category");
    }
    if (searchParams.get("recent")) {
      newParams.recent = searchParams.get("recent");
    }
    if (searchParams.get("bestseller")) {
      newParams.bestSeller = searchParams.get("bestseller");
    }
    if (searchParams.get("featured")) {
      newParams.featured = searchParams.get("featured");
    }
    fetchProducts(newParams);
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
      searchParams.set("search", e.target[0].value);
    }
    setSearchParams(searchParams);
    dispatch(setPage(1));
  };

  const toggleAddForm = () => {
    navigate("add");
  };

  const toggleDelete = () => {
    setShowDelete((pre) => (pre = !pre));
  };

  const setSelectedProductValue = (product) => {
    setSelectedProduct(product);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteProduct(selectedProduct.id);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        showMessage("warn", "تم الحذف", "تم حذف المنتج بنجاح");
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

      {loading ? (
        <div className="loadingSpinner">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : (
        <>
          <div
            className="row row-cols-2 row-cols-md-3 filters"
            style={{ padding: "20px", alignItems: "center" }}
          >
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
                }}
              >
                <option value={""}>الكل</option>
                {vendors?.map((vendor) => (
                  <option value={vendor.id}>{vendor.name}</option>
                ))}
              </Form.Select>
            </div>
            <div className="col">
              <h6>الاقسام</h6>
              <Form.Select
                defaultValue={searchParams.get("category") || ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    searchParams.delete("category");
                    setSearchParams(searchParams);
                  } else {
                    searchParams.set("category", e.target.value);
                    setSearchParams(searchParams);
                  }
                }}
              >
                <option value={""}>الكل</option>
                {categories?.map((category) => (
                  <option value={category.id}>{category.name}</option>
                ))}
              </Form.Select>
            </div>
            <div className="col">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={searchParams.get("recent") || false}
                      color="warning"
                      onChange={(e) => {
                        if (e.target.checked) {
                          searchParams.set("recent", true);
                          setSearchParams(searchParams);
                        }
                        if (!e.target.checked) {
                          searchParams.delete("recent");
                          setSearchParams(searchParams);
                        }
                      }}
                    />
                  }
                  label="ترتيب من الاحدث للاقدم"
                />
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="warning"
                      defaultChecked={searchParams.get("bestseller") || false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          searchParams.set("bestseller", true);
                          setSearchParams(searchParams);
                        }
                        if (!e.target.checked) {
                          searchParams.delete("bestseller");
                          setSearchParams(searchParams);
                        }
                      }}
                    />
                  }
                  label="ترتيب من الاعلي مبيعا"
                />
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      defaultChecked={searchParams.get("featured") || false}
                      color="warning"
                      onChange={(e) => {
                        if (e.target.checked) {
                          searchParams.set("featured", true);
                          setSearchParams(searchParams);
                        }
                        if (!e.target.checked) {
                          searchParams.delete("featured");
                          setSearchParams(searchParams);
                        }
                      }}
                    />
                  }
                  label="المنتجات المميزه"
                />
              </FormGroup>
            </div>
          </div>
          <div className="controls">
            <form style={{ display: "flex" }} onSubmit={searchChangeHandler}>
              <input
                type="search"
                placeholder="البحث بإسم المنتج "
                defaultValue={searchParams.get("search") || ""}
                onChange={(e) => {
                  if (e.target.value === "") {
                    searchParams.delete("search");
                    setSearchParams(searchParams);
                  }
                }}
                className="form-control"
                style={{ minWidth: "250px" }}
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
                إضافه منتج
              </button>
            </div>
          </div>
          <div
            className="row row-cols-1 row-cols-sm-2  row-cols-md-3 row-cols-lg-4"
            style={{ padding: "10px" }}
          >
            {data.length ? (
              data.map((product) => (
                <Product
                  product={product}
                  toggleDelete={toggleDelete}
                  setSelectedProductValue={setSelectedProductValue}
                  key={product.id}
                />
              ))
            ) : (
              <h3>لا يوجد منتجات</h3>
            )}
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
          {/* <AddProduct
            show={showAddForm}
            close={toggleAddForm}
            showMessage={showMessage}
          />
          <EditProduct
            show={showEditForm}
            close={toggleEditForm}
            showMessage={showMessage}
            product={selectedProduct}
          /> */}
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
export default Products;
