import React, { ChangeEvent, FC, useContext, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AxiosErrors } from "../../axios/common.api";
import { GrGallery } from "react-icons/gr";
import { IPayload, registerApi, registerDate } from "../../axios/user/register";

import { ContextUser } from "../../context/userContext";
import { setToken } from "../../utils/cookie";
import "./signup.css";

interface Props {
  sign?: boolean;
  setSign: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IData {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

const init: IData = {
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
};

const Signup: FC<Props> = ({ sign, setSign }) => {
  const toggle = () => {
    setSign((prev) => !prev);
  };

  const navigate = useNavigate();

  const [element, setElement] = useState<IData>(init);
  const [img, setImg] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const onChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const value = e.target.files[0];
    setImg(value);
  };

  const { setLoading, login } = useContext(ContextUser);

  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);

  const { mutateAsync, error } = useMutation<
    registerDate,
    AxiosErrors,
    IPayload
  >("register", registerApi);

  const onchange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement((prev) => {
      return {
        ...prev,

        [e.target.name]: e.target.value,
      };
    });
  };

  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!img) return;

    const formData = new FormData();

    formData.append("email", element.email);
    formData.append("password", element.password);
    formData.append("username", element.username);
    formData.append("image", img);

    const { data } = await mutateAsync(formData as any);

    setLoading(true);

    login({ email: data.user.email });

    if (element.password !== element.confirmPassword) {
      setConfirmPassword(true);
    }

    setToken("MyToken", data.token);

    setLoading(false);
    navigate("/");
  };

  return (
    <div className="right">
      <form className="infoForm authForm" onSubmit={onsubmit}>
        <h3>signs</h3>
        <div>
          <input
            type={"text"}
            data-testid="emailTest"
            placeholder="email"
            name="email"
            className="infoInput"
            value={element.email}
            onChange={onchange}
          />
        </div>
        <div>
          <input
            type={"text"}
            placeholder="username"
            name="username"
            data-testid="usernameTest"
            className="infoInput"
            value={element.username}
            onChange={onchange}
          />
        </div>

        <div>
          <input
            type={"password"}
            placeholder="password"
            name="password"
            className="infoInput"
            data-testid="passwordTest"
            value={element.password}
            onChange={onchange}
          />
        </div>
        <div>
          <input
            type={"password"}
            placeholder="confirm password"
            name="confirmPassword"
            data-testid="confirmPasswordTest"
            value={element.confirmPassword}
            className="infoInput"
            onChange={onchange}
          />
        </div>

        <div style={{ display: "none" }}>
          <input ref={ref} type="file" onChange={onChangeImg} />
        </div>
        <div className="gallary">
          <h5 style={{ color: "red", fontWeight: "bold" }}>
            choose your image
          </h5>
          <GrGallery
            size={25}
            cursor="pointer"
            onClick={() => ref.current?.click()}
          />
        </div>

        {confirmPassword ? (
          <span className="confirmPasswordStyle" data-testid="span">
            {" "}
            * confirm password is not same
          </span>
        ) : null}
        <div>
          {error && (
            <span style={{ fontWeight: "bold", fontSize: "22px" }}>
              {error.response?.data.message}
            </span>
          )}
          <span style={{ fontSize: "0.8rem" }}>
            already have an account ?{" "}
            <span
              onClick={toggle}
              data-testid="data-to-login"
              className="tggole"
            >
              {/* {isLoading ? "isloading" : "Login"} */}
              Login
            </span>
          </span>
        </div>
        <button data-testid="btn" className="button infoButton" type="submit">
          sign
        </button>
      </form>
    </div>
  );
};
export default Signup;
