import "./deleteItem.scss";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { CSSTransition } from "react-transition-group";
import { Ring } from "@uiball/loaders";

const DeleteItem = (props) => {
  const nodeRef = useRef();

  return (
    <div
      className={`deleteModel center ${props.show ? "model-show" : ""}`}
      onClick={props.close}
    >
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={300}
        classNames="show"
        nodeRef={nodeRef}
      >
        <div
          className="deleteItem center"
          ref={nodeRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="close" onClick={props.close}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faTrashCan} size="4x" />
          </div>
          <h4>هل انت متأكد؟</h4>
          <p>هل انت متأكد من حذف هذا العنصر ؟</p>
          <div>
            <button className="cancel" onClick={props.close}>
              إلغاء
            </button>
            <button className="insure" onClick={props.confirm}>
              {props.loading && (
                <Ring size={22} lineWeight={5} speed={2} color="white" />
              )}
              تأكيد!
            </button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
export default DeleteItem;
