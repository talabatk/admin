import "./home.scss";
import user from "assets/icons/user.png";
import cart from "assets/icons/shopping-cart.png";
import dollar from "assets/icons/fast-delivery.png";
import funds from "assets/icons/funds.png";
import useHome from "hooks/useHome";
import { useEffect, useRef, useState } from "react";
import { Ring } from "@uiball/loaders";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Toast } from "primereact/toast";
import { Form } from "react-bootstrap";
import useCity from "hooks/useCity";
import { Checkbox } from "@mui/material";

const Home = () => {
  const [data, setData] = useState();
  const { loading, fetchData, updateAlertsContent, sendNotification } =
    useHome();
  const statusForm = useRef();
  const alertForm = useRef();
  const pointsForm = useRef();
  const toast = useRef(null);
  const { cities } = useCity();
  const [seletedAlertCities, setSelectedAlertCities] = useState([]);
  const [seleteddialogCities, setSelectedDialogCities] = useState([]);

  const fetchNumbers = async () => {
    try {
      const response = await fetchData();

      setSelectedAlertCities(response.alert.cities.map((c) => c.id));
      setSelectedDialogCities(response.app_status.cities.map((c) => c.id));

      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNumbers();
  }, []);

  const showMessage = (type, head, content) => {
    toast.current.show({
      severity: type,
      summary: head,
      detail: content,
      life: 3000,
    });
  };

  const statusSubmitHandler = async (e) => {
    e.preventDefault();
    const alertData = new FormData();

    seleteddialogCities.forEach((c) => {
      alertData.append("cities[]", c);
    });
    alertData.append("name", "app_status");
    alertData.append("content", statusForm.current[0].value);
    alertData.append("active", statusForm.current[1].checked);

    try {
      await updateAlertsContent(alertData);
      fetchNumbers();
      showMessage("success", "تم التعديل", "تم التعديل بنجاح");
    } catch (error) {
      console.log(error);
    }
  };

  const alertSubmitHandler = async (e) => {
    e.preventDefault();

    const alertData = new FormData();

    seletedAlertCities.forEach((c) => {
      alertData.append("cities[]", c);
    });
    alertData.append("name", "alert");
    alertData.append("content", alertForm.current[0].value);
    alertData.append("active", alertForm.current[1].checked);
    try {
      await updateAlertsContent(alertData);
      fetchNumbers();
      showMessage("success", "تم التعديل", "تم التعديل بنجاح");
    } catch (error) {
      console.log(error);
    }
  };
  const pointsSubmitHandler = async (e) => {
    e.preventDefault();

    const alertData = new FormData();

    alertData.append("name", "points");
    alertData.append("content", pointsForm.current[0].value);
    alertData.append("active", pointsForm.current[1].checked);
    try {
      await updateAlertsContent(alertData);
      fetchNumbers();
      showMessage("success", "تم التعديل", "تم التعديل بنجاح");
    } catch (error) {
      console.log(error);
    }
  };

  const notificationSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendNotification({
        topic: e.target[0].value,
        title: e.target[1].value,
        description: e.target[2].value,
      });
      showMessage("success", "تم ارسال اشعار بنجاح", "تم الارسال");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="home">
      <Toast style={{ direction: "rtf" }} ref={toast} position="top-left" />

      {loading ? (
        <div className="loadingSpinner center">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : (
        <>
          <div className="statics">
            <h2>مرحبا بعودتك🎉</h2>
            <div className="row row-cols-2 row-cols-md-4">
              <div className="col">
                <div className="image" style={{ backgroundColor: "#d6f4f7" }}>
                  <img src={user} alt="" />
                </div>
                <div className="info">
                  <span>{data?.customers.toLocaleString()}</span>
                  <span>مستخدم</span>
                </div>
              </div>
              <div className="col">
                <div className="image" style={{ backgroundColor: "#ffe2e3" }}>
                  <img src={cart} alt="" />
                </div>
                <div className="info">
                  <span>{data?.products.toLocaleString()}</span>
                  <span>منتج</span>
                </div>
              </div>
              <div className="col">
                <div className="image" style={{ backgroundColor: "#dcf6e8" }}>
                  <img src={dollar} alt="" />
                </div>
                <div className="info">
                  <span>{data?.onlineDeliveries.toLocaleString()}</span>
                  <span>ديلفرى</span>
                </div>
              </div>
              <div className="col">
                <div className="image" style={{ backgroundColor: "#e8e6fc" }}>
                  <img src={funds} alt="" />
                </div>
                <div className="info">
                  <span>{data?.orders.toLocaleString()}</span>
                  <span>طلبيه</span>
                </div>
              </div>
            </div>
          </div>
          <div className="alerts">
            <div className=" row row-col-1 row-cols-md-3">
              <div className="col">
                <div className="cont">
                  <h5>إغلاق التطبيق</h5>
                  <form ref={statusForm} onSubmit={statusSubmitHandler}>
                    <div style={{ minHeight: "130px" }}>
                      <div className="mb-3">
                        <textarea
                          rows={2}
                          placeholder="اكتب رساله الاغلاق...."
                          className="form-control"
                          defaultValue={data?.app_status?.content}></textarea>
                      </div>
                      <FormGroup style={{ marginBottom: "20px" }}>
                        <FormControlLabel
                          control={
                            <Switch
                              defaultChecked={data?.app_status?.active}
                              color="warning"
                              onChange={(e) => {}}
                            />
                          }
                          label="تفعيل"
                        />
                      </FormGroup>
                      <Form.Group controlId="city">
                        {cities?.map((c) => (
                          <FormControlLabel
                            key={c.id} // always add key when mapping
                            style={{ margin: 0 }}
                            control={
                              <Checkbox
                                value={c.id}
                                color="success"
                                checked={seleteddialogCities?.includes(c.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedDialogCities((prev) => [
                                      ...prev,
                                      c.id,
                                    ]);
                                  } else {
                                    setSelectedDialogCities((prev) =>
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
                    </div>
                    <div className="submit">
                      <button
                        style={{
                          margin: "auto",
                        }}
                        className="button"
                        type="submit">
                        حفظ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col">
                <div className="cont">
                  <h5>التنبيه</h5>
                  <form ref={alertForm} onSubmit={alertSubmitHandler}>
                    <div style={{ minHeight: "130px" }}>
                      <div className="mb-3">
                        <textarea
                          rows={2}
                          placeholder="اكتب رساله الاغلاق...."
                          className="form-control"
                          defaultValue={data?.alert?.content}></textarea>
                      </div>
                      <FormGroup style={{ marginBottom: "20px" }}>
                        <FormControlLabel
                          control={
                            <Switch
                              defaultChecked={data?.alert?.active}
                              color="warning"
                              onChange={(e) => {}}
                            />
                          }
                          label="تفعيل"
                        />
                      </FormGroup>
                      <Form.Group controlId="city">
                        {cities?.map((c) => (
                          <FormControlLabel
                            key={c.id} // always add key when mapping
                            style={{ margin: 0 }}
                            control={
                              <Checkbox
                                value={c.id}
                                color="success"
                                checked={seletedAlertCities?.includes(c.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedAlertCities((prev) => [
                                      ...prev,
                                      c.id,
                                    ]);
                                  } else {
                                    setSelectedAlertCities((prev) =>
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
                    </div>
                    <div className="submit">
                      <button
                        style={{
                          margin: "auto",
                        }}
                        className="button"
                        type="submit">
                        حفظ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col">
                <div className="cont">
                  <h5>ارسال اشعار</h5>
                  <form onSubmit={notificationSubmitHandler}>
                    <div style={{ minHeight: "130px" }}>
                      <div className="mb-3">
                        <Form.Select required>
                          <option value={"all"}>الكل</option>
                          <option value={"customer"}>المستخدمين</option>
                          <option value={"restaurant"}>المطاعم</option>
                          <option value={"delivery"}>الديلفيرى</option>
                          {cities?.map((c) => (
                            <option key={c.id} value={c.topic}>
                              {c.name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="mb-3">
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Control
                            type="text"
                            placeholder="العنوان : مرحبا بك"
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="mb-3">
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Control
                            type="text"
                            placeholder="الوصف : لدينا عروض جديده"
                            required
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="submit">
                      <button
                        style={{
                          margin: "auto",
                        }}
                        className="button"
                        type="submit">
                        ارسال
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col">
                <div className="cont">
                  <h5>نقاط الربح لكل طلب</h5>
                  <form ref={pointsForm} onSubmit={pointsSubmitHandler}>
                    <div style={{ minHeight: "130px" }}>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="number"
                          defaultValue={data?.points?.content}
                          min={0}
                        />
                      </div>
                      <FormGroup style={{ marginBottom: "20px" }}>
                        <FormControlLabel
                          control={
                            <Switch
                              defaultChecked={data?.points?.active}
                              color="warning"
                              onChange={(e) => {}}
                            />
                          }
                          label="تفعيل"
                        />
                      </FormGroup>
                    </div>
                    <div className="submit">
                      <button
                        style={{
                          margin: "auto",
                        }}
                        className="button"
                        type="submit">
                        حفظ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
