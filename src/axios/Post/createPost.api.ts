import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IPayloadCreatePost {
  desc: string;
  title: string;
  img?: string;
}
export interface IResponsePost {
  id: number;
  title: string;
  desc: string;
  img: string;
}
export type PostDateApi = AxiosResposes<IResponsePost>;

export async function createPostApi(params: IPayloadCreatePost) {
  return await http.post("/post", params);
}
