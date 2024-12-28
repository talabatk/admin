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

  useEffect(() => {
    setOptionsValues(props.group.options);
  }, [props.group.options]);

  const deleteOptionHandler = async (id) => {
    const checkExist = optionsValues.findIndex((option) => +option.id === +id);
    if (checkExist > -1) {
      await props.deleteOption(id);
    }
    let newOptions = optionsValues.filter((option) => +option.id !== +id);
    console.log(newOptions);

    setOptionsValues(newOptions);
  };

  const setOptionData = (data) => {
    let options = optionsValues;

    let index = options.findIndex((option) => +option.id === +data.id);

    if (index > -1) {
      options[index] = data;
    } else {
      options.push(data);
    }
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
          deleteOption={deleteOptionHandler}
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
          onClick={() => {
            props.deleteGroup(props.index);
          }}
          style={{ background: "red", color: "#fff" }}
          type="button"
        >
          حذف الخيار
        </button>
      </div>
      <hr />
    </div>
  );
};
export default OptionGroup;
