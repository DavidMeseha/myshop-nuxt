import { type User } from "../types";
import type { LoginForm, RegisterForm } from "../schemas/valdation";
import { fetchApi } from "../lib/fetch";

export async function checkTokenValidity() {
  return fetchApi<User>("/api/auth/check", { method: "GET" }).then(
    (res) => res.data
  );
}

export async function getGuestToken() {
  return fetchApi<{ user: User; token: string }>("/api/auth/guest", {
    method: "GET",
  }).then((res) => res.data);
}

export async function refreshToken() {
  return fetchApi<{ token: string }>("/api/auth/refreshToken", {
    method: "GET",
  });
}

export async function changeUserPassword(form: {
  original: string;
  new: string;
}) {
  return fetchApi("/api/user/ChangePassword", {
    body: {
      password: form.original,
      newPassword: form.new,
    },
  });
}

export async function registerUser(payload: RegisterForm) {
  return fetchApi<{ message: string }>("/api/auth/register", {
    body: { ...payload },
  });
}

export async function login(payload: LoginForm) {
  return fetchApi<{ user: User; token: string }>("/api/auth/login", {
    body: { ...payload },
  }).then((res) => res.data);
}
