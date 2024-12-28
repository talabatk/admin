import { Form } from "react-bootstrap";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const Option = (props) => {
  const name = useRef();
  const value = useRef();

  const onChangeInputs = (e) => {
    props.getOptionData({
      id: props.index,
      name: name.current.value,
      value: +value.current.value,
      group: props.groupIndex,
    });
  };

  return (
    <div className="option mb-2">
      <Form.Group className="mb-3" controlId="optionName">
        <Form.Label>
          الاختيارت<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="text"
          onChange={onChangeInputs}
          ref={name}
          placeholder="الأسم"
          defaultValue={props.option?.name}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="optionName">
        <Form.Label>
          القيمه<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="number"
          onChange={onChangeInputs}
          defaultValue={props.option?.value}
          ref={value}
          placeholder="...10"
          required
        />
      </Form.Group>
      <span
        className="center"
        style={{
          color: "red",
          backgroundColor: "transparent",
          paddingTop: "10px",
        }}
        type="button"
        onClick={() => {
          props.deleteOption(props.index);
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} size="lg" />
      </span>
    </div>
  );
};
export default Option;
