import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [] as any[],
  }),
  getters: {
    currentMessages: (state) => Array.from(new Set(state.messages)),
  },
  actions: {
    addMessage(message: any) {
      // add it to the first position
      this.messages.unshift(message);
    },
    clearCurrentMessages() {
      this.messages = [];
    },
  },
});
