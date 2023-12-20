import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IPayloadForgetPassword {
  email: string;
}

interface IPayloadSecret {
  value: string;
  createAt: Date;
}

interface IResponseForgetPassword {
  secret: IPayloadSecret;
}

export type DataResponseForgetPassword = AxiosResposes<IResponseForgetPassword>;

export async function forgetPasswordApi(payload: IPayloadForgetPassword) {
  return await http.patch("/user/forget", payload);
}
