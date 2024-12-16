import "./notifications.scss";
import { CSSTransition } from "react-transition-group";
import NotificationItem from "./NotificationItem/NotificationItem";
import { useEffect, useRef } from "react";

const Notifications = (props) => {
  const nodeRef = useRef();
  const nRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nRef.current && !nRef.current.contains(event.target)) {
        props.toggleNotification(); // Hide the menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div className="notifications" ref={nRef}>
        <div className="head">
          <p>الاشعارات</p>
          <span>{props.seen} جديد</span>
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
