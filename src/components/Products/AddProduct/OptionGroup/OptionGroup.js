import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Form } from "react-bootstrap";
import Option from "./Option/Option";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";

const OptionGroup = (props) => {
  const [optionsNumber, setOptionsNumber] = useState(0);
  const [options, setOptions] = useState([]);
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

  const setOptionData = (data) => {
    let options = optionsValues;
    options[data.id] = data;
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

  const handleChange = (selectedOption) => {
    setOptionData({
      id: optionsValues.length,
      generalOptionId: selectedOption.value,
      generalOptionName: selectedOption.label,
      value: 0,
      group: props.index,
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
          groupIndex={props.index}
          generalOptionId={item.generalOptionId}
          generalOptionName={item.generalOptionName}
          key={item.id}
          getOptionData={setOptionData}
          options={props.options}
        />
      ))}
      <div>
        <button
          style={{ minWidth: "fit-content" }}
          className="button"
          onClick={() => {
            setOptionData({
              id: optionsValues.length,
              name: "",
              image: null,
              value: 0,
              group: props.index,
            });
          }}
          type="button">
          إضافه قيمه
        </button>
        <button
          style={{ background: "red", color: "#fff" }}
          // disabled={optionsNumber === 0 ? true : false}
          onClick={() => {
            let o = optionsValues;
            o.pop();
            setOptionsValues([...o]);
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
