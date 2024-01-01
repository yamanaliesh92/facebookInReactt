import { http } from "..";
import { AxiosResponses } from "../common.api";

interface IPayloadCreateLike {
  postId: number;
}

export interface IResponseLike {
  postId: number;
  id: number;
}

export type crateLikeDataApi = AxiosResponses<IResponseLike>;

export async function createLikeApi(
  params: IPayloadCreateLike
): Promise<crateLikeDataApi> {
  return await http.post("/like", params);
}
