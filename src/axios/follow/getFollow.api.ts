import { http } from "..";
import { AxiosResponses } from "../common.api";

export interface IUser {
  username: string;
  image: any;
  id: number;
}

export interface IResponseGetFollow {
  id: number;
  following: IUser;
}

export type DateGetFollow = AxiosResponses<IResponseGetFollow[]>;

export async function getFollowApi() {
  return await http.get("/follow");
}
