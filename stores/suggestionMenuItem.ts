import { defineStore } from "pinia";

export const useSuggestionMenuItemStore = defineStore("suggestionMenuItem", {
  state: () => ({
    menuItems: [] as any[],
  }),
  getters: {
    items: (state) => state.menuItems,
    total: (state) => {
      return state.menuItems.length;
    },
  },
  actions: {
    addToMenu(item: any) {
      const index = this.menuItems.findIndex((i) => i.id === item.id);
      if (index === -1) {
        this.menuItems.push({ ...item, quantity: 1 });
      } else {
        this.menuItems[index].quantity++;
      }
    },
    removeFromMenu(item: any) {
      const index = this.menuItems.findIndex((i) => i.id === item.id);
      if (index === -1) {
        return;
      }
      this.menuItems.splice(index, 1);
    },
    clearMenu() {
      this.menuItems = [];
    },
  },
});
