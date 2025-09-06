import { Form } from "react-bootstrap";
import { useRef, useState } from "react";

const Option = (props) => {
  const inputnameRef = useRef();
  const value = useRef();
  const image = useRef();
  const [preview, setPreview] = useState(null);
  const onChangeInputs = (e) => {
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
  };

  return (
    <div className="option mb-2">
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
