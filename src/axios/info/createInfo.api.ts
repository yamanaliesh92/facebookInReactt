import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IPayloadCrateInfo {
  workAt: string;
  livesIn: string;
  country: string;
  relationShip: string;
}
interface IResponseInfo {
  workAt: string;
  livesIn: string;
  country: string;
  relationShip: string;
  id: number;
  userId: number;
}

export type infoDate = AxiosResposes<IResponseInfo>;

export async function crateInfoApi(payload: IPayloadCrateInfo) {
  return await http.post("/info", payload);
}
