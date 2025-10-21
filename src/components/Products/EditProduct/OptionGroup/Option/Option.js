import { Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Select from "react-select";

const Option = (props) => {
  const inputnameRef = useRef();
  const value = useRef();
  const image = useRef();
  const [preview, setPreview] = useState(null);

  const onChangeInputs = (e) => {
    if (props.option.createdAt || !props.generalOptionId) {
      const file = image.current?.files?.[0] || null;

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
      props.getOptionData({
        id: props.index,
        name: inputnameRef.current.value,
        value: +value.current.value,
        image: image.current.files[0],
        group: props.groupIndex,
      });
    } else {
      props.getOptionData({
        id: props.index,
        generalOptionId: props.generalOptionId || 0,
        value: +value.current.value,
        group: props.groupIndex,
      });
    }
  };

  return (
    <div className="option mb-2">
      <Form.Group className="mb-3" controlId="optionName">
        <Form.Label>
          الاختيارت<span style={{ color: "red" }}>*</span>
        </Form.Label>
        {!props.option.createdAt && props.generalOptionId ? (
          <>
            <Form.Control
              type="text"
              readOnly
              value={props.generalOptionName}
              placeholder="الأسم"
              required
            />
          </>
        ) : (
          <>
            <Form.Control
              type="file"
              onChange={onChangeInputs}
              ref={image}
              placeholder="الصوره"
            />

            {(preview || props.option?.image) && (
              <div
                style={{
                  width: 60,
                  height: 60,
                  border: "1px solid #ddd",
                  borderRadius: 4,
                  marginTop: 8,
                  overflow: "hidden",
                }}>
                <img
                  src={preview ? preview : props.option?.image}
                  alt="preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
          </>
        )}
      </Form.Group>
      {props.option.createdAt || !props.generalOptionId ? (
        <Form.Group className="mb-3" controlId="optionName">
          <Form.Label>
            الأسم<span style={{ color: "red" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            onChange={onChangeInputs}
            ref={inputnameRef}
            placeholder="الأسم"
            defaultValue={props.option?.name}
            required
          />
        </Form.Group>
      ) : null}
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
        }}>
        <FontAwesomeIcon icon={faTrashCan} size="lg" />
      </span>
    </div>
  );
};
export default Option;
