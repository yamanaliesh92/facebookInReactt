import { AxiosResponses } from "./../common.api";
import { http } from "..";

export interface IPayloadLogin {
  email: string;
  password: string;
}

interface IResponseLogin {
  token: string;
}

export type LoginDataApi = AxiosResponses<IResponseLogin>;

export async function LoginApi(payload: IPayloadLogin) {
  return await http.post("/user/login", payload);
}
