import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Form } from "react-bootstrap";

import { CSSTransition } from "react-transition-group";
import { Ring } from "@uiball/loaders";
import useVendors from "hooks/useVendors";

const AddVendor = (props) => {
  const form = useRef();
  const nodeRef = useRef();
  const { loading, addVendor, error } = useVendors();

  const submitHandler = async (e) => {
    e.preventDefault();
    const vendorData = new FormData();

    if (form.current[0].files[0]) {
      vendorData.append(
        "image",
        form.current[0].files[0],
        form.current[0].files[0].name
      );
    }
    if (form.current[1].files[0]) {
      vendorData.append(
        "cover",
        form.current[1].files[0],
        form.current[1].files[0].name
      );
    }
    vendorData.append("name", form.current[2].value);
    vendorData.append("description", form.current[3].value);
    vendorData.append("phone", form.current[4].value);
    vendorData.append("address", form.current[5].value);
    vendorData.append("delivery_time", form.current[6].value);
    vendorData.append("free_delivery_limit", form.current[7].value || 0);
    vendorData.append("email", form.current[8].value);
    vendorData.append("status", form.current[9].value);
    vendorData.append("password", form.current[10].value);
    vendorData.append("confirm_password", form.current[11].value);
    try {
      const response = await addVendor(vendorData);
      // Assuming `response` contains information to check if the operation succeeded

      if (response.user) {
        props.showMessage("success", "تمت الاضافه", "تمت إضافه المطعم بنجاح");
        props.close(); // Uncomment if you need to close a modal or similar
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
              <h5>إضافه مطعم</h5>
              <FontAwesomeIcon icon={faClose} onClick={props.close} />
            </div>
            <Form className="form" ref={form} onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>صوره المطعم</Form.Label>
                <Form.Control type="file" accept=".png,.jpg,.svg" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cover">
                <Form.Label>غلاف المطعم</Form.Label>
                <Form.Control type="file" accept=".png,.jpg,.svg" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>
                  اسم المطعم<span>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="اسم المطعم" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>
                  وصف المطعم<span>*</span>
                </Form.Label>
                <textarea
                  className="form-control"
                  placeholder="وصف المطعم"
                  rows={3}
                  required
                ></textarea>
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>
                  رقم الهاتف<span>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="رقم الهاتف" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>
                  العنوان<span>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="العنوان" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>
                  وقت التوصيل<span>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="وقت التوصيل"
                  min={0}
                  defaultValue={0}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="free">
                <Form.Label>قيمه التوصيل المجاني</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="لا يوجد"
                  min={0}
                  defaultValue={0}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="type">
                <Form.Label>
                  طريقه الطلب<span>*</span>
                </Form.Label>
                <Form.Select required>
                  <option value={"cart"}>السله</option>
                  <option value={"phone"}>الهاتف</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="status">
                <Form.Label>
                  الحاله<span>*</span>
                </Form.Label>
                <Form.Select required>
                  <option value={"close"}>مغلق</option>
                  <option value={"open"}>مفتوح</option>
                  <option value={"soon"}>قريبا</option>
                  <option value={"busy"}>مشغول</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>
                  كلمه المرور<span>*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="كلمه المرور"
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
                />
              </Form.Group>
              <div className="buttons">
                <button className="cancel" onClick={props.close} type="none">
                  إلغاء
                </button>
                <button className="button" type="submit">
                  إضافه مطعم
                </button>
              </div>
            </Form>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
export default AddVendor;
