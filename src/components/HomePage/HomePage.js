import "./home.scss";
import user from "assets/icons/user.png";
import cart from "assets/icons/shopping-cart.png";
import dollar from "assets/icons/fast-delivery.png";
import funds from "assets/icons/funds.png";
import useHome from "hooks/useHome";
import { useEffect, useRef, useState } from "react";
import { Ring } from "@uiball/loaders";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Toast } from "primereact/toast";
import { Form } from "react-bootstrap";
import useCity from "hooks/useCity";
import { Checkbox } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMoneyBill,
  faMoneyBillTrendUp,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import ChartComponent from "./ChartComponent";
const arabicMonths = [
  "يناير", // 1
  "فبراير", // 2
  "مارس", // 3
  "أبريل", // 4
  "مايو", // 5
  "يونيو", // 6
  "يوليو", // 7
  "أغسطس", // 8
  "سبتمبر", // 9
  "أكتوبر", // 10
  "نوفمبر", // 11
  "ديسمبر", // 12
];

const Home = () => {
  const [data, setData] = useState();
  const [months, setMonths] = useState([]);
  const { loading, fetchData } = useHome();
  const toast = useRef(null);

  const fetchNumbers = async () => {
    try {
      const response = await fetchData();

      if (response.mothly) {
        const monthlyData = Object.entries(response.mothly)
          .filter(([key]) => key.includes("2025-")) // only keys like 2025-2
          .map(([key, value]) => {
            const [, month] = key.split("-");
            return {
              month: arabicMonths[parseInt(month, 10) - 1], // convert to Arabic
              الاجمالي: value.total,
              الشحن: value.shipping,
            };
          });
        console.log(monthlyData);
        setMonths(monthlyData);
      }
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNumbers();
  }, []);

  const showMessage = (type, head, content) => {
    toast.current.show({
      severity: type,
      summary: head,
      detail: content,
      life: 3000,
    });
  };

  return (
    <div className="home">
      <Toast style={{ direction: "rtf" }} ref={toast} position="top-left" />

      {loading ? (
        <div className="loadingSpinner center">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : (
        <>
          <div className="statics">
            <h2>مرحبا بعودتك🎉</h2>
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-4 g-3">
              <div className="col">
                <div className="image" style={{ backgroundColor: "#d6f4f7" }}>
                  <img src={user} alt="" />
                </div>
                <div className="info">
                  <span>{data?.customers.toLocaleString()}</span>
                  <span>مستخدم</span>
                </div>
              </div>
              <div className="col">
                <div className="image" style={{ backgroundColor: "#d3da74ff" }}>
                  <FontAwesomeIcon icon={faUsers} size="lg" color="#a6b200ff" />
                </div>
                <div className="info">
                  <span>{data?.vendors.toLocaleString()}</span>
                  <span>محل</span>
                </div>
              </div>
              <div className="col">
                <div className="image" style={{ backgroundColor: "#f87979ff" }}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="lg"
                    color="#7b1d00ff"
                  />
                </div>
                <div className="info">
                  <span>{data?.areas.toLocaleString()}</span>
                  <span>منطقه</span>
                </div>
              </div>
              <div className="col">
                <div className="image" style={{ backgroundColor: "#ffe2e3" }}>
                  <img src={cart} alt="" />
                </div>
                <div className="info">
                  <span>{data?.products.toLocaleString()}</span>
                  <span>منتج</span>
                </div>
              </div>
              <div className="col">
                <div className="image" style={{ backgroundColor: "#dcf6e8" }}>
                  <img src={dollar} alt="" />
                </div>
                <div className="info">
                  <span>{data?.onlineDeliveries.toLocaleString()}</span>
                  <span>ديلفرى</span>
                </div>
              </div>
              <div className="col">
                <div className="image" style={{ backgroundColor: "#e8e6fc" }}>
                  <img src={funds} alt="" />
                </div>
                <div className="info">
                  <span>{data?.orders.toLocaleString()}</span>
                  <span>كل الطلبات</span>
                </div>
              </div>
              <div className="col">
                <div className="image" style={{ backgroundColor: "#76cb79ff" }}>
                  <FontAwesomeIcon
                    icon={faMoneyBillTrendUp}
                    size="lg"
                    color="#048300ff"
                  />
                </div>
                <div className="info">
                  <span>{data?.activeOrders.toLocaleString()}</span>
                  <span>طلبيه مستحقه</span>
                </div>
              </div>
              <div className="col">
                <div className="image" style={{ backgroundColor: "#f87979ff" }}>
                  <FontAwesomeIcon icon={faTrash} size="lg" color="#7b1d00ff" />
                </div>
                <div className="info">
                  <span>{data?.deletedOrders.toLocaleString()}</span>
                  <span>طلبيه محذوفه</span>
                </div>
              </div>
            </div>
          </div>
          <div className="chart">
            <h3>الاحصائيات الشهريه</h3>
            <div className="chartContainer">
              <ChartComponent data={months} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
