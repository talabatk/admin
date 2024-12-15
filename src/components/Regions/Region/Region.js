import DropDownButtons from "components/Ui/DropDownButtons/DropDownButtons";

const Region = (props) => {
  return (
    <tr className="item">
      <td>{props.region?.id}</td>
      <td className="name">
        <h6>{props.region?.name}</h6>
      </td>
      <td>
        <DropDownButtons
          region={props.region}
          edit={() => {
            props.setSelectedRegionValue(props.region);
            props.toggleEditForm();
          }}
          delete={() => {
            props.setSelectedRegionValue(props.region);
            props.toggleDelete();
          }}
        ></DropDownButtons>
      </td>
    </tr>
  );
};

export default Region;
