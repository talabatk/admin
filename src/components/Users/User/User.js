import notfound from "assets/images/notfound.png";
import DropDownButtons from "components/Ui/DropDownButtons/DropDownButtons";

const User = (props) => {
  return (
    <tr className="item">
      <td>{props.user?.id}</td>
      <td className="name">
        <span>
          <div>
            <img
              src={
                props.user.image && props.user.image !== "null"
                  ? props.user.image
                  : notfound
              }
              alt="user"
            />
          </div>
          <div>
            <h6>{props.user?.name}</h6>
            <p>{props.user?.phone}</p>
          </div>
        </span>
      </td>
      <td>{props.user?.address || "لا يوجد"}</td>
      <td>
        {props.user?.role === "customer"
          ? "مستخدم"
          : props.user?.role === "vendor"
          ? "مطعم"
          : props.user?.role === "delivery"
          ? "ديلفرى"
          : "مشرف"}
      </td>
      <td>{props.user?.active ? "غير محظور" : "محظور"}</td>
      <td>
        <DropDownButtons
          user={props.user}
          edit={() => {
            props.setSelectedUserValue(props.user);
            props.toggleEditForm();
          }}
          delete={() => {
            props.setSelectedUserValue(props.user);
            props.toggleDelete();
          }}
        ></DropDownButtons>
      </td>
    </tr>
  );
};

export default User;
