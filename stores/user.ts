import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  getters: {
    currentUser: (state) => state.user,
  },
  actions: {
    setCurrentUser(user: any) {
      this.user = user;
    },
  },
});
