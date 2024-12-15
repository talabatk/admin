import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropDownButtons = (props) => {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={<FontAwesomeIcon icon={faEllipsis} />}
      variant="none"
    >
      {props.edit ? (
        <Dropdown.Item
          onClick={() => {
            props.edit();
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} size="sm" />
          تعديل
        </Dropdown.Item>
      ) : null}

      <Dropdown.Item
        onClick={() => {
          props.delete();
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} size="sm" />
        حذف
      </Dropdown.Item>
    </DropdownButton>
  );
};
export default DropDownButtons;
