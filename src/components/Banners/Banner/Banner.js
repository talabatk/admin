import notfound from "assets/images/notfound.png";
import DropDownButtons from "components/Ui/DropDownButtons/DropDownButtons";

const Banner = (props) => {
  return (
    <tr className="item">
      <td>{props.slider?.id}</td>
      <td className="name">
        <span>
          <div>
            <img
              src={props.slider.image ? props.slider.image : notfound}
              alt="slider"
            />
          </div>
          <div>
            <h6>{props.slider?.title}</h6>
          </div>
        </span>
      </td>
      <td>{props.slider?.discription}</td>
      <td>
        {props.slider?.status === "disabled"
          ? "عدم ظهور"
          : props.slider?.status === "optional"
          ? "ظهور اختياري"
          : "ظهور اجباري"}
      </td>

      <td>
        <DropDownButtons
          slider={props.slider}
          edit={() => {
            props.setSelectedSliderValue(props.slider);
            props.toggleEditForm();
          }}
          delete={() => {
            props.setSelectedSliderValue(props.slider);
            props.toggleDelete();
          }}></DropDownButtons>
      </td>
    </tr>
  );
};

export default Banner;
