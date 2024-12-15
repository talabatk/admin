import DropDownButtons from "components/Ui/DropDownButtons/DropDownButtons";
import MenuSimple from "./Dropdown";
import { NavLink } from "react-router-dom";

const Order = (props) => {
  const date = new Date(props.order.createdAt);
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
