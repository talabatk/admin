import { Ring } from "@uiball/loaders";
import "./banners.scss";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import useHome from "hooks/useHome";
import useCity from "hooks/useCity";
import notfound from "assets/images/notfound.png";
import { Form } from "react-bootstrap";
import { Checkbox, FormControlLabel, Select } from "@mui/material";

const Banners = () => {
  const toast = useRef(null);
  const [data, setData] = useState();
  const { cities } = useCity();
  const form = useRef();
  const [seletedCities, setSelectedCities] = useState([]);

  const { loading, fetchData, updateAlertsContent } = useHome();

  const showMessage = (type, head, content) => {
    toast.current.show({
      severity: type,
      summary: head,
      detail: content,
      life: 3000,
    });
  };

  const fetchNumbers = async () => {
    try {
      const response = await fetchData();

      // Set all city IDs at once
      setSelectedCities(response.banner.cities.map((c) => c.id));

      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, [cities]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const sliderData = new FormData();

    seletedCities.forEach((c) => {
      sliderData.append("cities[]", c);
    });

    if (form.current[0].files[0]) {
      sliderData.append(
        "image",
        form.current[0].files[0],
        form.current[0].files[0].name
      );
    }
    sliderData.append("name", "banner");

    sliderData.append("content", form.current[1].value);
    sliderData.append("discription", form.current[2].value);
    sliderData.append("status", form.current[3].value);
    try {
      await updateAlertsContent(sliderData);
      fetchNumbers();
      showMessage("success", "تم التعديل", "تم التعديل بنجاح");
    } catch (error) {
      console.log(error);
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
          <div className="content">
            <div className="image">
              <img
                src={data && data.banner?.image ? data.banner?.image : notfound}
              />
            </div>
            {data ? (
              <Form
                className="form row row-cols-1 row-cols-lg-2 row-cols-ms-2"
                ref={form}
                onSubmit={submitHandler}>
                <Form.Group className="mb-3 col" controlId="image">
                  <Form.Label>صوره البانر</Form.Label>
                  <Form.Control type="file" accept=".png,.jpg,.svg" />
                </Form.Group>
                <Form.Group className="mb-3 col" controlId="name">
                  <Form.Label>
                    العنوان<span>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="اسم البانر"
                    defaultValue={data.banner?.content}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 col" controlId="name2">
                  <Form.Label>
                    الوصف<span>*</span>
                  </Form.Label>
                  <Form.Control
                    defaultValue={data.banner?.discription}
                    type="text"
                    placeholder="وصف البانر"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 col" controlId="status">
                  <Form.Label>الحاله</Form.Label>
                  <Form.Select defaultValue={data.banner?.status}>
                    <option value={"disabled"}>عدم ظهور</option>
                    <option value={"required"}>ظهور اجباري</option>
                    <option value={"optional"}>ظهور اختياري</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 col" controlId="city">
                  <Form.Label style={{ display: "block" }}>
                    المدن<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  {cities?.map((c) => (
                    <FormControlLabel
                      key={c.id} // always add key when mapping
                      style={{ margin: 0 }}
                      control={
                        <Checkbox
                          value={c.id}
                          color="success"
                          checked={seletedCities?.includes(c.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCities((prev) => [...prev, c.id]);
                            } else {
                              setSelectedCities((prev) =>
                                prev.filter((id) => id !== c.id)
                              );
                            }
                          }}
                        />
                      }
                      label={c.name}
                    />
                  ))}
                </Form.Group>
                <div className="buttons" style={{ width: "100%" }}>
                  <button className="button" type="submit">
                    حفظ
                  </button>
                </div>
              </Form>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
export default Banners;
