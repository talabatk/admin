import DropDownButtons from "components/Ui/DropDownButtons/DropDownButtons";
import MenuSimple from "./Dropdown";
import { NavLink } from "react-router-dom";
import UpdateTime from "./updateTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const Order = (props) => {
  const date = new Date(props.order.createdAt);
  // date.setHours(date.getHours() + 1); // Add 1 hour

  const updateTime = async (time) => {
    let fm = new FormData();
    fm.append("time", time);
    await props.editOrder(props.order.id, fm);
  };
  console.log(props.order);

  return (
    <tr className="item">
      <td>
        <NavLink style={{ color: "blue" }} to={`${props.order?.id}`}>
          {props.order?.id}
        </NavLink>
      </td>
      <td className="name">
        <span>
          <div>
            <h6>{props.order?.name}</h6>
            <p>{props.order?.phone}</p>
          </div>
        </span>
      </td>
      <td>{props.order?.cart_products[0]?.product?.user.name}</td>
      <td>{props.order?.total} شيكل</td>
      <td>
        <MenuSimple
          id={props.order.id}
          updateOrder={props.editOrder}
          status={props.order?.status}
        />
      </td>
      <td>
        <UpdateTime updateTime={updateTime} value={props.order?.time} />
      </td>
      <td>
        {props.order?.deliveryId ? props.order.delivery.user.name : "لا يوجد"}
      </td>
      <td>{date.toLocaleString()}</td>
      <td
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        <a
          href={`https://wa.me/972${props.order?.phone.slice(1)}?text=""`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faWhatsapp} size="xl" />
        </a>
        {props.order?.lat && props.order?.lang ? (
          <a
            href={`https://www.google.com/maps?q=${props.order?.lat},${props.order?.lang}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faMapLocationDot} size="xl" />
          </a>
        ) : null}
        <DropDownButtons
          vendor={props.vendor}
          delete={() => {
            props.setSelectedOrderValue(props.order);
            props.toggleDelete();
          }}
        ></DropDownButtons>
      </td>
    </tr>
  );
};

export default Order;
