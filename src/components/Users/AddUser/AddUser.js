import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Form } from "react-bootstrap";

import { CSSTransition } from "react-transition-group";
import { Ring } from "@uiball/loaders";
import useUser from "hooks/useUser";
import Select from "react-select";
import { useSelector } from "react-redux";

const rolesOptions = [
  { label: "ادارة الطلبات", value: "manage_orders" },
  { label: "ادارة المنتجات", value: "manage_products" },
  { label: "ادارة المستخدمين", value: "manage_users" },
  { label: "ادارة المدن", value: "manage_cities" },
  { label: "ادارة الفئات", value: "manage_categories" },
  { label: "ادارة المطاعم", value: "manage_vendors" },
];

const AddUser = (props) => {
  const form = useRef();
  const nodeRef = useRef();
  const { loading, addAdmin, addDelivery, error } = useUser();
  const [roles, setRoles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminInfo = useSelector((state) => state.auth.userData);

  const handleChange = (selectedOptions) => {
    setRoles(selectedOptions);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = new FormData();

    if (form.current[0].files[0]) {
      userData.append(
        "image",
        form.current[0].files[0],
        form.current[0].files[0].name
      );
    }
    userData.append("name", form.current[1].value);
    userData.append("email", form.current[2].value);
    userData.append("phone", form.current[3].value);
    if (form.current[4].value === "admin") {
      userData.append("role", form.current[4].value);
    } else {
      userData.append("role", "admin");
      userData.append("super_admin", true);
    }
    if (isAdmin) {
      userData.append("roles", JSON.stringify(roles.map((r) => r.value)));
      userData.append("cityId", form.current[6].value);
      userData.append("password", form.current[7].value);
      userData.append("confirm_password", form.current[8].value);
    } else {
      userData.append("cityId", form.current[5].value);
      userData.append("password", form.current[6].value);
      userData.append("confirm_password", form.current[7].value);
    }

    try {
      let response = null;
      if (
        form.current[4].value === "admin" ||
        form.current[4].value === "super_admin"
      ) {
        response = await addAdmin(userData);
      } else {
        response = await addDelivery(userData);
      }

      // Assuming `response` contains information to check if the operation succeeded

      if (response.user) {
        props.showMessage("success", "تمت الاضافه", "تمت الاضافه بنجاح");
        props.close(); // Uncomment if you need to close a modal or similar
      } else {
        props.showMessage(
          "error",
          "هناك خطأ",
          response.response.data.message || "حدث خطأ غير متوقع"
        );
      }
    } catch (err) {
      console.error("Error adding user:", err);
      props.showMessage("error", "هناك خطأ", error || "حدث خطأ غير متوقع");
    }
  };

  return (
    <>
      <div
        className={`model ${props.show ? "model-show" : ""}`}
        onClick={props.close}>
        <CSSTransition
          mountOnEnter
          unmountOnExit
          nodeRef={nodeRef}
          in={props.show}
          timeout={400}
          classNames="show">
          <div
            className="addItem"
            ref={nodeRef}
            onClick={(e) => e.stopPropagation()}>
            {loading ? (
              <div className="loading-spinner center">
                <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
              </div>
            ) : null}
            <div className="head center">
              <h5>إضافه مستخدم</h5>
              <FontAwesomeIcon icon={faClose} onClick={props.close} />
            </div>
            <Form className="form" ref={form} onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>صوره المستخدم</Form.Label>
                <Form.Control type="file" accept=".png,.jpg,.svg" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>
                  اسم المستخدم<span>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="اسم المستخدم" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>البريد الالكتروني</Form.Label>
                <Form.Control type="text" placeholder="البريد" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>
                  رقم الهاتف<span>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="رقم الهاتف" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="type">
                <Form.Label>
                  نوع المستخدم<span>*</span>
                </Form.Label>
                <Form.Select
                  required
                  onChange={(e) => {
                    if (e.target.value === "admin") {
                      setIsAdmin(true);
                    } else {
                      setIsAdmin(false);
                    }
                  }}>
                  <option value={"delivery"}>عامل توصيل</option>
                  <option value={"admin"}>مشرف</option>
                  {adminInfo.super_admin ? (
                    <option value={"super_admin"}>مشرف عام</option>
                  ) : null}
                </Form.Select>
              </Form.Group>
              {isAdmin ? (
                <Form.Group className="mb-3" controlId="status">
                  <Form.Label>
                    الصلاحيات<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Select
                    value={roles}
                    options={rolesOptions}
                    isMulti
                    onChange={handleChange}
                  />
                </Form.Group>
              ) : null}
              <Form.Group className="mb-3" controlId="status">
                <Form.Label>
                  المدينه<span>*</span>
                </Form.Label>
                <Form.Select>
                  {props.cities?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>
                  كلمه المرور<span>*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="كلمه المرور"
                  minLength={6}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirm-password">
                <Form.Label>
                  تأكيد كلمه المرور<span>*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="تأكيد كلمه المرور"
                  required
                  minLength={6}
                />
              </Form.Group>
              <div className="buttons">
                <button className="cancel" onClick={props.close} type="button">
                  إلغاء
                </button>
                <button className="button" type="submit">
                  إضافه مستخدم
                </button>
              </div>
            </Form>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
export default AddUser;
