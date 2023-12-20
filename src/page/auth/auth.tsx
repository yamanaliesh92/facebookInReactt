import { useState } from "react";
import Login from "../../components/login/login";
import Signup from "../../components/signup/signup";
import logo from "../../images/logo.png";
import "./auth.css";

const Auth = () => {
  const [sign, setSign] = useState<boolean>(true);
  return (
    <div className="auth">
      {sign ? (
        <Signup sign={sign} setSign={setSign} />
      ) : (
        <Login logins={sign} setLogin={setSign} />
      )}
    </div>
  );
};

export default Auth;
