import { useEffect, useRef, useState } from "react";
import "./orderDetail.scss";
import { Ring } from "@uiball/loaders";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useOrder from "hooks/useOrder";

const OrderDetails = (props) => {
  const { loading, error, fetchOrderBYId } = useOrder();
  const [order, setOrder] = useState(null);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const form = useRef();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetchOrderBYId(id);
        setOrder(response);
        setDate(new Date(response.createdAt));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [id]);

  return (
    <div className={`add-product`}>
      {loading ? (
        <div className="loading-spinner center">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : null}
      <h3 style={{ marginBottom: "20px" }}>الطلب الخاص ب{order?.name}</h3>

      <div className="orderDetails">
        <div className="row row-cols-2 row-cols-md-3">
          <div className="col">
            <div>
              <span className="label">رقم الطلبيه:</span>
              <span>{order?.id}</span>
            </div>
            <div>
              <span className="label">وقت الطلب:</span>
              <span>{date.toLocaleString()}</span>
            </div>
            <div>
              <span className="label">اسم العميل:</span>
              <span>{order?.name}</span>
            </div>
            <div>
              <span className="label">هاتف العميل:</span>
              <span>
                {order?.phone.includes("97")
                  ? "0" + order?.phone.slice(3)
                  : order?.phone}
              </span>
            </div>
            <div>
              <span className="label">رقم المستخدم:</span>
              <span>{order?.user?.phone}</span>
            </div>
          </div>
          <div className="col">
            <div>
              <span className="label">اسم المطعم:</span>
              <span>{order?.cart_products[0]?.product?.user.name}</span>
            </div>
            <div>
              <span className="label">هاتف المطعم:</span>
              <span>{order?.cart_products[0]?.product?.user.phone}</span>
            </div>
            <div>
              <span className="label">هاتف العميل:</span>
              <span>
                {order?.phone.includes("97")
                  ? "0" + order?.phone?.slice(3)
                  : order?.phone}
              </span>
            </div>
            <div>
              <span className="label">حاله الطلب:</span>
              <span
                style={{
                  color: status.find((s) => s.en === order?.status)?.color,
                }}
              >
                {status.find((s) => s.en === order?.status)?.ar}
              </span>
            </div>
          </div>
          <div className="col">
            <div>
              <span className="label">الكميه :</span>
              <span>{order?.total_quantity}</span>
            </div>
            <div>
              <span className="label">قيمه الطلب:</span>
              <span>{order?.subtotal} شيكل</span>
            </div>
            <div>
              <span className="label">الشحن :</span>
              <span>{order?.shipping} شيكل</span>
            </div>
            <div>
              <span className="label">المجموع:</span>
              <span>{order?.total} شيكل</span>
            </div>
          </div>
        </div>
        <div className="row row-cols-1">
          <div className="col">
            <div>
              <span className="label">الديلفرى :</span>
              <span>
                {order?.delivery
                  ? order.delivery.user.name
                  : "لم يتم قبول الطلب حتي الان"}
              </span>
            </div>
            <div>
              <span className="label">هاتف الديلفرى:</span>
              <span>
                {order?.delivery
                  ? order.delivery.user.phone
                  : "لم يتم قبول الطلب حتي الان"}
              </span>
            </div>
            <div>
              <span className="label">العنوان :</span>
              <span>{order?.address}</span>
            </div>
            <div>
              <span className="label">ملاحظات :</span>
              <span>{order?.notes || "لا يوجد"}</span>
            </div>
          </div>
        </div>
        <h3>المنتجات المطلوبه</h3>

        <div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
          style={{ marginBottom: "50px" }}
        >
          {order?.cart_products?.map((product) => (
            <div className="col" key={product.id}>
              <div className="cart-product">
                <h6>{product.product.title}</h6>
                <div>
                  <span className="label">السعر :</span>
                  <span>{product.product.price} شيكل</span>
                </div>
                <div>
                  <span className="label">العدد :</span>
                  <span>{product.quantity}</span>
                </div>
                <div>
                  <span className="label">ملاحظات :</span>
                  <span>{product.notes || "لا يوجد"}</span>
                </div>
                <span style={{ marginBottom: "10px" }} className="label">
                  الاضافات
                </span>
                {product.options.map((addition) => (
                  <div key={addition.id}>
                    <span>{addition.name}</span>
                    <span>{addition.value} شيكل</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
const status = [
  { en: "not started", ar: "لم يبدأ", color: "#6c757d" }, // Gray: Neutral/Inactive
  { en: "started", ar: "تم البدء  ", color: "#17a2b8" }, // Cyan: In Progress
  { en: "preparing", ar: "قيد التحضير", color: "#ffc107" }, // Yellow: Preparing/Waiting
  { en: "finished", ar: "انتهى التحضير", color: "#28a745" }, // Green: Success/Completed
  { en: "in the way", ar: "في الطريق", color: "#007bff" }, // Blue: On its way
  { en: "complete", ar: "اكتمل", color: "#20c997" }, // Teal: Fully Complete
  { en: "cancel", ar: "مرفوض", color: "#dc3545" }, // Red: Cancelled/Rejected
  { en: "deleted", ar: "تم المسح", color: "#343a40" }, // Dark Gray: Deleted/Removed
];
