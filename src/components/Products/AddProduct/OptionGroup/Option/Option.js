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
    const file = image.current?.files?.[0] || null;

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    if (props.generalOptionId) {
      props.getOptionData({
        id: props.index,
        generalOptionId: props.generalOptionId,
        generalOptionName: props.generalOptionName,
        value: +value.current.value,
        group: props.groupIndex,
      });
    } else {
      props.getOptionData({
        id: props.index,
        image: image.current.files[0],
        name: inputnameRef.current.value,
        value: +value.current.value,
        group: props.groupIndex,
      });
    }
  };

  return (
    <div className="option mb-2">
      {props.generalOptionId ? (
        <>
          <Form.Group className="mb-3" controlId="optionName">
            <Form.Label>الاختيارت</Form.Label>
            <div></div>
            <Form.Control
              type="text"
              // onChange={onChangeInputs}
              // ref={inputnameRef}
              readOnly
              value={props.generalOptionName}
              placeholder="الأسم"
              required
            />
          </Form.Group>
        </>
      ) : (
        <>
          <Form.Group className="mb-3" controlId="optionName">
            <Form.Label>الاختيارت</Form.Label>
            <div></div>
            <Form.Control
              type="file"
              onChange={onChangeInputs}
              ref={image}
              placeholder="الصوره"
              required
            />
            {preview && (
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
                  src={preview}
                  alt="preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="optionName">
            <Form.Label>
              الأسم<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={onChangeInputs}
              ref={inputnameRef}
              placeholder="الأسم"
              required
            />
          </Form.Group>
        </>
      )}

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
