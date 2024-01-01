import { http } from "..";
import { AxiosResponses } from "../common.api";

export interface IRespondUser {
  username: string;
  image: any;
}

export interface IResponse {
  id: number;
  title: string;
  postId: number;
  createAt: Date;
  user: IRespondUser;
  userId: number;
}

export type getAllCommentsDate = AxiosResponses<IResponse[]>;

export async function getAllComments(postId: number) {
  return http.get(`/comment/${postId}`);
}
