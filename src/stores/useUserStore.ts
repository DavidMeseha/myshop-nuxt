import { defineStore } from "pinia";
import type { User } from "../types";
import { getCartIds } from "../services/getUserActions.service";

interface UserState {
  user: User | null;
  cartItems: string[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    cartItems: [],
  }),

  actions: {
    setUser(user: User | null): void {
      this.user = user;
    },
    async setCartItems() {
      const result = await getCartIds();
      this.cartItems = result ?? [];
    },
  },

  getters: {
    getUserName(): string {
      return this.user
        ? `${this.user.firstName} ${this.user.lastName}`
        : "Guest";
    },
    getCartItems(): string[] {
      return this.cartItems;
    },
    getCartItemsCount(): number {
      return this.cartItems.length;
    },
    isRegistered(): boolean {
      return !!this.user?.isRegistered;
    },
    getUser(): User | null {
      return this.user;
    },
  },
});
