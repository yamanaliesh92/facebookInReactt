import { http } from "..";
import { AxiosResponses } from "../common.api";

export interface IResponsePost {
  id: number;
  title: string;
  desc: string;
  img: any;
  likes: [];
}
export type GetPostDateApi = AxiosResponses<IResponsePost[]>;

export async function getPostApi() {
  return await http.get("/post/all");
}
