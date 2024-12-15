import "./auth.scss";
import LoginForm from "./LoginForm/LoginForm";
import logo from "assets/images/logo.png";

const Auth = () => {
  return (
    <div className="login center">
      <div className="logo center">
        <img src={logo} alt="logo" />
      </div>
      <LoginForm />
    </div>
  );
};
export default Auth;
