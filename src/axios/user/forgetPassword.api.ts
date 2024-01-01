import { http } from "..";
import { AxiosResponses } from "../common.api";

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

export type DataResponseForgetPassword =
  AxiosResponses<IResponseForgetPassword>;

export async function forgetPasswordApi(payload: IPayloadForgetPassword) {
  return await http.patch("/user/forget", payload);
}
