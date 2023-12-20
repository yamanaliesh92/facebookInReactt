import { Modal } from "@mantine/core";
import React, { ChangeEvent, FC, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AxiosErrors } from "../../axios/common.api";
import {
  DataResponseForgetPassword,
  forgetPasswordApi,
  IPayloadForgetPassword,
} from "../../axios/user/forgetPassword.api";
import {
  DataResponseRestPassword,
  IPayloadRestPassword,
  restPasswordApi,
} from "../../axios/user/restPassword.api";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Payload {
  email: string;
  password: string;
}

const init: Payload = {
  email: "",
  password: "",
};

const ForgetPasswordModal: FC<Props> = ({ open, setOpen }) => {
  const [element, setElement] = useState<Payload>(init);

  const [submit, setSubmit] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setElement((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const navgite = useNavigate();

  const { mutateAsync, error, data } = useMutation<
    DataResponseForgetPassword,
    AxiosErrors,
    IPayloadForgetPassword
  >("forgetPasswordApi", forgetPasswordApi);

  const {
    mutateAsync: mutateRestPassword,
    error: errorRestPAssword,
    data: dataRestPassword,
  } = useMutation<DataResponseRestPassword, AxiosErrors, IPayloadRestPassword>(
    "restPasswordApi",
    restPasswordApi
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await mutateAsync({ email: element.email });
    console.log("date", data);

    if (data) {
      console.log("date");

      setSubmit(true);
    }
  };

  const onSubmitRestPassword = async (e: React.FormEvent) => {
    const valueSecret = data?.data.secret.value;
    if (!valueSecret) return;
    const body: IPayloadRestPassword = {
      email: element.email,
      secret: data?.data.secret.value,
      password: element.password,
    };

    console.log("bodtRest", body);

    await mutateRestPassword(body);

    console.log("hey");
    navgite("/auth");
  };

  return (
    <Modal opened={open} onClose={() => setOpen(false)}>
      <div className="ModelsForgetPasswoord">
        {!submit ? (
          <form onSubmit={onSubmit} className="infoForm">
            <div>
              <input
                type={"email"}
                data-testid="emailModelTest"
                value={element.email}
                name="email"
                onChange={onChange}
                placeholder="enter your email"
                className="infoInput"
              />
            </div>
            <button
              className="button infoButton"
              type="submit"
              data-testid="btnTest"
            >
              nextStep
            </button>
          </form>
        ) : null}
        {submit ? (
          <form
            data-testid="form"
            onSubmit={onSubmitRestPassword}
            className="infoForm"
          >
            <div>
              <input
                type={"email"}
                name="email"
                value={element.email}
                placeholder="enter your email"
                className="infoInput"
              />
            </div>

            <div>
              <input
                type={"text"}
                value={data?.data.secret.value}
                className="infoInput"
                data-testid="inputSecretTest"
              />
            </div>

            <div>
              <input
                type={"password"}
                name="password"
                value={element.password}
                onChange={onChange}
                placeholder="enter your new password"
                data-testid="passwordModalTest"
                className="infoInput"
              />
            </div>

            <button
              className="button infoButton"
              type="submit"
              data-testid="submitTest"
            >
              submit
            </button>
          </form>
        ) : null}
      </div>
    </Modal>
  );
};
export default ForgetPasswordModal;
