import { useRef, useState } from "react";
import { Form } from "react-bootstrap";

const AreaCost = (props) => {
  const area = useRef();
  const value = useRef();

  const onChangeInputs = (e) => {
    props.getAreaCost({
      id: props.index,
      area: +area.current.value,
      cost: +value.current.value,
    });
  };

  return (
    <div className="area-cost">
      <Form.Group className="mb-3" controlId="type">
        <Form.Label>
          المنطقه<span style={{ color: "red" }}>*</span>
        </Form.Label>
        <Form.Select
          ref={area}
          defaultValue={props.area?.id || ""}
          required
          onChange={onChangeInputs}
        >
          {props.areas?.map((area) => (
            <option value={area.id} key={area.id}>
              {area.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="free">
        <Form.Label>قيمه التوصيل</Form.Label>
        <Form.Control
          onChange={onChangeInputs}
          type="number"
          placeholder="0"
          min={0}
          defaultValue={props.area?.delivery_cost.cost || ""}
          ref={value}
        />
      </Form.Group>
    </div>
  );
};

export default AreaCost;
