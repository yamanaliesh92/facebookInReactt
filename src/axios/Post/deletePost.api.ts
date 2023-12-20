import { http } from "..";
export async function deletePostApi(id: number) {
  return http.delete(`/post/del/${id}`);
}
