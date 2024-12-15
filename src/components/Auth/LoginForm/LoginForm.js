import "./loginform.scss";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//importing bootstrap form------------------
import { Form, Button } from "react-bootstrap";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Ring } from "@uiball/loaders";

import useLogin from "hooks/uselogin";

const LoginForm = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { user, loading, error, login } = useLogin();

  const phone = useRef();
  const password = useRef();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await login({
        key: phone.current.value,
        password: password.current.value,
      });

      console.log("Login successful:", data);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const changePasswordVisiblity = () => {
    setVisiblePassword((pre) => (pre = !pre));
  };

  const inputChange = (e) => {
    e.target.classList.remove("inputError");
  };

  return (
    <div className="loginForm">
      <div className="welcomeMessage">
        <h5>مرحبا بعودتك !</h5>
        <p>قم بتسجيل الدخول الى لوحه التحكم</p>
      </div>
      <Form className="form" onSubmit={submitFormHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>رقم الهاتف</Form.Label>
          <Form.Control
            type="text"
            placeholder="ادخل رقم الهاتف"
            ref={phone}
            onChange={inputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>كلمه المرور</Form.Label>
          <i onClick={changePasswordVisiblity}>
            <FontAwesomeIcon icon={visiblePassword ? faEyeSlash : faEye} />
          </i>
          <Form.Control
            type={visiblePassword ? "text" : "password"}
            placeholder="كلمه المرور"
            ref={password}
            onChange={inputChange}
            required
          />
        </Form.Group>
        {error ? (
          <p className="error">هناك خطأ في بيانات الحساب الخاص بك!</p>
        ) : null}
        <Button variant="primary" type="submit">
          {loading ? (
            <Ring size={22} lineWeight={5} speed={2} color="white" />
          ) : (
            "تسجيل دخول"
          )}
        </Button>
      </Form>
    </div>
  );
};
export default LoginForm;
