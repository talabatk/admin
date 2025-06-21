import notfound from "assets/images/notfound.png";
import DropDownButtons from "components/Ui/DropDownButtons/DropDownButtons";

const Category = (props) => {
  return (
    <tr className="item">
      <td>{props.category?.id}</td>
      <td className="name">
        <span>
          <div>
            <img
              src={props.category.image ? props.category.image : notfound}
              alt="category"
            />
          </div>
          <div>
            <h6>{props.category?.name}</h6>
          </div>
        </span>
      </td>
      <td>{props.category?.order}</td>
      <td>{props.category?.type === "supermarket" ? "سوبر ماركت" : "مطعم"}</td>
      <td>
        <DropDownButtons
          category={props.category}
          edit={() => {
            props.setSelectedCategoryValue(props.category);
            props.toggleEditForm();
          }}
          delete={() => {
            props.setSelectedCategoryValue(props.category);
            props.toggleDelete();
          }}
        ></DropDownButtons>
      </td>
    </tr>
  );
};

export default Category;
