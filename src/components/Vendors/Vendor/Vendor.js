import notfound from "assets/images/notfound.png";
import DropDownButtons from "components/Ui/DropDownButtons/DropDownButtons";
import MenuSimple from "./Dropdown";
import { useNavigate } from "react-router-dom";

const Vendor = (props) => {
  const navigate = useNavigate();
  const categories = props.vendor.vendorCategories.map(
    (category) => category.name
  );
  console.log(props.vendor.type);

  return (
    <tr className="item">
      <td>{props.vendor?.id}</td>
      <td className="name">
        <span>
          <div>
            <img
              src={props.vendor.image ? props.vendor.image : notfound}
              alt="vendor"
            />
          </div>
          <div>
            <h6>{props.vendor?.name}</h6>
            <p>{props.vendor?.phone}</p>
          </div>
        </span>
      </td>
      <td>{props.vendor?.address}</td>
      <td>{props.vendor?.areas?.length} مناطق</td>
      <td>
        <MenuSimple
          id={props.vendor.id}
          updateVendor={props.updateVendor}
          status={props.vendor?.status}
        />
      </td>
      <td>{categories.join(",") || "لا يوجد"}</td>
      <td>{props.vendor.type === "restaurant" ? "مطعم" : "سوبر ماركت"}</td>
      <td>
        <DropDownButtons
          vendor={props.vendor}
          edit={() => {
            navigate(`${props.vendor.id}`);
          }}
          delete={() => {
            props.setSelectedVendorValue(props.vendor);
            props.toggleDelete();
          }}
        ></DropDownButtons>
      </td>
    </tr>
  );
};

export default Vendor;
