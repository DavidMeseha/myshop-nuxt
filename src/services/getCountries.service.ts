import {  useFetchApi } from "../lib/fetch";
const getCountries = async () => {
  try {
    const ids = await  useFetchApi<{ name: string; code: string; _id: string }[]>(
      `/api/common/countries`,
      { method: "GET" }
    );
    return ids.data;
  } catch {
    return [];
  }
};

export default getCountries;
