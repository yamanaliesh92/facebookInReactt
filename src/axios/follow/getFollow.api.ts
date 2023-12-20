import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IUser {
  username: string;
  image: any;
  id: number;
}

export interface IResposeGetFollow {
  id: number;
  following: IUser;
}

export type DateGetFollow = AxiosResposes<IResposeGetFollow[]>;

export async function getFollowApi() {
  return await http.get("/follow");
}
