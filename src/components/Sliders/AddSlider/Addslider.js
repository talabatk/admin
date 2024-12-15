import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Form } from "react-bootstrap";

import { CSSTransition } from "react-transition-group";
import { Ring } from "@uiball/loaders";
import useSliders from "hooks/useSliders";

const AddSlider = (props) => {
  const form = useRef();
  const nodeRef = useRef();
  const { loading, addSlider, error } = useSliders();

  const submitHandler = async (e) => {
    e.preventDefault();
    const sliderData = new FormData();

    if (form.current[0].files[0]) {
      sliderData.append(
        "image",
        form.current[0].files[0],
        form.current[0].files[0].name
      );
    }
    sliderData.append("title", form.current[1].value);
    if (form.current[2].value !== "") {
      sliderData.append("vendorId", form.current[2].value);
    }

    try {
      const response = await addSlider(sliderData);
      // Assuming `response` contains information to check if the operation succeeded

      if (response.slider) {
        props.showMessage("success", "تمت الاضافه", "تمت إضافه سلايدر بنجاح");
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
              <h5>إضافه سلايدر</h5>
              <FontAwesomeIcon icon={faClose} onClick={props.close} />
            </div>
            <Form className="form" ref={form} onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>
                  صوره السلايدر<span>*</span>
                </Form.Label>
                <Form.Control type="file" accept=".png,.jpg,.svg" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>
                  اسم السلايدر<span>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="اسم السلايدر" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="status">
                <Form.Label>المطعم</Form.Label>
                <Form.Select>
                  <option value={""}>----</option>
                  {props.vendors?.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="buttons">
                <button className="cancel" onClick={props.close} type="none">
                  إلغاء
                </button>
                <button className="button" type="submit">
                  إضافه سلايدر
                </button>
              </div>
            </Form>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
export default AddSlider;
