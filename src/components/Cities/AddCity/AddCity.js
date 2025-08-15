import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Form } from "react-bootstrap";

import { CSSTransition } from "react-transition-group";
import { Ring } from "@uiball/loaders";
import useCity from "hooks/useCity";

const AddCity = (props) => {
  const form = useRef();
  const nodeRef = useRef();
  const { loading, addCity, error } = useCity();

  const submitHandler = async (e) => {
    e.preventDefault();
    const regionData = new FormData();

    regionData.append("name", form.current[0].value);
    regionData.append("topic", form.current[1].value);

    try {
      const response = await addCity(regionData);
      // Assuming `response` contains information to check if the operation succeeded

      if (response) {
        props.showMessage("success", "تمت الاضافه", "تمت إضافه المدينه بنجاح");
        props.close(); // Uncomment if you need to close a modal or similar
      } else {
        props.showMessage(
          "error",
          "هناك خطأ",
          response.message || "حدث خطأ غير متوقع"
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
              <h5>إضافه مدينه</h5>
              <FontAwesomeIcon icon={faClose} onClick={props.close} />
            </div>
            <Form className="form" ref={form} onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>
                  اسم المدينه<span>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="اسم المينه" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>
                  اسم المدينه باللغه الانجليزيه<span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="سم المدينه باللغه الانجليزي"
                  required
                />
              </Form.Group>
              <div className="buttons">
                <button className="cancel" onClick={props.close} type="none">
                  إلغاء
                </button>
                <button className="button" type="submit">
                  إضافه
                </button>
              </div>
            </Form>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
export default AddCity;
