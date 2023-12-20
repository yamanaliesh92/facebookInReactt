import { http } from "..";
import { AxiosResposes } from "../common.api";
import { IPagenation } from "../user/getAllUser.api";

interface IUser {
  email: string;
  username: string;
  id: number;
  image: string;
}

export interface IResponseGetAllPost {
  id: number;
  title: string;
  desc: string;
  img: any;
  userId: number;
  createAt: Date;
  likes: [];
  user: IUser;
}
export type GetPostDateApi = AxiosResposes<IResponseGetAllPost[]>;

export async function getAllPostsApi() {
  return await http.get("post/getAll/post");
}
