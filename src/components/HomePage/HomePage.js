import "./home.scss";
import user from "assets/icons/user.png";
import cart from "assets/icons/shopping-cart.png";
import dollar from "assets/icons/fast-delivery.png";
import funds from "assets/icons/funds.png";
import useHome from "hooks/useHome";
import { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";

const Home = () => {
  const [data, setData] = useState();
  const { loading, fetchData } = useHome();

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await fetchData();
        console.log(response);

        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNumbers();
  }, []);

  return (
    <div className="home">
      {loading ? (
        <div className="loadingSpinner center">
          <Ring size={40} lineWeight={5} speed={2} color="#0f7f3d" />
        </div>
      ) : (
        <>
          <div className="statics">
            <h2>مرحبا بعودتك🎉</h2>
            <div className="row row-cols-2 row-cols-md-4">
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
                  <span>طلبيه</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
