import { http } from "..";
import { infoDate } from "./createInfo.api";

export async function getOwnInfoApi(): Promise<infoDate> {
  return await http.get("/info");
}
