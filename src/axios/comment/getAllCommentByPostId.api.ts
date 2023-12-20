import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IResponUser {
  username: string;
  image: any;
}

export interface IResposn {
  id: number;
  title: string;
  postId: number;
  createAt: Date;
  user: IResponUser;
  userId: number;
}

export type getAllCommentsDate = AxiosResposes<IResposn[]>;

export async function getAllComments(postId: number) {
  return http.get(`/comment/${postId}`);
}
