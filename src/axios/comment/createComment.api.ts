import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IPaylodCreateComment {
  postId: number;
  title: string;
  userId: number;
}

export interface IResponeCreateComment {
  postId: number;
  userId: number;
  title: string;
}

export type DateResCreateComment = AxiosResposes<IResponeCreateComment>;

export async function createComment(payload: IResponeCreateComment) {
  return await http.post("/comment", payload);
}
