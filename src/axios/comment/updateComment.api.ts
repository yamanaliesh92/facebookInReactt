import { http } from "..";
import { AxiosResponses } from "../common.api";

export interface IUpdateComment {
  id: number;
  title: string;
}
export type DateUpdateComment = AxiosResponses<void>;
export async function updateCommentApi(payload: IUpdateComment) {
  return await http.put(`/comment/up/${payload.id}`, { title: payload.title });
}
