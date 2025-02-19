const { faCheck } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const UpdateTime = (props) => {
  const onsubmitHandler = (e) => {
    e.preventDefault();
    props.updateTime(e.target[0].value);
  };

  return (
    <form style={{ display: "flex" }} onSubmit={onsubmitHandler}>
      <input
        style={{ borderRadius: "0", width: "70px" }}
        className="form-control"
        defaultValue={props.value}
        placeholder="لا يوجد"
        type="number"
        min={0}
        max={100}
      />
      <button
        style={{
          padding: "0 8px",
          borderRadius: "0",
          backgroundColor: "green",
          color: "white",
        }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </form>
  );
};

export default UpdateTime;
