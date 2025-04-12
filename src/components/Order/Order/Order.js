import DropDownButtons from "components/Ui/DropDownButtons/DropDownButtons";
import MenuSimple from "./Dropdown";
import { NavLink } from "react-router-dom";
import UpdateTime from "./updateTime";

const Order = (props) => {
  const date = new Date(props.order.createdAt);
  // date.setHours(date.getHours() + 1); // Add 1 hour

  const updateTime = async (time) => {
    let fm = new FormData();
    fm.append("time", time);
    await props.editOrder(props.order.id, fm);
  };

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
      <td>
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
