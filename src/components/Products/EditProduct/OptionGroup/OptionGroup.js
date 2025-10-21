import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Form } from "react-bootstrap";
import Option from "./Option/Option";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";

const OptionGroup = (props) => {
  const [optionsValues, setOptionsValues] = useState([]);
  const groupName = useRef();
  const single = useRef();

  const [generalOptions, setGeneralOptions] = useState([]);

  useEffect(() => {
    if (props.options) {
      setGeneralOptions(
        props.options.map((o) => ({ value: o.id, label: o.name }))
      );
    }
  }, []);

  useEffect(() => {
    setOptionsValues(props.group.options);
  }, [props.group.options]);

  const deleteOptionHandler = async (id) => {
    const checkExist = optionsValues.findIndex((option) => +option.id === +id);
    if (checkExist > -1) {
      await props.deleteOption(id);
    }
    let newOptions = optionsValues.filter((option) => +option.id !== +id);

    setOptionsValues(newOptions);
    props.getOptionData({
      id: props.index,
      name: groupName.current.value,
      type: single.current.children[0].checked ? "multi" : "single",
      options: newOptions,
    });
  };

  const setOptionData = (data) => {
    setOptionsValues((prevOptions) => {
      // Make a shallow copy of the array
      const newOptions = [...prevOptions];
      const index = newOptions.findIndex((option) => +option.id === +data.id);

      if (index > -1) {
        newOptions[index] = data; // update existing
      } else {
        newOptions.push(data); // add new
      }

      // Notify parent about change
      props.getOptionData({
        id: props.index,
        name: groupName.current.value,
        type: single.current.children[0].checked ? "multi" : "single",
        options: newOptions,
      });

      return newOptions; // <- important: return new array for state update
    });
  };

  const handleChange = (selectedOption) => {
    setOptionData({
      id: optionsValues.length,
      generalOptionId: selectedOption.value,
      generalOptionName: selectedOption.label,
      value: 0,
      group: props.index,
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
      <div className="mb-3">
        <Form.Label>خيارات عامه</Form.Label>
        <Select
          style={{ width: "50%" }}
          // value={generalOptions}
          options={generalOptions}
          onChange={handleChange}
        />
      </div>
      {optionsValues.map((item) => (
        <Option
          index={item.id}
          option={item}
          generalOptionId={item.generalOptionId}
          generalOptionName={item.generalOptionName}
          groupIndex={props.index}
          key={item.id}
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
          type="button">
          إضافه قيمه
        </button>
        <button
          onClick={() => {
            props.deleteGroup(props.index);
          }}
          style={{ background: "red", color: "#fff" }}
          type="button">
          حذف الخيار
        </button>
      </div>
      <hr />
    </div>
  );
};
export default OptionGroup;
