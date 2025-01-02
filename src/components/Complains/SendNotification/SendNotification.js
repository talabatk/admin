import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { Form } from "react-bootstrap";

import { CSSTransition } from "react-transition-group";
import { Ring } from "@uiball/loaders";
import useHome from "hooks/useHome";

const SendNotification = (props) => {
  const { sendNotification, loading } = useHome();
  const form = useRef();
  const nodeRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.current[0].value);
    formData.append("description", form.current[1].value);
    formData.append("fcm", props.fcm);

    try {
      await sendNotification(formData);
      props.showMessage("success", "تم الارسال", "تم ارسال اشعار بنجاح");
      props.close();
    } catch (error) {
      console.log(error);
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
              <h5>إرسال اشعار</h5>
              <FontAwesomeIcon icon={faClose} onClick={props.close} />
            </div>
            <Form className="form" ref={form} onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>
                  العنوان<span>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="العنوان" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="desc">
                <Form.Label>
                  الوصف<span>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="الوصف" required />
              </Form.Group>
              <div className="buttons">
                <button className="cancel" onClick={props.close} type="button">
                  إلغاء
                </button>
                <button className="button" type="submit">
                  إرسال
                </button>
              </div>
            </Form>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};
export default SendNotification;
