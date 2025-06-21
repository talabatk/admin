import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Form } from "react-bootstrap";

import { CSSTransition } from "react-transition-group";
import { Ring } from "@uiball/loaders";
import useCategories from "hooks/useCateogries";

const EditCategory = (props) => {
  const form = useRef();
  const nodeRef = useRef();
  const { loading, editCategory, error } = useCategories();

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
    categoryData.append("id", props.category.id);
    categoryData.append("name", form.current[1].value);
    categoryData.append("order", form.current[2].value);
    categoryData.append("type", form.current[3].value);

    try {
      const response = await editCategory(categoryData);
      // Assuming `response` contains information to check if the operation succeeded

      if (response.name) {
        props.showMessage("success", "تم التعديل", "تم التعديل القسم بنجاح");
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
              <h5>تعديل قسم</h5>
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
                <Form.Control
                  type="text"
                  defaultValue={props.category?.name}
                  placeholder="اسم القسم"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>
                  الترتيب<span>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="الترتيب"
                  min={1}
                  defaultValue={+props.category?.order}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="status">
                <Form.Label>
                  النوع<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select required defaultValue={props.category?.type}>
                  <option value={"restaurant"}>مطعم</option>
                  <option value={"supermarket"}>سوبرماركت</option>
                </Form.Select>
              </Form.Group>
              <div className="buttons">
                <button className="cancel" onClick={props.close} type="none">
                  إلغاء
                </button>
                <button className="button" type="submit">
                  تعديل قسم
                </button>
              </div>
            </Form>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
export default EditCategory;
