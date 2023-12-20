import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IResponsePost {
  id: number;
  title: string;
  desc: string;
  img: any;
  likes: [];
}
export type GetPostDateApi = AxiosResposes<IResponsePost[]>;

export async function getPostApi() {
  return await http.get("/post/all");
}
