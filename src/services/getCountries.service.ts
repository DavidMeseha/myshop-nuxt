const getCountries = async () => {
  const { $fetch } = useNuxtApp();
  try {
    const countries = await $fetch<
      { name: string; code: string; _id: string }[]
    >(`/api/common/countries`, { method: "GET" });
    return countries;
  } catch {
    return [];
  }
};

export default getCountries;
