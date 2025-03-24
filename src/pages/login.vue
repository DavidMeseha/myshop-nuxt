<template>
  <div
    class="container flex min-h-[calc(100vh-60px)] items-center justify-center py-8"
  >
    <div
      class="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm"
    >
      <div class="space-y-2 text-center">
        <h1 class="text-2xl font-bold">{{ t("login") }}</h1>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label class="text-sm font-medium" for="email">{{
            t("email")
          }}</label>
          <input
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            :class="{ 'border-destructive': !!errors }"
            id="email"
            :placeholder="t('email')"
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
        <div class="h-4 text-sm text-destructive" f="!!errors">
          {{ errors }}
        </div>

        <button
          class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          :disabled="loading"
          type="submit"
        >
          {{ loading ? t("loading") : t("login") }}
        </button>
      </form>

      <div class="text-center text-sm">
        <NuxtLink class="text-primary hover:underline" to="/register">
          {{ t("auth.dontHaveAnAccount") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { login } from "../services/auth.service";
import { useUserStore } from "../stores/useUserStore";
import { getLastPageBeforSignUp, getToken } from '../lib/localestorageAPI';

const { t } = useI18n();
const router = useRouter();
const userStore = useUserStore();

const form = ref({
  email: "",
  password: "",
});

const loading = ref(false);
const errors = ref<string | false>("");

const handleSubmit = async () => {
  errors.value = false;
  try {
    if (form.value.email === "" || form.value.password === "")
      return (errors.value = t("auth.inputsRequired"));

    loading.value = true;

    const res = await login(form.value);
    if (res.value === null) return;

    const { token, user } = res.value;
    localStorage.setItem("token", token);

    // Update user store
    userStore.setUser(user);

    // Redirect to home
    router.push(getLastPageBeforSignUp());
  } catch (error) {
    return;
  } finally {
    loading.value = false;
  }
};
</script>
