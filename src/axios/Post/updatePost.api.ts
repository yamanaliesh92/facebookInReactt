import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IPayloadUpdatePost {
  title: string;

  id?: number;
}
export interface IResponsePost {
  id: number;
  title: string;
  desc: string;
  img: any;
}
export type GetPostDateAiUpdate = AxiosResposes<IResponsePost | null>;

export async function updatePostApi(args: IPayloadUpdatePost) {
  return http.put(`/post/put/${args.id}`, args.title);
}
