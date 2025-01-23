import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Form } from "react-bootstrap";

import { CSSTransition } from "react-transition-group";
import { Ring } from "@uiball/loaders";
import useVendorCategories from "hooks/useVendorCategories";

const AddCategory = (props) => {
  const form = useRef();
  const nodeRef = useRef();
  const { loading, addCategory, error } = useVendorCategories();

  const submitHandler = async (e) => {
    e.preventDefault();
    const categoryData = new FormData();

    if (form.current[0].files[0]) {
      categoryData.append(
        "image",
        form.current[0].files[0],
        form.current[0].files[0].name
      );
    }
    categoryData.append("name", form.current[1].value);
    categoryData.append("order", form.current[2].value);

    try {
      const response = await addCategory(categoryData);
      // Assuming `response` contains information to check if the operation succeeded

      if (response.vendorCategory) {
        props.showMessage("success", "تمت الاضافه", "تمت إضافه القسم بنجاح");
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
              <h5>إضافه قسم</h5>
              <FontAwesomeIcon icon={faClose} onClick={props.close} />
            </div>
            <Form className="form" ref={form} onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>صوره القسم</Form.Label>
                <Form.Control type="file" accept=".png,.jpg,.svg" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>
                  اسم القسم<span>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="اسم القسم" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>
                  الترتيب<span>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="الترتيب"
                  min={1}
                  defaultValue={1}
                  required
                />
              </Form.Group>

              <div className="buttons">
                <button className="cancel" onClick={props.close} type="button">
                  إلغاء
                </button>
                <button className="button" type="submit">
                  إضافه قسم
                </button>
              </div>
            </Form>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
export default AddCategory;
