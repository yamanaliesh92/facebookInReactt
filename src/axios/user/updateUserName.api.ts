import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IUpdateUserName {
  username: string;
}

export type dateUpateUserName = AxiosResposes<void>;

export async function updateNameApi(paylod: IUpdateUserName) {
  return http.put("/user/update", { username: paylod.username });
}
