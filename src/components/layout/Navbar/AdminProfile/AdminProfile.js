import "./adminProfile.scss";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import notFound from "assets/images/notfound.png";
import { NavLink, useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const adminInfo = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setIsVisible(false); // Hide the menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsVisible((pre) => (pre = !pre));
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="adminProfile">
      <div className="adminName">
        <p>{adminInfo.name}</p>
        <span>{adminInfo.role === "admin" ? "admin" : "trader"}</span>
      </div>
      <div className="adminImage" onClick={toggleMenu}>
        <img
          src={adminInfo.image ? adminInfo.image : notFound}
          alt="adminImage"
        />
      </div>

      <CSSTransition
        mountOnEnter
        unmountOnExit
        nodeRef={nodeRef}
        in={isVisible}
        timeout={{ enter: 200, exit: 0 }}
        classNames={{
          enter: "enterMenu",
          enterActive: "enterActiveMenu",
          exit: "",
          exitActive: "",
        }}
      >
        <div className={`adminMenu`} ref={nodeRef}>
          <NavLink to="/profile">
            <FontAwesomeIcon icon={faUser} />
            الملف الشخصي
          </NavLink>
          <button onClick={logoutHandler}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            تسجيل خروج
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};
export default AdminProfile;
