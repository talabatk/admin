import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Form } from "react-bootstrap";
import Option from "./Option/Option";
import { useEffect, useRef, useState } from "react";

const OptionGroup = (props) => {
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
    setOptionsValues(props.group.options);
  }, [props]);

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
            defaultValue={props.group?.name}
          />
        </Form.Group>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={props.group?.type === "single" ? false : true}
                color="warning"
                onChange={onChangeInputs}
                ref={single}
              />
            }
            label="خيار متعدد"
          />
        </FormGroup>
      </div>
      {optionsValues.map((item, index) => (
        <Option
          index={item.id}
          option={item}
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
            setOptionsValues([
              ...optionsValues,
              {
                id: optionsValues.length,
                name: "",
                value: 0,
                optionsGroupId: props.index,
              },
            ]);
          }}
          type="button"
        >
          إضافه قيمه
        </button>
        <button
          style={{ background: "red", color: "#fff" }}
          disabled={optionsValues.length === 1 ? true : false}
          onClick={() => {
            setOptionsValues((pre) => (pre = pre.slice(0, pre.length - 1)));
          }}
          type="button"
        >
          حذف
        </button>
      </div>
      <hr />
    </div>
  );
};
export default OptionGroup;
