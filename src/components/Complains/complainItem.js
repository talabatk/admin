import "./complain.scss";
const Complain = (props) => {
  const date = new Date(props.complain?.createdAt);
  return (
    <div className="complain">
      <h4>{props.complain?.title}</h4>
      <p>{props.complain?.description}</p>
      <span style={{ fontWeight: "bold" }}>الاسم: </span>
      <span>{props.complain?.user?.name}</span>
      <span style={{ marginRight: "20px", fontWeight: "bold" }}>الهاتف: </span>
      <span>{props.complain?.user?.phone}</span>
      <p>{date.toLocaleString()}</p>
      <button
        onClick={() => {
          props.toggleDelete();
          props.setSelectedComplainValue(props.complain);
        }}
      >
        مسح
      </button>
    </div>
  );
};
export default Complain;
