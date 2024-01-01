import { http } from "..";
import { AxiosResponses } from "../common.api";

export interface IUpdateUserName {
  username: string;
}

export type dateUpdateUserName = AxiosResponses<void>;

export async function updateNameApi(payload: IUpdateUserName) {
  return http.put("/user/update", { username: payload.username });
}
