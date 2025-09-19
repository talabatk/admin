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
import imageCompression from "browser-image-compression";

const EditProduct = (props) => {
  const {
    loading,
    error,
    editProduct,
    fetchProductBYId,
    createGroup,
    deleteGroup,
    deleteOption,
  } = useProduct();
  const [productOptions, setProductOptions] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedCategory, setSelectedVCategory] = useState("");
  const [isOffer, setIsOffer] = useState(false);
  const [available, setAvailable] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [show_price, setShowPrice] = useState(false);
  const [product, setProduct] = useState(null);
  const { vendors } = useVendors();
  const { categories } = useCategories();
  const form = useRef();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

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
          setIsOffer(response.isOffer);
        }
        setProduct(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  const deleteGroupHandler = async (id) => {
    const checkExist = product.options_groups.findIndex(
      (group) => +group.id === +id
    );
    if (checkExist > -1) {
      await deleteGroup(id);
    }
    let newGroups = productOptions.filter((group) => +group.id !== +id);

    setProductOptions(newGroups);
  };

  const getOptionData = (data) => {
    let options = productOptions;

    let index = options.findIndex((option) => +option.id === +data.id);

    if (index > -1) {
      options[index] = data;
    } else {
      options.push(data);
    }
    setProductOptions(options);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxWidthOrHeight: 1024, // Resize to max 1024px width/height
          maxSizeMB: 0.6, // Limit to 1MB
        });
        const compressedFileObj = new File([compressedFile], file.name, {
          type: file.type,
        });

        setImage(compressedFileObj); // Set resized image preview
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const productData = new FormData();

    if (form.current[0].files[0]) {
      productData.append("image", image, form.current[0].files[0].name);
    }
    productData.append("id", product.id);
    productData.append("title", form.current[1].value);
    productData.append("vendorId", form.current[2].value);
    productData.append("categoryId", form.current[3].value);
    productData.append("price", form.current[4].value);
    productData.append("description", form.current[5].value);
    productData.append("order", form.current[6].value);
    productData.append("offerPrice", form.current[7].value);
    productData.append("isOffer", form.current[8].checked);
    productData.append("featured", form.current[9].checked);
    productData.append("available", form.current[10].checked);
    productData.append("show_price", form.current[11].checked);

    try {
      const response = await editProduct(productData);
      const groupFormData = new FormData();
      groupFormData.append("products", JSON.stringify([response.product?.id]));
      groupFormData.append("groups", JSON.stringify(productOptions));
      productOptions.forEach((group, groupIndex) => {
        group.options.forEach((option, optionIndex) => {
          // Example: if you have a File object for this option
          const file = option.image; // 👈 must come from <input type="file" /> or similar

          if (file) {
            // The key includes indexes so the backend knows which option this image belongs to
            groupFormData.append(
              `groups[${groupIndex}][options][${optionIndex}][image]`,
              file
            );
          }
        });
      });
      const groupResponse = await createGroup(groupFormData);
      // Assuming `response` contains information to check if the operation succeeded
      if (response.product) {
        props.showMessage("success", "تم التعديل", "تم تعديل المنتج بنجاح");
        navigate(-1);
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
        تعديل منتج
      </h3>
      <form ref={form} className="row row-cols-1" onSubmit={submitHandler}>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>صوره المنتج</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              accept=".png,.jpg,.svg,.jpeg"
            />
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
              }}>
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
              }}>
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
          <Form.Group className="mb-3" controlId=" offerPrice">
            <Form.Label>ترتيب الظهور</Form.Label>
            <Form.Control
              type="number"
              defaultValue={product?.order}
              min={1}
              placeholder=""
            />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId=" offerPrice">
            <Form.Label>السعر بعد الخصم</Form.Label>
            <Form.Control
              type="number"
              defaultValue={product?.offerPrice}
              min={0}
              placeholder="السعر بعد الخصم"
            />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <FormGroup>
            <FormControlLabel
              checked={isOffer}
              control={<Switch color="warning" onChange={(e) => {}} />}
              label="تفعيل العرض"
              onChange={(e) => {
                setIsOffer((pre) => (pre = !pre));
              }}
            />
          </FormGroup>
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
                  new: true,
                },
              ]);
            }}
            type="button">
            إضافه خيار
          </button>
        </div>
        {productOptions.map((item) => (
          <OptionGroup
            key={item.id}
            index={item.id}
            getOptionData={getOptionData}
            group={item}
            deleteGroup={deleteGroupHandler}
            deleteOption={deleteOption}
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
            type="submit">
            حفظ التعديلات
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditProduct;
