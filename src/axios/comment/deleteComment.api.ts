import { http } from "..";

export async function deleteCommentsApi(id: number) {
  return await http.delete(`/comment/del/${id}`);
}
