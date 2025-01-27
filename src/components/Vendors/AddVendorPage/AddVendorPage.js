import "./addVendor.scss";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

import { Ring } from "@uiball/loaders";
import { useNavigate } from "react-router-dom";
import useVendors from "hooks/useVendors";
import profileImage from "assets/images/profile.jpg";
import coverImage from "assets/images/notfound.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import useArea from "hooks/useArea";
import AreaCost from "./AreaCost/AreaCost";
import useVendorCategories from "hooks/useVendorCategories";
import Select from "react-select";

const AddVendorPage = (props) => {
  const { loading, addVendor, error, addDeliveryCost } = useVendors();
  const { categories } = useVendorCategories();
  const { areas } = useArea();
  const [image, setImage] = useState(profileImage);
  const [cover, setCover] = useState(coverImage);
  const [areaNumber, setAreaNumber] = useState([]);
  const [vendorAreas, setVendorArea] = useState([]);
  const [newCategories, setNewCategories] = useState([]);
  const [seletedCategories, setSelectedCategories] = useState([]);
  const form = useRef();
  const imageRef = useRef();
  const coverRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories) {
      setNewCategories(
        categories.map((category) => {
          return { value: category.id, label: category.name };
        })
      );
    }
  }, [categories]);

  const getAreaCost = (data) => {
    let areas = vendorAreas.filter((option) => +option.id !== +data.id);
    areas.push(data);
    setVendorArea(areas);
  };

  const handleChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const vendorData = new FormData();

    seletedCategories.forEach((category) => {
      vendorData.append("categories[]", category.value);
    });
    if (imageRef.current.value) {
      vendorData.append(
        "image",
        imageRef.current.files[0],
        imageRef.current.files[0].name
      );
    }
    if (coverRef.current.value) {
      vendorData.append(
        "cover",
        coverRef.current.files[0],
        coverRef.current.files[0].name
      );
    }

    vendorData.append("name", form.current[0].value);
    vendorData.append("phone", form.current[1].value);
    vendorData.append("address", form.current[2].value);
    vendorData.append("delivery_time", form.current[3].value);
    vendorData.append("free_delivery_limit", form.current[4].value || 0);
    vendorData.append("email", form.current[5].value);
    vendorData.append("status", form.current[6].value);
    vendorData.append("vendorCategoryId", form.current[7].value);
    vendorData.append("password", form.current[8].value);
    vendorData.append("confirm_password", form.current[9].value);

    try {
      const response = await addVendor(vendorData);
      // Assuming `response` contains information to check if the operation succeeded
      const costsRes = await addDeliveryCost({
        vendorId: response.user.id,
        costs: vendorAreas,
      });
      if (response.user && costsRes.results) {
        props.showMessage("success", "تمت الاضافه", "تمت إضافه المطعم بنجاح");
        navigate("/vendors");
      } else {
        props.showMessage(
          "error",
          "هناك خطأ",
          response.response.data.message || "حدث خطأ غير متوقع"
        );
      }
    } catch (err) {
      console.error("Error adding vendor:", err);
      props.showMessage("error", "هناك خطأ", error || "حدث خطأ غير متوقع");
    }
  };

  return (
    <div className={`add-vendor`}>
      {loading ? (
        <div className="loading-spinner center">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : null}
      <h3 className="text-center" style={{ marginBottom: "20px" }}>
        إضافة مطعم
      </h3>
      <div className="images">
        <div className="image-input">
          <FontAwesomeIcon
            onClick={() => {
              setImage(profileImage);
              imageRef.current.value = "";
            }}
            icon={faTrashCan}
            size="lg"
            color="red"
          />
          <label htmlFor="image">
            <img src={image} alt="profile" />
          </label>
          <input
            type="file"
            ref={imageRef}
            onChange={(e) => {
              if (e.target.files[0]) {
                setImage(URL.createObjectURL(e.target.files[0]));
              }
            }}
            accept=".png,.jpg,.svg"
            name="image"
            id="image"
          />
        </div>
        <div className="image-input">
          <FontAwesomeIcon
            onClick={() => {
              setCover(coverImage);
              coverRef.current.value = "";
            }}
            icon={faTrashCan}
            size="lg"
            color="red"
          />
          <label htmlFor="cover">
            <img src={cover} alt="cover" />
          </label>
          <input
            ref={coverRef}
            type="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                setCover(URL.createObjectURL(e.target.files[0]));
              }
            }}
            accept=".png,.jpg,.svg"
            name="cover"
            id="cover"
          />
        </div>
      </div>
      <form ref={form} className="row row-cols-1" onSubmit={submitHandler}>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>
              اسم المطعم<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="اسم المطعم" required />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>
              رقم الهاتف<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="رقم الهاتف" required />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>
              العنوان<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="العنوان" required />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>
              وقت التوصيل<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="وقت التوصيل"
              min={0}
              defaultValue={0}
              required
            />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="free">
            <Form.Label>قيمه التوصيل المجاني</Form.Label>
            <Form.Control
              type="number"
              placeholder="لا يوجد"
              min={0}
              defaultValue={0}
            />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>
              طريقه الطلب<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select required>
              <option value={"cart"}>السله</option>
              <option value={"phone"}>الهاتف</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>
              الحاله<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select required>
              <option value={"close"}>مغلق</option>
              <option value={"open"}>مفتوح</option>
              <option value={"soon"}>قريبا</option>
              <option value={"busy"}>مشغول</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>
              التصنيف<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Select
              value={seletedCategories}
              options={newCategories}
              isMulti
              onChange={handleChange}
            />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>
              كلمه المرور<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="password" placeholder="كلمه المرور" required />
          </Form.Group>
        </div>
        <div className="col-md-4 col-lg-4">
          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>
              تأكيد كلمه المرور<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="تأكيد كلمه المرور"
              required
            />
          </Form.Group>
        </div>
        <div>
          <button
            style={{ margin: "40px 0 0 10px", minWidth: "fit-content" }}
            className="button"
            onClick={() => {
              setAreaNumber([
                ...areaNumber,
                <AreaCost
                  key={areaNumber.length}
                  index={areaNumber.length}
                  getAreaCost={getAreaCost}
                  areas={areas}
                />,
              ]);
            }}
            type="button"
          >
            إضافه منطقه
          </button>
          <button
            style={{ marginTop: "40px", background: "red", color: "#fff" }}
            disabled={areaNumber.length === 0 ? true : false}
            onClick={() => {
              setAreaNumber((pre) => (pre = pre.slice(0, pre.length - 1)));
              setVendorArea((pre) => (pre = pre.slice(0, pre.length - 1)));
            }}
            type="button"
          >
            حذف منطقه
          </button>
        </div>
        {areaNumber.map((item) => item)}
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
            إضافه المطعم
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddVendorPage;
