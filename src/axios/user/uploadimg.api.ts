import { http } from "./../index";

export async function uploadImg(payload: any) {
  return await http.patch(`/user/update/patch`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
