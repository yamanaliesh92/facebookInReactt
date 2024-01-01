import { http } from "..";
import { AxiosResponses } from "../common.api";

export type DateDeleteFollow = AxiosResponses<void>;

export interface IPayloadDeleteFollow {
  id: number;
}

export async function deleteFollow(payload: IPayloadDeleteFollow) {
  return await http.delete(`/follow/del/${payload.id}`);
}
