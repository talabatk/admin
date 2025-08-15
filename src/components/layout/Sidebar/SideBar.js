import "./sideBar.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceActions } from "store/uiSlice";
import logo from "assets/images/logo.png";
import icon1 from "assets/icons/cutlery.png";
import icon2 from "assets/icons/category.png";
import icon3 from "assets/icons/gallery.png";
import icon4 from "assets/icons/map.png";
import icon5 from "assets/icons/group.png";
import icon6 from "assets/icons/checkout.png";
import icon7 from "assets/icons/menu.png";
import icon8 from "assets/icons/home.png";
import icon9 from "assets/icons/complain.png";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firbase";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [unSeenComplains, setUnSeenComplains] = useState(0);
  const sideBarVisiablity = useSelector((state) => state.ui.sideBarIsVisiable);

  const dispatch = useDispatch();

  const sideBarHandler = () => {
    dispatch(uiSliceActions.toggleSideBar());
  };

  useEffect(() => {
    const q = query(collection(db, "complains"), where("seen", "==", false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs;
      setUnSeenComplains(data.length);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div
        className={sideBarVisiablity ? "overlay openOverlay" : "overlay"}
        onClick={sideBarHandler}></div>
      <div className={`sidebar ${sideBarVisiablity ? "openSideBar" : ""}`}>
        <div className="logo center">
          <h3>طالباتك</h3>
          <img src={logo} alt="logo" />
        </div>
        <div className="link-container">
          <div className="pages">
            <p>الصفحات</p>
            <div>
              <NavLink
                exact="true"
                to="/"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon8} alt="categories icon" />
                <span>الرئيسيه</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/orders"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon6} alt="categories icon" />
                <span>الطلبات</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/vendors"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon1} alt="categories icon" />
                <span>المطاعم</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/products"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon7} alt="categories icon" />
                <span>المنتجات</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/users"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon5} alt="categories icon" />
                <span>المستخدمين</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/categories"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon2} alt="categories icon" />
                <span>الاقسام</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/vendor-categories"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon2} alt="categories icon" />
                <span>تصنيف المطاعم</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/sliders"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon3} alt="categories icon" />
                <span>سلايدر الصور</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/banners"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon3} alt="categories icon" />
                <span>بانر إعلاني</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/cities"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon4} alt="categories icon" />
                <span>المدن</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/regions"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon4} alt="categories icon" />
                <span>مناطق التوصيل</span>
              </NavLink>
            </div>
            <div>
              <NavLink
                exact="true"
                to="/complains"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}>
                <img src={icon9} alt="categories icon" />
                <span>الشكاوى</span>
              </NavLink>
              <span className="unseenComplains">{unSeenComplains}</span>
            </div>
            {/* <div>
              <NavLink
                exact="true"
                to="/send-notification"
                activeclassname="true"
                className="link"
                onClick={sideBarHandler}
              >
                <img src={icon10} alt="categories icon" />
                <span>ارسال اشعار</span>
              </NavLink>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;
