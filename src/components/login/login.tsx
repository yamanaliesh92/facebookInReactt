import React, { ChangeEvent, FC, useContext, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AxiosErrors } from "../../axios/common.api";
import {
  IPayloadLogin,
  LoginApi,
  LoginDataApi,
} from "../../axios/user/login.api";
import { ContextUser } from "../../context/userContext";
import { setToken } from "../../utils/cookie";
import ForgetPasswordModal from "../model/forgetPassword";
import "../signup/signup.css";
import "./login.css";

interface Iprops {
  logins?: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const init: IPayloadLogin = {
  email: "",
  password: "",
};

const Login: FC<Iprops> = ({ logins, setLogin }) => {
  const { login } = useContext(ContextUser);

  const [element, setElement] = useState<IPayloadLogin>(init);

  const [forgetPassword, setForgetPassword] = useState<boolean>(false);

  const togdleForgetPassword = () => {
    setForgetPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const { mutateAsync, error, isLoading } = useMutation<
    LoginDataApi,
    AxiosErrors,
    IPayloadLogin
  >("login", LoginApi);

  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: IPayloadLogin = {
      email: element.email,
      password: element.password,
    };
    const { data } = await mutateAsync(body);
    console.log("data", data);
    const email = element.email as any;

    login(email);

    if (!data.token) return;

    setToken("MyToken", data.token);

    navigate("/");
  };

  const toggle = () => {
    setLogin((prev) => !prev);
  };

  return (
    <div className="right">
      <form className="infoForm authForm" onSubmit={onsubmit}>
        {error && <h1>{error.message}</h1>}
        {isLoading && <h1>loading.....</h1>}
        <h3>login</h3>
        <div>
          <input
            type={"email"}
            placeholder="email"
            data-testid="emailTest"
            className="infoInput input"
            name="email"
            value={element.email}
            onChange={onchange}
          />
        </div>

        <div>
          <input
            type={"password"}
            placeholder="password"
            className="infoInput"
            data-testid="passwordTest"
            name="password"
            value={element.password}
            onChange={onchange}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            data-testid="spanTest"
            style={{ fontSize: "0.8rem", marginLeft: "5px" }}
          >
            Do not have any account?{" "}
            <span className="tggole" data-testid="toSign" onClick={toggle}>
              Sign in{" "}
            </span>
          </span>
          <div className="styleForgetPassword" onClick={togdleForgetPassword}>
            forget your password?
          </div>
        </div>

        <button className="button infoButton" data-testid="sub" type="submit">
          Login
        </button>
      </form>
      {forgetPassword ? (
        <ForgetPasswordModal
          setOpen={setForgetPassword}
          open={forgetPassword}
        />
      ) : null}
    </div>
  );
};
export default Login;
