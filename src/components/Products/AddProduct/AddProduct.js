import "./addProduct.scss";
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

const AddProduct = (props) => {
  const [OptionGroupsNumber, setOptionGroupsNumber] = useState(0);
  const [OptionGroups, setOptionGroups] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const { vendors } = useVendors();
  const { categories } = useCategories();
  const form = useRef();
  const { loading, createProduct, error, createGroup } = useProduct();
  const navigate = useNavigate();

  const getOptionData = (data) => {
    let options = productOptions.filter((option) => +option.id !== +data.id);
    options.push(data);
    setProductOptions(options);
  };

  useEffect(() => {
    const optionList = [];
    for (let i = 0; i < OptionGroupsNumber; i++) {
      optionList.push(<OptionGroup getOptionData={getOptionData} key={i} />);
    }
    setOptionGroups(optionList);
  }, [OptionGroupsNumber]);

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
    productData.append("title", form.current[1].value);
    productData.append("vendorId", form.current[2].value);
    productData.append("categoryId", form.current[3].value);
    productData.append("price", form.current[4].value);
    productData.append("description", form.current[5].value);
    productData.append("show_price", form.current[8].checked);
    productData.append("available", form.current[7].checked);
    productData.append("featured", form.current[6].checked);

    try {
      const response = await createProduct(productData);

      const groupResponse = await createGroup({
        products: [response.product?.id],
        groups: productOptions,
      });

      if (response.product && groupResponse.groups) {
        props.showMessage("success", "تمت الاضافه", "تمت إضافه المنتج بنجاح");
        navigate("/products");
      } else {
        props.showMessage("error", "هناك خطأ", response || "حدث خطأ غير متوقع");
      }
    } catch (err) {
      console.error("Error adding vendor:", err);
      props.showMessage("error", "هناك خطأ", error || "حدث خطأ غير متوقع");
    }
  };

  return (
    <div className={`add-product`}>
      {loading ? (
        <div className="loading-spinner center">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : null}
      <h3 className="text-center" style={{ marginBottom: "20px" }}>
        إضافة منتج
      </h3>
      <form ref={form} className="row row-cols-1" onSubmit={submitHandler}>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>
              صوره المنتج<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="file" accept=".png,.jpg,.svg" />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>
              اسم المنتج<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="اسم المنتج" required />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="vendor">
            <Form.Label>
              المطعم<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select required>
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
            <Form.Select required>
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
            <Form.Control type="number" min={0} placeholder="السعر" required />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="desc">
            <Form.Label>الوصف</Form.Label>
            <Form.Control type="text" placeholder="الوصف" />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={false}
                  color="warning"
                  onChange={(e) => {}}
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
                  defaultChecked={false}
                  color="warning"
                  onChange={(e) => {}}
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
                  defaultChecked={false}
                  color="warning"
                  onChange={(e) => {}}
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
              setOptionGroupsNumber((pre) => (pre += 1));
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
        {OptionGroups.map((item, index) => (
          <OptionGroup
            key={index}
            index={index}
            getOptionData={getOptionData}
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
            إضافه المنتج
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddProduct;
