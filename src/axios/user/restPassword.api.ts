import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IPayloadRestPassword {
  email: string;
  password: string;
  secret: string;
}

export type DataResponseRestPassword = AxiosResposes<void>;
export async function restPasswordApi(payload: IPayloadRestPassword) {
  return await http.patch("/user/rest", payload);
}
