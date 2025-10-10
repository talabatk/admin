import { Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";

const Option = (props) => {
  const inputnameRef = useRef();
  const value = useRef();
  const image = useRef();
  const [preview, setPreview] = useState(null);
  const [option, setOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (props.options) {
      setOptions(props.options.map((o) => ({ value: o.id, label: o.name })));
    }
  }, []);

  const onChangeInputs = (e) => {
    props.getOptionData({
      id: props.index,
      generalOptionId: option.value,
      value: +value.current.value,
      group: props.groupIndex,
    });
  };

  const handleChange = (selectedOption) => {
    setOption(selectedOption);
    props.getOptionData({
      id: props.index,
      generalOptionId: selectedOption.value,
      value: +value.current.value,
      group: props.groupIndex,
    });
  };

  return (
    <div className="option mb-2">
      <Form.Group className="mb-3" controlId="optionName">
        <Form.Label>الاختيارت</Form.Label>
        <div></div>
        <Select
          style={{ width: "100%" }}
          value={option}
          options={options}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="optionValue">
        <Form.Label>
          القيمه<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Control
          type="number"
          onChange={onChangeInputs}
          defaultValue={0}
          ref={value}
          placeholder="...10"
          required
        />
      </Form.Group>
    </div>
  );
};
export default Option;
