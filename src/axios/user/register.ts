import { http } from "..";
import { AxiosResponses } from "../common.api";

export interface IPayload {
  email: string;
  password: string;
  username: string;
}
interface IResponseRegister {
  user: {
    email: string;
    password: string;
    username: string;
    id: number;
  };
  token: string;
}

export type registerDate = AxiosResponses<IResponseRegister>;

export async function registerApi(payload: IPayload) {
  return await http.post("/user/sign", payload);
}
