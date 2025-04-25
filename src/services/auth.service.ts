import { type User } from "../types";
import type { LoginForm, RegisterForm } from "../schemas/valdation";

export default function useAuthRepo() {
  const { $fetch } = useNuxtApp();

  async function checkTokenValidity() {
    return $fetch<User>("/api/auth/check", { method: "GET" });
  }

  async function getGuestToken() {
    return $fetch<{ user: User; token: string }>("/api/auth/guest", {
      method: "GET",
    });
  }

  async function refreshToken() {
    return $fetch<{ token: string }>("/api/auth/refreshToken", {
      method: "GET",
    });
  }

  async function changeUserPassword(form: { original: string; new: string }) {
    return $fetch("/api/user/ChangePassword", {
      method: "POST",
      body: {
        password: form.original,
        newPassword: form.new,
      },
    });
  }

  async function registerUser(payload: RegisterForm) {
    return $fetch<{ message: string }>("/api/auth/register", {
      method: "POST",
      body: { ...payload },
    });
  }

  async function login(payload: LoginForm) {
    return $fetch<{ user: User; token: string }>("/api/auth/login", {
      method: "POST",
      body: { ...payload },
    });
  }

  return {
    checkTokenValidity,
    getGuestToken,
    refreshToken,
    changeUserPassword,
    registerUser,
    login,
  };
}
