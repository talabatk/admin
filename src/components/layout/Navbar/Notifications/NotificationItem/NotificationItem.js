import { NavLink } from "react-router-dom";
import "./notificationItem.scss";
const NotificationItem = (props) => {
  return (
    <NavLink to={`order/${props.orderId}`} className="NotificationItem">
      <div className="content">
        <p>{props.title}</p>
        <span>{props.description}</span>
      </div>
    </NavLink>
  );
};

export default NotificationItem;
