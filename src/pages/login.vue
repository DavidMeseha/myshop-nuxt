<template>
  <div class="flex justify-center pt-20 px-2 md:px-0">
    <div
      class="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm"
    >
      <div class="space-y-2 text-center">
        <h1 class="text-2xl font-bold">{{ t("login") }}</h1>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label class="text-sm font-medium" for="email">{{
            t("auth.email")
          }}</label>
          <input
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            :class="{ 'border-destructive': !!errors }"
            id="email"
            :placeholder="t('auth.email')"
            type="email"
            v-model="form.email"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium" for="password">{{
            t("password")
          }}</label>
          <input
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            :class="{ 'border-destructive': !!errors }"
            id="password"
            :placeholder="t('password')"
            type="password"
            v-model="form.password"
          />
        </div>
        <div class="h-4 text-sm text-destructive">
          {{ errors ? errors : "" }}
        </div>

        <Button class="w-full" :loading="loading" type="submit">
          {{ t("login") }}
        </Button>
      </form>

      <div class="text-center text-sm">
        <NuxtLink
          class="text-primary hover:underline"
          :to="localPath('/register')"
        >
          {{ t("auth.dontHaveAnAccount") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "../stores/useUserStore";
import { getLastPageBeforSignUp, setToken } from "../lib/localestorageAPI";
import useTranslation from "~/composables/useTranslation";
import { login } from "~/services/auth.service";
import Button from "~/components/common/Button.vue";
import type { FetchError } from "~/types";

const t = useTranslation();
const router = useRouter();
const userStore = useUserStore();
const localPath = useLocalePath();

const form = ref({
  email: "",
  password: "",
});

const loading = ref(false);
const errors = ref<string | false>(false);

const handleSubmit = async () => {
  if (form.value.email === "" || form.value.password === "")
    return (errors.value = t("auth.inputsRequired"));

  loading.value = true;
  errors.value = false;

  try {
    const res = await login({
      email: form.value.email,
      password: form.value.password,
    });

    if (res) {
      setToken(res.token);
      userStore.setUser(res.user);
      router.push(localPath(getLastPageBeforSignUp()));
      return;
    }

    errors.value = t("auth.wrongCredentials");
  } catch (error) {
    console.error(error);
    if ((error as FetchError).response?.status === 403) {
      errors.value = t("auth.wrongCredentials");
    } else {
      errors.value = t("serverFail");
    }
  } finally {
    loading.value = false;
  }
};
</script>
