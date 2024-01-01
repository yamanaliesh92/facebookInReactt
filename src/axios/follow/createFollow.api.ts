import { IResponseGetFollow as IResponseGetFollow } from "./getFollow.api";
import { http } from "..";
import { AxiosResponses } from "../common.api";

export interface IPayloadCreateFollow {
  followingId: number;
}

export type DateCreateFollow = AxiosResponses<IResponseGetFollow>;

export async function createFollowApi(payload: IPayloadCreateFollow) {
  return await http.post("/follow", payload);
}
