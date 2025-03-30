import {  useFetchApi } from "../lib/fetch";

async function uploadImage(formData: FormData) {
  const { data } = await  useFetchApi<{ imageUrl: string }>("/api/common/upload", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.value;
}

export default uploadImage;
