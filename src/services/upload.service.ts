import { fetchApi } from "../lib/fetch";

async function uploadImage(formData: FormData) {
  const { data } = await fetchApi<{ imageUrl: string }>("/api/common/upload", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.value;
}

export default uploadImage;
