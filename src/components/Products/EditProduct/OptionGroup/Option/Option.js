import { Form } from "react-bootstrap";
import { useRef } from "react";

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
    </div>
  );
};
export default Option;
