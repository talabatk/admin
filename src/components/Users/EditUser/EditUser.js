import { useEffect, useRef, useState } from "react";
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
const EditUser = (props) => {
  const form = useRef();
  const nodeRef = useRef();
  const { loading, updateUser, error } = useUser();
  const [roles, setRoles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminInfo = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const isSuperAdmin = props.user?.admin?.super_admin ?? false;

    if (props.user?.role === "admin" && !isSuperAdmin) {
      setIsAdmin(true);
    }
    if (props.user?.adminRole) {
      const selectedRoles = Object.entries(props.user?.adminRole)
        .filter(([key, value]) => key.startsWith("manage_") && value === true)
        .map(([key]) => ({
          label: rolesOptions.find((r) => r.value === key)?.label,
          value: key,
        }));
      setRoles(selectedRoles);
    }
  }, [props.user]);
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
    userData.append("id", props.user.id);
    userData.append("name", form.current[1].value);
    userData.append("email", form.current[2].value);
    userData.append("phone", form.current[3].value);
    if (form.current[4].value === "super_admin") {
      userData.append("role", "admin");
      userData.append("super_admin", true);
    } else {
      userData.append("role", form.current[4].value);
    }

    if (isAdmin) {
      userData.append("roles", JSON.stringify(roles.map((r) => r.value)));
      userData.append("cityId", form.current[6].value);
      userData.append("active", form.current[7].value);
    } else {
      userData.append("cityId", form.current[5].value);
      userData.append("active", form.current[6].value);
    }
    // userData.append("password", form.current[5].value);
    // userData.append("confirm_password", form.current[6].value);
    try {
      let response = await updateUser(userData);

      // Assuming `response` contains information to check if the operation succeeded

      if (response.name) {
        props.showMessage("success", "تم التعديل", "تم التعديل بنجاح");
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
              <h5>تعديل مستخدم</h5>
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
                <Form.Control
                  type="text"
                  defaultValue={props.user?.name}
                  placeholder="اسم المستخدم"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>البريد الالكتروني</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={props.user?.email}
                  placeholder="البريد"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>
                  رقم الهاتف<span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={props.user?.phone}
                  placeholder="رقم الهاتف"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="type">
                <Form.Label>
                  نوع المستخدم<span>*</span>
                </Form.Label>
                <Form.Select
                  required
                  defaultValue={
                    props.user?.admin?.super_admin
                      ? "super_admin"
                      : props.user?.role
                  }
                  onChange={(e) => {
                    if (e.target.value === "admin") {
                      setIsAdmin(true);
                    } else {
                      setIsAdmin(false);
                    }
                  }}>
                  <option value={"delivery"}>عامل توصيل</option>
                  <option value={"customer"}>مستخدم</option>
                  <option value={"vendor"}>مطعم</option>
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
                <Form.Select defaultValue={props.user?.cityId}>
                  {props.cities?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="active">
                <Form.Label>
                  حظر<span>*</span>
                </Form.Label>
                <Form.Select required defaultValue={props.user?.active}>
                  <option value={"true"}>غير محظور</option>
                  <option value={"false"}>محظور</option>
                </Form.Select>
              </Form.Group>
              <div className="buttons">
                <button className="cancel" onClick={props.close} type="button">
                  إلغاء
                </button>
                <button className="button" type="submit">
                  تعديل مستخدم
                </button>
              </div>
            </Form>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
export default EditUser;
