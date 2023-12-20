import { http } from "..";
import { AxiosResposes } from "../common.api";

interface IPayloadCreateLike {
  postId: number;
}

export interface IRsponseLike {
  postId: number;
  id: number;
}

export type crateLikeDataApi = AxiosResposes<IRsponseLike>;

export async function createLikeApi(
  params: IPayloadCreateLike
): Promise<crateLikeDataApi> {
  return await http.post("/like", params);
}
