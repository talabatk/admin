import DropDownButtons from "components/Ui/DropDownButtons/DropDownButtons";
import "./product.scss";
import { useNavigate } from "react-router-dom";
const Product = (props) => {
  const navigate = useNavigate();
  return (
    <div className="col" style={{ padding: "10px" }}>
      <div className="product">
        <div className="fav-btn center">
          <DropDownButtons
            delete={() => {
              props.setSelectedProductValue(props.product);
              props.toggleDelete();
            }}
            edit={() => {
              console.log(props.product.id);

              navigate(props.product.id + "");
            }}
          />
        </div>
        <div className="image">
          <img src={props.product?.productImages[0]?.image} alt="" />
        </div>
        <div className="product-info">
          <h4>{props.product?.title}</h4>
          <span style={{ fontSize: "13px" }}>
            المطعم: {props.product?.user.name}
          </span>
          <span
            style={{ margin: "0 5px", color: "#0f7f3d", fontWeight: "bold" }}
          >
            |
          </span>
          <span style={{ fontSize: "13px" }}>
            القسم: {props.product?.category.name}
          </span>
          <div className="price-rate">
            <div className="price">
              <i
                className="fa fa-tag"
                style={{ fontSize: "lg", color: "#d9176f" }}
              ></i>
              <span>{props.product?.price} شيكل</span>
            </div>
            <div className="rate">
              <span>{props.product?.orders}طلب </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
