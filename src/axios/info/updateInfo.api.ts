import { http } from "..";

export interface PayloadUpdate {
  workAt?: string;
  livesIn?: string;
  country?: string;
  relationShip?: string;
}

export async function updateInfoApi(payload: PayloadUpdate) {
  return await http.put("/info", {
    workAt: payload.workAt,
    livesIn: payload.livesIn,
    country: payload.country,
    relationShip: payload.relationShip,
  });
}
