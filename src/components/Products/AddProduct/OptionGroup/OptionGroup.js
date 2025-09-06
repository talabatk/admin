import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Form } from "react-bootstrap";
import Option from "./Option/Option";
import { useEffect, useRef, useState } from "react";

const OptionGroup = (props) => {
  const [optionsNumber, setOptionsNumber] = useState(1);
  const [options, setOptions] = useState([]);
  const [optionsValues, setOptionsValues] = useState([]);
  const groupName = useRef();
  const single = useRef();

  const setOptionData = (data) => {
    let options = optionsValues.filter((option) => +option.id !== +data.id);
    options.push(data);
    setOptionsValues(options);
    props.getOptionData({
      id: props.index,
      name: groupName.current.value,
      type: single.current.children[0].checked ? "multi" : "single",
      options: options,
    });
  };

  const onChangeInputs = (e) => {
    props.getOptionData({
      id: props.index,
      name: groupName.current.value,
      type: single.current.children[0].checked ? "multi" : "single",
      options: optionsValues,
    });
  };

  useEffect(() => {
    const optionList = [];
    for (let i = 0; i < optionsNumber; i++) {
      optionList.push(<Option key={i} setOptionData={setOptionData} />);
    }
    setOptions(optionList);
  }, [optionsNumber]);

  return (
    <div className="group">
      <div className="mb-2">
        <Form.Group className="mb-3" controlId="group-name">
          <Form.Label>
            اسم الخيار<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="اسم الخيار"
            ref={groupName}
            required
            onChange={onChangeInputs}
          />
        </Form.Group>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={false}
                color="warning"
                onChange={onChangeInputs}
                ref={single}
              />
            }
            label="خيار متعدد"
          />
        </FormGroup>
      </div>
      {options.map((item, index) => (
        <Option
          index={index}
          groupIndex={props.index}
          key={index}
          getOptionData={setOptionData}
        />
      ))}
      <div>
        <button
          style={{ minWidth: "fit-content" }}
          className="button"
          onClick={() => {
            setOptionsNumber((pre) => (pre += 1));
          }}
          type="button">
          إضافه قيمه
        </button>
        <button
          style={{ background: "red", color: "#fff" }}
          disabled={optionsNumber === 1 ? true : false}
          onClick={() => {
            setOptionsNumber((pre) => (pre -= 1));
          }}
          type="button">
          حذف
        </button>
      </div>
      <hr />
    </div>
  );
};
export default OptionGroup;
