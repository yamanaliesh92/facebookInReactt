import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IUpdateComment {
  id: number;
  title: string;
}
export type DateUpdateComment = AxiosResposes<void>;
export async function updateCommentApi(payload: IUpdateComment) {
  return await http.put(`/comment/up/${payload.id}`, { title: payload.title });
}
