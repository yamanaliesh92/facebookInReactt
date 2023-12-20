import { http } from "..";
import { AxiosResposes } from "../common.api";

export interface IpayloadUpdate {
  workAt?: string;
  livesIn?: string;
  country?: string;
  relationShip?: string;
}

export async function updateInfoApi(payload: IpayloadUpdate) {
  return await http.put("/info", {
    workAt: payload.workAt,
    livesIn: payload.livesIn,
    country: payload.country,
    relationShip: payload.relationShip,
  });
}
