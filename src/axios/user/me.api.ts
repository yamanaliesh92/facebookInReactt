import { AxiosResponses } from "../common.api";
import { http } from "..";

export interface IResult {
  id: number;
  email: string;
  username: string;
  image: string;
  follows: [];
  createAt: Date;
}

export type MeDate = AxiosResponses<IResult>;

export async function getMe() {
  return await http.get("/user/me");
}
