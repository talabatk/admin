import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

import { Ring } from "@uiball/loaders";
import useProduct from "hooks/useProducts";
import useVendors from "hooks/useVendors";
import useCategories from "hooks/useCateogries";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import OptionGroup from "./OptionGroup/OptionGroup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditProduct = (props) => {
  const { loading, error, editProduct, fetchProductBYId } = useProduct();
  const [OptionGroupsNumber, setOptionGroupsNumber] = useState(0);
  const [OptionGroups, setOptionGroups] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedCategory, setSelectedVCategory] = useState("");
  const [available, setAvailable] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [show_price, setShowPrice] = useState(false);
  const [product, setProduct] = useState(null);
  const { vendors } = useVendors();
  const { categories } = useCategories();
  const navigate = useNavigate();
  const form = useRef();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchProductBYId(id);
        if (response) {
          setSelectedVendor(response.vendorId);
          setSelectedVCategory(response.categoryId);
          setFeatured(response.featured);
          setAvailable(response.available);
          setShowPrice(response.show_price);
          setProductOptions(response.options_groups);
        }
        setProduct(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  const getOptionData = (data) => {
    let options = productOptions.filter((option) => +option.id !== +data.id);
    options.push(data);
    setProductOptions(options);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const productData = new FormData();

    if (form.current[0].files[0]) {
      productData.append(
        "image",
        form.current[0].files[0],
        form.current[0].files[0].name
      );
    }
    productData.append("id", product.id);
    productData.append("title", form.current[1].value);
    productData.append("vendorId", form.current[2].value);
    productData.append("categoryId", form.current[3].value);
    productData.append("price", form.current[4].value);
    productData.append("description", form.current[5].value);
    productData.append("show_price", form.current[6].checked);
    productData.append("available", form.current[7].checked);
    productData.append("featured", form.current[8].checked);
    console.log(productOptions);

    try {
      const response = await editProduct(productData);

      //   const groupResponse = await createGroup({
      //     products: [response.product?.id],
      //     groups: productOptions,
      //   });

      // Assuming `response` contains information to check if the operation succeeded

      if (response.product) {
        props.showMessage("success", "تمت الاضافه", "تمت تعديل المنتج بنجاح");
        navigate("/products");
      } else {
        props.showMessage("error", "هناك خطأ", response || "حدث خطأ غير متوقع");
      }
    } catch (err) {
      console.error("Error adding vendor:", err);
      props.showMessage("error", "هناك خطأ", error || "حدث خطأ غير متوقع");
    }
  };
  console.log(productOptions);

  return (
    <div className={`add-product`}>
      {loading ? (
        <div className="loading-spinner center">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : null}
      <h3 className="text-center" style={{ marginBottom: "20px" }}>
        تعديل منتج
      </h3>
      <form ref={form} className="row row-cols-1" onSubmit={submitHandler}>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>صوره المنتج</Form.Label>
            <Form.Control type="file" accept=".png,.jpg,.svg" />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>
              اسم المنتج<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              defaultValue={product?.title}
              placeholder="اسم المنتج"
              required
            />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="vendor">
            <Form.Label>
              المطعم<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select
              required
              value={selectedVendor}
              onChange={(e) => {
                setSelectedVendor(e.target.value);
              }}
            >
              <option value={""}>----</option>
              {vendors?.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>
              القسم<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select
              required
              value={selectedCategory}
              onChange={(e) => {
                setSelectedVCategory(e.target.value);
              }}
            >
              <option value={""}>----</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>
              السعر<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="number"
              defaultValue={product?.price}
              min={0}
              placeholder="السعر"
              required
            />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="desc">
            <Form.Label>الوصف</Form.Label>
            <Form.Control
              defaultValue={product?.description}
              type="text"
              placeholder="الوصف"
            />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={featured}
                  color="warning"
                  onChange={(e) => {
                    setFeatured((pre) => (pre = !pre));
                  }}
                />
              }
              label="هل هذا المنتج مميز"
            />
          </FormGroup>
        </div>
        <div className="col-md-4 col-lg-4">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={available}
                  color="warning"
                  onChange={(e) => {
                    setAvailable((pre) => (pre = !pre));
                  }}
                />
              }
              label="هل هذا المنتج متاح؟"
            />
          </FormGroup>
        </div>
        <div className="col-md-4 col-lg-4">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={show_price}
                  color="warning"
                  onChange={(e) => {
                    setShowPrice((pre) => (pre = !pre));
                  }}
                />
              }
              label="هل يظهر سعر المنتج؟"
            />
          </FormGroup>
        </div>
        <div>
          <button
            style={{ margin: "40px 0 0 10px", minWidth: "fit-content" }}
            className="button"
            onClick={() => {
              setProductOptions((prevOptions) => [
                ...prevOptions,
                {
                  id: prevOptions.length,
                  name: "",
                  options: [],
                  type: "single",
                },
              ]);
            }}
            type="button"
          >
            إضافه خيار
          </button>
          <button
            style={{ marginTop: "40px", background: "red", color: "#fff" }}
            disabled={OptionGroupsNumber === 0 ? true : false}
            onClick={() => {
              setOptionGroupsNumber((pre) => (pre -= 1));
              setProductOptions((pre) => (pre = pre.slice(0, pre.length - 1)));
            }}
            type="button"
          >
            حذف خيار
          </button>
        </div>
        {productOptions.map((item, index) => (
          <OptionGroup
            key={index}
            index={item.id}
            getOptionData={getOptionData}
            group={item}
          />
        ))}
        <div className="submit">
          <button
            style={{
              marginTop: "20px",
              width: "250px",
              fontWeight: "bold",
              float: "left",
            }}
            className="button"
            type="submit"
          >
            حفظ التعديلات
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditProduct;
