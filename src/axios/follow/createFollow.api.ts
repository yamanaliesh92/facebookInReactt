import { IResposeGetFollow } from "./getFollow.api";
import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IPayloadCreateFollow {
  followingId: number;
}

export type DateCreateFollow = AxiosResposes<IResposeGetFollow>;

export async function createFollowApi(payload: IPayloadCreateFollow) {
  return await http.post("/follow", payload);
}
