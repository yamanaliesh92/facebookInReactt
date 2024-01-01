import { http } from "..";
import { AxiosResponses as AxiosResponses } from "../common.api";

export interface IPaylodCreateComment {
  postId: number;
  title: string;
  userId: number;
}

export interface IRespondCreateComment {
  postId: number;
  userId: number;
  title: string;
}

export type DateResCreateComment = AxiosResponses<IRespondCreateComment>;

export async function createComment(payload: IRespondCreateComment) {
  return await http.post("/comment", payload);
}
