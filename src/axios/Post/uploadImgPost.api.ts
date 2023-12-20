import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IPayloadUploadPost {
  id: number;
  img: any;
}

export async function uploadPostApi(id: number, img: any) {
  return await http.patch(`/post/update/${id}`, img);
}
