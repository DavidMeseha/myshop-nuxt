import { type User } from "../types";
import type { LoginForm, RegisterForm } from "../schemas/valdation";

export async function checkTokenValidity() {
  const { $fetch } = useNuxtApp();
  return $fetch<User>("/api/auth/check", { method: "GET" });
}

export async function getGuestToken() {
  const { $fetch } = useNuxtApp();
  return $fetch<{ user: User; token: string }>("/api/auth/guest", {
    method: "GET",
  });
}

export async function refreshToken() {
  const { $fetch } = useNuxtApp();
  return $fetch<{ token: string }>("/api/auth/refreshToken", {
    method: "GET",
  });
}

export async function changeUserPassword(form: {
  original: string;
  new: string;
}) {
  const { $fetch } = useNuxtApp();
  return $fetch("/api/user/ChangePassword", {
    method: "POST",
    body: {
      password: form.original,
      newPassword: form.new,
    },
  });
}

export async function registerUser(payload: RegisterForm) {
  const { $fetch } = useNuxtApp();
  return $fetch<{ message: string }>("/api/auth/register", {
    method: "POST",
    body: { ...payload },
  });
}

export async function login(payload: LoginForm) {
  const { $fetch } = useNuxtApp();
  return $fetch<{ user: User; token: string }>("/api/auth/login", {
    method: "POST",
    body: { ...payload },
  });
}
