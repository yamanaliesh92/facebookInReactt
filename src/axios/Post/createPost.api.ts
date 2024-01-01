import { http } from "..";
import { AxiosResponses } from "../common.api";

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
export type PostDateApi = AxiosResponses<IResponsePost>;

export async function createPostApi(params: IPayloadCreatePost) {
  return await http.post("/post", params);
}
