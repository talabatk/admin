import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Form } from "react-bootstrap";

import { CSSTransition } from "react-transition-group";
import { Ring } from "@uiball/loaders";
import useUser from "hooks/useUser";

const EditUser = (props) => {
  const form = useRef();
  const nodeRef = useRef();
  const { loading, updateUser, error } = useUser();

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
    userData.append("role", form.current[4].value);
    userData.append("active", form.current[5].value);
    // userData.append("password", form.current[5].value);
    // userData.append("confirm_password", form.current[6].value);
    try {
      let response = await updateUser(userData);

      // Assuming `response` contains information to check if the operation succeeded

      if (response.name) {
        props.showMessage("success", "تم التعديلء", "تم التعديل بنجاح");
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
        onClick={props.close}
      >
        <CSSTransition
          mountOnEnter
          unmountOnExit
          nodeRef={nodeRef}
          in={props.show}
          timeout={400}
          classNames="show"
        >
          <div
            className="addItem"
            ref={nodeRef}
            onClick={(e) => e.stopPropagation()}
          >
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
                <Form.Select required defaultValue={props.user?.role}>
                  <option value={"delivery"}>عامل توصيل</option>
                  <option value={"customer"}>مستخدم</option>
                  <option value={"vendor"}>مطعم</option>
                  <option value={"admin"}>مشرف</option>
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
