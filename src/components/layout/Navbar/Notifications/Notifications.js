import "./notifications.scss";
import { CSSTransition } from "react-transition-group";
import NotificationItem from "./NotificationItem/NotificationItem";
import { useRef } from "react";

const Notifications = (props) => {
  const nodeRef = useRef();

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
      in={props.show}
      timeout={{ enter: 200, exit: 0 }}
      classNames={{
        enter: "enterNotificationsMenu",
        enterActive: "enterActiveNotificationsMenu",
        exit: "",
        exitActive: "",
      }}
    >
      <div className="notifications" ref={props.ref}>
        <div className="head">
          <p>الاشعارات</p>
          <span>{props.notifications?.notSeen} جديد</span>
        </div>
        <div className="items">
          {props.notifications?.results?.map((item, index) => (
            <NotificationItem
              key={index}
              orderId={item.orderId}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
        {/* <div className="readAll">
          <button>Read All notifications</button>
        </div> */}
      </div>
    </CSSTransition>
  );
};
export default Notifications;
