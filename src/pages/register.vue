<template>
  <div class="flex justify-center pt-20 px-2 md:px-0">
    <div
      class="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm"
    >
      <div class="space-y-2 text-center">
        <h1 class="text-2xl font-bold">{{ t("register") }}</h1>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label class="text-sm font-medium" for="firstName">{{
            t("auth.firstName")
          }}</label>
          <input
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            id="firstName"
            :placeholder="t('auth.firstName')"
            type="text"
            v-model="form.firstName"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium" for="lastName">{{
            t("auth.lastName")
          }}</label>
          <input
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            id="lastName"
            :placeholder="t('auth.lastName')"
            type="text"
            v-model="form.lastName"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium" for="email">{{
            t("auth.email")
          }}</label>
          <input
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            id="email"
            :placeholder="t('auth.email')"
            type="email"
            v-model="form.email"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium" for="password">{{
            t("auth.password")
          }}</label>
          <input
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            id="password"
            :placeholder="t('auth.password')"
            type="password"
            v-model="form.password"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium" for="confirmPassword">{{
            t("auth.confirmPassword")
          }}</label>
          <input
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            id="confirmPassword"
            :placeholder="t('auth.confirmPassword')"
            type="password"
            v-model="form.confirmPassword"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">{{ t("gender") }}</label>
          <div class="flex space-x-4">
            <label class="flex items-center space-x-2">
              <input
                type="radio"
                value="male"
                v-model="form.gender"
                class="form-radio"
              />
              <span>{{ t("male") }}</span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                type="radio"
                value="female"
                v-model="form.gender"
                class="form-radio"
              />
              <span>{{ t("female") }}</span>
            </label>
          </div>
        </div>

        <DateOfBirthInputs
          v-model:dayOfBirth="form.dayOfBirth"
          v-model:monthOfBirth="form.monthOfBirth"
          v-model:yearOfBirth="form.yearOfBirth"
        />

        <div class="h-4 text-sm text-destructive">
          {{ errors ? errors : "" }}
        </div>

        <Button class="w-full" :loading="loading" type="submit">
          {{ t("register") }}
        </Button>
      </form>

      <div class="text-center text-sm">
        <NuxtLink
          class="text-primary hover:underline"
          :to="localPath('/login')"
        >
          {{ t("auth.alreadyHveAnAccount") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useTranslation from "~/composables/useTranslation";
import useAuthRepo from "~/services/auth.service";
import { useRouter } from "vue-router";
import type { RegisterForm } from "~/schemas/valdation";
import Button from "~/components/common/Button.vue";

const t = useTranslation();
const router = useRouter();
const localPath = useLocalePath();
const { registerUser } = useAuthRepo();

const form = ref<RegisterForm>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "male",
  dayOfBirth: new Date().getDate().toString(),
  monthOfBirth: new Date().getMonth().toString(),
  yearOfBirth: new Date().getFullYear().toString(),
});

const loading = ref(false);
const errors = ref<string | false>(false);

const handleSubmit = async () => {
  if (
    !form.value.firstName ||
    !form.value.lastName ||
    !form.value.email ||
    !form.value.password ||
    !form.value.confirmPassword ||
    !form.value.gender ||
    !form.value.dayOfBirth ||
    !form.value.monthOfBirth ||
    !form.value.yearOfBirth
  ) {
    return;
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value = t("auth.passwordsNotMatch");
    return;
  }

  loading.value = true;
  errors.value = false;

  try {
    await registerUser(form.value);
    router.push(localPath("/login"));
  } catch (error) {
    console.error("Register error:", error);
    errors.value = t("serverFail");
  } finally {
    loading.value = false;
  }
};
</script>
