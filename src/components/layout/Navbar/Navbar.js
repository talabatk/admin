import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { uiSliceActions } from "store/uiSlice";
import { faBell, faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AdminProfile from "./AdminProfile/AdminProfile";
import { useState, useRef, useEffect } from "react";
import useHome from "hooks/useHome";
import Notifications from "./Notifications/Notifications";

const Navbar = (props) => {
  const [data, setData] = useState();

  const { loading, fetchNotification, updateNotification } = useHome();
  const isDark = useSelector((state) => state.ui.isDark);
  const [notificationiIsVisible, setnotificationiIsVisible] = useState(false);
  const nodeRef = useRef();

  const toggleNotification = () => {
    setnotificationiIsVisible((pre) => (pre = !pre));
  };

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await fetchNotification({ size: 30, page: 1 });
        console.log(response);

        setData(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNumbers();

    const handleClickOutside = (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        toggleNotification(); // Hide the menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.newOrder]);

  const dispatch = useDispatch();

  return (
    <div className="nav">
      <div
        className="bars"
        onClick={() => {
          dispatch(uiSliceActions.toggleSideBar());
        }}
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div>
      <div className="controls">
        <ul>
          {!isDark ? (
            <li
              onClick={() => {
                dispatch(uiSliceActions.setDark());
              }}
            >
              <FontAwesomeIcon icon={faMoon} size="lg" />
            </li>
          ) : (
            <li
              onClick={() => {
                dispatch(uiSliceActions.setLight());
              }}
            >
              <FontAwesomeIcon icon={faSun} size="lg" />
            </li>
          )}
          <li onClick={toggleNotification}>
            <FontAwesomeIcon icon={faBell} size="lg" />
            {data?.notSeen ? <span className="active-new"></span> : ""}
            <Notifications
              ref={nodeRef}
              notifications={data}
              show={notificationiIsVisible}
            />
          </li>
        </ul>
        <AdminProfile />
      </div>
    </div>
  );
};
export default Navbar;
