import { http } from "..";
import { AxiosResposes } from "../common.api";
import { IResult } from "./me.api";

export type DateGetAllUsers = AxiosResposes<IResult[]>;

export interface IPagenation {
  page?: number;
}

export async function getAllUserApi(args?: IPagenation) {
  return await http.get(`/user/all/user?page=${args?.page}`);
}
