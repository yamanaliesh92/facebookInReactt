import { http } from "..";
import { AxiosResposes } from "../common.api";

export type DateDeleteFollow = AxiosResposes<void>;

export interface IPayloadDeleteFollow {
  id: number;
}

export async function deleteFollow(paylod: IPayloadDeleteFollow) {
  return await http.delete(`/follow/del/${paylod.id}`);
}
