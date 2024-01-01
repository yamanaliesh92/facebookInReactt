import { http } from "..";
import { AxiosResponses } from "../common.api";

export interface IPayloadRestPassword {
  email: string;
  password: string;
  secret: string;
}

export type DataResponseRestPassword = AxiosResponses<void>;
export async function restPasswordApi(payload: IPayloadRestPassword) {
  return await http.patch("/user/rest", payload);
}
