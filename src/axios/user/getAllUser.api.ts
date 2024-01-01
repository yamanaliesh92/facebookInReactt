import { http } from "..";
import { AxiosResponses } from "../common.api";
import { IResult } from "./me.api";

export type DateGetAllUsers = AxiosResponses<IResult[]>;

export interface IPagination {
  page?: number;
}

export async function getAllUserApi(args?: IPagination) {
  return await http.get(`/user/all/user?page=${args?.page}`);
}
